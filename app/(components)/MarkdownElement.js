import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ReactMarkdown from "react-markdown";
import styles from "@/app/(styles)/markdown.module.scss";

export default function MarkdownElement({
  markdownContent,
  sectionHeading,
  canEdit,
  children,
}) {
  const [isPreview, setIsPreview] = useState(false);

  if (!canEdit) {
    return (
      <ReactMarkdown className={styles.markdown}>
        {markdownContent}
      </ReactMarkdown>
    );
  }

  return (
    <div>
      <div className="pointer flex align-center justify-between">
        <h2 className="my-1">{sectionHeading}</h2>

        {isPreview ? (
          <EyeOff onClick={() => setIsPreview(false)} />
        ) : (
          <Eye onClick={() => setIsPreview(true)} />
        )}
      </div>
      <div className="grow">
        {isPreview ? (
          <ReactMarkdown className={styles.markdown}>
            {markdownContent}
          </ReactMarkdown>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
