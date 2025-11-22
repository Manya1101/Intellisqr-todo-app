// src/styles/formStyles.ts
export const formStyles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f7fb",
  },
  card: {
    width: 350,
    padding: 30,
    background: "white",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
  },
  title: {
    marginBottom: 20,
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: 15,
  },
  link: {
    display: "block",
    marginTop: 8,
    color: "#4a90e2",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
};
