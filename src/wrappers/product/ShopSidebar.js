import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
  getIndividualCategories,
  getIndividualTags,
  getIndividualColors,
  getProductsIndividualSizes,
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopTag";
import MultiRangeSlider from "../../components/price-range/MultiRangeSlider";
import { useState } from "react";
import { BaseUrl } from "../../helpers/Constant";

const ShopSidebar = ({
  products,
  getSortParams,
  sideSpaceClass,
  handleSearchProducts,
  handleFilterByPriceProducts,
}) => {
  const uniqueCategories = getIndividualCategories(products);
  const uniqueColors = getIndividualColors(products);
  const uniqueSizes = getProductsIndividualSizes(products);
  const uniqueTags = getIndividualTags(products);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(10000);
  const [catId, setCatId] = useState();
  
  const handleFilterPrice = async (minVal, maxVal) => {
    // console.log(catId);
    // let categoryIdForApi;
    // if (catId === undefined) {
    //   categoryIdForApi = localStorage.getItem("categoryId");
    // } else {
    //   categoryIdForApi = catId;
    // }
    // console.log("categoryIdForApi", categoryIdForApi);
    try {
      const response = await fetch(
       BaseUrl +  `Articles/GetArticlesByCategory?minPrice=${minVal}&maxPrice=${maxVal}&categoryIds=${localStorage.getItem(
          "categoryId"
        )}`
        // `https://4sleemnltgyu5hl4kotkycgmwi0uycqd.lambda-url.us-east-1.on.aws/Articles/GetArticlesByCategory?minPrice=${minVal}&maxPrice=${maxVal}&categoryIds=${categoryIdForApi}`
      );
      const jsonData = await response.json();
      handleFilterByPriceProducts(jsonData.Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMinMax = (a, b) => {
    setMinVal(a);
    setMaxVal(b);
  };
  // const getCategoryId = (catId) => {
  //   console.log(catId);
  //   // setCatId(catId);
  // };
  useEffect(() => {
    handleFilterPrice(minVal, maxVal);
  }, [minVal, maxVal]);
  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch handleSearchProducts={handleSearchProducts} />

      {/* filter by price  */}
      <MultiRangeSlider
        min={0}
        max={60000}
        onChange={({ min, max }) => handleMinMax(min, max)}
      />
      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
        // getCategoryId={getCategoryId}
      />

      {/* filter by color */}
      {/* <ShopColor colors={uniqueColors} getSortParams={getSortParams} /> */}

      {/* filter by size */}
      {/* <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} /> */}

      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
