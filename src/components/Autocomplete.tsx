import React, { useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Input,
} from "reactstrap";
import _ from "lodash";
import { useGet } from "restful-react";
import Loading from "./Loading";

interface AutocompleteProps<T, E> {
  url: (search: string) => string;
  toArray?: (e: E) => T[];
  option: (element: T) => JSX.Element;
  optionFilter: (element: T, search: string) => boolean;
  maxItems: number;
  placeholder: string;
}

export default function Autocomplete<T, E>(props: AutocompleteProps<T, E>) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading, error } = useGet<E>(props.url(search));

  const dataArray = (d: any) => {
    if (d)
      if (props.toArray) return props.toArray(d);
      else return d as T[];
    else return [];
  };

  const options = dataArray(data).filter((o) => props.optionFilter(o, search));

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Input
        onClick={toggle}
        style={{ maxWidth: 400 }}
        placeholder={props.placeholder}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && search !== "" && <Loading>Loading options...</Loading>}
      {error && search !== "" && <p>{error.message}</p>}
      {options && (
        <UncontrolledDropdown
          isOpen={options.length > 0 && isOpen}
          toggle={toggle}
        >
          <DropdownToggle tag='a'></DropdownToggle>
          <DropdownMenu className='dropdown-black'>
            {_.take(options, props.maxItems).map((e, k) => (
              <React.Fragment key={k}>{props.option(e)}</React.Fragment>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      )}
    </>
  );
}
