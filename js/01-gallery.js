import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('.gallery');

const cards = creatGalleryCards(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', cards);

galleryEl.addEventListener('click', openModalClick);

function creatGalleryCards(image) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </div>`;
    })
    .join('');
}
let instance;

function openModalClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: instance => {
        window.addEventListener('keydown', closeModalEsc);
      },
      onClose: instance => {
        window.removeEventListener('keydown', closeModalEsc);
      },
    }
  );

  instance.show();
}

function closeModalEsc(event) {
  if (event.code === 'Escape') {
    instance.close();
  }
}
