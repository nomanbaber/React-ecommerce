import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { getAllArticleByID, getAllArticles } from "../../helpers/Constant";

// const Product = ({ location,Product }) => {
  const Product = ({ location }) => {
  const { pathname } = location;
  const params = useParams();
  // const [prouctDetails, setProductDetails] = useState([])
  const [product, setProduct] = useState({});
  const getProductDetails = () => {
    axios
      .get(

        getAllArticleByID +   params.id

       )
      .then((response) => {
        setProduct(response.data.Data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>ABC | Product Page</title>
        <meta
          name="description"
          content="Product page of ABC react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        {/* {Object.keys(product).length !== 0 &&  */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
          // galleryType="leftThumb"
        />
      {/* } */}

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
            productFullDesc={product.Description}
          // productFullDesc={'full description'}
        />

        
        <RelatedProductSlider
          spaceBottomClass="pb-95"
           category={product.CategoryName}
           params={params}

          //  {...console.log("product.CategoryName is" ,product.RelatedArticles[0].Title )}
          // category={'Category'}
        />
      </LayoutOne>
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      (single) => single.id === itemId
    )[0],
  };
};

export default connect(mapStateToProps)(Product);
