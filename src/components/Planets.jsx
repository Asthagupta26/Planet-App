import React, { useEffect, useState } from "react";
import axios from "axios";

function Planets() {
    const [isLoading, setLoading] = useState(true);
    const [starWarsDataPlanets, setStarWarsDataPlanets] = useState();
    const [urlPlanets, setUrlPlanets] = useState(
        `https://swapi.dev/api/planets/?page=1`
    );
    const [residentDetails, setResidentDetails] = useState(null);
    const [showPlanetDetails, setShowPlanetDetails] = useState(true);

    useEffect(() => {
        axios.get(urlPlanets).then((response) => {
            setStarWarsDataPlanets(response.data);
            setLoading(false);
        });
    }, [urlPlanets]);

    if (isLoading) {
        return (
            <div>
                <div>
                    <h1 className="txt-shadow-gold">Planets</h1>
                    <button  className="button" disabled={true}>
                        ⏪ Previous Page
                    </button>
                    <button className="button" disabled={true}>
                        Next Page⏩
                    </button>
                </div>
                <div className="overlay">
                    Loading...
                </div>
            </div>
        );
    }

    function showResidentDetail(residents) {
        Promise.all(residents.map(url => axios.get(url)))
            .then(responses => {
                const residentDetails = responses.map(response => response.data);
                setResidentDetails(residentDetails);
                setShowPlanetDetails(false); // Hide other planet details when showing resident details
            })
            .catch(error => {
                console.error('Error fetching resident details:', error);
                setResidentDetails(null);
            });
    }

    let residentDetailsCard = null;
    if (residentDetails !== null) {
        residentDetailsCard = (
            <div className="resident-details-card card-resident card-planet">
                <h3>Resident Details</h3>
                <div className="resident-cards">
                    {residentDetails.map((resident, index) => (
                        <div className="resident-card" key={index}>
                            <p>Name: {resident.name}</p>
                            <p>Height: {resident.height}</p>
							<p>Mass: {resident.mass}</p>
							<p>Gender: {resident.gender}</p>
                           
                        </div>
                    ))}
                </div>
                <button onClick={() => {
                    setResidentDetails(null);
                    setShowPlanetDetails(true); // Show other planet details when closing resident details
                }}>Close</button>
            </div>
        );
    }

    return (
        <div>
            <h1 className="txt-shadow-gold">Planets</h1>
            {showPlanetDetails && (
                <div>
                    <button onClick={previousPage} disabled={!starWarsDataPlanets.previous}>
                        ⏪ Previous Page
                    </button>
                    <button onClick={nextPlanetPage} disabled={!starWarsDataPlanets.next}>
                        Next Page⏩
                    </button>
                </div>
            )}
            {residentDetailsCard}
            <div className="planet-container">
                {starWarsDataPlanets.results.map((planet) => (
                    <div className="card card-planet" key={planet.name} style={{ display: showPlanetDetails ? 'block' : 'none' }}>
                        <h2>{planet.name}</h2>
                        <p>Climate: {planet.climate}</p>
                        <p>Terrain: {planet.terrain}</p>
                        <p>Population: {planet.population}</p>
                        <button onClick={() => showResidentDetail(planet.residents)}>
                            Show Resident Details
                        </button>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );

    function nextPlanetPage() {
        setLoading(true);
        setUrlPlanets(starWarsDataPlanets.next);
    }

    function previousPage() {
        setLoading(true);
        setUrlPlanets(starWarsDataPlanets.previous);
    }
}

export default Planets;
