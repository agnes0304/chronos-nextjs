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

async function getPost(params: any) {
  try {
    const res = await axios.get(`${baseUrl}/posts/${params}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

const Post = async () => {
  const router = useRouter();
  const { param } = router.query;

  let data: Post[] = [];

  try {
    data = await getPost(param);
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
