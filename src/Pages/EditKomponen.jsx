import { Col, Container, Row, Button, Carousel } from "react-bootstrap";
import CardProductOwner from "../Components/CardProductOwner";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import whatsapp from "../Assets/images/whatsapp.svg";
import email from "../Assets/images/email.svg";

const EditKomponen = () => {
  const navigate = useNavigate();

  // untuk menampilkan semua data produk
  // index pertama untuk baca data index ke dua untuk masukan data
  const [listProduct, setListProduct] = useState([]);
  React.useEffect(() => {
    document.title = "Owner Yani Gorden";
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_APIKEY}products`,
      });
      console.log(res);
      setListProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // banner handle select
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // banner use state
  const [bannerProduct, setBannerProduct] = useState([]);
  React.useEffect(() => {
    getBanner();
  }, []);

  const getBanner = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_APIKEY}banner`,
      });
      console.log(res);
      setBannerProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [tentangKami, setTentangKami] = useState();
  React.useEffect(() => {
    document.title = `Tentang Kami`;
    getTentangKami();
  }, []);

  const getTentangKami = async () => {
    try {
      // fungsi untuk ambil data dari database api
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_APIKEY}tentangkami${localStorage.getItem(
          "access_id_user"
        )}`,
      });
      console.log(res);
      //   nampung data yang sudah diambil
      setTentangKami(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle select carousel testimoni
  const [indexT, setIndexT] = useState(0);
  const handleSelectT = (selectedIndex, e) => {
    setIndexT(selectedIndex);
  };

  const [listTestimoni, setListTestimoni] = useState([]);
  React.useEffect(() => {
    getTestimoni();
  }, []);

  const getTestimoni = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_APIKEY}testimoni`,
      });
      console.log(res);
      setListTestimoni(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="title d-flex mt-4">
              <div className="wrap-title mx-auto text-center">
                <h1>Pesan gorden online dengan harga murah</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* end of navigation bar */}

      {/* container carousel */}
      <Container fluid>
        <Row>
          <Col className="text-center mt-2 mb-3">
            {/* <Carousel Banner Product /> */}
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              variant="dark"
            >
              {bannerProduct.map((item, index) => {
                return (
                  <Carousel.Item key={index + 1} className="carousel-items">
                    {!item.gambarProduk ? null : (
                      <img
                        className="d-block  carousel-img mx-auto w-75 shadow rounded"
                        src={item.gambarProduk}
                        alt="First slide"
                      />
                    )}
                    <Carousel.Caption>
                      {!item.namaProduk ? null : (
                        <>
                          <p className="text-carousel text-white">
                            {item.namaProduk}
                          </p>
                          <Button
                            onClick={() =>
                              navigate(`/editbannerproduk/${item.id}`)
                            }
                            style={{
                              backgroundColor: "#829460",
                              textDecoration: "none",
                              border: "none",
                              fontWeight: "550",
                            }}
                            className="btnEditProduk"
                          >
                            Edit banner
                          </Button>
                        </>
                      )}
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
        </Row>
      </Container>
      {/* end of container carousel product */}

      {/* container category */}
      <Container className="c-category mt-5">
        <Row>
          <Col>
              <div className="wrap-btn-category">
                <Button
                  onClick={() => navigate("/tambahproduk")}
                  className="btn-add fw-semibold"
                  variant="/tambahproduk"
                >
                  + Tambah Produk
                </Button>
              </div>
          </Col>
        </Row>
      </Container>
      {/* end of container category */}

      {/* product container */}
      {!listProduct ? null : (
        <Container className="mt-3">
          <Row>
            {listProduct.map((item, index) => {
              return (
                <Col lg={3} xs={6} key={index + 1} className="mb-3">
                  <CardProductOwner data={item} />
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
      {/* end of product container */}

      <Container>
        <Row>
          <Col>
            <div className="title d-flex mt-5">
              <div className="wrap-tentangkami">
                <h1>Yani Gorden</h1>
                <p className="p-tentangkami">
                  {!tentangKami ? null : tentangKami.tentang}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* container testimoni */}
      <Container fluid>
        {/* title testimoni */}
        <Row>
          <Col>
            <div className="title d-flex mt-5">
              <div className="wrap-title mx-auto text-center">
                <h1>Testimoni</h1>
              </div>
            </div>
          </Col>
        </Row>

        {/* carousel testimoni*/}

        {/* {!listTestimoni ? null : ( */}
        <Row>
          <Col>
            {/* <Carousel Banner Product /> */}
            <Carousel
              activeIndex={indexT}
              onSelect={handleSelectT}
              variant="dark"
            >
              {listTestimoni.map((item, indexT) => {
                return (
                  <Carousel.Item key={indexT + 1} className="carousel-items">
                    {!item.gambar ? null : (
                      <img
                        className="d-block  carousel-img mx-auto w-75 shadow rounded"
                        src={item.gambar}
                        alt="First slide"
                      />
                    )}
                    <Carousel.Caption>
                      {!item.deskripsi ? null : (
                        <>
                          <p className="text-carousel text-white">
                            {item.deskripsi}
                          </p>
                          <Button
                            onClick={() => navigate(`/editestimoni/${item.id}`)}
                            style={{
                              backgroundColor: "#829460",
                              textDecoration: "none",
                              border: "none",
                              fontWeight: "550",
                            }}
                            className="btnEditProduk"
                          >
                            Edit Testimoni
                          </Button>
                        </>
                      )}
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
        </Row>
        {/* )} */}
      </Container>

      {/* container contact */}
      <Container fluid className="container-contact">
        <Container className="wrap-contact">
          <Row>
            <Col lg={6}>
              {/* title contact */}
              <div className="title d-flex mt-4">
                <div className="wrap-alamat">
                  <h1>Alamat</h1>
                  <p className="p-tentangkami">
                    {!tentangKami ? null : tentangKami.alamat}
                  </p>
                  <div className="wrapper-wa-email">
                    <div className="wa-email">
                      <a
                        href="https://wa.me/6285866335915"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={whatsapp} alt="whatsapp" />{" "}
                        {!tentangKami ? null : tentangKami.no_whatsapp}
                      </a>
                    </div>
                    <div className="wa-email mt-3">
                      <a href="mailto:rafialbaihaqibc@gmail.com">
                        <img
                          src={email}
                          alt="email"
                          target="_blank"
                          rel="noreferrer"
                        />{" "}
                        {!tentangKami ? null : tentangKami.email}
                      </a>
                    </div>
                    <div className="wa-email mt-5">
                      <Button
                        onClick={() => navigate(`/editentangkami/${[1]}`)}
                        style={{
                          backgroundColor: "#829460",
                          textDecoration: "none",
                          border: "none",
                          fontWeight: "550",
                        }}
                        className="btnEditProduk"
                      >
                        Edit Tentang Kami
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="title d-flex mt-4">
                <div className="wrap-alamat">
                  <h1>Peta Lokasi</h1>
                  <iframe
                    className="rounded iframeTentangKami"
                    title="Embedded Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.5308793499535!2d109.09014144069698!3d-6.950897568032973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fbbe84223b907%3A0x74becf2035bb13c!2sWarung%20Ibu%20Yani!5e0!3m2!1sid!2sid!4v1680415794912!5m2!1sid!2sid"
                    width="400"
                    height="210"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
export default EditKomponen;
