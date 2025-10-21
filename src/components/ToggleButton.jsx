import { useState, useRef } from "react";

export default function ToggleButton() {
  const [active, setActive] = useState(false);
  const ws = useRef(null);

  const handleToggle = async () => {
    const newActive = !active;
    setActive(newActive);

    const url = newActive
      ? "http://127.0.0.1:8000/start_agent"
      : "http://127.0.0.1:8000/stop_agent";

    try {
      await fetch(url, { method: "POST" });
      console.log(newActive ? "Agente iniciado" : "Agente detenido");

      if (newActive) {
        if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
          ws.current.close();
        }

        ws.current = new WebSocket("ws://127.0.0.1:8000/ws/audio");

        ws.current.onopen = () => {
          console.log("WebSocket conectado y listo para recibir audio");
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
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all ${
        active ? "bg-[#61A5C2]" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
          active ? "translate-x-6" : ""
        }`}
      ></div>
    </div>
  );
}