"use client";

import React, { useState, FormEvent } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { useAddBlogMutation } from "@/GlobalRedux/api/api";
import { useUser } from "@/services";

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogForm = () => {
  // States for blog details
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hook to trigger the mutation for adding a blog
  const [addBlog, { isLoading: isAddingBlog }] = useAddBlogMutation();

  // Get current user ID from the service
  const { userId } = useUser();

  // Handle form submission for adding a new blog
  const handleBlogSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Show loading state

    // Construct the blog data object
    const blogData = {
      title: blogTitle,
      blogContent: blogContent,
      image: blogImage,
      author: "Arpa"
     // Include the user ID
    };
















    console.log(blogData)

    console.log("userId", userId);
    try {
      // Call the mutation to add the blog
      const response = await addBlog(blogData).unwrap();
      console.log("Blog added successfully:", response);
      alert("Blog submitted successfully!");

      // Reset form fields after submission
      setBlogTitle("");
      setBlogContent("");
      setBlogImage("");
    } catch (error) {
      console.error("Error submitting blog:", error);

      // Handle API error with a message
      const apiError = error as { data?: { message?: string } };
      alert(
        "Failed to submit the blog. " +
          (apiError.data?.message || "Please try again later.")
      );
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Create a Blog
        </h1>
        <form onSubmit={handleBlogSubmit}>
          {/* Blog Title Input */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Blog Title
            </label>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Image URL Input */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={blogImage}
              onChange={(e) => setBlogImage(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Enter image URL"
            />
          </div>

          {/* Blog Content (Quill Editor) */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Blog Content
            </label>
            <ReactQuill
              theme="snow"
              value={blogContent}
              onChange={setBlogContent}
              placeholder="Write your blog content here..."
              className="h-64"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
            disabled={isLoading || isAddingBlog}
          >
            {isLoading || isAddingBlog ? "Submitting..." : "Submit Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
