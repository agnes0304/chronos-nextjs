"use client";
import { useEffect, useState } from "react";
import { checkUserAuthorization } from "@/components/admin/CheckAuth";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import Link from "next/link";

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

async function getPosts() {
  try {
    const res = await fetch(`${baseUrl}/posts`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("getPosts 내부 에러: ", error);
  }
}

const AdminPostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPostData = async () => {
    try {
      const postData = await getPosts();
      setPosts(postData);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    const authorizeAndFetch = async () => {
      const isAuthorized = await checkUserAuthorization();
      if (isAuthorized) {
        fetchPostData();
      }
    };
    authorizeAndFetch();
  }, []);

  return (
    <div className="flex flex-col w-[90vw] justify-start items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-600">POSTLIST</h1>
          <div className="flex gap-2">
            <button
              className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
              type="button"
              onClick={() => (window.location.href = "/admin/posts/create")}
            >
              포스트 생성
            </button>
            <button
              className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
              type="button"
              onClick={() => (window.location.href = "/admin/order")}
            >
              주문서 확인
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead className="text-white text-sm font-normal uppercase bg-indigo-400">
            <tr>
              <td className="py-1 text-center p-4">ID</td>
              <td className="py-1 text-center p-4">제목</td>
              <td className="py-1 text-center p-4">유료 여부</td>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-500">
            {posts.length === 0 && (
              <tr className="text-center">
                <td className="py-1">표시 가능한</td>
                <td className="py-1">자료가</td>
                <td className="py-1">없습니다.</td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="text-center hover:bg-indigo-200 hover:text-gray-600 hover:font-medium active:bg-indigo-300 active:text-gray-700 active:font-medium">
                <td className="py-1">{post.id}</td>
                <Link href={`/admin/posts/${post.id}`}>
                  <td className="py-1">{post.title}</td>
                </Link>
                <td className="py-1">{post.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPostPage;
