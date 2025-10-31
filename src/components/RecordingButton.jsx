import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Download, Trash2 } from 'lucide-react';

function RecordingButton() {
    const [isRecording, setIsRecording] = React.useState(false);
    const [isPlayingAI, setIsPlayingAI] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);

    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const wsRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        // Conectar al WebSocket
        wsRef.current = new WebSocket('ws://cura-ai-production-63d5.up.railway.app/audio'); // Cambia la URL según tu servidor
        
        wsRef.current.onopen = () => {
            console.log('WebSocket conectado');
        };

         wsRef.current.onmessage = async (event) => {
        console.log("Mensaje recibido del servidor:", event.data);

        // 🔹 Si tu API devuelve texto (por ejemplo, una transcripción)
        if (typeof event.data === "string") {
            console.log("Texto recibido:", event.data);
        }

        // 🔹 Si devuelve audio binario de la IA (por ejemplo, WAV o WebM)
        else if (event.data instanceof Blob) {
            console.log("Audio de IA recibido como Blob, tamaño:", event.data.size, "bytes");
            // Solo reproducir si es audio de respuesta de la IA, no del usuario
            await playAudioBlob(event.data);
        }

        // 🔹 Si devuelve ArrayBuffer de la IA (por ejemplo, datos sin formato)
        else if (event.data instanceof ArrayBuffer) {
            console.log("Audio de IA recibido como ArrayBuffer, tamaño:", event.data.byteLength, "bytes");
            // Crear blob con el tipo de audio que envía la IA
            const blob = new Blob([event.data], { type: "audio/wav" });
            await playAudioBlob(blob);
        }
    };

        wsRef.current.onerror = (error) => {
            console.error('Error en WebSocket:', error);
        };

        wsRef.current.onclose = () => {
            console.log('WebSocket desconectado');
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            // Limpiar audio al desmontar
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }, [isRecording]);

    // Función para reproducir audio de respuesta de la IA
    const playAudioBlob = async (blob) => {
        try {
            // Detener audio anterior si está reproduciéndose
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            // Crear URL del blob
            const url = URL.createObjectURL(blob);
            
            // Crear elemento de audio
            const audio = new Audio(url);
            audioRef.current = audio;

            // Configurar eventos del audio
            audio.onloadedmetadata = () => {
                console.log("Audio de IA cargado, duración:", audio.duration, "segundos");
            };

            audio.oncanplaythrough = () => {
                console.log("Audio de IA listo para reproducir");
            };

            audio.onplay = () => {
                console.log("🔊 Reproduciendo respuesta de audio de la IA...");
                setIsPlayingAI(true);
            };

            audio.onended = () => {
                console.log("✅ Audio de IA terminado de reproducir");
                setIsPlayingAI(false);
                // Limpiar URL para liberar memoria
                URL.revokeObjectURL(url);
            };

            audio.onerror = (error) => {
                console.error("❌ Error al reproducir audio de IA:", error);
                setIsPlayingAI(false);
                URL.revokeObjectURL(url);
            };

            // Reproducir el audio de la IA
            await audio.play();
            
        } catch (error) {
            console.error("❌ Error al reproducir audio de IA:", error);
            setIsPlayingAI(false);
        }
    };

    const startRecording = async (e) => {
        if (e) e.preventDefault();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                const url = URL.createObjectURL(blob);
                setAudioURL(url);

                // Enviar el audio por WebSocket
                if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                    blob.arrayBuffer().then(buffer => {
                        wsRef.current.send(buffer);
                        console.log('Audio enviado por WebSocket');
                    });
                } else {
                    console.error('WebSocket no está conectado');
                }

                // Detener el stream
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
        } catch (error) {
            console.error('Error al acceder al micrófono:', error);
            setIsRecording(false);
        }
    };

    const stopRecording = (e) => {
        if (e) e.preventDefault();
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
    };

    const record = () => {
        setIsRecording(!isRecording);
    }

    const start = () => setIsRecording(true);
    const stop = () => setIsRecording(false);

    return (
        <>
            <button 
                onTouchStart={(e) => startRecording(e)} 
                onTouchEnd={(e) => stopRecording(e)}  
                onMouseDown={start} 
                onMouseUp={stop} 
                className="w-30 select-none touch-manipulation h-30 p-8 mx-auto rounded-full bg-[#61A5C2] active:bg-[#5d9cb7]"
            >
            </button>
            {isRecording ? (
                <div className='flex gap-3 w-min mx-auto items-center'>
                    <p className='mx-auto font-semibold'>Recording...</p>
                    <div className='h-2 w-2 bg-red-600 rounded-full'></div>
                </div>
            ) : null}
            {isPlayingAI ? (
                <div className='flex gap-3 w-min mx-auto items-center mt-2'>
                    <p className='mx-auto font-semibold text-green-600'>🔊 IA hablando...</p>
                    <div className='h-2 w-2 bg-green-600 rounded-full animate-pulse'></div>
                </div>
            ) : null}
        </>
    );
}

export default RecordingButton;