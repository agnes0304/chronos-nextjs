import Image from "next/image";

export default function Kakaobadge() {
  return (
    <div className="flex justify-center items-center bg-yellow-200 rounded-lg pr-1 mr-1 min-w-max">
      <Image
        src="/kakao.png"
        alt="kakao"
        width={20}
        height={20}
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <p className="text-black font-medium text-sm">받는 분 통장 표시</p>
    </div>
  );
}
