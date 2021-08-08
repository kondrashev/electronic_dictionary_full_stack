import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ApplictationContext } from '../../App';
import { connect } from 'react-redux';
import { addCategoryFetchData } from '../../store/update_categories/action_add';
import { StylesUser } from '../../styles/StylesUser';

const CategoryForm = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const [valueNameCategory, setValueNameCategory] = React.useState('');
    const { catogoryAdd } = props;
    const nameChange = (event) => {
        setValueNameCategory(event.target.value);
    };
    const addCategory = () => {
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
        let category = {
            name: valueNameCategory,
            userName: sessionStorage.userName,
            date: `${checkDate()}.${checkMonth()}.${new Date().getFullYear()}p.`,
            words: []
        }
        let data = {
            url: `/add/category?userName=${sessionStorage.userName}`,
            category: category,
            values: values,
            setValues: setValues,
            setValueNameCategory: setValueNameCategory
        }
        catogoryAdd(data);
    }
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            addCategory();
        }
    }
    const closeFormCategory = () => {
        setValues({
            ...values,
            showFormCategory: false
        });
    }
    const hover = React.useRef('');
    const hoverOn = () => {
        hover.current.style.borderRadius = '50%'
        hover.current.style.backgroundColor = 'grey';
    }
    const hoverOff = () => {
        hover.current.style.borderRadius = 'inherit'
        hover.current.style.backgroundColor = 'inherit';
    }
    return (
        <div
            style={StylesUser.categoryForm}
        >
            <button
                ref={hover}
                style={StylesUser.closeForm}
                onClick={closeFormCategory}
                onMouseOver={hoverOn}
                onMouseOut={hoverOff}
            >
                <svg
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                >
                    <path d="M6 4.36L10.02.34a1.16 1.16 0 0 1 1.64 1.64L7.64 6l4.02 4.02a1.16 1.16 0 0 1-1.64 1.64L6 7.64l-4.02 4.02a1.16 1.16 0 0 1-1.64-1.64L4.36 6 .34 1.98A1.16 1.16 0 1 1 1.98.34L6 4.36z" fill="black"></path>
                </svg>
            </button>
            <TextField
                id="outlined-search"
                label="Category name"
                type="search"
                variant="outlined"
                value={valueNameCategory}
                onChange={nameChange}
                onKeyPress={onKeyPress}
                style={StylesUser.textField}
            />
            <Button
                variant="contained"
                color="primary"
                disableElevation
                disabled={!valueNameCategory}
                onClick={addCategory}
                style={StylesUser.addCategory}
            >
                Add category
            </Button>
        </div>
    )
}
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
    return {
        catogoryAdd: (data) => dispatch(addCategoryFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);