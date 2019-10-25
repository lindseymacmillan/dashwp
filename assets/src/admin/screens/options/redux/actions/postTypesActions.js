import qs from 'qs';
import axios from 'axios';

const route = 'dashwp/v1/post_types';

export const openPostTypesModal = (args) => {
    return {
        type: 'OPEN_POST_TYPES_MODAL',
        payload: {
            mode: args.mode,
            postType: args.postType
        }
    }
}

export const closePostTypesModal = () => {
    return {
        type: 'CLOSE_POST_TYPES_MODAL'
    }
}

export const addPostTypeCardField = (args) => {
    return {
        type: 'ADD_POST_TYPE_CARD_FIELD',
        payload: args
    }
}

export const setPostTypeCardActiveField = (field) => {
    return {
        type: 'SET_POST_TYPE_CARD_ACTIVE_FIELD',
        payload: field
    }
}

export const movePostTypeCardField = (args) => {
    return {
        type: 'MOVE_POST_TYPE_CARD_FIELD',
        payload: args
    }
}

export const deletePostTypeCardField = (args) => {
    return {
        type: 'DELETE_POST_TYPE_CARD_FIELD',
        payload: args
    }
}

export const fetchingPostTypes = () => {
    return {
        type: 'FETCHING_POST_TYPES'
    }
}

export const postTypesReceived = (post_types) => {
    return {
        type: 'POST_TYPES_RECEIVED',
        payload: post_types
    }
}

export const creatingPostType = () => {
    return {
        type: 'CREATING_POST_TYPE'
    }
}

export const postTypeDeleted = () => {
    return {
        type: 'POST_TYPE_DELETED'
    }
}

export const deletingPostType = () => {
    return {
        type: 'DELETING_POST_TYPE'
    }
}

export const postTypeCreated = () => {
    return {
        type: 'POST_TYPE_CREATED'
    }
}

export const createPostType = (args) => {

    return function(dispatch) {

        dispatch(creatingPostType())

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'create',
                'payload': {
                    'name': args.name,
                    'plural_name': args.pluralName,
                    'show_in_menu': args.showInMenu
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            dispatch(closePostTypesModal())
            dispatch(queryPostTypes());
            console.log(response);
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}

export const deletePostType = (args) => {

    return function(dispatch) {

        dispatch(deletingPostType())

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
            console.log(response);
            dispatch(closePostTypesModal());
            dispatch(queryPostTypes());
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}

export const updatePostType = (args) => {

    return function(dispatch) {

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'update',
                'payload': {
                    'id': args.id,
                    'name': args.name,
                    'plural_name': args.pluralName,
                    'show_in_menu': args.showInMenu,
                    'card_fields': args.cardFields
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            console.log(response);
            dispatch(closePostTypesModal());
            dispatch(queryPostTypes());
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}

export const queryPostTypes = () => {

    return function(dispatch) {

        dispatch(fetchingPostTypes())

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
            dispatch(postTypesReceived(response.data.return));
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}

export const getPostTypeFields = (postType) => {
    return {
        type: 'GET_POST_TYPE_FIELDS',
        payload: {
            post_type: postType
        }
    }
}

export const addPostTypeField = () => {
    return {
        type: 'ADD_POST_TYPE_FIELD'
    }
}

export const removePostTypeField = (fieldIndex) => {
    return {
        type: 'REMOVE_POST_TYPE_FIELD',
        payload: {
            field_index: fieldIndex
        }
    }
}

export const movePostTypeField = (fromIndex, toIndex) => {
    return {
        type: 'MOVE_POST_TYPE_FIELD',
        payload: {
            from_index: fromIndex,
            to_index: toIndex
        }
    }
}

export const setPostTypeField = (args) => {
    return {
        type: 'SET_POST_TYPE_FIELD',
        payload: {
            field_index: args.field_index,
            key: args.key,
            value: args.value,
        }
    }
}

export const updatePostTypeFields = (postType, postFields) => {

    return function(dispatch) {

        //dispatch(fetchingPostTypes())

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'update_fields',
                'payload': {
                    'post_type': postType,
                    'post_fields': postFields
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            console.log(response);
            dispatch(closePostTypesModal())
            dispatch(getPostTypes())
            //dispatch(postTypesReceived(response.data.return));
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}