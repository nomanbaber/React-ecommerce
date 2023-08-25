import icon_1 from "../../../assets/img/cat-1.webp";
import icon_2 from "../../../assets/img/cat-2.webp";
import icon_3 from "../../../assets/img/cat-3.webp";
import icon_4 from "../../../assets/img/cat-4.webp";
import icon_5 from "../../../assets/img/cat-5.webp";
import icon_6 from "../../../assets/img/cat-6.webp";
import icon_7 from "../../../assets/img/cat-7.webp";
import icon_8 from "../../../assets/img/cat-8.webp";
import icon_9 from "../../../assets/img/cat-9.webp";
import { getCategories } from "../../../helpers/Constant";
import "./Categories.css";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
       getCategories
      );
      const jsonData = await response.json();
      localStorage.setItem("category", JSON.stringify(jsonData.Data));
      setRecords(jsonData.Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = {
    margin: 20,
    responsiveClass: true,
    nav: false,
    autoHeight: true,
    rewind: false,
    dots: false,
    lazyLoad: "true",
    lazyContent: "true",
    loop: false,
    touchDrag: true,
    mouseDrag: true,
    autoplay: false,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
        autoWidth: true,
      },
      400: {
        items: 1,
        autoWidth: true,
      },
      600: {
        items: 3,
        autoWidth: true,
      },
      700: {
        items: 2,
        autoWidth: true,
      },
      1000: {
        items: 4,
        autoWidth: true,
      },
      1200: {
        items: 9,
        autoHeight: true,
      },
    },
  };
  const data = [
    {
      icon: icon_1,
      title: "Shoes",
    },
    {
      icon: icon_2,
      title: "Caps",
    },
    {
      icon: icon_3,
      title: "Shirts",
    },
    {
      icon: icon_4,
      title: "Bags",
    },
    {
      icon: icon_5,
      title: "Paints",
    },
    {
      icon: icon_6,
      title: "Long Shirts",
    },
    {
      icon: icon_7,
      title: "shirts",
    },
    {
      icon: icon_8,
      title: "Shoes",
    },
  ];
  const handleCategoryToProduct = (categoryId) => {
    localStorage.setItem("categoryId", categoryId);
    window.location.href = "/shop";
  };
  return (
    <>
      <section className="categories-wrapper">
        <div className="container">
          <div className="categories-mains">
            <div className="categories-heading">
              <h2>Categories</h2>
            </div>
          </div>

          <div className="row">
            {records.map((item, index) => (
              <div
                className="col-md-3 mt-3"
                key={index}
                onClick={() => handleCategoryToProduct(item.CategoryID)}
              >
                {/* <a href={`/shop`} > */}
                <div className="item">
                  <div className="save-time">
                    <div className="save-icon">
                      <img 
                      src={item.ImgLocation} alt="" />
                    </div>
                    <p className="text-center save-text pt-3">{item.Name}</p>
                  </div>
                </div>
                {/* </a> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
