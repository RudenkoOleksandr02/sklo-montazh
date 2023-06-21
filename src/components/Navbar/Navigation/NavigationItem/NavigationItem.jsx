import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";
import s from "../../Navbar.module.css";

const NavigationItem = ({path, name, setIsOpenDrawer}) => {
    const handleClick = () => {
        if (setIsOpenDrawer) {
            setIsOpenDrawer(false)
        }
    }
    return <Button variant='text'
                   color='inherit'
                   sx={{
                       padding: '0'
                   }}
                   onClick={handleClick}
    >
        <NavLink to={path}
                 className={e => e.isActive ? s.activeItem : s.item}
        >{name}</NavLink>
    </Button>
}

export default NavigationItem;