import React, {FC} from 'react';
import cl from "../Home.module.css";
import Roadmap from "../../../components/ui/Roadmap/Roadmap";

const RoadMap: FC = () => {
    return (
        <section className={cl.roadMap}>
            <Roadmap/>
        </section>
    );
};

export default RoadMap;