import { useAppSelector, useAppDispatch } from "../hooks";
import { selectPairAddress } from "../redux/pairSelectorSlice";
import { useEffect, useRef, useState } from "react";
/*
const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[label]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option ${option[label] === selectedVal ? "selected" : ""
                }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })}
      </div>
    </div>
  );
};
*/
function displayName(name?: string) {
  return name?.replace("/", " - ");
}

export function PairSelector() {
  const pairSelector = useAppSelector((state) => state.pairSelector);
  const dispatch = useAppDispatch();
  const selectPair = (pairAddress: string) => {
    dispatch(selectPairAddress(pairAddress));
  };
  const options = pairSelector.pairsList;
  const id = "pairOption";
  let selectedVal = pairSelector.pairsList[0]
    ? pairSelector.pairsList[0].name
    : "Loading";
  const handleChange = (val) => {
    selectPair(val);
  };

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  /*
  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);
*/
  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option["address"]);
    console.log(option);
    selectedVal = option["name"];
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    console.log(inputRef.current);
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    console.log("query %s", query);
    console.log("sel %s", selectedVal);
    if (query) return displayName(query);
    if (selectedVal) return displayName(selectedVal);

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) => option["name"].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className="w-full">
      <div className="dropdown dropdown-end w-full">
        <label className="btn btn-block text-xl font-bold no-animation">
          <div className="flex justify-between selected-value w-full">
            <input
              ref={inputRef}
              type="text"
              value={getDisplayValue()}
              name="searchTerm"
              onChange={(e) => {
                setQuery(e.target.value);
                handleChange(null);
              }}
              onClick={toggle}
              className="flex-initial !bg-transparent"
            />
            <span className="flex-none order-last pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                viewBox="0 0 16 16"
              >
                <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </span>
          </div>
        </label>
        <ul
          ref={dropdownRef}
          tabIndex={0}
          className={
            `options ${isOpen ? "" : "hidden"}` +
            " dropdown-content z-[1] menu bg-base-200 shadow rounded-box w-full !my-0 !p-0"
          }
        >
          {filter(options).map((option, index) => {
            return (
              <li
                onClick={() => selectOption(option)}
                className={
                  `${option["name"] === selectedVal ? "selected" : ""}` +
                  " font-bold !pl-0"
                }
                key={`${id}-${index}`}
                value={option["name"]}
              >
                <div className="flex justify-between">
                  <span className="flex-1">{displayName(option["name"])}</span>
                  <span className="flex-none">+</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
