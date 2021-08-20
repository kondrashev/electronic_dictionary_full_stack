export const loadDataBaseFetchData = (data) => async (dispatch) => {
    const { url } = data;
    let response = await fetch(url);
    if (response.status === 200) {
        response = await response.json();
        if (response.login) {
            localStorage.setItem(response.login, JSON.stringify(response));
            window.location.href = '/logout';
        }
    } else {
        alert(`Error from server-${response.statusText} №${response.status}!!!`);
    }
}