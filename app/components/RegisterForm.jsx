"use client";

import React from "react";
import { useState } from "react";
import { registerAction } from "../serverActions/registerAction";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();

    const UserRegisterDetails = { username, email, password };

    try {
      const response = await registerAction(UserRegisterDetails);
      if (response.success) {
        alert("Registration success");
        router.push("/login");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={registerHandler} className="formSection">
        <h1 style={{ color: "blue", fontSize: "40px", textAlign: "center" }}>
          Registration Form
        </h1>

        <h3>Username</h3>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <h3>Email</h3>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <h3>password</h3>
        <input
          type="text"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Register</button>
      </form>
      <Link href="/login">Already Registerd? Login</Link>
    </div>
  );
};

export default RegisterForm;
