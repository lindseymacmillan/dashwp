import { useDispatch } from 'react-redux'
import { closePostTypesModal } from '../../../../../screens/options/redux/actions/postTypesActions'
const { Button } = wp.components

import styles from './style.css'

const HelpModal = () => {

    const dispatch = useDispatch()

    return(
        <div>
            <h1>Help</h1>
            <Button isPrimary onClick={() => dispatch(closePostTypesModal())}>Got it!</Button>
        </div>
    )
}
export default HelpModal