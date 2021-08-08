import React from 'react';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TableWords from './TableWords';
import SearchWord from './SearchWord';
import PaginationButtons from './PaginationButtons';
import ListCategories from './ListCategories';
import { ApplictationContext } from '../../App';
import { connect } from 'react-redux';
import { countPagesFetchData } from '../../store/count_pages/action';
import { deleteCategoriesFetchData } from '../../store/update_categories/action_delete';
import { StylesUser } from '../../styles/StylesUser';
import { useSpring, animated as a } from 'react-spring';
import CategoryForm from './CategoryForm';
import WordForm from './WordForm';

const Content = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { getCountPages, categoriesDelete } = props;
    React.useEffect(() => {
        getCountPages(values.changeCountPages);
    }, [values.changeCountPages]);
    const deleteCategories = () => {
        let data = {
            url: '/delete/categories',
            listIdCategories: values.listIdCategories,
            values: values,
            setValues: setValues
        }
        categoriesDelete(data);
    }
    const animationFormCategory = useSpring({
        marginLeft: values.showFormCategory ? 0 : -350,
        config: { duration: 1000 }
    });
    const animationFormWord = useSpring({
        marginLeft: values.showFormWord ? 0 : -350,
        config: { duration: 1000 }
    });
    return (
        < div >
            <div
                style={StylesUser.listCategories}
            >
                {
                    values.showDeleteButtonCategory &&
                    <List>
                        <ListItemSecondaryAction >
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                className='category_delete'
                                onClick={deleteCategories}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </List>
                }
                {
                    values.showListCategories &&
                    <ListCategories />
                }
                {
                    values.showListWords &&
                    <TableWords />
                }
                {
                    values.showSearchWord &&
                    <SearchWord />
                }
            </div>
            <a.div
                style={animationFormCategory}
            >
                <CategoryForm />
            </a.div>
            <a.div
                style={animationFormWord}
            >
                <WordForm />
            </a.div>
            <PaginationButtons />
        </div >
    )
}
const mapStateToProps = state => {
    return {
        pagesCount: state.countPagesReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getCountPages: (data) => dispatch(countPagesFetchData(data)),
        categoriesDelete: (data) => dispatch(deleteCategoriesFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);