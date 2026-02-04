import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // ===== Your original state =====
  const [text, setText] = useState("hello World");
  const [color, setColor] = useState("black");

  // ===== Users =====
  const [users, setUsers] = useState([]);

  // ===== Post form =====
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createdPost, setCreatedPost] = useState(null);

  const changeStyle = () => {
    setText("Swarup here");
    setColor("blue");
  };

  // ===== GET USERS =====
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // ===== POST DATA =====
  const createPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedPost(data); // show on UI
        setTitle("");
        setBody("");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* ===== Your original feature ===== */}
      <h1 style={{ color, cursor: "pointer" }} onClick={changeStyle}>
        {text}
      </h1>

      <hr />

      {/* ===== USERS ===== */}
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <hr />

      {/* ===== CREATE POST ===== */}
      <h2>Create Post</h2>

      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Post body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <br /><br />

      <button onClick={createPost}>Submit Post</button>

      {/* ===== SHOW RESPONSE ===== */}
      {createdPost && (
        <div style={{ marginTop: "20px" }}>
          <h3>Post created (fake response):</h3>
          <p><b>ID:</b> {createdPost.id}</p>
          <p><b>Title:</b> {createdPost.title}</p>
          <p><b>Body:</b> {createdPost.body}</p>
        </div>
      )}
    </div>
  );
}

export default App;
