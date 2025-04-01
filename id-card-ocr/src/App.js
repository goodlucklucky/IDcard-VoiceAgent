import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { extractText } from './services/ocrService';
import { initVoice, speak } from './services/voiceService';

export default function App() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '',
    spouseFirstName: '', spouseLastName: '', spouseDob: ''
  });
  const [recognition, setRecognition] = useState(null);
  const [active, setActive] = useState(false);
  const [convo, setConvo] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxSize: 100000,
    onDrop: async ([file]) => {
      try {
        const data = await extractText(file);
        setForm(f => ({ ...f, ...data }));
        speak(`Found ${data.firstName} ${data.lastName}, born ${data.dob}. Is this correct?`);
      } catch (err) {
        speak("Sorry, I couldn't read that ID");
      }
    }
  });

  useEffect(() => {
    const voice = initVoice();
    if (voice) {
      voice.onresult = (e) => {
        const transcript = e.results[e.results.length-1][0].transcript;
        if (transcript.includes("yes")) {
          speak("Great! Let's continue");
        } else if (transcript.includes("no")) {
          speak("What should it say instead?");
        }
      };
      setRecognition(voice);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <div {...getRootProps()} className="border-2 border-dashed p-8 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p>Upload ID Photo (JPEG/PNG)</p>
      </div>

      <div className="mt-6 space-y-4">
        <input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}
          className="w-full p-2 border rounded" placeholder="First Name" />
        <input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}
          className="w-full p-2 border rounded" placeholder="Last Name" />
        <input value={form.dob} onChange={e => setForm({...form, dob: e.target.value})}
          className="w-full p-2 border rounded" placeholder="MM/DD/YYYY" />
      </div>

      {active && recognition && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
          <button onClick={() => recognition.start()} className="bg-blue-500 text-white p-2 rounded">
            Start Voice
          </button>
        </div>
      )}
    </div>
  );
}
