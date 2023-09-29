import Google from "../img/google.png";
import Facebook from "../img/facebook.png";

const LoginPage = () => {
  return (
    <div className="login">
      <h1 className="loginHeader">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="leftInputForm">
          <div className="loginButton google">
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook">
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="rightInputForm">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
