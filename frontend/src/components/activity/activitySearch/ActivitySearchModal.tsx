import style from '../../common/modal/Modal.module.css';
import ActivityStyles from '../Activity.module.css';
import ActivitySearchStyles from './ActivitySearch.module.css';

import CloseIcon from '../../../assets/image/icon/Close.svg';
import SearchIcon from '../../../assets/image/icon/Search.svg';

interface ModalProps {
  isOpen: boolean;
  title: React.ReactNode;
  onClose?: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancleText?: string;
}

function ActivitySearchModal({
  isOpen,
  title,
  onClose,
  onConfirm,
  confirmText = '검색',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={onClose}>
      <div
        className={`${style.container} ${ActivityStyles.relative}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={ActivityStyles.title}>{title}</h2>
        <button onClick={onClose} className={ActivityStyles.closebtn}>
          <img src={CloseIcon} alt="닫기" />
        </button>
        <form>
          <div className={ActivityStyles.search}>
            <img src={SearchIcon} alt="검색" />
            <input
              type="text"
              placeholder="키워드, 내용으로 검색"
              className={ActivitySearchStyles.text}
            ></input>
          </div>
          <section className={ActivitySearchStyles.outbox}>
            <div className={ActivitySearchStyles.categorybox}>
              <h2 className={ActivityStyles.subtitle}>나의 프로젝트</h2>
              <div className={ActivitySearchStyles.list}>
                <div className={ActivitySearchStyles.checkbox}>
                  <input type="checkbox" id="RunnerWay" />
                  <label htmlFor="RunnerWay">RunnerWay</label>
                </div>
                <div className={ActivitySearchStyles.checkbox}>
                  <input type="checkbox" id="RunnerWay" />
                  <label htmlFor="RunnerWay">RunnerWay</label>
                </div>
                <div className={ActivitySearchStyles.checkbox}>
                  <input type="checkbox" id="RunnerWay" />
                  <label htmlFor="RunnerWay">RunnerWay</label>
                </div>
              </div>
            </div>
            <div className={ActivitySearchStyles.categorybox}>
              <h2 className={ActivityStyles.subtitle}>기술 키워드</h2>
              <div
                className={`${ActivitySearchStyles.list} ${ActivitySearchStyles.border}`}
              >
                <div className={ActivitySearchStyles.checkbox}>
                  <input type="checkbox" id="RunnerWay" />
                  <label htmlFor="RunnerWay">RunnerWay</label>
                </div>
                <div className={ActivitySearchStyles.checkbox}>
                  <input type="checkbox" id="RunnerWay" />
                  <label htmlFor="RunnerWay">RunnerWay</label>
                </div>
                <div className={ActivitySearchStyles.checkbox}>
                  <input type="checkbox" id="RunnerWay" />
                  <label htmlFor="RunnerWay">RunnerWay</label>
                </div>
              </div>
            </div>
            <div className={ActivitySearchStyles.categorybox}>
              <h2 className={ActivityStyles.subtitle}>인성 키워드</h2>
              <div className={ActivitySearchStyles.list}>
                <div className={ActivitySearchStyles.checkbox}>
                  <input type="checkbox" id="RunnerWay" />
                  <label htmlFor="RunnerWay">RunnerWay</label>
                </div>
                <div className={ActivitySearchStyles.checkbox}>
                  <input type="checkbox" id="RunnerWay" />
                  <label htmlFor="RunnerWay">RunnerWay</label>
                </div>
                <div className={ActivitySearchStyles.checkbox}>
                  <input type="checkbox" id="RunnerWay" />
                  <label htmlFor="RunnerWay">RunnerWay</label>
                </div>
              </div>
            </div>
          </section>

          <div className={style.actions}>
            <button className={ActivityStyles.btn} onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivitySearchModal;
