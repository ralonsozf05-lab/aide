import { useState, type ReactNode } from "react";

type IconName =
  | "shield"
  | "refresh"
  | "alert"
  | "message"
  | "phone"
  | "search"
  | "eye"
  | "close"
  | "block"
  | "check";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    shield: (
      <>
        <path d="M12 3 5.5 5.8v4.5c0 4.2 2.7 7.9 6.5 9.4 3.8-1.5 6.5-5.2 6.5-9.4V5.8L12 3Z" />
        <path d="m9 11.8 2 2 4.2-4.5" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M18.4 16A8 8 0 1 1 20 12" />
      </>
    ),
    alert: (
      <>
        <path d="M12 3 2.7 20h18.6L12 3Z" />
        <path d="M12 9v5M12 17.5v.1" />
      </>
    ),
    message: (
      <>
        <path d="M20 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v8Z" />
        <path d="M7 8h10M7 12h7" />
      </>
    ),
    phone: (
      <path d="M8.2 3H5.5A2.5 2.5 0 0 0 3 5.5C3 14.1 9.9 21 18.5 21a2.5 2.5 0 0 0 2.5-2.5v-2.7l-4.2-1.4-1.1 2.3a13.3 13.3 0 0 1-8.4-8.4l2.3-1.1L8.2 3Z" />
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 5 5" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    block: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m5.6 5.6 12.8 12.8" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const detectedMessages = [
  {
    sender: "BANCOESTADO",
    title: "SMS falso de BancoEstado",
    preview: "Su cuenta ha sido bloqueada. Ingrese ahora para verificar...",
    time: "Ahora",
    icon: "bank",
  },
  {
    sender: "+56 9 4421 8390",
    title: "Familiar con número nuevo",
    preview: "Mamá, cambié de número. Necesito que me ayudes con...",
    time: "Hace 18 min",
    icon: "chat",
  },
];

export default function App() {
  const [showAlert, setShowAlert] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [analysisText, setAnalysisText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(false);
  const [activeNav, setActiveNav] = useState("Mensajes");

  function blockSender() {
    setBlocked(true);
    window.setTimeout(() => setShowAlert(false), 900);
  }

  return (
    <main className="page">
      <section className="device">
        <div className="device-speaker" />
        <div className="screen">
          <header className="header">
            <div className="identity">
              <span className="logo">
                <Icon name="shield" size={22} />
              </span>
              <div>
                <div className="name-row">
                  <strong>AIDE</strong>
                  <span>UDD 2026</span>
                </div>
                <p>Asistencia Inteligente Anti-Estafas</p>
              </div>
            </div>
            <button className="round-button" aria-label="Actualizar protección">
              <Icon name="refresh" size={18} />
            </button>
          </header>

          <div className="scroll-content">
            <section className="hero">
              <div className="radar" aria-hidden="true">
                <i />
                <i />
                <span>
                  <Icon name="shield" size={30} />
                </span>
              </div>
              <p className="online">
                <span /> PROTECCIÓN ACTIVA
              </p>
              <h1>Escudo activo en SMS y WhatsApp</h1>
              <p className="hero-copy">
                Analizando textos, enlaces dudosos y suplantación sin revisar tus
                archivos ni conversaciones.
              </p>
              <strong className="motto">DETECTA · ALERTA · EXPLICA · ACOMPAÑA</strong>
            </section>

            <section className="danger-banner">
              <div className="danger-title">
                <span>
                  <Icon name="alert" size={17} />
                </span>
                <div>
                  <small>RIESGO ALTO</small>
                  <h2>Mensaje sospechoso detectado</h2>
                </div>
                <em>Ahora</em>
              </div>
              <p>
                Un SMS que se hace pasar por BancoEstado intenta llevarte a un
                enlace no oficial.
              </p>
              <button onClick={() => setShowAlert(true)}>
                <Icon name="eye" size={17} />
                Ver alerta y protegerme
              </button>
            </section>

            <section className="panel">
              <div className="panel-title">
                <div>
                  <Icon name="message" size={17} />
                  <h2>Mensajes detectados</h2>
                </div>
                <span>2 riesgos</span>
              </div>

              <div className="detected-list">
                {detectedMessages.map((message, index) => (
                  <button
                    className="detected-item"
                    key={message.title}
                    onClick={() => index === 0 && setShowAlert(true)}
                  >
                    <span className={`message-icon ${message.icon}`}>
                      {message.icon === "bank" ? "B" : <Icon name="message" size={16} />}
                    </span>
                    <span className="message-copy">
                      <span className="message-meta">
                        <small>{message.sender}</small>
                        <em>{message.time}</em>
                      </span>
                      <strong>{message.title}</strong>
                      <p>{message.preview}</p>
                    </span>
                    <span className="view-label">VER</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="panel analyzer">
              <div className="panel-title">
                <div>
                  <Icon name="search" size={17} />
                  <h2>Analizador manual</h2>
                </div>
              </div>
              <p className="analyzer-help">
                Pega un mensaje o enlace y te explicamos si es seguro.
              </p>
              <textarea
                value={analysisText}
                onChange={(event) => {
                  setAnalysisText(event.target.value);
                  setAnalysisResult(false);
                }}
                placeholder="Pega aquí cualquier mensaje o enlace sospechoso..."
              />
              <button
                className="analyze-action"
                disabled={!analysisText.trim()}
                onClick={() => setAnalysisResult(true)}
              >
                <Icon name="search" size={16} />
                Analizar contenido
              </button>
              {analysisResult && (
                <div className="inline-result">
                  <Icon name="alert" size={17} />
                  <span>
                    <strong>Posible intento de estafa</strong>
                    <small>No abras enlaces ni compartas claves o códigos.</small>
                  </span>
                </div>
              )}
            </section>
          </div>

          <nav className="nav">
            {[
              ["Mensajes", "message"],
              ["Llamadas", "phone"],
              ["Protección", "shield"],
            ].map(([label, icon]) => (
              <button
                key={label}
                className={activeNav === label ? "active" : ""}
                onClick={() => setActiveNav(label)}
              >
                <Icon name={icon as IconName} size={20} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {showAlert && (
            <div className="alert-overlay" role="dialog" aria-modal="true">
              <div className="alert-modal">
                <button
                  className="modal-close"
                  onClick={() => setShowAlert(false)}
                  aria-label="Cerrar alerta"
                >
                  <Icon name="close" size={18} />
                </button>
                <span className={`modal-symbol ${blocked ? "success" : ""}`}>
                  <Icon name={blocked ? "check" : "alert"} size={30} />
                </span>
                {blocked ? (
                  <>
                    <p className="modal-kicker safe">CONTACTO BLOQUEADO</p>
                    <h2>Ya estás protegido</h2>
                    <p className="modal-intro">
                      Bloqueamos al remitente y marcamos el mensaje como fraude.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="modal-kicker">MENSAJE SOSPECHOSO DETECTADO</p>
                    <h2>No abras este enlace</h2>
                    <p className="modal-intro">
                      El mensaje usa urgencia y suplanta la identidad de tu banco.
                    </p>
                    <div className="fake-message">
                      <div>
                        <span>SMS</span>
                        <strong>BANCOESTADO</strong>
                        <small>Ahora</small>
                      </div>
                      <p>
                        Su cuenta ha sido bloqueada. Verifique sus datos de inmediato
                        en <b>bancoestado-seguridad.info</b>
                      </p>
                    </div>
                    <div className="signals">
                      <p>
                        <Icon name="alert" size={14} /> El enlace no pertenece al banco
                      </p>
                      <p>
                        <Icon name="alert" size={14} /> Intenta generar miedo y urgencia
                      </p>
                    </div>
                    <button className="block-action" onClick={blockSender}>
                      <Icon name="block" size={18} />
                      Bloquear remitente
                    </button>
                    <button className="dismiss-action" onClick={() => setShowAlert(false)}>
                      Ya lo eliminé
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
