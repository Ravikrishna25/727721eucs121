
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    clientID: '750128fe-e773-48be-9f7b-b0ec2e6f2b16',
    clientSecret: 'bZsVcrojCprvjKyy',
    ownerName: '',
    ownerEmail: '',
    rollNo: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/hit-url', formData);

      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company Name:
        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
      </label>
      <label>
        Owner Name:
        <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required />
      </label>
      <label>
        Owner Email:
        <input type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} required />
      </label>
      <label>
        Roll No:
        <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
