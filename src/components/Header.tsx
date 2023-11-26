import Image from "next/image";
import Link from "next/link";
import fossilLogo from "../../public/fossilLogo.png";
import GotoPaymentSuccess from "./payment/GotoPaymentSuccess";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-[100vw] py-4 flex justify-center items-center bg-white">
      <div className="w-[90vw] flex justify-between items-center">
        <Link href="/">
          <div className="flex justify-center items-center cursor-pointer">
            <Image
              className="opacity-80"
              src={fossilLogo}
              width={20}
              alt="naver blog profile"
            />
            <p className="text-sm text-gray-400">필기깎는화석</p>
          </div>
        </Link>
        <Link href="/payment/success">
          <GotoPaymentSuccess />
        </Link>
      </div>
    </header>
  );
};

export default Header;
