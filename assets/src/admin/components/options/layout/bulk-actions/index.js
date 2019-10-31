import Paper from '@material-ui/core/Paper';
const { Fragment } = wp.element
import styles from './style.css'

const General = () => {
    return (
        <Fragment>
            <Paper className={styles.header}>
                <h2>Bulk Actions</h2>
            </Paper>
            <Paper className={styles.paper}>
                <h1>What are bulk actions?</h1>
                <h3>This page is under development.</h3>
                <p>Bulk actions will be used to quickly convert post types, taxonomies, and authors to make your transition to DashWP as seamless as possible.</p>
            </Paper>
        </Fragment>
    )
}
export default General