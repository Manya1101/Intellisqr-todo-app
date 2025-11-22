// import { useState } from "react";
// import axios from "axios";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {
//     try {
//       await axios.post("http://localhost:3000/api/auth/signup", {
//         name,
//         email,
//         password,
//       });
//       alert("Signup successful!");
//     } catch (err: any) {
//       console.log(err.response?.data);
//       alert("Error signing up");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "60px auto" }}>
//       <h2>Signup</h2>

//       <input
//         type="text"
//         placeholder="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         style={{ width: "100%", marginBottom: 10 }}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={{ width: "100%", marginBottom: 10 }}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ width: "100%", marginBottom: 10 }}
//       />

//       <button onClick={handleSignup}>Create Account</button>
//     </div>
//   );
// };

// export default Signup;
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { formStyles as styles } from "../styles/formStyles";

const API_URL = "http://localhost:5000/api/auth";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post(`${API_URL}/signup`, { name, email, password });
      alert("Signup successful!");
      navigate("/login");
    } catch {
      alert("Signup failed!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleSignup}>
          Sign Up
        </button>

        <Link style={styles.link} to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}

export default Signup;

