import { parseCssModule } from "@/utils/css";

import Navbar from "@/components/Navbar";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function NotFound({ text }: { text: string }) {
  return (
    <>
      <Navbar/>

      <div className={getClassName("not-found")}>
        <h2 className={getClassName("text")}>{ text }</h2>
      </div>
    </>
  );
}

// TODO: make this better

export default NotFound;
