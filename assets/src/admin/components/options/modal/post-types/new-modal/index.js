import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPostType } from '../../../../../screens/options/redux/actions/postTypesActions'
const { Button, TextControl, ToggleControl } = wp.components

import styles from './style.css'

const NewModal = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [pluralName, setPluralName] = useState('');
    const [showInMenu, setShowInMenu] = useState(false);

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
                <Button isPrimary onClick={() => dispatch(createPostType({name: name, pluralName: pluralName, showInMenu: showInMenu}))}>Create</Button>
            </div>
        </div>
    )
}
export default NewModal