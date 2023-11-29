const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Browse from "@/components/search/Browse";
import Link from "next/link";
import NoPost from "@/components/post/NoPost";

type Post = {
  id: number;
  title: string;
  body: string;
  filename: string;
  filename_ex: string;
  bloglink: string;
  createdAt: string;
};

function generateQueryString(params: {
  [key: string]: string | string[] | undefined;
}) {
  // key는 'search'이고 value는 '조선어','학회'인 객체가 들어오면 search=조선어+학회로 만들어줌
  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        return `${key}=${value}.join("+")`;
      }
      return `${key}=${value}`;
    })
    .join("&");
  return queryString;
}

// sample: {'search': '조선어학회'} 가 query로 들어옴
async function getAll(query?: {
  [key: string]: string | string[] | undefined;
}) {
  try {
    const queryString = query ? generateQueryString(query) : "";
    console.log(`HERE, ${queryString}`);

    const res = await axios.get(
      `${baseUrl}/posts${queryString ? `?${queryString}` : ""}`
    );
    return res.data;
  } catch (error) {
    console.error("getAll 에러! error occurred:", error);
    throw error;
  }
}

const Posts = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let data;
  let err:any;
  try {
    console.log("Posts 내부 searchParams:", searchParams);
    data = await getAll(searchParams);

    // Removing duplicates
    const uniqueData = new Map<number, Post>();

    data.forEach((post: any) => {
      uniqueData.set(post.id, post);
    });
    data = Array.from(uniqueData.values());
  } catch (error) {
    err = error;
    console.error("Posts 내부! error occurred:", error);
  }

  return (
    <div className="flex h-[100vh] w-[90vw] flex-col items-start">
      <Browse />
      <div className="flex justify-center items-baseline">
        <div className="text-gray-400 mr-1">
          <FontAwesomeIcon icon={faList} />
        </div>
        <h1 className="text-gray-400 my-2">PostList</h1>
      </div>
      {!data ? (
        <>
          <p>{err}</p>
          <NoPost />
        </>
      ) : (
        <div className="grid gap-2 w-[90vw] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10">
          {data.map((post: any) => (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className="flex flex-col max-h-32 w-full justify-between border rounded border-gray-300 p-2"
            >
              <h2 className="text-lg text-gray-400 hover:text-gray-700">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 overflow-auto">{post.body}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
