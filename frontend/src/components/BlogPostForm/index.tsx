import { parseCssModule } from "@/utils/css";
import { Input, TextArea, Button } from "../Form";

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

// TODO: replace labels with Form's Label component
