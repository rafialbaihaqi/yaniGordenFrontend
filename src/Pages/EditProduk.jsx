import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Modals from "../Components/Modals";

const ProdukOwner = () => {
  const navigate = useNavigate();

  let { id } = useParams();
  // index pertama untuk baca data index ke dua untuk masukan data

  const [formEditProduk, setFormEditProduk] = useState({
    nama: "",
    deskripsiSingkat: "",
    deskripsi: "",
    harga: "",
    gambar: null,
    status: "Menungu Konfirmasi",
    previewUrl: null,
  });

  React.useEffect(() => {
    document.title = `Edit Produk`;
    getEditProduk();
  }, []);

  // fungsi untuk menampilkan data edit profil
  const getEditProduk = async () => {
    try {
      // fungsi untuk ambil data dari database api
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_owner")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}products/${id}`,
      });
      console.log(res);
      //   nampung data yang sudah diambil
      setFormEditProduk(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduk = async () => {
    const formData = new FormData();
    formData.append("nama", formEditProduk.nama);
    formData.append("deskripsiSingkat", formEditProduk.deskripsiSingkat);
    formData.append("harga", formEditProduk.harga);
    formData.append("deskripsi", formEditProduk.deskripsi);
    formData.append("gambar", formEditProduk.gambar);
    formData.append("status", formEditProduk.status);

    try {
      const res = await axios({
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_owner")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}products/${id}`,
        data: formData,
      });
      console.log(res);
      // After successfully updating the data, fetch the updated data again

      getEditProduk();


    //  show handle confirmation modal 
      handleShowModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormEditProduk((prevFormEditProduk) => ({
      ...prevFormEditProduk,
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
                <h1>Perbarui Produk</h1>
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
              {/* name */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={formEditProduk.nama}
                  onChange={(e) =>
                    setFormEditProduk((prevFormEditProduk) => ({
                      ...prevFormEditProduk,
                      nama: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              {/* deskripsi singkat */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Deskripsi Singkat</Form.Label>
                <Form.Control
                  type="text"
                  value={formEditProduk.deskripsiSingkat}
                  onChange={(e) =>
                    setFormEditProduk((prevFormEditProduk) => ({
                      ...prevFormEditProduk,
                      deskripsiSingkat: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              {/* harga */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Harga</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={formEditProduk.harga}
                  onChange={(e) =>
                    setFormEditProduk((prevFormEditProduk) => ({
                      ...prevFormEditProduk,
                      harga: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              {/* deskripsi */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={formEditProduk.deskripsi}
                  onChange={(e) =>
                    setFormEditProduk((prevFormEditProduk) => ({
                      ...prevFormEditProduk,
                      deskripsi: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              {/* gambar  */}
              <div className="image-preview-container  border p-4 rounded">
                <div className="image-wrapper border-bottom pb-3 text-center">
                  {formEditProduk.previewUrl && (
                    <img
                      src={formEditProduk.previewUrl}
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
                  <p className="p-caraukur">*Maksimal ukuran gambar 2 mb</p>
                </Form.Group>
              </div>

              {/* status */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={formEditProduk.status}
                  onChange={(e) =>
                    setFormEditProduk((prevFormEditProduk) => ({
                      ...prevFormEditProduk,
                      status: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Form>

            {/* button simpan */}
            <div className="text-center mt-5 mb-5">
              <Button
                onClick={() => handleEditProduk()}
                className="btn-simpan fw-semibold"
                variant="/editbanner"
              >
                simpan
              </Button>
            </div>

            {/* modals popup berhasil */}
            <Modals
              show={showModal}
              onHide={handleCloseModal}
              title="Konfirmasi"
              body="Lihat Perubahan?"
              footer={
                <>
                  <Button
                    className=" fw-semibold px-5"
                    onClick={handleCloseModal}
                    variant="secondary"
                  >
                    Tidak
                  </Button>
                  <Button
                    className="btn-pesan fw-semibold px-5"
                    onClick={handleLihatPerubahan}
                  >
                    Ya
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
export default ProdukOwner;
