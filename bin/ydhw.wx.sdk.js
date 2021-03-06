/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./sdk_wx/Main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./framework/Assist/Http.ts":
/*!**********************************!*\
  !*** ./framework/Assist/Http.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sdk_Assist_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../sdk/Assist/Log */ "./sdk/Assist/Log.ts");

var Http = /** @class */ (function () {
    function Http() {
    }
    Http.Request = function (platform, url, retryCount, isDebug) {
        if (retryCount === void 0) { retryCount = 1; }
        if (isDebug === void 0) { isDebug = false; }
        var xhr = new XMLHttpRequest();
        // if (isDebug) {
        //     isDebug && Log.Debug("http url:" + url);
        // }
        var urlString = url.Value();
        //Browser.onVVMiniGame || Browser.onQGMiniGame || Browser.onQQMiniGame || Browser.onAlipayMiniGame || Browser.onBLMiniGame || Browser.onHWMiniGame || Browser.onTTMiniGame
        if (platform.IsVivo || platform.IsQGMiniGame || platform.IsQQMiniGame || platform.IsAlipay || platform.IsToutiao /**B站，华为 */) {
            urlString = url.EncodeURI();
        }
        if (platform.IsOnMobile) {
            xhr.open(url.Method(), urlString);
        }
        else {
            xhr.open(url.Method(), urlString, url.IsAsync());
        }
        var header = url.Header();
        for (var key in header) {
            xhr.setRequestHeader(key, header[key]);
        }
        xhr.onerror = function (e) {
            if (retryCount > 1) {
                retryCount--;
                Http.Request(platform, url, retryCount, isDebug);
            }
            else {
                isDebug && _sdk_Assist_Log__WEBPACK_IMPORTED_MODULE_0__["Log"].Error("Http OnError:" + e);
                url.InvokeError(e + "");
            }
        };
        xhr.onabort = function (e) {
            url.InvokeException(e);
        };
        xhr.onprogress = function (e) {
        };
        xhr.onreadystatechange = function () {
            if (this.status === 200) {
            }
            else {
                isDebug && _sdk_Assist_Log__WEBPACK_IMPORTED_MODULE_0__["Log"].Debug("http request status:" + this.status);
            }
        };
        xhr.onload = function () {
            try {
                url.Print();
                var response = JSON.parse(this.responseText);
                url.InvokeReceive(response);
            }
            catch (error) {
                console.error("xhr.onload error:" + error);
            }
        };
        try {
            var content = JSON.stringify(url.Data());
            if (platform.IsOnMobile) {
                xhr.send(content);
            }
            else {
                // xhr.send(url.Data());
                xhr.send(content);
            }
            isDebug && _sdk_Assist_Log__WEBPACK_IMPORTED_MODULE_0__["Log"].Log("Sdk Request=" + url.CheckValue(), content);
        }
        catch (e) {
            url.InvokeException(e);
        }
    };
    Http.RequestNormal = function (platform, url, retryCount, isDebug) {
        if (retryCount === void 0) { retryCount = 1; }
        if (isDebug === void 0) { isDebug = false; }
        var xhr = new XMLHttpRequest();
        // if (isDebug) {
        //     isDebug && Log.Debug("http url:" + url);
        // }
        var urlString = url.CustomUrl();
        if (platform.IsOnMobile) {
            xhr.open(url.Method(), urlString);
        }
        else {
            xhr.open(url.Method(), urlString, url.IsAsync());
        }
        var header = url.Header();
        for (var key in header) {
            xhr.setRequestHeader(key, header[key]);
        }
        xhr.onerror = function (e) {
            if (retryCount > 1) {
                retryCount--;
                Http.RequestNormal(platform, url, retryCount, isDebug);
            }
            else {
                isDebug && _sdk_Assist_Log__WEBPACK_IMPORTED_MODULE_0__["Log"].Error("Http OnError:" + e);
                url.InvokeError(e + "");
            }
        };
        xhr.onabort = function (e) {
            url.InvokeException(e);
        };
        xhr.onprogress = function (e) {
        };
        xhr.onreadystatechange = function () {
            if (this.status === 200) {
            }
            else {
                isDebug && _sdk_Assist_Log__WEBPACK_IMPORTED_MODULE_0__["Log"].Debug("http request status:" + this.status);
            }
        };
        xhr.onload = function () {
            try {
                url.Print();
                console.warn("YDHW Response-" + url + "-data:", this.responseText);
                var response = this.responseText;
                url.InvokeReceive(response);
            }
            catch (error) {
                console.error("xhr.onload error:" + error);
            }
        };
        try {
            xhr.send();
        }
        catch (e) {
            url.InvokeException(e);
        }
    };
    return Http;
}());
/* harmony default export */ __webpack_exports__["default"] = (Http);


/***/ }),

/***/ "./framework/Assist/StorageAdapter.ts":
/*!********************************************!*\
  !*** ./framework/Assist/StorageAdapter.ts ***!
  \********************************************/
/*! exports provided: StorageAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageAdapter", function() { return StorageAdapter; });
/* harmony import */ var _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Log/FrameworkLog */ "./framework/Log/FrameworkLog.ts");

var StorageAdapter = /** @class */ (function () {
    function StorageAdapter() {
    }
    Object.defineProperty(StorageAdapter, "WriteString", {
        get: function () {
            if (this._StringWriter == null) {
                _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_0__["FrameworkLog"].Error("Adapter.WriteString is not set");
                return function (key, value) { };
            }
            return this._StringWriter;
        },
        set: function (method) {
            this._StringWriter = method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageAdapter, "WriteObject", {
        get: function () {
            if (this._ObjectWriter == null) {
                _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_0__["FrameworkLog"].Error("Adapter.WriteObject is not set");
                return function (key, data) { };
            }
            return this._ObjectWriter;
        },
        set: function (method) {
            this._ObjectWriter = method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageAdapter, "ReadString", {
        get: function () {
            if (this._StringReader == null) {
                _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_0__["FrameworkLog"].Error("Adapter.ReadObject is not set");
                return function (key) { return ""; };
            }
            return this._StringReader;
        },
        set: function (method) {
            this._StringReader = method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageAdapter, "ReadObject", {
        get: function () {
            if (this._ObjectReader == null) {
                _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_0__["FrameworkLog"].Error("Adapter.ReadObject is not set");
                return function (key) { return {}; };
            }
            return this._ObjectReader;
        },
        set: function (method) {
            this._ObjectReader = method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StorageAdapter, "DeleteObject", {
        get: function () {
            if (this._ObjectDeleter == null) {
                _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_0__["FrameworkLog"].Error("Adapter.DeleteObject is not set");
                return function (key) { };
            }
            return this._ObjectDeleter;
        },
        set: function (method) {
            this._ObjectDeleter = method;
        },
        enumerable: true,
        configurable: true
    });
    ;
    StorageAdapter.SDK_CONFIG = "YDHW_CONFIG";
    StorageAdapter._StringWriter = null;
    StorageAdapter._ObjectWriter = null;
    StorageAdapter._StringReader = null;
    StorageAdapter._ObjectReader = null;
    StorageAdapter._ObjectDeleter = null;
    return StorageAdapter;
}());



/***/ }),

/***/ "./framework/Core.ts":
/*!***************************!*\
  !*** ./framework/Core.ts ***!
  \***************************/
/*! exports provided: Method, Wrapper, Variable, VariableContainer, MethodContainer, Core, BaseManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Method", function() { return Method; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wrapper", function() { return Wrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Variable", function() { return Variable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariableContainer", function() { return VariableContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MethodContainer", function() { return MethodContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Core", function() { return Core; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseManager", function() { return BaseManager; });
/* harmony import */ var _Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Assist/StorageAdapter */ "./framework/Assist/StorageAdapter.ts");
/* harmony import */ var _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Log/FrameworkLog */ "./framework/Log/FrameworkLog.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Method = /** @class */ (function () {
    function Method(caller, method, owner) {
        this.caller = caller;
        this.method = method;
        this._Owner = owner;
    }
    Method.prototype.Log = function () {
        var tmpString = "";
        tmpString += "/ncaller:" + this.caller.name;
        tmpString += "/nmethod:" + this.method.name;
        if (this.args) {
            for (var i = 0; i < this.args.length; i++) {
                var arg = this.args[i];
                tmpString += "/r/n arg[" + i + "]=" + arg.name;
            }
        }
        if (this._Owner) {
            tmpString += "/n Owner:" + this._Owner;
        }
        _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__["FrameworkLog"].Debug(tmpString);
    };
    Method.prototype.Destroy = function () {
        this.caller = null;
        this.method = null;
    };
    // Invoke(...args: any[]): void {
    // }
    Method.prototype.Bind = function (caller, binding) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.caller = caller;
        this.method = binding;
        this.args = args;
        return this;
    };
    return Method;
}());

//Wrapper----------------------------------------------------------------------------
var Wrapper = /** @class */ (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper(capacity) {
        if (capacity === void 0) { capacity = 64; }
        var _this = _super.call(this) || this;
        _this._Size = 0;
        _this.length = capacity;
        return _this;
    }
    Wrapper.prototype.RemoveAt = function (index) {
        var e = this[index]; // make copy of element to remove so it can be returned
        this[index] = this[--this._Size]; // overwrite item to remove with last element
        this[this._Size] = null; // null last element, so gc can do its work
        return e;
    };
    Wrapper.prototype.Remove = function (e) {
        var i;
        var e2;
        var size = this._Size;
        for (i = 0; i < size; i++) {
            e2 = this[i];
            if (e == e2) {
                this[i] = this[--this._Size]; // overwrite item to remove with last element
                this[this._Size] = null; // null last element, so gc can do its work
                return true;
            }
        }
        return false;
    };
    Wrapper.prototype.RemoveLast = function () {
        if (this._Size > 0) {
            var e = this[--this._Size];
            this[this._Size] = null;
            return e;
        }
        return null;
    };
    Wrapper.prototype.Contains = function (e) {
        var i;
        var size;
        for (i = 0, size = this._Size; size > i; i++) {
            if (e === this[i]) {
                return true;
            }
        }
        return false;
    };
    Wrapper.prototype.RemoveAll = function (bag) {
        var modified = false;
        var i;
        var j;
        var l;
        var e1;
        var e2;
        for (i = 0, l = bag.Size; i < l; i++) {
            e1 = bag.Get(i);
            for (j = 0; j < this._Size; j++) {
                e2 = this[j];
                if (e1 === e2) {
                    this.RemoveAt(j);
                    j--;
                    modified = true;
                    break;
                }
            }
        }
        return modified;
    };
    Wrapper.prototype.Get = function (index) {
        if (index >= this.length) {
            throw new Error('ArrayIndexOutOfBoundsException');
        }
        return this[index];
    };
    Wrapper.prototype.SafeGet = function (index) {
        if (index >= this.length) {
            this.Grow((index * 7) / 4 + 1);
        }
        return this[index];
    };
    Object.defineProperty(Wrapper.prototype, "Size", {
        get: function () {
            return this._Size;
        },
        enumerable: true,
        configurable: true
    });
    Wrapper.prototype.GetCapacity = function () {
        return this.length;
    };
    Wrapper.prototype.IsIndexWithinBounds = function (index) {
        return index < this.GetCapacity();
    };
    Wrapper.prototype.IsEmpty = function () {
        return this._Size == 0;
    };
    Wrapper.prototype.Add = function (e) {
        // is size greater than capacity increase capacity
        if (this._Size === this.length) {
            this.Grow();
        }
        this[this._Size++] = e;
    };
    Wrapper.prototype.Set = function (index, e) {
        if (index >= this.length) {
            this.Grow(index * 2);
        }
        this._Size = index + 1;
        this[index] = e;
    };
    Wrapper.prototype.Grow = function (newCapacity) {
        if (newCapacity === void 0) { newCapacity = ~~((this.length * 3) / 2) + 1; }
        this.length = ~~newCapacity;
    };
    Wrapper.prototype.EnsureCapacity = function (index) {
        if (index >= this.length) {
            this.Grow(index * 2);
        }
    };
    Wrapper.prototype.Clear = function () {
        var i;
        var size;
        // null all elements so gc can clean up
        for (i = 0, size = this._Size; i < size; i++) {
            this[i] = null;
        }
        this._Size = 0;
    };
    Wrapper.prototype.AddAll = function (items) {
        var i;
        for (i = 0; items.Size > i; i++) {
            this.Add(items.Get(i));
        }
    };
    return Wrapper;
}(Array));

//Variable----------------------------------------------------------------------------
var Variable = /** @class */ (function () {
    function Variable(varId, owner, value) {
        // caller: any;
        // args: any[];
        this._id = 0;
        this._IsStore = false;
        this._ListCaller = {};
        this._ListBindingEvent = {};
        this._ListArgs = {}; //Wrapper<any> = new Wrapper<any>();
        this._Owner = owner;
        this._Name = varId;
        this._Value = value;
        this._Type = typeof (value);
        // this._ListCaller = new Wrapper<any>();
        // this._ListBindingEvent = new Wrapper<IBindingEvent>();
        // this._ListArgs = new Wrapper<any>();
    }
    Variable.prototype.Log = function () {
        var tmpString = "";
        if (this._Owner) {
            tmpString += "Owner: " + this._Owner;
        }
        tmpString += "\nType: " + this._Type;
        tmpString += "\nVariableId: " + this._Name;
        tmpString += "\nValue: " + this._Value;
        tmpString += "\n";
        _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__["FrameworkLog"].Debug(tmpString);
    };
    Variable.prototype.SetOwner = function (owner) {
        this._Owner = owner;
        return this;
    };
    Variable.prototype.Owner = function () {
        return this._Owner;
    };
    Variable.prototype.Store = function () {
        this._IsStore = true;
        return this;
    };
    Variable.prototype.IsStore = function () {
        return this._IsStore;
    };
    Variable.prototype.Data = function () {
        var data = {
            manager: this.Owner,
        };
    };
    Variable.prototype.Revert = function (value) {
        this._Value = value;
        this._Type = typeof (value);
    };
    Variable.prototype.Name = function () {
        return this._Name;
    };
    Variable.prototype.SetValue = function (value) {
        var oldValue = this._Value;
        this._Value = value;
        this._Type = typeof (value);
        this._EmitValueChanged(oldValue);
        /*todo:optimize
        if (this._Value !== value) {
            let oldValue = this._Value;
            this._Value = value;
            this._Type = typeof (value);
            this._EmitValueChanged(this.caller, oldValue);
        }
        */
        return this;
    };
    Variable.prototype.Value = function () {
        return this._Value;
    };
    Variable.prototype.Type = function () {
        return this._Type;
    };
    Variable.prototype.Bind = function (caller, bindingEvent) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // this._ListCaller.Remove(caller);
        this._id++;
        this._ListCaller[this._id + ""] = caller;
        // this._ListBindingEvent.Remove(bindingEvent);
        this._ListBindingEvent[this._id + ""] = bindingEvent;
        this._ListArgs[this._id + ""] = args;
        // if (args && args.length > 0) {
        //     this._ListArgs.Remove(args);
        // this._ListArgs.Add(args);
        // }
    };
    Variable.prototype.Assign = function () {
        this._EmitValueChanged(this._Value);
    };
    Variable.prototype.Unbind = function (caller, bindingEvent) {
        // this._ListCaller.Remove(caller);
        for (var key in this._ListCaller) {
            // this._ListCaller[key] = null;
            delete this._ListCaller[key];
        }
        for (var key in this._ListBindingEvent) {
            // this._ListCaller[key] = null;
            delete this._ListBindingEvent[key];
        }
        // this._ListBindingEvent.Remove(bindingEvent);
    };
    Variable.prototype._EmitValueChanged = function (oldValue) {
        for (var key in this._ListBindingEvent) {
            var caller = this._ListCaller[key];
            var event_1 = this._ListBindingEvent[key];
            var args = this._ListArgs[key];
            var tmpList = [];
            tmpList.push(this._Value);
            for (var index in args) {
                tmpList.push(args[index]);
            }
            event_1.apply(caller, tmpList);
        }
        // for (let i = 0, count = Object.keys(this._ListBindingEvent).length; i < count; i++) {
        //     let caller: any = this._ListCaller[i];
        //     let event: IBindingEvent = this._ListBindingEvent[i];
        //     let args: any[] = this._ListArgs[i];
        //     let tmpList = [];
        //     tmpList.push(this._Value);
        //     for (let index in args) {
        //         tmpList.push(args[index]);
        //     }
        //     event.apply(caller, tmpList);
        //     // event.call(caller, this._Value, args);
        // }
    };
    return Variable;
}());

//VariableContainer----------------------------------------------------------------------------
var VariableContainer = /** @class */ (function () {
    function VariableContainer() {
        this._DictVariable = {}; //用对象属性来作为Dictionary的使用
        /**
         * 默认为还未恢复过数据，如果触发过恢复数据后则为true，后面就不再二次恢复。
         */
        this._IsRestore = false;
    }
    VariableContainer.prototype.CheckAllVariables = function () {
        _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__["FrameworkLog"].Debug("Check all variables");
        _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__["FrameworkLog"].Debug("---------------------------------------------");
        var tmpDict = this._DictVariable;
        for (var key in tmpDict) {
            var variable = tmpDict[key];
            _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__["FrameworkLog"].Debug("Variable:" + key);
            variable.Log();
        }
        _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__["FrameworkLog"].Debug("---------------------------------------------");
    };
    VariableContainer.prototype._GetVariable = function (varId, owner) {
        var tmpDict = this._DictVariable;
        var ppt = tmpDict[varId];
        if (ppt == undefined || ppt == null) {
            // if (ppt == null) {
            //     //todo:暂时待定
            //     //console.warn("1 不存在属性变量:" + varId);
            // } else {
            //     tmpDict[varId] = ppt;
            // }
            return null;
        }
        return ppt;
    };
    VariableContainer.prototype.GetVariable = function (varId, owner) {
        var tmpDict = this._DictVariable;
        var ppt = tmpDict[varId];
        if (ppt == null) {
            var variable = new Variable(varId, owner, null);
            ppt = this.RevertVariable(variable);
            if (ppt == null) {
                //todo:暂时待定
                // console.warn("2 不存在属性变量:" + varId);
            }
            else {
                tmpDict[varId] = ppt;
            }
        }
        return ppt;
    };
    VariableContainer.prototype.ModifyVariable = function (variable, value) {
        if (variable != null) {
            variable.SetValue(value);
            if (variable.IsStore()) {
                this.SaveVariable(variable.Name());
            }
        }
        else {
            _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__["FrameworkLog"].Error("修改的变量不存在");
        }
    };
    VariableContainer.prototype.DeclareVariable = function (varId, owner, value) {
        if (varId == null || varId.toString().length == 0) {
            //todo:error
            return null;
        }
        else {
            var ppt = this._GetVariable(varId);
            if (ppt != null) {
                ppt.SetValue(value);
            }
            else {
                ppt = new Variable(varId, owner, value);
                this._DictVariable[varId] = ppt;
            }
            return ppt;
        }
    };
    VariableContainer.prototype.RemoveVariable = function (varId) {
        var tmpDict = this._DictVariable;
        var ppt = tmpDict[varId];
        if (ppt != null) {
            delete tmpDict[varId]; //删除对象属性
            _Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_0__["StorageAdapter"].DeleteObject(varId);
            // Laya.LocalStorage.removeItem(varId);
        }
        else {
            //todo:warn
        }
    };
    VariableContainer.prototype._GetVariableValue = function (varId) {
        var ppt = this.GetVariable(varId);
        return ppt == null ? null : ppt.Value();
    };
    VariableContainer.prototype.GetValueT = function (varId, defaultValue) {
        var value = this._GetVariableValue(varId);
        if (value == null) {
            _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__["FrameworkLog"].Warn("\u627E\u4E0D\u5230\u5BF9\u5E94\u7684\u53D8\u91CF\u540D:" + varId);
            if (typeof defaultValue == "undefined") {
                return null;
            }
            return defaultValue;
        }
        else {
            return value;
        }
    };
    VariableContainer.prototype.SetValueT = function (varId, value) {
        var ppt = this._GetVariable(varId);
        if (ppt != null) {
            this.ModifyVariable(ppt, value);
        }
        else {
            console.error("修改的变量不存在：" + varId);
        }
    };
    VariableContainer.prototype.AddValueT = function (varId, value) {
        var ppt = this._GetVariable(varId);
        if (ppt != null) {
            if (typeof value == "number") {
                var tmp = ppt.Value() + Number(value);
                this.ModifyVariable(ppt, tmp);
                return ppt.Value();
            }
            else if (typeof value == "string") {
                var tmp = ppt.Value() + String(value);
                this.ModifyVariable(ppt, tmp);
                return ppt.Value();
            }
            else {
                console.error("\u5F53\u524D\u6570\u636E\u7C7B\u578B\u6682\u4E0D\u652F\u6301\"+\"\u8FD0\u7B97\u7B26\u64CD\u4F5C");
            }
        }
        else {
            console.error("\"+\" \u53D8\u91CF\u4E0D\u5B58\u5728\uFF1A" + varId);
        }
        return null;
    };
    VariableContainer.prototype.SubValueT = function (varId, value) {
        var ppt = this._GetVariable(varId);
        if (ppt != null) {
            if (typeof value == "number") {
                var tmp = ppt.Value() + Number(value);
                this.ModifyVariable(ppt, tmp);
                return ppt.Value();
            }
            else if (typeof value == "string") {
                var tmp = ppt.Value() + String(value);
                this.ModifyVariable(ppt, tmp);
                return ppt.Value();
            }
            else {
                console.error("\u5F53\u524D\u6570\u636E\u7C7B\u578B\u6682\u4E0D\u652F\u6301\"+\"\u8FD0\u7B97\u7B26\u64CD\u4F5C");
            }
        }
        else {
            console.error("\"-\" \u53D8\u91CF\u4E0D\u5B58\u5728\uFF1A" + varId);
        }
        return null;
    };
    VariableContainer.prototype.Bind = function (varId, caller, callback) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var ppt = this._GetVariable(varId);
        if (ppt == null) {
            //todo:error
            return false;
        }
        else {
            ppt.Bind(caller, callback, args);
            return true;
        }
    };
    VariableContainer.prototype.Unbind = function (varId, caller, callback) {
        var ppt = this._GetVariable(varId);
        if (ppt == null) {
            //todo:error
            return false;
        }
        else {
            ppt.Unbind(caller, callback);
            return true;
        }
    };
    VariableContainer.prototype.RevertVariable = function (variable) {
        var varId = variable.Name();
        var data = _Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_0__["StorageAdapter"].ReadObject(varId);
        if (!data) {
            _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__["FrameworkLog"].Warn("本地数据不存在字段:" + varId);
            return null;
        }
        // console.log("typeof(data)=" + typeof (data));
        if (typeof (data) == "object") {
            var name_1 = data.name;
            var type = data.type;
            if (typeof (type) == "undefined") {
                console.warn("YDHW-Framework: 1 数据类型不存在!");
                return null;
            }
            var value = data.value;
            if (typeof (value) == "undefined") {
                console.warn("YDHW-Framework: 2 数据类型不存在!");
                return null;
            }
            var isStore = data.is_store;
            if (typeof (isStore) == "undefined") {
                console.warn("YDHW-Framework: 3 数据类型不存在!");
                return null;
            }
            var owner = data.owner;
            if (typeof (owner) == "undefined") {
                console.warn("YDHW-Framework: 4 数据类型不存在!");
                return null;
            }
            if (type == "string") {
                variable.Revert(String(value));
            }
            else if (type == "number") {
                variable.Revert(Number(value));
            }
            else if (type == "boolean") {
                variable.Revert(Boolean(value));
            }
            else if (type == "object") {
                variable.Revert(Object(value));
            }
            else {
                console.warn("YDHW-Framework: 数据类型不存在!");
                return null;
            }
            variable.Store();
            variable.SetOwner(owner);
        }
        return variable;
    };
    VariableContainer.prototype.RevertData = function () {
        // for (let i = 0, l = vars.length; i < l; i++) {
        //     let data = vars[i];
        //     let name = data.name as string;
        //     let type = data.type as string;
        //     let value = data.value as any;
        //     let isStore = data.is_store as boolean;
        //     let owner = data.owner as string;
        //     if (name in this._DictVariable) {
        //         let ppt = this._DictVariable[name] as IVariable;
        //         if (type == "string") {
        //             ppt.SetValue(String(value));
        //         } else if (type == "number") {
        //             ppt.SetValue(Number(value));
        //         } else if (type == "boolean") {
        //             ppt.SetValue(Boolean(value));
        //         }
        //         ppt.Store();
        //         ppt.SetOwner(owner)
        //     } else {
        //         //TODO:捆版各个变量会各个caller，目前没有需求
        //     }
        // }
        if (this._IsRestore) {
            return;
        }
        var tmpDict = this._DictVariable;
        for (var name_2 in tmpDict) {
            var variable = tmpDict[name_2];
            if (!variable.IsStore()) {
                continue;
            }
            this.RevertVariable(variable);
            // let data = Adapter.Read(name);
            // if (!data) {
            //     continue;
            // }
            // // console.log("typeof(data)=" + typeof (data));
            // if (typeof (data) == "object") {
            //     let name = data.name as string;
            //     let type = data.type as string;
            //     if (typeof (type) == "undefined") {
            //         console.error("1 数据类型不存在!");
            //         return;
            //     }
            //     let value = data.value as any;
            //     if (typeof (value) == "undefined") {
            //         console.error("2 数据类型不存在!");
            //         return;
            //     }
            //     let isStore = data.is_store as boolean;
            //     if (typeof (isStore) == "undefined") {
            //         console.error("3 数据类型不存在!");
            //         return;
            //     }
            //     let owner = data.owner as string;
            //     if (typeof (owner) == "undefined") {
            //         console.error("4 数据类型不存在!");
            //         return;
            //     }
            //     if (type == "string") {
            //         variable.Revert(String(value));
            //     } else if (type == "number") {
            //         variable.Revert(Number(value));
            //     } else if (type == "boolean") {
            //         variable.Revert(Boolean(value));
            //     } else if (type == "object") {
            //         variable.Revert(Object(value));
            //     } else {
            //         console.error("数据类型不存在!");
            //         return;
            //     }
            //     variable.Store();
            //     variable.SetOwner(owner)
            // }
        }
        this._IsRestore = true;
    };
    VariableContainer.prototype.SaveData = function (name) {
        var tmpDict = this._DictVariable;
        var vars = [];
        for (var key in tmpDict) {
            var variable = tmpDict[key];
            // if (variable.Owner() == name && variable.IsStore()) {
            //     vars.push({
            //         name: key,
            //         value: variable.Value(),
            //         type: variable.Type(),
            //         is_store: variable.IsStore(),
            //         owner: variable.Owner(),
            //     })
            // }
            if (variable.Owner() == name && variable.IsStore()) {
                _Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_0__["StorageAdapter"].WriteObject(key, {
                    name: key,
                    value: variable.Value(),
                    type: variable.Type(),
                    is_store: variable.IsStore(),
                    owner: variable.Owner(),
                });
                // Laya.LocalStorage.setJSON(key, {
                //     name: key,
                //     value: variable.Value<any>(),
                //     type: variable.Type(),
                //     is_store: variable.IsStore(),
                //     owner: variable.Owner(),
                // });
            }
        }
        return vars;
    };
    VariableContainer.prototype.SaveAllData = function () {
        var tmpDict = this._DictVariable;
        var vars = [];
        for (var key in tmpDict) {
            this.SaveVariable(key);
        }
    };
    VariableContainer.prototype.SaveVariable = function (name) {
        var tmpDict = this._DictVariable;
        var variable = tmpDict[name];
        if (variable.IsStore()) {
            _Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_0__["StorageAdapter"].WriteObject(name, {
                name: name,
                value: variable.Value(),
                type: variable.Type(),
                is_store: variable.IsStore(),
                owner: variable.Owner(),
            });
            // Laya.LocalStorage.setJSON(name, {
            //     name: name,
            //     value: variable.Value<any>(),
            //     type: variable.Type(),
            //     is_store: variable.IsStore(),
            //     owner: variable.Owner(),
            // });
        }
    };
    return VariableContainer;
}());

//MethodContainer----------------------------------------------------------------------------
var MethodContainer = /** @class */ (function () {
    function MethodContainer() {
        this._DictNotify = {};
        this._DictMethod = {};
    }
    MethodContainer.prototype.CheckAllMethods = function () {
        console.log("Check all notify");
        console.log("---------------------------------------------");
        for (var key in this._DictNotify) {
            var notifies = this._DictNotify[key];
            console.log("Notify: " + key);
            for (var i = 0; i < notifies.length; i++) {
                var notify = notifies[i];
                notify.Log();
            }
        }
        console.log("Check all method");
        console.log("---------------------------------------------");
        for (var key in this._DictMethod) {
            var method = this._DictMethod[key];
            console.log("Mehtod: " + key);
            method.Log();
        }
        console.log("---------------------------------------------");
    };
    /**
     * 注册普通事件，可以获取返回值
     * @param methodId
     * @param caller
     * @param event
     */
    MethodContainer.prototype.DeclareMethod = function (methodId, caller, owner, event) {
        var tmpDict = this._DictMethod;
        var method = tmpDict[methodId];
        if (method == null) {
            tmpDict[methodId] = new Method(caller, event, owner);
        }
        else {
            console.error(methodId + " 已经被注册过了");
        }
        return method;
    };
    /**
     * 注册广播事件，无返回值
     * @param methodId
     * @param caller
     * @param event
     */
    MethodContainer.prototype.DeclareNotify = function (methodId, caller, owner, event) {
        var tmpDict = this._DictNotify;
        var tmpList = tmpDict[methodId];
        if (tmpList == null) {
            tmpDict[methodId] = [];
            tmpDict[methodId].push(new Method(caller, event, owner));
        }
        else {
            tmpDict[methodId].push(new Method(caller, event, owner));
        }
    };
    // public UnregisterEvent(methodId: SINGLETON_METHOD, caller: any, method: IMethod): void {
    //     let tmpList: MethodHandler[] = this._DictEvent[methodId];
    //     if (tmpList == null) {
    //         //todo:warn
    //     } else if (tmpList.length <= 0) {
    //         delete this._DictEvent[methodId];//删除
    //     } else {
    //         tmpList = tmpList.filter(item => item != new MethodHandler(caller, method));
    //         this._DictEvent[methodId] = tmpList;
    //     }
    // }
    /**
     * 广播通知对应的事件
     * @param methodId
     * @param arg
     */
    MethodContainer.prototype.InvokeNotify = function (methodId, arg) {
        var tmpDict = this._DictNotify;
        var tmpList = tmpDict[methodId];
        if (!tmpList || !tmpList.length)
            return;
        for (var i = 0, count = tmpList.length; i < count; i++) {
            var method = tmpList[i];
            method.method.apply(method.caller, arg);
        }
    };
    /**
     *
     * @param methodId 调用指定事件类型，获取返回参数
     * @param arg 具有返回值
     */
    MethodContainer.prototype.InvokeMethod = function (methodId, arg) {
        var tmpDict = this._DictMethod;
        var method = tmpDict[methodId];
        if (method == null) {
            console.error("事件没注册：" + methodId);
            return;
        }
        return method.method.apply(method.caller, arg);
    };
    // public ClearAllEvent(): void {
    //     for (let key in this._DictEvent) {
    //         let eventList: MethodHandler[] = this._DictEvent[key];
    //         for (let i = 0, count = eventList.length; i < count; i++) {
    //             let method = eventList[i];
    //             method.Destroy();
    //             delete eventList[i];
    //         }
    //     }
    //     delete this._DictEvent;
    // }
    MethodContainer.prototype.ClearAllMethod = function () {
        var tmpDict = this._DictMethod;
        for (var key in tmpDict) {
            var method = tmpDict[key];
            method.Destroy();
            delete tmpDict[key];
        }
        delete this._DictMethod;
    };
    return MethodContainer;
}());

//Core---------------------------------------------------------------------------------------------
function as(obj, method1) {
    return method1 in obj ? obj : null;
}
var Core = /** @class */ (function () {
    function Core() {
        this.VariableContainer = new VariableContainer();
        this.MethodContainer = new MethodContainer();
        this._ListInitialize = {};
        this._ListExecute = {};
        this._ListAll = {};
        /**
         * 从游戏开始运行到当前帧率
         * */
        this._CurFrameIndex = 0;
        this._ListInitialize = {};
        this._ListExecute = {};
        this._ListAll = {};
        this._Manager = new BaseManager();
        this._Manager.SetCore(this);
    }
    Object.defineProperty(Core, "Instance", {
        get: function () {
            if (Core._Instance == null) {
                Core._Instance = new Core();
            }
            return Core._Instance;
        },
        enumerable: true,
        configurable: true
    });
    Core.SetCore = function (mgr, core) {
        var method = as(mgr, 'SetCore');
        if (method != null) {
            method.SetCore(core);
        }
    };
    Core.SetName = function (mgr, name) {
        var method = as(mgr, 'SetName');
        if (method != null) {
            method.SetName(name);
        }
    };
    Core.prototype.GetVariableContainer = function () {
        return this.VariableContainer;
    };
    Core.prototype.GetMethodContainer = function () {
        return this.MethodContainer;
    };
    Core.prototype.AddManager = function (managerType, manager) {
        _Log_FrameworkLog__WEBPACK_IMPORTED_MODULE_1__["FrameworkLog"].Log("Add Manager: " + managerType);
        if ('function' === typeof manager) {
            var Klass = manager;
            manager = new Klass();
        }
        Core.SetCore(manager, this);
        Core.SetName(manager, managerType);
        var initializeManager = as(manager, 'Initialize');
        if (initializeManager != null) {
            var _initializeManagers = this._ListInitialize;
            _initializeManagers[managerType] = initializeManager;
        }
        var executeManager = as(manager, 'Execute');
        if (executeManager != null) {
            var _executeManagers = this._ListExecute;
            _executeManagers[managerType] = executeManager;
        }
        var _allManagers = this._ListAll;
        _allManagers[managerType] = manager;
        return this;
    };
    Core.prototype.AsManager = function () {
        return this._Manager;
    };
    Core.prototype.GetManager = function (mgrType) {
        return this._ListAll[mgrType];
    };
    Core.prototype.Initialize = function () {
        var tmpDict = this._ListInitialize;
        for (var key in tmpDict) {
            var tmpValue = tmpDict[key];
            tmpValue && tmpValue.Initialize();
        }
    };
    Core.prototype.Execute = function () {
        this._CurFrameIndex++;
        var tmpDict = this._ListExecute;
        for (var key in tmpDict) {
            var tmpValue = tmpDict[key];
            tmpValue && tmpValue.Execute(this._CurFrameIndex);
        }
    };
    /**
     * 从本地还原数据
     */
    Core.prototype.Restore = function () {
        var tmpList = this._ListAll;
        for (var key in tmpList) {
            var tmpValue = tmpList[key];
            tmpValue.Restore();
        }
    };
    /**
     * 保存数据到本地
     */
    Core.prototype.Save = function () {
        var tmpList = this._ListAll;
        for (var key in tmpList) {
            var tmpValue = tmpList[key];
            tmpValue.Save();
        }
    };
    Core._Instance = null;
    return Core;
}());

//Manager----------------------------------------------------------------------------
var BaseManager = /** @class */ (function () {
    function BaseManager() {
        this.Name = "Gauntlet";
        this._Core = null;
        this.VariableContainer = null;
        this.MethodContainer = null;
    }
    BaseManager.prototype.SetName = function (name) {
        this.Name = name;
    };
    BaseManager.prototype.SetCore = function (core) {
        this._Core = core;
        this.VariableContainer = this._Core.GetVariableContainer();
        this.MethodContainer = this._Core.GetMethodContainer();
    };
    /**
     * 根据方法ID注册事件，一个ID侦听一个事件
     * @param methodId
     * @param binding
     */
    BaseManager.prototype.DeclareMethod = function (methodId, caller, binding) {
        return this.MethodContainer.DeclareMethod(methodId, caller, this.Name, binding);
    };
    /**
     * 根据方法ID注册事件：一个ID侦听多个不同事件
     * @param methodId
     * @param binding
     */
    BaseManager.prototype.DeclareNotify = function (methodId, caller, binding) {
        this.MethodContainer.DeclareNotify(methodId, caller, this.Name, binding);
    };
    /**
     * 根据方法ID执行对应函数：一个ID触发绑定注册的唯一一个事件
     * @param methodId
     * @param args
     */
    BaseManager.prototype.InvokeMethod = function (methodId) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.MethodContainer.InvokeMethod(methodId, args);
    };
    /**
     * 根据方法ID执行对应函数：一个ID触发绑定注册的一个或多个事件
     * @param methodId
     * @param args
     */
    BaseManager.prototype.InvokeNotify = function (methodId) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.MethodContainer.InvokeNotify(methodId, args);
    };
    BaseManager.prototype.DeclareVariable = function (varId, arg) {
        return this.VariableContainer.DeclareVariable(varId, this.Name, arg);
    };
    /**
     * 获取变量，先在当前内存查找，如果不存在，
     * 则会到本地存储数据里面读取，反序列化后再查找匹对，
     * 如果存在则放入内存种并返回，还不存在则返回null，
     * @param varId
     */
    BaseManager.prototype.GetVariable = function (varId) {
        return this.VariableContainer.GetVariable(varId, this.Name);
    };
    BaseManager.prototype.GetValueT = function (varId, defaultValue) {
        return this.VariableContainer.GetValueT(varId, defaultValue);
    };
    BaseManager.prototype.SetValueT = function (varId, value) {
        this.VariableContainer.SetValueT(varId, value);
    };
    BaseManager.prototype.AddValueT = function (varId, value) {
        return this.VariableContainer.AddValueT(varId, value);
    };
    BaseManager.prototype.SubValueT = function (varId, value) {
        return this.VariableContainer.SubValueT(varId, value);
    };
    BaseManager.prototype.BindVariable = function (varId, caller, callback) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        return this.VariableContainer.Bind(varId, caller, callback);
    };
    BaseManager.prototype.UnbindVariable = function (varId, caller, callback) {
        return this.VariableContainer.Unbind(varId, caller, callback);
    };
    BaseManager.prototype.RemoveVariable = function (varId) {
        this.VariableContainer.RemoveVariable(varId);
    };
    /**
     * 每个Manager重载这个函数可以在加载本地数据时初始化自定数据格式的数据配置
     */
    BaseManager.prototype.Restore = function () {
        this.VariableContainer.RevertData();
    };
    /**
     * 每个Manager重载这个函数保存自定数据格式的数据配置
     */
    BaseManager.prototype.Save = function () {
        this.Name && this.Name.length > 0 ? this.VariableContainer.SaveData(this.Name) : this.VariableContainer.SaveAllData();
    };
    BaseManager.prototype.SaveVariable = function (name) {
        this.Name && this.Name.length > 0 && this.VariableContainer.SaveVariable(name);
    };
    return BaseManager;
}());



/***/ }),

/***/ "./framework/Define.ts":
/*!*****************************!*\
  !*** ./framework/Define.ts ***!
  \*****************************/
/*! exports provided: EM_PLATFORM_TYPE, GAME_STATE, SYS_VAR, PANEL_TYPE, PERIOD, EM_SURFACE_SCALE_TYPE, EM_POWER_RECOVERY_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_PLATFORM_TYPE", function() { return EM_PLATFORM_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_STATE", function() { return GAME_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYS_VAR", function() { return SYS_VAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PANEL_TYPE", function() { return PANEL_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERIOD", function() { return PERIOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_SURFACE_SCALE_TYPE", function() { return EM_SURFACE_SCALE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_POWER_RECOVERY_TYPE", function() { return EM_POWER_RECOVERY_TYPE; });
var EM_PLATFORM_TYPE;
(function (EM_PLATFORM_TYPE) {
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Common"] = -1] = "Common";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Wechat"] = 0] = "Wechat";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["QQ"] = 1] = "QQ";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Oppo"] = 2] = "Oppo";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Vivo"] = 3] = "Vivo";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Toutiao"] = 4] = "Toutiao";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Baidu"] = 5] = "Baidu";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["P_4399"] = 6] = "P_4399";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Qutoutiao"] = 7] = "Qutoutiao";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["P_360"] = 8] = "P_360";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Momo"] = 9] = "Momo";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Web"] = 10] = "Web";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Xiaomi"] = 11] = "Xiaomi";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Meizu"] = 12] = "Meizu";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["UC"] = 13] = "UC";
    EM_PLATFORM_TYPE[EM_PLATFORM_TYPE["Alipay"] = 14] = "Alipay";
})(EM_PLATFORM_TYPE || (EM_PLATFORM_TYPE = {}));
/**
 * 游戏状态枚举
 */
var GAME_STATE;
(function (GAME_STATE) {
    GAME_STATE["INVALID"] = "INVALID";
    GAME_STATE["HOME"] = "HOME";
    GAME_STATE["LOADING"] = "LOADING";
    GAME_STATE["GAME"] = "GAME";
    GAME_STATE["PAUSE"] = "PAUSE";
    GAME_STATE["RESULT"] = "RESULT";
})(GAME_STATE || (GAME_STATE = {}));
var SYS_VAR;
(function (SYS_VAR) {
    SYS_VAR["ResourceManager"] = "ResourceManager";
})(SYS_VAR || (SYS_VAR = {}));
var PANEL_TYPE;
(function (PANEL_TYPE) {
    PANEL_TYPE["APP"] = "APP";
    PANEL_TYPE["POP"] = "POP";
    PANEL_TYPE["SYS"] = "SYS";
})(PANEL_TYPE || (PANEL_TYPE = {}));
var PERIOD;
(function (PERIOD) {
    PERIOD["Invalid"] = "Invalid";
    /**
     * 加载完毕时
     */
    PERIOD["OnLoading"] = "OnLoading";
    /**
     * 主界面时
     */
    PERIOD["OnInit"] = "OnInit";
    /**
     * 游戏预加载
     */
    PERIOD["OnPreload"] = "OnPreload";
    /**
     * 游戏开始
     */
    PERIOD["OnStart"] = "OnStart";
    /**
     * 游戏进行时
     */
    PERIOD["OnRun"] = "OnRun";
    /**
     * 游戏恢复时
     */
    PERIOD["OnResume"] = "OnResume";
    /**
     * 游戏暂停时
     */
    PERIOD["OnPause"] = "OnPause";
    /**
     * 游戏结算时
     */
    PERIOD["OnResult"] = "OnResult";
    /**
     * 角色重生时
     */
    PERIOD["OnRevive"] = "OnRevive";
})(PERIOD || (PERIOD = {}));
/**
 * 屏幕适配-缩放类型(魅族)
 *
 * 需要开发者在加载场景前调用该接口，最好是在index.html入口中所有脚本前面插入script标签直接调用。
 */
var EM_SURFACE_SCALE_TYPE;
(function (EM_SURFACE_SCALE_TYPE) {
    /**
     * 等比缩放，显示所有内容，可能会有黑边
     */
    EM_SURFACE_SCALE_TYPE[EM_SURFACE_SCALE_TYPE["SCALE_SHOW_ALL"] = 0] = "SCALE_SHOW_ALL";
    /**
     * 等比缩放，全屏显示，可能显示不全
     */
    EM_SURFACE_SCALE_TYPE[EM_SURFACE_SCALE_TYPE["SCALE_SHOW_FULL"] = 1] = "SCALE_SHOW_FULL";
    /**
     * 非等比缩放，全屏显示，显示所有内容，可能会拉伸
     */
    EM_SURFACE_SCALE_TYPE[EM_SURFACE_SCALE_TYPE["SCALE_FORCE_FULL"] = 2] = "SCALE_FORCE_FULL";
})(EM_SURFACE_SCALE_TYPE || (EM_SURFACE_SCALE_TYPE = {}));
var EM_POWER_RECOVERY_TYPE;
(function (EM_POWER_RECOVERY_TYPE) {
    /**
     * 无
     */
    EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["None"] = 0] = "None";
    /**
    * 看视频恢复体力
    */
    EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["WatchVideo"] = 1] = "WatchVideo";
    /**
     * 定时恢复体力
     */
    EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["AutoRecovery"] = 2] = "AutoRecovery";
    /**
     * 倒计时
     */
    EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["CountDown"] = 3] = "CountDown";
})(EM_POWER_RECOVERY_TYPE || (EM_POWER_RECOVERY_TYPE = {}));


/***/ }),

/***/ "./framework/Log/FrameworkLog.ts":
/*!***************************************!*\
  !*** ./framework/Log/FrameworkLog.ts ***!
  \***************************************/
/*! exports provided: FrameworkLog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrameworkLog", function() { return FrameworkLog; });
/* harmony import */ var _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/LogUtility */ "./framework/Utility/LogUtility.ts");

var FrameworkLog = /** @class */ (function () {
    function FrameworkLog() {
    }
    FrameworkLog.Log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Log("Framework", message, null, args);
    };
    FrameworkLog.Debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Debug("Framework", message, null, args);
    };
    FrameworkLog.Info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Info("Framework", message, null, args);
    };
    FrameworkLog.Warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Warn("Framework", message, null, args);
    };
    FrameworkLog.Error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Error("Framework", message, null, args);
    };
    return FrameworkLog;
}());



/***/ }),

/***/ "./framework/Log/UrlLog.ts":
/*!*********************************!*\
  !*** ./framework/Log/UrlLog.ts ***!
  \*********************************/
/*! exports provided: UrlLog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrlLog", function() { return UrlLog; });
/* harmony import */ var _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/LogUtility */ "./framework/Utility/LogUtility.ts");

var UrlLog = /** @class */ (function () {
    function UrlLog() {
    }
    UrlLog.Log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Log("Url", message, null, args);
    };
    UrlLog.Debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Debug("Url", message, null, args);
    };
    UrlLog.Info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Info("Url", message, null, args);
    };
    UrlLog.Warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Warn("Url", message, null, args);
    };
    UrlLog.Error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Error("Url", message, null, args);
    };
    return UrlLog;
}());



/***/ }),

/***/ "./framework/Manager/AgentManager.ts":
/*!*******************************************!*\
  !*** ./framework/Manager/AgentManager.ts ***!
  \*******************************************/
/*! exports provided: AgentManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgentManager", function() { return AgentManager; });
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./framework/Manager/Manager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var AgentManager = /** @class */ (function (_super) {
    __extends(AgentManager, _super);
    function AgentManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentManager.prototype.Initialize = function () {
    };
    AgentManager.prototype.Post = function (url, data, callback, retryCount, isAsync, isDebug) {
        if (retryCount === void 0) { retryCount = 1; }
        if (!data) {
            data = {};
        }
        isAsync = isAsync ? isAsync == true : false;
        isDebug = isDebug ? isDebug == true : false;
        var http = new XMLHttpRequest();
        http.timeout = 5000;
        if (isDebug) {
            console.log("http post url:" + url);
        }
        http.open("post", url, isAsync);
        http.setRequestHeader("Content-Type", "application/json");
        var self = this;
        http.onerror = function (e) {
            console.error(e);
            if (retryCount > 1) {
                retryCount--;
                self.Post(url, data, callback, retryCount, isAsync, isDebug);
            }
            else if (callback && typeof callback === "function") {
                callback(e);
            }
            else {
                console.log("callback is no correct");
            }
        };
        http.onabort = function (e) {
            console.error(e);
        };
        http.onprogress = function (e) {
        };
        http.onreadystatechange = function () {
            if (this.status === 200) {
            }
            else {
                console.warn("http request status:" + this.status);
            }
        };
        http.onload = function () {
            var response = JSON.parse(this.responseText);
            if (response && callback && typeof callback === "function") {
                callback(response);
            }
            else {
                console.error("json parse failed!");
            }
        };
        var json = JSON.stringify(data);
        if (json && json.length > 0 && isDebug) {
            console.log("http post " + " url:" + url + " json:" + json);
        }
        try {
            http.send(json);
        }
        catch (e) {
            console.exception(e);
        }
    };
    AgentManager.prototype.Get = function (url, data, callback, retryCount, isAsync, isDebug) {
        if (retryCount === void 0) { retryCount = 1; }
        if (!data) {
            data = {};
        }
        isAsync = isAsync ? isAsync == true : false;
        isDebug = isDebug ? isDebug == true : false;
        var send_url = '?';
        var first = true;
        for (var key in data) {
            first ? (first = false, send_url += "?") : (send_url += "&");
            send_url += (key + '=' + data[key]);
        }
        var http = new XMLHttpRequest();
        http.timeout = 5000;
        if (isDebug) {
            console.log("http get url:" + url);
        }
        http.open("get", url, isAsync);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var self = this;
        http.onerror = function (e) {
            console.error(e);
            if (retryCount > 1) {
                retryCount--;
                self.Get(url, data, callback, retryCount, isAsync, isDebug);
            }
            else if (callback && typeof callback === "function") {
                callback(e);
            }
            else {
                console.log("callback is no correct");
            }
        };
        http.onabort = function (e) {
            console.error(e);
        };
        http.onprogress = function (e) {
        };
        http.onreadystatechange = function () {
            if (this.status === 200) {
            }
            else {
                console.warn("http request status:" + this.status);
            }
        };
        http.onload = function () {
            var response = JSON.parse(this.responseText);
            if (response && callback && typeof callback === "function") {
                callback(response);
            }
            else {
                console.error("json parse failed!");
            }
        };
        try {
            http.send();
        }
        catch (e) {
            console.exception(e);
        }
    };
    return AgentManager;
}(_Manager__WEBPACK_IMPORTED_MODULE_0__["Manager"]));



/***/ }),

/***/ "./framework/Manager/ApiManager.ts":
/*!*****************************************!*\
  !*** ./framework/Manager/ApiManager.ts ***!
  \*****************************************/
/*! exports provided: ApiManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiManager", function() { return ApiManager; });
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./framework/Manager/Manager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ApiManager = /** @class */ (function (_super) {
    __extends(ApiManager, _super);
    function ApiManager() {
        return _super.call(this) || this;
    }
    ApiManager.prototype.Initialize = function () {
    };
    return ApiManager;
}(_Manager__WEBPACK_IMPORTED_MODULE_0__["Manager"]));



/***/ }),

/***/ "./framework/Manager/CommerceManager.ts":
/*!**********************************************!*\
  !*** ./framework/Manager/CommerceManager.ts ***!
  \**********************************************/
/*! exports provided: CommerceManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommerceManager", function() { return CommerceManager; });
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./framework/Manager/Manager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CommerceManager = /** @class */ (function (_super) {
    __extends(CommerceManager, _super);
    function CommerceManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommerceManager.prototype.Initialize = function () {
    };
    return CommerceManager;
}(_Manager__WEBPACK_IMPORTED_MODULE_0__["Manager"]));



/***/ }),

/***/ "./framework/Manager/DataManager.ts":
/*!******************************************!*\
  !*** ./framework/Manager/DataManager.ts ***!
  \******************************************/
/*! exports provided: DataManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataManager", function() { return DataManager; });
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./framework/Manager/Manager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var DataManager = /** @class */ (function (_super) {
    __extends(DataManager, _super);
    function DataManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataManager.prototype.Initialize = function () {
    };
    return DataManager;
}(_Manager__WEBPACK_IMPORTED_MODULE_0__["Manager"]));



/***/ }),

/***/ "./framework/Manager/Manager.ts":
/*!**************************************!*\
  !*** ./framework/Manager/Manager.ts ***!
  \**************************************/
/*! exports provided: Manager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Manager", function() { return Manager; });
/* harmony import */ var _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/LogUtility */ "./framework/Utility/LogUtility.ts");
/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core */ "./framework/Core.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Name = "Gauntlet";
        return _this;
    }
    Manager.prototype.Log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Log(this.Name, message, Manager.LogStyle, args);
    };
    Manager.prototype.Debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Debug(this.Name, message, Manager.DebugStyle, args);
    };
    Manager.prototype.Info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Info(this.Name, message, Manager.InfoStyle, args);
    };
    Manager.prototype.Warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Warn(this.Name, message, Manager.WarnStyle, args);
    };
    Manager.prototype.Error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Error(this.Name, message, Manager.ErrorStyle, args);
    };
    Manager.prototype.Table = function (obj, name) {
        _Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Table(this.Name, Manager.TableStyle, obj, name);
    };
    Manager.DEFAULT_FONT_SIZE = 12;
    Manager.LogStyle = "color: green; font-size:" + Manager.DEFAULT_FONT_SIZE + "px";
    Manager.DebugStyle = "color: DodgerBlue; font-size:" + Manager.DEFAULT_FONT_SIZE + "px";
    Manager.InfoStyle = "color: Turquoise; font-size:" + Manager.DEFAULT_FONT_SIZE + "px";
    Manager.WarnStyle = "color: Orange; font-size:bold," + Manager.DEFAULT_FONT_SIZE + "px";
    Manager.ErrorStyle = "color: Tomato; font-size:" + Manager.DEFAULT_FONT_SIZE + "px";
    Manager.TableStyle = "color: Black; font-size:" + Manager.DEFAULT_FONT_SIZE + "px";
    return Manager;
}(_Core__WEBPACK_IMPORTED_MODULE_1__["BaseManager"]));



/***/ }),

/***/ "./framework/Utility/LogUtility.ts":
/*!*****************************************!*\
  !*** ./framework/Utility/LogUtility.ts ***!
  \*****************************************/
/*! exports provided: LogUtility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogUtility", function() { return LogUtility; });
var LogUtility = /** @class */ (function () {
    function LogUtility() {
        this._Tag = "";
        this.PARAM_COUNT = 3;
        this._LogStyle = "color:green;font-size:" + LogUtility.DEFAULT_FONT_SIZE + "px;font-weight:bold;";
        this._DebugStyle = "color:dodgerblue;font-size:" + LogUtility.DEFAULT_FONT_SIZE + "px;font-weight:bold;";
        this._InfoStyle = "color:turquoise;font-size:" + LogUtility.DEFAULT_FONT_SIZE + "px;font-weight:bold;";
        this._WarnStyle = "color:orange;font-size:bold," + LogUtility.DEFAULT_FONT_SIZE + "px;font-weight:bold;";
        this._ErrorStyle = "color:tomato;font-size:" + LogUtility.DEFAULT_FONT_SIZE + "px;font-weight:bold;";
        this._TableStyle = "color:magenta;font-size:" + LogUtility.DEFAULT_FONT_SIZE + "px;font-weight:bold;";
    }
    Object.defineProperty(LogUtility, "Instance", {
        get: function () {
            if (this._Instance == null) {
                this._Instance = new LogUtility();
            }
            return this._Instance;
        },
        enumerable: true,
        configurable: true
    });
    ;
    LogUtility.prototype.Log = function (tag, message, style, args) {
        // console.log("YDHW -----Log---IsSimulator:",this.Platform.IsSimulator);
        if (!LogUtility.IS_ENABLE_DEBUG) {
            return;
        }
        style = style && (typeof (style) != "undefined") ? style : this._LogStyle;
        var options = [];
        for (var i = this.PARAM_COUNT; i < arguments.length; i++) {
            options[i - this.PARAM_COUNT] = arguments[i];
        }
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsVivo || this.Platform.IsMeizu || (!this.Platform.IsSimulator))) {
            var msg = "";
            if (args && (typeof args != "undefined") && args.length > 0)
                msg = JSON.stringify(options[0]);
            console.log("[Log][" + tag + "] " + message + " " + msg);
            return;
        }
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsWechat)) {
            args && (typeof args != "undefined") && args.length > 0
                ? console.log.apply(console, ["[Log][" + tag + "] " + message].concat(options))
                : console.log.apply(console, ["[Log][" + tag + "] " + message]);
            return;
        }
        args && (typeof args != "undefined") && args.length > 0
            ? console.groupCollapsed.apply(console, ["%c[Log][" + tag + "] " + message, style].concat(options))
            : console.groupCollapsed.apply(console, ["%c[Log][" + tag + "] " + message, style]);
        console.trace();
        console.groupEnd();
    };
    LogUtility.prototype.Debug = function (tag, message, style, args) {
        if (!LogUtility.IS_ENABLE_DEBUG) {
            return;
        }
        style = style && (typeof style != "undefined") ? style : this._DebugStyle;
        var options = [];
        for (var i = this.PARAM_COUNT; i < arguments.length; i++) {
            options[i - this.PARAM_COUNT] = arguments[i];
        }
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsVivo || this.Platform.IsMeizu || (!this.Platform.IsSimulator))) {
            var msg = "";
            if (args && (typeof args != "undefined") && args.length > 0)
                msg = JSON.stringify(options[0]);
            console.debug("[Debug][" + tag + "] " + message + " " + msg);
            return;
        }
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsWechat)) {
            args && (typeof args != "undefined") && args.length > 0
                ? console.debug.apply(console, ["[Debug][" + tag + "] " + message].concat(options))
                : console.debug.apply(console, ["[Debug][" + tag + "] " + message]);
            return;
        }
        args && (typeof args != "undefined") && args.length > 0
            ? console.groupCollapsed.apply(console, ["%c[Debug][" + tag + "] " + message, style].concat(options))
            : console.groupCollapsed.apply(console, ["%c[Debug][" + tag + "] " + message, style]);
        console.trace();
        console.groupEnd();
    };
    LogUtility.prototype.Info = function (tag, message, style, args) {
        if (!LogUtility.IS_ENABLE_DEBUG) {
            return;
        }
        style = style && (typeof style != "undefined") ? style : this._InfoStyle;
        var options = [];
        for (var i = this.PARAM_COUNT; i < arguments.length; i++) {
            options[i - this.PARAM_COUNT] = arguments[i];
        }
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsVivo || this.Platform.IsMeizu || (!this.Platform.IsSimulator))) {
            var msg = "";
            if (args && (typeof args != "undefined") && args.length > 0)
                msg = JSON.stringify(options[0]);
            console.log("[Info][" + tag + "] " + message + " " + msg);
            return;
        }
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsWechat)) {
            args && (typeof args != "undefined") && args.length > 0
                ? console.info.apply(console, ["[Info][" + tag + "] " + message].concat(options))
                : console.info.apply(console, ["[Info][" + tag + "] " + message]);
            return;
        }
        args && (typeof args != "undefined") && args.length > 0
            ? console.groupCollapsed.apply(console, ["%c[Info][" + tag + "] " + message, style].concat(options))
            : console.groupCollapsed.apply(console, ["%c[Info][" + tag + "] " + message, style]);
        console.trace();
        console.groupEnd();
    };
    LogUtility.prototype.Warn = function (tag, message, style, args) {
        if (!LogUtility.IS_ENABLE_DEBUG) {
            return;
        }
        style = style && (typeof style != "undefined") ? style : this._WarnStyle;
        var options = [];
        for (var i = this.PARAM_COUNT; i < arguments.length; i++) {
            options[i - this.PARAM_COUNT] = arguments[i];
        }
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsVivo || this.Platform.IsMeizu || (!this.Platform.IsSimulator))) {
            var msg = "";
            if (args && (typeof args != "undefined") && args.length > 0)
                msg = JSON.stringify(options[0]);
            console.warn("[Warn][" + tag + "] " + message + " " + msg);
            return;
        }
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsWechat)) {
            args && (typeof args != "undefined") && args.length > 0
                ? console.warn.apply(console, ["[Warn][" + tag + "] " + message].concat(options))
                : console.warn.apply(console, ["[Warn][" + tag + "] " + message]);
            return;
        }
        args && (typeof args != "undefined") && args.length > 0
            ? console.groupCollapsed.apply(console, ["%c[Warn][" + tag + "] " + message, style].concat(options))
            : console.groupCollapsed.apply(console, ["%c[Warn][" + tag + "] " + message, style]);
        console.trace();
        console.groupEnd();
    };
    LogUtility.prototype.Error = function (tag, message, style, args) {
        if (!LogUtility.IS_ENABLE_DEBUG) {
            return;
        }
        style = style && (typeof style != "undefined") ? style : this._ErrorStyle;
        var options = [];
        for (var i = this.PARAM_COUNT; i < arguments.length; i++) {
            options[i - this.PARAM_COUNT] = arguments[i];
        }
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsVivo || this.Platform.IsMeizu || (!this.Platform.IsSimulator))) {
            var msg = "";
            if (args && (typeof args != "undefined") && args.length > 0)
                msg = JSON.stringify(options[0]);
            console.error("[Error][" + tag + "] " + message + " " + msg);
            return;
        }
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsWechat)) {
            args && (typeof args != "undefined") && args.length > 0
                ? console.error.apply(console, ["[Error][" + tag + "] " + message].concat(options))
                : console.error.apply(console, ["[Error][" + tag + "] " + message]);
            return;
        }
        args && (typeof args != "undefined") && args.length > 0
            ? console.groupCollapsed.apply(console, ["%c[Error][" + tag + "] " + message, style].concat(options))
            : console.groupCollapsed.apply(console, ["%c[Error][" + tag + "] " + message, style]);
        console.trace();
        console.groupEnd();
    };
    LogUtility.prototype.Table = function (tab, obj, name, style) {
        if (!LogUtility.IS_ENABLE_DEBUG) {
            return;
        }
        style = style && (typeof style != "undefined") ? style : this._TableStyle;
        if (this.Platform && (this.Platform.IsOppo || this.Platform.IsWechat)) {
            return;
        }
        console.groupCollapsed.apply(console, ["%c[Table][" + tab + "] ", style]);
        // name && console.log("%ctable: " + name, style);
        console.table(obj);
        console.groupEnd();
    };
    LogUtility._Instance = null;
    LogUtility.IS_ENABLE_DEBUG = true;
    LogUtility.DEFAULT_FONT_SIZE = 12;
    LogUtility.BACK_GROUND_COLOR = "background:#FFFF99";
    return LogUtility;
}());

new LogUtility();


/***/ }),

/***/ "./framework/Utility/RandomUtility.ts":
/*!********************************************!*\
  !*** ./framework/Utility/RandomUtility.ts ***!
  \********************************************/
/*! exports provided: RandomUtility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RandomUtility", function() { return RandomUtility; });
var RandomUtility = /** @class */ (function () {
    function RandomUtility() {
    }
    RandomUtility.Probability = function (pro) {
        if (pro == 100)
            return true;
        if (pro == 0)
            return false;
        var probability = Math.floor(Math.random() * 100);
        return probability <= pro;
    };
    return RandomUtility;
}());



/***/ }),

/***/ "./framework/Utility/TimerUtility.ts":
/*!*******************************************!*\
  !*** ./framework/Utility/TimerUtility.ts ***!
  \*******************************************/
/*! exports provided: Timer, DelayTimer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DelayTimer", function() { return DelayTimer; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var Timer = /** @class */ (function () {
    function Timer() {
        this.IntervalID = null;
    }
    Timer.prototype.Initialize = function (name, caller, method, interval, args) {
        this.Name = name;
        this._Caller = caller;
        this._Method = method;
        this.Args = args;
        this._StartTimestamp = Date.now();
        this.Interval = interval;
    };
    Timer.prototype.Execute = function () {
        // let bIsResult = false;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // if (this.Args && this.Args.length > 0) {
        //     bIsResult = this._Method.call(this._Caller, this.Args);
        // } else {
        //     bIsResult = this._Method.call(this._Caller);
        // }
        var bIsResult = this._Method.call(this._Caller, args);
        if (bIsResult) {
            TimerUtility.RemoveTimer(this.Name);
        }
    };
    Timer.prototype.Invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._Method.call(this._Caller, args);
    };
    return Timer;
}());

var DelayTimer = /** @class */ (function (_super) {
    __extends(DelayTimer, _super);
    function DelayTimer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DelayTimer.prototype.Initialize = function (name, caller, method, interval, args) {
        this.Name = name;
        this._Caller = caller;
        this._InnerMethod = method;
        this.Args = args;
        this._StartTimestamp = Date.now();
        this.Interval = interval;
    };
    DelayTimer.prototype.Execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._InnerMethod.apply(this._Caller, args);
    };
    DelayTimer.prototype.Invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._InnerMethod.apply(this._Caller, args);
    };
    return DelayTimer;
}(Timer));

var TimerUtility = /** @class */ (function () {
    function TimerUtility() {
    }
    // private static _DictInterval: { [key: string]: any } = {};
    /**
     * 数字转字符串时 至少保持两位数，如：1=>01,2=>02,3=>03
     * @param num
     */
    TimerUtility.DecimalFormat = function (num) {
        return (num > 9 ? '' : '0') + num;
    };
    TimerUtility.TimeFormat_1 = function (seconds, sufix) {
        return this.SecondsToDay(seconds) +
            sufix + this.SecondsToHour(seconds) +
            sufix + this.SecondsToMinute(seconds % 60);
    };
    TimerUtility.MilliSecondsToSeconds = function (milliseconds) {
        return Math.floor(milliseconds / 1000);
    };
    TimerUtility.SecondsToDay = function (seconds) {
        return seconds / 3600 | 0;
    };
    TimerUtility.SecondsToHour = function (seconds) {
        return (seconds / 60 | 0) % 60;
    };
    TimerUtility.SecondsToMinute = function (seconds) {
        return seconds / 60;
    };
    TimerUtility.MilliSecondsToMinute = function (milliSeconds) {
        return this.SecondsToMinute(this.MilliSecondsToSeconds(milliSeconds));
    };
    TimerUtility.Delay = function (interval, caller, method) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var timer = new DelayTimer();
        timer.Initialize("delay_event", caller, method, interval, args);
        timer.IntervalID = setTimeout(function () {
            timer.Execute(timer.Args);
        }, timer.Interval);
        // Laya.timer.once(interval, timer, timer.Execute, args);
        var key = timer.IntervalID + "";
        this._DelayTimer[key] = timer;
        return key;
    };
    TimerUtility.RemoveDelayTimer = function (id) {
        var timer = this._DelayTimer[id];
        if (timer && timer instanceof DelayTimer) {
            clearTimeout(timer.IntervalID);
        }
    };
    TimerUtility.DelayBtnEnabled = function (caller, method) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.Delay.apply(this, __spread([2500, caller, method], args));
    };
    TimerUtility.DeactivateTimer = function (name) {
        var timer = this._DictTimer[name];
        if (timer && timer instanceof Timer) {
            clearInterval(timer.IntervalID);
            // Laya.timer.clear(timer, timer.Execute);
        }
        else {
            console.warn("\u4F11\u7720 \u5B9A\u65F6\u5668\u4E0D\u5B58\u5728\uFF1A" + name);
        }
    };
    TimerUtility.ActivateTimer = function (name) {
        var timer = this._DictTimer[name];
        if (timer && timer instanceof Timer) {
            clearInterval(timer.IntervalID);
            timer.IntervalID = setInterval(function () {
                timer.Execute(timer.Args);
            }, timer.Interval);
            // Laya.timer.loop(timer.Interval, timer, timer.Execute, timer.Args);
        }
        else {
            console.warn("\u6FC0\u6D3B \u5B9A\u65F6\u5668\u4E0D\u5B58\u5728\uFF1A" + name);
        }
    };
    TimerUtility.AddTimer = function (name, interval, caller, init, method, args) {
        var timer = this._DictTimer[name];
        if (timer && timer instanceof Timer) {
            console.warn("\u6DFB\u52A0 \u5B9A\u65F6\u5668\u5DF2\u5B58\u5728\uFF1A" + name);
        }
        else {
            caller && init && init.call(caller);
            timer = new Timer();
            timer.Initialize(name, caller, method, interval, args);
            timer.IntervalID = setInterval(function () {
                timer.Execute(timer.Args);
            }, interval, args);
            this._DictTimer[name] = timer;
            // Laya.timer.loop(interval, timer, timer.Execute, args);
        }
    };
    TimerUtility.GetTimer = function (name) {
        var timer = this._DictTimer[name];
        if (timer && timer instanceof Timer) {
            return timer;
        }
        else {
            console.warn("\u83B7\u53D6 \u5B9A\u65F6\u5668\u4E0D\u5B58\u5728:" + name);
            return null;
        }
    };
    TimerUtility.RemoveTimer = function (name) {
        var timer = this._DictTimer[name];
        if (timer && timer instanceof Timer) {
            timer = this._DictTimer[name];
            clearInterval(timer.IntervalID);
            // Laya.timer.clear(timer, timer.Execute);
            this._DictTimer[name] = null;
        }
        else {
            console.warn("\u79FB\u9664 \u5B9A\u65F6\u5668\u4E0D\u5B58\u5728:" + name);
        }
    };
    TimerUtility._DictTimer = {};
    TimerUtility._DelayTimer = {};
    return TimerUtility;
}());
/* harmony default export */ __webpack_exports__["default"] = (TimerUtility);


/***/ }),

/***/ "./framework/Utility/Url.ts":
/*!**********************************!*\
  !*** ./framework/Utility/Url.ts ***!
  \**********************************/
/*! exports provided: URL_SLICE_TYPE, Url */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_SLICE_TYPE", function() { return URL_SLICE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Url", function() { return Url; });
/* harmony import */ var _Assist_Http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Assist/Http */ "./framework/Assist/Http.ts");
/* harmony import */ var _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Log/UrlLog */ "./framework/Log/UrlLog.ts");
/* harmony import */ var _sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../sdk/SDK/Declare */ "./sdk/SDK/Declare.ts");
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};



var URL_SLICE_TYPE;
(function (URL_SLICE_TYPE) {
    URL_SLICE_TYPE["None"] = "Null";
    URL_SLICE_TYPE["Method"] = "Method";
    URL_SLICE_TYPE["Domain"] = "Domain";
    URL_SLICE_TYPE["Manager"] = "Manager";
    URL_SLICE_TYPE["Version"] = "Version";
    URL_SLICE_TYPE["Category"] = "Category";
    URL_SLICE_TYPE["Router"] = "Router";
    URL_SLICE_TYPE["Append"] = "Append";
    URL_SLICE_TYPE["Description"] = "Description";
    URL_SLICE_TYPE["End"] = "End";
})(URL_SLICE_TYPE || (URL_SLICE_TYPE = {}));
var Url = /** @class */ (function () {
    function Url() {
        this._ListSliceType = [];
        this._Header = {};
        this._AccountPass = "";
        this._MethodType = "";
        this._Http = "";
        this._DomainIndex = 0;
        this._Domains = [];
        this._Version = "";
        this._Category = "";
        this._Manager = "";
        this._Router = "";
        this._AppendList = [];
        this._Params = {};
        this._CurrentAppendIndex = 0;
        this._Description = "";
        this._Url = "";
        this._CurrentSliceType = URL_SLICE_TYPE.None;
        this._Async = true;
        this._IsEnd = false;
        this._Data = "";
        this._IsDebug = true;
        this._ReceiveCaller = null;
        this._ReceiveMethod = null;
        this._ErrorCaller = null;
        this._ErrorMethod = null;
        this._ExceptionCaller = null;
        Url.AllUrls.push(this);
    }
    Url.prototype.Print = function () {
        var url = this._Category + "-" + this._Router;
        console.log("" + url);
    };
    Url.prototype.SetIsDebugMode = function (isDebug) {
        this._IsDebug = isDebug;
    };
    Url.prototype.AccountPass = function (value) {
        this._AccountPass = value;
        return this;
    };
    Url.SetAllUrlAccountPass = function (key) {
        for (var i = 0; i < Url.AllUrls.length; i++) {
            var url = Url.AllUrls[i];
            url._AccountPass = key;
        }
    };
    Url.prototype.RequestHeader = function (key, value) {
        this._Header[key] = value;
        return this;
    };
    Url.prototype.Header = function () {
        return this._Header;
    };
    Url.prototype.AsPost = function () {
        this._MethodType = "post";
        return this;
    };
    Url.prototype.AsGet = function () {
        this._MethodType = "get";
        return this;
    };
    Url.prototype.Method = function () {
        return this._MethodType;
    };
    Url.prototype.Description = function (value) {
        this._Description = value;
        this._CurrentSliceType = URL_SLICE_TYPE.Description;
        if (this._ListSliceType.indexOf(this._CurrentSliceType) < 0) {
            this._ListSliceType.push(this._CurrentSliceType);
        }
        return this;
    };
    Url.prototype.Switch = function (index) {
        this._DomainIndex = index;
        return this;
    };
    Url.prototype.Domain = function (value) {
        this._CurrentSliceType = URL_SLICE_TYPE.Domain;
        if (this._ListSliceType.indexOf(this._CurrentSliceType) < 0) {
            this._ListSliceType.push(this._CurrentSliceType);
        }
        this._Domains = value;
        return this;
    };
    Url.prototype.Manager = function (value) {
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Domain) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("need set domain");
            return this;
        }
        this._CurrentSliceType = URL_SLICE_TYPE.Manager;
        if (this._ListSliceType.indexOf(this._CurrentSliceType) < 0) {
            this._ListSliceType.push(this._CurrentSliceType);
        }
        this._Manager = value;
        return this;
    };
    Url.prototype.Version = function (value) {
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Manager) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("need set manager");
            return this;
        }
        this._CurrentSliceType = URL_SLICE_TYPE.Version;
        if (this._ListSliceType.indexOf(this._CurrentSliceType) < 0) {
            this._ListSliceType.push(this._CurrentSliceType);
        }
        this._Version = value;
        return this;
    };
    Url.prototype.Category = function (value) {
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Version) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("need set version");
            return this;
        }
        this._CurrentSliceType = URL_SLICE_TYPE.Category;
        if (this._ListSliceType.indexOf(this._CurrentSliceType) < 0) {
            this._ListSliceType.push(this._CurrentSliceType);
        }
        this._Category = value;
        return this;
    };
    Url.prototype.Router = function (value) {
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Category) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("need set category");
            return this;
        }
        this._CurrentSliceType = URL_SLICE_TYPE.Router;
        if (this._ListSliceType.indexOf(this._CurrentSliceType) < 0) {
            this._ListSliceType.push(this._CurrentSliceType);
        }
        this._Router = value;
        if (this._Router.length >= 0) {
            this._AppendList = [];
        }
        return this;
    };
    Url.prototype.Append = function (value) {
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Router) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("need set router");
            return this;
        }
        this._CurrentSliceType = URL_SLICE_TYPE.Append;
        if (this._ListSliceType.indexOf(this._CurrentSliceType) < 0) {
            this._ListSliceType.push(this._CurrentSliceType);
        }
        this._CurrentAppendIndex = this._AppendList.push(value);
        return this;
    };
    Url.prototype.End = function () {
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Description) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("not set description");
            return this;
        }
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Domain) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("not set domain");
            return this;
        }
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Manager) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("not set manager");
            return this;
        }
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Version) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("not set version");
            return this;
        }
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Category) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("not set category");
            return this;
        }
        if (this._ListSliceType.indexOf(URL_SLICE_TYPE.Router) < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("not set router");
            return this;
        }
        this._CurrentSliceType = URL_SLICE_TYPE.End;
        this._IsEnd = true;
        if (this._DomainIndex > this._Domains.length - 1) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("domain error");
            return null;
        }
        if (this._DomainIndex < 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("domain switch error");
            return null;
        }
        if (!this._Domains[this._DomainIndex]) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("domain null");
            return null;
        }
        this._Url = this._Http + this._Domains[this._DomainIndex] + "/" + this._Manager + "/" + this._Version + "/" + this._Category + "/" + this._Router;
        for (var key in this._AppendList) {
            this._Url = this._Url + "/" + this._AppendList[key];
        }
        if (Object.keys(this._Params).length > 0) { //todo:js编译版本需要注意
            var first = true;
            for (var key in this._Params) {
                var value = this._Params[key];
                first ? (first = false, this._Url += "?") : (this._Url += "&");
                this._Url += (key + '=' + value);
            }
        }
        return this;
    };
    Url.prototype.Value = function () {
        if (!(this._IsEnd === true)) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("not set end yet");
            return null;
        }
        if (this._MethodType.length <= 0) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("not set method type");
            return null;
        }
        switch (this._CurrentSliceType) {
            case URL_SLICE_TYPE.None:
                return "Error Url";
            case URL_SLICE_TYPE.Method:
                return this._MethodType;
            case URL_SLICE_TYPE.Domain:
                return this._Domains[this._DomainIndex];
            case URL_SLICE_TYPE.Version:
                return this._Version;
            case URL_SLICE_TYPE.Category:
                return this._Category;
            case URL_SLICE_TYPE.Router:
                return this._Router;
            case URL_SLICE_TYPE.Append:
                if (this._AppendList.length > 0) {
                    return this._AppendList[this._CurrentAppendIndex];
                }
                else {
                    return "Error Append Param";
                }
            case URL_SLICE_TYPE.End:
                return this._Url;
        }
        return null;
    };
    Url.prototype.SetCustomUrl = function (url) {
        this._Url = url;
        return this;
    };
    Url.prototype.CustomUrl = function () {
        return this._Url;
    };
    Url.prototype.CheckValue = function () {
        return this._Url;
    };
    Url.prototype.Data = function () {
        return this._Data;
    };
    Url.prototype.Post = function (data) {
        if (this._MethodType != "post") {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("current method is not post");
            return null;
        }
        this._Data = data || "";
        return this;
    };
    Url.prototype.IsAsync = function () {
        return this._Async;
    };
    Url.prototype.EncodeURI = function () {
        if (this._IsEnd === false) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Error("not end");
            return "";
        }
        return encodeURI(this._Url);
    };
    Url.prototype.Param = function (key, value) {
        // if (this._ReceiveCaller == null) {
        //     UrlLog.Error("not bind event");
        // }
        this._Params[key] = value;
        return this;
    };
    Url.Post = function (data) {
        var url = new Url();
        url._MethodType = "post";
        url._Data = data;
        return url;
    };
    Url.Get = function () {
        var url = new Url();
        url._MethodType = "get";
        return url;
    };
    Url.prototype.Send = function (clientInfo) {
        if (this._IsDebug) {
            console.log("url=" + this._Url);
        }
        if (this._AccountPass && this._AccountPass.length > 0) {
            this.RequestHeader("AccountPass", this._AccountPass);
        }
        if (clientInfo && typeof clientInfo == "object") {
            // let ClientInfo = {
            //     "brand": sys.brand || "",
            //     "model": sys.model || "",
            //     "platform": sys.platform || "",
            //     "version": s_d._SDKversion,
            //     "resolution": sys.resolution || _resolution
            // };
            // http.setRequestHeader("ClientInfo", clientInfo);
        }
        _Assist_Http__WEBPACK_IMPORTED_MODULE_0__["default"].Request(_sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform, this, 3, this._IsDebug);
    };
    Url.prototype.SendCustomUrl = function () {
        _Assist_Http__WEBPACK_IMPORTED_MODULE_0__["default"].RequestNormal(_sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform, this, 3, this._IsDebug);
    };
    Url.prototype.Clone = function () {
        var e_1, _a, e_2, _b, e_3, _c;
        var url = new Url();
        url._ListSliceType = [];
        try {
            for (var _d = __values(this._ListSliceType), _e = _d.next(); !_e.done; _e = _d.next()) {
                var item = _e.value;
                url._ListSliceType.push(item);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        url._Header = {};
        for (var key in this._Header) {
            url._Header[key] = this._Header[key];
        }
        url._AccountPass = this._AccountPass;
        url._MethodType = this._MethodType;
        url._Http = this._Http;
        url._DomainIndex = this._DomainIndex;
        url._Domains = [];
        try {
            for (var _f = __values(this._Domains), _g = _f.next(); !_g.done; _g = _f.next()) {
                var domain = _g.value;
                url._Domains.push(domain);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
        url._Version = this._Version;
        url._Category = this._Category;
        url._Manager = this._Manager;
        url._Router = this._Router;
        url._AppendList = [];
        try {
            for (var _h = __values(this._AppendList), _j = _h.next(); !_j.done; _j = _h.next()) {
                var item = _j.value;
                url._AppendList.push(item);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
            }
            finally { if (e_3) throw e_3.error; }
        }
        url._CurrentAppendIndex = this._CurrentAppendIndex;
        url._Url = this._Url;
        url._CurrentSliceType = this._CurrentSliceType;
        url._Async = this._Async;
        url._IsEnd = this._IsEnd;
        url._Data = JSON.parse(JSON.stringify(this._Data));
        url._ReceiveCaller = null;
        url._ReceiveMethod = null;
        url._ErrorCaller = null;
        url._ErrorMethod = null;
        url._ExceptionCaller = null;
        url._ExceptionMethod = null;
        return url;
    };
    Url.prototype.OnReceive = function (caller, method) {
        this._ReceiveCaller = caller;
        this._ReceiveMethod = method;
        return this;
    };
    Url.prototype.InvokeReceive = function (data) {
        var isBind = this._ReceiveCaller && this._ReceiveMethod;
        if (!isBind) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Warn("not bind receive callback");
            return;
        }
        this._ReceiveMethod.call(this._ReceiveCaller, data);
    };
    Url.prototype.OnError = function (caller, method) {
        this._ErrorCaller = caller;
        this._ErrorMethod = method;
        return this;
    };
    Url.prototype.InvokeError = function (data) {
        var isBind = this._ErrorCaller && this._ErrorMethod;
        if (!isBind) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Warn("not bind error callback");
            return;
        }
        this._ErrorMethod.call(this._ErrorCaller, data);
    };
    Url.prototype.OnException = function (caller, method) {
        this._ExceptionCaller = caller;
        this._ExceptionMethod = method;
        return this;
    };
    Url.prototype.InvokeException = function (data) {
        var isBind = this._ExceptionCaller && this._ExceptionMethod;
        if (!isBind) {
            _Log_UrlLog__WEBPACK_IMPORTED_MODULE_1__["UrlLog"].Warn("not bind exception callback");
            return;
        }
        this._ExceptionMethod.call(this._ExceptionCaller, data);
    };
    Url.AllUrls = [];
    return Url;
}());



/***/ }),

/***/ "./framework/Utility/VerifyUtility.ts":
/*!********************************************!*\
  !*** ./framework/Utility/VerifyUtility.ts ***!
  \********************************************/
/*! exports provided: VerifyUtility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyUtility", function() { return VerifyUtility; });
var VerifyUtility = /** @class */ (function () {
    function VerifyUtility() {
    }
    VerifyUtility.ToBoolean = function (value) {
        return value === 1 ? true : false;
    };
    return VerifyUtility;
}());



/***/ }),

/***/ "./libs/ydhw/ydhw.sdk.ts":
/*!*******************************!*\
  !*** ./libs/ydhw/ydhw.sdk.ts ***!
  \*******************************/
/*! exports provided: YDHW */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YDHW", function() { return YDHW; });
//@namespace=YDHW
var YDHW;
(function (YDHW) {
    var EM_STATISTIC_TYPE;
    (function (EM_STATISTIC_TYPE) {
        /**
         * 创建
         */
        EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["CREATE"] = 0] = "CREATE";
        /**
         * 加载成功
         */
        EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["LOAD_SUCCESS"] = 1] = "LOAD_SUCCESS";
        /**
         * 加载失败
         */
        EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["LOAD_FAIL"] = 2] = "LOAD_FAIL";
        /**
         * 点击(上报点击)
         */
        EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["CLICK"] = 3] = "CLICK";
        /**
         * 展示
         */
        EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["SHOW"] = 4] = "SHOW";
        /**
         * 关闭
         */
        EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["CLOSE"] = 5] = "CLOSE";
        /**
         * 上报曝光
         */
        EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["EXPOSURE"] = 6] = "EXPOSURE";
        /**
         * 播放取消
         */
        EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["PLAY_CANCEL"] = 7] = "PLAY_CANCEL";
        /**
         * 播放完成
         */
        EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["PLAY_FINISH"] = 8] = "PLAY_FINISH";
    })(EM_STATISTIC_TYPE = YDHW.EM_STATISTIC_TYPE || (YDHW.EM_STATISTIC_TYPE = {}));
    var EM_SHARE_TYPE;
    (function (EM_SHARE_TYPE) {
        /**
          * 无策略
          */
        EM_SHARE_TYPE[EM_SHARE_TYPE["None"] = 0] = "None";
        /**
         * 分享
         */
        EM_SHARE_TYPE[EM_SHARE_TYPE["Share"] = 1] = "Share";
        /**
         * 视频
         */
        EM_SHARE_TYPE[EM_SHARE_TYPE["Video"] = 2] = "Video";
    })(EM_SHARE_TYPE = YDHW.EM_SHARE_TYPE || (YDHW.EM_SHARE_TYPE = {}));
    var EM_POWER_RECOVERY_TYPE;
    (function (EM_POWER_RECOVERY_TYPE) {
        /**
         * 初始化或其他
         */
        EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["None"] = 0] = "None";
        /**
        * 看视频恢复体力
        */
        EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["WatchVideo"] = 1] = "WatchVideo";
        /**
         * 定时恢复体力
         */
        EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["AutoRecovery"] = 2] = "AutoRecovery";
        /**
         * 倒计时
         */
        EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["CountDown"] = 3] = "CountDown";
    })(EM_POWER_RECOVERY_TYPE = YDHW.EM_POWER_RECOVERY_TYPE || (YDHW.EM_POWER_RECOVERY_TYPE = {}));
    var EM_VIDEO_PLAY_TYPE;
    (function (EM_VIDEO_PLAY_TYPE) {
        /**
         * 视频广告-播放失败
         */
        EM_VIDEO_PLAY_TYPE[EM_VIDEO_PLAY_TYPE["VIDEO_PLAY_FAIL"] = 0] = "VIDEO_PLAY_FAIL";
        /**
         * 视频广告-播放完成
         */
        EM_VIDEO_PLAY_TYPE[EM_VIDEO_PLAY_TYPE["VIDEO_PLAY_FINISH"] = 1] = "VIDEO_PLAY_FINISH";
        /**
         * 视频广告-播放取消
         */
        EM_VIDEO_PLAY_TYPE[EM_VIDEO_PLAY_TYPE["VIDEO_PLAY_CANCEL"] = 2] = "VIDEO_PLAY_CANCEL";
    })(EM_VIDEO_PLAY_TYPE = YDHW.EM_VIDEO_PLAY_TYPE || (YDHW.EM_VIDEO_PLAY_TYPE = {}));
    //@platform=wechat
    var WX;
    (function (WX) {
        var OnShareTimelineInfo = /** @class */ (function () {
            function OnShareTimelineInfo(imageUrl, title, query) {
                if (imageUrl)
                    this.imageUrl = imageUrl;
                if (title)
                    this.title = title;
                if (query)
                    this.query = query;
            }
            return OnShareTimelineInfo;
        }());
        WX.OnShareTimelineInfo = OnShareTimelineInfo;
        var GameRecorderInfo = /** @class */ (function () {
            function GameRecorderInfo(fps, duration, bitrate, gop, hookBgm) {
                if (fps)
                    this.fps = fps;
                if (duration)
                    this.duration = duration;
                if (gop)
                    this.gop = gop;
                if (hookBgm)
                    this.hookBgm = hookBgm;
            }
            return GameRecorderInfo;
        }());
        WX.GameRecorderInfo = GameRecorderInfo;
        /**
         * 创建分享按钮传参
         *
         * 详情参考官网文档：
         * https://developers.weixin.qq.com/minigame/dev/api/game-recorder/wx.createGameRecorderShareButton.html
         */
        var GameRecorderBtnInfo = /** @class */ (function () {
            function GameRecorderBtnInfo(style, share, icon, image, text) {
                if (style)
                    this.style = style;
                if (share)
                    this.share = share;
                if (icon)
                    this.icon = icon;
                if (image)
                    this.image = image;
                if (text)
                    this.text = text;
            }
            return GameRecorderBtnInfo;
        }());
        WX.GameRecorderBtnInfo = GameRecorderBtnInfo;
        var GameRecorderBtnStyle = /** @class */ (function () {
            function GameRecorderBtnStyle(left, top, height, iconMarginRight, fontSize, color, paddingLeft, paddingRight) {
                if (left)
                    this.left = left;
                if (top)
                    this.top = top;
                if (height)
                    this.height = height;
                if (iconMarginRight)
                    this.iconMarginRight = iconMarginRight;
                if (fontSize)
                    this.fontSize = fontSize;
                if (color)
                    this.color = color;
                if (paddingLeft)
                    this.paddingLeft = paddingLeft;
                if (paddingRight)
                    this.paddingRight = paddingRight;
            }
            return GameRecorderBtnStyle;
        }());
        WX.GameRecorderBtnStyle = GameRecorderBtnStyle;
        var GameRecorderShareInfo = /** @class */ (function () {
            function GameRecorderShareInfo(query, bgm, title, button, timeRange, volume, atempo, audioMix) {
                if (query)
                    this.query = query;
                if (bgm)
                    this.bgm = bgm;
                if (title)
                    this.title = title;
                if (button)
                    this.button = button;
                if (timeRange)
                    this.timeRange = timeRange;
                if (volume)
                    this.volume = volume;
                if (atempo)
                    this.atempo = atempo;
                if (audioMix)
                    this.audioMix = audioMix;
            }
            return GameRecorderShareInfo;
        }());
        WX.GameRecorderShareInfo = GameRecorderShareInfo;
        var GameRecorderTitle = /** @class */ (function () {
            function GameRecorderTitle(template, data) {
                if (template)
                    this.template = template;
                if (data)
                    this.data = data;
            }
            return GameRecorderTitle;
        }());
        WX.GameRecorderTitle = GameRecorderTitle;
        var GameRecorderBotton = /** @class */ (function () {
            function GameRecorderBotton(template) {
                if (template)
                    this.template = template;
            }
            return GameRecorderBotton;
        }());
        WX.GameRecorderBotton = GameRecorderBotton;
        /**
         * 该参数根据template选择的模板传对应参数
         */
        var GameRecorderTitleData = /** @class */ (function () {
            function GameRecorderTitleData(score, level, opponent_openid, cost_seconds) {
                if (score)
                    this.score = score;
                if (level)
                    this.level = level;
                if (opponent_openid)
                    this.opponent_openid = opponent_openid;
                if (cost_seconds)
                    this.cost_seconds = cost_seconds;
            }
            return GameRecorderTitleData;
        }());
        WX.GameRecorderTitleData = GameRecorderTitleData;
    })(WX = YDHW.WX || (YDHW.WX = {}));
    //@end=tt
    //@platform=qq
    var QQ;
    (function (QQ) {
        var ShareTempletInfo = /** @class */ (function () {
            function ShareTempletInfo() {
            }
            return ShareTempletInfo;
        }());
        QQ.ShareTempletInfo = ShareTempletInfo;
        var SHareTemplateData = /** @class */ (function () {
            function SHareTemplateData() {
            }
            return SHareTemplateData;
        }());
        QQ.SHareTemplateData = SHareTemplateData;
        var AppMsgInfo = /** @class */ (function () {
            function AppMsgInfo() {
            }
            return AppMsgInfo;
        }());
        QQ.AppMsgInfo = AppMsgInfo;
        //增加好友按钮信息
        var AddFriendButtonInfo = /** @class */ (function () {
            function AddFriendButtonInfo() {
            }
            return AddFriendButtonInfo;
        }());
        QQ.AddFriendButtonInfo = AddFriendButtonInfo;
        //按钮的样式
        var FbStyle = /** @class */ (function () {
            function FbStyle() {
            }
            return FbStyle;
        }());
        QQ.FbStyle = FbStyle;
        //积木广告参数
        var BlockAdInfo = /** @class */ (function () {
            function BlockAdInfo() {
            }
            return BlockAdInfo;
        }());
        QQ.BlockAdInfo = BlockAdInfo;
        //积木广告组件的样式
        var BlockStyle = /** @class */ (function () {
            function BlockStyle() {
            }
            return BlockStyle;
        }());
        QQ.BlockStyle = BlockStyle;
        var EM_SHARE_APP_TYPE;
        (function (EM_SHARE_APP_TYPE) {
            EM_SHARE_APP_TYPE["QQ"] = "qq";
            EM_SHARE_APP_TYPE["QQ_FAST_SHARE"] = "qqFastShare";
            EM_SHARE_APP_TYPE["QQ_FAST_SHARE_LIST"] = "qqFastShareList";
            EM_SHARE_APP_TYPE["QZONE"] = "qzone";
            EM_SHARE_APP_TYPE["WECHARTFRIENDS"] = "wechatFriends";
            EM_SHARE_APP_TYPE["WECHATMOMENT"] = "wechatMoment";
        })(EM_SHARE_APP_TYPE = QQ.EM_SHARE_APP_TYPE || (QQ.EM_SHARE_APP_TYPE = {}));
    })(QQ = YDHW.QQ || (YDHW.QQ = {}));
    //@end=qq
    var ClickOutRequest = /** @class */ (function () {
        function ClickOutRequest() {
        }
        return ClickOutRequest;
    }());
    YDHW.ClickOutRequest = ClickOutRequest;
    var ShareAppInfo = /** @class */ (function () {
        function ShareAppInfo() {
        }
        return ShareAppInfo;
    }());
    YDHW.ShareAppInfo = ShareAppInfo;
    var StatisticResultInfo = /** @class */ (function () {
        function StatisticResultInfo() {
        }
        return StatisticResultInfo;
    }());
    YDHW.StatisticResultInfo = StatisticResultInfo;
    /**
     * 广告Style
     */
    var AdStyle = /** @class */ (function () {
        function AdStyle() {
        }
        return AdStyle;
    }());
    YDHW.AdStyle = AdStyle;
    var SdkInfo = /** @class */ (function () {
        function SdkInfo() {
        }
        return SdkInfo;
    }());
    YDHW.SdkInfo = SdkInfo;
    var StatistiicShareInfo = /** @class */ (function () {
        function StatistiicShareInfo(sharecardId, sType, target, real) {
            this.sharecardId = sharecardId || -1;
            if (sType)
                this.sType = sType;
            if (target)
                this.target = target;
            this.real = real || 0;
        }
        return StatistiicShareInfo;
    }());
    YDHW.StatistiicShareInfo = StatistiicShareInfo;
    var StoreValueRequest = /** @class */ (function () {
        /**
         *
         * @param name 空间名称(后台配置)
         * @param cmd 指令(具体请查看文档)
         * @param args 存贮数据(具体请查看文档)
         */
        function StoreValueRequest(name, cmd, args) {
            if (name)
                this.name = name;
            if (cmd)
                this.cmd = cmd;
            if (args)
                this.args = args;
        }
        return StoreValueRequest;
    }());
    YDHW.StoreValueRequest = StoreValueRequest;
    var EditRequest = /** @class */ (function () {
        function EditRequest() {
        }
        return EditRequest;
    }());
    YDHW.EditRequest = EditRequest;
})(YDHW || (YDHW = {}));
//@end=YDHW


/***/ }),

/***/ "./sdk/Assist/Log.ts":
/*!***************************!*\
  !*** ./sdk/Assist/Log.ts ***!
  \***************************/
/*! exports provided: Log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return Log; });
/* harmony import */ var _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/Utility/LogUtility */ "./framework/Utility/LogUtility.ts");

var Log = /** @class */ (function () {
    function Log() {
    }
    Log.Log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Log("YDHW_SDK", message, null, args);
    };
    Log.Debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Debug("YDHW_SDK", message, null, args);
    };
    Log.Info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Info("YDHW_SDK", message, null, args);
    };
    Log.Warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Warn("YDHW_SDK", message, null, args);
    };
    Log.Error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_0__["LogUtility"].Instance.Error("YDHW_SDK", message, null, args);
    };
    return Log;
}());



/***/ }),

/***/ "./sdk/Base/SDKPlatform.ts":
/*!*********************************!*\
  !*** ./sdk/Base/SDKPlatform.ts ***!
  \*********************************/
/*! exports provided: SDKErrorInfo, SDKPlatform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SDKErrorInfo", function() { return SDKErrorInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SDKPlatform", function() { return SDKPlatform; });
/* harmony import */ var _framework_Define__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/Define */ "./framework/Define.ts");
/* harmony import */ var _framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/Assist/StorageAdapter */ "./framework/Assist/StorageAdapter.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../framework/Utility/LogUtility */ "./framework/Utility/LogUtility.ts");
/* harmony import */ var _Extensions_ClientLogSystem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Extensions/ClientLogSystem */ "./sdk/Extensions/ClientLogSystem.ts");





var SDKErrorInfo = /** @class */ (function () {
    function SDKErrorInfo() {
    }
    return SDKErrorInfo;
}());

var SDKPlatform = /** @class */ (function () {
    function SDKPlatform() {
        //这些是不暴露对外的
        this.Controller = null;
        this.Controller2 = null;
        this.Config = null;
        this.Name = "SDKPlatform";
        this.SystemInfo = null;
        //BannerAd
        this.BannerAdId = "";
        this.BannerAd = null;
        this.BannerStyle = null;
        this.CallerOnResizeBannerAd = null;
        this.IsMisTouchBannerAd = false;
        this.IsShowBannerAd = false;
        //RewardVideoAd
        this.RewardVideoAdId = "";
        this.RewardVideoAd = null;
        this.IsShowRewardVideoAd = false;
        //InterstitialAd
        this.InterstitialAdId = "";
        this.InterstitialAd = null;
        //UserInfoButton
        this.UserInfoButton = null;
        this.IsSimulator = false;
        this.NickName = "";
        this.AvatarUrl = "";
        this.Code = "";
        this.OpenID = "";
        this.AccountPass = "";
        this.NetType = "Get NetworkType failed!";
        // Version:string = "";
        this.Brand = "";
        this.Model = "";
        this.Resolution = "";
        this.AppName = ""; //字节跳动
        this.Env = "";
        this.InviteAccount = "";
        this.IsDebug = false;
        this.IsWechat = false;
        this.IsQQ = false;
        this.IsOppo = false;
        this.IsVivo = false;
        this.IsToutiao = false;
        this.IsBaidu = false;
        this.Is4399 = false;
        this.IsQutoutiao = false;
        this.Is360 = false;
        this.IsMomo = false;
        this.IsXiaomi = false;
        this.IsMeizu = false;
        this.IsUC = false;
        this.IsWeb = false;
        this.IsAlipay = false;
        this.IsQGMiniGame = false;
        this.IsQQMiniGame = false;
        this.IsOnMobile = false;
        this.IsOnIOS = false;
        this.IsOnIPhone = false;
        this.IsOnMac = false;
        this.IsOnIPad = false;
        this.IsOnAndroid = false;
        this.IsOnWP = false;
        this.IsOnQQBrowser = false;
        this.IsOnMQQBrowser = false;
        this.IsOnWeiXin = false;
        this.IsOnSafari = false;
        this.IsOnPC = false;
        this.IsCocosEngine = false;
        this.IsLayaEngine = false;
        this.Name = this.constructor.name;
        this.Config = window[_framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__["StorageAdapter"].SDK_CONFIG];
        this.IsDebug = Boolean(this.Config.debug);
        this.Env = String(this.Config.env);
        this.IsDebug = Boolean(this.Config.debug);
        var u = window.navigator.userAgent;
        this.IsOnMobile = window['isConchApp'] ? true : u.indexOf("Mobile") > -1;
        this.IsOnIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        this.IsOnIPhone = u.indexOf("iPhone") > -1;
        this.IsOnMac = u.indexOf("Mac OS X") > -1;
        this.IsOnIPad = u.indexOf("iPad") > -1;
        this.IsOnAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        this.IsOnWP = u.indexOf("Windows Phone") > -1;
        this.IsOnQQBrowser = u.indexOf("QQBrowser") > -1;
        this.IsOnMQQBrowser = u.indexOf("MQQBrowser") > -1 || (u.indexOf("Mobile") > -1 && u.indexOf("QQ") > -1);
        this.IsOnWeiXin = u.indexOf('MicroMessenger') > -1;
        this.IsOnSafari = u.indexOf("Safari") > -1;
        this.IsOnPC = !this.IsOnMobile;
        if (typeof (wx) != "undefined") {
            if (typeof (qq) != "undefined" && (u.indexOf('MiniGame') > -1 || u.indexOf('qqdevtools') > -1)) {
                this.IsDebug && console.log("平台:QQ");
                this.Controller = window['qq'];
                this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].QQ;
                this.IsQQ = true;
                this.IsQQMiniGame = true;
                this.initPlatform();
            }
            else if (u.indexOf('wechatdevtools') > -1) { //同时wx，wechatdevtools是微信模拟器
                this.IsDebug && console.log("平台:微信开发者工具");
                this.Controller = window['wx'];
                this.IsSimulator = this.Controller.getSystemInfoSync().platform == 'devtools';
                this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Wechat;
                this.IsWechat = true;
                this.initPlatform();
            }
            else if (typeof (tt) != "undefined" && (u.indexOf('MiniGame') > -1 || u.indexOf('bytedanceide') > -1)) {
                this.IsDebug && console.log("平台:今日头条");
                this.Controller = window['tt'];
                this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Toutiao;
                this.IsToutiao = true;
                this.initPlatform();
            }
            else if (u.indexOf('MiniGame') > -1) {
                this.IsDebug && console.log("平台:微信");
                this.Controller = window['wx'];
                this.IsSimulator = this.Controller.getSystemInfoSync().platform == 'devtools';
                this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Wechat;
                this.IsWechat = true;
                this.initPlatform();
            }
        }
        else if (typeof (qg) != "undefined" && u.indexOf('OPPO') > -1) {
            this.IsDebug && console.log("平台:Oppo");
            this.Controller = window['qg'];
            this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Oppo;
            this.IsOppo = true;
            this.IsQGMiniGame = true;
            this.initPlatform();
        }
        else if (typeof (qg) != "undefined" && u.indexOf('VVGame') > -1) {
            this.IsDebug && console.log("平台:Vivo");
            this.Controller = window['qg'];
            this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Vivo;
            this.IsVivo = true;
            this.IsQGMiniGame = true;
            this.initPlatform();
        }
        else if (typeof (swan) != "undefined" && u.indexOf('SwanGame') > -1) {
            this.IsDebug && console.log("平台:百度");
            this.Controller = window['swan'];
            this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Baidu;
            this.IsBaidu = true;
            this.initPlatform();
        }
        else if ( true && u.indexOf('4399') > -1) {
            this.IsDebug && console.log("平台:4399");
        }
        else if (typeof (qu_tou_tiao)) {
            this.IsDebug && console.log("平台:趣头条");
        }
        else if ( true && u.indexOf('360') > -1) {
            this.IsDebug && console.log("平台:360");
        }
        else if (typeof (momo) != "undefined") {
            this.IsDebug && console.log("平台:陌陌");
        }
        else if (u.indexOf(QuickGame) > -1) {
            this.IsDebug && console.log("平台:小米");
            this.Controller = window['qg'];
            this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Xiaomi;
            this.IsXiaomi = true;
            this.IsQGMiniGame = true;
        }
        else if (typeof (mz) != "undefined" && u.indexOf('MZ-') > -1) {
            this.IsDebug && console.log("平台:魅族");
            this.Controller2 = window['mz'];
            this.Controller = window['qg'];
            this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Meizu;
            this.IsMeizu = true;
        }
        else if (typeof (uc) != "undefined") {
            this.IsDebug && console.log("平台:UC");
            this.Controller = window['uc'];
            this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].UC;
            this.IsUC = true;
            this.initPlatform();
        }
        else if (typeof (my) != "undefined" && u.indexOf('AlipayMiniGame') > -1) { //支付宝小游戏
            this.Controller = window['my'];
            this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Alipay;
            this.IsAlipay = true;
        }
        else if (typeof (document) != "undefined" && u.indexOf("Mobile") < 0) { // Web 平台
            this.IsDebug && console.log("平台:");
            this.Controller = window;
            this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Web;
            this.IsWeb = true;
        }
        else if (typeof (document) != "undefined" && u.indexOf("Mobile") > 0) { // Mobile H5 平台
            this.Controller = window;
            this.PlatformType = _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Web;
            this.IsWeb = true;
        }
        else {
            console.error("当前平台识别不出来,不知道是什么鬼:" + u);
        }
        if (!window[_framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__["StorageAdapter"].SDK_CONFIG]) {
            console.error("缺少配置:" + _framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__["StorageAdapter"].SDK_CONFIG);
        }
        this.IsCocosEngine = window['cc'] && typeof window['cc'] === 'object' && window['cc']['sys'] === 'object' && window['cc']['sys']['platform'] === window['cc']['sys'].WECHAT_GAME;
        this.IsLayaEngine = window['Laya'] && typeof Laya === 'object' && typeof Laya.Browser === 'function' && typeof Laya.Browser.onWeiXin == 'boolean' && Laya.Browser.onWeiXin;
    }
    SDKPlatform.prototype.ShareAppMessage = function (title, imageUrl, query, caller, method, target) {
        throw new Error("Method not implemented.");
    };
    SDKPlatform.prototype.CreateNativeAd = function (adUnitId, caller, onCreate, method) {
        throw new Error("Method not implemented.");
    };
    SDKPlatform.prototype.ShowNativeAd = function (nativeId) {
        throw new Error("Method not implemented.");
    };
    SDKPlatform.prototype.ClickNativeAd = function (nativeId) {
        throw new Error("Method not implemented.");
    };
    SDKPlatform.prototype.HasShortcutInstalled = function (caller, onSuccess, onFail, onComplete) {
        throw new Error("Method not implemented.");
    };
    SDKPlatform.prototype.InstallShortcut = function (caller, onSuccess, onFail, onComplete, message) {
        throw new Error("Method not implemented.");
    };
    SDKPlatform.prototype.ExitGame = function () {
        throw new Error("Method not implemented.");
    };
    SDKPlatform.prototype.initPlatform = function () {
        try {
            var sys = this.Controller.getSystemInfoSync();
            // console.warn("YDHW ---getSystemInfoSync:",JSON.stringify(sys));
            var _platform = null;
            if (this.PlatformType == _framework_Define__WEBPACK_IMPORTED_MODULE_0__["EM_PLATFORM_TYPE"].Vivo) { // || this.PlatformType == EM_PLATFORM_TYPE.Meizu
                _platform = sys.osType;
            }
            else {
                _platform = sys.platform;
            }
            if (_platform) {
                if (_platform == 'ios') {
                    this.IsOnIOS = true;
                }
                else if (_platform == 'android') {
                    this.IsOnAndroid = true;
                }
                else if (_platform == 'devtools') {
                    this.IsSimulator = true;
                }
            }
        }
        catch (error) {
            console.log("获取系统信息失败");
        }
    };
    SDKPlatform.prototype.Initialize = function () {
        var _this = this;
        this.GetSystemInfoSync(this, function (data) {
            _this.SystemInfo = data;
            if (data.brand)
                _this.Brand = data.brand;
            if (data.model)
                _this.Model = data.model;
            if (data.appName)
                _this.AppName = data.appName; //字节跳动
            var _resolution = "";
            if (data.screenWidth && data.screenHeight)
                _resolution = data.screenWidth + "x" + data.screenHeight;
            _this.Resolution = data.resolution || _resolution;
        });
        return true;
    };
    SDKPlatform.prototype.Login = function (caller, onSuccess, onError) {
        throw new Error("Login Method not implemented.");
    };
    SDKPlatform.prototype.IsHasAPI = function (name) {
        var func = this.Controller[name];
        if (!func || func === undefined || typeof func !== "function") {
            this.Warn("platform not exists api:" + name);
            return false;
        }
        return true;
    };
    SDKPlatform.prototype.IsHasAPI2 = function (name) {
        var func = this.Controller2[name];
        if (!func || func === undefined || typeof func !== "function") {
            this.Warn("platform not exists api:" + name);
            return false;
        }
        return true;
    };
    SDKPlatform.prototype.LaunchInfo = function () {
    };
    SDKPlatform.prototype.GetSystemInfoSync = function (caller, method) {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && console.log("SDKPlatform GetSystemInfoSync()");
    };
    SDKPlatform.prototype.OnFrontend = function (caller, method) {
    };
    SDKPlatform.prototype.OnBackend = function (caller, method) {
    };
    SDKPlatform.prototype.OnError = function (caller, method) {
        if (!this.IsHasAPI("onError")) {
            this.Warn("onError is not supported");
            return;
        }
        var me = this;
        this.Controller.onError(function (e) {
            caller && method && method.call(caller, e);
            me.Warn("onError:", e);
            _Extensions_ClientLogSystem__WEBPACK_IMPORTED_MODULE_4__["ClientLogSystem"].getInstance().setErrorStack(e, {});
        });
    };
    SDKPlatform.prototype.CreateFeedbackButton = function (_btnVect, hide) {
    };
    SDKPlatform.prototype.ShowFeedbackButton = function (visible) {
    };
    SDKPlatform.prototype.ExitMiniProgram = function () {
    };
    SDKPlatform.prototype.TriggerGC = function () {
    };
    SDKPlatform.prototype.OnShare = function (_data) {
    };
    SDKPlatform.prototype.NavigateToMiniProgram = function (ownAppId, toAppId, toUrl, caller, onSuccess, onFail) {
    };
    SDKPlatform.prototype.CreateBannerAd = function (isSmall, adUnitId, isMisTouch, style, caller, onResize, method) {
    };
    SDKPlatform.prototype.RefreshBannerAd = function () {
    };
    SDKPlatform.prototype.DestroyBannerAd = function () {
        if (!this.BannerAd) {
            return;
        }
        this.BannerAd.destroy();
        this.BannerAd = null;
    };
    SDKPlatform.prototype.SetBannerVisible = function (val) {
    };
    SDKPlatform.prototype.ChangeBannerStyle = function (style) {
        if (!this.BannerAd || !style) {
            return;
        }
        if (style.left)
            this.BannerAd.style.left = style.left;
        if (style.top)
            this.BannerAd.style.top = style.top;
        if (style.width)
            this.BannerAd.style.width = style.width;
        if (style.height)
            this.BannerAd.style.height = style.height;
        this.BannerAd._style = style;
        this.BannerStyle = style;
    };
    SDKPlatform.prototype.CreateRewardVideoAd = function (adUnitId, caller, onLoad, onCLose, onError) {
    };
    SDKPlatform.prototype.ShowRewardVideoAd = function (caller, onShow, onException) {
    };
    SDKPlatform.prototype.CreateInterstitialAd = function (adUnitId, caller, onLoad, onClose, onError) {
    };
    SDKPlatform.prototype.ShowInterstitialAd = function (caller, method) {
    };
    SDKPlatform.prototype.ClearInterstitialAd = function () {
    };
    SDKPlatform.prototype.GetUserInfo = function (caller, onSuccess, onError) {
        var _this = this;
        if (!this.IsHasAPI("getUserInfo")) {
            this.Warn("getUserInfo is not supported");
            caller && onError && onError.call(caller);
            return;
        }
        this._Author('scope.userInfo', this, function (res) {
            console.warn("YDHW --GetUserInfo-_Author-onSuccess:" + JSON.stringify(res));
            _this.Controller.getUserInfo({
                withCredentials: false,
                lang: 'zh_CN',
                success: function (res) {
                    console.log("YDHW getUserInfo:" + JSON.stringify(res));
                    if (res.userInfo) {
                        caller && onSuccess && onSuccess.call(caller, res.userInfo);
                    }
                },
                fail: function (res) {
                    console.warn("YDHW --GetUserInfo-_Author-getUserInfo-fail:" + JSON.stringify(res));
                    caller && onError && onError.call(caller, res);
                }
            });
        }, function () {
            console.warn("YDHW --GetUserInfo-_Author-onError");
            caller && onError && onError.call(caller);
        });
    };
    SDKPlatform.prototype.CreateUserInfoButton = function (btnInfo, caller, onSuccess, onError) {
    };
    SDKPlatform.prototype.ShowUserInfoButton = function () {
        if (this.UserInfoButton) {
            this.UserInfoButton.show();
        }
    };
    SDKPlatform.prototype.HideUserInfoButton = function () {
        if (this.UserInfoButton) {
            this.UserInfoButton.hide();
        }
    };
    SDKPlatform.prototype.DestroyUserInfoButton = function () {
        if (this.UserInfoButton) {
            this.UserInfoButton.offTap();
            this.HideUserInfoButton();
            this.UserInfoButton.destroy();
            this.UserInfoButton = null;
        }
    };
    SDKPlatform.prototype.VibrateShort = function () {
    };
    SDKPlatform.prototype.VibrateLong = function () {
    };
    SDKPlatform.prototype.SetUserCloudStorage = function (_kvDataList) {
    };
    SDKPlatform.prototype.PostMessage = function (_data) {
    };
    SDKPlatform.prototype.CheckUpdate = function () {
    };
    SDKPlatform.prototype.GetNetworkType = function (caller, method) {
    };
    SDKPlatform.prototype.CreateVideo = function (data) {
        return null;
    };
    SDKPlatform.prototype.LoadSubpackage = function (name, update) {
        return null;
    };
    SDKPlatform.prototype.ShowLoading = function () {
    };
    SDKPlatform.prototype.HideLoading = function () {
    };
    SDKPlatform.prototype.ShowShare = function (data) {
    };
    SDKPlatform.prototype.ShowModal = function (modal) {
    };
    SDKPlatform.prototype._Author = function (_scope, caller, onSuccess, onError) {
        if (!this.IsHasAPI("getSetting")) {
            this.Warn("getSetting is not supported");
            caller && onError && onError.call(caller);
            return;
        }
        if (!this.IsHasAPI("authorize")) {
            this.Warn("authorize is not supported");
            caller && onError && onError.call(caller);
            return;
        }
        var self = this;
        this.Controller.getSetting({
            success: function (res) {
                console.warn("YDHW --_Author-getSetting-success:" + JSON.stringify(res));
                if (!res.authSetting[_scope]) {
                    console.warn("YDHW --_Author-getSetting-success-not has:", _scope);
                    self.Controller.authorize({
                        scope: _scope,
                        success: function (res) {
                            console.warn("YDHW --_Author-authorize-success:" + JSON.stringify(res));
                            caller && onSuccess && onSuccess.call(caller, res);
                        },
                        fail: function () {
                            console.warn("YDHW --_Author-authorize-fail");
                            caller && onError && onError.call(caller, 'No authority');
                        }
                    });
                }
                else {
                    console.warn("YDHW --_Author-getSetting-success-has:", _scope);
                    caller && onSuccess && onSuccess.call(caller, res);
                }
            }
        });
    };
    SDKPlatform.prototype.Hook = function (name, caller, method) {
        try {
            var tmpFunc_1 = this.Controller[name];
            Object.defineProperty(this.Controller, name, { writable: true });
            this.Controller[name] = function () {
                var len = arguments.length;
                var tmpList = Array(len);
                for (var i = 0; i < len; i++) {
                    tmpList[i] = arguments[i];
                }
                var tmpOut = tmpFunc_1.apply(this, tmpList);
                if (Object.prototype.toString.call(name).slice(8, -1) == "Function") {
                    return method.call(caller, tmpList, tmpOut);
                }
            };
            Object.defineProperty(this.Controller, name, { writable: false });
            this.Log("Hook Success name:" + name);
        }
        catch (e) {
            this.Log("Hook Exception:" + e + " name:" + name);
        }
    };
    SDKPlatform.prototype.Log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.IsDebug && _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_3__["LogUtility"].Instance.Log("YDHW-SDK:" + this.Name, message, null, args);
    };
    SDKPlatform.prototype.Debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.IsDebug && _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_3__["LogUtility"].Instance.Debug("YDHW-SDK:" + this.Name, message, null, args);
    };
    SDKPlatform.prototype.Info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.IsDebug && _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_3__["LogUtility"].Instance.Info("YDHW-SDK:" + this.Name, message, null, args);
    };
    SDKPlatform.prototype.Warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.IsDebug && _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_3__["LogUtility"].Instance.Warn("YDHW-SDK:" + this.Name, message, null, args);
    };
    SDKPlatform.prototype.Error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.IsDebug && _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_3__["LogUtility"].Instance.Error("YDHW-SDK:" + this.Name, message, null, args);
    };
    SDKPlatform.ERROR_DESCRIPTION = {
        1000: { ErrCode: 1000, Description: "appid无效", SolutionHint: "1.请检查appid是否和游点好玩后台及平台申请的一致" },
        1001: { ErrCode: 1001, Description: "version无效", SolutionHint: "请检查版本号是否和游点好玩后台配置的一致" },
        1002: { ErrCode: 1002, Description: "code与AccountPass必传其一", SolutionHint: "请联系游点好玩SDK技术" },
        1003: { ErrCode: 1003, Description: "QQ code无效", SolutionHint: "请检查appid是否和游点好玩后台及工程配置的一致" },
        1004: { ErrCode: 1004, Description: "OPPO token无效", SolutionHint: "请检查appid和包名是否和游点好玩后台及平台申请的一致" },
        1005: { ErrCode: 1005, Description: "VIVO token无效", SolutionHint: "请检查appid和包名是否和游点好玩后台及平台申请的一致" },
        1006: { ErrCode: 1006, Description: "头条 code无效", SolutionHint: "1.请检查appid是否和游点好玩后台及工程配置的一致;2.发布工程的appid是否和配置文件及后台配置的一致" },
        1007: { ErrCode: 1007, Description: "百度 code无效", SolutionHint: "1.请检查appid是否和游点好玩后台及工程配置的一致;2.发布工程的appid是否和配置文件及后台配置的一致" },
        1008: { ErrCode: 1008, Description: "魅族 token无效", SolutionHint: "1.请检查包名是否和游点好玩后台及平台申请的一致;2.发布工程的包名是否和配置文件及后台配置的一致" },
        1009: { ErrCode: 1009, Description: "UC code无效", SolutionHint: "1.请检查clientid是和游点好玩后台及工程配置的一致;2.发布工程的clientid是否和配置文件及后台配置的一致" },
        1010: { ErrCode: 1010, Description: "微信 code无效", SolutionHint: "1.请检查appid是否和游点好玩后台及工程配置的一致;2.发布工程的appid是否和配置文件及后台配置的一致" },
        1011: { ErrCode: 1011, Description: "分享图场景值为空", SolutionHint: "请核对传参是否有误" },
        1012: { ErrCode: 1012, Description: "积分墙模块信息为空", SolutionHint: "请核对传参是否有误" },
        1013: { ErrCode: 1013, Description: "领取积分墙相关信息不全", SolutionHint: "请核对传参是否有误" },
        1014: { ErrCode: 1014, Description: "自定义空间参数不正确", SolutionHint: "请核对传参是否有误" },
        1015: { ErrCode: 1015, Description: "自定义空间关联的游戏不存在", SolutionHint: "请到游点好玩后台核对" },
        1016: { ErrCode: 1016, Description: "自定义空间已达到最大值", SolutionHint: "请到游点好玩后台核对" },
        1017: { ErrCode: 1017, Description: "自定义空间不存在", SolutionHint: "请到游点好玩后台核对" },
        1018: { ErrCode: 1018, Description: "自定义空间参数格式不正确", SolutionHint: "请到游点好玩后台核对" },
        1019: { ErrCode: 1019, Description: "传入事件信息为空", SolutionHint: "请核对传参是否有误" },
        1020: { ErrCode: 1020, Description: "传入结果信息为空", SolutionHint: "请核对传参是否有误" },
        1021: { ErrCode: 1021, Description: "传入流失信息为空", SolutionHint: "请核对传参是否有误" },
        1022: { ErrCode: 1022, Description: "传入分享图信息为空", SolutionHint: "请核对传参是否有误" },
        1023: { ErrCode: 1023, Description: "传入视频广告信息为空", SolutionHint: "请核对传参是否有误" },
        1024: { ErrCode: 1024, Description: "传入Banner广告信息为空", SolutionHint: "请核对传参是否有误" },
        1025: { ErrCode: 1025, Description: "传入格子广告信息为空", SolutionHint: "请核对传参是否有误" },
        1026: { ErrCode: 1026, Description: "传入原生模板广告信息为空", SolutionHint: "请核对传参是否有误" },
        1027: { ErrCode: 1027, Description: "传入插屏广告信息为空", SolutionHint: "请核对传参是否有误" },
        1028: { ErrCode: 1028, Description: "传入积木广告信息为空", SolutionHint: "请核对传参是否有误" },
        1029: { ErrCode: 1029, Description: "传入原生广告信息为空", SolutionHint: "请核对传参是否有误" },
        1030: { ErrCode: 1030, Description: "传入盒子广告信息为空", SolutionHint: "请核对传参是否有误" },
        1031: { ErrCode: 1031, Description: "传入时长信息为空", SolutionHint: "请核对传参是否有误" },
        1032: { ErrCode: 1032, Description: "传入SDK统计信息为空", SolutionHint: "请核对传参是否有误" },
        1033: { ErrCode: 1033, Description: "传入SDK统计信息不全", SolutionHint: "请核对传参是否有误" },
        1034: { ErrCode: 1034, Description: "传入客户端错误信息为空", SolutionHint: "请核对传参是否有误" },
        1035: { ErrCode: 1035, Description: "传入卖量信息为空", SolutionHint: "请核对传参是否有误" },
        1036: { ErrCode: 1036, Description: "游戏配置无效", SolutionHint: "如需用到自定义配置数,请到游点好玩后后台配置,无需使用,可忽略" },
        1037: { ErrCode: 1037, Description: "游戏版本无效", SolutionHint: "请到游点好玩后台配置游戏版本号" },
        9000: { ErrCode: 9000, Description: "网络地址无效", SolutionHint: "请联系游点好玩SDK技术" },
        9001: { ErrCode: 9001, Description: "没有访问凭证", SolutionHint: "请检查是否登录成功" },
        9002: { ErrCode: 9002, Description: "访问凭证无效", SolutionHint: "请检查是否登录成功" },
        9003: { ErrCode: 9003, Description: "客户端版本过低", SolutionHint: "暂无" },
        9004: { ErrCode: 9004, Description: "数据校验不通过", SolutionHint: "暂无" },
        9999: { ErrCode: 9999, Description: "系统异常", SolutionHint: "请联系游点好玩SDK技术" },
    };
    return SDKPlatform;
}());



/***/ }),

/***/ "./sdk/Commerce/WechatCommerce.ts":
/*!****************************************!*\
  !*** ./sdk/Commerce/WechatCommerce.ts ***!
  \****************************************/
/*! exports provided: WechatCommerce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WechatCommerce", function() { return WechatCommerce; });
/* harmony import */ var _Model_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/User */ "./sdk/Model/User.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _Manager_CommerceMgr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Manager/CommerceMgr */ "./sdk/Manager/CommerceMgr.ts");
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
/* harmony import */ var _Model_Default__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Model/Default */ "./sdk/Model/Default.ts");
/* harmony import */ var _framework_Define__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../framework/Define */ "./framework/Define.ts");
/* harmony import */ var _Model_Statistic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Model/Statistic */ "./sdk/Model/Statistic.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var WechatCommerce = /** @class */ (function (_super) {
    __extends(WechatCommerce, _super);
    function WechatCommerce() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._LoginInfo = null;
        _this.Platform = null;
        _this.GridAdUnitIdList = null;
        return _this;
    }
    WechatCommerce.prototype.Initialize = function () {
        var _this = this;
        _super.prototype.Initialize.call(this);
        this.SceneWhiteList = [''];
        this.Name = "YDHW-SDK:" + this.constructor.name;
        this.GridAdUnitIdList = this.Config.grid_ad_unit_id_list;
        if (!this.GridAdUnitIdList || typeof this.GridAdUnitIdList == "undefined") {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && console.error("YDHW_CONFIG.grid_ad_unit_id_list not exists");
        }
        this.Platform.OnFrontend(this, function (res) {
            _this.SwitchLog && _this.Log("OnFrontend");
            _this._ShareAppInfo && _this.Strategy && _this.Strategy.GetShareResult(_this._ShareAppInfo, _this, function (shareBackInfo) {
                _this.SwitchLog && _this.Warn("本次分享");
                _this._CallerShareCardBack && _this._EvtOnShareCardBack && _this._EvtOnShareCardBack.call(_this._CallerShareCardBack, shareBackInfo);
                _this._EvtOnShareCardBack = null;
            });
            _this.OnFrontend(res);
        });
        this.Platform.OnBackend(this, function (res) {
            _this.SwitchLog && _this.Log("OnBackend");
            _this.OnBackend(res);
        });
        this.Platform.ShowShareMenu();
    };
    WechatCommerce.prototype.Login = function (caller, method) {
        var _this = this;
        this.Platform.Login(this, function (code, token, result) {
            _this.Code = code;
            if (!code) {
                //游客身份登录的情况下，和后台约定好了
                //将anonymousCode通过code传过去,同时pkgName设置为anonymousCode
                _this.Code = result.anonymousCode;
                _this.PkgName = 'anonymousCode';
            }
            if (_this._LoginInfo) {
                _this._LoginInfo.code = result.code || "";
                _this._LoginInfo.token = result.code || "";
                _this._LoginInfo.pkgName = _this.PkgName || "";
            }
            else {
                // this._LoginInfo = {
                //     code: result.code || "",
                //     token: result.token || "",
                //     pkgName: this.PkgName || "",
                // };
            }
            _this.Log("LoginInfo:", JSON.stringify(_this._LoginInfo));
            _this._InnerLogin(caller, method);
        }, function (error) {
            _this.Error("登录失败Error:" + error);
            caller && method.call(caller, false);
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].Login_Api, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.ShareInfo = function () {
        var shareInfo = new _Model_User__WEBPACK_IMPORTED_MODULE_0__["ShareInfo"]();
        var options = this.Platform.LaunchInfo();
        this.Platform.IsDebug && console.log("options=" + JSON.stringify(options));
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && console.log("WechatCommerce ShareInfo()");
        if (options) {
            if (options.scene) {
                shareInfo.scene = options.scene;
                this.SceneId = options.scene;
            }
            if (options.query) {
                shareInfo.query = JSON.stringify(options.query);
                var isExist = false;
                for (var i = 0; i < this.SceneWhiteList.length; i++) {
                    var sceneId = parseInt(this.SceneWhiteList[i]);
                    if (parseInt(options.scene) == sceneId) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist && shareInfo.query != "{}") {
                    if (options.query.sharecard_id) {
                        shareInfo.sharecardId = options.query.sharecard_id;
                    }
                    if (options.query.account_id) {
                        shareInfo.accountId = options.query.account_id;
                        this.InviteAccount = options.query.account_id;
                    }
                    if (options.query.from) {
                        shareInfo.from = options.query.from;
                    }
                    if (options.query.share_time) {
                        shareInfo.shareTime = options.query.share_time;
                    }
                }
            }
            this.Platform.IsDebug && console.log('当前场景值---------------------------：' + options.scene);
        }
        return shareInfo;
    };
    WechatCommerce.prototype.ShareAppMessage = function (scene, channel, module, inviteType, caller, method, target) {
        var _this = this;
        var shareList = null;
        var tmpInviteType = "";
        this._CurrentShareScene = scene;
        if (this.Strategy.IsHasShareScene(this._CurrentShareScene)) {
            shareList = this.Strategy.GetShareSceneConfig(this._CurrentShareScene);
        }
        else {
            if (this.SwitchLog)
                this.Warn("当前场景没有分享图,请配置");
        }
        var nowTime = new Date().getTime();
        if (shareList && shareList.length > 0) {
            var r_id = Math.floor(Math.random() * shareList.length);
            var card_1 = shareList[r_id];
            tmpInviteType = inviteType || 'stage_invite';
            var queryData = 'account_id=' + this.AccountId + '&sharecard_id=' + card_1.id + '&share_time=' + nowTime + '&from=' + tmpInviteType;
            console.warn("YDHW ---ShareAppMessage--queryData:" + queryData);
            this.Platform.ShareAppMessage(card_1.title, card_1.img, queryData, this, function () {
                // pf_data.show_share = true;
                _this._CallerShareCardBack = caller;
                _this._EvtOnShareCardBack = method;
                _this._ShareAppInfo = new _Model_Default__WEBPACK_IMPORTED_MODULE_4__["ShareAppInfo"]();
                _this._ShareAppInfo.channel = channel;
                _this._ShareAppInfo.module = module;
                _this._ShareAppInfo.showTime = new Date().getTime();
                _this._ShareAppInfo.shareId = card_1.id;
                //分享图统计（打点统计）
                var shareInfo = new _Model_Statistic__WEBPACK_IMPORTED_MODULE_6__["StatistiicShareInfo"](nowTime, card_1.id);
                _this.StatisticShareCardInner(shareInfo);
            });
        }
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].ShareAppMessage, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.SubscribeSysMsg = function (msgTypeList, onSuccess, onError) {
        this.Platform.SubscribeSysMsg(msgTypeList, this, function (data) {
            onSuccess && onSuccess(data);
        }, function (error) {
            onError && onError(error);
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].SubscribeSysMsg, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    /**
     * 获取用户的当前设置
     * @param caller
     * @param method
     */
    WechatCommerce.prototype.GetSetting = function (isSubcribe, onSuccess, onError) {
        this.Platform.GetSetting(isSubcribe, this, function (result) {
            onSuccess && onSuccess(result);
        }, function (error) {
            onError && onError(error);
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GetSetting, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.CreateGridAd = function (isShow, adTheme, gridCount, style) {
        var _this = this;
        var index = Math.floor(Math.random() * this.GridAdUnitIdList.length);
        var adId = this.GridAdUnitIdList[index];
        this.Platform.CreateGridAd(isShow, adId, adTheme, gridCount, style, this, function () {
            _this.Log("CreateGridAd onLoad");
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.StatisticGrid(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["EM_STATISTIC_TYPE"].LOAD_SUCCESS, adId);
        }, function () {
            _this.Log("CreateGridAd onShow");
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.StatisticGrid(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["EM_STATISTIC_TYPE"].SHOW, adId);
        }, function () {
            _this.Log("CreateGridAd onError error:adUnitId=" + adId);
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.StatisticGrid(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["EM_STATISTIC_TYPE"].LOAD_FAIL, adId);
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce._GridId = "";
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce._GridId = adId;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.StatisticGrid(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["EM_STATISTIC_TYPE"].CREATE, adId);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].CreateGridAd, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.ShowGridAd = function () {
        this.Platform.ShowGridAd(this, function () {
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GetSetting, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.HideGridAd = function () {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].HideGridAd, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
        this.Platform.HideGridAd(this, function () {
        });
    };
    WechatCommerce.prototype.GameRecorderOff = function (event, caller, callBack) {
        this.Platform.GameRecorderOff(event, this, function (res) {
            caller && callBack && callBack.call(caller, res);
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderOff, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.GameRecorderOn = function (event, caller, callBack) {
        this.Platform.GameRecorderOn(event, this, function (res) {
            caller && callBack && callBack.call(caller, res);
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderOn, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.GameRecorderStart = function (info, caller, onStart, onStop, onError, onPause, onResume, onAbort, onTimeUpdate) {
        this.Platform.GameRecorderStart(info, caller, onStart, onStop, onError, onPause, onResume, onAbort, onTimeUpdate);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderStart, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.GameRecorderStop = function () {
        this.Platform.GameRecorderStop();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderStop, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.GameRecorderPause = function () {
        this.Platform.GameRecorderPause();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderPause, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.GameRecorderResume = function () {
        this.Platform.GameRecorderResume();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderResume, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.GameRecorderAbort = function () {
        this.Platform.GameRecorderAbort();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderAbort, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.IsAtempoSupported = function () {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].IsAtempoSupported, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
        return this.Platform.IsAtempoSupported();
    };
    WechatCommerce.prototype.IsFrameSupported = function () {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].IsFrameSupported, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
        return this.Platform.IsFrameSupported();
    };
    WechatCommerce.prototype.IsSoundSupported = function () {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].IsSoundSupported, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
        return this.Platform.IsSoundSupported();
    };
    WechatCommerce.prototype.IsVolumeSupported = function () {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].IsVolumeSupported, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
        return this.Platform.IsVolumeSupported();
    };
    WechatCommerce.prototype.CreateGameRecorderShareButton = function (btnInfo) {
        this.Platform.CreateGameRecorderShareButton(btnInfo);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].CreateGameRecorderShareButton, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.GameRecorderShareButtonHide = function () {
        this.Platform.GameRecorderShareButtonHide();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderShareButtonHide, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.GameRecorderShareButtonShow = function () {
        this.Platform.GameRecorderShareButtonShow();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderShareButtonShow, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.GameRecorderShareButtonOnTap = function (caller, method) {
        this.Platform.GameRecorderShareButtonOnTap(caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderShareButtonOnTap, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.GameRecorderShareButtonOffTap = function (caller, method) {
        this.Platform.GameRecorderShareButtonOffTap(caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].GameRecorderShareButtonOffTap, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.SetMessageToFriendQuery = function (shareMessageToFriendScene) {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].SetMessageToFriendQuery, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
        return this.Platform.SetMessageToFriendQuery(shareMessageToFriendScene);
    };
    WechatCommerce.prototype.OnShareMessageToFriend = function (caller, method) {
        this.Platform.OnShareMessageToFriend(caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].OnShareMessageToFriend, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.OnShareTimeline = function (shareInfo, caller, method) {
        this.Platform.OnShareTimeline(shareInfo, caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].OnShareTimeline, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    WechatCommerce.prototype.OffShareTimeline = function () {
        this.Platform.OffShareTimeline();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_3__["COMMERCE_API"].OffShareTimeline, _framework_Define__WEBPACK_IMPORTED_MODULE_5__["EM_PLATFORM_TYPE"].Wechat, null);
    };
    return WechatCommerce;
}(_Manager_CommerceMgr__WEBPACK_IMPORTED_MODULE_2__["CommerceMgr"]));



/***/ }),

/***/ "./sdk/Config/SDKConfig.ts":
/*!*********************************!*\
  !*** ./sdk/Config/SDKConfig.ts ***!
  \*********************************/
/*! exports provided: SDKConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SDKConfig", function() { return SDKConfig; });
var SDKConfig = /** @class */ (function () {
    function SDKConfig() {
    }
    /**
     * 场景白名单
     */
    SDKConfig.SceneWhiteList = [];
    /**
     * 强制刷新时间（秒）
     */
    SDKConfig.DefaultIntervalForceRefreshBannerAd = 10;
    return SDKConfig;
}());



/***/ }),

/***/ "./sdk/Extensions/ClientLogSystem.ts":
/*!*******************************************!*\
  !*** ./sdk/Extensions/ClientLogSystem.ts ***!
  \*******************************************/
/*! exports provided: ClientLogSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientLogSystem", function() { return ClientLogSystem; });
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/Utility/TimerUtility */ "./framework/Utility/TimerUtility.ts");
/* harmony import */ var Utils_TimeUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utils/TimeUtils */ "./src/Utils/TimeUtils.ts");



var StackInfo = /** @class */ (function () {
    function StackInfo(errStack, logStr, strDate) {
        this.errStack = errStack;
        this.logStr = logStr;
        this.strDate = strDate;
    }
    return StackInfo;
}());
var ClientLogSystem = /** @class */ (function () {
    function ClientLogSystem() {
        this._SendErrorStackTimerId = "SendErrorStackTimerId";
        this.stackList = new Array(); //异常上报服务器列表
        this.stackTab = new Array(); //异常标记列表，用于报错过的异常拦截掉
    }
    ;
    ClientLogSystem.getInstance = function () {
        return ClientLogSystem.instance;
    };
    ClientLogSystem.prototype.setErrorStack = function (ErrStack, LogStr) {
        if (this.hasErrorStack(JSON.stringify(ErrStack))) {
            // console.warn("DYHW ---已经提交过该异常");
            return;
        }
        var StrDate = Utils_TimeUtils__WEBPACK_IMPORTED_MODULE_2__["default"].formatDate(new Date(), "YYYY-MM-dd hh:mm:ss");
        this.stackList.push(new StackInfo(ErrStack, LogStr, StrDate));
        this.stackTab.push(JSON.stringify(ErrStack));
        this.sendErrorStack();
    };
    ClientLogSystem.prototype.getErrorStack = function () {
        return this.stackList.pop();
    };
    ClientLogSystem.prototype.hasErrorStack = function (ErrStack) {
        var index = this.stackTab.indexOf(ErrStack);
        // console.warn("DYHW ---hasErrorStack:",index);
        return (index >= 0);
    };
    ClientLogSystem.prototype.sendErrorStack = function () {
        var _this = this;
        if (this.stackList && this.stackList.length > 0) {
            _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_1__["default"].RemoveTimer(this._SendErrorStackTimerId);
            _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_1__["default"].AddTimer(this._SendErrorStackTimerId, 1000, this, null, function () {
                var stack = _this.getErrorStack();
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Commerce.StatisticErrorStack(stack.errStack, stack.logStr, stack.strDate);
                var sLength = _this.stackList.length;
                return (sLength == 0);
            });
        }
    };
    ClientLogSystem.instance = new ClientLogSystem();
    return ClientLogSystem;
}());



/***/ }),

/***/ "./sdk/Extensions/CloudAPI.ts":
/*!************************************!*\
  !*** ./sdk/Extensions/CloudAPI.ts ***!
  \************************************/
/*! exports provided: EM_CLOUD_API_TYPE, CloudAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_CLOUD_API_TYPE", function() { return EM_CLOUD_API_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudAPI", function() { return CloudAPI; });
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
/* harmony import */ var _Model_Data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/Data */ "./sdk/Model/Data.ts");



var EM_CLOUD_API_TYPE;
(function (EM_CLOUD_API_TYPE) {
    EM_CLOUD_API_TYPE[EM_CLOUD_API_TYPE["String"] = 0] = "String";
    EM_CLOUD_API_TYPE[EM_CLOUD_API_TYPE["StringArray"] = 1] = "StringArray";
    EM_CLOUD_API_TYPE[EM_CLOUD_API_TYPE["StringSet"] = 2] = "StringSet";
    EM_CLOUD_API_TYPE[EM_CLOUD_API_TYPE["StringMap"] = 3] = "StringMap";
    EM_CLOUD_API_TYPE[EM_CLOUD_API_TYPE["StringRandom"] = 4] = "StringRandom";
})(EM_CLOUD_API_TYPE || (EM_CLOUD_API_TYPE = {}));
var CloudAPI = /** @class */ (function () {
    function CloudAPI() {
    }
    CloudAPI.All = function () {
    };
    CloudAPI.GetObject = function (key, caller, method) {
        var request = new _Model_Data__WEBPACK_IMPORTED_MODULE_2__["StoreValueRequest"]();
        request.name = key;
        request.cmd = "get";
        request.args = "";
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_NET_API"].StoreValue, request, this, function (result) {
            caller && method && method.call(caller, JSON.parse(result.value));
        });
    };
    CloudAPI.GetString = function (key, caller, method) {
        var request = new _Model_Data__WEBPACK_IMPORTED_MODULE_2__["StoreValueRequest"]();
        request.name = key;
        request.cmd = "get";
        request.args = "";
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_NET_API"].StoreValue, request, this, function (result) {
            caller && method && method.call(caller, result.value);
        });
    };
    CloudAPI.SetObject = function (key, value, caller, method) {
        var request = new _Model_Data__WEBPACK_IMPORTED_MODULE_2__["StoreValueRequest"]();
        request.name = key;
        request.cmd = "set";
        request.args = JSON.stringify(value);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_NET_API"].StoreValue, request, this, function (result) {
            caller && method && method.call(caller, result.value === true);
        });
    };
    CloudAPI.SetString = function (key, value, caller, method) {
        var request = new _Model_Data__WEBPACK_IMPORTED_MODULE_2__["StoreValueRequest"]();
        request.name = key;
        request.cmd = "set";
        request.args = value;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_NET_API"].StoreValue, request, this, function (result) {
            caller && method && method.call(caller, result.value === true);
        });
    };
    CloudAPI.Size = function (caller, method) {
        var request = new _Model_Data__WEBPACK_IMPORTED_MODULE_2__["StoreValueRequest"]();
        request.cmd = "size";
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_NET_API"].StoreValue, request, this, function (result) {
            caller && method && method.call(caller, result.value === true);
        });
    };
    CloudAPI.DeleteObject = function (key, caller, method) {
        var request = new _Model_Data__WEBPACK_IMPORTED_MODULE_2__["StoreValueRequest"]();
        request.name = key;
        request.cmd = "del";
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_NET_API"].StoreValue, request, this, function (result) {
            caller && method && method.call(caller, result.value === true);
        });
    };
    CloudAPI.StoreValue = function (storeInfo, caller, method) {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_NET_API"].StoreValue, storeInfo, this, function (result) {
            caller && method && method.call(caller, result);
        });
    };
    return CloudAPI;
}());



/***/ }),

/***/ "./sdk/Extensions/PowerSystem.ts":
/*!***************************************!*\
  !*** ./sdk/Extensions/PowerSystem.ts ***!
  \***************************************/
/*! exports provided: PowerInfo, PowerSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerInfo", function() { return PowerInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerSystem", function() { return PowerSystem; });
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../framework/Utility/TimerUtility */ "./framework/Utility/TimerUtility.ts");



var PowerInfo = /** @class */ (function () {
    function PowerInfo() {
    }
    return PowerInfo;
}());

var PowerSystem = /** @class */ (function () {
    function PowerSystem() {
        this._AutoRecoveryTimerId = "PowerAutoRecoveryTimerId";
        this._CallerPowerChanged = null;
        this._ListenOnPowerChanged = null;
        this._OnCountDown = false;
        this._CountDownTime = 0;
        this._CurrentPowerNum = 0;
    }
    PowerSystem.prototype.Initialize = function () {
        if (!_SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.PowerSystemConfig || _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.PowerSystemConfig.IsOn === false) {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("Power System is off");
            return;
        }
        var nowTime = new Date().getTime();
        this._CurrentPowerNum = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].TotalPowerCounter, -1);
        var lastTime = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].LastPowerAddTimestamp, nowTime);
        this._CountDownTime = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].CountDownPro, 0);
        this._OnCountDown = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].OnCountDown, false);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("total power:" + this._CurrentPowerNum);
        var upperLimit = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.PowerSystemConfig.UpperLimit;
        var recoveryTime = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.PowerSystemConfig.AutoRecoveryTime;
        var totalPower = (this._CurrentPowerNum < 0) ? _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.PowerSystemConfig.DefaultPowerValue : this._CurrentPowerNum;
        if (totalPower < upperLimit) {
            //离线时间恢复体力
            if (nowTime !== lastTime) {
                var timeSpace = Math.floor((nowTime - lastTime) / 1000);
                timeSpace = timeSpace < 0 ? 0 : timeSpace;
                var getPowerNum = Math.floor(timeSpace / recoveryTime);
                totalPower += getPowerNum;
                totalPower = (totalPower > upperLimit) ? upperLimit : totalPower;
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("timeSpace=" + timeSpace + ", getPowerNum=" + getPowerNum + ",totalPower=" + totalPower);
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].LastPowerAddTimestamp, new Date().getTime());
            }
        }
        this.SetPower(totalPower, _SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["EM_POWER_RECOVERY_TYPE"].None);
    };
    PowerSystem.prototype.SetPower = function (powerNum, type) {
        var _this = this;
        if (_SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.PowerSystemConfig.IsOn === false) {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("PowerSystem is off");
            return;
        }
        var total = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].TotalPowerCounter, 0);
        var lastPowerNum = total;
        //体力上限
        var upperLimit = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.PowerSystemConfig.UpperLimit;
        var recoveryTime = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.PowerSystemConfig.AutoRecoveryTime;
        this._CurrentPowerNum = (powerNum > upperLimit) ? upperLimit : ((powerNum < 0) ? 0 : powerNum);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].TotalPowerCounter, this._CurrentPowerNum);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].LastPowerAddTimestamp, new Date().getTime());
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("setPower-powerUpper:" + upperLimit + ",recoveryTime:" + recoveryTime + ",_CurrentPowerNum:" + this._CurrentPowerNum);
        if (this._CurrentPowerNum < upperLimit) {
            this._CountDownTime = this._CountDownTime == 0 ? recoveryTime : this._CountDownTime;
            _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_2__["default"].AddTimer(this._AutoRecoveryTimerId, 1000, this, null, function () {
                return _this._AddPowerAuto();
            });
            this._OnCountDown = true;
        }
        else {
            _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_2__["default"].RemoveTimer(this._AutoRecoveryTimerId);
            this._OnCountDown = false;
            this._CountDownTime = 0;
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].CountDownPro, this._CountDownTime);
        }
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].OnCountDown, this._OnCountDown);
        var IsHasChanged = (lastPowerNum != this._CurrentPowerNum);
        if (this._CallerPowerChanged && this._ListenOnPowerChanged && IsHasChanged) {
            var powerInfo = new PowerInfo();
            powerInfo.Type = type;
            powerInfo.PowerNum = this._CurrentPowerNum;
            powerInfo.CountDownPro = this._CountDownTime;
            powerInfo.OnCountDown = this._OnCountDown;
            this._CallerPowerChanged && this._ListenOnPowerChanged && this._ListenOnPowerChanged.call(this._CallerPowerChanged, powerInfo);
        }
    };
    PowerSystem.prototype._AddPowerAuto = function () {
        this._CountDownTime -= 1;
        var total = this._CurrentPowerNum;
        if (this._CountDownTime <= 0) {
            total += 1;
            var upperLimit = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.PowerSystemConfig.UpperLimit;
            total = (total > upperLimit) ? upperLimit : ((total < 0) ? 0 : total);
            this.SetPower(total, _SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["EM_POWER_RECOVERY_TYPE"].AutoRecovery);
            if (total === upperLimit) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].CountDownPro, this._CountDownTime);
            var powerInfo = new PowerInfo();
            powerInfo.Type = _SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["EM_POWER_RECOVERY_TYPE"].CountDown;
            powerInfo.PowerNum = total;
            powerInfo.CountDownPro = this._CountDownTime;
            powerInfo.OnCountDown = this._OnCountDown;
            this._CallerPowerChanged && this._ListenOnPowerChanged && this._ListenOnPowerChanged.call(this._CallerPowerChanged, powerInfo);
        }
    };
    PowerSystem.prototype.GetPower = function () {
        var power = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_0__["SDK_VARS"].TotalPowerCounter, 0);
        return power;
    };
    PowerSystem.prototype.ListenOnPowerChange = function (caller, method) {
        this._CallerPowerChanged = caller;
        this._ListenOnPowerChanged = method;
    };
    return PowerSystem;
}());



/***/ }),

/***/ "./sdk/Extensions/Strategy.ts":
/*!************************************!*\
  !*** ./sdk/Extensions/Strategy.ts ***!
  \************************************/
/*! exports provided: Strategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Strategy", function() { return Strategy; });
/* harmony import */ var _Model_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/User */ "./sdk/Model/User.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
/* harmony import */ var _Model_Default__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/Default */ "./sdk/Model/Default.ts");
/* harmony import */ var _framework_Utility_RandomUtility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../framework/Utility/RandomUtility */ "./framework/Utility/RandomUtility.ts");





var Strategy = /** @class */ (function () {
    function Strategy(moduleList, moduleFalseList) {
        var _this = this;
        this._ShareSceneConfig = {};
        this._ShareSceneNames = [];
        this.ModuleFalseList = [];
        this.ModuleList = [];
        this.CurrentShareVideoTypes = [];
        if (moduleList.length > 0) {
            this.ModuleList = [];
            moduleList.forEach(function (element) {
                var newModule = new _Model_User__WEBPACK_IMPORTED_MODULE_0__["ShareVideoModule"]();
                newModule._id = element._id;
                newModule.channel = element.channel;
                newModule.version = element.version;
                newModule.module = element.module;
                newModule.type = element.type;
                newModule.videoNum = element.videoNum;
                newModule.shareNum = element.shareNum;
                newModule.remarks = element.remarks;
                newModule.strategy = element.strategy;
                newModule.loopIndex = 0;
                newModule.logic = element.logicJson && element.logicJson.length > 0 ? JSON.parse(element.logicJson) : null;
                _this.ModuleList.push(newModule);
            });
        }
        if (moduleFalseList.length > 0) {
            this.ModuleFalseList = [];
            moduleFalseList.forEach(function (element) {
                var newModule = new _Model_User__WEBPACK_IMPORTED_MODULE_0__["ShareVideoModuleFalse"]();
                newModule._id = element._id;
                newModule.strategyId = 0;
                newModule.timeId = 0;
                newModule.count = 0;
                newModule.strategies = element.strategyjson.length > 0 ? JSON.parse(element.strategyjson) : null;
                newModule.tips = element.trickJson.length > 0 ? JSON.parse(element.trickJson) : null;
                _this.ModuleFalseList.push(newModule);
            });
        }
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__["SDK_VARS"].ShareConfig, this._ShareSceneConfig);
    }
    Strategy.prototype.ShowShareVideo = function (channel, module, caller, method) {
        var _this = this;
        //先查看是否有缓存记录
        var unuseStrategy = this.getUnUseStrategy(channel, module, false);
        if (unuseStrategy) {
            caller && method && method.call(caller, unuseStrategy.type);
            return;
        }
        if (this.ModuleList && this.ModuleList.length == 0) {
            caller && method && method.call(caller, 0);
            return;
        }
        var bIsHasModule = false; //默认无策略
        this.ModuleList.every(function (element) {
            if (element.channel === channel && element.module === module) {
                if (element.logic) {
                    var unUse = new _Model_User__WEBPACK_IMPORTED_MODULE_0__["UnUseShareVideoModule"]();
                    unUse.channel = element.channel;
                    unUse.module = element.module;
                    bIsHasModule = true;
                    if (element.logic.pe && element.logic.pe.length > 0) {
                        var type = element.logic.pe.shift();
                        unUse.type = type;
                        _this.CurrentShareVideoTypes.push(unUse);
                        caller && method && method.call(caller, type);
                        return false;
                    }
                    else if (element.logic.loop && element.logic.loop.length > 0 && element.logic.time && element.logic.time > 0) {
                        var type = element.logic.loop[element.loopIndex];
                        element.loopIndex += 1;
                        if (element.loopIndex >= element.logic.loop.length) {
                            element.loopIndex = 0;
                            element.logic.time -= 1;
                        }
                        unUse.type = type;
                        _this.CurrentShareVideoTypes.push(unUse);
                        caller && method && method.call(caller, type);
                        return false;
                    }
                }
            }
            return true;
        });
        if (bIsHasModule === false) {
            caller && method && method.call(caller, _SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__["EM_SHARE_TYPE"].None);
        }
    };
    //获取未使用的策略
    Strategy.prototype.getUnUseStrategy = function (channel, module, use) {
        //判断是否存在策略未试用
        if (this.CurrentShareVideoTypes.length > 0) {
            for (var i = 0; i < this.CurrentShareVideoTypes.length; i++) {
                var item = this.CurrentShareVideoTypes[i];
                if (item.channel == channel && item.module == module) {
                    var result = item;
                    if (use) {
                        result = this.CurrentShareVideoTypes.splice(i, 1)[0];
                    }
                    return item;
                }
            }
        }
        return null;
    };
    //使用视频分享策略
    Strategy.prototype.UseShareVideoStrategy = function (channel, module, caller, method) {
        var unuseStrategy = this.getUnUseStrategy(channel, module, true);
        if (unuseStrategy) {
            caller && method && method.call(caller, unuseStrategy.type);
            return;
        }
        caller && method && method.call(caller, _SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__["EM_SHARE_TYPE"].None);
    };
    Strategy.prototype.InitShareConfig = function (scene, configs) {
        var me = this;
        if (scene !== "") {
            this._ShareSceneConfig[scene] = configs;
            return;
        }
        configs.forEach(function (element) {
            if (me._ShareSceneConfig[element.scene]) {
                var configList = me._ShareSceneConfig[element.scene];
                var isHasItem = false;
                for (var i = 0, l = configList.length; i < l; i++) {
                    var tmpConfig = configList[i];
                    if (tmpConfig.id == element.id) {
                        isHasItem = true;
                        break;
                    }
                }
                if (!isHasItem) {
                    configList.push(element);
                }
                me._ShareSceneConfig[element.scene] = configList;
            }
            else {
                var tmpList = [];
                tmpList.push(element);
                me._ShareSceneConfig[element.scene] = tmpList;
            }
            if (me._ShareSceneNames.indexOf(element.scene) == -1)
                me._ShareSceneNames.push(element.scene);
        });
    };
    Strategy.prototype.IsHasShareScene = function (scene) {
        var tmpList = this._ShareSceneConfig[scene];
        if (tmpList) {
            return true;
        }
        else {
            return false;
        }
    };
    Strategy.prototype.GetShareSceneConfig = function (scene) {
        return this._ShareSceneConfig[scene];
    };
    /**
     * 随机获取一个分享信息
     */
    Strategy.prototype.GetRandomShareConfig = function () {
      console.warn("YDHW ---GetRandomShareConfig:" + this._ShareSceneNames.length);
        if (this._ShareSceneNames && this._ShareSceneNames.length > 0) {
            var sIndex = Math.random() * this._ShareSceneNames.length;
          let scene = this._ShareSceneNames[sIndex];
          console.warn("YDHW ---GetRandomShareConfig:", scene,this._ShareSceneNames.length);
            if (this._ShareSceneConfig[scene]) {
                var shareConfig = this._ShareSceneConfig[scene];
                if (shareConfig && shareConfig.length > 0) {
                    var index = Math.random() * shareConfig.length;
                    var item = shareConfig[index];
                  console.warn("YDHW ---GetRandomShareConfig:" + JSON.stringify(item));
                    return item;
                }
            }
        }
        return null;
    };
    // GetStrategy(channel:string, module:string,)
    Strategy.prototype.GetShareStrategy = function (channel, module) {
        var _this = this;
        var shareStrategy = null;
        if (this.ModuleFalseList && this.ModuleFalseList.length > 0) {
            if (channel && module && this.ModuleList && this.ModuleList.length > 0) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("getSharingStrategy-channel,module:", channel, module);
                this.ModuleList.every(function (element) {
                    if (element.type && element.channel && element.module && element.channel == channel && element.module == module) {
                        _this.ModuleFalseList.forEach(function (mElement) {
                            if (mElement._id == Number(element.type)) {
                                shareStrategy = mElement;
                                return false;
                            }
                        });
                    }
                    return true;
                });
            }
        }
        return shareStrategy;
    };
    Strategy.prototype.GetShareResult = function (shareAppInfo, caller, method) {
        var shareSuccess = false;
        var shareBackInfo = new _Model_Default__WEBPACK_IMPORTED_MODULE_3__["ShareBackInfo"]();
        var curTime = new Date().getTime();
        var time_space = curTime - shareAppInfo.showTime;
        var sharingStrategy = this.GetShareStrategy(shareAppInfo.channel, shareAppInfo.module); //获取策略
        if (sharingStrategy) {
            var strategyIndex = sharingStrategy.strategyId;
            var strategy = sharingStrategy.strategies[strategyIndex];
            var timeId = sharingStrategy.timeId;
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("假分享策略:[" + strategyIndex + " - " + timeId + "],time_space:" + time_space, JSON.stringify(strategy));
            if (strategy.time && timeId < strategy.time.length) {
                var time_item = strategy.time[timeId];
                var item_prob = strategy.prob[timeId];
                if (time_item && time_item.length > 1) {
                    for (var i = 1; i < time_item.length; i++) {
                        if (time_space >= time_item[i - 1] && time_space <= time_item[i]) {
                            var prob = item_prob[i - 1];
                            shareSuccess = _framework_Utility_RandomUtility__WEBPACK_IMPORTED_MODULE_4__["RandomUtility"].Probability(prob);
                        }
                        else if (i == time_item.length - 1 && time_space > time_item[i]) {
                            var prob = item_prob[i];
                            shareSuccess = _framework_Utility_RandomUtility__WEBPACK_IMPORTED_MODULE_4__["RandomUtility"].Probability(prob);
                        }
                    }
                }
            }
            timeId += 1;
            //
            if (shareSuccess) {
                sharingStrategy.timeId = 0;
                sharingStrategy.count += 1;
                shareBackInfo.IsSuccess = true;
            }
            else {
                if (timeId >= strategy.time.length) {
                    sharingStrategy.timeId = 0;
                    sharingStrategy.count += 1;
                }
                else {
                    sharingStrategy.timeId = timeId;
                }
                shareBackInfo.IsSuccess = false;
                shareBackInfo.IsHasStrategy = true;
                shareBackInfo.Tips = sharingStrategy.tips;
            }
            if (sharingStrategy.count >= strategy.num) {
                //寻找下一组
                sharingStrategy.count = 0;
                sharingStrategy.strategyId = this._GetNextStrategy(sharingStrategy, strategyIndex);
            }
            this._SetSharingStategy(sharingStrategy);
        }
        else {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("真分享(time_space > 3000)?:" + time_space);
            if (time_space > 3000) {
                shareSuccess = true;
            }
            else {
                shareBackInfo.IsSuccess = false;
                shareBackInfo.IsHasStrategy = false;
            }
        }
        caller && method && method.call(caller, shareBackInfo);
    };
    Strategy.prototype._GetNextStrategy = function (mFalseList, strategyId) {
        var nextStrategyId = strategyId + 1;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("nextStrategyId:" + nextStrategyId);
        if (nextStrategyId >= mFalseList.strategies.length) {
            nextStrategyId = 0;
        }
        var strategy = mFalseList.strategies[nextStrategyId];
        if (strategy.num == 0) {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("num:" + strategy.num);
            nextStrategyId = this._GetNextStrategy(mFalseList, nextStrategyId);
        }
        return nextStrategyId;
    };
    //改变分享策略数据
    Strategy.prototype._SetSharingStategy = function (sStrategy) {
        for (var i = 0; i < this.ModuleFalseList.length; i++) {
            var element = this.ModuleFalseList[i];
            if (element._id && sStrategy._id) {
                this.ModuleFalseList[i] = sStrategy;
                break;
            }
        }
    };
    Strategy.prototype.GetDeepMisTouch = function (customNumber) {
        if (_SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.SwitchTouch === false)
            return false;
        if (_SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.DeveloperAccountConfig.IsOn && _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.DeveloperAccountConfig.Accounts.length > 0) {
            //白名单开关打开，判断account是否在白名单中
            var accountList = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.DeveloperAccountConfig.Accounts;
            for (var i = 0; i < accountList.length; i++) {
                if (accountList[i] == _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.AccountId + "") {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("In whiteList:" + accountList[i]);
                    return true;
                }
            }
        }
        ;
        if (this._IsHasMistouchTimer()) {
            return this._IsDepthShield(customNumber);
        }
        return false;
    };
    Strategy.prototype._IsHasMistouchTimer = function () {
        if (_SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.TimingMisTouchSwitchConfig) {
            if (!_SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.TimingMisTouchSwitchConfig.IsOn)
                return true;
            var mistouchTimer = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.TimingMisTouchSwitchConfig;
            var startTimeHour = mistouchTimer.StartTimeHour || 0;
            var startTimeMinute = mistouchTimer.StartTimeMinute || 0;
            var endTimeHour = mistouchTimer.EndTimeHour || 23;
            var endTimeMinute = mistouchTimer.EndTimeMinute || 59;
            //当前时间
            var nowDate = new Date();
            var misNThours = nowDate.getHours();
            var misNTminutes = nowDate.getMinutes();
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("checkMistouchTimer- " + startTimeHour + ":" + startTimeMinute + " > " + misNThours + ":" + misNTminutes + " < " + endTimeHour + ":" + endTimeMinute);
            var inTime = !((misNThours < startTimeHour || (misNThours == startTimeHour && misNTminutes <= startTimeMinute)) || (misNThours > endTimeHour || (misNThours == endTimeHour && misNTminutes >= endTimeMinute)));
            return !inTime;
        }
        return false;
    };
    Strategy.prototype._IsDepthShield = function (customNumber) {
        if (_SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.DeepSheildRuleConfig) {
            var description = '_IsDepthShield-';
            var depthShield = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.DeepSheildRuleConfig;
            var totalCustoms = depthShield.CustomNumberCounter || 0;
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log(description + "depthShield.Type:" + depthShield.Type);
            //0:关闭,1:按对局数,2:按关卡数
            if (depthShield.Type == 0) {
                return !this._IsGoodUser(depthShield);
            }
            else if (depthShield.Type == 1) {
                var TotalCustomNumberCounter = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__["SDK_VARS"].TotalCustomNumberCounter, 0);
                var TodayCustomNumberCounter = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__["SDK_VARS"].TodayCustomNumberCounter, 0);
                //按对局数
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("TotalCustomNumberCounter > totalCustoms: " + TotalCustomNumberCounter + " > " + depthShield.CustomNumberCounter);
                if (!depthShield.CustomNumberCounter || TotalCustomNumberCounter > depthShield.CustomNumberCounter) {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("toalByTodayNum > dayCustoms: " + TodayCustomNumberCounter + " > " + depthShield.DayCustomNumber[0]);
                    if (!depthShield.CustomNumberCounter || TodayCustomNumberCounter > depthShield.DayCustomNumber[0]) {
                        return !this._IsGoodUser(depthShield);
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else if (depthShield.Type == 2) {
                //按关卡数
                //玩家传入的关卡数 customNum == totalCustoms 或者  totalCustoms 开始每间隔 depthShield.dayCustoms[0]关
                if (customNumber || customNumber === 0) {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("customNum >= totalCustoms: " + customNumber + " >= " + totalCustoms);
                    if (customNumber >= totalCustoms) {
                        if (!depthShield.DayCustomNumber || depthShield.DayCustomNumber.length == 0) {
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("depthShield.dayCustoms is null or empty");
                            return false;
                        }
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log(customNumber + " == " + totalCustoms + " || ((" + customNumber + " > " + totalCustoms + ") && ((" + customNumber + " - " + totalCustoms + ") % (" + depthShield.DayCustomNumber[0] + " + 1)) == 0)");
                        if ((customNumber == totalCustoms) || ((customNumber > totalCustoms) && ((customNumber - totalCustoms) % (depthShield.DayCustomNumber[0] + 1)) == 0)) {
                            return !this._IsGoodUser(depthShield);
                        }
                    }
                }
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("customNum is " + customNumber);
                return false;
            }
        }
    };
    //检测优质用户
    Strategy.prototype._IsGoodUser = function (depthShield) {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("_IsGoodUser:" + depthShield.ExecellentUserSwitch);
        var isGoods = true;
        if (depthShield.ExecellentUserSwitch) {
            if (depthShield.WatchVideoCounter || depthShield.WatchVideoCounter === 0) {
                var TodayWatchVideoCounter = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__["SDK_VARS"].TodayWatchVideoCounter);
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("isGoodUser--" + TodayWatchVideoCounter + " > " + depthShield.WatchVideoCounter);
                isGoods = (TodayWatchVideoCounter > depthShield.WatchVideoCounter);
            }
        }
        return isGoods;
    };
    Strategy.prototype.IsUnlockVideo = function (index) {
        var unlock = false;
        if (_SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.VideoUnlockLevelConfig) {
            var customNumber = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.VideoUnlockLevelConfig.CustomNumber || 0;
            var intervalCount = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.VideoUnlockLevelConfig.IntervalCount || 0;
            if (_SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.VideoUnlockLevelConfig.IsOn) {
                if ((index == customNumber) || ((index > customNumber) && ((index - customNumber) % (intervalCount + 1)) == 0)) {
                    //判断是否有看视频解锁过该关卡
                    var unlockLevelNumberList = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__["SDK_VARS"].ListUnlockVideoLevelNumber, []);
                    if (unlockLevelNumberList && unlockLevelNumberList.length > 0) {
                        unlockLevelNumberList.forEach(function (element) {
                            if (index == element) {
                                unlock = true;
                            }
                        });
                    }
                }
                else {
                    unlock = true;
                }
            }
            else {
                unlock = true;
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("视频解锁关卡开关-关闭,开启所有关卡");
            }
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Log("IsUnlockVideo-index:" + index + " customNumber:" + customNumber + " intervalCount=" + intervalCount + " unlock=" + unlock);
        }
        return unlock;
    };
    return Strategy;
}());



/***/ }),

/***/ "./sdk/Extensions/YDHWCache.ts":
/*!*************************************!*\
  !*** ./sdk/Extensions/YDHWCache.ts ***!
  \*************************************/
/*! exports provided: YDHWCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YDHWCache", function() { return YDHWCache; });
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
/* harmony import */ var _Model_Default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Model/Default */ "./sdk/Model/Default.ts");



var YDHWCache = /** @class */ (function () {
    function YDHWCache() {
        this.JumpOutInfo = null;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Instance.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_VARS"].JumpOutInfo, new _Model_Default__WEBPACK_IMPORTED_MODULE_2__["JumpOutInfo"]());
    }
    YDHWCache.prototype.RemoveItemFrom = function (appid) {
        var jumpOutInfo = _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Instance.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_VARS"].JumpOutInfo, null);
        //点击并确认跳转某个icon后，当日（可调整）隐藏对应appid的所有icon（开启内部标识的icon不受此功能影响）
        if (_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Commerce.ListBoxConfig && _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Commerce.ListBoxConfig.length > 0 && _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Commerce.SideBoxCount < _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Commerce.ListBoxConfig.length) {
            for (var i = 0; i < _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Commerce.ListBoxConfig.length; i++) {
                var item = _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Commerce.ListBoxConfig[i];
                if (item.toAppid === appid && item.innerStatus == 0) {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Commerce.Log("隐藏对应appid的所有icon--id:" + item._id);
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Commerce.ListBoxConfig.splice(i, 1);
                    var hasItem = false;
                    for (var j = 0; j < jumpOutInfo.List.length; j++) {
                        if (jumpOutInfo.List[j].appid == appid) {
                            hasItem = true;
                        }
                    }
                    if (!hasItem) {
                        jumpOutInfo.List.push(new _Model_Default__WEBPACK_IMPORTED_MODULE_2__["AppInfo"](appid));
                    }
                    jumpOutInfo.Date = new Date().getTime();
                }
            }
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Instance.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_VARS"].JumpOutInfo, jumpOutInfo);
        }
    };
    return YDHWCache;
}());



/***/ }),

/***/ "./sdk/Manager/AgentMgr.ts":
/*!*********************************!*\
  !*** ./sdk/Manager/AgentMgr.ts ***!
  \*********************************/
/*! exports provided: AgentMgr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgentMgr", function() { return AgentMgr; });
/* harmony import */ var _framework_Manager_AgentManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/Manager/AgentManager */ "./framework/Manager/AgentManager.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Base/SDKPlatform */ "./sdk/Base/SDKPlatform.ts");
/* harmony import */ var _Assist_Log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Assist/Log */ "./sdk/Assist/Log.ts");
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var AgentMgr = /** @class */ (function (_super) {
    __extends(AgentMgr, _super);
    function AgentMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentMgr.prototype.Initialize = function () {
        var _this = this;
        _super.prototype.Initialize.call(this);
        this._UrlEdit = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("用户信息更新")
            .Category("user")
            .Router("info")
            .Append("edit")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Edit, this, function (request, caller, method) {
            _this._UrlEdit.AsPost().Post(request).OnReceive(_this, function (response) {
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("MyInfo Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlMyInfo = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("服务端信息")
            .Category("user")
            .Router("my")
            .Append("info")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].MyInfo, this, function (caller, method) {
            _this._UrlMyInfo.AsGet().OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("MyInfo Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlLogin = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("用户登录")
            .Category("user")
            .Router("login")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Login, this, function (request, caller, method, onFailed) {
            _this._UrlLogin.AsPost().Post(request).OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Login 错误:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && onFailed && onFailed.call(caller);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this.Debug("Edit Url=" + this._UrlEdit.CheckValue());
        this.Debug("MyInfo Url=" + this._UrlMyInfo.CheckValue());
        this.Debug("Login Url=" + this._UrlLogin.CheckValue());
    };
    return AgentMgr;
}(_framework_Manager_AgentManager__WEBPACK_IMPORTED_MODULE_0__["AgentManager"]));



/***/ }),

/***/ "./sdk/Manager/ApiMgr.ts":
/*!*******************************!*\
  !*** ./sdk/Manager/ApiMgr.ts ***!
  \*******************************/
/*! exports provided: ApiMgr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiMgr", function() { return ApiMgr; });
/* harmony import */ var _framework_Manager_ApiManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/Manager/ApiManager */ "./framework/Manager/ApiManager.ts");
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _framework_Define__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../framework/Define */ "./framework/Define.ts");
/* harmony import */ var _Model_Statistic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Model/Statistic */ "./sdk/Model/Statistic.ts");
/* harmony import */ var _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../framework/Utility/TimerUtility */ "./framework/Utility/TimerUtility.ts");
/* harmony import */ var _Assist_Log__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Assist/Log */ "./sdk/Assist/Log.ts");
/* harmony import */ var _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Base/SDKPlatform */ "./sdk/Base/SDKPlatform.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








/**
 * API调用统计管理器
 */
var ApiMgr = /** @class */ (function (_super) {
    __extends(ApiMgr, _super);
    function ApiMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ApiStatisticUploadTimeId = "_ApiStatisticUploadTimeId";
        _this.pendingMsgList = [];
        _this._CurrentCallIndex = 1;
        _this._CounterList = {};
        return _this;
    }
    ApiMgr.prototype.Initialize = function () {
        var _this = this;
        _super.prototype.Initialize.call(this);
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_VARS"].PendingApiCounterList, {}).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_VARS"].BatchID, 0).Store();
        this._UrApiFinal = _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("接口调用统计-强制")
            .Category("statistics")
            .Router("sdk")
            .Append("final")
            .End();
        this._UrlApi = _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("接口调用统计")
            .Category("statistics")
            .Router("sdk")
            .End();
        this.DeclareNotify(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_EVT"].OnFrontend, this, function () {
            _this.getLocalApiCountList();
        });
        this.DeclareNotify(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_EVT"].OnBackend, this, function () {
            if (_this.pendingMsgList.length == 0) {
                return;
            }
            _this.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_VARS"].PendingApiCounterList, _this.pendingMsgList);
            _this.pendingMsgList = [];
        });
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_NET_API"].Statistic_Api, this, function (apiType, platformType) {
            // console.log("Statistic_Api-info:", JSON.stringify(sdksInfo))
        });
        _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_5__["default"].AddTimer(this._ApiStatisticUploadTimeId, 5000, this, null, function () {
            return _this.UploadStatisticSdk(); //return [false:多次触发,true:单次触发定时器]
        });
        var _loop_1 = function () {
            var temp = _SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["COMMERCE_API"][key];
            var tmpEnum = temp;
            this_1.DeclareMethod(tmpEnum, this_1, function (_platform) {
                var batchId = _this.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_VARS"].BatchID);
                var time = new Date().getTime();
                // console.log("YDHW ---ApiMgr-monthd:" + tmpEnum + ",platform:" + _platform+",_CurrentCallIndex:"+this._CurrentCallIndex);
                if (_this._CounterList[tmpEnum]) {
                    _this._CounterList[tmpEnum]++;
                }
                else {
                    _this._CounterList[tmpEnum] = 1;
                }
                var apiInfo = new _Model_Statistic__WEBPACK_IMPORTED_MODULE_4__["SdkInfo"]();
                apiInfo.index = _this._CurrentCallIndex;
                _this._CurrentCallIndex++;
                apiInfo.count = _this._CounterList[tmpEnum];
                apiInfo.name = tmpEnum;
                apiInfo.platform = _this.getPlatformName(_platform);
                apiInfo.time = time;
                apiInfo.wholesaleId = batchId;
                _this.pendingMsgList.push(apiInfo);
            });
        };
        var this_1 = this;
        for (var key in _SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["COMMERCE_API"]) {
            _loop_1();
        }
    };
    /**
     * 上传统计数据
     */
    ApiMgr.prototype.UploadStatisticSdk = function () {
        var _this = this;
        if (this.pendingMsgList.length == 0) {
            return false;
        }
        // SDK.Statistic.InvokeMethod(SDK_NET_API.Statistic_Api, this.pendingMsgList, this, (isOk: boolean): void => {
        //     if (isOk === true) {
        //         this.pendingMsgList = [];
        //     }
        // });
        this._UrlApi.AsPost()
            .Post({
            appid: _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.AppId,
            accountId: _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.AccountId,
            infos: this.pendingMsgList
        }).OnReceive(this, function (response) {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_6__["Log"].Log("Sdk Response=", response);
            if (response.code === 0) {
                _this.pendingMsgList = [];
            }
            else {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_6__["Log"].Error("server say:" + response.info);
                var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_7__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_6__["Log"].Error("Sdk Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                // caller && method && method.call(caller, false);
                _this._UrApiFinal.AsGet()
                    .Param("appid", _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.AppId)
                    .Param("accountId", _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.AccountId)
                    .Param("infos", _this.pendingMsgList)
                    .End()
                    .OnReceive(_this, function (response) {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_6__["Log"].Log("SdkFinal response=", response);
                    if (response.code === 0) {
                        _this.pendingMsgList = [];
                    }
                    else {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_6__["Log"].Error("server say:" + response.info);
                        var descriptor_1 = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_7__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && descriptor_1 && _Assist_Log__WEBPACK_IMPORTED_MODULE_6__["Log"].Error("SdkFinal Error:" + descriptor_1.Description + ",提示:" + descriptor_1.SolutionHint);
                        // caller && method && method.call(caller, false);
                    }
                }).OnError(_this, function (error) {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_6__["Log"].Error("Error=", error);
                }).OnException(_this, function (data) {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_6__["Log"].Error("Exception=", data);
                }).Send();
            }
        }).OnError(this, function (error) {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_6__["Log"].Error("Error=", error);
        }).OnException(this, function (data) {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_6__["Log"].Error("Exception=", data);
        }).Send();
        return false;
    };
    /**
     * 获取平台类型对应的名称
     *
     * @param type 平台类型
     */
    ApiMgr.prototype.getPlatformName = function (type) {
        var platformName = "";
        for (var key in _framework_Define__WEBPACK_IMPORTED_MODULE_3__["EM_PLATFORM_TYPE"]) {
            var value = _framework_Define__WEBPACK_IMPORTED_MODULE_3__["EM_PLATFORM_TYPE"][key];
            if (type == value) {
                platformName = "" + key;
            }
            // console.log("YDHW ------getPlatformName-key:"+key+",value:"+value);
        }
        return platformName;
    };
    /**
     * 读取缓存数据
     */
    ApiMgr.prototype.Restore = function () {
        _super.prototype.Restore.call(this);
        this.getLocalApiCountList();
        this.AddValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_VARS"].BatchID, 1);
        this._CurrentCallIndex = 1;
    };
    /**
     * 获取Api统计本地缓存
     */
    ApiMgr.prototype.getLocalApiCountList = function () {
        var tmpList = this.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_1__["SDK_VARS"].PendingApiCounterList, []);
        if (tmpList.length > 0) {
            this.pendingMsgList = tmpList;
        }
    };
    return ApiMgr;
}(_framework_Manager_ApiManager__WEBPACK_IMPORTED_MODULE_0__["ApiManager"]));



/***/ }),

/***/ "./sdk/Manager/CommerceMgr.ts":
/*!************************************!*\
  !*** ./sdk/Manager/CommerceMgr.ts ***!
  \************************************/
/*! exports provided: CommerceMgr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommerceMgr", function() { return CommerceMgr; });
/* harmony import */ var _framework_Manager_CommerceManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/Manager/CommerceManager */ "./framework/Manager/CommerceManager.ts");
/* harmony import */ var _framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/Assist/StorageAdapter */ "./framework/Assist/StorageAdapter.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _Model_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/User */ "./sdk/Model/User.ts");
/* harmony import */ var _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../framework/Utility/VerifyUtility */ "./framework/Utility/VerifyUtility.ts");
/* harmony import */ var _framework_Utility_Url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../framework/Utility/Url */ "./framework/Utility/Url.ts");
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
/* harmony import */ var _Model_Data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Model/Data */ "./sdk/Model/Data.ts");
/* harmony import */ var _Config_SDKConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Config/SDKConfig */ "./sdk/Config/SDKConfig.ts");
/* harmony import */ var _Model_Default__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Model/Default */ "./sdk/Model/Default.ts");
/* harmony import */ var _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../framework/Utility/TimerUtility */ "./framework/Utility/TimerUtility.ts");
/* harmony import */ var _Extensions_Strategy__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Extensions/Strategy */ "./sdk/Extensions/Strategy.ts");
/* harmony import */ var _Model_Statistic__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Model/Statistic */ "./sdk/Model/Statistic.ts");
/* harmony import */ var _Extensions_YDHWCache__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Extensions/YDHWCache */ "./sdk/Extensions/YDHWCache.ts");
/* harmony import */ var _Extensions_PowerSystem__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Extensions/PowerSystem */ "./sdk/Extensions/PowerSystem.ts");
/* harmony import */ var _framework_Define__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../framework/Define */ "./framework/Define.ts");
/* harmony import */ var _libs_ydhw_ydhw_sdk__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../libs/ydhw/ydhw.sdk */ "./libs/ydhw/ydhw.sdk.ts");
/* harmony import */ var _Extensions_CloudAPI__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../Extensions/CloudAPI */ "./sdk/Extensions/CloudAPI.ts");
/* harmony import */ var _HeartBeatSystem__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./HeartBeatSystem */ "./sdk/Manager/HeartBeatSystem.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};




















var CommerceMgr = /** @class */ (function (_super) {
    __extends(CommerceMgr, _super);
    function CommerceMgr() {
        //内部不爆露的
        // protected _IsMisTouchBannerAd: boolean = false;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Config = null;
        _this._Platform = null;
        _this.Strategy = null;
        _this.Cache = null;
        _this.PowerSystem = null;
        _this.SDKVersion = "3.0.0";
        _this.AppId = "";
        _this.AppKey = "";
        _this.PkgName = "";
        _this.Version = "";
        _this.SceneId = 0;
        _this.SwitchTouch = false;
        _this.SwitchPush = false;
        _this.SwitchLog = false;
        _this.SwitchLogin = false;
        _this.SwitchJump = false;
        _this.SwitchShare = false;
        _this.SwitchVideo = false;
        _this.SwitchEvent = false;
        _this.SwitchLayer = false;
        _this.SwitchResult = false;
        _this.IsLowVersion = false;
        _this.IsRealVersion = false;
        _this.VideoFalseLimit = 0;
        _this.ShareFalseLimit = 0;
        _this.LastLoginTime = 0;
        // ModuleFalseList: ShareVideoModuleFalse[] = [];
        // ModuleList: ShareVideoModule[] = [];
        _this.ListCustomConfig = null;
        _this.ListBoxConfig = null;
        _this.ListLayer = null;
        _this.BannerAdUnitIdList = null; //侧边栏广告
        _this.InterstitialAdUnitIdList = null; //插屏广告
        _this.SpreadAdUnitIdList = null; //开屏广告
        _this.NativeAdUnitIdList = null; //原生广告
        _this.VideoAdUnitIdList = null; //视频广告
        _this.BannerRefreshConfig = null;
        _this.PowerSystemConfig = null;
        _this.VideoUnlockLevelConfig = null;
        _this.DeepSheildRuleConfig = null;
        _this.TimingMisTouchSwitchConfig = null;
        _this.DeveloperAccountConfig = null;
        //BannerAd
        // _BannerAd: any = null;
        _this._LastTimeRefreshBannerAd = 0;
        _this._BannerAdDelayTimerId = "";
        _this._IsSmallBannerAd = false;
        //RewarVideoAd
        _this._UnlockCustomNumber = 0;
        _this._CallerRewardVideoAd = null;
        _this._EvtOnCloseRewardVideoAd = null;
        _this._IsAddPower = false;
        _this._IsRewardVideoAdFinish = false;
        _this._RewardVideoDelayTimerId = "";
        //InterstitialAd
        /**
         * 插屏广告-首次进入游戏展示时间(进入游戏后x秒后才能展示)（秒）
         */
        _this.InterstitialAdFirstShowWaitTime = 0;
        /**
         * 插屏广告-两次展示之间时间间隔（秒）
         */
        _this.InterstitialAdShowTimeInterval = 0;
        _this._LastTimeCreateInterstitialAd = 0;
        //ShareCard
        _this._CurrentShareScene = "";
        _this._CallerShareCardBack = null;
        _this._EvtOnShareCardBack = null;
        _this._ShareAppInfo = null;
        _this.SideBoxCount = 20;
        _this._LastPlayTime = new Date().getTime();
        _this._showShare = false;
        _this._showVideoAd = false;
        _this._showInterstitialAd = false;
        _this._interstitialAdWaitShow = false;
        _this._needShowBannerAd = false; //需要展示Banner 
        _this._isShowBannerAd = false; //已经展示Banner
        _this._showMoreGameView = false;
        _this._bannerId = "";
        _this._GridId = "";
        _this._localLayerList = null;
        //屏幕适配(魅族)
        _this._ResolutionWidth = 0;
        _this._resolutionHeight = 0;
        _this._ScaleType = 0;
        _this._hasHide = false; //是否回到后台
        _this._onShow = null;
        _this._onHide = null;
        _this._onError = null;
        return _this;
    }
    CommerceMgr.prototype._InnerLogin = function (caller, method) {
        var _this = this;
        this._Platform.IsDebug && console.log("CommerceMgr InnerLogin()");
        this._LastTimeCreateInterstitialAd = new Date().getTime();
        // 获取网络状态
        this._Platform.GetNetworkType(this, function (netType) {
            _this._Platform.NetType = netType;
            _this._Platform.IsDebug && console.log("GetNetworkType = ", netType);
        });
        var request = new _Model_User__WEBPACK_IMPORTED_MODULE_3__["LoginRequest"]();
        request.platform = this._Platform.PlatformType + "";
        request.appid = this.AppId;
        request.version = this.Version;
        request.code = this.Code;
        request.pkgName = this.PkgName;
        var shareInfo = this.ShareInfo();
        this._Platform.IsDebug && console.log("shareInfo=", shareInfo);
        console.warn("YDHW -----shareInfo:" + JSON.stringify(shareInfo));
        request.shareInfo = shareInfo;
        var clientInfo = new _Model_User__WEBPACK_IMPORTED_MODULE_3__["ClientInfo"]();
        clientInfo.uuid = "";
        clientInfo.platform = this._Platform.PlatformType + "";
        clientInfo.brand = this._Platform.Brand;
        clientInfo.version = this.SDKVersion;
        clientInfo.model = this._Platform.Model;
        clientInfo.appName = this._Platform.AppName;
        clientInfo.resolution = this._Platform.Resolution;
        request.clientInfo = clientInfo;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Login, request, this, function (result) {
            _this._Platform.IsDebug && console.log("login result:", result);
            _this.AccountId = result.accountId;
            _this.NickName = result.nickName || "";
            _this.AvatarUrl = result.avatarUrl || "";
            _this.IsNewPlayer = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.newPlayer);
            _this.OpenID = result.openid || "";
            _this.AccountPass = result.accountPass || "";
            _framework_Utility_Url__WEBPACK_IMPORTED_MODULE_5__["Url"].SetAllUrlAccountPass(_this.AccountPass);
            if (_this.IsNewPlayer === true) {
                //todo:something
            }
            _this.SwitchTouch = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.switchTouch) || false;
            _this.SwitchPush = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.switchPush) || false;
            _this.SwitchLog = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.switchLog) || false;
            _this.SwitchLogin = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.switchLogin) || false;
            _this.SwitchJump = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.switchJump) || false;
            _this.SwitchShare = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.switchShare) || false;
            _this.SwitchVideo = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.switchVideo) || false;
            _this.SwitchEvent = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.switchEvent) || false;
            _this.SwitchLayer = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.switchLayer) || false;
            _this.SwitchResult = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.switchResult) || false;
            _this.IsLowVersion = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.isLowVersion) || false;
            _this.IsRealVersion = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(result.isRealVersion) || false;
            _this.VideoFalseLimit = result.videoFalseLimit || 0;
            _this.ShareFalseLimit = result.shareFalseLimit || 0;
            var moduleFalseList = result.moduleFalseList || [];
            var moduleList = result.moduleList || [];
            _this.Strategy = new _Extensions_Strategy__WEBPACK_IMPORTED_MODULE_11__["Strategy"](moduleList, moduleFalseList);
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Config, _this, function (result) {
                result.forEach(function (element) {
                    var tmpList = JSON.parse(element.value);
                    if (element.code == "b_t_s") { //banner定时刷新配置
                        _this.BannerRefreshConfig = new _Model_Data__WEBPACK_IMPORTED_MODULE_7__["BannerRefreshConfig"]();
                        _this.BannerRefreshConfig.IsOn = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(tmpList[0]);
                        _this.BannerRefreshConfig.Interval = tmpList[1] || 10;
                        _this.BannerRefreshConfig.IsForceRefresh = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(tmpList[2]);
                        _this.BannerRefreshConfig.MinimumInterval = tmpList[3] || 3;
                    }
                    else if (element.code == "power") { //体力系统
                        _this.PowerSystemConfig = new _Model_Data__WEBPACK_IMPORTED_MODULE_7__["PowerSystemConfig"]();
                        _this.PowerSystemConfig.DefaultPowerValue = tmpList[0] || 5;
                        _this.PowerSystemConfig.UpperLimit = tmpList[1] || 5;
                        _this.PowerSystemConfig.AutoRecoveryTime = tmpList[2] || 300;
                        _this.PowerSystemConfig.VideoPowerWeight = tmpList[3] || 1;
                        _this.PowerSystemConfig.IsOn = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(tmpList[4]);
                    }
                    else if (element.code == "v_u_c") { //视频解锁关卡
                        _this.VideoUnlockLevelConfig = new _Model_Data__WEBPACK_IMPORTED_MODULE_7__["VideoUnlockLevelConfig"]();
                        _this.VideoUnlockLevelConfig.IsOn = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(tmpList[0]);
                        _this.VideoUnlockLevelConfig.CustomNumber = tmpList[1] || 2;
                        _this.VideoUnlockLevelConfig.IntervalCount = tmpList[2] || 0;
                    }
                    else if (element.code == "dp_s") { //深度屏蔽开关
                        _this.DeepSheildRuleConfig = new _Model_Data__WEBPACK_IMPORTED_MODULE_7__["DeepSheildRuleConfig"]();
                        _this.DeepSheildRuleConfig.Type = tmpList[0] || 0;
                        _this.DeepSheildRuleConfig.CustomNumberCounter = tmpList[1] || 5;
                        _this.DeepSheildRuleConfig.ExecellentUserSwitch = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(tmpList[2]);
                        _this.DeepSheildRuleConfig.WatchVideoCounter = tmpList[3] || 2;
                        _this.DeepSheildRuleConfig.DayCustomNumber = tmpList[4] || 0;
                    }
                    else if (element.code == "m_t") { //定时器开关误触
                        _this.TimingMisTouchSwitchConfig = new _Model_Data__WEBPACK_IMPORTED_MODULE_7__["TimingMisTouchSwitchConfig"]();
                        _this.TimingMisTouchSwitchConfig.IsOn = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(tmpList[0]);
                        _this.TimingMisTouchSwitchConfig.StartTimeHour = tmpList[1] || 0;
                        _this.TimingMisTouchSwitchConfig.StartTimeMinute = tmpList[2] || 0;
                        _this.TimingMisTouchSwitchConfig.EndTimeHour = tmpList[3] || 23;
                        _this.TimingMisTouchSwitchConfig.EndTimeMinute = tmpList[4] || 0;
                    }
                    else if (element.code == "d_a") { //开发者账号（白名单
                        _this.DeveloperAccountConfig = new _Model_Data__WEBPACK_IMPORTED_MODULE_7__["DeveloperAccountConfig"]();
                        _this.DeveloperAccountConfig.IsOn = _framework_Utility_VerifyUtility__WEBPACK_IMPORTED_MODULE_4__["VerifyUtility"].ToBoolean(tmpList[0]);
                        for (var i = 1, l = tmpList.length; i < l; i++) {
                            _this.DeveloperAccountConfig.Accounts.push(tmpList[i]);
                        }
                    }
                });
                _this.PowerSystem.Initialize();
                caller && method.call(caller, true);
            });
            // SDK.DataMgr.CustomConfig(this, (result: YDHW.GameBase.ICustomConfigResult): void => {
            //     this.CustomConfig = result;
            //     caller && method.call(caller, true);
            // });
            _this.StatisticDuration();
            _HeartBeatSystem__WEBPACK_IMPORTED_MODULE_18__["HeartBeatSystem"].getInstance().StartUploadTime();
        }, function () {
            caller && method && method.call(caller, false);
        });
        this._Platform.IsDebug && console.log("SDKPlatform InnerLogin() end");
    };
    CommerceMgr.prototype.Initialize = function () {
        _super.prototype.Initialize.call(this);
        this.RefreshLastPlayTime();
        this.Name = "YDHW-SDK:" + this.Name;
        this.Cache = new _Extensions_YDHWCache__WEBPACK_IMPORTED_MODULE_13__["YDHWCache"]();
        this.PowerSystem = new _Extensions_PowerSystem__WEBPACK_IMPORTED_MODULE_14__["PowerSystem"]();
        this.Config = window[_framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__["StorageAdapter"].SDK_CONFIG];
        this.AppId = String(this.Config.appid);
        this.AppKey = String(this.Config.appkey);
        this.PkgName = String(this.Config.pkg_name);
        this.Version = String(this.Config.version);
        this.SwitchLog = this._Platform.IsDebug;
        this.BannerAdUnitIdList = this.Config.banner_ad_unit_id_list;
        this.InterstitialAdFirstShowWaitTime = Number(this.Config.interstitialAd_first_show_wait_time) || 0;
        this.InterstitialAdShowTimeInterval = Number(this.Config.interstitialAd_show_time_interval) || 0;
        this.SideBoxCount = Number(this.Config.side_box_count) || 0;
        if (!this.BannerAdUnitIdList || typeof this.BannerAdUnitIdList == "undefined") {
            this._Platform.IsDebug && console.error("YDHW_CONFIG.banner_ad_unit_id_list not exists");
        }
        this.InterstitialAdUnitIdList = this.Config.interstitial_ad_unit_id_list;
        if (!this.InterstitialAdUnitIdList || typeof this.InterstitialAdUnitIdList == "undefined") {
            this._Platform.IsDebug && console.error("YDHW_CONFIG.interstitial_ad_unit_id_list not exists");
        }
        this.SpreadAdUnitIdList = this.Config.spread_ad_unit_id_list;
        if (!this.SpreadAdUnitIdList || typeof this.SpreadAdUnitIdList == "undefined") {
            this._Platform.IsDebug && console.error("YDHW_CONFIG.spread_ad_unit_id_list not exists");
        }
        this.NativeAdUnitIdList = this.Config.native_ad_unit_id_list;
        if (!this.NativeAdUnitIdList || typeof this.NativeAdUnitIdList == "undefined") {
            this._Platform.IsDebug && console.error("YDHW_CONFIG.native_ad_unit_id_list not exists");
        }
        this.VideoAdUnitIdList = this.Config.video_ad_unit_id_list;
        if (!this.VideoAdUnitIdList || typeof this.VideoAdUnitIdList == "undefined") {
            this._Platform.IsDebug && console.error("YDHW_CONFIG.video_ad_unit_id_list not exists");
        }
        this._ResolutionWidth = Number(this.Config.resolution_width) || 0;
        this._resolutionHeight = Number(this.Config.resolution_height) || 0;
        this._ScaleType = Number(this.Config.scale_type) || 0;
        // console.log("YDHW ---屏幕适配-_ResolutionWidth:"+this._ResolutionWidth);
        // console.log("YDHW ---屏幕适配-_resolutionHeight:"+this._resolutionHeight);
        // console.log("YDHW ---屏幕适配-_ScaleType:"+this._ScaleType);
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TotalPowerCounter, -1).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].LastPowerAddTimestamp, new Date().getTime()).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TodayWatchVideoCounter, 0).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].LastWatchVideoTimestamp, new Date().getTime()).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].ListUnlockVideoLevelNumber, []).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].MaxCustomNumber, 0).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].LastCustomNumber, 0).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TodayCustomNumberCounter, 0).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TotalCustomNumberCounter, 0).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].LastPlayTimestamp, new Date().getTime());
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].ListUnlockVideoLevelNumber, []).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].VideoFalseLimit, 0).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].ShareFalseLimit, 0).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].PlatformUserInfo, null);
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].ListStatisticsLayer, null).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].CountDownPro, 0).Store();
        this.DeclareVariable(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].OnCountDown, false).Store();
        // this._Platform.OnError(this, (res:any) => { 
        //     if(this._onError){
        //         this._onError.caller && this._onError.method && this._onError.method.call(this._onError.caller,res);
        //     }
        //  });
    };
    CommerceMgr.prototype._AddUnlockVideoLevelNumber = function (index) {
        if (!index) {
            return;
        }
        this.AddValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TodayWatchVideoCounter, 1);
        this.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].LastWatchVideoTimestamp, new Date().getTime());
        var list = this.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].ListUnlockVideoLevelNumber, []);
        if (list.indexOf(index) == -1) {
            this.SwitchLog && this.Log("AddUnlockLevelNumber index=" + index);
            list.push(index);
            this.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].ListUnlockVideoLevelNumber, list);
        }
    };
    CommerceMgr.prototype.LoginAddress = function () {
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].LoginAddress, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return "";
    };
    CommerceMgr.prototype.Login = function (caller, method) {
    };
    CommerceMgr.prototype.GetLeftTopBtnPosition = function () {
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetLeftTopBtnPosition, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return null;
    };
    CommerceMgr.prototype.ShareInfo = function () {
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ShareInfo, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return null;
    };
    /**
     *
     * @param type 0:创建,1:加载成功,2:展示,3:点击,4:加载失败
     * @param adId 广告id
     */
    CommerceMgr.prototype.StatisticBanner = function (type, adId) {
        var _this = this;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Banner, type, adId, this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticBanner success type:" + type);
            }
        });
    };
    CommerceMgr.prototype.StatisticVideo = function (type, adId) {
        var _this = this;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Video, type, adId, this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticVideo success type:" + type);
            }
        });
    };
    CommerceMgr.prototype.StatisticInterstitial = function (type, adId) {
        var _this = this;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].InterstitialAd, type, adId, this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticInterstitial success type:" + type);
            }
        });
    };
    CommerceMgr.prototype.StatisticGrid = function (type, adId) {
        var _this = this;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].GridAd, type, adId, this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticGrid success type:" + type);
            }
        });
    };
    CommerceMgr.prototype.StatisticAppBox = function (type, adId) {
        var _this = this;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].AppBoxAd, type, adId, this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticAppBox success type:" + type);
            }
        });
    };
    CommerceMgr.prototype.StatisticBlock = function (type, adId) {
        var _this = this;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].BlockAd, type, adId, this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticBlock success type:" + type);
            }
        });
    };
    CommerceMgr.prototype.StatisticNativeAd = function (type, adId) {
        var _this = this;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].NativeAd, type, adId, this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticNativeAd success type:" + type);
            }
        });
    };
    CommerceMgr.prototype.StatisticErrorStack = function (ErrStack, LogStr, strDate) {
        var _this = this;
        var systemInfo = this._Platform.SystemInfo;
        var clientLogRequest = new _Model_Statistic__WEBPACK_IMPORTED_MODULE_12__["ClientLogRequest"]();
        clientLogRequest.ErrStack = ErrStack;
        clientLogRequest.LogStr = LogStr;
        if (systemInfo) {
            clientLogRequest.appid = this.AppId;
            clientLogRequest.version = this.Version;
            clientLogRequest.language = systemInfo.language;
            clientLogRequest.system = systemInfo.system;
            clientLogRequest.model = systemInfo.model;
            clientLogRequest.brand = systemInfo.brand;
            clientLogRequest.platform = systemInfo.platform;
            clientLogRequest.SDKVersion = this.SDKVersion;
            clientLogRequest.resolution = systemInfo.screenWidth + "x" + systemInfo.screenHeight;
            clientLogRequest.window = systemInfo.windowWidth + "x" + systemInfo.windowHeight;
        }
        clientLogRequest.addDate = strDate;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].ClientLog, clientLogRequest, this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticErrorStack isOk:" + isOk);
            }
        });
    };
    // StatisticSdk(sdksInfo: IYDHW.Statistic.IApiInfo[]): void {
    //     SDK.Statistic.InvokeMethod(SDK_NET_API.Statistic_Api, sdksInfo, this, (isOk: boolean): void => {
    //         if (isOk === true) {
    //             this.Log("StatisticSdk success" );
    //         }
    //     });
    // }
    /**
     *
     * @param details 对象或数组
     */
    CommerceMgr.prototype.StatisticResult = function (details) {
        var _this = this;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Result, details, this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticResult success");
            }
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].StatisticResult, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.StatisticEvent = function (event, scene) {
        var _this = this;
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].StatisticEvent, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common);
        if (this.SwitchEvent === false && scene !== 'LayerOn') {
            //关卡('LayerOn')进入次数统计事件不受事件开关控制
            this.SwitchLog && this.Log("StatisticEvent is stop by SwitchEvent");
            return;
        }
        var request = new _Model_Default__WEBPACK_IMPORTED_MODULE_9__["StatisticEventRequest"]();
        request.event = event;
        request.scene = scene;
        request.time = new Date().getTime();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Event, [request], this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticEvent success");
            }
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].StatisticEvent, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.StatisticDuration = function () {
        var _this = this;
        var nowTime = new Date().getTime();
        var duration = nowTime - this._LastPlayTime;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Duration, 0, duration, this, function (isOk) {
            if (isOk === true) {
                _this._LastPlayTime = nowTime;
                _this.Log("StatisticDuration success");
            }
        });
    };
    CommerceMgr.prototype.StatisticClickOut = function (request) {
        var _this = this;
        if (!request) {
            this.Log("StatisticClickOut request is null");
            return;
        }
        if (!request.iconId) {
            this.Log("StatisticClickOut request.iconId is null");
            return;
        }
        if (!request.action) {
            this.Log("StatisticClickOut request.action is null");
            return;
        }
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].ClickOut, request, this, function (isOk) {
            if (isOk === true) {
                _this.Log("StatisticClickOut success");
            }
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].StatisticClickOut, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.RefreshLastPlayTime = function () {
        this._LastPlayTime = new Date().getTime();
    };
    CommerceMgr.prototype.ShowShareOrVideo = function (channel, module, caller, method) {
        if (!channel) {
            this.Error("channel is null");
            return;
        }
        if (!module) {
            this.Error("module is null");
            return;
        }
        this.Strategy && this.Strategy.ShowShareVideo(channel, module, caller, method);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ShowShareOrVideo, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.UseShareOrVideoStrategy = function (channel, module, caller, method) {
        if (!channel) {
            this.Error("channel is null");
            return;
        }
        if (!module) {
            this.Error("module is null");
            return;
        }
        this.Strategy && this.Strategy.UseShareVideoStrategy(channel, module, caller, method);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].UseShareOrVideoStrategy, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.SwitchView = function (isMisTouched) {
        if (!this._Platform.BannerAd && this.SwitchLog) {
            this.Warn("BannerAd is null");
        }
        else if (this.BannerRefreshConfig && this.BannerRefreshConfig.IsForceRefresh) {
            var nowTime = new Date().getTime();
            var lastTime = this._LastTimeRefreshBannerAd || nowTime;
            var interval = this.BannerRefreshConfig.MinimumInterval || _Config_SDKConfig__WEBPACK_IMPORTED_MODULE_8__["SDKConfig"].DefaultIntervalForceRefreshBannerAd;
            if (nowTime - lastTime >= interval * 1000) {
                // if (this._Platform.IsShowBannerAd && this._IsSmallBannerAd) {
                //     this._CreateBannerAd(this._IsSmallBannerAd, this._Platform.IsMisTouchBannerAd, true, this._Platform.BannerStyle, this._Platform.OnResizeBannerAd, null, null);
                //     this.CreateSmallBannerAd(isMisTouched, true, this, (): void => {
                //     });
                // } else if (this._Platform.IsShowBannerAd) {
                //     this.CreateBannerAd(isMisTouched, true, this, (isOk: boolean): void => {
                //     });
                // } else {
                //     this._LastTimeRefreshBannerAd = nowTime - (this.BannerRefreshConfig.MinimumInterval * 1000 + 1000);
                // }
                if (this._Platform.IsShowBannerAd) {
                    this._CreateBannerAd(this._IsSmallBannerAd, this._Platform.IsMisTouchBannerAd, true, this._Platform.BannerStyle, this._Platform.OnResizeBannerAd, null, null);
                }
                else {
                    this._LastTimeRefreshBannerAd = nowTime - (this.BannerRefreshConfig.MinimumInterval * 1000 + 1000);
                }
            }
        }
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].SwitchView, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.GetDeepTouchInfo = function (customNumber) {
        var strategy = this.Strategy && this.Strategy.GetDeepMisTouch(customNumber);
        if (this.SwitchLog)
            this.Log("GetDeepTouchInfo:", strategy, customNumber);
        var deepTouchInfo = new _Model_Default__WEBPACK_IMPORTED_MODULE_9__["DeepTouchInfo"]();
        deepTouchInfo.deepTouch = strategy ? true : false;
        if (this.ListCustomConfig && this.ListCustomConfig.length > 0) {
            this.ListCustomConfig.forEach(function (element) {
                if (!strategy) {
                    if (parseInt(element.type) == 1) {
                        element.value = "";
                    }
                    else if (parseInt(element.type) == 2) {
                        element.value = "0";
                    }
                }
                deepTouchInfo.ListCustomInfo.push(element);
            });
        }
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetDeepTouchInfo, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return deepTouchInfo;
    };
    CommerceMgr.prototype.GetCustomConfig = function (caller, method) {
        var _this = this;
        if (this.ListCustomConfig) {
            caller && method && method.call(caller, this.ListCustomConfig);
        }
        else {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Data.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].CustomConfig, this, function (result) {
                _this.ListCustomConfig = result;
                //误触开关关闭且item的switchTouchUse == 1的情况下将type==1的值设为空串，type==2的值设为false
                if (!_SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.SwitchTouch) {
                    _this.ListCustomConfig.forEach(function (element) {
                        if (parseInt(element.switchTouchUse) == 1) {
                            if (parseInt(element.type) == 1) {
                                element.value = "";
                            }
                            else if (parseInt(element.type) == 2) {
                                element.value = "0";
                            }
                        }
                    });
                }
                caller && method && method.call(caller, _this.ListCustomConfig);
            });
        }
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetCustomConfig, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.GameOver = function (index) {
        this.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].LastCustomNumber, index);
        var maxCustomNumber = this.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].MaxCustomNumber, 0);
        if (index > maxCustomNumber) {
            this.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].MaxCustomNumber, index);
        }
        this.AddValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TodayCustomNumberCounter, 1);
        this.AddValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TotalCustomNumberCounter, 1);
        this.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].LastPlayTimestamp, new Date().getTime());
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GameOver, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    /**
     * 视频解锁
     * @param index
     */
    CommerceMgr.prototype.IsUnlockVideo = function (index) {
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].IsUnlockVideo, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return this.Strategy && this.Strategy.IsUnlockVideo(index);
    };
    /**
     * 获取体力信息
     */
    CommerceMgr.prototype.GetPowerInfo = function () {
        // SDK.Data.InvokeMethod(SDK_NET_API.Config, this, (result:YDHW.GameBase.IConfig[]):void => {
        // });
        if (!this.PowerSystemConfig) {
            this.Error("GetPowerInfo error: PowerInfo is null");
            return null;
        }
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetPowerInfo, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return this.PowerSystemConfig;
    };
    CommerceMgr.prototype.ListenOnPowerChanged = function (caller, method) {
        this.PowerSystem.ListenOnPowerChange(caller, method);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ListenOnPowerChanged, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.AddPower = function (type) {
        if (!this.PowerSystemConfig || this.PowerSystemConfig.IsOn === false) {
            this.SwitchLog && this.Warn("Power System is Off");
            return;
        }
        if (this.PowerSystemConfig) {
            var total = _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TotalPowerCounter, 0);
            var power = this.PowerSystemConfig.VideoPowerWeight;
            if (type == _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_POWER_RECOVERY_TYPE"].WatchVideo) {
                total += power;
            }
            else if (type == _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_POWER_RECOVERY_TYPE"].AutoRecovery) {
                total += 1;
            }
            this.PowerSystem && this.PowerSystem.SetPower(total, type);
        }
    };
    CommerceMgr.prototype.SetPower = function (power, type) {
        if (!this.PowerSystemConfig || this.PowerSystemConfig.IsOn === false) {
            this.SwitchLog && this.Warn("Power System is Off");
            return;
        }
        this.PowerSystem && this.PowerSystem.SetPower(power, type);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].SetPower, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.GetPower = function () {
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetPower, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return this.PowerSystem && this.PowerSystem.GetPower();
    };
    CommerceMgr.prototype.GetSideBox = function (caller, method) {
        var _this = this;
        if (this.ListBoxConfig) {
            caller && method && method.call(caller, this.ListBoxConfig);
        }
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Data.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].SideBox, this, function (result) {
            _this.ListBoxConfig = result;
            caller && method && method.call(caller, _this.ListBoxConfig);
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetSideBox, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.GetScoreBoardList = function (caller, method) {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Data.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].ScoreBoard, "scoreboard", caller, method);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetScoreBoardList, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.GetScoreBoardAward = function (id, caller, method) {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Data.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].GetBoardAward, "scoreboard", id, caller, method);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetScoreBoardAward, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.ShareCard = function (scene, caller, method) {
        var _this = this;
        this._CurrentShareScene = (scene !== "") ? scene : "default";
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Data_ShareCard, scene, this, function (result) {
            _this.Strategy.InitShareConfig(scene, result);
            caller && method && method.call(caller, result);
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ShareCard, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.GetTodayBoutCount = function () {
        var counter = this.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TodayCustomNumberCounter, 0);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetTodayBoutCount, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return counter;
    };
    CommerceMgr.prototype.GetTotalBoutCount = function () {
        var counter = this.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TotalCustomNumberCounter, 0);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetTotalBoutCount, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return counter;
    };
    CommerceMgr.prototype.GetLastBountNumber = function () {
        var index = this.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].LastCustomNumber, 0);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetLastBountNumber, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return index;
    };
    CommerceMgr.prototype.GetMaxBountNumber = function () {
        var index = this.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].MaxCustomNumber, 0);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetMaxBountNumber, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return index;
    };
    CommerceMgr.prototype.GetTodayWatchVideoCounter = function () {
        var counter = this.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].TodayWatchVideoCounter, 0);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetTodayWatchVideoCounter, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return counter;
    };
    CommerceMgr.prototype._CreateBannerAd = function (isSmall, isMisTouch, isShow, style, caller, method, onResize) {
        var _this = this;
        if (!this.BannerAdUnitIdList || this.BannerAdUnitIdList.length == 0) {
            this.Error("BannerAdUnitIdList is empty.");
        }
        else {
            if (this._Platform.BannerAd) {
                this._Platform.DestroyBannerAd();
                this._Platform.IsShowBannerAd = false;
            }
            var me_1 = this;
            this._needShowBannerAd = true;
            var index = Math.floor(Math.random() * this.BannerAdUnitIdList.length);
            var adId_1 = this.BannerAdUnitIdList[index];
            this._Platform.CreateBannerAd(isSmall, adId_1, isMisTouch, style, this, onResize);
            this.StatisticBanner(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].CREATE, adId_1);
            this._bannerId = adId_1;
            //是否定时刷新banner
            var isOn_1 = this.BannerRefreshConfig && this.BannerRefreshConfig.IsOn;
            if (isOn_1) {
                this._IsSmallBannerAd = isSmall;
            }
            this._Platform.BannerAd.onLoad(function () {
                me_1.Log("BannerAd onLoad");
                me_1.StatisticBanner(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].LOAD_SUCCESS, adId_1);
                if (isShow && me_1._needShowBannerAd)
                    me_1.ShowBannerAd();
                caller && method && method.call(caller, true);
            });
            this._Platform.BannerAd.onError(function (error) {
                me_1.StatisticBanner(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].LOAD_FAIL, adId_1);
                me_1.Warn("BannerAd onError:", error);
                _this._Platform.DestroyBannerAd();
                _this._needShowBannerAd = false;
                _this._Platform.IsShowBannerAd = false;
                if (isOn_1) {
                    var delay = me_1.BannerRefreshConfig.Interval;
                    if (me_1.SwitchLog) {
                        me_1.Log("\u5C06\u5728" + delay + "\u79D2\u540E\u91CD\u65B0\u521B\u5EFAbanner(\u8C03\u7528ylBannerAdHide\u4F1A\u53D6\u6D88\u91CD\u8BD5");
                    }
                    _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_10__["default"].RemoveDelayTimer(me_1._BannerAdDelayTimerId);
                    me_1._BannerAdDelayTimerId = _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_10__["default"].Delay(delay * 1000, me_1, function () {
                        me_1._CreateBannerAd(isSmall, isMisTouch, isShow, style, onResize, caller, method); //延迟刷新banner
                    });
                    caller && method && method.call(caller, false);
                }
            });
        }
    };
    CommerceMgr.prototype.CreateBannerAd = function (isMisTouch, isShow, caller, method) {
        this._Platform.BannerStyle = null;
        this._CreateBannerAd(false, isMisTouch, isShow, null, caller, method, null);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].CreateBannerAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.CreateSmallBannerAd = function (isMisTouch, isShow, caller, method) {
        this._Platform.BannerStyle = null;
        this._CreateBannerAd(true, isMisTouch, isShow, null, caller, method, null);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].CreateSmallBannerAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.CreateCustomBannerAd = function (isMisTouch, isShow, style, caller, method, onResize) {
        this._Platform.BannerStyle = style;
        this._CreateBannerAd(false, isMisTouch, isShow, style, caller, method, onResize);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].CreateCustomBannerAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.BannerAdChangeSize = function (style) {
        this._Platform.ChangeBannerStyle(style);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].BannerAdChangeSize, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.ShowBannerAd = function () {
        var _this = this;
        if (this.SwitchLog) {
            this.Log("ShowBannerAd");
        }
        var nowTime = new Date().getTime();
        var last = this._LastTimeRefreshBannerAd || nowTime;
        var isSmall = false;
        var IsOn = false;
        var interval = 0;
        var create = false; //是否走创建banner流程
        if (this.BannerRefreshConfig) {
            IsOn = this.BannerRefreshConfig.IsOn || false;
            interval = this.BannerRefreshConfig.Interval || _Config_SDKConfig__WEBPACK_IMPORTED_MODULE_8__["SDKConfig"].DefaultIntervalForceRefreshBannerAd;
        }
        if (this._Platform.BannerAd) {
            if (IsOn) {
                isSmall = this._IsSmallBannerAd || false;
            }
            var isRefresh = ((nowTime - last) >= _Config_SDKConfig__WEBPACK_IMPORTED_MODULE_8__["SDKConfig"].DefaultIntervalForceRefreshBannerAd * 1000);
            if (IsOn && isRefresh) {
                //到时间定时更新banner
                if (this.SwitchLog) {
                    this.Log("ShowBannerAd CreateBannerAd");
                }
                create = true;
                this._CreateBannerAd(isSmall, this._Platform.IsMisTouchBannerAd, true, this._Platform.BannerStyle, this._Platform.OnResizeBannerAd, null, null);
            }
            if (!create) {
                this._Platform.SetBannerVisible(true);
                this._needShowBannerAd = false;
            }
            this._LastTimeRefreshBannerAd = nowTime;
        }
        if (!create && IsOn) {
            if (this.SwitchLog) {
                this.Log("\u5C06\u5728" + interval + "\u79D2\u540E\u91CD\u65B0\u521B\u5EFAbanner");
            }
            _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_10__["default"].RemoveDelayTimer(this._BannerAdDelayTimerId);
            this._BannerAdDelayTimerId = _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_10__["default"].Delay(interval * 1000, this, function () {
                if (_this._Platform.IsShowBannerAd)
                    _this._CreateBannerAd(isSmall, _this._Platform.IsMisTouchBannerAd, true, _this._Platform.BannerStyle, _this._Platform.OnResizeBannerAd, null, null); //延迟刷新banner
            });
        }
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ShowBannerAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.HideBannerAd = function () {
        if (this.SwitchLog) {
            this.Log("HideBannerAd");
        }
        this._Platform.SetBannerVisible(false);
        this._needShowBannerAd = false;
        _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_10__["default"].RemoveDelayTimer(this._BannerAdDelayTimerId);
        this._BannerAdDelayTimerId = "";
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].HideBannerAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.ChangeBannerStyle = function (style) {
        this._Platform.ChangeBannerStyle(style);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ChangeBannerStyle, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ChangeBannerStyle, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.CreateRewardVideoAd = function () {
        var _this = this;
        if (!this.VideoAdUnitIdList || this.VideoAdUnitIdList.length == 0) {
            this.Error("VideoAdUnitIdList is empty.");
        }
        else if (!this._Platform.RewardVideoAd) {
            var me_2 = this;
            var index = Math.floor(Math.random() * this.VideoAdUnitIdList.length);
            var adId_2 = this.VideoAdUnitIdList[index];
            this._Platform.CreateRewardVideoAd(adId_2, this, function () {
                me_2._IsRewardVideoAdFinish = true;
                _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_10__["default"].RemoveDelayTimer(me_2._RewardVideoDelayTimerId);
                me_2._RewardVideoDelayTimerId = "";
                _this.StatisticVideo(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].LOAD_SUCCESS, adId_2);
            }, function (result) {
                me_2._LastTimeCreateInterstitialAd = new Date().getTime();
                if (result && result.isEnded || result === undefined) {
                    if (me_2.SwitchLog) {
                        me_2.Log("视频播放完成");
                    }
                    me_2._CallerRewardVideoAd && me_2._EvtOnCloseRewardVideoAd && me_2._EvtOnCloseRewardVideoAd.call(me_2._CallerRewardVideoAd, _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_VIDEO_PLAY_TYPE"].VIDEO_PLAY_FINISH);
                    me_2._AddUnlockVideoLevelNumber(me_2._UnlockCustomNumber);
                    me_2.StatisticVideo(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].PLAY_FINISH, adId_2);
                    if (me_2._IsAddPower) {
                        me_2._AddPowerByVideo();
                    }
                }
                else { //播放中途退出
                    me_2._CallerRewardVideoAd && me_2._EvtOnCloseRewardVideoAd && me_2._EvtOnCloseRewardVideoAd.call(me_2._CallerRewardVideoAd, _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_VIDEO_PLAY_TYPE"].VIDEO_PLAY_CANCEL);
                    me_2.SwitchLog && me_2.Log("视频播放中途取消");
                    _this.StatisticVideo(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].PLAY_CANCEL, adId_2);
                }
                me_2._UnlockCustomNumber = null;
                me_2._EvtOnCloseRewardVideoAd = null;
                me_2._showVideoAd = false;
            }, function (error) {
                me_2.SwitchLog && me_2.Log("RewardVideoAd onError:", error);
                _this.StatisticVideo(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].LOAD_FAIL, adId_2);
                me_2._CallerRewardVideoAd && me_2._EvtOnCloseRewardVideoAd && me_2._EvtOnCloseRewardVideoAd.call(me_2._CallerRewardVideoAd, _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_VIDEO_PLAY_TYPE"].VIDEO_PLAY_FAIL);
                me_2._EvtOnCloseRewardVideoAd = null;
                me_2._UnlockCustomNumber = null;
                me_2._showVideoAd = false;
                me_2._LastTimeCreateInterstitialAd = new Date().getTime();
            });
            this.StatisticVideo(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].CREATE, adId_2);
        }
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].CreateRewardVideoAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.ShowRewardVideoAd = function (unlockCustomNumber, isAddPower, caller, onClose) {
        var _this = this;
        var me = this;
        this._IsRewardVideoAdFinish = false;
        this._UnlockCustomNumber = unlockCustomNumber;
        this._CallerRewardVideoAd = caller;
        this._EvtOnCloseRewardVideoAd = onClose;
        this._IsAddPower = isAddPower || false;
        if (!this._Platform.RewardVideoAd) {
            this.CreateRewardVideoAd();
            if (!this._Platform.RewardVideoAd) {
                return;
            }
        }
        this._Platform.ShowRewardVideoAd(this, function () {
            me.SwitchLog && me.Log("视频播放成功");
            me._showVideoAd = true;
            me._IsRewardVideoAdFinish = true;
            _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_10__["default"].RemoveDelayTimer(me._RewardVideoDelayTimerId);
            me._RewardVideoDelayTimerId = "";
        }, function () {
            me.SwitchLog && me.Error("视频播放失败");
            me._CallerRewardVideoAd && me._EvtOnCloseRewardVideoAd && me._EvtOnCloseRewardVideoAd.call(me._CallerRewardVideoAd, _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_VIDEO_PLAY_TYPE"].VIDEO_PLAY_FAIL);
            me._EvtOnCloseRewardVideoAd = null;
            me._showVideoAd = false;
            me._LastTimeCreateInterstitialAd = new Date().getTime();
        });
        if (this._RewardVideoDelayTimerId.length == 0) {
            this._RewardVideoDelayTimerId = _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_10__["default"].Delay(4 * 1000, this, function () {
                if (_this._IsRewardVideoAdFinish === false && _this._EvtOnCloseRewardVideoAd) {
                    me.SwitchLog && me.Log("4秒内回调检测判断无广告返回，则触发回调传回播放失败");
                    me._CallerRewardVideoAd && me._EvtOnCloseRewardVideoAd && me._EvtOnCloseRewardVideoAd.call(me._CallerRewardVideoAd, _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_VIDEO_PLAY_TYPE"].VIDEO_PLAY_FAIL);
                    me._EvtOnCloseRewardVideoAd = null;
                }
            });
        }
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ShowRewardVideoAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.StatisticShareCard = function (info) {
        this.StatisticShareCardInner(info);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].StatisticShareCard, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.StatisticShareCardInner = function (info) {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Data.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Statistic_ShareCard, info, this, function (isOk) {
        });
    };
    CommerceMgr.prototype.GetLayerList = function (onReturn) {
        var _this = this;
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Data_Layer, this, function (layerList) {
            _this.ListLayer = layerList;
            //读取本地缓存的今日已统计过的流失路径列表                          
            var localData = _this.GetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].ListStatisticsLayer, null);
            if (localData) {
                _this._localLayerList = localData;
            }
            onReturn && onReturn(layerList);
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetLayerList, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.NavigateToMiniProgram = function (id, toAppId, toUrl, source, caller, method) {
        var _this = this;
        var layer = source ? source : "default";
        var request = new _Model_Statistic__WEBPACK_IMPORTED_MODULE_12__["ClickOutRequest"]();
        request.iconId = id;
        request.target = toAppId;
        request.souce = layer;
        console.log("YDHW ---NavigateToMiniProgram-iconId:" + id + ",toAppId:" + toAppId + ",toUrl:" + toUrl + ",source:" + source);
        this._Platform.NavigateToMiniProgram(this.AppId, toAppId, toUrl, this, function () {
            if (_this.SwitchLog)
                _this.Log("小游戏跳转-跳转成功！");
            request.action = "enable";
            _this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].ClickOut, request, null);
            _this.Cache.RemoveItemFrom(toAppId);
            caller && method && method.call(caller, true);
        }, function () {
            if (_this.SwitchLog)
                _this.Log('小游戏跳转-跳转失败！');
            request.action = "cancel";
            _this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].ClickOut, request, null);
            caller && method && method.call(caller, false);
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].NavigateToMiniProgram, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.GetUserInfo = function (caller, onSuccess, onError) {
        var _this = this;
        this._Platform.GetUserInfo(this, function (data) {
            caller && onSuccess && onSuccess.call(caller, data);
            var userInfo = new _libs_ydhw_ydhw_sdk__WEBPACK_IMPORTED_MODULE_16__["YDHW"].EditRequest();
            if (data.nickName)
                userInfo.nickName = data.nickName;
            if (data.avatarUrl)
                userInfo.headimgurl = data.avatarUrl;
            if (data.gender)
                userInfo.gender = data.gender;
            if (data.province)
                userInfo.province = data.province;
            if (data.city)
                userInfo.city = data.city;
            if (data.country)
                userInfo.country = data.country;
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Data.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Edit, userInfo, caller, function () { });
            if (data.nickName)
                _this.NickName = data.nickName;
            if (data.avatarUrl)
                _this.AvatarUrl = data.avatarUrl;
        }, function (error) {
            caller && onError && onError.call(caller, error);
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].CreateUserInfoButton, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.CreateUserInfoButton = function (btnInfo, caller, onSuccess, onError) {
        var _this = this;
        this.SwitchLog && this.Log("ShowUserInfoButton");
        this._Platform.CreateUserInfoButton(btnInfo, this, function (data) {
            _this.Log("ShowUserInfoButton");
            _this.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].PlatformUserInfo, data);
            caller && onSuccess && onSuccess.call(caller, data);
            var userInfo = new _libs_ydhw_ydhw_sdk__WEBPACK_IMPORTED_MODULE_16__["YDHW"].EditRequest();
            if (data.nickName)
                userInfo.nickName = data.nickName;
            if (data.avatarUrl)
                userInfo.headimgurl = data.avatarUrl;
            if (data.gender)
                userInfo.gender = data.gender;
            if (data.province)
                userInfo.province = data.province;
            if (data.city)
                userInfo.city = data.city;
            if (data.country)
                userInfo.country = data.country;
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Data.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Edit, userInfo, caller, function () { });
            if (data.nickName)
                _this.NickName = data.nickName;
            if (data.avatarUrl)
                _this.AvatarUrl = data.avatarUrl;
        }, function (error) {
            _this.Warn("ShowUserInfoButton error: " + error);
            caller && onError && onError.call(caller, null);
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].CreateUserInfoButton, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.ShowUserInfoButton = function () {
        this._Platform.ShowUserInfoButton();
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ShowUserInfoButton, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.HideUserInfoButton = function () {
        this._Platform.HideUserInfoButton();
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].HideUserInfoButton, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.DestroyUserInfoButton = function () {
        this._Platform.DestroyUserInfoButton();
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].DestroyUserInfoButton, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype._IsCanCreateInterstitialAd = function () {
        var nowTime = new Date().getTime();
        var interval = (nowTime - this._LastTimeCreateInterstitialAd) / 1000;
        var canCreate = false;
        if (this.SwitchLog)
            this.Log("CreateIntertitialAd interval:", interval);
        if (this._Platform.InterstitialAd) {
            //如果存在InterstitialAd对象，标识已经创建过插屏广告
            var ifs = this.InterstitialAdFirstShowWaitTime || 0;
            canCreate = interval >= ifs;
        }
        else {
            var is = this.InterstitialAdShowTimeInterval || 0;
            canCreate = interval >= is;
        }
        if (!canCreate) {
            if (this.SwitchLog)
                this.Warn("创建插屏广告太频繁，请稍后再试");
        }
        return canCreate;
    };
    CommerceMgr.prototype.CreateInterstitialAd = function (isShow, caller, onLoad, onClose, onError) {
        var nowTime = new Date().getTime();
        if (this._Platform.InterstitialAd && this._interstitialAdWaitShow) {
            this.ShowInterstitialAd();
            return;
        }
        if (!this.InterstitialAdUnitIdList || this.InterstitialAdUnitIdList.length == 0) {
            this.SwitchLog && this.Log("InterstitialAdUnitIdList is empty");
            return;
        }
        if (!this._IsCanCreateInterstitialAd()) {
            caller && onError && onError.call(caller);
            return;
        }
        var me = this;
        var index = Math.floor(Math.random() * this.InterstitialAdUnitIdList.length);
        var adId = this.InterstitialAdUnitIdList[index];
        if (this._Platform.InterstitialAd) {
            this._Platform.ClearInterstitialAd();
        }
        this.StatisticInterstitial(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].CREATE, adId);
        this._Platform.CreateInterstitialAd(adId, this, function () {
            me.StatisticInterstitial(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].LOAD_SUCCESS, adId);
            if (isShow) {
                me.ShowInterstitialAd();
            }
            else {
                caller && onLoad && onLoad.call(caller);
            }
            me.SwitchLog && me.Log("InterstitialAd OnLoad");
        }, function (result) {
            me.StatisticInterstitial(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].CLOSE, adId);
            caller && onClose && onClose.call(caller, result);
            me._showInterstitialAd = false;
            me._LastTimeCreateInterstitialAd = new Date().getTime();
        }, function (error) {
            me.StatisticInterstitial(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].LOAD_FAIL, adId);
            me.SwitchLog && me.Warn("InterstistAd Error:" + error + " adId:" + adId);
            caller && onError && onError.call(caller, error);
            me._showInterstitialAd = false;
            me._LastTimeCreateInterstitialAd = new Date().getTime();
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].CreateInterstitialAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.ShowInterstitialAd = function () {
        var _this = this;
        if (!this._Platform.InterstitialAd) {
            this._interstitialAdWaitShow = false;
            return;
        }
        this._interstitialAdWaitShow = true;
        this._Platform.ShowInterstitialAd(this, function () {
            _this._showInterstitialAd = true;
            _this._interstitialAdWaitShow = false;
            _this.StatisticInterstitial(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].SHOW, _this._Platform.InterstitialAdId);
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ShowInterstitialAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.GetSharingResults = function (shareInfo, caller, method) {
        var _this = this;
        shareInfo && this.Strategy && this.Strategy.GetShareResult(shareInfo, this, function (shareBackInfo) {
            _this.Warn("Sharing Results");
            caller && method.call(caller, shareBackInfo);
        });
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetSharingResults, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.StatisticLayer = function (layerPath) {
        var nowTime = new Date().getTime();
        if (this._localLayerList) {
            //清理昨天的本地缓存数据
            var getTime = this._localLayerList.get_time;
            if (getTime) {
                //判断本地缓存最后一次流失打点时间是否是今天(只保存今天的)
                if (!this.isToday(getTime)) {
                    this._localLayerList = null;
                }
            }
            else {
                //清除本地缓存
                this._localLayerList = null;
            }
        }
        //先看本地缓存已经打点的流失路径列表中是否有该路径
        var localInfo = this._localLayerList;
        var hasStatic = false; //是否已经打过点
        if (localInfo && localInfo.s_layers) {
            var index = localInfo.s_layers.indexOf(layerPath);
            hasStatic = (index > 0);
        }
        var pathList = this.ListLayer;
        var hasLayer = false;
        var p_index = -1;
        for (var i = 0; i < pathList.length; i++) {
            var item = pathList[i];
            if (item.layerPath == layerPath) {
                hasLayer = true;
                p_index = i;
                break;
            }
        }
        if (hasLayer && p_index != -1) {
            if (!hasStatic) {
                if (!(localInfo && localInfo.get_time && localInfo.s_layers)) {
                    //如果今日没有打点，则从最开始连续打点
                    for (var i = 0; i <= p_index; i++) {
                        var lPath = pathList[i].layerPath;
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Statistic_Layer, lPath, this, function (isOk) { });
                        if (!this._localLayerList) {
                            this._localLayerList = new _Model_Data__WEBPACK_IMPORTED_MODULE_7__["LocalLayerInfo"]();
                            this._localLayerList.s_layers = [];
                        }
                        this._localLayerList.s_layers.push(lPath);
                        this._localLayerList.get_time = nowTime;
                    }
                }
                else {
                    //接着往后打点
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].Statistic_Layer, layerPath, this, function (isOk) { });
                    this._localLayerList.get_time = nowTime;
                    this._localLayerList.s_layers.push(layerPath);
                }
                this.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].ListStatisticsLayer, this._localLayerList);
            }
            //这是一个特殊事件打点，用于统计关卡进入人数
            //和后台商议scene值为'LayerOn'
            this.StatisticEvent(layerPath, 'LayerOn');
        }
        else {
            console.log("statisticLayer-layerPath not found", 'warn');
        }
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].StatisticLayer, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        // SDK.Statistic.InvokeMethod(SDK_NET_API.Statistic_Layer, layerPath, this, (isOk: boolean) => {
        // });
    };
    //判断传入的时间戳是否是今天
    //completeTime 需要比较的时间戳 
    CommerceMgr.prototype.isToday = function (completeTime) {
        var nowTime = new Date();
        var nowYear = nowTime.getFullYear();
        var nowMonth = nowTime.getMonth() + 1;
        var nowDay = nowTime.getDate();
        var comT = new Date(completeTime);
        var comTYear = comT.getFullYear();
        var comTMonth = comT.getMonth() + 1;
        var comTDay = comT.getDate();
        return (nowYear == comTYear && nowMonth == comTMonth && nowDay == comTDay);
    };
    CommerceMgr.prototype.IsCanRewardByVideoOrShare = function (type) {
        var IsCanReward = false;
        var videoFalseLimit = this.VideoFalseLimit;
        var shareFalseLimit = this.ShareFalseLimit;
        if (type == _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_SHARE_TYPE"].Video) {
            if (videoFalseLimit && videoFalseLimit > 0) {
                IsCanReward = true;
                videoFalseLimit -= 1;
                videoFalseLimit = videoFalseLimit < 0 ? 0 : videoFalseLimit;
                this.VideoFalseLimit = videoFalseLimit;
            }
        }
        else if (type == _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_SHARE_TYPE"].Share) {
            if (shareFalseLimit && shareFalseLimit > 0) {
                IsCanReward = true;
                shareFalseLimit -= 1;
                shareFalseLimit = shareFalseLimit < 0 ? 0 : shareFalseLimit;
                this.ShareFalseLimit = shareFalseLimit;
            }
        }
        if (IsCanReward) {
            this.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].VideoFalseLimit, this.VideoFalseLimit);
            this.SetValueT(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_VARS"].ShareFalseLimit, this.ShareFalseLimit);
        }
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].IsCanRewardByVideoOrShare, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return IsCanReward;
    };
    CommerceMgr.prototype.GetShareRewardLimit = function () {
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetShareRewardLimit, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return this.ShareFalseLimit;
    };
    CommerceMgr.prototype.GetVideoRewardLimit = function () {
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetVideoRewardLimit, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
        return this.VideoFalseLimit;
    };
    CommerceMgr.prototype.GetServerInfo = function (caller, method) {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Data.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_NET_API"].MyInfo, caller, method);
        this.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetServerInfo, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.ExitGame = function () {
        this._Platform.ExitGame();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ExitGame, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.VibrateShort = function () {
        this._Platform.VibrateShort();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].VibrateShort, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.VibrateLong = function () {
        this._Platform.VibrateLong();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].VibrateLong, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.InstallShortcut = function (caller, onSuccess, onFail, onComplete, message) {
        this._Platform.InstallShortcut(this, function () {
            caller && onSuccess && onSuccess.call(caller);
        }, function (error) {
            caller && onFail && onFail.call(caller, error);
        }, function () {
            caller && onComplete && onComplete.call(caller);
        }, message);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].InstallShortcut, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.CreateNativeAd = function (caller, method) {
        var _this = this;
        var index = Math.floor(Math.random() * this.NativeAdUnitIdList.length);
        this.nativeAdId = this.NativeAdUnitIdList[index];
        this._Platform.CreateNativeAd(this.nativeAdId, this, function () {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.StatisticNativeAd(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].CREATE, _this.nativeAdId);
        }, function (_args) {
            caller && method && method.call(caller, _args);
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].CreateNativeAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.ShowNativeAd = function (nativeId) {
        this._Platform.ShowNativeAd(nativeId);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.StatisticNativeAd(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].EXPOSURE, this.nativeAdId);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ShowNativeAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.ClickNativeAd = function (nativeId) {
        this._Platform.ClickNativeAd(nativeId);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.StatisticNativeAd(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].CLICK, this.nativeAdId);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].ClickNativeAd, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.HasShortcutInstalled = function (caller, onSuccess, onFail, onComplete) {
        this._Platform.HasShortcutInstalled(this, function (result) {
            caller && onSuccess && onSuccess.call(caller, result);
        }, function (error) {
            caller && onFail && onFail.call(caller, error);
        }, function () {
            caller && onComplete && onComplete.call(caller);
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].HasShortcutInstalled, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.ShareAppMessage = function (scene, channel, module, inviteType, caller, method, target) {
        throw new Error("Method not implemented.");
    };
    CommerceMgr.prototype.Hook = function (name, caller, method) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this._Platform.Hook(name, caller, method);
    };
    CommerceMgr.prototype._AddPowerByVideo = function () {
        if (!this.PowerSystemConfig || this.PowerSystemConfig.IsOn === false) {
            this.SwitchLog && this.Log("Power System is off");
            return;
        }
        var powerWeight = this.PowerSystemConfig.VideoPowerWeight;
        var powerNum = this.PowerSystem.GetPower();
        this.PowerSystem.SetPower((powerNum + powerWeight), _SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_POWER_RECOVERY_TYPE"].WatchVideo);
    };
    CommerceMgr.prototype.OnFrontend = function (res) {
        if (this._hasHide) {
            this.RefreshLastPlayTime();
            this._hasHide = false;
        }
        _HeartBeatSystem__WEBPACK_IMPORTED_MODULE_18__["HeartBeatSystem"].getInstance().StartUploadTime();
        this._ShareAppInfo = null;
        this.InvokeNotify(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_EVT"].OnFrontend);
        if (this._onShow) {
            this._onShow.caller && this._onShow.method && this._onShow.method.call(this._onShow.caller, res);
        }
    };
    ;
    CommerceMgr.prototype.OnBackend = function (res) {
        if (this._Platform.IsShowBannerAd && !this._showInterstitialAd && !this._showVideoAd && !this._showShare) {
            console.log("YDHW has click Banner ?");
            this.StatisticBanner(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["EM_STATISTIC_TYPE"].CLICK, this._bannerId);
        }
        _HeartBeatSystem__WEBPACK_IMPORTED_MODULE_18__["HeartBeatSystem"].getInstance().StopUploadTimer();
        this._hasHide = true;
        this.StatisticDuration();
        this.InvokeNotify(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["SDK_EVT"].OnBackend);
        if (this._onHide) {
            this._onHide.caller && this._onHide.method && this._onHide.method.call(this._onHide.caller, res);
        }
    };
    CommerceMgr.prototype.OnShow = function (caller, method) {
        this._onShow = { caller: caller, method: method };
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].OnShow, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.OnHide = function (caller, method) {
        this._onHide = { caller: caller, method: method };
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].OnHide, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.OnError = function (caller, method) {
        this._onError = { caller: caller, method: method };
        // this._Platform.OnError(this, (res:any) => {            
        //     caller && method && method.call(caller,res);
        // });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].OnError, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.GetObject = function (key, caller, method) {
        _Extensions_CloudAPI__WEBPACK_IMPORTED_MODULE_17__["CloudAPI"].GetObject(key, caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetObject, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.GetString = function (key, caller, method) {
        _Extensions_CloudAPI__WEBPACK_IMPORTED_MODULE_17__["CloudAPI"].GetString(key, caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].GetString, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.SetObject = function (key, value, caller, method) {
        _Extensions_CloudAPI__WEBPACK_IMPORTED_MODULE_17__["CloudAPI"].SetObject(key, value, caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].SetObject, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.SetString = function (key, value, caller, method) {
        _Extensions_CloudAPI__WEBPACK_IMPORTED_MODULE_17__["CloudAPI"].SetString(key, value, caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].SetString, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.Size = function (caller, method) {
        _Extensions_CloudAPI__WEBPACK_IMPORTED_MODULE_17__["CloudAPI"].Size(caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].Size, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.DeleteObject = function (key, caller, method) {
        _Extensions_CloudAPI__WEBPACK_IMPORTED_MODULE_17__["CloudAPI"].DeleteObject(key, caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].DeleteObject, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.StoreValue = function (storeInfo, caller, method) {
        _Extensions_CloudAPI__WEBPACK_IMPORTED_MODULE_17__["CloudAPI"].StoreValue(storeInfo, caller, method);
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Statistic_Api.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_6__["COMMERCE_API"].StoreValue, _framework_Define__WEBPACK_IMPORTED_MODULE_15__["EM_PLATFORM_TYPE"].Common, null);
    };
    CommerceMgr.prototype.Log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.SwitchLog && _super.prototype.Log.apply(this, __spread([message], args));
    };
    CommerceMgr.prototype.Debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.SwitchLog && _super.prototype.Debug.apply(this, __spread([message], args));
    };
    CommerceMgr.prototype.Info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.SwitchLog && _super.prototype.Info.apply(this, __spread([message], args));
    };
    CommerceMgr.prototype.Warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.SwitchLog && _super.prototype.Warn.apply(this, __spread([message], args));
    };
    CommerceMgr.prototype.Error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.SwitchLog && _super.prototype.Error.apply(this, __spread([message], args));
    };
    return CommerceMgr;
}(_framework_Manager_CommerceManager__WEBPACK_IMPORTED_MODULE_0__["CommerceManager"]));



/***/ }),

/***/ "./sdk/Manager/DataMgr.ts":
/*!********************************!*\
  !*** ./sdk/Manager/DataMgr.ts ***!
  \********************************/
/*! exports provided: DataMgr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataMgr", function() { return DataMgr; });
/* harmony import */ var _framework_Manager_DataManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/Manager/DataManager */ "./framework/Manager/DataManager.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Base/SDKPlatform */ "./sdk/Base/SDKPlatform.ts");
/* harmony import */ var _Assist_Log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Assist/Log */ "./sdk/Assist/Log.ts");
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
/* harmony import */ var _framework_Utility_Url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../framework/Utility/Url */ "./framework/Utility/Url.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var DataMgr = /** @class */ (function (_super) {
    __extends(DataMgr, _super);
    function DataMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataMgr.prototype.Initialize = function () {
        var _this = this;
        this.UrlConfig = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("获取游戏配置列表")
            .Category("gamebase")
            .Router("config")
            .End();
        this.UrlConfigFinal = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("强制获取游戏配置列表")
            .Category("gamebase")
            .Router("config")
            .Append("final")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Config, this, function (caller, method) {
            _this.UrlConfig.AsGet().End()
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("Config response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Config Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    _this.UrlConfigFinal.AsGet()
                        .Param("appid", _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.AppId)
                        .End()
                        .OnReceive(_this, function (response) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("ConfigForce response=", response);
                        if (response.code === 0) {
                            caller && method && method.call(caller, response.result);
                        }
                        else {
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                            var descriptor_1 = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor_1 && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("ConfigForce Error:" + descriptor_1.Description + ",提示:" + descriptor_1.SolutionHint);
                            caller && method && method.call(caller, null);
                        }
                    }).OnError(_this, function (error) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
                    }).OnException(_this, function (data) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
                    }).Send();
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this.UrlCustomConfig = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("获取自定义配置列表")
            .Category("gamebase")
            .Router("customconfig")
            .End();
        this.UrlCustomConfigFinal = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("强制获取自定义配置列表")
            .Category("gamebase")
            .Router("customconfig")
            .Append("final")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].CustomConfig, this, function (caller, method) {
            _this.UrlCustomConfig.AsGet().End()
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("CustomConfig response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("CustomConfig Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    _this.UrlCustomConfigFinal.AsGet()
                        .Param("appid", _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.AppId)
                        .Param("version", _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Version)
                        .End()
                        .OnReceive(_this, function (response) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("CustomConfigForce response=", response);
                        if (response.code === 0) {
                            caller && method && method.call(caller, response.result);
                        }
                        else {
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                            var descriptor_2 = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor_2 && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("CustomConfigFinal Error:" + descriptor_2.Description + ",提示:" + descriptor_2.SolutionHint);
                            caller && method && method.call(caller, null);
                        }
                    }).OnError(_this, function (error) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
                    }).OnException(_this, function (data) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
                    }).Send();
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this.UrlDataDecode = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("获取平台加密数据")
            .Category("gamebase")
            .Router("data")
            .Append("decode")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].DataDecode, this, function (request, caller, method) {
            _this.UrlDataDecode.AsPost().Post(request)
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("DataDecode Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("CustomConfig Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, null);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this.UrlGetBoardAward = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("领取积分墙奖励")
            .Category("gamebase")
            .Router("getboardaward")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].GetBoardAward, this, function (module, awardId, caller, method) {
            _this.UrlGetBoardAward.AsPost().Post({ module: module, awardId: awardId })
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("GetBoardAward Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("GetBoardAward Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, null);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this.UrlLayer = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("获取游戏流失路径列表")
            .Category("gamebase")
            .Router("layer")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Data_Layer, this, function (caller, method) {
            _this.UrlLayer.AsGet().End()
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("Layer response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Layer Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, null);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this.UrlScoreBoard = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .AsPost()
            .Description("获取积分墙列表")
            .Category("gamebase")
            .Router("scoreboard")
            .End();
        this.UrlScoreBoardFinal = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("强制获取积分墙列表")
            .Category("gamebase")
            .Router("scoreboard")
            .Append("final")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].ScoreBoard, this, function (module, caller, method) {
            _this.UrlScoreBoard.AsPost().Post({ module: module })
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("ScoreBoard Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("ScoreBoard Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    _this.UrlScoreBoardFinal.AsGet()
                        .Param("appid", _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.AppId)
                        .Param("version", _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Version)
                        .Param("module", module)
                        .End()
                        .OnReceive(_this, function (response) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("ScoreBoard Response=", response);
                        if (response.code === 0) {
                            caller && method && method.call(caller, response.result);
                        }
                        else {
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                            var descriptor_3 = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor_3 && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("ScoreBoard Error:" + descriptor_3.Description + ",提示:" + descriptor_3.SolutionHint);
                            caller && method && method.call(caller, null);
                        }
                    }).OnError(_this, function (error) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
                    }).OnException(_this, function (data) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
                    }).Send();
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this.UrlSideBox = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("获取侧边栏列表")
            .Category("gamebase")
            .Router("sidebox")
            .End();
        this.UrlSideBoxFinal = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("强制获取侧边栏列表")
            .Category("gamebase")
            .Router("sidebox")
            .Append("final")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].SideBox, this, function (caller, method) {
            _this.UrlSideBox.AsGet().End()
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("SideBox response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("SideBox Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    _this.UrlSideBoxFinal.AsGet()
                        .Param("appi", _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.AppId)
                        .Param("version", _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.Version).End()
                        .OnReceive(_this, function (response) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("SideBoxForce response=", response);
                        if (response.code === 0) {
                            caller && method && method.call(caller, response.result);
                        }
                        else {
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                            var descriptor_4 = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor_4 && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("SideBoxFinal Error:" + descriptor_4.Description + ",提示:" + descriptor_4.SolutionHint);
                            caller && method && method.call(caller, null);
                        }
                    }).OnError(_this, function (error) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
                    }).OnException(_this, function (data) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
                    }).Send();
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this.UrlShareCard = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("获取分享图列表")
            .Category("gamebase")
            .Router("sharecard")
            .End();
        this.UrlShareCardFinal = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("强制获取分享图列表")
            .Category("gamebase")
            .Router("sharecard")
            .Append("final")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Data_ShareCard, this, function (scene, caller, method) {
            _this.UrlShareCard.AsPost().Post({ scene: scene })
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("ShareCard response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("ShareCard Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    _this.UrlShareCardFinal.AsGet()
                        .Param("appid", _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.AppId)
                        .Param("scene", scene)
                        .End()
                        .OnReceive(_this, function (response) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("ShareCardFinal response=", response);
                        if (response.code === 0) {
                            caller && method && method.call(caller, response.result);
                        }
                        else {
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                            var descriptor_5 = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor_5 && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("ShareCardFinal Error:" + descriptor_5.Description + ",提示:" + descriptor_5.SolutionHint);
                            caller && method && method.call(caller, null);
                        }
                    }).OnError(_this, function (error) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
                    }).OnException(_this, function (data) {
                        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
                    }).Send();
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this.UrlStoreValue = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("获取自定义空间值")
            .Category("gamebase")
            .Router("store")
            .Append("value")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].StoreValue, this, function (request, caller, method) {
            _this.UrlStoreValue.AsPost().Post(request)
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("StoreValue response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_2__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("StoreValue Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, null);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).Send();
        });
        this.UrlGetMyIp = new _framework_Utility_Url__WEBPACK_IMPORTED_MODULE_5__["Url"]();
        // "http://pv.sohu.com/cityjson"
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].GetMyIp, this, function (caller, method) {
            _this.UrlGetMyIp.AsGet().SetCustomUrl("http://pv.sohu.com/cityjson")
                .RequestHeader("Content-Type", "application/json;charset=UTF-8")
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Log("UrlGetMyIp response=", response);
                caller && method && method.call(caller, response);
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_3__["Log"].Error("Exception=", data);
            }).SendCustomUrl();
        });
    };
    return DataMgr;
}(_framework_Manager_DataManager__WEBPACK_IMPORTED_MODULE_0__["DataManager"]));



/***/ }),

/***/ "./sdk/Manager/HeartBeatSystem.ts":
/*!****************************************!*\
  !*** ./sdk/Manager/HeartBeatSystem.ts ***!
  \****************************************/
/*! exports provided: HeartBeatSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeartBeatSystem", function() { return HeartBeatSystem; });
/* harmony import */ var _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/Utility/TimerUtility */ "./framework/Utility/TimerUtility.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");


var HeartBeatSystem = /** @class */ (function () {
    function HeartBeatSystem() {
        this._UploadTimeTimerId = "PowerAutoRecoveryTimerId";
    }
    HeartBeatSystem.prototype.Initialize = function () {
    };
    HeartBeatSystem.getInstance = function () {
        return HeartBeatSystem.instance;
    };
    /**
     * 同步在线时长定时器-启动
     */
    HeartBeatSystem.prototype.StartUploadTime = function () {
        this.StopUploadTimer();
        _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_0__["default"].AddTimer(this._UploadTimeTimerId, 3000, this, null, function () {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Commerce.StatisticDuration();
            return false;
        });
    };
    /**
     * 同步在线时长定时器-停止
     */
    HeartBeatSystem.prototype.StopUploadTimer = function () {
        _framework_Utility_TimerUtility__WEBPACK_IMPORTED_MODULE_0__["default"].RemoveTimer(this._UploadTimeTimerId);
    };
    HeartBeatSystem.instance = new HeartBeatSystem();
    return HeartBeatSystem;
}());



/***/ }),

/***/ "./sdk/Manager/PowerMgr.ts":
/*!*********************************!*\
  !*** ./sdk/Manager/PowerMgr.ts ***!
  \*********************************/
/*! exports provided: PowerMgr, YDHWVarExporter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerMgr", function() { return PowerMgr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YDHWVarExporter", function() { return YDHWVarExporter; });
/* harmony import */ var _framework_Manager_Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/Manager/Manager */ "./framework/Manager/Manager.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
/* harmony import */ var _SDK_Enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SDK/Enum */ "./sdk/SDK/Enum.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var PowerMgr = /** @class */ (function (_super) {
    __extends(PowerMgr, _super);
    function PowerMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PowerMgr.prototype.Initialize = function () {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__["POWER_EVT"].AddPower, this, function (num) {
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.DeclareVariable(_SDK_Enum__WEBPACK_IMPORTED_MODULE_3__["VARS"].Power, 0).Store().Bind(this, function (num, num2) {
            //todo:update data to server
        });
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.SetValueT(_SDK_Enum__WEBPACK_IMPORTED_MODULE_3__["VARS"].Power, 5);
        var tmpVar = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.GetVariable(_SDK_Enum__WEBPACK_IMPORTED_MODULE_3__["VARS"].Power);
        tmpVar.Bind(this, function (num) {
        });
        var power = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.GetValueT(_SDK_Enum__WEBPACK_IMPORTED_MODULE_3__["VARS"].Power);
        YDHWVarExporter.AddPower = 5;
    };
    return PowerMgr;
}(_framework_Manager_Manager__WEBPACK_IMPORTED_MODULE_0__["Manager"]));

var YDHWVarExporter = /** @class */ (function () {
    function YDHWVarExporter() {
    }
    Object.defineProperty(YDHWVarExporter, "Power", {
        get: function () {
            return 0;
        },
        set: function (value) {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.SetValueT(_SDK_Enum__WEBPACK_IMPORTED_MODULE_3__["VARS"].Power, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YDHWVarExporter, "AddPower", {
        set: function (value) {
            _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__["POWER_EVT"].AddPower, value);
        },
        enumerable: true,
        configurable: true
    });
    YDHWVarExporter.AddPower2 = function (value, value2) {
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Instance.InvokeMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_2__["POWER_EVT"].AddPower, value);
    };
    return YDHWVarExporter;
}());



/***/ }),

/***/ "./sdk/Manager/StatisticMgr.ts":
/*!*************************************!*\
  !*** ./sdk/Manager/StatisticMgr.ts ***!
  \*************************************/
/*! exports provided: StatisticMgr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticMgr", function() { return StatisticMgr; });
/* harmony import */ var _framework_Manager_DataManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/Manager/DataManager */ "./framework/Manager/DataManager.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _Assist_Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Assist/Log */ "./sdk/Assist/Log.ts");
/* harmony import */ var _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Base/SDKPlatform */ "./sdk/Base/SDKPlatform.ts");
/* harmony import */ var _SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SDK/EventDef */ "./sdk/SDK/EventDef.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var StatisticMgr = /** @class */ (function (_super) {
    __extends(StatisticMgr, _super);
    function StatisticMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatisticMgr.prototype.Initialize = function () {
        var _this = this;
        this._UrlBanner = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("Banner统计")
            .Category("statistics")
            .Router("banner")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Banner, this, function (type, adId, caller, method) {
            _this._UrlBanner.AsGet()
                .Param("type", type)
                .Param("adId", adId)
                .End()
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("Banner response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Banner Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlClickCount = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("卖量统计")
            .Category("statistics")
            .Router("clickcount")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].ClickOut, this, function (request, caller, method) {
            _this._UrlClickCount.AsPost()
                .Post(request).OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("ClickOut Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("ClickOut Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlClientLog = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("客户端错误日志")
            .Category("statistics")
            .Router("clientlog")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].ClientLog, this, function (request, caller, method) {
            _this._UrlClientLog.AsPost()
                .Post(request).OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("ClientLog Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("ClientLog Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlDuration = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("时长统计")
            .Category("statistics")
            .Router("duration")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Duration, this, function (type, duration, caller, method) {
            _this._UrlDuration.AsGet()
                .Param("type", type)
                .Param("duration", duration)
                .End()
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("Duration Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Duration Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlEvent = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("事件统计")
            .Category("statistics")
            .Router("event")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Event, this, function (events, caller, method) {
            _this._UrlEvent.AsPost()
                .Post({ events: events }).OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("Event Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Event Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlInterstitialAd = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("插屏广告统计")
            .Category("statistics")
            .Router("interstitial")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].InterstitialAd, this, function (type, adId, caller, method) {
            _this._UrlInterstitialAd.AsGet()
                .Param("type", type)
                .Param("adId", adId)
                .End()
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("Event Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("InterstitialAd Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlGridAd = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .Description("格子广告")
            .Category("statistics")
            .Router("grid")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].GridAd, this, function (type, adId, caller, method) {
            _this._UrlGridAd.AsGet()
                .Param("type", type)
                .Param("adId", adId)
                .End()
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("Event Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("GridAd Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlLayer = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("流失统计")
            .Category("statistics")
            .Router("layer")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Statistic_Layer, this, function (layer, caller, method) {
            _this._UrlLayer.AsPost()
                .Post({ layer: layer }).OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("Event Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Layer Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlResult = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("结果统计")
            .Category("statistics")
            .Router("result")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Result, this, function (_detail, caller, method) {
            _this._UrlResult.AsPost()
                .Post({ detail: _detail }).OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("Result Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, response.result);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Result Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlShareCard = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("分享图统计")
            .Category("statistics")
            .Router("sharecard")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Statistic_ShareCard, this, function (info, caller, method) {
            _this._UrlShareCard.AsPost()
                .Post(info).OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("ShareCard Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("ShareCard Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlVideo = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("视频统计")
            .Category("statistics")
            .Router("video")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].Video, this, function (type, adId, caller, method) {
            _this._UrlVideo.AsPost()
                .Post({ type: type, adId: adId }).OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("Video Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Video Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlAppBoxAd = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("盒子广告统计")
            .Category("statistics")
            .Router("box")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].AppBoxAd, this, function (type, adId, caller, method) {
            _this._UrlAppBoxAd.AsPost()
                .Post({ type: type, adId: adId }).OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("AppBox Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("AppBox Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlBlockAd = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("积木广告统计")
            .Category("statistics")
            .Router("block")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].BlockAd, this, function (type, adId, caller, method) {
            _this._UrlBlockAd.AsPost()
                .Post({ type: type, adId: adId }).OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("Block Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Block Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
        this._UrlNativeAd = _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Domain.Clone()
            .RequestHeader("Content-Type", "application/json;charset=UTF-8")
            .Description("原生广告统计")
            .Category("statistics")
            .Router("native")
            .End();
        this.DeclareMethod(_SDK_EventDef__WEBPACK_IMPORTED_MODULE_4__["SDK_NET_API"].NativeAd, this, function (type, adId, caller, method) {
            _this._UrlNativeAd.AsGet()
                .Param("type", type)
                .Param("adId", adId)
                .End()
                .OnReceive(_this, function (response) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Log("Native Response=", response);
                if (response.code === 0) {
                    caller && method && method.call(caller, true);
                }
                else {
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("server say:" + response.info);
                    var descriptor = _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"].ERROR_DESCRIPTION[response.code];
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && descriptor && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("GridAd Error:" + descriptor.Description + ",提示:" + descriptor.SolutionHint);
                    caller && method && method.call(caller, false);
                }
            }).OnError(_this, function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Error=", error);
            }).OnException(_this, function (data) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_1__["SDK"].Platform.IsDebug && _Assist_Log__WEBPACK_IMPORTED_MODULE_2__["Log"].Error("Exception=", data);
            }).Send();
        });
    };
    return StatisticMgr;
}(_framework_Manager_DataManager__WEBPACK_IMPORTED_MODULE_0__["DataManager"]));



/***/ }),

/***/ "./sdk/Model/Data.ts":
/*!***************************!*\
  !*** ./sdk/Model/Data.ts ***!
  \***************************/
/*! exports provided: StoreValueRequest, BannerRefreshConfig, PowerSystemConfig, VideoUnlockLevelConfig, DeepSheildRuleConfig, TimingMisTouchSwitchConfig, DeveloperAccountConfig, LocalLayerInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreValueRequest", function() { return StoreValueRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerRefreshConfig", function() { return BannerRefreshConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerSystemConfig", function() { return PowerSystemConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoUnlockLevelConfig", function() { return VideoUnlockLevelConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeepSheildRuleConfig", function() { return DeepSheildRuleConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimingMisTouchSwitchConfig", function() { return TimingMisTouchSwitchConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeveloperAccountConfig", function() { return DeveloperAccountConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalLayerInfo", function() { return LocalLayerInfo; });
var StoreValueRequest = /** @class */ (function () {
    function StoreValueRequest() {
        this.name = "";
        this.cmd = "";
        this.args = "";
    }
    return StoreValueRequest;
}());

var BannerRefreshConfig = /** @class */ (function () {
    function BannerRefreshConfig() {
    }
    return BannerRefreshConfig;
}());

var PowerSystemConfig = /** @class */ (function () {
    function PowerSystemConfig() {
        this.DefaultPowerValue = 0;
        this.UpperLimit = 0;
        this.AutoRecoveryTime = 0;
        this.VideoPowerWeight = 0;
        this.IsOn = false;
    }
    return PowerSystemConfig;
}());

var VideoUnlockLevelConfig = /** @class */ (function () {
    function VideoUnlockLevelConfig() {
        this.IsOn = false;
        this.CustomNumber = 0;
        this.IntervalCount = 0;
    }
    return VideoUnlockLevelConfig;
}());

var DeepSheildRuleConfig = /** @class */ (function () {
    function DeepSheildRuleConfig() {
        this.Type = 0;
        this.CustomNumberCounter = 0;
        this.ExecellentUserSwitch = false;
        this.WatchVideoCounter = 0;
        this.DayCustomNumber = [];
    }
    return DeepSheildRuleConfig;
}());

var TimingMisTouchSwitchConfig = /** @class */ (function () {
    function TimingMisTouchSwitchConfig() {
        this.IsOn = false;
        this.StartTimeHour = 0;
        this.StartTimeMinute = 0;
        this.EndTimeHour = 0;
        this.EndTimeMinute = 0;
    }
    return TimingMisTouchSwitchConfig;
}());

var DeveloperAccountConfig = /** @class */ (function () {
    function DeveloperAccountConfig() {
        this.IsOn = false;
        this.Accounts = [];
    }
    return DeveloperAccountConfig;
}());

var LocalLayerInfo = /** @class */ (function () {
    function LocalLayerInfo() {
        this.s_layers = null;
        this.get_time = null;
    }
    return LocalLayerInfo;
}());



/***/ }),

/***/ "./sdk/Model/Default.ts":
/*!******************************!*\
  !*** ./sdk/Model/Default.ts ***!
  \******************************/
/*! exports provided: BannerAdStyle, ShareAppInfo, ShareBackInfo, CustomInfo, DeepTouchInfo, AppInfo, JumpOutInfo, StatisticEventRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerAdStyle", function() { return BannerAdStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareAppInfo", function() { return ShareAppInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareBackInfo", function() { return ShareBackInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomInfo", function() { return CustomInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeepTouchInfo", function() { return DeepTouchInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppInfo", function() { return AppInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JumpOutInfo", function() { return JumpOutInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticEventRequest", function() { return StatisticEventRequest; });
var BannerAdStyle = /** @class */ (function () {
    function BannerAdStyle() {
    }
    return BannerAdStyle;
}());

var ShareAppInfo = /** @class */ (function () {
    function ShareAppInfo() {
        this.channel = "";
        this.module = "";
        this.showTime = 0;
        this.shareId = 0;
    }
    return ShareAppInfo;
}());

var ShareBackInfo = /** @class */ (function () {
    function ShareBackInfo() {
        this.IsSuccess = false;
        this.IsHasStrategy = false;
        this.Tips = null;
    }
    return ShareBackInfo;
}());

var CustomInfo = /** @class */ (function () {
    function CustomInfo() {
        this._id = 0;
        this.name = "";
        this.version = "";
        this.type = "";
        this.value = "";
        this.switchRegionUse = "";
        this.switchTouchUse = "";
        this.desc = "";
    }
    return CustomInfo;
}());

var DeepTouchInfo = /** @class */ (function () {
    function DeepTouchInfo() {
        this.deepTouch = false;
        this.ListCustomInfo = [];
    }
    return DeepTouchInfo;
}());

var AppInfo = /** @class */ (function () {
    function AppInfo(appId) {
        this.appid = "";
        this.appid = appId;
    }
    return AppInfo;
}());

var JumpOutInfo = /** @class */ (function () {
    function JumpOutInfo() {
        this.Date = 0;
        this.List = [];
    }
    return JumpOutInfo;
}());

var StatisticEventRequest = /** @class */ (function () {
    function StatisticEventRequest() {
    }
    return StatisticEventRequest;
}());



/***/ }),

/***/ "./sdk/Model/Statistic.ts":
/*!********************************!*\
  !*** ./sdk/Model/Statistic.ts ***!
  \********************************/
/*! exports provided: ClientLogRequest, ClickOutRequest, SdkInfo, StatistiicShareInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientLogRequest", function() { return ClientLogRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClickOutRequest", function() { return ClickOutRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SdkInfo", function() { return SdkInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatistiicShareInfo", function() { return StatistiicShareInfo; });
var ClientLogRequest = /** @class */ (function () {
    function ClientLogRequest() {
    }
    return ClientLogRequest;
}());

var ClickOutRequest = /** @class */ (function () {
    function ClickOutRequest() {
    }
    return ClickOutRequest;
}());

var SdkInfo = /** @class */ (function () {
    function SdkInfo() {
    }
    return SdkInfo;
}());

var StatistiicShareInfo = /** @class */ (function () {
    function StatistiicShareInfo(shareTime, sharecardId, sType, target, real) {
        this.sharecardId = sharecardId || -1;
        this.shareTime = shareTime;
        if (sType)
            this.sType = sType;
        if (target)
            this.target = target;
        this.real = real || 0;
    }
    return StatistiicShareInfo;
}());



/***/ }),

/***/ "./sdk/Model/User.ts":
/*!***************************!*\
  !*** ./sdk/Model/User.ts ***!
  \***************************/
/*! exports provided: ShareInfo, ClientInfo, LoginRequest, LoginResponse, StrategyData, Tips, ShareVideoModuleFalse, LoopCtrl, ShareVideoModule, UnUseShareVideoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareInfo", function() { return ShareInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientInfo", function() { return ClientInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRequest", function() { return LoginRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginResponse", function() { return LoginResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyData", function() { return StrategyData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tips", function() { return Tips; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareVideoModuleFalse", function() { return ShareVideoModuleFalse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopCtrl", function() { return LoopCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareVideoModule", function() { return ShareVideoModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnUseShareVideoModule", function() { return UnUseShareVideoModule; });
var ShareInfo = /** @class */ (function () {
    function ShareInfo() {
    }
    return ShareInfo;
}());

var ClientInfo = /** @class */ (function () {
    function ClientInfo() {
    }
    return ClientInfo;
}());

var LoginRequest = /** @class */ (function () {
    function LoginRequest() {
    }
    return LoginRequest;
}());

var LoginResponse = /** @class */ (function () {
    function LoginResponse() {
    }
    return LoginResponse;
}());

var StrategyData = /** @class */ (function () {
    function StrategyData() {
    }
    return StrategyData;
}());

var Tips = /** @class */ (function () {
    function Tips() {
    }
    return Tips;
}());

var ShareVideoModuleFalse = /** @class */ (function () {
    function ShareVideoModuleFalse() {
        /**
         * 策略id
         */
        this.strategyId = 0;
        /**
         * time数组ID
         */
        this.timeId = 0;
        /**
         * 执行遍数
         */
        this.count = 0;
    }
    return ShareVideoModuleFalse;
}());

var LoopCtrl = /** @class */ (function () {
    function LoopCtrl() {
    }
    return LoopCtrl;
}());

var ShareVideoModule = /** @class */ (function () {
    function ShareVideoModule() {
    }
    return ShareVideoModule;
}());

var UnUseShareVideoModule = /** @class */ (function () {
    function UnUseShareVideoModule() {
    }
    return UnUseShareVideoModule;
}());



/***/ }),

/***/ "./sdk/Platform/WechatPlatform.ts":
/*!****************************************!*\
  !*** ./sdk/Platform/WechatPlatform.ts ***!
  \****************************************/
/*! exports provided: EM_RECORD_EVENT, WechatPlatform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_RECORD_EVENT", function() { return EM_RECORD_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WechatPlatform", function() { return WechatPlatform; });
/* harmony import */ var _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Base/SDKPlatform */ "./sdk/Base/SDKPlatform.ts");
/* harmony import */ var _framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../framework/Assist/StorageAdapter */ "./framework/Assist/StorageAdapter.ts");
/* harmony import */ var _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _Model_Default__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/Default */ "./sdk/Model/Default.ts");
/* harmony import */ var _Model_Statistic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Model/Statistic */ "./sdk/Model/Statistic.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var EM_RECORD_EVENT;
(function (EM_RECORD_EVENT) {
    /**
     * 录制开始事件
     */
    EM_RECORD_EVENT["E_START"] = "start";
    /**
     * 录制结束事件
     */
    EM_RECORD_EVENT["E_STOP"] = "stop";
    /**
     * 录制暂停事件
     */
    EM_RECORD_EVENT["E_PAUSE"] = "pause";
    /**
     * 录制恢复事件
     */
    EM_RECORD_EVENT["E_RESUME"] = "resume";
    /**
     * 录制取消事件
     */
    EM_RECORD_EVENT["E_ABORT"] = "abort";
    /**
     * 录制时间更新事件.在录制过程中触发该事件
     */
    EM_RECORD_EVENT["E_TIME_UPDATE"] = "timeUpdate";
    /**
     * 错误事件。当录制和分享过程中发生错误时触发该事件
     */
    EM_RECORD_EVENT["E_ERROR"] = "error";
})(EM_RECORD_EVENT || (EM_RECORD_EVENT = {}));
var WechatPlatform = /** @class */ (function (_super) {
    __extends(WechatPlatform, _super);
    function WechatPlatform() {
        var _this = _super.call(this) || this;
        _this.GridAd = null;
        _this.GameRecorder = null;
        _this.GameRecorderBtn = null;
        _this.Name = _this.constructor.name;
        return _this;
    }
    WechatPlatform.prototype.Initialize = function () {
        if (!_super.prototype.Initialize.call(this)) {
            return false;
        }
        _framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__["StorageAdapter"].WriteString = this.Controller.setStorageSync;
        _framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__["StorageAdapter"].WriteObject = this.Controller.setStorageSync;
        _framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__["StorageAdapter"].ReadString = this.Controller.getStorageSync;
        _framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__["StorageAdapter"].ReadObject = this.Controller.getStorageSync;
        _framework_Assist_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__["StorageAdapter"].DeleteObject = this.Controller.removeStorageSync;
        return true;
    };
    WechatPlatform.prototype.Login = function (caller, onSuccess, onFail) {
        if (!this.IsHasAPI("login")) {
            this.Warn("login is not supported");
            return;
        }
        this.Controller.login({
            success: function (result) {
                caller && onSuccess && onSuccess.call(caller, result.code, result.token, result);
            },
            fail: function (error) {
                caller && onFail && onFail.call(caller, error);
            }
        });
    };
    WechatPlatform.prototype.GetLeftTopBtnPosition = function () {
        return null;
    };
    WechatPlatform.prototype.GetSystemInfoSync = function (caller, method) {
        caller && method && method.call(caller, this.Controller.getSystemInfoSync());
    };
    WechatPlatform.prototype.LaunchInfo = function () {
        if (!this.IsHasAPI("getLaunchOptionsSync")) {
            this.Warn("getLaunchOptionsSync is not supported");
            return;
        }
        var info = this.Controller.getLaunchOptionsSync();
        _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && console.log("LaunchInfo:" + JSON.stringify(info));
        return info;
    };
    WechatPlatform.prototype.OnFrontend = function (caller, method) {
        if (!this.IsHasAPI("onShow")) {
            this.Warn("onShow is not supported");
            return;
        }
        this.Controller.onShow(function (e) {
            caller && method && method.call(caller, e);
        });
    };
    WechatPlatform.prototype.OnBackend = function (caller, method) {
        if (!this.IsHasAPI("onHide")) {
            this.Warn("onHide is not supported");
            return;
        }
        this.Controller.onHide(function (e) {
            caller && method && method.call(caller, e);
        });
    };
    WechatPlatform.prototype.NavigateToMiniProgram = function (ownAppId, toAppId, toUrl, caller, onSuccess, onFail) {
        if (!this.IsHasAPI("navigateToMiniProgram")) {
            this.Warn("navigateToMiniProgram is not supported");
            return;
        }
        this.Controller.navigateToMiniProgram({
            appId: toAppId,
            path: toUrl || "",
            extraData: {
                appid: ownAppId //
            },
            success: function () {
                caller && onSuccess && onSuccess.call(caller);
            },
            fail: function () {
                caller && onFail && onFail.call(caller);
            }
        });
    };
    WechatPlatform.prototype.CreateBannerAd = function (isSmall, adUnitId, isMisTouch, style, caller, onResize) {
        var _this = this;
        this.CallerOnResizeBannerAd = caller;
        this.OnResizeBannerAd = onResize;
        this.IsMisTouchBannerAd = isMisTouch;
        var ww = isSmall ? 300 : (this.SystemInfo.windowWidth > 800 ? 800 : this.SystemInfo.windowWidth);
        var left = (this.SystemInfo.windowWidth - ww) / 2;
        var defaultStyle = new _Model_Default__WEBPACK_IMPORTED_MODULE_3__["BannerAdStyle"]();
        defaultStyle.left = left;
        defaultStyle.top = this.SystemInfo.windowHeight - this.SystemInfo.windowWidth * 0.28695;
        defaultStyle.width = ww;
        if (style) {
            if (style.left)
                defaultStyle.left = style.left;
            if (style.top)
                defaultStyle.top = style.top;
            if (style.width)
                defaultStyle.width = style.width;
            if (style.height)
                defaultStyle.height = style.height;
        }
        var bannerInfo = {
            adUnitId: adUnitId,
            style: defaultStyle,
            //todo:adIntervals这个参数旧sdk里面旧有，也不知道怎么得来的，得问问
            adIntervals: 31,
        };
        if (!this.IsHasAPI("createBannerAd")) {
            this.Warn("createBannerAd is not supported");
            return;
        }
        this.BannerAd = this.Controller.createBannerAd(bannerInfo);
        //在外面设置一下Style，这样可以强制刷新Banner，触发onResize监听
        if (style && style.left) {
            this.BannerAd.style.left = style.left;
        }
        else {
            this.BannerAd.style.left = left;
        }
        var me = this;
        this.BannerAd.onResize(function (result) {
            if (me.OnResizeBannerAd) {
                _this.CallerOnResizeBannerAd && _this.OnResizeBannerAd.call(_this.CallerOnResizeBannerAd, result);
            }
            else {
                if (me.BannerStyle) {
                    if (me.BannerStyle.width)
                        me.BannerAd.style.width = me.BannerStyle.width;
                    if (me.BannerStyle.height)
                        me.BannerAd.style.height = me.BannerStyle.height;
                    if (me.BannerStyle.top)
                        me.BannerAd.style.top = me.BannerStyle.top;
                    if (me.BannerStyle.left)
                        me.BannerAd.style.left = me.BannerStyle.left;
                }
                else {
                    var _top = me.SystemInfo.windowHeight - result.height;
                    var _left = (me.SystemInfo.windowWidth - result.width) * 0.5;
                    me.BannerAd.style.top = _top;
                    me.BannerAd.style.left = _left;
                }
            }
            if (_SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.SwitchLog) {
                console.log("CreateBannerAd onResize:" + JSON.stringify(me.BannerAd.style));
            }
        });
    };
    WechatPlatform.prototype.DestroyBannerAd = function () {
        if (!this.BannerAd) {
            return;
        }
        this.BannerAd.destroy();
        this.BannerAd = null;
    };
    WechatPlatform.prototype.SetBannerVisible = function (val) {
        if (!this.BannerAd) {
            this.Warn("SetBannerVisible banner ad is not exists");
            return;
        }
        if (val === true) {
            this.BannerAd.show();
            this.IsShowBannerAd = true;
        }
        else {
            this.BannerAd.hide();
            this.IsShowBannerAd = false;
        }
    };
    WechatPlatform.prototype.CreateRewardVideoAd = function (adUnitId, caller, onLoad, onCLose, onError) {
        var me = this;
        if (!this.RewardVideoAd) {
            this.RewardVideoAdId = adUnitId;
            if (!this.IsHasAPI("createRewardedVideoAd")) {
                this.Warn("createRewardedVideoAd is not supported");
                return;
            }
            var closeEvent = function (result) {
                me.IsShowRewardVideoAd = false;
                caller && onCLose && onCLose.call(caller, result);
            };
            var errorEvent = function (error) {
                caller && onError && onError.call(caller, error);
                me.IsShowRewardVideoAd = false;
                me.Warn("VideoAd onError:", error);
            };
            var loadEvent = function () {
                caller && onLoad && onLoad.call(caller);
                me.Log("VideoAd onLoad");
            };
            this.RewardVideoAd = this.Controller.createRewardedVideoAd({ adUnitId: adUnitId });
            this.RewardVideoAd.onClose(closeEvent);
            this.RewardVideoAd.onError(errorEvent);
            this.RewardVideoAd.onLoad(loadEvent);
        }
        else if (this.RewardVideoAdId !== adUnitId) {
            this.RewardVideoAd = adUnitId;
        }
    };
    WechatPlatform.prototype.ShowRewardVideoAd = function (caller, onShow, onException) {
        var _this = this;
        if (!this.RewardVideoAd) {
            this.Error("VideoAd is null");
            return;
        }
        this.IsShowRewardVideoAd = true;
        this.RewardVideoAd.load().then(function () {
            _this.RewardVideoAd.show().then(function () {
                caller && onShow && onShow.call(caller);
            }).catch(function (res) {
                _this.IsShowRewardVideoAd = false;
                caller && onException && onException.call(caller, res);
            });
        }).catch(function () {
            _this.IsShowRewardVideoAd = false;
        });
    };
    WechatPlatform.prototype.VibrateShort = function () {
        if (!this.IsHasAPI("vibrateShort")) {
            this.Warn("vibrateShort is not supported");
            return;
        }
        this.Controller && this.Controller.vibrateShort({
            success: function (res) { },
            fail: function (res) { },
            complete: function () { }
        });
    };
    WechatPlatform.prototype.VibrateLong = function () {
        if (!this.IsHasAPI("vibrateLong")) {
            this.Warn("vibrateLong is not supported");
            return;
        }
        this.Controller && this.Controller.vibrateLong({
            success: function (res) { },
            fail: function (res) { _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && console.log("fail-res:" + res); },
            complete: function () { }
        });
    };
    WechatPlatform.prototype.CreateInterstitialAd = function (adUnitId, caller, onLoad, onClose, onError) {
        this.InterstitialAdId = adUnitId;
        if (!this.IsHasAPI("createInterstitialAd")) {
            this.Warn("createInterstitialAd is not supported");
            return;
        }
        this.InterstitialAd = this.Controller.createInterstitialAd({ adUnitId: adUnitId });
        if (!this.InterstitialAd) {
            return;
        }
        var me = this;
        var loadEvent = function () {
            caller && onLoad && onLoad.call(caller);
            me.Log("InterstitialAd onLoad");
        };
        var closeEvent = function (result) {
            caller && onClose && onClose.call(caller, result);
        };
        var errorEvent = function (error) {
            caller && onError && onError.call(caller, error);
            me.Warn("InterstitialAd onError:", error);
        };
        // this.InterstitialAd.offLoad(loadEvent);
        this.InterstitialAd.onLoad(loadEvent);
        // this.InterstitialAd.offClose(closeEvent);
        this.InterstitialAd.onClose(closeEvent);
        // this.InterstitialAd.offError(errorEvent);
        this.InterstitialAd.onError(errorEvent);
        this.InterstitialAd.load();
    };
    WechatPlatform.prototype.ShowInterstitialAd = function (caller, method) {
        if (!this.InterstitialAd) {
            return;
        }
        this.InterstitialAd.show();
        caller && method && method.call(caller);
    };
    WechatPlatform.prototype.ClearInterstitialAd = function () {
        if (!this.InterstitialAd) {
            this.Log("InterstitialAd is null");
            return;
        }
        this.InterstitialAd.destroy();
        this.InterstitialAd = null;
    };
    WechatPlatform.prototype.ShareAppMessage = function (title, imageUrl, query, caller, method, target) {
        if (!this.IsHasAPI("shareAppMessage")) {
            this.Warn("shareAppMessage is not supported");
            return;
        }
        var shareInfo = {
            title: title,
            imageUrl: imageUrl,
            query: query,
        };
        this.Controller.shareAppMessage(shareInfo);
        caller && method && method.call(caller);
    };
    WechatPlatform.prototype.CreateUserInfoButton = function (btnInfo, caller, onSuccess, onError) {
        var _this = this;
        if (!this.IsHasAPI("createUserInfoButton")) {
            this.Warn("createUserInfoButton is not supported");
            return;
        }
        this.UserInfoButton = this.Controller.createUserInfoButton(btnInfo);
        this.UserInfoButton.onTap(function (result) {
            console.warn("onTap:" + JSON.stringify(result));
            if (result.userInfo) {
                caller && onSuccess && onSuccess.call(caller, result.userInfo);
                _this.DestroyUserInfoButton();
            }
        });
        this.UserInfoButton.show();
    };
    WechatPlatform.prototype.CreateGridAd = function (isShow, adId, adTheme, gridCount, style, caller, onLoad, onShow, onError) {
        var _this = this;
        if (!this.IsHasAPI("createGridAd")) {
            this.Warn("createGridAd is not supported");
            return;
        }
        var me = this;
        if (!this.GridAd) {
            this.GridAd = this.Controller.createGridAd({
                adUnitId: adId,
                adTheme: adTheme,
                gridCount: gridCount,
                style: style,
            });
            this.GridAd.onLoad(function () {
                caller && onLoad && onLoad.call(caller);
                me.Log("GridAd onLoad");
            });
            this.GridAd.onError(function (error) {
                caller && onError && onError.call(caller, error);
                me.Warn("GridAd onError:", error);
            });
        }
        else {
            this.GridAd.adUnitId = adId;
        }
        if (this.GridAd && isShow) {
            this.GridAd.show().catch(function (error) {
                _this.Error("CreateGridAd Show Error:" + error);
            });
            caller && onShow && onShow.call(caller);
        }
    };
    WechatPlatform.prototype.ShowGridAd = function (caller, onError) {
        this.GridAd && this.GridAd.show().catch(function (error) {
            caller && onError && onError.call(caller, error);
        });
    };
    WechatPlatform.prototype.HideGridAd = function (caller, onError) {
        this.GridAd && this.GridAd.hide().catch(function (error) {
            caller && onError && onError.call(caller, error);
        });
    };
    WechatPlatform.prototype.SubscribeSysMsg = function (msgTypeList, caller, onSuccess, onError) {
        if (!this.IsHasAPI("requestSubscribeSystemMessage")) {
            this.Warn("requestSubscribeSystemMessage is not supported");
            return;
        }
        this.Controller.requestSubscribeSystemMessage({
            msgTypeList: msgTypeList,
            success: function (result) {
                caller && onSuccess && onSuccess.call(caller, result);
            },
            fail: function (error) {
                caller && onError && onError.call(caller, error);
            }
        });
    };
    /**
     * 获取用户的当前设置
     * @param caller
     * @param method
     */
    WechatPlatform.prototype.GetSetting = function (isSubcribe, caller, onSuccess, onError) {
        if (!this.IsHasAPI("getSetting")) {
            this.Warn("getSetting is not supported");
            return;
        }
        else {
            this.Controller.getSetting({
                withSubscriptions: (isSubcribe || false),
                success: function (result) {
                    caller && onSuccess && onSuccess.call(caller, result);
                },
                fail: function (error) {
                    caller && onError && onError.call(caller, error);
                }
            });
        }
    };
    WechatPlatform.prototype.GameRecorderOff = function (event, caller, callBack) {
        if (!this.GameRecorder) {
            this.Warn("GameRecorder is null");
            return;
        }
        this.GameRecorder.off(event, function (res) {
            console.log("YDHW --GameRecorderOff-event:" + event + ",res:" + JSON.stringify(res));
            caller && callBack && callBack.call(caller, res);
        });
    };
    WechatPlatform.prototype.GameRecorderOn = function (event, caller, callBack) {
        if (!this.GameRecorder) {
            this.Warn("GameRecorder is null");
            return;
        }
        this.GameRecorder.on(event, function (res) {
            console.log("YDHW --GameRecorderOn-event:" + event + ",res:" + JSON.stringify(res));
            caller && callBack && callBack.call(caller, res);
        });
    };
    WechatPlatform.prototype.GameRecorderStart = function (info, caller, onStart, onStop, onError, onPause, onResume, onAbort, onTimeUpdate) {
        if (!this.IsHasAPI("getGameRecorder")) {
            this.Warn("getGameRecorder is not supported");
            return;
        }
        if (this.GameRecorder) {
            //销毁
            this.GameRecorderOff(EM_RECORD_EVENT.E_START);
            this.GameRecorderOff(EM_RECORD_EVENT.E_STOP);
            this.GameRecorderOff(EM_RECORD_EVENT.E_ERROR);
            this.GameRecorderOff(EM_RECORD_EVENT.E_PAUSE);
            this.GameRecorderOff(EM_RECORD_EVENT.E_RESUME);
            this.GameRecorderOff(EM_RECORD_EVENT.E_ABORT);
            this.GameRecorderOff(EM_RECORD_EVENT.E_TIME_UPDATE);
            this.GameRecorder = null;
        }
        this.GameRecorder = this.Controller.getGameRecorder();
        if (onStart)
            this.GameRecorderOn(EM_RECORD_EVENT.E_START, caller, onStart);
        if (onStop)
            this.GameRecorderOn(EM_RECORD_EVENT.E_STOP, caller, onStop);
        if (onError)
            this.GameRecorderOn(EM_RECORD_EVENT.E_ERROR, caller, onError);
        if (onPause)
            this.GameRecorderOn(EM_RECORD_EVENT.E_PAUSE, caller, onPause);
        if (onResume)
            this.GameRecorderOn(EM_RECORD_EVENT.E_RESUME, caller, onResume);
        if (onAbort)
            this.GameRecorderOn(EM_RECORD_EVENT.E_ABORT, caller, onAbort);
        if (onTimeUpdate)
            this.GameRecorderOn(EM_RECORD_EVENT.E_TIME_UPDATE, caller, onTimeUpdate);
        this.GameRecorder.start(info);
    };
    WechatPlatform.prototype.GameRecorderStop = function () {
        if (!this.GameRecorder) {
            this.Warn("GameRecorder is null");
            return;
        }
        this.GameRecorder.stop();
        console.log("YDHW ---GameRecorder.stop()");
    };
    WechatPlatform.prototype.GameRecorderPause = function () {
        if (!this.GameRecorder) {
            this.Warn("GameRecorder is null");
            return;
        }
        this.GameRecorder.pause();
        console.log("YDHW ---GameRecorder.pause()");
    };
    WechatPlatform.prototype.GameRecorderResume = function () {
        if (!this.GameRecorder) {
            this.Warn("GameRecorder is null");
            return;
        }
        this.GameRecorder.resume();
        console.log("YDHW ---GameRecorder.resume()");
    };
    WechatPlatform.prototype.GameRecorderAbort = function () {
        if (!this.GameRecorder) {
            this.Warn("GameRecorder is null");
            return;
        }
        this.GameRecorder.abort();
        console.log("YDHW ---GameRecorder.abort()");
    };
    WechatPlatform.prototype.IsAtempoSupported = function () {
        if (!this.GameRecorder) {
            this.Warn("GameRecorder is null");
            return false;
        }
        console.log("YDHW ---GameRecorder.IsAtempoSupported()");
        return this.GameRecorder.isAtempoSupported();
    };
    WechatPlatform.prototype.IsFrameSupported = function () {
        if (!this.GameRecorder) {
            this.Warn("GameRecorder is null");
            return false;
        }
        console.log("YDHW ---GameRecorder.isFrameSupported()");
        return this.GameRecorder.isFrameSupported();
    };
    WechatPlatform.prototype.IsSoundSupported = function () {
        if (!this.GameRecorder) {
            this.Warn("GameRecorder is null");
            return false;
        }
        console.log("YDHW ---GameRecorder.isSoundSupported()");
        return this.GameRecorder.isSoundSupported();
    };
    WechatPlatform.prototype.IsVolumeSupported = function () {
        if (!this.GameRecorder) {
            this.Warn("GameRecorder is null");
            return false;
        }
        console.log("YDHW ---GameRecorder.isVolumeSupported()");
        return this.GameRecorder.isVolumeSupported();
    };
    WechatPlatform.prototype.CreateGameRecorderShareButton = function (btnInfo) {
        if (!this.IsHasAPI("createGameRecorderShareButton")) {
            this.Warn("createGameRecorderShareButton is not supported");
            return;
        }
        this.GameRecorderBtn = this.Controller.createGameRecorderShareButton(btnInfo);
        console.log("YDHW ---CreateGameRecorderShareButton");
    };
    WechatPlatform.prototype.GameRecorderShareButtonHide = function () {
        if (!this.GameRecorderBtn) {
            this.Warn("GameRecorderBtn is null");
            return;
        }
        this.GameRecorderBtn.hide();
        console.log("YDHW ---GameRecorderBtn.hide()");
    };
    WechatPlatform.prototype.GameRecorderShareButtonShow = function () {
        if (!this.GameRecorderBtn) {
            this.Warn("GameRecorderBtn is null");
            return;
        }
        this.GameRecorderBtn.show();
        console.log("YDHW ---GameRecorderBtn.show()");
    };
    WechatPlatform.prototype.GameRecorderShareButtonOnTap = function (caller, method) {
        if (!this.GameRecorderBtn) {
            this.Warn("GameRecorderBtn is null");
            return;
        }
        this.GameRecorderBtn.onTap(function (res) {
            console.log("YDHW ---GameRecorderBtn.onTap()");
            caller && method && method.call(caller, res);
        });
    };
    WechatPlatform.prototype.GameRecorderShareButtonOffTap = function (caller, method) {
        if (!this.GameRecorderBtn) {
            this.Warn("GameRecorderBtn is null");
            return;
        }
        this.GameRecorderBtn.offTap(function (res) {
            console.log("YDHW ---GameRecorderBtn.offTap()");
            caller && method && method.call(caller, res);
        });
    };
    WechatPlatform.prototype.SetMessageToFriendQuery = function (shareMessageToFriendScene) {
        if (!this.IsHasAPI("onShareMessageToFriend")) {
            this.Warn("onShareMessageToFriend is not supported");
            return;
        }
        var success = this.Controller.setMessageToFriendQuery({ shareMessageToFriendScene: shareMessageToFriendScene });
        return success;
    };
    WechatPlatform.prototype.OnShareMessageToFriend = function (caller, method) {
        if (!this.IsHasAPI("onShareMessageToFriend")) {
            this.Warn("onShareMessageToFriend is not supported");
            return;
        }
        this.Controller.onShareMessageToFriend(function (res) {
            console.log("YDHW ---OnShareMessageToFriend-res：" + JSON.stringify(res));
            caller && method && method.call(caller, res);
        });
        console.log("YDHW ---onShareMessageToFriend");
    };
    WechatPlatform.prototype.OnShareTimeline = function (shareInfo, caller, method) {
        if (!this.IsHasAPI("onShareTimeline")) {
            this.Warn("onShareTimeline is not supported");
            return;
        }
        this.Controller.onShareTimeline(function () {
            return shareInfo;
        });
    };
    WechatPlatform.prototype.OffShareTimeline = function () {
        if (!this.IsHasAPI("offShareTimeline")) {
            this.Warn("offShareTimeline is not supported");
            return;
        }
        this.Controller.offShareTimeline();
    };
    /**
     * 显示当前页面的转发按钮(默认展示)
     */
    WechatPlatform.prototype.ShowShareMenu = function () {
        if (!this.IsHasAPI("showShareMenu")) {
            this.Warn("showShareMenu is not supported");
            return;
        }
        this.Controller.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
      this.OnShareAppMessage();
    };
    /**
     * 菜单分享按钮点击监听
     */
    WechatPlatform.prototype.OnShareAppMessage = function () {
      console.error("YDHW ---注册分享监听");
        if (!this.IsHasAPI("onShareAppMessage")) {
            this.Warn("onShareAppMessage is not supported");
            return;
        }
        this.Controller.onShareAppMessage(function () {
            var sareCard = _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.Strategy.GetRandomShareConfig();
            var shareInfo = {};
            var nowTime = new Date().getTime();
          if (sareCard) {
              console.error("YDHW ---onShareAppMessage--4" + JSON.stringify(sareCard));
                var queryData = 'account_id=' + _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.AccountId + '&sharecard_id=' + sareCard.id + '&share_time=' + nowTime + '&from=' + 'stage_invite';
                var _title = sareCard.title;
                var _imageUrl = sareCard.img;
                var _query = queryData;
                if (sareCard.id) {
                    var shareInfo_1 = new _Model_Statistic__WEBPACK_IMPORTED_MODULE_4__["StatistiicShareInfo"](nowTime, sareCard.id);
                    _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Commerce.StatisticShareCardInner(shareInfo_1);
                }
              console.error("YDHW ---用户点击了“转发”按钮-shareInfo:" + JSON.stringify(shareInfo));
                // 用户点击了“转发”按钮
                return {
                    title: _title,
                    imageUrl: _imageUrl,
                    query: _query,
                };
            }
            else {
                return { title: '快来加入我们吧', imageUrl: "" };
            }
        });
    };
    WechatPlatform.prototype.ExitGame = function () {
        if (!this.IsHasAPI("exitMiniProgram")) {
            this.Warn("exitMiniProgram is not supported");
            return;
        }
        this.Controller.exitMiniProgram({
            success: function () {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && console.log("exitMiniProgram success");
            },
            fail: function (error) {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && console.warn("exitMiniProgram error:" + error);
            },
            complete: function () {
                _SDK_Declare__WEBPACK_IMPORTED_MODULE_2__["SDK"].Platform.IsDebug && console.log("exitMiniProgram complete");
            },
        });
    };
    return WechatPlatform;
}(_Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_0__["SDKPlatform"]));



/***/ }),

/***/ "./sdk/SDK/Declare.ts":
/*!****************************!*\
  !*** ./sdk/SDK/Declare.ts ***!
  \****************************/
/*! exports provided: SDK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SDK", function() { return SDK; });
/* harmony import */ var _framework_Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../framework/Core */ "./framework/Core.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum */ "./sdk/SDK/Enum.ts");
/* harmony import */ var _framework_Utility_Url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../framework/Utility/Url */ "./framework/Utility/Url.ts");
/* harmony import */ var _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Base/SDKPlatform */ "./sdk/Base/SDKPlatform.ts");




var SDK = /** @class */ (function () {
    function SDK() {
    }
    Object.defineProperty(SDK, "Domain", {
        get: function () {
            return this._Url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDK, "Platform", {
        get: function () {
            if (this._Instance == null) {
                this._Instance = new _Base_SDKPlatform__WEBPACK_IMPORTED_MODULE_3__["SDKPlatform"]();
            }
            return this._Instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDK, "Core", {
        get: function () {
            return _framework_Core__WEBPACK_IMPORTED_MODULE_0__["Core"].Instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDK, "Instance", {
        get: function () {
            return _framework_Core__WEBPACK_IMPORTED_MODULE_0__["Core"].Instance.AsManager();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDK, "Agent", {
        get: function () {
            return _framework_Core__WEBPACK_IMPORTED_MODULE_0__["Core"].Instance.GetManager(_Enum__WEBPACK_IMPORTED_MODULE_1__["ENUM_MANAGER"].Agent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDK, "Commerce", {
        get: function () {
            return _framework_Core__WEBPACK_IMPORTED_MODULE_0__["Core"].Instance.GetManager(_Enum__WEBPACK_IMPORTED_MODULE_1__["ENUM_MANAGER"].Commerce);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDK, "Statistic", {
        get: function () {
            return _framework_Core__WEBPACK_IMPORTED_MODULE_0__["Core"].Instance.GetManager(_Enum__WEBPACK_IMPORTED_MODULE_1__["ENUM_MANAGER"].Statistic);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDK, "Statistic_Api", {
        get: function () {
            return _framework_Core__WEBPACK_IMPORTED_MODULE_0__["Core"].Instance.GetManager(_Enum__WEBPACK_IMPORTED_MODULE_1__["ENUM_MANAGER"].Api);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDK, "Data", {
        get: function () {
            return _framework_Core__WEBPACK_IMPORTED_MODULE_0__["Core"].Instance.GetManager(_Enum__WEBPACK_IMPORTED_MODULE_1__["ENUM_MANAGER"].Data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDK, "PowerMgr", {
        get: function () {
            return _framework_Core__WEBPACK_IMPORTED_MODULE_0__["Core"].Instance.GetManager(_Enum__WEBPACK_IMPORTED_MODULE_1__["ENUM_MANAGER"].Power);
        },
        enumerable: true,
        configurable: true
    });
    // static get Instance(): Core {
    //     return Core.Instance;
    // }
    SDK._Url = new _framework_Utility_Url__WEBPACK_IMPORTED_MODULE_2__["Url"]();
    SDK._Instance = null;
    return SDK;
}());



/***/ }),

/***/ "./sdk/SDK/Enum.ts":
/*!*************************!*\
  !*** ./sdk/SDK/Enum.ts ***!
  \*************************/
/*! exports provided: ENUM_MANAGER, METHOD, VARS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENUM_MANAGER", function() { return ENUM_MANAGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "METHOD", function() { return METHOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VARS", function() { return VARS; });
/**
 * 管理器类型枚举
 */
var ENUM_MANAGER;
(function (ENUM_MANAGER) {
    ENUM_MANAGER["Agent"] = "AgentMgr";
    ENUM_MANAGER["Event"] = "EventMgr";
    ENUM_MANAGER["Commerce"] = "CommerceMgr";
    ENUM_MANAGER["Resource"] = "ResourceMgr";
    ENUM_MANAGER["State"] = "StateMgr";
    ENUM_MANAGER["Panel"] = "PanelMgr";
    ENUM_MANAGER["Statistic"] = "StatisticMgr";
    ENUM_MANAGER["Data"] = "DataMgr";
    ENUM_MANAGER["Sound"] = "SoundMgr";
    ENUM_MANAGER["Platform"] = "PlatformMgr";
    ENUM_MANAGER["Logic"] = "Logic";
    ENUM_MANAGER["Log"] = "LogMgr";
    ENUM_MANAGER["Power"] = "Power";
    ENUM_MANAGER["Api"] = "ApiMgr";
})(ENUM_MANAGER || (ENUM_MANAGER = {}));
/**
 * 方法ID枚举
 */
var METHOD;
(function (METHOD) {
    METHOD["InitView"] = "InitView";
    METHOD["OnClear"] = "OnClear";
    METHOD["OnCancel"] = "OnCancel";
    METHOD["OnRemoved"] = "OnRemoved";
    METHOD["OnSelect"] = "OnSelect";
    METHOD["OnRefresh"] = "OnRefresh";
    METHOD["OnChangedItem"] = "OnChangedItem";
    //----------------------------------------------------------------------------------------
    //ResourceMgr
    METHOD["OnPreloadStateGame"] = "PreloadStateGame";
    METHOD["OnPreloadStateHome"] = "OnPreloadStateHome";
    METHOD["OnPreloadStateLoading"] = "OnPreloadStateLoading";
    METHOD["OnPreloadStateResult"] = "OnPreloadStateResult";
    METHOD["OnPreloadConfig"] = "OnPreloadConfig";
    METHOD["OnLoginSuccess"] = "OnLoginSuccess";
    //----------------------------------------------------------------------------------------
    //Config
    //----------------------------------------------------------------------------------------
    //UserDataMgr
    /**
     * 进入下一关
     */
    METHOD["OnIncreaseLevel"] = "OnIncreaseLevel";
    //商业化
    /**
     * todo:关闭原生Banner
     */
    METHOD["OnCloseNativeBanner"] = "OnCloseNativeBanner";
    /**
     * todo:刷新原生Banner
     */
    METHOD["OnRefreshNativeBanner"] = "OnRefreshNativeBanner";
    //----------------------------------------------------------------------------------------
    //StateMgr
    /**
     * 加载进度完成时触发
     */
    METHOD["OnFinishLoading"] = "OnFinishLoading";
    /**
     * 刷新进度条
     */
    METHOD["OnLoadingProgress"] = "OnLoadingProgress";
    /**
     * 加载进度报错
     */
    METHOD["OnLoadingError"] = "OnLoadingError";
    //----------------------------------------------------------------------------------------
    //PanelMgr
    METHOD["OnMouseDownBtnSkinVisible"] = "OnMouseDownBtnSkinVisible";
    //----------------------------------------------------------------------------------------
    //SoundManager
    METHOD["OnPlayEffect"] = "OnPlayEffect";
    METHOD["OnVibrate"] = "OnVibrate";
    //----------------------------------------------------------------------------------------
    //Logic
    // OnLogicPreload = "OnLogicPreload",
    //----------------------------------------------------------------------------------------
    //Skin
    /**
     * 解锁皮肤
     */
    /**
     * 随机出一个皮肤ID
     */
    METHOD["OnRandomUnlockSkin"] = "OnRandomUnlockSkin";
    /**
     * 开宝箱解锁皮肤
     */
    METHOD["OnUnlockSkinByTreasureBox"] = "OnUnlockSkinByTreasureBox";
    /**
     * 计算金币解锁皮肤需要多少个金币数量
     */
    METHOD["OnHowManyCoinCost"] = "OnHowManyCoinCost";
    /**
     * 花费金币购买皮肤
     */
    METHOD["OnUnlockSkinByGold"] = "OnUnlockSkinByGold";
    /**
     * 如果当前解锁皮肤的方式是看视频，则需要保存视频次数
     */
    METHOD["OnUnlockSkinByVideoAd"] = "OnUnlockSkinByVideoAd";
    //---------------------------------------------------------------------------------------------
    //Commmerce 商业化
    /**
     * 重新初始化侧边栏
     */
    METHOD["OnReinitSideBox"] = "\u91CD\u65B0\u521D\u59CB\u5316\u4FA7\u8FB9\u680F";
    //----------------------------------------------------------------------------------------
    //LogMgr
    METHOD["OnCheckAllVariables"] = "OnCheckAllVariables";
    METHOD["OnCheckAllMethods"] = "OnCheckAllMethods";
})(METHOD || (METHOD = {}));
/**
 * 变量ID枚举
 */
var VARS;
(function (VARS) {
    VARS["Power"] = "Power";
    VARS["BallBounceSound"] = "BallBounceSound";
    VARS["FloorBrokeSound"] = "FloorBrokeSound";
    VARS["MusicSuffixName"] = "MusicSuffixName";
    VARS["BackgroundMusic"] = "BackgroundMusic";
    VARS["IsOpenBackgrouMusic"] = "IsOpenBackgrouMusic";
    VARS["IsOpenEffectSound"] = "IsOpenEffectSound";
    VARS["IsOpenVibrate"] = "IsOpenVibrate";
    VARS["IsFirstTimeEnterGame"] = "IsFirstGameStart";
    /**
     * 设置背景音乐音量
     */
    VARS["MusicVolume"] = "MusicVolume";
    /**
     * 设置音效音乐音量
     */
    VARS["EffectVolume"] = "EffectVolume";
    /**
     * 当前进行中的关卡
     */
    VARS["CurrentLevelIndex"] = "CurrentLevelIndex";
    /**
     * 当前金币数量
     */
    VARS["CurrentCoinCount"] = "CurrentCoinCount";
    /**
     * 当前抽奖券数量
     */
    VARS["CurrentTicketCount"] = "CurrentTicketCount";
    /**
     * 当前剩余看视频获取抽奖券有效机会
     */
    VARS["CurrentTicketsForWatchVideoAd"] = "CurrentTicketUsedForWatchVideoAd";
    /**
     * 当前累计总分
     */
    VARS["CurrentTotalScore"] = "CurrentTotalScore";
    /**
     * 历史最高分
     */
    VARS["HistoryHighScore"] = "HistoryHighScore";
    /**
     * 当前累计看视频次数
     */
    VARS["CurrentVideoAdCount"] = "CurrentVideoAdCount";
    /**
     * 当前正在看视频解锁的皮肤
     */
    VARS["CurrentUnlockingSkinId"] = "CurrentUnlockingSkinId";
    VARS["CurrentUsingSkinId"] = "CurrentUsingSkinId";
    /**
     * 时间戳
     */
    VARS["LastTimestamp"] = "LastTimestamp";
    /**
     * 已经解锁的皮肤的全局皮肤Id列表
     */
    VARS["UnlockSkinList"] = "UnlockSkinList";
    /**
     * 已经抽奖被抽取过的转盘选项Id列表
     */
    VARS["UsedRewardList"] = "UsedRewardList";
    VARS["GMGameFinish"] = "GMGameFinish";
    /**
     * 当前需要获取的卡片下标
     */
    VARS["CurrentShareCardIndex"] = "ShareCardIndex";
    VARS["CurrentScoreVisible"] = "CurrentScoreVisible";
    VARS["HighestScoreVisible"] = "HistoryHighestScoreVisible";
    VARS["IsBtnSkinVisible"] = "IsBtnSkinVisible";
    /**
     * 商业化
     */
    // ComerceSceneId = "ComerceSceneId",
    // ComerceChannel = "ComerceChannel",
    // ComerceShareCardId = "ComerceShareCardId",
    // ComerceExtraData = "ComerceExtraData",
})(VARS || (VARS = {}));


/***/ }),

/***/ "./sdk/SDK/EventDef.ts":
/*!*****************************!*\
  !*** ./sdk/SDK/EventDef.ts ***!
  \*****************************/
/*! exports provided: SDK_NET_API, COMMERCE_API, SDK_VARS, SDK_EVT, EM_VIDEO_PLAY_TYPE, EM_STATISTIC_TYPE, EM_SHARE_TYPE, EM_POWER_RECOVERY_TYPE, POWER_EVT, TIMER_NAME, EM_APP_BOX_TYPE, EM_BLOCK_TYPE, EM_SHARE_APP_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SDK_NET_API", function() { return SDK_NET_API; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMERCE_API", function() { return COMMERCE_API; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SDK_VARS", function() { return SDK_VARS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SDK_EVT", function() { return SDK_EVT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_VIDEO_PLAY_TYPE", function() { return EM_VIDEO_PLAY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_STATISTIC_TYPE", function() { return EM_STATISTIC_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_SHARE_TYPE", function() { return EM_SHARE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_POWER_RECOVERY_TYPE", function() { return EM_POWER_RECOVERY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POWER_EVT", function() { return POWER_EVT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIMER_NAME", function() { return TIMER_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_APP_BOX_TYPE", function() { return EM_APP_BOX_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_BLOCK_TYPE", function() { return EM_BLOCK_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EM_SHARE_APP_TYPE", function() { return EM_SHARE_APP_TYPE; });
var SDK_NET_API;
(function (SDK_NET_API) {
    //Agent
    SDK_NET_API["Edit"] = "Edit";
    SDK_NET_API["Login"] = "Login";
    SDK_NET_API["MyInfo"] = "MyInfo";
    //Statistic
    //广告
    SDK_NET_API["Banner"] = "Banner";
    SDK_NET_API["Video"] = "Video";
    SDK_NET_API["InterstitialAd"] = "InterstitialAd";
    SDK_NET_API["GridAd"] = "GridAd";
    SDK_NET_API["AppBoxAd"] = "AppBoxAd";
    SDK_NET_API["BlockAd"] = "BlockAd";
    SDK_NET_API["NativeAd"] = "NativeAd";
    /**
     * 卖量统计1
     */
    SDK_NET_API["ClickOut"] = "ClickOut";
    SDK_NET_API["ClientLog"] = "ClientLog";
    SDK_NET_API["Duration"] = "Duration";
    SDK_NET_API["Event"] = "Event";
    SDK_NET_API["Statistic_Api"] = "Statistic_Api";
    SDK_NET_API["Statistic_Layer"] = "Statistic_Layer";
    SDK_NET_API["Result"] = "Result";
    SDK_NET_API["Statistic_ShareCard"] = "Statistic_ShareCard";
    //Data
    SDK_NET_API["Config"] = "Config";
    SDK_NET_API["CustomConfig"] = "CustomConfig";
    SDK_NET_API["DataDecode"] = "DataDecode";
    SDK_NET_API["GetBoardAward"] = "GetBoardAward";
    SDK_NET_API["Data_Layer"] = "Data_Layer";
    SDK_NET_API["ScoreBoard"] = "ScoreBoard";
    SDK_NET_API["SideBox"] = "SideBox";
    SDK_NET_API["Data_ShareCard"] = "Data_ShareCard";
    SDK_NET_API["StoreValue"] = "StoreValue";
    SDK_NET_API["GetMyIp"] = "GetMyIp";
})(SDK_NET_API || (SDK_NET_API = {}));
var COMMERCE_API;
(function (COMMERCE_API) {
    COMMERCE_API["LoginAddress"] = "API_LoginAddress";
    COMMERCE_API["Login_Api"] = "API_Login_Api";
    COMMERCE_API["ShareInfo"] = "API_ShareInfo";
    COMMERCE_API["GetLeftTopBtnPosition"] = "API_GetLeftTopBtnPosition";
    COMMERCE_API["StatisticBanner"] = "API_StatisticBanner";
    COMMERCE_API["StatisticVideo"] = "API_StatisticVideo";
    COMMERCE_API["StatisticResult"] = "API_StatisticResult";
    COMMERCE_API["StatisticEvent"] = "API_StatisticEvent";
    COMMERCE_API["ShowShareOrVideo"] = "API_ShowShareOrVideo";
    COMMERCE_API["UseShareOrVideoStrategy"] = "API_UseShareOrVideoStrategy";
    COMMERCE_API["SwitchView"] = "API_SwitchView";
    COMMERCE_API["GetDeepTouchInfo"] = "API_GetDeepTouchInfo";
    COMMERCE_API["GetCustomConfig"] = "API_GetCustomConfig";
    COMMERCE_API["GameOver"] = "API_GameOver";
    COMMERCE_API["IsUnlockVideo"] = "API_IsUnlockVideo";
    COMMERCE_API["GetPowerInfo"] = "API_GetPowerInfo";
    COMMERCE_API["ListenOnPowerChanged"] = "API_ListenOnPowerChanged";
    COMMERCE_API["SetPower"] = "API_SetPower";
    COMMERCE_API["GetPower"] = "API_GetPower";
    COMMERCE_API["GetSideBox"] = "API_GetSideBox";
    COMMERCE_API["GetScoreBoardList"] = "API_GetScoreBoardList";
    COMMERCE_API["GetScoreBoardAward"] = "API_GetScoreBoardAward";
    COMMERCE_API["ShareCard"] = "API_ShareCard";
    COMMERCE_API["GetTodayBoutCount"] = "API_GetTodayBoutCount";
    COMMERCE_API["GetTotalBoutCount"] = "API_GetTotalBoutCount";
    COMMERCE_API["GetLastBountNumber"] = "API_GetLastBountNumber";
    COMMERCE_API["GetMaxBountNumber"] = "API_GetMaxBountNumber";
    COMMERCE_API["GetTodayWatchVideoCounter"] = "API_GetTodayWatchVideoCounter";
    COMMERCE_API["ChangeBannerStyle"] = "API_ChangeBannerStyle";
    COMMERCE_API["CreateBannerAd"] = "API_CreateBannerAd";
    COMMERCE_API["CreateSmallBannerAd"] = "API_CreateSmallBannerAd";
    COMMERCE_API["CreateCustomBannerAd"] = "API_CreateCustomBannerAd";
    COMMERCE_API["BannerAdChangeSize"] = "API_BannerAdChangeSize";
    COMMERCE_API["ShowBannerAd"] = "API_ShowBannerAd";
    COMMERCE_API["HideBannerAd"] = "API_HideBannerAd";
    COMMERCE_API["CreateRewardVideoAd"] = "API_CreateRewardVideoAd";
    COMMERCE_API["ShowRewardVideoAd"] = "API_ShowRewardVideoAd";
    COMMERCE_API["GetLayerList"] = "API_GetLayerList";
    COMMERCE_API["StatisticShareCard"] = "API_StatisticShareCard";
    COMMERCE_API["NavigateToMiniProgram"] = "API_NavigateToMiniProgram";
    COMMERCE_API["CreateUserInfoButton"] = "API_CreateUserInfoButton";
    COMMERCE_API["ShowUserInfoButton"] = "API_ShowUserInfoButton";
    COMMERCE_API["HideUserInfoButton"] = "API_HideUserInfoButton";
    COMMERCE_API["DestroyUserInfoButton"] = "API_DestroyUserInfoButton";
    COMMERCE_API["CreateInterstitialAd"] = "API_CreateInterstitialAd";
    COMMERCE_API["ShowInterstitialAd"] = "API_ShowInterstitialAd";
    COMMERCE_API["GetSharingResults"] = "API_GetSharingResults";
    COMMERCE_API["StatisticLayer"] = "API_StatisticLayer";
    COMMERCE_API["IsCanRewardByVideoOrShare"] = "API_IsCanRewardByVideoOrShare";
    COMMERCE_API["GetShareRewardLimit"] = "API_GetShareRewardLimit";
    COMMERCE_API["GetVideoRewardLimit"] = "API_GetVideoRewardLimit";
    COMMERCE_API["GetServerInfo"] = "API_GetServerInfo";
    COMMERCE_API["Hook"] = "API_Hook";
    COMMERCE_API["StatisticClickOut"] = "API_StatisticClickOut";
    COMMERCE_API["ShareTemplate"] = "API_ShareTemplate";
    COMMERCE_API["ShareToken"] = "API_ShareToken";
    COMMERCE_API["ShowMoreGamesModal"] = "API_ShowMoreGamesModal";
    COMMERCE_API["RecorderStart"] = "API_RecorderStart";
    COMMERCE_API["RecorderPause"] = "API_RecorderPause";
    COMMERCE_API["RecorderResume"] = "API_RecorderResume";
    COMMERCE_API["RecorderStop"] = "API_RecorderStop";
    COMMERCE_API["ShowGridAd"] = "API_ShowGridAd";
    COMMERCE_API["CreateGridAd"] = "API_CreateGridAd";
    COMMERCE_API["HideGridAd"] = "API_HideGridAd";
    COMMERCE_API["SubscribeSysMsg"] = "API_SubscribeSysMsg";
    COMMERCE_API["ShareByTemplateId"] = "API_ShareByTemplateId";
    COMMERCE_API["AddColorSign"] = "API_AddColorSign";
    COMMERCE_API["SaveAppToDesktop"] = "API_SaveAppToDesktop";
    COMMERCE_API["SubscribeAppMsg"] = "API_SubscribeAppMsg";
    COMMERCE_API["CreateAddFriendButton"] = "API_CreateAddFriendButton";
    COMMERCE_API["ShowAddFriendButton"] = "API_ShowAddFriendButton";
    COMMERCE_API["HideAddFriendButton"] = "API_HideAddFriendButton";
    COMMERCE_API["DestroyAddFriendButton"] = "API_DestroyAddFriendButton";
    COMMERCE_API["CreateAppBox"] = "API_CreateAppBox";
    COMMERCE_API["ShowAppBox"] = "API_ShowAppBox";
    COMMERCE_API["CreateBlockAd"] = "API_CreateBlockAd";
    COMMERCE_API["ShowBlockAd"] = "API_ShowBlockAd";
    COMMERCE_API["HideBlockAd"] = "API_HideBlockAd";
    COMMERCE_API["DestroyBlockAd"] = "API_DestroyBlockAd";
    COMMERCE_API["CreateNativeAd"] = "API_CreateNativeAd";
    COMMERCE_API["ShowNativeAd"] = "API_ShowNativeAd";
    COMMERCE_API["ClickNativeAd"] = "API_ClickNativeAd";
    COMMERCE_API["HasShortcutInstalled"] = "API_HasShortcutInstalled";
    COMMERCE_API["InstallShortcut"] = "API_InstallShortcut";
    COMMERCE_API["ShareImage"] = "API_ShareImage";
    COMMERCE_API["ShareVideo"] = "API_ShareVideo";
    COMMERCE_API["CreateMoreGamesButton"] = "API_CreateMoreGamesButton";
    COMMERCE_API["VibrateLong"] = "API_VibrateLong";
    COMMERCE_API["VibrateShort"] = "API_VibrateShort";
    COMMERCE_API["ExitGame"] = "API_ExitGame";
    COMMERCE_API["GetNetworkType"] = "API_GetNetworkType";
    COMMERCE_API["OnNetworkStatusChange"] = "API_OnNetworkStatusChange";
    COMMERCE_API["IsStartupByShortcut"] = "API_IsStartupByShortcut";
    COMMERCE_API["ShareAppMessage"] = "API_ShareAppMessage";
    COMMERCE_API["GetSetting"] = "API_GetSetting";
    COMMERCE_API["GameRecorderOff"] = "API_GameRecorderOff";
    COMMERCE_API["GameRecorderOn"] = "API_GameRecorderOn";
    COMMERCE_API["GameRecorderStart"] = "API_GameRecorderStart";
    COMMERCE_API["GameRecorderStop"] = "API_GameRecorderStop";
    COMMERCE_API["GameRecorderPause"] = "API_GameRecorderPause";
    COMMERCE_API["GameRecorderResume"] = "API_GameRecorderResume";
    COMMERCE_API["GameRecorderAbort"] = "API_GameRecorderAbort";
    COMMERCE_API["IsAtempoSupported"] = "API_IsAtempoSupported";
    COMMERCE_API["IsFrameSupported"] = "API_IsFrameSupported";
    COMMERCE_API["IsSoundSupported"] = "API_IsSoundSupported";
    COMMERCE_API["IsVolumeSupported"] = "API_IsVolumeSupported";
    COMMERCE_API["CreateGameRecorderShareButton"] = "API_CreateGameRecorderShareButton";
    COMMERCE_API["GameRecorderShareButtonHide"] = "API_GameRecorderShareButtonHide";
    COMMERCE_API["GameRecorderShareButtonShow"] = "API_GameRecorderShareButtonShow";
    COMMERCE_API["GameRecorderShareButtonOnTap"] = "API_GameRecorderShareButtonOnTap";
    COMMERCE_API["GameRecorderShareButtonOffTap"] = "API_GameRecorderShareButtonOffTap";
    COMMERCE_API["SetMessageToFriendQuery"] = "API_SetMessageToFriendQuery";
    COMMERCE_API["OnShareMessageToFriend"] = "API_OnShareMessageToFriend";
    COMMERCE_API["OnShareTimeline"] = "API_OnShareTimeline";
    COMMERCE_API["OffShareTimeline"] = "API_OffShareTimeline";
    COMMERCE_API["OnShow"] = "API_OnShow";
    COMMERCE_API["OnHide"] = "API_OnHide";
    COMMERCE_API["OnError"] = "API_OnError";
    COMMERCE_API["GetObject"] = "API_GetObject";
    COMMERCE_API["GetString"] = "API_GetString";
    COMMERCE_API["SetObject"] = "API_SetObject";
    COMMERCE_API["SetString"] = "API_SetString";
    COMMERCE_API["Size"] = "API_Size";
    COMMERCE_API["DeleteObject"] = "API_DeleteObject";
    COMMERCE_API["StoreValue"] = "API_StoreValue";
})(COMMERCE_API || (COMMERCE_API = {}));
var SDK_VARS;
(function (SDK_VARS) {
    /**
     * 当前体力总点数
     */
    SDK_VARS["TotalPowerCounter"] = "PowerCounter";
    /**
     * 最后一次增加体力时的时间戳
     */
    SDK_VARS["LastPowerAddTimestamp"] = "LastPowerAddTimestamp";
    /**
     * 倒计时进度
     */
    SDK_VARS["CountDownPro"] = "CountDownPro";
    /**
     * 是否正在倒计时
     */
    SDK_VARS["OnCountDown"] = "OnCountDown";
    /**
     * 今日看视频数量
     */
    SDK_VARS["TodayWatchVideoCounter"] = "TodayWatchVideoCounter";
    /**
     * 最后一次看视频的时间戳
     */
    SDK_VARS["LastWatchVideoTimestamp"] = "LastWatchVideoTimestamp";
    /**
     * 已解锁关卡数 列表
     */
    SDK_VARS["ListUnlockVideoLevelNumber"] = "ListUnlockLevelNumber";
    /**
     * 本地缓存已打点流失路径
     */
    SDK_VARS["ListStatisticsLayer"] = "ListStatisticsLayer";
    SDK_VARS["ShareConfig"] = "ShareConfig";
    /**
     * 最大关卡编号
     */
    SDK_VARS["MaxCustomNumber"] = "MaxCustomNumber";
    /**
     * 最后一次玩的关卡编号
     */
    SDK_VARS["LastCustomNumber"] = "LastCustomNumber";
    /**
     * 今日晚的总关卡数量
     */
    SDK_VARS["TodayCustomNumberCounter"] = "TodayCustomNumberCounter";
    /**
     * 迄今为止总共关卡数量
     */
    SDK_VARS["TotalCustomNumberCounter"] = "TotalCustomNumberCounter";
    /**
     * 最后一次玩的时间
     */
    SDK_VARS["LastPlayTimestamp"] = "LastPlayTimestamp";
    SDK_VARS["JumpOutInfo"] = "JumpOutInfo";
    /**
     * 视频上限
     */
    SDK_VARS["VideoFalseLimit"] = "VideoFalseLimit";
    /**
     * 分享上限
     */
    SDK_VARS["ShareFalseLimit"] = "ShareFalseLimit";
    /**
     * 平台用户信息
     */
    SDK_VARS["PlatformUserInfo"] = "PlatformUserInfo";
    /**
     * API统计批次ID
     */
    SDK_VARS["BatchID"] = "BatchID";
    /**
     * API统计信息列表
     */
    SDK_VARS["PendingApiCounterList"] = "PendingApiCounterList";
})(SDK_VARS || (SDK_VARS = {}));
var SDK_EVT;
(function (SDK_EVT) {
    /**
     * 显示banner广告
     */
    SDK_EVT["ShowBanner"] = "\u663E\u793Abanner\u5E7F\u544A";
    /**
     * 播放完banner广告后的回调
     */
    SDK_EVT["ShowBannerCallback"] = "\u64AD\u653E\u5B8Cbanner\u5E7F\u544A\u540E\u7684\u56DE\u8C03";
    /**
     * 检查桌面是否有图标
     */
    SDK_EVT["CheckIsHasDesktopIcon"] = "\u68C0\u67E5\u684C\u9762\u662F\u5426\u6709\u56FE\u6807";
    /**
     * 看视频广告获取奖励
     */
    SDK_EVT["WatchVideoAdForReward"] = "\u770B\u89C6\u9891\u5E7F\u544A\u83B7\u53D6\u5956\u52B1";
    /**
     * 看视频获取金币
     */
    SDK_EVT["WatchVideoForCoin"] = "\u770B\u89C6\u9891\u83B7\u53D6\u91D1\u5E01";
    /**
     * 看视频获取3倍金币奖励
     */
    SDK_EVT["WatchVideoForThriceCoin"] = "\u770B\u89C6\u9891\u83B7\u53D63\u500D\u91D1\u5E01\u5956\u52B1";
    /**
     * 看视频获得皮肤
     */
    SDK_EVT["WatchVideoForSkin"] = "\u770B\u89C6\u9891\u83B7\u5F97\u76AE\u80A4";
    /**
     * 看视频得抽奖券
     */
    SDK_EVT["WatchVideoForTicket"] = "WatchVideoForTicket";
    /**
     * 看视频获得离线奖励
     */
    SDK_EVT["WatchVideoForOfflineReward"] = "WatchVideoForOfflineReward";
    /**
     * 看视频复活重生恢复
     */
    SDK_EVT["WatchVideoForRevive"] = "WatchVideoForRevive";
    /**
     * 每三关看视频获取惊喜大礼包
     */
    SDK_EVT["WatchVideoForGiftPer3Level"] = "WatchVideoForGiftPer3Level";
    /**
     * 看视频开宝箱
     */
    SDK_EVT["WatchVideoAdForOpenTreasureBox"] = "WatchVideoAdForOpenTreasureBox";
    SDK_EVT["OnFrontend"] = "OnFrontend";
    SDK_EVT["OnBackend"] = "OnBackendNotification";
})(SDK_EVT || (SDK_EVT = {}));
var EM_VIDEO_PLAY_TYPE;
(function (EM_VIDEO_PLAY_TYPE) {
    EM_VIDEO_PLAY_TYPE[EM_VIDEO_PLAY_TYPE["VIDEO_PLAY_FAIL"] = 0] = "VIDEO_PLAY_FAIL";
    EM_VIDEO_PLAY_TYPE[EM_VIDEO_PLAY_TYPE["VIDEO_PLAY_FINISH"] = 1] = "VIDEO_PLAY_FINISH";
    EM_VIDEO_PLAY_TYPE[EM_VIDEO_PLAY_TYPE["VIDEO_PLAY_CANCEL"] = 2] = "VIDEO_PLAY_CANCEL";
})(EM_VIDEO_PLAY_TYPE || (EM_VIDEO_PLAY_TYPE = {}));
var EM_STATISTIC_TYPE;
(function (EM_STATISTIC_TYPE) {
    /**
     * 创建
     */
    EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["CREATE"] = 0] = "CREATE";
    /**
     * 加载成功
     */
    EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["LOAD_SUCCESS"] = 1] = "LOAD_SUCCESS";
    /**
     * 加载失败
     */
    EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["LOAD_FAIL"] = 2] = "LOAD_FAIL";
    /**
     * 点击(上报点击)
     */
    EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["CLICK"] = 3] = "CLICK";
    /**
     * 展示
     */
    EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["SHOW"] = 4] = "SHOW";
    /**
     * 关闭
     */
    EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["CLOSE"] = 5] = "CLOSE";
    /**
     * 上报曝光
     */
    EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["EXPOSURE"] = 6] = "EXPOSURE";
    /**
     * 播放取消
     */
    EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["PLAY_CANCEL"] = 7] = "PLAY_CANCEL";
    /**
     * 播放完成
     */
    EM_STATISTIC_TYPE[EM_STATISTIC_TYPE["PLAY_FINISH"] = 8] = "PLAY_FINISH";
})(EM_STATISTIC_TYPE || (EM_STATISTIC_TYPE = {}));
var EM_SHARE_TYPE;
(function (EM_SHARE_TYPE) {
    /**
     * 无策略
     */
    EM_SHARE_TYPE[EM_SHARE_TYPE["None"] = 0] = "None";
    /**
     * 分享
     */
    EM_SHARE_TYPE[EM_SHARE_TYPE["Share"] = 1] = "Share";
    /**
     * 视频
     */
    EM_SHARE_TYPE[EM_SHARE_TYPE["Video"] = 2] = "Video";
})(EM_SHARE_TYPE || (EM_SHARE_TYPE = {}));
var EM_POWER_RECOVERY_TYPE;
(function (EM_POWER_RECOVERY_TYPE) {
    EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["None"] = 0] = "None";
    /**
     * 看视频恢复体力
     */
    EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["WatchVideo"] = 1] = "WatchVideo";
    /**
     * 定时恢复体力
     */
    EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["AutoRecovery"] = 2] = "AutoRecovery";
    /**
     * 倒计时
     */
    EM_POWER_RECOVERY_TYPE[EM_POWER_RECOVERY_TYPE["CountDown"] = 3] = "CountDown";
})(EM_POWER_RECOVERY_TYPE || (EM_POWER_RECOVERY_TYPE = {}));
var POWER_EVT;
(function (POWER_EVT) {
    POWER_EVT["AddPower"] = "AddPower";
})(POWER_EVT || (POWER_EVT = {}));
var TIMER_NAME;
(function (TIMER_NAME) {
    /**
     * 旋转装盘的定时器时间名
     */
    TIMER_NAME["RotateTurnplate"] = "RotateTurnplate";
    TIMER_NAME["SaveLastTimestamp"] = "SaveLastTimestamp";
})(TIMER_NAME || (TIMER_NAME = {}));
var EM_APP_BOX_TYPE;
(function (EM_APP_BOX_TYPE) {
    /**
     * 盒子广告-创建成功
     */
    EM_APP_BOX_TYPE[EM_APP_BOX_TYPE["APPBOX_CREATE_SUCCESS"] = 0] = "APPBOX_CREATE_SUCCESS";
    /**
     * 盒子广告-创建失败
     */
    EM_APP_BOX_TYPE[EM_APP_BOX_TYPE["APPBOX_CREATE_FAIL"] = 1] = "APPBOX_CREATE_FAIL";
    /**
     * 盒子广告-关闭
     */
    EM_APP_BOX_TYPE[EM_APP_BOX_TYPE["APPBOX_CLOSE"] = 2] = "APPBOX_CLOSE";
})(EM_APP_BOX_TYPE || (EM_APP_BOX_TYPE = {}));
var EM_BLOCK_TYPE;
(function (EM_BLOCK_TYPE) {
    /**
     * 盒子广告-创建成功
     */
    EM_BLOCK_TYPE[EM_BLOCK_TYPE["BLOCK_CREATE_SUCCESS"] = 0] = "BLOCK_CREATE_SUCCESS";
    /**
     * 盒子广告-创建失败
     */
    EM_BLOCK_TYPE[EM_BLOCK_TYPE["BLOCK_CREATE_FAIL"] = 1] = "BLOCK_CREATE_FAIL";
    /**
     * 盒子广告-监听积木广告尺寸大小事件
     */
    EM_BLOCK_TYPE[EM_BLOCK_TYPE["BLOCK_ONRESIZE"] = 2] = "BLOCK_ONRESIZE";
})(EM_BLOCK_TYPE || (EM_BLOCK_TYPE = {}));
var EM_SHARE_APP_TYPE;
(function (EM_SHARE_APP_TYPE) {
    EM_SHARE_APP_TYPE["QQ"] = "qq";
    EM_SHARE_APP_TYPE["QQ_FAST_SHARE"] = "qqFastShare";
    EM_SHARE_APP_TYPE["QQ_FAST_SHARE_LIST"] = "qqFastShareList";
    EM_SHARE_APP_TYPE["QZONE"] = "qzone";
    EM_SHARE_APP_TYPE["WECHARTFRIENDS"] = "wechatFriends";
    EM_SHARE_APP_TYPE["WECHATMOMENT"] = "wechatMoment";
})(EM_SHARE_APP_TYPE || (EM_SHARE_APP_TYPE = {}));


/***/ }),

/***/ "./sdk_wx/Main.ts":
/*!************************!*\
  !*** ./sdk_wx/Main.ts ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sdk/SDK/Declare */ "./sdk/SDK/Declare.ts");
/* harmony import */ var _sdk_Commerce_WechatCommerce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sdk/Commerce/WechatCommerce */ "./sdk/Commerce/WechatCommerce.ts");
/* harmony import */ var _sdk_SDK_Enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sdk/SDK/Enum */ "./sdk/SDK/Enum.ts");
/* harmony import */ var _sdk_Manager_AgentMgr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sdk/Manager/AgentMgr */ "./sdk/Manager/AgentMgr.ts");
/* harmony import */ var _sdk_Manager_StatisticMgr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sdk/Manager/StatisticMgr */ "./sdk/Manager/StatisticMgr.ts");
/* harmony import */ var _sdk_Manager_ApiMgr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sdk/Manager/ApiMgr */ "./sdk/Manager/ApiMgr.ts");
/* harmony import */ var _sdk_Manager_DataMgr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sdk/Manager/DataMgr */ "./sdk/Manager/DataMgr.ts");
/* harmony import */ var _sdk_Manager_PowerMgr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sdk/Manager/PowerMgr */ "./sdk/Manager/PowerMgr.ts");
/* harmony import */ var _sdk_Platform_WechatPlatform__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../sdk/Platform/WechatPlatform */ "./sdk/Platform/WechatPlatform.ts");
/* harmony import */ var _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../framework/Utility/LogUtility */ "./framework/Utility/LogUtility.ts");










var Main = /** @class */ (function () {
    function Main() {
        this.SDK_NAME = "ydhw_wx";
        this.ALL_SDK_NAME = "ydhw";
        _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_9__["LogUtility"].IS_ENABLE_DEBUG = true;
        _framework_Utility_LogUtility__WEBPACK_IMPORTED_MODULE_9__["LogUtility"].Instance.Platform = _sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Platform;
        if (!_sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Platform.Initialize()) {
            console.error("Initialize SDK failed!");
            return;
        }
        var platform = new _sdk_Platform_WechatPlatform__WEBPACK_IMPORTED_MODULE_8__["WechatPlatform"]();
        platform.Initialize();
        var commerce = new _sdk_Commerce_WechatCommerce__WEBPACK_IMPORTED_MODULE_1__["WechatCommerce"]();
        commerce._Platform = platform;
        commerce.Platform = platform;
        if (window[this.SDK_NAME] != null) {
            _sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Platform.IsDebug && console.error("已存在: " + this.SDK_NAME);
        }
        else if (commerce != null) {
            _sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Platform.IsDebug && console.log("Main constructor platform.Initialize():", _sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Platform.PlatformType);
            window[this.SDK_NAME] = commerce;
            window[this.ALL_SDK_NAME] = commerce;
        }
        else {
            _sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Platform.IsDebug && console.error("不存在平台对应的SDK");
        }
        _sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Domain.Domain(["http://test-api.ylxyx.cn", "https://api.ylxyx.cn"]).Manager("api/collect").Version("v1").Switch(1);
        _sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Core
            .AddManager(_sdk_SDK_Enum__WEBPACK_IMPORTED_MODULE_2__["ENUM_MANAGER"].Commerce, commerce)
            .AddManager(_sdk_SDK_Enum__WEBPACK_IMPORTED_MODULE_2__["ENUM_MANAGER"].Agent, new _sdk_Manager_AgentMgr__WEBPACK_IMPORTED_MODULE_3__["AgentMgr"]())
            .AddManager(_sdk_SDK_Enum__WEBPACK_IMPORTED_MODULE_2__["ENUM_MANAGER"].Statistic, new _sdk_Manager_StatisticMgr__WEBPACK_IMPORTED_MODULE_4__["StatisticMgr"]())
            .AddManager(_sdk_SDK_Enum__WEBPACK_IMPORTED_MODULE_2__["ENUM_MANAGER"].Data, new _sdk_Manager_DataMgr__WEBPACK_IMPORTED_MODULE_6__["DataMgr"]())
            .AddManager(_sdk_SDK_Enum__WEBPACK_IMPORTED_MODULE_2__["ENUM_MANAGER"].Power, new _sdk_Manager_PowerMgr__WEBPACK_IMPORTED_MODULE_7__["PowerMgr"]())
            .AddManager(_sdk_SDK_Enum__WEBPACK_IMPORTED_MODULE_2__["ENUM_MANAGER"].Api, new _sdk_Manager_ApiMgr__WEBPACK_IMPORTED_MODULE_5__["ApiMgr"]())
            .Initialize();
        _sdk_SDK_Declare__WEBPACK_IMPORTED_MODULE_0__["SDK"].Core.Restore();
        // SDK.Commerce.Login(this, (isOk: boolean) => { });
    }
    return Main;
}());
//激活启动类
new Main();


/***/ }),

/***/ "./src/Utils/TimeUtils.ts":
/*!********************************!*\
  !*** ./src/Utils/TimeUtils.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// 缓存变量
var outCode = 0, valCode = 0, timeout = {}, interval = {};
/**
  * 清除
  * @param data 缓存数据
  * @param key 标志
  */
var clear = function (data, key) {
    var info = data[key];
    if (info) {
        delete data[key];
        Laya.timer.clear(null, info);
    }
};
/**
 * 时间工具类
 * @author Yin
 */
var TimeUtils = /** @class */ (function () {
    function TimeUtils() {
    }
    /**
     * 数字保持两位数
     */
    TimeUtils.formatTen = function (num) {
        return (num > 9 ? '' : '0') + num;
    };
    /**
     * 小时-分-秒
     */
    TimeUtils.formatHour = function (second, sufix) {
        if (sufix === void 0) { sufix = ':'; }
        var ten = TimeUtils.formatTen;
        var hour = second / 3600 | 0;
        var min = (second / 60 | 0) % 60;
        var sec = second % 60;
        return ten(hour) + sufix + ten(min) + sufix + ten(sec);
    };
    /**
     * 获取经过的天数
     * @param time 时间，单位毫秒
     */
    TimeUtils.getDay = function (time) {
        return (time / 3600000 + 8) / 24 | 0; // 时间零点是从早上8点开始的，因此加上8
    };
    /**
     * 检测两个毫秒数是否同一天
     */
    TimeUtils.isSameDay = function (time0, time1) {
        var get = TimeUtils.getDay;
        return get(time0) == get(time1);
    };
    /**
     * 模仿setTimeout
     * @param call
     * @param thisObj
     * @param delay
     */
    TimeUtils.setTimeout = function (call, thisObj, delay) {
        var param = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            param[_i - 3] = arguments[_i];
        }
        var curc = ++outCode;
        var func = timeout[curc] = function () {
            call.apply(thisObj, param);
            delete timeout[curc];
        };
        Laya.timer.once(delay, null, func);
        return curc;
    };
    /**
      * 清除延迟回调
      * @param key 标志
      */
    TimeUtils.clearTimeout = function (key) {
        clear(timeout, key);
    };
    ;
    /**
      * 设置间隔回调
      * @param call 回调函数
      * @param thisObj 回调所属对象
      * @param delay 回调间隔
      */
    TimeUtils.setInterval = function (call, thisObj, delay) {
        var param = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            param[_i - 3] = arguments[_i];
        }
        var curc = ++valCode;
        var func = interval[curc] = function () {
            call.apply(thisObj, param);
        };
        Laya.timer.loop(delay, null, func);
        return curc;
    };
    /**
      * 清除间隔回调
      * @param key
      */
    TimeUtils.clearInterval = function (key) {
        clear(interval, key);
    };
    ;
    TimeUtils.log = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var str = TimeUtils.formatDate(new Date(), "[hh:mm:ss.SSS]");
        params.forEach(function (element) {
            str += " " + JSON.stringify(element);
        });
        console.log(str);
    };
    TimeUtils.formatDate = function (date, fmt) {
        var o = {
            "Y+": date.getFullYear(),
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "S+": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    TimeUtils.formatFullDate = function (date, fmt) {
        var o = {
            "Y+": date.getFullYear(),
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "S+": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt = date.getFullYear() + fmt.substr(2, fmt.length);
    };
    return TimeUtils;
}());
/* harmony default export */ __webpack_exports__["default"] = (TimeUtils);


/***/ })

/******/ });
//# sourceMappingURL=ydhw.wx.sdk.js.map