import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard/CategoryCard";
import LoadingCover from "../../Modals/Loading/LoadingCover";
import "./categorycards.css";

function CategeoryCards() {
  let isLoading = useStoreState(state => state.query.isLoading);
  let querySuccess = useStoreState(state => state.query.querySuccess);
  let categories = useStoreState(state => state.query.categories);
  let setAsyncCategories = useStoreActions(
    state => state.query.setAsyncCategories
  );
  let setQuerySuccess = useStoreActions(state => state.query.setQuerySuccess);
  let setVendorLoading = useStoreActions(state => state.query.setVendorLoading);
  useEffect(() => {
    if (isLoading) setAsyncCategories();
  }, [isLoading, setAsyncCategories]);
  if (isLoading)
    return (
      <section id="category">
        <LoadingCover />
      </section>
    );
  else if (querySuccess)
    return (
      <section id="category">
        <header id="category-header">
          <h2>Categories of service</h2>
          <p>
            Check out the different categories of services registered by vendors
          </p>
        </header>
        <div className="categories-cards">
          {categories.map(item => (
            <CategoryCard category={item.category} key={item.row_number} />
          ))}
          <div class="category-card">
            <Link
              class="category-btn"
              onClick={e => {
                setQuerySuccess(false);
                setVendorLoading(true);
              }}
              to="/services"
            >
              Explore all categories
              <img src="./explore.svg" alt="" srcset="" />
            </Link>
          </div>
        </div>
      </section>
    );
  else
    return (
      <section id="category">
        <p className="error-line">
          Sorry for inconvenience. There are no vendors registered.
        </p>
      </section>
    );
}

export default CategeoryCards;
