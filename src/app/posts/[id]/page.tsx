import axios from "axios";
import Image from "next/image";
import Fdate from "@/components/Fdate";
import Actions from "@/components/post/Actions";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
    filename_ex: "",
    bloglink: "",
    createdAt: "",
    isPaid: false,
    price: 0,
  };

  try {
    if (typeof params.id === "string") {
      data = await getPost(params.id);
      console.log(data);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  return (
    <article className="w-[90vw] h-[100vh] flex flex-col justify-start gap-2 pb-[100px] lg:w-[70%] lg:mx-auto">
      <div>
        <h1 className="text-lg text-gray-400">{data.title}</h1>
        <div className="text-xs font-light text-gray-400 text-right"><Fdate dateStr={data.createdAt} /></div>
      </div>
      <div
        className="flex justify-center items-center w-full overflow-hidden object-cover"
      >
        <Image src={`/${data.filename}.webp`} layout="responsive" width={100} height={100} objectFit="cover" objectPosition="center" alt={`${data.filename} image`} />
      </div>
      <div>
        <p className="text-gray-500">{data.body}</p>
      </div>
      <Actions fileName={data.filename_ex} blogLink={data.bloglink} isPaid={data.isPaid} price={data.price} />
    </article>
  );
};

export default Post;
