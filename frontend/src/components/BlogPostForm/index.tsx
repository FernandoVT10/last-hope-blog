import { useState } from "react";
import { parseCssModule } from "@/utils/css";
import { Input, Button, Label } from "../Form";

import MarkdownRenderer from "../MarkdownRenderer";
import Notifications from "@/Notifications";
import api from "@/api";

import styles from "./styles.module.scss";

const MAX_CONTENT_LENGTH = 5000;

const getClassName = parseCssModule(styles);

type InputFileHandler = React.ChangeEventHandler<HTMLInputElement>;

function ImageUploader({ hide }: { hide: boolean }) {
  const [imagesUploaded, setImagesUploaded] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onImageChange: InputFileHandler = async (e) => {
    if(!e.target.files) return;

    const file = e.target.files[0];

    if(!file) return;

    setLoading(true);
    try {
      const uploadedImage = await api.uploadImage(file);
      setImagesUploaded([uploadedImage, ...imagesUploaded]);
    } catch(e) {
      Notifications.error("There was an error trying to upload the image");
      console.error(e);
    }
    setLoading(false);
  };

  const addTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    Notifications.success("Copied image link!");
  };

  const getImagesUploaded = () => {
    if(!imagesUploaded.length) return;

    return (
      <ul className={getClassName("images")}>
        {imagesUploaded.map(imageURL => {
          return (
            <li className={getClassName("image")}>
              <button
                type="button"
                className={getClassName("button")}
                onClick={() => addTextToClipboard(imageURL)}
              >
                {imageURL}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  if(hide) return null;

  return (
    <div className={getClassName("image-uploader")}>
      <input
        type="file"
        accept="images/*"
        onChange={onImageChange}
        id="upload-image-input"
        disabled={loading}
        className={getClassName("input")}
      />

      <label
        htmlFor="upload-image-input"
        className={getClassName("label", { loading })}
      >
        {loading ? "Uploading your file..." : "Click to upload an image"}
      </label>

      {getImagesUploaded()}
    </div>
  );
}

type TextAreaHandler = React.ChangeEventHandler<HTMLTextAreaElement>;

type ContentEditorProps = {
  setContent: (content: string) => void;
  content: string;
};

function ContentEditor(props: ContentEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  const handleTextarea: TextAreaHandler = (e) => {
    props.setContent(e.target.value);
  };

  return (
    <div className={getClassName("content-editor")}>
      <div className={getClassName("options")}>
        <button
          type="button"
          className={getClassName("option", { active: !showPreview })}
          onClick={() => setShowPreview(false)}
        >
          Editor
        </button>

        <button
          type="button"
          className={getClassName("option", { active: showPreview })}
          onClick={() => setShowPreview(true)}
        >
          Preview
        </button>
      </div>

      {showPreview ? (
        <div className={getClassName("preview-container")}>
          <MarkdownRenderer markdown={props.content}/>
        </div>
      ) : (
        <textarea
          id="content-textarea"
          value={props.content}
          onChange={handleTextarea}
          maxLength={MAX_CONTENT_LENGTH}
          className={getClassName("textarea")}
          required
        ></textarea>
      )}

      {/* We're hiding this instead of doing conditional rendering because,
        we need its state to survive between editing and previewing */}
      <ImageUploader hide={showPreview}/>
    </div>
  );
}

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
          <Label htmlFor="title-input">
            Title
          </Label>
          <Input
            id="title-input"
            type="text"
            name="title"
            value={props.data.title}
            onChange={(v) => props.onChange(v, "title")}
            placeholder="Write an inspiring title"
            required
          />
        </div>

        <ContentEditor
          setContent={(v) => props.onChange(v, "content")}
          content={props.data.content}
        />

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
