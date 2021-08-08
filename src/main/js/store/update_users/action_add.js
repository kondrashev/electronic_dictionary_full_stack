export const addUserFetchData = (data) => async (dispatch) => {
    const { url, user, values, setValues } = data;
    const { date } = data.user;
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (response.status === 200) {
        response = await response.json();
        if (response.login) {
            let user = {
                login: response.login,
                password: response.password,
                date: date,
                role: 'user',
                categories: []
            }
            localStorage.setItem(response.login, JSON.stringify(user));
            setValues({
                ...values,
                number: 1,
                alertMistakes: true,
                login: '',
                password: ''
            });
        } else {
            setValues({
                ...values,
                number: 2,
                alertMistakes: true,
                login: '',
                password: ''
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