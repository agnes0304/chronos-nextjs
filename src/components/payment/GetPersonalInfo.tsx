type GetPersonalInfoProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isDisabled: boolean;
  lookUpHandler: () => void;
  setConfirmChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

const GetPersonalInfo = ({
  email,
  setEmail,
  isDisabled,
  lookUpHandler,
  setConfirmChecked,
}: GetPersonalInfoProps) => {
  return (
    <div className="flex flex-col w-[90vw] justify-center items-center gap-4">
      <h1 className="text-lg text-gray-600">
        주문 시에 입력하신 이메일을 아래에 입력해주세요.
      </h1>
      <input
        className="p-2 px-3 border border-gray-400 rounded-full w-[300px]"
        type="email"
        placeholder="이메일을 입력해주세요!"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <div className="flex justify-between gap-3">
        <button
          className={`${
            isDisabled
              ? "bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400"
              : "bg-gray-300 text-gray-400 cursor-not-allowed"
          } h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out`}
          type="button"
          disabled={!isDisabled}
          onClick={() => setConfirmChecked(false)}
        >
          <span className="mr-1">돌아가기</span>
        </button>
        <button
          className={`${
            isDisabled
              ? "bg-gray-300 text-gray-400 cursor-not-allowed"
              : "bg-indigo-300 text-white hover:bg-indigo-400 active:bg-indigo-400"
          } h-[42px] w-[120px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out`}
          type="button"
          disabled={isDisabled}
          onClick={lookUpHandler}
        >
          <span className="mr-1">다운로드</span>
        </button>
      </div>
    </div>
  );
};
export default GetPersonalInfo;
