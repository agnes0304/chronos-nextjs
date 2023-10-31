const NoPost = () => {
    return (
      <div className="flex flex-col justify-center items-center w-[90vw]">
        <h1 className="text-gray-400 p-4">해당 검색어와 관련된 내용을 찾지 못했어요</h1>
        <p className="text-gray-400 p-4 text-sm">아래 포스팅은 어떠세요?</p>
        {/* Post 컴포넌트에 조회수 순으로 2가지 추천하기 */}
      </div>
    );
  };
  
  export default NoPost;
  