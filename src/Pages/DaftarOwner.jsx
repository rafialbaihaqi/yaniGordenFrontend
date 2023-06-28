import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Modals from "../Components/Modals";

const DaftarOwner = () => {
  const navigate = useNavigate();
  const [formRegisterOwner, setFormRegisterOwner] = useState({
    nama: "",
    no_whatsapp: "",
    password: "",
  });

  React.useEffect(() => {
    document.title = `Register Owner`;
  }, []);


  const handleRegisterOwner = async () => {
      try {
        // fungsi untuk ambil data dari database api
        const res = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_APIKEY}registerowner`,
          data: formRegisterOwner,
        });
        console.log(res);

        localStorage.setItem("access_token_owner", res.data.aksesToken);

        setShowConfirmationModal(true);

      } catch (error) {
        console.log(error);
        setShowModal(true);
    }
  };

  //  modal
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    navigate("/masukowner");
  };


  return (
    <>
      {/* title daftar */}
      <Container fluid className="c-daftar">
        <Container>
          <Row>
            <Col>
              <div className="title-daftar d-flex">
                <div className="wrap-title mx-auto text-center">
                  <h1>Daftar akun untuk</h1>
                  <h1>akses pemilik</h1>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* daftar*/}
      <Container className="wrap-daftar">
        <Row className="gap-3">
          <Col>
            <div className="border rounded-4 p-3 shadow bg-white">
              <Form className="mt-3">
                <Row>
                  <Col>
                    <Form.Label>nama</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          className=""
                          type="text"
                          placeholder="Contoh: john doe"
                          onChange={(e) => {
                            setFormRegisterOwner({
                              ...formRegisterOwner,
                              nama: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>No Whatsapp</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="text"
                          className=""
                          placeholder="Contoh: 08xxxxxxxxxx"
                          onChange={(e) => {
                            setFormRegisterOwner({
                              ...formRegisterOwner,
                              no_whatsapp: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>password</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          className=""
                          type="password"
                          onChange={(e) => {
                            setFormRegisterOwner({
                              ...formRegisterOwner,
                              password: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
              <Row>
                <Col>
                  <div className="text-center mt-3">
                    <Button
                      disabled={
                        !formRegisterOwner.nama ||
                        !formRegisterOwner.no_whatsapp ||
                        !formRegisterOwner.password
                      }
                      onClick={handleRegisterOwner}
                      className="btn-pesan fw-semibold px-5"
                      variant="/masukowner"
                    >
                      Daftar
                    </Button>
                    {/* modals conf */}
                    <Modals
                      show={showModal}
                      onHide={handleCloseModal}
                      title="Registrasi gagal"
                      body="Nomor whatsapp sudah digunakan silahkan gunakan nomor whatsapp yang lain"
                      footer={
                        <Button
                          className="btn-pesan fw-semibold px-5"
                          onClick={handleCloseModal}
                        >
                          Close
                        </Button>
                      }
                    />

                    {/* Modal for Confirmation */}
                    <Modals
                      show={showConfirmationModal}
                      onHide={handleCloseConfirmationModal}
                      title="Suksess"
                      body="Registrasi Sukses. Sekarang ada dapat masuk"
                      footer={
                        <Button
                          className="btn-pesan fw-semibold px-5"
                          onClick={handleCloseConfirmationModal}
                        >
                          Close
                        </Button>
                      }
                    />
                  </div>
                  <div className="mt-3 d-flex justify-content-center">
                    <p className="pe-2">Sudah punya akun?</p>
                    <Link className="link-daftar fw-semibold" to="/masukowner">
                      Masuk di sini
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DaftarOwner;
