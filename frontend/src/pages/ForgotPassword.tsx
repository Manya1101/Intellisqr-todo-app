// import { useState } from "react";
// import axios from "axios";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [msg, setMsg] = useState("");

//   const handleSubmit = async () => {
//     const res = await axios.post("http://localhost:3000/api/auth/forgot-password", {
//       email,
//     });
//     setMsg(res.data.message);
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <input
//         type="email"
//         placeholder="Enter Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={handleSubmit}>Send Reset Link</button>

//       {msg && <p>{msg}</p>}
//     </div>
//   );
// };

// export default ForgotPassword;
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { formStyles as styles } from "../styles/formStyles";

const API_URL = "http://localhost:5000/api/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/forgot-password`, { email });
      alert("Reset link sent to your email");
    } catch {
      alert("Error sending reset email");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          Send Reset Link
        </button>

        <Link style={styles.link} to="/login">Back to Login</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;

