import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { extractIDInfo } from './services/ocrService';
import VoiceAssistant from './components/VoiceAssistant';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    spouseFirstName: '',
    spouseLastName: '',
    spouseDob: ''
  });
  const [showAssistant, setShowAssistant] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async files => {
      const data = await extractIDInfo(files[0]);
      setFormData({ ...formData, ...data });
    }
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Upload Section */}
      <div {...getRootProps()} className="border-2 border-dashed p-8 text-center">
        <input {...getInputProps()} />
        <p>Drag & drop ID image here</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 mt-8">
        <input
          value={formData.firstName}
          onChange={e => setFormData({...formData, firstName: e.target.value})}
          className="w-full p-2 border"
          placeholder="First Name"
        />
        {/* Add other fields similarly */}
      </div>

      {showAssistant && <VoiceAssistant formData={formData} onUpdate={setFormData} />}
    </div>
  );
}
