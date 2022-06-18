export const observe = <T extends Record<string, unknown>>(
  state: T,
  onChange: (prop: keyof T, newObj: T) => void
) => {
  Object.entries(state).forEach(([prop, value]) => {
    onChange(prop, state)
  })
  return new Proxy(state, {
    set: function (obj, prop, value) {
      obj[prop as keyof T] = value
      onChange(prop as keyof T, obj)
      return true
    },
  })
}
