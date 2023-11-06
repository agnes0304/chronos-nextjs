const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Browse from "@/components/search/Browse";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
  filename: string;
  filename_ex: string;
  bloglink: string;
  createdAt: string;
};

// sample: {'search': '조선어학회'} 가 query로 들어옴
async function getAll(query?: {
  [key: string]: string | string[] | undefined;
}) {
  try {
    const generateQueryString = (params: {
      [key: string]: string | string[] | undefined;
    }) => {
      return Object.entries(params)
        .filter(([, value]) => value !== undefined) // filter out undefined values
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value
              .map(
                (item) =>
                  `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
                  // `${key}=${item}`
              )
              .join("&");
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
          // return `${key}=${value as string}`;
        })
        .join("&");
    };
    const queryString = query ? generateQueryString(query) : "";
    console.log(queryString); // print success -> search=조선어학회

    // console.log(`${baseUrl}/posts${queryString ? `?${queryString}` : ""}`); // print success -> http://localhost:3000/api/posts?search=조선어학회
    const res = await axios.get(
      `${baseUrl}/posts${queryString ? `?${queryString}` : ""}`
    );
    console.log(res.data); // print fail -> 서버 에러?
    return res.data;
  } catch (error) {
    throw new Error("getAll 에러! Failed to fetch data");
  }
}

const Posts = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams); // print success
  let data: Post[] = [];
  try {
    data = await getAll(searchParams);
  } catch (error) {
    console.error("Posts내부여! error occurred:", error);
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
      <div className="grid gap-2 w-[90vw] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => (
          <div
            key={post.id}
            className="flex flex-col max-h-32 w-full justify-between border rounded border-gray-300 p-2"
          >
            <Link
              href={`/posts/${post.id}`}
              className="text-lg text-gray-400 hover:text-gray-700"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-400 overflow-auto">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
