// import { useState } from "react";
// import axios from "axios";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useAuthStore } from "../store/authStore";

// const API_URL = "http://localhost:3000/api/todos";

// interface Todo {
//   _id: string;
//   title: string;
//   completed: boolean;
// }

// const TodoPage: React.FC = () => {
//   const token = useAuthStore((state) => state.token);
//   const [newTodo, setNewTodo] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editingText, setEditingText] = useState("");

//   const queryClient = useQueryClient();

//   if (!token) return <h2>Please login first.</h2>;

//   // -------------------- FETCH TODOS ------------------------
//   const { data: todos, isLoading } = useQuery({
//     queryKey: ["todos"],
//     queryFn: async () => {
//       const res = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.data as Todo[];
//     },
//   });

//   // -------------------- ADD TODO ---------------------------
//   const addTodo = useMutation({
//     mutationFn: async () => {
//       await axios.post(
//         API_URL,
//         { title: newTodo },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     },
//     onSuccess: () => {
//       setNewTodo("");
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//     },
//   });

//   // -------------------- DELETE TODO ------------------------
//   const deleteTodo = useMutation({
//     mutationFn: async (id: string) => {
//       await axios.delete(`${API_URL}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//     },
//   });

//   // -------------------- TOGGLE STATUS ------------------------
//   const toggleTodo = useMutation({
//     mutationFn: async (todo: Todo) => {
//       await axios.put(
//         `${API_URL}/${todo._id}`,
//         { completed: !todo.completed },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//     },
//   });

//   // -------------------- UPDATE TODO TITLE ------------------------
//   const updateTodo = useMutation({
//     mutationFn: async (todo: Todo) => {
//       await axios.put(
//         `${API_URL}/${todo._id}`,
//         { title: editingText },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     },
//     onSuccess: () => {
//       setEditingId(null);
//       setEditingText("");
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//     },
//   });

//   if (isLoading) return <h2>Loading...</h2>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Your Todos</h1>

//       {/* Add Todo */}
//       <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
//         <input
//           type="text"
//           value={newTodo}
//           placeholder="Enter todo..."
//           onChange={(e) => setNewTodo(e.target.value)}
//         />
//         <button onClick={() => addTodo.mutate()}>Add</button>
//       </div>

//       {/* Todo List */}
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {todos?.map((todo) => (
//           <li
//             key={todo._id}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: 10,
//               padding: 8,
//               border: "1px solid #ddd",
//               borderRadius: 6,
//             }}
//           >
//             {/* LEFT SIDE: TITLE OR INPUT FIELD */}
//             <div style={{ flex: 1 }}>
//               {editingId === todo._id ? (
//                 <input
//                   value={editingText}
//                   onChange={(e) => setEditingText(e.target.value)}
//                   style={{ width: "100%", marginRight: 10 }}
//                 />
//               ) : (
//                 <span
//                   style={{
//                     textDecoration: todo.completed ? "line-through" : "none",
//                   }}
//                 >
//                   {todo.title}
//                 </span>
//               )}
//             </div>

//             {/* RIGHT SIDE BUTTONS */}
//             <div style={{ display: "flex", gap: 8 }}>
//               {/* Toggle */}
//               <button onClick={() => toggleTodo.mutate(todo)}>
//                 {todo.completed ? "Unmark" : "Complete"}
//               </button>

//               {/* Edit / Save */}
//               {editingId === todo._id ? (
//                 <button onClick={() => updateTodo.mutate(todo)}>Save</button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     setEditingId(todo._id);
//                     setEditingText(todo.title);
//                   }}
//                 >
//                   Edit
//                 </button>
//               )}

//               {/* Delete */}
//               <button onClick={() => deleteTodo.mutate(todo._id)}>
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoPage;
import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";

const API_URL = "http://localhost:3000/api/todos";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

// ------------------ STYLES ------------------
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "#f4f7fb",
    paddingTop: 50,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: 450,
    padding: 30,
    background: "white",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  addBox: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  addButton: {
    padding: "12px 18px",
    background: "#4a90e2",
    border: "none",
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  todoTitle: {
    fontSize: "1rem",
  },
  button: {
    padding: "5px 10px",
    fontSize: "0.8rem",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },
  completeBtn: {
    background: "#7ac27a",
    color: "white",
  },
  unmarkBtn: {
    background: "#d89448",
    color: "white",
  },
  editBtn: {
    background: "#4a90e2",
    color: "white",
  },
  saveBtn: {
    background: "#28a745",
    color: "white",
  },
  deleteBtn: {
    background: "#dc3545",
    color: "white",
  },
};

const TodoPage: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const queryClient = useQueryClient();

  if (!token) return <h2>Please login first.</h2>;

  // -------------------- FETCH TODOS ------------------------
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data as Todo[];
    },
  });

  // -------------------- ADD TODO ---------------------------
  const addTodo = useMutation({
    mutationFn: async () => {
      await axios.post(
        API_URL,
        { title: newTodo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      setNewTodo("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // -------------------- DELETE TODO ------------------------
  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // -------------------- TOGGLE STATUS ------------------------
  const toggleTodo = useMutation({
    mutationFn: async (todo: Todo) => {
      await axios.put(
        `${API_URL}/${todo._id}`,
        { completed: !todo.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // -------------------- UPDATE TODO TITLE ------------------------
  const updateTodo = useMutation({
    mutationFn: async (todo: Todo) => {
      await axios.put(
        `${API_URL}/${todo._id}`,
        { title: editingText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      setEditingId(null);
      setEditingText("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Your Todos</h2>

        <div style={styles.addBox}>
          <input
            type="text"
            value={newTodo}
            placeholder="Enter a todo..."
            style={styles.input}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button style={styles.addButton} onClick={() => addTodo.mutate()}>
            Add
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos?.map((todo) => (
            <li key={todo._id} style={styles.listItem}>
              {/* EDIT OR NORMAL DISPLAY */}
              {editingId === todo._id ? (
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ ...styles.input, marginBottom: 0 }}
                />
              ) : (
                <span
                  style={{
                    ...styles.todoTitle,
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
              )}

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  style={{
                    ...styles.button,
                    ...(todo.completed ? styles.unmarkBtn : styles.completeBtn),
                  }}
                  onClick={() => toggleTodo.mutate(todo)}
                >
                  {todo.completed ? "Unmark" : "Done"}
                </button>

                {editingId === todo._id ? (
                  <button
                    style={{ ...styles.button, ...styles.saveBtn }}
                    onClick={() => updateTodo.mutate(todo)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    style={{ ...styles.button, ...styles.editBtn }}
                    onClick={() => {
                      setEditingId(todo._id);
                      setEditingText(todo.title);
                    }}
                  >
                    Edit
                  </button>
                )}

                <button
                  style={{ ...styles.button, ...styles.deleteBtn }}
                  onClick={() => deleteTodo.mutate(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;


