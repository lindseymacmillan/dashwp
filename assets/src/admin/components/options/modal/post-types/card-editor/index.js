import Bin from './bin'
import Stage from './stage'
import Inspector from './inspector'
import Actions from './actions'

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import styles from './style.css'

const CardEditor = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.editor}>
                <Bin />
                <Stage />
                <Inspector />
                <Actions />
            </div>
        </DndProvider>
    )
}

export default CardEditor