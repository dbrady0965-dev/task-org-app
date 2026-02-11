import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function JoinOrganization() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const submitOrg = async () => {
    if (!code) {
      alert("Enter organization code");
      return;
    }

    console.log("Checking org:", code);

    try {
      const orgRef = doc(db, "Organizations", code);
      const orgSnap = await getDoc(orgRef);

      console.log("Org exists?", orgSnap.exists());

      if (!orgSnap.exists()) {
        alert("Organization not found");
        return;
      }

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        orgId: code,
        email: auth.currentUser.email,
        role: "user"
      });

      console.log("Org saved. Redirecting.");
      navigate("/dashboard");

    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Enter Organization Code</h1>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Organization Code"
      />

      <button type="button" onClick={submitOrg}>
        Join
      </button>
    </div>
  );
}

