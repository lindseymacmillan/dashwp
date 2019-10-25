import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../../screens/dashboard/redux/actions/interface'
import Card from '@material-ui/core/Card';
const { Button } = wp.components
const { Fragment } = wp.element
import styles from './style.css'

const Panels = () => {
    const dispatch = useDispatch()
    const supportedTypeObjects = useSelector(state => state.interface.supportedTypeObjects)
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
                    <p>This is a test!</p>
                    <Button isPrimary isLarge>Edit show</Button>
                </div>
                <div>
                    <h3 className={styles.newheader}>Create content</h3>
                    <div className={styles.newcontent}>
                        {newContentButtons}
                    </div>
                </div>
            </Card>
            <Card className={styles.secondary}>
                <h2>Testing</h2>
            </Card>
        </Fragment>
    )
}
export default Panels