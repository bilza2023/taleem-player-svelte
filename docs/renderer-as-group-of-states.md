
# 📄 renderer-as-group-of-states.md

---

## 🔥 Core Idea

> At time `t` → slide is fully defined by **state (groups → items)**

No incremental actions.
No add/remove logic.
Only **state snapshots**.

---

# 1️⃣ Renderer: Define Groups (States)

Renderer defines **what states exist** and their CSS.

```js
export const groups = {
  active: ["border-green", "text-red"],
  inactive: ["border-gray", "text-gray"],
  hidden: ["hidden"]
};
```

---

## 🔑 Rules

* Keys = **state names**
* Values = **CSS classes**
* Renderer does NOT assign items to groups

---

# 2️⃣ Action Shape (State Snapshot)

Each action = full state at time `t`

```js
{
  time: 170,
  state: {
    active: ["s1", "s2"],
    inactive: ["s3", "s4"],
    hidden: ["s5"]
  }
}
```

---

## 🔑 Rules

* Every item must belong to **exactly one group**
* State is **complete**, not partial
* No add/remove operations

---

# 3️⃣ Behavior → Generate Actions

Behavior builds **state timeline**

---

## Example: Accumulation (bullet list)

```js
const items = ["i1", "i2", "i3"];

const actions = [
  {
    time: 20,
    state: {
      active: ["i1"],
      hidden: ["i2", "i3"]
    }
  },
  {
    time: 22,
    state: {
      active: ["i1", "i2"],
      hidden: ["i3"]
    }
  },
  {
    time: 24,
    state: {
      active: ["i1", "i2", "i3"],
      hidden: []
    }
  }
];
```

---

## 🔥 Key Rule

> Behavior = function → (items, timings) → state snapshots

---

# 4️⃣ Action Runner (NEW)

Replace old runner 
(old = incremental add/remove ❌)

---

## ✅ New Runner (state-based)

```js
export function runState(actions, groups, currentTime) {
  // 1. find latest state
  let currentState = null;

  for (const action of actions) {
    if (action.time <= currentTime) {
      currentState = action.state;
    } else {
      break;
    }
  }

  if (!currentState) return;

  // 2. apply state
  for (const [groupName, ids] of Object.entries(currentState)) {
    const classList = groups[groupName] || [];

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;

      // remove ALL group classes first
      for (const classes of Object.values(groups)) {
        for (const cls of classes) {
          el.classList.remove(cls);
        }
      }

      // add current group classes
      for (const cls of classList) {
        el.classList.add(cls);
      }
    }
  }
}
```

---

## ⚠️ Important

We remove all group classes before applying new state
→ ensures **no leftover state bugs**

---

# 5️⃣ Compare with Old System

Old actions :

```js
{ time, targets, action: "addClass" }
```

❌ incremental
❌ order dependent
❌ hard to debug

---

New:

```js
{ time, state }
```

✅ deterministic
✅ stateless
✅ scrub-safe

---

# 6️⃣ Minimal Rules (LOCK THESE)

I. At time `t` → one complete state
II. Every item belongs to one group
III. Groups map to CSS classes
IV. Runner only applies state

---

# 💥 Final Mental Model

> Renderer → defines states
> Behavior → defines timeline of states
> Runner → syncs DOM to state

---

# 🚀 Next Step

Implement for **one slide only (BulletList)**

* define groups
* generate state timeline
* plug into new runner

👉 Once that works → whole system converts cleanly

---

# 🔒 Final Line

> “We don’t execute actions — we render state.”
