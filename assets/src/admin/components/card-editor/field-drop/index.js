import { useSelector, useDispatch } from 'react-redux'
import Field from '../../field'
import FieldBlock from '../field-block'
const { Fragment } = wp.element
import { useDrop } from 'react-dnd'
import { addPostTypeCardField } from '../../../screens/options/redux/actions/postTypesActions'

import styles from './style.css'

const FieldDrop = () => {
    const dispatch = useDispatch()
    const postType = useSelector(state => state.postTypes.modal.postType)

    const [collectedProps, drop] = useDrop({
        accept: 'field',
        drop: (item) => dispatch(addPostTypeCardField({label: item.label, type: item.field_type, action: item.field_action}))
    })

    const fields = postType.card_fields.map((field, index) => {
        return (
            <FieldBlock label={field.label} type={field.type} action={field.action} index={index}/>
        )
    })

    return (
        <div ref={drop}>
            {fields}
        </div>
    )
}
export default FieldDrop