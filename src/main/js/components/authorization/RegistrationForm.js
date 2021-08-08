import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { ApplictationContext } from '../../App';
import { connect } from 'react-redux';
import { addUserFetchData } from '../../store/update_users/action_add';
import { StylesAuthorizationForm } from '../../styles/StylesAuthorization';
import Alerts from '../authorization/Alerts';

const RegistrationForm = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { userAdd } = props;
    const hover = React.useRef('');
    const loginChange = (event) => {
        setValues({
            ...values,
            login: event.target.value
        });
    }
    const passwordChange = (event) => {
        setValues({
            ...values,
            password: event.target.value
        });
    }
    const addUser = () => {
        const checkDate = () => {
            if (new Date().getDate() < 10) {
                return `${'0'}${new Date().getDate()}`;
            } else {
                return new Date().getDate();
            }
        }
        const checkMonth = () => {
            if (new Date().getMonth() + 1 < 10) {
                return `${'0'}${new Date().getMonth() + 1}`;
            } else {
                return new Date().getMonth() + 1;
            }
        }
        let user = {
            login: values.login,
            password: values.password,
            date: `${checkDate()}.${checkMonth()}.${new Date().getFullYear()}p.`
        }
        let data = {
            url: '/add/user',
            user: user,
            values: values,
            setValues: setValues
        }
        userAdd(data);
    }
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            addUser();
            loginPassword.current.value = '';
        }
    }
    const hoverOn = () => {
        hover.current.style.borderRadius = '50%';
        hover.current.style.backgroundColor = 'rgb(153, 153, 153)';
    }
    const hoverOff = () => {
        hover.current.style.borderRadius = ' inherit';
        hover.current.style.backgroundColor = ' inherit';
    }
    return (
        <div
            style={StylesAuthorizationForm.registration}
        >
            <button
                ref={hover}
                onMouseOver={hoverOn}
                onMouseOut={hoverOff}
                style={StylesAuthorizationForm.close}
            >
                <Link
                    to={'/authorization'}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <svg
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                    >
                        <path d="M6 4.36L10.02.34a1.16 1.16 0 0 1 1.64 1.64L7.64 6l4.02 4.02a1.16 1.16 0 0 1-1.64 1.64L6 7.64l-4.02 4.02a1.16 1.16 0 0 1-1.64-1.64L4.36 6 .34 1.98A1.16 1.16 0 1 1 1.98.34L6 4.36z" fill="black"></path>
                    </svg>
                </Link>
            </button>
            <TextField
                id="outlined-search"
                label="User name"
                type="search"
                value={values.login}
                variant="outlined"
                onChange={loginChange}
                style={{
                    width: '400px'
                }}
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                value={values.password}
                autoComplete="current-password"
                variant="outlined"
                onChange={passwordChange}
                onKeyPress={onKeyPress}
                style={{
                    width: '400px'
                }}
            />
            <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={addUser}
                style={{
                    width: '400px',
                    height: '50px',
                    marginBottom: '30px'
                }}
            >
                Registration
            </Button>
            {values.alertMistakes && <Alerts />}
        </div>
    )
}
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
    return {
        userAdd: (data) => dispatch(addUserFetchData(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);