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

    this.run()
  }

  nextSlide() {
    let slideIndex = this.slideIndex

    this.slides[slideIndex].classList.remove('tall-slide')
    this.slides[slideIndex].classList.remove('wide-slide')
    this.slides[slideIndex].classList.add('hidden-slide')
    slideIndex = (slideIndex +  1) % this.slides.length;
    this.slides[slideIndex].classList.remove('hidden-slide')
    if (this.slides[slideIndex].naturalWidth < this.slides[slideIndex].naturalHeight)
      this.slides[slideIndex].classList.add('wide-slide')
    else
      this.slides[slideIndex].classList.add('tall-slide')

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
    setInterval(this.nextSlide.bind(this), 5000)
  }
}
