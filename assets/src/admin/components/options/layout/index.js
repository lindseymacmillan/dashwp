import {useSelector, useDispatch } from 'react-redux'
const { Fragment } = wp.element
import Paper from '@material-ui/core/Paper';
import styles from './style.css'

import General from './general'
import Dashboards from './dashboards'
import PostTypes from './post-types'
import Contributors from './contributors'
import BulkActions from './bulk-actions'

import DashboardsModal from '../modal/dashboards'
import PostTypesModal from '../modal/post-types'
import ContributorsModal from '../modal/contributors'


const Layout = () => {
    const activeLayout = useSelector(state => state.interface.activeLayout)
    const ActiveLayout = () => {
        switch (activeLayout.slug) {
            case 'dashboards':
                return <Dashboards />
                break
            case 'post_types':
                return <PostTypes />
                break
            case 'contributors':
                return <Contributors />
                break
            case 'bulk_actions':
                return <BulkActions />
                break
            default:
                return <General />
        }
    }

    const ActiveModal = () => {
        switch (activeLayout.slug) {
            case 'dashboards':
                return <DashboardsModal />
                break
            case 'post_types':
                return <PostTypesModal />
                break
            case 'contributors':
                return <ContributorsModal />
                break
            default:
                return <Fragment />
        }
    }

    return(
        <div className={styles.layout}>
            <div className={styles.activelayout}>
                <ActiveModal />
                <ActiveLayout />
            </div>
        </div>
    )
}
export default Layout