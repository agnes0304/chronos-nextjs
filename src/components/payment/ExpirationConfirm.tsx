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
            아래 주의사항을 읽어주세요. 동의하신 뒤, 자료 다운로드 페이지로 이동할
            수 있습니다.
          </p>
          <p>
            만약 지금 다운로드가 여의치 않으시다면 나중에 동의 후 다운로드
            해주세요!
          </p>
        </div>
        <div className="w-full">
          <h2 className="font-bold text-rose-400 mb-3">
            꼭! 읽어주세요.
          </h2>
          <ul className="w-full font-medium">
            <li className="mb-3 text-gray-700">
            🚨 구매하신 자료는 본 내용에 동의 후 가장 처음 이메일을 입력하신 시점부터 {" "}
              <span className="text-rose-500 font-bold">24시간 내</span>에 언제든지
              다운로드가 가능합니다.
            </li>
            <li className="mb-3 text-gray-700">
            🚨 4시간 내에 다운로드 링크가 보이지 않으신다면 <span className="font-bold">chronos9734@gmail.com</span>으로 문의해주세요.
            </li>
            <li className="mb-3 text-gray-700">
            😊 입금 확인이 되지 않은 경우에는 이메일 입력 시간이 기록되지 않으니 걱정하지 않으셔도 됩니다.
            </li>
            <li className="text-right">
              <input
                id="confirm"
                type="checkbox"
                onChange={(e) => setConfirmChecked(e.target.checked)}
              ></input>
              <label htmlFor="confirm" className="text-gray-600 ml-2">
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
