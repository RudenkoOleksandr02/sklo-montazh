import React, {FC} from 'react';
import cl from './Services.module.css';
import {ReactComponent as Quadrants} from "../../../assets/images/quadrants.svg";
import {IService} from "../../../types";
import Service from "./Service";

const Services: FC = () => {
    const services: IService[] = [
        {title: 'Душові кабіни', path: '/catalog/showers', description: 'Скляні душові кабіни з індивідуальним дизайном.'},
        {title: 'Дзеркала', path: '/catalog/mirrors', description: 'Стильні дзеркала з підсвіткою та підігрівом.'},
        {title: 'Скляні двері', path: '/catalog/doors', description: 'Сучасні скляні двері для інтер’єру та екстер’єру.'},
        {title: 'Скляні перила та перегородки', path: '/catalog/railing-partitions', description: 'Естетичні скляні перила та перегородки для зонування простору.'},
        {title: 'Інші вироби зі скла', path: '/catalog/other-glass-products', description: 'Оригінальні скляні елементи для інтер’єру, включаючи фотодрук та декоративні вироби.'}
    ];

    const title = 'Наші послуги';

    return (
        <div className={cl.wrapper}>
            {title && <div className={cl.titleWithSVG}>
                <h2>{title}</h2>
                <Quadrants/>
            </div>}
            <div className={cl.grid}>
                {services.map(service => (
                    <Service
                        title={service.title}
                        description={service.description}
                        path={service.path}
                        key={service.path}
                    />
                ))}
            </div>
        </div>
    );
};

export default Services;