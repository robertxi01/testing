// LOGIN POPUP
'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginModal({ show, onClose, setAuthenticated, setUserProfile }) {
    const [message, setMessage] = useState(null);
    const [remember, setRemember] = useState(false);
    useEffect(() => {
        if (show) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [show]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
            onClick={onClose}
        >
            <div
                className="bg-[rgb(26,27,29)] p-6 rounded-md shadow-lg min-w-[300px] relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold mb-4 text-white">Login</h2>
                <form
                    className="flex flex-col gap-3"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const body = new URLSearchParams();
                        body.append('email', e.target.email.value);
                        body.append('password', e.target.password.value);
                        try {
                            const resp = await fetch(`${API_BASE}/users/login`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: body.toString(),
                            });
                            if (!resp.ok) throw new Error('Login failed');
                            const data = await resp.json();
                            setAuthenticated(true);
                            setUserProfile({ fullName: data.name, _id: data.id });
                            if (remember) {
                                localStorage.setItem('token', data.token);
                                localStorage.setItem('userId', data.id);
                            }
                            setMessage(null);
                            onClose();
                        } catch (err) {
                            setMessage('Invalid credentials');
                        }
                    }}
                >
                    <div>
                        <label className="text-white">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full border px-2 py-1 rounded text-white"
                        />
                    </div>
                    <div>
                        <label className="text-white">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full border px-2 py-1 rounded text-white"
                        />
                    </div>
                    <label className="text-white flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        Remember me
                    </label>
                    <button
                        type="submit"
                        className="bg-red-900 text-white px-4 py-2 rounded hover:bg-[oklch(60%_0.177_26.899)]"
                    >
                        Submit
                    </button>
                    {message && (
                        <p className="text-white text-sm">{message}</p>
                    )}
                </form>
                <p className="text-white text-sm mt-2">
                    Don't have an account? <a href="#" onClick={onClose}>Sign up</a>
                </p>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}