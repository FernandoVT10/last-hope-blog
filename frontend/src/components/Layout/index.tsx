import { parseCssModule } from "@/utils/css";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

type Children = React.ReactNode;

type PageWrapperProps = {
  children: Children;
  className?: string;
};

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={getClassName("page-wrapper", className)}>
      {children}
    </div>
  );
}
