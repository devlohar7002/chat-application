import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const setUser = useSetRecoilState(userAtom)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/users/login", formData);
            localStorage.setItem("user", JSON.stringify(res.data))
            setUser(res.data)
            alert("Signin successful!");
            navigate('/chat')
        } catch (err) {
            console.error(err);
            alert("Signin failed. Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4 text-zinc-800">Signin</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-2 mb-4 border rounded bg-zinc-50 text-zinc-800"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded bg-zinc-50 text-zinc-800"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button className="w-full bg-zinc-800 text-white py-2 rounded hover:bg-zinc-900">Signin</button>
                <p className="text-sm text-center mt-4">
                    Don't have an account? <Link to="/signup" className="text-blue-500">Signup</Link>
                </p>
            </form>
        </div>
    );
};

export default Signin;