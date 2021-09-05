export default class Scroll {
  constructor(element) {
    this.element = element;
    this.element.style.cursor = 'grab';
  }

  grabbing = false;
  startX;
  scrollLeft;

  onMouseDown = (e) => {
    this.grabbing = true;
    this.element.style.cursor = 'grabbing';

    this.startX = e.pageX - this.element.offsetLeft;
    this.scrollLeft = this.element.scrollLeft;
  };

  onMouseLeave = () => {
    this.grabbing = false;
    this.element.style.cursor = 'grab';
  };

  onMouseUp = () => {
    this.grabbing = false;
    this.element.style.cursor = 'grab';
  };

  onMouseMove = (e) => {
    e.preventDefault();
    if (this.grabbing) {
      const walk = e.pageX - this.startX;
      this.element.scrollLeft = this.scrollLeft - walk;
    }
  };

  listenScrollX = () => {
    this.element.style.display = 'flex';
    this.element.style.overflowX = 'scroll';
    this.element.style.overflowY = 'visible';

    this.element.addEventListener('mousedown', this.onMouseDown);
    this.element.addEventListener('mouseleave', this.onMouseLeave);
    this.element.addEventListener('mouseup', this.onMouseUp);
    this.element.addEventListener('mousemove', this.onMouseMove);
  };

  unlistenScrollX = () => {
    this.element.removeEventListener('mousedown', this.onMouseDown);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);
    this.element.removeEventListener('mouseup', this.onMouseUp);
    this.element.removeEventListener('mousemove', this.onMouseMove);
  };
}
