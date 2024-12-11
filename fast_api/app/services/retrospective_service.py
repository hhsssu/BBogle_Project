import json
import boto3
import logging
import threading
import time
from botocore.config import Config
from fastapi import HTTPException
from typing import List
from app.schemas.retrospective_schema import DailyLog  # Ensure DailyLog is correctly imported

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0"
MAX_TOKENS = 8000

PROMPT_TEMPLATE = """
다음은 프로젝트 개발 기간 동안의 상세한 개발일지입니다.
각 일자별로 진행된 작업, 문제, 해결 방안이 기록되어 있습니다.
이를 바탕으로 개발 과정을 상세히 정리해주세요.
"""

SUMMARY_INSTRUCTIONS = """
개발일지를 바탕으로 아래 세 가지 섹션으로 구분하여 회고록을 작성해주세요.
각 섹션은 약 650-700자로 작성하여, 전체 약 2000자가 되도록 합니다.

[잘한 점 & 성과]
- 프로젝트의 시작부터 끝까지 시간 순서대로 진행한 작업 나열
- 각 단계에서 실제로 완료한 작업과 그 내용
- 구체적인 기술 스택과 도구 사용 결과

[어려웠던 점 & 해결 과정]
- 발생한 문제점들을 시간 순서대로 나열
- 각 문제에 적용한 구체적인 해결 방법
- 해결 과정에서 사용한 기술과 그 결과

[기술 스택 & 의사결정]
- 사용한 각 기술의 선택 이유
- 기술 적용 과정의 구체적 내용
- 실제 적용 결과와 기술적 의의

작성 시 필수 준수사항:
1. 개발일지에 있는 내용만 사용할 것
2. 미래형 표현 사용하지 않을 것 (예: "~할 예정", "~기대된다")
3. 추상적 표현 사용하지 않을 것 (예: "향상되었다", "개선하였다")
4. 각 문단은 구체적인 작업 내용으로만 구성할 것
5. 섹션 제목 외 다른 제목이나 부연 설명 없이 바로 본문 시작할 것
6. 마지막 문단에서 미래 계획이나 기대 효과를 언급하지 않을 것

글쓰기 스타일:
1. 명확한 시작과 끝이 있는 완성된 문장 사용
2. 개조식이 아닌 서술형 문장으로 작성
3. 비교적 긴 문단으로 구성 (3-4문장 이상)
4. 각 섹션 내에서 자연스러운 문장 연결
"""

class RetrospectiveService:
    def __init__(self, settings):
        """
        RetrospectiveService 초기화
        :param settings: AWS 관련 설정
        """
        try:
            session = boto3.Session(
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_REGION
            )
            config = Config(retries={"max_attempts": 3, "mode": "adaptive"})
            self.client = session.client("bedrock-runtime", config=config)
            self.model_id = MODEL_ID
            logger.info("AWS Bedrock 클라이언트 초기화 성공")
        except Exception as e:
            logger.error(f"AWS Bedrock 클라이언트 초기화 실패: {e}")
            raise HTTPException(status_code=500, detail="AWS Bedrock 클라이언트 초기화 실패")

    async def generate_retrospective(self, dev_logs: List[DailyLog], max_tokens=MAX_TOKENS) -> str:
        """
        개발일지 기반 회고록 생성 함수
        :param dev_logs: DailyLog 객체의 리스트
        :param max_tokens: 최대 토큰 수
        :return: 생성된 회고록 텍스트
        """
        prompt_parts = [PROMPT_TEMPLATE]

        # 개발일지에서 날짜를 제외하고 내용을 그대로 출력
        for log in dev_logs:
            prompt_parts.append(f"\n제목: {log.summary}")
            for qa in log.daily_log:
                question = qa.question
                answer = qa.answer
                prompt_parts.append(f"- {question}: {answer}")

        prompt_parts.append(SUMMARY_INSTRUCTIONS)
        prompt = "\n".join(prompt_parts)

        # 모델 요청 데이터 생성
        messages = [{"role": "user", "content": prompt}]
        payload = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": max_tokens,
            "messages": messages,
            "temperature": 0.3,
            "top_p": 0.8,
        }

        # 진행 상황 표시
        def show_progress():
            start_time = time.time()
            while not stop_event.is_set():
                elapsed_time = time.time() - start_time
                print(f"\r회고록 생성 중 ... {elapsed_time:.2f}초 경과", end="")
                time.sleep(1)

        stop_event = threading.Event()
        progress_thread = threading.Thread(target=show_progress)

        try:
            progress_thread.start()
            response = self.client.invoke_model(
                modelId=self.model_id,
                contentType="application/json",
                accept="application/json",
                body=json.dumps(payload)
            )
            stop_event.set()
            progress_thread.join()
            print("\n회고록 생성 완료!")

            # 결과 처리
            result = json.loads(response['body'].read().decode("utf-8"))
            content = result.get('content', [{"text": "응답을 확인할 수 없습니다."}])

            if isinstance(content, list) and len(content) > 0:
                retrospective = content[0].get('text', "응답을 확인할 수 없습니다.")
                return retrospective.strip()
            else:
                return "응답을 확인할 수 없습니다."

        except Exception as e:
            stop_event.set()
            progress_thread.join()
            logger.error(f"회고록 생성 중 오류 발생: {e}")
            raise HTTPException(status_code=500, detail="회고록 생성 중 오류가 발생했습니다.")
