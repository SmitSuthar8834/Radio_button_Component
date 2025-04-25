import { Component, Input, ViewEncapsulation, OnInit, Output, EventEmitter } from "@angular/core";
import {
  CrtInterfaceDesignerItem,
  CrtViewElement,
  CrtInput,
  CrtOutput
} from "@creatio-devkit/common";

@CrtViewElement({
  selector: "qnovate-demo",
  type: "qnovate.Demo",
})
@CrtInterfaceDesignerItem({
  toolbarConfig: {
    caption: "Radio Button",
    name: "qnovate-demo",
    icon: require("!!raw-loader?{esModule:false}!./demo-icon.svg"),
  },
})
@Component({
  selector: "qnovate-demo",
  template: `
  <div 
  class="radio-container" 
  style="border: 1px solid #ccc; padding: 1rem; border-radius: 8px; background-color: 
#f9f9f9; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
    <div class="radio-container">
      <div class="radio-group"
           [style.gridColumn]="layoutConfig?.column" 
           [style.gridRow]="layoutConfig?.row"
           [style.gridColumnEnd]="'span ' + (layoutConfig?.colSpan || 1)"
           [style.gridRowEnd]="'span ' + (layoutConfig?.rowSpan || 1)">
        <label *ngFor="let option of parsedOptions" class="radio-label">
          <input 
            type="radio" 
            [name]="groupName" 
            [value]="option.value"
            [checked]="option.value === value"
            (change)="onSelectionChange(option.value)">
          <span class="radio-text">{{ option.label }}</span>
        </label>
      </div>
    </div>
  `,
  styles: [`
    .radio-container {
      padding: 8px;
      background: var(--background-primary);
    }
    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .radio-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      color: var(--text-primary);
      font-size: 14px;
    }
    .radio-text {
      user-select: none;
    }
    input[type="radio"] {
      margin: 0;
      cursor: pointer;
      width: 16px;
      height: 16px;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DemoComponent implements OnInit {
  @Input() 
  @CrtInput()
  set layoutConfig(value: {
    column?: number;
    row?: number;
    colSpan?: number;
    rowSpan?: number;
  }) {
    console.log('Layout Config received:', value);
    this._layoutConfig = value || {
      column: 1,
      row: 1,
      colSpan: 2,
      rowSpan: 1
    };
  }
  get layoutConfig() {
    return this._layoutConfig;
  }
  private _layoutConfig: any;

  @Input()
  @CrtInput()
  set items(value: Array<{displayValue: string, value: string}>) {
    console.log('Items received:', value);
    this._items = value || [];
    if (this._items.length === 0) {
      console.warn('No items provided to radio button component');
    }
    this.parseItems();
  }
  get items() {
    return this._items;
  }
  private _items: Array<{displayValue: string, value: string}> = [];

  @Input()
  @CrtInput()
  groupName: string = 'radioGroup';

  @Input()
  @CrtInput()
  set value(val: string) {
    console.log('Value changed:', val);
    this._value = val;
  }
  get value() {
    return this._value;
  }
  private _value: string = '';

  @Output()
  @CrtOutput()
  valueChange = new EventEmitter<string>();

  parsedOptions: Array<{label: string, value: string}> = [];

  ngOnInit(): void {
    console.log('Component initialized with:', {
      layoutConfig: this.layoutConfig,
      items: this.items,
      groupName: this.groupName,
      value: this.value
    });
    this.parseItems();
  }

  private parseItems(): void {
    if (!this.items || !Array.isArray(this.items)) {
      console.error('Invalid items format:', this.items);
      this.parsedOptions = [];
      return;
    }

    try {
      this.parsedOptions = this.items.map(item => {
        if (!item.displayValue) {
          console.warn('Item missing displayValue:', item);
        }
        if (!item.value) {
          console.warn('Item missing value:', item);
        }
        return {
          label: item.displayValue || '',
          value: item.value || ''
        };
      });
      console.log('Parsed options:', this.parsedOptions);
    } catch (error) {
      console.error('Error parsing items:', error);
      this.parsedOptions = [];
    }
  }

  onSelectionChange(value: string): void {
    console.log('Selection changed to:', value);
    this.value = value;
    this.valueChange.emit(value);
  }
}