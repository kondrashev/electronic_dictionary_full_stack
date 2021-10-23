export const LOAD_USERS_DATA_SUCCESS = 'LOAD_USERS_DATA_SUCCESS';

const loadUsersFetchDataSuccess = (users) => {
	return {
		type: LOAD_USERS_DATA_SUCCESS,
		users,
	};
};
export const loadUsersFetchData = (data) => async (dispatch) => {
	const { url, getLoad, values, setValues } = data;
	if (getLoad) {
		let users = [];
		for (let i = 0; i < localStorage.length; i++) {
			users[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
		}
		let response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(users),
		});
		if (response.status !== 200) {
			setValues({
				...values,
				number: 5,
				typeMistake: `Error from server-${response.statusText} №${response.status}!!!`,
				alertMistakes: true,
			});
		}
	} else {
		let response = await fetch(url);
		if (response.status === 200) {
			response = await response.json();
			dispatch(loadUsersFetchDataSuccess(response));
		} else {
			setValues({
				...values,
				number: 5,
				typeMistake: `Error from server-${response.statusText} №${response.status}!!!`,
				alertMistakes: true,
			});
		}
	}
};
