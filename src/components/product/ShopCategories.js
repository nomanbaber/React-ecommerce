import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

// const ShopCategories = ({ categories, getSortParams, getCategoryId }) => {
const ShopCategories = ({ categories, getSortParams }) => {
  var newCategories = JSON.parse(localStorage.getItem("category"));
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories</h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className={
                    localStorage.getItem("categoryId") == 0 ? "active" : ""
                  }
                  onClick={(e) => {
                    // getSortParams("category", "");
                    getSortParams("category", "All");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {newCategories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className={
                        localStorage.getItem("categoryId") ==
                        category.CategoryID
                          ? "active"
                          : ""
                      }
                      onClick={(e) => {
                        getSortParams("category", category.Name);
                        // getCategoryId(category.CategoryID);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category.Name}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
            {/* {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("category", category);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category}{" "}
                    </button>
                  </div>
                </li>
              );
            })} */}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopCategories;
