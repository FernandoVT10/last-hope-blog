import { useMemo } from "react";
import { parseCssModule } from "@/utils/css";

import markdownIt from "markdown-it";

import styles from "./styles.module.scss";

const md = markdownIt({
  highlight: (str, lang) => {
    const prism = window.Prism;
    if(lang && prism.languages[lang]) {
      return `<pre class="code-block"><code class="language-${lang}">${prism.highlight(str, prism.languages[lang])}</code></pre>`;
    }

    return `<pre class="code-block"><code class="language-${lang}">${str}</code></pre>`;
  },
});

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
