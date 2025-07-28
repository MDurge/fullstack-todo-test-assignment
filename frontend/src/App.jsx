import React, { useState } from "react";
import Login from "./components/Login";
import TodoList from "./components/TodoList";

export default function App() {
  const [token, setToken] = useState(null);
  return token ? <TodoList token={token} /> : <Login onLogin={setToken} />;
}
