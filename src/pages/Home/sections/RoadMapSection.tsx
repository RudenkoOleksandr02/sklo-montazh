import React, {FC} from 'react';
import cl from "../Home.module.css";
import Roadmap from "../../../components/ui/Roadmap/Roadmap";

const RoadMapSection: FC = () => {
    return (
        <section className={cl.roadMap}>
            <Roadmap/>
        </section>
    );
};

export default RoadMapSection;