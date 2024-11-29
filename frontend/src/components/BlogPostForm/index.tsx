import { useState } from "react";
import { parseCssModule } from "@/utils/css";
import { Input, Button, Label } from "../Form";

import MarkdownRenderer from "../MarkdownRenderer";

import styles from "./styles.module.scss";

const MAX_CONTENT_LENGTH = 5000;

const getClassName = parseCssModule(styles);

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
