"use client";
import axios from "axios";
import Link from 'next/link'
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faArrowRight } from "@fortawesome/free-solid-svg-icons";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type ActionsProps = {
  fileName: string;
  blogLink: string;
  isPaid: boolean;
  price: number;
};

const Actions = ({ fileName, blogLink, isPaid, price }: ActionsProps) => {
  const [fileUrl, setFileUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    const getFileUrl = async () => {
      try {
        const res = await axios.get(`${baseUrl}/download/${fileName}`);
        setFileUrl(res.data.url);
      } catch (error) {
        console.log(error);
      }
    };
    getFileUrl();
  }, []);

  const downloadHandler = async () => {
    try {
      const res = await fetch(fileUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const paymentHandler = async () => {
    const body = {
      price: price,
    };
  
    try {
      const res = await axios.post(`${baseUrl}/payment`, body);
      if (res.data.status === 'success') {
        const redirectUrl = res.data.url;
        setRedirectUrl(redirectUrl);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={isPaid ? paymentHandler : downloadHandler}
        className="h-[30px] border border-gray-400 rounded-full text-sm text-gray-400 flex justify-center items-center group p-1 px-2 hover:border-indigo-300 hover:bg-indigo-300 hover:text-white active:bg-indigo-400 active:shadow-inner transition-all duration-200 ease-in-out"
      >
        {isPaid ? (
          <span className="mr-1">구매하기</span>
        ) : (
          <Link href={redirectUrl} className="mr-1">다운로드</Link>
        )}
        {/* <span className="mr-1">{isPaid ? '구매하기':'다운로드'}</span> */}
        <FontAwesomeIcon icon={faDownload} />
      </button>
      <button
        type="button"
        className="h-[30px] border border-gray-400 rounded-full text-sm text-gray-400 flex justify-center items-center group p-1 px-2 hover:border-indigo-300 hover:bg-indigo-300 hover:text-white active:bg-indigo-400 active:shadow-inner transition-all duration-200 ease-in-out"
      >
        <a href={blogLink} target="_blank" className="mr-1">
          자세히 보기
        </a>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Actions;
