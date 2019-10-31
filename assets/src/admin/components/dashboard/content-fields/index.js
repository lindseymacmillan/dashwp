import { shallowEqual, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setContentFields, setContentFieldValue, getContentFieldValues, createContent, updateContent } from '../../../screens/dashboard/redux/actions/content'
import { toggleGoTo } from '../../../screens/dashboard/redux/actions/interface'
import Field from '../../field'
const { Button, ToggleControl } = wp.components
const { Fragment } = wp.element

import styles from './style.css'

const ContentFields = (props) => {
    const dispatch = useDispatch()

    const mode = useSelector(state => state.interface.modal.mode)
    const source = useSelector(state => state.interface.modal.source)
    const goTo = useSelector(state => state.interface.modal.goTo)
    const contentFields = useSelector(state => state.interface.modal.fields)
    const queryType = useSelector(state => state.query.type)

    const fields = contentFields.map((field, index) => {
        return (
            <Field 
                type={field.type}
                label={field.label}
                value={field.value}
                onChange={(val) => dispatch(setContentFieldValue({index: index, value: val}))}/>
        )
    })

    const ActionButton = () => {
        switch (mode) {
            case 'new':
                return (
                    <Button 
                        isPrimary 
                        onClick={() => dispatch(createContent({
                            fields: contentFields, 
                            postType: source.name, 
                            dashboard_id: dwp_data.id,
                            queryType: queryType
                        }))}>
                            Create
                    </Button>
                )
            case 'edit':
                return (
                    <Button 
                        isPrimary 
                        onClick={() => dispatch(updateContent({
                            fields: contentFields, 
                            id: source.ID, 
                            queryType: queryType
                        }))}>
                            Update
                    </Button>
                )
        }
    }

    return (
        <Fragment>
            {fields}
            <div className={styles.actions}>
                <ToggleControl checked={goTo} onChange={() => dispatch(toggleGoTo())} className={styles.togglecontrol} label={'Go to'} />
                <ActionButton />
            </div>
        </Fragment>
    )
}
export default ContentFields