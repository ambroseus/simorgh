import React, { Fragment, useContext } from 'react';
import { shape } from 'prop-types';
import StoryPromoComponent, {
  Headline,
  Summary,
  Link,
} from '@bbc/psammead-story-promo';
import { storyItem } from '../../models/propTypes/storyItem';
import FigureContainer from '../Figure';
import Timestamp from '../Timestamp';
import { ServiceContext } from '../../contexts/ServiceContext';
import deepGet from '../../helpers/json/deepGet';

const renderImage = imageValues => {
  if (!imageValues) {
    return null;
  }
  const ratio = (imageValues.height / imageValues.width) * 100;
  const src = `https://ichef.bbci.co.uk/news/660${imageValues.path}`;

  return (
    <FigureContainer
      alt={imageValues.altText}
      ratio={ratio}
      src={src}
      {...imageValues}
    />
  );
};

const StoryPromo = ({ item }) => {
  const { script } = useContext(ServiceContext);
  const headline = deepGet(['headlines', 'headline'], item);
  const url = deepGet(['locators', 'assetUri'], item);
  const summary = deepGet(['summary'], item);
  const timestamp = deepGet(['timestamp'], item);
  const imageValues = deepGet(['indexImage'], item);

  const Image = renderImage(imageValues);

  if (!headline || !url) {
    return null;
  }

  const Info = (
    <Fragment>
      {headline && (
        <Headline script={script}>
          <Link href={url}>{headline}</Link>
        </Headline>
      )}
      {summary && <Summary script={script}>{summary}</Summary>}
      {timestamp && (
        <Timestamp
          timestamp={timestamp * 1000}
          dateTimeFormat="YYYY-MM-DD"
          format="D MMMM YYYY"
        />
      )}
    </Fragment>
  );

  return <StoryPromoComponent image={Image} info={Info} />;
};

StoryPromo.propTypes = {
  item: shape(storyItem).isRequired,
};

export default StoryPromo;
