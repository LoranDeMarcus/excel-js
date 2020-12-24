export function rootReducer(state, action) {
    switch (action.type) {
        case 'TABLE_RESIZE':
            console.log(...state);
            return {...state, colState: {}}
        default: return state;
    }
}

// TODO: action.data = undefined, найти ошибку https://vladilen.ru/pl/teach/control/lesson/view?id=161422303