import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post(
      `http://localhost:3000/api/auth/reset-password/${token}`,
      { password }
    );
    setMsg(res.data.message);
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Reset</button>

      {msg && <p>{msg}</p>}
    </div>
  );
};

export default ResetPassword;
