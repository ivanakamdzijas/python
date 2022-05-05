(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/icon'), require('@angular/material/select'), require('@angular/material/form-field'), require('@angular/forms'), require('@angular/material')) :
    typeof define === 'function' && define.amd ? define('mat-select-autocomplete', ['exports', '@angular/core', '@angular/common', '@angular/material/icon', '@angular/material/select', '@angular/material/form-field', '@angular/forms', '@angular/material'], factory) :
    (factory((global['mat-select-autocomplete'] = {}),global.ng.core,global.ng.common,global.ng.material.icon,global.ng.material.select,global.ng.material['form-field'],global.ng.forms,global.ng.material));
}(this, (function (exports,i0,common,icon,select,formField,forms,material) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SelectAutocompleteService = /** @class */ (function () {
        function SelectAutocompleteService() {
        }
        SelectAutocompleteService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SelectAutocompleteService.ctorParameters = function () { return []; };
        /** @nocollapse */ SelectAutocompleteService.ngInjectableDef = i0.defineInjectable({ factory: function SelectAutocompleteService_Factory() { return new SelectAutocompleteService(); }, token: SelectAutocompleteService, providedIn: "root" });
        return SelectAutocompleteService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SelectAutocompleteComponent = /** @class */ (function () {
        function SelectAutocompleteComponent() {
            this.selectPlaceholder = "search...";
            this.disabled = false;
            this.display = "display";
            this.value = "value";
            this.formControl = new forms.FormControl();
            this.errorMsg = "Field is required";
            this.showErrorMsg = false;
            this.multiple = true;
            // New Options
            this.labelCount = 1;
            this.appearance = "standard";
            this.selectionChange = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: "mat-select-autocomplete",
                        template: "\n    <mat-form-field appearance=\"{{ appearance }}\">\n      <mat-select\n        #selectElem\n        [placeholder]=\"placeholder\"\n        [formControl]=\"formControl\"\n        [multiple]=\"multiple\"\n        [(ngModel)]=\"selectedValue\"\n        (selectionChange)=\"onSelectionChange($event)\"\n      >\n        <div class=\"box-search\">\n          <mat-checkbox\n            *ngIf=\"multiple\"\n            color=\"primary\"\n            class=\"box-select-all\"\n            [(ngModel)]=\"selectAllChecked\"\n            (change)=\"toggleSelectAll($event)\"\n          ></mat-checkbox>\n          <input\n            #searchInput\n            type=\"text\"\n            [ngClass]=\"{ 'pl-1': !multiple }\"\n            (input)=\"filterItem(searchInput.value)\"\n            [placeholder]=\"selectPlaceholder\"\n          />\n          <div\n            class=\"box-search-icon\"\n            (click)=\"filterItem(''); searchInput.value = ''\"\n          >\n            <button mat-icon-button class=\"search-button\">\n              <mat-icon class=\"mat-24\" aria-label=\"Search icon\">clear</mat-icon>\n            </button>\n          </div>\n        </div>\n        <mat-select-trigger>\n          {{ onDisplayString() }}\n        </mat-select-trigger>\n        <mat-option\n          *ngFor=\"let option of options; trackBy: trackByFn\"\n          [disabled]=\"option.disabled\"\n          [value]=\"option[value]\"\n          [style.display]=\"hideOption(option) ? 'none' : 'flex'\"\n          >{{ option[display] }}\n        </mat-option>\n      </mat-select>\n      <mat-hint style=\"color:red\" *ngIf=\"showErrorMsg\">{{ errorMsg }}</mat-hint>\n    </mat-form-field>\n  ",
                        styles: ["\n      .box-search {\n        margin: 8px;\n        border-radius: 2px;\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),\n          0 0 0 1px rgba(0, 0, 0, 0.08);\n        transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        display: flex;\n      }\n      .box-search input {\n        flex: 1;\n        border: none;\n        outline: none;\n      }\n      .box-select-all {\n        width: 36px;\n        line-height: 33px;\n        color: #808080;\n        text-align: center;\n      }\n      .search-button {\n        width: 36px;\n        height: 36px;\n        line-height: 33px;\n        color: #808080;\n      }\n      .pl-1 {\n        padding-left: 1rem;\n      }\n    "]
                    }] }
        ];
        /** @nocollapse */
        SelectAutocompleteComponent.ctorParameters = function () { return []; };
        SelectAutocompleteComponent.propDecorators = {
            selectPlaceholder: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            options: [{ type: i0.Input }],
            disabled: [{ type: i0.Input }],
            display: [{ type: i0.Input }],
            value: [{ type: i0.Input }],
            formControl: [{ type: i0.Input }],
            errorMsg: [{ type: i0.Input }],
            showErrorMsg: [{ type: i0.Input }],
            selectedOptions: [{ type: i0.Input }],
            multiple: [{ type: i0.Input }],
            labelCount: [{ type: i0.Input }],
            appearance: [{ type: i0.Input }],
            selectionChange: [{ type: i0.Output }],
            selectElem: [{ type: i0.ViewChild, args: ["selectElem",] }]
        };
        return SelectAutocompleteComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SelectAutocompleteModule = /** @class */ (function () {
        function SelectAutocompleteModule() {
        }
        SelectAutocompleteModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            common.CommonModule,
                            icon.MatIconModule,
                            material.MatButtonModule,
                            select.MatSelectModule,
                            material.MatCheckboxModule,
                            formField.MatFormFieldModule,
                            forms.ReactiveFormsModule,
                        ],
                        declarations: [SelectAutocompleteComponent],
                        exports: [SelectAutocompleteComponent]
                    },] }
        ];
        return SelectAutocompleteModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.SelectAutocompleteService = SelectAutocompleteService;
    exports.SelectAutocompleteComponent = SelectAutocompleteComponent;
    exports.SelectAutocompleteModule = SelectAutocompleteModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=mat-select-autocomplete.umd.js.map