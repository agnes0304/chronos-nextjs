const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

type s3Url = {
  urls: string[];
};

// params의 key로 get요청을 보내서 해당 mobile을 가진 order를 찾아서 그 order의 product를 보여줌.
async function getOrder(email: string) {
  try {
    const res = await fetch(`${baseUrl}/orders/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("getOrder 내부 에러: ", error);
  }
}

const DownloadData = async ({ params }: { params: { email: string } }) => {
  let data: s3Url = { urls: [] };
  try {
    if (params.email) {
      data = await getOrder(params.email);
      console.log(data);
    } else {
      throw new Error("파라미터 잘못됨.");
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }

  return (
    <div className="flex flex-col w-[90vw] justify-center items-center">
      <div className="flex flex-col w-[90vw] justify-center items-start gap-6 sm:w-4/5 md:w-2/3">
        <h1 className="text-xl font-semibold text-gray-600">
          구매하신 자료입니다.
        </h1>
        <p className="text-sm text-gray-500">
          아래 링크를 <span className="text-rose-500 font-semibold">전부</span> 눌러 다운로드 받아주세요.
        </p>
        <div>
          <ul className="text-gray-500 font-base text-md">
            {data.urls.map((url, index) => {
              return (
                <li key={index} className="mb-1 w-full">
                  <a
                    className="text-indigo-400 hover:text-indigo-600 w-full"
                    href={url}
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faFileArrowDown} /> {index + 1}번 자료입니다. 
                  </a>
                </li>
              );
            }
            )}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DownloadData;
