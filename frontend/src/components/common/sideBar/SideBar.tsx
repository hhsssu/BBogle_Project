import style from './SideBar.module.css';
import MainIcon from '../../../assets/image/icon/main.svg';
import useSideBarStore from '../../../store/useSideBarStore';

function SideBar () {
  const {isOpen, toggleSideBar, activeTab, setActiveTab} = useSideBarStore();

  return (
    <div className={`${style['sidebar-container']} ${isOpen ? style.open : style.closed}`}>
      <button className={style.toggleButton} onClick={toggleSideBar}>닫기</button>
      <div className={style.content}>
        <img src={MainIcon} alt="Main Icon" />
      </div>
    </div>
  )
}

export default SideBar;