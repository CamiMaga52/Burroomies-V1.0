import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import burroLogo from '../../assets/burro.png'
import '../admin/admin.css'

const NavbarAdmin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const menuRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('adminUser')
    localStorage.removeItem('adminId')
    navigate('/admin/inicio-sesion')
  }

  const isActive = (path) => location.pathname === path
  const cerrarMenu = () => setMenuAbierto(false)

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && menuAbierto) {
        setMenuAbierto(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuAbierto])

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuAbierto(false)
  }, [location])

  return (
    <nav className="admin-nav" ref={menuRef}>
      <Link to="/admin/arrendatarios" className="admin-nav-brand" onClick={cerrarMenu}>
        <img src={burroLogo} alt="RentIPN" className="admin-nav-logo" onError={e => { e.target.style.display = 'none' }} />
        <span className="admin-nav-title">RentIPN</span>
      </Link>

      {/* Menú desktop */}
      <div className="admin-nav-links">
        <Link
          to="/admin/arrendatarios"
          className={`admin-nav-link${isActive('/admin/arrendatarios') ? ' admin-nav-link--active' : ''}`}
        >
          🎓 Arrendatarios
        </Link>
        <Link
          to="/admin/arrendadores"
          className={`admin-nav-link${isActive('/admin/arrendadores') ? ' admin-nav-link--active' : ''}`}
        >
          🏠 Arrendadores
        </Link>
        <Link
          to="/admin/propiedades"
          className={`admin-nav-link${isActive('/admin/propiedades') ? ' admin-nav-link--active' : ''}`}
        >
          🏘️ Propiedades
        </Link>
        <button className="admin-nav-logout" onClick={handleLogout}>
          🚪 Cerrar Sesión
        </button>
      </div>

      {/* Botón hamburguesa (móvil) */}
      <button
        className="admin-nav-hamburger"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Menú"
      >
        {menuAbierto ? '✕' : '☰'}
      </button>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="admin-nav-mobile-menu">
          <Link
            to="/admin/arrendatarios"
            className="admin-nav-mobile-link"
            onClick={cerrarMenu}
          >
            🎓 Arrendatarios
          </Link>
          <Link
            to="/admin/arrendadores"
            className="admin-nav-mobile-link"
            onClick={cerrarMenu}
          >
            🏠 Arrendadores
          </Link>
          <Link
            to="/admin/propiedades"
            className="admin-nav-mobile-link"
            onClick={cerrarMenu}
          >
            🏘️ Propiedades
          </Link>
          <button className="admin-nav-mobile-btn" onClick={() => { cerrarMenu(); handleLogout(); }}>
            🚪 Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  )
}

export default NavbarAdmin