import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists() && userDoc.data().orgId) {
      navigate("/dashboard");
    } else {
      navigate("/join");
    }
  };

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists() && userDoc.data().orgId) {
      navigate("/dashboard");
    } else {
      navigate("/join");
    }
  };

  return (
    <div>
      <h1>Login / Signup</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" onClick={signup}>Sign Up</button>
      <button type="button" onClick={login}>Log In</button>
    </div>
  );
}

