import React from 'react';
import MenuAdmin from './MenuAdmin';
import TableUsers from './TableUsers';
import Alerts from '../authorization/Alerts';
import { ApplictationContext } from '../../App';

const Admin = (props) => {
    const { values } = React.useContext(ApplictationContext);
    return (
        <>
            <MenuAdmin />
            <TableUsers />
            {values.alertMistakes && <Alerts />}
        </>
    )
}
export default Admin;