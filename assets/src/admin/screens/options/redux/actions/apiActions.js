import qs from 'qs';
import axios from 'axios';

export const queryContributors = () => {

    let route = 'dashwp/v1/insert';

    return function(dispatch) {

        console.log(title, excerpt, postType, taxType, taxTerm);

        dispatch(insertPost())

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'title': title,
                'excerpt': excerpt,
                'post_type': postType,
                'tax_type': taxType,
                'tax_term': taxTerm
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            if (goToPost == true) {
                window.location.href = window.location.origin + '/wp-admin/post.php?post=' + response.data + '&action=edit';
            } else {
                dispatch(postInserted(response.data));
                dispatch(setQueryString(''));
                dispatch(runQuery('any', taxType, taxTerm, ''));
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

export const runQuery = (filterType, taxType, taxTerm, searchQuery) => {

    let route = 'dashwp/v1/query';

    return function(dispatch) {

        dispatch(fetchingPosts())

        return axios.post(wpApiSettings.root + route,
            qs.stringify({
                'filter_type': filterType,
                'tax_type': taxType,
                'tax_term': taxTerm,
                'search_query': searchQuery
            }),
            {headers: {'X-WP-Nonce': wpApiSettings.nonce} }
        )
        .then(function (response) {
            dispatch(postsReceived(response.data.posts));
            console.log(response);
        })
        .then(function (error) {
            if (error) {
                console.log(error);
            }
        });
    } 
}