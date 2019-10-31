import qs from 'qs';
import axios from 'axios';

import { setQueryString, runQuery } from '../query'
import { closeModal } from '../interface'

//ACTIONS

export const createContent = (args) => {

    console.log('content args!', args);

    let route = 'dashwp/v1/content';

    return function(dispatch) {

        console.log(args);

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'create',
                'payload': {
                    'fields': args.fields,
                    'post_type': args.postType,
                    'dashboard_name': dwp_data.name
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            if (args.goTo == true) {
                window.location.href = window.location.origin + '/wp-admin/post.php?post=' + response.data + '&action=edit';
            } else {
                dispatch(setQueryString(''));
                dispatch(runQuery({
                    queryType: args.queryType, 
                    queryTerm: dwp_data.name, 
                    queryString: ''}));
                dispatch(closeModal());
            }
            console.log(response);
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}

export const updateContent = (args) => {

    console.log('content args!', args);

    let route = 'dashwp/v1/content';

    return function(dispatch) {

        console.log(args);

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'update',
                'payload': {
                    'fields': args.fields,
                    'id': args.id,
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            if (args.goTo == true) {
                window.location.href = window.location.origin + '/wp-admin/post.php?post=' + response.data + '&action=edit';
            } else {
                dispatch(setQueryString(''));
                dispatch(runQuery({
                    queryType: args.queryType, 
                    queryString: '', 
                    queryTerm: dwp_data.name}));
                dispatch(closeModal());
            }
            console.log(response);
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}

export const deleteContent = (args) => {

    console.log('content args!', args);

    let route = 'dashwp/v1/content';

    return function(dispatch) {

        console.log(args);

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'delete',
                'payload': {
                    'id': args.id,
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            if (args.goTo == true) {
                window.location.href = window.location.origin + '/wp-admin/post.php?post=' + response.data + '&action=edit';
            } else {
                dispatch(setQueryString(''));
                dispatch(runQuery({
                    queryType: args.queryType, 
                    queryString: '', 
                    queryTerm: dwp_data.name}));
                dispatch(closeModal());
            }
            console.log(response);
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}

//CARD FIELDS

export const fetchingContentFieldValues = () => {
    return {
        type: 'FETCHING_CONTENT_FIELD_VALUES'
    }
}

export const contentFieldValuesReceivedFromSever = (fields) => {
    return {
        type: 'CONTENT_FIELD_VALUES_RECEIVED',
        payload: fields
    }
}

export const setContentFieldValue = (args) => {
    return {
        type: 'SET_CONTENT_FIELD_VALUE',
        payload: {
            index: args.index,
            value: args.value
        }
    }
}

export const setContentFields = (args) => {
    return {
        type: 'SET_CONTENT_FIELDS',
        payload: {
            postType: args.postType
        }
    }
}

export const getContentFieldValues = (args) => {

    let route = 'dashwp/v1/quick_cards';

    return function(dispatch) {

        dispatch(fetchingContentFieldValues())

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'query_values',
                'payload': {
                    'fields': args.fields,
                    'id': args.id
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            dispatch(contentFieldValuesReceivedFromSever(response.data.return));
            console.log(response);
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}

export const contentOptionsReceived = (options) => {
    return {
        type: 'CONTENT_OPTIONS_RECEIVED',
        payload: options
    }
}

export const runContentQuery = () => {

    let route = 'dashwp/v1/dashboards';

    return function(dispatch) {

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'content_query',
                'payload': {
                    'key': 'value',
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            // if (args.goTo == true) {
            //     window.location.href = window.location.origin + '/wp-admin/post.php?post=' + response.data + '&action=edit';
            // } else {
            dispatch(contentOptionsReceived(response.data.return));
            // }
            console.log(response);
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}
