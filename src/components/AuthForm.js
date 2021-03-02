import React, { useState } from 'react';
import { authService } from 'fbase';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccout] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccout((prev) => !prev);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="email" value={email} 
                    onChange={onChange} required />
                <input type="password" name="password" placeholder="password" value={password} 
                    onChange={onChange} required />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )
}

export default AuthForm;