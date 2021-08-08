import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { TableWordsContext } from './TableWords';
import { ApplictationContext } from '../../App';
import { connect } from 'react-redux';
import { editWordFetchData } from '../../store/update_words/action_edit';

const TableRowWord = (props) => {
    const { values, setValues } = React.useContext(ApplictationContext);
    const { row, isItemSelected, getIdWord, handleClick, labelId } = React.useContext(TableWordsContext);
    const inputEditWord = React.useRef('');
    const nameOldWord = React.useRef('');
    const meaningOldWord = React.useRef('');
    const [valuesTableRowWord, setValuesTableRowWord] = React.useState({
        showEditNameWord: false,
        showEditMeaningWord: false,
        oldNameWord: '',
        newNameWord: '',
        oldMeaningWord: '',
        newMeaningWord: ''
    });
    const { wordEdit } = props;
    const pronunciation = () => {
        return `${'https://translate.google.com/#view=home&op=translate&sl=en&tl=uk&text='}${nameOldWord.current.innerText}`;
    }
    const editNameWord = (event) => {
        setValuesTableRowWord({
            ...valuesTableRowWord,
            newNameWord: event.target.value
        });
    }
    const editMeaningWord = (event) => {
        setValuesTableRowWord({
            ...valuesTableRowWord,
            newMeaningWord: event.target.value
        });
    }
    const editNameWordShow = () => {
        setValuesTableRowWord({
            ...valuesTableRowWord,
            oldNameWord: nameOldWord.current.innerText,
            showEditNameWord: !valuesTableRowWord.showEditNameWord
        });
    }
    React.useEffect(() => {
        valuesTableRowWord.showEditNameWord && inputEditWord.current.focus();
    }, [valuesTableRowWord.showEditNameWord]);
    const editMeaningWordShow = () => {
        setValuesTableRowWord({
            ...valuesTableRowWord,
            oldNameWord: nameOldWord.current.innerText,
            oldMeaningWord: meaningOldWord.current.innerText,
            showEditMeaningWord: !valuesTableRowWord.showEditMeaningWord
        });
    }
    React.useEffect(() => {
        valuesTableRowWord.showEditMeaningWord && inputEditWord.current.focus();
    }, [valuesTableRowWord.showEditMeaningWord]);
    const changeNameWord = (event) => {
        if (event.keyCode == 13) {
            let editWord = {
                userName: sessionStorage.userName,
                name: valuesTableRowWord.oldNameWord,
                newName: valuesTableRowWord.newNameWord,
                mark: 'name'
            }
            let data = {
                url: '/edit/word',
                editWord: editWord,
                values: values,
                setValues: setValues,
                valuesTableRowWord: valuesTableRowWord,
                setValuesTableRowWord: setValuesTableRowWord
            }
            wordEdit(data);
        }
    }
    const changeMeaningWord = (event) => {
        if (event.keyCode == 13) {
            let editWord = {
                userName: sessionStorage.userName,
                name: valuesTableRowWord.oldNameWord,
                meaning: valuesTableRowWord.oldMeaningWord,
                newMeaning: valuesTableRowWord.newMeaningWord,
                mark: 'meaning'
            }
            let data = {
                url: '/edit/word',
                editWord: editWord,
                values: values,
                valuesTableRowWord: valuesTableRowWord,
                setValuesTableRowWord: setValuesTableRowWord
            }
            wordEdit(data);
        }
    }
    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.name}
            selected={isItemSelected}
            className='row_edit_word'
        >
            <TableCell padding="checkbox">
                <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                    value={row.id}
                    onChange={getIdWord}
                    onClick={() => handleClick(nameOldWord)}
                />
            </TableCell>
            <Tooltip
                title='Edit name'
            >
                <TableCell
                    ref={nameOldWord}
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    className='name_word'
                    onClick={() => editNameWordShow()}
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    {row.name}
                </TableCell>
            </Tooltip>
            {valuesTableRowWord.showEditNameWord &&
                <TableCell
                    className='edit_name_word'
                    style={{
                        position: 'relative'
                    }}
                >
                    <input
                        ref={inputEditWord}
                        className='edit_word_name'
                        onChange={editNameWord}
                        onKeyUp={changeNameWord}
                        placeholder='Edit name'
                        style={{
                            marginTop: '12px'
                        }}
                    >
                    </input>
                </TableCell>
            }
            <Tooltip
                title='Edit meaning'
            >
                <TableCell
                    ref={meaningOldWord}
                    align="right"
                    className='meaning_word'
                    onClick={() => editMeaningWordShow()}
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    {row.meaning}
                </TableCell>
            </Tooltip>
            {valuesTableRowWord.showEditMeaningWord &&
                <TableCell
                    className='edit_meaning_word'
                    style={{
                        position: 'relative'
                    }}
                >
                    <input
                        ref={inputEditWord}
                        className='edit_word_meaning'
                        onChange={editMeaningWord}
                        onKeyUp={changeMeaningWord}
                        placeholder='Edit meaning'
                        style={{
                            marginTop: '12px'
                        }}
                    >
                    </input>
                </TableCell>
            }
            <TableCell align="right">
                {row.date}
            </TableCell>
            <TableCell align="right">
                <a
                    href={pronunciation()}
                    target='_blank'
                >
                    {row.name}
                </a>
            </TableCell>
        </TableRow>
    )
}
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
    return {
        wordEdit: (data) => dispatch(editWordFetchData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableRowWord);