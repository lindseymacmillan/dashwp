import { useSelector, useDispatch } from 'react-redux'
import { setLayout } from '../../../screens/options/redux/actions/interfaceActions'
const { Button } = wp.components
import styles from './style.css'

const Menu = () => {
    const dispatch = useDispatch()
    const layouts = useSelector(state => state.interface.layouts)
    const activeLayout = useSelector(state => state.interface.activeLayout)

    const buttons = layouts.map(function(layout, index) {
        const isActive = layout.slug == activeLayout.slug ? true : false
        const attrs = {
            key: layout.slug,
            isPrimary: isActive,
            isTertiary: !isActive,
        }

        return (
            <Button  { ...attrs } onClick={() => dispatch(setLayout(layout))}>
                {layout.label}
            </Button>
        )
    });


    return (
        <div className={styles.menu}>
            {buttons}
        </div>
    )
}
export default Menu