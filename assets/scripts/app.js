const modal = document.querySelector('.modal');
const modalActionAdd = document.querySelector('header button');
const backDrop = document.getElementById('backdrop');
const cancelMovieModal = document.querySelector('.btn--passive');
const addMovieElement = document.querySelector('.btn--success');
const movieListDOM = document.getElementById('movie-list');
const isShowMessage = document.getElementById('entry-text');
let movieList = [];
const updateUI = () => {
  if (movieList.length) {
    isShowMessage.style.display = 'none';
    return;
  }
  isShowMessage.style.display = 'block';
};
const toggleBackDrop = () => {
  backDrop.classList.toggle('visible');
};
const showMovieModal = () => {
  modal.classList.toggle('visible');
  toggleBackDrop();
};
const clearData = () => {
  const inputs = document.querySelectorAll('.modal input');
  for (ele of inputs) {
    ele.value = '';
  }
};

const closeMovieModal = () => {
  modal.classList.remove('visible');
};
const closeBackdrop = () => {
  backDrop.classList.remove('visible');
};

const deleteMovie = (movieId) => {
  const index = movieList.findIndex((movie) => movie.id === movieId);
  movieList.splice(index, 1);
  movieListDOM.removeChild(movieListDOM.children[index]);
  closeDeleteModal();
};
const closeDeleteModal = () => {
  const closeDeleteModal = document.getElementById('delete-modal');
  closeDeleteModal.classList.remove('visible');
};
const handleDelete = (movieID) => {
  const openDeleteModal = document.getElementById('delete-modal');
  openDeleteModal.classList.add('visible');
  openDeleteModal
    .querySelector('.btn--passive')
    .addEventListener('click', () => {
      closeBackdrop();
      closeDeleteModal();
      openDeleteModal.classList.remove('visible');
    });
  console.log(movieID);
  openDeleteModal
    .querySelector('.btn--danger')
    .addEventListener('click', deleteMovie.bind(null, movieID));
};
const addMovieToDOM = ({ id, title, image, rating }) => {
  const liElement = document.createElement('li');
  liElement.className = 'movie-element';
  liElement.innerHTML = `<div class="movie-element__image">
  <img src="${image}" alt="${title}"/></div>
  <div class="movie-element__info">
  <h3>${title}</h3>
  <p>${rating}/5</p>
  <button>Delete</button>
  </div>`;
  movieListDOM.append(liElement);
  liElement.addEventListener('click', handleDelete.bind(null, id));
};
const handleMovieAdd = () => {
  const inputs = document.querySelectorAll('.modal input');
  console.log(inputs);
  const title = inputs[0].value;
  const image = inputs[1].value;
  const rating = inputs[2].value;
  console.dir(inputs[0]);
  if (
    title.trim() === '' ||
    image.trim() === '' ||
    rating.trim() === '' ||
    +parseInt(rating) < 1 ||
    +parseInt(rating) > 5
  ) {
    alert('invalid input');
    return;
  }
  const newMovie = { title, image, rating, id: Math.random().toString() };
  movieList.push(newMovie);
  updateUI();
  addMovieToDOM(newMovie);
  showMovieModal();
  clearData();
};
modalActionAdd.addEventListener('click', showMovieModal);
backDrop.addEventListener('click', () => {
  backDrop.classList.remove('visible');
  document.querySelector('.modal').classList.remove('visible');
  const openDeleteModal = document.getElementById('delete-modal');
  openDeleteModal.classList.remove('visible');
  clearData();
});
cancelMovieModal.addEventListener('click', toggleBackDrop);
addMovieElement.addEventListener('click', handleMovieAdd);
