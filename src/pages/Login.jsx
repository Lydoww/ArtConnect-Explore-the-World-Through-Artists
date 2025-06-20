import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const credentialUser = await login({ email, password });
      if (credentialUser) {
        navigate("/Profil");
      }
    } catch (error) {
      console.log("Error during login step:", error);
      alert("Error while login to the website");
    }
  };

  return (
    <form onSubmit={handleClick}>
      <div className="border bg-white">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <label id="email">Email</label>
      </div>
      <div className="border bg-white">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label id="password">Password</label>
      </div>
      <button type="submit" className="border bg-white">
        Login
      </button>
    </form>
  );
};

export default Login;
