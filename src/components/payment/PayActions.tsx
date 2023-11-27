type PayActionsProps = {
    isActive: boolean;
    submitHandler: () => void;
}

const PayActions = ({ isActive, submitHandler}:PayActionsProps) => {
    return(
        <div className="flex gap-2">
            <button
          type="button"
          onClick={submitHandler}
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
          onClick={submitHandler}
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
    )
}

export default PayActions;