import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=10&skip=${page * 10}`,
          { signal: controller.signal },
        );
        const data = await response.json();
        setProducts(data.products);
        setTotal(Math.ceil(data.total / 10));
      } catch (err) {
        // Aborted requests reject with an AbortError — ignore those
        // if (err.name !== "AbortError")
        console.log(err);
      } finally {
        // Only the live request should clear loading
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [page]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        {loading ? (
          <div>Loading....</div>
        ) : (
          products.map((item) => {
            return (
              <ProductCard
                key={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                id={item.id}
              />
            );
          })
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
        <button onClick={handlePrev} disabled={page === 0}>
          Previous
        </button>
        {[...Array(total).keys()].map((item) => (
          <button
            key={item}
            style={item === page ? { backgroundColor: "teal" } : {}}
            onClick={() => setPage(item)}
          >
            {item + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={page >= total - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
