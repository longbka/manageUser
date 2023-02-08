import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function ModalDelete(props) {
  return (
    <>
      <Modal centered = {props.centered} show={props.show} onHide={props.handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to permanently delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
