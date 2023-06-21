import {Button, Menu, Stack} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuNavigationItem from "./NavigationItem/MenuNavigationItem";
import NavigationItem from "./NavigationItem/NavigationItem";


const Navigation = ({open, handleClick, handleClose, anchorEl, direction, setIsOpenDrawer}) => {
    return <>
        <Stack direction={direction} spacing={2}>
            <NavigationItem path='/home' name='Головна' setIsOpenDrawer={setIsOpenDrawer}/>
            <Button
                sx={{
                    color: 'black'
                }}
                color='inherit'
                variant='text'
                id='categories-button'
                onClick={handleClick}
                aria-controls={open ? 'categories-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                endIcon={!open ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
            >Каталог продукції</Button>
            <NavigationItem path='/portfolio' name='Портфоліо' setIsOpenDrawer={setIsOpenDrawer}/>
            <NavigationItem path='/delivery' name='Оплата і доставка' setIsOpenDrawer={setIsOpenDrawer}/>
        </Stack>
        <Menu
            id='categories-menu'
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
                'aria-labelledby': 'category-button'
            }}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <MenuNavigationItem name='Душові кабіни та огорожі' path='/shower' handleClose={handleClose}/>
            <MenuNavigationItem name='Дзеркала' path='/mirror' handleClose={handleClose}/>
            <MenuNavigationItem name='Скляні перегородки' path='/partition' handleClose={handleClose}/>
            <MenuNavigationItem name='Скляні двері' path='/door' handleClose={handleClose}/>
            <MenuNavigationItem name='Полиці зі скла' path='/shelf' handleClose={handleClose}/>
            <MenuNavigationItem name='Фотодрук на склі' path='/photoPrinting' handleClose={handleClose}/>
            <MenuNavigationItem name='Перила' path='/railing' handleClose={handleClose}/>
        </Menu>
    </>

}

export default Navigation;