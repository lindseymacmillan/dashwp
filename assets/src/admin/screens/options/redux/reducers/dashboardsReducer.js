const initialDashboards = {
    dashboards: [],
    modal: {
      isOpen: false,
      goTo: false,
      mode: null,
    },
    isCreating: false,
    isFetching: false,
    contentQuery: [{label: '', value: 0}]
  }
    
  export const dashboardsReducer = (state = initialDashboards, action) => {
    switch (action.type) {
        case 'OPEN_DASHBOARDS_MODAL': 
          return { ...state, modal: { ...state.modal, isOpen: true, mode: action.payload.mode, source: action.payload.source } }
        case 'CLOSE_DASHBOARDS_MODAL': 
          return { ...state, modal: { ...state.modal, isOpen: false } }
        case 'TOGGLE_DASHBOARDS_GOTO': 
          return { ...state, modal: { ...state.modal, goTo: 'test' } }
        case 'CREATING_DASHBOARD': 
          return { ...state, isCreating: true }
        case 'DASHBOARD_CREATED': 
          return { ...state, isCreating: false }
        case 'FETCHING_DASHBOARDS': 
          return { ...state, isFetching: true }
        case 'DASHBOARDS_RECEIVED': 
          return { ...state, isFetching: false, dashboards: action.payload }
        case 'DASHBOARDS_CONTENT_RECEIVED': 
          return { ...state, isFetching: false, contentQuery: action.payload }
        default:
          return state
    }
  }