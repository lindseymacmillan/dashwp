import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../.././../screens/dashboard/redux/actions/interface'
import Card from '../../../card'
const { Button, ButtonGroup } = wp.components
const { Fragment } = wp.element

import styles from './style.css'

const GridView = () => {
    const dispatch = useDispatch()
    const results = useSelector(state => state.query.results)

    const cards = results.map((result, index) => {
        return (
            <Card 
                key={index}
                width={1}
                title={result.post_title} 
                excerpt={result.post_excerpt}
                actions={(
                    <Fragment>
                        <div>
                            <Button isPrimary onClick={() => dispatch(openModal({mode: 'edit', source: result}))}>Edit</Button>
                            <a class={'button ' + styles.button} href={'/wp-admin/post.php?post=' + result.ID + '&action=edit'}>Editor</a>
                        </div>
                        <Button isDefault onClick={() => dispatch(openModal({mode: 'delete', source: result}))}>Delete</Button>
                    </Fragment>
                )}
            />
        )
    });

    return (
        <Fragment>
            {cards}
        </Fragment>
    )
}
export default GridView