"use client";
import { FC, useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import Tags from "./Tags";
import { mainTags } from "../../data/mainTags";

const Browse: FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    setTags(mainTags);
  }, []);
  return (
    <>
      <SearchInput setClicked={setSelectedTags} selectedTags={selectedTags} />
      <Tags
        tags={tags}
        setClicked={setSelectedTags}
        clickedTags={selectedTags}
      />
    </>
  );
};

export default Browse;