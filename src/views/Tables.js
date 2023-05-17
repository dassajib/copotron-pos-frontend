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
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const toggle = () => setModal(!modal);

  const editToggle = (name) => {
    setEditModal(!editModal);
    console.log(name);
    
  };

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

  // category item edit
  const handleEditFormSubmit = (id, name) => {
    console.log(id, name);
    if (id) {
      fetch(`http://127.0.0.1:8000/api/v1/product/category/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    } else {
      fetch(`http://127.0.0.1:8000/api/v1/product/category/${id}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    }
    // handleFormSubmit();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  // delete category
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/v1/product/category/${id}/`, {
      method: "DELETE",
    })
      .then((res) => {
        alert("Deleted Successfully.");
      })
      .catch((err) => {
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
                  <ModalHeader toggle={toggle}>Category Form</ModalHeader>
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
                      </Button>
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
                          <Button
                            onClick={() => {
                              editToggle(categoryItem.name);
                            }}
                            type="button"
                          >
                            Edit
                          </Button>

                          <Button
                            onClick={() => {
                              handleDelete(categoryItem.id);
                            }}
                            href=""
                            className="btn btn-danger mx-1"
                          >
                            Delete
                          </Button>
                          <Modal isOpen={editModal} toggle={editToggle}>
                          <ModalHeader toggle={editToggle}>
                            Category Edit Form
                          </ModalHeader>
                          <ModalBody>
                            <Form
                              onSubmit={() => {
                                handleEditFormSubmit(
                                  categoryItem.id,
                                  categoryItem.name
                                );
                              }}
                            >
                              <FormGroup row>
                                <Label for="text" sm={2}>
                                  Name
                                </Label>
                                <Col sm={10}>
                                  <Input
                                    value={formData.name}
                                    onChange={handleEditInputChange}
                                    required
                                    id="name"
                                    name="name"
                                    placeholder="with a Item Name"
                                    type="text"
                                  />
                                </Col>
                              </FormGroup>
                              <Button color="secondary" onClick={editToggle}>
                                Cancel
                              </Button>
                              <Button
                                color="primary"
                                onClick={editToggle}
                                type="submit"
                                value="Submit"
                              >
                                Save
                              </Button>
                            </Form>
                          </ModalBody>
                        </Modal>
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
