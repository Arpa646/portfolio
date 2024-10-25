"use client";
import React from "react";
import { useGetAllBlogQuery } from "@/GlobalRedux/api/api"; // Replace with your actual import for the API
import BlogCard from "./BlogCard"; // Import the BlogCard component

interface Blog {
  _id:string;
  title: string;
  blogContent: string;
  image: string;
  author: string;
}

const BlogList: React.FC = () => {
  // Fetch all blog data using the useGetAllBlog hook
  const { data: blogs, error, isLoading } = useGetAllBlogQuery(undefined);

  // Display loading state
  if (isLoading) {
    return <div>Loading blogs...</div>;
  }

  // Display error message if there's an error
  if (error) {
    return <div>Failed to load blogs. Please try again later.</div>;
  }

  return (
    <div style={{
      background: 'linear-gradient(to right, #1C1C1C 0%, #050505 100%)',
    }} className="">
      <div className="max-w-[800px] pt-32 grid md:grid-cols-1 sm:grid-cols-2 gap-10 mx-auto my-5">
       <h1 className="text-4xl">Blog</h1>
        {blogs?.map((blog: Blog, index: number) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};
export default BlogList;
