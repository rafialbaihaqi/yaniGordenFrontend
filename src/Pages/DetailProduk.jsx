import { Container, Col, Row, Form, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ukurJendela from "../Assets/images/ukurJendela.png";
import ukurPintu from "../Assets/images/ukurPintu.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { Fragment, useState, useRef } from "react";

const DetailProduk = () => {
  let { id } = useParams();
  // index pertama untuk baca data index ke dua untuk masukan data
  const [detailProduct, setDetailProduct] = useState();
  const [formPemesanan, setFormPemesanan] = useState({
    item: [],
    status: "Menungu Konfirmasi",
  });

  const [itemFormPemesanan, setItemFormPemesanan] = useState({
    indexOf: null,
    untuk: "Pintu",
    panjang: "",
    lebar: "",
  });

  React.useEffect(() => {
    document.title = `detailProduct`;
    getDetailProduct();
  }, []);

  // fungsi untuk menampilkan data detail produk
  const getDetailProduct = async () => {
    try {
      // fungsi untuk ambil data dari database api
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_APIKEY}products/${id}`,
      });
      console.log(res);
      //   nampung data yang sudah diambil
      setDetailProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle post membuat pemesanan
  const handleCreatePemasanan = async () => {
    try {

        
      // fungsi untuk ambil data dari database api
      const res = await axios({
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_user")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}pemesanan/`,
        data: {
          ...formPemesanan,
          nama: detailProduct.nama,
          harga: detailProduct.harga,
          totalHarga: detailProduct.totalHarga,
          statusProduk: detailProduct.status,
        },
      });
      console.log(res);
      navigate("/hubungi");
      //   nampung data yang sudah diambil
    } catch (error) {
      console.log(error);
    }
  };

  // focus edit
  const inputRef = useRef(null);

  // carousel index
  const [index, setIndex] = useState(0);
  // handle carousel
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  // fungsi navigate untuk link
  const navigate = useNavigate();
  // check user is login or not

  return (
    <>
      {/* title detail */}
      <Container className="mt-4">
        <Row>
          <Col lg={6} className="mt-4">
            {/* <Col> */}
            <div className="d-flex justify-content-center">
              {!detailProduct ? null : (
                <img
                  className="shadow rounded img-detail img-fluid"
                  src={detailProduct.gambar}
                  alt="imgdetail"
                />
              )}
            </div>
            {/* </Col> */}
          </Col>

          {/* title ukur */}
          <Col lg={6} className="">
            <Col>
              <div className="wrap-title mt-4">
                <h4 className="fw-bolder">
                  {!detailProduct ? null : detailProduct.nama}
                </h4>
              </div>
              <div className="wrap-title mt-3">
                <h2 className="fw-bolder">
                  Rp{!detailProduct ? null : detailProduct.harga}/m
                </h2>
              </div>
              <div className="wrap-title mt-3">
                <h5 className="fw-bolder">Deskripsi</h5>
              </div>
            </Col>
            <Col>
              <div className="teks-deskripsi lh-lg">
                <p>
                  {/* pakai data */}
                  {!detailProduct ? null : detailProduct.deskripsi}
                </p>
              </div>
            </Col>
          </Col>
        </Row>
      </Container>

      {/* cara ukur */}
      <Container className="mt-lg-5 mb-lg-5">
        <Row>
          <div className="title-ukur mt-5 text-center mb-4">
            <h4 className="fw-bolder">Cara ukur gorden</h4>
          </div>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="carousel-container"
            variant="dark"
          >
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src={ukurPintu}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src={ukurJendela}
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>

      {/* masukkan ukuran */}
      <Container className="mb-3 mt-4">
        <Row>
          <Col>
            <div className="title-deskripsi mt-4">
              <h5 className="fw-bolder">Masukkan Ukuran</h5>
            </div>
          </Col>
        </Row>
        <Row className="gap-3 mb-4">
          <Col lg={10}>
            <div className="teks-deskripsi border rounded-4 px-3 py-4 shadow">
              <select
                className="form-select"
                value={itemFormPemesanan.untuk}
                onChange={(e) => {
                  console.log(e.target.value);
                  setItemFormPemesanan({
                    ...itemFormPemesanan,
                    untuk: e.target.value,
                  });
                }}
                aria-label="Default select example"
              >
                <option value="Pintu">
                  Pintu
                </option>
                <option value="Jendela">Jendela</option>
                <option value="Pintu Depan">Pintu Depan</option>
              </select>
              <Form className="mt-3">
                <Row>
                  <Col>
                    <Form.Label>Panjang</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="number"
                          ref={inputRef}
                          value={itemFormPemesanan.panjang}
                          onChange={(e) => {
                            setItemFormPemesanan({
                              ...itemFormPemesanan,
                              panjang: e.target.value,
                            });
                          }}
                          className="form-bg"
                          placeholder=""
                        />
                      </Col>
                      <Form.Label column>cm</Form.Label>
                    </Row>
                  </Col>
                  <Col>
                    <Form.Label>Lebar</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          className="form-bg"
                          value={itemFormPemesanan.lebar}
                          type="number"
                          onChange={(e) => {
                            setItemFormPemesanan({
                              ...itemFormPemesanan,
                              lebar: e.target.value,
                            });
                          }}
                          placeholder=""
                        />
                      </Col>
                      <Form.Label column>cm</Form.Label>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>

          <Col>
            <div className="wrap-btn-tambah mt-lg-5 mt-sm-2">
              <Button
                className="fw-semibold"
                style={{
                  backgroundColor: "#e5d4cd",
                }}
                variant=""
                onClick={() => {
                  if (!itemFormPemesanan.indexOf) {
                    setFormPemesanan({
                      ...formPemesanan,
                      item: [
                        ...formPemesanan.item,
                        {
                          untuk: itemFormPemesanan.untuk,
                          panjang: itemFormPemesanan.panjang,
                          lebar: itemFormPemesanan.lebar,
                        },
                      ],
                    });
                  } else {
                    setFormPemesanan((item) => ({
                      ...formPemesanan,
                      item: formPemesanan.item.map((item, index) =>
                        index !== itemFormPemesanan.indexOf - 1
                          ? item
                          : {
                              untuk: itemFormPemesanan.untuk,
                              panjang: itemFormPemesanan.panjang,
                              lebar: itemFormPemesanan.lebar,
                            }
                      ),
                    }));
                  }

                  setItemFormPemesanan({
                    indexOf: null,
                    untuk: "",
                    panjang: 0,
                    lebar: 0,
                  });
                }}
              >
                {!itemFormPemesanan.indexOf ? "Tambah" : "Update"}
              </Button>
            </div>
          </Col>
        </Row>

        {formPemesanan.item.map((item, index) => {
          return (
            <div className="manyPemesanan mt-2" key={index}>
              <Container>
                <Row>
                  <Col
                    xs={12}
                    style={{
                      backgroundColor: "white",
                      marginBottom: "20px",
                      border: "2px solid #e5d4cd",
                      borderRadius: "20px",
                    }}
                    className="py-3 px-4 d-lg-flex justify-content-between shadow-sm"
                  >
                    <div>
                      <h5 className="fw-semibold">{item.untuk}</h5>
                      <div>Panjang : {item.panjang} cm</div>
                      <div>Lebar : {item.lebar} cm</div>
                    </div>

                    {/* button edit */}
                    <div>
                      <button
                        className="me-3 mt-2  rounded py-2 border-0 fw-semibold px-5"
                        style={{
                          backgroundColor: "#829460",
                        }}
                        onClick={() => {
                          setItemFormPemesanan({
                            indexOf: index + 1,
                            untuk: item.untuk,
                            panjang: item.panjang,
                            lebar: item.lebar,
                          });
                          // focus form controll when edit
                          inputRef.current.focus();
                        }}
                      >
                        Edit
                      </button>

                      {/* button hapus */}
                      <button
                        className="mt-2 rounded py-2 border-0 fw-semibold px-5"
                        style={{
                          backgroundColor: "#F96666",
                        }}
                        onClick={() => {
                          setFormPemesanan((prevForm) => ({
                            ...prevForm,
                            item: prevForm.item.filter((_, i) => i !== index),
                          }));
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          );
        })}

        <div>
          <h4>Estimasi Total Harga : </h4>
        </div>

        <Col className="my-5">
          <div className="text-center">
            {localStorage.getItem("access_token_user") ? (
              <Button
                disabled={formPemesanan.item.length === 0}
                onClick={() => handleCreatePemasanan()}
                className="btn-pesan fw-semibold px-5"
                variant="/hubungi"
              >
                Pesan Gorden
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/masuk")}
                className="btn-pesan fw-semibold px-5"
              >
                Pesan Gorden
              </Button>
            )}
          </div>
        </Col>
      </Container>

      {/* end of title detail */}
    </>
  );
};
export default DetailProduk;
