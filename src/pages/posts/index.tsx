// import axios from "axios";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// interface Post {
//   id: number;
//   title: string;
//   body: string;
//   filename: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface PostProps {
//   posts: Post[];
// }

// export async function getServerSideProps() {
//   const res = await axios.get(`${baseUrl}/posts`);
//   console.log(res);
//   const posts = res.data;
//   console.log(posts);
//   return {
//     props: {
//       posts,
//     },
//   };
// }

// const Posts: React.FC<PostProps> = ({ posts }) => {
//   return (
//     <div>
//       <h1>PostList</h1>
//       {posts.map((post) => (
//         <div key={post.id}>{/* Render each post */}</div>
//       ))}
//     </div>
//   );
// };

// export default Posts;

const Posts = () => {
  return (
    <div>
      <h1>PostList</h1>
      
    </div>
  );
};

export default Posts;