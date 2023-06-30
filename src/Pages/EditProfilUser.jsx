import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modals from "../Components/Modals";

const EditProfilUser = () => {
  const navigate = useNavigate();

  const [formEditProfil, setFormEditProfil] = useState({
    id: null,
    nama: "",
    no_whatsapp: "",
    fotoProfil: null,
    previewUrl: null,
  });

  React.useEffect(() => {
    document.title = `Edit Profil`;
    getEditProfil();
  }, []);

  // fungsi untuk menampilkan data edit profil
  const getEditProfil = async () => {
    try {
      // fungsi untuk ambil data dari database api
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_user")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}user/profile/me`,
      });
      console.log(res);
      //   nampung data yang sudah diambil
      setFormEditProfil({
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

  const handleEditProfil = async () => {
    const formData = new FormData();
    formData.append("id", formEditProfil.id);
    formData.append("nama", formEditProfil.nama);
    formData.append("no_whatsapp", formEditProfil.no_whatsapp);
    if (formEditProfil.fotoProfil) {
      formData.append("fotoProfil", formEditProfil.fotoProfil);
    }
    try {
      const res = await axios({
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_user")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}user/${formEditProfil.id}`,
        data: formData,
      });
      console.log(res);

      // menampilkan update data
      getEditProfil();

      // Navigate to the same page
      navigate(`/editprofiluser`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormEditProfil((prevFormEditProfil) => ({
      ...prevFormEditProfil,
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
                  value={formEditProfil.nama}
                  onChange={(e) =>
                    setFormEditProfil((prevFormEditProfil) => ({
                      ...prevFormEditProfil,
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
                  value={formEditProfil.no_whatsapp}
                  onChange={(e) =>
                    setFormEditProfil((prevFormEditProfil) => ({
                      ...prevFormEditProfil,
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
                  {formEditProfil.previewUrl && (
                    <div className="image-preview mt-2 mb-3 ms-3">
                      <img
                        src={formEditProfil.previewUrl}
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
                <p className="p-caraukur">*Maksimal ukuran gambar 2 mb</p>
              </Form.Group>
            </Form>

            {/* button simpan */}
            <div className="text-center mt-5 mb-5">
              <Button
                onClick={() => handleEditProfil(handleShowModal())}
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
export default EditProfilUser;
