import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./Styles/beranda.css";
import "./Styles/navigationBar.css";
import NavigationBar from "./Components/NavigationBar";
import Beranda from "./Pages/Beranda";
import Daftar from "./Pages/Daftar";
import Produk from "./Pages/Produk";
import DetailProduk from "./Pages/DetailProduk";
import DetailProdukOwner from "./Pages/DetailProdukOwner";
import Hubungi from "./Pages/Hubungi";
import TentangKami from "./Pages/TentangKami";
import Masuk from "./Pages/Masuk";
import PesananUser from "./Pages/PesananUser";
import Testimoni from "./Pages/Testimoni";
import NavigationBarOwner from "./Components/NavigationBarOwner";
import Owner from "./Pages/Owner";
import EditProduk from "./Pages/EditProduk";
import TambahProduk from "./Pages/TambahProduk";
import EditKomponen from "./Pages/EditKomponen";
import EditBannerProduk from "./Pages/EditBannerProduk";
import EditTestimoni from "./Pages/EditTestimoni";
import EditTentangKami from "./Pages/EditTentangKami";
import EditProfilUser from "./Pages/EditProfilUser";
import DaftarOwner from "./Pages/DaftarOwner";
import MasukOwner from "./Pages/MasukOwner";
import EditProfilOwner from "./Pages/EditProfilOwner";
import User from "./Pages/User";
import HalamanUser from "./Pages/HalamanUser";

function App() {
  // success token
  const HandleLoginSuccess = () => {
    if (
      localStorage.getItem("access_token_user")
    ) {
      // riwayat halaman sebelumnya
      return <Navigate to={-1} />;
    }
    return <NavigationBar showMenu={false} />
  };


  const HandleLoginSuccessOwner = () => {
    if (
      localStorage.getItem("access_token_owner")
    ) {
      // riwayat halaman sebelumnya
      return <Navigate to={-1} />;
    }
    return <NavigationBarOwner showMenu={false} />
  };

  //tidak ada token maka masuk ke masuk
  const ProtectedOwnerRoute = () => {
    if (!localStorage.getItem("access_token_owner")) {
      return <Navigate to="/masukowner" replace />;
    }
    return <NavigationBarOwner showMenu={true} />;
  };

  const ProtectedUserRoute = () => {
    if (!localStorage.getItem("access_token_user")) {
      return <Navigate to="/masuk" replace />;
    }
    return <NavigationBar showMenu={true} />;
  };
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<HandleLoginSuccess />}>
            <Route path="/daftar" element={<Daftar />} />
            <Route path="/masuk" element={<Masuk />} />
          </Route>
          <Route element={<HandleLoginSuccessOwner />}>
            <Route path="/daftarowner" element={<DaftarOwner />} />
            <Route path="/masukowner" element={<MasukOwner />} />
          </Route>

          {/* navigation public access */}
          <Route element={<NavigationBar showMenu={true} />}>
            <Route path="/" element={<Beranda />} />
            <Route path="/detailproduk/:id" element={<DetailProduk />} />
            <Route path="/produk" element={<Produk />} />
            <Route path="/tentangkami" element={<TentangKami />} />
          </Route>

          <Route element={<ProtectedUserRoute />}>
            <Route path="/hubungi" element={<Hubungi />} />
            <Route path="/editprofiluser" element={<EditProfilUser />} />
            <Route path="/pesananuser" element={<PesananUser />} />
            <Route path="/testimoni" element={<Testimoni />} />
          </Route>

          <Route element={<ProtectedOwnerRoute />}>
            <Route path="/owner" element={<Owner />} />
            <Route path="/editkomponen" element={<EditKomponen />} />
            <Route path="/tambahproduk" element={<TambahProduk />} />
            <Route path="/user" element={<User />} />
            <Route path="/detailprodukowner/:id" element={<DetailProdukOwner />} />
            <Route path="/halamanuser" element={<HalamanUser />} />
            <Route path="/editproduk/:id" element={<EditProduk />} />
            <Route path="/editbannerproduk/:id" element={<EditBannerProduk />} />
            <Route path="/editestimoni/:id" element={<EditTestimoni />} />
            <Route path="/editprofilowner" element={<EditProfilOwner />} />
            <Route path="/editentangkami/:id" element={<EditTentangKami />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
