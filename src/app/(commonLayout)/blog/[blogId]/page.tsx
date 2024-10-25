/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PulseLoader } from "react-spinners"; // Loader package
import {
  useGetSingleBlogQuery,
  useAddCommentMutation,
} from "@/GlobalRedux/api/api"; // Adjust to your API slice
import { jwtDecode } from "jwt-decode";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai"; // User icon

interface CustomJwtPayload {
  role?: string;
  userId?: string;
  useremail?: string;
}

interface BlogDetailsProps {
  params: {
    blogId: string;
  };
}


export default function BlogDetails({ params } :BlogDetailsProps) {
  const [comment, setComment] = useState(""); // State for comment
  const token = useSelector((state: RootState) => state.auth.token);
  const user = token ? jwtDecode<CustomJwtPayload>(token) : null;
  const userId: string = user?.useremail || "Guest"; // Extract user ID from token
  const id = params.blogId;

  const { data: blog, isLoading: isBlogLoading } = useGetSingleBlogQuery(
    id as string
  );
  const [addComment] = useAddCommentMutation();

  console.log(blog);
  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const commentData = { blogId: id, userId, comment };
    try {
      await addComment(commentData).unwrap();
      setComment(""); // Clear the input field
      console.log("Comment submitted successfully");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };





  const getRecipePreview = (html: string): string => {
    let result = "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
  
    const traverseNodes = (node: Node): void => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Simply append the text content without limiting the length
        const textContent = node.textContent || "";
        result += textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Append the opening tag of the element
        result += `<${(node as Element).nodeName.toLowerCase()}>`;
        // Recursively traverse the child nodes
        Array.from(node.childNodes).forEach(traverseNodes);
        // Append the closing tag of the element
        result += `</${(node as Element).nodeName.toLowerCase()}>`;
      }
    };
  
    Array.from(tempDiv.childNodes).forEach(traverseNodes);
    return result;
  };
  

  const recipePreview = getRecipePreview(blog?.blogContent);

  if (isBlogLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <PulseLoader color="#A18549" size={15} />
      </div>
    );
  }

  return (
    <div className="flex mt-32 flex-col items-center p-4 text-black min-h-screen bg-white">
      <div className="max-w-4xl w-full bg-gray-50 p-6 rounded-lg shadow-lg">
        {/* Blog title */}
        <h1 className="text-4xl font-bold text-center mb-6">{blog?.title}</h1>

  

        {/* Blog image */}
        {blog?.image && (
          <Image
            src={blog.image}
            alt="Blog Image"
            width={400}
            height={400}
            className="mx-auto mb-8 rounded-lg"
          />
        )}

        {/* Blog content */}
        <div className="text-lg leading-8 text-justify space-y-4">
       <div
          className="text-gray-600 text-sm mb-4"
          dangerouslySetInnerHTML={{ __html: recipePreview }}
        ></div>
        </div>
      </div>

      {/* Comments section */}
      <div className="max-w-4xl w-full bg-gray-50 p-6 mt-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Comments</h2>
        {blog?.comments && blog.comments.length > 0 ? (
          blog.comments.map(
            (commentObj: {
              _id: string;
              userId: { name?: string; _id?: string };
              comment: string;
            }) => (
              <div
                key={commentObj._id}
                className="border-b border-gray-200 py-4"
              >
                <div className="flex space-x-4">
                  <AiOutlineUser size={32} className="text-gray-500" />
                  <div className="flex-1">
                    <p className="font-semibold">
                      {commentObj?.userId?.name || "Anonymous"}
                    </p>
                    <p className="mt-1 text-gray-700">{commentObj.comment}</p>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}

        {/* Post a Comment */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Post a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
            />
            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
