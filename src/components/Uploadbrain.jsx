import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Uploadbrain = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [predictionMessage, setPredictionMessage] = useState('');
  const [predictionURL, setPredictionURL] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        window.alert('Please select a file');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      // Initialize progress bar and reset prediction message
      setUploadProgress(0);
      setPredictionMessage('');

      // Upload the file to the FastAPI endpoint with progress tracking
      const response = await fetch('http://localhost:8000/uploadbrainfile/', {
        method: 'POST',
        body: formData,
        // Track upload progress
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      // Reset progress after upload
      setUploadProgress(0);

      // Show success notification
      toast.success('File uploaded successfully!', { autoClose: 3000 });

      // You can add additional logic here if needed

    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file. Please try again.', { autoClose: 3000 });
    }
  };
  const handlePredict = async () => {
    try {
      // Show a loading notification
      toast.info('Running prediction. Please wait...', { autoClose: false });

      // Trigger the prediction endpoint in FastAPI
      const response = await axios.get('http://localhost:8000/get_brain_obj_file');

      // Hide the loading notification
      toast.dismiss();

      // Set the URL received from FastAPI
      setPredictionURL(response.config.url);

      // Show success notification
      toast.success('Prediction complete!', { autoClose: 3000 });
    } catch (error) {
      console.error('Error predicting:', error);

      // Hide the loading notification
      toast.dismiss();

      // Show error notification
      toast.error('Error predicting. Please try again.', { autoClose: 3000 });
    }
  };

  return (
    <div style={styles.mainContainer}>
      <h1 style={styles.heading}>Select a BRAIN file</h1>
      <input type="file" onChange={handleFileChange} style={styles.fileInput} />
      <button onClick={handleUpload} style={styles.uploadButton}>
        Upload
      </button>
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" style={styles.progressBar} />}
      <button onClick={handlePredict} style={styles.predictButton}>
        Predict
      </button>
      {predictionURL && (
        <div>
          <p style={styles.predictionText}>Prediction URL:</p>
          <a href={predictionURL} target="_blank" rel="noopener noreferrer" style={styles.link}>
            {predictionURL}
          </a>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
  },
  heading: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  fileInput: {
    marginBottom: '20px',
  },
  uploadButton: {
    padding: '10px 30px',
    fontSize: '1.2em',
    textDecoration: 'none',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '10px',

    ':hover': {
      backgroundColor: '#2980b9',
    },
  },
  progressBar: {
    width: '100%',
    marginBottom: '20px',
  },
  predictButton: {
    padding: '10px 30px',
    fontSize: '1.2em',
    textDecoration: 'none',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  predictionText: {
    fontSize: '1.2em',
    marginTop: '20px',
  },
  link: {
    display: 'block',
    fontSize: '1.2em',
    marginTop: '10px',
    textDecoration: 'underline',
  },
};

export default Uploadbrain;