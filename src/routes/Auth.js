import { authService, firebaseInstance } from 'fbase';
import React from 'react';
import AuthForm from 'components/AuthForm';

const Auth = () => {
    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }

        await authService.signInWithPopup(provider);
    }
    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Google</button>
            </div>
        </div>
    )
}

export default Auth;

