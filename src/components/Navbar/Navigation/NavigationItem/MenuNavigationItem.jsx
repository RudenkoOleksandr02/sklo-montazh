import {NavLink} from "react-router-dom";
import s from "../../Navbar.module.css";
import {MenuItem} from "@mui/material";

const MenuNavigationItem = ({name, path, handleClose}) => {
    return <MenuItem onClick={handleClose} sx={{
        padding: '0'
    }}>
        <NavLink to={path} className={e => e.isActive ? s.menuActiveItem : s.menuItem}>
            {name}
        </NavLink>
    </MenuItem>
}

export default MenuNavigationItem;