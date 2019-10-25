import qs from 'qs';
import axios from 'axios';

//ACTIONS


export const setActiveFilter = (type) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: type
    }
}

export const openModal = (args) => {
    return {
        type: 'OPEN_MODAL',
        payload: {
            mode: args.mode,
            source: args.source,
        }
    }
}

export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL',
    }
}

export const toggleGoTo = () => {
    return {
        type: 'TOGGLE_GO_TO',
    }
}