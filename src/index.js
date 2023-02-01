import './css/styles.css';
import Notiflix from 'notiflix';
const axios = require('axios').default;
const API_KEY = '33289628-97fffc14136600725dd3f07c9';
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSubmitClick);

async function onSubmitClick(e) {
  const arrObj = await getSearchArr(getValueForm(e));
  if (!arrObj) {
    return;
  }
  gallery.innerHTML = await renderCard(arrObj);
}

function getValueForm(e) {
  e.preventDefault();
  let getValue = e.target.elements.searchQuery.value;
  return getValue;
}

async function getSearchArr(text) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${text}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    if (response.data.totalHits === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      return await response.data.hits;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function renderCard(arr) {
  if (!arr) {
    return;
  }
  return await arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes:${likes}</b>
          </p>
          <p class="info-item">
            <b>Views:${views}</b>
          </p>
          <p class="info-item">
            <b>Comments:${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads:${downloads}</b>
          </p>
        </div>
      </div>`;
      }
    )
    .join('');
}
