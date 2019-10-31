import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal, toggleGoTo } from '../../../screens/dashboard/redux/actions/interface'
import { setContentFields, deleteContent, runContentQuery } from '../../../screens/dashboard/redux/actions/content'
import ContentFields from '../content-fields'
import { StylesContext } from '@material-ui/styles/StylesProvider'
const { Modal, Button, ToggleControl, TextControl, TextareaControl } = wp.components
const { Fragment } = wp.element

import SettingsModal from './settings-modal'

import styles from './style.css'

const DashboardModal = () => {

    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.interface.modal.isOpen)
    const mediaLibraryIsOpen = useSelector(state => state.interface.modal.mediaLibraryIsOpen)
    const mode = useSelector(state => state.interface.modal.mode)
    const source = useSelector(state => state.interface.modal.source)
    const queryType = useSelector(state => state.query.type)

    let title
    let Content
    switch (mode) {
        case 'new':
            dispatch(setContentFields({postType: source.name}))

            title = 'New'
            Content = () => {
                return (
                    <div>
                        <ContentFields />
                    </div>
                )
            }
            break;
        case 'edit':
            dispatch(setContentFields({postType: source.post_type}))
            //dispatch(getContentFieldValues({fields: contentFields, id: source.ID}))
            title = 'Edit'
            Content = () => {
                return (
                    <div>
                        <ContentFields />
                    </div>
                )
            }
            break;
        case 'delete':
            title = 'Delete'
            Content = () => {
                return (
                    <Button 
                        isPrimary
                        onClick={() => dispatch(deleteContent({
                            id: source.ID, 
                            queryType: queryType
                        }))}
                        >Delete</Button>
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
            dispatch(runContentQuery())
            title = 'Dashboard Settings'
            Content = () => {
                return (
                    <SettingsModal />
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
                    onRequestClose={
                        mediaLibraryIsOpen === false ?
                        () => dispatch(closeModal()) : null
                    }>
                    <Content />
                </Modal>
            )}
        </Fragment>
    )
}
export default DashboardModal