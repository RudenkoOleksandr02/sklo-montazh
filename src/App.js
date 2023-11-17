import s from './App.module.css';
import {createTheme, colors, ThemeProvider} from "@mui/material";
import {connect, Provider} from "react-redux";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import store from "./store/store";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Showers from "./components/Catalog/Showers/Showers";
import Mirrors from "./components/Catalog/Mirrors/Mirrors";
import Product from "./components/Product/Product";
import Footer from "./components/Footer/Footer";
import Partitions from "./components/Catalog/Partitions/Partitions";
import Doors from "./components/Catalog/Doors/Doors";
import Shelves from "./components/Catalog/Shelves/Shelves";
import PhotoPrintings from "./components/Catalog/PhotoPrintings/PhotoPrintings";
import Railings from "./components/Catalog/Railings/Railings";
import Portfolio from "./components/Portfolio/Portfolio";
import Order from "./components/Order/Order";
import ScrollToTop from './ScrollToTop';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import NotFound from "./components/NotFound/NotFound";
import Furniture from "./components/Furniture/Furniture";

const theme = createTheme({
    palette: {
        primary: {
            main: colors.blue[500],
        },
        secondary: {
            main: colors.blue[800]
        }
    }
})

function App() {
    return (
        <HelmetProvider>
            <ThemeProvider theme={theme}>
                <div className={s.wrapper}>
                    <Helmet>
                        <title>Скло Монтаж</title>
                        <meta name="description"
                              content="Сайт з продажу, монтажу та встановлення душових кабін, огорож, дзеркал з LED-підсвічуванням та підігрівом, скляних перегородок, скляних дверей, полиць зі скла, скляних перил та фотодруку на склі."
                        />
                        <meta name="keywords"
                              content="скло, монтаж, душові кабіни, дзеркала, установка, ремонт, скляні конструкції"
                        />
                    </Helmet>
                    <Navbar/>
                    <Routes>
                        <Route path='/home' element={<Home/>}/>
                        <Route path='/showers' element={<Showers/>}/>
                        <Route path='/mirrors' element={<Mirrors/>}/>
                        <Route path='/partitions' element={<Partitions/>}/>
                        <Route path='/doors' element={<Doors/>}/>
                        <Route path='/shelves' element={<Shelves/>}/>
                        <Route path='/photo_printings' element={<PhotoPrintings/>}/>
                        <Route path='/railings' element={<Railings/>}/>
                        <Route path='/portfolio' element={<Portfolio/>}/>
                        <Route path='/delivery' element={<Order/>}/>
                        <Route path='/:category' element={<Furniture/>}/>
                        <Route path={'/:category/:productId'} element={<Product/>}/>
                        <Route path='/' element={<Navigate to='/home'/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </ThemeProvider>
        </HelmetProvider>
    )
}

const ContainerApp = connect(null)(App);
const SkloMontazhApp = () => {
    return <BrowserRouter>
        <ScrollToTop/>
        <Provider store={store}>
            <ContainerApp/>
        </Provider>
    </BrowserRouter>
}
export default SkloMontazhApp;
