import axios from "axios";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import summary from "../../../../public/summary.webp";
import Actions from "@/components/post/Actions";

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
    <>
      <div className="flex w-full h-[120px] border rounded border-gray-300 p-1 px-2">
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
          <h1 className="text-lg text-gray-400">{data.title}</h1>
          <p className="text-sm text-gray-400 overflow-auto">{data.body}</p>
          <Actions />
        </div>
      </div>
    </>
  );
};

export default Post;
