import { Col, Container, Row, Carousel } from "react-bootstrap";
import CardProduct from "../Components/CardProduct";
import axios from "axios";
import React, { Fragment, useState } from "react";

const Beranda = () => {
  // use state list product
  const [listProduct, setListProduct] = useState([]);

  // banner use state
  const [index, setIndex] = useState(0);
  const [bannerProduct, setBannerProduct] = useState([]);

  React.useEffect(() => {
    document.title = "Yani Gorden";
    getBanner();
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

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {/* navigation bar */}
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
      <Container fluid className="container-carousel">
        <Row>
          <Col className="text-center mt-2">
            {/* <Carousel Banner Product /> */}
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              variant="dark"
            >
              {bannerProduct.map((item, index) => {
                return (
                  <Carousel.Item
                    key={index + 1}
                    className="carousel-container-home"
                  >
                    {!item.gambarProduk ? null : (  
                      <img
                        className="d-block w-100 shadow carousel-image-home"
                        src={item.gambarProduk}
                        alt="First slide"
                      />
                    )}
                    <Carousel.Caption>
                      {!item.namaProduk ? null : (
                        <p className="text-carousel text-white">
                          {item.namaProduk}
                        </p>
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
      <Container className="c-category">
        <Row>
          <Col sm={12}>
            <div className="title-category text-lg-center mt-5 mb-2 fw-semibold">
              Pilih Gorden
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
                  <CardProduct data={item} />
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
      {/* end of product container */}
    </>
  );
};
export default Beranda;
