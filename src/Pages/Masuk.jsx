import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Modals from "../Components/Modals";

const Masuk = () => {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    no_whatsapp: "",
    password: "",
  });
  
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    document.title = `masuk`;
  }, []);

  const handleLoginUser = async () => {
    try {
      // fungsi untuk ambil data dari database api
      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_APIKEY}login`,
        data: formLogin,
      });
      console.log(res);

      localStorage.setItem("access_token_user", res.data.aksesToken);
      getDetailLogin(res.data.aksesToken);

      navigate("/");

      //   nampung data yang sudah diambil
    } catch (error) {
      console.log(error);
       setShowModal(true);
    }
  };
 
  const getDetailLogin = async (token) => {
    try {
      // fungsi untuk ambil data dari database api
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `${process.env.REACT_APP_APIKEY}user/profile/me`,
      });
      console.log(res);

      localStorage.setItem("access_id_user", res.data.data.id);
      //   nampung data yang sudah diambil
    } catch (error) {
      console.log(error);
    }
  };
 

  const handleCloseModal = () => {
    setShowModal(false);
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
                  <h1>Masuk akun untuk</h1>
                  <h1>memesan</h1>
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
                    <Form.Label>No Whatsapp</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          className=""
                          type="text"
                          placeholder="Contoh: 08xxxxxxxxxx"
                          onChange={(e) => {
                            setFormLogin({
                              ...formLogin,
                              no_whatsapp: e.target.value
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
                          onChange={(e) => {
                            setFormLogin({
                              ...formLogin,
                              password: e.target.value
                            });
                          }}
                          type="password"
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
                      // ketika tombol di klik terus tidak ada token benar maka akan menambah token
                      onClick={handleLoginUser}
                      className="btn-pesan fw-semibold px-5"
                    >
                      Masuk
                    </Button>

                    <Modals
                      show={showModal}
                      onHide={handleCloseModal}
                      title="login failed!"
                      body="Password salah. Silahkan coba lagi"
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
                  <div className="mt-3 d-flex justify-content-center">
                    <p className="pe-2">Belum punya akun?</p>
                    <Link className="link-daftar fw-semibold" to="/daftar">
                      Daftar di sini
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
export default Masuk;
