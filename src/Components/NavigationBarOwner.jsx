import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import g3 from "../Assets/images/g3.jpg";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import yglogo from "../Assets/images/yglogo.svg";


const NavigationBarOwner = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const Menus = ["Edit Profil", "Pesanan", "Keluar"];
  const menuRef = useRef();
  const imgRef = useRef();

  // handle click event
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        imgRef.current &&
        !imgRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (menu) => {
    setOpen(false);
    if (menu === "Keluar") {
      handleLogout();
    } else if (menu === "Edit Profil") {
      navigate("/editprofilowner");
    } else if (menu === "Pesanan") {
      navigate(`/owner`);
    }
  };

  const handleLogout = () => {
    // Remove access token from local storage
    localStorage.removeItem("access_token_owner");
    navigate("/masukowner");
  };

  const isLoggedIn = localStorage.getItem("access_token_owner");


  // index pertama untuk baca data index ke dua untuk masukan data
  const [imageProfil, setImageProfil] = useState();

  // fungsi untuk menampilkan data image profil
  const getImageProfil = async () => {
    try {
      // fungsi untuk ambil data dari database api
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token_owner")}`,
        },
        url: `${process.env.REACT_APP_APIKEY}owner/profile/me`,
      });
      console.log(res);
      //   nampung data yang sudah diambil
      setImageProfil(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImageProfil();
  }, []); // Call the function when the component mounts

  return (
    <>
      <Navbar
        bg="white"
        className="navbar py-3 shadow-sm  sticky-top"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand
            className="navBrand ms-3 d-none d-lg-block"
            as={Link}
            to="/owner"
          >
            <img src={yglogo} alt="yglogo" />
          </Navbar.Brand>

          {/* img profil */}
          {isLoggedIn ? (
            <div
              ref={imgRef}
              onClick={() => setOpen(!open)}
              className="position-relative imgProfil order-lg-2 ms-lg-auto"
              style={{ zIndex: 100 }}
            >
              {imageProfil && imageProfil.fotoProfil ? (
                <img
                  src={`${imageProfil.fotoProfil}?${Date.now()}`}
                  alt="user"
                  className="rounded-circle"
                  width="40px"
                  height="40px"
                />
              ) : (
                <img
                  src={`${g3}?${Date.now()}`}
                  alt="user"
                  className="rounded-circle"
                  width="40px"
                />
              )}
              {open && (
                <div
                  ref={menuRef}
                  className="menuItem  rounded-2 shadow-lg bg-white"
                >
                  <ul className="ulProfil">
                    {Menus.map((menu) => (
                      <li
                        onClick={() => handleMenuClick(menu)}
                        className="liProfil"
                        key={menu}
                      >
                        {menu}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => navigate("/masukowner")}
              className="buttonNav"
              variant="/"
            >
              Masuk
            </Button>
          )}

          {/* navbar toggle collapse */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-4">
              {/* ketika show menu kodisinya benar maka akan di hilangkan dan jika false maka akan di tampilkan */}
              {props.showMenu === true ? (
                <>
                  <Nav.Link className="navlink" as={Link} to="/owner">
                    Beranda
                  </Nav.Link>
                  <Nav.Link className="navlink" as={Link} to="/editkomponen">
                    Edit
                  </Nav.Link>
                  <Nav.Link className="navlink" as={Link} to="/user">
                    Pengguna
                  </Nav.Link>
                  <Nav.Link
                    className="navlink me-3"
                    as={Link}
                    to="/halamanuser"
                  >
                    Halaman Pengguna
                  </Nav.Link>
                </>
              ) : null}

              {/* jika benar button nampil, salah nggak nampil */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* pusat dari navigation bar  semua halaman */}
      <Outlet />
    </>
  );
};
export default NavigationBarOwner;
