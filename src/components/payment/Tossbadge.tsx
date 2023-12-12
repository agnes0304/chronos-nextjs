import Image from "next/image";

export default function Tossbadge() {
  return (
    <div className="flex justify-center items-center border border-blue-600 rounded-lg pr-1 mx-1 min-w-max">
      <Image
        src="/toss.png"
        alt="toss"
        width={20}
        height={20}
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <p className="text-blue-600 font-medium text-sm">돈 보낼게요!</p>
    </div>
  );
}
