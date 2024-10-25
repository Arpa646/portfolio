"use client";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useUser } from "@/services";

interface Blog {
  _id: string;
  title: string;
  blogContent: string;
  image: string;
  author: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const router = useRouter();
  const { token } = useUser(); // Get the token from user context or service

  const getBlogPreview = (content: string, maxLength: number): string => {
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  const blogPreview = getBlogPreview(blog.blogContent, 100);

  const handleViewDetails = () => {
    if (token) {
      router.push(`/blog/${blog._id}`); // Navigate to blog details page if user has token
    } else {
      router.push("/login"); // Redirect to login page if no token
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #1C1C1C 0%, #050505 100%)",
      }}
      className="border border-[#2B2B2B] flex flex-col md:flex-row md:justify-center md:items-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Blog Image */}
      <div className="blog-image w-full md:w-2/4">
        <img
          src={blog.image}
          alt={blog.title || "Blog image"}
          className="w-full h-64 object-cover p-5 rounded-t-lg md:rounded-l-lg md:rounded-none"
        />
      </div>

      {/* Blog Content */}
      <div className="p-4 w-full md:w-2/4 text-gray-800 dark:text-white">
        <h3 className="text-2xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-lg mb-4">{blogPreview}</p>
        <div className="mb-2">
          <span className="text-sm text-gray-500">By: {blog.author}</span>
        </div>
        <div className="mt-4">
          <button
            onClick={handleViewDetails}
            className="border relative px-4 py-2 border-[#A18549] text-[#A18549] hover:bg-[#A18549] hover:text-white transition-colors duration-300"
          >
            <AiOutlineEye className="inline-block mr-2" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
