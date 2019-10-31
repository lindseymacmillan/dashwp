import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { runQuery } from '../../../screens/dashboard/redux/actions/query'
import GridView from './grid-view'
import ListView from './list-view'
import CalendarView from './calendar-view'
import BudgetView from './budget-view'
const { Fragment } = wp.element

import styles from './style.css'

const Results = () => {

    const dispatch = useDispatch()
    const activeView = useSelector(state => state.interface.activeView)
    const queryString = useSelector(state => state.query.string)
    const queryType = useSelector(state => state.query.type)
    const queryTerm = useSelector(state => state.query.term)

    useEffect(() => {
        dispatch(runQuery({
            queryString: queryString, 
            queryType: queryType,
            queryTerm: queryTerm
        }))
    }, [queryString, queryType, queryTerm])

    const View = () => {
        switch (activeView) {
            case 'list':
                return <ListView />
            case 'grid':
                return <GridView />
            case 'calendar':
                return <CalendarView />
            case 'budget':
                return <BudgetView />
        }
    }

    return(
        <Fragment>
            <View />
        </Fragment>
    )
}
export default Results