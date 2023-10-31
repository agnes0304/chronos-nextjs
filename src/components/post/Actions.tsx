import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Actions = () => {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        className="h-[30px] border border-gray-400 rounded-full text-sm text-gray-400 flex justify-center items-center group p-1 px-2 hover:border-none hover:bg-indigo-300 hover:text-white hover:shadow-md hover:shadow-neutral-300 active:bg-indigo-400 active:shadow-inner"
      >
        <span className="hidden group-hover:inline mr-1">다운로드</span>
        <FontAwesomeIcon icon={faDownload} />
      </button>
      <button
        type="button"
        className="h-[30px] border border-gray-400 rounded-full text-sm text-gray-400 flex justify-center items-center group p-1 px-2 hover:border-none hover:bg-indigo-300 hover:text-white hover:shadow-md hover:shadow-neutral-300 active:bg-indigo-400 active:shadow-inner"
      >
        <span className="hidden group-hover:inline mr-1">자세히 보기</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Actions;
