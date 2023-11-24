type ExpirationConfirmProps = {
  setConfirmChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExpirationConfirm = ({ setConfirmChecked }: ExpirationConfirmProps) => {
  return (
    <div className="flex flex-col w-[90vw] justify-center items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <h1 className="text-xl font-semibold text-gray-600">
          자료를 구매해주셔서 감사합니다.
        </h1>
        <div className="text-sm text-gray-500">
          <p>
            아래 주의사항을 읽어주세요. 동의 후, 자료 다운로드 페이지로 이동할
            수 있습니다.
          </p>
          <p>
            만약 지금 다운로드가 여의치 않으시다면 나중에 동의 후 다운로드
            해주세요!
          </p>
        </div>
        <div className="w-full">
          <h2 className="text-md font-medium text-rose-500 ml-3">
            꼭! 읽어주세요.
          </h2>
          <ul className="border-[1.5px] border-rose-400 bg-rose-100 rounded-md p-5 w-full">
            <li className="mb-3 text-gray-800">
              결제하신 자료는 링크가 유효한{" "}
              <span className="text-rose-500 font-bold">1회</span>에 한 하여
              다운로드가 가능합니다.
            </li>
            <li className="mb-3 text-gray-800">
              자료 다운로드 링크 및 본 페이지 링크의 유효기간은{" "}
              <span className="text-rose-500 font-bold">1시간</span>입니다.
            </li>
            <li className="text-right">
              <input
                id="confirm"
                type="checkbox"
                onChange={(e) => setConfirmChecked(e.target.checked)}
              ></input>
              <label htmlFor="confirm" className="text-gray-500 ml-2">
                위 내용에 동의합니다.
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpirationConfirm;
