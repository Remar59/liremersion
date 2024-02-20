import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';
import { Button, message, Space } from 'antd';

import "../styles/login.scss";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // User Login info
  const database = [
    {
      username: "Flo",
      password: "Flo123"
    },
    {
      username: "Rem",
      password: "Rem123"
    }
  ];

  const errors = {
    uname: "Utilisateur introuvable",
    pass: "Mot de passe invalide"
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    const { uname, pass } = document.forms[0];
    

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        navigate('/');
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom d'utilisateur </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="form-group">
          <label>Mot de passe </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <button type="submit">Se connecter</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="title">Connexion</div>
        {isSubmitted ? <div>Vous êtes connecté !</div> : renderForm}
      </div>
    </div>
  );
}

export default App;