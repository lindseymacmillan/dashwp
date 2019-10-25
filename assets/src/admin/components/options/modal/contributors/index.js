import { useSelector, useDispatch } from 'react-redux'
import { closeContributorsModal } from '../../../../screens/options/redux/actions/contributorsActions'
const { Modal, Button } = wp.components
const { Fragment } = wp.element

const ContributorsModal = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.contributors.modal.isOpen)
    const mode = useSelector(state => state.contributors.modal.mode)

    console.log(mode);
    let title;
    let Content;
    switch (mode) {
        case 'new':
            title = 'New Contributor'
            Content = () => {
                return(
                    <Fragment>
                        <Button isDefault>Did this work?</Button>
                    </Fragment>
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