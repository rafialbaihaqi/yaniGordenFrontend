import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Modals from "../Components/Modals";

const EditBannerProduk = () => {
   const navigate = useNavigate();

   let { id } = useParams();
   // index pertama untuk baca data index ke dua untuk masukan data

   const [formEditBanner, setFormEditBanner] = useState({
     namaProduk: "",
     gambarProduk: "",
     previewUrl: null,
   });

   React.useEffect(() => {
     document.title = `Edit Banner`;
     getEditBanner();
   }, []);

   // fungsi untuk menampilkan data edit profil
   const getEditBanner = async () => {
     try {
       // fungsi untuk ambil data dari database api
       const res = await axios({
         method: "GET",
         url: `${process.env.REACT_APP_APIKEY}banner/${id}`,
       });
       console.log(res);
       //   nampung data yang sudah diambil
       setFormEditBanner(res.data.data);
     } catch (error) {
       console.log(error);
     }
   };

   const handleEditBanner = async () => {
     const formData = new FormData();
     formData.append("namaProduk", formEditBanner.namaProduk);
     formData.append("gambarProduk", formEditBanner.gambarProduk);


     try {
       const res = await axios({
         method: "PUT",
         headers: {
           Authorization: `Bearer ${localStorage.getItem(
             "access_token_owner"
           )}`,
         },
         url: `${process.env.REACT_APP_APIKEY}banner/${id}`,
         data: formData,
       });
       console.log(res);

       getEditBanner();

       // Show the confirmation modal
       handleShowModal();
     } catch (error) {
       console.log(error);
     }
   };

   const handleFileChange = (e) => {
     const file = e.target.files[0];
     setFormEditBanner((prevFormEditBanner) => ({
       ...prevFormEditBanner,
       gambarProduk: file,
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
      // Close the modal
      handleCloseModal();

      // Navigate to /halamanuser
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
                <h1>Edit Banner</h1>
                <h1>Populer Produk</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/*  edit area*/}
      <Container>
        <Row>
          <Col>
            <Form>
              {/* produk 1 */}
              <Form.Group
                className="mb-3 mt-5"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nama Produk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={formEditBanner.nama}
                  onChange={(e) =>
                    setFormEditBanner((prevFormEditBanner) => ({
                      ...prevFormEditBanner,
                      namaProduk: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              {/* gambar banner*/}
              <div className="image-preview-container  border p-4 rounded">
                <div className="image-wrapper border-bottom pb-3 text-center">
                  {formEditBanner.previewUrl && (
                    <img
                      src={formEditBanner.previewUrl}
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
                onClick={() => handleEditBanner()}
                className="btn-simpan fw-semibold"
                variant="/edit banner"
              >
                simpan
              </Button>
            </div>

            {/* modals popup berhasil */}
            <Modals
              show={showModal}
              onHide={handleCloseModal}
              title="Sukses edit banner!"
              body="Lihat Perubahan?"
              footer={
                <Button
                  className="btn-pesan fw-semibold px-5"
                  onClick={handleLihatPerubahan}
                >
                  Ya
                </Button>
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditBannerProduk;
