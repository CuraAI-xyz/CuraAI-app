import { useState } from "react";

export default function ToggleButton() {
  const [active, setActive] = useState(false);

  return (
    <div
      onClick={() => setActive(!active)}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all ${active ? "bg-[#61A5C2]" : "bg-gray-300"}`}>
      <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
          active ? "translate-x-6" : ""
        }`}
      ></div>
    </div>
  );
}
