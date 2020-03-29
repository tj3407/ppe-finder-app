import React from "react";
import ReactDOM from "react-dom";
import AppLayout from "./app/AppLayout";
import * as serviceWorker from "./manager/service-worker";

ReactDOM.render(<AppLayout />, document.getElementById("root"));

serviceWorker.register();
