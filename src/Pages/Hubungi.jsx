import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Hubungi = () => {
  // definisi use params untuk id

  const [sendDetailPemesanan, setSendDetailPemesanan] = useState([]);
  React.useEffect(() => {
    document.title = "Hubungi";
    getPemesanan();
  }, []);

  const getPemesanan = async () => {
    try {
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_user")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}pemesanan/${localStorage.getItem(
          "access_id_user"
        )}`,
      });
      console.log(res);
      setSendDetailPemesanan(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle kirim pesan whatsapp
  const handleKirimPesan = (item) => {
    const message = `Halo, saya ingin bertanya mengenai pesanan dengan detail sebagai berikut:\n\nNama Gorden: ${
      item.nama
    }\nHarga Satuan: ${item.harga}\n\nUkuran:\n${item.item
      .map(
        (i) =>
          `- Untuk ${i.untuk}: Panjang ${i.panjang} cm, Lebar ${i.lebar} cm`
      )
      .join("\n")}\n\nStatus: ${item.status}`;

    // Use any library or method to open a new chat window or redirect to WhatsApp with the message
    // Example using `window.open`:
    const url = `https://wa.me/6285866335915?text=${encodeURIComponent(
      message
    )}`;
    window.open(url);
  };

  return (
    <>
      <Container className="c-hubungi mt-5 rounded-4 w-75">
        <div className="wrapper-hubungi px-5 py-3">
          <Row>
            <Col>
              {/* title */}
              <div className="title d-flex mt-4">
                <div className="wrap-title">
                  <h1 className="fs-4">Kirim Pesanan</h1>
                  <h1 className="fs-4">Anda</h1>
                </div>
              </div>

              {/* deschubungi */}
              <div className="p-hubungi">
                <p>
                  Sebagai bukti keseriusan anda silahkan konfirmasi pemesanan
                  kepada penjual melalui whatsapp pemilik gorden berikut!
                </p>
              </div>

              {/* hubungi pemilik */}
              <div className="wrapper-hubungi float-end">
                {sendDetailPemesanan.length > 0 && (
                  <Button
                    className="btn-hubungi fw-semibold px-4 rounded-3"
                    variant=""
                    onClick={() => handleKirimPesan(sendDetailPemesanan[0])}
                  >
                    Hubungi via WhatsApp
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
  export default Hubungi;