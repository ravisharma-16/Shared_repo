// ─────────────────────────────────────────────────────────────
// EDIT ONLY THIS LIST.
// 1. Copy a photo or video into public/memories/<month>/
// 2. Add it to that month below. Three ways to write an entry:
//
//      'photo.jpeg',                                   plain photo, no caption
//      { file: 'photo.jpeg', caption: 'Our first coffee date' },
//      { file: 'clip.mp4',  caption: 'You laughing at me' },   video (.mp4 .webm .mov)
//
// Order here = order on the page and in the lightbox. Remove an entry to remove it.
// ─────────────────────────────────────────────────────────────
const files = {
  june: [
    { file: '1.jpeg', caption: 'Where our story begins' },
    { file: '2.jpeg', caption: 'Your smile, my favorite view' },
    { file: '3.jpeg', caption: 'Little moments, big feelings' },
    { file: '4.jpeg', caption: 'Quietly falling for you' },
    { file: '5.jpeg', caption: 'Just us, just happy' },
    { file: '6.jpeg', caption: 'My heart said yes' },
    { file: '7.jpeg', caption: 'Every day with you is a gift' },
    { file: '8.jpeg', caption: 'Sweet start, sweeter days' },
    { file: '9.jpeg', caption: 'Hello, my favorite person' },
    { file: '22.mp4', caption: 'Your laugh is my favorite sound' },
    { file: '33.mp4', caption: 'Moments that feel like magic' },
    { file: '44.mp4', caption: 'Caught being completely, happily us' },
    { file: '66.mp4', caption: 'If I could replay one day, it would be this' },
  ],
  july: [
    { file: '11.jpeg', caption: 'Sunshine looks better with you' },
    { file: '12.jpeg', caption: 'Laughing at nothing, loving everything' },
    { file: '13.jpeg', caption: 'Hand in hand, always' },
    { file: '14.jpeg', caption: 'You make ordinary days magic' },
    { file: '15.jpeg', caption: 'My safe place is you' },
    { file: '16.jpeg', caption: 'Pure happiness, captured' },
    { file: '17.jpeg', caption: 'Another day, another reason to love you' },
    { file: '18.jpeg', caption: 'Thank you for being you' },
    { file: '19.jpeg', caption: 'Us against the heat' },
    { file: '20.jpeg', caption: 'Wherever you are is home' },
    { file: '21.jpeg', caption: 'Moments I never want to forget' },
    { file: '22.jpeg', caption: 'Little adventures, big memories' },
    { file: '23.jpeg', caption: 'You, me, and endless smiles' },
    { file: '77.mp4', caption: 'Summer looks good on us' },
    { file: '88.mp4', caption: 'Dancing through life with you' },
  ],
  august: [
    { file: '30.jpeg', caption: 'Growing closer every day' },
    { file: '31.jpeg', caption: 'My heart beats for this' },
    { file: '32.jpeg', caption: 'Together is my favorite place' },
    { file: '33.jpeg', caption: 'You had me at hello' },
    { file: '34.jpeg', caption: 'Gentle days, grateful heart' },
    { file: '35.jpeg', caption: 'A forever kind of feeling' },
    { file: '36.jpeg', caption: 'Lucky me, lucky us' },
    { file: '37.jpeg', caption: 'Sweetest memories, made with you' },
    { file: '11.mp4', caption: 'Every second with you feels like a gift' },
  ],
  september: [
    { file: '40.jpeg', caption: 'New season, same love' },
    { file: '41.jpeg', caption: 'Falling for you, again' },
    { file: '43.jpeg', caption: 'You are my calm' },
    { file: '44.jpeg', caption: 'Cozy days beside you' },
    { file: '45.jpeg', caption: 'Every glance says I love you' },
    { file: '46.jpeg', caption: 'Our little world, growing bigger' },
    { file: '47.jpeg', caption: 'Holding on to this moment' },
    { file: '42.mp4', caption: 'Soft moments, forever kind of love' },
  ],
  october: [
    { file: '51.jpeg', caption: 'Golden days, golden you' },
    { file: '52.jpeg', caption: 'You warm my heart' },
    { file: '53.jpeg', caption: 'Wrapped up in your love' },
    { file: '54.jpeg', caption: 'Best part of my day: you' },
    { file: '55.jpeg', caption: 'Soft smiles, soft hearts' },
    { file: '56.jpeg', caption: 'My favorite kind of happy' },
    { file: '57.jpeg', caption: 'Still choosing you, always' },
    { file: '58.jpeg', caption: 'Love looks like this' },
    { file: '59.jpeg', caption: 'A memory I will treasure forever' },
    { file: '55.mp4', caption: 'Cozy, cuddly, completely yours' },
    { file: '99.mp4', caption: 'You make every season warmer' },
  ],
  november: [
    { file: '100.jpeg', caption: 'Grateful for you, always' },
    { file: '101.jpeg', caption: 'You are my favorite hello' },
    { file: '102.jpeg', caption: 'A thousand more days like this' },
    { file: '103.jpeg', caption: 'Together, we are home' },
    { file: '104.jpeg', caption: 'Every picture holds a piece of my heart' },
    { file: '105.jpeg', caption: 'My person, my peace' },
    { file: '106.jpeg', caption: 'Love grows quietly here' },
    { file: '107.jpeg', caption: 'You, then, now, always' },
    { file: '108.jpeg', caption: 'Our story keeps getting sweeter' },
    { file: '109.jpeg', caption: 'Just look at us' },
    { file: '110.jpeg', caption: 'Happy heart, happy me' },
    { file: '111.jpeg', caption: 'More of this, forever' },
    { file: '112.jpeg', caption: 'Still falling for you, every single day' },
    { file: '1000.jpeg', caption: 'A thousand reasons, and all of them are you' },
    { file: 'Videos.mp4', caption: 'Our favorite memories, in motion' },
    { file: '222.jpeg', caption: 'Every moment with you feels like home' },
    { file: '223.jpeg', caption: 'Kept this one close to my heart' },
    { file: '224.jpeg', caption: 'Just us, being happy together' },
  ],
};

// ───────────── nothing below needs editing ─────────────
const BASE = import.meta.env.BASE_URL;
const order = ['june', 'july', 'august', 'september', 'october', 'november'];
const VIDEO = /\.(mp4|webm|mov|m4v)$/i;

let counter = 0;
export const months = order.map((id) => {
  const label = id[0].toUpperCase() + id.slice(1);
  const photos = files[id].map((entry) => {
    const { file, caption = '' } = typeof entry === 'string' ? { file: entry } : entry;
    return {
      type: VIDEO.test(file) ? 'video' : 'image',
      src: `${BASE}memories/${id}/${file}`,
      caption,
      alt: caption || `A memory from ${label}`,
      index: counter++, // position in the lightbox
    };
  });
  return { id, label, photos };
});

// Photos AND videos, in lightbox order.
export const allPhotos = months.flatMap((m) => m.photos);

const pickEvenly = (list, k) =>
  list.length <= k
    ? list
    : Array.from({ length: k }, (_, i) => list[Math.round((i * (list.length - 1)) / (k - 1))]);

// Hero and closing only use still images.
const stills = allPhotos.filter((p) => p.type === 'image');
export const heroPhotos = pickEvenly(stills, 4);
export const closingPhotos = stills.slice(-3);