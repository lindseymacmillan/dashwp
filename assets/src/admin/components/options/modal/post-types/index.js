import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { closePostTypesModal, createPostType, updatePostType, deletePostType } from '../../../../screens/options/redux/actions/postTypesActions'
const { Modal, Button, TextControl, TextareaControl, ToggleControl } = wp.components
const { Fragment } = wp.element
import CardEditor from '../../../card-editor'
import Card from '../../../card'

import styles from './style.css'
import { style } from '@material-ui/system'

const PostTypesModal = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.postTypes.modal.isOpen)
    const mode = useSelector(state => state.postTypes.modal.mode)
    const postType = useSelector(state => state.postTypes.modal.postType)

    console.log(mode);
    let title;
    let Content;
    switch (mode) {
        case 'new':
            title = 'New Post Type'
            Content = () => {
                const [name, setName] = useState('');
                const [pluralName, setPluralName] = useState('');
                const [showInMenu, setShowInMenu] = useState(false);

                return(
                    <Fragment>
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
                    </Fragment>
                )
            }
            break;
        case 'settings':
            title = 'Post Type Settings'
            Content = () => {
                const [name, setName] = useState(postType.object.labels.singular_name);
                const [pluralName, setPluralName] = useState(postType.object.labels.name);
                const [showInMenu, setShowInMenu] = useState(postType.object.show_in_menu);

                return(
                    <Fragment>
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
                            <Button isPrimary onClick={() => dispatch(updatePostType({id: postType.id, name: name, pluralName: pluralName, showInMenu: showInMenu}))}>Update</Button>
                        </div>
                    </Fragment>
                )
            }
            break;
        case 'quick_card':
            title = 'Card Editor'
            Content = () => {
                return(
                    <CardEditor />
                )
            }
            break;
        case 'help':
            title = 'Post Types Help'
            Content = () => {
                return(
                    <Fragment>
                        <Button isDefault>Did this help?</Button>
                    </Fragment>
                )
            }
            break;
        case 'delete':
            title = 'Delete Post Type'
            Content = () => {
                return(
                    <Fragment>
                        <Button isPrimary onClick={() => dispatch(deletePostType({id: postType.id}))}>Delete</Button>
                    </Fragment>
                )
            }
    }
    return (
        <Fragment>
            { isOpen && (
                <Modal
                    title={title}
                    onRequestClose={ () => dispatch(closePostTypesModal()) }>
                    <Content />
                </Modal>
            )}
        </Fragment>
    )
}
export default PostTypesModal