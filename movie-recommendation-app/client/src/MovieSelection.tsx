import React from 'react'
import MoviesList from './components/MoviesList'
import type { Movie } from './types'

type SearchMovie = {
  value: string
  filter: boolean
}
type Props = {
  onSelect: (movie: Movie) => void
}

function MovieSelection({ onSelect }: Props) {
  const [search, setSearch] = React.useState<SearchMovie>({
    value: '',
    filter: false,
  })

  const [inputValue, setInputValue] = React.useState('')

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSearch((prev) => ({ ...prev, value: inputValue, filter: false }))
    }, 300)
    return () => clearTimeout(timer)
  }, [inputValue])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearch((prev) => ({ ...prev, filter: true }))
    }
  }

  return (
    <>
      <h3>Movie Recommendation App</h3>
      <p>Pick movie of your choice</p>

      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        name='search'
        autoFocus={true}
        autoCorrect='off'
        autoComplete='off'
        id='search'
        placeholder='Type and hit enter'
        style={{
          padding: '10px',
          marginTop: '20px',
          width: '500px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />

      <hr
        style={{
          margin: '30px 0',
          width: '50%',
          border: 'none',
          borderTop: '1px solid #444',
        }}
      />

      <div
        style={{
          height: '50vh',
          overflowY: 'auto',
          paddingBottom: '20px',
          paddingRight: '15px',
        }}
      >
        <MoviesList
          search={search}
          onSelect={onSelect}
        />
      </div>
    </>
  )
}

export default MovieSelection
