export function getStateAtTime(actions, currentTime) {
    let currentState = null;
  
    for (const action of actions) {
      if (action.time <= currentTime) {
        currentState = action.state;
      } else {
        break; // actions are sorted → safe to stop
      }
    }
  
    return currentState;
  }