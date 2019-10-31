import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { openContributorsModal, queryContributors } from '../../../../screens/options/redux/actions/contributorsActions'
import Paper from '@material-ui/core/Paper'
import Card from '../../../card'
const { Button } = wp.components
const { Fragment } = wp.element
import styles from './style.css'

const General = () => {
    const dispatch = useDispatch()
    const contributors = useSelector(state => state.contributors.contributors)

    useEffect(() => {
        dispatch(queryContributors());
    }, [])

    console.log(contributors);

    const cards = contributors.map((contributor, index) =>
        <Card 
            width={2}
            title={contributor.name}
            excerpt={(
                <p>{contributor.description}</p>
            )}
            actions={(
                <Fragment>
                    <Button isPrimary onClick={() => dispatch(openContributorsModal({mode: 'edit', source: contributor}))}>Edit</Button>
                    <Button isDefault onClick={() => dispatch(openContributorsModal({mode: 'delete', source: contributor}))}>Delete</Button>
                </Fragment>
            )}
        />
    )

    return (
        <Fragment>
            <Paper className={styles.header}>
                <div>
                    <h2>Contributors</h2>
                    <h3>Manage types of content on your site</h3>
                </div>
                <div>
                    <Button isDefault className={styles.button} onClick={() => dispatch(openContributorsModal({mode: 'help'}))}>Help</Button>
                    <Button isPrimary className={styles.button} onClick={() => dispatch(openContributorsModal({mode: 'new'}))}>New Contributor</Button>
                </div>
            </Paper>
            {cards}
        </Fragment>
    )
}
export default General