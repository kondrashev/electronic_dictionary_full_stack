import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { ApplictationContext } from '../../App';
import { connect } from 'react-redux';

const PaginationButtons = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { pagesCount } = props;
    const handleChange = (event, value) => {
        if (event.target.value !== undefined) {
            values.showListCategories &&
                setValues({
                    ...values,
                    numberPageCategories: value,
                    loadCategories: value
                });
            values.showListWords &&
                setValues({
                    ...values,
                    numberPageWords: value,
                    loadWords: value
                });
        }
    }
    return (
        <Pagination
            count={pagesCount}
            variant="outlined"
            onChange={handleChange}
            shape="rounded"
            style={{
                position: 'fixed',
                bottom: '0px',
                left: '50%',
                transform: 'translate(-50%,-100%)',
            }}
        />
    )
}
const mapStateToProps = state => {
    return {
        pagesCount: state.countPagesReducer
    };
}
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(PaginationButtons);