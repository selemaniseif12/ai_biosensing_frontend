"use client";
import { useState, useEffect } from "react";

export default function CourseModulesDashboard() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [moduleNumber, setModuleNumber] = useState("");

  // Load all courses (needed for dropdown)
  useEffect(() => {
    fetch("https://ai-biosensing-backend-trial2.onrender.com/course/")
      .then((res) => res.json())
      .then((data) => {
        console.log("COURSE LIST RESPONSE:", data);
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to load courses:", err));
  }, []);

  // Load modules for selected course
  const loadModules = (courseId) => {
    setLoading(true);
    fetch(`https://ai-biosensing-backend-trial2.onrender.com/course-modules/course/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("MODULE LIST RESPONSE:", data);
        setModules(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load modules:", err);
        setLoading(false);
      });
  };

  // Create new module
  const handleCreateModule = () => {
    const payload = {
      course_id: Number(selectedCourseId),
      title,
      module_number: Number(moduleNumber),
    };

    fetch("https://ai-biosensing-backend-trial2.onrender.com/course-modules/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("MODULE CREATE RESPONSE:", data);
        loadModules(selectedCourseId); // refresh table
        setTitle("");
        setModuleNumber("");
      })
      .catch((err) => console.error("Failed to create module:", err));
  };

  // Delete module
  const handleDeleteModule = (id) => {
    fetch(`https://ai-biosensing-backend-trial2.onrender.com/course-modules/${id}`, {
      method: "DELETE",
    })
      .then(() => loadModules(selectedCourseId))
      .catch((err) => console.error("Failed to delete module:", err));
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>Course Modules Dashboard</h2>

      {/* COURSE SELECTOR */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Select Course</h3>

        <select
          value={selectedCourseId}
          onChange={(e) => {
            setSelectedCourseId(e.target.value);
            loadModules(e.target.value);
          }}
          style={inputStyle}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* CREATE MODULE */}
      {selectedCourseId && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Create New Module</h3>

          <input
            type="text"
            placeholder="Module Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Module Number"
            value={moduleNumber}
            onChange={(e) => setModuleNumber(e.target.value)}
            style={inputStyle}
          />

          <button onClick={handleCreateModule} style={buttonStyle}>
            Create Module
          </button>
        </div>
      )}

      {/* MODULE LIST */}
      <h3>All Modules</h3>

      {loading && <p>Loading modules...</p>}

      {!loading && modules.length === 0 && selectedCourseId && (
        <p>No modules found for this course.</p>
      )}

      {!loading && modules.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Module Title</th>
              <th>Module Number</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {modules.map((mod) => (
              <tr key={mod.id}>
                <td>{mod.id}</td>
                <td>{mod.title}</td>
                <td>{mod.module_number}</td>
                <td>
                  <button
                    onClick={() => handleDeleteModule(mod.id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const inputStyle = {
  display: "block",
  marginBottom: "10px",
  padding: "8px",
  width: "300px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};
