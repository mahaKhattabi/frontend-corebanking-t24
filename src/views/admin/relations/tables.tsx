import React, { useState } from "react";
import { Card, DropdownItem, Table as TableElement, Button } from "reactstrap";
import { Table } from "models/database";
import Autocomplete from "components/Autocomplete";
import _ from "lodash";
import { useMutate } from "restful-react";

interface TableRelationsProps<T> {
  collection: Table[];
  api: {
    add: string;
    remove: string;
  };
}

export default function Tables<T>(props: TableRelationsProps<T>) {
  const [tables, setTables] = useState(props.collection);

  const { mutate: add } = useMutate({
    path: props.api.add,
    verb: "PATCH",
  });

  const { mutate: remove } = useMutate({
    path: props.api.remove,
    verb: "PATCH",
  });

  const relate = (t: Table) => {
    add({ tables: t._id }).then(() => setTables([...tables, t]));
  };

  const unrelate = (t: Table) => {
    remove({ tables: t._id }).then(() =>
      setTables(tables.filter((tab) => tab !== t))
    );
  };

  const filter = (t: Table, s: string) =>
    _.includes(t.nameT, s) &&
    !_.includes(
      tables.map((e) => e._id),
      t._id
    );

  return (
    <Card className='content-card margin-top-30'>
      <Autocomplete<Table, Table>
        url={(s) => `/tables`}
        option={(e) => (
          <DropdownItem onClick={() => relate(e)}>{e.nameT}</DropdownItem>
        )}
        optionFilter={filter}
        maxItems={10}
        placeholder='Link tables by name'
      />
      <br />
      <TableElement hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {tables.map((t, key) => (
            <tr key={key}>
              <td>{t.nameT}</td>
              <td>{_.take(t.description, 100)}</td>
              <td className='text-right'>
                <Button outline onClick={() => unrelate(t)}>
                  Unrelate
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableElement>
    </Card>
  );
}
