import { loginReducer, setIsLoggedInAC } from './login-reducer'

it('should log in user', () => {
    const startState = {
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

    const endState = loginReducer(startState, setIsLoggedInAC(true))

    expect(endState.isLoggedIn).toBeTruthy()
})
