import qs from 'qs';
import axios from 'axios';

//ACTIONS

export const fetchingContent = () => {
    return {
        type: 'FETCHING_CONTENT'
    }
}

export const contentReceived = (posts) => {
    return {
        type: 'CONTENT_RECEIVED',
        payload: posts
    }
}

export const setQueryString = (query) => {
    return {
        type: 'SET_QUERY_STRING',
        payload: query,
    }
}

export const runQuery = (queryTerm, queryType, queryString) => {

    let route = 'dashwp/v1/content';

    return function(dispatch) {

        dispatch(fetchingContent())

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'query',
                'payload': {
                    'query_type': queryType,
                    'query_term': queryTerm,
                    'query_string': queryString
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            dispatch(contentReceived(response.data.return));
            console.log(response);
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}