import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { useGet, useMutate } from "restful-react";
import Loading from "./Loading";

interface ApiProps<T> {
  thead: { name: string }[];
  tbody: (e: T) => JSX.Element;
  api: {
    get: string;
    filter?: (t: T) => boolean;
    delete: {
      path: string;
      id: (e: T) => any;
    };
  };
}

export function ApiTable<T>(props: ApiProps<T>) {
  const {
    api: { filter },
  } = props;

  const [elements, setElements] = useState<T[]>([]);

  const { data, loading, error } = useGet<T[]>(props.api.get);

  const { mutate } = useMutate({
    verb: "DELETE",
    path: props.api.delete.path,
  });

  useEffect(() => {
    if (data !== null) setElements(data);
  }, [data]);

  const delElement = (elem: T) => {
    if (window.confirm("Want to delete?")) {
      mutate(props.api.delete.id(elem)).then(() =>
        setElements(elements.filter((e) => e !== elem))
      );
    }
  };

  return (
    <React.Fragment>
      {loading && <Loading centerScreen>Loading...</Loading>}
      {error && <p>{error.message}</p>}
      {data && (
        <Table hover>
          <thead>
            <tr>
              {props.thead.map((head) => (
                <th key={head.name}>{head.name}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {elements
              .filter((e) => (filter ? filter(e) : true))
              .map((d, key) => (
                <tr key={key}>
                  {props.tbody(d)}
                  <td className='text-right'>
                    <Button
                      color='danger'
                      outline
                      onClick={() => delElement(d)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
}
