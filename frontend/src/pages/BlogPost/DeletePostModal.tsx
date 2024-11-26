import { useState } from "react";
import { Button } from "@/components/Form";
import { parseCssModule } from "@/utils/css";

import Modal, { UseModalReturn } from "@/components/Modal";

import styles from "./styles.module.scss";
import Notifications from "@/Notifications";
import api from "@/api";

const getClassName = parseCssModule(styles);

type DeletePostModalProps = {
  modal: UseModalReturn;
  blogPostId: number;
};

// TODO: replace this component with the confirmation modal
function DeletePostModal({ modal, blogPostId }: DeletePostModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDeletion = async () => {
    setLoading(true);

    const notificationId = Notifications.loading("Deleting Post...");

    await new Promise(res => setTimeout(res, 1000));

    try {
      await api.deleteBlogPost(blogPostId);
      window.location.assign("/");
    } catch(e) {
      console.error(e);
      Notifications.error("Error trying to delete the post");
    }

    Notifications.remove(notificationId);

    setLoading(false);
  };

  return (
    <Modal title="Delete Post Confirmation" modal={modal} maxWidth={400}>
      <div className={getClassName("delete-post-modal")}>
        <Button
          type="button"
          className={getClassName("btn")}
          style="secondary"
          onClick={modal.hide}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          type="button"
          className={getClassName("btn")}
          style="danger"
          onClick={handleDeletion}
          disabled={loading}
        >
          Delete Post
        </Button>
      </div>
    </Modal>
  );
}

export default DeletePostModal;
