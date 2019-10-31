import { useSelector, useDispatch } from 'react-redux'
import { deletePostType } from '../../../../../screens/options/redux/actions/postTypesActions'
const { Button } = wp.components

import styles from './style.css'

const DeleteModal = () => {

    const dispatch = useDispatch()
    const source = useSelector(state => state.postTypes.modal.source)

    return(
        <div>
            <Button isPrimary onClick={() => dispatch(deletePostType({id: source.id}))}>Delete</Button>
        </div>
    )
}
export default DeleteModal