"use client";
import { useState, useEffect } from "react";

export default function ImageUploader() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setImage(savedImage);

    const handlePaste = (e) => {
      const items = e.clipboardData.items;
      for (let item of items) {
        if (item.type.includes("image")) {
          const file = item.getAsFile();
          const reader = new FileReader();

          reader.onloadend = () => {
            const base64 = reader.result;
            setImage(base64);
            localStorage.setItem("profileImage", base64);
          };

          reader.readAsDataURL(file);
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      setImage(base64);
      localStorage.setItem("profileImage", base64);
    };

    if (file) reader.readAsDataURL(file);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <p style={{ marginTop: "10px", opacity: 0.7 }}>
        You can also paste an image directly (Ctrl+V)
      </p>

      {image && (
        <img
          src={image}
          alt="Profile"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "10px",
            marginTop: "20px"
          }}
        />
      )}
    </div>
  );
}
