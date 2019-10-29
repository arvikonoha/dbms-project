import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import "./profileservices.css";
import UpdateService from "./serviceupdate";
import ProfileModifier from "../../ProfileModifier/ProfileModifier";

function ProfileServices() {
  let services = useStoreState(state => state.profile.services);
  let cartItems = useStoreState(state => state.user.cartItems);
  let setCart = useStoreActions(action => action.user.setCart);
  let isAuth = useStoreState(state => state.user.isAuth);
  return (
    <div class="profile-services">
      <ul>
        {services.length > 0 ? (
          services.map(item => {
            return (
              <li class="fl-b jc-sb ali-c" key={item.title}>
                <ProfileModifier
                  formDetails={UpdateService}
                  currentService={item.service_text}
                  isService={true}
                  currentServiceId={item.service_id}
                />
                <div class="profile-service-box">
                  <div class="service-title">{item.service_text}</div>
                  <div class="service-price">
                    <span class="currency">&#8377;</span>
                    {item.price}
                  </div>
                </div>
                {isAuth &&
                !cartItems.some(ci => ci.service_id === item.service_id) ? (
                  <button
                    class="profile-btn pd-8y pd-16x cu-po"
                    onClick={e => {
                      setCart({
                        service_id: item.service_id,
                        service_text: item.service_text,
                        service_price: item.price
                      });
                    }}
                  >
                    Purchase <i class="fas fa-shopping-basket"></i>
                  </button>
                ) : null}
              </li>
            );
          })
        ) : (
          <li>No services available</li>
        )}
      </ul>
    </div>
  );
}

export default ProfileServices;
