import Image from "next/legacy/image";

export default function Tossbadge() {
  return (
    <div className="flex justify-center items-center border border-blue-600 rounded-lg pr-1 mx-1">
      <Image src="/toss.png" alt="toss" width={20} height={20} />
      <p className="text-blue-600 font-medium text-sm">돈 보낼게요!</p>
    </div>
  );
}
