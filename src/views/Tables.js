import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
  FormGroup,
} from "reactstrap";

function Tables() {
  const [category, setCategory] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/product/category")
      .then((res) => res.json())
      .then((data) => setCategory(data.data))
      .catch((err) => console.log(err));
  }, []);

  // form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/v1/product/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status === 409) {
          throw new Error("Data already exists");
        } else if (!res.ok) {
          throw new Error("Request failed with status " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setFormData({ name: "" });
        console.log("Success:", data);
      })
      .catch((err) => {
        alert(err.message);
        console.log("Error is:", err);
      });
    setFormData({ name: "" });
    // history.go(0)
    // window.location.reload();
    // history.push(history.location.pathname);
  };

  // form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Categories</CardTitle>
                <Button onClick={toggle} className="btn btn-success px-4">
                  Add new
                </Button>
                {/* Modal section */}
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleFormSubmit}>
                      <FormGroup row>
                        <Label for="text" sm={2}>
                          Name
                        </Label>
                        <Col sm={10}>
                          <Input
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            id="name"
                            name="name"
                            placeholder="with a Item Name"
                            type="text"
                          />
                        </Col>
                      </FormGroup>
                      <Button color="secondary" onClick={toggle}>
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        onClick={toggle}
                        type="submit"
                        value="Submit"
                      >
                        Save
                      </Button>{" "}
                    </Form>
                  </ModalBody>
                </Modal>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((categoryItem) => (
                      <tr key={categoryItem.id}>
                        <td>{categoryItem.id}</td>
                        <td tag="h1">{categoryItem.name}</td>
                        <td className="">
                          <button href="" className="btn btn-success mx-1">
                            Edit
                          </button>
                          <button href="" className="btn btn-warning mx-1">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-right">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-right">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-right">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default Tables;