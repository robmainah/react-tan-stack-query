import { useQuery } from "@tanstack/react-query"
import { getPosts, getPostsPaginated } from "./api/api"
import { useState } from "react"
import { IPost } from "./types"

function PostsListPaginated() {
  const [page, setPage] = useState(1)

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ["posts", { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page),
  })

  if (status === "pending") return <h1>Loading.....</h1>
  if (status === "error") return <pre>{JSON.stringify(error)}</pre>

  return <div>
    <h1>
      Posts List paginated
      <br />
      <small>{isPreviousData && "Previous Data"}</small>
    </h1>
    <div>{JSON.stringify(data.posts)}</div>
    {/* {data.posts.map(post => (
      <div key={post.id}>{post.title}</div>
    ))} */}
    {data.previousPage && (
      <button onClick={() => setPage(data.previousPage)}>Previous</button>
    )}{" "}
    {data.nextPage && (
      <button onClick={() => setPage(data.nextPage)}>Next</button>
    )}
  </div>
};

export default PostsListPaginated