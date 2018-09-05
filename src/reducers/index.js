export default (state = 0, action) => {
    switch (action.type) {
        case 'NEXT':
            return state + 1
        case 'PREVIOUS':
            return state - 1
        default: 
            return state
    }
}