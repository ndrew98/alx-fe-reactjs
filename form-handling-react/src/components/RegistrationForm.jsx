// src/components/RegistrationForm.jsx
import React, { useState } from "react";

const RegistrationForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Destructure formData for easier access
  const { username, email, password } = formData;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("All fields are required!");
      return;
    }
    // Simulate API call
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username} // Directly use the destructured variable
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email} // Directly use the destructured variable
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password} // Directly use the destructured variable
          onChange={handleChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
