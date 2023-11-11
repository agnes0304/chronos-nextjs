import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import naverCircle from "../../public/naverCircle.png";
import Image from "next/image";

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
        <a target="_blank" href="https://blog.naver.com/loghistory">
          <Image
            className="w-[18px] h-[18px]"
            src={naverCircle}
            alt="naver blog logo"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
