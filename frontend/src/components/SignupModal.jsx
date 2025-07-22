// SIGNUP POPUP
'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SignupModal({ show, onClose }) {
    const [message, setMessage] = useState(null);
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
                <h2 className="text-lg font-semibold mb-4 text-white">Signup</h2>
                <form
                    className="flex flex-col gap-3"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const body = {
                            name: e.target.name.value,
                            email: e.target.email.value,
                            phone: e.target.phone.value,
                            password: e.target.password.value,
                            promo: e.target.promo.checked,
                        };
                        try {
                            const resp = await fetch(`${API_BASE}/users/register`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(body),
                            });
                            if (!resp.ok) throw new Error('Registration failed');
                            setMessage('Registration successful');
                            e.target.reset();
                        } catch (err) {
                            setMessage('Error registering user');
                        }
                    }}
                >
                    <div>
                        <label className="text-white">Name</label>
                        <input
                            name="name"
                            type="name"
                            className="w-full border px-2 py-1 rounded text-white"
                        />
                    </div>
                    <div>
                        <label className="text-white">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full border px-2 py-1 rounded text-white"
                        />
                    </div>
                    <div>
                        <label className="text-white">Phone</label>
                        <input
                            name="phone"
                            type="phone"
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
                        <input type="checkbox" name="promo" />
                        Sign me up for promotions
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