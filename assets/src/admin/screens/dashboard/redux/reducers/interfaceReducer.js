const initialInterface = {
  title: dwp_data.name,
  linkedContent: dwp_data.linked_content,
  contentOptions: [{label: '', value: 0}],
  modal: {
    isOpen: false,
    mediaLibraryIsOpen: false,
    mode: null,
    source: null,
    isFetching: false,
    goTo: false,
    fields: null,
  },
  supportedTypes: dwp_data.supported_types,
  supportedTypeObjects: dwp_data.supported_type_objects,
  activeFilter: 'any',
  filters: dwp_data.filters,
  activeView: dwp_data.views[0].name,
  views: dwp_data.views,
  postTypes: dwp_data.post_types,
  id: dwp_data.id,
  name: dwp_data.name,
  description: dwp_data.description
}
  
export const interfaceReducer = (state = initialInterface, action) => {
  switch (action.type) {
      case 'SET_ACTIVE_FILTER': 
        return { ...state, activeFilter: action.payload }
      case 'SET_ACTIVE_VIEW': 
        return { ...state, activeView: action.payload }
      case 'OPEN_MODAL':
        return { ...state, modal: { ...state.modal, isOpen: true, mode: action.payload.mode, source: action.payload.source }  }
      case 'OPEN_MEDIA_LIBRARY_MODAL':
        return { ...state, modal: { ...state.modal, mediaLibraryIsOpen: true } }
      case 'CLOSE_MODAL':
        return { ...state, modal: { ...state.modal, isOpen: false, mode: null, source: null, isFetching: false, fields: null }  }
      case 'CONTENT_OPTIONS_RECEIVED':
        console.log('add to state!!!!', action.payload)
        return { ...state, contentOptions: action.payload}
      case 'CLOSE_MEDIA_LIBRARY_MODAL':
        return { ...state, modal: { ...state.modal, mediaLibraryIsOpen: false } }
      case 'FETCHING_CONTENT_FIELD_VALUES':
        return { ...state, modal: { ...state.modal, isFetching: true }  }
      case 'SET_CONTENT_FIELDS':
        let fields
        switch (state.modal.mode) {
          case 'new':
            const postTypes = JSON.parse(JSON.stringify(dwp_data.post_types));
            postTypes.forEach((type) => {
              if (type.name == action.payload.postType) {
                fields = type.card_fields
              }
            })
            break
          case 'edit':
            const contentFields = state.modal.source.content_fields.slice(0)
            fields = contentFields
            break
        }
        return { ...state, modal: { ...state.modal, isFetching: false, fields: fields } }
      case 'CONTENT_FIELD_VALUES_RECEIVED':
        return { ...state, modal: { ...state.modal, isFetching: false, source: { ...state.modal.source, content_fields: action.payload } }  }
      case 'SET_CONTENT_FIELD_VALUE': {
        let fields = state.modal.fields.slice(0)
        fields[action.payload.index].value = action.payload.value
        return { ...state, modal: { ...state.modal, fields: fields } }
      }
      case 'TOGGLE_GO_TO': {
        return { ...state, modal: { ...state.modal, goTo: !state.modal.goTo}}
      }
      default:
        return state
  }
}