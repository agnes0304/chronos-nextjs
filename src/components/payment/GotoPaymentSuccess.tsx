import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

const GotoPaymentSuccess = () => {
  return (
    <div>
      <div className="flex gap-1 border p-1.5 border-gray-400 rounded-md items-center text-gray-400 cursor-pointer hover:text-white hover:bg-indigo-300 hover:border-indigo-300 active:bg-indigo-400 scale-90 hover:scale-100 transition-transform duration-300 ease-in-out transform hover:shadow-md">
        <FontAwesomeIcon icon={faFileArrowDown} />
        <p className="text-sm">다운로드</p>
      </div>
    </div>
  );
};

export default GotoPaymentSuccess;
