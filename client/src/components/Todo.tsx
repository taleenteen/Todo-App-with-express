import React, { useState, useEffect } from "react";
import List from "./List";
import { getData, createData } from "../api/todo";
import { toast } from "react-toastify";

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
    if (title.trim() === "") {
      toast.error("Title cannot be empty!");
      return;
    }

    try {
      const newTodo = { title, status: false };
      await createData(newTodo);
      await handleGetData();
      toast.success(`Add Todo "${newTodo.title}" Successfully`);

      setTitle("");
    } catch (err) {
      console.log(err);
      toast.error(`Something went wrong: ${err}`);
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
        <h1 className="text-3xl font-bold">Todo List</h1>
      </div>
      <div className="flex justify-center gap-6 my-6 ">
        <input
          className="p-2 border-black border-[1px] rounded-xl shadow-lg"
          type="text"
          name="title"
          onChange={handleOnChange}
          value={title}
        />
        <button
          className="bg-indigo-300 text-lg hover:scale-110 px-6 py-2 rounded-xl shadow-lg hover:bg-indigo-500 transition-all duration-300"
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
