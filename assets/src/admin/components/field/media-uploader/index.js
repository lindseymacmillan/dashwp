import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { openMediaLibraryModal, closeMediaLibraryModal } from '../../../screens/dashboard/redux/actions/interface'
const { Button } = wp.components;

import styles from './style.css'

const MediaUploader = (props) => {
    
    const dispatch = useDispatch()

    const MediaLibrary = window.wp.media({
        frame: 'select',
        title: props.label,
        multiple: true,
        library: {
            order: 'DESC',
            orderby: 'date',
            type: props.mediaTypes,
            search: null,
            uploadedTo: null 
        },
        button: {
            text: 'Done'
        }
    })

    useEffect(() => {
        MediaLibrary.on(
            'open',
            () => {
                let ids = []
                if (props.value) {
                    ids = props.value.map((media) => {
                        return media.id
                    })
                }
                const selection = MediaLibrary.state().get( 'selection' );
                ids.forEach( function( id ) {
                    const attachment = wp.media.attachment( id )
                    selection.add( attachment ? [ attachment ] : [])
                })
                dispatch(openMediaLibraryModal())
            }
        )
    
        MediaLibrary.on(
            'select',
            () => {
                const selections = MediaLibrary.state().get('selection');
                const attachments = selections.map( ( selection ) => {
                    selection = selection.toJSON();
                    const attachment = {
                        id: selection.id,
                        url: selection.url,
                        name: selection.name,
                        type: selection.type
                    }
                    return selection;
                });
                props.onChange(attachments)
            }
        )

        MediaLibrary.on(
            'close',
            () => {
                dispatch(closeMediaLibraryModal())
            }
        )
    }, [])
    
	return (
        <div className={styles.mediauploader}>
		    <Button className={styles.button} isPrimary onClick={() => MediaLibrary.open()}>Upload</Button>
        </div>
	)
}

export default MediaUploader