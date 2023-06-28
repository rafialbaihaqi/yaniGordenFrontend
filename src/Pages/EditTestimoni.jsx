import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import Modals from "../Components/Modals";

const EditTestimoni = () => {
   const navigate = useNavigate();

   let { id } = useParams();
   // index pertama untuk baca data index ke dua untuk masukan data

   const [formEditTestimoni, setFormEditTestimoni] = useState({
     deskripsi: "",
     gambar: "",
     previewUrl: null,
   });

   React.useEffect(() => {
     document.title = `Edit Testimoni`;
     getEditTestimoni();
   }, []);

   // fungsi untuk menampilkan data edit profil
   const getEditTestimoni = async () => {
     try {
       // fungsi untuk ambil data dari database api
       const res = await axios({
         method: "GET",
         url: `${process.env.REACT_APP_APIKEY}testimoni/${id}`,
       });
       console.log(res);
       //   nampung data yang sudah diambil
       setFormEditTestimoni(res.data.data);
     } catch (error) {
       console.log(error);
     }
   };

   const handleEditTestimoni = async () => {
     const formData = new FormData();
     formData.append("deskripsi", formEditTestimoni.deskripsi);
     formData.append("gambar", formEditTestimoni.gambar);

     try {
       const res = await axios({
         method: "PUT",
         headers: {
           Authorization: `Bearer ${localStorage.getItem(
             "access_token_owner"
           )}`,
         },
         url: `${process.env.REACT_APP_APIKEY}testimoni/${id}`,
         data: formData,
       });
       console.log(res);
       // After successfully updating the data, fetch the updated data again

       getEditTestimoni();
      
       // Show the confirmation modal
       handleShowModal();

     } catch (error) {
       console.log(error);
     }
   };

   const handleFileChange = (e) => {
     const file = e.target.files[0];
     setFormEditTestimoni((prevFormEditTestimoni) => ({
       ...prevFormEditTestimoni,
       gambar: file,
       previewUrl: file ? URL.createObjectURL(file) : null, // Create the preview URL
     }));
   };

   //  modal
   const [showModal, setShowModal] = useState(false);
   const handleShowModal = () => {
     setShowModal(true);
   };

   const handleCloseModal = () => {
     setShowModal(false);
   };

   const handleLihatPerubahan = () => {
     // Navigate to '/halamanuser'
     navigate("/halamanuser");
   };

  return (
    <>
      <Container>
        {/* title produk */}
        <Row>
          <Col>
            <div className="title d-flex mt-4">
              <div className="wrap-title mx-auto text-center">
                <h1>Edit Testimoni</h1>
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
              {/* testimoni produk 1 */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder=""
                  value={formEditTestimoni.deskripsi}
                  onChange={(e) =>
                    setFormEditTestimoni((prevFormEditBanner) => ({
                      ...prevFormEditBanner,
                      deskripsi: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <div className="image-preview-container  border p-4 rounded">
                <div className="image-wrapper border-bottom pb-3 text-center">
                  {formEditTestimoni.previewUrl && (
                    <img
                      src={formEditTestimoni.previewUrl}
                      alt="Preview"
                      style={{ maxWidth: "40%", marginTop: "10px" }}
                      className="rounded"
                    />
                  )}
                </div>

                {/* gambar produk 1 */}
                <Form.Group controlId="formFile" className=" mt-3">
                  <Form.Label>Gambar</Form.Label>
                  <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
              </div>
            </Form>

            {/* button simpan */}
            <div className="text-center mt-5 mb-5">
              <Button
                onClick={handleEditTestimoni}
                className="btn-simpan fw-semibold"
                variant="/masuk"
              >
                simpan
              </Button>
            </div>

            {/* modals popup berhasil */}
            <Modals
              show={showModal}
              onHide={handleCloseModal}
              title="Suksess edit testimoni!"
              body="Lihat perubahan yang sudah disimpan?"
              footer={
                <>
                  <Button
                    className="bg-secondary fw-semibold"
                    onClick={handleCloseModal}
                  >
                    Batal
                  </Button>
                  <Button
                    className="btn-pesan fw-semibold"
                    onClick={handleLihatPerubahan}
                  >
                    Lihat Perubahan
                  </Button>
                </>
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditTestimoni;
