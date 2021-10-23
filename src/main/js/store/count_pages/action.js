export const COUNT_PAGES_DATA_SUCCESS = 'COUNT_PAGES_DATA_SUCCESS';

const countPagesFetchDataSuccess = (pages) => {
	return {
		type: COUNT_PAGES_DATA_SUCCESS,
		pages,
	};
};
export const countPagesFetchData = (data) => async (dispatch) => {
	const { url, range } = data;
	let response = await fetch(url);
	response = await response.json();
	let countPages =
		response % range > 0
			? Math.round(response / range) + 1
			: Math.round(response / range);
	dispatch(countPagesFetchDataSuccess(countPages));
};
