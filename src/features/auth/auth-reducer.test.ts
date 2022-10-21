import { authReducer, isRegisteredAC, LoginInitialStateType, setIsLoggedInAC, setUserDataAC } from './auth-reducer'

let startState: LoginInitialStateType = {
    isLoggedIn: false,
    email: '',
    registered: false,
    user: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: null,
        updated: null,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: '',
    },
}
beforeEach(() => {
    startState = {
        isLoggedIn: false,
        email: '',
        registered: false,
        user: {
            _id: '',
            email: '',
            name: '',
            avatar: '',
            publicCardPacksCount: 0,
            created: null,
            updated: null,
            isAdmin: false,
            verified: false,
            rememberMe: false,
            error: '',
        },
    }
})

test('status registered status should be changed to true ', () => {
    const action = isRegisteredAC(true)
    const endState = authReducer(startState, action)

    expect(endState.registered).toBe(true)
})

test('should log in user', () => {
    const endState = authReducer(startState, setIsLoggedInAC(true))

    expect(endState.isLoggedIn).toBeTruthy()
})

test('should set up user data', () => {
    const endState = authReducer(
        startState,
        setUserDataAC({ ...startState.user, email: 'email@gmail.com', name: 'username', publicCardPacksCount: 0 })
    )

    expect(endState.user.email).toBe('email@gmail.com')
    expect(endState.user.name).toBe('username')
    expect(endState.user.publicCardPacksCount).toBe(0)
})
