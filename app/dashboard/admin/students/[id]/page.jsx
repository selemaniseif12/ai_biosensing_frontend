"use client";

import { useState, useEffect } from "react";

export default function AdminStudentDetailPage({ params }) {
  const id = params.id;

  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [activity, setActivity] = useState([]);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function loadData() {
      try {
        const profileRes = await fetch(`${API}/profile/${id}`);
        const profileData = await profileRes.json();
        setProfile(profileData);

        const coursesRes = await fetch(
          `${API}/enrollment/my-courses?user_id=${id}`
        );
        const coursesData = await coursesRes.json();
        setCourses(Array.isArray(coursesData) ? coursesData : []);

        const activityRes = await fetch(`${API}/activity/student/${id}`);
        const activityData = await activityRes.json();
        setActivity(Array.isArray(activityData) ? activityData : []);
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    }

    loadData();
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>

      {profile && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Profile</h2>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Courses</h2>
        <ul className="list-disc pl-6">
          {Array.isArray(courses) &&
            courses.map((course) => (
              <li key={course.id}>
                <strong>{course.title}</strong> — {course.description}
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Activity</h2>
        <ul className="list-disc pl-6">
          {Array.isArray(activity) &&
            activity.map((item) => (
              <li key={item.id}>{item.action}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}
