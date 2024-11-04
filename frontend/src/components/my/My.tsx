import style from './My.module.css';
import EditIcon from '../../assets/image/icon/Edit.svg';
import ImageWithDefault from './ImageWithDefault';

function My() {
  // TODO : 내 정보 임시 데이터
  const myData = {
    name: '홍길은',
    profileImg: 'src/assets/image/dummy/profile.jpg',
    email: 'gileun@example.com',
  };

  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
        <ImageWithDefault
          src={myData.profileImg}
          alt="프로필"
          defaultSrc="src/assets/image/default/profile.svg"
        ></ImageWithDefault>
        <div className={style.detailInfo}>
          <div className={style.greeting}>
            <div className={style.name}>안녕하세요, {myData.name}님</div>
            <img className={style.editIcon} src={EditIcon} alt="" />
          </div>
          <div className={style.cheer}>
            오늘도 뽀글이 옆에서 응원하고 있어요 !
          </div>
          <div className={style.email}>{myData.email}</div>
        </div>
      </div>
      <div className={style.todayDiary}>
        <div className={style.title}>
          오늘 내가 작성한 <span className={style.highlight}>개발 일지</span>
        </div>
        <div className={style.cardList}></div>
      </div>
    </div>
  );
}

export default My;
