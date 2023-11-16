import axios from "axios";

export const getPosts = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos").then(res => res.data)
  // return [
  //   { id: 1, title: 'Title 1' },
  //   { id: 2, title: 'Title 2' },
  // ]
};

export const getPost = (id: number) => {
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => res.data)
};
export const getUser = (id: number) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.data)
};
