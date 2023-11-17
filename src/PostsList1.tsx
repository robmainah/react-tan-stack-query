import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPost, getPosts } from "./api/api"

function PostsList1() {
  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // initialData: [{ id: 100, title: 'initial title' }],
    placeholderData: [{ id: 100, title: 'initial title' }],
  })

  /*
    // get bunch of ids at the same time   
    const queries = useQueries({
      queries: (postsQuery.data ?? []).map(post => {
        return {
          queryKey: ["posts", post.id],
          queryFn: () => getPost(post.id)
        }
      })
    })
  
    console.log(queries.map(q => q.data)); */

  const prefetchPost = () => {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getPost(1),
    })
  }

  prefetchPost()

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