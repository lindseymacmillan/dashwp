import { useSelector, useDispatch } from 'react-redux'
import { movePostTypeCardField, deletePostTypeCardField } from '../../../screens/options/redux/actions/postTypesActions'
const { TextControl, TextareaControl, SelectControl, ButtonGroup, Button } = wp.components
const { Fragment } = wp.element

import styles from './style.css'

const FieldInspector = () => {
    const activeField = useSelector(state => state.postTypes.modal.activeField)
    const dispatch = useDispatch()

    const Form = (props) => {
        let options = [
            { label: 'Meta Key', value: 'meta' },
            { label: 'Eval', value: 'eval' },
        ]

        if (props.defaults) {
            options = props.defaults.concat(options)
        }

        return (
            <Fragment>
                <TextControl
                    label='Label'
                    value={props.label} 
                    />
                <SelectControl
                    label='Action Type'
                    value={props.action}
                    options={options}
                    />
            </Fragment>
        )
    }

    const Actions = () => {
        return (
            <div className={styles.actions}>
                <ButtonGroup>
                    <Button isDefault onClick={() => dispatch(movePostTypeCardField({from: activeField.index, to: activeField.index -1}))}>Up</Button>
                    <Button isDefault onClick={() => dispatch(movePostTypeCardField({from: activeField.index, to: activeField.index + 1}))}>Down</Button>
                </ButtonGroup>
                <Button isPrimary onClick={() => dispatch(deletePostTypeCardField({index: activeField.index}))}>Remove</Button>
            </div>
        )
    }
    let title
    let Content

    switch (activeField.type) {
        case 'text':
            title='Field Settings'
            Content = () => {
                return (
                    <Fragment>
                        <Form
                            label={activeField.label}
                            action={activeField.action}
                            defaults={[{label: 'Update Title', value: 'dwp_title'}]}
                            />
                        <Actions />
                    </Fragment>
                )
            }
            break;
        case 'textarea':
            title='Field Settings'
            Content = () => {
                return (
                    <Fragment>
                        <Form 
                            label={activeField.label} 
                            action={activeField.action} 
                            defaults={[{label: 'Update Excerpt', value: 'dwp_excerpt'}]}
                            />
                        <Actions />
                    </Fragment>
                )
            }
            break;
        case 'toggle':
            title='Field Settings'
            Content = () => {
                return (
                    <Fragment>
                        <Form label={activeField.label} action={activeField.action} />
                        <Actions />
                    </Fragment>
                )
            }
            break;
        default:
            title = 'No field selected.'
            Content = () => {
                return (
                    <p>Click on a field to make changes.</p>
                )
            }
    }

    return (
        <div className={styles.inspector}>
            <div className={styles.header}>{title}</div>
            <div className={styles.content}>
                <Content />
            </div>
        </div>
    )
}
export default FieldInspector