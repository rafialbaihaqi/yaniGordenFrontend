import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [listUser, setListUser] = useState([]);
  const [sortedBy, setSortedBy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Pengguna Yani Gorden";
    getUser(sortedBy); // Fetch initial data
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_APIKEY}user`);
      console.log(res.data);
      setListUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Convert timestamp to WIB format
  const convertToWIB = (timestamp) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Jakarta",
    };
    return new Date(timestamp).toLocaleString("id-ID", options);
  };


  return (
    <>
      <Container>
        {/* title produk */}
        <Row>
          <Col>
            <div className="title mt-4">
              <div className="wrap-title">
                <h1>Daftar Pengguna</h1>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="fw-semibold">
                Total Pengguna : {listUser.length}
              </h6>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="table mt-3 mb-5">
        <div>
          <Table bordered striped responsive="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>No Whatsapp</th>
                <th>Dibuat</th>
                <th>Diupdate</th>
              </tr>
            </thead>
            <tbody>
              {listUser.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.nama}</td>
                  <td>{user.no_whatsapp}</td>
                  <td>{convertToWIB(user.createdAt)}</td>
                  <td>{convertToWIB(user.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default User;
