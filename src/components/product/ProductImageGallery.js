import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";

const ProductImageGallery = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade"
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {product.discount || product.new ? (
          <div className="product-img-badges">
            {product.discount ? (
              <span className="pink">-{product.PreviousPrice}%</span>
            ) : (
              ""
            )}
            {product.new ? <span className="purple">New</span> : ""}
          </div>
        ) : (
          ""
        )}
        <LightgalleryProvider>
          {console.log("singlesinglesingle", product)}

          <Swiper {...gallerySwiperParams}>
            
 
            {product.ImgLocations &&
              product.ImgLocations.map((single, key) => {

                { console.log("singlesinglesingle", key) }

                { console.log("adsdadas", key) }

                return (
                  <div key={key}>
                    <LightgalleryItem
                      group="any"

                      src={ product.ImgLocations.length > 0 ? process.env.PUBLIC_URL + product.ImgLocations[key]:    process.env.PUBLIC_URL + "/assets/img/icon-img/no-img.jpeg"
                }

                      // src={process.env.PUBLIC_URL + product.ImgLocations[key]}
                    >
                      <button>
                        <i className="pe-7s-expand1"></i>
                      </button>
                    </LightgalleryItem>
                    <div className="single-image">
                      <img
                       onError={(e) =>
                        
                        (e.target.src =
                          "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png")
                      
                    }
                        src={process.env.PUBLIC_URL + product.ImgLocations[key]}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
          </Swiper>
        </LightgalleryProvider>
      </div>
      {/* <div className="product-small-image-wrapper mt-15">
        <Swiper {...thumbnailSwiperParams}>

           {product.ImgLocations &&
            product.ImgLocations.map((single, key) => {
              return (
                <div key={key}>
                  <div className="single-image">
                    <img
                       onError={(e) =>
                        
                          (e.target.src =
                            "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png")
                        
                      }
                      src={process.env.PUBLIC_URL + product.ImgLocations[key]}
                      className="img-fluid"
                      alt="" 
                     
                    />
                     


                  </div>
                </div>
              );
            })}
        </Swiper>
      </div> */}
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object
};

export default ProductImageGallery;
