import ExternalLinkSvg from './ExternalLinkSvg'
import type { Movie } from '../types'

function MovieListCard({
  movie,
  onClick,
}: {
  movie: Movie
  onClick?: () => void
}) {
  return (
    <div
      key={movie.id}
      onClick={
        onClick
          ? onClick
          : () => {
              console.log('noop')
            }
      }
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
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#383838')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2b2b2b')}
    >
      <p>{movie.title}</p>

      <a
        onClick={(e) => e.stopPropagation()}
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
  )
}

export default MovieListCard
