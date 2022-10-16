import {isRegisteredAC, registrationReducer} from "./registration-reducer";

test('status registered status should be changed to true ', () => {

    let startState = {
        registered: false
    }

    const action = isRegisteredAC(true)
    const endState = registrationReducer(startState, action)



    expect(endState.registered).toBe(true);
});