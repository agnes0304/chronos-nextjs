"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function getPost(param: string) {
  try {
    const res = await fetch(`${baseUrl}/posts/${param}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

const AdminPostEditPage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [filenameEx, setFilenameEx] = useState<string>("");
  const [bloglink, setBloglink] = useState<string>("");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);

  const params = useParams();

  useEffect(() => {
    if (typeof params.id === "string") {
      getPost(params.id).then((res) => {
        setTitle(res.title);
        setBody(res.body);
        setFilename(res.filename);
        setFilenameEx(res.filename_ex);
        setBloglink(res.bloglink);
        setIsPaid(res.isPaid);
        setPrice(res.price);
      });
    }
  }, []);

  const updatePostHandler = async () => {
    const updatedPost = {
      title: title,
      body: body,
      filename: filename,
      filename_ex: filenameEx,
      bloglink: bloglink,
      isPaid: isPaid,
      price: price,
    };

    try {
      const res = await fetch(`${baseUrl}/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      const data = await res.json();
      console.log(data);
      if (data.message) {
        alert("포스트 수정에 성공했습니다.");
        window.location.href = "/admin/posts";
      } else {
        alert("포스트 수정에 실패했습니다.");
      }
    } catch (error) {
      alert("포스트 수정에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col w-[90vw] justify-start items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <h1 className="text-xl font-semibold text-gray-600">POST EDIT</h1>
        <form className="flex flex-col w-full gap-4">
          <label className="text-sm text-gray-600">TITLE</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-sm text-gray-600">BODY</label>
          {/* Editor 넣고 싶어용 */}
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            defaultValue={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label className="text-sm text-gray-600">FILENAME</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            defaultValue={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <label className="text-sm text-gray-600">FILENAME_EX</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            defaultValue={filenameEx}
            onChange={(e) => setFilenameEx(e.target.value)}
          />
          <label className="text-sm text-gray-600">BLOGLINK</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            defaultValue={bloglink}
            onChange={(e) => setBloglink(e.target.value)}
          />

          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-600">ISPAID</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="checkbox"
              defaultChecked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
            />
          </div>
          <label className="text-sm text-gray-600">PRICE</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="number"
            defaultValue={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
          />
          <div className="flex flex-row justify-end gap-4">
            <button
              className="bg-gray-300 text-black hover:bg-gray-400 active:bg-gray-500 h-[42px] w-[60px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
              type="button"
              onClick={() => (window.location.href = "/admin/posts")}
            >
              취소
            </button>
            <button
              className="bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400 h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
              type="button"
              onClick={() => updatePostHandler()}
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPostEditPage;
