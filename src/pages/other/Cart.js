import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { GetShippingDetail } from "../../helpers/Constant";

const Cart = ({
  location,
  cartItems,
  currency,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart
}) => {
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;
  var countryData = [
    { value: 'Arica and Parinacota', name: 'Arica and Parinacota' },
    { value: 'Tarapacá', name: 'Tarapacá' },
    { value: 'Antofagasta', name: 'Antofagasta' },
    { value: 'Atacama', name: 'Atacama' },
    { value: 'Valparaíso', name: 'Valparaíso' },
    { value: 'Maule', name: 'Maule' },
    { value: 'Ñuble', name: 'Ñuble' }
  ];


  const getInitialState = () => {
    const value = "Orange";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);

        localStorage.setItem('ShippingPrice', e.target.value);


        // console.log("previousData" , previousData)

     // var e = document.getElementById("ddlViewBy");
    // var value = e.options[e.selectedIndex].value;
    // console.log("price is for change", value)
    // setshippingPrice = 100



  };


  var [shippingType, setShippingType] = useState([]);


  var [shippingPrice, setshippingPrice] = useState(0);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(GetShippingDetail);
      const jsonData = await response.json();
      console.error('jsonData setShippingType data:', jsonData.Data);


      setShippingType(jsonData.Data);

      setValue(jsonData.Data[0].Price);
      localStorage.setItem('ShippingPrice', jsonData.Data[0].Price);



    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  let cartTotalPrice = 0;

  return (
    <Fragment>
      <MetaTags>
        <title>ABC | Cart</title>
        <meta
          name="description"
          content="Cart page of ABC react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {

                            // console.log("cartItemscartItemscartItems", cartItems, key)
                            // deleteFromCart(cartItem, addToast)


                            const discountedPrice = getDiscountPrice(
                              cartItem.Price,
                              cartItem.discount
                            );
                            const finalProductPrice = (
                              cartItem.Price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                finalProductPrice * cartItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.ArticleID
                                    }
                                  >
                                    <img
                                      className="img-fluid"

                                      src={ cartItem.ImgLocations.length > 0 ?  process.env.PUBLIC_URL +
                                        cartItem.ImgLocations[0]:    process.env.PUBLIC_URL + "/assets/img/icon-img/no-img.jpeg"
                                  }
                                      // src={
                                       
                                      // }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.ArticleID
                                    }
                                  >
                                    {cartItem.Title}
                                  </Link>
                                  {cartItem.selectedProductColor &&
                                    cartItem.selectedProductSize ? (
                                    <div className="cart-item-variation">
                                      <span>
                                        Color: {cartItem.selectedProductColor}
                                      </span>
                                      <span>
                                        Size: {cartItem.selectedProductSize}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol +
                                          finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol +
                                          finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol +
                                        finalProductPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        decreaseQuantity(cartItem, addToast)
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        addToCart(
                                          cartItem,
                                          addToast,
                                          quantityCount
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                        cartItemStock(
                                          cartItem,
                                          cartItem.selectedProductColor,
                                          cartItem.selectedProductSize
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? currency.currencySymbol +
                                    (
                                      finalDiscountedPrice * cartItem.quantity
                                    ).toFixed(2)
                                    : currency.currencySymbol +
                                    (
                                      finalProductPrice * cartItem.quantity
                                    ).toFixed(2)}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      deleteFromCart(cartItem, addToast)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          {/* <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div> */}
                          <div className="tax-select">
                            <label>* Region </label>
                            <select name="country"  >
                              {countryData.map((e, key) => {
                                return <option key={key} value={e.value}>{e.name}</option>;
                              })}
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>*Type</label>

                            <select id="ddlViewBy" name="country" value={value} onChange={handleChange}  >
                              {shippingType.map((e, index) => {
                                setShippingType = e.Type

                                // { console.log("shipping rte", shippingType) }

                                return <option key={index} value={e.Price}>{e.Type}</option>;

                              })}
                            </select>


                          </div>
                          <div className="tax-select">

                            <label>*Price</label>

                            <input style={{ alignSelf: "center" }}
                              className="cart-plus-minus-box"
                              type="text"
                              value={"$ " + value}
                              readOnly
                            />
                          </div>
                          {/* <button className="cart-btn-2" type="submit" onClick={() => {

                          }



                          }

                          >

                            Get A Quote
                          </button> */}

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: addToast => {
      dispatch(deleteAllFromCart(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
