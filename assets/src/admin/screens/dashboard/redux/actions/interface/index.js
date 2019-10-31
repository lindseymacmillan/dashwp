import qs from 'qs';
import axios from 'axios';

//ACTIONS


export const setActiveFilter = (type) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: type
    }
}

export const setActiveView = (view) => {
    return {
        type: 'SET_ACTIVE_VIEW',
        payload: view
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

export const openMediaLibraryModal = () => {
    return {
        type: 'OPEN_MEDIA_LIBRARY_MODAL'
    }
}

export const closeMediaLibraryModal = () => {
    return {
        type: 'CLOSE_MEDIA_LIBRARY_MODAL'
    }
}

export const toggleGoTo = () => {
    return {
        type: 'TOGGLE_GO_TO',
    }
}

export const setDashboardName = (args) => {
    return {
        type: 'SET_DASHBOARD_NAME',
        payload: args
    }
}

export const setSupportedTypes = (args) => {
    return {
        type: 'SET_SUPPORTED_TYPES',
        payload: args
    }
}

export const updateDashboard = (args) => {

    let route = 'dashwp/v1/dashboards';

    return function(dispatch) {

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'update',
                'payload': {
                    'id': dwp_data.id,
                    'name': args.name,
                    'description': args.description,
                    'supported_post_types': args.supportedTypes,
                    'linked_content': args.linkedContent
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            location.reload();
            console.log(response);
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}