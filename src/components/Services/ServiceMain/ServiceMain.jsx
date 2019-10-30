import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import LoadingCover from "../../Modals/Loading/LoadingCover";
import QuerySidepane from "../Sidepane/QuerySidepane";
import { Link } from "react-router-dom";
import "./servicemain.css";

function ServiceMain() {
  let isVendorLoading = useStoreState(state => state.query.isVendorLoading);
  let querySuccess = useStoreState(state => state.query.querySuccess);
  let vendors = useStoreState(state => state.query.vendors);
  let setAsyncVendors = useStoreActions(action => action.query.setAsyncVendors);
  let setVendorQuerySuccess = useStoreActions(
    action => action.query.setQuerySuccess
  );
  let setVendorLoading = useStoreActions(
    action => action.query.setVendorLoading
  );
  let [isHidden, setHidden] = useState(true);
  function resolveClass() {
    return isHidden ? "options-btn" : "options-btn hide";
  }

  useEffect(() => {
    setTimeout(() => {
      if (!querySuccess) {
        setAsyncVendors({
          ishigh: false,
          title: "",
          category: "",
          location: ""
        });
        setVendorQuerySuccess(false);
        setVendorLoading(true);
      }
    }, 2000);
  }, []);

  if (isVendorLoading)
    return (
      <section id="services">
        <LoadingCover />
      </section>
    );
  else if (querySuccess)
    return (
      <>
        <QuerySidepane isHidden={isHidden} setHidden={setHidden} />
        <button
          class={resolveClass()}
          onClick={e => {
            setHidden(false);
          }}
        >
          Sort & filter Options
        </button>
        <section id="services">
          <div class="service-cards ">
            <p>Prices mentioned are average service prices of each vendor</p>

            {vendors.map(item => (
              <div class="service-card">
                <div class="service-card-box">
                  <h2>{item.title}</h2>
                  <p class="category">{item.category}</p>
                  <p class="location">{item.location}</p>
                  <div class="price-section">
                    <span class="currency">&#8377;</span>
                    {Number(item.avg).toFixed(2)}
                  </div>
                </div>
                <Link class="visit-profile-btn" to={`/profileinfo/${item.vid}`}>
                  Visit profile
                </Link>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  else
    return (
      <>
        <QuerySidepane isHidden={isHidden} setHidden={setHidden} />
        <button
          class={resolveClass()}
          onClick={e => {
            setHidden(false);
          }}
        >
          Sort & filter Options
        </button>
        <section id="services">
          <div class="service-cards ">
            <p className="error-line">
              There are no such vendors. Please try a different search.
            </p>
          </div>
        </section>
      </>
    );
}

export default ServiceMain;
