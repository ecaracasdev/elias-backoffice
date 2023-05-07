import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
interface FileData {
  name: string;
  content: string;
}
Modal.setAppElement("#root");
export const HomePage: React.FC<{}> = () => {
  const { refreshToken } = useAuth();
  const [fecha, setFecha] = useState("");

  // const [temperatura, setTemperatura] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [unidadTemperatura, setUnidadTemperatura] = useState("");

  const [compound, setCompound] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [filesData, setFilesData] = useState<FileData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFilesInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const promises = selectedFiles.map((file: File) => {
      return new Promise<FileData>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            const content = event.target.result.toString();
            resolve({ name: file.name, content });
          } else {
            reject(new Error("Failed to read file"));
          }
        };
        reader.readAsText(file);
      });
    });

    try {
      const filesData = await Promise.all(promises);
      for (const file of filesData) {
        const payload = {
          compound: compound,
          temperature: temperatura,
          dayOfStudy: fecha,
          absorbances: file,
        };
        /* const response =  */await axios.post(
          "http://localhost:1337/api/absorbances",
          payload,
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );
      }

      // setFilesData(filesData);
      setIsLoading(false);
      setIsModalOpen(true);
      setSelectedFiles([]);
      setFecha("");
      setTemperatura("");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  function handleUnidadTemperaturaChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setUnidadTemperatura(event.target.value);
    setTemperatura((prevTemperatura) => {
      const numericValue = parseFloat(prevTemperatura);
      if (isNaN(numericValue)) {
        return "";
      }
      switch (event.target.value) {
        case "K":
          return `${numericValue} K`;
        case "C":
          return `${numericValue} °C`;
        case "F":
          return `${numericValue} °F`;
        default:
          return "";
      }
    });
  }

  return (
    <div>
      <h1>Subir Archivos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="compound">
            Compuesto:
            <input
              type="text"
              name="compound"
              id="compound"
              defaultValue={compound}
              onChange={(event) => setCompound(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="fecha">
            Fecha:
            <input
              type="text"
              name="fecha"
              id="fecha"
              defaultValue={fecha}
              onChange={(event) => setFecha(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="temperatura">
            Temperatura:
            <input
              type="text"
              name="temperatura"
              id="temperatura"
              value={temperatura}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTemperatura(event.target.value)
              }
            />
          </label>
          <select
            name="unidadTemperatura"
            id="unidadTemperatura"
            value={unidadTemperatura}
            onChange={handleUnidadTemperaturaChange}
          >
            <option value="K">K</option>
            <option value="C">°C</option>
            <option value="F">°F</option>
          </select>
        </div>

        <div>
          <label htmlFor="subirArchivos">
            Seleccionar Archivos:
            <input
              type="file"
              name="subirArchivos"
              id="subirArchivos"
              multiple
              onChange={handleFilesInput}
            />
          </label>
        </div>
        <button type="submit">Subir</button>
        <button onClick={() => navigate("/absorbances")}>Ver datos</button>
      </form>
      <div>
        <h3>Archivos seleccionados:</h3>
        <ul>
          {selectedFiles.map((file: File, index: number) => {
            return <li key={index}>{file.name}</li>;
          })}
        </ul>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Example Modal"
        style={customStyles}
      >
        {isLoading ? (
          <p>Cargando archivos...</p>
        ) : (
          <h2>Archivos cargados exitosamente</h2>
        )}
        <button onClick={() => navigate("/absorbances")}>Ver datos</button>
        <button onClick={() => setIsModalOpen(false)}>Cargar mas</button>
      </Modal>
    </div>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "30%",
    backgroundColor: "black",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 9999,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
};
