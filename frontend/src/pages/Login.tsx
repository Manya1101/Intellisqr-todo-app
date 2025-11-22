// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";

// const API_URL = "http://localhost:5000/api/auth";

// // Styles
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#f4f7fb",
//   },

//   card: {
//     width: 350,
//     padding: 30,
//     background: "white",
//     borderRadius: 12,
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     textAlign: "center",
//   },

//   title: {
//     marginBottom: 20,
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//   },

//   input: {
//     width: "100%",
//     padding: 12,
//     marginBottom: 15,
//     borderRadius: 8,
//     border: "1px solid #ddd",
//     fontSize: "1rem",
//   },

//   button: {
//     width: "100%",
//     padding: 12,
//     background: "#4a90e2",
//     color: "white",
//     border: "none",
//     borderRadius: 8,
//     cursor: "pointer",
//     fontWeight: "bold",
//     marginBottom: 15,
//   },

//   link: {
//     display: "block",
//     marginTop: 8,
//     color: "#4a90e2",
//     textDecoration: "none",
//     fontSize: "0.9rem",
//   },
// };

// function Login() {
//   const navigate = useNavigate();
//   const setToken = useAuthStore((state) => state.setToken);
//   const setUser = useAuthStore((state) => state.setUser);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(`${API_URL}/login`, { email, password });
//       setToken(res.data.token);
//       setUser(res.data.user);
//       navigate("/todo");
//     } catch {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Login</h2>

//         <input
//           style={styles.input}
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           style={styles.input}
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button style={styles.button} onClick={handleLogin}>
//           Login
//         </button>

//         <Link to="/forgot-password" style={styles.link}>
//           Forgot Password?
//         </Link>

//         <Link to="/signup" style={styles.link}>
//           Create an Account
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { formStyles as styles } from "../styles/formStyles";

const API_URL = "http://localhost:3000/api/auth";

function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/todo");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

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

        <button style={styles.button} onClick={handleLogin}>Login</button>

        <Link style={styles.link} to="/forgot-password">Forgot Password?</Link>
        <Link style={styles.link} to="/signup">Create an Account</Link>
      </div>
    </div>
  );
}

export default Login;
