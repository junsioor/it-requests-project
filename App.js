import { useState, useEffect } from "react";

function App() {
  const [requests, setRequests] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/requests");
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description })
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      fetchData();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Заявки в ІТ</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Проблема"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <button type="submit">Добавить</button>
      </form>

      <h2>Список заявок</h2>

      <ul>
        {requests.map((r) => (
          <li key={r.id}>
            <b>{r.title}</b> — {r.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;