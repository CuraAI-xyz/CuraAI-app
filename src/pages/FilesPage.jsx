import axios from 'axios';
import { useState } from 'react';
import loadingIcon from "../assets/loading.gif";
function FilesPage() {
  const [file, setFile] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const read_image = () => {
    if (!file) return;
    setLoading(true)
    const formData = new FormData();
    formData.append('image', file);
    axios.post("http://localhost:8080/ocr", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    }).then(response => {
        setLoading(false)
        let res_data = response.data
        res_data = JSON.parse(res_data.replace(/'/g, '"'));
        setPatientData(response.data);
        console.log("Tipo:", typeof response.data);
        console.log("Contenido:", response.data);

      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className=''>
        <div className='flex gap-4 items-center'>
            <input className="h-15 border-2 p-2 text-center border-[#61A5C2] text-[#61A5C2] rounded border-dashed" type="file" onChange={handleFileChange} />
            <button className="h-15 px-4 py-2 bg-[#61A5C2] text-white rounded" onClick={read_image} disabled={!file}>Leer imagen</button>
                {loading && <img width={50} src={loadingIcon} alt=""></img>}
        </div>
        {patientData && (
        <div className="flex flex-col rounded-lg shadow-lg p-4 mt-10 gap-6 bg-blue-50">
        <div className="flex flex-col">
        <p>Name:</p>
        <p className='text-black font-bold'>{patientData.name}</p>
        </div>
        <div className="flex flex-col">
        <p>Surname:</p>
        <p className='text-black font-bold'>{patientData.surname}</p>
        </div>
        <div className="flex flex-col">
        <p>Sex:</p>
        <p className='text-black font-bold'>{patientData.sex}</p>
        </div>
        <div className="flex flex-col">
        <p>ID:</p>
        <p className='text-black font-bold'>{patientData.id}</p>
        </div>
        </div>
        )}
    </div>
  );
}

export default FilesPage;