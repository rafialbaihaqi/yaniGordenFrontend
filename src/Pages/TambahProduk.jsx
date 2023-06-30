import axios from "axios";
import { useState } from "react";
import { Col, Container, Row, Button,Form} from "react-bootstrap";
import Modals from "../Components/Modals";

const TambahProduk = () => {

  // index pertama untuk baca data index ke dua untuk masukan data
  const [formTambahProduk, setFormTambahProduk] = useState({
    nama: "",
    deskripsiSingkat: "",
    deskripsi: "",
    harga: "",
    gambar: null,
    status: "Menungu Konfirmasi",
    previewUrl: null, // Added for image preview
  });

  const handleTambahProduk = async () => {
    const formData = new FormData();
    formData.append("nama", formTambahProduk.nama);
    formData.append("deskripsiSingkat", formTambahProduk.deskripsiSingkat);
    formData.append("harga", formTambahProduk.harga);
    formData.append("deskripsi", formTambahProduk.deskripsi);
    formData.append("gambar", formTambahProduk.gambar);
    formData.append("status", formTambahProduk.status);

    try {
      const res = await axios({
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_owner")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}products`,
        data: formData,
      });
      console.log("Response POST");
      console.log(res);

      setFormTambahProduk({
        nama: "",
        deskripsiSingkat: "",
        deskripsi: "",
        harga: "",
        gambar: null,
        status: "Menungu Konfirmasi",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    setFormTambahProduk({
      ...formTambahProduk,
      gambar: selectedFile,
      previewUrl: URL.createObjectURL(selectedFile), // Create preview URL
    });
  };
  
  // chechk form if not input button disable
  const isFormValid = () => {
  for (const field in formTambahProduk) {
    if (!formTambahProduk[field]) {
      return false;
    }
  }
  return true;
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
                <h1>Tambah Produk</h1>
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  value={formTambahProduk.nama}
                  onChange={(e) => {
                    setFormTambahProduk({
                      ...formTambahProduk,
                      nama: e.target.value,
                    });
                  }}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Deskripsi Singkat</Form.Label>
                <Form.Control
                  type="text"
                  value={formTambahProduk.deskripsiSingkat}
                  onChange={(e) => {
                    setFormTambahProduk({
                      ...formTambahProduk,
                      deskripsiSingkat: e.target.value,
                    });
                  }}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  value={formTambahProduk.deskripsi}
                  onChange={(e) => {
                    setFormTambahProduk({
                      ...formTambahProduk,
                      deskripsi: e.target.value,
                    });
                  }}
                  rows={3}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Harga</Form.Label>
                <Form.Control
                  type="text"
                  value={formTambahProduk.harga}
                  onChange={(e) => {
                    setFormTambahProduk({
                      ...formTambahProduk,
                      harga: e.target.value,
                    });
                  }}
                  placeholder=""
                />
              </Form.Group>
              <div className="image-preview-container  border p-4 rounded">
                <div className="image-wrapper border-bottom pb-3 text-center">
                  {formTambahProduk.previewUrl && (
                    <img
                      src={formTambahProduk.previewUrl}
                      alt="Preview"
                      style={{ maxWidth: "40%", marginTop: "10px" }}
                    />
                  )}
                </div>

                {/* gambar produk 1 */}
                <Form.Group controlId="formFile" className=" mt-3">
                  <Form.Label>Upload gambar</Form.Label>
                  <Form.Control
                    // value={formTestimoni.gambar}
                    onChange={handleImageChange}
                    type="file"
                  />
                  <p className="p-caraukur">*Maksimal ukuran gambar 2 mb</p>
                </Form.Group>
              </div>
            </Form>
            {/* button simpan */}
            <div className="text-center mt-5 mb-5">
              <Button
                disabled={!isFormValid()}
                onClick={() => handleTambahProduk(handleShowModal())}
                className="btn-simpan fw-semibold"
                variant="/testimoni"
              >
                Kirim
              </Button>
              <Modals
                show={showModal}
                onHide={handleCloseModal}
                title="Sukses!!"
                body="Berhasil Menambah Data Produk"
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
}
  export default TambahProduk;