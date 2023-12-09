import Image from "next/legacy/image";

export default function Kakaobadge() {
  return (
    <div className="flex justify-center items-center bg-yellow-200 rounded-lg pr-1 mr-1">
      <Image src="/kakao.png" alt="kakao" width={20} height={20} />
      <p className="text-black font-medium text-sm">받는 분 통장 표시</p>
    </div>
  );
}
