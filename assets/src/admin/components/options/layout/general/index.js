import Paper from '@material-ui/core/Paper';
const { Fragment } = wp.element
import styles from './style.css'

const General = () => {
    return (
        <Fragment>
            <Paper className={styles.header}>
                <h2>General</h2>
            </Paper>
            <Paper className={styles.paper}>
                <h1>Welcome!</h1>
                <h3>You are using a prerelease version of DashWP.</h3>
                <p>For the most part, functionality has been roughed out, and is now in the process of being expanded. <br />
                You may notice some spaces that seem under developed (like this) or just plain buggy. Expect this! <br />
                The general tab will eventually be home to a content overview and presets/wizards for quickly building out your site's content architecture.</p>
            </Paper>
        </Fragment>
    )
}
export default General