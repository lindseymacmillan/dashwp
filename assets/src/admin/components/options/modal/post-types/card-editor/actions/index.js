import { useSelector, useDispatch } from 'react-redux'
import { updatePostType } from '../../../../../../screens/options/redux/actions/postTypesActions'
const { Button } = wp.components

import styles from './style.css'

const Actions = () => {

    const dispatch = useDispatch()
    const postType = useSelector(state => state.postTypes.modal.source)
    const contentFields = useSelector(state => state.postTypes.cardEditor.contentFields)

    return (
        <div className={styles.actions}>
            <Button
                isPrimary
                onClick={() => dispatch(updatePostType({id: postType.id, contentFields: contentFields}))}>Update</Button>
        </div>
    )
}
export default Actions