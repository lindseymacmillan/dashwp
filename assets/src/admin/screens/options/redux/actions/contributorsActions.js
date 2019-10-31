import qs from 'qs';
import axios from 'axios';

const route = 'dashwp/v1/contributors';

export const openContributorsModal = (args) => {
    return {
        type: 'OPEN_CONTRIBUTORS_MODAL',
        payload: {
            mode: args.mode,
            source: args.source
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

export const createContributor = (args) => {

    console.log('create!', args);

    return function(dispatch) {

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'create',
                'payload': {
                    'name': args.name,
                    'bio': args.bio,
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            // if (args.goTo == true) {
            //     window.location.href = window.location.origin + '/wp-admin/post.php?post=' + response.data + '&action=edit';
            // } else {
            dispatch(closeContributorsModal());
            dispatch(queryContributors());
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

export const updateContributor = (args) => {

    console.log('update!', args);

    return function(dispatch) {

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'update',
                'payload': {
                    'id': args.id,
                    'name': args.name,
                    'bio': args.bio,
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            // if (args.goTo == true) {
            //     window.location.href = window.location.origin + '/wp-admin/post.php?post=' + response.data + '&action=edit';
            // } else {
            dispatch(closeContributorsModal());
            dispatch(queryContributors());
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

export const deleteContributor = (args) => {

    console.log('delete!', args);

    return function(dispatch) {

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
            // if (args.goTo == true) {
            //     window.location.href = window.location.origin + '/wp-admin/post.php?post=' + response.data + '&action=edit';
            // } else {
            dispatch(closeContributorsModal());
            dispatch(queryContributors());
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