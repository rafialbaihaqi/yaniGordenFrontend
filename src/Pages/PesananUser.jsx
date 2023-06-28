import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";

const PesananUser = () => {
  // navigasi link
  const navigate = useNavigate();
  // definisi use params untuk id

  const [sendDetailPemesanan, setSendDetailPemesanan] = useState([]);
  React.useEffect(() => {
    document.title = "Pesananmu";
    getPemesanan();
  }, []);

  const getPemesanan = async () => {
    try {
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_user")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}pemesanan/${localStorage.getItem("access_id_user")}`,
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
      <Container>
        {/* title produk */}
        <Row>
          <Col>
            <div className="title d-flex mt-4">
              <div className="wrap-title mx-auto text-center">
                <h1>Pesanan Anda</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/*  pesanan container*/}
      <Container>
        {sendDetailPemesanan.map((item) => {
          return (
            <Container key={item.id} className="c-hubungi mt-3 mb-5 rounded-4">
              <div className="wrapper-hubungi px-5 py-4">
                <div>
                  <p>Nama Gorden : {!sendDetailPemesanan ? null : item.nama}</p>
                  <p>
                    Harga Satuan : {!sendDetailPemesanan ? null : item.harga}
                  </p>
                  {item.item.map((i, index) => (
                    <div key={index} className="p-hubungi">
                      Ukuran {!sendDetailPemesanan ? null : i.untuk} : Panjang :{" "}
                      {!sendDetailPemesanan ? null : i.panjang} cm, Lebar :{" "}
                      {!sendDetailPemesanan ? null : i.lebar} cm
                    </div>
                  ))}
                  <p>Total Harga :</p>
                  <p>
                    Status : {!sendDetailPemesanan ? null : item.status}{" "}
                    {item.status === "Diterima" ? (
                      <>
                        pada{" "}
                        {!sendDetailPemesanan
                          ? null
                          : new Date(item.updatedAt).toLocaleString("id-ID", {
                              timeZone: "Asia/Jakarta",
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                            })}
                      </>
                    ) : null}
                  </p>

                  {/* hubungi pemilik */}
                  <div className="text-center">
                    <Button
                      className="btn-hubungi fw-semibold mx-3 px-4 rounded-3"
                      onClick={() => handleKirimPesan(item)}
                      variant=""
                    >
                      Kirim Pesan
                    </Button>

                    <Button
                      onClick={() => navigate("/testimoni")}
                      className="btn-hubungi fw-semibold mx-3 px-4 rounded-3"
                      variant=""
                    >
                      Beri Ulasan
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          );
        })}
      </Container>
    </>
  );
};
export default PesananUser;
