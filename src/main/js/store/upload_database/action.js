export const LOAD_DATABASE_DATA_SUCCESS = 'LOAD_DATABASE_DATA_SUCCESS';

export const loadDataBaseFetchDataSuccess = (data) => {
    return {
        type: LOAD_DATABASE_DATA_SUCCESS,
        data
    }
}
export const loadDataBaseFetchData = (data) => async (dispatch) => {
    const { url } = data;
    let response = await fetch(url);
    if (response.status === 200) {
        response = await response.json();
        localStorage.setItem('pavel', JSON.stringify(user));
        dispatch(loadDataBaseFetchDataSuccess(response));
    } else {
        alert(`Error from server-${response.statusText} №${response.status}!!!`);
    }
}