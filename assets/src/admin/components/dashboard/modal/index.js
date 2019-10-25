import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal, toggleGoTo } from '../../../screens/dashboard/redux/actions/interface'
import { setContentFields, createContent } from '../../../screens/dashboard/redux/actions/content'
import ContentFields from '../content-fields'
import { StylesContext } from '@material-ui/styles/StylesProvider'
const { Modal, Button, ToggleControl } = wp.components
const { Fragment } = wp.element

import styles from './style.css'

const DashboardModal = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.interface.modal.isOpen)
    const goTo = useSelector(state => state.interface.modal.goTo)
    const mode = useSelector(state => state.interface.modal.mode)
    const source = useSelector(state => state.interface.modal.source)

    let title
    let Content
    switch (mode) {
        case 'new':
            dispatch(setContentFields({postType: source.name}))
            
            title = 'New'
            Content = () => {
                console.log('test!')
                return (
                    <div>
                        <ContentFields />
                    </div>
                )
            }
            break;
        case 'edit':
            title = 'Edit'
            Content = () => {
                return (
                    <p>This is some content.</p>
                )
            }
            break;
        case 'delete':
            title = 'Delete'
            Content = () => {
                return (
                    <p>This is some content.</p>
                )
            }
            break;
        case 'help':
            title = 'Help'
            Content = () => {
                return (
                    <p>This is some content.</p>
                )
            }
            break;
        case 'settings':
            title = 'Settings'
            Content = () => {
                return (
                    <p>This is some content.</p>
                )
            }
            break;
        default:
            title = 'Error'
            Content = () => {
                return (
                    <p>Something went wrong. No modal mode found in state.</p>
                )
            }
    }
    return (
        <Fragment>
            {isOpen && (
                <Modal 
                    title={ title }
                    onRequestClose={ () => dispatch(closeModal()) }>
                    <Content />
                </Modal>
            )}
        </Fragment>
    )
}
export default DashboardModal