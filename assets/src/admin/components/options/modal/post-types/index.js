import { useSelector, useDispatch } from 'react-redux'
import { closePostTypesModal } from '../../../../screens/options/redux/actions/postTypesActions'
const { Modal } = wp.components
const { Fragment } = wp.element

import NewModal from './new-modal'
import EditModal from './edit-modal'
import CardEditor from './card-editor'
import DeleteModal from './delete-modal'
import HelpModal from './help-modal'


import styles from './style.css'

const PostTypesModal = () => {

    const dispatch = useDispatch()

    const isOpen = useSelector(state => state.postTypes.modal.isOpen)
    const mode = useSelector(state => state.postTypes.modal.mode)

    console.log(mode);
    let title;
    let Content;
    switch (mode) {
        case 'new':
            title = 'New Post Type'
            Content = () => {
                return (
                    <NewModal />
                )
            }
            break;
        case 'edit':
            title = 'Post Type Settings'
            Content = () => {
                return (
                    <EditModal />
                )
            }
            break;
        case 'card_editor':
            title = 'Card Editor'
            Content = () => {
                return (
                    <CardEditor />
                )
            }
            break;
        case 'delete':
            title = 'Delete'
            Content = () => {
                return (
                    <DeleteModal />
                )
            }
            break;
        case 'help':
            title = 'Help'
            Content = () => {
                return (
                    <HelpModal />
                )
            }
            break;
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