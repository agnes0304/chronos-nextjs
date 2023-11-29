type PayActionsProps = {
  isActive: boolean;
  submitHandler: (e: React.MouseEvent<HTMLButtonElement>, url: string) => void;
};

const PayActions = ({ isActive, submitHandler }: PayActionsProps) => {
  // '/'말고 error page로 보내야함.
  const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL || '/';
  const tossUrl = process.env.NEXT_PUBLIC_TOSS_URL || '/';

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={(e) => submitHandler(e, kakaoUrl)}
        className={`${
          !isActive
            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-yellow-200 text-black hover:bg-yellow-300 active:bg-yellow-400 active:shadow-inner"
        } h-[42px] w-[160px] p-2 rounded-full text-sm flex justify-center items-center group px-2 transition-all duration-200 ease-in-out`}
        disabled={!isActive}
      >
        카카오페이로 송금하기
      </button>
      <button
        type="button"
        onClick={(e) => submitHandler(e, tossUrl)}
        className={`${
          !isActive
            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-blue-300 text-black hover:bg-blue-400 active:bg-blue-500 active:shadow-inner"
        } h-[42px] w-[160px] p-2 rounded-full text-sm flex justify-center items-center group px-2 transition-all duration-200 ease-in-out`}
        disabled={!isActive}
      >
        토스아이디로 송금하기
      </button>
    </div>
  );
};

export default PayActions;
