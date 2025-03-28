import axios from 'axios';

export const transcribeAudio = async (audioBlob) => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.webm');
  formData.append('model', 'whisper-1');
  formData.append('language', 'en');

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data.text;
  } catch (error) {
    console.error('Whisper API Error:', error);
    throw new Error('Failed to transcribe audio');
  }
};

export const recordAudio = () => {
  return new Promise(async (resolve) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener('dataavailable', (event) => {
      audioChunks.push(event.data);
    });

    const start = () => {
      audioChunks.length = 0;
      mediaRecorder.start();
    };

    const stop = () => {
      return new Promise((resolve) => {
        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          resolve({ audioBlob, audioUrl });
        });

        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
      });
    };

    resolve({ start, stop });
  });
};
