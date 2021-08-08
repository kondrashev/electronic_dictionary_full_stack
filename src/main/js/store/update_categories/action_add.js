export const ADD_CATEGORY_DATA_SUCCESS = 'ADD_CATEGORY_DATA_SUCCESS';

export const addCategoryFetchDataSuccess = (category) => {
    return {
        type: ADD_CATEGORY_DATA_SUCCESS,
        category
    }
}
export const addCategoryFetchData = (data) => async (dispatch) => {
    const { url, category, values, setValues, setValueNameCategory } = data;
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    });
    if (response.status === 200) {
        response = await response.json();
        if (response.name) {
            dispatch(addCategoryFetchDataSuccess(response));
            setValueNameCategory('');
            let user = JSON.parse(localStorage.getItem(sessionStorage.userName));
            user.categories.push(category);
            localStorage.setItem(sessionStorage.userName, JSON.stringify(user));
        } else {
            setValueNameCategory('');
            setValues({
                ...values,
                number: 4,
                typeMistake: 'This category already has in the dictionary-',
                alertMistakes: true
            });
        }
    } else {
        setValues({
            ...values,
            number: 5,
            typeMistake: `Error from server-${response.statusText} №${response.status}!!!`,
            alertMistakes: true
        });
    }
}