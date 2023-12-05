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
        <h1 className="text-xl font-semibold text-gray-600">POSTLIST</h1>
        <table className="w-full">
          <thead className="text-white text-sm font-normal uppercase bg-indigo-500">
            <tr>
              <td className="py-1 bpost text-center p-4">ID</td>
              <td className="py-1 bpost text-center p-4">제목</td>
              <td className="py-1 bpost text-center p-4">유료 여부</td>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-500">
            {posts.length === 0 && (
              <tr className="text-center bpost-b">
                <td className="py-1">.</td>
                <td className="py-1">.</td>
                <td className="py-1">.</td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="text-center bpost-b">
                <td className="py-1">{post.id}</td>
                <Link href={`/posts/${post.id}`}><td className="py-1">{post.title}</td></Link>
                <td className="py-1">{post.isPaid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPostPage;
