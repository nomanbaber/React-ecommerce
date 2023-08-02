import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getSortedProducts } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import axios from "axios";
import ProductGrid from "../../wrappers/product/ProductGrid";
import { BaseUrl, GetArticlesByCategory } from "../../helpers/Constant";

const ShopGridStandard = ({ location, products }) => {
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedCategoryCheckBox, setSelectedCategoryCheckBox] = useState("");
  const [catId, setCatId] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [url, setUrl] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [maxval, setmaxval] = useState(0);
  const [minval, setminval] = useState(0);

  const pageLimit = 15;
  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue,catId) => {
    setSortType(sortType);
    setSortValue(sortValue);
    setSelectedCategoryCheckBox(sortValue);
    // setCatId(catId);
  };

  useEffect(() => {
    if (selectedCategoryCheckBox !== "") {
      displayFilteredRecordAgainstCategoryCheckBoxSelectionOnShopPage(
        selectedCategoryCheckBox,
        records
      );
    }
  }, [selectedCategoryCheckBox]);
  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };
  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    fetchData();
    // }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);
  }, [offset, products]);
  
  const fetchData = async () => {
    var url1 = "";
    console.log("get cat id:" , localStorage.getItem("categoryId"))
    if (localStorage.getItem("categoryId") == 0) {
       
      url1 = BaseUrl + `/Articles/GetArticlesByCategory?categoryIds=0`

      
      setUrl(url1);
    } else {
      url1 = BaseUrl + `/Articles/GetArticlesByCategory?categoryIds=${localStorage.getItem(
        "categoryId"
      )}`;
      setUrl(url1);
    }
    try {
      const response = await fetch(url1);
      const jsonData = await response.json();
      setRecords(jsonData.Data);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllProducts = () => {
    axios
      .get(
        GetArticlesByCategory + "0"
      )
      .then((response) => {
        setAllProducts(response.data.Data);
        
        console.log("minandmaxval", response.data.AdditionalData.maxPrice) 
        setmaxval(response.data.AdditionalData.maxPrice)
 
        localStorage.setItem('MaxPrice', response.data.AdditionalData.maxPrice);
        localStorage.setItem('MinPrice', response.data.AdditionalData.minPrice);

 


      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const displayFilteredRecordAgainstCategoryCheckBoxSelectionOnShopPage = (
    categoryName,
    productRecords
  ) => {
    let newRecords = [];
    if (categoryName === "All") {
      // setFilteredProducts(productRecords);
      setFilteredProducts(allProducts);
    } else {
      newRecords = allProducts.filter(
        (val) => val.CategoryName === categoryName
      );
      setFilteredProducts(newRecords);
    }

  };
  const handleSearchProducts = (data) => {
    setRecords(data);
  };
  const handleFilterByPriceProducts = (data) => {
    console.log(data)
    setRecords(data);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>ABC | Shop Page</title>
        <meta
          name="description"
          content="Shop page of ABC react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}

                <ShopSidebar
                  products={records}
                  getSortParams={getSortParams}
                  sideSpaceClass="mr-30"
                  handleSearchProducts={handleSearchProducts}
                  handleFilterByPriceProducts={handleFilterByPriceProducts}
                  dynamicMaxVal={ localStorage.getItem("MaxPrice") 
                }

                  dynamicMinVal={ 0 }
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                 
                <ShopProducts
                  layout={layout}
                  products={
                    selectedCategoryCheckBox === "" ? records : filteredProducts
                  }
                />

                
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(ShopGridStandard);
