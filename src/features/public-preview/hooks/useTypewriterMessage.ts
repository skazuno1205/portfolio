import { useEffect, useState } from "react";

export function useTypewriterMessage(messages: string[]) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (messages.length === 0 || typeof window === "undefined") {
      return;
    }

    const currentMessage = messages[messageIndex] ?? "";
    let isDisposed = false;

    const timeoutId = window.setTimeout(
      () => {
        if (isDisposed || typeof window === "undefined") {
          return;
        }

        if (charIndex < currentMessage.length) {
          setCharIndex((current) => current + 1);
          return;
        }

        setMessageIndex((current) => (current + 1) % messages.length);
        setCharIndex(0);
      },
      charIndex < currentMessage.length ? 36 : 1200,
    );

    return () => {
      isDisposed = true;
      window.clearTimeout(timeoutId);
    };
  }, [charIndex, messageIndex, messages]);

  return messages[messageIndex]?.slice(0, charIndex) ?? "";
}
