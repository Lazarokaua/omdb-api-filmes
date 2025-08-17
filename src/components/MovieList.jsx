export const MovieList = ({ movies }) => {
  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {movies.map((movie) => (

        <div key={movie.imdbID} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">


          <img
            src={movie.Poster}
            alt={`Pôster de ${movie.Title}`}
            className="w-full h-96 object-cover"
          />


          <div className="p-4">
            {/* Título do filme */}
            <h3 className="text-lg font-bold truncate">
              {movie.Title}
            </h3>


            <p className="text-gray-600 mt-1">
              {movie.Year}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
