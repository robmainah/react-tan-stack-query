import axios from "axios";
import { Post, User } from "../types";

export const getPosts = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos").then(res => res.data)
};

export const getPost = (id: number): Promise<Post> => {
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => res.data)
};

export const getUser = (id: number): Promise<User> => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.data)
};

export const createPost = ({ title, body }: Post) => {
  return axios.post("https://jsonplaceholder.typicode.com/todos", {
    title,
    body,
  }).then(res => res.data)
};
