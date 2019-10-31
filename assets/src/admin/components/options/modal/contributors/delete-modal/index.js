import { useSelector, useDispatch } from 'react-redux'
import { deleteContributor } from '../../../../../screens/options/redux/actions/contributorsActions'
const { Button } = wp.components

import styles from './style.css'

const DeleteModal = () => {

    const dispatch = useDispatch()
    const source = useSelector(state => state.contributors.modal.source)

    return(
        <div>
            <Button isPrimary onClick={() => dispatch(deleteContributor({id: source.term_id}))}>Delete</Button>
        </div>
    )
}
export default DeleteModal