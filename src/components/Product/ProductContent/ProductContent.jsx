import {Box, Breadcrumbs, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Application from "./Application/Application";
import ReactMarkdown from 'react-markdown';
import s from '../../common/Link/Link.module.css';

const ProductContent = ({category, name, price, article, pre_description}) => {

    return <Box>
        <Box>
            <Breadcrumbs aria-label='breadcrumbs' sx={{
                fontSize: '14px'
            }}>
                <Link to='/home' className={s.item}>Головна</Link>
                <Link to={`/${category}`} className={s.item}>
                    {category === 'showers' && 'Душові кабіни та огорожі'}
                    {category === 'mirrors' && 'Дзеркала'}
                    {category === 'doors' && 'Двері'}
                    {category === 'shelves' && 'Полиці'}
                    {category === 'photo_printings' && 'Фотодрук'}
                    {category === 'partitions' && 'Перегородки'}
                    {category === 'railings' && 'Перила'}
                </Link>
                <Typography color='text.primary' sx={{
                    fontSize: '14px'
                }}>{name}</Typography>
            </Breadcrumbs>
        </Box>
        <Box sx={{
            margin: '16px 0 8px'
        }}>
            <Typography variant='h5' component='h2'>{name}</Typography>
        </Box>
        <Box>
            {article && <Typography>Артикул:
                <Typography color='secondary' component='span'> {article}</Typography>
            </Typography>}
        </Box>
        <Box sx={{
            margin: '16px 0'
        }}>
            {price
                ? <Typography>Ціна товару:
                    <Typography component='span'> {price}</Typography> грн
                </Typography>
                : <Typography>Ціна залежить від ваших уподобань. Залиште заявку і ми з вами зв'яжемося</Typography>
            }
        </Box>
        <Box sx={{
            margin: '16px 0'
        }}>
            <Application title={name}/>
        </Box>
        <Box>
            {pre_description && <ReactMarkdown>{pre_description}</ReactMarkdown>}
        </Box>
    </Box>
}

export default ProductContent;
