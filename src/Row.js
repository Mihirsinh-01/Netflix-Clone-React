import React, {useState,useEffect} from 'react'
import axios from './axios'
import './Row.css'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/";


function Row({title,fetchUrl,large}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setUrl] = useState("");
    useEffect(()=>{
        async function fetchData(){
            const request=await axios.get(fetchUrl);
            setMovies(request.data.results);
            console.log(request.data.results);
            return request;
        }
        fetchData();

    }, [fetchUrl]);
    
    const opts = {
        height:"390",
        width:"100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setUrl('');
        }
        else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    const param = new URLSearchParams(new URL(url).search);
                    setUrl(param.get("v"));
                })
                .catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map(movie => (
                        <img
                            onClick={() =>handleClick(movie)}
                            key={movie.id}
                            className={`row__poster ${large && "row__posterlarge"}`}
                            src={`${base_url}${large?movie.poster_path:movie.backdrop_path}`}
                            alt={movie.name} />
                    ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}></Youtube>}
        </div>
    )
}

export default Row;

