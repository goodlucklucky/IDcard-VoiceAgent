export const initializeVoice = () => {
  return new Promise((resolve) => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      resolve(recognition);
    } else {
      resolve(null);
    }
  });
};

export const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};
