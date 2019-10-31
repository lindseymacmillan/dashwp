import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../.././../screens/dashboard/redux/actions/interface'
import Card from '../../../card'
const { Button } = wp.components
const { Fragment } = wp.element

const ListView = () => {
    const dispatch = useDispatch()
    const results = useSelector(state => state.query.results)

    const list = results.map((result, index) => {
        return (
            <Card 
                key={index}
                width={4}
                title={result.post_title} 
                excerpt={result.post_excerpt}
                actions={(
                    <Fragment>
                        <Button isPrimary onClick={() => dispatch(openModal({mode: 'edit', source: result}))}>Edit</Button>
                        <Button isDefault onClick={() => dispatch(openModal({mode: 'delete', source: result}))}>Delete</Button>
                    </Fragment>
                )}
            />
        )
    });

    return (
        <Fragment>
            {list}
        </Fragment>
    )
}
export default ListView