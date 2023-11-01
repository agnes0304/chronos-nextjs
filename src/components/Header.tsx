import Image from "next/image";
import fossilLogo from "../../public/fossilLogo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-[100vw] py-4 flex justify-center items-center bg-white">
      <div className="flex justify-center items-center w-[90vw] cursor-pointer">
        <Image
          className="opacity-80"
          src={fossilLogo}
          width={20}
          alt="naver blog profile"
        />
        <p className="text-sm text-gray-300 w-[90vw]">필기깎는화석</p>
      </div>
    </header>
  );
};

export default Header;
