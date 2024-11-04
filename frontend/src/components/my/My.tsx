import style from './My.module.css';
import EditIcon from '../../assets/image/icon/Edit.svg';
import Empty from '../../assets/image/default/diary.png';
import EnterIcon from '../../assets/image/icon/Enter.svg';
import ImageWithDefault from './ImageWithDefault';
import RunnerWay from '../../assets/image/RunnerWay.png'; // TODO : 임시 이미지
import ProjectCard from '../common/projectCard/ProjectCard';
import GoToDiary from '../common/button/GoToDiary';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import { useState } from 'react';
import ProfileImageUploader from './ProfileImageUploader';

// 타입 정의
interface DiaryItem {
  id: number;
  imageSrc: string;
  title: string;
  state: boolean;
  term: string;
  summary: string;
}

function My() {
  const navigate = useNavigate();
  const { user, isEditingNickname, setEditNickname, updateNickname } =
    useUserStore();
  const [newNickname, setNewNickname] = useState(user?.nickname || '');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  // TODO : 내 정보 임시 데이터
  const myData = {
    name: '홍길은',
    profileImg: 'src/assets/image/dummy/profile.jpg',
    email: 'gileun@example.com',
  };

  // TODO : 개발일지 임시 데이터
  const diaryList: DiaryItem[] = [
    // {
    //   id: 0,
    //   imageSrc: RunnerWay,
    //   title: 'Endurance Challenge',
    //   state: false,
    //   term: '2024.04.01 ~ 2024.06.30',
    //   summary: '한계를 극복하는 러닝 도전 프로젝트',
    // },
    // {
    //   id: 1,
    //   imageSrc: RunnerWay,
    //   title: 'Marathon Complete',
    //   state: false,
    //   term: '2024.01.01 ~ 2024.03.30',
    //   summary: '마라톤 완주를 위한 도전 프로젝트',
    // },
    // {
    //   id: 2,
    //   imageSrc: RunnerWay,
    //   title: 'Summer Sprint',
    //   state: false,
    //   term: '2024.06.01 ~ 2024.07.31',
    //   summary: '여름 동안 짧은 거리 러닝 훈련 프로젝트',
    // },
    // {
    //   id: 3,
    //   imageSrc: RunnerWay,
    //   title: 'City Night Run',
    //   state: false,
    //   term: '2023.11.05 ~ 2024.01.10',
    //   summary: '도심에서의 야간 러닝 체험 프로젝트',
    // },
    // {
    //   id: 4,
    //   imageSrc: RunnerWay,
    //   title: 'Trail Discoveries',
    //   state: false,
    //   term: '2024.03.15 ~ 2024.05.15',
    //   summary: '트레일 러닝으로 새로운 길을 탐험',
    // },
    // {
    //   id: 5,
    //   imageSrc: RunnerWay,
    //   title: 'Weekly 5K Challenge',
    //   state: false,
    //   term: '2023.09.01 ~ 2024.01.01',
    //   summary: '매주 5km 달리기 도전 프로젝트',
    // },
    {
      id: 6,
      imageSrc: RunnerWay,
      title: 'Park Run Adventures',
      state: false,
      term: '2024.07.01 ~ 2024.09.01',
      summary: '도시 공원을 탐방하며 달리기 즐기기',
    },
  ];

  // 카드 선택 시 프로젝트 페이지로 이동하는 함수
  const selectCard = (cardId: number) => {
    console.log(cardId);
    navigate(`/project/${cardId}`);
  };

  // 닉네임 업데이트 함수
  const handleUpdate = () => {
    updateNickname(newNickname);
    console.log(newNickname);
  };

  // 엔터 입력 시 닉네임 업데이트
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };

  // 이미지 클릭 시 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
        <ImageWithDefault
          src={myData.profileImg}
          alt="프로필"
          defaultSrc="src/assets/image/default/profile.svg"
          onClick={openModal}
        ></ImageWithDefault>
        <div className={style.detailInfo}>
          {!isEditingNickname ? (
            <div className={style.greeting}>
              <div className={style.name}>
                안녕하세요, <span>{user?.nickname || '-'}</span>님
              </div>
              <img
                className={style.editIcon}
                src={EditIcon}
                alt="편집"
                onClick={setEditNickname}
              />
            </div>
          ) : (
            <div className={style.edit}>
              <div className={style.editDesc}>닉네임 입력</div>
              <div>
                <input
                  className={style.editInput}
                  type="text"
                  placeholder="최대 8자"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  onKeyDown={handleEnter}
                  maxLength={8}
                />
                <img src={EnterIcon} alt="등록" onClick={handleUpdate} />
              </div>
            </div>
          )}
          <div className={style.cheer}>
            오늘도 뽀글이 옆에서 응원하고 있어요 !
          </div>
          <div className={style.email}>{user?.email || '-'}</div>
        </div>
      </div>

      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <ProfileImageUploader />
          </div>
        </div>
      )}

      <div className={style.todayDiary}>
        <div className={style.title}>
          오늘 내가 작성한 <span className={style.highlight}>개발 일지</span>
        </div>
        <div className={style.pjtList}>
          {diaryList.length > 0 ? (
            diaryList.map((card, index) => (
              <div key={index} onClick={() => selectCard(card.id)}>
                <ProjectCard
                  key={index}
                  imageSrc={card.imageSrc}
                  title={card.title}
                  state={card.state}
                  term={card.term}
                  summary={card.summary}
                />
              </div>
            ))
          ) : (
            <div className={style.empty}>
              <div className={style.guide}>
                <img src={Empty} alt="empty" />
                <div className={style.message}>
                  <div>오늘 작성한 개발 일지가 없어요</div>
                  <div>지금 바로 작성하러 갈까요 ?</div>
                </div>
              </div>
              <div className={style.button}>
                <GoToDiary
                  isInactive={false}
                  onClick={() => navigate('/project')}
                ></GoToDiary>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default My;
