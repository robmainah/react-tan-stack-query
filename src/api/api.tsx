import axios from "axios";
import { IPost, User } from "../types";

export const getPosts = () => {
  return axios.get("http://localhost:3000/todos").then(res => res.data)
};

export const getPost = (id: number): Promise<IPost> => {
  return axios.get(`http://localhost:3000/todos/${id}`).then(res => res.data)
};

export const getUser = (id: number): Promise<User> => {
  return axios.get(`http://localhost:3000/users/${id}`).then(res => res.data)
};

export const createPost = ({ title, body, userId }: IPost) => {
  return axios.post("http://localhost:3000/todos", {
    title,
    body,
    userId,
  }).then(res => res.data)
};

export const getPostsPaginated = (page: number) => {
  const data = axios.get(`http://localhost:3000/todos?_page=${page}&_limit=2`).then(res => res.data)

  return {
    posts: data,
    previousPage: page !== 1,
    nextPage: true,
  }
};
