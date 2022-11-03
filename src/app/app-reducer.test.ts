import { appReducer, initializedAC, RequestStatusType, setAppStatusAC, setErrAC } from './app-reducer'

it('should change AppStatus', () => {
    let startState = {
        status: 'loading' as RequestStatusType,
        error: null as null | string,
        initialized: false,
        isModalOpened: false,
    }

    const action = setAppStatusAC('succeeded')
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('succeeded')
})

it('should change error message', () => {
    let startState = {
        status: 'loading' as RequestStatusType,
        error: null as null | string,
        initialized: false,
        isModalOpened: false,
    }

    const action = setErrAC('test message error')
    const endState = appReducer(startState, action)

    expect(endState.error).toBe('test message error')
    expect(endState.status).toBe('loading')
})

it('should initialize App', () => {
    let startState = {
        status: 'loading' as RequestStatusType,
        error: null as null | string,
        initialized: false,
        isModalOpened: false,
    }

    const action = initializedAC(true)
    const endState = appReducer(startState, action)

    expect(endState.initialized).toBe(true)
    expect(endState.status).toBe('loading')
})
