import { useDrag } from 'react-dnd'
import Paper from '@material-ui/core/Paper'
import Field from '../../../../../../field'

import styles from './style.css'

const FieldType = (props) => {

    const [collectedProps, drag] = useDrag({
        item: { type: 'field', field: props.field },
        begin: () => {console.log('dragging!')}
    })

    return (
        <Paper ref={drag} className={styles.field}>
            <Field type={props.field.type} label={props.field.label} />
        </Paper>
    )
}
export default FieldType