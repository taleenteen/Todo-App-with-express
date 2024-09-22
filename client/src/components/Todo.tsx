import React, { useState, useEffect } from "react";
import List from "./List";
import { getData, createData } from "../api/todo";

interface TodoItem {
  id: number;
  title: string;
  status: boolean;
}

const Todo = () => {
  const [data, setData] = useState<TodoItem[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    handleGetData();
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddData = async () => {
    try {
      const newTodo = { title, status: false };
      await createData(newTodo);
      await handleGetData();

      setTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetData = async () => {
    try {
      const res = await getData();
      setData(res.data.todos);
    } catch (err) {
      console.log(err);
    }
  };

  const incompleteTodos = data.filter((item) => !item.status);
  const completedTodos = data.filter((item) => item.status);

  return (
    <div className="text-center mt-12">
      <div>
        <h1 className="text-3xl font-bold">Todo App !</h1>
      </div>
      <div className="flex justify-center gap-6 my-6">
        <input
          className="p-2 border-red-100 border-4 rounded-md"
          type="text"
          name="title"
          onChange={handleOnChange}
          value={title}
        />
        <button
          className="bg-blue-400 px-6 py-2 rounded-xl"
          onClick={handleAddData}
        >
          Add Todo
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Not Done</h2>
        {incompleteTodos.map((item) => (
          <List key={item.id} item={item} handleGetData={handleGetData} />
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold my-4">Done</h2>
        {completedTodos.map((item) => (
          <List key={item.id} item={item} handleGetData={handleGetData} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
