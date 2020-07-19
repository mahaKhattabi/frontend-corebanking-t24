import React, { Dispatch, SetStateAction } from "react";
import "fa-icons";

interface SearchProps {
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export default function SearchBar(props: SearchProps) {
  return (
    <div className='search__container text-center'>
      <input
        className='search__input'
        type='text'
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
