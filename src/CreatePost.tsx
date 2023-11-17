import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Post as PostTypes } from "./types";
import { createPost } from "./api/api";
import Post from "./Post";

export default function CreatePost({ setCurrentPage }) {
  const queryClient = useQueryClient()

  const titleRef = useRef<HTMLInputElement | null>(null)
  const bodyRef = useRef<HTMLInputElement | null>(null)

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess(data: PostTypes) {
      queryClient.setQueriesData(["posts", data.id], data) // set data manually to cache
      queryClient.invalidateQueries(["posts"], { exact: true })
      setCurrentPage(<Post id={data.id} />)
    },
  })


  const handleSubmit = (e: Event) => {
    e.preventDefault()
    createPostMutation.mutate({
      title: titleRef.current?.value,
      body: bodyRef.current?.value,
      userId: 1
    } as PostTypes)
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" id="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body" id="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button id="submit" disabled={createPostMutation.isPending}>
          {createPostMutation.isPending ? "isLoading..." : "Create"}
        </button>
      </form>
    </div>
  )
};
