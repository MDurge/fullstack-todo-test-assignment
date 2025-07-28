import React, { useEffect, useState } from "react";

export default function TodoList({ token }) {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const load = async () => {
    const res = await fetch("http://localhost:4000/items", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setItems(await res.json());
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!text.trim()) return; // Don't add empty todos
    
    const res = await fetch("http://localhost:4000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text })
    });
    if (res.ok) {
      load();
      setText(""); // Clear input after adding
    }
  };

  const update = async id => {
    const newText = prompt("New text", text);
    await fetch(`http://localhost:4000/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text: newText })
    });
    load();
  };

  const del = async id => {
    await fetch(`http://localhost:4000/items/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    load();
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input data-cy="new-todo" value={text} onChange={e => setText(e.target.value)} placeholder="Add todo" />
      <button data-cy="add-button" onClick={add}>Add</button>
      <ul>
        {items.map(item => (
          <li key={item.id} data-cy="todo-item">
            {item.text}
            <button data-cy="edit-button" onClick={() => update(item.id)}>Edit</button>
            <button data-cy="delete-button" onClick={() => del(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
