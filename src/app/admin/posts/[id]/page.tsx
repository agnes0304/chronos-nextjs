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

  return (
    <div className="flex flex-col w-[90vw] justify-start items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        
      </div>
    </div>
  );
};

export default AdminPostEditPage;
