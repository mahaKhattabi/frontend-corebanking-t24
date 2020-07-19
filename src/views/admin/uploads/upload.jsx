import React, { useState } from "react";
import { Col, Card, FormGroup, Label, Button, Input } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Upload() {
  let host = process.env.REACT_APP_HOST_PYTHON;
  const history = useHistory();

  const [file, setFile] = useState();

  const selectFile = (e) => setFile(e.target.files[0]);

  const SubmitFile = () => {
    const submit = () => {
      let data = new FormData();
      data.append("file", file);

      axios({
        url: `${host}/upload_file`,
        method: "POST",
        data,
      }).then(
        () => {
          alert(`File "${file.name}" successfully uploaded.`);
          history.push(`/admin/contents`);
        },
        (err) => alert(err)
      );
    };

    return (
      <React.Fragment>
        <Button onClick={submit}>Upload File</Button>
      </React.Fragment>
    );
  };

  return (
    <Col md={9}>
      <Card className='content-card'>
        <br />
        <FormGroup row>
          <Label for='tableFile' sm={2}>
            Table file
          </Label>
          <Col sm={6}>
            <Input
              type='file'
              name='file'
              id='tableFile'
              accept='.xlsx,.xls,.csv'
              onChange={selectFile}
            />
          </Col>
          <Col sm={4}>{file && <SubmitFile />}</Col>
        </FormGroup>
      </Card>
    </Col>
  );
}
