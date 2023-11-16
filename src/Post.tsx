import { useQuery } from "@tanstack/react-query"
import { getPost, getPosts, getUser } from "./api/posts"

function Post({ id }: { id: number }) {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  })

  const userQuery = useQuery({
    queryKey: ["users", postQuery.data?.userId],
    enabled: !!postQuery.data?.userId,
    queryFn: () => getUser(postQuery.data?.userId),
  })

  if (postQuery.isLoading) return <h1>Loading.....</h1>

  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>
  }

  return <div>
    <h1>
      {postQuery.data.title} <br />
      <small>
        {userQuery.isLoading ? "Loading User..." : userQuery.isError ? "Error Loading user" : userQuery.data.name}
      </small>
    </h1>
    <p>{postQuery.data.body}</p>
  </div>
};

export default Post