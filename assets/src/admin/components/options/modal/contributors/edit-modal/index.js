import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateContributor } from '../../../../../screens/options/redux/actions/contributorsActions'
const { Button, TextControl, TextareaControl } = wp.components

import styles from './style.css'

const EditModal = () => {

    const dispatch = useDispatch()
    const source = useSelector(state => state.contributors.modal.source)
    const [name, setName] = useState(source.name);
    const [bio, setBio] = useState(source.description);

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
                <Button isPrimary onClick={() => dispatch(updateContributor({id: source.term_id, name: name, bio: bio}))}>Update</Button>
            </div>
        </div>
    )
}
export default EditModal