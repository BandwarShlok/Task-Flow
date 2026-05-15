import React, { useState } from "react";

import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import logo from "../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= REGISTER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        style={styles.card}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* LOGO */}
        <div style={styles.logoContainer}>
          <img src={logo} alt="logo" style={styles.logo} />

          <h1 style={styles.logoText}>TaskFlow</h1>
        </div>

        {/* TITLE */}
        <h1 style={styles.heading}>Create Account 🚀</h1>

        <p style={styles.subHeading}>
          Join TaskFlow and organize your productivity smarter.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <motion.button
            type="submit"
            style={styles.button}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Creating account..." : "Register"}
          </motion.button>
        </form>

        {/* LOGIN LINK */}
        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}

const isMobile = window.innerWidth < 768;

const styles = {
  container: {
    minHeight: "100vh",

    background: "linear-gradient(to right, #020617, #0f172a, #020617)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    padding: "20px",
  },

  card: {
    width: "100%",

    maxWidth: "500px",

    background: "#111c3d",

    padding: isMobile ? "30px" : "45px",

    borderRadius: "30px",

    boxShadow: "0 0 50px rgba(0,0,0,0.5)",

    boxSizing: "border-box",
  },

  logoContainer: {
    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    marginBottom: "20px",
  },

  logo: {
    width: isMobile ? "80px" : "100px",

    height: isMobile ? "80px" : "100px",

    borderRadius: "22px",

    objectFit: "cover",

    boxShadow: "0 0 25px #2563eb",
  },

  logoText: {
    color: "white",

    fontSize: isMobile ? "36px" : "48px",

    marginTop: "15px",

    marginBottom: 0,
  },

  heading: {
    color: "white",

    textAlign: "center",

    fontSize: isMobile ? "34px" : "44px",

    marginBottom: "10px",
  },

  subHeading: {
    color: "#94a3b8",

    textAlign: "center",

    fontSize: isMobile ? "16px" : "18px",

    marginBottom: "35px",

    lineHeight: "1.6",
  },

  input: {
    width: "100%",

    padding: "18px",

    marginBottom: "18px",

    borderRadius: "16px",

    border: "1px solid rgba(255,255,255,0.08)",

    background: "#1e293b",

    color: "white",

    fontSize: "16px",

    outline: "none",

    boxSizing: "border-box",
  },

  button: {
    width: "100%",

    padding: "18px",

    border: "none",

    borderRadius: "16px",

    background: "linear-gradient(to right, #7c3aed, #8b5cf6)",

    color: "white",

    fontSize: "18px",

    fontWeight: "bold",

    cursor: "pointer",

    marginTop: "5px",
  },

  footerText: {
    color: "#94a3b8",

    textAlign: "center",

    fontSize: "15px",

    marginTop: "28px",
  },

  link: {
    color: "#8b5cf6",

    textDecoration: "none",

    fontWeight: "bold",
  },
};
