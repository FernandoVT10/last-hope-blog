import { useState } from "react";
import { parseCssModule } from "@/utils/css";
import { Input, TextArea, Button } from "../Form";
import { ImageIcon } from "@/icons";

import Notifications from "@/Notifications";

import styles from "./styles.module.scss";

const MAX_CONTENT_LENGTH = 5000;

const getClassName = parseCssModule(styles);

type MainFormProps = {
  onSubmit: React.FormEventHandler;
  data: {
    title: string;
    content: string;
  };
  onChange: (value: string, name: string) => void;
  loading: boolean;
  btnText: string;
};

export function MainForm(props: MainFormProps) {
  return (
    <div className={getClassName("main-form")}>
      <form onSubmit={props.onSubmit}>
        <div className={getClassName("input-group")}>
          <label
            className={getClassName("label")}
            htmlFor="cover-title"
          >
            Title
          </label>
          <Input
            id="cover-title"
            type="text"
            name="title"
            value={props.data.title}
            onChange={(v) => props.onChange(v, "title")}
            placeholder="Write an inspiring title"
            required
          />
        </div>

        <div className={getClassName("input-group")}>
          <label
            className={getClassName("label")}
            htmlFor="cover-content"
          >
            Content
          </label>
          <TextArea
            value={props.data.content}
            onChange={(v) => props.onChange(v, "content")}
            maxLength={MAX_CONTENT_LENGTH}
            required
          />
        </div>

        <div className={getClassName("btn-container")}>
          <Button
            type="submit"
            disabled={props.loading}
          >
            {props.btnText}
          </Button>
        </div>
      </form>
    </div>
  );
}

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
  initialPreviewImage?: string;
};

export function CoverSelector(props: CoverSelectorProps) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(props.initialPreviewImage);

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
