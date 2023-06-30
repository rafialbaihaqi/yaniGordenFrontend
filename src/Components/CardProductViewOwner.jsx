import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CardProduct({data}) {
  return (
    <Card className="c-cardProduct rounded-4 p-2 shadow">
      <Link to={`/detailprodukowner/${data.id}`}>
        <Card.Img
          className="card-img rounded-4"
          variant="top"
          src={data.gambar}
        />
        <Card.Body className="p-1">
          <Card.Title className="fw-semibold">{data.nama}</Card.Title>
          <Card.Text>{data.deskripsiSingkat}</Card.Text>
          <Card.Text className="fw-semibold">{data.harga}/m</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default CardProduct;
