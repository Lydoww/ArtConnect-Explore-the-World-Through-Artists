import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Signup = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const credentialUser = await signup({ email, password });
      if (credentialUser) {
        navigate("/Login");
      }
    } catch (error) {
      console.log("Error during login step:", error);
      alert("Error while login to the website");
    }
  };

  return (
    <form onSubmit={handleClick}>
      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-lg">
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div className="bg-white border rounded-lg">
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <button className="bg-white cursor-pointer" type="submit">
          Signup
        </button>
      </div>
    </form>
  );
};

export default Signup;
