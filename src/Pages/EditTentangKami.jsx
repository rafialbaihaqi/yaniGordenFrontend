import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import Modals from "../Components/Modals";

const EditTentangKami = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  
   const [formEditTentangKami, setFormEditTentangKami] = useState({
     tentang: "",
     alamat: "",
     no_whatsapp: "",
     email: ""
   });

   React.useEffect(() => {
     document.title = `Edit Tentangkami`;
     getEditTentangKami();
   }, []);

   // fungsi untuk menampilkan data edit profil
   const getEditTentangKami = async () => {
     try {
       // fungsi untuk ambil data dari database api
       const res = await axios({
         method: "GET",
         url: `${process.env.REACT_APP_APIKEY}tentangkami/${id}`,
       });
       console.log(res);
       //   nampung data yang sudah diambil
       setFormEditTentangKami(res.data.data);
     } catch (error) {
       console.log(error);
     }
   };
const handleEditTentangKami = async () => {
  const requestData = {
    tentang: formEditTentangKami.tentang,
    alamat: formEditTentangKami.alamat,
    no_whatsapp: formEditTentangKami.no_whatsapp,
    email: formEditTentangKami.email,
  };

  try {
    const res = await axios({
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token_owner")}`,
      },
      url: `${process.env.REACT_APP_APIKEY}tentangkami/${id}`,
      data: requestData,
    });
    console.log(res);
    // After successfully updating the data, fetch the updated data again

    getEditTentangKami();
    // Optionally, you can show a success message or perform any other necessary actions

    // Show the confirmation modal
    handleShowModal();
  } catch (error) {
    console.log(error);
  }
};


   //  modal
   const [showModal, setShowModal] = useState(false);
   const handleShowModal = () => {
     setShowModal(true);
   };

   const handleCloseModal = () => {
     setShowModal(false);
   };

   const handleLihatPerubahan = () => {
     // Navigate to '/halamanuser'
     navigate("/halamanuser");
   };
  return (
    <>
      <Container>
        {/* title produk */}
        <Row>
          <Col>
            <div className="title d-flex mt-4">
              <div className="wrap-title mx-auto text-center">
                <h1>Edit Tentang Kami</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/*  edit area*/}
      <Container className="form-edit mb-3">
        <Row>
          <Col>
            <Form>
              {/* tentang field */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tentang</Form.Label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={formEditTentangKami.tentang}
                  onChange={(e) =>
                    setFormEditTentangKami((prevFormEditTentangkami) => ({
                      ...prevFormEditTentangkami,
                      tentang: e.target.value,
                    }))
                  }
                ></textarea>
              </Form.Group>
              {/* no. whatsapp */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={formEditTentangKami.alamat}
                  onChange={(e) =>
                    setFormEditTentangKami((prevFormEditTentangkami) => ({
                      ...prevFormEditTentangkami,
                      alamat: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              {/* no. whatsapp */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>No. Whatsapp</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=""
                  value={formEditTentangKami.no_whatsapp}
                  onChange={(e) =>
                    setFormEditTentangKami((prevFormEditTentangkami) => ({
                      ...prevFormEditTentangkami,
                      no_whatsapp: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              {/* email */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  min="0"
                  placeholder=""
                  required
                  value={formEditTentangKami.email}
                  onChange={(e) =>
                    setFormEditTentangKami((prevFormEditTentangkami) => ({
                      ...prevFormEditTentangkami,
                      email: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Form>

            {/* button simpan */}
            <div className="text-center mt-5 mb-5">
              <Button
                onClick={handleEditTentangKami}
                className="btn-simpan fw-semibold"
                variant="/masuk"
              >
                simpan
              </Button>
            </div>

            {/* modals popup berhasil */}
            <Modals
              show={showModal}
              onHide={handleCloseModal}
              title="Suksess edit tentangkami!"
              body="Lihat perubahan yang sudah disimpan?"
              footer={
                <>
                  <Button
                    className="bg-secondary fw-semibold"
                    onClick={handleCloseModal}
                  >
                    Batal
                  </Button>
                  <Button
                    className="btn-pesan fw-semibold"
                    onClick={handleLihatPerubahan}
                  >
                    Lihat Perubahan
                  </Button>
                </>
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditTentangKami;
