import { ElfsightWidget } from 'react-elfsight-widget';
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import cl from './MyElfsightWidget.module.css';

const WIDGET_ID = "0c794142-e8c2-46a7-9076-8d2820791419";
const PLATFORM_SCRIPT_ID = "elfsight-platform";
const STYLE_ELEMENT_ID = "hide-elfsight-style";
const ATTRIBUTION_SELECTOR = 'a[href*="elfsight.com/telegram-chat-widget"]';

const MyElfsightWidget: React.FC = () => {
    const { pathname } = useLocation();
    const observerRef = useRef<MutationObserver | null>(null);

    useEffect(() => {
        if (!document.getElementById(PLATFORM_SCRIPT_ID)) {
            const script = document.createElement("script");
            script.src = "https://elfsightcdn.com/platform.js";
            script.defer = true;
            script.id = PLATFORM_SCRIPT_ID;
            document.body.appendChild(script);
        }

        const styleElement = document.createElement("style");
        styleElement.id = STYLE_ELEMENT_ID;
        styleElement.innerHTML = pathname !== "/"
            ? `#__EAAPS_PORTAL { display: none !important; }`
            : "";
        document.head.appendChild(styleElement);

        hideAttributionLink();

        observerRef.current = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    hideAttributionLink();
                }
            });
        });

        observerRef.current.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            const existingStyle = document.getElementById(STYLE_ELEMENT_ID);
            existingStyle?.remove();

            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [pathname]);

    const hideAttributionLink = () => {
        const attributionLink = document.querySelector(ATTRIBUTION_SELECTOR) as HTMLElement;
        if (attributionLink) {
            attributionLink.style.setProperty('display', 'none', 'important');
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        }
    };

    return (
        <ElfsightWidget
            widgetId={WIDGET_ID}
            lazy
            className={cl.localWidget}
        />
    );
};

export default MyElfsightWidget;
