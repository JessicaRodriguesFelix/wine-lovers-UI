import { useState } from "react";
import Google from "../img/google.png";
import Facebook from "../img/facebook.png";

const CLIENT_URL = "http://localhost:3000/store";

const LoginPage = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegistration = async (e: any) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("handleRegistration function called");
    console.log("Form Data:", { username, email, password });

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      console.log("Response status:", response.status);

      if (response.status === 201) {
        const responseData = await response.json();
        const user = responseData.user;

        const { username } = user;
        console.log("User Data:", user); // Log user data

        window.location.href = CLIENT_URL;
      } else {
        // Check if the response contains valid JSON
        const errorData = await response.json();

        console.error(
          "Registration failed, please reach to admin: " + errorData.message
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  return (
    <div className="login">
      <h1 className="loginHeader">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="leftInputForm">
          <div
            className="loginButton google"
            onClick={google}
            style={{ cursor: "pointer" }}
          >
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div
            className="loginButton facebook"
            style={{ cursor: "not-allowed" }}
          >
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="rightInputForm">
          <form onSubmit={handleRegistration}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={registrationData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Example@domain.com"
              name="email"
              value={registrationData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={registrationData.password}
              onChange={handleInputChange}
              required
            />
            <button className="submit" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
