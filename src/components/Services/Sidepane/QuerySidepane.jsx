import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import "./querysidepane.css";

function QuerySidepane({ isHidden, setHidden }) {
  let [title, setTitle] = useState("");
  let [category, setCategory] = useState("");
  let [location, setLocation] = useState("");
  let [ishigh, toggleHigh] = useState(false);
  let setAsyncVendors = useStoreActions(action => action.query.setAsyncVendors);
  let setVendorLoading = useStoreActions(
    action => action.query.setVendorLoading
  );
  let setQuerySuccess = useStoreActions(action => action.query.setQuerySuccess);
  function resolveSidpane() {
    return isHidden ? "hide" : "";
  }
  function resolvePriceFilter(set) {
    return set ? "price-filter set" : "price-filter";
  }
  return (
    <section id="sort-filter" className={resolveSidpane()}>
      <button
        className="close-srt-btn"
        onClick={e => {
          setHidden(true);
        }}
      >
        CLOSE
      </button>
      <form
        onSubmit={e => {
          e.preventDefault();
          setAsyncVendors({ ishigh, title, category, location });
          setHidden(true);
          setQuerySuccess(false);
          setVendorLoading(true);
        }}
      >
        <h2>Sort & filter</h2>
        <ul>
          <h3>Filter options</h3>
          <li>
            <label for="category">Category</label>
            <input
              type="text"
              id="category-srch"
              name="category"
              placeholder="Enter the category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
            <label for="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter the location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </li>
          <h3>Sort options</h3>
          <li>
            <button
              className={resolvePriceFilter(!ishigh)}
              onClick={e => {
                e.preventDefault();
                toggleHigh(false);
              }}
            >
              Price - Low to high
            </button>
            <button
              className={resolvePriceFilter(ishigh)}
              onClick={e => {
                e.preventDefault();
                toggleHigh(true);
              }}
            >
              Price - High to low
            </button>
          </li>
          <li>
            <input type="submit" value="Submit" />
          </li>
        </ul>
      </form>
    </section>
  );
}

export default QuerySidepane;
