import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createContributor } from '../../../../../screens/options/redux/actions/contributorsActions'
const { Button, TextControl, TextareaControl } = wp.components

import styles from './style.css'

const NewModal = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    return(
        <div>
            <TextControl 
                className={styles.textcontrol} 
                label='Name'
                value={name}
                onChange={(val) => setName(val)}
            />
            <TextareaControl 
                className={styles.textcontrol} 
                label='Bio'
                value={bio}
                onChange={(val) => setBio(val)}
            />
            <div className={styles.actions}>
                <Button isPrimary onClick={() => dispatch(createContributor({name: name, bio: bio}))}>Create</Button>
            </div>
        </div>
    )
}
export default NewModal