from pydantic import BaseModel, Field
from typing import List

class QnAPair(BaseModel):
    question: str = Field(..., min_length=1, description="질문 텍스트")
    answer: str = Field(..., min_length=1, description="답변 텍스트")

class DailyLog(BaseModel):
    date: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$", description="날짜 (YYYY-MM-DD 형식)")
    daily_log: List[QnAPair] = Field(..., description="질문-답변 리스트")
    summary: str = Field(..., min_length=1, description="일일 요약 텍스트")

class RetrospectiveRequest(BaseModel):
    logs: List[DailyLog] = Field(..., description="전체 개발 로그 리스트")

class RetrospectiveResponse(BaseModel):
    retrospective: str = Field(..., description="생성된 회고록 텍스트")
