import { useState, useRef } from "react";

export default function ToggleButton() {
  const [active, setActive] = useState(false);
  const ws = useRef(null);
  const API_URL = import.meta.env.VITE_DEPLOY_URL;
  const handleToggle = async () => {
    const newActive = !active;
    setActive(newActive);

    const url = newActive
     // ? `https://${API_URL}/start_agent`
      //: `https://${API_URL}/stop_agent`;

    try {
      await fetch(url, { method: "POST" });
      console.log(newActive ? "Agente iniciado" : "Agente detenido");

      if (newActive) {
        if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
          ws.current.close();
        }

        //ws.current = new WebSocket("wss://cura-ai-production-63d5.up.railway.app/audio");
        ws.current = new WebSocket(`ws://localhost:8080/audio`);

        ws.current.onopen = () => {
          console.log("WebSocket conectado y listo para recibir audio (prod)");
          // No enviar mensaje de texto aquí, esperar audio del micrófono
        };

        ws.current.onerror = (err) => {
          console.error("Error en WebSocket:", err);
          setActive(false); // Revertir el estado si hay error
        };

        ws.current.onclose = (event) => {
          console.log("WebSocket cerrado", event.code, event.reason);
          if (active) {
            setActive(false); // Sincronizar estado si se cierra inesperadamente
          }
        };
      } else {
        if (ws.current) {
          if (ws.current.readyState === WebSocket.OPEN) {
            ws.current.close(1000, "Usuario detuvo el agente");
          }
          ws.current = null;
        }
      }
    } catch (err) {
      console.error("Error al cambiar el estado del agente:", err);
      setActive(!newActive); // Revertir el estado en caso de error
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all select-none touch-manipulation ${
        active ? "bg-[#61A5C2]" : "bg-gray-300"
      }`}
      style={{ 
        WebkitTouchCallout: 'none', 
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
          active ? "translate-x-6" : ""
        }`}
      ></div>
    </div>
  );
}