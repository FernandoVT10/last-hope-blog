import { useMemo } from "react";
import { parseCssModule } from "@/utils/css";

import markdownIt from "markdown-it";

import styles from "./styles.module.scss";

const md = markdownIt();

const getClassName = parseCssModule(styles);

function MarkdownRenderer({ markdown }: { markdown: string }) {
  const parsedMD = useMemo(() => {
    const html = md.render(markdown);
    return html;
  }, [markdown]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: parsedMD }}
      className={getClassName("markdown-renderer")}
    ></div>
  );
}

export default MarkdownRenderer;
