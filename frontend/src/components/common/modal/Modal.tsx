import style from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  title: React.ReactNode;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancleText?: string;
}

function Modal({
  title,
  content,
  onClose,
  onConfirm,
  confirmText = '확인',
  cancleText = '취소',
}: ModalProps) {
  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.content}>{content}</p>
        <div className={style.actions}>
          <button className={style.cancle} onClick={() => onClose}>
            {cancleText}
          </button>
          <button className={style.confirm} onClick={() => onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
