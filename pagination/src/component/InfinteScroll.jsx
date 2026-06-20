import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Invisible element kept at the bottom of the list; when it scrolls into
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [products, hasMore]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=10&skip=${page * 10}`,
          { signal: controller.signal },
        );
        const data = await response.json();
        setProducts((prev) => [...prev, ...data.products]);
        setHasMore(page * 10 + data.products.length < data.total);
      } catch (err) {
        // Aborted requests reject with an AbortError — ignore those
        // if (err.name !== "AbortError")
        console.log(err);
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
        {products.map((item) => {
          return (
            <ProductCard
              key={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              id={item.id}
            />
          );
        })}
      </div>

      {/* Sentinel: observed to trigger loading the next page */}
      <div ref={sentinelRef} style={{ height: "1px" }} />
    </div>
  );
};

export default Pagination;
