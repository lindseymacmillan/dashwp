import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { openPostTypesModal, queryPostTypes } from '../../../../screens/options/redux/actions/postTypesActions'
import Paper from '@material-ui/core/Paper'
import Card from '../../../card'
const { Button } = wp.components
const { Fragment } = wp.element
import styles from './style.css'

const General = () => {
    const dispatch = useDispatch()
    const postTypes = useSelector(state => state.postTypes.postTypes)

    useEffect(() => {
        dispatch(queryPostTypes());
    }, [])

    console.log(postTypes);

    const cards = postTypes.map((postType, index) => {
        return (
            <Card 
                width={2}
                title={postType.object.labels.singular_name}
                excerpt={postType.object.description}
                actions={(
                    <Fragment>
                        <div>
                            <Button isPrimary className={styles.cardbutton} onClick={() => dispatch(openPostTypesModal({mode: 'settings', postType: postType}))}>Settings</Button>
                            <Button isDefault className={styles.cardbutton} onClick={() => dispatch(openPostTypesModal({mode: 'quick_card', postType: postType}))}>Card Editor</Button>
                        </div>
                        <Button isDefault disabled={!postType.custom} onClick={() => dispatch(openPostTypesModal({mode: 'delete', postType: postType}))}>Delete</Button>
                    </Fragment>
                )}
            />
        )
    })

    return (
        <Fragment>
            <Paper className={styles.header}>
                <div>
                    <h2>Post Types</h2>
                    <h3>Manage types of content on your site</h3>
                </div>
                <div>
                    <Button isDefault className={styles.button} onClick={() => dispatch(openPostTypesModal({mode: 'help'}))}>Help</Button>
                    <Button isPrimary className={styles.button} onClick={() => dispatch(openPostTypesModal({mode: 'new', postType: null}))}>New Post Type</Button>
                </div>
            </Paper>
            {cards}
        </Fragment>
    )
}
export default General