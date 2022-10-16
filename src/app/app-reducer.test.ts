import {appReducer, RequestStatusType, setAppStatusAC, setErrAC} from "./app-reducer";

test('status should be changed', () => {

    let startState = {
        status: "loading" as RequestStatusType,
        error: null as null | string,
    }

    const action = setAppStatusAC("succeeded")
    const endState = appReducer(startState, action)

    expect(endState.status).toBe("succeeded");
});

test('error message should be changed', () => {

    let startState = {
        status: "loading" as RequestStatusType,
        error: null as null | string,
    }

    const action = setErrAC("test message error")
    const endState = appReducer(startState, action)

    expect(endState.error).toBe("test message error");
    expect(endState.status).toBe("loading");
});