import { parseCssModule } from "@/utils/css";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function NotFound({ text }: { text: string }) {
  return (
    <div className={getClassName("not-found")}>
      <h1>{ text }</h1>
    </div>
  );
}

// TODO: make this better

export default NotFound;
