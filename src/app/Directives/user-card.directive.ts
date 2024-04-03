import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUserCard]',
  standalone: true
})
export class UserCardDirective {
  @Input('appUserCard') BGColor: string=''; 

  constructor(private el: ElementRef, private renderer: Renderer2) { 
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 6px black');

  }

  ngOnChanges() {
       if (this.BGColor) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.BGColor);
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 10px 12px green');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 6px black');
  }
}
