import { Container, Row, Col, Carousel } from "react-bootstrap";
import whatsapp from "../Assets/images/whatsapp.svg";
import email from "../Assets/images/email.svg";
import React, { Fragment, useState } from "react";
import axios from "axios";

const TentangKami = () => {
  // index pertama untuk baca data index ke dua untuk masukan data
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
        url: `${process.env.REACT_APP_APIKEY}tentangkami/${localStorage.getItem(
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
  const [index, setIndex] = useState(0);
   const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
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
                activeIndex={index}
                onSelect={handleSelect}
                variant="dark"
              >
                {listTestimoni.map((item, index) => {
                  return (
                    <Carousel.Item key={index + 1} className="carousel-items">
                      {!item.gambar ? null : (
                        <img
                          className="d-block  carousel-img mx-auto w-75 shadow rounded"
                          src={item.gambar}
                          alt="First slide"
                        />
                      )}
                      <Carousel.Caption>
                        {!item.deskripsi ? null : (
                          <p className="text-carousel text-white mt-5">{item.deskripsi}</p>
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
export default TentangKami;
