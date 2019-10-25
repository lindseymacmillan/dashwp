import { useSelector, useDispatch } from 'react-redux'
import { setActiveFilter } from '../../../screens/dashboard/redux/actions/interface'
const { Button } = wp.components

import styles from './style.css'

const Filters = () => {
    const dispatch = useDispatch()
    const activeFilter = useSelector(state => state.interface.activeFilter)
    const filters = useSelector(state => state.interface.filters)
    
    return (
        <div className={styles.filters}>
            {filters.map((filter) => {
                const isActive = filter.type == activeFilter ? true : false
                const attrs = {
                    isPrimary: isActive,
                    isDefault: !isActive
                }

                return (
                    <Button {...attrs} className={styles.button} onClick={() => dispatch(setActiveFilter(filter.type))}>{filter.label}</Button>
                )
            })}
        </div>
    )
}
export default Filters

