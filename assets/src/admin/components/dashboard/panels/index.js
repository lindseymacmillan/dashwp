import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../../screens/dashboard/redux/actions/interface'
import Card from '@material-ui/core/Card';
const { Button } = wp.components
const { Fragment } = wp.element
import styles from './style.css'

const Panels = () => {
    const dispatch = useDispatch()
    const supportedTypeObjects = useSelector(state => state.interface.supportedTypeObjects)
    const linkedContent = useSelector(state => state.interface.linkedContent)
    const displayLink = linkedContent.id === '0' ? false : true

    const newContentButtons = supportedTypeObjects.map((type) => {
        return (
            <Button 
                onClick={() => dispatch(openModal({mode: 'new', source: type}))}
                isTertiary>
                {'New ' + type.labels.singular_name.toLowerCase() }
            </Button>
        )
    })
    return(
        <Fragment>
            <Card className={styles.intro}>
                <div>
                    <h3>Get started</h3>
                    <p>Jump into things by creating new content!</p>
                    {displayLink && (
                        <a className='button button-primary' href={'/wp-admin/post.php?post=' + linkedContent.id + '&action=edit'}>{linkedContent.label}</a>
                    )}
                </div>
                <div>
                    <h3 className={styles.newheader}>Create content</h3>
                    <div className={styles.newcontent}>
                        {newContentButtons}
                    </div>
                </div>
            </Card>
            <Card className={styles.secondary}>
                <h2>What are dashboards?</h2>
                <p>Dashboards help you quickly create, edit and review content
                    that belong to a group.
                </p>
            </Card>
        </Fragment>
    )
}
export default Panels