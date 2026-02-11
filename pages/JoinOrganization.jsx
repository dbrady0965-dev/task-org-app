import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function JoinOrganization() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      orgId: code,
    });
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Join Organization</h1>
      <input
        placeholder="Org Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={submit}>Continue</button>
    </div>
  );
}
