import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import OpenMenu from './OpenMenu';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import { ApplictationContext } from '../../App';
import { connect } from 'react-redux';
import { searchWordFetchData } from '../../store/search_word/action';

const MainMenu = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { getSearchWord } = props;
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            position: 'relative'
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
            marginLeft: '20px'
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
            }
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
        tooltip: {
            float: 'right',
            marginRight: '320px',
            marginTop: '-55px'
        }
    }));
    const logout = () => {
        window.location.href = '/logout'
    }
    const searchWordGet = (event) => {
        if (event.keyCode == 13) {
            let nameSearchWord = event.target.value;
            event.target.value = '';
            let data = {
                url: `/search/word?wordName=${nameSearchWord}&userName=${sessionStorage.userName}`,
                values: values,
                setValues: setValues
            }
            getSearchWord(data);
        }
    }
    const classes = useStyles();
    return (
        <div
            className={classes.root}
        >
            <AppBar
                position="static"
            >
                <Toolbar>
                    <OpenMenu />
                    <Typography
                        className={classes.title}
                        variant="h6" noWrap
                    >
                        {sessionStorage.userName}
                    </Typography>
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
                            onKeyUp={searchWordGet}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Tooltip
                title='Logout'
                className={classes.tooltip}
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
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
    return {
        getSearchWord: (data) => dispatch(searchWordFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);