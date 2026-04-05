function revealOneByOne(items, sid, prefix) {
    const actions = [];
  
    const processed = items.map((item, i) => {
      const id = `${sid}-${prefix}${i + 1}`;
  
      if (item.timings) {
        for (const t of item.timings) {
          if (t.event === "show") {
            actions.push({
              time: t.time,
              targets: [id],
              action: "removeClass",
              classes: ["hidden"]
            });
          }
        }
      }
  
      return {
        ...item,
        id,
        classes: item.classes || ""
      };
    });
  
    return { items: processed, actions };
  }