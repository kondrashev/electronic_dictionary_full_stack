import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ApplictationContext } from '../../App';
import { StylesUser } from '../../styles/StylesUser';

const OpenMenu = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const showMenu = (event) => {
        setValues({
            ...values,
            showMainMenu: event.currentTarget
        });
    };
    const formCategoryShow = () => {
        setValues({
            ...values,
            showMainMenu: false,
            showFormCategory: true
        });
    }
    const formWordShow = () => {
        setValues({
            ...values,
            showMainMenu: false,
            showFormWord: true
        });
    }
    return (
        <div
            style={StylesUser.openMenu}
        >
            <Button
                variant="contained"
                color="primary"
                onClick={showMenu}
            >
                Open Menu
            </Button>
            <Menu
                id="simple-menu"
                showMainMenu={values.showMainMenu}
                keepMounted
                open={Boolean(values.showMainMenu)}
                onClose={() => { setValues({ showMainMenu: false }) }}
            >
                <MenuItem
                    onClick={formCategoryShow}
                >
                    Add category
                </MenuItem>
                <MenuItem
                    onClick={formWordShow}
                >
                    Add word
                </MenuItem>
            </Menu>
        </div >
    )
}
export default OpenMenu;