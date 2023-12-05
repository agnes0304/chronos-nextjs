"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
  filename: string;
  filename_ex: string;
  bloglink: string;
  createdAt: string;
  isPaid: boolean;
  price: number;
};

async function getPost(param: string) {
  try {
    const res = await fetch(`${baseUrl}/posts/${param}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

const AdminPostEditPage = () => {
  const [post, setPost] = useState<Post>({} as Post);
  const params = useParams();

  useEffect(() => {
    if (typeof params.id === "string") {
      getPost(params.id).then((res) => {
        console.log(res);
        setPost(res);
      });
    }
  }, []);

  const updatePostHandler = async () => {
    try {
      const res = await fetch(`${baseUrl}/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      console.log(data);
      if (data.message === 0) {
        alert("포스트 수정에 성공했습니다.");
        window.location.href = "/admin/posts";
      } else {
        alert("포스트 수정에 실패했습니다.");
      }
    } catch (error) {
      alert("포스트 수정에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col w-[90vw] justify-start items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <h1 className="text-xl font-semibold text-gray-600">POST EDIT</h1>
        <form className="flex flex-col w-full gap-4">
          <label className="text-sm text-gray-600">TITLE</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            defaultValue={post.title}
          />
          <label className="text-sm text-gray-600">BODY</label>
          {/* Editor 넣고 싶어용 */}
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            defaultValue={post.body}
          />
          <label className="text-sm text-gray-600">FILENAME</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            defaultValue={post.filename}
          />
          <label className="text-sm text-gray-600">FILENAME_EX</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            defaultValue={post.filename_ex}
          />
          <label className="text-sm text-gray-600">BLOGLINK</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            defaultValue={post.bloglink}
          />
          <label className="text-sm text-gray-600">CREATEDAT</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            defaultValue={post.createdAt}
          />
          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-600">ISPAID</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="checkbox"
              defaultChecked={post.isPaid}
            />
          </div>
          <label className="text-sm text-gray-600">PRICE</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            defaultValue={post.price}
          />
          <div className="flex flex-row justify-end gap-4">
            <button
              className="bg-gray-300 text-black hover:bg-gray-400 active:bg-gray-500 h-[42px] w-[60px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
              type="button"
              onClick={() => (window.location.href = "/admin/posts")}
            >
              취소
            </button>
            <button
              className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
              type="button"
              onClick={() => updatePostHandler()}
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPostEditPage;
