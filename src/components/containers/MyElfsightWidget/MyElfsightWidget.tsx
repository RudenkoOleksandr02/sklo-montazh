import { ElfsightWidget } from 'react-elfsight-widget';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import cl from './MyElfsightWidget.module.css'

const MyElfsightWidget: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (!document.getElementById("elfsight-platform")) {
            const script = document.createElement("script");
            script.src = "https://elfsightcdn.com/platform.js";
            script.defer = true;
            script.id = "elfsight-platform";
            document.body.appendChild(script);
        }

        const style = document.createElement("style");
        style.id = "hide-elfsight-style";
        style.innerHTML =
            location.pathname !== "/" ? "#__EAAPS_PORTAL { display: none !important; }" : "";
        document.head.appendChild(style);

        return () => {
            const existing = document.getElementById("hide-elfsight-style");
            if (existing) document.head.removeChild(existing);
        };
    }, [location.pathname]);

    return <ElfsightWidget widgetId="0c794142-e8c2-46a7-9076-8d2820791419" lazy className={cl.localWidget} />;
};

export default MyElfsightWidget;
