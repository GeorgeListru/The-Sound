export default function ReturnArtistsList(artists) {
  let artists_names = "";
  artists.map((artist) => {
    if (artists.length > 1 && artists.indexOf(artist) !== artists.length - 1)
      artists_names += artist.artist + ", ";
    else artists_names += artist.artist;
  });
  return artists_names;
}
