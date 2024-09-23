import React, { useState } from "react";
import { removeData, updateData } from "../api/todo";
import ConfirmModal from "./Modal/ConfirmModal";
import { toast } from "react-toastify";
import {
  MdOutlineEdit,
  MdOutlineDeleteOutline,
  MdOutlineCheck,
} from "react-icons/md";

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
  const [originalTitle, setOriginalTitle] = useState(item.title);
  const [status, setStatus] = useState(item.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handlerDelete = async (id: number) => {
    try {
      const res = await removeData(id);
      console.log(res);
      handleGetData();
      toast.success(`Deleted ${res.data.deleted.title} Successfully`);
    } catch (err) {
      console.log(err);
      toast.error(`Something went wrong ${err}`);
    }
  };

  const openModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      handlerDelete(selectedId);
    }
    closeModal();
  };

  const handlerEdit = () => {
    setIsEdit(true);
    setOriginalTitle(title);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleConfirm = async (id: number) => {
    if (title.trim() === "") {
      toast.error("You can't change title to empty!");
      setTitle(originalTitle);
      setIsEdit(false);
      return;
    }

    try {
      await updateData(id, { title, status });
      await handleGetData();
      toast.success(`Edit "${title}" Successfully`);
    } catch (err) {
      console.log(err);
      toast.error(`Something went wrong ${err}`);
    } finally {
      setIsEdit(false);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const newStatus = !status;
      setStatus(newStatus);
      await updateData(id, { title, status: newStatus });
      await handleGetData();
      if (newStatus) {
        toast.success(`Well done! You have completed "${title}"`);
      } else {
        toast.success(`"${title}" is marked as incomplete.`);
      }
    } catch (err) {
      console.log(err);
      toast.error(`Something went wrong ${err}`);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <div
        className={`${
          status ? "bg-green-200" : "bg-blue-200"
        } rounded-xl shadow-lg`}
      >
        <div className="flex justify-between gap-4 p-4 flex-col sm:flex-row">
          <div className="flex items-center flex-wrap">
            {isEdit ? (
              <input
                className="p-2 rounded-xl"
                type="text"
                onChange={handleOnChange}
                value={title}
              />
            ) : (
              <h3 className="text-2xl font-sans break-all text-start">
                {item.title}
              </h3>
            )}
          </div>
          <div className="flex gap-4">
            {isEdit ? (
              <button
                className="bg-green-200 rounded-lg p-2 hover:bg-green-500 transition-all duration-200 w-12 h-12"
                onClick={() => handleConfirm(item.id)}
              >
                <MdOutlineCheck className="text-3xl" />
              </button>
            ) : (
              <button
                className="bg-yellow-200 rounded-lg p-2 hover:bg-yellow-500 transition-all duration-200 w-12 h-12"
                onClick={handlerEdit}
              >
                <MdOutlineEdit className="text-3xl" />
              </button>
            )}
            <button
              onClick={() => openModal(item.id)}
              className="bg-red-200 rounded-lg p-2 hover:bg-red-500 transition-all duration-200 w-12 h-12"
            >
              <MdOutlineDeleteOutline className="text-3xl" />
            </button>
            <ConfirmModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={confirmDelete}
              message="Are you sure you want to delete this item?"
            />
          </div>
        </div>
        <div className="flex justify-start p-4">
          <label className="inline-flex items-center cursor-pointer hover:scale-105 transition-all duration-200">
            <input
              type="checkbox"
              checked={status}
              onChange={() => handleToggleStatus(item.id)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default List;
