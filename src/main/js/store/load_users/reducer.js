import { LOAD_USERS_DATA_SUCCESS } from './action';

export const loadUsersReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD_USERS_DATA_SUCCESS:
            return action.users;
        default:
            return state;
    }
}