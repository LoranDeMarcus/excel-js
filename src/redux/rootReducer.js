export function rootReducer(state, action) {
    let prevState;
    switch (action.type) {
        case 'TABLE_RESIZE':
            prevState = state.colState || {};
            prevState[action.data.id] = action.data.value; // TODO: решить проблему в console
        return {...state, colState: action.data}
        default: return state;
    }

}