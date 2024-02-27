import React, { Fragment, useState, useEffect } from "react";
import "../styles/home.scss";
import styles from "../styles/Login.module.scss";
import AudioPlayer from "./AudioPlayer";
import { tracks } from "../data/tracks";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../reducers/users";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { FastAverageColor } from "fast-average-color";

function Home() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sounds, setSounds] = useState([]);

  // const [backgroundColor, setBackgroundColor] = useState('transparent');

  // const extractDominantColor = (imageUrl) => {
  //     const image = new Image();
  //     image.crossOrigin = 'Anonymous';
  //     image.src = imageUrl;

  //     const fac = new FastAverageColor();

  //     image.onload = function () {
  //         fac.getColorAsync(image)
  //             .then(color => {
  //                 setBackgroundColor(color.hex);
  //             })
  //             .catch(e => {
  //                 console.error('Erreur lors de l\'extraction de la couleur dominante :', e);
  //             });
  //     };
  // };

  const changeSounds = (id) => {
    const selectedSound = sounds.find((sound) => sound.id === id);
    const selectedTrackInfo = tracks.find(
      (track) => track.id === selectedSound.id
    );
    setSelectedTrack(selectedTrackInfo);
    // extractDominantColor(selectedSound.image);
  };

  //combine les appels API
  useEffect(() => {
    async function fetchData(url, setter) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData("http://localhost:5500/categories", setCategories);
    fetchData("http://localhost:5500/sounds", setSounds);
  }, []);

  // useEffect(() => {
  //     sounds.forEach((sound) => {
  //         extractDominantColor(sound.image);
  //     });
  // }, [sounds]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupOpen, setsignupOpen] = useState(false);
  const [signinOpen, setsigninOpen] = useState(false);
  const [usernameSignup, setUsernameSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [usernameSignin, setUsernameSignin] = useState("");
  const [passwordSignin, setPasswordSignin] = useState("");
  const [isConnected, setIsConnected] = useState("");

  const user = useSelector((state) => {
    if (state.users.value.length > 0) {
      return state.users.value[0].newUser;
    }
    return null;
  });

  const openSignup = () => {
    setsignupOpen(true);
  };
  const closeSignup = () => {
    setsignupOpen(false);
  };
  const openSignin = () => {
    setsigninOpen(true);
  };
  const closeSignin = () => {
    setsigninOpen(false);
  };
  const disconnect = () => {
    setIsConnected(false);
  }

  const signup = (e) => {
    e.preventDefault();
    const profile = {
      username: usernameSignup,
      password: passwordSignup,
    };
    fetch("http://localhost:5500/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(addUser(data));
        if (data.result) {
          navigate("/");
        }
      });
    setUsernameSignup("");
    setPasswordSignup("");
    closeSignup();
    openSignin();
  };

  const signin = (e) => {
    e.preventDefault();
    const profile = {
      username: usernameSignin,
      password: passwordSignin,
    };
    fetch("http://localhost:5500/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addUser(data));
        console.log(data);
        if (data.result) {
            setIsConnected(true);        
          navigate("/");
        }
      });
    setUsernameSignin("");
    setPasswordSignin("");
    closeSignin();
  };


  return (
    <div className="home-container">
      <div className="home-content">
        <div className="header">
          <p>Bonjour {isConnected?  (user.username) : ("")} !</p>
          <div className="userConnect">

            {/* Conditionne la connexion de l'utilisateur*/}
            
            { isConnected? (
                <div>
                <button className="connect" onClick={disconnect}>
                Déconnexion
              </button>
              </div>
            ) : (
                <div>
            <button className="connect" onClick={openSignin}>
              Se connecter
            </button>
            <button className="signup" onClick={openSignup}>
              Créer un compte
            </button>
            </div>
            )}
          </div>
          
        </div>
        <h2>Catégories</h2>
        <div className="category-scrolling">
          {categories.map((item) => (
            <Fragment>
              <div key={item.id}>
                <img src={item.image} alt={item.name} />
                <label htmlFor="img">{item.name}</label>
              </div>
            </Fragment>
          ))}
        </div>
        <h2>Sons populaires</h2>
        <div className="popular-scrolling">
          {sounds.map((item) => (
            <Fragment>
              <div className="popular">
                <img
                  className="popularimg"
                  src={item.image}
                  alt={item.name}
                  onClick={() => changeSounds(item.id)}
                />
                <label key={item.id + "_label"} htmlFor="img">
                  {item.name}
                </label>
              </div>
            </Fragment>
          ))}
        </div>

        {signupOpen && (
          <div className={styles.modalSignup}>
            <div className={styles.modalContent}>
              <button className={styles.modalClose} onClick={closeSignup}>
                &times;
              </button>
              <FontAwesomeIcon />
              <h4>Crée ton compte LireMersion !</h4>
              <form className={styles.modalForm}>
                <input
                  type="text"
                  placeholder="Login"
                  onChange={(e) => setUsernameSignup(e.target.value)}
                  value={usernameSignup}
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  onChange={(e) => setPasswordSignup(e.target.value)}
                  value={passwordSignup}
                />
                <button className={styles.signupBtn} onClick={signup}> 
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        )}
        {signinOpen && (
          <div className={styles.modalSignup}>
            <div className={styles.modalContent}>
              <button className={styles.modalClose} onClick={closeSignin}>
                &times;
              </button>
              <FontAwesomeIcon />
              <h4>Connecte-toi !</h4>
              <form className={styles.modalForm}>
                <input
                  type="text"
                  placeholder="Login"
                  onChange={(e) => setUsernameSignin(e.target.value)}
                  value={usernameSignin}
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  onChange={(e) => setPasswordSignin(e.target.value)}
                  value={passwordSignin}
                />
                <button className={styles.signupBtn} onClick={signin}>
                  S'identifier
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {
        <AudioPlayer
          selectedTrack={selectedTrack} /*backgroundColor={backgroundColor}*/
        />
      }
    </div>
  );
}

export default Home;
