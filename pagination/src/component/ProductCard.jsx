const ProductCard = ({ title, thumbnail, id }) => {
  return (
    <div
      key={id}
      style={{
        border: "1px solid black",
        width: "200px",
        height: "200px",
        margin: "20px",
        padding: "10px",
      }}
      className="product-card"
    >
      <img src={thumbnail} width={150} height={150} />
      <p>
        {id}. {title}
      </p>
    </div>
  );
};

export default ProductCard;
