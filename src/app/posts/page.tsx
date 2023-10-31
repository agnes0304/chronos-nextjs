const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Browse from "@/components/search/Browse";

type Post = {
  id: number;
  title: string;
  body: string;
  filename: string;
  createdAt: string;
}

async function getAll() {
  try {
    const res = await axios.get(`${baseUrl}/posts`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
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
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>{post.filename}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
