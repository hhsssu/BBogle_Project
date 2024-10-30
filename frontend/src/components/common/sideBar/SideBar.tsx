import style from './SideBar.module.css';
import useSideBarStore from '../../../store/useSideBarStore';

import LogoSmall from '../../../assets/image/logo/BBO_small.svg';
import LogoLarge from '../../../assets/image/logo/BBOGLE.svg';
import FoldIcon from '../../../assets/image/icon/Fold.svg';
import OutFoldIcon from '../../../assets/image/icon/OutFold.svg';
import MainIcon from '../../../assets/image/icon/Main.svg';

function SideBar () {
  const {isOpen, toggleSideBar, activeTab, setActiveTab} = useSideBarStore();

  return (
    <>
      <div className={`${style['sidebar-container']} ${isOpen ? style.open : style.closed}`}>
        {/* <button className={style['toggle-utton']} onClick={toggleSideBar}>닫기</button> */}
        <div className={style.content}>
          <div className={style.header}>
            {isOpen ? <img className={style['large-logo']} src={LogoLarge} alt="Logo" /> : <img src={LogoSmall} alt="" />}
            {isOpen && <img src={FoldIcon} alt="Fold Icon" onClick={toggleSideBar}/>}
          </div>
          <div className={style.taps}>
            <img src={MainIcon} alt="Main Icon" />
          </div>
        </div>
      </div>
      {!isOpen && <img className={style['fold-button']} src={OutFoldIcon} alt="Fold Icon"  onClick={toggleSideBar}/>}
    </>
  )
}

export default SideBar;