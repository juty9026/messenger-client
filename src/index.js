import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import AppContext from "./context/AppContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </StrictMode>,
  rootElement
);
