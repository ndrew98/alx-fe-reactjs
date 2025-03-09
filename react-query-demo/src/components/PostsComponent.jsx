import React from "react";
import { useQuery } from "@tanstack/react-query";

// Function to fetch posts from API
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const PostsComponent = () => {
  // Fetch data using useQuery with advanced configurations
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    // Advanced configurations
    cacheTime: 10000, // Cache data for 10 seconds
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchOnWindowFocus: false, // Disable automatic refetching on focus
    keepPreviousData: true, // Keep old data while fetching new data
  });

  // Loading state
  if (isLoading) return <p>Loading posts...</p>;

  // Error state
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
