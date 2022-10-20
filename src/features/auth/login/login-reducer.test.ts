import { LoginInitialStateType, loginReducer, setIsLoggedInAC, setUserDataAC } from './login-reducer'

let startState: LoginInitialStateType = {
    isLoggedIn: false,
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

it('should log in user', () => {
    const endState = loginReducer(startState, setIsLoggedInAC(true))

    expect(endState.isLoggedIn).toBeTruthy()
})

it('should set up user data', () => {
    const endState = loginReducer(
        startState,
        setUserDataAC({ ...startState.user, email: 'email@gmail.com', name: 'username', publicCardPacksCount: 0 })
    )

    expect(endState.user.email).toBe('email@gmail.com')
    expect(endState.user.name).toBe('username')
    expect(endState.user.publicCardPacksCount).toBe(0)
})
