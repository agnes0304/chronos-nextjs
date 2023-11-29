const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";


const GithubOauth = () => {
  const GithubOauthHandler = async () => {
    try {
      const res = await fetch(`${baseUrl}/signin/github`, {
        method: "GET",
      });

    } catch (error) {
      console.log("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div>
      <button
        className="text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800 h-[42px] w-[160px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
        type="button"
        onClick={() => GithubOauthHandler()}
      >
        <FontAwesomeIcon icon={faGithub} className="mr-2" />
        Github로 로그인
      </button>
    </div>
  );
};

export default GithubOauth;
