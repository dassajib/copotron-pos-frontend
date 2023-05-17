// import React from "react";
// import {
//   Modal,
//   Button,
//   Col,
//   Form,
//   FormGroup,
//   Input,
//   Label,
//   ModalBody,
//   ModalHeader,
// } from "reactstrap";

// const Modal = () => {
//   return (
//     <Modal isOpen={editModal} toggle={editToggle}>
//       <ModalHeader toggle={editToggle}>Category Edit Form</ModalHeader>
//       <ModalBody>
//         <Form onSubmit={handleEditFormSubmit}>
//           <FormGroup row>
//             <Label for="text" sm={2}>
//               Name
//             </Label>
//             <Col sm={10}>
//               <Input
//                 value={formData.name}
//                 onChange={handleEditInputChange}
//                 required
//                 id="name"
//                 name="name"
//                 placeholder="with a Item Name"
//                 type="text"
//               />
//             </Col>
//           </FormGroup>
//           <Button color="secondary" onClick={editToggle}>
//             Cancel
//           </Button>
//           <Button
//             color="primary"
//             onClick={editToggle}
//             type="submit"
//             value="Submit"
//           >
//             Save
//           </Button>
//         </Form>
//       </ModalBody>
//     </Modal>
//   );
// };

// export default Modal;
