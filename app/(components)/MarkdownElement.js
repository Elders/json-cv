import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import styles from '@/app/(styles)/markdown.module.scss';

export default function MarkdownElement({
  markdownContent,
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
    <div className="flex">
      <div className="grow">
        {isPreview ? (
          <ReactMarkdown className={styles.markdown}>
            {markdownContent}
          </ReactMarkdown>
        ) : (
          children
        )}
      </div>

      <div className="ml-3 pointer">
        {isPreview ? (
          <EyeOff onClick={() => setIsPreview(false)} />
        ) : (
          <Eye onClick={() => setIsPreview(true)} />
        )}
      </div>
    </div>
  );
}
