import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // required for phone input styling
import TablePage from "./pages/table"; //to the table page
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData((prev) => [...prev, inputs]);
    setInputs({
      firstName: "",
      lastName: "",
      dob: "",
      age: "",
      email: "",
      phone: "",
    });
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
                <td>{entry.dob}</td>
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
