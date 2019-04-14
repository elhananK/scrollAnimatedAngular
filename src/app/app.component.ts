import { Component,
        HostListener,
        AfterContentInit,
        Renderer2,
        ViewChild,
        ElementRef, 
        QueryList, 
        ViewChildren
       } from '@angular/core';

@Component({
  selector: 'elh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {

  private readonly animationScrollUp = 'animation-scroll-up';
  private readonly animationScrollDown = 'animation-scroll-down';
  private readonly imagesAnimationScale = 'animate-img';
  private readonly imagesAnimationOnLastSection = 'image-animation';


  private isPageScrollingDown: boolean;
  private lastIndex = 0;
  images: Array<any> = [
    { img: 'assets/first.jpg', logo: 'assets/1.png' },
    { img: 'assets/team-1.jpg', logo: '' },
    { img: 'assets/team-2.jpg', logo: '' },
    { img: 'assets/team-3.jpg', logo: '' },
    { img: 'assets/team-4.jpg', logo: '' },
    { img: 'assets/testimonial-1.jpg', logo: 'assets/1.png' },
    { img: 'assets/testimonial-2.jpg', logo: 'assets/1.png' },
    { img: 'assets/testimonial-3.jpg', logo: '' },
    { img: 'assets/testimonial-4.jpg', logo: '' },
  ];

  @ViewChild('sectionsOne') sectionOne: ElementRef;
  @ViewChild('sectionsTwo') sectionTwo: ElementRef;
  @ViewChild('sectionsThree') sectionThree: ElementRef;
  @ViewChild('imageAnim') imageAnim: ElementRef;
  @ViewChildren('imageRef') imagesRef: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {
  }

  @HostListener('window:scroll') whenScroll() {
    this.updatePage();
  }

  @HostListener('window:resize') whenResized() {
    this.updatePage();
  }

  ngAfterContentInit(): void {
    this.updatePage();
  }

  private addImagesOnTable(add: boolean) {
    if (this.imagesRef) {
      const arr = this.imagesRef.toArray();
      arr.forEach(element => {
        if (add) {
          this.renderer.addClass(element.nativeElement,
            this.imagesAnimationScale);
        } else {
          this.renderer.removeClass(element.nativeElement,
            this.imagesAnimationScale);
        }
      });
    }
  }

  private addImagesOnLastSection(add: boolean) {
    if (this.imageAnim) {
      if (add) {
        this.renderer.addClass(this.imageAnim.nativeElement,
          this.imagesAnimationOnLastSection);
      } else {
        this.renderer.removeClass(this.imageAnim.nativeElement,
          this.imagesAnimationOnLastSection);
      }
    }
  }

  private updatePage() {

    if (this.sectionOne) {

      const pageY = window.scrollY;
      const innerHeight = window.innerHeight;
      this.isPageScrollingDown = pageY >= this.lastIndex;

      if (this.isPageScrollingDown) {
        if (pageY > 80 && pageY < innerHeight) {
          this.renderer.addClass(this.sectionOne.nativeElement, this.animationScrollUp);
          this.renderer.removeClass(this.sectionTwo.nativeElement, this.animationScrollDown);
          this.addImagesOnTable(true);
        } else if (pageY > innerHeight + 80) {
          this.renderer.addClass(this.sectionOne.nativeElement, this.animationScrollUp);
          this.renderer.addClass(this.sectionTwo.nativeElement, this.animationScrollUp);
          this.addImagesOnTable(false);
          this.renderer.removeClass(this.sectionThree.nativeElement, this.animationScrollDown);
          this.addImagesOnLastSection(true);
        }
      } else {
        if (pageY < innerHeight - 80) {
          this.renderer.removeClass(this.sectionOne.nativeElement, this.animationScrollUp);
          this.renderer.addClass(this.sectionTwo.nativeElement, this.animationScrollDown);
          this.addImagesOnTable(false);
        } else  if (pageY < (innerHeight * 2 + 80) && pageY > innerHeight + 80) {
          this.renderer.addClass(this.sectionThree.nativeElement, this.animationScrollDown);
          this.addImagesOnLastSection(false);
          this.renderer.removeClass(this.sectionTwo.nativeElement, this.animationScrollUp);
          this.renderer.removeClass(this.sectionTwo.nativeElement, this.animationScrollDown);
          this.addImagesOnTable(true);
        }
      }
      this.lastIndex = pageY;

    }

  }

}
