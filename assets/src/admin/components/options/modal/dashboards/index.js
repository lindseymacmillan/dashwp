import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { closeDashboardsModal, toggleDashboardsGoTo, createDashboard, updateDashboard, deleteDashboard, runContentQuery } from '../../../../screens/options/redux/actions/dashboardsActions'
import { queryPostTypes } from '../../../../screens/options/redux/actions/postTypesActions'
import { StylesContext } from '@material-ui/styles/StylesProvider'
const { Modal, Button, TextControl, TextareaControl, ToggleControl, SelectControl } = wp.components
const { Fragment } = wp.element

import EditModal from './edit-modal'

import styles from './style.css'


const DashboardsModal = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.dashboards.modal.isOpen)
    const goTo = useSelector(state => state.dashboards.modal.goTo)
    const mode = useSelector(state => state.dashboards.modal.mode)
    const dashboard = useSelector(state => state.dashboards.modal.dashboard)
    const postTypes = useSelector(state => state.postTypes.postTypes)
    
    useEffect(() => {
        // Update the document title using the browser API
        dispatch(queryPostTypes());
    }, []);

    console.log(mode);
    let title;
    let Content;
    switch (mode) {
        case 'new':
            title = 'New Dashboard'
            Content = () => {
                const [name, setName] = useState('');
                const [description, setDescription] = useState('');

                return(
                    <Fragment>
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
                        <div className={styles.actions}>
                            <ToggleControl 
                                checked={goTo}
                                label='Go to dashboard'
                                className={styles.togglecontrol}
                                onChange={(val) => dispatch(toggleDashboardsGoTo(val))}
                            />
                            <Button isPrimary onClick={() => dispatch(createDashboard({name: name, description: description, goTo: goTo}))}>Create</Button>
                        </div>
                    </Fragment>
                )
            }
            break;
        case 'help':
            title = 'Dashboards Help'
            Content = () => {
                return(
                    <Fragment>
                        <Button isDefault>Did this help?</Button>
                    </Fragment>
                )
            }
            break;
        case 'edit':

            dispatch(runContentQuery())
            
            title = 'Dashboard Settings'
            Content = () => {
                return (
                    <EditModal />
                )
            }
            break;
        case 'delete':
            title = 'Delete Dashboard'
            Content = () => {
                return(
                    <Fragment>
                        <Button isPrimary onClick={() => dispatch(deleteDashboard({id: dashboard.id}))}>Delete</Button>
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
                    onRequestClose={ () => dispatch(closeDashboardsModal()) }>
                    <Content />
                </Modal>
            )}
        </Fragment>
    )
}
export default DashboardsModal