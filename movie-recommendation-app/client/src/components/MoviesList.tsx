import React from 'react'
import ExternalLinkSvg from './ExternalLinkSvg'
import type { Movie, MovieData } from '../types'

type Props = {
  search: {
    value: string
    filter: boolean
  }

  onSelect: (movie: Movie) => void
}

function MoviesList({ search, onSelect }: Props) {
  const [movies, setMovies] = React.useState<MovieData['data'] | null>(null)
  const [filterMovies, setFilteredMovies] = React.useState<
    MovieData['data'] | null
  >(null)
  const [isLoaded, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const fetchMovies = async () => {
      const url = import.meta.env.VITE_APP_API_URL as string
      if (!url) {
        throw new Error('API url is missing ')
      }
      try {
        const response = await fetch(`${url}/movies`)
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }

        const data: MovieData = await response.json()
        setMovies(data.data)
        setFilteredMovies(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (!isLoaded) {
      fetchMovies()
      setIsLoading(true)
    }
  }, [isLoaded])

  React.useEffect(() => {
    if (search.filter) {
      const filtered = movies?.filter((movie) =>
        movie.title.toLowerCase().includes(search.value.toLowerCase())
      )
      setFilteredMovies(filtered ?? [])
    }
    if (!search.filter || !search.value) {
      setFilteredMovies(movies)
    }
  }, [movies, search.filter, search.value])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '700px',
        gap: '10px',
      }}
    >
      {filterMovies?.map((movie) => (
        <div
          onClick={() => {
            onSelect(movie)
          }}
          key={movie.id}
          style={{
            backgroundColor: '#2b2b2b',
            padding: '10px 15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            borderRadius: '6px',
            color: '#f3f3f3',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#383838')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#2b2b2b')
          }
        >
          <p>{movie.title}</p>

          <a
            style={{
              color: 'unset',
              textDecoration: 'none',
            }}
            target='_blank'
            rel='noopener noreferrer'
            href={`https://www.themoviedb.org/movie/${movie.id}`}
          >
            <ExternalLinkSvg />
          </a>
        </div>
      ))}
    </div>
  )
}

export default MoviesList
