import React, { useState, useRef, useEffect } from "react";
import { Mic } from "lucide-react";

function RecordingButton() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAI, setIsPlayingAI] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const wsRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("wss://cura-ai-production-63d5.up.railway.app/audio");

    wsRef.current.onopen = () => console.log("WebSocket conectado");

    wsRef.current.onmessage = async (event) => {
      console.log("Mensaje recibido del servidor:", event.data);

      if (typeof event.data === "string") {
        console.log("Texto recibido:", event.data);
      } else if (event.data instanceof Blob) {
        await playAudioBlob(event.data);
      } else if (event.data instanceof ArrayBuffer) {
        const blob = new Blob([event.data], { type: "audio/wav" });
        await playAudioBlob(blob);
      }
    };

    wsRef.current.onerror = (error) => console.error("Error en WebSocket:", error);
    wsRef.current.onclose = () => console.log("WebSocket desconectado");

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudioBlob = async (blob) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onplay = () => setIsPlayingAI(true);
      audio.onended = () => {
        setIsPlayingAI(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = (err) => {
        console.error("Error reproduciendo audio IA:", err);
        setIsPlayingAI(false);
      };

      await audio.play();
    } catch (err) {
      console.error("Error al reproducir audio IA:", err);
      setIsPlayingAI(false);
    }
  };

  const startRecording = async () => {
    try {
      console.log("Intentando acceder al micrófono...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));

        if (wsRef.current?.readyState === WebSocket.OPEN) {
          blob.arrayBuffer().then((buffer) => {
            wsRef.current.send(buffer);
            console.log("Audio enviado por WebSocket");
          });
        }

        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      console.log("🎙️ Grabación iniciada");
    } catch (err) {
      console.error("Error accediendo al micrófono:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      console.log("⏹️ Grabación detenida");
    }
    setIsRecording(false);
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`w-30 h-30 p-8 mx-auto rounded-full select-none touch-manipulation cursor-pointer transition-all ${
          isRecording ? "bg-red-500 active:bg-red-600" : "bg-[#61A5C2] active:bg-[#5d9cb7]"
        }`}
      >
        <Mic size={32} color="white" />
      </button>

      {isRecording && (
        <div className="flex gap-3 w-min mx-auto items-center">
          <p className="mx-auto font-semibold">Recording...</p>
          <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse"></div>
        </div>
      )}

      {isPlayingAI && (
        <div className="flex gap-3 w-min mx-auto items-center mt-2">
          <p className="mx-auto font-semibold text-green-600">🔊 IA hablando...</p>
          <div className="h-2 w-2 bg-green-600 rounded-full animate-pulse"></div>
        </div>
      )}
    </>
  );
}

export default RecordingButton;
