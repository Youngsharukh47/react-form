// pages/table.js
import React from 'react';
import { Link } from 'react-router-dom';

function TablePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Welcome Page</h1>
      <p>This is a simple redirected page from the form.</p>
      <Link to="/">Back to Form</Link>
    </div>
  );
}

export default TablePage;
