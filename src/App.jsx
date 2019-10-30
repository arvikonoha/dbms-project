import React from "react";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";
import Header from "./components/Header/Header";
import ProfileHandler from "./components/Profile/ProfileHandler/ProfileHandler";
import Cart from "./components/Modals/Cart/Cart";
import FormOuter from "./components/Modals/FormOuter";
import Orders from "./components/Modals/Orders/Orders";
import Home from "./components/Index/Home";
import ErrorBox from "./components/Modals/Error/ErrorBox";
import ServiceMain from "./components/Services/ServiceMain/ServiceMain";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("vendorToken")) {
      store.getActions().profile.getVendor();
      localStorage.removeItem("userToken");
    } else if (localStorage.getItem("userToken")) {
      store.getActions().user.getUser();
      localStorage.removeItem("vendorToken");
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="pso-rel">
          <StoreProvider store={store}>
            <FormOuter />
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/profileinfo/:vid" component={ProfileHandler} />
            <Route path="/services" component={ServiceMain} />
            <Orders />
            <Cart />
            <ErrorBox />
          </StoreProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
