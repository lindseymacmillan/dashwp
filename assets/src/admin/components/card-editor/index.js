import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
const { Button, IconButton, ToggleControl } = wp.components
const { Fragment } = wp.element
import FieldType from './field-type'
import FieldDrop from './field-drop'
import FieldInspector from './field-inspector'
import Paper from '@material-ui/core/Paper'
import { updatePostType } from '../../screens/options/redux/actions/postTypesActions'

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import styles from './style.css'
const CardEditor = () => {
    const dispatch = useDispatch()
    const postType = useSelector(state => state.postTypes.modal.postType)
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.editor}>
                <div className={styles.bin}>
                    <div className={styles.fieldheader}>
                        Add Field Types
                    </div>
                    <div className={styles.fieldlist}>
                        <FieldType label='Text' type='text' />
                        <FieldType label='Textarea' type='textarea' />
                        <FieldType label='Toggle Control' type='toggle' />
                    </div>
                </div>
                <div className={styles.stage}>
                    <Paper className={styles.canvas}>
                        <div className={styles.cardheader}>
                            <h3>{'Edit ' + postType.object.labels.singular_name}</h3>
                            <IconButton disabled icon='no-alt'/>
                        </div>
                        <div className={styles.cardcontent}>
                            <FieldDrop />
                        </div>
                        <div className={styles.cardactions}>
                            <ToggleControl
                                className={styles.togglecontrol}
                                label={'Go to ' + postType.object.labels.singular_name.toLowerCase()}
                            />
                            <Button isPrimary disabled>Update</Button>
                        </div>
                    </Paper>
                </div>
                <div className={styles.inspector}>
                    <FieldInspector />
                </div>
                <div className={styles.actions}>
                    <Button isPrimary onClick={() => dispatch(updatePostType({id: postType.id, cardFields: postType.card_fields}))}>Update</Button>
                </div>
            </div>
        </DndProvider>
    )
}

export default CardEditor