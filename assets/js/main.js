(function () {
    const container = document.querySelector('#carousel');
    const slides = container.querySelectorAll('.slide');
    const indicatorsContainer = container.querySelector('#indicators-container');
    const indicatorItems = indicatorsContainer.querySelectorAll('.indicator');
    const controlsContainer = container.querySelector('#controls-container');
    const pauseBtn = controlsContainer.querySelector('#pause-btn');
    const nextBtn = controlsContainer.querySelector('#next-btn');
    const prevBtn = controlsContainer.querySelector('#prev-btn');

    const SLIDES_COUNT = slides.length;
    const CODE_ARROW_LEFT = 'ArrowLeft';
    const CODE_ARROW_RIGHT = 'ArrowRight';
    const CODE_SPACE = 'Space';
    const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    const FA_PLAY = '<i class="far fa-play-circle"></i>';
    const INTERVAL = 2000;

    let currentSlide = 0;
    let isPlaying = true;
    let timerID = null;
    let startPosX = null;
    let endPosX = null;

    function gotoNth (n) {
        slides[currentSlide].classList.toggle('active');
        indicatorItems[currentSlide].classList.toggle('active');
        currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
        slides[currentSlide].classList.toggle('active');
        indicatorItems[currentSlide].classList.toggle('active');
    }

    function gotoPrev() {
        gotoNth(currentSlide - 1)
    }

    function gotoNext() {
        gotoNth(currentSlide + 1)
    }

    function tick() {
        timerID = setInterval(gotoNext, INTERVAL);
    }

    function pauseHandler (){
        if (!isPlaying) return
        pauseBtn.innerHTML = FA_PLAY;
        isPlaying = !isPlaying;
        clearInterval(timerID);
    }

    function playHandler () {
        pauseBtn.innerHTML = FA_PAUSE;
        isPlaying = !isPlaying;
        tick();
    }

    function pausePlayHandler() {
        isPlaying ? pauseHandler() : playHandler()
    }

    function prevHandler () {
        pauseHandler();
        gotoPrev();
    }

    function nextHandler () {
        pauseHandler();
        gotoNext();
    }

    function indicateHandler (e) {
        const { target } = e

        if (target && target.classList.contains('indicator')) {
            pauseHandler();
            gotoNth(+target.dataset.slideTo);
        }
    }

    function pressKey (e) {
        const { code } = e
        e.preventDefault()
        if (code === CODE_ARROW_LEFT) prevHandler();
        if (code === CODE_ARROW_RIGHT) nextHandler();
        if (code === CODE_SPACE) pausePlayHandler();
    }

    function swipeStart (e) {
        startPosX = e instanceof MouseEvent
            ? e.pageX // MouseEvent
            : e.changedTouches[0].pageX; // TouchEvent
    }

    function swipeEnd(e) {
        endPosX = e instanceof MouseEvent
            ? e.pageX // MouseEvent
            : e.changedTouches[0].pageX; // TouchEvent

        if (endPosX - startPosX > 100) prevHandler();
        if (endPosX - startPosX < -100) nextHandler();
    }

    function initListeners () {
        pauseBtn.addEventListener('click', pausePlayHandler);
        nextBtn.addEventListener('click', nextHandler);
        prevBtn.addEventListener('click', prevHandler);
        indicatorsContainer.addEventListener('click', indicateHandler);
        container.addEventListener('touchstart', swipeStart);
        container.addEventListener('mousedown', swipeStart);
        container.addEventListener('touchend', swipeEnd);
        container.addEventListener('mouseup', swipeEnd);
        document.addEventListener('keydown', pressKey);
    }

    function init () {
        initListeners();
        tick();
    }

    init();

}());