"use client";
import { FC } from "react";

interface Props {
  tags: string[];
  setClicked: (tags: string[]) => void;
  clickedTags: string[];
}

const Tags: FC<Props> = ({ tags, setClicked, clickedTags }) => {
  const onSelect = (tag: string) => {
    if (clickedTags.includes(tag)) {
      const filtered = clickedTags.filter((item) => item !== tag);
      setClicked(filtered);
    } else {
      setClicked([...clickedTags, tag]);
    }
  };
  return (
    <div className="flex justify-center gap-1 mt-2">
      {tags.map((tag, index) => (
        <div className="cursor-pointer text-sm p-1 px-2 border-[1px] border-gray-300 rounded-full font-regular text-gray-400" key={index} onClick={()=>onSelect(tag)}>
          <span>{tag}</span>
        </div>
      ))}
    </div>
  );
};

export default Tags;
