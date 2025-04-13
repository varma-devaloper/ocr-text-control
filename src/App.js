import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/extract-text', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setExtractedText(data.text);
    } catch (error) {
      console.error('Error:', error);
      setExtractedText('Failed to extract text.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>OCR Text Extractor</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload & Extract</button>
      {extractedText && (
        <div style={{ marginTop: '20px' }}>
          <h2>Extracted Text:</h2>
          <pre>{extractedText}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
