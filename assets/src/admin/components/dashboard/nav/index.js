import { useSelector, useDispatch } from 'react-redux'
import { setQueryString } from '../../../screens/dashboard/redux/actions/query'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Filters from '../filters'
import Views from '../views'
import styles from './style.css'

const { Button, Icon, TextControl } = wp.components;

const Nav = () => {

    const dispatch = useDispatch()
    const queryString = useSelector(state => state.query.string)

    return(
        <div className={styles.nav}>
            <Paper className={styles.paper}>
                <div className={styles.menu}>
                    <Filters />
                    <Views />
                </div>
                <div className={styles.search}>
                    <TextControl className={styles.searchbar} value={queryString} onChange={(val) => dispatch(setQueryString(val))} />
                    <Button isDefault className={styles.searchbutton}>Search</Button>
                </div>
            </Paper>
        </div>
    )
}
export default Nav