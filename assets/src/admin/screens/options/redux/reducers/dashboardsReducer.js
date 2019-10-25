const initialDashboards = {
    dashboards: [],
    modal: {
      isOpen: false,
      goTo: false,
      mode: null,
    },
    isCreating: false,
    isFetching: false,
  }
    
  export const dashboardsReducer = (state = initialDashboards, action) => {
    switch (action.type) {
        case 'OPEN_DASHBOARDS_MODAL': 
          return { ...state, modal: { ...state.modal, isOpen: true, mode: action.payload.mode, dashboard: action.payload.dashboard } }
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
        default:
          return state
    }
  }