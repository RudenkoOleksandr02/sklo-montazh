import React, {useEffect, useMemo, useRef, useState} from 'react';
import {matchPath, useLocation, useOutlet, useParams} from "react-router-dom";
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
    const { id } = useParams<Params>();
    const { nodeRef } = routes.find(route => matchPath({ path: route.path, end: true }, location.pathname)) ?? {};
    const currentOutlet = useOutlet();
    const [headerVariant, setHeaderVariant] = useState<HeaderVariant>(HeaderVariant.variant1);

    // Определяем ключ для анимации
    const routeKey = useMemo(() => {
        // Если это маршрут /furniture/:id, используем только путь без id
        if (matchPath({ path: "/furniture/:id", end: true }, location.pathname)) {
            return "/furniture";
        }

        // Для всех остальных маршрутов используем полный путь
        return location.pathname;
    }, [location.pathname]);

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setHeaderVariant(HeaderVariant.variant1);
                break;
            case '/portfolio':
            case '/services':
            case '/blog':
            case `/blog/${id}`:
                setHeaderVariant(HeaderVariant.variant2);
                break;
            case `/furniture/${id}`:
            case `/services/${id}`:
            case `/services/showers/${id}`:
            case `/services/mirrors/${id}`:
            case `/services/doors/${id}`:
            case `/services/railing-partitions/${id}`:
            case `/services/other-glass-products/${id}`:
            case '/product':
                setHeaderVariant(HeaderVariant.variant3);
                break;
            default:
                setHeaderVariant(HeaderVariant.variant2);
        }
    }, [location.pathname, id]);

    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
    const localNodeRef = useRef<HTMLDivElement>(null);

    return (
        <div className='app'>
            <Header variant={headerVariant} setIsOpenMobileMenu={() => setIsOpenMobileMenu(true)}/>
            <SwitchTransition>
                <CSSTransition
                    key={routeKey}
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
