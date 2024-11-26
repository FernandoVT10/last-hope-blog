import { useState } from "react";

import { UseModalReturn } from "@/components/Modal";

import Notifications from "@/Notifications";
import api from "@/api";
import ConfirmationModal from "@/components/ConfirmationModal";

type DeletePostModalProps = {
  modal: UseModalReturn;
  blogPostId: number;
};

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
    <ConfirmationModal
      modal={modal}
      loading={loading}
      onConfirmation={handleDeletion}
      deleteBtnText="Delete Post"
      modalTitle="Delete Post Confirmation"
    />
  );
}

export default DeletePostModal;
