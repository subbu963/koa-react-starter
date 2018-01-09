import {createStore} from 'redux'

export default function configureStore(rootReducer, initialState, middleware) {
    const store = createStore(
        rootReducer,
        initialState,
        middleware
    );

    return store;
};
