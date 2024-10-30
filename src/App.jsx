import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import ResultsTable from "./components/ResultsTable";
import Loader from "./components/Loader"; // Import the Loader component
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [resultado, setResultado] = useState("");
  const [afiliadoInfo, setAfiliadoInfo] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const loadExcel = async () => {
      try {
        const XLSX = await import("xlsx"); // Carga dinámica
        const response = await fetch("./suarez.xlsx");

        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(blob);
        fileReader.onload = (e) => {
          const ab = e.target.result;
          const wb = XLSX.read(ab, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(ws);
          setData(jsonData);
          setLoading(false);
        };
      } catch (error) {
        console.error("Error loading Excel file:", error);
        setLoading(false); // Asegúrate de cambiar el estado de loading en caso de error
      }
    };
    loadExcel();
  }, []);


  const handleSearch = async ({ nombre, apellido, dni }) => {
    const filteredResults = data.filter((item) => {
      const matchNombre = nombre ? (item.Nombre && item.Nombre.toLowerCase().includes(nombre.toLowerCase())) : true;
      const matchApellido = apellido ? (item.Apellido && item.Apellido.toLowerCase().includes(apellido.toLowerCase())) : true;
      const matchDNI = dni ? (item.Matrícula && item.Matrícula.toString().includes(dni)) : true;

      return matchNombre && matchApellido && matchDNI;
    });

    // Filtrar solo los afiliados
    const afiliados = filteredResults.filter(item => item['Estado afiliación'] === "AFILIADO");

    if (afiliados.length > 0) {
      setResultado("Afiliada/o: Sí");
      setAfiliadoInfo(afiliados);
    } else {
      setResultado("Afiliada/o: No hay afiliados con ese nombre.");
      setAfiliadoInfo([]);
    }

    // Save search history to Excel
    const afiliado = afiliados.length > 0 ? "Se encontraron resultados." : "No se encontraron afiliados.";
    await fetch('https://email-sender-service-8289.onrender.com/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, dni, afiliado }),
    });
  };

  return (
    <div className="app">
      <Header />
      {loading ? <Loader /> : <SearchForm onSearch={handleSearch} />}
      <p>{resultado}</p>
      <ResultsTable results={afiliadoInfo} />
    </div>
  );
};

export default App;
