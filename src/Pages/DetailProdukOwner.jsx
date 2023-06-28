import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { Fragment, useState } from "react";

const DetailProduk = () => {
  let { id } = useParams();
  // index pertama untuk baca data index ke dua untuk masukan data
  const [detailProduct, setDetailProduct] = useState();

  React.useEffect(() => {
    document.title = `detailProduct`;
    getDetailProduct();
  },[]);

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
    </>
  );
};
export default DetailProduk;
