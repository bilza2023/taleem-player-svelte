
export  function runActions(actions, currentTime) {
    for (const action of actions) {
      if (action.time > currentTime) continue;
  
      const { targets, action: type, classes } = action;
  
      for (const id of targets) {
        const el = document.getElementById(id);
        if (!el) continue;
  
        if (type === "addClass") {
          for (const cls of classes) {
            el.classList.add(cls);
          }
        }
  
        if (type === "removeClass") {
          for (const cls of classes) {
            el.classList.remove(cls);
          }
        }
      }
    }
  }