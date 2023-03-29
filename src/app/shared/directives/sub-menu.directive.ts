import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({selector: '[sub-menu]'})
export class ShowMenuDirective{

    private selectedEL: any

    constructor(
        private el: ElementRef
    ){}

    @HostListener('document:click', ['$event', '$event.target']) onDocClick(){
        // this.selectedEL.style.display = (this.selectedEL.style.display  === 'block') ? 'none' : 'block'
    }

    @HostListener('click') onClick(){
        this.selectedEL = this.el.nativeElement.nextElementSibling
        // let d = this.el.nativeElement.nextElementSibling
        this.selectedEL.style.display = (this.selectedEL.style.display  === 'block') ? 'none' : 'block'
        // d.style.display = (d.style.display  === 'block') ? 'none' : 'block'
        
    }


}