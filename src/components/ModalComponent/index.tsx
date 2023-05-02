import { ModalType } from "../../interfaces/modal-type.interface";
import style from './ModalComponent.module.scss';

const ModalComponent = (props: ModalType) => {
    return (
        <>
          {props.isOpen && (
            <div className={style['modal-wrapper']} onClick={props.toggle}>
              <div onClick={(e) => e.stopPropagation()} className={style['modal-box']}>
                {props.children}
              </div>
            </div>
          )}
        </>
    );
}

export default ModalComponent