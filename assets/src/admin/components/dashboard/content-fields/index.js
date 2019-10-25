import { useDispatch, useSelector } from 'react-redux'
import { setContentFieldValue, createContent } from '../../../screens/dashboard/redux/actions/content'
import { toggleGoTo } from '../../../screens/dashboard/redux/actions/interface'
import Field from '../../field'
const { Button, ToggleControl } = wp.components
const { Fragment } = wp.element

import styles from './style.css'

const ContentFields = (props) => {
    const dispatch = useDispatch()
    const goTo = useSelector(state => state.interface.modal.goTo)
    const source = useSelector(state => state.interface.modal.source)
    const contentFields = useSelector(state => state.interface.modal.fields)

    const fields = contentFields.map((field, index) => {
        return (
            <Field 
                type={field.type}
                label={field.label}
                value={field.value}
                onChange={(val) => dispatch(setContentFieldValue({index: index, value: val}))}/>
        )
    })

    return (
        <Fragment>
            {fields}
            <div className={styles.actions}>
                <ToggleControl checked={goTo} onChange={() => dispatch(toggleGoTo())} className={styles.togglecontrol} label={'Go to ' + source.labels.singular_name.toLowerCase()} />
                <Button isPrimary onClick={() => dispatch(createContent({fields: contentFields, postType: source.name, dashboard_id: dwp_data.id}))}>Create</Button>
            </div>
        </Fragment>
    )
}
export default ContentFields