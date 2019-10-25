import { useDispatch } from 'react-redux'
import { setPostTypeCardActiveField } from '../../../screens/options/redux/actions/postTypesActions'
import Field from '../../field'
import styles from './style.css'

const FieldBlock = (props) => {
    const dispatch = useDispatch()
    return (
        <div className={styles.fieldblock}>
            <div className={styles.overlay} onClick={() => dispatch(setPostTypeCardActiveField(props))}/>
            <div className={styles.field}>
                <Field label={props.label} type={props.type} />
            </div>
        </div>
    )
}
export default FieldBlock