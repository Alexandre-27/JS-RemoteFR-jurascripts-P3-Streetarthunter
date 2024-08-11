import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Dropzone from "./DropZone";
import "./MapForm.scss";

function MapForm() {
  const { user, handleAuth } = useContext(AuthContext);
  const [artistSelect, setArtistSelect] = useState();
  const [artists, setArtists] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [filteredArtwork, setFilteredArtwork] = useState([]);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);

  // récup donnée artist et artwork
  const getInfos = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/artworks`)
      .then((res) => setArtworks([...res.data]))
      .catch((err) =>
        console.error("Erreur lors de la récupération des données :", err)
      );
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/artists`)
      .then((res) => setArtists(res.data))
      .catch((err) =>
        console.error("Erreur lors de la récupération des données :", err)
      );
  };

  useEffect(() => {
    const filteredArtworks = artworks.filter((artwork) => {
      const artistName = artwork.artist_name;
      return (
        artistName &&
        artistName.toLowerCase().includes(artistSelect.toLowerCase())
      );
    });

    setFilteredArtwork(filteredArtworks);
  }, [artistSelect]);

  useEffect(() => {
    handleAuth();
    getInfos();
  }, []);

  const handleReturn = () => {
    switch (user.is_administrator) {
      case 1:
        return (
          <>
            <h2 className="player-mode">Ajouter une capture</h2>

            <p>Se connecter en tant que joueur pour jouer</p>
          </>
        );
      case 0:
        return (
          <>
            <h2 className="player-mode">Ajouter une capture</h2>

            <form className="content">
              <h3>1. Sélectionne l'auteur de l'œuvre </h3>
              <select
                onChange={(event) => setArtistSelect(event.target.value)}
                className="artist-list"
              >
                <option value="" disabled defaultValue hidden>
                  Artistes
                </option>
                {Array.from(new Set(artists.map(({ name }) => name)))
                  .sort((a, b) => a.localeCompare(b))
                  .map((uniqueName) => (
                    <option value={uniqueName} key={uniqueName}>
                      {uniqueName}
                    </option>
                  ))}
              </select>
              {artistSelect !== undefined ? (
                <div className="artwork-select">
                  <h3>2. Sélectionne l'œuvre capturée</h3>
                  {filteredArtwork.map((artwork) => (
                    <div key={artwork.id}>
                      <img
                        src={artwork.picture}
                        alt=""
                        className="artworks-img"
                      />
                      <input
                        type="checkbox"
                        checked={selectedArtworkId === artwork.id}
                        onChange={() => setSelectedArtworkId(artwork.id)}
                        className="checkbox-img"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
              {selectedArtworkId && artistSelect !== undefined ? (
                <>
                  <h3>3. Télécharge ta capture</h3>
                  <Dropzone selectedArtworkId={selectedArtworkId} />
                </>
              ) : null}
            </form>
          </>
        );
      default:
        return (
          <div className="register-button">
            <Link to="/inscription" className="link">
              <button type="button">S'inscrire pour jouer</button>
            </Link>
          </div>
        );
    }
  };

  return <div className="form-container">{handleReturn()}</div>;
}

export default MapForm;
