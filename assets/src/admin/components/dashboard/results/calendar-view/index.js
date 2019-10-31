import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../.././../screens/dashboard/redux/actions/interface'
import Card from '../../../card'
import Calendar from '../../calendar'
const { Button } = wp.components
const { Fragment } = wp.element

const CalendarView = () => {
    const dispatch = useDispatch()
    const results = useSelector(state => state.query.results)

    return (
        <Calendar />
    )
}
export default CalendarView