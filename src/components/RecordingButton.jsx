import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Download, Trash2 } from 'lucide-react';

function RecordingButton() {
    const [isRecording, setIsRecording] = React.useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);

    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const wsRef = useRef(null);

    useEffect(() => {
        // Conectar al WebSocket
        wsRef.current = new WebSocket('ws://127.0.0.1:8000/ws/audio'); // Cambia la URL según tu servidor
        
        wsRef.current.onopen = () => {
            console.log('WebSocket conectado');
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
        };
    }, []);

    useEffect(() => {
        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }, [isRecording]);

    const startRecording = async () => {
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

    const stopRecording = () => {
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
            <button onMouseDown={start} onMouseUp={stop} className="w-30 h-30 p-8 mx-auto rounded-full bg-[#61A5C2] active:bg-[#5d9cb7]">
                <img src="/microphone.png" alt="" />
            </button>
            {isRecording ? (
                <div className='flex gap-3 w-min mx-auto items-center'>
                    <p className='mx-auto font-semibold'>Recording...</p>
                    <div className='h-2 w-2 bg-red-600 rounded-full'></div>
                </div>
            ) : null}
        </>
    );
}

export default RecordingButton;