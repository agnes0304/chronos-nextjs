"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TextEditor from "@/components/editor/TextEditor";
import { checkUserAuthorization } from "@/components/admin/CheckAuth";

type PriceOptionType = { option: [string, number] };

async function getPriceOption() {
  try {
    const res = await fetch(`${baseUrl}/posts/create`);
    const data = await res.json();
    if (data.length === 0) {
      alert("가격 옵션이 없습니다. 상품을 먼저 생성해주세요");
    }
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

const AdminNewPostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [filenameEx, setFilenameEx] = useState<string>("");
  const [bloglink, setBloglink] = useState<string>("");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [priceOption, setPriceOption] = useState<PriceOptionType[]>([]);

  const params = useParams();

  useEffect(() => {
    const authorizeAndFetchPrice = async () => {
      const isAuthorized = await checkUserAuthorization();
      if (isAuthorized) {
        getPriceOption().then((res) => {
          setPriceOption(res);
        });
      }
    };
    authorizeAndFetchPrice();
  }, []);

  const handleBodyChange = (content: any) => {
    setBody(content);
  };

  const createPostHandler = async () => {
    const newPost = {
      title: title,
      body: body,
      filename: filename,
      filename_ex: filenameEx,
      bloglink: bloglink,
      isPaid: isPaid,
      price: price,
    };

    try {
      const res = await fetch(`${baseUrl}/posts/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="포스트 제목을 입력하세요"
          />
          <label className="text-sm text-gray-600">BODY</label>
          <div>
            <TextEditor onChange={handleBodyChange} />
          </div>
          <label className="text-sm text-gray-600">FILENAME</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={filename}
            placeholder="S3에 있는 파일명을 확장자 제외하고 입력하세요"
            onChange={(e) => setFilename(e.target.value)}
          />
          <label className="text-sm text-gray-600">FILENAME_EX</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={filenameEx}
            onChange={(e) => setFilenameEx(e.target.value)}
            placeholder="S3에 있는 파일명을 확장자 포함 입력하세요"
          />
          <label className="text-sm text-gray-600">BLOGLINK</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={bloglink}
            onChange={(e) => setBloglink(e.target.value)}
            placeholder="블로그 포스트 링크를 입력하세요"
          />

          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-600">ISPAID</label>
            <input
              className="p-2 border border-gray-300 rounded-md"
              type="checkbox"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
            />
          </div>
          <label className="text-sm text-gray-600">PRICE</label>
          <p className="text-sm text-gray-500 font-normal">선택하려는 가격이 없다면 <span className="font-medium text-rose-500">해당 가격의 상품을 먼저 등록</span>해야 합니다.</p>
          <select
            className={`w-full p-2 border rounded-md ${
              isPaid
                ? "border-gray-300 bg-white"
                : "border-gray-200 bg-gray-100 text-gray-500"
            }`}
            value={isPaid ? price : 0}
            disabled={!isPaid}
            onChange={(e) => {
              const selectedOption = parseInt(e.target.value);
              setPrice(selectedOption);
              setIsPaid(selectedOption !== 0);
            }}
          >
            {priceOption.map((optionItem, index) => {
              return (
                <option key={index} value={optionItem.option[1]}>
                  {optionItem.option[1]}
                </option>
              );
            })}
          </select>
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
              onClick={() => createPostHandler()}
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminNewPostPage;
