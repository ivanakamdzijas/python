/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
export class SelectAutocompleteComponent {
    constructor() {
        this.selectPlaceholder = "search...";
        this.disabled = false;
        this.display = "display";
        this.value = "value";
        this.formControl = new FormControl();
        this.errorMsg = "Field is required";
        this.showErrorMsg = false;
        this.multiple = true;
        // New Options
        this.labelCount = 1;
        this.appearance = "standard";
        this.selectionChange = new EventEmitter();
        this.filteredOptions = [];
        this.selectedValue = [];
        this.selectAllChecked = false;
        this.displayString = "";
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.disabled) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.filteredOptions = this.options;
        if (this.selectedOptions) {
            this.selectedValue = this.selectedOptions;
        }
        else if (this.formControl.value) {
            this.selectedValue = this.formControl.value;
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (!this.selectedValue.length) {
            this.selectionChange.emit(this.selectedValue);
        }
    }
    /**
     * @return {?}
     */
    toggleDropdown() {
        this.selectElem.toggle();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    toggleSelectAll(val) {
        if (val.checked) {
            this.filteredOptions.forEach(option => {
                if (!this.selectedValue.includes(option[this.value])) {
                    this.selectedValue = this.selectedValue.concat([option[this.value]]);
                }
            });
        }
        else {
            /** @type {?} */
            const filteredValues = this.getFilteredOptionsValues();
            this.selectedValue = this.selectedValue.filter(item => !filteredValues.includes(item));
        }
        this.selectionChange.emit(this.selectedValue);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    filterItem(value) {
        this.filteredOptions = this.options.filter(item => item[this.display].toLowerCase().indexOf(value.toLowerCase()) > -1);
        this.selectAllChecked = true;
        this.filteredOptions.forEach(item => {
            if (!this.selectedValue.includes(item[this.value])) {
                this.selectAllChecked = false;
            }
        });
        if (!this.filteredOptions.length) {
            this.selectAllChecked = false;
        }
    }
    /**
     * @param {?} option
     * @return {?}
     */
    hideOption(option) {
        return !(this.filteredOptions.indexOf(option) > -1);
    }
    /**
     * @return {?}
     */
    getFilteredOptionsValues() {
        /** @type {?} */
        const filteredValues = [];
        this.filteredOptions.forEach(option => {
            filteredValues.push(option.value);
        });
        return filteredValues;
    }
    /**
     * @return {?}
     */
    onDisplayString() {
        this.displayString = "";
        if (this.selectedValue && this.selectedValue.length) {
            /** @type {?} */
            let displayOption = [];
            if (this.multiple) {
                // Multi select display
                for (let i = 0; i < this.labelCount; i++) {
                    displayOption[i] = this.options.filter(option => option[this.value] === this.selectedValue[i])[0];
                }
                if (displayOption.length) {
                    for (let i = 0; i < displayOption.length; i++) {
                        if (displayOption[i] && displayOption[i][this.display]) {
                            this.displayString += displayOption[i][this.display] + ",";
                        }
                    }
                    this.displayString = this.displayString.slice(0, -1);
                    if (this.selectedValue.length > 1 &&
                        this.selectedValue.length > this.labelCount) {
                        this.displayString += ` (+${this.selectedValue.length -
                            this.labelCount} others)`;
                    }
                }
            }
            else {
                // Single select display
                displayOption = this.options.filter(option => option[this.value] === this.selectedValue);
                if (displayOption.length) {
                    this.displayString = displayOption[0][this.display];
                }
            }
        }
        return this.displayString;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    onSelectionChange(val) {
        /** @type {?} */
        const filteredValues = this.getFilteredOptionsValues();
        /** @type {?} */
        let count = 0;
        if (this.multiple) {
            this.selectedValue.filter(item => {
                if (filteredValues.includes(item)) {
                    count++;
                }
            });
            this.selectAllChecked = count === this.filteredOptions.length;
        }
        this.selectedValue = val.value;
        this.selectionChange.emit(this.selectedValue);
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return item.value;
    }
}
SelectAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: "mat-select-autocomplete",
                template: `
    <mat-form-field appearance="{{ appearance }}">
      <mat-select
        #selectElem
        [placeholder]="placeholder"
        [formControl]="formControl"
        [multiple]="multiple"
        [(ngModel)]="selectedValue"
        (selectionChange)="onSelectionChange($event)"
      >
        <div class="box-search">
          <mat-checkbox
            *ngIf="multiple"
            color="primary"
            class="box-select-all"
            [(ngModel)]="selectAllChecked"
            (change)="toggleSelectAll($event)"
          ></mat-checkbox>
          <input
            #searchInput
            type="text"
            [ngClass]="{ 'pl-1': !multiple }"
            (input)="filterItem(searchInput.value)"
            [placeholder]="selectPlaceholder"
          />
          <div
            class="box-search-icon"
            (click)="filterItem(''); searchInput.value = ''"
          >
            <button mat-icon-button class="search-button">
              <mat-icon class="mat-24" aria-label="Search icon">clear</mat-icon>
            </button>
          </div>
        </div>
        <mat-select-trigger>
          {{ onDisplayString() }}
        </mat-select-trigger>
        <mat-option
          *ngFor="let option of options; trackBy: trackByFn"
          [disabled]="option.disabled"
          [value]="option[value]"
          [style.display]="hideOption(option) ? 'none' : 'flex'"
          >{{ option[display] }}
        </mat-option>
      </mat-select>
      <mat-hint style="color:red" *ngIf="showErrorMsg">{{ errorMsg }}</mat-hint>
    </mat-form-field>
  `,
                styles: [`
      .box-search {
        margin: 8px;
        border-radius: 2px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),
          0 0 0 1px rgba(0, 0, 0, 0.08);
        transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
      }
      .box-search input {
        flex: 1;
        border: none;
        outline: none;
      }
      .box-select-all {
        width: 36px;
        line-height: 33px;
        color: #808080;
        text-align: center;
      }
      .search-button {
        width: 36px;
        height: 36px;
        line-height: 33px;
        color: #808080;
      }
      .pl-1 {
        padding-left: 1rem;
      }
    `]
            }] }
];
/** @nocollapse */
SelectAutocompleteComponent.ctorParameters = () => [];
SelectAutocompleteComponent.propDecorators = {
    selectPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    options: [{ type: Input }],
    disabled: [{ type: Input }],
    display: [{ type: Input }],
    value: [{ type: Input }],
    formControl: [{ type: Input }],
    errorMsg: [{ type: Input }],
    showErrorMsg: [{ type: Input }],
    selectedOptions: [{ type: Input }],
    multiple: [{ type: Input }],
    labelCount: [{ type: Input }],
    appearance: [{ type: Input }],
    selectionChange: [{ type: Output }],
    selectElem: [{ type: ViewChild, args: ["selectElem",] }]
};
if (false) {
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectPlaceholder;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.placeholder;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.options;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.disabled;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.display;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.value;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.formControl;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.errorMsg;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.showErrorMsg;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectedOptions;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.multiple;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.labelCount;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.appearance;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectionChange;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectElem;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.filteredOptions;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectedValue;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectAllChecked;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.displayString;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXQtc2VsZWN0LWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3QtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBcUY3QyxNQUFNO0lBMEJKO2lDQXpCcUMsV0FBVzt3QkFHNUIsS0FBSzt1QkFDTixTQUFTO3FCQUNYLE9BQU87MkJBQ1ksSUFBSSxXQUFXLEVBQUU7d0JBQ3pCLG1CQUFtQjs0QkFDdkIsS0FBSzt3QkFFVCxJQUFJOzswQkFHTSxDQUFDOzBCQUN3QixVQUFVOytCQUc1QixJQUFJLFlBQVksRUFBRTsrQkFJekIsRUFBRTs2QkFDSixFQUFFO2dDQUNYLEtBQUs7NkJBQ1IsRUFBRTtLQUNGOzs7O0lBRWhCLFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQzNDO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQzdDO0tBQ0Y7Ozs7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Ozs7Ozs7O0tBNkJDO2FBRUo7Ozs7O2dDQUVFLEtBQUs7MEJBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSztvQkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7dUJBQ0wsS0FBSzt5QkFHTCxLQUFLO3lCQUNMLEtBQUs7OEJBRUwsTUFBTTt5QkFHTixTQUFTLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgRG9DaGVja1xufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm1hdC1zZWxlY3QtYXV0b2NvbXBsZXRlXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG1hdC1mb3JtLWZpZWxkIGFwcGVhcmFuY2U9XCJ7eyBhcHBlYXJhbmNlIH19XCI+XG4gICAgICA8bWF0LXNlbGVjdFxuICAgICAgICAjc2VsZWN0RWxlbVxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cInNlbGVjdGVkVmFsdWVcIlxuICAgICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cIm9uU2VsZWN0aW9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LXNlYXJjaFwiPlxuICAgICAgICAgIDxtYXQtY2hlY2tib3hcbiAgICAgICAgICAgICpuZ0lmPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYm94LXNlbGVjdC1hbGxcIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJzZWxlY3RBbGxDaGVja2VkXCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwidG9nZ2xlU2VsZWN0QWxsKCRldmVudClcIlxuICAgICAgICAgID48L21hdC1jaGVja2JveD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICNzZWFyY2hJbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncGwtMSc6ICFtdWx0aXBsZSB9XCJcbiAgICAgICAgICAgIChpbnB1dCk9XCJmaWx0ZXJJdGVtKHNlYXJjaElucHV0LnZhbHVlKVwiXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwic2VsZWN0UGxhY2Vob2xkZXJcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJib3gtc2VhcmNoLWljb25cIlxuICAgICAgICAgICAgKGNsaWNrKT1cImZpbHRlckl0ZW0oJycpOyBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cInNlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LTI0XCIgYXJpYS1sYWJlbD1cIlNlYXJjaCBpY29uXCI+Y2xlYXI8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bWF0LXNlbGVjdC10cmlnZ2VyPlxuICAgICAgICAgIHt7IG9uRGlzcGxheVN0cmluZygpIH19XG4gICAgICAgIDwvbWF0LXNlbGVjdC10cmlnZ2VyPlxuICAgICAgICA8bWF0LW9wdGlvblxuICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uczsgdHJhY2tCeTogdHJhY2tCeUZuXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwib3B0aW9uLmRpc2FibGVkXCJcbiAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uW3ZhbHVlXVwiXG4gICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiaGlkZU9wdGlvbihvcHRpb24pID8gJ25vbmUnIDogJ2ZsZXgnXCJcbiAgICAgICAgICA+e3sgb3B0aW9uW2Rpc3BsYXldIH19XG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgIDxtYXQtaGludCBzdHlsZT1cImNvbG9yOnJlZFwiICpuZ0lmPVwic2hvd0Vycm9yTXNnXCI+e3sgZXJyb3JNc2cgfX08L21hdC1oaW50PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5ib3gtc2VhcmNoIHtcbiAgICAgICAgbWFyZ2luOiA4cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjE2KSxcbiAgICAgICAgICAwIDAgMCAxcHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAyMDBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuICAgICAgLmJveC1zZWFyY2ggaW5wdXQge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICB9XG4gICAgICAuYm94LXNlbGVjdC1hbGwge1xuICAgICAgICB3aWR0aDogMzZweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMzcHg7XG4gICAgICAgIGNvbG9yOiAjODA4MDgwO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICB9XG4gICAgICAuc2VhcmNoLWJ1dHRvbiB7XG4gICAgICAgIHdpZHRoOiAzNnB4O1xuICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzM3B4O1xuICAgICAgICBjb2xvcjogIzgwODA4MDtcbiAgICAgIH1cbiAgICAgIC5wbC0xIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxcmVtO1xuICAgICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIERvQ2hlY2sge1xuICBASW5wdXQoKSBzZWxlY3RQbGFjZWhvbGRlcjogc3RyaW5nID0gXCJzZWFyY2guLi5cIjtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgb3B0aW9ucztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZGlzcGxheSA9IFwiZGlzcGxheVwiO1xuICBASW5wdXQoKSB2YWx1ZSA9IFwidmFsdWVcIjtcbiAgQElucHV0KCkgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gIEBJbnB1dCgpIGVycm9yTXNnOiBzdHJpbmcgPSBcIkZpZWxkIGlzIHJlcXVpcmVkXCI7XG4gIEBJbnB1dCgpIHNob3dFcnJvck1zZyA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWxlY3RlZE9wdGlvbnM7XG4gIEBJbnB1dCgpIG11bHRpcGxlID0gdHJ1ZTtcblxuICAvLyBOZXcgT3B0aW9uc1xuICBASW5wdXQoKSBsYWJlbENvdW50OiBudW1iZXIgPSAxO1xuICBASW5wdXQoKSBhcHBlYXJhbmNlOiBcInN0YW5kYXJkXCIgfCBcImZpbGxcIiB8IFwib3V0bGluZVwiID0gXCJzdGFuZGFyZFwiO1xuXG4gIEBPdXRwdXQoKVxuICBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoXCJzZWxlY3RFbGVtXCIpIHNlbGVjdEVsZW07XG5cbiAgZmlsdGVyZWRPcHRpb25zOiBBcnJheTxhbnk+ID0gW107XG4gIHNlbGVjdGVkVmFsdWU6IEFycmF5PGFueT4gPSBbXTtcbiAgc2VsZWN0QWxsQ2hlY2tlZCA9IGZhbHNlO1xuICBkaXNwbGF5U3RyaW5nID0gXCJcIjtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmZvcm1Db250cm9sLmRpc2FibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtQ29udHJvbC5lbmFibGUoKTtcbiAgICB9XG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRPcHRpb25zKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkT3B0aW9ucztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZm9ybUNvbnRyb2wudmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlLmxlbmd0aCkge1xuICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZURyb3Bkb3duKCkge1xuICAgIHRoaXMuc2VsZWN0RWxlbS50b2dnbGUoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdEFsbCh2YWwpIHtcbiAgICBpZiAodmFsLmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWUuaW5jbHVkZXMob3B0aW9uW3RoaXMudmFsdWVdKSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZS5jb25jYXQoW29wdGlvblt0aGlzLnZhbHVlXV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsdGVyZWRWYWx1ZXMgPSB0aGlzLmdldEZpbHRlcmVkT3B0aW9uc1ZhbHVlcygpO1xuICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiAhZmlsdGVyZWRWYWx1ZXMuaW5jbHVkZXMoaXRlbSlcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZFZhbHVlKTtcbiAgfVxuXG4gIGZpbHRlckl0ZW0odmFsdWUpIHtcbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXG4gICAgICBpdGVtID0+IGl0ZW1bdGhpcy5kaXNwbGF5XS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsdWUudG9Mb3dlckNhc2UoKSkgPiAtMVxuICAgICk7XG4gICAgdGhpcy5zZWxlY3RBbGxDaGVja2VkID0gdHJ1ZTtcbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWUuaW5jbHVkZXMoaXRlbVt0aGlzLnZhbHVlXSkpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVja2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCF0aGlzLmZpbHRlcmVkT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2tlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGhpZGVPcHRpb24ob3B0aW9uKSB7XG4gICAgcmV0dXJuICEodGhpcy5maWx0ZXJlZE9wdGlvbnMuaW5kZXhPZihvcHRpb24pID4gLTEpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBwbGFpbiBzdHJpbmdzIGFycmF5IG9mIGZpbHRlcmVkIHZhbHVlc1xuICBnZXRGaWx0ZXJlZE9wdGlvbnNWYWx1ZXMoKSB7XG4gICAgY29uc3QgZmlsdGVyZWRWYWx1ZXMgPSBbXTtcbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBmaWx0ZXJlZFZhbHVlcy5wdXNoKG9wdGlvbi52YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkVmFsdWVzO1xuICB9XG5cbiAgb25EaXNwbGF5U3RyaW5nKCkge1xuICAgIHRoaXMuZGlzcGxheVN0cmluZyA9IFwiXCI7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRWYWx1ZSAmJiB0aGlzLnNlbGVjdGVkVmFsdWUubGVuZ3RoKSB7XG4gICAgICBsZXQgZGlzcGxheU9wdGlvbiA9IFtdO1xuICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgLy8gTXVsdGkgc2VsZWN0IGRpc3BsYXlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxhYmVsQ291bnQ7IGkrKykge1xuICAgICAgICAgIGRpc3BsYXlPcHRpb25baV0gPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxuICAgICAgICAgICAgb3B0aW9uID0+IG9wdGlvblt0aGlzLnZhbHVlXSA9PT0gdGhpcy5zZWxlY3RlZFZhbHVlW2ldXG4gICAgICAgICAgKVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlzcGxheU9wdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpc3BsYXlPcHRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkaXNwbGF5T3B0aW9uW2ldICYmIGRpc3BsYXlPcHRpb25baV1bdGhpcy5kaXNwbGF5XSkge1xuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlTdHJpbmcgKz0gZGlzcGxheU9wdGlvbltpXVt0aGlzLmRpc3BsYXldICsgXCIsXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZGlzcGxheVN0cmluZyA9IHRoaXMuZGlzcGxheVN0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlLmxlbmd0aCA+IDEgJiZcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZS5sZW5ndGggPiB0aGlzLmxhYmVsQ291bnRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVN0cmluZyArPSBgICgrJHt0aGlzLnNlbGVjdGVkVmFsdWUubGVuZ3RoIC1cbiAgICAgICAgICAgICAgdGhpcy5sYWJlbENvdW50fSBvdGhlcnMpYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNpbmdsZSBzZWxlY3QgZGlzcGxheVxuICAgICAgICBkaXNwbGF5T3B0aW9uID0gdGhpcy5vcHRpb25zLmZpbHRlcihcbiAgICAgICAgICBvcHRpb24gPT4gb3B0aW9uW3RoaXMudmFsdWVdID09PSB0aGlzLnNlbGVjdGVkVmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGRpc3BsYXlPcHRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5U3RyaW5nID0gZGlzcGxheU9wdGlvblswXVt0aGlzLmRpc3BsYXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRpc3BsYXlTdHJpbmc7XG4gIH1cblxuICBvblNlbGVjdGlvbkNoYW5nZSh2YWwpIHtcbiAgICBjb25zdCBmaWx0ZXJlZFZhbHVlcyA9IHRoaXMuZ2V0RmlsdGVyZWRPcHRpb25zVmFsdWVzKCk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgaWYgKGZpbHRlcmVkVmFsdWVzLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnNlbGVjdEFsbENoZWNrZWQgPSBjb3VudCA9PT0gdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB2YWwudmFsdWU7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICB9XG5cbiAgcHVibGljIHRyYWNrQnlGbihpbmRleCwgaXRlbSkge1xuICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICB9XG59XG4iXX0=