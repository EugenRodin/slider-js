function Carousel (containerId = '#carousel123', slideId = '.slide', interval = 2000) {
  this.container = document.querySelector(containerId)
  this.slides = this.container.querySelectorAll(slideId)
  this.interval = interval
}

Carousel.prototype = {

  _initProps () {
    this.controlsContainer = this.container.querySelector('#controls-container');
    // this.pauseBtn = this.controlsContainer.querySelector('#pause-btn');
    // this.nextBtn = this.controlsContainer.querySelector('#next-btn');
    // this.prevBtn = this.controlsContainer.querySelector('#prev-btn');

    this.SLIDES_COUNT = this.slides.length;
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';Carousel.prototype.pauseHandler = function () {
  this.isPlaying = false;
  clearInterval(this.timerID);
  this.pauseBtn.innerHTML = this.FA_PLAY; // Исправлено здесь
};
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';

    this.currentSlide = 0;
    this.isPlaying = true;
  },

  _initIndicators () {
    const indicators = document.createElement('div')

    indicators.setAttribute('class', 'indicators')
    indicators.setAttribute('id', 'indicators-container')

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div')
      indicator.setAttribute('class', i ? 'indicator' : 'indicator active')
      indicator.dataset.slideTo = '${i}'
  
      indicators.append(indicator)
    }

    this.container.append(indicators)
    //   <div id="indicators-container" class="indicators">
//   <div class="indicator active" data-slide-to="0"></div>
//   <div class="indicator" data-slide-to="1"></div>
//   <div class="indicator" data-slide-to="2"></div>
//   <div class="indicator" data-slide-to="3"></div>
//   <div class="indicator" data-slide-to="4"></div>
// </div>
  this.indicatorsContainer = this.container.querySelector('#indicators-container')
  this.indicatorItems = this.indicatorsContainer.querySelectorAll('.indicator')
  },

  _initControls () {
    const controls = document.createElement('div')
    const PAUSE = '<span id="pause-btn" class="control control-pause"><i class="fas fa-pause-circle"></i></span>'
    const PREV = '<span id="prev-btn" class="control control-prev"><i class="fas fa-angle-left"></i></span>'
    const NEXT = '<span id="next-btn" class="control control-next"><i class="fas fa-angle-right"></i></span>'

    controls.setAttribute('class', 'controls')
    controls.setAttribute('id', 'controls-container')
    controls.innerHTML = PAUSE + PREV + NEXT

    this.container.append(controls)
    this.pauseBtn = this.container.querySelector('#pause-btn')
    this.prevBtn = this.container.querySelector('#prev-btn')
    this.nextBtn = this.container.querySelector('#next-btn')
  },

  _initListeners () {
    this.pauseBtn.addEventListener('click', this.pausePlayHandler.bind(this));
    this.nextBtn.addEventListener('click', this.nextHandler.bind(this));
    this.prevBtn.addEventListener('click', this.prevHandler.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicateHandler.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
},

  _indicateHandler (e) {
    const { target } = e

    if (target && target.classList.contains('indicator')) {
        this.pauseHandler();
        this._gotoNth(+target.dataset.slideTo);
    }
},
_pressKey (e) {
    const { code } = e
    e.preventDefault()
    if (code === this.CODE_ARROW_LEFT) this.prevHandler();
    if (code === this.CODE_ARROW_RIGHT) this.nextHandler();
    if (code === this.CODE_SPACE) this.pausePlayHandler();
},

  _gotoNth (n) {
      this.slides[this.currentSlide].classList.toggle('active')
      this.indicatorItems[this.currentSlide].classList.toggle('active')
      this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT
      this.slides[this.currentSlide].classList.toggle('active')
      this.indicatorItems[this.currentSlide].classList.toggle('active')
  },  

  _gotoNext() {
      this._gotoNth(this.currentSlide + 1)
  },

  _gotoPrev() {
      this._gotoNth(this.currentSlide - 1)
  },

  pauseHandler () {
      this.isPlaying = false
      clearInterval(this.timerID)
      this.pauseBtn.innerHTML = this.FA_PLAY
  },

  _tick() {
      this.timerID = setInterval(() => this._gotoNext(), this.interval)
  },

  playHandler () {
      this.isPlaying = true
      this.pauseBtn.innerHTML = this.FA_PAUSE
      this._tick()
  },

  pausePlayHandler() {
      this.isPlaying ? this.pauseHandler() : this.playHandler()
  },

  prevHandler () {
      this.pauseHandler()
      this._gotoPrev()
  },

  nextHandler () {
      this.pauseHandler();
      this._gotoNext();
  },


  init () {
      this._initProps()
      this._initControls()
      this._initIndicators()
      this._initListeners()
      this._tick()
  },
}

Carousel.prototype.constructor = Carousel;