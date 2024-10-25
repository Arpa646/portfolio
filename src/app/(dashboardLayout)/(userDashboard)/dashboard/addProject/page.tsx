"use client";

import React, { useState, FormEvent } from "react";
import { useAddProjectMutation } from "@/GlobalRedux/api/api";
import { useUser } from "@/services";

const ProjectForm = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [addProject, { isLoading: isAddingProject }] = useAddProjectMutation();
  const { userId } = useUser(); // Fetch user ID

  const handleProjectSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const projectData = {
      title: projectTitle,
      image: projectImage,
      link: projectLink,
      user: userId, // Include user ID
    };
  
    
    try {
  await addProject(projectData).unwrap();
      alert("Project added successfully!");
      setProjectTitle("");
      setProjectImage("");
      setProjectLink("");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Upload a Project
        </h1>
        <form onSubmit={handleProjectSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={projectImage}
              onChange={(e) => setProjectImage(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter project image URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Project Link</label>
            <input
              type="text"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter project link"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
            disabled={isLoading || isAddingProject}
          >
            {isLoading || isAddingProject ? "Uploading..." : "Upload Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
