export const speak = (text, setSpeaking) => {
  return new Promise((resolve) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        resolve();
      };
      utterance.onerror = (error) => {
        console.error("Speech Error:", error);
        setSpeaking(false);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported");
      resolve();
    }
  });
};
