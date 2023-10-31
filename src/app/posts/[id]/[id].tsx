import axios from "axios";
import { useRouter } from "next/router";

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

const Post = async () => {
  const router = useRouter();
  const { param } = router.query;
  console.log(param);

  let data: Post[] = [];

  try {
    if (typeof param==="string") {
      data = await getPost(param);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  return (
    <div>
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

export default Post;
