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
import { GetPromotedItems } from "../../helpers/Constant";

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
    if (localStorage.getItem("categoryId") == 0) {
      url1 =
        GetPromotedItems;
      setUrl(url1);
    } else {
      url1 = `https://4sleemnltgyu5hl4kotkycgmwi0uycqd.lambda-url.us-east-1.on.aws/Articles/GetArticlesByCategory?categoryIds=${localStorage.getItem(
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
        GetPromotedItems
      )
      .then((response) => {
        setAllProducts(response.data.Data);
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

                {/* shop page content default */}

                {/* <div className="row">
                <ProductGrid
                  category={"category"}
                  type="new"
                  limit={100}
                  spaceBottomClass="mb-10"
                  apiURL = "https://4sleemnltgyu5hl4kotkycgmwi0uycqd.lambda-url.us-east-1.on.aws/Articles/GetPromotedItems"
                />
              </div> */}
                <ShopProducts
                  layout={layout}
                  products={
                    selectedCategoryCheckBox === "" ? records : filteredProducts
                  }
                />

                {/* shop product pagination */}
                {/* <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div> */}
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
