import Modal from 'react-modal';
import s from './ImageModal.module.css';

const ImageModal = ({isOpen, imageUrl, onClose}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName={s.modal_overlay}
            className={s.modal_content}
            contentLabel="Image Modal"
            ariaHideApp={false}
        >
            <img src={imageUrl} alt="Image" className={s.image}/>
        </Modal>
    );
};

export default ImageModal;
