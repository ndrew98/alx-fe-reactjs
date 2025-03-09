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
  // Fetch data using useQuery
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    cacheTime: 10000,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>Posts</h2>

      {/* Button to manually refetch posts */}
      <button onClick={() => refetch()}>Refetch Posts</button>

      {/* Loading state */}
      {isLoading && <p>Loading posts...</p>}

      {/* Error state */}
      {isError && <p>Error: {error.message}</p>}

      {/* Render posts if data is available */}
      {data && (
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsComponent;
