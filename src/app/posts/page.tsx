const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Browse from "@/components/search/Browse";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
  filename: string;
  filename_ex: string;
  bloglink: string;
  createdAt: string;
};

async function getAll(query?: { [key: string]: string | string[] }) {
  try {
    if(query){
      const params = new URLSearchParams();
      for (const key in query) {
        const value = query[key];
        if (Array.isArray(value)) {
          value.forEach(item => params.append(key, item));
        } else {
          params.append(key, value);
        }
      }
      const res = await axios.get(`${baseUrl}/posts`, {
        params: params
      });
      return res.data;
    } else {
      const res = await axios.get(`${baseUrl}/posts`);
      return res.data;
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}


const Posts = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] }
}) => {
  let data: Post[] = [];
  
  try {
    if (searchParams){
      data = await getAll(searchParams);
    } else {
      data = await getAll();
    }   
  } catch (error) {
    console.error("An error occurred:", error);
  }

  return (
    <div className="flex h-[100vh] w-[90vw] flex-col items-start">
      <Browse />
      <div className="flex justify-center items-baseline">
        <div className="text-gray-400 mr-1">
          <FontAwesomeIcon icon={faList} />
        </div>
        <h1 className="text-gray-400 my-2">PostList</h1>
      </div>
      <div className="grid gap-2 w-[90vw] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data.map((post) => (
        <div
          key={post.id}
          className="flex flex-col max-h-32 w-full justify-between border rounded border-gray-300 p-2"
        >
          <Link href={`/posts/${post.id}`} className="text-lg text-gray-400 hover:text-gray-700">
            {post.title}
          </Link>
          <p className="text-sm text-gray-400 overflow-auto">{post.body}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Posts;
