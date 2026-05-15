import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  toggleTask,
} from "../services/taskService";

import { getCurrentUser } from "../services/userService";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Dashboard() {
  const navigate = useNavigate();

  // ================= STATES =================
  const [tasks, setTasks] = useState([]);

  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");

  const [priority, setPriority] = useState("Medium");

  const [dueDate, setDueDate] = useState("");

  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(false);

  // ================= EDIT STATES =================
  const [showModal, setShowModal] = useState(false);

  const [editTaskId, setEditTaskId] = useState("");

  const [editTitle, setEditTitle] = useState("");

  const [editPriority, setEditPriority] = useState("Medium");

  const [editDueDate, setEditDueDate] = useState("");

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH USER =================
  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= LOAD =================
  useEffect(() => {
    fetchTasks();

    fetchUser();
  }, []);

  // ================= ADD TASK =================
  const handleAddTask = async () => {
    if (!title.trim()) return;

    try {
      await addTask({
        title,
        priority,
        dueDate,
      });

      setTitle("");

      setPriority("Medium");

      setDueDate("");

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE TASK =================
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= OPEN EDIT MODAL =================
  const handleEditTask = (task) => {
    setEditTaskId(task._id);

    setEditTitle(task.title);

    setEditPriority(task.priority || "Medium");

    setEditDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");

    setShowModal(true);
  };

  // ================= SAVE EDIT =================
  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;

    try {
      await updateTask(editTaskId, {
        title: editTitle,

        priority: editPriority,

        dueDate: editDueDate,
      });

      setShowModal(false);

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= TOGGLE TASK =================
  const handleToggleTask = async (task) => {
    try {
      await toggleTask(task._id);

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  // ================= FILTER =================
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;

    if (filter === "completed") return task.completed;

    return true;
  });

  const completedTasks = tasks.filter((t) => t.completed).length;

  // ================= LOADING =================
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <h1 style={styles.loadingText}>Loading...</h1>
      </div>
    );
  }

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.logoSection}>
            <img src={logo} alt="logo" style={styles.logo} />

            <h1 style={styles.logoText}>TaskFlow</h1>
          </div>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* USER */}
        {user && (
          <div style={styles.profileSection}>
            <div style={styles.profileLeft}>
              <img
                src={
                  user.picture ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                style={styles.profileImage}
              />

              <div>
                <h2 style={styles.welcomeText}>Welcome back, {user.name} 👋</h2>

                <p style={styles.emailText}>{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* TITLE */}
        <h1 style={styles.heading}>Manage Your Tasks Smarter 🚀</h1>

        <p style={styles.subHeading}>
          Organize your work and boost productivity.
        </p>

        {/* INPUTS */}
        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="What do you want to do?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={styles.select}
          >
            <option value="Low">Low</option>

            <option value="Medium">Medium</option>

            <option value="High">High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={styles.input}
          />

          <motion.button
            style={styles.addBtn}
            onClick={handleAddTask}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Task
          </motion.button>
        </div>

        {/* FILTERS */}
        <div style={styles.filterRow}>
          <button
            style={filter === "all" ? styles.activeFilter : styles.filterBtn}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            style={filter === "active" ? styles.activeFilter : styles.filterBtn}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            style={
              filter === "completed" ? styles.activeFilter : styles.filterBtn
            }
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* TASKS */}
        <div style={styles.taskContainer}>
          {filteredTasks.length === 0 ? (
            <div style={styles.emptyState}>You're all caught up 🚀</div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task._id}
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
                  duration: 0.3,
                }}
                whileHover={{
                  scale: 1.02,
                }}
              >
                <div style={styles.left}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task)}
                  />

                  <div>
                    <span
                      style={{
                        ...styles.taskText,

                        textDecoration: task.completed
                          ? "line-through"
                          : "none",

                        opacity: task.completed ? 0.6 : 1,
                      }}
                    >
                      {task.title}
                    </span>

                    {/* META */}
                    <div style={styles.taskMeta}>
                      <span
                        style={{
                          ...styles.priorityBadge,

                          background:
                            task.priority === "High"
                              ? "#dc2626"
                              : task.priority === "Medium"
                                ? "#ca8a04"
                                : "#16a34a",
                        }}
                      >
                        {task.priority}
                      </span>

                      {task.dueDate && (
                        <span style={styles.dueDate}>
                          Due {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEditTask(task)}
                  >
                    ✏️
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    🗑
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* PROGRESS */}
        <div style={styles.progressSection}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,

                width: `${
                  tasks.length ? (completedTasks / tasks.length) * 100 : 0
                }%`,
              }}
            />
          </div>

          <p style={styles.progressText}>
            {completedTasks} of {tasks.length} tasks completed
          </p>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <motion.div
            style={styles.modal}
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <h2 style={styles.modalTitle}>Edit Task</h2>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={styles.modalInput}
            />

            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              style={styles.modalInput}
            >
              <option value="Low">Low</option>

              <option value="Medium">Medium</option>

              <option value="High">High</option>
            </select>

            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              style={styles.modalInput}
            />

            <div style={styles.modalButtons}>
              <button
                style={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <motion.button
                style={styles.saveBtn}
                onClick={handleSaveEdit}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
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

    padding: isMobile ? "15px" : "40px",

    overflowX: "hidden",
  },

  loadingContainer: {
    minHeight: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background: "#020617",
  },

  loadingText: {
    color: "white",

    fontSize: "32px",
  },

  card: {
    width: "100%",

    maxWidth: "1200px",

    background: "#111c3d",

    borderRadius: "30px",

    padding: isMobile ? "20px" : "40px",

    boxShadow: "0 0 50px rgba(0,0,0,0.5)",

    boxSizing: "border-box",
  },

  header: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: "20px",
  },

  logoSection: {
    display: "flex",

    alignItems: "center",

    gap: "18px",
  },

  logo: {
    width: isMobile ? "60px" : "90px",

    height: isMobile ? "60px" : "90px",

    borderRadius: "20px",

    objectFit: "cover",

    boxShadow: "0 0 25px #2563eb",
  },

  logoText: {
    color: "white",

    fontSize: isMobile ? "32px" : "58px",

    fontWeight: "bold",

    margin: 0,
  },

  logoutBtn: {
    background: "#ef4444",

    border: "none",

    color: "white",

    padding: isMobile ? "12px 18px" : "16px 28px",

    borderRadius: "14px",

    cursor: "pointer",

    fontSize: isMobile ? "14px" : "18px",

    fontWeight: "bold",
  },

  profileSection: {
    marginTop: "25px",

    marginBottom: "20px",
  },

  profileLeft: {
    display: "flex",

    alignItems: "center",

    gap: "18px",

    flexWrap: "wrap",
  },

  profileImage: {
    width: isMobile ? "65px" : "80px",

    height: isMobile ? "65px" : "80px",

    borderRadius: "50%",

    objectFit: "cover",

    border: "3px solid #8b5cf6",
  },

  welcomeText: {
    color: "white",

    margin: 0,

    fontSize: isMobile ? "24px" : "32px",
  },

  emailText: {
    color: "#94a3b8",

    marginTop: "6px",

    fontSize: isMobile ? "14px" : "17px",
  },

  heading: {
    textAlign: "center",

    color: "white",

    fontSize: isMobile ? "42px" : "70px",

    marginTop: "30px",

    marginBottom: "15px",

    lineHeight: "1.1",
  },

  subHeading: {
    textAlign: "center",

    color: "#94a3b8",

    fontSize: isMobile ? "18px" : "24px",

    marginBottom: "40px",
  },

  inputRow: {
    display: "grid",

    gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr auto",

    gap: "18px",

    marginBottom: "30px",

    alignItems: "center",
  },

  input: {
    padding: isMobile ? "18px" : "22px",

    borderRadius: "18px",

    border: "1px solid rgba(255,255,255,0.08)",

    background: "#1e293b",

    color: "white",

    fontSize: isMobile ? "16px" : "20px",

    outline: "none",

    width: "100%",

    boxSizing: "border-box",
  },

  select: {
    padding: isMobile ? "18px" : "22px",

    borderRadius: "18px",

    border: "1px solid rgba(255,255,255,0.08)",

    background: "#1e293b",

    color: "white",

    fontSize: isMobile ? "16px" : "20px",

    outline: "none",

    boxSizing: "border-box",
  },

  addBtn: {
    background: "linear-gradient(to right, #7c3aed, #8b5cf6)",

    border: "none",

    color: "white",

    padding: isMobile ? "18px" : "20px 35px",

    borderRadius: "18px",

    cursor: "pointer",

    fontSize: isMobile ? "18px" : "20px",

    fontWeight: "bold",

    width: "100%",
  },

  filterRow: {
    display: "flex",

    gap: "12px",

    flexWrap: "wrap",

    marginBottom: "30px",
  },

  filterBtn: {
    background: "#1e293b",

    border: "none",

    color: "white",

    padding: "14px 24px",

    borderRadius: "12px",

    cursor: "pointer",

    fontSize: "16px",
  },

  activeFilter: {
    background: "linear-gradient(to right, #7c3aed, #8b5cf6)",

    border: "none",

    color: "white",

    padding: "14px 24px",

    borderRadius: "12px",

    cursor: "pointer",

    fontSize: "16px",
  },

  taskContainer: {
    display: "flex",

    flexDirection: "column",

    gap: "18px",
  },

  emptyState: {
    color: "#94a3b8",

    textAlign: "center",

    padding: "40px",

    fontSize: "22px",
  },

  taskCard: {
    background: "#1e293b",

    padding: isMobile ? "18px" : "24px",

    borderRadius: "18px",

    display: "flex",

    justifyContent: "space-between",

    alignItems: isMobile ? "flex-start" : "center",

    flexDirection: isMobile ? "column" : "row",

    gap: "15px",
  },

  left: {
    display: "flex",

    alignItems: "center",

    gap: "15px",

    width: "85%",
  },

  taskText: {
    color: "white",

    fontSize: isMobile ? "18px" : "22px",

    wordBreak: "break-word",
  },

  taskMeta: {
    display: "flex",

    gap: "10px",

    marginTop: "8px",

    flexWrap: "wrap",
  },

  priorityBadge: {
    color: "white",

    padding: "5px 12px",

    borderRadius: "30px",

    fontSize: "13px",

    fontWeight: "bold",
  },

  dueDate: {
    color: "#94a3b8",

    fontSize: "14px",
  },

  deleteBtn: {
    background: "transparent",

    border: "none",

    fontSize: "24px",

    cursor: "pointer",
  },

  editBtn: {
    background: "#312e81",

    border: "none",

    padding: "10px 14px",

    borderRadius: "10px",

    cursor: "pointer",

    fontSize: "18px",

    marginRight: "10px",
  },

  progressSection: {
    marginTop: "35px",
  },

  progressBar: {
    width: "100%",

    height: "12px",

    background: "#0f172a",

    borderRadius: "20px",

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    background: "linear-gradient(to right, #7c3aed, #8b5cf6)",

    borderRadius: "20px",
  },

  progressText: {
    color: "#94a3b8",

    marginTop: "12px",

    fontSize: isMobile ? "15px" : "18px",
  },

  modalOverlay: {
    position: "fixed",

    top: 0,
    left: 0,

    width: "100%",

    height: "100%",

    background: "rgba(0,0,0,0.7)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    zIndex: 999,
  },

  modal: {
    background: "#111c3d",

    padding: "30px",

    borderRadius: "20px",

    width: "90%",

    maxWidth: "450px",

    boxShadow: "0 0 30px rgba(0,0,0,0.5)",
  },

  modalTitle: {
    color: "white",

    marginBottom: "20px",

    fontSize: "28px",
  },

  modalInput: {
    width: "100%",

    padding: "16px",

    borderRadius: "12px",

    border: "1px solid rgba(255,255,255,0.08)",

    background: "#1e293b",

    color: "white",

    fontSize: "17px",

    outline: "none",

    marginBottom: "20px",

    boxSizing: "border-box",
  },

  modalButtons: {
    display: "flex",

    justifyContent: "flex-end",

    gap: "12px",
  },

  cancelBtn: {
    background: "#334155",

    border: "none",

    color: "white",

    padding: "12px 20px",

    borderRadius: "10px",

    cursor: "pointer",

    fontSize: "16px",
  },

  saveBtn: {
    background: "linear-gradient(to right, #7c3aed, #8b5cf6)",

    border: "none",

    color: "white",

    padding: "12px 20px",

    borderRadius: "10px",

    cursor: "pointer",

    fontSize: "16px",

    fontWeight: "bold",
  },
};
