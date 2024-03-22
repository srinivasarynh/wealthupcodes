"use client"; 
import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation'
import './CodeVerifier.css'
import axios from 'axios';


export default function Home() {
  const [code, setCode] = useState('');  
  const [generatedCode, setGeneratedCode] = useState('87uy7');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const refreshCode = async () => {
    try {
      const response = await axios.get('https://wealthupapi.onrender.com/api/codes');
      setGeneratedCode(response.data.code);
    } catch (error) {
      console.error('Error refreshing code:', error);
    }
  };

  useEffect(() => {
    refreshCode(); 
  }, []); 

  const submitCode = async () => {
    try {
      if(code !== "") {
        const response = await axios.post('https://wealthupapi.onrender.com/api/codes/use', { code });
        setMessage(response.data.message);
        if (response.data.message === 'Code is correct') {
          // Navigate to another page after 1 seconds
          setTimeout(() => {
            router.push('/codetable');
          }, 1000);
        }
      }

      // Check if the code is correct
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="code-verifier-container">
      <div className="code-display"><p className="code-color">Code: {generatedCode}</p></div>
      <button className="button" onClick={refreshCode}>Refresh</button>
      <div>
        <input
          className="input-field"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
        />
        <button className="button" onClick={submitCode}>Submit</button>
      </div>
      <div className="message">{message && <p>{message}</p>}</div>
      <div className="error">{error && <p>{error}</p>}</div>
    </div>
  );
}
