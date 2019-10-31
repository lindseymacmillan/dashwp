import { useSelector, useDispatch } from 'react-redux'
import styles from './style.css'
import { setActiveView } from '../../../screens/dashboard/redux/actions/interface'
const { Button, Icon } = wp.components;

const Views = () => {
    const dispatch = useDispatch()
    const activeView = useSelector(state => state.interface.activeView)
    const views = useSelector(state => state.interface.views)

    return (
        <div>
            {views.map((view) => {
                const isActive = view.name == activeView ? true : false

                return (
                    <Button
                        className={styles.iconbutton}
                        onClick={() => dispatch(setActiveView(view.name))}>
                            <Icon icon={view.icon} />
                    </Button>
                )
            })}
        </div>
    )
}
export default Views;