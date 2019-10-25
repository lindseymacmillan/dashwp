const initialGeneral = {
    presets: [
        {
            name: 'Newspaper'
        }, 
        {
            name: 'Magazine'
        },
        {
            name: 'Podcast'
        },
        {
            name: 'Portfolio'
        }
    ],
    active_preset: 'Newspaper',
}
    
export const generalReducer = (state = initialGeneral, action) => {
    switch (action.type) {
        case 'SET_PRESET':
            return { ...state, active_preset: action.payload }
        default:
            return state
    }
}