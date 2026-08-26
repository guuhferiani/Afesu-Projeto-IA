import React, { useMemo } from 'react';
import { marked } from 'marked';

// Configura o Marked para tabelas e quebras de linha seguras
marked.setOptions({
  gfm: true,
  breaks: true
});

export default function FormattedMessage({ content }) {
  const htmlContent = useMemo(() => {
    if (!content) return '';
    try {
      return marked.parse(content);
    } catch (err) {
      console.error('Error parsing markdown:', err);
      return content;
    }
  }, [content]);

  return (
    <div
      className="formatted-markdown-body"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
