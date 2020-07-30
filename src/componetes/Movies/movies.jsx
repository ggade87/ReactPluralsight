import React, { Component } from "react";
import Pagination from "../common/pagination";
import {} from "../../services/fakeMovieService";
import { getMovies, deleteMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import { toast } from "react-toastify";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import MoviesTable from "../../componetes/Movies/moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./../common/searchBox";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    genres: [],
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies: movies, genres: genres });
  }
  handleDelete = async (movie) => {
    const originalMOview = this.state.movies;
    const movies = originalMOview.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie already been deleted");
        this.setState({ movies: originalMOview });
      }
    }
  };
  handlerLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    console.log("Pagee");
    this.setState({ currentPage: page });
  };
  handleGenresSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allmovies,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allmovies;
    if (searchQuery)
      filtered = allmovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allmovies.filter((m) => m.genre._id === selectedGenre._id);
    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allmovies.filter((m) => m.genre._id === selectedGenre._id)
    //     : allmovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allmovies,
      sortColumn,
      searchQuery,
    } = this.state;

    const { user } = this.props;
    if (count === 0) {
      return <p>There is no movie in database</p>;
    }

    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenresSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
          ></SearchBox>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handlerLiked}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          ></MoviesTable>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;
