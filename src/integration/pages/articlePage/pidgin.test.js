/**
 * @pathname /pidgin/articles/cwl08rd38l6o
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import {
  runFooterTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCommonA11yTests,
} from '../../common';

describe('Given I am on a Pidgin AMP Article page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests();
  });
});

describe('Given I am on a Pidgin Canonical Article page', () => {
  describe('When I am using the website', () => {
    runCanonicalUserTests({
      imageAltText: 'Map of France showing Paris and Cognac',
      imageCaptionText:
        'This test image, copyright BBC, shows a map of France. The image is in the first three blocks and has this caption.',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });
});

describe('Given I am on a Pidgin AMP/Canonical Article page', () => {
  describe('When I am using the website', () => {
    runFooterTests({
      copyrightText:
        '© 2020 BBC. De external site no concern BBC. De way wey we de take go external link.',
      brandingLink: '/pidgin',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle:
        'This is the SEO headline of this test article - BBC News Pidgin',
      canonicalUrl: 'http://localhost:7080/pidgin/articles/cwl08rd38l6o',
      language: 'pcm',
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Waka go wetin de inside',
      headlineText: 'This is the headline of this test article',
    });
  });
});
