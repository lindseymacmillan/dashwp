import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateDashboard } from '../../../../../screens/options/redux/actions/dashboardsActions'
const { Button, TextControl, TextareaControl, SelectControl, ToggleControl } = wp.components

import styles from './style.css'

const EditModal = () => {

    const dispatch = useDispatch()

    const source = useSelector(state => state.dashboards.modal.source)
    const goTo = useSelector(state => state.dashboards.modal.goTo)
    const postTypes = useSelector(state => state.postTypes.postTypes)
    const contentQuery = useSelector(state => state.dashboards.contentQuery)

    const [name, setName] = useState(source.name);
    const [description, setDescription] = useState(source.description);
    const [supportedPostTypes, setSupportedPostTypes] = useState(source.supported_types);
    const [linkedContent, setLinkedContent] = useState(source.linked_content.id);
    
    console.log('post types!', postTypes)

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
                <ToggleControl 
                    checked={goTo}
                    label='Go to dashboard'
                    className={styles.togglecontrol}
                    onChange={(val) => dispatch(toggleDashboardsGoTo(val))}
                />
                <Button 
                    isPrimary 
                    onClick={() => dispatch(updateDashboard({
                        id: source.id, 
                        name: name, 
                        description: description, 
                        linkedContent: linkedContent,
                        supportedPostTypes: supportedPostTypes,
                        goTo: goTo}))}>
                    Update
                </Button>
            </div>
        </div>
    )
}
export default EditModal