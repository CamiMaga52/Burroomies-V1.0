import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavbarInicio from "../../components/common/NavbarInicio";
import FooterInicio from "../../components/common/FooterInicio";
import burroSaludo from "../../assets/burro.png";
import mapaCPs from "../../assets/mapa-cps-upalm.jpg"; 
import "../../styles/HomePage.css";

/* ════════════════════════════════
   DATOS
════════════════════════════════ */
const FEATURES = [
  { icon: "🔍", title: "Búsqueda con filtros",    desc: "Filtra viviendas por presupuesto, tipo, servicios disponibles y códigos postales." },
  { icon: "✅", title: "Usuarios verificados",     desc: "Arrendadores verificados con CURP oficial y estudiantes con constancia  de estudios del IPN vigente." },
  { icon: "⭐", title: "Reseñas y calificaciones", desc: "Lee experiencias de otros estudiantes del IPN sobre las viviendas que han rentado." },
  { icon: "📍", title: "Solo zonas aledañas a UPALM", desc: "Registro de viviendas restringido a códigos postales colindantes al campus." },
  { icon: "📄", title: "Convenio arrendador-estudiante", desc: "Plantilla con los términos básicos del acuerdo de renta." },
  { icon: "🎓", title: "Comunidad IPN",            desc: "Plataforma orientada exclusivamente a la comunidad UPALM·IPN." },
];

const CP_LIST = [
  '07700', '07720', '07755', '07730', '07739',
  '07300', '07340', '07330', '07320', '07708',
  '07754', '07740', '07750', '07369'
];

const ARRENDADOR_CHECKS = [
  "Perfil verificado con CURP en formato pdf",
  "Publica inmuebles ampliamente",
  "Construye reputación con reseñas",
];

const ARRENDATARIO_CHECKS = [
  "Verificado con constancia del IPN",
  "Filtra por presupuesto y servicios",
  "Reseñas de otros estudiantes",
  "Acceso a plantilla de contrato",
];

/* ════════════════════════════════
   HOOK — fade-in al hacer scroll
════════════════════════════════ */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ════════════════════════════════
   COMPONENTES PEQUEÑOS
════════════════════════════════ */
function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M2 5l2.2 2.2L8 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeatureCard({ feature, delay }) {
  const ref = useFadeIn();
  return (
    <div
      className="feature-card fade-in"
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="feature-icon-wrap">{feature.icon}</div>
      <h3>{feature.title}</h3>
      <p>{feature.desc}</p>
    </div>
  );
}

/* ─── Temas de color por variante ─── */
const CARD_THEMES = {
  arrendador: {
    gradient: "linear-gradient(135deg, #534AB7 0%, #7F77DD 100%)",
    checkBg: "#EEEDFE", checkColor: "#534AB7",
    btnBg: "#534AB7", btnHover: "#3C3489",
    btnShadow: "0 4px 16px rgba(83,74,183,0.35)",
  },
  estudiante: {
    gradient: "linear-gradient(135deg, #1a7a5e 0%, #2ec090 100%)",
    checkBg: "#d0f5ea", checkColor: "#1a7a5e",
    btnBg: "#1a7a5e", btnHover: "#145f49",
    btnShadow: "0 4px 16px rgba(26,122,94,0.35)",
  },
};

function ProfileCard({ delay, variant, checks, icon, tag, title, description }) {
  const ref = useFadeIn();
  const theme = CARD_THEMES[variant];

  return (
    <div
      className="fade-in"
      ref={ref}
      style={{
        transitionDelay: `${delay}s`,
        borderRadius: "24px", overflow: "hidden",
        boxShadow: "0 8px 40px rgba(83,74,183,0.13)",
        display: "flex", flexDirection: "column",
        transition: "transform 0.25s, box-shadow 0.25s",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 20px 56px rgba(83,74,183,0.22)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 40px rgba(83,74,183,0.13)";
      }}
    >
      {/* Header con gradiente */}
      <div style={{
        background: theme.gradient,
        padding: "2rem 2rem 1.75rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          width: "60px", height: "60px", borderRadius: "14px",
          background: "rgba(255,255,255,0.2)",
          border: "1.5px solid rgba(255,255,255,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "28px", marginBottom: "1.2rem",
        }}>
          {icon}
        </div>
        <div style={{
          fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.75)",
          marginBottom: "0.4rem",
        }}>
          {tag}
        </div>
        <h3 style={{
          fontSize: "1.25rem", fontWeight: 800,
          color: "#ffffff", margin: 0, lineHeight: 1.25,
        }}>
          {title}
        </h3>
      </div>

      {/* Body blanco */}
      <div style={{
        background: "#ffffff", padding: "1.75rem 2rem 2rem",
        display: "flex", flexDirection: "column", flex: 1,
      }}>
        <p style={{
          fontSize: "0.875rem", color: "#4A4668",
          lineHeight: 1.75, marginBottom: "1.5rem",
        }}>
          {description}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          {checks.map((c) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "20px", height: "20px", borderRadius: "50%",
                background: theme.checkBg, color: theme.checkColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <CheckIcon />
              </div>
              <span style={{ fontSize: "0.86rem", color: "#4A4668" }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════
   SECCIONES
════════════════════════════════ */
function Hero() {
  const ref = useFadeIn();
  return (
    <section id="inicio" className="hero">
      <div className="fade-in" ref={ref}>
        <div className="hero-eyebrow">
          <span className="badge">
            <span className="badge-dot" />
            Exclusivo para estudiantes Unidad Profesional Adolfo López Mateos · IPN
          </span>
        </div>

        <h1 className="hero-title">
          Encuentra tu<br />
          <em>hogar ideal</em><br />
          durante tu etapa en el IPN
        </h1>

        <p className="hero-subtitle">
          Sistema web para búsqueda de vivienda en renta para estudiantes de la{" "}
          <strong>Unidad Profesional Adolfo López Mateos</strong>, con filtros
          de búsqueda y módulo de reseñas para estudiantes que hayan rentado una vivienda.
        </p>

        <div className="hero-ctas">
          <Link to="/usuarios/inicio-sesion" className="btn btn-primary">Buscar vivienda</Link>
          <a href="#quienes-somos" className="btn btn-ghost">Conocer más →</a>
        </div>

        <div className="hero-checklist">
          {[
            "Viviendas cerca de la zona UPALM·IPN",
            "Arrendadores verificados con CURP en formato pdf",
            "Reseñas de estudiantes del IPN que hayan rentado la vivienda",
          ].map((texto) => (
            <div className="hero-check" key={texto}>
              <div className="hero-check-icon"><CheckIcon /></div>
              <span>{texto}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-orb">
          <img src={burroSaludo} alt="Mascota RentIPN" className="hero-mascot" />

          <div className="hero-chip chip-top">
            <div className="chip-avatar">👤</div>
            <div>
              <strong>+300 estudiantes</strong>
              <span className="chip-label">encontraron hogar</span>
            </div>
          </div>

          <div className="hero-chip chip-bottom">
            <span style={{ fontSize: "18px" }}>📍</span>
            <div>
              <strong>Zona UPALM</strong>
              <span className="chip-label chip-green">CPs aledañas a la UPALM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuienesSomos() {
  const ref = useFadeIn();
  const cardRef = useFadeIn();
  return (
    <section id="quienes-somos" className="section about">
      <div className="about-inner">
        <div className="fade-in" ref={ref}>
          <span className="section-label">Quiénes somos</span>
          <h2 className="section-title">
            Conectamos estudiantes<br />con su <em>próximo hogar</em>
          </h2>

          <div className="about-steps">
            {[
              {
                num: "01",
                title: "Plataforma para la UPALM·IPN",
                body: "RentIPN es un sistema web desarrollado para apoyar a los estudiantes de la UPALM·IPN en la búsqueda de vivienda en renta cercana al campus.",
              },
              {
                num: "02",
                title: "verificación de identidad con documentos",
                body: null,
                bodyJsx: (
                  <>
                    Conecta a <strong>arrendadores</strong> que publican viviendas en zonas 
                    aledañas a la UPALM con <strong>estudiantes del IPN</strong>, mediante 
                    verificación de documentos oficiales y un sistema de reseñas entre usuarios.
                  </>
                ),
              },
              {
                num: "03",
                title: "Decisiones informadas",
                body: "El sistema permite registrar propiedades, verificar identidades mediante documentos oficiales y consultar experiencias de otros usuarios antes de tomar una decisión.",
              },
            ].map(({ num, title, body, bodyJsx }) => (
              <div className="about-step" key={num}>
                <div className="step-num">{num}</div>
                <div className="step-text">
                  <h4>{title}</h4>
                  <p>{bodyJsx ?? body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-card fade-in" ref={cardRef} style={{ transitionDelay: "0.15s" }}>
          <div className="mision-label">Misión</div>
          <div className="mision-q">¿Para qué existimos?</div>
          <blockquote className="mision-quote">
            "Herramienta para la búsqueda y selección de vivienda en renta
            para los estudiantes foráneos de la UPALM·IPN."
          </blockquote>
          <div className="mision-grid">
            {[
              { icon: "🎓", name: "UPALM IPN",       sub: "Escuela de referencia" },
              { icon: "✅", name: "CPs verificados",  sub: "CPs aledañas a la UPALM" },
              { icon: "👤", name: "Solo estudiantes", sub: "Constancia IPN" },
              { icon: "🤝", name: "Comunidad",        sub: "Reseñas de estudiantes" },
            ].map(({ icon, name, sub }) => (
              <div className="mision-item" key={name}>
                <div className="mision-item-icon">{icon}</div>
                <div className="mision-item-name">{name}</div>
                <div className="mision-item-sub">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Caracteristicas() {
  const ref = useFadeIn();
  return (
    <section id="caracteristicas" className="section features">
      <div className="features-header fade-in" ref={ref}>
        <span className="section-label">Características</span>
        <h2 className="section-title">
          Todo lo que necesitas en <em>una plataforma</em>
        </h2>
        <p className="section-sub" style={{ marginTop: "0.75rem" }}>
          Herramientas diseñadas especialmente para la comunidad estudiantil del IPN.
        </p>
      </div>
      <div className="features-grid">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

function ZonasCercanas() {
  const headerRef = useFadeIn();
  const mapRef = useFadeIn();
  const infoRef = useFadeIn();

  return (
    <section id="zonas-cercanas" className="section zonas">
      {/* ── Encabezado ── */}
      <div className="zonas-header fade-in" ref={headerRef} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span className="section-label">Zonas Cercanas</span>
        <h2 className="section-title">
          Códigos Postales <em>aledaños</em> a la UPALM
        </h2>
        <p className="section-sub" style={{ margin: "0.75rem auto 0" }}>
          Conoce las zonas donde puedes publicar y buscar viviendas. Siguiendo la división territorial de SEPOMEX, 
          estos son los códigos postales colindantes al campus de la Unidad Profesional Adolfo López Mateos.
        </p>
      </div>

      {/* ── Contenido: Mapa + Info (Grid Responsive) ── */}
      <div className="zonas-content">
        {/* ── Columna Izquierda: Mapa ── */}
        <div
          className="fade-in zonas-map-col"
          ref={mapRef}
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="zonas-card">
            <div className="zonas-map-wrapper">
              <img
                src={mapaCPs}
                alt="Mapa de códigos postales aledaños a la UPALM IPN según SEPOMEX"
                className="zonas-map-img"
              />
            </div>
            <p className="zonas-map-caption">
              División territorial SEPOMEX — Zona UPALM IPN
            </p>
          </div>
        </div>

        {/* ── Columna Derecha: Info + Leyenda ── */}
        <div
          className="fade-in zonas-info-col"
          ref={infoRef}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="zonas-card">
            {/* Icono */}
            <div className="zonas-info-icon">📍</div>

            <h3 className="zonas-info-title">
              ¿Por qué estas zonas?
            </h3>

            <p className="zonas-info-text">
              RentIPN restringe el registro de viviendas exclusivamente a los códigos postales 
              colindantes a la <strong>UPALM IPN</strong>. Esto garantiza que todas las propiedades 
              publicadas se encuentren en zonas cercanas al campus.
            </p>

            {/* ── Leyenda de CPs ── */}
            <h4 className="zonas-cp-title">CPs permitidos</h4>

            <div className="zonas-cp-grid">
              {CP_LIST.map((cp) => (
                <span key={cp} className="zonas-cp-chip">
                  {cp}
                </span>
              ))}
            </div>

            {/* Nota al pie */}
            <p className="zonas-tip">
              💡 <strong>Tip:</strong> Al buscar vivienda, utiliza estos códigos postales como referencia 
              para encontrar opciones cerca de la UPALM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Perfiles() {
  const ref = useFadeIn();
  return (
    <section id="perfiles" className="section profiles">
      <div className="fade-in" ref={ref} style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <span className="section-label">Perfiles de Usuario</span>
        <h2 className="section-title">
          ¿Cómo quieres usar <em>RentIPN?</em>
        </h2>
      </div>

      <div className="profiles-grid">
        <ProfileCard
          delay={0.2}
          variant="arrendador"
          icon="🏠"
          tag="Arrendador"
          title="Publica y gestiona tus propiedades"
          description="Si tienes un inmueble cerca de la UPALM·IPN y deseas rentarlo a estudiantes, RentIPN es tu plataforma. Regístrate, verifica tu identidad con tu CURP y comparte tu anuncio para que estudiantes verificados puedan contactarte directamente."
          checks={ARRENDADOR_CHECKS}
        />
        <ProfileCard
          delay={0.3}
          variant="estudiante"
          icon="🎓"
          tag="Estudiante"
          title="Encuentra tu hogar estudiantil"
          description="Busca, compara y elige viviendas en renta en zonas aledañas a la UPALM IPN según tu presupuesto. Con verificación de documentos oficiales del IPN, reseñas y plantilla de convenio incluida."
          checks={ARRENDATARIO_CHECKS}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Link to="/registro" className="btn btn-primary" style={{
          padding: "14px 40px",
          fontSize: "1rem",
          boxShadow: "0 8px 24px rgba(83,74,183,0.3)"
        }}>
          Comienza el Registro
        </Link>
      </div>
    </section>
  );
}

/* ════════════════════════════════
   COMPONENTE PRINCIPAL
════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <NavbarInicio />
      <main>
        <Hero />
        <QuienesSomos />
        <Caracteristicas />
        <ZonasCercanas />   {/* 🆕 NUEVA SECCIÓN */}
        <Perfiles />
      </main>
      <FooterInicio />

      <Link to="/faq" className="faq-btn" title="Preguntas Frecuentes">
        ?
      </Link>
    </>
  );
}