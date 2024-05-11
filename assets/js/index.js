import SwipeCarousel from './swipe.js';

const carousel = new SwipeCarousel({
  containerId: '#carousel',
  slideId: '.slide',
  interval: 2000,
  isPlaying: false,
});

carousel.init()