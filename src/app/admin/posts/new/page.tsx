"use client";
import TextEditor from "@/components/editor/TextEditor";
import { useState } from "react";

const AdminNewPostPage = () => {
    const [body, setBody] = useState<string>("");


    const handleBodyChange = (content: any) => {
        setBody(content);
    };
  return (
    <div className="flex flex-col w-[90vw] justify-start items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <h1 className="text-xl font-semibold text-gray-600">POST EDIT</h1>
        {/* 포스트 생성 */}
        <TextEditor onContentChange={handleBodyChange}/>
      </div>
    </div>
  );
};

export default AdminNewPostPage;
