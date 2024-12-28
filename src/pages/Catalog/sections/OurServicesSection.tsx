import React, {FC, useState} from 'react';
import Services from "../../../components/containers/Services/Services";
import {IService} from "../../../types";

const OurServicesSection: FC = () => {
    const [services, setServices] = useState<IService[]>([
        {title: 'Полиці зі скла', amount: 12, path: '/1', description: 'Консультації щодо вибору системи оподаткування.'},
        {title: 'Душові кабіни', amount: 12, path: '/2', description: 'Консультації щодо вибору системи оподаткування.'},
        {title: 'Скляні двері', amount: 12, path: '/3', description: 'Консультації щодо вибору системи оподаткування.'},
        {title: 'Скляні перила', amount: 12, path: '/4', description: 'Консультації щодо вибору системи оподаткування.'},
        {title: 'Скляні перегородки', amount: 12, path: '/5', description: 'Консультації щодо вибору системи оподаткування.'},
        {title: 'Дзеркала з led підсвіткою та підігрівом', amount: 12, path: '/6', description: 'Консультації щодо вибору системи оподаткування.'},
        {title: 'Фотодрук на склі', amount: 12, path: '/7', description: 'Консультації щодо вибору системи оподаткування.'},
    ]);

    return (
        <section>
            <Services title='Наші послуги' services={services}/>
        </section>
    );
};

export default OurServicesSection;