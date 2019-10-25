const initialInterface = {
  layouts: [
    {
      slug: 'general',
      label: 'General'
    },
    {
      slug: 'dashboards',
      label: 'Dashboards'
    },
    {
      slug: 'post_types',
      label: 'Post Types'
    },
    {
      slug: 'contributors',
      label: 'Contributors'
    },
    {
      slug: 'bulk_actions',
      label: 'Bulk Actions'
    }
  ],
  activeLayout: {
    slug: 'general',
    label: 'General'
  }
}
  
export const interfaceReducer = (state = initialInterface, action) => {
  switch (action.type) {
      case 'SET_LAYOUT': 
        return { ...state, activeLayout: action.payload }
      default:
        return state
  }
}