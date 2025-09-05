import { useState } from 'react'
import css from './App.module.css'
import fetchMovies from '../../servieces/movieService.tsx'
import SearchBar from '../SearchBar/SearchBar.tsx'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import type Movie from '../../types/movie.ts'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(query: string) => {
    setMovies([]);
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={css.app}>
        <Toaster />
        <SearchBar onSubmit={handleSubmit}></SearchBar>
      </div>
    </>
  )
}

export default App
