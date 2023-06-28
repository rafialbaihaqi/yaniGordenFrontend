import axios from "axios";
import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function CardProduct({data}) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);


  const handleDelete = async () => {
    try {
      const res = await axios({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_owner")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}products/${data.id}`,
      });
       console.log(res);
        setShowModal(false);
         navigate("/halamanuser");
    } catch (error) {
      console.log(error);
    }
  };

   const handleShowModal = () => {
     setShowModal(true);
   };

   const handleCloseModal = () => {
     setShowModal(false);
   };


  
  return (
    <Card className="c-cardProduct rounded-4 p-2 shadow">
      {/* <Link to={`/detailprodukowner/${data.id}`}> */}
      <Card.Img
        className="card-img rounded-4"
        variant="top"
        src={data.gambar}
      />
      <Card.Body className="p-1">
        <Card.Title className="fw-semibold">{data.nama}</Card.Title>
        <Card.Text>{data.deskripsiSingkat}</Card.Text>
        <Card.Text className="fw-semibold">{data.harga}/m</Card.Text>
        <div className="d-flex justify-content-between">
          <Link to={`/editproduk/${data.id}`}>
            <Button
              style={{
                backgroundColor: "#829460",
                textDecoration: "none",
                border: "none",
                fontWeight: "550",
              }}
              className="btnEditProduk"
            >
              Edit
            </Button>
          </Link>

          <Button
            onClick={handleShowModal}
            style={{
              backgroundColor: "#F96666",
              textDecoration: "none",
              border: "none",
              fontWeight: "550",
            }}
            className="btnHapusProduk"
          >
            Hapus
          </Button>
        </div>
      </Card.Body>
      {/* </Link> */}

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus produk ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button
            style={{
              backgroundColor: "#F96666",
              textDecoration: "none",
              border: "none",
              fontWeight: "550",
            }}
            onClick={handleDelete}
            className="btnHapusProduk"
          >
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default CardProduct;
