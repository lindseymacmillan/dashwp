const initialPostTypes = {
    postTypes: [],
    modal: {
      isOpen: false,
      mode: null,
      source: null,
    },
    cardEditor: {
      contentFields: null,
      activeField: null,
      activeIndex: null,
    }
}

Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};
    
export const postTypesReducer = (state = initialPostTypes, action) => {
    switch (action.type) {
        case 'OPEN_POST_TYPES_MODAL': {

          let postType, fields
          if (action.payload.source) {
            postType = JSON.parse(JSON.stringify(action.payload.source))
            fields = postType.card_fields.slice(0)
          }

          return { ...state, 
            modal: { ...state.modal,
              isOpen: true, 
              source: postType, 
              mode: action.payload.mode },
            cardEditor: { ...state.cardEditor, 
              contentFields: fields,
            } 
          }
        }
        case 'CLOSE_POST_TYPES_MODAL': 
          return { ...state, 
            modal: { ...state.modal, 
              isOpen: false, 
              mode: null, 
              source: null },
            cardEditor: { ...state.cardEditor,
              contentFields: null,
              activeField: null,
              activeIndex: null,
            } }
        case 'ADD_CONTENT_FIELD': {
          const field = JSON.parse(JSON.stringify(action.payload.field))
          const fields = state.cardEditor.contentFields.splice(0)
          fields.push(field)
          return { ...state, cardEditor: { ...state.cardEditor, contentFields: fields } }
        }
        case 'UPDATE_CONTENT_FIELD': {
          const fields = state.cardEditor.contentFields.slice(0)
          const active = JSON.parse(JSON.stringify(state.cardEditor.activeField))

          if (action.payload.label) {
            fields[action.payload.index].label = action.payload.label
            active.label = action.payload.label
          }

          if (action.payload.action) {
            fields[action.payload.index].action = action.payload.action
            active.action = action.payload.action
          }

          if (action.payload.key) {
            fields[action.payload.index].key = action.payload.key
            active.key = action.payload.key
          }

          if (action.payload.save) {
            fields[action.payload.index].save = action.payload.save
            active.key = action.payload.save
          }


          if (action.payload.retrieve) {
            fields[action.payload.index].retrieve = action.payload.retrieve
            active.key = action.payload.retrieve
          }


          return { ...state, 
            cardEditor: { ...state.cardEditor, 
              contentFields: fields, 
              activeField: active
            }
          }
        }
        case 'MOVE_CONTENT_FIELD': {
          const fields = state.cardEditor.contentFields.slice(0)
          if (0 <= action.payload.to && action.payload.to < fields.length) {
            fields.move(action.payload.from, action.payload.to)
            return { ...state, 
              cardEditor: { ...state.cardEditor, 
                contentFields: fields,
                activeIndex: action.payload.to
              }
            }
          } else {
            return { ...state}
          }
        }
        case 'REMOVE_CONTENT_FIELD': {
          const fields = state.cardEditor.contentFields.slice(0)
          fields.splice(action.payload.index, 1)
          return { ...state, 
            cardEditor: { ...state.cardEditor, 
              contentFields: fields,
              activeField: null,
              activeIndex: null,
            }
          }
        }
        case 'SET_ACTIVE_FIELD': {
          const field = JSON.parse(JSON.stringify(action.payload.field))
          return { ...state, 
            cardEditor: { ...state.cardEditor, 
              activeField: field,
              activeIndex: action.payload.index
            } 
          }
        }
        case 'FETCHING_POST_TYPES': 
          return { ...state, modal: { ...state.modal, isFetching: true } }
        case 'POST_TYPES_RECEIVED': 
          return { ...state, modal: { ...state.modal, isFetching: false }, postTypes: action.payload }
        case 'CREATING_POST_TYPE': 
          return { ...state, modal: { ...state.modal, isCreating: true } }
        case 'POST_TYPE_CREATED': 
          return { ...state, is_creating: false, new_modal_is_open: false }
        default:
            return state
    }
}