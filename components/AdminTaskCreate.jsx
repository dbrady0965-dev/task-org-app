import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminTaskCreate({ orgId }) {
  const [title, setTitle] = useState("");
  const [schedule, setSchedule] = useState("daily");
  const [status, setStatus] = useState("");

  const createTask = async () => {
    if (!title) {
      setStatus("Task title required");
      return;
    }

    await addDoc(collection(db, "tasks"), {
      orgId,
      title,
      schedule,
      assignedUserIds: [],
      createdAt: serverTimestamp()
    });

    setTitle("");
    setSchedule("daily");
    setStatus("Task created");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Create Task (Admin)</h2>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <button type="button" onClick={createTask}>
        Create Task
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}
