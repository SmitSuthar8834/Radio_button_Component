import {Component, Input, ViewEncapsulation} from "@angular/core";
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
  template: `<button (click)="showAlert()">Click me!</button>`,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DemoComponent {
  public showAlert() {
    alert("Congrats, welcome to Freedom!");
  }
}