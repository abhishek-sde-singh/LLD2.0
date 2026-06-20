import { useState, useEffect, useRef } from "react";
import "./AutoComplete.css";
import useDebounce from "../hooks/useDebounce";

const AutoCompleteSearch = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const cache = useRef(new Map());

  useEffect(() => {
    const fetchData = async () => {
      if (cache.current.has(debouncedSearch)) {
        setSuggestions(cache.current.get(debouncedSearch));
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${debouncedSearch}`,
        );
        const data = await response.json();
        setSuggestions(data.products);
        cache.current.set(debouncedSearch, data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Something..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setShowData(true)}
        onBlur={() => setShowData(false)}
      />

      {showData && (
        <div className="contianer">
          {loading ? (
            <div className="loading">Loading....</div>
          ) : (
            <ul>
              {suggestions.map((item) => {
                return <li key={item.id}>{item.title}</li>;
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteSearch;
