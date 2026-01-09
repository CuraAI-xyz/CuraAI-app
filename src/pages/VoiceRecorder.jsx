import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../userContext.jsx';

function VoiceRecorder({ patientId = "123" }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null); 
  const [aiResponseAudio, setAiResponseAudio] = useState(null); 
  const [connectionStatus, setConnectionStatus] = useState("Conectando...");
  const {setShowCalendar} = useContext(UserContext);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const socketRef = useRef(null);

  useEffect(() => {
    connectWebSocket();
    // Limpieza al salir
    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, [patientId]);

  const connectWebSocket = () => {
    // Asegúrate de que esta URL coincida con tu backend
    
    const wsUrl = `wss://curaai-agent-production.up.railway.app/audio?patient_id=${patientId}`;
    console.log("Intentando conectar a:", wsUrl);

    const ws = new WebSocket(wsUrl);
    ws.binaryType = 'blob';  

    ws.onopen = () => {
      console.log("✅ WebSocket Conectado");
      setConnectionStatus("🟢 Conectado");
    };

    ws.onmessage = (event) => {
      const data = event.data;

      if (data instanceof Blob) {
        console.log("🔊 Audio recibido:", data.size, "bytes");

        if (data.size < 100) {
           console.warn("⚠️ Archivo muy pequeño, ignorando.");
           return; 
        }

        const audioBlob = new Blob([data], { type: 'audio/mpeg' }); 
        
        // Creamos la URL con este nuevo Blob tipado
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setAiResponseAudio(audioUrl);
        
        // Reproducir
        const audio = new Audio(audioUrl);
        audio.play().catch(e => console.warn("Autoplay bloqueado:", e));
      } 
      else if (typeof data === 'string') {
        console.log("LA DATAA: ", data)
          setShowCalendar(true)
      }
    };
    
    ws.onerror = (error) => {
      console.error("❌ Error WebSocket:", error);
      setConnectionStatus("🔴 Error de Conexión");
    };

    ws.onclose = () => {
      console.log("WebSocket Desconectado");
      setConnectionStatus("⚪ Desconectado");
    };

    socketRef.current = ws;
  };

  const startRecording = async () => {
    console.log("🎤 Solicitando acceso al micrófono...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      console.log("✅ Acceso concedido. Iniciando grabadora...");
      
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Usamos el tipo MIME nativo que eligió el navegador
        const mimeType = mediaRecorder.mimeType || 'audio/webm'; 
        console.log("⏹ Grabación finalizada. Formato:", mimeType);
        
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        console.log("📦 Blob creado:", blob.size, "bytes");
        
        setAudioBlob(blob);
        
        // Detener el micrófono para que se apague la luz roja
        stream.getTracks().forEach(track => track.stop());
        
        sendAudioToBackend(blob);
      };

      mediaRecorder.start(100); // Guardar chunks cada 100ms
      setIsRecording(true);

    } catch (error) {
      console.error("❌ Error al acceder al micrófono:", error);
      alert("No se pudo iniciar la grabación. Revisa la consola (F12) y los permisos del navegador.");
    }
  };

  
  const sendAudioToBackend = (blobToSend = null) => {
    // Usar el blob pasado como parámetro, o el del estado como fallback
    const blob = blobToSend || audioBlob;
    
    if (!blob) {
      console.warn("⚠️ No hay audio grabado para enviar");
      alert("No hay audio grabado para enviar");
      return;
    }
    
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("📤 Enviando audio al backend...", blob.size, "bytes");
      setAiResponseAudio(null); // Limpiar respuesta anterior
      socketRef.current.send(blob);
      // Limpiar el blob después de enviar
      setAudioBlob(null);
    } else {
      console.error("⚠️ WebSocket no está abierto. Estado:", socketRef.current?.readyState);
      alert("⚠️ No hay conexión con el servidor. Recarga la página.");
      connectWebSocket(); // Intentar reconectar
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="voice-recorder-container font-rubik" style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <div className="controls" style={{ margin: '20px 0' }}>
        <button 
          onClick={isRecording ? stopRecording : startRecording}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            borderRadius: '50px',
            cursor: 'pointer',
            backgroundColor: isRecording ? '#ff4d4f' : '#61A5C2',
            color: 'white',
            border: 'none'
          }}
          >
          {isRecording ? '⏹ Detener' : '🎙 Grabar'}
        </button>
      </div>
          <h3>Estado: {connectionStatus}</h3>
    </div>
  );
}

export default VoiceRecorder;