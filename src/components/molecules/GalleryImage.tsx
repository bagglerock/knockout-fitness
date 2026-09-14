import { useState } from 'react';
import { localPhotos } from '../../content';
import type { Photo } from '../../feeds';
export function GalleryImage({ photo, index }: { photo: Photo; index: number }) {
  const [failed, setFailed] = useState(false);
  const fallback = localPhotos[index % localPhotos.length].imageUrl;
  return (
    <a className="gallery-image" href={failed ? fallback : photo.permalink}>
      <img
        src={failed ? fallback : photo.imageUrl}
        onError={() => setFailed(true)}
        loading="lazy"
        alt={
          failed ? 'Training at Knockout Fitness' : photo.caption || 'Training at Knockout Fitness'
        }
      />
      <span>
        {failed ? 'GYM GALLERY' : 'VIEW PHOTO'} <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
