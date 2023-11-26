"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

const GotoPaymentSuccess = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div>
      <div
        className="text-gray-500 hover:text-indigo-500 cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <FontAwesomeIcon icon={faFileArrowDown} />
      </div>
      {/* speech bubble에 p태그 내 글자 보이게하기 */}
      {isHover && (
        <div className="relative">
          <div className="absolute right-[10%] w-[120px] h-[30px] shadow-md rounded-lg">
            <p className="absolute top-[20%] w-full text-gray-600 text-xs font-base text-center">
              구매한 자료 다운로드
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GotoPaymentSuccess;
