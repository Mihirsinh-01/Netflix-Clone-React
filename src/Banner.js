import React, { useEffect, useState } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData(){
            const req = await axios.get(requests.fetchNetflixOriginals);
            var x = Math.floor(Math.random() * req.data.results.length - 1);
            setMovie(req.data.results[x]);
            return req;
        }
        fetchData();
    },[])
    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition:"center",
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner_buttons">
                    <button className="banner_button">
                        Play
                    </button>
                    <button className="banner_button">
                        My List
                    </button>
                </div>
                <h1 className="banner_des">
                    {movie?.overview}
                </h1>
            </div>
            <div className="banner--fadeBottom"> </div>
        </header>
    )
}

export default Banner
