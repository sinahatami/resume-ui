import { Component } from '@angular/core';
import { faPencilAlt, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.scss']
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  faEye = faEye
  faUserCog = faPencilAlt
  faTrash = faTrash
  params;
  label: string;
  actions;
  inlineBtn: boolean;
  inlineEdit: boolean;
  component: string = '';
  sign: boolean = false;
  unsign: boolean = false
  agInit(params): void {
    this.params = params;
  }


  refresh(params?: any): boolean {
    return true;
  }

  onClick(item, $event) {
    if (item.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      item.onClick(params);
    }
  }

}
