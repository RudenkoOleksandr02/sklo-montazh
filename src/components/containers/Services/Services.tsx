import React, {FC} from 'react';
import cl from './Services.module.css';
import {ReactComponent as Quadrants} from "../../../assets/images/quadrants.svg";
import {IService} from "../../../types";
import Service from "./Service";
import linksToServices from './../../../data/linksToServices.json';

interface IServicesProps {
    title?: string;
}

const Services: FC<IServicesProps> = ({title = 'Наші послуги'}) => {
    const services: IService[] = [
        {title: linksToServices[0].title, path: linksToServices[0].path, description: 'Скляні душові кабіни з індивідуальним дизайном.'},
        {title: linksToServices[1].title, path: linksToServices[1].path, description: 'Стильні дзеркала з підсвіткою та підігрівом.'},
        {title: linksToServices[2].title, path: linksToServices[2].path, description: 'Сучасні скляні двері для інтер’єру та екстер’єру.'},
        {title: linksToServices[3].title, path: linksToServices[3].path, description: 'Естетичні скляні перила та перегородки для зонування простору.'},
        {title: linksToServices[4].title, path: linksToServices[4].path, description: 'Оригінальні скляні елементи для інтер’єру, включаючи фотодрук та декоративні вироби.'}
    ];

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