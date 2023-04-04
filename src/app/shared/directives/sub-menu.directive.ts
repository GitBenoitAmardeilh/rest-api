import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({selector: '[sub-menu]'})
export class ShowMenuDirective{

    constructor(
        private el: ElementRef
    ){}

    @HostListener('document:click', ['$event', '$event.target']) onDocClick(){
        // this.selectedEL.style.display = (this.selectedEL.style.display  === 'block') ? 'none' : 'block'
    }

    @HostListener('click') onClick(){
        let sElement = this.el.nativeElement.nextElementSibling

        if(sElement.style.display === 'block'){
            sElement.style.display = 'none'
        } else {
            document.querySelectorAll('.sub-menu').forEach( (sMenu) => {
                let menu = sMenu as HTMLElement
                    menu.style.display = 'none'
            })
            sElement.style.display = 'block'
        }

    }


}