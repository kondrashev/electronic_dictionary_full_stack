import React from 'react';
import MainMenu from './MainMenu';
import { StylesUser } from '../../styles/StylesUser';
import MenuNavigation from './MenuNavigation';
import Content from './Content';
import Alerts from '../authorization/Alerts';
import { ApplictationContext } from '../../App';

const User = (props) => {
    const { values } = React.useContext(ApplictationContext);
    return (
        <div
            style={StylesUser.userPage}
        >
            <MainMenu />
            <MenuNavigation />
            <Content />
            {values.alertMistakes && <Alerts />}
        </div>
    )
}
export default User;