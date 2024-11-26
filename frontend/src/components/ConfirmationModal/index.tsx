import Modal, { UseModalReturn } from "../Modal";

import { Button } from "../Form";
import { parseCssModule } from "@/utils/css";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

type ConfirmationModalProps = {
  modal: UseModalReturn;
  loading: boolean;
  onConfirmation: Function;
  deleteBtnText: string;
  modalTitle: string;
};

function ConfirmationModal(props: ConfirmationModalProps) {
  return (
    <Modal title={props.modalTitle} modal={props.modal} maxWidth={400}>
      <div className={getClassName("confirmation-modal")}>
        <Button
          type="button"
          className={getClassName("btn")}
          style="secondary"
          onClick={props.modal.hide}
          disabled={props.loading}
        >
          Cancel
        </Button>

        <Button
          type="button"
          className={getClassName("btn")}
          style="danger"
          onClick={() => props.onConfirmation()}
          disabled={props.loading}
        >
          {props.deleteBtnText}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
