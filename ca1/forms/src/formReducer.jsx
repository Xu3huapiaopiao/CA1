const formReducer = (state, action) => {
    switch (action.type) {
        // updating value happens if UPDATE_VALUE action.type is called
        case "UPDATE_VALUE":
            return {
                ...state,
                [action.field]: action.payload,
            };
        // returns a default state. must be included in useReducer
        default:
            return state;
    }
};


export default formReducer;
