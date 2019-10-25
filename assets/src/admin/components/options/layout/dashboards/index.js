import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { openDashboardsModal, queryDashboards } from '../../../../screens/options/redux/actions/dashboardsActions'
import Paper from '@material-ui/core/Paper';
import Card from '../../../card'
import CardHeader from '@material-ui/core/CardHeader';
const { Button } = wp.components
const { Fragment } = wp.element
import styles from './style.css'

const General = () => {
    const dispatch = useDispatch()
    const dashboards = useSelector(state => state.dashboards.dashboards)

    useEffect(() => {
        dispatch(queryDashboards());
    }, [])

    console.log(dashboards);

    const cards = dashboards.map((dashboard, index) =>
        <Card 
            width={3}
            title={dashboard.name}
            excerpt={dashboard.description}
            actions={(
                <div>
                    <Button isPrimary className={styles.cardbutton} onClick={() => dispatch(openDashboardsModal({mode: 'edit', dashboard: dashboard}))}>Settings</Button>
                    <Button isDefault className={styles.cardbutton} onClick={() => dispatch(openDashboardsModal({mode: 'delete', dashboard: dashboard}))}>Delete</Button>
                </div>
            )}
            />
    )

    return (
        <Fragment>
            <Paper className={styles.header}>
                <div>
                    <h2>Dashboards</h2>
                    <h3>Manage types of content on your site</h3>
                </div>
                <div>
                    <Button isDefault className={styles.button} onClick={() => dispatch(openDashboardsModal({mode: 'help'}))}>Help</Button>
                    <Button isPrimary className={styles.button} onClick={() => dispatch(openDashboardsModal({mode: 'new'}))}>New Dashboard</Button>
                </div>
            </Paper>
            {cards}
        </Fragment>
    )
}
export default General