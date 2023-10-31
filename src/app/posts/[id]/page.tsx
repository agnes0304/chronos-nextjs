import axios from "axios";

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
    <div>
      <div>
        <h2>{data.title}</h2>
        <p>{data.body}</p>
        <p>{data.filename}</p>
        <p>{data.createdAt}</p>
      </div>
    </div>
  );
};

export default Post;
