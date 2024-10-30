// src/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for API responses and requests

interface RootState {
  auth: {
    token: string;
  };
}
//https://foodu-delta.vercel.app/api
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    //baseUrl: "http://localhost:5000/api",
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      console.log("this is the token", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user", "recipe"],
  endpoints: (builder) => ({
 
  
    getUser: builder.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
      providesTags: ["user"],
    }),



    makePremium: builder.mutation({
      query: (userId) => {
        console.log("User ID being sent:", userId);
        return {
          url: "/premium",
          method: "POST",
          body: {
            userId: userId,
          },
        };
      },
    }),

    getAllRecipe: builder.query({
      query: () => ({
        url: "/recipies",
        method: "GET",
      }),
      providesTags: ["recipe"],
    }),

    getRecipeByEmail: builder.query({
      query: (email) => ({
        url: `/recipies?email=${email}`,
        method: "GET",
      }),
    }),

    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `recipies/${id}`,
        method: "DELETE",
      }),
    }),

    addExperience: builder.mutation({
      query: (experienceData) => {
        console.log("Submitting new recipe:", experienceData);
        return {
          url: "/experince",
          method: "POST",
          body: experienceData,
        };
      },
    }),
    addSkill: builder.mutation({
      query: (skillData) => {
        console.log("Submitting new recipe:", skillData);
        return {
          url: "/skill",
          method: "POST",
          body: skillData,
        };
      },
    }),



    addBlog: builder.mutation({
      query: (newBlog) => {
        console.log("Submitting new recipe:", newBlog);
        return {
          url: "/blog",
          method: "POST",
          body: newBlog,
        };
      },
    }),
    getAllBlog: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
    
    }),
    getAllProject: builder.query({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
    
    }),
    getAllSkill: builder.query({
      query: () => ({
        url: "/skill",
        method: "GET",
      }),
    
    }),










    addProject: builder.mutation({
      query: (newProject) => {
        console.log("Submitting new recipe:", newProject);
        return {
          url: "/project",
          method: "POST",
          body: newProject,
        };
      },
    }),

    forgottenPass: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),

    changePass: builder.mutation({
      query: ({ id, newPassword }) => ({
        url: `/auth/change-password/${id}`,
        method: "POST",
        body: { newPassword },
      }),
    }),

    updateUserStatus: builder.mutation({
      query: (id) => ({
        url: `auth/change-block/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["user"],
    }),

  

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `auth/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

 


    signUp: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),

    logIn: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),

    checkAvailability: builder.query({
      query: (date) => ({
        url: `/check-availability?date=${date}`,
        method: "GET",
      }),
    }),

    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
    }),

  
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/auth/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    getAllUser: builder.query({
      query: () => ({
        url: `/auth`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    addRating: builder.mutation({
      query: (ratingData) => {
        console.log("Submitting new rating:", ratingData);
        return {
          url: "/recipies/rating",
          method: "POST",
          body: ratingData,
        };
      },
    }),

    addComment: builder.mutation({
      query: (commentData) => {
        console.log("Submitting new comment:", commentData);
        return {
          url: "/recipies/comment",
          method: "POST",
          body: commentData,
        };
      },
      invalidatesTags: ["recipe"],
    }),

    updateRecipeStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/recipies/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["recipe"],
    }),

    followRequest: builder.mutation({
      query: ({ currentUserId, targetUserId }) => {
        // Log the data being sent in the request body
        console.log("Data sent to server:", { currentUserId, targetUserId });
    
        return {
          url: `/auth/follow`,
          method: "POST",
          body: { currentUserId, targetUserId },
        };
      },
      invalidatesTags: ["user"],
    }),
    
    unfollowRequest: builder.mutation({
      query: ({ currentUserId, targetUserId }) => ({
        url: `/auth/unfollow`,
        method: "POST",
        body: { currentUserId, targetUserId },
      }),
      invalidatesTags: ["user"],
    }),

    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
    }),
    getSingleRecipe: builder.query({
      query: (id) => ({
        url: `/recipies/${id}`,
        method: "GET",
      }),
    }),

    updateUserProfile: builder.mutation({
      query: ({ userId, ...formData }) => {
        console.log("Updating user profile for:", userId);
        console.log("Form data being sent:", formData);
        return {
          url: `auth/updateprofile/${userId}`,
          method: "PUT",
          body: formData,
        };
      },
    }),

    updateRecipe: builder.mutation({
      query: ({ id, ...recipeData }) => {
        console.log("Updating recipe for:", id);
        console.log("Form data being sent:", recipeData);
        return {
          url: `recipies/update/${id}`,
          method: "PUT",
          body: recipeData,
        };
      },
    }),

    likeRecipe: builder.mutation({
      query: (info) => {
        console.log("Sending like request with payload:", info);
        return {
          url: "/recipies/like",
          method: "POST",
          body: info,
        };
      },
    }),

    dislikeRecipe: builder.mutation({
      query: (info) => {
        console.log("Sending dislike request with payload:", info);
        return {
          url: "/recipies/dislike",
          method: "POST",
          body: info,
        };
      },
    }),

    cancelComment: builder.mutation({
      query: ({ id, recipeId }) => {
        // Log the data being passed to the server
        console.log("Data sent to server:", { id, recipeId });
    
        return {
          url: `/recipies/deletecomment/${id}`,
          method: "DELETE",
          body: { recipeId },
        };
      },
      invalidatesTags: ["recipe"],
    }),
    
  }),
});

export const {
  useUpdateRecipeMutation,
  useUpdateUserProfileMutation,
  useLikeRecipeMutation,
  useDislikeRecipeMutation,
  useUnfollowRequestMutation,
  useFollowRequestMutation,
  useGetSingleUserQuery,
  useGetAllUserQuery,

  useMakePremiumMutation,
  useGetAllRecipeQuery,

  useForgottenPassMutation,
  useChangePassMutation,

  useAddBlogMutation,
  useAddExperienceMutation,
  useAddSkillMutation,
  useAddProjectMutation,

  useGetAllBlogQuery,
  useGetSingleBlogQuery,
  useGetAllProjectQuery,
  useGetAllSkillQuery,







  useAddRatingMutation,
  useAddCommentMutation,
  
  
  useGetSingleRecipeQuery,
  useGetRecipeByEmailQuery,

  useDeleteRecipeMutation,
  useCancelCommentMutation,
  useUpdateUserStatusMutation,
  useUpdateRecipeStatusMutation,

  useDeleteUserMutation,

  useGetUserQuery,
  useLogInMutation,
  useSignUpMutation,
} = baseApi;