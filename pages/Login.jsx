import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const login = async () => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    return (
        <div>
            <h1>Login</h1>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
            <button onClick={signup}>Sign Up</button>
        </div>
    );
}