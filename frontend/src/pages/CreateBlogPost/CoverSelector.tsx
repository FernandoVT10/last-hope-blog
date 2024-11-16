import { useState } from "react";
import { ImageIcon } from "@/icons";

import { parseCssModule } from "@/utils/css";

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
// http://localhost:3000/assets/covers/6659-1731708757935.webp

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if(!e.target.files)
      return;

    const file = e.target.files[0];

    if(!file.type.startsWith("image/")) {
      // TODO: Notify this error to the user
      console.error("Selected cover is not a valid image");
      return;
    }

    try {
      const imageUrl = await readImageAsURL(file);
      setPreviewImage(imageUrl);

      props.setCover(file);
    } catch {
      // TODO: Notify this error to the user
      console.error("Error trying to load the image");
    }
  };

  return (
    <div className={getClassName("cover-selector")}>
      <img
        src={previewImage}
        alt="Cover"
        className={getClassName("cover-preview")}
      />

      <input
        id="cover-input"
        type="file"
        accept="image/*"
        className={getClassName("cover-input")}
        onChange={handleInput}
      />

      <label htmlFor="cover-input" className={getClassName("change-cover-btn")}>
        <ImageIcon size={16} className={getClassName("icon")}/>
        Change Cover
      </label>
    </div>
  );
}

export default CoverSelector;
