import { useEffect, useRef, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import S from './GuideContents.styled';
import { useI18n } from '../../assets/i18n';

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);
  const { tf } = useI18n();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopyCode = () => {
    if (copied) return;

    const markCopied = () => {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1800);
    };

    const fallbackCopy = () => {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      markCopied();
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(markCopied).catch(fallbackCopy);
      return;
    }
    fallbackCopy();
  };

  return (
    <S.CodeBlock>
      <div className='header-wrap'>
        <div className='dot-wrap'>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div>
        <button
          type='button'
          className={`copy-button${copied ? ' is-copied' : ''}`}
          onClick={handleCopyCode}
          aria-label={copied ? tf('복사됨', 'Copied') : tf('복사하기', 'Copy')}
        >
          {copied ? tf('복사됨', 'Copied') : tf('복사하기', 'Copy')}
        </button>
      </div>

      <SyntaxHighlighter
        className='block'
        language='python'
        useInlineStyles={false}
      >
        {code}
      </SyntaxHighlighter>
    </S.CodeBlock>
  );
};

export default CodeBlock;
