"use client"; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CodeTable.css';


const CodeTable = () => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    // Fetch data from API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('https://wealthupapi.onrender.com/api/allcodes');
        setCodes(response.data);
      } catch (error) {
        console.error('Error fetching codes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div  className="table-container">
      <h2>Code Table</h2>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Valid</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => (
            <tr key={code._id}>
              <td>{code.code}</td>
              <td>{code.validCode ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeTable;
