import Paper from '@material-ui/core/Paper'
import Field from '../../field'
import { useDrag } from 'react-dnd'

import styles from './style.css'

const FieldType = (props) => {
    const [collectedProps, drag] = useDrag({
        item: { type: 'field', label: props.label, field_type: props.type, field_action: 'meta' },
        begin: () => console.log('dragging!')
    })
    return(
        <Paper ref={drag} className={styles.fieldtype}>
            <div className={styles.overlay}/>
            <div className={styles.field}>
                <Field label={props.label} type={props.type} />
            </div>
        </Paper>
    )
}
export default FieldType;