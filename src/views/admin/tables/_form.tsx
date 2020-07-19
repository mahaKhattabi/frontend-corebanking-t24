import React, { useState } from "react";
import { useMutate } from "restful-react";
import { useHistory } from "react-router-dom";
import Loading from "components/Loading";
import {
  Button,
  Card,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  DropdownItem,
} from "reactstrap";
import { Table } from "models/database";
import Autocomplete from "components/Autocomplete";
import _ from "lodash";
import { defaults } from ".";

interface FormProps {
  table: Table;
  method: "POST" | "PATCH";
}

export default function TableForm(props: FormProps) {
  const history = useHistory();

  const [table, setTable] = useState({ ...props.table });

  const path = table._id === undefined ? `/tables` : `/tables/${table._id}`;

  const SubmitTable = () => {
    const { mutate, loading, error } = useMutate({
      verb: props.method,
      path: path,
    });

    const submit = (e: React.MouseEvent) => {
      e.preventDefault();
      mutate({ nameT: table.nameT, description: table.description }).then(() =>
        history.push("/admin/tables")
      );
    };

    return (
      <React.Fragment>
        {error && <p>{error.message}</p>}
        {loading && <Loading />}
        {!loading && <Button onClick={submit}>Submit</Button>}
      </React.Fragment>
    );
  };

  return (
    <Card className='content-card'>
      <Form>
        <FormGroup row>
          <Label for='tableName' sm={2}>
            Name
          </Label>
          <Col sm={10}>
            {/* <Input
              autoFocus
              id='tableName'
              value={table.nameT}
              onChange={(e) => setTable({ ...table, nameT: e.target.value })}
            /> */}
            <Autocomplete<string, { data: string[] }>
              url={(s) => `${process.env["REACT_APP_HOST_PYTHON"]}/tables`}
              toArray={(d) => d.data}
              option={(e: string) => (
                <DropdownItem onClick={() => setTable({ ...table, nameT: e })}>
                  {e}
                </DropdownItem>
              )}
              optionFilter={(t, s) =>
                !_.includes(defaults, t) && _.includes(t, s)
              }
              maxItems={10}
              placeholder={table.nameT || "Select a table"}
            />
            <br />
            {table.nameT && <p>Selected table: {table.nameT}</p>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='tableDescription' sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              id='tableDescription'
              type='textarea'
              value={table.description}
              onChange={(e) =>
                setTable({ ...table, description: e.target.value })
              }
            />
          </Col>
        </FormGroup>
        <SubmitTable />
      </Form>
    </Card>
  );
}
