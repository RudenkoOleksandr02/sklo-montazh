import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import router from "./router";

const store = setupStore()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
