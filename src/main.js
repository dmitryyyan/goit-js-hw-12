import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.search-form');
const list = document.querySelector('.pictures-list');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.button-load');

const lightbox = new SimpleLightbox('.gallery-card a.gallary-card-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

let search = null;
let totalResult = 0;
let page = 1;
const perPage = 15;

function toggleLoader(show, isLoadMore = false) {
  if (isLoadMore) {
    loadBtn.style.display = show ? 'none' : 'flex';
  }
  loader.style.display = show ? 'flex' : 'none';
}

function toggleLoadBtn(show) {
  loadBtn.disabled = !show;
  loadBtn.style.display = show ? 'flex' : 'none';
  loadBtn.style.opacity = show ? 1 : 0;
  loadBtn.style.overflow = show ? 'visible' : 'hidden';
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  let searchImg = e.target.elements.input.value.trim();
  search = searchImg;
  page = 1;

  if (search === '') {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',
      backgroundColor: '#add8e6',
      messageColor: 'white',
    });
    return;
  }

  toggleLoader(true);

  if (lightbox) {
    lightbox.close();
    list.innerHTML = '';
  }

  try {
    const data = await getImg();
    totalResult = data.totalHits;
    render(data.hits);
    lightbox.refresh();

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, no images match your search query. Please try again!',
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
      });
      toggleLoadBtn(false);
    } else {
      checkLastPage();
    }
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
    });
    toggleLoadBtn(false);
  } finally {
    toggleLoader(false);
  }

  e.target.reset();
});

// Кнопка Load More
loadBtn.addEventListener('click', async () => {
  page += 1;
  toggleLoader(true, true);

  try {
    const data = await getImg();
    render(data.hits);
    lightbox.refresh();
    checkLastPage();

    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach(card => {
      const cardSize = card.getBoundingClientRect();
      window.scrollBy({
        top: cardSize.height * 1.36,
        behavior: 'smooth',
      });
    });
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while fetching more images. Please try again later.',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
    });
    toggleLoadBtn(false);
  } finally {
    toggleLoader(false, true);
  }
});

function checkLastPage() {
  const maxPage = Math.ceil(totalResult / perPage);
  if (page >= maxPage) {
    iziToast.warning({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      backgroundColor: '#add8e6',
      messageColor: 'white',
    });
    toggleLoadBtn(false);
  } else {
    toggleLoadBtn(true);
  }
}

async function getImg() {
  const API_KEY = '42193842-675e74ed987999787d4b57f5e';

  const params = new URLSearchParams({
    key: API_KEY,
    per_page: perPage,
    page: page,
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from API');
  }
}

function render(imgs) {
  const markup = imgs
    .map(img => {
      return `<li class="gallery-card">
    <a class="gallary-card-link" href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" />
    <ul class="image-info">
            <li class="image-item-info">
            <p>Likes</p>
            <p>${img.likes}</p>
        </li>
        <li class="image-item-info">
            <p>Views</p>
            <p>${img.views}</p>
        </li>
        <li class="image-item-info">
            <p>Comments</p>
            <p>${img.comments}</p>
        </li>
        <li class="image-item-info">
            <p>Downloads</p>
            <p>${img.downloads}</p>
        </li>
    </ul>
    </a>
</li>`;
    })
    .join('');

  list.insertAdjacentHTML('beforeend', markup);
}
