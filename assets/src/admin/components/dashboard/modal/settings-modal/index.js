import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateDashboard } from '../../../../screens/dashboard/redux/actions/interface'
const { Button, TextControl, TextareaControl, SelectControl, ToggleControl } = wp.components

import styles from './style.css'

const EditModal = () => {

    const dispatch = useDispatch()

    const source = {
        name: useSelector(state => state.interface.name),
        description: useSelector(state => state.interface.description),
        supported_types: useSelector(state => state.interface.supportedTypes),
        linked_content: useSelector(state => state.interface.linkedContent)

    }
    const goTo = useSelector(state => state.interface.modal.goTo)
    const postTypes = useSelector(state => state.interface.postTypes)
    const contentQuery = useSelector(state => state.interface.contentOptions)

    const [name, setName] = useState(source.name);
    const [description, setDescription] = useState(source.description);
    const [supportedPostTypes, setSupportedPostTypes] = useState(source.supported_types);
    const [linkedContent, setLinkedContent] = useState(source.linked_content.id);
    
    console.log('post types!', supportedPostTypes)

    const postTypeControls = postTypes.map((postType) => {
        
        const isSupported = supportedPostTypes.includes(postType.name) ? true : false
        return (
            <ToggleControl
                className={styles.typetoggle}
                checked={isSupported}
                label={postType.object.labels.singular_name}
                onChange={(val) => {
                    let supported = supportedPostTypes.slice(0)
                    if (val == true) {
                        supported.push(postType.name)
                        setSupportedPostTypes(supported)
                    } else {
                        const indexOf = supported.indexOf(postType.name)
                        supported.splice(indexOf, 1)
                        setSupportedPostTypes(supported)
                    }
                }}
                />
        )
    });

    return(
        <div>
            <div className={styles.content}>
                <div>
                    <TextControl 
                        className={styles.textcontrol} 
                        label='Name'
                        value={name}
                        onChange={(val) => setName(val)}
                    />
                    <TextareaControl 
                        className={styles.textareacontrol} 
                        label='Description'
                        value={description}
                        onChange={(val) => setDescription(val)}
                    />
                    <SelectControl
                        label="Linked Content"
                        value={ linkedContent }
                        options={ contentQuery }
                        onChange={ ( val ) => { setLinkedContent( val ) } }
                    />
                </div>
                <div className={styles.supported}>
                    <p className={styles.typeheader}>Supported Post Types</p>
                    {postTypeControls}
                </div>
            </div>
            <div className={styles.actions}>
                <Button 
                    isPrimary 
                    onClick={() => dispatch(updateDashboard({
                        id: source.id, 
                        name: name, 
                        description: description, 
                        linkedContent: linkedContent,
                        supportedTypes: supportedPostTypes}))}>
                    Update
                </Button>
            </div>
        </div>
    )
}
export default EditModal