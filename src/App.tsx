import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useOutlet, useParams} from "react-router-dom";
import './assets/styles/global.css';
import './assets/styles/variables.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import Footer from "./components/containers/Footer/Footer";
import Header, {HeaderVariant} from "./components/containers/Header/Header";
import linksToPages from "./data/linksToPages.json";
import MobileMenuPopup from "./components/containers/MobileMenuPopup/MobileMenuPopup";
import {routes} from "./router";
import {CSSTransition, SwitchTransition} from "react-transition-group";

type Params = {
    id: string;
}

const App = () => {
    const location = useLocation();
    const {id} = useParams<Params>();
    const {nodeRef} = routes.find(route => route.path === location.pathname) ?? {};
    const currentOutlet = useOutlet()
    const [headerVariant, setHeaderVariant] = useState<HeaderVariant>(HeaderVariant.variant1);

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setHeaderVariant(HeaderVariant.variant1);
                break;
            case '/portfolio':
            case '/catalog':
            case `/catalog/${id}`:
            case `/catalog/showers/${id}`:
            case `/catalog/mirrors/${id}`:
            case `/catalog/doors/${id}`:
            case `/catalog/railing-partitions/${id}`:
            case `/catalog/other-glass-products/${id}`:
            case '/product':
            case '/blog':
            case `/blog/${id}`:
            case '/about':
                setHeaderVariant(HeaderVariant.variant2);
                break;
            case '/furniture':
                setHeaderVariant(HeaderVariant.variant3);
                break;
            default:
                setHeaderVariant(HeaderVariant.variant2);
        }
    }, [location.pathname]);

    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);

    const localNodeRef = useRef<HTMLDivElement>(null);

    return (
        <div className='app'>
            <Header variant={headerVariant} setIsOpenMobileMenu={() => setIsOpenMobileMenu(true)}/>
            <SwitchTransition>
                <CSSTransition
                    key={location.pathname}
                    nodeRef={nodeRef || localNodeRef}
                    timeout={500}
                    classNames="page"
                    unmountOnExit
                    onEntering={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
                >
                    <div ref={nodeRef || localNodeRef}>
                        {currentOutlet}
                    </div>
                </CSSTransition>
            </SwitchTransition>
            <Footer/>
            <MobileMenuPopup isOpen={isOpenMobileMenu} onClose={() => setIsOpenMobileMenu(false)} linksData={linksToPages}/>
        </div>
    );
};

export default App;
