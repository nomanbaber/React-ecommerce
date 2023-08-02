import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { CardPayment } from '@mercadopago/sdk-react';
import { CardNumber } from '@mercadopago/sdk-react';
import { Payment } from '@mercadopago/sdk-react';
import { CreatePayment } from "../../helpers/Constant";

const Checkout = ({ location, cartItems, currency }) => {
  initMercadoPago('TEST-89a2fc45-9934-45f4-9059-6f7ab6c4acb3');

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    setError(null);

    if (isValidEmail(email)) {
      console.log('The email is valid');
    } else {
      setError('Email is invalid');
    }
  };


  const [records, setRecords] = useState([]);


  const { pathname } = location;
  let cartTotalPrice = 0;
  const ShippingPriceData = JSON.parse(localStorage.getItem("ShippingPrice"));
  const initialization = {
    amount: 100,
  };
  useEffect(() => {

    //  fetchData();

  }, []);

  const fetchData = async () => {
    try {

      // Map the array to create a new array with selected keys and values
      const selectedData = cartItems.map((item) => {
        return {

          "Title": item.Title,
          "Quantity": item.quantity,
          "UnitPrice": item.Price,
          "ArticleID": item.Price

        };
      });
      const formData = {
        "totalAmount": 55000,
        "clientEmail": "gvena@gmail.com",
        "productDetails": [
          {
            "Title": "The Apocalypse",
            "Quantity": 1,
            "UnitPrice": 55000,
            "ArticleID": 9
          }
        ],
        "ShippingID": 2
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      };
      const response = await fetch(CreatePayment, requestOptions);
      const data = await response.json();
      console.log("response data in payment", data.Data.PaymentID)

      setRecords(data.Data)

      console.log("response data in cartitems", CreatePayment)
      // If you don't want to create new array, you can use forEach


      // navigate("/form-response", { state: {data: data, status: true} })
    }
    catch (error) {

      console.log("error in payment", error)
      //navigate("/form-response", { state: {status: false} })
    }
  };


  return (



    // <Wallet initialization={{ preferenceId: '1416432114-2418ac59-8f92-4bcc-9bc8-7e00c8efd6da' }} />



    // <CardPayment
    //   initialization={{ amount: 122 }}
    //   onSubmit={async (param) => {
    //     console.log("param" , param);
    //   }}
    // />
    <Fragment>
      <MetaTags>
        <title>ABC | Checkout</title>
        <meta
          name="description"
          content="Checkout page of ABC react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          {/* <input type="text" /> */}

                          <input
                            className='p-3 flex w-full rounded-md text-black'
                            type='email'
                            name='Email'

                            required />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = cartItem.Price
                              const finalProductPrice = cartItem.Price
                              const finalDiscountedPrice = cartItem.Price

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.Title} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice *
                                        cartItem.quantity
                                      ).toFixed(2)
                                      : currency.currencySymbol +
                                      (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>{"$" + ShippingPriceData}</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol + (cartTotalPrice + ShippingPriceData)
                              }
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    {/* <div className="place-order mt-25" onClick={() => 
                    // console.log("place order")
                    <CardPayment
                      initialization={{ amount: 100 }}
                      onSubmit={async (param) => {
                        console.log(param);
                      }}
                    />
                    }>
                      

                  
                    </div> */}

                    <div className="place-order mt-25">
                      <button className="btn-hover" onClick={() => {

                        console.log("asdsadsadsa")
                      }}>Place Order</button>
                    </div>
                  </div>


                  <Wallet initialization={{ preferenceId: records.PaymentID }} />

                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
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

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

export default connect(mapStateToProps)(Checkout);
