import axios from "axios";

export const getPosts = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos").then(res => res.data)
  // return [
  //   { id: 1, title: 'Title 1' },
  //   { id: 2, title: 'Title 2' },
  // ]
};
