import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Filters from '../filters'
import styles from './style.css'

const { Button, Icon, TextControl } = wp.components;

const Nav = () => {

    return(
        <div className={styles.nav}>
            <Paper className={styles.paper}>
                <div className={styles.menu}>
                    <Filters />
                    <div>
                        <Button isTertiary className={styles.iconbutton}>
                            <Icon icon="grid-view" />
                        </Button>
                        <Button isTertiary className={styles.iconbutton}>
                            <Icon icon="excerpt-view" />
                        </Button>
                        <Button isTertiary className={styles.iconbutton}>
                            <Icon icon="calendar" />
                        </Button>
                        <Button isTertiary className={styles.iconbutton}>
                            <Icon icon="feedback" />
                        </Button>
                    </div>
                </div>
                <div className={styles.search}>
                    <TextControl className={styles.searchbar}/>
                    <Button isDefault className={styles.searchbutton}>Search</Button>
                </div>
            </Paper>
        </div>
    )
}
export default Nav