import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import naverCircle from "../../public/naverCircle.png";
import Image from "next/legacy/image";
import CopyEmailBtn from "./CopyEmailBtn";

const Footer = () => {

  return (
    <footer className="w-[100vw] py-4 bg-gray-100 flex justify-center items-center">
      <div className="flex gap-2 items-center">
        <a
          className="text-black text-lg"
          target="_blank"
          href="https://github.com/agnes0304"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a className="flex justify-center items-center" target="_blank" href="https://blog.naver.com/loghistory">
          <Image
            width={20}
            height={20}
            src={naverCircle}
            alt="naver blog logo"
          />
        </a>
        <div className="w-[20px] h-[20px] p-2 flex justify-center items-center rounded-full bg-white text-gray-600">
          <CopyEmailBtn />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
