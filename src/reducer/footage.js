const defaultState = {
  dispTime: null, // Null means the latest. Otherwise this will be a datetime number
  tmpDate: null, // Selected date (No time included) on select element. String
  tmpHour: null // Selected hour on select element. String
}

export function footage(state = defaultState, action) {
  switch (action.type) {
  case 'FOOTAGE/SET_DISP_TIME':
    return {
      ...state,
      dispTime: action.dispTime
    }
  case 'FOOTAGE/SET_TMP_DATE':
    return {
      ...state,
      tmpDate: action.tmpDate,
      tmpHour: null
    }
  case 'FOOTAGE/SET_TMP_HOUR':
    return {
      ...state,
      tmpHour: action.tmpHour
    }
  default:
    return state
  }
}
