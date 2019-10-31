import Paper from '@material-ui/core/Paper'
import FieldType from './field-type'
import styles from './style.css'

const Bin = () => {

    const fieldTypes = [
        {
            type: 'text',
            label: 'Text',
            action: 'dwp_title'
        },
        {
            type: 'textarea',
            label: 'Textarea',
            action: 'dwp_excerpt'
        },
        {
            type: 'toggle',
            label: 'Toggle Control',
            action: 'meta',
            key: ''
        },
        {
            type: 'media',
            label: 'Media',
            action: 'meta',
            key: ''
        }
    ]

    const fields = fieldTypes.map((type, index) => {
        return (
            <FieldType field={type} />
        )
    })

    return (
        <div className={styles.bin}>
            <div className={styles.header}>
                Field Types
            </div>
            <div className={styles.list}>
                {fields}
            </div>
        </div>
    )
}
export default Bin