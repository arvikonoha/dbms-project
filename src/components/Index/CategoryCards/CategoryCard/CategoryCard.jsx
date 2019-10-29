import React from "react";
import { useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  let setAsyncVendors = useStoreActions(action => action.query.setAsyncVendors);
  let setVendorLoading = useStoreActions(
    action => action.query.setVendorLoading
  );
  return (
    <div className="category-card">
      <img src="./category_img.svg" className="category-img" alt="" srcset="" />
      <h3>{category}</h3>
      <p>
        Explore the services under this category by pressing the below button
      </p>
      <Link
        className="category-btn"
        to="/services"
        onClick={e => {
          setVendorLoading(true);
          setAsyncVendors({
            ishigh: true,
            title: "",
            category: category,
            location: ""
          });
        }}
      >
        Explore <img src="./explore.svg" alt="" srcset="" />
      </Link>
    </div>
  );
}

export default CategoryCard;
