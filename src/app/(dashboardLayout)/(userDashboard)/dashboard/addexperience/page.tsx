"use client";

import React, { useState, FormEvent } from "react";
import { useAddExperienceMutation } from "@/GlobalRedux/api/api";

const ExperienceForm = () => {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [addExperience, { isLoading: isAddingExperience }] =
    useAddExperienceMutation();
  // Fetch user ID

  const handleExperienceSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const experienceData = {
      title,
      description,
      company,
      startDate: new Date(startDate), // Convert to Date object
      endDate: endDate ? new Date(endDate) : null, // Convert to Date object or null
      location,
      // Include user ID
    };

    try {
      await addExperience(experienceData).unwrap();
      alert("Experience added successfully!");
      // Reset form fields after submission
      setCompany("");
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setLocation("");
    } catch (error) {
      console.error("Error adding experience:", error);
      alert("Failed to add experience.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Add Work Experience
        </h1>
        <form onSubmit={handleExperienceSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter job title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter job description"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              End Date (optional)
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter location"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
            disabled={isLoading || isAddingExperience}
          >
            {isLoading || isAddingExperience ? "Adding..." : "Add Experience"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
