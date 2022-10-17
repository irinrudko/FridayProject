import {appReducer, initializedAC, RequestStatusType, setAppStatusAC, setErrAC} from "./app-reducer";

test('status should be changed', () => {
    let startState = {
        status: "loading" as RequestStatusType,
        error: null as null | string,
        initialized: false
    }

    const action = setAppStatusAC("succeeded")
    const endState = appReducer(startState, action)

    expect(endState.status).toBe("succeeded");
});

test('error message should be changed', () => {
    let startState = {
        status: "loading" as RequestStatusType,
        error: null as null | string,
        initialized: false
    }

    const action = setErrAC("test message error")
    const endState = appReducer(startState, action)

    expect(endState.error).toBe("test message error");
    expect(endState.status).toBe("loading");
});

test('initialized should be changed', () => {
    let startState = {
        status: "loading" as RequestStatusType,
        error: null as null | string,
        initialized: false
    }

    const action = initializedAC(true)
    const endState = appReducer(startState, action)

    expect(endState.initialized).toBe(true);
    expect(endState.status).toBe("loading");
});