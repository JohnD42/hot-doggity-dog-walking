import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const SignupUser = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const requiredFields = ["email", "password", "confirmPassword", "first_name", "last_name"];

    if (formData.password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    let result = await actions.signup(formData);

    if (result) {
      const destination = result ? "/" : "/signup";
      navigate(destination);
      setFormData({
        email: "",
        password: "",
        first_name: "",
        last_name: ""
      });
      setConfirmPassword(""); // Reset confirmPassword as well
    }
  };


  
  


  return (
    <div className="signupPage urlBackgroundSignup">

   
      

      <div className="signupPage">
        <div className="beigeBox">
          <h2>Sign Up</h2>
          <div className="signupBox">
            <label>First name</label>
            <input
              type="first_name"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <label htmlFor="last_name">Last Name</label>
            <input
              type="last_name"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Confirm Password</label>
            <input
               type="password"
               id="confirmPassword"
               name="confirmPassword"
               value={confirmPassword}  // Use confirmPassword here instead of formData.confirmPassword
               onChange={handleConfirmPasswordChange}  // Correct event handler
               required
            />
        

            <div className="signupSubmitButton">
              <button type="submit" onClick={() => handleSubmit()} className=" btn btn-primary signupButton">
                Submit
              </button>
            </div>
          </div>
        </div>
        <img
        src="https://cdn.pixabay.com/photo/2018/07/13/10/20/kittens-3535404_1280.jpg"
        alt="Banner Image"
        className="bannerImage"
      />
      </div>
    </div>
  );
};
