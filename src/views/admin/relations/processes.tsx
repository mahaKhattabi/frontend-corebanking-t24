import React, { useState } from "react";
import { Card, DropdownItem, Table, Button } from "reactstrap";
import { Process } from "models/database";
import Autocomplete from "components/Autocomplete";
import _ from "lodash";
import { useMutate } from "restful-react";

interface ProcessRelationsProps<T> {
  collection: Process[];
  api: {
    add: string;
    remove: string;
  };
}

export default function Processes<T>(props: ProcessRelationsProps<T>) {
  const [processes, setProcesses] = useState(props.collection);

  const { mutate: add } = useMutate({
    path: props.api.add,
    verb: "PATCH",
  });

  const { mutate: remove } = useMutate({
    path: props.api.remove,
    verb: "PATCH",
  });

  const relate = (p: Process) => {
    add({ processus: p._id }).then(() => setProcesses([...processes, p]));
  };

  const unrelate = (p: Process) => {
    remove({ processus: p._id }).then(() =>
      setProcesses(processes.filter((pr) => pr !== p))
    );
  };

  const filter = (p: Process, s: string) =>
    _.includes(p.nameP, s) &&
    !_.includes(
      processes.map((e) => e._id),
      p._id
    );

  return (
    <Card className='content-card margin-top-30'>
      <Autocomplete<Process, Process>
        url={(s) => `/processus`}
        option={(e) => (
          <DropdownItem onClick={() => relate(e)}>{e.nameP}</DropdownItem>
        )}
        optionFilter={filter}
        maxItems={10}
        placeholder='Link processus by name'
      />
      <br />
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {processes.map((p, key) => (
            <tr key={key}>
              <td>{p.nameP}</td>
              <td>{_.take(p.description, 100)}</td>
              <td className='text-right'>
                <Button outline onClick={() => unrelate(p)}>
                  Unrelate
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
