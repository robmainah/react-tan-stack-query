import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getPosts, getPostsPaginated } from "./api/api"

function PostsListInfinite() {
  const { status, error, data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    getNextPageParam: prevData => prevData.nextPage,
    queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam)
  })

  if (status === "pending") return <h1>Loading.....</h1>
  if (status === "error") return <pre>{JSON.stringify(error)}</pre>

  return <div>
    <h1>Posts List infinet</h1>
    {data.pages.flatMap(data => data.posts).map(post => (
      <div key={post.id}>{post.title}</div>
    ))}
    {hasNextPage && (
      <button onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? "Loading..." : "Load more"}
      </button>
    )}
  </div>
};

export default PostsListInfinite