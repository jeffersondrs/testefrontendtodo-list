import { useState, useEffect, useCallback } from "react";
import EditModal from "../editemodal/EditModal";
import DeleteModal from "../deletemodal/DeleteModal";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

interface Posts {
  id: number;
  username: string;
  title: string;
  content: string;
  created_datetime: string;
}

export default function Post() {
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [data, setData] = useState<Posts[]>([]);
  const [limit, setLimit] = useState(10);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const handleCloseDeleteModal = () => {
    setIsDeleteModal(!isDeleteModal);
  };

  const fetchAPI = useCallback(async () => {
    const response = await fetch(
      `https://dev.codeleap.co.uk/careers/?limit=${limit}&offset=0&username=`
    );
    const data = await response.json();
    setData(data.results);
  }, [limit]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const handleModal = (itemId: number) => {
    setEditingItemId(itemId);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  return (
    <>
      <section className="flex flex-col w-full items-center justify-center flex-1 gap-6">
        {data.map((item) => {
          const isEditing = editingItemId === item.id;
          return (
            <div
              className="rounded-2xl sm:w-full md:w-full w-[754px]"
              key={item.id}
            >
              <header className="flex flex-row justify-between items-center bg-[#7695EC] h-[70px] rounded-t-2xl p-6 text-[#FFFFFF]">
                <h1 className="text-[22px] w-full font-bold leading-6">
                  {item.title}
                </h1>
                {item.username === "Jeffrey" && (
                  <div className="flex flex-row gap-3">
                    <button className="font-bold text-[14px] leading-6">
                      <MdDeleteForever onClick={handleCloseDeleteModal} />
                    </button>
                    <button className="font-bold text-[14px] leading-6">
                      <BiEdit onClick={() => handleModal(item.id)} />
                    </button>
                  </div>
                )}
              </header>
              {isEditing && (
                <div className="fixed modal w-screen h-screen flex justify-center items-center top-0 left-0">
                  <EditModal
                    content={item.content}
                    title={item.title}
                    id={item.id}
                    cancelEdit={handleCancelEdit}
                  />
                  <span
                    onClick={handleCancelEdit}
                    className="z-10 w-screen h-screen md:h-full md:w-full sm:h-full sm:w-full opacity-50 bg-slate-600 top-0 left-0 flex flex-col items-center justify-center hover:cursor-pointer"
                  ></span>
                </div>
              )}
              {isDeleteModal && (
                <div className="fixed modal w-screen h-screen flex justify-center items-center top-0 left-0">
                  <DeleteModal
                    id={item.id}
                    cancelDelete={() => setIsDeleteModal(!isDeleteModal)}
                  />
                  <span
                    onClick={handleCloseDeleteModal}
                    className="z-10 w-screen h-screen md:h-full md:w-full sm:h-full sm:w-full opacity-50 bg-slate-600 top-0 left-0 flex flex-col items-center justify-center hover:cursor-pointer"
                  ></span>
                </div>
              )}
              <div className="border-[#999999] border rounded-b-2xl p-6 flex flex-col gap-2">
                <div className="flex flex-row justify-between w-full text-[#777777]">
                  <span>{item.username}</span>
                  <span>
                    {formatDistanceToNow(new Date(item.created_datetime), {
                      locale: enUS,
                    })}{" "}
                    ago
                  </span>
                </div>
                <p className="text-[#000000] max-w-full">{item.content}</p>
              </div>
            </div>
          );
        })}
        <button
          className="font-bold text-[#FFFFFF] rounded-lg leading-[18.75px] text-center bg-[#7695EC] w-[120px] h-8"
          onClick={() => setLimit(limit + 10)}
        >
          Load more
        </button>
      </section>
    </>
  );
}
