import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface Post {
  id: number;
  title: string;
  body: string;
  filename: string;
  createdAt: string;
  updatedAt: string;
}

interface PostProps {
  post: Post;
}

export async function getServerSideProps(context: any) {
  const { title } = context.params;
  const res = await axios.get(`${baseUrl}/posts/${title}`);
  const post = res.data;

  return {
    props: {
      post,
    },
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>{post.createdAt}</p>
        <p>{post.updatedAt}</p>
        <p>{post.filename}</p>
    </div>
  );
};
export default Post;
