import { useGymFeeds } from '../../hooks/useGymFeeds';
import { gym, localPhotos } from '../../content';
import { SectionHeading } from '../molecules/SectionHeading';
import { GalleryImage } from '../molecules/GalleryImage';

export function Gallery({ full = false }: { full?: boolean }) {
  const { photos } = useGymFeeds('photos');
  const items = photos.length ? photos : localPhotos;
  return (
    <section className="section wrap gallery-section">
      <div className="heading-row">
        <SectionHeading
          eyebrow={photos.length ? 'FROM INSTAGRAM' : 'INSIDE KNOCKOUT FITNESS'}
          title="LIFE ON THE MATS."
          large={full}
        />
        <a className="text-link" href={gym.instagram}>
          @Knock_Out_Fitness <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="gallery-caption">
        {photos.length
          ? 'The latest moments from our Instagram.'
          : 'A look inside our gym. Follow us on Instagram for more training moments.'}
      </p>
      <div className="gallery-grid">
        {items.slice(0, full ? 12 : 4).map((photo, index) => (
          <GalleryImage key={photo.id} photo={photo} index={index} />
        ))}
      </div>
    </section>
  );
}
