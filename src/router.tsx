import Home from "./pages/Home/Home";
import React, {createRef} from "react";
import Portfolio from "./pages/Portfolio/Portfolio";
import {createBrowserRouter} from 'react-router-dom';
import App from "./App";
import Blogs from "./pages/Blogs/Blogs";
import Blog from "./pages/Blog/Blog";
import About from "./pages/About/About";
import Furniture from "./pages/Furniture/Furniture";
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product/Product";
import Category from "./pages/Category/Category";

interface IRoutes {
    path: string;
    name: string;
    element: React.ReactNode;
    nodeRef: React.RefObject<HTMLDivElement>;
}

export const routes: IRoutes[] = [
    {path: '/', name: 'Home', element: <Home/>, nodeRef: createRef()},
    {path: '/portfolio', name: 'Portfolio', element: <Portfolio/>, nodeRef: createRef()},
    {path: '/catalog', name: 'Catalog', element: <Catalog/>, nodeRef: createRef()},
    {path: '/catalog/:id', name: 'Category', element: <Category/>, nodeRef: createRef()},
    {path: '/catalog/:id/:id', name: 'Product', element: <Product/>, nodeRef: createRef()},
    {path: '/blog', name: 'Blog', element: <Blogs/>, nodeRef: createRef()},
    {path: '/blog/:id', name: 'Blog', element: <Blog/>, nodeRef: createRef()},
    {path: '/about', name: 'About', element: <About/>, nodeRef: createRef()},
    {path: '/furniture', name: 'Furniture', element: <Furniture/>, nodeRef: createRef()},
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: routes.map((route) => ({
            index: route.path === '/',
            path: route.path === '/' ? undefined : route.path,
            element: route.element
        }))
    }
])

export default router;
