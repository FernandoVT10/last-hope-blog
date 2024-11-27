import { parseCssModule } from "@/utils/css";

import styles from "./styles.module.scss";
import { Input, Label, Button, TextArea } from "../Form";

const MAX_DESCRIPTION_LENGTH = 500;

const getClassName = parseCssModule(styles);

type ProjectFormProps = {
  onSubmit: React.FormEventHandler;
  data: {
    name: string;
    description: string;
    link: string;
  };
  onChange: (val: string, key: string) => void;
  loading: boolean;
  submitBtnText: string;
};

function ProjectForm(props: ProjectFormProps) {
  return (
    <div className={getClassName("project-form")}>
      <form onSubmit={props.onSubmit}>
        <div className={getClassName("input-group")}>
          <Label htmlFor="name-input">Name</Label>
          <Input
            id="name-input"
            type="text"
            name="name"
            value={props.data.name}
            onChange={(v) => props.onChange(v, "name")}
            placeholder="Write an amazing name"
            required
          />
        </div>

        <div className={getClassName("input-group")}>
          <Label htmlFor="description-textarea">Description</Label>
          <TextArea
            id="description-textarea"
            value={props.data.description}
            onChange={(v) => props.onChange(v, "description")}
            maxLength={MAX_DESCRIPTION_LENGTH}
            required
          />
        </div>

        <div className={getClassName("input-group")}>
          <Label htmlFor="link-input">Link</Label>
          <Input
            id="link-input"
            type="url"
            name="name"
            value={props.data.link}
            onChange={(v) => props.onChange(v, "link")}
            placeholder="https://gnu.org"
            required
          />
        </div>

        <div className={getClassName("btn-container")}>
          <Button
            type="submit"
            disabled={props.loading}
          >
            {props.submitBtnText}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
