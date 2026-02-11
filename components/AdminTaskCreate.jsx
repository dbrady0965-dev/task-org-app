import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp,
    query, where, getDocs
 } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminTaskCreate({ orgId }) {
  const [title, setTitle] = useState("");
  const [schedule, setSchedule] = useState("daily");
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedUserIds, setAssignedUserIds] = useState([]);

  useEffect(() => {
  const loadUsers = async () => {
    const q = query(
      collection(db, "users"),
      where("orgId", "==", orgId)
    );

    const snap = await getDocs(q);

    console.log("ORG ID:", orgId);
    console.log("USERS FOUND:", snap.size);

    const userList = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setUsers(userList);
  };

  loadUsers();
}, [orgId]);

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
      completedBy: [],
      createdAt: serverTimestamp()
    });

    setTitle("");
    setSchedule("daily");
    setAssignedUserIds([]);
    setStatus("Task created");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Create Task (Admin)</h2>

    <h3>Assign Users</h3>

{users.map(user => (
  <label key={user.id} style={{ display: "block" }}>
    <input
      type="checkbox"
      checked={assignedUserIds.includes(user.id)}
      onChange={() => {
        setAssignedUserIds(prev =>
          prev.includes(user.id)
            ? prev.filter(id => id !== user.id)
            : [...prev, user.id]
        );
      }}
    />
    {user.email}
  </label>
))}

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
