import { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [fileName, setFileName] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: files[0], // Store the file object
      }));
      setFileName(files[0].name);
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      inputs.name === "" ||
      inputs.email === "" ||
      inputs.password === "" ||
      inputs.profile_pic === null
    ) {
      console.log("Error: All fields are required.");
    } else {
      // Use FormData to send the file
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("email", inputs.email);
      formData.append("password", inputs.password);
      formData.append("profile_pic", inputs.profile_pic);

      try {
        const response = await axios.post("http://localhost:8000/api/users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Registration successful:", response.data);
      } catch (error) {
        console.log("Error in admin registration page!", error);
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <div style={{ padding: "25px", borderRadius: "10px", boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.35)" }}>
        <section style={{ display: "flex", justifyContent: "space-between", paddingRight: "20px" }}>
          <h3>Admin Registration</h3>
          <i className="fa-solid fa-user-tie fa-2x"></i>
        </section>
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "10px", marginTop: "10px" }}>
          <input type="text" name="name" value={inputs.name} onChange={handleChange} placeholder="Enter your name" required />
          <input type="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Enter your email" required />
          <input type="password" name="password" value={inputs.password} onChange={handleChange} placeholder="Enter your password" required />
          <div>
            <label htmlFor="profile_pic" style={{ cursor: "pointer" }}>
              {fileName ? "Uploaded" : "Upload Profile"}
            </label>
            <input
              type="file"
              name="profile_pic"
              onChange={handleChange}
              hidden
              id="profile_pic"
              accept=".jpg,.jpeg,.png"
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
