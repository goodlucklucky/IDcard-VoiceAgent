import { useEffect, useState } from 'react';
import axios from 'axios';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const startListening = async () => {
    try {
      // First check microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());

      setIsListening(true);
      setError(null);

      // Here you would normally start recording and send to Whisper API
      // For demo, we'll simulate it
      console.log("Starting recording...");

    } catch (err) {
      console.error("Microphone error:", err);
      setError(err.message);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    console.log("Stopping recording...");

    // Simulate sending to Whisper API
    try {
      // In real implementation, you would:
      // 1. Stop recording
      // 2. Send audio to Whisper API
      // 3. Set transcript from response

      // Mock API call
      const mockResponse = { data: { text: "This is a mock transcript" } };
      setTranscript(mockResponse.data.text);
    } catch (err) {
      setError("Failed to transcribe audio");
    }
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return {
    transcript,
    isListening,
    error,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition: true
  };
};
