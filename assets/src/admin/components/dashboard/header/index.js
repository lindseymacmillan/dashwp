import { useSelector } from 'react-redux'
import styles from './style.css'

const Header = () => {
    const title = useSelector(state => state.interface.title)
    return (
        <div className={styles.header}>
            <h1>{title}</h1>
        </div>
    )
}

export default Header
