import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import useAuthentication from "./assets/useAuthentication";
import useServices from "./assets/useServices";
import { Provider } from "react-redux";
import store from "./store";

const ConnectedApp = () => {
  const { AuthProvider } = useAuthentication();
  const { ServicesProvider } = useServices();
  return (
    <AuthProvider>
      <ServicesProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ServicesProvider>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ConnectedApp />);
