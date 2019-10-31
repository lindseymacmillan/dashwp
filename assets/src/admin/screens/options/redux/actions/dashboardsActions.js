import qs from 'qs';
import axios from 'axios';

const route = 'dashwp/v1/dashboards';

export const openDashboardsModal = (args) => {
    return {
        type: 'OPEN_DASHBOARDS_MODAL',
        payload: {
            mode: args.mode,
            source: args.source
        }
    }
}

export const closeDashboardsModal = () => {
    return {
        type: 'CLOSE_DASHBOARDS_MODAL',
    }
}

export const toggleDashboardsGoTo = (goto) => {
    return {
        type: 'TOGGLE_DASHBOARDS_GO_TO',
        payload: goto
    }
}

export const creatingDashboard = () => {
    return {
        type: 'CREATING_DASHBOARD'
    }
}

export const dashboardCreated = () => {
    return {
        type: 'DASHBOARD_CREATED'
    }
}

export const deletingDashboard = () => {
    return {
        type: 'DELETING_DASHBOARD'
    }
}

export const dashboardDeleted = () => {
    return {
        type: 'DASHBOARD_CREATED'
    }
}

export const fetchingDashboards = () => {
    return {
        type: 'FETCHING_DASHBOARDS'
    }
}

export const dashboardsReceived = (dashboards) => {
    return {
        type: 'DASHBOARDS_RECEIVED',
        payload: dashboards
    }
}

export const createDashboard = (args) => {

    console.log('create!', args);

    return function(dispatch) {

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'create',
                'payload': {
                    'name': args.name,
                    'description': args.description,
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            // if (args.goTo == true) {
            //     window.location.href = window.location.origin + '/wp-admin/post.php?post=' + response.data + '&action=edit';
            // } else {
            dispatch(closeDashboardsModal());
            dispatch(queryDashboards());
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

export const updateDashboard = (args) => {

    return function(dispatch) {

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'update',
                'payload': {
                    'id': args.id,
                    'name': args.name,
                    'description': args.description,
                    'supported_post_types': args.supportedPostTypes,
                    'linked_content': args.linkedContent
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            // if (args.goTo == true) {
            //     window.location.href = window.location.origin + '/wp-admin/post.php?post=' + response.data + '&action=edit';
            // } else {
            dispatch(closeDashboardsModal());
            dispatch(queryDashboards());
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

export const deleteDashboard = (args) => {

    return function(dispatch) {

        dispatch(deletingDashboard())

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
            dispatch(closeDashboardsModal())
            dispatch(queryDashboards())
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

export const queryDashboards = () => {

    return function(dispatch) {

        dispatch(fetchingDashboards())

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'action': 'query',
                'payload': {
                    'key': 'val',
                }
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            console.log(response);
            dispatch(dashboardsReceived(response.data.return));
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}

export const dashboardsContentReceived = (content) => {
    return {
        type: 'DASHBOARDS_CONTENT_RECEIVED',
        payload: content
    }
}

export const runContentQuery = () => {

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
            dispatch(dashboardsContentReceived(response.data.return));
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