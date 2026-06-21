const ProductCard = ({ title, thumbnail, id }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        width: "200px",
        height: "200px",
        margin: "20px",
        padding: "10px",
      }}
    >
      <img
        src={thumbnail}
        width={150}
        height={150}
        alt={title}
        loading="lazy"
      />
      <p>
        {id}. {title}
      </p>
    </div>
  );
};

export default ProductCard;
