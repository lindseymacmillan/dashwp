import { useSelector } from 'react-redux'
import styles from './style.css'

const Header = () => {
    const title = useSelector(state => state.interface.title)
    const linkedContent = useSelector(state => state.interface.linkedContent)
    const displayLink = linkedContent.id === '0' ? false : true

    return (
        <div className={styles.header}>
            <h1>{title}</h1>
            { displayLink && (
                <a className={'page-title-action ' + styles.link} href={'/wp-admin/post.php?post=' + linkedContent.id + '&action=edit'}>{linkedContent.label}</a>
            )}
        </div>
    )
}

export default Header
