// ACCOUNT PROFILE PAGE
'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg');
    const [promo, setPromo] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [address, setAddress] = useState('');

    const [displayFullName, setDisplayFullName] = useState('');
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    useEffect(() => {
        if (!userId) return;
        fetch(`${API_BASE}/users/${userId}`)
            .then((r) => r.json())
            .then((data) => {
                setFullName(data.name);
                setEmail(data.email);
                setPromo(data.promo);
                setAddress(data.address || '');
                setDisplayFullName(data.name);
            });
    }, [userId]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (password.trim() === '') {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);

        const body = {
            name: fullName,
            phone: '',
            password,
            promo,
            status: 'ACTIVE',
            address,
        };
        await fetch(`${API_BASE}/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        setDisplayFullName(fullName);
        setPassword('');
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setUploading(true);
            // fake upload delay
            setTimeout(() => {
                const url = URL.createObjectURL(event.target.files[0]);
                setProfilePic(url);
                setUploading(false);
            }, 1000);
        }
    };

    return (
        <>
            <Head>
                <title>Account</title>
            </Head>
            <div style={pageStyle}>
                {/* LEFT CARD */}
                <div style={cardStyle} className="card1 welcome">
                    <h1 style={{ fontSize: '24px' }}>Welcome back!</h1>
                    <img
                        src={profilePic}
                        alt="Profile"
                        style={{
                            height: '200px',
                            width: '200px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            margin: '20px',
                            border: '2px solid black',
                        }}
                    />

                    {/* LOADING THINGY */}
                    {uploading && (
                        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
                            <div className="p-8 rounded-2xl shadow-xl flex flex-col items-center" style={{ backgroundColor: 'rgba(27,28,30, 1)' }}>
                                <div style={loaderStyle}></div>
                                <p className="text-lg font-semibold text-white" style={{ marginTop: '17px' }}>
                                    Uploading...
                                </p>
                            </div>
                        </div>
                    )}

                    <input type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                    <button style={buttonStyle} onClick={() => document.querySelector('input[type="file"]').click()}>
                        Upload Image
                    </button>
                    <p style={{ fontSize: '20px', padding: '10px' }}><strong>{displayFullName}</strong></p>
                </div>

                {/* RIGHT CARD */}
                <div style={{ ...cardStyle, ...card2Style }} className="card2 edit-profile">
                    <h1 style={{ fontSize: '24px' }}>Edit Profile</h1>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="text-black"
                        style={inputStyle}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black"
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-black"
                        style={{
                            ...inputStyle,
                            borderColor: passwordError ? 'red' : inputStyle.borderColor,
                        }}
                    />
                    {passwordError && (
                        <div style={errorTextStyle}>Password required</div>
                    )}
                    <label className="text-white flex gap-2 mt-2">
                        <input
                            type="checkbox"
                            checked={promo}
                            onChange={(e) => setPromo(e.target.checked)}
                        />
                        Receive promotions
                    </label>
                    <input
                        type="address"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="text-black"
                        style={{
                            ...inputStyle,
                            borderColor: passwordError ? 'red' : inputStyle.borderColor,
                        }}
                    />
                    <button onClick={handleUpdate} style={buttonStyle}>
                        Update
                    </button>
                </div>
            </div>
        </>
    );
}

/* Styles preserved from your original file */

const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '40px',
    gap: '20px',
    backgroundColor: 'rgba(26,27,29,1)'
};

const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(112,31,30,1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'black',
    color: 'white',
};

const card2Style = {
    width: '500px',
    alignItems: 'center',
    transition: 'height 0.3s ease',
};

const buttonStyle = {
    width: '50%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: 'oklch(0.241 0.003 196.958)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const inputStyle = {
    backgroundColor: 'white',
    width: '75%',
    padding: '10px',
    marginTop: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: '5px',
};

const errorTextStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
};

const loaderStyle = {
    width: '45px',
    aspectRatio: '1',
    '--c': 'no-repeat linear-gradient(#fff 0 0)',
    background: `
    var(--c) 0%   50%,
    var(--c) 50%  50%,
    var(--c) 100% 50%
  `,
    backgroundSize: '20% 100%',
    animation: 'l1 1s infinite linear',
};