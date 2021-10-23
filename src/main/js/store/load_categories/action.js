export const LOAD_CATEGORIES_DATA_SUCCESS = 'LOAD_CATEGORIES_DATA_SUCCESS';

const loadCategoriesFetchDataSuccess = (categories) => {
	return {
		type: LOAD_CATEGORIES_DATA_SUCCESS,
		categories,
	};
};
export const loadCategoriesFetchData = (data) => async (dispatch) => {
	const { url, values, setValues } = data;
	let response = await fetch(url);
	if (response.status === 200) {
		response = await response.json();
		dispatch(loadCategoriesFetchDataSuccess(response));
		setValues({
			...values,
			changeCountPages: {
				url: `/count/categories?userName=${sessionStorage.userName}`,
				range: 5,
			},
		});
	} else {
		setValues({
			...values,
			number: 5,
			typeMistake: `Error from server-${response.statusText} №${response.status}!!!`,
			alertMistakes: true,
		});
	}
};
