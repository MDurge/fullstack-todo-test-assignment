import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const { token } = await res.json();
      onLogin(token);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input data-cy="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="user" />
      <input data-cy="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="pass" />
      <button data-cy="login-button" onClick={login}>Login</button>
      {error && <div data-cy="login-error">{error}</div>}
    </div>
  );
}
