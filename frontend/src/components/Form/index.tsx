import { parseCssModule } from "@/utils/css";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

type InputProps = {
  onChange: (value: string) => void;
  type: string;
  value: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
};

export function Input(props: InputProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <input
      type={props.type}
      className={getClassName("input", props.className)}
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleOnChange}
      required={props.required || false}
      disabled={props.disabled}
      name={props.name}
      id={props.id}
    />
  );
}

type TextAreaProps = {
  onChange: (value: string) => void;
  value: string;
  maxLength: number;
  className?: string;
  required?: boolean;
};

export function TextArea(props: TextAreaProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <div className={getClassName("textarea-container")}>
      <span className={getClassName("limit-info")}>
        {`${props.value.length}/${props.maxLength}`}
      </span>

      <textarea
        className={getClassName("textarea", props.className)}
        value={props.value}
        onChange={handleOnChange}
        maxLength={props.maxLength}
        required={props.required}
      ></textarea>
    </div>
  );
}

type ButtonProps = {
  type: "button" | "submit";
  children: React.ReactNode[] | React.ReactNode | string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      className={getClassName("button", props.className)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
