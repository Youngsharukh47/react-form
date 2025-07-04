// src/index.js
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TablePage from "./pages/table";
import "./index.css";

function MyForm() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    age: "",
    email: "",
    phone: "",
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setInputs((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const result = await response.json();
      alert("Form submitted successfully ✅");

      const mappedResult = {
      firstName: result.first_name,
      lastName: result.last_name,
      dob: result.dob,
      age: result.age,
      email: result.email,
      phone: result.phone,
    };

      setSubmittedData((prev) => [...prev, mappedResult]);
      setInputs({
        firstName: "",
        lastName: "",
        dob: "",
        age: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      alert("Submission failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={inputs.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={inputs.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={inputs.dob}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={inputs.age}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email Address:
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Phone Number:
          <PhoneInput
            country={"ke"}
            onlyCountries={["ke", "ug", "tz", "rw", "bi", "ss", "et", "so"]}
            value={inputs.phone}
            onChange={handlePhoneChange}
            dropdownStyle={{ maxHeight: "150px", overflow: "auto" }}
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>

      <hr />

      <h2>Submitted Data Table</h2>
      {submittedData.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>{new Date(entry.dob).toISOString().split("T")[0]}</td> {/* ✅ Fixes DOB display */}
                <td>{entry.age}</td>
                <td>{entry.email}</td>
                <td>{entry.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <Link to="/table">Welcome Page</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyForm />} />
        <Route path="/table" element={<TablePage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
