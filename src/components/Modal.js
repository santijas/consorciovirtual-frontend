import { Modal } from '@material-ui/core';

export const ModalComponent = ({openModal, bodyModal, handleCloseModal } ) =>{

    return (
        <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
    >
        {bodyModal}
    </Modal>
    )
  }