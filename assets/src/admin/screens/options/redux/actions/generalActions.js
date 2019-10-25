export const openNewContentModal = (new_type) => {
    return {
        type: 'OPEN_NEW_CONTENT_MODAL',
        payload: {
            post_type: new_type,
        }
    }
}