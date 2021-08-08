import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/redusers';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import AuthorizationForm from './components/authorization/AuthorizationForm';
import RegistrationForm from './components/authorization/RegistrationForm';
import Alerts from './components/authorization/Alerts';
import Admin from './components/admin/Admin';
import User from './components/user/User';
import { StylesApp } from './styles/StylesApp';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export const ApplictationContext = React.createContext();
const App = () => {
    const [values, setValues] = React.useState({
        listUsers: [],
        userListId: [],
        searchUserMark: false,
        getSearchUser: [],
        alertMistakes: false,
        typeMistake: '',
        login: '',
        password: '',
        number: 3,
        showListCategories: true,
        numberPageCategories: 1,
        numberPageWords: 1,
        showListWords: false,
        showSearchWord: false,
        valueSearchWord: '',
        currentNameCategory: '',
        alertMistakes: false,
        typeMistake: '',
        loadCategories: '',
        loadWords: '',
        changeCountPages: '',
        showMainMenu: false,
        showFormCategory: false,
        showFormWord: false,
        showDeleteButtonCategory: false,
        listIdCategories: [],
        categoryName: '',
        showButtonMoveWords: false,
        showButtonDeleteWords: true,
        listIdWords: []
    });
    return (
        <Provider store={store}>
            <ApplictationContext.Provider
                value={{
                    values: values,
                    setValues: setValues
                }}
            >
                <div
                    style={StylesApp.app}
                >
                    <Switch>
                        <Route exact path='/authorization' component={AuthorizationForm} />
                        <Route path='/registration' component={RegistrationForm} />
                        <Route path='/alerts' component={Alerts} />
                        <Route path='/admin' component={Admin} />
                        <Route path='/user' component={User} />
                    </Switch>
                </div>
            </ApplictationContext.Provider>
        </Provider>
    );
}
export default App;
ReactDOM.render(<App />, document.querySelector("#app"));
