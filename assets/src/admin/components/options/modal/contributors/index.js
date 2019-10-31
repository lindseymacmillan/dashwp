import { useSelector, useDispatch } from 'react-redux'
import { closeContributorsModal } from '../../../../screens/options/redux/actions/contributorsActions'
const { Modal, Button } = wp.components
const { Fragment } = wp.element

import NewModal from './new-modal'
import EditModal from './edit-modal'
import DeleteModal from './delete-modal'

const ContributorsModal = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.contributors.modal.isOpen)
    const mode = useSelector(state => state.contributors.modal.mode)
    const source = useSelector(state => state.contributors.modal.source)

    console.log(mode);
    let title;
    let Content;
    switch (mode) {
        case 'new':
            title = 'New Contributor'
            Content = () => {
                return(
                    <NewModal />
                )
            }
            break;
        case 'edit':
            title = 'Edit Contributor'
            Content = () => {
                return(
                    <EditModal />
                )
            }
            break;
        case 'delete':
            title = 'Delete Contributor'
            Content = () => {
                return(
                    <DeleteModal />
                )
            }
            break;
        case 'help':
            title = 'Contributors Help'
            Content = () => {
                return(
                    <Fragment>
                        <Button isDefault>Did this help?</Button>
                    </Fragment>
                )
            }
            break;
    }

    return (
        <Fragment>
            { isOpen && (
                <Modal
                    title={title}
                    onRequestClose={ () => dispatch(closeContributorsModal()) }>
                    <Content />
                </Modal>
            )}
        </Fragment>
    )
}
export default ContributorsModal