import { useEffect, useState } from 'react';
import { speak } from '../services/voiceService';

export const VoiceAssistant = ({ active, onClose, formData, onUpdate }) => {
  const [conversation, setConversation] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (active) startConversation();
  }, [active]);

  const startConversation = () => {
    addMessage("Welcome, I am Nina. I will help you fill the insurance registration.", 'agent');
    setTimeout(() => verifyID(), 2000);
  };

  const verifyID = () => {
    addMessage(`Your details: ${formData.firstName} ${formData.lastName}, DOB: ${formData.dob}. Is this correct?`, 'agent');
    setListening(true);
  };

  const handleCommand = (transcript) => {
    if (transcript.toLowerCase().includes('yes')) {
      addMessage("Great! Let's proceed.", 'agent');
      // Proceed to next steps
    } else {
      handleCorrection(transcript);
    }
  };

  // Add remaining voice logic...

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      {/* Conversation UI */}
    </div>
  );
};
