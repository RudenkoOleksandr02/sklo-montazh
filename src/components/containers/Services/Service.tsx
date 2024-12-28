import React, {FC} from 'react';
import cl from './Services.module.css'
import {IService} from "../../../types";
import {useNavigate} from 'react-router-dom';
import {ReactComponent as BlockWithArrow} from '../../../assets/images/blockWithArrow.svg'

const Service: FC<IService> = ({title, description, path}) => {
    const navigate = useNavigate();

    return (
        <div className={cl.service} onClick={() => navigate(path)}>
            <div className={cl.titleAndAmount}>
                <h3>{title}</h3>
            </div>
            <p className={cl.description}>{description}</p>
            <div className={cl.blockWithArrow}>
                <BlockWithArrow/>
            </div>
        </div>
    );
};

export default Service;