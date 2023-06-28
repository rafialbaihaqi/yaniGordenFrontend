import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import Modals from "../Components/Modals";



const Testimoni = () => {

  // index pertama untuk baca data index ke dua untuk masukan data
  const [formTestimoni, setFormTestimoni] = useState({
    deskripsi: "",
    gambar: null,
    previewUrl: null, // Added for image preview
  });


   const handleCreateTestimoni = async () => {
     const formData = new FormData();
     formData.append("deskripsi", formTestimoni.deskripsi);
     formData.append("gambar", formTestimoni.gambar);

     try {
       const res = await axios({
         method: "POST",
         headers: {
           Authorization: `Bearer ${localStorage.getItem("access_token_user")}`,
         },
         url: `${process.env.REACT_APP_APIKEY}testimoni`,
         data: formData,
       });
       console.log("Response POST");
       console.log(res);

       setFormTestimoni({
         deskripsi: "",
         gambar: null,
       });
     } catch (error) {
       console.log(error);
     }
   };

     const handleImageChange = (e) => {
       const selectedFile = e.target.files[0];

       setFormTestimoni({
         ...formTestimoni,
         gambar: selectedFile,
         previewUrl: URL.createObjectURL(selectedFile), // Create preview URL
       });
     };

  //  modal
const [showModal, setShowModal] = useState(false);
 const handleShowModal = () => {
   setShowModal(true);
 };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <>
      <Container>
        {/* title produk */}
        <Row>
          <Col>
            <div className="title d-flex mt-4">
              <div className="wrap-title mx-auto text-center mb-3">
                <h1>Beri Ulasan</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/*  edit area*/}
      <Container className="form-edit mb-3">
        <Row>
          <Col>
            <Form>
              <div className="image-preview-container  border p-4 rounded">
                <div className="image-wrapper border-bottom pb-3 text-center">
                  {formTestimoni.previewUrl && (
                    <img
                      src={formTestimoni.previewUrl}
                      alt="Preview"
                      style={{ maxWidth: "40%", marginTop: "10px" }}
                    />
                  )}
                </div>

                {/* gambar produk 1 */}
                <Form.Group controlId="formFile" className=" mt-3">
                  <Form.Label>Upload gambar pesanan anda</Form.Label>
                  <Form.Control
                    // value={formTestimoni.gambar}
                    onChange={handleImageChange}
                    type="file"
                  />
                </Form.Group>
              </div>

              {/* ulasan */}
              <Form.Group
                className="mb-3 mt-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Bagaimana pengalaman anda memesan produk Yani Gorden?
                </Form.Label>
                <textarea
                  className="form-control"
                  value={formTestimoni.deskripsi}
                  onChange={(e) => {
                    setFormTestimoni({
                      ...formTestimoni,
                      deskripsi: e.target.value,
                    });
                  }}
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </Form.Group>
            </Form>

            {/* button simpan */}
            <div className="text-center mt-5 mb-5">
              <Button
                disabled={!formTestimoni.deskripsi || !formTestimoni.gambar}
                onClick={() => handleCreateTestimoni(handleShowModal())}
                className="btn-simpan fw-semibold"
                variant="/testimoni"
              >
                Kirim
              </Button>
              <Modals
                show={showModal}
                onHide={handleCloseModal}
                title="sukses"
                body="Berhasil Mengirim Testimoni"
                footer={
                  <Button
                    className="btn-pesan fw-semibold px-5"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                }
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Testimoni;
