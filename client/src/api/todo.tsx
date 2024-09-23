import axios from "axios";
const ENDPOINT = "http://localhost:5000/todo";

export interface Body {
  title: string;
  status: boolean;
}

export const getData = async () => await axios.get(ENDPOINT);

export const removeData = async (id: number) =>
  await axios.delete(ENDPOINT + "/" + id);

export const createData = async (data: Body) =>
  await axios.post(ENDPOINT, data);

export const updateData = async (id: number, data: Body) =>
  await axios.put(ENDPOINT + "/" + id, data);
