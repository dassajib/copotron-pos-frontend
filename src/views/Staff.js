import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  Button,
  CardBody,
  Row,
  Col,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Form,
  FormGroup,
  Input,
  CardHeader,
  Table,
} from "reactstrap";

function Staff() {
  const [staffs, setStaffs] = useState([]);
  const [staffFormData, setStaffFormData] = useState({
    name: "",
    category: "",
    phone: "",
    address: "",
  });
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  // staff data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/staff")
      .then((res) => res.json())
      .then((data) => setStaffs(data.data))
      .catch((err) => console.log(err));
  }, []);

  // staff post
  const handleStaffSubmitForm = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/v1/staff/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(staffFormData),
    })
      .then((res) => {
        if (res.status === 409) {
          throw new Error("Staff already exists");
        } else if (!res.ok) {
          throw new Error("Request failed with status " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setStaffFormData({ name: "", category: "", phone: "", address: "" });
        console.log("Success:", data);
      })
      .catch((err) => {
        alert(err.message);
        console.log("Error is:", err);
      });
    setStaffFormData({ name: "", category: "", phone: "", address: "" });
  };

  // staff input
  const handleStaffInputChange = (e) => {
    const { name, category, phone, address, value } = e.target;
    setStaffFormData({
      [name]: value,
      [category]: value,
      [phone]: value,
      [address]: address,
    });
    console.log(name,category,phone,address)
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Staff</CardTitle>
                <Button onClick={toggle} className="btn btn-success px-4">
                  Add new
                </Button>
                {/* modal */}
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Staff Form</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleStaffSubmitForm}>
                      <FormGroup row>
                        <Label for="text" className="mt-4" sm={2}>
                          Name
                        </Label>
                        <Col sm={10}>
                          <Input
                            value={staffFormData.name}
                            onChange={handleStaffInputChange}
                            className="mt-4"
                            required
                            id="name"
                            name="name"
                            placeholder="with a Item Name"
                            type="text"
                          />
                        </Col>
                        <Label for="text" className="mt-4" sm={2}>
                          Category
                        </Label>
                        <Col sm={10}>
                          <Input
                            value={staffFormData.category}
                            onChange={handleStaffInputChange}
                            className="mt-4"
                            required
                            id="category"
                            name="category"
                            placeholder="with a Category Name"
                            type="text"
                          />
                        </Col>
                        <Label for="text" className="mt-4" sm={2}>
                          Phone
                        </Label>
                        <Col sm={10}>
                          <Input
                            value={staffFormData.phone}
                            onChange={handleStaffInputChange}
                            className="mt-4"
                            required
                            id="phone"
                            name="phone"
                            placeholder="with a Phone Number"
                            type="text"
                          />
                        </Col>
                        <Label for="text" className="mt-4" sm={2}>
                          Address
                        </Label>
                        <Col sm={10}>
                          <Input
                            value={staffFormData.address}
                            onChange={handleStaffInputChange}
                            className="mt-4"
                            required
                            id="address"
                            name="namaddress"
                            placeholder="with an Address"
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
                      <th>Category</th>
                      <th>Phone</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffs.map((staff) => (
                      <tr key={staff.id}>
                        <td>{staff.id}</td>
                        <td tag="h1">{staff.name}</td>
                        <td>{staff.category}</td>
                        <td>{staff.phone}</td>
                        <td>{staff.address}</td>
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

export default Staff;
