import { useSelector, useDispatch } from 'react-redux'
import Paper from '@material-ui/core/Paper'
const { Button, ButtonGroup, TextControl, TextareaControl, SelectControl } = wp.components

import styles from './style.css'
import { updateContentField, moveContentField, removeContentField } from '../../../../../../screens/options/redux/actions/postTypesActions'

const Inspector = () => {
    
    const dispatch = useDispatch()

    const activeField = useSelector(state => state.postTypes.cardEditor.activeField)
    const activeIndex = useSelector(state => state.postTypes.cardEditor.activeIndex)
    let controls
    let actionControls

    if (!activeField) {

        controls = [
            <div>
                <p>Select a field to edit.</p>
            </div>
        ]

    } else {

        let options = [
            {
                label: 'Meta Key',
                value: 'meta'
            },
            {
                label: 'Eval',
                value: 'eval'
            }
        ]

        switch (activeField.type) {
            case 'text': {
                options.unshift({
                    label: 'Set Title',
                    value: 'dwp_title'
                })
                break;
            }
            case 'textarea': {
                options.unshift({
                    label: 'Set Excerpt',
                    value: 'dwp_excerpt'
                })
                break;
            }
        }

        switch (activeField.action) {
            case 'meta': {
                actionControls = [
                    <TextControl 
                        label='Meta Key Name'
                        value={activeField.key}
                        onChange={(val) => dispatch(updateContentField({index: activeIndex, key: val}))}
                        />
                ]
                break;
            }
            case 'eval': {
                actionControls = [
                    <TextareaControl 
                        label='Save Code'
                        value={activeField.save}
                        onChange={(val) => dispatch(updateContentField({index: activeIndex, save: val}))}
                        />,
                    <TextareaControl 
                        label='Retrieve Code'
                        value={activeField.retrieve}
                        onChange={(val) => dispatch(updateContentField({index: activeIndex, retrieve: val}))}
                        />,
                ]
                break;
            }
            default: {
                actionControls = []
            }
        }

        controls = [
            <div>
                <TextControl 
                    key={activeIndex}
                    label='Label'
                    value={activeField.label}
                    onChange={(val) => dispatch(updateContentField({index: activeIndex, label: val}))}
                />
                <SelectControl 
                    label='Action'
                    value={activeField.action}
                    options={options}
                    onChange={(val) => dispatch(updateContentField({index: activeIndex, action: val}))}
                    />
                {actionControls}
                <div className={styles.actions}>
                    <ButtonGroup>
                        <Button isDefault onClick={() => dispatch(moveContentField({from: activeIndex, to: activeIndex - 1}))}>Up</Button>
                        <Button isDefault onClick={() => dispatch(moveContentField({from: activeIndex, to: activeIndex + 1}))}>Down</Button>
                    </ButtonGroup>
                    <Button isPrimary onClick={() => dispatch(removeContentField({index: activeIndex}))}>Remove</Button>
                </div>
            </div>

        ]

    }

    return (
        <div className={styles.inspector}>
            {controls}
        </div>
    )
}
export default Inspector