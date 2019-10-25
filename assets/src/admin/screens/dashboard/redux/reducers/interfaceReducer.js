const initialInterface = {
  title: dwp_data.name,
  linkedContent: dwp_data.linked_content,
  modal: {
    isOpen: false,
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
  activeView: 'grid',
  views: [],
}
  
export const interfaceReducer = (state = initialInterface, action) => {
  switch (action.type) {
      case 'SET_ACTIVE_FILTER': 
        return { ...state, activeFilter: action.payload }
      case 'OPEN_MODAL':
        return { ...state, modal: { ...state.modal, isOpen: true, mode: action.payload.mode, source: action.payload.source }  }
      case 'CLOSE_MODAL':
        return { ...state, modal: { ...state.modal, isOpen: false, mode: null, source: null, isFetching: false, fields: null }  }
      case 'FETCHING_CONTENT_FIELD_VALUES':
        return { ...state, modal: { ...state.modal, isFetching: true }  }
      case 'SET_CONTENT_FIELDS':
        const postTypes = JSON.parse(JSON.stringify(dwp_data.post_types));
        let fields
        postTypes.forEach((type) => {
          if (type.name == action.payload.postType) {
            fields = type.card_fields
          }
        })
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