import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";


const Owner = () => {
  const [listPemesanan, setListPemesanan] = useState([]);
  // fungsi untuk menampilkan data detail produk

  React.useEffect(() => {
    document.title = "Beranda Owner";
    getPemesanan();
  }, []);
  const getPemesanan = async () => {
    try {
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_owner")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}pemesanan/owner/all`,
      });
      console.log(res);
      setListPemesanan(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePemasanan = async (data) => {
    try {
      // fungsi untuk ambil data dari database api
      const res = await axios({
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_owner")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}pemesanan/${data.id}`,
        data: {
          item: [...data.item],
          produkId: data.id,
          status: "Diterima",
          nama: data.nama,
          harga: data.harga,
          statusProduk: data.status,
        },
      });

      getPemesanan();
      console.log(res);
      //   nampung data yang sudah diambil
    } catch (error) {
      console.log(error);
    }
  };

  const totalPesanan = listPemesanan.length;

  const countryCode = "+62";

  // Function to convert phone number format
  const convertPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith("0")) {
      // Remove leading zero
      phoneNumber = phoneNumber.slice(1);
    }
    return `${countryCode}${phoneNumber}`;
  };

  return (
    <>
      <Container>
        {/* title produk */}
        <Row>
          <Col>
            <div className="title d-flex mt-4">
              <div className="wrap-title">
                <h1>Daftar Pesanan</h1>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="fw-semibold">Total Pesanan: {totalPesanan}</h6>
            </div>
          </Col>
        </Row>
      </Container>

      {/*  pesanan container*/}
      <Container className="mb-5">
        <Container className="mt-3">
          {listPemesanan.map((item) => {
            const isTerimaDisabled = item.status === "Diterima";
            return (
              <Container key={item.id} className="c-hubungi mt-3 rounded-4">
                <div className="wrapper-hubungi px-5 py-3">
                  <div>
                    <p>Pemesan : {!setListPemesanan ? null : item.user.nama}</p>
                    <p>Nama Gorden : {!setListPemesanan ? null : item.nama}</p>
                    <p>
                      Harga Satuan : {!setListPemesanan ? null : item.harga}
                    </p>
                    {item.item.map((i, index) => (
                      <div key={index} className="p-hubungi">
                        Ukuran {!listPemesanan ? null : i.untuk} : Panjang :{" "}
                        {!listPemesanan ? null : i.panjang} cm, Lebar :{" "}
                        {!listPemesanan ? null : i.lebar} cm
                      </div>
                    ))}
                    <p>
                      Estimasi Total Harga :{" "}
                      {!setListPemesanan ? null : item.totalHarga}
                    </p>
                    <p>Status : {!setListPemesanan ? null : item.status}</p>
                    <p>
                      Tanggal Pesan :{" "}
                      {!setListPemesanan
                        ? null
                        : new Date(item.createdAt).toLocaleString("id-ID", {
                            timeZone: "Asia/Jakarta",
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                    </p>

                    {/* hubungi pemilik */}
                    <div className="text-center">
                      <a
                        href={`https://wa.me/${convertPhoneNumber(
                          item.user.no_whatsapp
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mx-3"
                      >
                        <Button
                          className="btn-hubungi fw-semibold px-3 rounded-3"
                          variant=""
                        >
                          Kirim Pesan
                        </Button>
                      </a>

                      <Button
                        onClick={() => handleCreatePemasanan(item)}
                        className="btn-hubungi fw-semibold px-3 rounded-3"
                        variant=""
                        disabled={isTerimaDisabled}
                      >
                        Terima Pesanan
                      </Button>
                    </div>
                  </div>
                </div>
              </Container>
            );
          })}
        </Container>
      </Container>
    </>
  );
};
export default Owner;
