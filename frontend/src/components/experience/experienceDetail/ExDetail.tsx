import ExStyles from '../Experience.module.css';
import ExDetailStyles from './ExDetail.module.css';
import editIcon from '../../../assets/image/icon/pencil.svg';
import deleteIcon from '../../../assets/image/icon/trash.svg';

function ExDetail() {
  const handleNavEdit = () => {};
  const handleNavDelete = () => {};

  // 더미 데이터 예시
  const exDetail = {
    exId: 1,
    title: '소셜 로그인 구현',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    content: `소셜로그인 기능 개발을 통해 사용자의 편의성과 보안성을 동시에 강화하는 경험을 했습니다. 구글과 카카오 소셜로그인을 구현하면서 API와 OAuth2 인증 방식을 학습하고 적용했습니다. 구글 로그인 기능은 시간을 절약하기 위해 사전에 정의된 액세스 토큰을 사용하여 사용자 정보를 얻는 방식으로 테스트를 진행하였습니다. 이를 통해 사용자 경험을 검증하고, 실제 환경에서도 안정적인 작동을 보장할 수 있었습니다. 또한 Redux를 사용해 로그인 상태와 토큰을 관리하여 데이터 흐름을 최적화하고, 중앙 집중식 상태 관리의 중요성을 체감했습니다. Redux Toolkit을 활용해 인증과 관련된 상태를 authSlice로 분리하여 코드의 가독성과 유지보수성을 향상시켰습니다. 이 과정에서 여러 사용자 환경을 고려한 UI/UX를 개선하고자 노력하였으며, 최종적으로 소셜로그인을 통해 서비스 접근성을 높이는 동시에 사용자 데이터를 안전하게 보호할 수 있는 시스템을 구축했습니다.
액세스 토큰의 유효성을 관리하고, 필요 시 재발급하는 로직을 추가해 사용자가 원활하게 로그인을 유지할 수 있도록 했습니다. 또한, 다양한 예외 상황을 대비해 에러 처리 방안을 마련하여 사용자 경험을 끊김 없이 유지할 수 있도록 했습니다. 이를 위해 Axios를 활용해 API 호출을 모듈화하고, 각 상황에 맞는 메시지를 출력해 사용자가 문제를 쉽게 이해하고 해결할 수 있도록 했습니다.`,
    projectName: 'RunnerWay',
    tags: [
      { type: 0, name: '기술태그' },
      { type: 0, name: '기술태그' },
      { type: 1, name: '인성태그' },
    ],
  };

  return (
    <>
      <div className={`${ExDetailStyles.center} ${ExStyles.title}`}>
        경험 상세
      </div>

      {/* 경험 정보 */}
      <section className={ExDetailStyles.container}>
        {/* 제목 */}
        <p className={ExDetailStyles.semibold}>제목</p>
        <div>{exDetail.title}</div>

        {/* 시작일 ~ 종료일 */}
        <p className={ExDetailStyles.semibold}>경험 기간</p>
        <div className={ExDetailStyles.date}>
          {new Date(exDetail.startDate).toLocaleDateString()} ~{' '}
          {new Date(exDetail.endDate).toLocaleDateString()}
        </div>

        {/* 프로젝트 명 */}
        <p className={ExDetailStyles.semibold}>프로젝트 명</p>
        {exDetail.projectName ? (
          <div>{exDetail.projectName}</div>
        ) : (
          <div>-</div>
        )}

        {/* 경험 태그 */}
        <p className={ExDetailStyles.semibold}>관련 키워드</p>
        <div className={ExDetailStyles.flex}>
          {exDetail.tags ? (
            exDetail.tags.map((tag, index) => (
              <div key={index}>
                {/* 기술태그 0 blue / 인성태그 1 yellow */}
                {tag.type === 0 ? (
                  <span className={ExStyles.btag}>{tag.name}</span>
                ) : (
                  <span className={ExStyles.ytag}>{tag.name}</span>
                )}
              </div>
            ))
          ) : (
            <div>-</div>
          )}
        </div>
      </section>

      <p className={ExDetailStyles.content}>{exDetail.content}</p>

      {/* 수정 & 삭제 버튼 */}
      <section className={ExDetailStyles.flex}>
        <button
          onClick={handleNavEdit}
          className={`${ExDetailStyles.flex} ${ExDetailStyles.margin}`}
        >
          <img src={editIcon} alt="수정" />
          <span className={ExStyles.gray}>수정</span>
        </button>
        <button onClick={handleNavDelete} className={ExDetailStyles.flex}>
          <img src={deleteIcon} alt="삭제" />
          <span className={ExStyles.red}>삭제</span>
        </button>
      </section>
    </>
  );
}

export default ExDetail;
