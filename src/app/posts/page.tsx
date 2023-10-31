const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Browse from "@/components/search/Browse";
import Link from "next/link";
import summary from "../../../public/summary.webp";
import Actions from "@/components/post/Actions";

type Post = {
  id: number;
  title: string;
  body: string;
  filename: string;
  createdAt: string;
};

async function getAll() {
  try {
    const res = await axios.get(`${baseUrl}/posts`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

const Posts = async () => {
  let data: Post[] = [];

  try {
    data = await getAll();
  } catch (error) {
    console.error("An error occurred:", error);
  }

  return (
    <div className="flex h-[100vh] pt-[52px] flex-col items-start">
      <Browse />
      <div className="flex justify-center items-baseline">
        <div className="text-gray-400 mr-1">
          <FontAwesomeIcon icon={faList} />
        </div>
        <h1 className="text-gray-400 my-2">PostList</h1>
      </div>
      {data.map((post) => (
        <div
          key={post.id}
          className="flex w-full h-[120px] border rounded border-gray-300 p-1 px-2"
        >
          <div className="relative w-auto h-full group shrink-0">
            <img
              className="w-full h-full overflow-hidden object-cover hover:opacity-30 transition-opacity duration-300"
              src={summary}
            />
            <div className="absolute text-2xl text-gray-400 pointer-events-none opacity-0 top-[35%] left-[42%] group-hover:opacity-100 transition-opacity duration-300">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-1 ml-2 mb-1">
            <Link href={`/posts/${post.id}`} className="text-lg text-gray-400">
              {post.title}
            </Link>
            <p className="text-sm text-gray-400 overflow-auto">{post.body}</p>
            <Actions />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
