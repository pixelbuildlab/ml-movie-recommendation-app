import React from 'react'
import ExternalLinkSvg from './components/ExternalLinkSvg'
import MovieListCard from './components/MovieListCard'
import type { Movie, MovieData } from './types'

type Props = { onClear: () => void; selectedMovie: Movie }

function RecommendMovies({ onClear, selectedMovie }: Props) {
  const [movies, setMovies] = React.useState<MovieData['data'] | null>(null)

  const [isLoaded, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const fetchMovies = async () => {
      const url = import.meta.env.VITE_APP_API_URL as string
      if (!url) {
        throw new Error('API url is missing ')
      }
      try {
        const response = await fetch(
          `${url}/movies/recommend/${selectedMovie.id}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }

        const data: MovieData = await response.json()
        setMovies(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (!isLoaded) {
      fetchMovies()
      setIsLoading(true)
    }
  }, [isLoaded, selectedMovie.id])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80vw',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#1e1e1e',
        color: '#f3f3f3',
        borderRadius: '12px',
      }}
    >
      <h2 style={{ marginBottom: '10px', marginTop: '10px', color: '#fff' }}>
        Your selection
      </h2>

      <div
        style={{
          backgroundColor: '#2b2b2b',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: '500',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <p>{selectedMovie.title}</p>
        <a
          style={{
            color: 'unset',
            textDecoration: 'none',
          }}
          target='_blank'
          rel='noopener noreferrer'
          href={`https://www.themoviedb.org/movie/${selectedMovie.id}`}
        >
          <ExternalLinkSvg />
        </a>
      </div>

      <hr
        style={{
          margin: '10px 0',
          width: '50%',
          border: 'none',
          borderTop: '1px solid #444',
        }}
      />

      <h3 style={{ marginBottom: '10px', marginTop: '10px', color: '#e0e0e0' }}>
        Recommended Movies
      </h3>
      {isLoaded && movies?.length ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '60%',
          }}
        >
          {movies?.map((movie) => (
            <MovieListCard movie={movie} />
          ))}
        </div>
      ) : (
        <p>App Loading</p>
      )}
      <button
        onClick={onClear}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          backgroundColor: '#3b82f6',
          color: 'white',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: '500',
          transition: 'background-color 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = '#2563eb')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = '#3b82f6')
        }
      >
        Select again
      </button>
    </div>
  )
}

export default RecommendMovies
