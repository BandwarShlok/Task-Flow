import React from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();

  const handleProtectedAction = () => {
    alert(
      "Login required to manage your personal tasks securely.\n\nYour privacy is our priority.",
    );

    navigate("/login");
  };

  const demoTasks = [
    {
      title: "Complete React Project",
      completed: true,
    },
    {
      title: "Go to Gym",
      completed: false,
    },
    {
      title: "Prepare Interview",
      completed: false,
    },
  ];

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div style={styles.overlay}></div>

      <motion.div
        style={styles.card}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <motion.div
            style={styles.logoSection}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={logo}
              alt="logo"
              style={styles.logo}
              whileHover={{
                scale: 1.08,
                rotate: 3,
              }}
            />

            <h1 style={styles.brand}>TaskFlow</h1>
          </motion.div>

          <motion.button
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Login
          </motion.button>
        </div>

        {/* TITLE */}
        <motion.div
          style={styles.heroSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
        >
          <motion.h1
            style={styles.title}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.3,
            }}
          >
            Manage Your Tasks Smarter 🚀
          </motion.h1>

          <motion.p
            style={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.5,
            }}
          >
            Explore the interface freely. Login to securely manage your personal
            tasks.
          </motion.p>
        </motion.div>

        {/* INPUT */}
        <motion.div
          style={styles.inputRow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
          }}
        >
          <input
            type="text"
            placeholder="What do you want to do?"
            style={styles.input}
          />

          <motion.button
            style={styles.addBtn}
            onClick={handleProtectedAction}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Add Task
          </motion.button>
        </motion.div>

        {/* LOGIN MESSAGE */}
        <motion.div
          style={styles.lockBox}
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
          }}
        >
          <motion.div
            style={styles.lockIcon}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          >
            🔒
          </motion.div>

          <h2 style={styles.lockTitle}>Login Required</h2>

          <p style={styles.lockText}>
            You need to login to create and manage your personal tasks.
            <br />
            Your privacy and task security are our responsibility.
          </p>

          <motion.button
            style={styles.lockBtn}
            onClick={() => navigate("/login")}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Login / Sign Up
          </motion.button>
        </motion.div>

        {/* DEMO TASKS */}
        <div style={styles.taskSection}>
          {demoTasks.map((task, index) => (
            <motion.div
              key={index}
              style={styles.taskCard}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8 + index * 0.15,
              }}
              whileHover={{
                scale: 1.02,
              }}
            >
              <div style={styles.leftTask}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  style={styles.checkbox}
                />

                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: task.completed ? "line-through" : "none",
                    opacity: task.completed ? 0.6 : 1,
                  }}
                >
                  {task.title}
                </span>
              </div>

              <div style={styles.taskButtons}>
                <motion.button
                  style={styles.iconBtn}
                  onClick={handleProtectedAction}
                  whileHover={{
                    scale: 1.1,
                  }}
                >
                  ✏️
                </motion.button>

                <motion.button
                  style={styles.iconBtn}
                  onClick={handleProtectedAction}
                  whileHover={{
                    scale: 1.1,
                  }}
                >
                  🗑️
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #16213e 0%, #0f172a 40%, #020617 100%)",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    position: "absolute",
    width: "700px",
    height: "700px",
    background: "#7c3aed",
    filter: "blur(180px)",
    opacity: 0.15,
    borderRadius: "50%",
  },

  card: {
    width: "100%",
    maxWidth: "850px",
    background: "rgba(15, 23, 42, 0.82)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "28px",
    padding: "35px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
    position: "relative",
    zIndex: 1,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px",
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  logo: {
    width: "58px",
    height: "58px",
    objectFit: "cover",
    borderRadius: "16px",
    boxShadow: "0 0 25px rgba(99,102,241,0.7)",
  },

  brand: {
    color: "white",
    fontSize: "30px",
    margin: 0,
    fontWeight: "700",
  },

  loginBtn: {
    border: "none",
    background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
    color: "white",
    padding: "12px 26px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },

  heroSection: {
    textAlign: "center",
    marginBottom: "35px",
  },

  title: {
    color: "white",
    fontSize: "42px",
    marginBottom: "12px",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "17px",
    lineHeight: "1.6",
  },

  inputRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    minWidth: "250px",
    padding: "16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    color: "white",
    fontSize: "16px",
    outline: "none",
  },

  addBtn: {
    padding: "16px 28px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
  },

  lockBox: {
    textAlign: "center",
    padding: "35px 20px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
    marginBottom: "35px",
  },

  lockIcon: {
    fontSize: "52px",
    marginBottom: "14px",
  },

  lockTitle: {
    color: "white",
    marginBottom: "14px",
  },

  lockText: {
    color: "#94a3b8",
    lineHeight: "1.7",
    marginBottom: "24px",
  },

  lockBtn: {
    border: "none",
    background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
    color: "white",
    padding: "14px 28px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },

  taskSection: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  taskCard: {
    background: "rgba(255,255,255,0.04)",
    borderRadius: "16px",
    padding: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  leftTask: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  checkbox: {
    width: "18px",
    height: "18px",
    accentColor: "#7c3aed",
  },

  taskText: {
    color: "white",
    fontSize: "16px",
  },

  taskButtons: {
    display: "flex",
    gap: "10px",
  },

  iconBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    border: "none",
    background: "rgba(255,255,255,0.06)",
    cursor: "pointer",
    fontSize: "18px",
  },
};
