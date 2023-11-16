import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/posts"

function PostsList2() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    // queryFn: () => Promise.reject("Error message"),
    queryFn: getPosts,
    // refetchInterval: 1000
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