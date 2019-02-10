export default (state = [], action) => {

  switch (action.type) {
    case 'ALL_WINNERS':
      return action.winners;
    case 'ADD_WINNER':
      return [
        ...state,
        {
          ip: action.ip,
          ts: action.ts,
        }
      ];
    default:
      return state;
  }
}
