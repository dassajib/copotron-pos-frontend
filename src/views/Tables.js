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

  // category post
  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/v1/product/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status === 409) {
          throw new Error("Item already exists");
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
  };

  // category post form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  // delete category
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/v1/product/category/${id}/`, {
      method: "DELETE",
    }).then(res => {
      alert('Deleted Successfully.')
    }).catch((err) => {
      console.log(err);
    });
    setCategory(category.filter((categoryItem) => categoryItem.id !== id));
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
                          <button
                            // onClick={() => {
                            //   loadEdit(categoryItem.id);
                            // }}
                            href=""
                            className="btn btn-success mx-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(categoryItem.id);
                            }}
                            href=""
                            className="btn btn-warning mx-1"
                          >
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
        </Row>
      </div>
    </>
  );
}

export default Tables;
