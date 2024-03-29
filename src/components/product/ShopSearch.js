import React, { useState } from "react";
import {   BaseUrl, GetArticlesByCategory } from "../../helpers/Constant";
import { GetArticlesByNames  } from "../../helpers/Constant";

const ShopSearch = ({ handleSearchProducts }) => {
  const [searchText, setSearchText] = useState("");
  const [records, setRecords] = useState([]);
  const handleSearch = async (e) => {
    if (e.target.value === "") {
      try {
        const response = await fetch(GetArticlesByCategory + "0");
        const jsonData = await response.json();
        setRecords(jsonData.Data);
        handleSearchProducts(jsonData.Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      try {
        const response = await fetch(BaseUrl + `/Articles/GetArticlesByName?articleName=${e.target.value}`);

        const jsonData = await response.json();
        setRecords(jsonData.Data);
        handleSearchProducts(jsonData.Data);
        console.error("handleSearch data:", jsonData.Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input
            type="text"
            placeholder="Search here..."
            onChange={(e) => handleSearch(e)}
          />
          <button>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSearch;
