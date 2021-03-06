import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import { ApplictationContext } from '../../App';
import { connect } from 'react-redux';
import { loadUsersFetchData } from '../../store/load_users/action';
import { deleteUsersFetchData } from '../../store/update_users/action_delete';

function UsersTable(props) {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { getUsers, users, usersDelete, updateUsers } = props;
    React.useEffect(() => {
        let getLoad = 0;
        const data = {
            url: '/get/users?pattern=user',
            getLoad: getLoad,
            values: values,
            setValues: setValues
        }
        getUsers(data);
    }, [updateUsers]);
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    const headCells = [
        { id: 'login', numeric: false, disablePadding: true, label: 'User name' },
        { id: 'date', numeric: true, disablePadding: false, label: 'Date' }
    ];
    function EnhancedTableHead(props) {
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        return (
            <TableHead>
                <TableRow>
                    <TableCell
                        padding="checkbox"
                        style={{
                            paddingLeft: '50px'
                        }}
                    >
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            style={{
                                paddingRight: '400px'
                            }}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };
    const useToolbarStyles = makeStyles((theme) => ({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 100%',
        },
    }));
    const underline = React.useRef('none');
    const underLineUser = () => {
        underline.current.style.textDecoration = 'underline';
    }
    const hideLineUser = () => {
        underline.current.style.textDecoration = 'none';
    }
    const EnhancedTableToolbar = (props) => {
        const classes = useToolbarStyles();
        const { numSelected } = props;
        return (
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        ref={underline}
                        className={classes.title}
                        variant="h6"
                        id="tableTitle"
                        onClick={userList}
                        component="div"
                        onMouseOver={underLineUser}
                        onMouseOut={hideLineUser}
                        style={{
                            paddingLeft: '50px',
                            cursor: 'pointer'
                        }}
                    >
                        Users
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            onClick={deleteUsers}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : null}
            </Toolbar>
        );
    };
    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }));
    const userList = () => {
        setValues({
            ...values,
            searchUserMark: false
        });
    }
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.login);
            setSelected(newSelecteds);
            setValues({
                ...values,
                userListId: rows.map((row) => parseInt(row.id))
            });
            return;
        } else {
            setValues({
                ...values,
                userListId: []
            });
        }
        setSelected([]);
    };
    const getIdUser = (event) => {
        let listId = values.userListId;
        if (event.target.checked === true) {
            listId.push(parseInt(event.target.value));
            setValues({
                ...values,
                userListId: listId
            });
        } else {
            setValues({
                ...values,
                userListId: values.userListId.filter(item => item != parseInt(event.target.value))
            });
        }
    }
    const deleteUsers = () => {
        let data = {
            url: '/delete/users',
            userListId: values.userListId,
            setSelected: setSelected,
            values: values,
            setValues: setValues
        }
        usersDelete(data);
    }
    const rows = values.searchUserMark === false ? users : users.filter(user => user.login === values.getSearchUser);
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
        <div
            className={classes.root}
        >
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.login);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.login}
                                            selected={isItemSelected}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                style={{
                                                    paddingLeft: '50px'
                                                }}
                                            >
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    value={row.id}
                                                    onChange={getIdUser}
                                                    onClick={(event) => handleClick(event, row.login)}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.login}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                style={{
                                                    paddingRight: '348px'
                                                }}
                                            >
                                                {row.date}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div >
    );
}
const mapStateToProps = state => {
    return {
        users: state.loadUsersReducer,
        updateUsers: state.updateUsersReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getUsers: (data) => dispatch(loadUsersFetchData(data)),
        usersDelete: (data) => dispatch(deleteUsersFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);