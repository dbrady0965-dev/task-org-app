import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebasse";
import { useNavigate } from "react-router-dom";

export default function JoinOrganization() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const joinOrg = async () => {
        setError("");

        const q = query(
            collection(db, "Organizations"),
            where("joinCode", "==", code)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            setError("Invalid organization code");
            return;
        }

        const orgDoc = snapshot.docs[0];

        await setDoc(doc(db, "Users", auth.currentUser.uid), {
            email: auth.currentUser.email,
            orgID: orgDoc.id,
            role: "user",
            createdAt: serverTimestamp()
        });

        navigate("/dashboard");
    };

    return (
        <div>
            <h1>Join Organization</h1>

            <input 
            placeholder="Organization Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            />

            <button onClick={joinOrg}>Join</button>

            {error && <p>{error}</p>}
        </div>
    );
}