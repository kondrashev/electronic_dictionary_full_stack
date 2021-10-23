export const LOAD_WORDS_DATA_SUCCESS = 'LOAD_WORDS_DATA_SUCCESS';

const loadWordsFetchDataSuccess = (words) => {
	return {
		type: LOAD_WORDS_DATA_SUCCESS,
		words,
	};
};
export const loadWordsFetchData = (data) => async (dispatch) => {
	const { url, values, setValues } = data;
	let response = await fetch(url);
	if (response.status === 200) {
		response = await response.json();
		dispatch(loadWordsFetchDataSuccess(response));
		setValues({
			...values,
			changeCountPages: {
				url: `/count/words?categoryName=${values.currentNameCategory}&userName=${sessionStorage.userName}`,
				range: 25,
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
