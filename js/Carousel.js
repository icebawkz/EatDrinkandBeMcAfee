class Carousel {
  constructor(container, imageFolder) {
    this.slideIndex = 0;
    this.carousel = document.getElementById(container)
    this.imageFolder = imageFolder + '/';
    this.slides = []

    const xhr = new XMLHttpRequest();
    xhr.open("GET", imageFolder);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        this.loadImages(xhr.responseText);
        for (const img of this.slides){
          this.carousel.appendChild(img)
        }
        this.nextSlide()
      }
    }.bind(this)
    xhr.send();

    const leftArrows = document.getElementsByClassName('carousel-arrow-left')
    const rightArrows = document.getElementsByClassName('carousel-arrow-right')

    if (!!leftArrows){
      for (const arrow of leftArrows)
        arrow.onclick = this.previousSlide.bind(this)
    }

    if (!!rightArrows){
      for (const arrow of rightArrows)
        arrow.onclick = this.nextSlide.bind(this)
    }

    this.run()
  }

  nextSlide() {
    let slideIndex = this.slideIndex

    this.slides[slideIndex].classList.add('hidden-slide')
    this.slides[slideIndex].classList.remove('current-slide')
    slideIndex = (slideIndex + 1) % this.slides.length;
    this.slides[slideIndex].classList.remove('hidden-slide')
    this.slides[slideIndex].classList.add('current-slide')

    this.slideIndex = slideIndex
  }

  previousSlide() {
    let slideIndex = this.slideIndex

    this.slides[slideIndex].classList.add('hidden-slide')
    this.slides[slideIndex].classList.remove('current-slide')
    slideIndex = (slideIndex == 1) ? this.slides.length - 1 : slideIndex - 1 % this.slides.length;
    this.slides[slideIndex].classList.remove('hidden-slide')
    this.slides[slideIndex].classList.add('current-slide')

    this.slideIndex = slideIndex
  }

  loadImages(htmlpage){
    var regex = /href="([A-Za-z]*_[0-9]*.jpg)/gi
    var match, matches = []
    while ((match = regex.exec(htmlpage)) != null) {
      let img = document.createElement("img")
      img.src = this.imageFolder + match[1]
      img.classList.add('hidden-slide')
      img.classList.add('slide')
      this.slides.push(img)
    }
  }

  run(){
    // setInterval(this.nextSlide.bind(this), 5000)
  }
}
