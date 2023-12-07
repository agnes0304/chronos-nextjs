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
  let err: any;
  try {
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
    <div className="flex h-[100vh] w-[90vw] flex-col">
      <div className="flex flex-col justify-center items-center">
        <Browse />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex justify-center items-baseline">
          <div className="text-gray-400 mr-1">
            <FontAwesomeIcon icon={faList} />
          </div>
          <h1 className="text-gray-400 my-2">PostList</h1>
          <p className="hidden">{JSON.stringify(searchParams)}</p>
        </div>
        {!data || data.length === 0 ? (
          <>
            <p>{err}</p>
            <NoPost />
          </>
        ) : (
          <div className="grid gap-4 w-[90vw] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10">
            {data.map((post: any) => (
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
                className="flex flex-col max-h-32 w-full justify-between border rounded-xl bg-white border-gray-300 p-3 transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md hover:bg-indigo-50 hover:border-indigo-50 hover:z-20"
              >
                <h2 className="text-lg text-gray-600">{post.title}</h2>
                <div
                  className="text-sm text-gray-500 overflow-hidden mt-2"
                  dangerouslySetInnerHTML={{ __html: post.body }}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
