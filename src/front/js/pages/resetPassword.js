import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleResetPassword = () => {
    if (!password || !confirmPassword || !token) {
      setError('Please fill out all the fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match...');
      return;
    }
    actions.resetPassword(token, password)
      .then(response => {
        setPassword('');
        setConfirmPassword('');
        setToken('');
        setError('');
        alert ("Your password updated successfully");
        navigate("/");
      })
      .catch(error => {
        console.log("Erro", error);

      });
  };

  return (
    <div className="align-items-center vh-100">
      <div className="text-center justify-content-center login container">

        <h2>Reset Password</h2>

        <input
          className="input mb-2 mt-1 form-control m-auto "
          type="hidden"
          placeholder="Paste the token, that you received by email"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />

        <input
          className="input mb-2 mt-1 form-control"
          type="password"
          placeholder="New password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <input
          className="input mb-2 mt-1 form-control"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={handleResetPassword}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};