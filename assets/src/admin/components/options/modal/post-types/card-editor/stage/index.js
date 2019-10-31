import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { addContentField, setActiveField } from '../../../../../../screens/options/redux/actions/postTypesActions'
import Paper from '@material-ui/core/Paper'
import Field from '../../../../../field'
const { Button, IconButton, ToggleControl } = wp.components

import styles from './style.css'

const Stage = () => {

    const dispatch = useDispatch()
    const contentFields = useSelector(state => state.postTypes.cardEditor.contentFields)

    const [collectedProps, drop] = useDrop({
        accept: 'field',
        drop: (item) => {
            dispatch(addContentField({field: item.field}))
        }
    })

    const fields = contentFields.map((field, index) => {
        console.log('field!', field)
        return (
            <div key={index} className={styles.field} onClick={() => dispatch(setActiveField({index: index, field: field}))}>
                <Field type={field.type} label={field.label} />
            </div>
        )
    })

    return (
        <div className={styles.stage}>
            <Paper ref={drop} className={styles.canvas}>
                <div className={styles.header}>
                    <h3>Edit</h3>
                    <IconButton icon='no-alt' />
                </div>
                <div className={styles.fields}>
                    {fields}
                </div>
                <div className={styles.actions}>
                    <ToggleControl label='Go to' className={styles.togglecontrol} />
                    <Button isPrimary>Create</Button>
                </div>
            </Paper>
        </div>
    )
}
export default Stage