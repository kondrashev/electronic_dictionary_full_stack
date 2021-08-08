import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplictationContext } from '../../App';
import { loadUsersFetchData } from '../../store/load_users/action';
import { StylesAuthorizationForm } from '../../styles/StylesAuthorization';

const AuthorizationForm = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { getUsers } = props;
    const link = React.useRef('');
    const send = React.useRef('');
    React.useEffect(() => {
        let getLoad = 1;
        let data = {
            url: '/load/users?pattern=user',
            getLoad: getLoad,
            values: values,
            setValues: setValues
        }
        getUsers(data);
    }, []);

    sessionStorage.setItem('userName', '');
    sessionStorage.setItem('searchUserMark', '');
    const loginChange = (event) => {
        sessionStorage.setItem('userName', event.target.value);
    }
    const login = () => {
        sessionStorage.setItem('login', 'log_in');
    }
    const linkUnderline = () => {
        link.current.style.textDecoration = 'underline';
    }
    const linkNone = () => {
        link.current.style.textDecoration = 'none';
    }
    const sendBorderShow = () => {
        send.current.style.border = '2px solid black';
    }
    const sendBorderHide = () => {
        send.current.style.border = 'none';
    }

    return (
        <form
            style={StylesAuthorizationForm.form}
            action='/j_spring_security_check'
            method='POST'
        >
            <h
                style={StylesAuthorizationForm.sign}
            >
                Sign in
            </h>
            <input
                style={StylesAuthorizationForm.inputs}
                autoFocus type='text'
                name='j_login'
                placeholder='Login'
                onChange={loginChange}
            >
            </input>
            <input
                style={StylesAuthorizationForm.inputs}
                type='password'
                name='j_password'
                placeholder='Password'
            >
            </input>
            <Link
                ref={link}
                style={StylesAuthorizationForm.link}
                to={'/registration'}
                onMouseOver={linkUnderline}
                onMouseOut={linkNone}
            >
                Registration
            </Link>
            <button
                ref={send}
                style={StylesAuthorizationForm.send}
                onClick={login}
                onMouseOver={sendBorderShow}
                onMouseOut={sendBorderHide}
            >
                Send
            </button>
        </form >
    )
}
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
    return {
        getUsers: (data) => dispatch(loadUsersFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationForm);