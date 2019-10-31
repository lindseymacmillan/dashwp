import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePostType } from '../../../../../screens/options/redux/actions/postTypesActions'
const { Button, TextControl, ToggleControl } = wp.components

import styles from './style.css'

const EditModal = () => {

    const dispatch = useDispatch()
    const source = useSelector(state => state.postTypes.modal.source)

    const [name, setName] = useState(source.object.labels.singular_name);
    const [pluralName, setPluralName] = useState(source.object.labels.name);
    const [showInMenu, setShowInMenu] = useState(source.object.show_in_menu);

    return(
        <div>
            <TextControl 
                className={styles.textcontrol} 
                label='Name'
                value={name}
                onChange={(val) => setName(val)}
            />
            <TextControl 
                className={styles.textcontrol} 
                label='Plural Name'
                value={pluralName}
                onChange={(val) => setPluralName(val)}
            />
            <div className={styles.actions}>
                <ToggleControl 
                    checked={showInMenu}
                    label='Show in menu'
                    className={styles.togglecontrol}
                    onChange={() => setShowInMenu(!showInMenu)}
                />
                <Button 
                    isPrimary 
                    onClick={() => dispatch(updatePostType({
                        id: source.id, 
                        name: name, 
                        pluralName: pluralName, 
                        showInMenu: showInMenu}))}
                    >
                        Update
                </Button>
            </div>
        </div>
    )
}
export default EditModal