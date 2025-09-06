import { useState } from 'react'
import css from './App.module.css'
import fetchMovies from '../../services/movieService.ts'
import SearchBar from '../SearchBar/SearchBar.tsx'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import type { Movie } from '../../types/movie.ts'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie>({} as Movie);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async(query: string) => {
    setMovies([]);
    setLoading(true);
    setError(false);
    try {
      const response = await fetchMovies({ query });
      console.log(response);

      if (response.results.length === 0) {
        toast.error('No movies found for your request.')
      } else {
        setMovies(response.results)
      }
    } catch (error) {
      console.log(error);
      setMovies([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleClick = (movie: Movie) => {
    console.log(movie);
    setSelectedMovie(movie);
    openModal();
  }

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie({} as Movie);
  }

  return (
    <>
      <div className={css.app}>
        <Toaster />
        <SearchBar onSubmit={handleSubmit}></SearchBar>
        {loading && <Loader></Loader>}
        {error ? (<ErrorMessage></ErrorMessage>) : (
          movies.length > 0 && <MovieGrid onSelect={handleClick} movies={movies}></MovieGrid>
        )}
        {isModalOpen && <MovieModal movie={selectedMovie} onClose={closeModal}></MovieModal>}
      </div>
    </>
  )
}

export default App
