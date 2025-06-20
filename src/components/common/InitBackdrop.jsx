import { useEffect, useRef } from 'react'

export default function InitBackdrop({ itemSelector = '.nav li a' }) {
  const backdropRef = useRef()
  const lastPath = useRef(window.location.pathname)

  const updateBackdropByPath = () => {
    const nav = document.querySelector('.nav')
    const items = document.querySelectorAll(itemSelector)
    const currentPath = window.location.pathname
    const backdrop = backdropRef.current

    if (!nav || !backdrop || items.length === 0) return

    const sidebarTop = nav.getBoundingClientRect().top

    items.forEach((item) => {
      const itemPath = item.getAttribute('href')
      if (itemPath && (currentPath === itemPath || currentPath.endsWith(itemPath))) {
        const { top, height } = item.getBoundingClientRect()
        backdrop.style.setProperty('--top', `${top - sidebarTop}px`)
        backdrop.style.setProperty('--height', `${height}px`)
      }
    })
  }

  const updateBackdropOnClick = (item) => {
    const nav = document.querySelector('.nav')
    const backdrop = backdropRef.current
    if (!item || !nav || !backdrop) return

    const { top, height } = item.getBoundingClientRect()
    const sidebarTop = nav.getBoundingClientRect().top
    backdrop.style.setProperty('--top', `${top - sidebarTop}px`)
    backdrop.style.setProperty('--height', `${height}px`)
  }

  useEffect(() => {
    updateBackdropByPath() // Run once on load

    // Detect URL path changes
    const interval = setInterval(() => {
      const currentPath = window.location.pathname
      if (currentPath !== lastPath.current) {
        lastPath.current = currentPath
        requestAnimationFrame(updateBackdropByPath)
      }
    }, 100)

    // Add click event listeners to menu items
    const items = document.querySelectorAll(itemSelector)
    items.forEach((item) => {
      item.addEventListener('click', () => updateBackdropOnClick(item))
    })

    return () => {
      clearInterval(interval)
      // Limpieza: quitar listeners si el componente se desmonta
      items.forEach((item) => {
        item.removeEventListener('click', () => updateBackdropOnClick(item))
      })
    }
  }, [itemSelector])

  return (
    <div
      ref={backdropRef}
      id="menu-backdrop"
      className="bg-dark absolute top-[var(--top)] h-[var(--height)] w-full rounded-lg transition-all"
    />
  )
}
