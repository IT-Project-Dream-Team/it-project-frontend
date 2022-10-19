import './styles.css';
import { Collection } from '../collection/Collection';

export const CollectionBox = ({ collections, favouriteCollection }) => {
  return (
    <div className="collections">
      {collections?.map((collection) => (
        <Collection
          key={collection._id}
          collection={collection}
          favouriteCollection={favouriteCollection}
        ></Collection>
      ))}
    </div>
  );
};
