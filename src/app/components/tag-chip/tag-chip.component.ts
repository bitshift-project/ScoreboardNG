import { Component, effect, inject, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Tag } from '../../domain/Challenge';
import { ShareDataService } from '../../services/shareData/share-data.service';

@Component({
  selector: 'app-tag-chip',
  imports: [MatChipsModule],
  templateUrl: './tag-chip.component.html',
  styleUrl: './tag-chip.component.scss'
})
export class TagChipComponent {
  shareDataService = inject(ShareDataService);

  tag = input.required<Tag>();
  allTags = this.shareDataService.globalTags();

  freeTagColors = [" tag-blue", " tag-pink", " tag-cyan", " tag-brown", " tag-violet", " tag-lime"];

  constructor(){
    effect(() =>{
      this.allTags = this.shareDataService.globalTags();
    });
  }

  getTagStyle(): string{
    let classname = "tag";
    switch(this.tag().content){
      case "⬤⬤⬤":
        return classname+" tag-red";
      case "⬤⬤◯":
        return classname+" tag-yellow";
      case "⬤◯◯":
        return classname+" tag-green";
    }

    const allOtherTagsLength = this.allTags.length-3;
    const currentTagIndex = this.allTags.findIndex(t => t.tagId == this.tag().tagId);
    return classname + this.freeTagColors[currentTagIndex% allOtherTagsLength];
  }
}
