import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/api"

function PostsList2() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    // queryFn: () => Promise.reject("Error message"),
    queryFn: getPosts,
    // refetchInterval: 1000, // refetch the data every 1 second
  })

  if (postsQuery.isLoading) return <h1>Loading.....</h1>

  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }

  return <div>
    <h1>Posts List 2</h1>
    <ol>
      {postsQuery.data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ol>
  </div>
};

export default PostsList2