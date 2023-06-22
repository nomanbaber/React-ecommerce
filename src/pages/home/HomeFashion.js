import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import Categories from "../../components/category/categories/Categories"
import LoadingSpinner from "../../components/Loader/LoadingSpinner";
 
const HomeFashion = () => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Fragment>
      <MetaTags>
        <title>ABC | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of ABC react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* <LoadingSpinner />  */}

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        <Categories />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />

        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
