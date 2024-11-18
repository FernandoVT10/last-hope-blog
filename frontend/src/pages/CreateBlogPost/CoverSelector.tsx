import { useState } from "react";
import { ImageIcon } from "@/icons";
import { parseCssModule } from "@/utils/css";

import Notifications from "@/Notifications";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function readImageAsURL(image: File): Promise<string> {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject();
    };

    reader.readAsDataURL(image);
  });
}

type CoverSelectorProps = {
  setCover: (cover: File) => void;
};

function CoverSelector(props: CoverSelectorProps) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if(!e.target.files)
      return;

    const file = e.target.files[0];

    if(!file.type.startsWith("image/"))
      return Notifications.error("You must select a valid image");

    try {
      const imageUrl = await readImageAsURL(file);
      setPreviewImage(imageUrl);

      props.setCover(file);
    } catch {
      Notifications.error("Error trying to load the image");
    }
  };

  const getSelector = () => {
    if(!previewImage) {
      return (
        <label htmlFor="cover-input">
          <div className={getClassName("no-preview")}>
            Click to upload an image
          </div>
        </label>
      );
    }

    return (
      <div>
        <img
          src={previewImage}
          alt="Cover"
          className={getClassName("cover-preview")}
        />

        <label htmlFor="cover-input" className={getClassName("change-cover-label")}>
          <ImageIcon size={16} className={getClassName("icon")}/>
          Change Cover
        </label>
      </div>
    );
  };

  return (
    <div className={getClassName("cover-selector")}>
      <input
        id="cover-input"
        type="file"
        accept="image/*"
        className={getClassName("cover-input")}
        onChange={handleInput}
      />

      {getSelector()}
    </div>
  );
}

export default CoverSelector;
