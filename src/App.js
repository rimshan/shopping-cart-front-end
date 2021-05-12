import React from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { requestInterceptor } from "./services/requestInterceptor";
import { responseInterceptor } from "./services/responseInterceptor";
import store from "./redux/store/index";
import Routes from "./routes/Routes";

requestInterceptor();
responseInterceptor();
const App = () => (
  <Provider store={store}>
    <Routes />
    <ReduxToastr
      timeOut={5000}
      newestOnTop={true}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>
);

export default App;
