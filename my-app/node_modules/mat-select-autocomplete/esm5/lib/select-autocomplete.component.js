/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
var SelectAutocompleteComponent = /** @class */ (function () {
    function SelectAutocompleteComponent() {
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
    SelectAutocompleteComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (!this.selectedValue.length) {
            this.selectionChange.emit(this.selectedValue);
        }
    };
    /**
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.toggleDropdown = /**
     * @return {?}
     */
    function () {
        this.selectElem.toggle();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.toggleSelectAll = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        var _this = this;
        if (val.checked) {
            this.filteredOptions.forEach(function (option) {
                if (!_this.selectedValue.includes(option[_this.value])) {
                    _this.selectedValue = _this.selectedValue.concat([option[_this.value]]);
                }
            });
        }
        else {
            /** @type {?} */
            var filteredValues_1 = this.getFilteredOptionsValues();
            this.selectedValue = this.selectedValue.filter(function (item) { return !filteredValues_1.includes(item); });
        }
        this.selectionChange.emit(this.selectedValue);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.filterItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.filteredOptions = this.options.filter(function (item) { return item[_this.display].toLowerCase().indexOf(value.toLowerCase()) > -1; });
        this.selectAllChecked = true;
        this.filteredOptions.forEach(function (item) {
            if (!_this.selectedValue.includes(item[_this.value])) {
                _this.selectAllChecked = false;
            }
        });
        if (!this.filteredOptions.length) {
            this.selectAllChecked = false;
        }
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.hideOption = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return !(this.filteredOptions.indexOf(option) > -1);
    };
    // Returns plain strings array of filtered values
    /**
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.getFilteredOptionsValues = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var filteredValues = [];
        this.filteredOptions.forEach(function (option) {
            filteredValues.push(option.value);
        });
        return filteredValues;
    };
    /**
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.onDisplayString = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.displayString = "";
        if (this.selectedValue && this.selectedValue.length) {
            /** @type {?} */
            var displayOption = [];
            if (this.multiple) {
                var _loop_1 = function (i) {
                    displayOption[i] = this_1.options.filter(function (option) { return option[_this.value] === _this.selectedValue[i]; })[0];
                };
                var this_1 = this;
                // Multi select display
                for (var i = 0; i < this.labelCount; i++) {
                    _loop_1(i);
                }
                if (displayOption.length) {
                    for (var i = 0; i < displayOption.length; i++) {
                        if (displayOption[i] && displayOption[i][this.display]) {
                            this.displayString += displayOption[i][this.display] + ",";
                        }
                    }
                    this.displayString = this.displayString.slice(0, -1);
                    if (this.selectedValue.length > 1 &&
                        this.selectedValue.length > this.labelCount) {
                        this.displayString += " (+" + (this.selectedValue.length -
                            this.labelCount) + " others)";
                    }
                }
            }
            else {
                // Single select display
                displayOption = this.options.filter(function (option) { return option[_this.value] === _this.selectedValue; });
                if (displayOption.length) {
                    this.displayString = displayOption[0][this.display];
                }
            }
        }
        return this.displayString;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.onSelectionChange = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var filteredValues = this.getFilteredOptionsValues();
        /** @type {?} */
        var count = 0;
        if (this.multiple) {
            this.selectedValue.filter(function (item) {
                if (filteredValues.includes(item)) {
                    count++;
                }
            });
            this.selectAllChecked = count === this.filteredOptions.length;
        }
        this.selectedValue = val.value;
        this.selectionChange.emit(this.selectedValue);
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.trackByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.value;
    };
    SelectAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: "mat-select-autocomplete",
                    template: "\n    <mat-form-field appearance=\"{{ appearance }}\">\n      <mat-select\n        #selectElem\n        [placeholder]=\"placeholder\"\n        [formControl]=\"formControl\"\n        [multiple]=\"multiple\"\n        [(ngModel)]=\"selectedValue\"\n        (selectionChange)=\"onSelectionChange($event)\"\n      >\n        <div class=\"box-search\">\n          <mat-checkbox\n            *ngIf=\"multiple\"\n            color=\"primary\"\n            class=\"box-select-all\"\n            [(ngModel)]=\"selectAllChecked\"\n            (change)=\"toggleSelectAll($event)\"\n          ></mat-checkbox>\n          <input\n            #searchInput\n            type=\"text\"\n            [ngClass]=\"{ 'pl-1': !multiple }\"\n            (input)=\"filterItem(searchInput.value)\"\n            [placeholder]=\"selectPlaceholder\"\n          />\n          <div\n            class=\"box-search-icon\"\n            (click)=\"filterItem(''); searchInput.value = ''\"\n          >\n            <button mat-icon-button class=\"search-button\">\n              <mat-icon class=\"mat-24\" aria-label=\"Search icon\">clear</mat-icon>\n            </button>\n          </div>\n        </div>\n        <mat-select-trigger>\n          {{ onDisplayString() }}\n        </mat-select-trigger>\n        <mat-option\n          *ngFor=\"let option of options; trackBy: trackByFn\"\n          [disabled]=\"option.disabled\"\n          [value]=\"option[value]\"\n          [style.display]=\"hideOption(option) ? 'none' : 'flex'\"\n          >{{ option[display] }}\n        </mat-option>\n      </mat-select>\n      <mat-hint style=\"color:red\" *ngIf=\"showErrorMsg\">{{ errorMsg }}</mat-hint>\n    </mat-form-field>\n  ",
                    styles: ["\n      .box-search {\n        margin: 8px;\n        border-radius: 2px;\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),\n          0 0 0 1px rgba(0, 0, 0, 0.08);\n        transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        display: flex;\n      }\n      .box-search input {\n        flex: 1;\n        border: none;\n        outline: none;\n      }\n      .box-select-all {\n        width: 36px;\n        line-height: 33px;\n        color: #808080;\n        text-align: center;\n      }\n      .search-button {\n        width: 36px;\n        height: 36px;\n        line-height: 33px;\n        color: #808080;\n      }\n      .pl-1 {\n        padding-left: 1rem;\n      }\n    "]
                }] }
    ];
    /** @nocollapse */
    SelectAutocompleteComponent.ctorParameters = function () { return []; };
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
    return SelectAutocompleteComponent;
}());
export { SelectAutocompleteComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXQtc2VsZWN0LWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3QtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQStHM0M7aUNBekJxQyxXQUFXO3dCQUc1QixLQUFLO3VCQUNOLFNBQVM7cUJBQ1gsT0FBTzsyQkFDWSxJQUFJLFdBQVcsRUFBRTt3QkFDekIsbUJBQW1COzRCQUN2QixLQUFLO3dCQUVULElBQUk7OzBCQUdNLENBQUM7MEJBQ3dCLFVBQVU7K0JBRzVCLElBQUksWUFBWSxFQUFFOytCQUl6QixFQUFFOzZCQUNKLEVBQUU7Z0NBQ1gsS0FBSzs2QkFDUixFQUFFO0tBQ0Y7Ozs7SUFFaEIsaURBQVc7OztJQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDcEMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUMzQzthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztTQUM3QztLQUNGOzs7O0lB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T0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7Z0JBMU9yQixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFLDRwREErQ1Q7NkJBRUMsNHJCQTZCQztpQkFFSjs7Ozs7b0NBRUUsS0FBSzs4QkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7OEJBQ0wsS0FBSzsyQkFDTCxLQUFLOytCQUNMLEtBQUs7a0NBQ0wsS0FBSzsyQkFDTCxLQUFLOzZCQUdMLEtBQUs7NkJBQ0wsS0FBSztrQ0FFTCxNQUFNOzZCQUdOLFNBQVMsU0FBQyxZQUFZOztzQ0FsSHpCOztTQThGYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIERvQ2hlY2tcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJtYXQtc2VsZWN0LWF1dG9jb21wbGV0ZVwiLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxtYXQtZm9ybS1maWVsZCBhcHBlYXJhbmNlPVwie3sgYXBwZWFyYW5jZSB9fVwiPlxuICAgICAgPG1hdC1zZWxlY3RcbiAgICAgICAgI3NlbGVjdEVsZW1cbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgW211bHRpcGxlXT1cIm11bHRpcGxlXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFZhbHVlXCJcbiAgICAgICAgKHNlbGVjdGlvbkNoYW5nZSk9XCJvblNlbGVjdGlvbkNoYW5nZSgkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1zZWFyY2hcIj5cbiAgICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICAqbmdJZj1cIm11bHRpcGxlXCJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBjbGFzcz1cImJveC1zZWxlY3QtYWxsXCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwic2VsZWN0QWxsQ2hlY2tlZFwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cInRvZ2dsZVNlbGVjdEFsbCgkZXZlbnQpXCJcbiAgICAgICAgICA+PC9tYXQtY2hlY2tib3g+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAjc2VhcmNoSW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3BsLTEnOiAhbXVsdGlwbGUgfVwiXG4gICAgICAgICAgICAoaW5wdXQpPVwiZmlsdGVySXRlbShzZWFyY2hJbnB1dC52YWx1ZSlcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInNlbGVjdFBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiYm94LXNlYXJjaC1pY29uXCJcbiAgICAgICAgICAgIChjbGljayk9XCJmaWx0ZXJJdGVtKCcnKTsgc2VhcmNoSW5wdXQudmFsdWUgPSAnJ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJzZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC0yNFwiIGFyaWEtbGFiZWw9XCJTZWFyY2ggaWNvblwiPmNsZWFyPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG1hdC1zZWxlY3QtdHJpZ2dlcj5cbiAgICAgICAgICB7eyBvbkRpc3BsYXlTdHJpbmcoKSB9fVxuICAgICAgICA8L21hdC1zZWxlY3QtdHJpZ2dlcj5cbiAgICAgICAgPG1hdC1vcHRpb25cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnM7IHRyYWNrQnk6IHRyYWNrQnlGblwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cIm9wdGlvbi5kaXNhYmxlZFwiXG4gICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvblt2YWx1ZV1cIlxuICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImhpZGVPcHRpb24ob3B0aW9uKSA/ICdub25lJyA6ICdmbGV4J1wiXG4gICAgICAgICAgPnt7IG9wdGlvbltkaXNwbGF5XSB9fVxuICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICA8bWF0LWhpbnQgc3R5bGU9XCJjb2xvcjpyZWRcIiAqbmdJZj1cInNob3dFcnJvck1zZ1wiPnt7IGVycm9yTXNnIH19PC9tYXQtaGludD5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuYm94LXNlYXJjaCB7XG4gICAgICAgIG1hcmdpbjogOHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4xNiksXG4gICAgICAgICAgMCAwIDAgMXB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMjAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIH1cbiAgICAgIC5ib3gtc2VhcmNoIGlucHV0IHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgfVxuICAgICAgLmJveC1zZWxlY3QtYWxsIHtcbiAgICAgICAgd2lkdGg6IDM2cHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzM3B4O1xuICAgICAgICBjb2xvcjogIzgwODA4MDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgfVxuICAgICAgLnNlYXJjaC1idXR0b24ge1xuICAgICAgICB3aWR0aDogMzZweDtcbiAgICAgICAgaGVpZ2h0OiAzNnB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMzNweDtcbiAgICAgICAgY29sb3I6ICM4MDgwODA7XG4gICAgICB9XG4gICAgICAucGwtMSB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogMXJlbTtcbiAgICAgIH1cbiAgICBgXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0QXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBEb0NoZWNrIHtcbiAgQElucHV0KCkgc2VsZWN0UGxhY2Vob2xkZXI6IHN0cmluZyA9IFwic2VhcmNoLi4uXCI7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9wdGlvbnM7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc3BsYXkgPSBcImRpc3BsYXlcIjtcbiAgQElucHV0KCkgdmFsdWUgPSBcInZhbHVlXCI7XG4gIEBJbnB1dCgpIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBASW5wdXQoKSBlcnJvck1zZzogc3RyaW5nID0gXCJGaWVsZCBpcyByZXF1aXJlZFwiO1xuICBASW5wdXQoKSBzaG93RXJyb3JNc2cgPSBmYWxzZTtcbiAgQElucHV0KCkgc2VsZWN0ZWRPcHRpb25zO1xuICBASW5wdXQoKSBtdWx0aXBsZSA9IHRydWU7XG5cbiAgLy8gTmV3IE9wdGlvbnNcbiAgQElucHV0KCkgbGFiZWxDb3VudDogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgYXBwZWFyYW5jZTogXCJzdGFuZGFyZFwiIHwgXCJmaWxsXCIgfCBcIm91dGxpbmVcIiA9IFwic3RhbmRhcmRcIjtcblxuICBAT3V0cHV0KClcbiAgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKFwic2VsZWN0RWxlbVwiKSBzZWxlY3RFbGVtO1xuXG4gIGZpbHRlcmVkT3B0aW9uczogQXJyYXk8YW55PiA9IFtdO1xuICBzZWxlY3RlZFZhbHVlOiBBcnJheTxhbnk+ID0gW107XG4gIHNlbGVjdEFsbENoZWNrZWQgPSBmYWxzZTtcbiAgZGlzcGxheVN0cmluZyA9IFwiXCI7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5mb3JtQ29udHJvbC5kaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZW5hYmxlKCk7XG4gICAgfVxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9ucykge1xuICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZE9wdGlvbnM7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZvcm1Db250cm9sLnZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVEcm9wZG93bigpIHtcbiAgICB0aGlzLnNlbGVjdEVsZW0udG9nZ2xlKCk7XG4gIH1cblxuICB0b2dnbGVTZWxlY3RBbGwodmFsKSB7XG4gICAgaWYgKHZhbC5jaGVja2VkKSB7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlLmluY2x1ZGVzKG9wdGlvblt0aGlzLnZhbHVlXSkpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWUuY29uY2F0KFtvcHRpb25bdGhpcy52YWx1ZV1dKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbHRlcmVkVmFsdWVzID0gdGhpcy5nZXRGaWx0ZXJlZE9wdGlvbnNWYWx1ZXMoKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gIWZpbHRlcmVkVmFsdWVzLmluY2x1ZGVzKGl0ZW0pXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XG4gIH1cblxuICBmaWx0ZXJJdGVtKHZhbHVlKSB7XG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxuICAgICAgaXRlbSA9PiBpdGVtW3RoaXMuZGlzcGxheV0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTFcbiAgICApO1xuICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2tlZCA9IHRydWU7XG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlLmluY2x1ZGVzKGl0ZW1bdGhpcy52YWx1ZV0pKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbENoZWNrZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoaWRlT3B0aW9uKG9wdGlvbikge1xuICAgIHJldHVybiAhKHRoaXMuZmlsdGVyZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uKSA+IC0xKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgcGxhaW4gc3RyaW5ncyBhcnJheSBvZiBmaWx0ZXJlZCB2YWx1ZXNcbiAgZ2V0RmlsdGVyZWRPcHRpb25zVmFsdWVzKCkge1xuICAgIGNvbnN0IGZpbHRlcmVkVmFsdWVzID0gW107XG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgZmlsdGVyZWRWYWx1ZXMucHVzaChvcHRpb24udmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJlZFZhbHVlcztcbiAgfVxuXG4gIG9uRGlzcGxheVN0cmluZygpIHtcbiAgICB0aGlzLmRpc3BsYXlTdHJpbmcgPSBcIlwiO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkVmFsdWUgJiYgdGhpcy5zZWxlY3RlZFZhbHVlLmxlbmd0aCkge1xuICAgICAgbGV0IGRpc3BsYXlPcHRpb24gPSBbXTtcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIC8vIE11bHRpIHNlbGVjdCBkaXNwbGF5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYWJlbENvdW50OyBpKyspIHtcbiAgICAgICAgICBkaXNwbGF5T3B0aW9uW2ldID0gdGhpcy5vcHRpb25zLmZpbHRlcihcbiAgICAgICAgICAgIG9wdGlvbiA9PiBvcHRpb25bdGhpcy52YWx1ZV0gPT09IHRoaXMuc2VsZWN0ZWRWYWx1ZVtpXVxuICAgICAgICAgIClbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3BsYXlPcHRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXNwbGF5T3B0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGlzcGxheU9wdGlvbltpXSAmJiBkaXNwbGF5T3B0aW9uW2ldW3RoaXMuZGlzcGxheV0pIHtcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5U3RyaW5nICs9IGRpc3BsYXlPcHRpb25baV1bdGhpcy5kaXNwbGF5XSArIFwiLFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmRpc3BsYXlTdHJpbmcgPSB0aGlzLmRpc3BsYXlTdHJpbmcuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZS5sZW5ndGggPiAxICYmXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUubGVuZ3RoID4gdGhpcy5sYWJlbENvdW50XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlTdHJpbmcgKz0gYCAoKyR7dGhpcy5zZWxlY3RlZFZhbHVlLmxlbmd0aCAtXG4gICAgICAgICAgICAgIHRoaXMubGFiZWxDb3VudH0gb3RoZXJzKWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTaW5nbGUgc2VsZWN0IGRpc3BsYXlcbiAgICAgICAgZGlzcGxheU9wdGlvbiA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXG4gICAgICAgICAgb3B0aW9uID0+IG9wdGlvblt0aGlzLnZhbHVlXSA9PT0gdGhpcy5zZWxlY3RlZFZhbHVlXG4gICAgICAgICk7XG4gICAgICAgIGlmIChkaXNwbGF5T3B0aW9uLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuZGlzcGxheVN0cmluZyA9IGRpc3BsYXlPcHRpb25bMF1bdGhpcy5kaXNwbGF5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5U3RyaW5nO1xuICB9XG5cbiAgb25TZWxlY3Rpb25DaGFuZ2UodmFsKSB7XG4gICAgY29uc3QgZmlsdGVyZWRWYWx1ZXMgPSB0aGlzLmdldEZpbHRlcmVkT3B0aW9uc1ZhbHVlcygpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZS5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIGlmIChmaWx0ZXJlZFZhbHVlcy5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5zZWxlY3RBbGxDaGVja2VkID0gY291bnQgPT09IHRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdmFsLnZhbHVlO1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZFZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFja0J5Rm4oaW5kZXgsIGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbS52YWx1ZTtcbiAgfVxufVxuIl19