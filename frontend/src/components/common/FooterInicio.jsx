import { useState } from "react";
import { Link } from "react-router-dom";
import ModalContacto from "./ModalContacto";

/* ════════════════════════════════
   FOOTER INICIO
════════════════════════════════ */
const FooterInicio = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <footer
        style={{
          background: "#1A1633",
          color: "rgba(255,255,255,0.6)",
          padding: "2rem 5vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.85rem",
          textAlign: "center",
        }}
      >
        {/* Marca — enlace al panel admin */}
        <Link
          to="/admin/inicio-sesion"
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1rem",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#AFA9EC")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
        >
          RentIPN
        </Link>

        {/* Links legales */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { to: "/legal/aviso-privacidad", label: "Aviso de Privacidad", isLink: true },
            { label: "·", isSep: true },
            { to: "/legal/terminos-uso", label: "Términos y Condiciones", isLink: true },
            { label: "·", isSep: true },
            { label: "Contacto", isModal: true }, // ← Ahora abre el modal
          ].map((item, i) => {
            if (item.isSep) {
              return (
                <span key={i} style={{ color: "rgba(255,255,255,0.3)" }}>
                  {item.label}
                </span>
              );
            }

            const linkStyle = {
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              transition: "color 0.2s",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontFamily: "inherit",
              padding: 0,
            };

            // 🆕 Si es el trigger del modal
            if (item.isModal) {
              return (
                <button
                  key={i}
                  onClick={() => setModalAbierto(true)}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {item.label}
                </button>
              );
            }

            // Link normal (React Router)
            return (
              <Link
                key={i}
                to={item.to}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Copyright */}
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem" }}>
          © 2025 RentIPN · Todos los derechos reservados
        </div>
      </footer>

      {/* 🆕 Modal de Contacto */}
      {modalAbierto && (
        <ModalContacto onClose={() => setModalAbierto(false)} />
      )}
    </>
  );
};

export default FooterInicio;