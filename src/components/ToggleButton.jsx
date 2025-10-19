import { useState } from "react";

export default function ToggleButton() {
  const [active, setActive] = useState(false);

  const handleToggle = async () => {
    setActive(!active);

    const url = active
      ? "http://127.0.0.1:8000/stop_agent"
      : "http://127.0.0.1:8000/start_agent";

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error " + res.status);
      const data = await res.json();
      console.log("Respuesta:", data);
    } catch (err) {
      console.error("Error:", err);
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
