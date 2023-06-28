import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import Modals from "../Components/Modals";

const EditProfilOwner = () => {
  const navigate = useNavigate();

  // index pertama untuk baca data index ke dua untuk masukan data

  const [formEditProfilOwner, setFormEditProfilOwner] = useState({
    id: null,
    nama: "",
    no_whatsapp: "",
    fotoProfil: null,
    previewUrl: null,
  });

  React.useEffect(() => {
    document.title = `Edit Profil Owner`;
    getEditProfilOwner();
  }, []);

  // fungsi untuk menampilkan data edit profil
  const getEditProfilOwner = async () => {
    try {
      // fungsi untuk ambil data dari database api
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_owner")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}owner/profile/me`,
      });
      console.log(res);
      //   menampung data yang sudah diambil
      setFormEditProfilOwner({
        id: res.data.data.id,
        nama: res.data.data.nama,
        no_whatsapp: res.data.data.no_whatsapp,
        fotoProfil: res.data.data.fotoProfil,
        previewUrl: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfilOwner = async () => {
    const formData = new FormData();
    formData.append("id", formEditProfilOwner.id);
    formData.append("nama", formEditProfilOwner.nama);
    formData.append("no_whatsapp", formEditProfilOwner.no_whatsapp);
    if (formEditProfilOwner.fotoProfil) {
      formData.append("fotoProfil", formEditProfilOwner.fotoProfil);
    }
    try {
      const res = await axios({
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_owner")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}owner/${formEditProfilOwner.id}`,
        data: formData,
      });
      console.log(res);

      getEditProfilOwner();

      // Navigate to the same page
      navigate(`/editprofilowner`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormEditProfilOwner((prevFormEditProfilOwner) => ({
      ...prevFormEditProfilOwner,
      fotoProfil: file,
      // Create the preview URL
      previewUrl: file ? URL.createObjectURL(file) : null,
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
  return (
    <>
      <Container>
        {/* title produk */}
        <Row>
          <Col>
            <div className="title d-flex mt-4">
              <div className="wrap-title mx-auto text-center">
                <h1>Perbarui Profil</h1>
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
              {/* name field */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={formEditProfilOwner.nama}
                  onChange={(e) =>
                    setFormEditProfilOwner((prevFormEditProfilOwner) => ({
                      ...prevFormEditProfilOwner,
                      nama: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              {/* no. whatsapp */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nomor Whatsapp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  disabled
                  value={formEditProfilOwner.no_whatsapp}
                  onChange={(e) =>
                    setFormEditProfilOwner((prevFormEditProfilOwner) => ({
                      ...prevFormEditProfilOwner,
                      no_whatsapp: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              {/* no whatsapp */}

              {/* foto profil*/}
              <Form.Group controlId="formFile" className="mb-5">
                <Form.Label>Foto Profil</Form.Label>
                <div className="border rounded">
                  <Form.Control type="file" onChange={handleFileChange} />
                  {formEditProfilOwner.previewUrl && (
                    <div className="image-preview mt-2 mb-3 ms-3">
                      <img
                        src={formEditProfilOwner.previewUrl}
                        alt="Preview"
                        style={{
                          maxWidth: "20%",
                          marginTop: "10px",
                          maxHeight: "30%",
                          textAlign: "center",
                        }}
                        className="preview-image rounded"
                      />
                    </div>
                  )}
                </div>
              </Form.Group>
            </Form>

            {/* button simpan */}
            <div className="text-center mt-5 mb-5">
              <Button
                onClick={() => handleEditProfilOwner(handleShowModal())}
                className="btn-simpan fw-semibold"
                variant="/simpan"
              >
                simpan
              </Button>
            </div>

            {/* modals popup berhasil */}
            <Modals
              show={showModal}
              onHide={handleCloseModal}
              title="Suksess!"
              body="Berhasil Edit Profil"
              footer={
                <Button
                  className="btn-pesan fw-semibold px-5"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditProfilOwner;
