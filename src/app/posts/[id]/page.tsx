import axios from "axios";
import Image from "next/image";
import summary from "../../../../public/summary.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type Post = {
  id: number;
  title: string;
  body: string;
  filename: string;
  createdAt: string;
};

async function getPost(param: string) {
  const paramId = Number(param);
  try {
    const res = await axios.get(`${baseUrl}/posts/${paramId}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

const Post = async ({ params }: { params: { id: string } }) => {
  let data: Post = {
    id: 0,
    title: "",
    body: "",
    filename: "",
    createdAt: "",
  };

  try {
    if (typeof params.id === "string") {
      data = await getPost(params.id);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  return (
    <article className="w-[90vw]">
      <div>
        <h1 className="text-lg text-gray-400">{data.title}</h1>
        <p className="text-sm text-gray-300">{data.createdAt}</p>
      </div>
      <div
        className="w-full overflow-hidden object-cover
              hover:opacity-30 transition-opacity duration-300"
      >
        <Image src={summary} alt="sample image" />
      </div>
      <div>
        <p className="text-gray-500">{data.body}</p>
      </div>
    </article>
  );
};

export default Post;
