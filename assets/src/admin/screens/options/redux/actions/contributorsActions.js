import qs from 'qs';
import axios from 'axios';

const route = 'dashwp/v1/contributors';

export const openContributorsModal = (args) => {
    return {
        type: 'OPEN_CONTRIBUTORS_MODAL',
        payload: {
            mode: args.mode,
            contributor: args.contributor
        }
    }
}

export const closeContributorsModal = () => {
    return {
        type: 'CLOSE_CONTRIBUTORS_MODAL',
    }
}

export const contributorsReceived = (contributors) => {
    return {
        type: 'CONTRIBUTORS_RECEIVED',
        payload: contributors
    }
}

export const queryContributors = () => {

    return function(dispatch) {

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'query',
                'payload': {
                    'key': 'value',
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            console.log(response);
            dispatch(contributorsReceived(response.data.return));

        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}