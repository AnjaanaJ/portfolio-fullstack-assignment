import { useState, useEffect, useRef } from 'react';

const WORDS = ['Frontend Developer', 'UI Designer', 'Java Developer', 'DevOps Learner'];

export function useTypingEffect() {
  const [text, setText] = useState('');
  const wordIndex = useRef(0);
  const letterIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout;

    function type() {
      const current = WORDS[wordIndex.current];

      if (!deleting.current) {
        letterIndex.current++;
        setText(current.slice(0, letterIndex.current));

        if (letterIndex.current > current.length) {
          deleting.current = true;
          timeout = setTimeout(type, 1200);
          return;
        }
      } else {
        letterIndex.current--;
        setText(current.slice(0, letterIndex.current));

        if (letterIndex.current < 0) {
          deleting.current = false;
          wordIndex.current = (wordIndex.current + 1) % WORDS.length;
          letterIndex.current = 0;
        }
      }

      timeout = setTimeout(type, deleting.current ? 45 : 90);
    }

    timeout = setTimeout(type, 90);
    return () => clearTimeout(timeout);
  }, []);

  return text;
}
