"use client";

import React, { useState, FormEvent } from "react";
import { useAddSkillMutation } from "@/GlobalRedux/api/api";


const SkillForm = () => {
  const [skill, setSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [addSkill, { isLoading: isAddingSkill }] = useAddSkillMutation();


  const handleSkillSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const skillData = {
      skill,
     // Include user ID
    };

    try {
   await addSkill(skillData).unwrap();
      alert("Skill added successfully!");
      setSkill(""); // Reset input field
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Failed to add skill.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Add a Skill</h1>
        <form onSubmit={handleSkillSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Skill</label>
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter a skill"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
            disabled={isLoading || isAddingSkill}
          >
            {isLoading || isAddingSkill ? "Adding..." : "Add Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
