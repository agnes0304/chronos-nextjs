const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface Post {
  id: number;
  title: string;
  body: string;
  filename: string;
  createdAt: string;
}

async function getAll() {
  const res = await fetch(`${baseUrl}/posts`);
  const data = await res.json();

  // console.log(data);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return data;
}

const Posts = () => {
  let data: Post[] = [];

  (async () => {
    try {
      data = await getAll();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  })();

  return (
    <div>
      <h1>Post List</h1>
      {data.map((post) => (
        <div key={post.id}>post[0]</div>
      ))}
    </div>
  );
};

export default Posts;