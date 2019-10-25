import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { closeDashboardsModal, toggleDashboardsGoTo, createDashboard, updateDashboard, deleteDashboard } from '../../../../screens/options/redux/actions/dashboardsActions'
import { queryPostTypes } from '../../../../screens/options/redux/actions/postTypesActions'
import { StylesContext } from '@material-ui/styles/StylesProvider'
const { Modal, Button, TextControl, TextareaControl, ToggleControl } = wp.components
const { Fragment } = wp.element

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
            title = 'Dashboard Settings'
            Content = () => {
                const [name, setName] = useState(dashboard.name);
                const [description, setDescription] = useState(dashboard.description);
                const [supportedPostTypes, setSupportedPostTypes] = useState(dashboard.supported_types);
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
                    <Fragment>
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
                                    id: dashboard.id, 
                                    name: name, 
                                    description: description, 
                                    supportedPostTypes: supportedPostTypes,
                                    goTo: goTo}))}>
                                Update
                            </Button>
                        </div>
                    </Fragment>
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