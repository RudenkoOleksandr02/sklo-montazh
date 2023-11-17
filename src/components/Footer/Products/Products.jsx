import {Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import s from "../../common/Link/Link.module.css";

const Products = () => {
    return <Stack direction='column' spacing={0.5}>
        <Typography sx={{
            fontWeight: 'bold'
        }}>Товари</Typography>
        <Link to='/showers' className={s.item}>Душові кабіни та огорожі</Link>
        <Link to='/mirrors' className={s.item}>Дзеркала</Link>
        <Link to='/partitions' className={s.item}>Скляні перегородки</Link>
        <Link to='/doors' className={s.item}>Скляні двері</Link>
        <Link to='/shelves' className={s.item}>Полиці зі скла</Link>
        <Link to='/photo_printings' className={s.item}>Фотодрук на склі</Link>
        <Link to='/railings' className={s.item}>Перила</Link>
        <Link to='/furniture_barbells' className={s.item}>Фурнітура</Link>
    </Stack>
}

export default Products;
