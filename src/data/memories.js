// ─────────────────────────────────────────────────────────────
// EDIT ONLY THIS LIST.
// 1. Copy a photo into public/memories/<month>/
// 2. Add its file name to that month below.
// Order here = order in the lightbox. Remove a name to remove a photo.
// ─────────────────────────────────────────────────────────────
const files = {
  june: [
    // 'photo-01.jpg',
    '1.jpeg',
    '2.jpeg',
    '3.jpeg',
    '4.jpeg',
    '5.jpeg',
    '6.jpeg',
    '7.jpeg',
    '8.jpeg',
    '9.jpeg',
  ],
  july: [
    '11.jpeg',
    '12.jpeg',
    '13.jpeg',
    '14.jpeg',
    '15.jpeg',
    '16.jpeg',
    '17.jpeg',
    '18.jpeg',
    '19.jpeg',
    '20.jpeg',
    '21.jpeg',
    '22.jpeg',
    '23.jpeg',
  ],
  august: [
    '30.jpeg',
    '31.jpeg',
    '32.jpeg',
    '33.jpeg',
    '34.jpeg',
    '35.jpeg',
    '36.jpeg',
    '37.jpeg',
  ],
  september: [
    '40.jpeg',
    '41.jpeg',
    '43.jpeg',
    '44.jpeg',
    '45.jpeg',
    '46.jpeg',
    '47.jpeg',
  ],
  october: [
    '51.jpeg',
    '52.jpeg',
    '53.jpeg',
    '54.jpeg',
    '55.jpeg',
    '56.jpeg',
    '57.jpeg',
    '58.jpeg',
    '59.jpeg',
    ],
  november: [
    '100.jpeg',
    '101.jpeg',
    '102.jpeg',
    '103.jpeg',
    '104.jpeg',
    '105.jpeg',
    '106.jpeg',
    '107.jpeg',
    '108.jpeg',
    '109.jpeg',
    '110.jpeg',
    '111.jpeg',
    '112.jpeg',
  ],
};

// ───────────── nothing below needs editing ─────────────
const BASE = import.meta.env.BASE_URL;
const order = ['june', 'july', 'august', 'september', 'october', 'november'];

let counter = 0;
export const months = order.map((id) => {
  const label = id[0].toUpperCase() + id.slice(1);
  const photos = files[id].map((name) => ({
    src: `${BASE}memories/${id}/${name}`,
    alt: `A memory from ${label}`,
    index: counter++, // position in the lightbox
  }));
  return { id, label, photos };
});

export const allPhotos = months.flatMap((m) => m.photos);

const pickEvenly = (list, k) =>
  list.length <= k
    ? list
    : Array.from({ length: k }, (_, i) => list[Math.round((i * (list.length - 1)) / (k - 1))]);

export const heroPhotos = pickEvenly(allPhotos, 4);
export const closingPhotos = allPhotos.slice(-3);
