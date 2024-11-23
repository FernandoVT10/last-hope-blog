import { parseCssModule } from "@/utils/css";

import Navbar from "@/components/Navbar";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function Page404() {
  return (
    <>
      <Navbar/>

      <div className={getClassName("page-404")}>
        <h1 className={getClassName("code")}>404</h1>
        <h2 className={getClassName("text")}>Page Not Found</h2>
      </div>
    </>
  );
}

export default Page404;
