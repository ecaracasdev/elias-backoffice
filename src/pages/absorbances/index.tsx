import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

interface Absorbance {
  _id: {
    temperature: string;
    concentration: string;
    dayOfStudy: string;
    compound: string;
  };
  maxIntensities: number[];
  avgIntensity: number;
}

export const AbsorbancesPage: React.FC<{}> = () => {
  const { refreshToken } = useAuth();
  const [absorbances, setAbsorbances] = useState<Absorbance[]>([]);
  const [filter, setFilter] = useState<{
    temperature: string;
    concentration: string;
    dayOfStudy: string;
    compound: string;
  }>({
    temperature: "",
    concentration: "",
    dayOfStudy: "",
    compound: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAbsorbances = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/absorbances",
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );
        setAbsorbances(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAbsorbances();
  }, [refreshToken]);

  const handleDeleteMaxIntensity = async (
    absorbance: Absorbance,
    maxIntensity: any
  ) => {
    const { data: newAbsorbances } = await axios.patch(
      "http://localhost:1337/api/absorbances",
      { _id: absorbance._id, maxIntensity },
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );
    setAbsorbances(newAbsorbances);
  };

  const filteredAbsorbances = absorbances.filter((absorbance) => {
    return (
      absorbance._id.temperature.includes(filter.temperature) &&
      absorbance._id.concentration.includes(filter.concentration) &&
      absorbance._id.dayOfStudy.includes(filter.dayOfStudy)
    );
  });

  return (
    <div>
      <h1>Absorbances</h1>
      <button onClick={() => navigate("/")}>Add More Files</button>
      {/***
       * hay que modificar los filtros para que sean select, van a seguir seteando el state de cada filter pero en lugar de tomar 
       * el valor que va escribiendo el usuario, los valores tienen que venir de una consulta a la api 
       *  getConditions() que es un findConditionsByUserId en realidad , trae una lista con las codiciones con las que ha ido trabajando
       * el usuario 
       *
       */}
      <input
        type="text"
        value={filter.temperature}
        onChange={(e) => setFilter({ ...filter, temperature: e.target.value })}
        placeholder="Filter by temperature"
      />
      <input
        type="text"
        value={filter.concentration}
        onChange={(e) =>
          setFilter({ ...filter, concentration: e.target.value })
        }
        placeholder="Filter by concentration"
      />

      <input
        type="text"
        value={filter.dayOfStudy}
        onChange={(e) => setFilter({ ...filter, dayOfStudy: e.target.value })}
        placeholder="Filter by day of study"
      />
      <input
        type="text"
        value={filter.compound}
        onChange={(e) => setFilter({ ...filter, compound: e.target.value })}
        placeholder="Filter Compuesto"
      />
      <table>
        <thead>
          <tr>
            <th>Compound</th>
            <th>Temperature</th>
            <th>Concentration</th>
            <th>Day of study</th>
            <th>Max Intensities</th>
            <th>Avg Intensity</th>
          </tr>
        </thead>
        <tbody>
          {filteredAbsorbances.map((absorbance) => (
            <tr key={JSON.stringify(absorbance._id)}>
              <td>{absorbance._id.compound}</td>
              <td>{absorbance._id.temperature}</td>
              <td>{absorbance._id.concentration}</td>
              <td>{absorbance._id.dayOfStudy}</td>
              <td>
                <ul>
                  {absorbance.maxIntensities.map((maxIntensity, index) => (
                    <li key={index}>
                      <span>{maxIntensity}</span>
                      <button
                        onClick={(e) =>
                          handleDeleteMaxIntensity(absorbance, maxIntensity)
                        }
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
              <td>{absorbance.avgIntensity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
