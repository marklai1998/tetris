const appendChild = (
  parent: Element,
  child: Element[] | HTMLCollection | Element
) => {
  if (child instanceof HTMLCollection) {
    ;[...child].forEach((nestedChild) => appendChild(parent, nestedChild))
  } else if (Array.isArray(child))
    child.forEach((nestedChild) => appendChild(parent, nestedChild))
  else
    parent.appendChild(
      child instanceof Node ? child : document.createTextNode(child)
    )
}

export const createElement = (
  tag: string,
  props: Record<string, string>,
  ...children: Element[] | HTMLCollection[]
) => {
  const element = document.createElement(tag)

  Object.entries(props || {}).forEach(([name, value]) => {
    if (
      name.startsWith('on') &&
      name.toLowerCase() in window &&
      typeof value === 'function'
    )
      element.addEventListener(
        name.toLowerCase().substring(2) as keyof HTMLElementEventMap,
        value
      )
    else element.setAttribute(name, value.toString())
  })

  children.forEach((child) => {
    appendChild(element, child)
  })

  return element
}
