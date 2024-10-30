import style from './SideBar.module.css';
import MainIcon from '../../../assets/image/icon/main.svg';

function SideBar () {
  return (
    <div className={style['sidebar-container']}>
      <img src={MainIcon} alt="Main Icon" />
    </div>
  )
}

export default SideBar;