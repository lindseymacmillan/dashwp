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
                <h1>Testing</h1>
            </Paper>
        </Fragment>
    )
}
export default General