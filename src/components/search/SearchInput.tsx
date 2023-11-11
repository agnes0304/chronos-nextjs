"use client";
import { FC, useState, useEffect, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useRouter } from "next/navigation";

interface Props {
  selectedTags: string[];
  setClicked: (tags: string[]) => void;
}

const SearchInput: FC<Props> = ({ selectedTags, setClicked }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false);

  // 🌐 fetching data from server
  useEffect(() => {
    axios
      .get(`${baseUrl}/words`)
      .then((res) => {
        setSuggestions(res.data);
      })
      .then(() => {
        setWords(selectedTags);
      });
  }, [selectedTags]);

  // TODO: optimize with trie DS
  useEffect(() => {
    if (query) {
      const filtered = suggestions.filter((item) => {
        return item.includes(query);
      });
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query, suggestions]);

  const clickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const clickedWord = e.currentTarget.textContent;
    if (clickedWord) {
      setWords([...words, clickedWord]);
      setQuery("");
      setClicked([...words, clickedWord]);
    }
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "" && !isComposing) {
      setWords([...words, query]);
      setQuery("");
      setClicked([...words, query]);
    } else if (e.key === "Enter" && query.trim() === "" && !isComposing) {
      handleSubmit();
    }
  };

  const handleDelete = (wordToDelete: string) => {
    const newWords = words.filter((word) => word !== wordToDelete);
    setWords(newWords);
    setClicked(newWords);
  };

  const handleBackspace = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && query === "") {
      const newWords = words.slice(0, words.length - 1);
      setWords(newWords);
      setClicked(newWords);
    }
  };

  const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
    if (e.type === "compositionend") {
      setIsComposing(false);
    } else {
      setIsComposing(true);
    }
  };

  // onClick to route "/posts?search=word1+word2+word3"
  const handleSubmit = () => {
    const queryString = words
      .map((word) => `search=${encodeURIComponent(word)}`)
      .join("&");
    router.push(`/posts?${queryString}`);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex relative w-[90vw] h-[39px] border-solid border-[1px] border-gray-300 rounded-[20px] p-1 px-[4px]">
        <div className="flex gap-[3px] flex-shrink-0">
          {words.map((word, index) => (
            <div
              className="border-indigo-300 border-2 text-sm pb-1 pt-[3px] px-2 rounded-full"
              key={index}
            >
              <span className="text-indigo-400 font-regular">{word} </span>
              <span
                className="text-indigo-300 cursor-pointer"
                onClick={() => handleDelete(word)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
          ))}
        </div>
        <div className="ml-2 flex relative flex-grow">
          <input
            className="flex-grow bg-transparent text-sm text-gray-400 overflow-hidden focus:outline-none"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              handleEnter(e);
              handleBackspace(e);
            }}
            onCompositionStart={handleComposition}
            onCompositionEnd={handleComposition}
          />
          {filteredSuggestions.length > 0 && (
            <ul className="absolute top-[34px] right-2 w-[98%] h-[300px] overflow-scroll overflow-x-hidden overflow-y-hidden hover:overflow-y-auto">
              {filteredSuggestions.map((item, index) => (
                <li
                  className="text-indigo-400 text-sm bg-white bg-opacity-90 align-baseline p-1 text-start hover:bg-indigo-100/90 hover:text-indigo-600"
                  key={index}
                  onClick={clickHandler}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <button
            type="button"
            className="text-gray-300 text-sm absolute rounded-full right-3 top-2 bg-white bg-opacity-50"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
