import { useState } from 'react';

import EmptySummary from '../../assets/image/icon/EmptySummary.svg';
import Edit from '../../assets/image/icon/Pencil.svg';

import styles from './Summary.module.css';

function Summary() {
  const [openSection] = useState(false);

  return (
    <>
      {openSection ? (
        <section className={styles.contentbox}>
          <button className={styles.editbox}>
            <img src={Edit} alt="수정" />
            <span className={styles.edit}>수정</span>
          </button>
          <div>
            사용 기술
            <br />
            프론트엔드: React, TypeScript, Zustand, Tailwind CSS
            <br />
            백엔드: Node.js, Express AI/ML
            <br />
            도구: Openvidu, Teachable Machine
            <br />
            경험 목록
            <br />
            1. Atomic Design 패턴의 유용성 이번 프로젝트에서 Atomic Design
            패턴을 활용해 컴포넌트를 개발한 것은 매우 유용한 경험이었습니다. 이
            패턴은 UI 요소들을 작은 단위로 나누어 설계하고, 이를 조합하여 더 큰
            단위를 만드는 방식으로 재사용성과 유지보수가 용이했습니다. 특히,
            상태 관리 도구인 Zustand와 함께 사용하면서 복잡한 컴포넌트
            트리에서도 상태를 효율적으로 관리할 수 있었습니다. 결과적으로
            팀원들이 각기 다른 기능을 개발할 때도 일관성 있는 UI를 유지할 수
            있었습니다. <br />
            2. 협업과 커뮤니케이션의 중요성 팀 프로젝트에서 가장 큰 도전 중
            하나는 다양한 기술적 문제를 해결하는 동시에 효과적으로 협업하는
            것이었습니다. 매주 정기적인 회의를 통해 현재 진행 상황을 공유하고
            각자의 역할을 명확히 나누어 일정을 관리했습니다. 또한, Git을 활용한
            협업으로 코드 충돌을 최소화하고, 코드 리뷰를 통해 품질을 유지할 수
            있었습니다. 그러나 초기에는 각 팀원의 작업 방식과 일정이 맞지 않아
            조정이 필요했지만, 시간이 지날수록 원활한 커뮤니케이션이
            이루어졌습니다. <br />
            3. 테스트와 QA의 중요성 인식 프로젝트 후반부에 접어들면서, 실제로
            사용될 프로그램의 안정성을 확보하기 위한 테스트의 중요성을 깊이
            인식하게 되었습니다. 테스트 코드를 미리 작성하지 않은 탓에 디버깅과
            최종 QA 과정에서 시간이 지연되는 일이 발생했습니다. 이에 따라, 차후
            프로젝트에서는 테스트 주도 개발(TDD)의 도입을 고려하게 되었으며,
            자동화된 테스트 환경을 구축하는 것이 얼마나 중요한지를 배우게
            되었습니다. <br />
            4. AI 기술의 한계와 가능성 Teachable Machine과 Openvidu를 활용해
            자세를 감지하는 기능을 구현하면서, AI 모델의 한계와 가능성을 동시에
            경험했습니다. 초기에는 자세 감지의 정확도가 기대에 미치지 못해
            사용자에게 오작동이 발생할 우려가 있었습니다. 하지만 데이터셋을
            늘리고 모델을 튜닝함으로써 성능이 개선되었습니다. 이 과정에서 AI
            모델을 개발할 때, 지속적인 개선과 테스트가 필수적이라는 사실을
            배웠습니다. <br />
            5. 사용자 피드백의 중요성 베타 테스트 단계에서 실제 부모
            사용자들에게서 받은 피드백은 프로그램의 개선에 큰 도움이 되었습니다.
            그들의 요구사항을 반영하여 맞춤형 알림 기능을 추가하는 등 사용자
            경험을 극대화하기 위한 기능을 개발했습니다. 앞으로도 사용자 피드백을
            적극적으로 수렴하여 더 나은 제품을 만드는 방향으로 나아갈 것입니다.
          </div>
        </section>
      ) : (
        <section>
          <div className={styles.center}>
            <img src={EmptySummary} alt="회고 없음" />
            <p className={styles.description}>
              생성된 회고록이 없어요
              <br />
              <strong className={styles.bold}>회고록을 생성해 볼까요?</strong>
            </p>
          </div>
          <div className={styles.center}>
            <button className={styles.orangebtn}>AI 생성하기</button>
            <button className={styles.blackbtn}>직접 작성하기</button>
          </div>
        </section>
      )}
    </>
  );
}

export default Summary;
