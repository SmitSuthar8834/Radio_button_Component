import { Component, Input, ViewEncapsulation, OnInit } from "@angular/core";
import {
  CrtInterfaceDesignerItem,
  CrtViewElement,
} from "@creatio-devkit/common";

@CrtViewElement({
  selector: "qnovate-demo",
  type: "qnovate.Demo",
})
@CrtInterfaceDesignerItem({
  toolbarConfig: {
    caption: "Your component",
    name: "qnovate-demo",
    icon: require("!!raw-loader?{esModule:false}!./demo-icon.svg"),
  },
})
@Component({
  selector: "qnovate-demo",
  template: `
    <div class="radio-group" [style.gridColumn]="layoutConfig?.column" 
         [style.gridRow]="layoutConfig?.row"
         [style.gridColumnEnd]="'span ' + (layoutConfig?.colSpan || 1)"
         [style.gridRowEnd]="'span ' + (layoutConfig?.rowSpan || 1)">
      <label *ngFor="let option of parsedOptions">
        <input 
          type="radio" 
          [name]="groupName" 
          [value]="option.value"
          [checked]="option.value === selectedValue"
          (change)="onSelectionChange(option.value)">
        {{option.label}}
      </label>
    </div>
  `,
  styles: [`
    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
    }
    label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    input[type="radio"] {
      margin: 0;
      cursor: pointer;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DemoComponent implements OnInit {
  @Input() layoutConfig!: {
    column: number;
    row: number;
    colSpan: number;
    rowSpan: number;
  };

  @Input() creatioData: any[] = [];
  @Input() groupName: string = 'radioGroup';
  @Input() selectedValue: any = null;

  parsedOptions: Array<{label: string, value: any}> = [];

  ngOnInit(): void {
    this.layoutConfig = this.layoutConfig || {
      column: 1,
      row: 1,
      colSpan: 2,
      rowSpan: 1
    };
    this.parseCreatioData();
  }

  private parseCreatioData(): void {
    if (!this.creatioData || !Array.isArray(this.creatioData)) {
      this.parsedOptions = [];
      return;
    }

    this.parsedOptions = this.creatioData.map(item => ({
      label: item.displayValue || item.Name || '',
      value: item.value || item.Id || null
    }));
  }

  onSelectionChange(value: any): void {
    this.selectedValue = value;
  }
}