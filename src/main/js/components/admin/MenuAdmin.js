import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import { ApplictationContext } from '../../App';
import Button from '@material-ui/core/Button';

const MenuAdmin = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            width: '100%',
            position: 'absolute',
            top: '0px'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            marginLeft: '100px'
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: (theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: (theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto'
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        appBar: {
            background: '#5A8C51'
        },
        toolTip: {
            float: 'right',
            marginRight: '320px',
            marginTop: '-55px'
        }
    }));
    const logout = () => {
        window.location.href = '/logout';
    }
    const searchUserGet = (event) => {
        if (event.keyCode == 13) {
            setValues({
                ...values,
                getSearchUser: event.target.value,
                searchUserMark: true
            });
            event.target.value = '';
        }
    }
    const classes = useStyles();
    return (
        <div
            className={classes.root}
        >
            <AppBar
                position="static"
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography
                        className={classes.title}
                        variant="h6" noWrap
                    >
                        {sessionStorage.userName}
                    </Typography>
                    <Button variant="contained" color="secondary">
                        Secondary
                    </Button>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyUp={searchUserGet}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Tooltip
                title='Logout'
                className={classes.toolTip}
            >
                <IconButton
                    onClick={logout}
                >
                    <HomeIcon />
                </IconButton>
            </Tooltip>
        </div >
    );
}
export default MenuAdmin;