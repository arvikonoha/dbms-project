import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import CategoryCards from "./CategoryCards/CategoryCards";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  let setQuerySuccess = useStoreActions(action => action.query.setQuerySuccess);
  let isAuth = useStoreState(state => state.profile.isAuth);
  let setVendorLoading = useStoreActions(
    action => action.query.setVendorLoading
  );
  return (
    <>
      <section id="welcome">
        <div class="welcome-text">
          <h2>Welcome</h2>
          <p>
            This website aims to provide a platform to promote your day-to-day
            services.
          </p>
          <Link
            class="welcome-btn"
            to="/services"
            onClick={e => {
              setQuerySuccess(false);
              setVendorLoading(true);
            }}
          >
            Explore
            <img src="./explore.svg" alt="" srcset="" />
          </Link>
        </div>
        <div class="welcome-image"></div>
      </section>
      {!isAuth ? <CategoryCards /> : null}
    </>
  );
}

export default Home;
