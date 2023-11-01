"use client";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faArrowRight } from "@fortawesome/free-solid-svg-icons";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type ActionsProps = {
  fileName: string;
};

const Actions = ({ fileName }: ActionsProps) => {
  // downloadHandler: onClick on download button, fetch url from api: '/download/<string:file_name>'
  const downloadHandler = async () => {
    try {
      // 📌 s3에 file name 설정 완료 되면
      // const res = await axios.get(`${baseUrl}/download/${fileName}`);
      // console.log(fileName)

      // 📌 hard coding
      const res = await axios.get(`${baseUrl}/download/ver1.5_일제강점기_요약_본고딕.`);
      const s3url = res.data.url;
      console.log(s3url); // fetching url ok

      // ERROR: NoSuchKey

      // window.open(s3url, '_blank');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={downloadHandler}
        className="h-[30px] border border-gray-400 rounded-full text-sm text-gray-400 flex justify-center items-center group p-1 px-2 hover:border-indigo-300 hover:bg-indigo-300 hover:text-white active:bg-indigo-400 active:shadow-inner transition-all duration-200 ease-in-out"
      >
        <span className="mr-1">다운로드</span>
        <FontAwesomeIcon icon={faDownload} />
      </button>
      <button
        type="button"
        className="h-[30px] border border-gray-400 rounded-full text-sm text-gray-400 flex justify-center items-center group p-1 px-2 hover:border-indigo-300 hover:bg-indigo-300 hover:text-white active:bg-indigo-400 active:shadow-inner transition-all duration-200 ease-in-out"
      >
        <span className="mr-1">자세히 보기</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Actions;
