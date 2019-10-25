import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress';
import Img from 'react-image'
import styles from './style.css'
import { style } from '@material-ui/system'

const Card = (props) => {
    const Spinner = () => {
        return (
            <div className={styles.spinner}>
                <CircularProgress />
            </div>
        )
    }
    return (
        <Paper style={{gridColumn: 'span ' + props.width}} className={styles.card}>
            <div className={styles.media}>
                <Img 
                    src={props.img}
                    loader={<Spinner />}
                    />
            </div>
            <div className={styles.header}>
                {props.title}
            </div>
            <div className={styles.content}>
                {props.excerpt}
            </div>
            <div className={styles.actions}>
                {props.actions}
            </div>
        </Paper>
    )
}
export default Card