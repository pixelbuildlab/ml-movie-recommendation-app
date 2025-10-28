import React from 'react'
import MovieSelection from './MovieSelection'
import RecommendMovies from './RecommendMovies'
import type { Movie } from './types'

function App() {
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null)

  const handleMovieSelection = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      {selectedMovie ? (
        <RecommendMovies
          onClear={() => setSelectedMovie(null)}
          selectedMovie={selectedMovie}
        />
      ) : (
        <MovieSelection onSelect={handleMovieSelection} />
      )}
    </div>
  )
}

export default App
