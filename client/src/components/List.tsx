import React, { useState } from "react";
import { removeData, updateData } from "../api/todo";

interface TodoItem {
  id: number;
  title: string;
  status: boolean;
}

interface ListProps {
  item: TodoItem;
  handleGetData: () => Promise<void>;
}

const List: React.FC<ListProps> = ({ item, handleGetData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [status, setStatus] = useState(item.status);

  const handlerDelete = async (id: number) => {
    try {
      const res = await removeData(id);
      console.log(res);
      handleGetData();
    } catch (err) {
      console.log(err);
    }
  };

  const handlerEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleConfirm = async (id: number) => {
    setIsEdit(!isEdit);
    try {
      await updateData(id, { title, status });
      await handleGetData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const newStatus = !status;
      setStatus(newStatus);
      await new Promise((resolve) => setTimeout(resolve, 300));
      await updateData(id, { title, status: newStatus });
      await handleGetData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={status ? "bg-green-500" : "bg-gray-500"}>
      <div className="p-12">
        {isEdit ? (
          <input type="text" onChange={handleOnChange} value={title} />
        ) : (
          <span>{item.title}</span>
        )}
        {isEdit ? (
          <button onClick={() => handleConfirm(item.id)}>Confirm</button>
        ) : (
          <button onClick={handlerEdit}>Edit</button>
        )}
        <button onClick={() => handlerDelete(item.id)}>Delete</button>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={status}
            onChange={() => handleToggleStatus(item.id)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

export default List;
