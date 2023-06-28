import { Col, Container, Row} from "react-bootstrap";
import CardProduct from "../Components/CardProduct";
import axios from "axios";
import React, { useState } from "react";

const Produk = () => {

    const [listProduct, setListProduct] = useState([]);
    React.useEffect(() => {
      document.title = "Yani Gorden";
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
    return (
      <>
        <Container>
          {/* title produk */}
          <Row>
            <Col>
              <div className="title d-flex mt-4">
                <div className="wrap-title">
                  <h1>Pilih Gorden</h1>
                  <h1>Kesukaanmu</h1>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* card product from component */}
        {!listProduct ? null : (
          <Container className="mt-3">
            <Row>
              {listProduct.map((item, index) => {
                return (
                  <Col lg={3} xs={6} className="mb-3" key={item.id}>
                    <CardProduct data={item} />
                  </Col>
                );
              })}
            </Row>
          </Container>
        )}
      </>
    );
  }
  export default Produk;