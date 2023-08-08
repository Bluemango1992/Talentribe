// reducers/candidatesReducer.ts
const initialState = [];

const candidatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CANDIDATES':
            return action.payload;
        default:
            return state;
    }
}

export default candidatesReducer;
