import { LOAD_DATABASE_DATA_SUCCESS } from './action';

export const loadDataBaseReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD_DATABASE_DATA_SUCCESS:
            return action.data;
        default:
            return state;
    }
}