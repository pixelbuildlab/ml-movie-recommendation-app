import React from 'react'
import MovieListCard from './MovieListCard'
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

  if (!isLoaded || !movies?.length) {
    return <p>App Loading</p>
  }

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
        <MovieListCard
          movie={movie}
          onClick={() => onSelect(movie)}
        />
      ))}
    </div>
  )
}

export default MoviesList
