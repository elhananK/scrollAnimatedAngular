import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'elh-photo-description',
  templateUrl: './photo-description.component.html',
  styleUrls: ['./photo-description.component.scss']
})
export class PhotoDescriptionComponent {

  @Input() subTitle: string;
  @Input() maxWidth: string;
  @Input() subDescription: string;
  @Output() whenLinkClicked = new EventEmitter<void>();

}


