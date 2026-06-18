


"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Circles } from "react-loader-spinner";

const ProductCollection = () => {
  const [collection, setCollection] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // FILTER STATES
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const CollectionHandler = async () => {
    const response = await fetch(`/api/admin/add-products`);
    const newData = await response.json();
    console.log("productData:", newData);

    setCollection(newData.data);
  };

  useEffect(() => {
    CollectionHandler();
  }, []);

  // SEARCH + FILTER + SORT
  const filteredCollection = collection
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (priceFilter === "below2000") {
        return item.price < 2000;
      }

      if (priceFilter === "2000to5000") {
        return item.price >= 2000 && item.price <= 5000;
      }

      if (priceFilter === "above5000") {
        return item.price > 5000;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "lowToHigh") {
        return a.price - b.price;
      }

      if (sortBy === "highToLow") {
        return b.price - a.price;
      }

      if (sortBy === "nameAZ") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "nameZA") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

  return (
    <div className="productSection">
      <h1 align="center">Select your Stay</h1>

      <div className="mainLayout">
        {/* LEFT FILTER SIDEBAR */}
        <div className="filterSidebar">
          <h3>🔍 Search Room</h3>

          <input
            type="text"
            placeholder="Search Rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />

          <h3>💰 Price Filter</h3>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="filterSelect"
          >
            <option value="all">All Prices</option>
            <option value="below2000">Below ₹2000</option>
            <option value="2000to5000">₹2000 - ₹5000</option>
            <option value="above5000">Luxury ₹5000+</option>
          </select>

          <h3>🔄 Sort By</h3>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filterSelect"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price Low → High</option>
            <option value="highToLow">Price High → Low</option>
            <option value="nameAZ">Name A → Z</option>
            <option value="nameZA">Name Z → A</option>
          </select>
        </div>

        {/* RIGHT SIDE ROOMS */}
        <div className="roomsContainer">
          {filteredCollection.length > 0 ? (
            filteredCollection.map((item) => {
              return (
                <div key={item._id} className="proDetail">
                  <div className="left">
                    <div className="title">{item.title}</div>
                    <br />

                    <img
                      src={item.image}
                      alt={item.title}
                      className="roomImage"
                    />
                  </div>

                  <div className="center">
                    <div className="pamen">
                      <h2 className="price">Rs. {item.price}</h2>

                      <div>
                        <h3>Amenities</h3>

                        {item.amen.map((serve, i) => {
                          return (
                            <div className="amenities" key={i}>
                              <div>*{serve}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="right">
                      <Link href={`/detail/${item._id}`}>
                        <button className="detail">Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : collection.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                visible={true}
              />
            </div>
          ) : (
            <h2
              style={{
                textAlign: "center",
                marginTop: "30px",
                color: "#666",
              }}
            >
              No Rooms Found
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;