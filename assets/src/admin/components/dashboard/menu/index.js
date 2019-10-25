import { useDispatch } from 'react-redux'
import { openModal } from '../../../screens/dashboard/redux/actions/interface'
const { Button } = wp.components

import styles from './style.css'

const Menu = () => {
    const dispatch = useDispatch()
    return (
        <div className={styles.menu}>
            <Button isDefault className={styles.button} onClick={() => dispatch(openModal({mode: 'help'}))}>Help</Button>
            <Button isPrimary className={styles.button} onClick={() => dispatch(openModal({mode: 'settings'}))}>Settings</Button>
        </div>
    )
}
export default Menu