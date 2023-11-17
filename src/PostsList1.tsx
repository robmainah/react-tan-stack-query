import { useQueries, useQuery } from "@tanstack/react-query"
import { getPost, getPosts } from "./api/api"

function PostsList1() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })

  const queries = useQueries({
    queries: (postsQuery.data ?? []).map(post => {
      return {
        queryKey: ["posts", post.id],
        queryFn: () => getPost(post.id)
      }
    })
  })

  console.log(queries.map(q => q.data));


  if (postsQuery.isLoading) return <h1>Loading.....</h1>

  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }

  return <div>
    <h1>Posts List 1</h1>
    <ol>
      {postsQuery.data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ol>
  </div>
};

export default PostsList1