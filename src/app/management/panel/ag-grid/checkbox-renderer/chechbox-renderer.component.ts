import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'checkbox-cell',
  templateUrl: './checkbox-renderer.component.html',
  styleUrls: ['./checkbox-renderer.component.scss']
})
export class CheckboxRendererComponent {

  constructor() { }

  @ViewChild('.checkbox', { static: false }) checkbox: ElementRef;

  public params:any;

  agInit(params): void {
    if (!params.data && params.value) {
      params.data = {}
      params.data[params.colDef.field] = params.value
    }
    if (params.data) {
      if ((params as any).condition && (params as any).condition(params.data))
        this.params = params;
      else if (!(params as any).condition)
        this.params = params;
      else
        return
    }else return
  }

  public onChange(event) {
    this.params.data[this.params.colDef.field] = event.currentTarget.checked;
    if (this.params["onchange"] && this.params["onchange"] instanceof Function)
      this.params["onchange"](this.params, event);
  }
}
