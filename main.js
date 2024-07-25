/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/component/Utils.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/component/Utils.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bindHandlers": () => (/* binding */ bindHandlers),
/* harmony export */   "injectTiny": () => (/* binding */ injectTiny)
/* harmony export */ });
const validEvents = [
    'Activate',
    'AddUndo',
    'BeforeAddUndo',
    'BeforeExecCommand',
    'BeforeGetContent',
    'BeforeRenderUI',
    'BeforeSetContent',
    'BeforePaste',
    'Blur',
    'Change',
    'ClearUndos',
    'Click',
    'ContextMenu',
    'Copy',
    'Cut',
    'Dblclick',
    'Deactivate',
    'Dirty',
    'Drag',
    'DragDrop',
    'DragEnd',
    'DragGesture',
    'DragOver',
    'Drop',
    'ExecCommand',
    'Focus',
    'FocusIn',
    'FocusOut',
    'GetContent',
    'Hide',
    'Init',
    'KeyDown',
    'KeyPress',
    'KeyUp',
    'LoadContent',
    'MouseDown',
    'MouseEnter',
    'MouseLeave',
    'MouseMove',
    'MouseOut',
    'MouseOver',
    'MouseUp',
    'NodeChange',
    'ObjectResizeStart',
    'ObjectResized',
    'ObjectSelected',
    'Paste',
    'PostProcess',
    'PostRender',
    'PreProcess',
    'ProgressState',
    'Redo',
    'Remove',
    'Reset',
    'ResizeEditor',
    'SaveContent',
    'SelectionChange',
    'SetAttrib',
    'SetContent',
    'Show',
    'Submit',
    'Undo',
    'VisualAid'
];
const bindHandlers = (editor, dispatch) => {
    validEvents.forEach((eventName) => {
        editor.on(eventName, (e) => {
            dispatch(eventName.toLowerCase(), {
                eventName,
                event: e,
                editor
            });
        });
    });
};
const injectTiny = (doc, url, cb) => {
    const script = doc.createElement('script');
    script.referrerPolicy = 'origin';
    script.type = 'application/javascript';
    script.src = url;
    script.onload = cb;
    if (doc.head) {
        doc.head.appendChild(script);
    }
};

//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ "./node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/index.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/index.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _component_Editor_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/Editor.svelte */ "./node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/component/Editor.svelte");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_component_Editor_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js ***!
  \*********************************************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//download.js v4.2, by dandavis; 2008-2016. [MIT] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(this, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
			defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
			mimeType = strMimeType || defaultMime,
			payload = data,
			url = !strFileName && !strMimeType && payload,
			anchor = document.createElement("a"),
			toString = function(a){return String(a);},
			myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
			fileName = strFileName || "download",
			blob,
			reader;
			myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
	  
		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload=[payload, mimeType];
			mimeType=payload[0];
			payload=payload[1];
		}


		if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
		  	if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
        		var ajax=new XMLHttpRequest();
        		ajax.open( "GET", url, true);
        		ajax.responseType = 'blob';
        		ajax.onload= function(e){ 
				  download(e.target.response, fileName, defaultMime);
				};
        		setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
			    return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){
		
			if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
				payload=dataUrlToBlob(payload);
				mimeType=payload.type || defaultMime;
			}else{			
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
					saver(payload) ; // everyone else can save dataURLs un-processed
			}
			
		}else{//not data url, is it a string with special needs?
			if(/([\x80-\xff])/.test(payload)){			  
				var i=0, tempUiArr= new Uint8Array(payload.length), mx=tempUiArr.length;
				for(i;i<mx;++i) tempUiArr[i]= payload.charCodeAt(i);
			 	payload=new myBlob([tempUiArr], {type: mimeType});
			}		  
		}
		blob = payload instanceof myBlob ?
			payload :
			new myBlob([payload], {type: mimeType}) ;


		function dataUrlToBlob(strUrl) {
			var parts= strUrl.split(/[:;,]/),
			type= parts[1],
			decoder= parts[2] == "base64" ? atob : decodeURIComponent,
			binData= decoder( parts.pop() ),
			mx= binData.length,
			i= 0,
			uiArr= new Uint8Array(mx);

			for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

			return new myBlob([uiArr], {type: type});
		 }

		function saver(url, winMode){

			if ('download' in anchor) { //html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function() {
					anchor.click();
					document.body.removeChild(anchor);
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				if(/^data:/.test(url))	url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if(!winMode && /^data:/.test(url)){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src=url;
			setTimeout(function(){ document.body.removeChild(f); }, 333);

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else{
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===toString ){
				try{
					return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL support:
			reader=new FileReader();
			reader.onload=function(e){
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
}));


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/action.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/action.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dndzone": () => (/* binding */ dndzone)
/* harmony export */ });
/* harmony import */ var _pointerAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pointerAction */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/pointerAction.js");
/* harmony import */ var _keyboardAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboardAction */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/keyboardAction.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js");
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/util */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/util.js");





/**
 * A custom action to turn any container to a dnd zone and all of its direct children to draggables
 * Supports mouse, touch and keyboard interactions.
 * Dispatches two events that the container is expected to react to by modifying its list of items,
 * which will then feed back in to this action via the update function
 *
 * @typedef {object} Options
 * @property {array} items - the list of items that was used to generate the children of the given node (the list used in the #each block
 * @property {string} [type] - the type of the dnd zone. children dragged from here can only be dropped in other zones of the same type, default to a base type
 * @property {number} [flipDurationMs] - if the list animated using flip (recommended), specifies the flip duration such that everything syncs with it without conflict, defaults to zero
 * @property {boolean} [dragDisabled]
 * @property {boolean} [morphDisabled] - whether dragged element should morph to zone dimensions
 * @property {boolean} [dropFromOthersDisabled]
 * @property {number} [zoneTabIndex] - set the tabindex of the list container when not dragging
 * @property {object} [dropTargetStyle]
 * @property {string[]} [dropTargetClasses]
 * @property {function} [transformDraggedElement]
 * @param {HTMLElement} node - the element to enhance
 * @param {Options} options
 * @return {{update: function, destroy: function}}
 */
function dndzone(node, options) {
    validateOptions(options);
    const pointerZone = (0,_pointerAction__WEBPACK_IMPORTED_MODULE_0__.dndzone)(node, options);
    const keyboardZone = (0,_keyboardAction__WEBPACK_IMPORTED_MODULE_1__.dndzone)(node, options);
    return {
        update: newOptions => {
            validateOptions(newOptions);
            pointerZone.update(newOptions);
            keyboardZone.update(newOptions);
        },
        destroy: () => {
            pointerZone.destroy();
            keyboardZone.destroy();
        }
    };
}

function validateOptions(options) {
    /*eslint-disable*/
    const {
        items,
        flipDurationMs,
        type,
        dragDisabled,
        morphDisabled,
        dropFromOthersDisabled,
        zoneTabIndex,
        dropTargetStyle,
        dropTargetClasses,
        transformDraggedElement,
        autoAriaDisabled,
        centreDraggedOnCursor,
        ...rest
    } = options;
    /*eslint-enable*/
    if (Object.keys(rest).length > 0) {
        console.warn(`dndzone will ignore unknown options`, rest);
    }
    if (!items) {
        throw new Error("no 'items' key provided to dndzone");
    }
    const itemWithMissingId = items.find(item => !{}.hasOwnProperty.call(item, _constants__WEBPACK_IMPORTED_MODULE_2__.ITEM_ID_KEY));
    if (itemWithMissingId) {
        throw new Error(`missing '${_constants__WEBPACK_IMPORTED_MODULE_2__.ITEM_ID_KEY}' property for item ${(0,_helpers_util__WEBPACK_IMPORTED_MODULE_3__.toString)(itemWithMissingId)}`);
    }
    if (dropTargetClasses && !Array.isArray(dropTargetClasses)) {
        throw new Error(`dropTargetClasses should be an array but instead it is a ${typeof dropTargetClasses}, ${(0,_helpers_util__WEBPACK_IMPORTED_MODULE_3__.toString)(dropTargetClasses)}`);
    }
    if (zoneTabIndex && !isInt(zoneTabIndex)) {
        throw new Error(`zoneTabIndex should be a number but instead it is a ${typeof zoneTabIndex}, ${(0,_helpers_util__WEBPACK_IMPORTED_MODULE_3__.toString)(zoneTabIndex)}`);
    }
}

function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DRAGGED_ELEMENT_ID": () => (/* binding */ DRAGGED_ELEMENT_ID),
/* harmony export */   "ITEM_ID_KEY": () => (/* binding */ ITEM_ID_KEY),
/* harmony export */   "SHADOW_ELEMENT_ATTRIBUTE_NAME": () => (/* binding */ SHADOW_ELEMENT_ATTRIBUTE_NAME),
/* harmony export */   "SHADOW_ITEM_MARKER_PROPERTY_NAME": () => (/* binding */ SHADOW_ITEM_MARKER_PROPERTY_NAME),
/* harmony export */   "SHADOW_PLACEHOLDER_ITEM_ID": () => (/* binding */ SHADOW_PLACEHOLDER_ITEM_ID),
/* harmony export */   "SOURCES": () => (/* binding */ SOURCES),
/* harmony export */   "TRIGGERS": () => (/* binding */ TRIGGERS),
/* harmony export */   "decrementActiveDropZoneCount": () => (/* binding */ decrementActiveDropZoneCount),
/* harmony export */   "incrementActiveDropZoneCount": () => (/* binding */ incrementActiveDropZoneCount),
/* harmony export */   "isOnServer": () => (/* binding */ isOnServer),
/* harmony export */   "overrideItemIdKeyNameBeforeInitialisingDndZones": () => (/* binding */ overrideItemIdKeyNameBeforeInitialisingDndZones),
/* harmony export */   "printDebug": () => (/* binding */ printDebug),
/* harmony export */   "setDebugMode": () => (/* binding */ setDebugMode)
/* harmony export */ });
/* harmony import */ var _helpers_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/dispatcher */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/dispatcher.js");


const TRIGGERS = {
    DRAG_STARTED: "dragStarted",
    DRAGGED_ENTERED: _helpers_dispatcher__WEBPACK_IMPORTED_MODULE_0__.DRAGGED_ENTERED_EVENT_NAME,
    DRAGGED_ENTERED_ANOTHER: "dragEnteredAnother",
    DRAGGED_OVER_INDEX: _helpers_dispatcher__WEBPACK_IMPORTED_MODULE_0__.DRAGGED_OVER_INDEX_EVENT_NAME,
    DRAGGED_LEFT: _helpers_dispatcher__WEBPACK_IMPORTED_MODULE_0__.DRAGGED_LEFT_EVENT_NAME,
    DRAGGED_LEFT_ALL: "draggedLeftAll",
    DROPPED_INTO_ZONE: "droppedIntoZone",
    DROPPED_INTO_ANOTHER: "droppedIntoAnother",
    DROPPED_OUTSIDE_OF_ANY: "droppedOutsideOfAny",
    DRAG_STOPPED: "dragStopped"
};

const SOURCES = {
    POINTER: "pointer",
    KEYBOARD: "keyboard"
};

const SHADOW_ITEM_MARKER_PROPERTY_NAME = "isDndShadowItem";
const SHADOW_ELEMENT_ATTRIBUTE_NAME = "data-is-dnd-shadow-item";
const SHADOW_PLACEHOLDER_ITEM_ID = "id:dnd-shadow-placeholder-0000";
const DRAGGED_ELEMENT_ID = "dnd-action-dragged-el";

let ITEM_ID_KEY = "id";
let activeDndZoneCount = 0;
function incrementActiveDropZoneCount() {
    activeDndZoneCount++;
}
function decrementActiveDropZoneCount() {
    if (activeDndZoneCount === 0) {
        throw new Error("Bug! trying to decrement when there are no dropzones");
    }
    activeDndZoneCount--;
}

/**
 * Allows using another key instead of "id" in the items data. This is global and applies to all dndzones.
 * Has to be called when there are no rendered dndzones whatsoever.
 * @param {String} newKeyName
 * @throws {Error} if it was called when there are rendered dndzones or if it is given the wrong type (not a string)
 */
function overrideItemIdKeyNameBeforeInitialisingDndZones(newKeyName) {
    if (activeDndZoneCount > 0) {
        throw new Error("can only override the id key before initialising any dndzone");
    }
    if (typeof newKeyName !== "string") {
        throw new Error("item id key has to be a string");
    }
    printDebug(() => ["overriding item id key name", newKeyName]);
    ITEM_ID_KEY = newKeyName;
}

const isOnServer = typeof window === "undefined";

let printDebug = () => {};

/**
 * Allows the user to show/hide console debug output
 * * @param {Boolean} isDebug
 */
function setDebugMode(isDebug) {
    if (isDebug) {
        printDebug = (generateMessage, logFunction = console.debug) => {
            const message = generateMessage();
            if (Array.isArray(message)) {
                logFunction(...message);
            } else {
                logFunction(message);
            }
        };
    } else {
        printDebug = () => {};
    }
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/aria.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/aria.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alertToScreenReader": () => (/* binding */ alertToScreenReader),
/* harmony export */   "destroyAria": () => (/* binding */ destroyAria),
/* harmony export */   "initAria": () => (/* binding */ initAria)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js");


const INSTRUCTION_IDs = {
    DND_ZONE_ACTIVE: "dnd-zone-active",
    DND_ZONE_DRAG_DISABLED: "dnd-zone-drag-disabled"
};
const ID_TO_INSTRUCTION = {
    [INSTRUCTION_IDs.DND_ZONE_ACTIVE]: "Tab to one the items and press space-bar or enter to start dragging it",
    [INSTRUCTION_IDs.DND_ZONE_DRAG_DISABLED]: "This is a disabled drag and drop list"
};

const ALERT_DIV_ID = "dnd-action-aria-alert";
let alertsDiv;

function initAriaOnBrowser() {
    if (alertsDiv) {
        // it is already initialized
        return;
    }
    // setting the dynamic alerts
    alertsDiv = document.createElement("div");
    (function initAlertsDiv() {
        alertsDiv.id = ALERT_DIV_ID;
        // tab index -1 makes the alert be read twice on chrome for some reason
        //alertsDiv.tabIndex = -1;
        alertsDiv.style.position = "fixed";
        alertsDiv.style.bottom = "0";
        alertsDiv.style.left = "0";
        alertsDiv.style.zIndex = "-5";
        alertsDiv.style.opacity = "0";
        alertsDiv.style.height = "0";
        alertsDiv.style.width = "0";
        alertsDiv.setAttribute("role", "alert");
    })();
    document.body.prepend(alertsDiv);

    // setting the instructions
    Object.entries(ID_TO_INSTRUCTION).forEach(([id, txt]) => document.body.prepend(instructionToHiddenDiv(id, txt)));
}

/**
 * Initializes the static aria instructions so they can be attached to zones
 * @return {{DND_ZONE_ACTIVE: string, DND_ZONE_DRAG_DISABLED: string} | null} - the IDs for static aria instruction (to be used via aria-describedby) or null on the server
 */
function initAria() {
    if (_constants__WEBPACK_IMPORTED_MODULE_0__.isOnServer) return null;
    if (document.readyState === "complete") {
        initAriaOnBrowser();
    } else {
        window.addEventListener("DOMContentLoaded", initAriaOnBrowser);
    }
    return {...INSTRUCTION_IDs};
}

/**
 * Removes all the artifacts (dom elements) added by this module
 */
function destroyAria() {
    if (_constants__WEBPACK_IMPORTED_MODULE_0__.isOnServer || !alertsDiv) return;
    Object.keys(ID_TO_INSTRUCTION).forEach(id => document.getElementById(id)?.remove());
    alertsDiv.remove();
    alertsDiv = undefined;
}

function instructionToHiddenDiv(id, txt) {
    const div = document.createElement("div");
    div.id = id;
    div.innerHTML = `<p>${txt}</p>`;
    div.style.display = "none";
    div.style.position = "fixed";
    div.style.zIndex = "-5";
    return div;
}

/**
 * Will make the screen reader alert the provided text to the user
 * @param {string} txt
 */
function alertToScreenReader(txt) {
    if (_constants__WEBPACK_IMPORTED_MODULE_0__.isOnServer) return;
    if (!alertsDiv) {
        initAriaOnBrowser();
    }
    alertsDiv.innerHTML = "";
    const alertText = document.createTextNode(txt);
    alertsDiv.appendChild(alertText);
    // this is needed for Safari
    alertsDiv.style.display = "none";
    alertsDiv.style.display = "inline";
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/dispatcher.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/dispatcher.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DRAGGED_ENTERED_EVENT_NAME": () => (/* binding */ DRAGGED_ENTERED_EVENT_NAME),
/* harmony export */   "DRAGGED_LEFT_DOCUMENT_EVENT_NAME": () => (/* binding */ DRAGGED_LEFT_DOCUMENT_EVENT_NAME),
/* harmony export */   "DRAGGED_LEFT_EVENT_NAME": () => (/* binding */ DRAGGED_LEFT_EVENT_NAME),
/* harmony export */   "DRAGGED_LEFT_TYPES": () => (/* binding */ DRAGGED_LEFT_TYPES),
/* harmony export */   "DRAGGED_OVER_INDEX_EVENT_NAME": () => (/* binding */ DRAGGED_OVER_INDEX_EVENT_NAME),
/* harmony export */   "dispatchConsiderEvent": () => (/* binding */ dispatchConsiderEvent),
/* harmony export */   "dispatchDraggedElementEnteredContainer": () => (/* binding */ dispatchDraggedElementEnteredContainer),
/* harmony export */   "dispatchDraggedElementIsOverIndex": () => (/* binding */ dispatchDraggedElementIsOverIndex),
/* harmony export */   "dispatchDraggedElementLeftContainerForAnother": () => (/* binding */ dispatchDraggedElementLeftContainerForAnother),
/* harmony export */   "dispatchDraggedElementLeftContainerForNone": () => (/* binding */ dispatchDraggedElementLeftContainerForNone),
/* harmony export */   "dispatchDraggedLeftDocument": () => (/* binding */ dispatchDraggedLeftDocument),
/* harmony export */   "dispatchFinalizeEvent": () => (/* binding */ dispatchFinalizeEvent)
/* harmony export */ });
// external events
const FINALIZE_EVENT_NAME = "finalize";
const CONSIDER_EVENT_NAME = "consider";

/**
 * @typedef {Object} Info
 * @property {string} trigger
 * @property {string} id
 * @property {string} source
 * @param {Node} el
 * @param {Array} items
 * @param {Info} info
 */
function dispatchFinalizeEvent(el, items, info) {
    el.dispatchEvent(
        new CustomEvent(FINALIZE_EVENT_NAME, {
            detail: {items, info}
        })
    );
}

/**
 * Dispatches a consider event
 * @param {Node} el
 * @param {Array} items
 * @param {Info} info
 */
function dispatchConsiderEvent(el, items, info) {
    el.dispatchEvent(
        new CustomEvent(CONSIDER_EVENT_NAME, {
            detail: {items, info}
        })
    );
}

// internal events
const DRAGGED_ENTERED_EVENT_NAME = "draggedEntered";
const DRAGGED_LEFT_EVENT_NAME = "draggedLeft";
const DRAGGED_OVER_INDEX_EVENT_NAME = "draggedOverIndex";
const DRAGGED_LEFT_DOCUMENT_EVENT_NAME = "draggedLeftDocument";

const DRAGGED_LEFT_TYPES = {
    LEFT_FOR_ANOTHER: "leftForAnother",
    OUTSIDE_OF_ANY: "outsideOfAny"
};

function dispatchDraggedElementEnteredContainer(containerEl, indexObj, draggedEl) {
    containerEl.dispatchEvent(
        new CustomEvent(DRAGGED_ENTERED_EVENT_NAME, {
            detail: {indexObj, draggedEl}
        })
    );
}

/**
 * @param containerEl - the dropzone the element left
 * @param draggedEl - the dragged element
 * @param theOtherDz - the new dropzone the element entered
 */
function dispatchDraggedElementLeftContainerForAnother(containerEl, draggedEl, theOtherDz) {
    containerEl.dispatchEvent(
        new CustomEvent(DRAGGED_LEFT_EVENT_NAME, {
            detail: {draggedEl, type: DRAGGED_LEFT_TYPES.LEFT_FOR_ANOTHER, theOtherDz}
        })
    );
}

function dispatchDraggedElementLeftContainerForNone(containerEl, draggedEl) {
    containerEl.dispatchEvent(
        new CustomEvent(DRAGGED_LEFT_EVENT_NAME, {
            detail: {draggedEl, type: DRAGGED_LEFT_TYPES.OUTSIDE_OF_ANY}
        })
    );
}
function dispatchDraggedElementIsOverIndex(containerEl, indexObj, draggedEl) {
    containerEl.dispatchEvent(
        new CustomEvent(DRAGGED_OVER_INDEX_EVENT_NAME, {
            detail: {indexObj, draggedEl}
        })
    );
}
function dispatchDraggedLeftDocument(draggedEl) {
    window.dispatchEvent(
        new CustomEvent(DRAGGED_LEFT_DOCUMENT_EVENT_NAME, {
            detail: {draggedEl}
        })
    );
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/intersection.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/intersection.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calcDistanceBetweenCenters": () => (/* binding */ calcDistanceBetweenCenters),
/* harmony export */   "calcInnerDistancesBetweenPointAndSidesOfElement": () => (/* binding */ calcInnerDistancesBetweenPointAndSidesOfElement),
/* harmony export */   "findCenter": () => (/* binding */ findCenter),
/* harmony export */   "findCenterOfElement": () => (/* binding */ findCenterOfElement),
/* harmony export */   "getAbsoluteRect": () => (/* binding */ getAbsoluteRect),
/* harmony export */   "getAbsoluteRectNoTransforms": () => (/* binding */ getAbsoluteRectNoTransforms),
/* harmony export */   "getBoundingRectNoTransforms": () => (/* binding */ getBoundingRectNoTransforms),
/* harmony export */   "isCenterOfAInsideB": () => (/* binding */ isCenterOfAInsideB),
/* harmony export */   "isElementOffDocument": () => (/* binding */ isElementOffDocument),
/* harmony export */   "isPointInsideRect": () => (/* binding */ isPointInsideRect)
/* harmony export */ });
// This is based off https://stackoverflow.com/questions/27745438/how-to-compute-getboundingclientrect-without-considering-transforms/57876601#57876601
// It removes the transforms that are potentially applied by the flip animations
/**
 * Gets the bounding rect but removes transforms (ex: flip animation)
 * @param {HTMLElement} el
 * @return {{top: number, left: number, bottom: number, right: number}}
 */
function getBoundingRectNoTransforms(el) {
    let ta;
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const tx = style.transform;

    if (tx) {
        let sx, sy, dx, dy;
        if (tx.startsWith("matrix3d(")) {
            ta = tx.slice(9, -1).split(/, /);
            sx = +ta[0];
            sy = +ta[5];
            dx = +ta[12];
            dy = +ta[13];
        } else if (tx.startsWith("matrix(")) {
            ta = tx.slice(7, -1).split(/, /);
            sx = +ta[0];
            sy = +ta[3];
            dx = +ta[4];
            dy = +ta[5];
        } else {
            return rect;
        }

        const to = style.transformOrigin;
        const x = rect.x - dx - (1 - sx) * parseFloat(to);
        const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1));
        const w = sx ? rect.width / sx : el.offsetWidth;
        const h = sy ? rect.height / sy : el.offsetHeight;
        return {
            x: x,
            y: y,
            width: w,
            height: h,
            top: y,
            right: x + w,
            bottom: y + h,
            left: x
        };
    } else {
        return rect;
    }
}

/**
 * Gets the absolute bounding rect (accounts for the window's scroll position and removes transforms)
 * @param {HTMLElement} el
 * @return {{top: number, left: number, bottom: number, right: number}}
 */
function getAbsoluteRectNoTransforms(el) {
    const rect = getBoundingRectNoTransforms(el);
    return {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX
    };
}

/**
 * Gets the absolute bounding rect (accounts for the window's scroll position)
 * @param {HTMLElement} el
 * @return {{top: number, left: number, bottom: number, right: number}}
 */
function getAbsoluteRect(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX
    };
}

/**
 * finds the center :)
 * @typedef {Object} Rect
 * @property {number} top
 * @property {number} bottom
 * @property {number} left
 * @property {number} right
 * @param {Rect} rect
 * @return {{x: number, y: number}}
 */
function findCenter(rect) {
    return {
        x: (rect.left + rect.right) / 2,
        y: (rect.top + rect.bottom) / 2
    };
}

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 * @param {Point} pointA
 * @param {Point} pointB
 * @return {number}
 */
function calcDistance(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}

/**
 * @param {Point} point
 * @param {Rect} rect
 * @return {boolean|boolean}
 */
function isPointInsideRect(point, rect) {
    return point.y <= rect.bottom && point.y >= rect.top && point.x >= rect.left && point.x <= rect.right;
}

/**
 * find the absolute coordinates of the center of a dom element
 * @param el {HTMLElement}
 * @returns {{x: number, y: number}}
 */
function findCenterOfElement(el) {
    return findCenter(getAbsoluteRect(el));
}

/**
 * @param {HTMLElement} elA
 * @param {HTMLElement} elB
 * @return {boolean}
 */
function isCenterOfAInsideB(elA, elB) {
    const centerOfA = findCenterOfElement(elA);
    const rectOfB = getAbsoluteRectNoTransforms(elB);
    return isPointInsideRect(centerOfA, rectOfB);
}

/**
 * @param {HTMLElement|ChildNode} elA
 * @param {HTMLElement|ChildNode} elB
 * @return {number}
 */
function calcDistanceBetweenCenters(elA, elB) {
    const centerOfA = findCenterOfElement(elA);
    const centerOfB = findCenterOfElement(elB);
    return calcDistance(centerOfA, centerOfB);
}

/**
 * @param {HTMLElement} el - the element to check
 * @returns {boolean} - true if the element in its entirety is off screen including the scrollable area (the normal dom events look at the mouse rather than the element)
 */
function isElementOffDocument(el) {
    const rect = getAbsoluteRect(el);
    return rect.right < 0 || rect.left > document.documentElement.scrollWidth || rect.bottom < 0 || rect.top > document.documentElement.scrollHeight;
}

/**
 * If the point is inside the element returns its distances from the sides, otherwise returns null
 * @param {Point} point
 * @param {HTMLElement} el
 * @return {null|{top: number, left: number, bottom: number, right: number}}
 */
function calcInnerDistancesBetweenPointAndSidesOfElement(point, el) {
    const rect = getAbsoluteRect(el);
    if (!isPointInsideRect(point, rect)) {
        return null;
    }
    return {
        top: point.y - rect.top,
        bottom: rect.bottom - point.y,
        left: point.x - rect.left,
        // TODO - figure out what is so special about right (why the rect is too big)
        right: Math.min(rect.right, document.documentElement.clientWidth) - point.x
    };
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/listUtil.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/listUtil.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findWouldBeIndex": () => (/* binding */ findWouldBeIndex),
/* harmony export */   "resetIndexesCache": () => (/* binding */ resetIndexesCache),
/* harmony export */   "resetIndexesCacheForDz": () => (/* binding */ resetIndexesCacheForDz)
/* harmony export */ });
/* harmony import */ var _intersection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./intersection */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/intersection.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js");



let dzToShadowIndexToRect;

/**
 * Resets the cache that allows for smarter "would be index" resolution. Should be called after every drag operation
 */
function resetIndexesCache() {
    (0,_constants__WEBPACK_IMPORTED_MODULE_1__.printDebug)(() => "resetting indexes cache");
    dzToShadowIndexToRect = new Map();
}
resetIndexesCache();

/**
 * Resets the cache that allows for smarter "would be index" resolution for a specific dropzone, should be called after the zone was scrolled
 * @param {HTMLElement} dz
 */
function resetIndexesCacheForDz(dz) {
    (0,_constants__WEBPACK_IMPORTED_MODULE_1__.printDebug)(() => "resetting indexes cache for dz");
    dzToShadowIndexToRect.delete(dz);
}

/**
 * Caches the coordinates of the shadow element when it's in a certain index in a certain dropzone.
 * Helpful in order to determine "would be index" more effectively
 * @param {HTMLElement} dz
 * @return {number} - the shadow element index
 */
function cacheShadowRect(dz) {
    const shadowElIndex = Array.from(dz.children).findIndex(child => child.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__.SHADOW_ELEMENT_ATTRIBUTE_NAME));
    if (shadowElIndex >= 0) {
        if (!dzToShadowIndexToRect.has(dz)) {
            dzToShadowIndexToRect.set(dz, new Map());
        }
        dzToShadowIndexToRect.get(dz).set(shadowElIndex, (0,_intersection__WEBPACK_IMPORTED_MODULE_0__.getAbsoluteRectNoTransforms)(dz.children[shadowElIndex]));
        return shadowElIndex;
    }
    return undefined;
}

/**
 * @typedef {Object} Index
 * @property {number} index - the would be index
 * @property {boolean} isProximityBased - false if the element is actually over the index, true if it is not over it but this index is the closest
 */
/**
 * Find the index for the dragged element in the list it is dragged over
 * @param {HTMLElement} floatingAboveEl
 * @param {HTMLElement} collectionBelowEl
 * @returns {Index|null} -  if the element is over the container the Index object otherwise null
 */
function findWouldBeIndex(floatingAboveEl, collectionBelowEl) {
    if (!(0,_intersection__WEBPACK_IMPORTED_MODULE_0__.isCenterOfAInsideB)(floatingAboveEl, collectionBelowEl)) {
        return null;
    }
    const children = collectionBelowEl.children;
    // the container is empty, floating element should be the first
    if (children.length === 0) {
        return {index: 0, isProximityBased: true};
    }
    const shadowElIndex = cacheShadowRect(collectionBelowEl);

    // the search could be more efficient but keeping it simple for now
    // a possible improvement: pass in the lastIndex it was found in and check there first, then expand from there
    for (let i = 0; i < children.length; i++) {
        if ((0,_intersection__WEBPACK_IMPORTED_MODULE_0__.isCenterOfAInsideB)(floatingAboveEl, children[i])) {
            const cachedShadowRect = dzToShadowIndexToRect.has(collectionBelowEl) && dzToShadowIndexToRect.get(collectionBelowEl).get(i);
            if (cachedShadowRect) {
                if (!(0,_intersection__WEBPACK_IMPORTED_MODULE_0__.isPointInsideRect)((0,_intersection__WEBPACK_IMPORTED_MODULE_0__.findCenterOfElement)(floatingAboveEl), cachedShadowRect)) {
                    return {index: shadowElIndex, isProximityBased: false};
                }
            }
            return {index: i, isProximityBased: false};
        }
    }
    // this can happen if there is space around the children so the floating element has
    //entered the container but not any of the children, in this case we will find the nearest child
    let minDistanceSoFar = Number.MAX_VALUE;
    let indexOfMin = undefined;
    // we are checking all of them because we don't know whether we are dealing with a horizontal or vertical container and where the floating element entered from
    for (let i = 0; i < children.length; i++) {
        const distance = (0,_intersection__WEBPACK_IMPORTED_MODULE_0__.calcDistanceBetweenCenters)(floatingAboveEl, children[i]);
        if (distance < minDistanceSoFar) {
            minDistanceSoFar = distance;
            indexOfMin = i;
        }
    }
    return {index: indexOfMin, isProximityBased: true};
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/observer.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/observer.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observe": () => (/* binding */ observe),
/* harmony export */   "unobserve": () => (/* binding */ unobserve)
/* harmony export */ });
/* harmony import */ var _listUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listUtil */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/listUtil.js");
/* harmony import */ var _intersection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./intersection */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/intersection.js");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dispatcher */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/dispatcher.js");
/* harmony import */ var _scroller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scroller */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/scroller.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/util.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js");







const INTERVAL_MS = 200;
const TOLERANCE_PX = 10;
const {scrollIfNeeded, resetScrolling} = (0,_scroller__WEBPACK_IMPORTED_MODULE_3__.makeScroller)();
let next;

/**
 * Tracks the dragged elements and performs the side effects when it is dragged over a drop zone (basically dispatching custom-events scrolling)
 * @param {Set<HTMLElement>} dropZones
 * @param {HTMLElement} draggedEl
 * @param {number} [intervalMs = INTERVAL_MS]
 */
function observe(draggedEl, dropZones, intervalMs = INTERVAL_MS) {
    // initialization
    let lastDropZoneFound;
    let lastIndexFound;
    let lastIsDraggedInADropZone = false;
    let lastCentrePositionOfDragged;
    // We are sorting to make sure that in case of nested zones of the same type the one "on top" is considered first
    const dropZonesFromDeepToShallow = Array.from(dropZones).sort((dz1, dz2) => (0,_util__WEBPACK_IMPORTED_MODULE_4__.getDepth)(dz2) - (0,_util__WEBPACK_IMPORTED_MODULE_4__.getDepth)(dz1));

    /**
     * The main function in this module. Tracks where everything is/ should be a take the actions
     */
    function andNow() {
        const currentCenterOfDragged = (0,_intersection__WEBPACK_IMPORTED_MODULE_1__.findCenterOfElement)(draggedEl);
        const scrolled = scrollIfNeeded(currentCenterOfDragged, lastDropZoneFound);
        // we only want to make a new decision after the element was moved a bit to prevent flickering
        if (
            !scrolled &&
            lastCentrePositionOfDragged &&
            Math.abs(lastCentrePositionOfDragged.x - currentCenterOfDragged.x) < TOLERANCE_PX &&
            Math.abs(lastCentrePositionOfDragged.y - currentCenterOfDragged.y) < TOLERANCE_PX
        ) {
            next = window.setTimeout(andNow, intervalMs);
            return;
        }
        if ((0,_intersection__WEBPACK_IMPORTED_MODULE_1__.isElementOffDocument)(draggedEl)) {
            (0,_constants__WEBPACK_IMPORTED_MODULE_5__.printDebug)(() => "off document");
            (0,_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchDraggedLeftDocument)(draggedEl);
            return;
        }

        lastCentrePositionOfDragged = currentCenterOfDragged;
        // this is a simple algorithm, potential improvement: first look at lastDropZoneFound
        let isDraggedInADropZone = false;
        for (const dz of dropZonesFromDeepToShallow) {
            if (scrolled) (0,_listUtil__WEBPACK_IMPORTED_MODULE_0__.resetIndexesCacheForDz)(lastDropZoneFound);
            const indexObj = (0,_listUtil__WEBPACK_IMPORTED_MODULE_0__.findWouldBeIndex)(draggedEl, dz);
            if (indexObj === null) {
                // it is not inside
                continue;
            }
            const {index} = indexObj;
            isDraggedInADropZone = true;
            // the element is over a container
            if (dz !== lastDropZoneFound) {
                lastDropZoneFound && (0,_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchDraggedElementLeftContainerForAnother)(lastDropZoneFound, draggedEl, dz);
                (0,_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchDraggedElementEnteredContainer)(dz, indexObj, draggedEl);
                lastDropZoneFound = dz;
            } else if (index !== lastIndexFound) {
                (0,_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchDraggedElementIsOverIndex)(dz, indexObj, draggedEl);
                lastIndexFound = index;
            }
            // we handle looping with the 'continue' statement above
            break;
        }
        // the first time the dragged element is not in any dropzone we need to notify the last dropzone it was in
        if (!isDraggedInADropZone && lastIsDraggedInADropZone && lastDropZoneFound) {
            (0,_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchDraggedElementLeftContainerForNone)(lastDropZoneFound, draggedEl);
            lastDropZoneFound = undefined;
            lastIndexFound = undefined;
            lastIsDraggedInADropZone = false;
        } else {
            lastIsDraggedInADropZone = true;
        }
        next = window.setTimeout(andNow, intervalMs);
    }
    andNow();
}

// assumption - we can only observe one dragged element at a time, this could be changed in the future
function unobserve() {
    (0,_constants__WEBPACK_IMPORTED_MODULE_5__.printDebug)(() => "unobserving");
    clearTimeout(next);
    resetScrolling();
    (0,_listUtil__WEBPACK_IMPORTED_MODULE_0__.resetIndexesCache)();
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/scroller.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/scroller.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeScroller": () => (/* binding */ makeScroller)
/* harmony export */ });
/* harmony import */ var _intersection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./intersection */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/intersection.js");

const SCROLL_ZONE_PX = 25;

function makeScroller() {
    let scrollingInfo;
    function resetScrolling() {
        scrollingInfo = {directionObj: undefined, stepPx: 0};
    }
    resetScrolling();
    // directionObj {x: 0|1|-1, y:0|1|-1} - 1 means down in y and right in x
    function scrollContainer(containerEl) {
        const {directionObj, stepPx} = scrollingInfo;
        if (directionObj) {
            containerEl.scrollBy(directionObj.x * stepPx, directionObj.y * stepPx);
            window.requestAnimationFrame(() => scrollContainer(containerEl));
        }
    }
    function calcScrollStepPx(distancePx) {
        return SCROLL_ZONE_PX - distancePx;
    }

    /**
     * If the pointer is next to the sides of the element to scroll, will trigger scrolling
     * Can be called repeatedly with updated pointer and elementToScroll values without issues
     * @return {boolean} - true if scrolling was needed
     */
    function scrollIfNeeded(pointer, elementToScroll) {
        if (!elementToScroll) {
            return false;
        }
        const distances = (0,_intersection__WEBPACK_IMPORTED_MODULE_0__.calcInnerDistancesBetweenPointAndSidesOfElement)(pointer, elementToScroll);
        if (distances === null) {
            resetScrolling();
            return false;
        }
        const isAlreadyScrolling = !!scrollingInfo.directionObj;
        let [scrollingVertically, scrollingHorizontally] = [false, false];
        // vertical
        if (elementToScroll.scrollHeight > elementToScroll.clientHeight) {
            if (distances.bottom < SCROLL_ZONE_PX) {
                scrollingVertically = true;
                scrollingInfo.directionObj = {x: 0, y: 1};
                scrollingInfo.stepPx = calcScrollStepPx(distances.bottom);
            } else if (distances.top < SCROLL_ZONE_PX) {
                scrollingVertically = true;
                scrollingInfo.directionObj = {x: 0, y: -1};
                scrollingInfo.stepPx = calcScrollStepPx(distances.top);
            }
            if (!isAlreadyScrolling && scrollingVertically) {
                scrollContainer(elementToScroll);
                return true;
            }
        }
        // horizontal
        if (elementToScroll.scrollWidth > elementToScroll.clientWidth) {
            if (distances.right < SCROLL_ZONE_PX) {
                scrollingHorizontally = true;
                scrollingInfo.directionObj = {x: 1, y: 0};
                scrollingInfo.stepPx = calcScrollStepPx(distances.right);
            } else if (distances.left < SCROLL_ZONE_PX) {
                scrollingHorizontally = true;
                scrollingInfo.directionObj = {x: -1, y: 0};
                scrollingInfo.stepPx = calcScrollStepPx(distances.left);
            }
            if (!isAlreadyScrolling && scrollingHorizontally) {
                scrollContainer(elementToScroll);
                return true;
            }
        }
        resetScrolling();
        return false;
    }

    return {
        scrollIfNeeded,
        resetScrolling
    };
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/styler.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/styler.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDraggedElementFrom": () => (/* binding */ createDraggedElementFrom),
/* harmony export */   "decorateShadowEl": () => (/* binding */ decorateShadowEl),
/* harmony export */   "hideElement": () => (/* binding */ hideElement),
/* harmony export */   "morphDraggedElementToBeLike": () => (/* binding */ morphDraggedElementToBeLike),
/* harmony export */   "moveDraggedElementToWasDroppedState": () => (/* binding */ moveDraggedElementToWasDroppedState),
/* harmony export */   "preventShrinking": () => (/* binding */ preventShrinking),
/* harmony export */   "styleActiveDropZones": () => (/* binding */ styleActiveDropZones),
/* harmony export */   "styleDraggable": () => (/* binding */ styleDraggable),
/* harmony export */   "styleInactiveDropZones": () => (/* binding */ styleInactiveDropZones),
/* harmony export */   "unDecorateShadowElement": () => (/* binding */ unDecorateShadowElement)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js");
/* harmony import */ var _intersection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./intersection */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/intersection.js");
/* harmony import */ var _svelteNodeClone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svelteNodeClone */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/svelteNodeClone.js");




const TRANSITION_DURATION_SECONDS = 0.2;

/**
 * private helper function - creates a transition string for a property
 * @param {string} property
 * @return {string} - the transition string
 */
function trs(property) {
    return `${property} ${TRANSITION_DURATION_SECONDS}s ease`;
}
/**
 * clones the given element and applies proper styles and transitions to the dragged element
 * @param {HTMLElement} originalElement
 * @param {Point} [positionCenterOnXY]
 * @return {Node} - the cloned, styled element
 */
function createDraggedElementFrom(originalElement, positionCenterOnXY) {
    const rect = originalElement.getBoundingClientRect();
    const draggedEl = (0,_svelteNodeClone__WEBPACK_IMPORTED_MODULE_2__.svelteNodeClone)(originalElement);
    copyStylesFromTo(originalElement, draggedEl);
    draggedEl.id = _constants__WEBPACK_IMPORTED_MODULE_0__.DRAGGED_ELEMENT_ID;
    draggedEl.style.position = "fixed";
    let elTopPx = rect.top;
    let elLeftPx = rect.left;
    draggedEl.style.top = `${elTopPx}px`;
    draggedEl.style.left = `${elLeftPx}px`;
    if (positionCenterOnXY) {
        const center = (0,_intersection__WEBPACK_IMPORTED_MODULE_1__.findCenter)(rect);
        elTopPx -= center.y - positionCenterOnXY.y;
        elLeftPx -= center.x - positionCenterOnXY.x;
        window.setTimeout(() => {
            draggedEl.style.top = `${elTopPx}px`;
            draggedEl.style.left = `${elLeftPx}px`;
        }, 0);
    }
    draggedEl.style.margin = "0";
    // we can't have relative or automatic height and width or it will break the illusion
    draggedEl.style.boxSizing = "border-box";
    draggedEl.style.height = `${rect.height}px`;
    draggedEl.style.width = `${rect.width}px`;
    draggedEl.style.transition = `${trs("top")}, ${trs("left")}, ${trs("background-color")}, ${trs("opacity")}, ${trs("color")} `;
    // this is a workaround for a strange browser bug that causes the right border to disappear when all the transitions are added at the same time
    window.setTimeout(() => (draggedEl.style.transition += `, ${trs("width")}, ${trs("height")}`), 0);
    draggedEl.style.zIndex = "9999";
    draggedEl.style.cursor = "grabbing";

    return draggedEl;
}

/**
 * styles the dragged element to a 'dropped' state
 * @param {HTMLElement} draggedEl
 */
function moveDraggedElementToWasDroppedState(draggedEl) {
    draggedEl.style.cursor = "grab";
}

/**
 * Morphs the dragged element style, maintains the mouse pointer within the element
 * @param {HTMLElement} draggedEl
 * @param {HTMLElement} copyFromEl - the element the dragged element should look like, typically the shadow element
 * @param {number} currentMouseX
 * @param {number} currentMouseY
 * @param {function} transformDraggedElement - function to transform the dragged element, does nothing by default.
 */
function morphDraggedElementToBeLike(draggedEl, copyFromEl, currentMouseX, currentMouseY, transformDraggedElement) {
    const newRect = copyFromEl.getBoundingClientRect();
    const draggedElRect = draggedEl.getBoundingClientRect();
    const widthChange = newRect.width - draggedElRect.width;
    const heightChange = newRect.height - draggedElRect.height;
    if (widthChange || heightChange) {
        const relativeDistanceOfMousePointerFromDraggedSides = {
            left: (currentMouseX - draggedElRect.left) / draggedElRect.width,
            top: (currentMouseY - draggedElRect.top) / draggedElRect.height
        };
        draggedEl.style.height = `${newRect.height}px`;
        draggedEl.style.width = `${newRect.width}px`;
        draggedEl.style.left = `${parseFloat(draggedEl.style.left) - relativeDistanceOfMousePointerFromDraggedSides.left * widthChange}px`;
        draggedEl.style.top = `${parseFloat(draggedEl.style.top) - relativeDistanceOfMousePointerFromDraggedSides.top * heightChange}px`;
    }

    /// other properties
    copyStylesFromTo(copyFromEl, draggedEl);
    transformDraggedElement();
}

/**
 * @param {HTMLElement} copyFromEl
 * @param {HTMLElement} copyToEl
 */
function copyStylesFromTo(copyFromEl, copyToEl) {
    const computedStyle = window.getComputedStyle(copyFromEl);
    Array.from(computedStyle)
        .filter(
            s =>
                s.startsWith("background") ||
                s.startsWith("padding") ||
                s.startsWith("font") ||
                s.startsWith("text") ||
                s.startsWith("align") ||
                s.startsWith("justify") ||
                s.startsWith("display") ||
                s.startsWith("flex") ||
                s.startsWith("border") ||
                s === "opacity" ||
                s === "color" ||
                s === "list-style-type"
        )
        .forEach(s => copyToEl.style.setProperty(s, computedStyle.getPropertyValue(s), computedStyle.getPropertyPriority(s)));
}

/**
 * makes the element compatible with being draggable
 * @param {HTMLElement} draggableEl
 * @param {boolean} dragDisabled
 */
function styleDraggable(draggableEl, dragDisabled) {
    draggableEl.draggable = false;
    draggableEl.ondragstart = () => false;
    if (!dragDisabled) {
        draggableEl.style.userSelect = "none";
        draggableEl.style.WebkitUserSelect = "none";
        draggableEl.style.cursor = "grab";
    } else {
        draggableEl.style.userSelect = "";
        draggableEl.style.WebkitUserSelect = "";
        draggableEl.style.cursor = "";
    }
}

/**
 * Hides the provided element so that it can stay in the dom without interrupting
 * @param {HTMLElement} dragTarget
 */
function hideElement(dragTarget) {
    dragTarget.style.display = "none";
    dragTarget.style.position = "fixed";
    dragTarget.style.zIndex = "-5";
}

/**
 * styles the shadow element
 * @param {HTMLElement} shadowEl
 */
function decorateShadowEl(shadowEl) {
    shadowEl.style.visibility = "hidden";
    shadowEl.setAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__.SHADOW_ELEMENT_ATTRIBUTE_NAME, "true");
}

/**
 * undo the styles the shadow element
 * @param {HTMLElement} shadowEl
 */
function unDecorateShadowElement(shadowEl) {
    shadowEl.style.visibility = "";
    shadowEl.removeAttribute(_constants__WEBPACK_IMPORTED_MODULE_0__.SHADOW_ELEMENT_ATTRIBUTE_NAME);
}

/**
 * will mark the given dropzones as visually active
 * @param {Array<HTMLElement>} dropZones
 * @param {Function} getStyles - maps a dropzone to a styles object (so the styles can be removed)
 * @param {Function} getClasses - maps a dropzone to a classList
 */
function styleActiveDropZones(dropZones, getStyles = () => {}, getClasses = () => []) {
    dropZones.forEach(dz => {
        const styles = getStyles(dz);
        Object.keys(styles).forEach(style => {
            dz.style[style] = styles[style];
        });
        getClasses(dz).forEach(c => dz.classList.add(c));
    });
}

/**
 * will remove the 'active' styling from given dropzones
 * @param {Array<HTMLElement>} dropZones
 * @param {Function} getStyles - maps a dropzone to a styles object
 * @param {Function} getClasses - maps a dropzone to a classList
 */
function styleInactiveDropZones(dropZones, getStyles = () => {}, getClasses = () => []) {
    dropZones.forEach(dz => {
        const styles = getStyles(dz);
        Object.keys(styles).forEach(style => {
            dz.style[style] = "";
        });
        getClasses(dz).forEach(c => dz.classList.contains(c) && dz.classList.remove(c));
    });
}

/**
 * will prevent the provided element from shrinking by setting its minWidth and minHeight to the current width and height values
 * @param {HTMLElement} el
 * @return {function(): void} - run this function to undo the operation and restore the original values
 */
function preventShrinking(el) {
    const originalMinHeight = el.style.minHeight;
    el.style.minHeight = window.getComputedStyle(el).getPropertyValue("height");
    const originalMinWidth = el.style.minWidth;
    el.style.minWidth = window.getComputedStyle(el).getPropertyValue("width");
    return function undo() {
        el.style.minHeight = originalMinHeight;
        el.style.minWidth = originalMinWidth;
    };
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/svelteNodeClone.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/svelteNodeClone.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "svelteNodeClone": () => (/* binding */ svelteNodeClone)
/* harmony export */ });
/**
 * Fixes svelte issue when cloning node containing (or being) <select> which will loose it's value.
 * Since svelte manages select value internally.
 * @see https://github.com/sveltejs/svelte/issues/6717
 * @see https://github.com/isaacHagoel/svelte-dnd-action/issues/306
 * 
 * @param {HTMLElement} el 
 * @returns 
 */
function svelteNodeClone(el) {
  const cloned = el.cloneNode(true);

  const values = [];
  const elIsSelect = el.tagName === "SELECT";
  const selects = elIsSelect ? [el] : [...el.querySelectorAll('select')];
  for (const select of selects) {
    values.push(select.value);
  }

  if (selects.length <= 0) {
    return cloned;
  }

  const clonedSelects = elIsSelect ? [cloned] : [...cloned.querySelectorAll('select')];
  for (let i = 0; i < clonedSelects.length; i++) {
    const select = clonedSelects[i];
    const value = values[i];
    const optionEl = select.querySelector(`option[value="${value}"`);
    if (optionEl) {
      optionEl.setAttribute('selected', true);
    }
  }

  return cloned;
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/util.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/util.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "areArraysShallowEqualSameOrder": () => (/* binding */ areArraysShallowEqualSameOrder),
/* harmony export */   "areObjectsShallowEqual": () => (/* binding */ areObjectsShallowEqual),
/* harmony export */   "getDepth": () => (/* binding */ getDepth),
/* harmony export */   "toString": () => (/* binding */ toString)
/* harmony export */ });
/**
 * @param {Object} object
 * @return {string}
 */
function toString(object) {
    return JSON.stringify(object, null, 2);
}

/**
 * Finds the depth of the given node in the DOM tree
 * @param {HTMLElement} node
 * @return {number} - the depth of the node
 */
function getDepth(node) {
    if (!node) {
        throw new Error("cannot get depth of a falsy node");
    }
    return _getDepth(node, 0);
}
function _getDepth(node, countSoFar = 0) {
    if (!node.parentElement) {
        return countSoFar - 1;
    }
    return _getDepth(node.parentElement, countSoFar + 1);
}

/**
 * A simple util to shallow compare objects quickly, it doesn't validate the arguments so pass objects in
 * @param {Object} objA
 * @param {Object} objB
 * @return {boolean} - true if objA and objB are shallow equal
 */
function areObjectsShallowEqual(objA, objB) {
    if (Object.keys(objA).length !== Object.keys(objB).length) {
        return false;
    }
    for (const keyA in objA) {
        if (!{}.hasOwnProperty.call(objB, keyA) || objB[keyA] !== objA[keyA]) {
            return false;
        }
    }
    return true;
}

/**
 * Shallow compares two arrays
 * @param arrA
 * @param arrB
 * @return {boolean} - whether the arrays are shallow equal
 */
function areArraysShallowEqualSameOrder(arrA, arrB) {
    if (arrA.length !== arrB.length) {
        return false;
    }
    for (let i = 0; i < arrA.length; i++) {
        if (arrA[i] !== arrB[i]) {
            return false;
        }
    }
    return true;
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/windowScroller.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/windowScroller.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "armWindowScroller": () => (/* binding */ armWindowScroller),
/* harmony export */   "disarmWindowScroller": () => (/* binding */ disarmWindowScroller),
/* harmony export */   "updateMousePosition": () => (/* binding */ updateMousePosition)
/* harmony export */ });
/* harmony import */ var _scroller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroller */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/scroller.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js");
/* harmony import */ var _listUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listUtil */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/listUtil.js");




const INTERVAL_MS = 300;
let mousePosition;

/**
 * Do not use this! it is visible for testing only until we get over the issue Cypress not triggering the mousemove listeners
 * // TODO - make private (remove export)
 * @param {{clientX: number, clientY: number}} e
 */
function updateMousePosition(e) {
    const c = e.touches ? e.touches[0] : e;
    mousePosition = {x: c.clientX, y: c.clientY};
}
const {scrollIfNeeded, resetScrolling} = (0,_scroller__WEBPACK_IMPORTED_MODULE_0__.makeScroller)();
let next;

function loop() {
    if (mousePosition) {
        const scrolled = scrollIfNeeded(mousePosition, document.documentElement);
        if (scrolled) (0,_listUtil__WEBPACK_IMPORTED_MODULE_2__.resetIndexesCache)();
    }
    next = window.setTimeout(loop, INTERVAL_MS);
}

/**
 * will start watching the mouse pointer and scroll the window if it goes next to the edges
 */
function armWindowScroller() {
    (0,_constants__WEBPACK_IMPORTED_MODULE_1__.printDebug)(() => "arming window scroller");
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("touchmove", updateMousePosition);
    loop();
}

/**
 * will stop watching the mouse pointer and won't scroll the window anymore
 */
function disarmWindowScroller() {
    (0,_constants__WEBPACK_IMPORTED_MODULE_1__.printDebug)(() => "disarming window scroller");
    window.removeEventListener("mousemove", updateMousePosition);
    window.removeEventListener("touchmove", updateMousePosition);
    mousePosition = undefined;
    window.clearTimeout(next);
    resetScrolling();
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/index.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/index.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DRAGGED_ELEMENT_ID": () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.DRAGGED_ELEMENT_ID),
/* harmony export */   "SHADOW_ITEM_MARKER_PROPERTY_NAME": () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.SHADOW_ITEM_MARKER_PROPERTY_NAME),
/* harmony export */   "SHADOW_PLACEHOLDER_ITEM_ID": () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.SHADOW_PLACEHOLDER_ITEM_ID),
/* harmony export */   "SOURCES": () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.SOURCES),
/* harmony export */   "TRIGGERS": () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.TRIGGERS),
/* harmony export */   "alertToScreenReader": () => (/* reexport safe */ _helpers_aria__WEBPACK_IMPORTED_MODULE_1__.alertToScreenReader),
/* harmony export */   "dndzone": () => (/* reexport safe */ _action_js__WEBPACK_IMPORTED_MODULE_0__.dndzone),
/* harmony export */   "overrideItemIdKeyNameBeforeInitialisingDndZones": () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.overrideItemIdKeyNameBeforeInitialisingDndZones),
/* harmony export */   "setDebugMode": () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_2__.setDebugMode)
/* harmony export */ });
/* harmony import */ var _action_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action.js */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/action.js");
/* harmony import */ var _helpers_aria__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/aria */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/aria.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js");





/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/keyboardAction.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/keyboardAction.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dndzone": () => (/* binding */ dndzone)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js");
/* harmony import */ var _helpers_styler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/styler */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/styler.js");
/* harmony import */ var _helpers_dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/dispatcher */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/dispatcher.js");
/* harmony import */ var _helpers_aria__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/aria */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/aria.js");
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/util */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/util.js");







const DEFAULT_DROP_ZONE_TYPE = "--any--";
const DEFAULT_DROP_TARGET_STYLE = {
    outline: "rgba(255, 255, 102, 0.7) solid 2px"
};

let isDragging = false;
let draggedItemType;
let focusedDz;
let focusedDzLabel = "";
let focusedItem;
let focusedItemId;
let focusedItemLabel = "";
const allDragTargets = new WeakSet();
const elToKeyDownListeners = new WeakMap();
const elToFocusListeners = new WeakMap();
const dzToHandles = new Map();
const dzToConfig = new Map();
const typeToDropZones = new Map();

/* TODO (potentially)
 * what's the deal with the black border of voice-reader not following focus?
 * maybe keep focus on the last dragged item upon drop?
 */

let INSTRUCTION_IDs;

/* drop-zones registration management */
function registerDropZone(dropZoneEl, type) {
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "registering drop-zone if absent");
    if (typeToDropZones.size === 0) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "adding global keydown and click handlers");
        INSTRUCTION_IDs = (0,_helpers_aria__WEBPACK_IMPORTED_MODULE_3__.initAria)();
        window.addEventListener("keydown", globalKeyDownHandler);
        window.addEventListener("click", globalClickHandler);
    }
    if (!typeToDropZones.has(type)) {
        typeToDropZones.set(type, new Set());
    }
    if (!typeToDropZones.get(type).has(dropZoneEl)) {
        typeToDropZones.get(type).add(dropZoneEl);
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.incrementActiveDropZoneCount)();
    }
}
function unregisterDropZone(dropZoneEl, type) {
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "unregistering drop-zone");
    if (focusedDz === dropZoneEl) {
        handleDrop();
    }
    typeToDropZones.get(type).delete(dropZoneEl);
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.decrementActiveDropZoneCount)();
    if (typeToDropZones.get(type).size === 0) {
        typeToDropZones.delete(type);
    }
    if (typeToDropZones.size === 0) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "removing global keydown and click handlers");
        window.removeEventListener("keydown", globalKeyDownHandler);
        window.removeEventListener("click", globalClickHandler);
        INSTRUCTION_IDs = undefined;
        (0,_helpers_aria__WEBPACK_IMPORTED_MODULE_3__.destroyAria)();
    }
}

function globalKeyDownHandler(e) {
    if (!isDragging) return;
    switch (e.key) {
        case "Escape": {
            handleDrop();
            break;
        }
    }
}

function globalClickHandler() {
    if (!isDragging) return;
    if (!allDragTargets.has(document.activeElement)) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "clicked outside of any draggable");
        handleDrop();
    }
}

function handleZoneFocus(e) {
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "zone focus");
    if (!isDragging) return;
    const newlyFocusedDz = e.currentTarget;
    if (newlyFocusedDz === focusedDz) return;

    focusedDzLabel = newlyFocusedDz.getAttribute("aria-label") || "";
    const {items: originItems} = dzToConfig.get(focusedDz);
    const originItem = originItems.find(item => item[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY] === focusedItemId);
    const originIdx = originItems.indexOf(originItem);
    const itemToMove = originItems.splice(originIdx, 1)[0];
    const {items: targetItems, autoAriaDisabled} = dzToConfig.get(newlyFocusedDz);
    if (
        newlyFocusedDz.getBoundingClientRect().top < focusedDz.getBoundingClientRect().top ||
        newlyFocusedDz.getBoundingClientRect().left < focusedDz.getBoundingClientRect().left
    ) {
        targetItems.push(itemToMove);
        if (!autoAriaDisabled) {
            (0,_helpers_aria__WEBPACK_IMPORTED_MODULE_3__.alertToScreenReader)(`Moved item ${focusedItemLabel} to the end of the list ${focusedDzLabel}`);
        }
    } else {
        targetItems.unshift(itemToMove);
        if (!autoAriaDisabled) {
            (0,_helpers_aria__WEBPACK_IMPORTED_MODULE_3__.alertToScreenReader)(`Moved item ${focusedItemLabel} to the beginning of the list ${focusedDzLabel}`);
        }
    }
    const dzFrom = focusedDz;
    (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchFinalizeEvent)(dzFrom, originItems, {trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DROPPED_INTO_ANOTHER, id: focusedItemId, source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.KEYBOARD});
    (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchFinalizeEvent)(newlyFocusedDz, targetItems, {trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DROPPED_INTO_ZONE, id: focusedItemId, source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.KEYBOARD});
    focusedDz = newlyFocusedDz;
}

function triggerAllDzsUpdate() {
    dzToHandles.forEach(({update}, dz) => update(dzToConfig.get(dz)));
}

function handleDrop(dispatchConsider = true) {
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "drop");
    if (!dzToConfig.get(focusedDz).autoAriaDisabled) {
        (0,_helpers_aria__WEBPACK_IMPORTED_MODULE_3__.alertToScreenReader)(`Stopped dragging item ${focusedItemLabel}`);
    }
    if (allDragTargets.has(document.activeElement)) {
        document.activeElement.blur();
    }
    if (dispatchConsider) {
        (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchConsiderEvent)(focusedDz, dzToConfig.get(focusedDz).items, {
            trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DRAG_STOPPED,
            id: focusedItemId,
            source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.KEYBOARD
        });
    }
    (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_1__.styleInactiveDropZones)(
        typeToDropZones.get(draggedItemType),
        dz => dzToConfig.get(dz).dropTargetStyle,
        dz => dzToConfig.get(dz).dropTargetClasses
    );
    focusedItem = null;
    focusedItemId = null;
    focusedItemLabel = "";
    draggedItemType = null;
    focusedDz = null;
    focusedDzLabel = "";
    isDragging = false;
    triggerAllDzsUpdate();
}
//////
function dndzone(node, options) {
    const config = {
        items: undefined,
        type: undefined,
        dragDisabled: false,
        zoneTabIndex: 0,
        dropFromOthersDisabled: false,
        dropTargetStyle: DEFAULT_DROP_TARGET_STYLE,
        dropTargetClasses: [],
        autoAriaDisabled: false
    };

    function swap(arr, i, j) {
        if (arr.length <= 1) return;
        arr.splice(j, 1, arr.splice(i, 1, arr[j])[0]);
    }

    function handleKeyDown(e) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => ["handling key down", e.key]);
        switch (e.key) {
            case "Enter":
            case " ": {
                // we don't want to affect nested input elements or clickable elements
                if ((e.target.disabled !== undefined || e.target.href || e.target.isContentEditable) && !allDragTargets.has(e.target)) {
                    return;
                }
                e.preventDefault(); // preventing scrolling on spacebar
                e.stopPropagation();
                if (isDragging) {
                    // TODO - should this trigger a drop? only here or in general (as in when hitting space or enter outside of any zone)?
                    handleDrop();
                } else {
                    // drag start
                    handleDragStart(e);
                }
                break;
            }
            case "ArrowDown":
            case "ArrowRight": {
                if (!isDragging) return;
                e.preventDefault(); // prevent scrolling
                e.stopPropagation();
                const {items} = dzToConfig.get(node);
                const children = Array.from(node.children);
                const idx = children.indexOf(e.currentTarget);
                (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => ["arrow down", idx]);
                if (idx < children.length - 1) {
                    if (!config.autoAriaDisabled) {
                        (0,_helpers_aria__WEBPACK_IMPORTED_MODULE_3__.alertToScreenReader)(`Moved item ${focusedItemLabel} to position ${idx + 2} in the list ${focusedDzLabel}`);
                    }
                    swap(items, idx, idx + 1);
                    (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchFinalizeEvent)(node, items, {trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DROPPED_INTO_ZONE, id: focusedItemId, source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.KEYBOARD});
                }
                break;
            }
            case "ArrowUp":
            case "ArrowLeft": {
                if (!isDragging) return;
                e.preventDefault(); // prevent scrolling
                e.stopPropagation();
                const {items} = dzToConfig.get(node);
                const children = Array.from(node.children);
                const idx = children.indexOf(e.currentTarget);
                (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => ["arrow up", idx]);
                if (idx > 0) {
                    if (!config.autoAriaDisabled) {
                        (0,_helpers_aria__WEBPACK_IMPORTED_MODULE_3__.alertToScreenReader)(`Moved item ${focusedItemLabel} to position ${idx} in the list ${focusedDzLabel}`);
                    }
                    swap(items, idx, idx - 1);
                    (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchFinalizeEvent)(node, items, {trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DROPPED_INTO_ZONE, id: focusedItemId, source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.KEYBOARD});
                }
                break;
            }
        }
    }
    function handleDragStart(e) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "drag start");
        setCurrentFocusedItem(e.currentTarget);
        focusedDz = node;
        draggedItemType = config.type;
        isDragging = true;
        const dropTargets = Array.from(typeToDropZones.get(config.type)).filter(dz => dz === focusedDz || !dzToConfig.get(dz).dropFromOthersDisabled);
        (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_1__.styleActiveDropZones)(
            dropTargets,
            dz => dzToConfig.get(dz).dropTargetStyle,
            dz => dzToConfig.get(dz).dropTargetClasses
        );
        if (!config.autoAriaDisabled) {
            let msg = `Started dragging item ${focusedItemLabel}. Use the arrow keys to move it within its list ${focusedDzLabel}`;
            if (dropTargets.length > 1) {
                msg += `, or tab to another list in order to move the item into it`;
            }
            (0,_helpers_aria__WEBPACK_IMPORTED_MODULE_3__.alertToScreenReader)(msg);
        }
        (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatchConsiderEvent)(node, dzToConfig.get(node).items, {trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DRAG_STARTED, id: focusedItemId, source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.KEYBOARD});
        triggerAllDzsUpdate();
    }

    function handleClick(e) {
        if (!isDragging) return;
        if (e.currentTarget === focusedItem) return;
        e.stopPropagation();
        handleDrop(false);
        handleDragStart(e);
    }
    function setCurrentFocusedItem(draggableEl) {
        const {items} = dzToConfig.get(node);
        const children = Array.from(node.children);
        const focusedItemIdx = children.indexOf(draggableEl);
        focusedItem = draggableEl;
        focusedItem.tabIndex = 0;
        focusedItemId = items[focusedItemIdx][_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY];
        focusedItemLabel = children[focusedItemIdx].getAttribute("aria-label") || "";
    }

    function configure({
        items = [],
        type: newType = DEFAULT_DROP_ZONE_TYPE,
        dragDisabled = false,
        zoneTabIndex = 0,
        dropFromOthersDisabled = false,
        dropTargetStyle = DEFAULT_DROP_TARGET_STYLE,
        dropTargetClasses = [],
        autoAriaDisabled = false
    }) {
        config.items = [...items];
        config.dragDisabled = dragDisabled;
        config.dropFromOthersDisabled = dropFromOthersDisabled;
        config.zoneTabIndex = zoneTabIndex;
        config.dropTargetStyle = dropTargetStyle;
        config.dropTargetClasses = dropTargetClasses;
        config.autoAriaDisabled = autoAriaDisabled;
        if (config.type && newType !== config.type) {
            unregisterDropZone(node, config.type);
        }
        config.type = newType;
        registerDropZone(node, newType);
        if (!autoAriaDisabled) {
            node.setAttribute("aria-disabled", dragDisabled);
            node.setAttribute("role", "list");
            node.setAttribute("aria-describedby", dragDisabled ? INSTRUCTION_IDs.DND_ZONE_DRAG_DISABLED : INSTRUCTION_IDs.DND_ZONE_ACTIVE);
        }
        dzToConfig.set(node, config);

        if (isDragging) {
            node.tabIndex =
                node === focusedDz ||
                focusedItem.contains(node) ||
                config.dropFromOthersDisabled ||
                (focusedDz && config.type !== dzToConfig.get(focusedDz).type)
                    ? -1
                    : 0;
        } else {
            node.tabIndex = config.zoneTabIndex;
        }

        node.addEventListener("focus", handleZoneFocus);

        for (let i = 0; i < node.children.length; i++) {
            const draggableEl = node.children[i];
            allDragTargets.add(draggableEl);
            draggableEl.tabIndex = isDragging ? -1 : 0;
            if (!autoAriaDisabled) {
                draggableEl.setAttribute("role", "listitem");
            }
            draggableEl.removeEventListener("keydown", elToKeyDownListeners.get(draggableEl));
            draggableEl.removeEventListener("click", elToFocusListeners.get(draggableEl));
            if (!dragDisabled) {
                draggableEl.addEventListener("keydown", handleKeyDown);
                elToKeyDownListeners.set(draggableEl, handleKeyDown);
                draggableEl.addEventListener("click", handleClick);
                elToFocusListeners.set(draggableEl, handleClick);
            }
            if (isDragging && config.items[i][_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY] === focusedItemId) {
                (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => ["focusing on", {i, focusedItemId}]);
                // if it is a nested dropzone, it was re-rendered and we need to refresh our pointer
                focusedItem = draggableEl;
                focusedItem.tabIndex = 0;
                // without this the element loses focus if it moves backwards in the list
                draggableEl.focus();
            }
        }
    }
    configure(options);

    const handles = {
        update: newOptions => {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => `keyboard dndzone will update newOptions: ${(0,_helpers_util__WEBPACK_IMPORTED_MODULE_4__.toString)(newOptions)}`);
            configure(newOptions);
        },
        destroy: () => {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "keyboard dndzone will destroy");
            unregisterDropZone(node, config.type);
            dzToConfig.delete(node);
            dzToHandles.delete(node);
        }
    };
    dzToHandles.set(node, handles);
    return handles;
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/pointerAction.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/pointerAction.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dndzone": () => (/* binding */ dndzone)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/constants.js");
/* harmony import */ var _helpers_observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/observer */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/observer.js");
/* harmony import */ var _helpers_windowScroller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/windowScroller */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/windowScroller.js");
/* harmony import */ var _helpers_styler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/styler */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/styler.js");
/* harmony import */ var _helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/dispatcher */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/dispatcher.js");
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/util */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/util.js");
/* harmony import */ var _helpers_intersection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/intersection */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/helpers/intersection.js");








const DEFAULT_DROP_ZONE_TYPE = "--any--";
const MIN_OBSERVATION_INTERVAL_MS = 100;
const MIN_MOVEMENT_BEFORE_DRAG_START_PX = 3;
const DEFAULT_DROP_TARGET_STYLE = {
    outline: "rgba(255, 255, 102, 0.7) solid 2px"
};

let originalDragTarget;
let draggedEl;
let draggedElData;
let draggedElType;
let originDropZone;
let originIndex;
let shadowElData;
let shadowElDropZone;
let dragStartMousePosition;
let currentMousePosition;
let isWorkingOnPreviousDrag = false;
let finalizingPreviousDrag = false;
let unlockOriginDzMinDimensions;
let isDraggedOutsideOfAnyDz = false;
let scheduledForRemovalAfterDrop = [];

// a map from type to a set of drop-zones
const typeToDropZones = new Map();
// important - this is needed because otherwise the config that would be used for everyone is the config of the element that created the event listeners
const dzToConfig = new Map();
// this is needed in order to be able to cleanup old listeners and avoid stale closures issues (as the listener is defined within each zone)
const elToMouseDownListener = new WeakMap();

/* drop-zones registration management */
function registerDropZone(dropZoneEl, type) {
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "registering drop-zone if absent");
    if (!typeToDropZones.has(type)) {
        typeToDropZones.set(type, new Set());
    }
    if (!typeToDropZones.get(type).has(dropZoneEl)) {
        typeToDropZones.get(type).add(dropZoneEl);
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.incrementActiveDropZoneCount)();
    }
}
function unregisterDropZone(dropZoneEl, type) {
    typeToDropZones.get(type).delete(dropZoneEl);
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.decrementActiveDropZoneCount)();
    if (typeToDropZones.get(type).size === 0) {
        typeToDropZones.delete(type);
    }
}

/* functions to manage observing the dragged element and trigger custom drag-events */
function watchDraggedElement() {
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "watching dragged element");
    (0,_helpers_windowScroller__WEBPACK_IMPORTED_MODULE_2__.armWindowScroller)();
    const dropZones = typeToDropZones.get(draggedElType);
    for (const dz of dropZones) {
        dz.addEventListener(_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.DRAGGED_ENTERED_EVENT_NAME, handleDraggedEntered);
        dz.addEventListener(_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.DRAGGED_LEFT_EVENT_NAME, handleDraggedLeft);
        dz.addEventListener(_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.DRAGGED_OVER_INDEX_EVENT_NAME, handleDraggedIsOverIndex);
    }
    window.addEventListener(_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.DRAGGED_LEFT_DOCUMENT_EVENT_NAME, handleDrop);
    // it is important that we don't have an interval that is faster than the flip duration because it can cause elements to jump bach and forth
    const observationIntervalMs = Math.max(
        MIN_OBSERVATION_INTERVAL_MS,
        ...Array.from(dropZones.keys()).map(dz => dzToConfig.get(dz).dropAnimationDurationMs)
    );
    (0,_helpers_observer__WEBPACK_IMPORTED_MODULE_1__.observe)(draggedEl, dropZones, observationIntervalMs * 1.07);
}
function unWatchDraggedElement() {
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "unwatching dragged element");
    (0,_helpers_windowScroller__WEBPACK_IMPORTED_MODULE_2__.disarmWindowScroller)();
    const dropZones = typeToDropZones.get(draggedElType);
    for (const dz of dropZones) {
        dz.removeEventListener(_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.DRAGGED_ENTERED_EVENT_NAME, handleDraggedEntered);
        dz.removeEventListener(_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.DRAGGED_LEFT_EVENT_NAME, handleDraggedLeft);
        dz.removeEventListener(_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.DRAGGED_OVER_INDEX_EVENT_NAME, handleDraggedIsOverIndex);
    }
    window.removeEventListener(_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.DRAGGED_LEFT_DOCUMENT_EVENT_NAME, handleDrop);
    (0,_helpers_observer__WEBPACK_IMPORTED_MODULE_1__.unobserve)();
}

// finds the initial placeholder that is placed there on drag start
function findShadowPlaceHolderIdx(items) {
    return items.findIndex(item => item[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY] === _constants__WEBPACK_IMPORTED_MODULE_0__.SHADOW_PLACEHOLDER_ITEM_ID);
}
function findShadowElementIdx(items) {
    // checking that the id is not the placeholder's for Dragula like usecases
    return items.findIndex(item => !!item[_constants__WEBPACK_IMPORTED_MODULE_0__.SHADOW_ITEM_MARKER_PROPERTY_NAME] && item[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY] !== _constants__WEBPACK_IMPORTED_MODULE_0__.SHADOW_PLACEHOLDER_ITEM_ID);
}

/* custom drag-events handlers */
function handleDraggedEntered(e) {
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => ["dragged entered", e.currentTarget, e.detail]);
    let {items, dropFromOthersDisabled} = dzToConfig.get(e.currentTarget);
    if (dropFromOthersDisabled && e.currentTarget !== originDropZone) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "ignoring dragged entered because drop is currently disabled");
        return;
    }
    isDraggedOutsideOfAnyDz = false;
    // this deals with another race condition. in rare occasions (super rapid operations) the list hasn't updated yet
    items = items.filter(item => item[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY] !== shadowElData[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY]);
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => `dragged entered items ${(0,_helpers_util__WEBPACK_IMPORTED_MODULE_5__.toString)(items)}`);

    if (originDropZone !== e.currentTarget) {
        const originZoneItems = dzToConfig.get(originDropZone).items;
        const newOriginZoneItems = originZoneItems.filter(item => !item[_constants__WEBPACK_IMPORTED_MODULE_0__.SHADOW_ITEM_MARKER_PROPERTY_NAME]);
        (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.dispatchConsiderEvent)(originDropZone, newOriginZoneItems, {
            trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DRAGGED_ENTERED_ANOTHER,
            id: draggedElData[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY],
            source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.POINTER
        });
    } else {
        const shadowPlaceHolderIdx = findShadowPlaceHolderIdx(items);
        if (shadowPlaceHolderIdx !== -1) {
            // only happens right after drag start, on the first drag entered event
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "removing placeholder item from origin dz");
            items.splice(shadowPlaceHolderIdx, 1);
        }
    }

    const {index, isProximityBased} = e.detail.indexObj;
    const shadowElIdx = isProximityBased && index === e.currentTarget.children.length - 1 ? index + 1 : index;
    shadowElDropZone = e.currentTarget;
    items.splice(shadowElIdx, 0, shadowElData);
    (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.dispatchConsiderEvent)(e.currentTarget, items, {trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DRAGGED_ENTERED, id: draggedElData[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY], source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.POINTER});
}

function handleDraggedLeft(e) {
    // dealing with a rare race condition on extremely rapid clicking and dropping
    if (!isWorkingOnPreviousDrag) return;
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => ["dragged left", e.currentTarget, e.detail]);
    const {items, dropFromOthersDisabled} = dzToConfig.get(e.currentTarget);
    if (dropFromOthersDisabled && e.currentTarget !== originDropZone && e.currentTarget !== shadowElDropZone) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "drop is currently disabled");
        return;
    }
    const shadowElIdx = findShadowElementIdx(items);
    const shadowItem = items.splice(shadowElIdx, 1)[0];
    shadowElDropZone = undefined;
    const {type, theOtherDz} = e.detail;
    if (
        type === _helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.DRAGGED_LEFT_TYPES.OUTSIDE_OF_ANY ||
        (type === _helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.DRAGGED_LEFT_TYPES.LEFT_FOR_ANOTHER && theOtherDz !== originDropZone && dzToConfig.get(theOtherDz).dropFromOthersDisabled)
    ) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "dragged left all, putting shadow element back in the origin dz");
        isDraggedOutsideOfAnyDz = true;
        shadowElDropZone = originDropZone;
        const originZoneItems = dzToConfig.get(originDropZone).items;
        originZoneItems.splice(originIndex, 0, shadowItem);
        (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.dispatchConsiderEvent)(originDropZone, originZoneItems, {
            trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DRAGGED_LEFT_ALL,
            id: draggedElData[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY],
            source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.POINTER
        });
    }
    // for the origin dz, when the dragged is outside of any, this will be fired in addition to the previous. this is for simplicity
    (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.dispatchConsiderEvent)(e.currentTarget, items, {
        trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DRAGGED_LEFT,
        id: draggedElData[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY],
        source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.POINTER
    });
}
function handleDraggedIsOverIndex(e) {
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => ["dragged is over index", e.currentTarget, e.detail]);
    const {items, dropFromOthersDisabled} = dzToConfig.get(e.currentTarget);
    if (dropFromOthersDisabled && e.currentTarget !== originDropZone) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "drop is currently disabled");
        return;
    }
    isDraggedOutsideOfAnyDz = false;
    const {index} = e.detail.indexObj;
    const shadowElIdx = findShadowElementIdx(items);
    items.splice(shadowElIdx, 1);
    items.splice(index, 0, shadowElData);
    (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.dispatchConsiderEvent)(e.currentTarget, items, {trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DRAGGED_OVER_INDEX, id: draggedElData[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY], source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.POINTER});
}

// Global mouse/touch-events handlers
function handleMouseMove(e) {
    e.preventDefault();
    const c = e.touches ? e.touches[0] : e;
    currentMousePosition = {x: c.clientX, y: c.clientY};
    draggedEl.style.transform = `translate3d(${currentMousePosition.x - dragStartMousePosition.x}px, ${
        currentMousePosition.y - dragStartMousePosition.y
    }px, 0)`;
}

function handleDrop() {
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "dropped");
    finalizingPreviousDrag = true;
    // cleanup
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleMouseMove);
    window.removeEventListener("mouseup", handleDrop);
    window.removeEventListener("touchend", handleDrop);
    unWatchDraggedElement();
    (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.moveDraggedElementToWasDroppedState)(draggedEl);

    if (!shadowElDropZone) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "element was dropped right after it left origin but before entering somewhere else");
        shadowElDropZone = originDropZone;
    }
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => ["dropped in dz", shadowElDropZone]);
    let {items, type} = dzToConfig.get(shadowElDropZone);
    (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.styleInactiveDropZones)(
        typeToDropZones.get(type),
        dz => dzToConfig.get(dz).dropTargetStyle,
        dz => dzToConfig.get(dz).dropTargetClasses
    );
    let shadowElIdx = findShadowElementIdx(items);
    // the handler might remove the shadow element, ex: dragula like copy on drag
    if (shadowElIdx === -1) shadowElIdx = originIndex;
    items = items.map(item => (item[_constants__WEBPACK_IMPORTED_MODULE_0__.SHADOW_ITEM_MARKER_PROPERTY_NAME] ? draggedElData : item));
    function finalizeWithinZone() {
        unlockOriginDzMinDimensions();
        (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.dispatchFinalizeEvent)(shadowElDropZone, items, {
            trigger: isDraggedOutsideOfAnyDz ? _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DROPPED_OUTSIDE_OF_ANY : _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DROPPED_INTO_ZONE,
            id: draggedElData[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY],
            source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.POINTER
        });
        if (shadowElDropZone !== originDropZone) {
            // letting the origin drop zone know the element was permanently taken away
            (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.dispatchFinalizeEvent)(originDropZone, dzToConfig.get(originDropZone).items, {
                trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DROPPED_INTO_ANOTHER,
                id: draggedElData[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY],
                source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.POINTER
            });
        }
        (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.unDecorateShadowElement)(shadowElDropZone.children[shadowElIdx]);
        cleanupPostDrop();
    }
    animateDraggedToFinalPosition(shadowElIdx, finalizeWithinZone);
}

// helper function for handleDrop
function animateDraggedToFinalPosition(shadowElIdx, callback) {
    const shadowElRect = (0,_helpers_intersection__WEBPACK_IMPORTED_MODULE_6__.getBoundingRectNoTransforms)(shadowElDropZone.children[shadowElIdx]);
    const newTransform = {
        x: shadowElRect.left - parseFloat(draggedEl.style.left),
        y: shadowElRect.top - parseFloat(draggedEl.style.top)
    };
    const {dropAnimationDurationMs} = dzToConfig.get(shadowElDropZone);
    const transition = `transform ${dropAnimationDurationMs}ms ease`;
    draggedEl.style.transition = draggedEl.style.transition ? draggedEl.style.transition + "," + transition : transition;
    draggedEl.style.transform = `translate3d(${newTransform.x}px, ${newTransform.y}px, 0)`;
    window.setTimeout(callback, dropAnimationDurationMs);
}

function scheduleDZForRemovalAfterDrop(dz, destroy) {
    scheduledForRemovalAfterDrop.push({dz, destroy});
    window.requestAnimationFrame(() => {
        (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.hideElement)(dz);
        document.body.appendChild(dz);
    });
}
/* cleanup */
function cleanupPostDrop() {
    draggedEl.remove();
    originalDragTarget.remove();
    if (scheduledForRemovalAfterDrop.length) {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => ["will destroy zones that were removed during drag", scheduledForRemovalAfterDrop]);
        scheduledForRemovalAfterDrop.forEach(({dz, destroy}) => {
            destroy();
            dz.remove();
        })
        scheduledForRemovalAfterDrop = [];
    }
    draggedEl = undefined;
    originalDragTarget = undefined;
    draggedElData = undefined;
    draggedElType = undefined;
    originDropZone = undefined;
    originIndex = undefined;
    shadowElData = undefined;
    shadowElDropZone = undefined;
    dragStartMousePosition = undefined;
    currentMousePosition = undefined;
    isWorkingOnPreviousDrag = false;
    finalizingPreviousDrag = false;
    unlockOriginDzMinDimensions = undefined;
    isDraggedOutsideOfAnyDz = false;
}

function dndzone(node, options) {
    let initialized = false;
    const config = {
        items: undefined,
        type: undefined,
        flipDurationMs: 0,
        dragDisabled: false,
        morphDisabled: false,
        dropFromOthersDisabled: false,
        dropTargetStyle: DEFAULT_DROP_TARGET_STYLE,
        dropTargetClasses: [],
        transformDraggedElement: () => {},
        centreDraggedOnCursor: false
    };
    (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => [`dndzone good to go options: ${(0,_helpers_util__WEBPACK_IMPORTED_MODULE_5__.toString)(options)}, config: ${(0,_helpers_util__WEBPACK_IMPORTED_MODULE_5__.toString)(config)}`, {node}]);
    let elToIdx = new Map();

    function addMaybeListeners() {
        window.addEventListener("mousemove", handleMouseMoveMaybeDragStart, {passive: false});
        window.addEventListener("touchmove", handleMouseMoveMaybeDragStart, {passive: false, capture: false});
        window.addEventListener("mouseup", handleFalseAlarm, {passive: false});
        window.addEventListener("touchend", handleFalseAlarm, {passive: false});
    }
    function removeMaybeListeners() {
        window.removeEventListener("mousemove", handleMouseMoveMaybeDragStart);
        window.removeEventListener("touchmove", handleMouseMoveMaybeDragStart);
        window.removeEventListener("mouseup", handleFalseAlarm);
        window.removeEventListener("touchend", handleFalseAlarm);
    }
    function handleFalseAlarm() {
        removeMaybeListeners();
        originalDragTarget = undefined;
        dragStartMousePosition = undefined;
        currentMousePosition = undefined;
    }

    function handleMouseMoveMaybeDragStart(e) {
        e.preventDefault();
        const c = e.touches ? e.touches[0] : e;
        currentMousePosition = {x: c.clientX, y: c.clientY};
        if (
            Math.abs(currentMousePosition.x - dragStartMousePosition.x) >= MIN_MOVEMENT_BEFORE_DRAG_START_PX ||
            Math.abs(currentMousePosition.y - dragStartMousePosition.y) >= MIN_MOVEMENT_BEFORE_DRAG_START_PX
        ) {
            removeMaybeListeners();
            handleDragStart();
        }
    }
    function handleMouseDown(e) {
        // on safari clicking on a select element doesn't fire mouseup at the end of the click and in general this makes more sense
        if (e.target !== e.currentTarget && (e.target.value !== undefined || e.target.isContentEditable)) {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "won't initiate drag on a nested input element");
            return;
        }
        // prevents responding to any button but left click which equals 0 (which is falsy)
        if (e.button) {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => `ignoring none left click button: ${e.button}`);
            return;
        }
        if (isWorkingOnPreviousDrag) {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "cannot start a new drag before finalizing previous one");
            return;
        }
        e.stopPropagation();
        const c = e.touches ? e.touches[0] : e;
        dragStartMousePosition = {x: c.clientX, y: c.clientY};
        currentMousePosition = {...dragStartMousePosition};
        originalDragTarget = e.currentTarget;
        addMaybeListeners();
    }

    function handleDragStart() {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => [`drag start config: ${(0,_helpers_util__WEBPACK_IMPORTED_MODULE_5__.toString)(config)}`, originalDragTarget]);
        isWorkingOnPreviousDrag = true;

        // initialising globals
        const currentIdx = elToIdx.get(originalDragTarget);
        originIndex = currentIdx;
        originDropZone = originalDragTarget.parentElement;
        /** @type {ShadowRoot | HTMLDocument} */
        const rootNode = originDropZone.getRootNode();
        const originDropZoneRoot = rootNode.body || rootNode;
        const {items, type, centreDraggedOnCursor} = config;
        draggedElData = {...items[currentIdx]};
        draggedElType = type;
        shadowElData = {...draggedElData, [_constants__WEBPACK_IMPORTED_MODULE_0__.SHADOW_ITEM_MARKER_PROPERTY_NAME]: true};
        // The initial shadow element. We need a different id at first in order to avoid conflicts and timing issues
        const placeHolderElData = {...shadowElData, [_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY]: _constants__WEBPACK_IMPORTED_MODULE_0__.SHADOW_PLACEHOLDER_ITEM_ID};

        // creating the draggable element
        draggedEl = (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.createDraggedElementFrom)(originalDragTarget, centreDraggedOnCursor && currentMousePosition);
        // We will keep the original dom node in the dom because touch events keep firing on it, we want to re-add it after the framework removes it
        function keepOriginalElementInDom() {
            if (!draggedEl.parentElement) {
                originDropZoneRoot.appendChild(draggedEl);
                // to prevent the outline from disappearing
                draggedEl.focus();
                watchDraggedElement();
                (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.hideElement)(originalDragTarget);
                originDropZoneRoot.appendChild(originalDragTarget);
            } else {
                window.requestAnimationFrame(keepOriginalElementInDom);
            }
        }
        window.requestAnimationFrame(keepOriginalElementInDom);

        (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.styleActiveDropZones)(
            Array.from(typeToDropZones.get(config.type)).filter(dz => dz === originDropZone || !dzToConfig.get(dz).dropFromOthersDisabled),
            dz => dzToConfig.get(dz).dropTargetStyle,
            dz => dzToConfig.get(dz).dropTargetClasses
        );

        // removing the original element by removing its data entry
        items.splice(currentIdx, 1, placeHolderElData);
        unlockOriginDzMinDimensions = (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.preventShrinking)(originDropZone);

        (0,_helpers_dispatcher__WEBPACK_IMPORTED_MODULE_4__.dispatchConsiderEvent)(originDropZone, items, {trigger: _constants__WEBPACK_IMPORTED_MODULE_0__.TRIGGERS.DRAG_STARTED, id: draggedElData[_constants__WEBPACK_IMPORTED_MODULE_0__.ITEM_ID_KEY], source: _constants__WEBPACK_IMPORTED_MODULE_0__.SOURCES.POINTER});

        // handing over to global handlers - starting to watch the element
        window.addEventListener("mousemove", handleMouseMove, {passive: false});
        window.addEventListener("touchmove", handleMouseMove, {passive: false, capture: false});
        window.addEventListener("mouseup", handleDrop, {passive: false});
        window.addEventListener("touchend", handleDrop, {passive: false});
    }

    function configure({
        items = undefined,
        flipDurationMs: dropAnimationDurationMs = 0,
        type: newType = DEFAULT_DROP_ZONE_TYPE,
        dragDisabled = false,
        morphDisabled = false,
        dropFromOthersDisabled = false,
        dropTargetStyle = DEFAULT_DROP_TARGET_STYLE,
        dropTargetClasses = [],
        transformDraggedElement = () => {},
        centreDraggedOnCursor = false
    }) {
        config.dropAnimationDurationMs = dropAnimationDurationMs;
        if (config.type && newType !== config.type) {
            unregisterDropZone(node, config.type);
        }
        config.type = newType;
        registerDropZone(node, newType);
        config.items = [...items];
        config.dragDisabled = dragDisabled;
        config.morphDisabled = morphDisabled;
        config.transformDraggedElement = transformDraggedElement;
        config.centreDraggedOnCursor = centreDraggedOnCursor;

        // realtime update for dropTargetStyle
        if (
            initialized &&
            isWorkingOnPreviousDrag &&
            !finalizingPreviousDrag &&
            (!(0,_helpers_util__WEBPACK_IMPORTED_MODULE_5__.areObjectsShallowEqual)(dropTargetStyle, config.dropTargetStyle) ||
                !(0,_helpers_util__WEBPACK_IMPORTED_MODULE_5__.areArraysShallowEqualSameOrder)(dropTargetClasses, config.dropTargetClasses))
        ) {
            (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.styleInactiveDropZones)(
                [node],
                () => config.dropTargetStyle,
                () => dropTargetClasses
            );
            (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.styleActiveDropZones)(
                [node],
                () => dropTargetStyle,
                () => dropTargetClasses
            );
        }
        config.dropTargetStyle = dropTargetStyle;
        config.dropTargetClasses = [...dropTargetClasses];

        // realtime update for dropFromOthersDisabled
        function getConfigProp(dz, propName) {
            return dzToConfig.get(dz) ? dzToConfig.get(dz)[propName] : config[propName];
        }
        if (initialized && isWorkingOnPreviousDrag && config.dropFromOthersDisabled !== dropFromOthersDisabled) {
            if (dropFromOthersDisabled) {
                (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.styleInactiveDropZones)(
                    [node],
                    dz => getConfigProp(dz, "dropTargetStyle"),
                    dz => getConfigProp(dz, "dropTargetClasses")
                );
            } else {
                (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.styleActiveDropZones)(
                    [node],
                    dz => getConfigProp(dz, "dropTargetStyle"),
                    dz => getConfigProp(dz, "dropTargetClasses")
                );
            }
        }
        config.dropFromOthersDisabled = dropFromOthersDisabled;

        dzToConfig.set(node, config);
        const shadowElIdx = findShadowElementIdx(config.items);
        for (let idx = 0; idx < node.children.length; idx++) {
            const draggableEl = node.children[idx];
            (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.styleDraggable)(draggableEl, dragDisabled);
            if (idx === shadowElIdx) {
                if (!morphDisabled) {
                    (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.morphDraggedElementToBeLike)(draggedEl, draggableEl, currentMousePosition.x, currentMousePosition.y, () =>
                        config.transformDraggedElement(draggedEl, draggedElData, idx)
                    );
                }
                (0,_helpers_styler__WEBPACK_IMPORTED_MODULE_3__.decorateShadowEl)(draggableEl);
                continue;
            }
            draggableEl.removeEventListener("mousedown", elToMouseDownListener.get(draggableEl));
            draggableEl.removeEventListener("touchstart", elToMouseDownListener.get(draggableEl));
            if (!dragDisabled) {
                draggableEl.addEventListener("mousedown", handleMouseDown);
                draggableEl.addEventListener("touchstart", handleMouseDown);
                elToMouseDownListener.set(draggableEl, handleMouseDown);
            }
            // updating the idx
            elToIdx.set(draggableEl, idx);

            if (!initialized) {
                initialized = true;
            }
        }
    }
    configure(options);

    return {
        update: newOptions => {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => `pointer dndzone will update newOptions: ${(0,_helpers_util__WEBPACK_IMPORTED_MODULE_5__.toString)(newOptions)}`);
            configure(newOptions);
        },
        destroy: () => {
            function destroyDz() {
                (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "pointer dndzone will destroy");
                unregisterDropZone(node, dzToConfig.get(node).type);
                dzToConfig.delete(node);
            }
            if (isWorkingOnPreviousDrag) {
                (0,_constants__WEBPACK_IMPORTED_MODULE_0__.printDebug)(() => "pointer dndzone will be scheduled for destruction");
                scheduleDZForRemovalAfterDrop(node, destroyDz);
            } else {
               destroyDz();
            }
        }
    };
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/hot-api.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/hot-api.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeApplyHmr": () => (/* binding */ makeApplyHmr)
/* harmony export */ });
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proxy.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy.js");
/* eslint-env browser */



const logPrefix = '[HMR:Svelte]'

// eslint-disable-next-line no-console
const log = (...args) => console.log(logPrefix, ...args)

const domReload = () => {
  // eslint-disable-next-line no-undef
  const win = typeof window !== 'undefined' && window
  if (win && win.location && win.location.reload) {
    log('Reload')
    win.location.reload()
  } else {
    log('Full reload required')
  }
}

const replaceCss = (previousId, newId) => {
  if (typeof document === 'undefined') return false
  if (!previousId) return false
  if (!newId) return false
  // svelte-xxx-style => svelte-xxx
  const previousClass = previousId.slice(0, -6)
  const newClass = newId.slice(0, -6)
  // eslint-disable-next-line no-undef
  document.querySelectorAll('.' + previousClass).forEach(el => {
    el.classList.remove(previousClass)
    el.classList.add(newClass)
  })
  return true
}

const removeStylesheet = cssId => {
  if (cssId == null) return
  if (typeof document === 'undefined') return
  // eslint-disable-next-line no-undef
  const el = document.getElementById(cssId)
  if (el) el.remove()
  return
}

const defaultArgs = {
  reload: domReload,
}

const makeApplyHmr = transformArgs => args => {
  const allArgs = transformArgs({ ...defaultArgs, ...args })
  return applyHmr(allArgs)
}

let needsReload = false

function applyHmr(args) {
  const {
    id,
    cssId,
    nonCssHash,
    reload = domReload,
    // normalized hot API (must conform to rollup-plugin-hot)
    hot,
    hotOptions,
    Component,
    acceptable, // some types of components are impossible to HMR correctly
    preserveLocalState,
    ProxyAdapter,
    emitCss,
  } = args

  const existing = hot.data && hot.data.record

  const canAccept = acceptable && (!existing || existing.current.canAccept)

  const r =
    existing ||
    (0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.createProxy)({
      Adapter: ProxyAdapter,
      id,
      Component,
      hotOptions,
      canAccept,
      preserveLocalState,
    })

  const cssOnly =
    hotOptions.injectCss &&
    existing &&
    nonCssHash &&
    existing.current.nonCssHash === nonCssHash

  r.update({
    Component,
    hotOptions,
    canAccept,
    nonCssHash,
    cssId,
    previousCssId: r.current.cssId,
    cssOnly,
    preserveLocalState,
  })

  hot.dispose(data => {
    // handle previous fatal errors
    if (needsReload || (0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.hasFatalError)()) {
      if (hotOptions && hotOptions.noReload) {
        log('Full reload required')
      } else {
        reload()
      }
    }

    // 2020-09-21 Snowpack master doesn't pass data as arg to dispose handler
    data = data || hot.data

    data.record = r

    if (!emitCss && cssId && r.current.cssId !== cssId) {
      if (hotOptions.cssEjectDelay) {
        setTimeout(() => removeStylesheet(cssId), hotOptions.cssEjectDelay)
      } else {
        removeStylesheet(cssId)
      }
    }
  })

  if (canAccept) {
    hot.accept(async arg => {
      const { bubbled } = arg || {}

      // NOTE Snowpack registers accept handlers only once, so we can NOT rely
      // on the surrounding scope variables -- they're not the last version!
      const { cssId: newCssId, previousCssId } = r.current
      const cssChanged = newCssId !== previousCssId
      // ensure old style sheet has been removed by now
      if (!emitCss && cssChanged) removeStylesheet(previousCssId)
      // guard: css only change
      if (
        // NOTE bubbled is provided only by rollup-plugin-hot, and we
        // can't safely assume a CSS only change without it... this means we
        // can't support CSS only injection with Nollup or Webpack currently
        bubbled === false && // WARNING check false, not falsy!
        r.current.cssOnly &&
        (!cssChanged || replaceCss(previousCssId, newCssId))
      ) {
        return
      }

      const success = await r.reload()

      if ((0,_proxy_js__WEBPACK_IMPORTED_MODULE_0__.hasFatalError)() || (!success && !hotOptions.optimistic)) {
        needsReload = true
      }
    })
  }

  // well, endgame... we won't be able to render next updates, even successful,
  // if we don't have proxies in svelte's tree
  //
  // since we won't return the proxy and the app will expect a svelte component,
  // it's gonna crash... so it's best to report the real cause
  //
  // full reload required
  //
  const proxyOk = r && r.proxy
  if (!proxyOk) {
    throw new Error(`Failed to create HMR proxy for Svelte component ${id}`)
  }

  return r.proxy
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/index.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/index.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeApplyHmr": () => (/* reexport safe */ _hot_api_js__WEBPACK_IMPORTED_MODULE_0__.makeApplyHmr)
/* harmony export */ });
/* harmony import */ var _hot_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hot-api.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/hot-api.js");



/***/ }),

/***/ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/overlay.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/overlay.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-env browser */

const removeElement = el => el && el.parentNode && el.parentNode.removeChild(el)

const ErrorOverlay = () => {
  let errors = []
  let compileError = null

  const errorsTitle = 'Failed to init component'
  const compileErrorTitle = 'Failed to compile'

  const style = {
    section: `
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 32px;
      background: rgba(0, 0, 0, .85);
      font-family: Menlo, Consolas, monospace;
      font-size: large;
      color: rgb(232, 232, 232);
      overflow: auto;
      z-index: 2147483647;
    `,
    h1: `
      margin-top: 0;
      color: #E36049;
      font-size: large;
      font-weight: normal;
    `,
    h2: `
      margin: 32px 0 0;
      font-size: large;
      font-weight: normal;
    `,
    pre: ``,
  }

  const createOverlay = () => {
    const h1 = document.createElement('h1')
    h1.style = style.h1
    const section = document.createElement('section')
    section.appendChild(h1)
    section.style = style.section
    const body = document.createElement('div')
    section.appendChild(body)
    return { h1, el: section, body }
  }

  const setTitle = title => {
    overlay.h1.textContent = title
  }

  const show = () => {
    const { el } = overlay
    if (!el.parentNode) {
      const target = document.body
      target.appendChild(overlay.el)
    }
  }

  const hide = () => {
    const { el } = overlay
    if (el.parentNode) {
      overlay.el.remove()
    }
  }

  const update = () => {
    if (compileError) {
      overlay.body.innerHTML = ''
      setTitle(compileErrorTitle)
      const errorEl = renderError(compileError)
      overlay.body.appendChild(errorEl)
      show()
    } else if (errors.length > 0) {
      overlay.body.innerHTML = ''
      setTitle(errorsTitle)
      errors.forEach(({ title, message }) => {
        const errorEl = renderError(message, title)
        overlay.body.appendChild(errorEl)
      })
      show()
    } else {
      hide()
    }
  }

  const renderError = (message, title) => {
    const div = document.createElement('div')
    if (title) {
      const h2 = document.createElement('h2')
      h2.textContent = title
      h2.style = style.h2
      div.appendChild(h2)
    }
    const pre = document.createElement('pre')
    pre.textContent = message
    div.appendChild(pre)
    return div
  }

  const addError = (error, title) => {
    const message = (error && error.stack) || error
    errors.push({ title, message })
    update()
  }

  const clearErrors = () => {
    errors.forEach(({ element }) => {
      removeElement(element)
    })
    errors = []
    update()
  }

  const setCompileError = message => {
    compileError = message
    update()
  }

  const overlay = createOverlay()

  return {
    addError,
    clearErrors,
    setCompileError,
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorOverlay);


/***/ }),

/***/ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adapter": () => (/* binding */ adapter),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/overlay.js");
/* global window, document */

// NOTE from 3.38.3 (or so), insert was carrying the hydration logic, that must
// be used because DOM elements are reused more (and so insertion points are not
// necessarily added in order); then in 3.40 the logic was moved to
// insert_hydration, which is the one we must use for HMR
const svelteInsert = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_hydration || svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert
if (!svelteInsert) {
  throw new Error(
    'failed to find insert_hydration and insert in svelte/internal'
  )
}



const removeElement = el => el && el.parentNode && el.parentNode.removeChild(el)

const adapter = class ProxyAdapterDom {
  constructor(instance) {
    this.instance = instance
    this.insertionPoint = null

    this.afterMount = this.afterMount.bind(this)
    this.rerender = this.rerender.bind(this)

    this._noOverlay = !!instance.hotOptions.noOverlay
  }

  // NOTE overlay is only created before being actually shown to help test
  // runner (it won't have to account for error overlay when running assertions
  // about the contents of the rendered page)
  static getErrorOverlay(noCreate = false) {
    if (!noCreate && !this.errorOverlay) {
      this.errorOverlay = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_1__["default"])()
    }
    return this.errorOverlay
  }

  // TODO this is probably unused now: remove in next breaking release
  static renderCompileError(message) {
    const noCreate = !message
    const overlay = this.getErrorOverlay(noCreate)
    if (!overlay) return
    overlay.setCompileError(message)
  }

  dispose() {
    // Component is being destroyed, detaching is not optional in Svelte3's
    // component API, so we can dispose of the insertion point in every case.
    if (this.insertionPoint) {
      removeElement(this.insertionPoint)
      this.insertionPoint = null
    }
    this.clearError()
  }

  // NOTE afterMount CAN be called multiple times (e.g. keyed list)
  afterMount(target, anchor) {
    const {
      instance: { debugName },
    } = this
    if (!this.insertionPoint) {
      this.insertionPoint = document.createComment(debugName)
    }
    svelteInsert(target, this.insertionPoint, anchor)
  }

  rerender() {
    this.clearError()
    const {
      instance: { refreshComponent },
      insertionPoint,
    } = this
    if (!insertionPoint) {
      throw new Error('Cannot rerender: missing insertion point')
    }
    refreshComponent(insertionPoint.parentNode, insertionPoint)
  }

  renderError(err) {
    if (this._noOverlay) return
    const {
      instance: { debugName },
    } = this
    const title = debugName || err.moduleName || 'Error'
    this.constructor.getErrorOverlay().addError(err, title)
  }

  clearError() {
    if (this._noOverlay) return
    const overlay = this.constructor.getErrorOverlay(true)
    if (!overlay) return
    overlay.clearErrors()
  }
}

// TODO this is probably unused now: remove in next breaking release
if (typeof window !== 'undefined') {
  window.__SVELTE_HMR_ADAPTER = adapter
}

// mitigate situation with Snowpack remote source pulling latest of runtime,
// but using previous version of the Node code transform in the plugin
// see: https://github.com/rixo/svelte-hmr/issues/27
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adapter);


/***/ }),

/***/ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProxy": () => (/* binding */ createProxy),
/* harmony export */   "hasFatalError": () => (/* binding */ hasFatalError)
/* harmony export */ });
/* harmony import */ var _svelte_hooks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svelte-hooks.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/svelte-hooks.js");
/* eslint-env browser */
/**
 * The HMR proxy is a component-like object whose task is to sit in the
 * component tree in place of the proxied component, and rerender each
 * successive versions of said component.
 */



const handledMethods = ['constructor', '$destroy']
const forwardedMethods = ['$set', '$on']

const logError = (msg, err) => {
  // eslint-disable-next-line no-console
  console.error('[HMR][Svelte]', msg)
  if (err) {
    // NOTE avoid too much wrapping around user errors
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

const posixify = file => file.replace(/[/\\]/g, '/')

const getBaseName = id =>
  id
    .split('/')
    .pop()
    .split('.')
    .slice(0, -1)
    .join('.')

const capitalize = str => str[0].toUpperCase() + str.slice(1)

const getFriendlyName = id => capitalize(getBaseName(posixify(id)))

const getDebugName = id => `<${getFriendlyName(id)}>`

const relayCalls = (getTarget, names, dest = {}) => {
  for (const key of names) {
    dest[key] = function(...args) {
      const target = getTarget()
      if (!target) {
        return
      }
      return target[key] && target[key].call(this, ...args)
    }
  }
  return dest
}

const isInternal = key => key !== '$$' && key.slice(0, 2) === '$$'

// This is intented as a somewhat generic / prospective fix to the situation
// that arised with the introduction of $$set in Svelte 3.24.1 -- trying to
// avoid giving full knowledge (like its name) of this implementation detail
// to the proxy. The $$set method can be present or not on the component, and
// its presence impacts the behaviour (but with HMR it will be tested if it is
// present _on the proxy_). So the idea here is to expose exactly the same $$
// props as the current version of the component and, for those that are
// functions, proxy the calls to the current component.
const relayInternalMethods = (proxy, cmp) => {
  // delete any previously added $$ prop
  Object.keys(proxy)
    .filter(isInternal)
    .forEach(key => {
      delete proxy[key]
    })
  // guard: no component
  if (!cmp) return
  // proxy current $$ props to the actual component
  Object.keys(cmp)
    .filter(isInternal)
    .forEach(key => {
      Object.defineProperty(proxy, key, {
        configurable: true,
        get() {
          const value = cmp[key]
          if (typeof value !== 'function') return value
          return (
            value &&
            function(...args) {
              return value.apply(this, args)
            }
          )
        },
      })
    })
}

// proxy custom methods
const copyComponentProperties = (proxy, cmp, previous) => {
  if (previous) {
    previous.forEach(prop => {
      delete proxy[prop]
    })
  }

  const props = Object.getOwnPropertyNames(Object.getPrototypeOf(cmp))
  const wrappedProps = props.filter(prop => {
    if (!handledMethods.includes(prop) && !forwardedMethods.includes(prop)) {
      Object.defineProperty(proxy, prop, {
        configurable: true,
        get() {
          return cmp[prop]
        },
        set(value) {
          // we're changing it on the real component first to see what it
          // gives... if it throws an error, we want to throw the same error in
          // order to most closely follow non-hmr behaviour.
          cmp[prop] = value
        },
      })
      return true
    }
  })

  return wrappedProps
}

// everything in the constructor!
//
// so we don't polute the component class with new members
//
class ProxyComponent {
  constructor(
    {
      Adapter,
      id,
      debugName,
      current, // { Component, hotOptions: { preserveLocalState, ... } }
      register,
    },
    options // { target, anchor, ... }
  ) {
    let cmp
    let disposed = false
    let lastError = null

    const setComponent = _cmp => {
      cmp = _cmp
      relayInternalMethods(this, cmp)
    }

    const getComponent = () => cmp

    const destroyComponent = () => {
      // destroyComponent is tolerant (don't crash on no cmp) because it
      // is possible that reload/rerender is called after a previous
      // createComponent has failed (hence we have a proxy, but no cmp)
      if (cmp) {
        cmp.$destroy()
        setComponent(null)
      }
    }

    const refreshComponent = (target, anchor, conservativeDestroy) => {
      if (lastError) {
        lastError = null
        adapter.rerender()
      } else {
        try {
          const replaceOptions = {
            target,
            anchor,
            preserveLocalState: current.preserveLocalState,
          }
          if (conservativeDestroy) {
            replaceOptions.conservativeDestroy = true
          }
          cmp.$replace(current.Component, replaceOptions)
        } catch (err) {
          setError(err, target, anchor)
          if (
            !current.hotOptions.optimistic ||
            // non acceptable components (that is components that have to defer
            // to their parent for rerender -- e.g. accessors, named exports)
            // are most tricky, and they havent been considered when most of the
            // code has been written... as a result, they are especially tricky
            // to deal with, it's better to consider any error with them to be
            // fatal to avoid odities
            !current.canAccept ||
            (err && err.hmrFatal)
          ) {
            throw err
          } else {
            // const errString = String((err && err.stack) || err)
            logError(`Error during component init: ${debugName}`, err)
          }
        }
      }
    }

    const setError = err => {
      lastError = err
      adapter.renderError(err)
    }

    const instance = {
      hotOptions: current.hotOptions,
      proxy: this,
      id,
      debugName,
      refreshComponent,
    }

    const adapter = new Adapter(instance)

    const { afterMount, rerender } = adapter

    // $destroy is not called when a child component is disposed, so we
    // need to hook from fragment.
    const onDestroy = () => {
      // NOTE do NOT call $destroy on the cmp from here; the cmp is already
      //   dead, this would not work
      if (!disposed) {
        disposed = true
        adapter.dispose()
        unregister()
      }
    }

    // ---- register proxy instance ----

    const unregister = register(rerender)

    // ---- augmented methods ----

    this.$destroy = () => {
      destroyComponent()
      onDestroy()
    }

    // ---- forwarded methods ----

    relayCalls(getComponent, forwardedMethods, this)

    // ---- create & mount target component instance ---

    try {
      let lastProperties
      ;(0,_svelte_hooks_js__WEBPACK_IMPORTED_MODULE_0__.createProxiedComponent)(current.Component, options, {
        allowLiveBinding: current.hotOptions.allowLiveBinding,
        onDestroy,
        onMount: afterMount,
        onInstance: comp => {
          setComponent(comp)
          // WARNING the proxy MUST use the same $$ object as its component
          // instance, because a lot of wiring happens during component
          // initialisation... lots of references to $$ and $$.fragment have
          // already been distributed around when the component constructor
          // returns, before we have a chance to wrap them (and so we can't
          // wrap them no more, because existing references would become
          // invalid)
          this.$$ = comp.$$
          lastProperties = copyComponentProperties(this, comp, lastProperties)
        },
      })
    } catch (err) {
      const { target, anchor } = options
      setError(err, target, anchor)
      throw err
    }
  }
}

const syncStatics = (component, proxy, previousKeys) => {
  // remove previously copied keys
  if (previousKeys) {
    for (const key of previousKeys) {
      delete proxy[key]
    }
  }

  // forward static properties and methods
  const keys = []
  for (const key in component) {
    keys.push(key)
    proxy[key] = component[key]
  }

  return keys
}

const globalListeners = {}

const onGlobal = (event, fn) => {
  event = event.toLowerCase()
  if (!globalListeners[event]) globalListeners[event] = []
  globalListeners[event].push(fn)
}

const fireGlobal = (event, ...args) => {
  const listeners = globalListeners[event]
  if (!listeners) return
  for (const fn of listeners) {
    fn(...args)
  }
}

const fireBeforeUpdate = () => fireGlobal('beforeupdate')

const fireAfterUpdate = () => fireGlobal('afterupdate')

if (typeof window !== 'undefined') {
  window.__SVELTE_HMR = {
    on: onGlobal,
  }
  window.dispatchEvent(new CustomEvent('svelte-hmr:ready'))
}

let fatalError = false

const hasFatalError = () => fatalError

/**
 * Creates a HMR proxy and its associated `reload` function that pushes a new
 * version to all existing instances of the component.
 */
function createProxy({
  Adapter,
  id,
  Component,
  hotOptions,
  canAccept,
  preserveLocalState,
}) {
  const debugName = getDebugName(id)
  const instances = []

  // current object will be updated, proxy instances will keep a ref
  const current = {
    Component,
    hotOptions,
    canAccept,
    preserveLocalState,
  }

  const name = `Proxy${debugName}`

  // this trick gives the dynamic name Proxy<MyComponent> to the concrete
  // proxy class... unfortunately, this doesn't shows in dev tools, but
  // it stills allow to inspect cmp.constructor.name to confirm an instance
  // is a proxy
  const proxy = {
    [name]: class extends ProxyComponent {
      constructor(options) {
        try {
          super(
            {
              Adapter,
              id,
              debugName,
              current,
              register: rerender => {
                instances.push(rerender)
                const unregister = () => {
                  const i = instances.indexOf(rerender)
                  instances.splice(i, 1)
                }
                return unregister
              },
            },
            options
          )
        } catch (err) {
          // If we fail to create a proxy instance, any instance, that means
          // that we won't be able to fix this instance when it is updated.
          // Recovering to normal state will be impossible. HMR's dead.
          //
          // Fatal error will trigger a full reload on next update (reloading
          // right now is kinda pointless since buggy code still exists).
          //
          // NOTE Only report first error to avoid too much polution -- following
          // errors are probably caused by the first one, or they will show up
          // in turn when the first one is fixed ¯\_(ツ)_/¯
          //
          if (!fatalError) {
            fatalError = true
            logError(
              `Unrecoverable HMR error in ${debugName}: ` +
                `next update will trigger a full reload`
            )
          }
          throw err
        }
      }
    },
  }[name]

  // initialize static members
  let previousStatics = syncStatics(current.Component, proxy)

  const update = newState => Object.assign(current, newState)

  // reload all existing instances of this component
  const reload = () => {
    fireBeforeUpdate()

    // copy statics before doing anything because a static prop/method
    // could be used somewhere in the create/render call
    previousStatics = syncStatics(current.Component, proxy, previousStatics)

    const errors = []

    instances.forEach(rerender => {
      try {
        rerender()
      } catch (err) {
        logError(`Failed to rerender ${debugName}`, err)
        errors.push(err)
      }
    })

    if (errors.length > 0) {
      return false
    }

    fireAfterUpdate()

    return true
  }

  const hasFatalError = () => fatalError

  return { id, proxy, update, reload, hasFatalError, current }
}


/***/ }),

/***/ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/svelte-hooks.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/svelte-hooks.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProxiedComponent": () => (/* binding */ createProxiedComponent)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/**
 * Emulates forthcoming HMR hooks in Svelte.
 *
 * All references to private component state ($$) are now isolated in this
 * module.
 */


const captureState = cmp => {
  // sanity check: propper behaviour here is to crash noisily so that
  // user knows that they're looking at something broken
  if (!cmp) {
    throw new Error('Missing component')
  }
  if (!cmp.$$) {
    throw new Error('Invalid component')
  }

  const {
    $$: { callbacks, bound, ctx, props },
  } = cmp

  const state = cmp.$capture_state()

  // capturing current value of props (or we'll recreate the component with the
  // initial prop values, that may have changed -- and would not be reflected in
  // options.props)
  const hmr_props_values = {}
  Object.keys(cmp.$$.props).forEach(prop => {
    hmr_props_values[prop] = ctx[props[prop]]
  })

  return {
    ctx,
    props,
    callbacks,
    bound,
    state,
    hmr_props_values,
  }
}

// remapping all existing bindings (including hmr_future_foo ones) to the
// new version's props indexes, and refresh them with the new value from
// context
const restoreBound = (cmp, restore) => {
  // reverse prop:ctxIndex in $$.props to ctxIndex:prop
  //
  // ctxIndex can be either a regular index in $$.ctx or a hmr_future_ prop
  //
  const propsByIndex = {}
  for (const [name, i] of Object.entries(restore.props)) {
    propsByIndex[i] = name
  }

  // NOTE $$.bound cannot change in the HMR lifetime of a component, because
  //      if bindings changes, that means the parent component has changed,
  //      which means the child (current) component will be wholly recreated
  for (const [oldIndex, updateBinding] of Object.entries(restore.bound)) {
    // can be either regular prop, or future_hmr_ prop
    const propName = propsByIndex[oldIndex]

    // this should never happen if remembering of future props is enabled...
    // in any case, there's nothing we can do about it if we have lost prop
    // name knowledge at this point
    if (propName == null) continue

    // NOTE $$.props[propName] also propagates knowledge of a possible
    //      future prop to the new $$.props (via $$.props being a Proxy)
    const newIndex = cmp.$$.props[propName]
    cmp.$$.bound[newIndex] = updateBinding

    // NOTE if the prop doesn't exist or doesn't exist anymore in the new
    //      version of the component, clearing the binding is the expected
    //      behaviour (since that's what would happen in non HMR code)
    const newValue = cmp.$$.ctx[newIndex]
    updateBinding(newValue)
  }
}

// restoreState
//
// It is too late to restore context at this point because component instance
// function has already been called (and so context has already been read).
// Instead, we rely on setting current_component to the same value it has when
// the component was first rendered -- which fix support for context, and is
// also generally more respectful of normal operation.
//
const restoreState = (cmp, restore) => {
  if (!restore) return

  if (restore.callbacks) {
    cmp.$$.callbacks = restore.callbacks
  }

  if (restore.bound) {
    restoreBound(cmp, restore)
  }

  // props, props.$$slots are restored at component creation (works
  // better -- well, at all actually)
}

const get_current_component_safe = () => {
  // NOTE relying on dynamic bindings (current_component) makes us dependent on
  // bundler config (and apparently it does not work in demo-svelte-nollup)
  try {
    // unfortunately, unlike current_component, get_current_component() can
    // crash in the normal path (when there is really no parent)
    return (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_current_component)()
  } catch (err) {
    // ... so we need to consider that this error means that there is no parent
    //
    // that makes us tightly coupled to the error message but, at least, we
    // won't mute an unexpected error, which is quite a horrible thing to do
    if (err.message === 'Function called outside component initialization') {
      // who knows...
      return svelte_internal__WEBPACK_IMPORTED_MODULE_0__.current_component
    } else {
      throw err
    }
  }
}

const createProxiedComponent = (
  Component,
  initialOptions,
  { allowLiveBinding, onInstance, onMount, onDestroy }
) => {
  let cmp
  let options = initialOptions

  const isCurrent = _cmp => cmp === _cmp

  const assignOptions = (target, anchor, restore, preserveLocalState) => {
    const props = Object.assign({}, options.props)

    // Filtering props to avoid "unexpected prop" warning
    // NOTE this is based on props present in initial options, but it should
    //      always works, because props that are passed from the parent can't
    //      change without a code change to the parent itself -- hence, the
    //      child component will be fully recreated, and initial options should
    //      always represent props that are currnetly passed by the parent
    if (options.props && restore.hmr_props_values) {
      for (const prop of Object.keys(options.props)) {
        if (restore.hmr_props_values.hasOwnProperty(prop)) {
          props[prop] = restore.hmr_props_values[prop]
        }
      }
    }

    if (preserveLocalState && restore.state) {
      if (Array.isArray(preserveLocalState)) {
        // form ['a', 'b'] => preserve only 'a' and 'b'
        props.$$inject = {}
        for (const key of preserveLocalState) {
          props.$$inject[key] = restore.state[key]
        }
      } else {
        props.$$inject = restore.state
      }
    } else {
      delete props.$$inject
    }
    options = Object.assign({}, initialOptions, {
      target,
      anchor,
      props,
      hydrate: false,
    })
  }

  // Preserving knowledge of "future props" -- very hackish version (maybe
  // there should be an option to opt out of this)
  //
  // The use case is bind:something where something doesn't exist yet in the
  // target component, but comes to exist later, after a HMR update.
  //
  // If Svelte can't map a prop in the current version of the component, it
  // will just completely discard it:
  // https://github.com/sveltejs/svelte/blob/1632bca34e4803d6b0e0b0abd652ab5968181860/src/runtime/internal/Component.ts#L46
  //
  const rememberFutureProps = cmp => {
    if (typeof Proxy === 'undefined') return

    cmp.$$.props = new Proxy(cmp.$$.props, {
      get(target, name) {
        if (target[name] === undefined) {
          target[name] = 'hmr_future_' + name
        }
        return target[name]
      },
      set(target, name, value) {
        target[name] = value
      },
    })
  }

  const instrument = targetCmp => {
    const createComponent = (Component, restore, previousCmp) => {
      ;(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_current_component)(parentComponent || previousCmp)
      const comp = new Component(options)
      // NOTE must be instrumented before restoreState, because restoring
      // bindings relies on hacked $$.props
      instrument(comp)
      restoreState(comp, restore)
      return comp
    }

    rememberFutureProps(targetCmp)

    targetCmp.$$.on_hmr = []

    // `conservative: true` means we want to be sure that the new component has
    // actually been successfuly created before destroying the old instance.
    // This could be useful for preventing runtime errors in component init to
    // bring down the whole HMR. Unfortunately the implementation bellow is
    // broken (FIXME), but that remains an interesting target for when HMR hooks
    // will actually land in Svelte itself.
    //
    // The goal would be to render an error inplace in case of error, to avoid
    // losing the navigation stack (especially annoying in native, that is not
    // based on URL navigation, so we lose the current page on each error).
    //
    targetCmp.$replace = (
      Component,
      {
        target = options.target,
        anchor = options.anchor,
        preserveLocalState,
        conservative = false,
      }
    ) => {
      const restore = captureState(targetCmp)
      assignOptions(
        target || options.target,
        anchor,
        restore,
        preserveLocalState
      )

      const callbacks = cmp ? cmp.$$.on_hmr : []

      const afterCallbacks = callbacks.map(fn => fn(cmp)).filter(Boolean)

      const previous = cmp
      if (conservative) {
        try {
          const next = createComponent(Component, restore, previous)
          // prevents on_destroy from firing on non-final cmp instance
          cmp = null
          previous.$destroy()
          cmp = next
        } catch (err) {
          cmp = previous
          throw err
        }
      } else {
        // prevents on_destroy from firing on non-final cmp instance
        cmp = null
        if (previous) {
          // previous can be null if last constructor has crashed
          previous.$destroy()
        }
        cmp = createComponent(Component, restore, cmp)
      }

      cmp.$$.hmr_cmp = cmp

      for (const fn of afterCallbacks) {
        fn(cmp)
      }

      cmp.$$.on_hmr = callbacks

      return cmp
    }

    // NOTE onMount must provide target & anchor (for us to be able to determinate
    // 			actual DOM insertion point)
    //
    // 			And also, to support keyed list, it needs to be called each time the
    // 			component is moved (same as $$.fragment.m)
    if (onMount) {
      const m = targetCmp.$$.fragment.m
      targetCmp.$$.fragment.m = (...args) => {
        const result = m(...args)
        onMount(...args)
        return result
      }
    }

    // NOTE onDestroy must be called even if the call doesn't pass through the
    //      component's $destroy method (that we can hook onto by ourselves, since
    //      it's public API) -- this happens a lot in svelte's internals, that
    //      manipulates cmp.$$.fragment directly, often binding to fragment.d,
    //      for example
    if (onDestroy) {
      targetCmp.$$.on_destroy.push(() => {
        if (isCurrent(targetCmp)) {
          onDestroy()
        }
      })
    }

    if (onInstance) {
      onInstance(targetCmp)
    }

    // Svelte 3 creates and mount components from their constructor if
    // options.target is present.
    //
    // This means that at this point, the component's `fragment.c` and,
    // most notably, `fragment.m` will already have been called _from inside
    // createComponent_. That is: before we have a chance to hook on it.
    //
    // Proxy's constructor
    //   -> createComponent
    //     -> component constructor
    //       -> component.$$.fragment.c(...) (or l, if hydrate:true)
    //       -> component.$$.fragment.m(...)
    //
    //   -> you are here <-
    //
    if (onMount) {
      const { target, anchor } = options
      if (target) {
        onMount(target, anchor)
      }
    }
  }

  const parentComponent = allowLiveBinding
    ? svelte_internal__WEBPACK_IMPORTED_MODULE_0__.current_component
    : get_current_component_safe()

  cmp = new Component(options)
  cmp.$$.hmr_cmp = cmp

  instrument(cmp)

  return cmp
}


/***/ }),

/***/ "./node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/component/Editor.svelte":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/component/Editor.svelte ***!
  \****************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/index.mjs");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils */ "./node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/component/Utils.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/component/Editor.svelte generated by Svelte v3.49.0 */


const { Object: Object_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;


const file = "node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/component/Editor.svelte";

// (129:2) {:else}
function create_else_block(ctx) {
	let textarea;

	const block = {
		c: function create() {
			textarea = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("textarea");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "id", /*id*/ ctx[0]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(textarea, "visibility", "hidden");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(textarea, file, 129, 4, 4121);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, textarea, anchor);
			/*textarea_binding*/ ctx[18](textarea);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*id*/ 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "id", /*id*/ ctx[0]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(textarea);
			/*textarea_binding*/ ctx[18](null);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(129:2) {:else}",
		ctx
	});

	return block;
}

// (127:2) {#if inline}
function create_if_block(ctx) {
	let div;

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "id", /*id*/ ctx[0]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 127, 4, 4067);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			/*div_binding*/ ctx[17](div);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*id*/ 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "id", /*id*/ ctx[0]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			/*div_binding*/ ctx[17](null);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(127:2) {#if inline}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*inline*/ ctx[1]) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			if_block.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", /*cssClass*/ ctx[2]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 125, 2, 4003);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			if_block.m(div, null);
			/*div_binding_1*/ ctx[19](div);
		},
		p: function update(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}

			if (dirty & /*cssClass*/ 4) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", /*cssClass*/ ctx[2]);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			if_block.d();
			/*div_binding_1*/ ctx[19](null);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const uuid = prefix => {
	return prefix + '_' + Math.floor(Math.random() * 1000000000) + String(Date.now());
};

const createScriptLoader = () => {
	let state = {
		listeners: [],
		scriptId: uuid('tiny-script'),
		scriptLoaded: false,
		injected: false
	};

	const injectScript = (scriptId, doc, url, cb) => {
		state.injected = true;
		const script = doc.createElement('script');
		script.referrerPolicy = 'origin';
		script.type = 'application/javascript';
		script.src = url;

		script.onload = () => {
			cb();
		};

		if (doc.head) doc.head.appendChild(script);
	};

	const load = (doc, url, callback) => {
		if (state.scriptLoaded) {
			callback();
		} else {
			state.listeners.push(callback);

			// check we can access doc
			if (!state.injected) {
				injectScript(state.scriptId, doc, url, () => {
					state.listeners.forEach(fn => fn());
					state.scriptLoaded = true;
				});
			}
		}
	};

	return { load };
};

let scriptLoader = createScriptLoader();

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Editor', slots, []);
	var _a;
	let { id = uuid('tinymce-svelte') } = $$props;
	let { inline = undefined } = $$props;
	let { disabled = false } = $$props;
	let { apiKey = 'no-api-key' } = $$props;
	let { channel = '6' } = $$props;
	let { scriptSrc = undefined } = $$props;
	let { conf = {} } = $$props;
	let { modelEvents = 'change input undo redo' } = $$props;
	let { value = '' } = $$props;
	let { text = '' } = $$props;
	let { cssClass = 'tinymce-wrapper' } = $$props;
	let container;
	let element;
	let editorRef;
	let lastVal = '';
	let disablindCache = disabled;
	const dispatch = (0,svelte__WEBPACK_IMPORTED_MODULE_1__.createEventDispatcher)();

	const getTinymce = () => {
		const getSink = () => {
			return typeof window !== 'undefined' ? window : __webpack_require__.g;
		};

		const sink = getSink();
		return sink && sink.tinymce ? sink.tinymce : null;
	};

	const init = () => {
		//
		const finalInit = Object.assign(Object.assign({}, conf), {
			target: element,
			inline: inline !== undefined
			? inline
			: conf.inline !== undefined ? conf.inline : false,
			readonly: disabled,
			setup: editor => {
				$$invalidate(14, editorRef = editor);

				editor.on('init', () => {
					editor.setContent(value);

					// bind model events
					editor.on(modelEvents, () => {
						$$invalidate(15, lastVal = editor.getContent());

						if (lastVal !== value) {
							$$invalidate(5, value = lastVal);
							$$invalidate(6, text = editor.getContent({ format: 'text' }));
						}
					});
				});

				(0,_Utils__WEBPACK_IMPORTED_MODULE_2__.bindHandlers)(editor, dispatch);

				if (typeof conf.setup === 'function') {
					conf.setup(editor);
				}
			}
		});

		$$invalidate(4, element.style.visibility = '', element);
		getTinymce().init(finalInit);
	};

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onMount)(() => {
		if (getTinymce() !== null) {
			setTimeout(init, 0);
		} else {
			const script = scriptSrc
			? scriptSrc
			: `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${channel}/tinymce.min.js`;

			scriptLoader.load(container.ownerDocument, script, () => {
				init();
			});
		}
	});

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onDestroy)(() => {
		var _a;

		if (editorRef) {
			(_a = getTinymce()) === null || _a === void 0
			? void 0
			: _a.remove(editorRef);
		}
	});

	const writable_props = [
		'id',
		'inline',
		'disabled',
		'apiKey',
		'channel',
		'scriptSrc',
		'conf',
		'modelEvents',
		'value',
		'text',
		'cssClass'
	];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Editor> was created with unknown prop '${key}'`);
	});

	function div_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(4, element);
		});
	}

	function textarea_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			element = $$value;
			$$invalidate(4, element);
		});
	}

	function div_binding_1($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			container = $$value;
			$$invalidate(3, container);
		});
	}

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
		if ('inline' in $$props) $$invalidate(1, inline = $$props.inline);
		if ('disabled' in $$props) $$invalidate(7, disabled = $$props.disabled);
		if ('apiKey' in $$props) $$invalidate(8, apiKey = $$props.apiKey);
		if ('channel' in $$props) $$invalidate(9, channel = $$props.channel);
		if ('scriptSrc' in $$props) $$invalidate(10, scriptSrc = $$props.scriptSrc);
		if ('conf' in $$props) $$invalidate(11, conf = $$props.conf);
		if ('modelEvents' in $$props) $$invalidate(12, modelEvents = $$props.modelEvents);
		if ('value' in $$props) $$invalidate(5, value = $$props.value);
		if ('text' in $$props) $$invalidate(6, text = $$props.text);
		if ('cssClass' in $$props) $$invalidate(2, cssClass = $$props.cssClass);
	};

	$$self.$capture_state = () => ({
		uuid,
		createScriptLoader,
		scriptLoader,
		_a,
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__.onMount,
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_1__.createEventDispatcher,
		onDestroy: svelte__WEBPACK_IMPORTED_MODULE_1__.onDestroy,
		bindHandlers: _Utils__WEBPACK_IMPORTED_MODULE_2__.bindHandlers,
		id,
		inline,
		disabled,
		apiKey,
		channel,
		scriptSrc,
		conf,
		modelEvents,
		value,
		text,
		cssClass,
		container,
		element,
		editorRef,
		lastVal,
		disablindCache,
		dispatch,
		getTinymce,
		init
	});

	$$self.$inject_state = $$props => {
		if ('_a' in $$props) $$invalidate(13, _a = $$props._a);
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
		if ('inline' in $$props) $$invalidate(1, inline = $$props.inline);
		if ('disabled' in $$props) $$invalidate(7, disabled = $$props.disabled);
		if ('apiKey' in $$props) $$invalidate(8, apiKey = $$props.apiKey);
		if ('channel' in $$props) $$invalidate(9, channel = $$props.channel);
		if ('scriptSrc' in $$props) $$invalidate(10, scriptSrc = $$props.scriptSrc);
		if ('conf' in $$props) $$invalidate(11, conf = $$props.conf);
		if ('modelEvents' in $$props) $$invalidate(12, modelEvents = $$props.modelEvents);
		if ('value' in $$props) $$invalidate(5, value = $$props.value);
		if ('text' in $$props) $$invalidate(6, text = $$props.text);
		if ('cssClass' in $$props) $$invalidate(2, cssClass = $$props.cssClass);
		if ('container' in $$props) $$invalidate(3, container = $$props.container);
		if ('element' in $$props) $$invalidate(4, element = $$props.element);
		if ('editorRef' in $$props) $$invalidate(14, editorRef = $$props.editorRef);
		if ('lastVal' in $$props) $$invalidate(15, lastVal = $$props.lastVal);
		if ('disablindCache' in $$props) $$invalidate(16, disablindCache = $$props.disablindCache);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*editorRef, lastVal, value, disabled, disablindCache, _a*/ 123040) {
			$: {
				if (editorRef && lastVal !== value) {
					editorRef.setContent(value);
					$$invalidate(6, text = editorRef.getContent({ format: 'text' }));
				}

				if (editorRef && disabled !== disablindCache) {
					$$invalidate(16, disablindCache = disabled);

					if (typeof ($$invalidate(13, _a = editorRef.mode) === null || _a === void 0
					? void 0
					: _a.set) === 'function') {
						editorRef.mode.set(disabled ? 'readonly' : 'design');
					} else {
						editorRef.setMode(disabled ? 'readonly' : 'design');
					}
				}
			}
		}
	};

	return [
		id,
		inline,
		cssClass,
		container,
		element,
		value,
		text,
		disabled,
		apiKey,
		channel,
		scriptSrc,
		conf,
		modelEvents,
		_a,
		editorRef,
		lastVal,
		disablindCache,
		div_binding,
		textarea_binding,
		div_binding_1
	];
}

class Editor extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {
			id: 0,
			inline: 1,
			disabled: 7,
			apiKey: 8,
			channel: 9,
			scriptSrc: 10,
			conf: 11,
			modelEvents: 12,
			value: 5,
			text: 6,
			cssClass: 2
		});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Editor",
			options,
			id: create_fragment.name
		});
	}

	get id() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inline() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inline(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get apiKey() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set apiKey(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get channel() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set channel(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scriptSrc() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scriptSrc(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get conf() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set conf(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get modelEvents() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set modelEvents(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get text() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get cssClass() {
		throw new Error("<Editor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set cssClass(value) {
		throw new Error("<Editor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);



/***/ }),

/***/ "./src/App.svelte":
/*!************************!*\
  !*** ./src/App.svelte ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _Stages_Settings_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Stages/Settings.svelte */ "./src/Stages/Settings.svelte");
/* harmony import */ var _Stages_20_Result_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Stages/20_Result.svelte */ "./src/Stages/20_Result.svelte");
/* harmony import */ var _Stages_13_DownloadChapters_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Stages/13_DownloadChapters.svelte */ "./src/Stages/13_DownloadChapters.svelte");
/* harmony import */ var _Stages_12_FindChapters_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Stages/12_FindChapters.svelte */ "./src/Stages/12_FindChapters.svelte");
/* harmony import */ var _Stages_11_EditBook_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Stages/11_EditBook.svelte */ "./src/Stages/11_EditBook.svelte");
/* harmony import */ var _Stages_10_BookData_svelte__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Stages/10_BookData.svelte */ "./src/Stages/10_BookData.svelte");
/* harmony import */ var _Stages_01_Search_svelte__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Stages/01_Search.svelte */ "./src/Stages/01_Search.svelte");
/* harmony import */ var _Stages_00_Input_svelte__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Stages/00_Input.svelte */ "./src/Stages/00_Input.svelte");
/* harmony import */ var _stages__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stages */ "./src/stages.ts");
/* harmony import */ var _icons_gear_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./icons/gear.svg */ "./src/icons/gear.svg");
/* harmony import */ var _icons_back_arrow_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./icons/back-arrow.svg */ "./src/icons/back-arrow.svg");
/* harmony import */ var _Header_svelte__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Header.svelte */ "./src/Header.svelte");
/* harmony import */ var _Footer_svelte__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Footer.svelte */ "./src/Footer.svelte");
/* harmony import */ var _configstore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./configstore */ "./src/configstore.ts");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/App.svelte generated by Svelte v3.49.0 */


const { Object: Object_1, console: console_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;















const file = "src/App.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-ibaoy7", "h1,h2,h3,h4,h5,h6{font-weight:normal}h1{font-size:2.2rem}h2{font-size:1.5rem}html{font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif}body{max-width:1100px;margin:12px auto;padding:0 8px;overflow:scroll;position:relative\n}@media screen and (max-width: 600px){body{padding:0 2px\n}}button:not(:disabled),input[type=\"submit\"]:not(:disabled){cursor:pointer}a,a[href^=\"#\"],a[href^=\"#\"]:visited{color:#0048ba}.fatal-error{color:white;background-color:red;border-radius:5px;margin:10px;padding:6px 12px}.fatal-error h1{margin-top:0}.small{font-size:0.8em}.App.svelte-ibaoy7.svelte-ibaoy7{position:relative;padding:14px 18px;border:1px solid gray;border-top:none;border-bottom:none\n  }@media screen and (max-width: 600px){.App.svelte-ibaoy7.svelte-ibaoy7{padding:10px\n  }}.mainnav.svelte-ibaoy7.svelte-ibaoy7{position:absolute;top:-0.2em;left:18px;right:18px;font-size:0.8rem;display:flex}.mainnav.svelte-ibaoy7 svg{height:0.65em}.mainnav.svelte-ibaoy7 a.svelte-ibaoy7{text-decoration:none;color:inherit\n    }.mainnav.svelte-ibaoy7 a.svelte-ibaoy7:hover,.mainnav.svelte-ibaoy7 a.svelte-ibaoy7:active,.mainnav.svelte-ibaoy7 a.svelte-ibaoy7:focus{text-decoration:underline}.mainnav.svelte-ibaoy7 .settingslink.svelte-ibaoy7{margin-left:auto}.mainnav.svelte-ibaoy7 .settingslink.svelte-ibaoy7 svg{height:1.2em}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUEwQ3FCLEVBQUEsQUFBQTs7Ozs7K1NBK0NyQiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJBcHAuc3ZlbHRlIl19 */");
}

// (152:4) {#if !Stages.is(stage, Stages.Stage.INPUT) && !Stages.is(stage, Stages.Stage.SETTINGS)}
function create_if_block_10(ctx) {
	let a;
	let backarrow;
	let t;
	let current;
	let mounted;
	let dispose;
	backarrow = new _icons_back_arrow_svg__WEBPACK_IMPORTED_MODULE_11__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(backarrow.$$.fragment);
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" home");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "#home");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "homelink svelte-ibaoy7");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 152, 6, 3543);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(backarrow, a, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*click_handler*/ ctx[5]), false, true, false);
				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(backarrow.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(backarrow.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(backarrow);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_10.name,
		type: "if",
		source: "(152:4) {#if !Stages.is(stage, Stages.Stage.INPUT) && !Stages.is(stage, Stages.Stage.SETTINGS)}",
		ctx
	});

	return block;
}

// (157:4) {:else}
function create_else_block(ctx) {
	let a;
	let gear;
	let current;
	let mounted;
	let dispose;
	gear = new _icons_gear_svg__WEBPACK_IMPORTED_MODULE_10__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(gear.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "#settings");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "settingslink svelte-ibaoy7");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 157, 6, 3846);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(gear, a, null);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*openSettings*/ ctx[3]), false, true, false);
				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(gear.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(gear.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(gear);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(157:4) {:else}",
		ctx
	});

	return block;
}

// (155:4) {#if Stages.is(stage, Stages.Stage.SETTINGS)}
function create_if_block_9(ctx) {
	let a;
	let backarrow;
	let t;
	let current;
	let mounted;
	let dispose;
	backarrow = new _icons_back_arrow_svg__WEBPACK_IMPORTED_MODULE_11__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(backarrow.$$.fragment);
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" back");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "#home");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "homelink svelte-ibaoy7");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 155, 6, 3725);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(backarrow, a, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*click_handler_1*/ ctx[6]), false, true, false);
				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(backarrow.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(backarrow.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(backarrow);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_9.name,
		type: "if",
		source: "(155:4) {#if Stages.is(stage, Stages.Stage.SETTINGS)}",
		ctx
	});

	return block;
}

// (180:50) 
function create_if_block_8(ctx) {
	let h2;
	let t1;
	let p;

	const block = {
		c: function create() {
			h2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h2");
			h2.textContent = "Page not found";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			p.textContent = "Sorry, the requested page could not be found";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h2, file, 180, 6, 4813);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 181, 6, 4843);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, h2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(h2);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_8.name,
		type: "if",
		source: "(180:50) ",
		ctx
	});

	return block;
}

// (178:54) 
function create_if_block_7(ctx) {
	let settings;
	let current;
	settings = new _Stages_Settings_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(settings.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(settings, target, anchor);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(settings.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(settings.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(settings, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(178:54) ",
		ctx
	});

	return block;
}

// (176:52) 
function create_if_block_6(ctx) {
	let result;
	let current;

	result = new _Stages_20_Result_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				stage: /*stage*/ ctx[0],
				backToSearch: /*backToSearch*/ ctx[2]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(result.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(result, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const result_changes = {};
			if (dirty & /*stage*/ 1) result_changes.stage = /*stage*/ ctx[0];
			if (dirty & /*backToSearch*/ 4) result_changes.backToSearch = /*backToSearch*/ ctx[2];
			result.$set(result_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(result.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(result.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(result, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(176:52) ",
		ctx
	});

	return block;
}

// (174:63) 
function create_if_block_5(ctx) {
	let downloadchapters;
	let current;

	downloadchapters = new _Stages_13_DownloadChapters_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: { stage: /*stage*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(downloadchapters.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(downloadchapters, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const downloadchapters_changes = {};
			if (dirty & /*stage*/ 1) downloadchapters_changes.stage = /*stage*/ ctx[0];
			downloadchapters.$set(downloadchapters_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(downloadchapters.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(downloadchapters.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(downloadchapters, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(174:63) ",
		ctx
	});

	return block;
}

// (172:59) 
function create_if_block_4(ctx) {
	let findchapters;
	let current;

	findchapters = new _Stages_12_FindChapters_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: { stage: /*stage*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(findchapters.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(findchapters, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const findchapters_changes = {};
			if (dirty & /*stage*/ 1) findchapters_changes.stage = /*stage*/ ctx[0];
			findchapters.$set(findchapters_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(findchapters.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(findchapters.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(findchapters, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(172:59) ",
		ctx
	});

	return block;
}

// (170:55) 
function create_if_block_3(ctx) {
	let editbook;
	let current;

	editbook = new _Stages_11_EditBook_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: { stage: /*stage*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(editbook.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(editbook, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const editbook_changes = {};
			if (dirty & /*stage*/ 1) editbook_changes.stage = /*stage*/ ctx[0];
			editbook.$set(editbook_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(editbook.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(editbook.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(editbook, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(170:55) ",
		ctx
	});

	return block;
}

// (168:55) 
function create_if_block_2(ctx) {
	let bookdata;
	let current;

	bookdata = new _Stages_10_BookData_svelte__WEBPACK_IMPORTED_MODULE_6__["default"]({
			props: {
				stage: /*stage*/ ctx[0],
				series: /*$store*/ ctx[1].series,
				backToSearch: /*backToSearch*/ ctx[2]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(bookdata.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(bookdata, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const bookdata_changes = {};
			if (dirty & /*stage*/ 1) bookdata_changes.stage = /*stage*/ ctx[0];
			if (dirty & /*$store*/ 2) bookdata_changes.series = /*$store*/ ctx[1].series;
			if (dirty & /*backToSearch*/ 4) bookdata_changes.backToSearch = /*backToSearch*/ ctx[2];
			bookdata.$set(bookdata_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(bookdata.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(bookdata.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(bookdata, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(168:55) ",
		ctx
	});

	return block;
}

// (166:52) 
function create_if_block_1(ctx) {
	let search;
	let current;

	search = new _Stages_01_Search_svelte__WEBPACK_IMPORTED_MODULE_7__["default"]({
			props: {
				stage: /*stage*/ ctx[0],
				search: /*$store*/ ctx[1].search
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(search.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(search, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const search_changes = {};
			if (dirty & /*stage*/ 1) search_changes.stage = /*stage*/ ctx[0];
			if (dirty & /*$store*/ 2) search_changes.search = /*$store*/ ctx[1].search;
			search.$set(search_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(search.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(search.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(search, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(166:52) ",
		ctx
	});

	return block;
}

// (164:4) {#if Stages.is(stage, Stages.Stage.INPUT)}
function create_if_block(ctx) {
	let input;
	let current;

	input = new _Stages_00_Input_svelte__WEBPACK_IMPORTED_MODULE_8__["default"]({
			props: {
				stage: /*stage*/ ctx[0],
				search: /*$store*/ ctx[1].search
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(input.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(input, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const input_changes = {};
			if (dirty & /*stage*/ 1) input_changes.stage = /*stage*/ ctx[0];
			if (dirty & /*$store*/ 2) input_changes.search = /*$store*/ ctx[1].search;
			input.$set(input_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(input.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(input.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(input, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(164:4) {#if Stages.is(stage, Stages.Stage.INPUT)}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let nav;
	let show_if_10 = !_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.INPUT) && !_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.SETTINGS);
	let t0;
	let show_if_9;
	let current_block_type_index;
	let if_block1;
	let t1;
	let header;
	let t2;
	let main;
	let show_if;
	let show_if_1;
	let show_if_2;
	let show_if_3;
	let show_if_4;
	let show_if_5;
	let show_if_6;
	let show_if_7;
	let show_if_8;
	let current_block_type_index_1;
	let if_block2;
	let t3;
	let footer;
	let current;
	let if_block0 = show_if_10 && create_if_block_10(ctx);
	const if_block_creators = [create_if_block_9, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (dirty & /*stage*/ 1) show_if_9 = null;
		if (show_if_9 == null) show_if_9 = !!_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.SETTINGS);
		if (show_if_9) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	header = new _Header_svelte__WEBPACK_IMPORTED_MODULE_12__["default"]({ $$inline: true });

	const if_block_creators_1 = [
		create_if_block,
		create_if_block_1,
		create_if_block_2,
		create_if_block_3,
		create_if_block_4,
		create_if_block_5,
		create_if_block_6,
		create_if_block_7,
		create_if_block_8
	];

	const if_blocks_1 = [];

	function select_block_type_1(ctx, dirty) {
		if (dirty & /*stage*/ 1) show_if = null;
		if (dirty & /*stage*/ 1) show_if_1 = null;
		if (dirty & /*stage*/ 1) show_if_2 = null;
		if (dirty & /*stage*/ 1) show_if_3 = null;
		if (dirty & /*stage*/ 1) show_if_4 = null;
		if (dirty & /*stage*/ 1) show_if_5 = null;
		if (dirty & /*stage*/ 1) show_if_6 = null;
		if (dirty & /*stage*/ 1) show_if_7 = null;
		if (dirty & /*stage*/ 1) show_if_8 = null;
		if (show_if == null) show_if = !!_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.INPUT);
		if (show_if) return 0;
		if (show_if_1 == null) show_if_1 = !!_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.SEARCH);
		if (show_if_1) return 1;
		if (show_if_2 == null) show_if_2 = !!_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.BOOK_DATA);
		if (show_if_2) return 2;
		if (show_if_3 == null) show_if_3 = !!_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.EDIT_DATA);
		if (show_if_3) return 3;
		if (show_if_4 == null) show_if_4 = !!_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.FIND_CHAPTERS);
		if (show_if_4) return 4;
		if (show_if_5 == null) show_if_5 = !!_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.DOWNLOAD_CHAPTERS);
		if (show_if_5) return 5;
		if (show_if_6 == null) show_if_6 = !!_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.RESULT);
		if (show_if_6) return 6;
		if (show_if_7 == null) show_if_7 = !!_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.SETTINGS);
		if (show_if_7) return 7;
		if (show_if_8 == null) show_if_8 = !!_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage._404);
		if (show_if_8) return 8;
		return -1;
	}

	if (~(current_block_type_index_1 = select_block_type_1(ctx, -1))) {
		if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
	}

	footer = new _Footer_svelte__WEBPACK_IMPORTED_MODULE_13__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			nav = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("nav");
			if (if_block0) if_block0.c();
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if_block1.c();
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(header.$$.fragment);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			main = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("main");
			if (if_block2) if_block2.c();
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(footer.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(nav, "class", "mainnav svelte-ibaoy7");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(nav, file, 150, 2, 3423);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(main, "class", "App-main");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(main, file, 162, 2, 3976);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "App svelte-ibaoy7");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 149, 0, 3403);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, nav);
			if (if_block0) if_block0.m(nav, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(nav, t0);
			if_blocks[current_block_type_index].m(nav, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(header, div, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, main);

			if (~current_block_type_index_1) {
				if_blocks_1[current_block_type_index_1].m(main, null);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(footer, div, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*stage*/ 1) show_if_10 = !_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.INPUT) && !_stages__WEBPACK_IMPORTED_MODULE_9__.is(/*stage*/ ctx[0], _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.SETTINGS);

			if (show_if_10) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*stage*/ 1) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_10(ctx);
					if_block0.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0, 1);
					if_block0.m(nav, t0);
				}
			} else if (if_block0) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1, 1);
				if_block1.m(nav, null);
			}

			let previous_block_index_1 = current_block_type_index_1;
			current_block_type_index_1 = select_block_type_1(ctx, dirty);

			if (current_block_type_index_1 === previous_block_index_1) {
				if (~current_block_type_index_1) {
					if_blocks_1[current_block_type_index_1].p(ctx, dirty);
				}
			} else {
				if (if_block2) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_blocks_1[previous_block_index_1], 1, 1, () => {
						if_blocks_1[previous_block_index_1] = null;
					});

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				}

				if (~current_block_type_index_1) {
					if_block2 = if_blocks_1[current_block_type_index_1];

					if (!if_block2) {
						if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
						if_block2.c();
					} else {
						if_block2.p(ctx, dirty);
					}

					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					if_block2.m(main, null);
				} else {
					if_block2 = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(header.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(footer.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(header.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(footer.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			if (if_block0) if_block0.d();
			if_blocks[current_block_type_index].d();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(header);

			if (~current_block_type_index_1) {
				if_blocks_1[current_block_type_index_1].d();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(footer);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

(0,_configstore__WEBPACK_IMPORTED_MODULE_14__.loadConfig)();
_stages__WEBPACK_IMPORTED_MODULE_9__.loadFromHistory();

function instance($$self, $$props, $$invalidate) {
	let stage;
	let backToSearch;
	let $store;
	let $config;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_stages__WEBPACK_IMPORTED_MODULE_9__.store, 'store');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _stages__WEBPACK_IMPORTED_MODULE_9__.store, $$value => $$invalidate(1, $store = $$value));
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_configstore__WEBPACK_IMPORTED_MODULE_14__.config, 'config');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _configstore__WEBPACK_IMPORTED_MODULE_14__.config, $$value => $$invalidate(4, $config = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('App', slots, []);

	const openSettings = () => {
		if (!stage.needsSaving || confirm("Unsaved changes. Continue?")) _stages__WEBPACK_IMPORTED_MODULE_9__.next(_stages__WEBPACK_IMPORTED_MODULE_9__.Settings);
	};

	const writable_props = [];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
	});

	const click_handler = () => _stages__WEBPACK_IMPORTED_MODULE_9__.next(_stages__WEBPACK_IMPORTED_MODULE_9__.Input);
	const click_handler_1 = () => stage.next();

	$$self.$capture_state = () => ({
		config: _configstore__WEBPACK_IMPORTED_MODULE_14__.config,
		loadConfig: _configstore__WEBPACK_IMPORTED_MODULE_14__.loadConfig,
		Footer: _Footer_svelte__WEBPACK_IMPORTED_MODULE_13__["default"],
		Header: _Header_svelte__WEBPACK_IMPORTED_MODULE_12__["default"],
		BackArrow: _icons_back_arrow_svg__WEBPACK_IMPORTED_MODULE_11__["default"],
		Gear: _icons_gear_svg__WEBPACK_IMPORTED_MODULE_10__["default"],
		Stages: _stages__WEBPACK_IMPORTED_MODULE_9__,
		store: _stages__WEBPACK_IMPORTED_MODULE_9__.store,
		Input: _Stages_00_Input_svelte__WEBPACK_IMPORTED_MODULE_8__["default"],
		Search: _Stages_01_Search_svelte__WEBPACK_IMPORTED_MODULE_7__["default"],
		BookData: _Stages_10_BookData_svelte__WEBPACK_IMPORTED_MODULE_6__["default"],
		EditBook: _Stages_11_EditBook_svelte__WEBPACK_IMPORTED_MODULE_5__["default"],
		FindChapters: _Stages_12_FindChapters_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		DownloadChapters: _Stages_13_DownloadChapters_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		Result: _Stages_20_Result_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		Settings: _Stages_Settings_svelte__WEBPACK_IMPORTED_MODULE_1__["default"],
		openSettings,
		stage,
		backToSearch,
		$store,
		$config
	});

	$$self.$inject_state = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
		if ('backToSearch' in $$props) $$invalidate(2, backToSearch = $$props.backToSearch);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$store*/ 2) {
			$: $$invalidate(0, stage = $store.stage);
		}

		if ($$self.$$.dirty & /*stage*/ 1) {
			$: $$invalidate(2, backToSearch = _stages__WEBPACK_IMPORTED_MODULE_9__.is(stage.from, _stages__WEBPACK_IMPORTED_MODULE_9__.Stage.SEARCH)
			? () => _stages__WEBPACK_IMPORTED_MODULE_9__.next(_stages__WEBPACK_IMPORTED_MODULE_9__.Search)
			: undefined);
		}

		if ($$self.$$.dirty & /*stage*/ 1) {
			$: if (true) console.table({ is: stage, from: stage.from });
		}

		if ($$self.$$.dirty & /*$store*/ 2) {
			$: if (true) window._data = Object.assign(Object.assign({}, $store), { store: _stages__WEBPACK_IMPORTED_MODULE_9__.store });
		}

		if ($$self.$$.dirty & /*$config*/ 16) {
			$: if (true) window._config = Object.assign(Object.assign({}, $config), { config: _configstore__WEBPACK_IMPORTED_MODULE_14__.config });
		}

		if ($$self.$$.dirty & /*$config*/ 16) {
			$: localStorage.setItem('config', JSON.stringify($config));
		}

		if ($$self.$$.dirty & /*$store*/ 2) {
			$: try {
				localStorage.setItem('state', JSON.stringify({
					data: $store.stage.dump(),
					search: $store.search,
					series: $store.series
				}));
			} catch(_a) {
				localStorage.setItem('state', JSON.stringify({
					data: [],
					search: $store.search,
					series: $store.series
				}));

				console.error('Data too large! Caution, reloading won\'t work as expected!');
			}
		}
	};

	return [
		stage,
		$store,
		backToSearch,
		openSettings,
		$config,
		click_handler,
		click_handler_1
	];
}

class App extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);



/***/ }),

/***/ "./src/Components/Alert.svelte":
/*!*************************************!*\
  !*** ./src/Components/Alert.svelte ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Components/Alert.svelte generated by Svelte v3.49.0 */


const file = "src/Components/Alert.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1mwdlru", "@keyframes svelte-1mwdlru-slide{0%{left:0}100%{left:1em}}.info.svelte-1mwdlru{color:#b3e5fc\n  }.info.svelte-1mwdlru::before{content:'\\2139';margin-right:0.5em}.alert.svelte-1mwdlru{padding:8px 16px;border-radius:6px;border:1px solid}.alert.info.svelte-1mwdlru{border-color:rgb(143, 183, 202);color:black;background-color:rgb(194, 234, 253)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxlcnQuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQUFxQixXQUFBLG9CQUFBLENBQUE7d1BBY3JCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkFsZXJ0LnN2ZWx0ZSJdfQ== */");
}

function create_fragment(ctx) {
	let p;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			if (default_slot) default_slot.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "info alert svelte-1mwdlru");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 28, 0, 417);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);

			if (default_slot) {
				default_slot.m(p, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(/*$$scope*/ ctx[0])
						: (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
			if (default_slot) default_slot.d(detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Alert', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Alert> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Alert extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Alert",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Alert);



/***/ }),

/***/ "./src/Components/BackToSearch.svelte":
/*!********************************************!*\
  !*** ./src/Components/BackToSearch.svelte ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Components/BackToSearch.svelte generated by Svelte v3.49.0 */


const file = "src/Components/BackToSearch.svelte";

// (5:0) {#if backToSearch}
function create_if_block(ctx) {
	let a;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a.textContent = "Back to Search";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "#search");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "small");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 5, 2, 88);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
					a,
					"click",
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
						if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*backToSearch*/ ctx[0])) /*backToSearch*/ ctx[0].apply(this, arguments);
					}),
					false,
					true,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(5:0) {#if backToSearch}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let if_block = /*backToSearch*/ ctx[0] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (/*backToSearch*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('BackToSearch', slots, []);
	let { backToSearch = undefined } = $$props;
	const writable_props = ['backToSearch'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BackToSearch> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('backToSearch' in $$props) $$invalidate(0, backToSearch = $$props.backToSearch);
	};

	$$self.$capture_state = () => ({ backToSearch });

	$$self.$inject_state = $$props => {
		if ('backToSearch' in $$props) $$invalidate(0, backToSearch = $$props.backToSearch);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [backToSearch];
}

class BackToSearch extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { backToSearch: 0 });

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "BackToSearch",
			options,
			id: create_fragment.name
		});
	}

	get backToSearch() {
		throw new Error("<BackToSearch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set backToSearch(value) {
		throw new Error("<BackToSearch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackToSearch);



/***/ }),

/***/ "./src/Components/ChapterControls.svelte":
/*!***********************************************!*\
  !*** ./src/Components/ChapterControls.svelte ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _icons_triangle_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/triangle.svg */ "./src/icons/triangle.svg");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Components/ChapterControls.svelte generated by Svelte v3.49.0 */



const file = "src/Components/ChapterControls.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1ahjj8t", ".controls.svelte-1ahjj8t svg{height:0.8em}.control-disabled.svelte-1ahjj8t{opacity:0.7;cursor:inherit}.up.svelte-1ahjj8t{display:inline-flex;align-items:baseline;grid-gap:2px;gap:2px;padding:2px 5px;background-color:lightgray;border:1px dotted gray;border-radius:4px;text-decoration:none}.up.svelte-1ahjj8t:hover{border:1px solid gray}.down.svelte-1ahjj8t{display:inline-flex;align-items:baseline;grid-gap:2px;gap:2px;padding:2px 5px;background-color:lightgray;border:1px dotted gray;border-radius:4px;text-decoration:none}.down.svelte-1ahjj8t:hover{border:1px solid gray}.down.svelte-1ahjj8t svg{transform:rotate(180deg);margin:auto 0}.remove.svelte-1ahjj8t{color:#e32636\n  }.remove.svelte-1ahjj8t:hover{color:hsl(354.92063492063494, 77.1428571429%, 31.9607843137%)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcHRlckNvbnRyb2xzLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFRcUIsd0JBQUEsQ0FBQSxBQUFBLEdBQUEsQUFBQSxDQUFBOzhGQTBDckIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQ2hhcHRlckNvbnRyb2xzLnN2ZWx0ZSJdfQ== */");
}

function create_fragment(ctx) {
	let div;
	let a0;
	let triangle0;
	let t0;
	let t1;
	let a1;
	let triangle1;
	let t2;
	let t3;
	let a2;
	let current;
	let mounted;
	let dispose;
	triangle0 = new _icons_triangle_svg__WEBPACK_IMPORTED_MODULE_1__["default"]({ $$inline: true });
	triangle1 = new _icons_triangle_svg__WEBPACK_IMPORTED_MODULE_1__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			a0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(triangle0.$$.fragment);
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" move up");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			a1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(triangle1.$$.fragment);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" move down");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			a2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a2.textContent = "remove";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "href", "#up");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "class", "small up svelte-1ahjj8t");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(a0, "control-disabled", !/*moveUp*/ ctx[0]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a0, file, 54, 2, 1095);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "href", "#dowm");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "class", "small down svelte-1ahjj8t");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(a1, "control-disabled", !/*moveDown*/ ctx[1]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a1, file, 55, 2, 1237);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a2, "href", "#remove");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a2, "class", "small remove svelte-1ahjj8t");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a2, file, 56, 2, 1389);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "controls svelte-1ahjj8t");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 53, 0, 1070);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, a0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(triangle0, a0, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a0, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, a1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(triangle1, a1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a1, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, a2);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
						a0,
						"click",
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.stop_propagation)((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
							if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*moveUp*/ ctx[0])) /*moveUp*/ ctx[0].apply(this, arguments);
						})),
						false,
						true,
						true
					),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
						a1,
						"click",
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.stop_propagation)((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
							if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*moveDown*/ ctx[1])) /*moveDown*/ ctx[1].apply(this, arguments);
						})),
						false,
						true,
						true
					),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
						a2,
						"click",
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.stop_propagation)((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
							if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*remove*/ ctx[2])) /*remove*/ ctx[2].apply(this, arguments);
						})),
						false,
						true,
						true
					)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (dirty & /*moveUp*/ 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(a0, "control-disabled", !/*moveUp*/ ctx[0]);
			}

			if (dirty & /*moveDown*/ 2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(a1, "control-disabled", !/*moveDown*/ ctx[1]);
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(triangle0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(triangle1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(triangle0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(triangle1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(triangle0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(triangle1);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('ChapterControls', slots, []);
	let { moveUp = undefined } = $$props;
	let { moveDown = undefined } = $$props;
	let { remove } = $$props;
	const writable_props = ['moveUp', 'moveDown', 'remove'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChapterControls> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('moveUp' in $$props) $$invalidate(0, moveUp = $$props.moveUp);
		if ('moveDown' in $$props) $$invalidate(1, moveDown = $$props.moveDown);
		if ('remove' in $$props) $$invalidate(2, remove = $$props.remove);
	};

	$$self.$capture_state = () => ({ moveUp, moveDown, remove, Triangle: _icons_triangle_svg__WEBPACK_IMPORTED_MODULE_1__["default"] });

	$$self.$inject_state = $$props => {
		if ('moveUp' in $$props) $$invalidate(0, moveUp = $$props.moveUp);
		if ('moveDown' in $$props) $$invalidate(1, moveDown = $$props.moveDown);
		if ('remove' in $$props) $$invalidate(2, remove = $$props.remove);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [moveUp, moveDown, remove];
}

class ChapterControls extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { moveUp: 0, moveDown: 1, remove: 2 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "ChapterControls",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*remove*/ ctx[2] === undefined && !('remove' in props)) {
			console.warn("<ChapterControls> was created without expected prop 'remove'");
		}
	}

	get moveUp() {
		throw new Error("<ChapterControls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set moveUp(value) {
		throw new Error("<ChapterControls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get moveDown() {
		throw new Error("<ChapterControls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set moveDown(value) {
		throw new Error("<ChapterControls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get remove() {
		throw new Error("<ChapterControls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set remove(value) {
		throw new Error("<ChapterControls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChapterControls);



/***/ }),

/***/ "./src/Components/ChapterEdit.svelte":
/*!*******************************************!*\
  !*** ./src/Components/ChapterEdit.svelte ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _tinymce_tinymce_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tinymce/tinymce-svelte */ "./node_modules/.pnpm/@tinymce+tinymce-svelte@1.0.0/node_modules/@tinymce/tinymce-svelte/dist/index.js");
/* harmony import */ var _configstore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../configstore */ "./src/configstore.ts");
/* harmony import */ var _icons_back_arrow_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/back-arrow.svg */ "./src/icons/back-arrow.svg");
/* harmony import */ var _ChapterControls_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChapterControls.svelte */ "./src/Components/ChapterControls.svelte");
/* harmony import */ var _Column_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Column.svelte */ "./src/Components/Column.svelte");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Components/ChapterEdit.svelte generated by Svelte v3.49.0 */







const file = "src/Components/ChapterEdit.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-13pfiuq", ":first-child>.chapter.svelte-13pfiuq.svelte-13pfiuq{border-top-left-radius:2px;border-top-right-radius:2px}:last-child>.chapter.svelte-13pfiuq.svelte-13pfiuq{border-bottom-left-radius:2px;border-bottom-right-radius:2px}:not(:first-child)>.chapter.svelte-13pfiuq.svelte-13pfiuq{margin-top:-1px}.chapter.svelte-13pfiuq.svelte-13pfiuq{border-radius:2px}:not(:first-child)>.chapter.svelte-13pfiuq.svelte-13pfiuq{margin-top:1em}:not(:last-child)>.chapter.svelte-13pfiuq.svelte-13pfiuq{margin-bottom:1em}.edit.svelte-13pfiuq input.svelte-13pfiuq:not([type=\"checkbox\"]),.edit.svelte-13pfiuq textarea.svelte-13pfiuq,.edit.svelte-13pfiuq label.svelte-13pfiuq{display:block;width:100%;box-sizing:border-box}.edit.svelte-13pfiuq textarea{min-height:100px;height:350px}.edit.svelte-13pfiuq label.svelte-13pfiuq{cursor:pointer}.field.svelte-13pfiuq.svelte-13pfiuq{display:grid;grid-template-columns:min-content 1fr;grid-gap:4px;gap:4px\n  }@media screen and (max-width: 950px){.field.svelte-13pfiuq.svelte-13pfiuq{margin-top:0.4em}.field.svelte-13pfiuq.svelte-13pfiuq,.chapter.svelte-13pfiuq:not(.open) .field.svelte-13pfiuq{grid-template-columns:1fr}}.field.svelte-13pfiuq span.svelte-13pfiuq{margin:0.4em 1px}.field.svelte-13pfiuq .label.svelte-13pfiuq{overflow:hidden;transition:opacity 0.2s ease-in-out;opacity:1;width:60px;transition:width 0.2s ease-in-out\n    }.field.svelte-13pfiuq .label.svelte-13pfiuq::after{content:':'}@media screen and (max-width: 950px){.field.svelte-13pfiuq .label.svelte-13pfiuq{position:absolute;margin-top:-0.5em;padding-left:3px;font-size:0.8em;opacity:0.8\n    }.field.svelte-13pfiuq .label.svelte-13pfiuq::after{content:''}}.field.svelte-13pfiuq .svelte-13pfiuq:not(.label){border-bottom:1px solid currentColor}.back.svelte-13pfiuq svg{height:0.65em}.back.svelte-13pfiuq a.svelte-13pfiuq{text-decoration:none;color:inherit\n    }.back.svelte-13pfiuq a.svelte-13pfiuq:hover,.back.svelte-13pfiuq a.svelte-13pfiuq:active,.back.svelte-13pfiuq a.svelte-13pfiuq:focus{text-decoration:underline}.url.svelte-13pfiuq.svelte-13pfiuq{word-break:break-word}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcHRlckVkaXQuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQWdDcUIsWUFBQSxBQUFBLENBQUEsUUFBQSw4QkFBQSxDQUFBOzs7OzZOQThHckIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQ2hhcHRlckVkaXQuc3ZlbHRlIl19 */");
}

// (150:4) {#if url !== undefined}
function create_if_block_2(ctx) {
	let div;
	let span0;
	let t1;
	let span1;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span0.textContent = "URL";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span0, "class", "label svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span0, file, 151, 8, 3489);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span1, "class", "url svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span1, "aria-label", "URL");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span1, "contenteditable", "");
			if (/*url*/ ctx[3] === void 0) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => /*span1_input_handler_1*/ ctx[13].call(span1));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span1, file, 152, 8, 3528);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "field svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 150, 6, 3461);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, span0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, span1);

			if (/*url*/ ctx[3] !== void 0) {
				span1.innerHTML = /*url*/ ctx[3];
			}

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(span1, "input", /*span1_input_handler_1*/ ctx[13]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(span1, "keydown", /*keydownDisableEnter*/ ctx[10], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*url*/ 8 && /*url*/ ctx[3] !== span1.innerHTML) {
				span1.innerHTML = /*url*/ ctx[3];
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(150:4) {#if url !== undefined}",
		ctx
	});

	return block;
}

// (159:4) {:else}
function create_else_block(ctx) {
	let textarea;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			textarea = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("textarea");
			textarea.disabled = /*needsFetching*/ ctx[2];
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "class", "svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(textarea, file, 159, 6, 3853);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, textarea, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(textarea, /*content*/ ctx[1]);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(textarea, "input", /*textarea_input_handler*/ ctx[15]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*needsFetching*/ 4) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prop_dev)(textarea, "disabled", /*needsFetching*/ ctx[2]);
			}

			if (dirty & /*content*/ 2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(textarea, /*content*/ ctx[1]);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(textarea);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(159:4) {:else}",
		ctx
	});

	return block;
}

// (156:4) {#if $config.useTiny}
function create_if_block_1(ctx) {
	let editor;
	let updating_value;
	let current;

	function editor_value_binding(value) {
		/*editor_value_binding*/ ctx[14](value);
	}

	let editor_props = {
		disabled: /*needsFetching*/ ctx[2],
		apiKey: "okcf1pz4foebbixgcdydveaavknj41e62etldhxguuyug0v3",
		conf: /*conf*/ ctx[11]
	};

	if (/*content*/ ctx[1] !== void 0) {
		editor_props.value = /*content*/ ctx[1];
	}

	editor = new _tinymce_tinymce_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({ props: editor_props, $$inline: true });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(editor, 'value', editor_value_binding));

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(editor.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(editor, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const editor_changes = {};
			if (dirty & /*needsFetching*/ 4) editor_changes.disabled = /*needsFetching*/ ctx[2];

			if (!updating_value && dirty & /*content*/ 2) {
				updating_value = true;
				editor_changes.value = /*content*/ ctx[1];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_value = false);
			}

			editor.$set(editor_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(editor.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(editor.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(editor, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(156:4) {#if $config.useTiny}",
		ctx
	});

	return block;
}

// (162:4) {#if canFetch}
function create_if_block(ctx) {
	let label;
	let input;
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" Fetch contents");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "type", "checkbox");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "class", "svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(input, file, 163, 8, 3974);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(label, "class", "svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(label, file, 162, 6, 3958);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, label, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, input);
			input.checked = /*needsFetching*/ ctx[2];
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input, "change", /*input_change_handler*/ ctx[16]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*needsFetching*/ 4) {
				input.checked = /*needsFetching*/ ctx[2];
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(label);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(162:4) {#if canFetch}",
		ctx
	});

	return block;
}

// (143:0) <Column onSubmit={close}>
function create_default_slot(ctx) {
	let h3;
	let a;
	let backarrow;
	let t0;
	let t1;
	let div1;
	let div0;
	let span0;
	let t3;
	let span1;
	let t4;
	let t5;
	let current_block_type_index;
	let if_block1;
	let t6;
	let t7;
	let span2;
	let t8;
	let chaptercontrols;
	let current;
	let mounted;
	let dispose;
	backarrow = new _icons_back_arrow_svg__WEBPACK_IMPORTED_MODULE_3__["default"]({ $$inline: true });
	let if_block0 = /*url*/ ctx[3] !== undefined && create_if_block_2(ctx);
	const if_block_creators = [create_if_block_1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$config*/ ctx[9].useTiny) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block2 = /*canFetch*/ ctx[4] && create_if_block(ctx);

	chaptercontrols = new _ChapterControls_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				moveUp: /*moveUp*/ ctx[6],
				moveDown: /*moveDown*/ ctx[7],
				remove: /*remove*/ ctx[8]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			h3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h3");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(backarrow.$$.fragment);
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" back");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span0.textContent = "Title";
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block0) if_block0.c();
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if_block1.c();
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block2) if_block2.c();
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(chaptercontrols.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "#home");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "homelink svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 143, 19, 3100);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(h3, "class", "back svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h3, file, 143, 2, 3083);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span0, "class", "label svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span0, file, 146, 6, 3254);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span1, "class", "title svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span1, "aria-label", "Title");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span1, "contenteditable", "");
			if (/*title*/ ctx[0] === void 0) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => /*span1_input_handler*/ ctx[12].call(span1));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span1, file, 147, 6, 3293);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div0, "class", "field svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div0, file, 145, 4, 3228);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div1, "class", "chapter edit svelte-13pfiuq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div1, file, 144, 2, 3197);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span2, file, 167, 2, 4082);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, h3, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(h3, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(backarrow, a, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, span0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, span1);

			if (/*title*/ ctx[0] !== void 0) {
				span1.innerHTML = /*title*/ ctx[0];
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t4);
			if (if_block0) if_block0.m(div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t5);
			if_blocks[current_block_type_index].m(div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t6);
			if (if_block2) if_block2.m(div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t7, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t8, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(chaptercontrols, target, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
						a,
						"click",
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
							if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*close*/ ctx[5])) /*close*/ ctx[5].apply(this, arguments);
						}),
						false,
						true,
						false
					),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(span1, "input", /*span1_input_handler*/ ctx[12]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(span1, "keydown", /*keydownDisableEnter*/ ctx[10], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*title*/ 1 && /*title*/ ctx[0] !== span1.innerHTML) {
				span1.innerHTML = /*title*/ ctx[0];
			}

			if (/*url*/ ctx[3] !== undefined) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(div1, t5);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1, 1);
				if_block1.m(div1, t6);
			}

			if (/*canFetch*/ ctx[4]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					if_block2.m(div1, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			const chaptercontrols_changes = {};
			if (dirty & /*moveUp*/ 64) chaptercontrols_changes.moveUp = /*moveUp*/ ctx[6];
			if (dirty & /*moveDown*/ 128) chaptercontrols_changes.moveDown = /*moveDown*/ ctx[7];
			if (dirty & /*remove*/ 256) chaptercontrols_changes.remove = /*remove*/ ctx[8];
			chaptercontrols.$set(chaptercontrols_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(backarrow.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(chaptercontrols.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(backarrow.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(chaptercontrols.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(h3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(backarrow);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div1);
			if (if_block0) if_block0.d();
			if_blocks[current_block_type_index].d();
			if (if_block2) if_block2.d();
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t7);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span2);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(chaptercontrols, detaching);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(143:0) <Column onSubmit={close}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let column;
	let current;

	column = new _Column_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({
			props: {
				onSubmit: /*close*/ ctx[5],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(column.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(column, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const column_changes = {};
			if (dirty & /*close*/ 32) column_changes.onSubmit = /*close*/ ctx[5];

			if (dirty & /*$$scope, moveUp, moveDown, remove, needsFetching, canFetch, content, $config, url, title, close*/ 132095) {
				column_changes.$$scope = { dirty, ctx };
			}

			column.$set(column_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(column.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(column.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(column, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let $config;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_configstore__WEBPACK_IMPORTED_MODULE_2__.config, 'config');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _configstore__WEBPACK_IMPORTED_MODULE_2__.config, $$value => $$invalidate(9, $config = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('ChapterEdit', slots, []);
	let { title } = $$props;
	let { content } = $$props;
	let { needsFetching } = $$props;
	let { url = undefined } = $$props;
	let { canFetch = false } = $$props;
	let { close } = $$props;
	let { moveUp = undefined } = $$props;
	let { moveDown = undefined } = $$props;
	let { remove } = $$props;

	needsFetching = needsFetching !== null && needsFetching !== void 0
	? needsFetching
	: true;

	content = content !== null && content !== void 0 ? content : '';

	const keydownDisableEnter = e => {
		if (e.key === "Enter" || e.keyCode === 13) e.preventDefault(); // prevent newlines
	};

	const conf = {
		plugins: 'code',
		toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | code'
	};

	const writable_props = [
		'title',
		'content',
		'needsFetching',
		'url',
		'canFetch',
		'close',
		'moveUp',
		'moveDown',
		'remove'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChapterEdit> was created with unknown prop '${key}'`);
	});

	function span1_input_handler() {
		title = this.innerHTML;
		$$invalidate(0, title);
	}

	function span1_input_handler_1() {
		url = this.innerHTML;
		$$invalidate(3, url);
	}

	function editor_value_binding(value) {
		content = value;
		$$invalidate(1, content);
	}

	function textarea_input_handler() {
		content = this.value;
		$$invalidate(1, content);
	}

	function input_change_handler() {
		needsFetching = this.checked;
		$$invalidate(2, needsFetching);
	}

	$$self.$$set = $$props => {
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('content' in $$props) $$invalidate(1, content = $$props.content);
		if ('needsFetching' in $$props) $$invalidate(2, needsFetching = $$props.needsFetching);
		if ('url' in $$props) $$invalidate(3, url = $$props.url);
		if ('canFetch' in $$props) $$invalidate(4, canFetch = $$props.canFetch);
		if ('close' in $$props) $$invalidate(5, close = $$props.close);
		if ('moveUp' in $$props) $$invalidate(6, moveUp = $$props.moveUp);
		if ('moveDown' in $$props) $$invalidate(7, moveDown = $$props.moveDown);
		if ('remove' in $$props) $$invalidate(8, remove = $$props.remove);
	};

	$$self.$capture_state = () => ({
		title,
		content,
		needsFetching,
		url,
		canFetch,
		close,
		moveUp,
		moveDown,
		remove,
		Editor: _tinymce_tinymce_svelte__WEBPACK_IMPORTED_MODULE_1__["default"],
		config: _configstore__WEBPACK_IMPORTED_MODULE_2__.config,
		BackArrow: _icons_back_arrow_svg__WEBPACK_IMPORTED_MODULE_3__["default"],
		ChapterControls: _ChapterControls_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		Column: _Column_svelte__WEBPACK_IMPORTED_MODULE_5__["default"],
		keydownDisableEnter,
		conf,
		$config
	});

	$$self.$inject_state = $$props => {
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('content' in $$props) $$invalidate(1, content = $$props.content);
		if ('needsFetching' in $$props) $$invalidate(2, needsFetching = $$props.needsFetching);
		if ('url' in $$props) $$invalidate(3, url = $$props.url);
		if ('canFetch' in $$props) $$invalidate(4, canFetch = $$props.canFetch);
		if ('close' in $$props) $$invalidate(5, close = $$props.close);
		if ('moveUp' in $$props) $$invalidate(6, moveUp = $$props.moveUp);
		if ('moveDown' in $$props) $$invalidate(7, moveDown = $$props.moveDown);
		if ('remove' in $$props) $$invalidate(8, remove = $$props.remove);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*title*/ 1) {
			$: $$invalidate(0, title = title.replace(/<[^>]*>/g, ''));
		}
	};

	return [
		title,
		content,
		needsFetching,
		url,
		canFetch,
		close,
		moveUp,
		moveDown,
		remove,
		$config,
		keydownDisableEnter,
		conf,
		span1_input_handler,
		span1_input_handler_1,
		editor_value_binding,
		textarea_input_handler,
		input_change_handler
	];
}

class ChapterEdit extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(
			this,
			options,
			instance,
			create_fragment,
			svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal,
			{
				title: 0,
				content: 1,
				needsFetching: 2,
				url: 3,
				canFetch: 4,
				close: 5,
				moveUp: 6,
				moveDown: 7,
				remove: 8
			},
			add_css
		);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "ChapterEdit",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
			console.warn("<ChapterEdit> was created without expected prop 'title'");
		}

		if (/*content*/ ctx[1] === undefined && !('content' in props)) {
			console.warn("<ChapterEdit> was created without expected prop 'content'");
		}

		if (/*needsFetching*/ ctx[2] === undefined && !('needsFetching' in props)) {
			console.warn("<ChapterEdit> was created without expected prop 'needsFetching'");
		}

		if (/*close*/ ctx[5] === undefined && !('close' in props)) {
			console.warn("<ChapterEdit> was created without expected prop 'close'");
		}

		if (/*remove*/ ctx[8] === undefined && !('remove' in props)) {
			console.warn("<ChapterEdit> was created without expected prop 'remove'");
		}
	}

	get title() {
		throw new Error("<ChapterEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<ChapterEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get content() {
		throw new Error("<ChapterEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set content(value) {
		throw new Error("<ChapterEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get needsFetching() {
		throw new Error("<ChapterEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set needsFetching(value) {
		throw new Error("<ChapterEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get url() {
		throw new Error("<ChapterEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set url(value) {
		throw new Error("<ChapterEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get canFetch() {
		throw new Error("<ChapterEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set canFetch(value) {
		throw new Error("<ChapterEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get close() {
		throw new Error("<ChapterEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set close(value) {
		throw new Error("<ChapterEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get moveUp() {
		throw new Error("<ChapterEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set moveUp(value) {
		throw new Error("<ChapterEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get moveDown() {
		throw new Error("<ChapterEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set moveDown(value) {
		throw new Error("<ChapterEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get remove() {
		throw new Error("<ChapterEdit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set remove(value) {
		throw new Error("<ChapterEdit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChapterEdit);



/***/ }),

/***/ "./src/Components/ChapterSelect.svelte":
/*!*********************************************!*\
  !*** ./src/Components/ChapterSelect.svelte ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _ChapterControls_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChapterControls.svelte */ "./src/Components/ChapterControls.svelte");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Components/ChapterSelect.svelte generated by Svelte v3.49.0 */




const file = "src/Components/ChapterSelect.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1ltngm7", ".chapter.svelte-1ltngm7.svelte-1ltngm7{border:1px dotted lightgray;margin:0;cursor:move\n  }.chapter.svelte-1ltngm7.svelte-1ltngm7:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.chapter.svelte-1ltngm7.svelte-1ltngm7:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.chapter.svelte-1ltngm7.svelte-1ltngm7:not(:first-child){margin-top:-1px}.chapter.svelte-1ltngm7 .more.svelte-1ltngm7{transition:height 0.1s ease-in-out, padding 0.1s ease-in-out;height:0;padding:0 0.5em;overflow:hidden}.chapter.svelte-1ltngm7:not([draggable]#dnd-action-dragged-el):hover .more.svelte-1ltngm7,.chapter.svelte-1ltngm7:not([draggable]#dnd-action-dragged-el):active .more.svelte-1ltngm7,.chapter.svelte-1ltngm7:not([draggable]#dnd-action-dragged-el):focus .more.svelte-1ltngm7{transition:height 0.1s ease-in-out 0.2s, padding 0.1s ease-in-out 0.2s;height:1.5em;padding:0.4em 0.5em}.preview.svelte-1ltngm7.svelte-1ltngm7{display:grid;grid-template-columns:2fr 3fr;grid-gap:5px;gap:5px;align-items:center;overflow:hidden\n  }.preview.empty.svelte-1ltngm7.svelte-1ltngm7{grid-template-columns:1fr}.preview.svelte-1ltngm7 .title.svelte-1ltngm7{position:relative;border-bottom:1px solid rgba(0,0,0,0)}.preview.svelte-1ltngm7 .content.svelte-1ltngm7{}.preview.svelte-1ltngm7 .title.svelte-1ltngm7,.preview.svelte-1ltngm7 .content.svelte-1ltngm7{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0.4em 0.5em}@media screen and (max-width: 950px){.preview.svelte-1ltngm7.svelte-1ltngm7{grid-template-columns:1fr}.preview.svelte-1ltngm7 .content.svelte-1ltngm7{display:none}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcHRlclNlbGVjdC5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBaUJxQixRQUFBLDhCQUFBLENBQUE7O2dqQkErRXJCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkNoYXB0ZXJTZWxlY3Quc3ZlbHRlIl19 */");
}

// (91:4) {#if !empty}
function create_if_block(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*decoded*/ ctx[5]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "content svelte-1ltngm7");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 90, 16, 2283);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*decoded*/ 32) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, /*decoded*/ ctx[5]);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(91:4) {#if !empty}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div2;
	let div0;
	let span;
	let t0;
	let t1;
	let t2;
	let div1;
	let chaptercontrols;
	let current;
	let mounted;
	let dispose;
	let if_block = !/*empty*/ ctx[6] && create_if_block(ctx);

	chaptercontrols = new _ChapterControls_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				moveUp: /*moveUp*/ ctx[2],
				moveDown: /*moveDown*/ ctx[3],
				remove: /*remove*/ ctx[4]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*title*/ ctx[0]);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(chaptercontrols.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "title svelte-1ltngm7");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "aria-label", "Title");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 89, 4, 2213);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div0, "class", "preview svelte-1ltngm7");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(div0, "empty", /*empty*/ ctx[6]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div0, file, 88, 2, 2175);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div1, "class", "more svelte-1ltngm7");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div1, file, 92, 2, 2338);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div2, "class", "chapter svelte-1ltngm7");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div2, "tabindex", "0");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div2, "title", /*title*/ ctx[0]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div2, file, 87, 0, 2079);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, t1);
			if (if_block) if_block.m(div0, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, div1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(chaptercontrols, div1, null);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
						div2,
						"click",
						function () {
							if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*select*/ ctx[1])) /*select*/ ctx[1].apply(this, arguments);
						},
						false,
						false,
						false
					),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(div2, "contextmenu", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*contextmenu_handler*/ ctx[8]), false, true, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			if (!current || dirty & /*title*/ 1) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t0, /*title*/ ctx[0]);

			if (!/*empty*/ ctx[6]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div0, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*empty*/ 64) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(div0, "empty", /*empty*/ ctx[6]);
			}

			const chaptercontrols_changes = {};
			if (dirty & /*moveUp*/ 4) chaptercontrols_changes.moveUp = /*moveUp*/ ctx[2];
			if (dirty & /*moveDown*/ 8) chaptercontrols_changes.moveDown = /*moveDown*/ ctx[3];
			if (dirty & /*remove*/ 16) chaptercontrols_changes.remove = /*remove*/ ctx[4];
			chaptercontrols.$set(chaptercontrols_changes);

			if (!current || dirty & /*title*/ 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div2, "title", /*title*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(chaptercontrols.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(chaptercontrols.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div2);
			if (if_block) if_block.d();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(chaptercontrols);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let empty;
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('ChapterSelect', slots, []);
	let { title } = $$props;
	let { content } = $$props;
	let { select } = $$props;
	let { moveUp = undefined } = $$props;
	let { moveDown = undefined } = $$props;
	let { remove } = $$props;
	content = content !== null && content !== void 0 ? content : '';
	let decoded = '';
	const writable_props = ['title', 'content', 'select', 'moveUp', 'moveDown', 'remove'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChapterSelect> was created with unknown prop '${key}'`);
	});

	function contextmenu_handler(event) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('content' in $$props) $$invalidate(7, content = $$props.content);
		if ('select' in $$props) $$invalidate(1, select = $$props.select);
		if ('moveUp' in $$props) $$invalidate(2, moveUp = $$props.moveUp);
		if ('moveDown' in $$props) $$invalidate(3, moveDown = $$props.moveDown);
		if ('remove' in $$props) $$invalidate(4, remove = $$props.remove);
	};

	$$self.$capture_state = () => ({
		title,
		content,
		select,
		moveUp,
		moveDown,
		remove,
		decode: _util__WEBPACK_IMPORTED_MODULE_1__.decode,
		ChapterControls: _ChapterControls_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		decoded,
		empty
	});

	$$self.$inject_state = $$props => {
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('content' in $$props) $$invalidate(7, content = $$props.content);
		if ('select' in $$props) $$invalidate(1, select = $$props.select);
		if ('moveUp' in $$props) $$invalidate(2, moveUp = $$props.moveUp);
		if ('moveDown' in $$props) $$invalidate(3, moveDown = $$props.moveDown);
		if ('remove' in $$props) $$invalidate(4, remove = $$props.remove);
		if ('decoded' in $$props) $$invalidate(5, decoded = $$props.decoded);
		if ('empty' in $$props) $$invalidate(6, empty = $$props.empty);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*content*/ 128) {
			$: $$invalidate(6, empty = !content || !content.trim().length);
		}

		if ($$self.$$.dirty & /*content*/ 128) {
			$: setTimeout(() => $$invalidate(5, decoded = (0,_util__WEBPACK_IMPORTED_MODULE_1__.decode)(content || '')), 0); // moves the strain of decoding
		}
	};

	return [
		title,
		select,
		moveUp,
		moveDown,
		remove,
		decoded,
		empty,
		content,
		contextmenu_handler
	];
}

class ChapterSelect extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(
			this,
			options,
			instance,
			create_fragment,
			svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal,
			{
				title: 0,
				content: 7,
				select: 1,
				moveUp: 2,
				moveDown: 3,
				remove: 4
			},
			add_css
		);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "ChapterSelect",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
			console.warn("<ChapterSelect> was created without expected prop 'title'");
		}

		if (/*content*/ ctx[7] === undefined && !('content' in props)) {
			console.warn("<ChapterSelect> was created without expected prop 'content'");
		}

		if (/*select*/ ctx[1] === undefined && !('select' in props)) {
			console.warn("<ChapterSelect> was created without expected prop 'select'");
		}

		if (/*remove*/ ctx[4] === undefined && !('remove' in props)) {
			console.warn("<ChapterSelect> was created without expected prop 'remove'");
		}
	}

	get title() {
		throw new Error("<ChapterSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<ChapterSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get content() {
		throw new Error("<ChapterSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set content(value) {
		throw new Error("<ChapterSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get select() {
		throw new Error("<ChapterSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set select(value) {
		throw new Error("<ChapterSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get moveUp() {
		throw new Error("<ChapterSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set moveUp(value) {
		throw new Error("<ChapterSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get moveDown() {
		throw new Error("<ChapterSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set moveDown(value) {
		throw new Error("<ChapterSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get remove() {
		throw new Error("<ChapterSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set remove(value) {
		throw new Error("<ChapterSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChapterSelect);



/***/ }),

/***/ "./src/Components/Column.svelte":
/*!**************************************!*\
  !*** ./src/Components/Column.svelte ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Components/Column.svelte generated by Svelte v3.49.0 */


const file = "src/Components/Column.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-12n6e3q", ".column-card.svelte-12n6e3q{padding:10px 18px;border:1px dashed lightgray;border-radius:8px;display:grid;grid-template-columns:150px auto;grid-gap:10px;gap:10px;align-items:baseline\n  }@media screen and (max-width: 600px){.column-card.svelte-12n6e3q{grid-template-columns:100%;padding:6px 8px}.column-card.svelte-12n6e3q>p:not(:last-child){margin-bottom:1em}}@media screen and (max-width: 400px){.column-card.svelte-12n6e3q{margin:0 -5px\n  }}.column-card.svelte-12n6e3q>*{margin:0}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sdW1uLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFJcUIsWUFBQSxlQUFBLENBQUE7OzJDQTZCckIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQ29sdW1uLnN2ZWx0ZSJdfQ== */");
}

function create_fragment(ctx) {
	let form;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	const block = {
		c: function create() {
			form = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("form");
			if (default_slot) default_slot.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(form, "class", "column-card svelte-12n6e3q");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(form, file, 38, 0, 670);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, form, anchor);

			if (default_slot) {
				default_slot.m(form, null);
			}

			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
					form,
					"submit",
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
						if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*onSubmit*/ ctx[0])) /*onSubmit*/ ctx[0].apply(this, arguments);
					}),
					false,
					true,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[1],
						!current
						? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(/*$$scope*/ ctx[1])
						: (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(form);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Column', slots, ['default']);
	let { onSubmit = undefined } = $$props;
	const writable_props = ['onSubmit'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Column> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('onSubmit' in $$props) $$invalidate(0, onSubmit = $$props.onSubmit);
		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ onSubmit });

	$$self.$inject_state = $$props => {
		if ('onSubmit' in $$props) $$invalidate(0, onSubmit = $$props.onSubmit);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [onSubmit, $$scope, slots];
}

class Column extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { onSubmit: 0 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Column",
			options,
			id: create_fragment.name
		});
	}

	get onSubmit() {
		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onSubmit(value) {
		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Column);



/***/ }),

/***/ "./src/Components/ErrorMessage.svelte":
/*!********************************************!*\
  !*** ./src/Components/ErrorMessage.svelte ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Components/ErrorMessage.svelte generated by Svelte v3.49.0 */


const { console: console_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;
const file = "src/Components/ErrorMessage.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-m4i2yw", "@keyframes svelte-m4i2yw-slide{0%{left:0}100%{left:1em}}.error.svelte-m4i2yw{color:#e32636\n  }.error.svelte-m4i2yw::before{content:'\\26a0';margin-right:0.5em}.error.svelte-m4i2yw{display:block;margin:0.2em 0}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JNZXNzYWdlLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFTcUIsV0FBQSxtQkFBQSxDQUFBO3FIQVFyQiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJFcnJvck1lc3NhZ2Uuc3ZlbHRlIl19 */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (32:2) {#each errors as err}
function create_each_block(ctx) {
	let span;
	let t0;
	let t1_value = (/*err*/ ctx[4] ? ': ' : '') + "";
	let t1;
	let t2_value = (/*err*/ ctx[4].message || /*err*/ ctx[4]) + "";
	let t2;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Sorry, can't process that");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t2_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "error svelte-m4i2yw");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 32, 4, 486);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t2);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(32:2) {#each errors as err}",
		ctx
	});

	return block;
}

// (39:0) {#if back}
function create_if_block(ctx) {
	let a;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a.textContent = "back";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "#back");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 39, 2, 648);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
					a,
					"click",
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
						if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*back*/ ctx[1])) /*back*/ ctx[1].apply(this, arguments);
					}),
					false,
					true,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(39:0) {#if back}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let p;
	let t0;
	let button;
	let t2;
	let if_block_anchor;
	let mounted;
	let dispose;
	let each_value = /*errors*/ ctx[2];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block = /*back*/ ctx[1] && create_if_block(ctx);

	const block = {
		c: function create() {
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "Retry";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 30, 0, 454);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 36, 0, 592);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(p, null);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
					button,
					"click",
					function () {
						if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*retry*/ ctx[0])) /*retry*/ ctx[0].apply(this, arguments);
					},
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (dirty & /*errors*/ 4) {
				each_value = /*errors*/ ctx[2];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(p, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*back*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t2);
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('ErrorMessage', slots, []);
	let { error } = $$props;
	let { retry } = $$props;
	let { back = undefined } = $$props;
	if (true) console.error(error);
	let errors = Array.isArray(error) ? error : [error];
	const writable_props = ['error', 'retry', 'back'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<ErrorMessage> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('error' in $$props) $$invalidate(3, error = $$props.error);
		if ('retry' in $$props) $$invalidate(0, retry = $$props.retry);
		if ('back' in $$props) $$invalidate(1, back = $$props.back);
	};

	$$self.$capture_state = () => ({ error, retry, back, errors });

	$$self.$inject_state = $$props => {
		if ('error' in $$props) $$invalidate(3, error = $$props.error);
		if ('retry' in $$props) $$invalidate(0, retry = $$props.retry);
		if ('back' in $$props) $$invalidate(1, back = $$props.back);
		if ('errors' in $$props) $$invalidate(2, errors = $$props.errors);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [retry, back, errors, error];
}

class ErrorMessage extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { error: 3, retry: 0, back: 1 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "ErrorMessage",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*error*/ ctx[3] === undefined && !('error' in props)) {
			console_1.warn("<ErrorMessage> was created without expected prop 'error'");
		}

		if (/*retry*/ ctx[0] === undefined && !('retry' in props)) {
			console_1.warn("<ErrorMessage> was created without expected prop 'retry'");
		}
	}

	get error() {
		throw new Error("<ErrorMessage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error("<ErrorMessage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get retry() {
		throw new Error("<ErrorMessage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set retry(value) {
		throw new Error("<ErrorMessage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get back() {
		throw new Error("<ErrorMessage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set back(value) {
		throw new Error("<ErrorMessage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorMessage);



/***/ }),

/***/ "./src/Components/Loading.svelte":
/*!***************************************!*\
  !*** ./src/Components/Loading.svelte ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Components/Loading.svelte generated by Svelte v3.49.0 */


const file = "src/Components/Loading.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-w1n7v1", "@keyframes svelte-w1n7v1-slide{0%{left:0}100%{left:1em}}.loading.svelte-w1n7v1{font-style:italic;margin:0}.loading-container.svelte-w1n7v1{display:flex;grid-gap:10px;gap:10px}.loading-slider.svelte-w1n7v1{position:absolute;display:block;animation:0.7s ease-in-out infinite alternate svelte-w1n7v1-slide}.loading-slider-container.svelte-w1n7v1{position:relative;flex:0 0 2em}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBQXFCLFdBQUEsbUJBQUEsQ0FBQSx1VkFHckIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiTG9hZGluZy5zdmVsdGUiXX0= */");
}

// (32:27) Loading...
function fallback_block(ctx) {
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Loading...");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: fallback_block.name,
		type: "fallback",
		source: "(32:27) Loading...",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div1;
	let div0;
	let span;
	let t1;
	let p;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx, /*$$scope*/ ctx[0], null);
	const default_slot_or_fallback = default_slot || fallback_block(ctx);

	const block = {
		c: function create() {
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span.textContent = "•";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "loading-slider svelte-w1n7v1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 30, 40, 546);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div0, "class", "loading-slider-container svelte-w1n7v1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div0, file, 30, 2, 508);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "loading svelte-w1n7v1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 31, 2, 592);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div1, "class", "loading-container svelte-w1n7v1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div1, file, 29, 0, 474);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, p);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(p, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(/*$$scope*/ ctx[0])
						: (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot_or_fallback, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot_or_fallback, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div1);
			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Loading', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Loading> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Loading extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Loading",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);



/***/ }),

/***/ "./src/Components/Radio.svelte":
/*!*************************************!*\
  !*** ./src/Components/Radio.svelte ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Components/Radio.svelte generated by Svelte v3.49.0 */


const file = "src/Components/Radio.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1tapr9t", "@keyframes svelte-1tapr9t-slide{0%{left:0}100%{left:1em}}label.svelte-1tapr9t{display:block}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW8uc3ZlbHRlIiwibWFwcGluZ3MiOiJBQU9xQixXQUFBLG9CQUFBLENBQUEsNERBTXJCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIlJhZGlvLnN2ZWx0ZSJdfQ== */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (22:2) {#each options as opt (opt.value)}
function create_each_block(key_1, ctx) {
	let label;
	let input;
	let input_value_value;
	let input_checked_value;
	let t0;
	let t1_value = /*opt*/ ctx[4].label + "";
	let t1;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[3](/*opt*/ ctx[4]);
	}

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "type", "radio");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "name", /*name*/ ctx[2]);
			input.value = input_value_value = /*opt*/ ctx[4].value;
			input.checked = input_checked_value = /*selected*/ ctx[0] === /*opt*/ ctx[4].value;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(input, file, 22, 11, 347);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(label, "class", "svelte-1tapr9t");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(label, file, 22, 4, 340);
			this.first = label;
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, label, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, input);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t1);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input, "click", click_handler, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*name*/ 4) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "name", /*name*/ ctx[2]);
			}

			if (dirty & /*options*/ 2 && input_value_value !== (input_value_value = /*opt*/ ctx[4].value)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prop_dev)(input, "value", input_value_value);
			}

			if (dirty & /*selected, options*/ 3 && input_checked_value !== (input_checked_value = /*selected*/ ctx[0] === /*opt*/ ctx[4].value)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prop_dev)(input, "checked", input_checked_value);
			}

			if (dirty & /*options*/ 2 && t1_value !== (t1_value = /*opt*/ ctx[4].label + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(label);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(22:2) {#each options as opt (opt.value)}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_value = /*options*/ ctx[1];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	const get_key = ctx => /*opt*/ ctx[4].value;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_keys)(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "role", "radiogroup");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 20, 0, 275);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*options, name, selected*/ 7) {
				each_value = /*options*/ ctx[1];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_keys)(ctx, each_value, get_each_context, get_key);
				each_blocks = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_keyed_each)(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_block, create_each_block, null, get_each_context);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Radio', slots, []);
	let { options } = $$props;
	let { selected } = $$props;
	let { name = `radio-${Math.random().toString().slice(2)}` } = $$props;
	const writable_props = ['options', 'selected', 'name'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Radio> was created with unknown prop '${key}'`);
	});

	const click_handler = opt => $$invalidate(0, selected = opt.value);

	$$self.$$set = $$props => {
		if ('options' in $$props) $$invalidate(1, options = $$props.options);
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
		if ('name' in $$props) $$invalidate(2, name = $$props.name);
	};

	$$self.$capture_state = () => ({ options, selected, name });

	$$self.$inject_state = $$props => {
		if ('options' in $$props) $$invalidate(1, options = $$props.options);
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
		if ('name' in $$props) $$invalidate(2, name = $$props.name);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [selected, options, name, click_handler];
}

class Radio extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { options: 1, selected: 0, name: 2 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Radio",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*options*/ ctx[1] === undefined && !('options' in props)) {
			console.warn("<Radio> was created without expected prop 'options'");
		}

		if (/*selected*/ ctx[0] === undefined && !('selected' in props)) {
			console.warn("<Radio> was created without expected prop 'selected'");
		}
	}

	get options() {
		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set options(value) {
		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selected() {
		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selected(value) {
		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get name() {
		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Radio);



/***/ }),

/***/ "./src/Components/SeriesCard.svelte":
/*!******************************************!*\
  !*** ./src/Components/SeriesCard.svelte ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _Column_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Column.svelte */ "./src/Components/Column.svelte");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Components/SeriesCard.svelte generated by Svelte v3.49.0 */




const file = "src/Components/SeriesCard.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1pemcjw", ".edit.svelte-1pemcjw{display:block;width:100%;box-sizing:border-box;border-bottom:1px solid currentColor}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VyaWVzQ2FyZC5zdmVsdGUiLCJtYXBwaW5ncyI6InlHQWtCQSIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJTZXJpZXNDYXJkLnN2ZWx0ZSJdfQ== */");
}

// (24:4) {:else}
function create_else_block_1(ctx) {
	let span;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "edit svelte-1pemcjw");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "contenteditable", "");
			if (/*title*/ ctx[0] === void 0) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => /*span_input_handler*/ ctx[7].call(span));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 24, 6, 544);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);

			if (/*title*/ ctx[0] !== void 0) {
				span.innerHTML = /*title*/ ctx[0];
			}

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(span, "input", /*span_input_handler*/ ctx[7]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 1 && /*title*/ ctx[0] !== span.innerHTML) {
				span.innerHTML = /*title*/ ctx[0];
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(24:4) {:else}",
		ctx
	});

	return block;
}

// (22:4) {#if !edit}
function create_if_block_2(ctx) {
	let a;
	let t_value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.decode)(/*title*/ ctx[0]) + "";
	let t;
	let a_href_value;

	const block = {
		c: function create() {
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.apiToRegular)(/*url*/ ctx[3]));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "target", "_blank");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 22, 6, 460);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 1 && t_value !== (t_value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.decode)(/*title*/ ctx[0]) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);

			if (dirty & /*url*/ 8 && a_href_value !== (a_href_value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.apiToRegular)(/*url*/ ctx[3]))) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(22:4) {#if !edit}",
		ctx
	});

	return block;
}

// (32:4) {:else}
function create_else_block(ctx) {
	let span;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "edit svelte-1pemcjw");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "contenteditable", "");
			if (/*author*/ ctx[1] === void 0) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => /*span_input_handler_1*/ ctx[8].call(span));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 32, 6, 710);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);

			if (/*author*/ ctx[1] !== void 0) {
				span.innerHTML = /*author*/ ctx[1];
			}

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(span, "input", /*span_input_handler_1*/ ctx[8]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*author*/ 2 && /*author*/ ctx[1] !== span.innerHTML) {
				span.innerHTML = /*author*/ ctx[1];
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(32:4) {:else}",
		ctx
	});

	return block;
}

// (30:4) {#if !edit}
function create_if_block_1(ctx) {
	let t_value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.decode)(/*author*/ ctx[1]) + "";
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*author*/ 2 && t_value !== (t_value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.decode)(/*author*/ ctx[1]) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(30:4) {#if !edit}",
		ctx
	});

	return block;
}

// (36:2) {#if $$slots.default}
function create_if_block(ctx) {
	let h3;
	let t1;
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_slot)(default_slot_template, ctx, /*$$scope*/ ctx[9], null);

	const block = {
		c: function create() {
			h3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h3");
			h3.textContent = "Chapters";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			if (default_slot) default_slot.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h3, file, 36, 4, 824);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 37, 4, 846);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, h3, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_slot_base)(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
						? (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_all_dirty_from_scope)(/*$$scope*/ ctx[9])
						: (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.get_slot_changes)(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(h3);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			if (default_slot) default_slot.d(detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(36:2) {#if $$slots.default}",
		ctx
	});

	return block;
}

// (19:0) <Column onSubmit={onSubmit}>
function create_default_slot(ctx) {
	let h30;
	let t1;
	let p0;
	let t2;
	let h31;
	let t4;
	let p1;
	let t5;
	let if_block2_anchor;
	let current;

	function select_block_type(ctx, dirty) {
		if (!/*edit*/ ctx[2]) return create_if_block_2;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block0 = current_block_type(ctx);

	function select_block_type_1(ctx, dirty) {
		if (!/*edit*/ ctx[2]) return create_if_block_1;
		return create_else_block;
	}

	let current_block_type_1 = select_block_type_1(ctx, -1);
	let if_block1 = current_block_type_1(ctx);
	let if_block2 = /*$$slots*/ ctx[5].default && create_if_block(ctx);

	const block = {
		c: function create() {
			h30 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h3");
			h30.textContent = "Title";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			if_block0.c();
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			h31 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h3");
			h31.textContent = "Author";
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			if_block1.c();
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block2) if_block2.c();
			if_block2_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h30, file, 19, 2, 417);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p0, file, 20, 2, 434);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h31, file, 27, 2, 631);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p1, file, 28, 2, 649);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, h30, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p0, anchor);
			if_block0.m(p0, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, h31, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t4, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p1, anchor);
			if_block1.m(p1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t5, anchor);
			if (if_block2) if_block2.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block2_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(p0, null);
				}
			}

			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx, dirty)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(p1, null);
				}
			}

			if (/*$$slots*/ ctx[5].default) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*$$slots*/ 32) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			} else if (if_block2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(h30);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p0);
			if_block0.d();
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t2);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(h31);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t4);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p1);
			if_block1.d();
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t5);
			if (if_block2) if_block2.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block2_anchor);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(19:0) <Column onSubmit={onSubmit}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let column;
	let current;

	column = new _Column_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				onSubmit: /*onSubmit*/ ctx[4],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(column.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(column, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const column_changes = {};
			if (dirty & /*onSubmit*/ 16) column_changes.onSubmit = /*onSubmit*/ ctx[4];

			if (dirty & /*$$scope, $$slots, author, edit, url, title*/ 559) {
				column_changes.$$scope = { dirty, ctx };
			}

			column.$set(column_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(column.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(column.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(column, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('SeriesCard', slots, ['default']);
	const $$slots = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.compute_slots)(slots);
	let { edit = false } = $$props;
	let { title } = $$props;
	let { author } = $$props;
	let { url = '' } = $$props;
	let { onSubmit = undefined } = $$props;
	const writable_props = ['edit', 'title', 'author', 'url', 'onSubmit'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SeriesCard> was created with unknown prop '${key}'`);
	});

	function span_input_handler() {
		title = this.innerHTML;
		$$invalidate(0, title);
	}

	function span_input_handler_1() {
		author = this.innerHTML;
		$$invalidate(1, author);
	}

	$$self.$$set = $$props => {
		if ('edit' in $$props) $$invalidate(2, edit = $$props.edit);
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('author' in $$props) $$invalidate(1, author = $$props.author);
		if ('url' in $$props) $$invalidate(3, url = $$props.url);
		if ('onSubmit' in $$props) $$invalidate(4, onSubmit = $$props.onSubmit);
		if ('$$scope' in $$props) $$invalidate(9, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		edit,
		title,
		author,
		url,
		onSubmit,
		apiToRegular: _util__WEBPACK_IMPORTED_MODULE_1__.apiToRegular,
		decode: _util__WEBPACK_IMPORTED_MODULE_1__.decode,
		Column: _Column_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]
	});

	$$self.$inject_state = $$props => {
		if ('edit' in $$props) $$invalidate(2, edit = $$props.edit);
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('author' in $$props) $$invalidate(1, author = $$props.author);
		if ('url' in $$props) $$invalidate(3, url = $$props.url);
		if ('onSubmit' in $$props) $$invalidate(4, onSubmit = $$props.onSubmit);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		title,
		author,
		edit,
		url,
		onSubmit,
		$$slots,
		slots,
		span_input_handler,
		span_input_handler_1,
		$$scope
	];
}

class SeriesCard extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(
			this,
			options,
			instance,
			create_fragment,
			svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal,
			{
				edit: 2,
				title: 0,
				author: 1,
				url: 3,
				onSubmit: 4
			},
			add_css
		);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "SeriesCard",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
			console.warn("<SeriesCard> was created without expected prop 'title'");
		}

		if (/*author*/ ctx[1] === undefined && !('author' in props)) {
			console.warn("<SeriesCard> was created without expected prop 'author'");
		}
	}

	get edit() {
		throw new Error("<SeriesCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set edit(value) {
		throw new Error("<SeriesCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<SeriesCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<SeriesCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get author() {
		throw new Error("<SeriesCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set author(value) {
		throw new Error("<SeriesCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get url() {
		throw new Error("<SeriesCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set url(value) {
		throw new Error("<SeriesCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onSubmit() {
		throw new Error("<SeriesCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onSubmit(value) {
		throw new Error("<SeriesCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SeriesCard);



/***/ }),

/***/ "./src/Footer.svelte":
/*!***************************!*\
  !*** ./src/Footer.svelte ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _configstore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./configstore */ "./src/configstore.ts");
/* harmony import */ var _stages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stages */ "./src/stages.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Footer.svelte generated by Svelte v3.49.0 */






const file = "src/Footer.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1f8pws6", "footer.svelte-1f8pws6.svelte-1f8pws6{margin-top:3rem}footer.svelte-1f8pws6>.svelte-1f8pws6:last-child{margin-bottom:0}input.svelte-1f8pws6.svelte-1f8pws6{height:0.9em}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9vdGVyLnN2ZWx0ZSIsIm1hcHBpbmdzIjoidUtBcUJBIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkZvb3Rlci5zdmVsdGUiXX0= */");
}

// (31:2) {#if showPrivacy}
function create_if_block_1(ctx) {
	let p;
	let t0;
	let a;
	let t2;
	let code;
	let t4;
	let p_transition;
	let current;

	const block = {
		c: function create() {
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("This website (");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a.textContent = "https://cpiber.github.io/hfy-epub";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(") does not, and will not, collect any data from its users.\n      Any actions taken on this page are purely in the user's browser; there is no server-side component.\n      No data is ever sent away.\n      For collecting the chapter data, this site contacts ");
			code = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			code.textContent = `${_util__WEBPACK_IMPORTED_MODULE_3__.redditApiBase}`;
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" only. The book is generated in the browser.");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "https://cpiber.github.io/hfy-epub");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "target", "_blank");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 32, 20, 850);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code, file, 35, 58, 1203);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "small svelte-1f8pws6");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 31, 4, 796);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, code);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t4);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: function intro(local) {
			if (current) return;

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
				if (!p_transition) p_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(p, _util__WEBPACK_IMPORTED_MODULE_3__.fold, {}, true);
				p_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			if (!p_transition) p_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(p, _util__WEBPACK_IMPORTED_MODULE_3__.fold, {}, false);
			p_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
			if (detaching && p_transition) p_transition.end();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(31:2) {#if showPrivacy}",
		ctx
	});

	return block;
}

// (40:2) {#if !Stages.is($store.stage, Stages.Stage.SETTINGS)}
function create_if_block(ctx) {
	let label;
	let input;
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" Use TinyMCE chapter editor");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "type", "checkbox");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "aria-label", "use TinyMCE editor");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "class", "svelte-1f8pws6");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(input, file, 41, 6, 1382);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(label, "class", "small svelte-1f8pws6");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(label, file, 40, 4, 1354);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, label, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, input);
			input.checked = /*$config*/ ctx[2].useTiny;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input, "change", /*input_change_handler*/ ctx[4]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$config*/ 4) {
				input.checked = /*$config*/ ctx[2].useTiny;
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(label);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(40:2) {#if !Stages.is($store.stage, Stages.Stage.SETTINGS)}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let footer;
	let p;
	let t0;
	let a0;
	let t2;
	let a1;
	let t4;
	let t5;
	let t6;
	let a2;
	let t8;
	let t9;
	let t10;
	let show_if = !_stages__WEBPACK_IMPORTED_MODULE_2__.is(/*$store*/ ctx[1].stage, _stages__WEBPACK_IMPORTED_MODULE_2__.Stage.SETTINGS);
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*showPrivacy*/ ctx[0] && create_if_block_1(ctx);
	let if_block1 = show_if && create_if_block(ctx);

	const block = {
		c: function create() {
			footer = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("footer");
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Made by ");
			a0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a0.textContent = "@cpiber";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(".\n    Source Code & bug tracker: ");
			a1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a1.textContent = "cpiber/hfy-epub";
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(".\n    \n    Version ");
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("0.2.8");
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(".\n    ");
			a2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a2.textContent = "Privacy";
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(".");
			t9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block0) if_block0.c();
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block1) if_block1.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "href", "https://github.com/cpiber");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "target", "_blank");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a0, file, 23, 12, 415);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "href", "https://github.com/cpiber/hfy-epub");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "target", "_blank");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a1, file, 24, 35, 515);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a2, "href", "#privacy");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a2, file, 27, 4, 671);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "small svelte-1f8pws6");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 22, 2, 385);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(footer, "class", "svelte-1f8pws6");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(footer, file, 21, 0, 374);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, footer, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(footer, p);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, a0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, a1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, a2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(footer, t9);
			if (if_block0) if_block0.m(footer, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(footer, t10);
			if (if_block1) if_block1.m(footer, null);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(a2, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*click_handler*/ ctx[3]), false, true, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*showPrivacy*/ ctx[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*showPrivacy*/ 1) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0, 1);
					if_block0.m(footer, t10);
				}
			} else if (if_block0) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}

			if (dirty & /*$store*/ 2) show_if = !_stages__WEBPACK_IMPORTED_MODULE_2__.is(/*$store*/ ctx[1].stage, _stages__WEBPACK_IMPORTED_MODULE_2__.Stage.SETTINGS);

			if (show_if) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					if_block1.m(footer, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(footer);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let $store;
	let $config;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_stages__WEBPACK_IMPORTED_MODULE_2__.store, 'store');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _stages__WEBPACK_IMPORTED_MODULE_2__.store, $$value => $$invalidate(1, $store = $$value));
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_configstore__WEBPACK_IMPORTED_MODULE_1__.config, 'config');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _configstore__WEBPACK_IMPORTED_MODULE_1__.config, $$value => $$invalidate(2, $config = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Footer', slots, []);
	let showPrivacy = false;
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
	});

	const click_handler = () => $$invalidate(0, showPrivacy = !showPrivacy);

	function input_change_handler() {
		$config.useTiny = this.checked;
		_configstore__WEBPACK_IMPORTED_MODULE_1__.config.set($config);
	}

	$$self.$capture_state = () => ({
		config: _configstore__WEBPACK_IMPORTED_MODULE_1__.config,
		Stages: _stages__WEBPACK_IMPORTED_MODULE_2__,
		store: _stages__WEBPACK_IMPORTED_MODULE_2__.store,
		fold: _util__WEBPACK_IMPORTED_MODULE_3__.fold,
		redditApiBase: _util__WEBPACK_IMPORTED_MODULE_3__.redditApiBase,
		showPrivacy,
		$store,
		$config
	});

	$$self.$inject_state = $$props => {
		if ('showPrivacy' in $$props) $$invalidate(0, showPrivacy = $$props.showPrivacy);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [showPrivacy, $store, $config, click_handler, input_change_handler];
}

class Footer extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Footer",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);



/***/ }),

/***/ "./src/Header.svelte":
/*!***************************!*\
  !*** ./src/Header.svelte ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _Components_Alert_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/Alert.svelte */ "./src/Components/Alert.svelte");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Header.svelte generated by Svelte v3.49.0 */



const file = "src/Header.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-ntsh7z", "header.svelte-ntsh7z.svelte-ntsh7z{margin-bottom:2.5rem}header.svelte-ntsh7z>.svelte-ntsh7z:first-child{margin-top:0}.small.svelte-ntsh7z.svelte-ntsh7z{font-size:0.45em;vertical-align:text-top}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiaU1BaUJBIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkhlYWRlci5zdmVsdGUiXX0= */");
}

// (21:2) <Alert>
function create_default_slot(ctx) {
	let t0;
	let a;
	let t2;

	const block = {
		c: function create() {
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Due to ");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a.textContent = "recent API changes on reddit";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(", creating ebooks has become limited. If you run into a \"Too many requests\" error, please wait 10 minutes before trying again.");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "https://www.redditinc.com/blog/apifacts");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "target", "_blank");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "svelte-ntsh7z");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 20, 16, 445);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t2, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t2);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(21:2) <Alert>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let header;
	let h1;
	let t0;
	let a;
	let t2;
	let alert;
	let current;

	alert = new _Components_Alert_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			header = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("header");
			h1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("r/HFY epub generator ");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a.textContent = "Help";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(alert.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "small svelte-ntsh7z");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "https://github.com/cpiber/hfy-epub/tree/master/docs/index.md");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "target", "_blank");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 19, 27, 314);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(h1, "class", "svelte-ntsh7z");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h1, file, 19, 2, 289);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(header, "class", "svelte-ntsh7z");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(header, file, 18, 0, 278);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, header, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(header, h1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(h1, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(h1, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(header, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(alert, header, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const alert_changes = {};

			if (dirty & /*$$scope*/ 1) {
				alert_changes.$$scope = { dirty, ctx };
			}

			alert.$set(alert_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(alert.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(alert.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(header);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(alert);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Header', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ Alert: _Components_Alert_svelte__WEBPACK_IMPORTED_MODULE_1__["default"] });
	return [];
}

class Header extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Header",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);



/***/ }),

/***/ "./src/Stages/00_Input.svelte":
/*!************************************!*\
  !*** ./src/Stages/00_Input.svelte ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/transition */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/transition/index.mjs");
/* harmony import */ var _sources_hfy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sources/hfy */ "./src/sources/hfy.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Stages/00_Input.svelte generated by Svelte v3.49.0 */





const file = "src/Stages/00_Input.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-f6azd4", ".form.svelte-f6azd4 p.svelte-f6azd4{display:flex;grid-gap:6px;gap:6px}.search.svelte-f6azd4.svelte-f6azd4{width:100%;box-sizing:border-box}.submit.svelte-f6azd4.svelte-f6azd4{min-width:60px;flex-shrink:0}.error.svelte-f6azd4.svelte-f6azd4{color:#e32636}.spaceabove.svelte-f6azd4.svelte-f6azd4{margin-top:2em}form.svelte-f6azd4.svelte-f6azd4{position:relative}.search-results.svelte-f6azd4.svelte-f6azd4{position:absolute;left:0;right:0;background-color:white;border:1px solid black;border-radius:3px;padding:4px 8px;margin-top:-0.5em;z-index:1;max-height:15em;overflow:auto}.search-results.svelte-f6azd4 .result.svelte-f6azd4{display:block;text-decoration:none;color:inherit;border-bottom:1px dotted transparent\n    }.search-results.svelte-f6azd4 .result.svelte-f6azd4:hover,.search-results.svelte-f6azd4 .result.svelte-f6azd4:active,.search-results.svelte-f6azd4 .result.svelte-f6azd4:focus{border-bottom-color:gray}.overlay.svelte-f6azd4.svelte-f6azd4{content:'';position:absolute;background-color:white;opacity:0.6;left:0;right:0;top:0;bottom:0}.overlay-wrapper.svelte-f6azd4.svelte-f6azd4{position:relative}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMDBfSW5wdXQuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQTRCcUIsbUJBQUEsQ0FBQSxDQUFBLGNBQUEsQ0FBQTsrWUFpRXJCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIjAwX0lucHV0LnN2ZWx0ZSJdfQ== */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (102:2) {#if open}
function create_if_block_2(ctx) {
	let await_block_anchor;
	let promise;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 12
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise = /*searchSeries*/ ctx[6](/*series*/ ctx[4], /*search*/ ctx[0]), info);

	const block = {
		c: function create() {
			await_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			info.block.c();
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*series, search*/ 17 && promise !== (promise = /*searchSeries*/ ctx[6](/*series*/ ctx[4], /*search*/ ctx[0])) && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise, info)) {
				
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_await_block_branch)(info, ctx, dirty);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(102:2) {#if open}",
		ctx
	});

	return block;
}

// (1:0) <script lang="ts">export let stage; export let search = undefined; import { fade }
function create_catch_block(ctx) {
	const block = { c: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, m: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, d: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop };

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(1:0) <script lang=\\\"ts\\\">export let stage; export let search = undefined; import { fade }",
		ctx
	});

	return block;
}

// (103:50)        <div class="search-results">         {#each all as series}
function create_then_block(ctx) {
	let div;
	let each_value = /*all*/ ctx[12];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "search-results svelte-f6azd4");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 103, 6, 2319);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*apiToRegular, searchSeries, series, search, stage*/ 83) {
				each_value = /*all*/ ctx[12];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(103:50)        <div class=\\\"search-results\\\">         {#each all as series}",
		ctx
	});

	return block;
}

// (105:8) {#each all as series}
function create_each_block(ctx) {
	let a;
	let t_value = /*series*/ ctx[4].title + "";
	let t;
	let a_href_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[9](/*series*/ ctx[4]);
	}

	const block = {
		c: function create() {
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "result svelte-f6azd4");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value = (0,_util__WEBPACK_IMPORTED_MODULE_3__.apiToRegular)(/*series*/ ctx[4].url));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 105, 10, 2388);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(click_handler), false, true, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*series, search*/ 17 && t_value !== (t_value = /*series*/ ctx[4].title + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);

			if (dirty & /*series, search*/ 17 && a_href_value !== (a_href_value = (0,_util__WEBPACK_IMPORTED_MODULE_3__.apiToRegular)(/*series*/ ctx[4].url))) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(105:8) {#each all as series}",
		ctx
	});

	return block;
}

// (1:0) <script lang="ts">export let stage; export let search = undefined; import { fade }
function create_pending_block(ctx) {
	const block = { c: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, m: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop, d: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop };

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(1:0) <script lang=\\\"ts\\\">export let stage; export let search = undefined; import { fade }",
		ctx
	});

	return block;
}

// (112:0) {#if search !== undefined && !search.trim().length}
function create_if_block_1(ctx) {
	let p;

	const block = {
		c: function create() {
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			p.textContent = "Please enter a search string";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "small error svelte-f6azd4");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 112, 2, 2628);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(112:0) {#if search !== undefined && !search.trim().length}",
		ctx
	});

	return block;
}

// (118:2) {#if open}
function create_if_block(ctx) {
	let div;
	let div_transition;
	let current;

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "overlay svelte-f6azd4");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 117, 12, 2734);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
				if (!div_transition) div_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div, svelte_transition__WEBPACK_IMPORTED_MODULE_1__.fade, { duration: 100 }, true);
				div_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			if (!div_transition) div_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div, svelte_transition__WEBPACK_IMPORTED_MODULE_1__.fade, { duration: 100 }, false);
			div_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			if (detaching && div_transition) div_transition.end();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(118:2) {#if open}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let form;
	let p0;
	let t0;
	let input0;
	let t1;
	let input1;
	let input1_disabled_value;
	let t2;
	let t3;
	let show_if = /*search*/ ctx[0] !== undefined && !/*search*/ ctx[0].trim().length;
	let t4;
	let div;
	let t5;
	let p1;
	let t7;
	let ul;
	let li0;
	let t8;
	let a0;
	let t10;
	let li1;
	let t11;
	let a1;
	let t13;
	let t14;
	let li2;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*open*/ ctx[2] && create_if_block_2(ctx);
	let if_block1 = show_if && create_if_block_1(ctx);
	let if_block2 = /*open*/ ctx[2] && create_if_block(ctx);

	const block = {
		c: function create() {
			form = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("form");
			p0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Search:\n    ");
			input0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			input1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block0) if_block0.c();
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block1) if_block1.c();
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			if (if_block2) if_block2.c();
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			p1.textContent = "You can:";
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			ul = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("ul");
			li0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Search for a series title on the ");
			a0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a0.textContent = "r/HFY wiki";
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			li1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			t11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Enter a series link to the ");
			a1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a1.textContent = "r/HFY";
			t13 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" wiki");
			t14 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			li2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			li2.textContent = "Enter a link to any reddit post";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input0, "class", "search svelte-f6azd4");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input0, "placeholder", "Search or URL...");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(input0, file, 94, 4, 1973);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input1, "type", "submit");
			input1.value = "Go";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input1, "class", "submit svelte-f6azd4");
			input1.disabled = input1_disabled_value = /*search*/ ctx[0] === undefined || !/*search*/ ctx[0].trim().length;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(input1, file, 98, 4, 2134);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p0, "class", "svelte-f6azd4");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p0, file, 92, 2, 1953);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(form, "class", "form svelte-f6azd4");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(form, file, 91, 0, 1849);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p1, "class", "spaceabove svelte-f6azd4");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p1, file, 118, 2, 2805);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "href", "https://reddit.com/r/HFY/wiki/series");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "target", "_blank");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a0, file, 120, 41, 2888);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(li0, file, 120, 4, 2851);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "href", "https://reddit.com/r/HFY");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "target", "_blank");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a1, file, 121, 35, 3006);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(li1, file, 121, 4, 2975);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(li2, file, 122, 4, 3081);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(ul, file, 119, 2, 2842);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "overlay-wrapper svelte-f6azd4");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 116, 0, 2692);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, form, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(form, p0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p0, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p0, input0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input0, /*search*/ ctx[0]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p0, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p0, input1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(form, t2);
			if (if_block0) if_block0.m(form, null);
			/*form_binding*/ ctx[11](form);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t3, anchor);
			if (if_block1) if_block1.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t4, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			if (if_block2) if_block2.m(div, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, p1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, ul);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul, li0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(li0, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(li0, a0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul, t10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul, li1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(li1, t11);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(li1, a1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(li1, t13);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul, t14);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(ul, li2);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input0, "input", /*input0_input_handler*/ ctx[8]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input0, "keyup", /*update*/ ctx[7], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input0, "blur", /*onBlur*/ ctx[5], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input0, "click", /*update*/ ctx[7], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(form, "submit", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*submit_handler*/ ctx[10]), false, true, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*search*/ 1 && input0.value !== /*search*/ ctx[0]) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input0, /*search*/ ctx[0]);
			}

			if (!current || dirty & /*search*/ 1 && input1_disabled_value !== (input1_disabled_value = /*search*/ ctx[0] === undefined || !/*search*/ ctx[0].trim().length)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prop_dev)(input1, "disabled", input1_disabled_value);
			}

			if (/*open*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(form, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty & /*search*/ 1) show_if = /*search*/ ctx[0] !== undefined && !/*search*/ ctx[0].trim().length;

			if (show_if) {
				if (if_block1) {
					
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					if_block1.m(t4.parentNode, t4);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*open*/ ctx[2]) {
				if (if_block2) {
					if (dirty & /*open*/ 4) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					if_block2.m(div, t5);
				}
			} else if (if_block2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(form);
			if (if_block0) if_block0.d();
			/*form_binding*/ ctx[11](null);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t3);
			if (if_block1) if_block1.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t4);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			if (if_block2) if_block2.d();
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('_00_Input', slots, []);
	let { stage } = $$props;
	let { search = undefined } = $$props;
	let series;
	let open = false;
	let formRef;
	const onBlur = e => $$invalidate(2, open = !!formRef && formRef.contains(e.relatedTarget));

	const searchSeries = async (series, search) => {
		if (!series) return [];
		const all = await series;
		const searchSmall = search.toLowerCase();
		const filtered = all.filter(s => s.title.toLowerCase().indexOf(searchSmall) !== -1);
		if (!filtered.length) $$invalidate(2, open = false);
		return filtered;
	};

	const update = () => {
		$$invalidate(4, series = series || (0,_sources_hfy__WEBPACK_IMPORTED_MODULE_2__.getAllSeries)().finally(update));
		$$invalidate(2, open = !!series && !!search);
	};

	const writable_props = ['stage', 'search'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_00_Input> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		search = this.value;
		$$invalidate(0, search);
	}

	const click_handler = series => stage.next(series.url);
	const submit_handler = () => stage.next(search || '');

	function form_binding($$value) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			formRef = $$value;
			$$invalidate(3, formRef);
		});
	}

	$$self.$$set = $$props => {
		if ('stage' in $$props) $$invalidate(1, stage = $$props.stage);
		if ('search' in $$props) $$invalidate(0, search = $$props.search);
	};

	$$self.$capture_state = () => ({
		stage,
		search,
		fade: svelte_transition__WEBPACK_IMPORTED_MODULE_1__.fade,
		getAllSeries: _sources_hfy__WEBPACK_IMPORTED_MODULE_2__.getAllSeries,
		apiToRegular: _util__WEBPACK_IMPORTED_MODULE_3__.apiToRegular,
		series,
		open,
		formRef,
		onBlur,
		searchSeries,
		update
	});

	$$self.$inject_state = $$props => {
		if ('stage' in $$props) $$invalidate(1, stage = $$props.stage);
		if ('search' in $$props) $$invalidate(0, search = $$props.search);
		if ('series' in $$props) $$invalidate(4, series = $$props.series);
		if ('open' in $$props) $$invalidate(2, open = $$props.open);
		if ('formRef' in $$props) $$invalidate(3, formRef = $$props.formRef);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		search,
		stage,
		open,
		formRef,
		series,
		onBlur,
		searchSeries,
		update,
		input0_input_handler,
		click_handler,
		submit_handler,
		form_binding
	];
}

class _00_Input extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { stage: 1, search: 0 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "_00_Input",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stage*/ ctx[1] === undefined && !('stage' in props)) {
			console.warn("<_00_Input> was created without expected prop 'stage'");
		}
	}

	get stage() {
		throw new Error("<_00_Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stage(value) {
		throw new Error("<_00_Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get search() {
		throw new Error("<_00_Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set search(value) {
		throw new Error("<_00_Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_00_Input);



/***/ }),

/***/ "./src/Stages/01_Search.svelte":
/*!*************************************!*\
  !*** ./src/Stages/01_Search.svelte ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components/ErrorMessage.svelte */ "./src/Components/ErrorMessage.svelte");
/* harmony import */ var _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/Loading.svelte */ "./src/Components/Loading.svelte");
/* harmony import */ var _sources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sources */ "./src/sources/index.ts");
/* harmony import */ var _sources_hfy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sources/hfy */ "./src/sources/hfy.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Stages/01_Search.svelte generated by Svelte v3.49.0 */


const { Error: Error_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;





const file = "src/Stages/01_Search.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

// (32:0) {:catch error}
function create_catch_block(ctx) {
	let errormessage;
	let current;

	errormessage = new _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: {
				error: /*error*/ ctx[10],
				retry: /*func*/ ctx[5]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(errormessage.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(errormessage, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const errormessage_changes = {};
			if (dirty & /*fetchPromise*/ 4) errormessage_changes.error = /*error*/ ctx[10];
			if (dirty & /*fetchPromise*/ 4) errormessage_changes.retry = /*func*/ ctx[5];
			errormessage.$set(errormessage_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(errormessage.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(errormessage.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(errormessage, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(32:0) {:catch error}",
		ctx
	});

	return block;
}

// (19:0) {:then searchResults}
function create_then_block(ctx) {
	let p0;
	let t0;
	let t1;
	let t2;
	let t3;
	let ul;
	let t4;
	let p1;
	let each_value = /*searchResults*/ ctx[6];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			p0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("The search for '");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*search*/ ctx[1]);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("' returned these results:");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			ul = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			p1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			p1.textContent = "Please select one.";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p0, file, 19, 2, 619);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(ul, file, 20, 2, 678);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p1, "class", "small");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p1, file, 30, 2, 996);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p0, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p0, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p0, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t3, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t4, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*search*/ 2) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, /*search*/ ctx[1]);

			if (dirty & /*fetchPromise, apiToRegular, stage, Source*/ 5) {
				each_value = /*searchResults*/ ctx[6];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t3);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(ul);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t4);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p1);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(19:0) {:then searchResults}",
		ctx
	});

	return block;
}

// (25:8) {#if result.author}
function create_if_block(ctx) {
	let t0;
	let i;
	let t1_value = /*result*/ ctx[7].author + "";
	let t1;
	let t2;

	const block = {
		c: function create() {
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("[");
			i = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("i");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("]");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(i, file, 25, 11, 924);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, i, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(i, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t2, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*fetchPromise*/ 4 && t1_value !== (t1_value = /*result*/ ctx[7].author + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(i);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t2);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(25:8) {#if result.author}",
		ctx
	});

	return block;
}

// (22:4) {#each searchResults as result}
function create_each_block(ctx) {
	let li;
	let a;
	let t0_value = /*result*/ ctx[7].title + "";
	let t0;
	let a_href_value;
	let t1;
	let t2;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[4](/*result*/ ctx[7]);
	}

	let if_block = /*result*/ ctx[7].author && create_if_block(ctx);

	const block = {
		c: function create() {
			li = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("li");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value = (0,_util__WEBPACK_IMPORTED_MODULE_5__.apiToRegular)(/*result*/ ctx[7].url));
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 23, 8, 738);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(li, file, 22, 6, 725);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, li, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(li, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(li, t1);
			if (if_block) if_block.m(li, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(li, t2);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(click_handler), false, true, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*fetchPromise*/ 4 && t0_value !== (t0_value = /*result*/ ctx[7].title + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t0, t0_value);

			if (dirty & /*fetchPromise*/ 4 && a_href_value !== (a_href_value = (0,_util__WEBPACK_IMPORTED_MODULE_5__.apiToRegular)(/*result*/ ctx[7].url))) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value);
			}

			if (/*result*/ ctx[7].author) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(li, t2);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(li);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(22:4) {#each searchResults as result}",
		ctx
	});

	return block;
}

// (17:21)    <Loading>Please wait, fetching results...</Loading> {:then searchResults}
function create_pending_block(ctx) {
	let loading;
	let current;

	loading = new _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(loading.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(loading, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const loading_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				loading_changes.$$scope = { dirty, ctx };
			}

			loading.$set(loading_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(loading.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(loading.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(loading, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(17:21)    <Loading>Please wait, fetching results...</Loading> {:then searchResults}",
		ctx
	});

	return block;
}

// (18:2) <Loading>
function create_default_slot(ctx) {
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Please wait, fetching results...");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(18:2) <Loading>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let await_block_anchor;
	let promise;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: true,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 6,
		error: 10,
		blocks: [,,,]
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise = /*fetchPromise*/ ctx[2], info);

	const block = {
		c: function create() {
			await_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			info.block.c();
		},
		l: function claim(nodes) {
			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*fetchPromise*/ 4 && promise !== (promise = /*fetchPromise*/ ctx[2]) && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise, info)) {
				
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_await_block_branch)(info, ctx, dirty);
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(info.block);
			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(block);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('_01_Search', slots, []);
	let { stage } = $$props;
	let { search } = $$props;

	const fetchSearch = () => (0,_sources_hfy__WEBPACK_IMPORTED_MODULE_4__.getAllSeries)(search).then(results => {
		if (!results.length) throw new Error(`No series matched input \`${search}\``);
		return results;
	});

	let fetchPromise = fetchSearch();
	const writable_props = ['stage', 'search'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_01_Search> was created with unknown prop '${key}'`);
	});

	const click_handler = result => stage.next({ url: result.url, type: _sources__WEBPACK_IMPORTED_MODULE_3__.Source.HFY_SERIES });
	const func = () => $$invalidate(2, fetchPromise = fetchSearch());

	$$self.$$set = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
		if ('search' in $$props) $$invalidate(1, search = $$props.search);
	};

	$$self.$capture_state = () => ({
		stage,
		search,
		ErrorMessage: _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_1__["default"],
		Loading: _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		Source: _sources__WEBPACK_IMPORTED_MODULE_3__.Source,
		getAllSeries: _sources_hfy__WEBPACK_IMPORTED_MODULE_4__.getAllSeries,
		apiToRegular: _util__WEBPACK_IMPORTED_MODULE_5__.apiToRegular,
		fetchSearch,
		fetchPromise
	});

	$$self.$inject_state = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
		if ('search' in $$props) $$invalidate(1, search = $$props.search);
		if ('fetchPromise' in $$props) $$invalidate(2, fetchPromise = $$props.fetchPromise);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [stage, search, fetchPromise, fetchSearch, click_handler, func];
}

class _01_Search extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { stage: 0, search: 1 });

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "_01_Search",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stage*/ ctx[0] === undefined && !('stage' in props)) {
			console.warn("<_01_Search> was created without expected prop 'stage'");
		}

		if (/*search*/ ctx[1] === undefined && !('search' in props)) {
			console.warn("<_01_Search> was created without expected prop 'search'");
		}
	}

	get stage() {
		throw new Error_1("<_01_Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stage(value) {
		throw new Error_1("<_01_Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get search() {
		throw new Error_1("<_01_Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set search(value) {
		throw new Error_1("<_01_Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_01_Search);



/***/ }),

/***/ "./src/Stages/10_BookData.svelte":
/*!***************************************!*\
  !*** ./src/Stages/10_BookData.svelte ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _Components_BackToSearch_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components/BackToSearch.svelte */ "./src/Components/BackToSearch.svelte");
/* harmony import */ var _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/ErrorMessage.svelte */ "./src/Components/ErrorMessage.svelte");
/* harmony import */ var _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Components/Loading.svelte */ "./src/Components/Loading.svelte");
/* harmony import */ var _Components_SeriesCard_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Components/SeriesCard.svelte */ "./src/Components/SeriesCard.svelte");
/* harmony import */ var _configstore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../configstore */ "./src/configstore.ts");
/* harmony import */ var _sources__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sources */ "./src/sources/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Stages/10_BookData.svelte generated by Svelte v3.49.0 */


const { Object: Object_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;







const file = "src/Stages/10_BookData.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1hsynpq", ".list.svelte-1hsynpq{margin:1em 0}.spacer.svelte-1hsynpq{display:inline-block;width:1.5em}.no-margin.svelte-1hsynpq{margin:0}.chapter-list.svelte-1hsynpq{margin-top:.5em;display:grid;grid-template-columns:1fr 1fr 1fr;grid-gap:2px 10px;gap:2px 10px\n  }@media screen and (max-width: 950px){.chapter-list.svelte-1hsynpq{grid-template-columns:1fr 1fr\n  }}@media screen and (max-width: 600px){.chapter-list.svelte-1hsynpq{grid-template-columns:1fr\n  }}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTBfQm9va0RhdGEuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQXNCcUIsS0FBQSxlQUFBLENBQUE7OztJQThCckIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiMTBfQm9va0RhdGEuc3ZlbHRlIl19 */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[15] = list[i];
	return child_ctx;
}

// (88:0) {:catch error}
function create_catch_block(ctx) {
	let errormessage;
	let t;
	let backtosearch;
	let current;

	errormessage = new _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				error: /*error*/ ctx[18],
				retry: /*func_1*/ ctx[12]
			},
			$$inline: true
		});

	backtosearch = new _Components_BackToSearch_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: { backToSearch: /*backToSearch*/ ctx[2] },
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(errormessage.$$.fragment);
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(backtosearch.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(errormessage, target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(backtosearch, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const errormessage_changes = {};
			if (dirty & /*fetchPromise*/ 16) errormessage_changes.error = /*error*/ ctx[18];
			if (dirty & /*fetchPromise*/ 16) errormessage_changes.retry = /*func_1*/ ctx[12];
			errormessage.$set(errormessage_changes);
			const backtosearch_changes = {};
			if (dirty & /*backToSearch*/ 4) backtosearch_changes.backToSearch = /*backToSearch*/ ctx[2];
			backtosearch.$set(backtosearch_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(errormessage.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(backtosearch.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(errormessage.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(backtosearch.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(errormessage, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(backtosearch, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(88:0) {:catch error}",
		ctx
	});

	return block;
}

// (56:0) {:then data}
function create_then_block(ctx) {
	let t0;
	let div;
	let seriescard;
	let t1;
	let show_if;
	let t2;
	let button;
	let t4;
	let backtosearch;
	let current;
	let mounted;
	let dispose;

	seriescard = new _Components_SeriesCard_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				title: /*data*/ ctx[14].title,
				author: /*data*/ ctx[14].author,
				url: /*series*/ ctx[1].url,
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	function select_block_type_1(ctx, dirty) {
		if (dirty & /*fetchPromise*/ 16) show_if = null;
		if (show_if == null) show_if = !!/*data*/ ctx[14].chapters.find(func);
		if (show_if) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block = current_block_type(ctx);

	function click_handler_5() {
		return /*click_handler_5*/ ctx[11](/*data*/ ctx[14]);
	}

	backtosearch = new _Components_BackToSearch_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: { backToSearch: /*backToSearch*/ ctx[2] },
			$$inline: true
		});

	const block = {
		c: function create() {
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Got the following series:\n\n  ");
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(seriescard.$$.fragment);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if_block.c();
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "Edit book";
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(backtosearch.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "list svelte-1hsynpq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 58, 2, 1411);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 84, 2, 2589);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(seriescard, div, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t4, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(backtosearch, target, anchor);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button, "click", click_handler_5, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const seriescard_changes = {};
			if (dirty & /*fetchPromise*/ 16) seriescard_changes.title = /*data*/ ctx[14].title;
			if (dirty & /*fetchPromise*/ 16) seriescard_changes.author = /*data*/ ctx[14].author;
			if (dirty & /*series*/ 2) seriescard_changes.url = /*series*/ ctx[1].url;

			if (dirty & /*$$scope, fetchPromise, showChapters, stage*/ 524313) {
				seriescard_changes.$$scope = { dirty, ctx };
			}

			seriescard.$set(seriescard_changes);

			if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(t2.parentNode, t2);
				}
			}

			const backtosearch_changes = {};
			if (dirty & /*backToSearch*/ 4) backtosearch_changes.backToSearch = /*backToSearch*/ ctx[2];
			backtosearch.$set(backtosearch_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(seriescard.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(backtosearch.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(seriescard.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(backtosearch.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(seriescard);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t2);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(backtosearch, detaching);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(56:0) {:then data}",
		ctx
	});

	return block;
}

// (62:124) {:else}
function create_else_block_1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("hide");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(62:124) {:else}",
		ctx
	});

	return block;
}

// (62:101) {#if !showChapters}
function create_if_block_3(ctx) {
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("show");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(62:101) {#if !showChapters}",
		ctx
	});

	return block;
}

// (65:8) {#if typeof stage.newChapters === "number"}
function create_if_block_2(ctx) {
	let span;
	let t0;
	let t1_value = /*stage*/ ctx[0].newChapters + "";
	let t1;
	let t2;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Found ");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" new");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 65, 10, 1874);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t2);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(span, "click", /*click_handler_2*/ ctx[8], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*stage*/ 1 && t1_value !== (t1_value = /*stage*/ ctx[0].newChapters + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(65:8) {#if typeof stage.newChapters === \\\"number\\\"}",
		ctx
	});

	return block;
}

// (70:6) {#if showChapters}
function create_if_block_1(ctx) {
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let div_transition;
	let current;
	let each_value = /*data*/ ctx[14].chapters;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	const get_key = ctx => /*chapter*/ ctx[15].id;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_keys)(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "chapter-list svelte-1hsynpq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 70, 8, 2025);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*fetchPromise, decode*/ 16) {
				each_value = /*data*/ ctx[14].chapters;
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_keys)(ctx, each_value, get_each_context, get_key);
				each_blocks = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_keyed_each)(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_block, create_each_block, null, get_each_context);
			}
		},
		i: function intro(local) {
			if (current) return;

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
				if (!div_transition) div_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div, _util__WEBPACK_IMPORTED_MODULE_7__.fold, {}, true);
				div_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			if (!div_transition) div_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div, _util__WEBPACK_IMPORTED_MODULE_7__.fold, {}, false);
			div_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (detaching && div_transition) div_transition.end();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(70:6) {#if showChapters}",
		ctx
	});

	return block;
}

// (72:10) {#each data.chapters as chapter (chapter.id)}
function create_each_block(key_1, ctx) {
	let a;
	let t_value = (0,_util__WEBPACK_IMPORTED_MODULE_7__.decode)(/*chapter*/ ctx[15].title) + "";
	let t;
	let a_href_value;

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value = /*chapter*/ ctx[15].displayUrl);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "target", "_blank");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "small");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 72, 12, 2136);
			this.first = a;
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t);
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*fetchPromise*/ 16 && t_value !== (t_value = (0,_util__WEBPACK_IMPORTED_MODULE_7__.decode)(/*chapter*/ ctx[15].title) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);

			if (dirty & /*fetchPromise*/ 16 && a_href_value !== (a_href_value = /*chapter*/ ctx[15].displayUrl)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(72:10) {#each data.chapters as chapter (chapter.id)}",
		ctx
	});

	return block;
}

// (60:4) <SeriesCard title={data.title} author={data.author} url={series.url}>
function create_default_slot_1(ctx) {
	let p;
	let t0;
	let t1_value = /*data*/ ctx[14].chapters.length + "";
	let t1;
	let t2;
	let a;
	let t3;
	let span;
	let t4;
	let button;
	let t6;
	let t7;
	let if_block2_anchor;
	let current;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (!/*showChapters*/ ctx[3]) return create_if_block_3;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block0 = current_block_type(ctx);

	function click_handler_1() {
		return /*click_handler_1*/ ctx[7](/*data*/ ctx[14]);
	}

	let if_block1 = typeof /*stage*/ ctx[0].newChapters === "number" && create_if_block_2(ctx);
	let if_block2 = /*showChapters*/ ctx[3] && create_if_block_1(ctx);

	const block = {
		c: function create() {
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Found ");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			if_block0.c();
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "Find more";
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block1) if_block1.c();
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block2) if_block2.c();
			if_block2_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "#show");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "small");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 61, 8, 1568);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "spacer svelte-1hsynpq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 62, 8, 1713);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 63, 8, 1745);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "no-margin svelte-1hsynpq");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 60, 6, 1510);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, a);
			if_block0.m(a, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, button);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t6);
			if (if_block1) if_block1.m(p, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t7, anchor);
			if (if_block2) if_block2.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block2_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*click_handler*/ ctx[6]), false, true, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button, "click", click_handler_1, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*fetchPromise*/ 16) && t1_value !== (t1_value = /*data*/ ctx[14].chapters.length + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, t1_value);

			if (current_block_type !== (current_block_type = select_block_type(ctx, dirty))) {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(a, null);
				}
			}

			if (typeof /*stage*/ ctx[0].newChapters === "number") {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					if_block1.m(p, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*showChapters*/ ctx[3]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*showChapters*/ 8) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_1(ctx);
					if_block2.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2, 1);
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			} else if (if_block2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block2);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
			if_block0.d();
			if (if_block1) if_block1.d();
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t7);
			if (if_block2) if_block2.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block2_anchor);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(60:4) <SeriesCard title={data.title} author={data.author} url={series.url}>",
		ctx
	});

	return block;
}

// (82:2) {:else}
function create_else_block(ctx) {
	let button;
	let mounted;
	let dispose;

	function click_handler_4() {
		return /*click_handler_4*/ ctx[10](/*data*/ ctx[14]);
	}

	const block = {
		c: function create() {
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "Generate EPUB";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 82, 4, 2512);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button, anchor);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button, "click", click_handler_4, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(82:2) {:else}",
		ctx
	});

	return block;
}

// (80:2) {#if data.chapters.find(c => c.needsFetching !== false)}
function create_if_block(ctx) {
	let button;
	let mounted;
	let dispose;

	function click_handler_3() {
		return /*click_handler_3*/ ctx[9](/*data*/ ctx[14]);
	}

	const block = {
		c: function create() {
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "Fetch chapter contents";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 80, 4, 2415);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button, anchor);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button, "click", click_handler_3, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(80:2) {#if data.chapters.find(c => c.needsFetching !== false)}",
		ctx
	});

	return block;
}

// (54:21)    <Loading>Please wait, fetching data...</Loading> {:then data}
function create_pending_block(ctx) {
	let loading;
	let current;

	loading = new _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(loading.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(loading, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const loading_changes = {};

			if (dirty & /*$$scope*/ 524288) {
				loading_changes.$$scope = { dirty, ctx };
			}

			loading.$set(loading_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(loading.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(loading.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(loading, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(54:21)    <Loading>Please wait, fetching data...</Loading> {:then data}",
		ctx
	});

	return block;
}

// (55:2) <Loading>
function create_default_slot(ctx) {
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Please wait, fetching data...");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(55:2) <Loading>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let await_block_anchor;
	let promise;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: true,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 14,
		error: 18,
		blocks: [,,,]
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise = /*fetchPromise*/ ctx[4], info);

	const block = {
		c: function create() {
			await_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			info.block.c();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*fetchPromise*/ 16 && promise !== (promise = /*fetchPromise*/ ctx[4]) && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise, info)) {
				
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_await_block_branch)(info, ctx, dirty);
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(info.block);
			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(block);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const func = c => c.needsFetching !== false;

function instance($$self, $$props, $$invalidate) {
	let $config;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_configstore__WEBPACK_IMPORTED_MODULE_5__.config, 'config');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _configstore__WEBPACK_IMPORTED_MODULE_5__.config, $$value => $$invalidate(13, $config = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('_10_BookData', slots, []);
	let { stage } = $$props;
	let { series } = $$props;
	let { backToSearch } = $$props;
	let showChapters = false;

	const fetchData = () => stage.bookData
	? Promise.resolve((0,_util__WEBPACK_IMPORTED_MODULE_7__.copyData)(stage.bookData))
	: (0,_sources__WEBPACK_IMPORTED_MODULE_6__.fetchBookData)(series).then(data => $$invalidate(
			0,
			stage.bookData = Object.assign(Object.assign({}, data), {
				chapters: (0,_sources__WEBPACK_IMPORTED_MODULE_6__.transformChapters)($config, data.chapters)
			}),
			stage
		));

	let fetchPromise = fetchData();
	const writable_props = ['stage', 'series', 'backToSearch'];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_10_BookData> was created with unknown prop '${key}'`);
	});

	const click_handler = () => $$invalidate(3, showChapters = !showChapters);
	const click_handler_1 = data => stage.findMore(data);
	const click_handler_2 = () => $$invalidate(0, stage.newChapters = undefined, stage);
	const click_handler_3 = data => stage.downloadAll(data);
	const click_handler_4 = data => stage.next(data);
	const click_handler_5 = data => stage.edit(data);
	const func_1 = () => $$invalidate(4, fetchPromise = fetchData());

	$$self.$$set = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
		if ('series' in $$props) $$invalidate(1, series = $$props.series);
		if ('backToSearch' in $$props) $$invalidate(2, backToSearch = $$props.backToSearch);
	};

	$$self.$capture_state = () => ({
		stage,
		series,
		backToSearch,
		BackToSearch: _Components_BackToSearch_svelte__WEBPACK_IMPORTED_MODULE_1__["default"],
		ErrorMessage: _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		Loading: _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		SeriesCard: _Components_SeriesCard_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		config: _configstore__WEBPACK_IMPORTED_MODULE_5__.config,
		fetchBookData: _sources__WEBPACK_IMPORTED_MODULE_6__.fetchBookData,
		transformChapters: _sources__WEBPACK_IMPORTED_MODULE_6__.transformChapters,
		copyData: _util__WEBPACK_IMPORTED_MODULE_7__.copyData,
		decode: _util__WEBPACK_IMPORTED_MODULE_7__.decode,
		fold: _util__WEBPACK_IMPORTED_MODULE_7__.fold,
		showChapters,
		fetchData,
		fetchPromise,
		$config
	});

	$$self.$inject_state = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
		if ('series' in $$props) $$invalidate(1, series = $$props.series);
		if ('backToSearch' in $$props) $$invalidate(2, backToSearch = $$props.backToSearch);
		if ('showChapters' in $$props) $$invalidate(3, showChapters = $$props.showChapters);
		if ('fetchPromise' in $$props) $$invalidate(4, fetchPromise = $$props.fetchPromise);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		stage,
		series,
		backToSearch,
		showChapters,
		fetchPromise,
		fetchData,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3,
		click_handler_4,
		click_handler_5,
		func_1
	];
}

class _10_BookData extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { stage: 0, series: 1, backToSearch: 2 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "_10_BookData",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stage*/ ctx[0] === undefined && !('stage' in props)) {
			console.warn("<_10_BookData> was created without expected prop 'stage'");
		}

		if (/*series*/ ctx[1] === undefined && !('series' in props)) {
			console.warn("<_10_BookData> was created without expected prop 'series'");
		}

		if (/*backToSearch*/ ctx[2] === undefined && !('backToSearch' in props)) {
			console.warn("<_10_BookData> was created without expected prop 'backToSearch'");
		}
	}

	get stage() {
		throw new Error("<_10_BookData>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stage(value) {
		throw new Error("<_10_BookData>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get series() {
		throw new Error("<_10_BookData>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set series(value) {
		throw new Error("<_10_BookData>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get backToSearch() {
		throw new Error("<_10_BookData>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set backToSearch(value) {
		throw new Error("<_10_BookData>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_10_BookData);



/***/ }),

/***/ "./src/Stages/11_EditBook.svelte":
/*!***************************************!*\
  !*** ./src/Stages/11_EditBook.svelte ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte_dnd_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte-dnd-action */ "./node_modules/.pnpm/svelte-dnd-action@0.9.19/node_modules/svelte-dnd-action/src/index.js");
/* harmony import */ var svelte_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte/transition */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/transition/index.mjs");
/* harmony import */ var _Components_ChapterEdit_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Components/ChapterEdit.svelte */ "./src/Components/ChapterEdit.svelte");
/* harmony import */ var _Components_ChapterSelect_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Components/ChapterSelect.svelte */ "./src/Components/ChapterSelect.svelte");
/* harmony import */ var _Components_SeriesCard_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Components/SeriesCard.svelte */ "./src/Components/SeriesCard.svelte");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Stages/11_EditBook.svelte generated by Svelte v3.49.0 */








const file = "src/Stages/11_EditBook.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-17sum1b", ".list.svelte-17sum1b.svelte-17sum1b{margin:1em 0;position:relative}.list.svelte-17sum1b .hide.svelte-17sum1b{display:none}.list.svelte-17sum1b .float.svelte-17sum1b{position:absolute;top:0;left:0;right:0;background-color:white;z-index:1}.chapters.svelte-17sum1b.svelte-17sum1b{position:relative\n  }@media(any-pointer: coarse), (any-hover: none){.chapters.svelte-17sum1b.svelte-17sum1b::after{content:'touch scroll area';background-color:red;opacity:0;position:absolute;top:0;bottom:0;right:0;width:35px}}nav.svelte-17sum1b.svelte-17sum1b{margin:8px 6px 2px;text-align:center}nav.svelte-17sum1b a.svelte-17sum1b{margin:0 0.2em;text-decoration:none}nav.svelte-17sum1b a[disabled=\"true\"].svelte-17sum1b{opacity:0.6;pointer-events:none}nav.svelte-17sum1b .current.svelte-17sum1b{opacity:0.6;text-decoration:underline}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTFfRWRpdEJvb2suc3ZlbHRlIiwibWFwcGluZ3MiOiJBQXNGcUIsS0FBQSw4QkFBQSxDQUFBO3NnQkF1RHJCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIjExX0VkaXRCb29rLnN2ZWx0ZSJdfQ== */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[34] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[37] = list[i];
	child_ctx[39] = i;
	return child_ctx;
}

// (137:8) {#each chapterSlice as chapter, i (chapter.id)}
function create_each_block_1(key_1, ctx) {
	let first;
	let chapterselect;
	let current;

	function func() {
		return /*func*/ ctx[17](/*i*/ ctx[39]);
	}

	chapterselect = new _Components_ChapterSelect_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				title: /*chapter*/ ctx[37].title,
				content: /*chapter*/ ctx[37].content,
				select: func,
				moveUp: (/*page*/ ctx[2] > 0 || /*i*/ ctx[39] > 0) && /*moveUp*/ ctx[12].bind(null, /*absIdx*/ ctx[11](/*i*/ ctx[39])),
				moveDown: (/*page*/ ctx[2] < /*maxPage*/ ctx[3] || /*i*/ ctx[39] < /*chapterSlice*/ ctx[6].length - 1) && /*moveDown*/ ctx[13].bind(null, /*absIdx*/ ctx[11](/*i*/ ctx[39])),
				remove: /*remove*/ ctx[14].bind(null, /*absIdx*/ ctx[11](/*i*/ ctx[39]))
			},
			$$inline: true
		});

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			first = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(chapterselect.$$.fragment);
			this.first = first;
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, first, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(chapterselect, target, anchor);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const chapterselect_changes = {};
			if (dirty[0] & /*chapterSlice*/ 64) chapterselect_changes.title = /*chapter*/ ctx[37].title;
			if (dirty[0] & /*chapterSlice*/ 64) chapterselect_changes.content = /*chapter*/ ctx[37].content;
			if (dirty[0] & /*selectedChapterIndex, chapterSlice*/ 80) chapterselect_changes.select = func;
			if (dirty[0] & /*page, chapterSlice*/ 68) chapterselect_changes.moveUp = (/*page*/ ctx[2] > 0 || /*i*/ ctx[39] > 0) && /*moveUp*/ ctx[12].bind(null, /*absIdx*/ ctx[11](/*i*/ ctx[39]));
			if (dirty[0] & /*page, maxPage, chapterSlice*/ 76) chapterselect_changes.moveDown = (/*page*/ ctx[2] < /*maxPage*/ ctx[3] || /*i*/ ctx[39] < /*chapterSlice*/ ctx[6].length - 1) && /*moveDown*/ ctx[13].bind(null, /*absIdx*/ ctx[11](/*i*/ ctx[39]));
			if (dirty[0] & /*chapterSlice*/ 64) chapterselect_changes.remove = /*remove*/ ctx[14].bind(null, /*absIdx*/ ctx[11](/*i*/ ctx[39]));
			chapterselect.$set(chapterselect_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(chapterselect.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(chapterselect.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(first);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(chapterselect, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(137:8) {#each chapterSlice as chapter, i (chapter.id)}",
		ctx
	});

	return block;
}

// (151:8) {#if pageConf.pre !== null}
function create_if_block_2(ctx) {
	let a;
	let t0_value = /*pageConf*/ ctx[5].pre + "";
	let t0;
	let a_href_value;
	let t1;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("\n          .");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "small svelte-17sum1b");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value = `#page ${/*pageConf*/ ctx[5].pre}`);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "role", "navigation");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 151, 10, 4417);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
					a,
					"click",
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
						if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*handlePaging*/ ctx[15].bind(null, /*pageConf*/ ctx[5].pre - 1))) /*handlePaging*/ ctx[15].bind(null, /*pageConf*/ ctx[5].pre - 1).apply(this, arguments);
					}),
					false,
					true,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*pageConf*/ 32 && t0_value !== (t0_value = /*pageConf*/ ctx[5].pre + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t0, t0_value);

			if (dirty[0] & /*pageConf*/ 32 && a_href_value !== (a_href_value = `#page ${/*pageConf*/ ctx[5].pre}`)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(151:8) {#if pageConf.pre !== null}",
		ctx
	});

	return block;
}

// (155:8) {#each pageConf.pages as pg}
function create_each_block(ctx) {
	let a;
	let t_value = /*pg*/ ctx[34] + 1 + "";
	let t;
	let a_href_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "small svelte-17sum1b");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value = `#page ${/*pg*/ ctx[34] + 1}`);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "role", "navigation");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(a, "current", /*pg*/ ctx[34] == /*page*/ ctx[2]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 155, 10, 4647);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
					a,
					"click",
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
						if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*handlePaging*/ ctx[15].bind(null, /*pg*/ ctx[34]))) /*handlePaging*/ ctx[15].bind(null, /*pg*/ ctx[34]).apply(this, arguments);
					}),
					false,
					true,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*pageConf*/ 32 && t_value !== (t_value = /*pg*/ ctx[34] + 1 + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);

			if (dirty[0] & /*pageConf*/ 32 && a_href_value !== (a_href_value = `#page ${/*pg*/ ctx[34] + 1}`)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value);
			}

			if (dirty[0] & /*pageConf, page*/ 36) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(a, "current", /*pg*/ ctx[34] == /*page*/ ctx[2]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(155:8) {#each pageConf.pages as pg}",
		ctx
	});

	return block;
}

// (158:8) {#if pageConf.post !== null}
function create_if_block_1(ctx) {
	let t0;
	let a;
	let t1_value = /*pageConf*/ ctx[5].post + "";
	let t1;
	let a_href_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(".\n          ");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "small svelte-17sum1b");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value = `#page ${/*pageConf*/ ctx[5].post}`);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "role", "navigation");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 159, 10, 4880);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t1);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
					a,
					"click",
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
						if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*handlePaging*/ ctx[15].bind(null, /*pageConf*/ ctx[5].post - 1))) /*handlePaging*/ ctx[15].bind(null, /*pageConf*/ ctx[5].post - 1).apply(this, arguments);
					}),
					false,
					true,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*pageConf*/ 32 && t1_value !== (t1_value = /*pageConf*/ ctx[5].post + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, t1_value);

			if (dirty[0] & /*pageConf*/ 32 && a_href_value !== (a_href_value = `#page ${/*pageConf*/ ctx[5].post}`)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(158:8) {#if pageConf.post !== null}",
		ctx
	});

	return block;
}

// (135:4) <SeriesCard bind:title={data.title} bind:author={data.author} edit={true} onSubmit={() => stage.next(data)}>
function create_default_slot(ctx) {
	let div;
	let each_blocks_1 = [];
	let each0_lookup = new Map();
	let dndzone_action;
	let t0;
	let nav;
	let a0;
	let t1;
	let a0_disabled_value;
	let t2;
	let t3;
	let t4;
	let t5;
	let a1;
	let t6;
	let a1_disabled_value;
	let current;
	let mounted;
	let dispose;
	let each_value_1 = /*chapterSlice*/ ctx[6];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value_1);
	const get_key = ctx => /*chapter*/ ctx[37].id;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_keys)(ctx, each_value_1, get_each_context_1, get_key);

	for (let i = 0; i < each_value_1.length; i += 1) {
		let child_ctx = get_each_context_1(ctx, each_value_1, i);
		let key = get_key(child_ctx);
		each0_lookup.set(key, each_blocks_1[i] = create_each_block_1(key, child_ctx));
	}

	let if_block0 = /*pageConf*/ ctx[5].pre !== null && create_if_block_2(ctx);
	let each_value = /*pageConf*/ ctx[5].pages;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block1 = /*pageConf*/ ctx[5].post !== null && create_if_block_1(ctx);

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			nav = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("nav");
			a0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Previous");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("\n        ::\n        ");
			if (if_block0) if_block0.c();
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block1) if_block1.c();
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("\n        ::\n        ");
			a1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Next");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "chapters svelte-17sum1b");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 135, 6, 3547);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "class", "small svelte-17sum1b");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "href", "#prevous");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "role", "navigation");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "disabled", a0_disabled_value = /*page*/ ctx[2] <= 0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a0, file, 148, 8, 4213);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "class", "small svelte-17sum1b");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "href", "#next");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "role", "navigation");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "disabled", a1_disabled_value = /*page*/ ctx[2] >= /*maxPage*/ ctx[3]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a1, file, 162, 8, 5073);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(nav, "class", "svelte-17sum1b");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(nav, file, 147, 6, 4199);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div, null);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, nav, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(nav, a0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a0, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(nav, t2);
			if (if_block0) if_block0.m(nav, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(nav, t3);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(nav, null);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(nav, t4);
			if (if_block1) if_block1.m(nav, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(nav, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(nav, a1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a1, t6);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.action_destroyer)(dndzone_action = svelte_dnd_action__WEBPACK_IMPORTED_MODULE_1__.dndzone.call(null, div, {
						items: /*chapterSlice*/ ctx[6],
						flipDurationMs
					})),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(div, "consider", /*handleConsiderFinalize*/ ctx[16], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(div, "finalize", /*handleConsiderFinalize*/ ctx[16], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
						a0,
						"click",
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
							if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*handlePaging*/ ctx[15].bind(null, /*page*/ ctx[2] - 1))) /*handlePaging*/ ctx[15].bind(null, /*page*/ ctx[2] - 1).apply(this, arguments);
						}),
						false,
						true,
						false
					),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
						a1,
						"click",
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(function () {
							if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*handlePaging*/ ctx[15].bind(null, /*page*/ ctx[2] + 1))) /*handlePaging*/ ctx[15].bind(null, /*page*/ ctx[2] + 1).apply(this, arguments);
						}),
						false,
						true,
						false
					)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*chapterSlice, selectedChapterIndex, absIdx, page, moveUp, maxPage, moveDown, remove*/ 30812) {
				each_value_1 = /*chapterSlice*/ ctx[6];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value_1);
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_keys)(ctx, each_value_1, get_each_context_1, get_key);
				each_blocks_1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_keyed_each)(each_blocks_1, dirty, get_key, 1, ctx, each_value_1, each0_lookup, div, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.outro_and_destroy_block, create_each_block_1, null, get_each_context_1);
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}

			if (dndzone_action && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(dndzone_action.update) && dirty[0] & /*chapterSlice*/ 64) dndzone_action.update.call(null, {
				items: /*chapterSlice*/ ctx[6],
				flipDurationMs
			});

			if (!current || dirty[0] & /*page*/ 4 && a0_disabled_value !== (a0_disabled_value = /*page*/ ctx[2] <= 0)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "disabled", a0_disabled_value);
			}

			if (/*pageConf*/ ctx[5].pre !== null) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(nav, t3);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*pageConf, page, handlePaging*/ 32804) {
				each_value = /*pageConf*/ ctx[5].pages;
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(nav, t4);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*pageConf*/ ctx[5].post !== null) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					if_block1.m(nav, t5);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty[0] & /*page, maxPage*/ 12 && a1_disabled_value !== (a1_disabled_value = /*page*/ ctx[2] >= /*maxPage*/ ctx[3])) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "disabled", a1_disabled_value);
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(each_blocks_1[i]);
			}

			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < each_blocks_1.length; i += 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(each_blocks_1[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].d();
			}

			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(nav);
			if (if_block0) if_block0.d();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			if (if_block1) if_block1.d();
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(135:4) <SeriesCard bind:title={data.title} bind:author={data.author} edit={true} onSubmit={() => stage.next(data)}>",
		ctx
	});

	return block;
}

// (167:2) {#if selectedChapterIndex >= 0}
function create_if_block(ctx) {
	let div;
	let chapteredit;
	let updating_title;
	let updating_content;
	let updating_needsFetching;
	let updating_url;
	let div_transition;
	let current;
	let mounted;
	let dispose;

	function chapteredit_title_binding(value) {
		/*chapteredit_title_binding*/ ctx[22](value);
	}

	function chapteredit_content_binding(value) {
		/*chapteredit_content_binding*/ ctx[23](value);
	}

	function chapteredit_needsFetching_binding(value) {
		/*chapteredit_needsFetching_binding*/ ctx[24](value);
	}

	function chapteredit_url_binding(value) {
		/*chapteredit_url_binding*/ ctx[25](value);
	}

	let chapteredit_props = {
		canFetch: !!/*selectedChapter*/ ctx[7].apiUrl,
		close: /*func_2*/ ctx[21],
		moveUp: (/*page*/ ctx[2] > 0 || /*selectedChapterIndex*/ ctx[4] > 0) && /*moveUp*/ ctx[12].bind(null, /*selectedChapterIndex*/ ctx[4]),
		moveDown: (/*page*/ ctx[2] < /*maxPage*/ ctx[3] || /*selectedChapterIndex*/ ctx[4] < /*chapterSlice*/ ctx[6].length - 1) && /*moveDown*/ ctx[13].bind(null, /*selectedChapterIndex*/ ctx[4]),
		remove: /*remove*/ ctx[14].bind(null, /*selectedChapterIndex*/ ctx[4])
	};

	if (/*selectedChapter*/ ctx[7].title !== void 0) {
		chapteredit_props.title = /*selectedChapter*/ ctx[7].title;
	}

	if (/*selectedChapter*/ ctx[7].content !== void 0) {
		chapteredit_props.content = /*selectedChapter*/ ctx[7].content;
	}

	if (/*selectedChapter*/ ctx[7].needsFetching !== void 0) {
		chapteredit_props.needsFetching = /*selectedChapter*/ ctx[7].needsFetching;
	}

	if (/*selectedChapter*/ ctx[7].displayUrl !== void 0) {
		chapteredit_props.url = /*selectedChapter*/ ctx[7].displayUrl;
	}

	chapteredit = new _Components_ChapterEdit_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({ props: chapteredit_props, $$inline: true });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(chapteredit, 'title', chapteredit_title_binding));
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(chapteredit, 'content', chapteredit_content_binding));
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(chapteredit, 'needsFetching', chapteredit_needsFetching_binding));
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(chapteredit, 'url', chapteredit_url_binding));

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(chapteredit.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "svelte-17sum1b");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(div, "float", /*float*/ ctx[9]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 167, 4, 5297);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(chapteredit, div, null);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(div, "introend", /*introend_handler*/ ctx[26], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(div, "outrostart", /*outrostart_handler*/ ctx[27], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(div, "outroend", /*outroend_handler*/ ctx[28], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const chapteredit_changes = {};
			if (dirty[0] & /*selectedChapter*/ 128) chapteredit_changes.canFetch = !!/*selectedChapter*/ ctx[7].apiUrl;
			if (dirty[0] & /*selectedChapterIndex*/ 16) chapteredit_changes.close = /*func_2*/ ctx[21];
			if (dirty[0] & /*page, selectedChapterIndex*/ 20) chapteredit_changes.moveUp = (/*page*/ ctx[2] > 0 || /*selectedChapterIndex*/ ctx[4] > 0) && /*moveUp*/ ctx[12].bind(null, /*selectedChapterIndex*/ ctx[4]);
			if (dirty[0] & /*page, maxPage, selectedChapterIndex, chapterSlice*/ 92) chapteredit_changes.moveDown = (/*page*/ ctx[2] < /*maxPage*/ ctx[3] || /*selectedChapterIndex*/ ctx[4] < /*chapterSlice*/ ctx[6].length - 1) && /*moveDown*/ ctx[13].bind(null, /*selectedChapterIndex*/ ctx[4]);
			if (dirty[0] & /*selectedChapterIndex*/ 16) chapteredit_changes.remove = /*remove*/ ctx[14].bind(null, /*selectedChapterIndex*/ ctx[4]);

			if (!updating_title && dirty[0] & /*selectedChapter*/ 128) {
				updating_title = true;
				chapteredit_changes.title = /*selectedChapter*/ ctx[7].title;
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_title = false);
			}

			if (!updating_content && dirty[0] & /*selectedChapter*/ 128) {
				updating_content = true;
				chapteredit_changes.content = /*selectedChapter*/ ctx[7].content;
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_content = false);
			}

			if (!updating_needsFetching && dirty[0] & /*selectedChapter*/ 128) {
				updating_needsFetching = true;
				chapteredit_changes.needsFetching = /*selectedChapter*/ ctx[7].needsFetching;
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_needsFetching = false);
			}

			if (!updating_url && dirty[0] & /*selectedChapter*/ 128) {
				updating_url = true;
				chapteredit_changes.url = /*selectedChapter*/ ctx[7].displayUrl;
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_url = false);
			}

			chapteredit.$set(chapteredit_changes);

			if (dirty[0] & /*float*/ 512) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(div, "float", /*float*/ ctx[9]);
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(chapteredit.$$.fragment, local);

			if (local) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
					if (!div_transition) div_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.fly, { x: 50, duration: 200 }, true);
					div_transition.run(1);
				});
			}

			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(chapteredit.$$.fragment, local);

			if (local) {
				if (!div_transition) div_transition = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_bidirectional_transition)(div, svelte_transition__WEBPACK_IMPORTED_MODULE_2__.fly, { x: 50, duration: 200 }, false);
				div_transition.run(0);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(chapteredit);
			if (detaching && div_transition) div_transition.end();
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(167:2) {#if selectedChapterIndex >= 0}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let div1;
	let div0;
	let seriescard;
	let updating_title;
	let updating_author;
	let t1;
	let t2;
	let button;
	let t4;
	let a;
	let current;
	let mounted;
	let dispose;

	function seriescard_title_binding(value) {
		/*seriescard_title_binding*/ ctx[19](value);
	}

	function seriescard_author_binding(value) {
		/*seriescard_author_binding*/ ctx[20](value);
	}

	let seriescard_props = {
		edit: true,
		onSubmit: /*func_1*/ ctx[18],
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	if (/*data*/ ctx[1].title !== void 0) {
		seriescard_props.title = /*data*/ ctx[1].title;
	}

	if (/*data*/ ctx[1].author !== void 0) {
		seriescard_props.author = /*data*/ ctx[1].author;
	}

	seriescard = new _Components_SeriesCard_svelte__WEBPACK_IMPORTED_MODULE_5__["default"]({ props: seriescard_props, $$inline: true });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(seriescard, 'title', seriescard_title_binding));
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(seriescard, 'author', seriescard_author_binding));
	let if_block = /*selectedChapterIndex*/ ctx[4] >= 0 && create_if_block(ctx);

	const block = {
		c: function create() {
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("You are editing:\n\n");
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(seriescard.$$.fragment);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "Save";
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			a.textContent = "Cancel";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div0, "class", "svelte-17sum1b");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(div0, "hide", /*hide*/ ctx[8]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div0, file, 133, 2, 3411);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div1, "class", "list svelte-17sum1b");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div1, file, 132, 0, 3390);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button, "type", "submit");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 186, 0, 6158);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", "#cancel");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "class", "small");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 187, 0, 6230);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(seriescard, div0, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t1);
			if (if_block) if_block.m(div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t4, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, a, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button, "click", /*click_handler*/ ctx[29], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(a, "click", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prevent_default)(/*click_handler_1*/ ctx[30]), false, true, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const seriescard_changes = {};
			if (dirty[0] & /*stage, data*/ 3) seriescard_changes.onSubmit = /*func_1*/ ctx[18];

			if (dirty[0] & /*page, maxPage, pageConf, chapterSlice, selectedChapterIndex*/ 124 | dirty[1] & /*$$scope*/ 512) {
				seriescard_changes.$$scope = { dirty, ctx };
			}

			if (!updating_title && dirty[0] & /*data*/ 2) {
				updating_title = true;
				seriescard_changes.title = /*data*/ ctx[1].title;
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_title = false);
			}

			if (!updating_author && dirty[0] & /*data*/ 2) {
				updating_author = true;
				seriescard_changes.author = /*data*/ ctx[1].author;
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_author = false);
			}

			seriescard.$set(seriescard_changes);

			if (dirty[0] & /*hide*/ 256) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(div0, "hide", /*hide*/ ctx[8]);
			}

			if (/*selectedChapterIndex*/ ctx[4] >= 0) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*selectedChapterIndex*/ 16) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					if_block.m(div1, null);
				}
			} else if (if_block) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block, 1, 1, () => {
					if_block = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(seriescard.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(seriescard.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(seriescard);
			if (if_block) if_block.d();
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t2);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t4);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(a);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const pageSize = 50;
const flipDurationMs = 200;

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('_11_EditBook', slots, []);
	let { stage } = $$props;
	const odata = (0,_util__WEBPACK_IMPORTED_MODULE_6__.copyData)(stage.bookData);
	const data = (0,_util__WEBPACK_IMPORTED_MODULE_6__.copyData)(stage.bookData);
	let page = 0;
	let dir;
	let maxPage;
	let chapterSlice;
	let selectedChapterIndex = -1;
	let selectedChapter = undefined;
	const absIdx = i => i + pageSize * page;

	const moveUp = j => {
		if (j < 1) return;
		if (j === selectedChapterIndex) $$invalidate(4, --selectedChapterIndex);
		data.chapters.splice(j - 1, 2, data.chapters[j], data.chapters[j - 1]);
		$$invalidate(1, data);
	};

	const moveDown = j => {
		if (j >= data.chapters.length) return;
		if (j === selectedChapterIndex) $$invalidate(4, ++selectedChapterIndex);
		data.chapters.splice(j, 2, data.chapters[j + 1], data.chapters[j]);
		$$invalidate(1, data);
	};

	const remove = j => {
		$$invalidate(4, selectedChapterIndex = -1);
		data.chapters.splice(j, 1);
		$$invalidate(1, data);
	};

	const range = (min, max) => {
		const arr = new Array(max - min + 1);
		for (let i = min; i <= max; i++) arr[i - min] = i;
		return arr;
	};

	const handlePaging = pg => {
		if (page == pg) {
			const input = prompt('New page:', '' + (page + 1));
			const npg = +input;
			if (input !== null && !isNaN(npg) && npg > 0 && npg <= maxPage + 1) pg = npg - 1;
		}

		dir = Math.sign(pg - page);
		$$invalidate(2, page = pg);
	};

	const acceptItems = e => {
		data.chapters.splice(page * pageSize, pageSize, ...e.detail.items);
		$$invalidate(1, data);
	};

	const handleConsiderFinalize = e => {
		acceptItems(e);
	};

	let pageConf = { pre: null, pages: [], post: null };
	;
	let hide = false;
	let float = true;
	const writable_props = ['stage'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_11_EditBook> was created with unknown prop '${key}'`);
	});

	const func = i => $$invalidate(4, selectedChapterIndex = absIdx(i));
	const func_1 = () => stage.next(data);

	function seriescard_title_binding(value) {
		if ($$self.$$.not_equal(data.title, value)) {
			data.title = value;
			$$invalidate(1, data);
		}
	}

	function seriescard_author_binding(value) {
		if ($$self.$$.not_equal(data.author, value)) {
			data.author = value;
			$$invalidate(1, data);
		}
	}

	const func_2 = () => $$invalidate(4, selectedChapterIndex = -1);

	function chapteredit_title_binding(value) {
		if ($$self.$$.not_equal(selectedChapter.title, value)) {
			selectedChapter.title = value;
			(($$invalidate(7, selectedChapter), $$invalidate(4, selectedChapterIndex)), $$invalidate(1, data));
		}
	}

	function chapteredit_content_binding(value) {
		if ($$self.$$.not_equal(selectedChapter.content, value)) {
			selectedChapter.content = value;
			(($$invalidate(7, selectedChapter), $$invalidate(4, selectedChapterIndex)), $$invalidate(1, data));
		}
	}

	function chapteredit_needsFetching_binding(value) {
		if ($$self.$$.not_equal(selectedChapter.needsFetching, value)) {
			selectedChapter.needsFetching = value;
			(($$invalidate(7, selectedChapter), $$invalidate(4, selectedChapterIndex)), $$invalidate(1, data));
		}
	}

	function chapteredit_url_binding(value) {
		if ($$self.$$.not_equal(selectedChapter.displayUrl, value)) {
			selectedChapter.displayUrl = value;
			(($$invalidate(7, selectedChapter), $$invalidate(4, selectedChapterIndex)), $$invalidate(1, data));
		}
	}

	const introend_handler = () => {
		$$invalidate(8, hide = true);
		$$invalidate(9, float = false);
	};

	const outrostart_handler = () => {
		$$invalidate(9, float = true);
	};

	const outroend_handler = () => {
		$$invalidate(8, hide = false);
	};

	const click_handler = () => stage.next(data);
	const click_handler_1 = () => stage.next(odata);

	$$self.$$set = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
	};

	$$self.$capture_state = () => ({
		stage,
		dndzone: svelte_dnd_action__WEBPACK_IMPORTED_MODULE_1__.dndzone,
		fly: svelte_transition__WEBPACK_IMPORTED_MODULE_2__.fly,
		ChapterEdit: _Components_ChapterEdit_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		ChapterSelect: _Components_ChapterSelect_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		SeriesCard: _Components_SeriesCard_svelte__WEBPACK_IMPORTED_MODULE_5__["default"],
		copyData: _util__WEBPACK_IMPORTED_MODULE_6__.copyData,
		odata,
		data,
		page,
		pageSize,
		flipDurationMs,
		dir,
		maxPage,
		chapterSlice,
		selectedChapterIndex,
		selectedChapter,
		absIdx,
		moveUp,
		moveDown,
		remove,
		range,
		handlePaging,
		acceptItems,
		handleConsiderFinalize,
		pageConf,
		hide,
		float
	});

	$$self.$inject_state = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
		if ('page' in $$props) $$invalidate(2, page = $$props.page);
		if ('dir' in $$props) dir = $$props.dir;
		if ('maxPage' in $$props) $$invalidate(3, maxPage = $$props.maxPage);
		if ('chapterSlice' in $$props) $$invalidate(6, chapterSlice = $$props.chapterSlice);
		if ('selectedChapterIndex' in $$props) $$invalidate(4, selectedChapterIndex = $$props.selectedChapterIndex);
		if ('selectedChapter' in $$props) $$invalidate(7, selectedChapter = $$props.selectedChapter);
		if ('pageConf' in $$props) $$invalidate(5, pageConf = $$props.pageConf);
		if ('hide' in $$props) $$invalidate(8, hide = $$props.hide);
		if ('float' in $$props) $$invalidate(9, float = $$props.float);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*data*/ 2) {
			$: $$invalidate(3, maxPage = Math.ceil(data.chapters.length / pageSize - 1));
		}

		if ($$self.$$.dirty[0] & /*data, page*/ 6) {
			$: $$invalidate(6, chapterSlice = data.chapters.slice(page * pageSize, (page + 1) * pageSize));
		}

		if ($$self.$$.dirty[0] & /*selectedChapterIndex, data*/ 18) {
			$: $$invalidate(7, selectedChapter = selectedChapterIndex >= 0
			? data.chapters[selectedChapterIndex]
			: undefined);
		}

		if ($$self.$$.dirty[0] & /*page, maxPage, pageConf*/ 44) {
			$: {
				$$invalidate(5, pageConf.pages = range(Math.max(0, page - 3), Math.min(maxPage, page + 3)), pageConf);
				$$invalidate(5, pageConf.pre = pageConf.pages[0] !== 0 ? 1 : null, pageConf);

				$$invalidate(
					5,
					pageConf.post = pageConf.pages[pageConf.pages.length - 1] !== maxPage
					? maxPage + 1
					: null,
					pageConf
				);
			}
		}
	};

	return [
		stage,
		data,
		page,
		maxPage,
		selectedChapterIndex,
		pageConf,
		chapterSlice,
		selectedChapter,
		hide,
		float,
		odata,
		absIdx,
		moveUp,
		moveDown,
		remove,
		handlePaging,
		handleConsiderFinalize,
		func,
		func_1,
		seriescard_title_binding,
		seriescard_author_binding,
		func_2,
		chapteredit_title_binding,
		chapteredit_content_binding,
		chapteredit_needsFetching_binding,
		chapteredit_url_binding,
		introend_handler,
		outrostart_handler,
		outroend_handler,
		click_handler,
		click_handler_1
	];
}

class _11_EditBook extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { stage: 0 }, add_css, [-1, -1]);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "_11_EditBook",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stage*/ ctx[0] === undefined && !('stage' in props)) {
			console.warn("<_11_EditBook> was created without expected prop 'stage'");
		}
	}

	get stage() {
		throw new Error("<_11_EditBook>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stage(value) {
		throw new Error("<_11_EditBook>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_11_EditBook);



/***/ }),

/***/ "./src/Stages/12_FindChapters.svelte":
/*!*******************************************!*\
  !*** ./src/Stages/12_FindChapters.svelte ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/index.mjs");
/* harmony import */ var _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/ErrorMessage.svelte */ "./src/Components/ErrorMessage.svelte");
/* harmony import */ var _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Components/Loading.svelte */ "./src/Components/Loading.svelte");
/* harmony import */ var _configstore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../configstore */ "./src/configstore.ts");
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../fetch */ "./src/fetch.ts");
/* harmony import */ var _sources__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sources */ "./src/sources/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Stages/12_FindChapters.svelte generated by Svelte v3.49.0 */


const { Object: Object_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;







const file = "src/Stages/12_FindChapters.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-tsai6h", "@keyframes svelte-tsai6h-slide{0%{left:0}100%{left:1em}}.valid.svelte-tsai6h{color:#34b334\n  }.valid.svelte-tsai6h::before{content:'\\1f44d';margin-right:0.5em}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTJfRmluZENoYXB0ZXJzLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFpRXFCLFdBQUEsbUJBQUEsQ0FBQTtvRUFHckIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiMTJfRmluZENoYXB0ZXJzLnN2ZWx0ZSJdfQ== */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

// (87:0) {:catch error}
function create_catch_block(ctx) {
	let errormessage;
	let current;

	errormessage = new _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				error: /*error*/ ctx[15],
				retry: /*func*/ ctx[7],
				back: /*func_1*/ ctx[8]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(errormessage.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(errormessage, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const errormessage_changes = {};
			if (dirty & /*fetchPromise*/ 8) errormessage_changes.error = /*error*/ ctx[15];
			if (dirty & /*fetchPromise*/ 8) errormessage_changes.retry = /*func*/ ctx[7];
			if (dirty & /*stage, chapters, newchapters*/ 7) errormessage_changes.back = /*func_1*/ ctx[8];
			errormessage.$set(errormessage_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(errormessage.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(errormessage.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(errormessage, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(87:0) {:catch error}",
		ctx
	});

	return block;
}

// (85:0) {:then newData}
function create_then_block(ctx) {
	let t_value = /*stage*/ ctx[0].next(/*newData*/ ctx[14], /*newchapters*/ ctx[1].length) + "";
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*stage, fetchPromise, newchapters*/ 11 && t_value !== (t_value = /*stage*/ ctx[0].next(/*newData*/ ctx[14], /*newchapters*/ ctx[1].length) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(85:0) {:then newData}",
		ctx
	});

	return block;
}

// (77:21)    <Loading>Please wait, fetching chapters...</Loading>    <div class="chapters" use:scrollToBottom={{newchapters, scroll: forceScroll}}
function create_pending_block(ctx) {
	let loading;
	let t;
	let div;
	let scrollToBottom_action;
	let current;
	let mounted;
	let dispose;

	loading = new _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	let each_value = /*newchapters*/ ctx[1];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(loading.$$.fragment);
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "chapters");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 79, 2, 2494);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(loading, target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.action_destroyer)(scrollToBottom_action = /*scrollToBottom*/ ctx[6].call(null, div, {
					newchapters: /*newchapters*/ ctx[1],
					scroll: /*forceScroll*/ ctx[4]
				}));

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const loading_changes = {};

			if (dirty & /*$$scope*/ 65536) {
				loading_changes.$$scope = { dirty, ctx };
			}

			loading.$set(loading_changes);

			if (dirty & /*newchapters*/ 2) {
				each_value = /*newchapters*/ ctx[1];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (scrollToBottom_action && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(scrollToBottom_action.update) && dirty & /*newchapters, forceScroll*/ 18) scrollToBottom_action.update.call(null, {
				newchapters: /*newchapters*/ ctx[1],
				scroll: /*forceScroll*/ ctx[4]
			});
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(loading.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(loading.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(loading, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(77:21)    <Loading>Please wait, fetching chapters...</Loading>    <div class=\\\"chapters\\\" use:scrollToBottom={{newchapters, scroll: forceScroll}}",
		ctx
	});

	return block;
}

// (78:2) <Loading>
function create_default_slot(ctx) {
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Please wait, fetching chapters...");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(78:2) <Loading>",
		ctx
	});

	return block;
}

// (81:4) {#each newchapters as chapter}
function create_each_block(ctx) {
	let p;
	let t0_value = /*chapter*/ ctx[11].from + "";
	let t0;
	let t1;
	let a;
	let t2_value = /*chapter*/ ctx[11].url + "";
	let t2;
	let a_href_value;

	const block = {
		c: function create() {
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(": Found ");
			a = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t2_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value = /*chapter*/ ctx[11].url);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a, file, 81, 51, 2659);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "valid small svelte-tsai6h");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 81, 6, 2614);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, a);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*newchapters*/ 2 && t0_value !== (t0_value = /*chapter*/ ctx[11].from + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t0, t0_value);
			if (dirty & /*newchapters*/ 2 && t2_value !== (t2_value = /*chapter*/ ctx[11].url + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t2, t2_value);

			if (dirty & /*newchapters*/ 2 && a_href_value !== (a_href_value = /*chapter*/ ctx[11].url)) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(81:4) {#each newchapters as chapter}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let await_block_anchor;
	let promise;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: true,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 14,
		error: 15,
		blocks: [,,,]
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise = /*fetchPromise*/ ctx[3], info);

	const block = {
		c: function create() {
			await_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			info.block.c();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*fetchPromise*/ 8 && promise !== (promise = /*fetchPromise*/ ctx[3]) && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise, info)) {
				
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_await_block_branch)(info, ctx, dirty);
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(info.block);
			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(block);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let $config;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_configstore__WEBPACK_IMPORTED_MODULE_4__.config, 'config');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _configstore__WEBPACK_IMPORTED_MODULE_4__.config, $$value => $$invalidate(9, $config = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('_12_FindChapters', slots, []);
	let { stage } = $$props;
	let newchapters = [];
	let chapters;

	const fetchMore = async () => {
		$$invalidate(2, chapters = stage.bookData.chapters.map(c => Object.assign({}, c))); // deep copy

		while (true) {
			let cur = chapters[chapters.length - 1];

			if (cur.needsFetching !== false) {
				const res = await (0,_fetch__WEBPACK_IMPORTED_MODULE_5__.retryFetch)(cur.apiUrl);
				const json = await res.json();
				if (!res.ok) throw json.message;
				chapters.splice(-1, 1, cur = (0,_sources__WEBPACK_IMPORTED_MODULE_6__.transformChapter)($config, (0,_sources__WEBPACK_IMPORTED_MODULE_6__.getPostContent)(json)));
			}

			const next = (0,_sources__WEBPACK_IMPORTED_MODULE_6__.findNextLink)($config, cur.content);
			if (!next) break;
			const n = (0,_util__WEBPACK_IMPORTED_MODULE_7__.toApiCall)(next);
			if (chapters.find(c => c.apiUrl === n)) break; // no duplicates
			newchapters.push({ from: cur.title, url: next });
			$$invalidate(1, newchapters); // tell svelte to update
			const res = await (0,_fetch__WEBPACK_IMPORTED_MODULE_5__.retryFetch)(n);
			const json = await res.json();
			if (!res.ok) throw json.message;
			chapters.push((0,_sources__WEBPACK_IMPORTED_MODULE_6__.transformChapter)($config, (0,_sources__WEBPACK_IMPORTED_MODULE_6__.getPostContent)(json)));
		}

		return Object.assign(Object.assign({}, stage.bookData), { chapters });
	};

	let fetchPromise = fetchMore();
	let forceScroll = true;

	function isContentScrolledToBottom() {
		// https://stackoverflow.com/a/55473962/
		const rest = document.documentElement.scrollHeight - document.documentElement.scrollTop;

		$$invalidate(4, forceScroll = Math.abs(document.documentElement.clientHeight - rest) < 1);
	}

	window.addEventListener('scroll', isContentScrolledToBottom);

	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onDestroy)(() => {
		window.removeEventListener('scroll', isContentScrolledToBottom);
	});

	const scrollToBottom = (_, __) => {
		return {
			update: ({ scroll }) => {
				if (scroll) document.querySelector('footer').scrollIntoView();
			}
		};
	};

	const writable_props = ['stage'];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_12_FindChapters> was created with unknown prop '${key}'`);
	});

	const func = () => $$invalidate(3, fetchPromise = fetchMore());
	const func_1 = () => stage.next({ ...stage.bookData, chapters }, newchapters.length);

	$$self.$$set = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
	};

	$$self.$capture_state = () => ({
		onDestroy: svelte__WEBPACK_IMPORTED_MODULE_1__.onDestroy,
		stage,
		ErrorMessage: _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		Loading: _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		config: _configstore__WEBPACK_IMPORTED_MODULE_4__.config,
		retryFetch: _fetch__WEBPACK_IMPORTED_MODULE_5__.retryFetch,
		findNextLink: _sources__WEBPACK_IMPORTED_MODULE_6__.findNextLink,
		getPostContent: _sources__WEBPACK_IMPORTED_MODULE_6__.getPostContent,
		transformChapter: _sources__WEBPACK_IMPORTED_MODULE_6__.transformChapter,
		toApiCall: _util__WEBPACK_IMPORTED_MODULE_7__.toApiCall,
		newchapters,
		chapters,
		fetchMore,
		fetchPromise,
		forceScroll,
		isContentScrolledToBottom,
		scrollToBottom,
		$config
	});

	$$self.$inject_state = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
		if ('newchapters' in $$props) $$invalidate(1, newchapters = $$props.newchapters);
		if ('chapters' in $$props) $$invalidate(2, chapters = $$props.chapters);
		if ('fetchPromise' in $$props) $$invalidate(3, fetchPromise = $$props.fetchPromise);
		if ('forceScroll' in $$props) $$invalidate(4, forceScroll = $$props.forceScroll);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		stage,
		newchapters,
		chapters,
		fetchPromise,
		forceScroll,
		fetchMore,
		scrollToBottom,
		func,
		func_1
	];
}

class _12_FindChapters extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { stage: 0 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "_12_FindChapters",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stage*/ ctx[0] === undefined && !('stage' in props)) {
			console.warn("<_12_FindChapters> was created without expected prop 'stage'");
		}
	}

	get stage() {
		throw new Error("<_12_FindChapters>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stage(value) {
		throw new Error("<_12_FindChapters>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_12_FindChapters);



/***/ }),

/***/ "./src/Stages/13_DownloadChapters.svelte":
/*!***********************************************!*\
  !*** ./src/Stages/13_DownloadChapters.svelte ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components/ErrorMessage.svelte */ "./src/Components/ErrorMessage.svelte");
/* harmony import */ var _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/Loading.svelte */ "./src/Components/Loading.svelte");
/* harmony import */ var _configstore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../configstore */ "./src/configstore.ts");
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fetch */ "./src/fetch.ts");
/* harmony import */ var _sources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sources */ "./src/sources/index.ts");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Stages/13_DownloadChapters.svelte generated by Svelte v3.49.0 */


const { Object: Object_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;





const file = "src/Stages/13_DownloadChapters.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1rrnlr6", "@keyframes svelte-1rrnlr6-slide{0%{left:0}100%{left:1em}}.valid.svelte-1rrnlr6.svelte-1rrnlr6{color:#34b334\n  }.valid.svelte-1rrnlr6.svelte-1rrnlr6::before{content:'\\1f44d';margin-right:0.5em}.chapters.svelte-1rrnlr6.svelte-1rrnlr6{margin:1em 0}.chapters.svelte-1rrnlr6 p.svelte-1rrnlr6{margin:0}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTNfRG93bmxvYWRDaGFwdGVycy5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBMENxQixXQUFBLG9CQUFBLENBQUE7NExBV3JCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIjEzX0Rvd25sb2FkQ2hhcHRlcnMuc3ZlbHRlIl19 */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (1:0) <script lang="ts">export let stage; import ErrorMessage from '../Components/ErrorMessage.svelte'; import Loading from '../Components/Loading.svelte'; import { config }
function create_catch_block(ctx) {
	const block = {
		c: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		m: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(1:0) <script lang=\\\"ts\\\">export let stage; import ErrorMessage from '../Components/ErrorMessage.svelte'; import Loading from '../Components/Loading.svelte'; import { config }",
		ctx
	});

	return block;
}

// (65:0) {:then finishedData}
function create_then_block(ctx) {
	let if_block_anchor;
	let if_block = !/*errors*/ ctx[2].length && create_if_block_2(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (!/*errors*/ ctx[2].length) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(65:0) {:then finishedData}",
		ctx
	});

	return block;
}

// (66:2) {#if !errors.length}
function create_if_block_2(ctx) {
	let t_value = /*stage*/ ctx[0].next(/*finishedData*/ ctx[11]) + "";
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*stage, fetchPromise*/ 9 && t_value !== (t_value = /*stage*/ ctx[0].next(/*finishedData*/ ctx[11]) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(66:2) {#if !errors.length}",
		ctx
	});

	return block;
}

// (63:21)    <Loading>Please wait, fetching chapters...</Loading> {:then finishedData}
function create_pending_block(ctx) {
	let loading;
	let current;

	loading = new _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(loading.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(loading, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const loading_changes = {};

			if (dirty & /*$$scope*/ 4096) {
				loading_changes.$$scope = { dirty, ctx };
			}

			loading.$set(loading_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(loading.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(loading.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(loading, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(63:21)    <Loading>Please wait, fetching chapters...</Loading> {:then finishedData}",
		ctx
	});

	return block;
}

// (64:2) <Loading>
function create_default_slot(ctx) {
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Please wait, fetching chapters...");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(64:2) <Loading>",
		ctx
	});

	return block;
}

// (71:4) {#if chapter && chapter.new === true}
function create_if_block_1(ctx) {
	let p;
	let t_value = /*chapter*/ ctx[8].title + "";
	let t;

	const block = {
		c: function create() {
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "valid small svelte-1rrnlr6");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 71, 6, 2256);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*finishedChapters*/ 2 && t_value !== (t_value = /*chapter*/ ctx[8].title + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(71:4) {#if chapter && chapter.new === true}",
		ctx
	});

	return block;
}

// (70:2) {#each finishedChapters as chapter}
function create_each_block(ctx) {
	let if_block_anchor;
	let if_block = /*chapter*/ ctx[8] && /*chapter*/ ctx[8].new === true && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*chapter*/ ctx[8] && /*chapter*/ ctx[8].new === true) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(70:2) {#each finishedChapters as chapter}",
		ctx
	});

	return block;
}

// (77:0) {#if errors.length}
function create_if_block(ctx) {
	let previous_key = /*errors*/ ctx[2];
	let key_block_anchor;
	let current;
	let key_block = create_key_block(ctx);

	const block = {
		c: function create() {
			key_block.c();
			key_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m: function mount(target, anchor) {
			key_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, key_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*errors*/ 4 && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal)(previous_key, previous_key = /*errors*/ ctx[2])) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(key_block, 1, 1, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop);
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
				key_block = create_key_block(ctx);
				key_block.c();
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(key_block, 1);
				key_block.m(key_block_anchor.parentNode, key_block_anchor);
			} else {
				key_block.p(ctx, dirty);
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(key_block);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(key_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(key_block_anchor);
			key_block.d(detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(77:0) {#if errors.length}",
		ctx
	});

	return block;
}

// (78:2) {#key errors}
function create_key_block(ctx) {
	let errormessage;
	let current;

	errormessage = new _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: {
				error: /*errors*/ ctx[2],
				retry: /*func*/ ctx[5],
				back: /*func_1*/ ctx[6]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(errormessage.$$.fragment);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(errormessage, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const errormessage_changes = {};
			if (dirty & /*errors*/ 4) errormessage_changes.error = /*errors*/ ctx[2];
			if (dirty & /*fetchPromise*/ 8) errormessage_changes.retry = /*func*/ ctx[5];
			if (dirty & /*stage, finishedChapters*/ 3) errormessage_changes.back = /*func_1*/ ctx[6];
			errormessage.$set(errormessage_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(errormessage.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(errormessage.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(errormessage, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_key_block.name,
		type: "key",
		source: "(78:2) {#key errors}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let promise;
	let t0;
	let div;
	let t1;
	let if_block_anchor;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 11,
		blocks: [,,,]
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise = /*fetchPromise*/ ctx[3], info);
	let each_value = /*finishedChapters*/ ctx[1];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block = /*errors*/ ctx[2].length && create_if_block(ctx);

	const block = {
		c: function create() {
			info.block.c();
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "chapters svelte-1rrnlr6");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 68, 0, 2147);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			info.block.m(target, info.anchor = anchor);
			info.mount = () => t0.parentNode;
			info.anchor = t0;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*fetchPromise*/ 8 && promise !== (promise = /*fetchPromise*/ ctx[3]) && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise, info)) {
				
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_await_block_branch)(info, ctx, dirty);
			}

			if (dirty & /*finishedChapters*/ 2) {
				each_value = /*finishedChapters*/ ctx[1];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*errors*/ ctx[2].length) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*errors*/ 4) {
						(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block, 1, 1, () => {
					if_block = null;
				});

				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(info.block);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block);
			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(block);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			info.block.d(detaching);
			info.token = null;
			info = null;
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const batchSize = 100;

function instance($$self, $$props, $$invalidate) {
	let $config;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_configstore__WEBPACK_IMPORTED_MODULE_3__.config, 'config');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _configstore__WEBPACK_IMPORTED_MODULE_3__.config, $$value => $$invalidate(7, $config = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('_13_DownloadChapters', slots, []);
	let { stage } = $$props;

	let finishedChapters = [
		...stage.bookData.chapters.map(c => Object.assign(Object.assign({}, c), { new: false }))
	];

	let errors = [];

	const fetchChapters = async () => {
		let prev = finishedChapters;
		$$invalidate(1, finishedChapters = new Array(finishedChapters.length));
		$$invalidate(2, errors = []);

		// bunch up in 100s
		for (let i = 0; i < prev.length; i += batchSize) {
			await Promise.all(prev.slice(i, i + batchSize).map(async (chapter, index) => {
				$$invalidate(1, finishedChapters[index + i] = Object.assign({}, prev[index + i]), finishedChapters);

				if (chapter.needsFetching !== false) try {
					const res = await (0,_fetch__WEBPACK_IMPORTED_MODULE_4__.retryFetch)(chapter.apiUrl);
					const json = await res.json();
					if (!res.ok) throw json.message;
					$$invalidate(1, finishedChapters[index + i] = Object.assign(Object.assign({}, (0,_sources__WEBPACK_IMPORTED_MODULE_5__.transformChapter)($config, (0,_sources__WEBPACK_IMPORTED_MODULE_5__.getPostContent)(json))), { new: true }), finishedChapters);
					$$invalidate(1, finishedChapters); // tell svelte to update
				} catch(err) {
					errors.push(err);
					$$invalidate(2, errors); // tell svelte to update
				}

				return undefined;
			}));
		}

		return Object.assign(Object.assign({}, stage.bookData), { chapters: finishedChapters });
	};

	let fetchPromise = fetchChapters();
	const writable_props = ['stage'];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_13_DownloadChapters> was created with unknown prop '${key}'`);
	});

	const func = () => $$invalidate(3, fetchPromise = fetchChapters());

	const func_1 = () => stage.next({
		...stage.bookData,
		chapters: finishedChapters
	});

	$$self.$$set = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
	};

	$$self.$capture_state = () => ({
		stage,
		ErrorMessage: _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_1__["default"],
		Loading: _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		config: _configstore__WEBPACK_IMPORTED_MODULE_3__.config,
		retryFetch: _fetch__WEBPACK_IMPORTED_MODULE_4__.retryFetch,
		getPostContent: _sources__WEBPACK_IMPORTED_MODULE_5__.getPostContent,
		transformChapter: _sources__WEBPACK_IMPORTED_MODULE_5__.transformChapter,
		finishedChapters,
		batchSize,
		errors,
		fetchChapters,
		fetchPromise,
		$config
	});

	$$self.$inject_state = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
		if ('finishedChapters' in $$props) $$invalidate(1, finishedChapters = $$props.finishedChapters);
		if ('errors' in $$props) $$invalidate(2, errors = $$props.errors);
		if ('fetchPromise' in $$props) $$invalidate(3, fetchPromise = $$props.fetchPromise);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [stage, finishedChapters, errors, fetchPromise, fetchChapters, func, func_1];
}

class _13_DownloadChapters extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { stage: 0 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "_13_DownloadChapters",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stage*/ ctx[0] === undefined && !('stage' in props)) {
			console.warn("<_13_DownloadChapters> was created without expected prop 'stage'");
		}
	}

	get stage() {
		throw new Error("<_13_DownloadChapters>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stage(value) {
		throw new Error("<_13_DownloadChapters>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_13_DownloadChapters);



/***/ }),

/***/ "./src/Stages/20_Result.svelte":
/*!*************************************!*\
  !*** ./src/Stages/20_Result.svelte ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var downloadjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! downloadjs */ "./node_modules/.pnpm/downloadjs@1.4.7/node_modules/downloadjs/download.js");
/* harmony import */ var downloadjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(downloadjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_BackToSearch_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/BackToSearch.svelte */ "./src/Components/BackToSearch.svelte");
/* harmony import */ var _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Components/ErrorMessage.svelte */ "./src/Components/ErrorMessage.svelte");
/* harmony import */ var _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Components/Loading.svelte */ "./src/Components/Loading.svelte");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Stages/20_Result.svelte generated by Svelte v3.49.0 */


const { console: console_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;





const file = "src/Stages/20_Result.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-ardw9p", "@keyframes svelte-ardw9p-slide{0%{left:0}100%{left:1em}}.valid.svelte-ardw9p.svelte-ardw9p{color:#34b334\n  }.valid.svelte-ardw9p.svelte-ardw9p::before{content:'\\1f44d';margin-right:0.5em}.warning.svelte-ardw9p.svelte-ardw9p{color:#f2b400\n  }.warning.svelte-ardw9p.svelte-ardw9p::before{content:'\\26a0';margin-right:0.5em}.logs.svelte-ardw9p.svelte-ardw9p{margin:1em 0}.logs.svelte-ardw9p p.svelte-ardw9p{margin:0}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjBfUmVzdWx0LnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUErQnFCLFdBQUEsbUJBQUEsQ0FBQTs7K0tBWXJCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIjIwX1Jlc3VsdC5zdmVsdGUiXX0= */");
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i][0];
	child_ctx[9] = list[i][1];
	return child_ctx;
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i][0];
	child_ctx[9] = list[i][1];
	return child_ctx;
}

// (82:0) {:catch error}
function create_catch_block(ctx) {
	let errormessage;
	let t0;
	let button;
	let t2;
	let backtosearch;
	let current;
	let mounted;
	let dispose;

	errormessage = new _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				error: /*error*/ ctx[15],
				retry: /*func_1*/ ctx[6]
			},
			$$inline: true
		});

	backtosearch = new _Components_BackToSearch_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { backToSearch: /*backToSearch*/ ctx[1] },
			$$inline: true
		});

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(errormessage.$$.fragment);
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button.textContent = "Back to book";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(backtosearch.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 83, 2, 2274);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(errormessage, target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(backtosearch, target, anchor);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
					button,
					"click",
					function () {
						if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*stage*/ ctx[0].next.bind(/*stage*/ ctx[0]))) /*stage*/ ctx[0].next.bind(/*stage*/ ctx[0]).apply(this, arguments);
					},
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const errormessage_changes = {};
			if (dirty & /*promise*/ 8) errormessage_changes.error = /*error*/ ctx[15];
			if (dirty & /*promise*/ 8) errormessage_changes.retry = /*func_1*/ ctx[6];
			errormessage.$set(errormessage_changes);
			const backtosearch_changes = {};
			if (dirty & /*backToSearch*/ 2) backtosearch_changes.backToSearch = /*backToSearch*/ ctx[1];
			backtosearch.$set(backtosearch_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(errormessage.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(backtosearch.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(errormessage.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(backtosearch.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(errormessage, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(backtosearch, detaching);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(82:0) {:catch error}",
		ctx
	});

	return block;
}

// (67:0) {:then book}
function create_then_block(ctx) {
	let h3;
	let t1;
	let button0;
	let t3;
	let button1;
	let t5;
	let backtosearch;
	let t6;
	let show_if = /*logs*/ ctx[2].find(func);
	let if_block_anchor;
	let current;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[5](/*book*/ ctx[12]);
	}

	backtosearch = new _Components_BackToSearch_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: { backToSearch: /*backToSearch*/ ctx[1] },
			$$inline: true
		});

	let if_block = show_if && create_if_block(ctx);

	const block = {
		c: function create() {
			h3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h3");
			h3.textContent = "Your e-book is ready!";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button0.textContent = "Download";
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button1.textContent = "Back to book";
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(backtosearch.$$.fragment);
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(h3, "class", "valid svelte-ardw9p");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h3, file, 67, 2, 1660);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button0, file, 68, 2, 1707);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button1, file, 69, 2, 1868);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, h3, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t3, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t5, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(backtosearch, target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t6, anchor);
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button0, "click", click_handler, false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
						button1,
						"click",
						function () {
							if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*stage*/ ctx[0].next.bind(/*stage*/ ctx[0]))) /*stage*/ ctx[0].next.bind(/*stage*/ ctx[0]).apply(this, arguments);
						},
						false,
						false,
						false
					)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const backtosearch_changes = {};
			if (dirty & /*backToSearch*/ 2) backtosearch_changes.backToSearch = /*backToSearch*/ ctx[1];
			backtosearch.$set(backtosearch_changes);
			if (dirty & /*logs*/ 4) show_if = /*logs*/ ctx[2].find(func);

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(backtosearch.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(backtosearch.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(h3);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t3);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(backtosearch, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t6);
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(67:0) {:then book}",
		ctx
	});

	return block;
}

// (73:2) {#if logs.find(([type]) => type === 'warn')}
function create_if_block(ctx) {
	let div;
	let each_value_1 = /*logs*/ ctx[2];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "logs svelte-ardw9p");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 73, 4, 2020);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*logs*/ 4) {
				each_value_1 = /*logs*/ ctx[2];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(73:2) {#if logs.find(([type]) => type === 'warn')}",
		ctx
	});

	return block;
}

// (76:8) {#if type === 'warn'}
function create_if_block_1(ctx) {
	let p;
	let t_value = /*msg*/ ctx[9] + "";
	let t;

	const block = {
		c: function create() {
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "small warning svelte-ardw9p");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 76, 10, 2113);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*logs*/ 4 && t_value !== (t_value = /*msg*/ ctx[9] + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(76:8) {#if type === 'warn'}",
		ctx
	});

	return block;
}

// (75:6) {#each logs as [type, msg]}
function create_each_block_1(ctx) {
	let if_block_anchor;
	let if_block = /*type*/ ctx[8] === 'warn' && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*type*/ ctx[8] === 'warn') {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(75:6) {#each logs as [type, msg]}",
		ctx
	});

	return block;
}

// (59:16)    <Loading>Please wait, generating e-book...</Loading>    <div class="logs">     {#each logs as [type, msg]}
function create_pending_block(ctx) {
	let loading;
	let t;
	let div;
	let current;

	loading = new _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	let each_value = /*logs*/ ctx[2];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(loading.$$.fragment);
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "logs svelte-ardw9p");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 61, 2, 1508);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(loading, target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			const loading_changes = {};

			if (dirty & /*$$scope*/ 65536) {
				loading_changes.$$scope = { dirty, ctx };
			}

			loading.$set(loading_changes);

			if (dirty & /*logs*/ 4) {
				each_value = /*logs*/ ctx[2];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(loading.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(loading.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(loading, detaching);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(59:16)    <Loading>Please wait, generating e-book...</Loading>    <div class=\\\"logs\\\">     {#each logs as [type, msg]}",
		ctx
	});

	return block;
}

// (60:2) <Loading>
function create_default_slot(ctx) {
	let t;

	const block = {
		c: function create() {
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Please wait, generating e-book...");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(60:2) <Loading>",
		ctx
	});

	return block;
}

// (63:4) {#each logs as [type, msg]}
function create_each_block(ctx) {
	let p;
	let t_value = /*msg*/ ctx[9] + "";
	let t;

	const block = {
		c: function create() {
			p = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(p, "class", "small svelte-ardw9p");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(p, "warning", /*type*/ ctx[8] === 'warn');
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p, file, 63, 6, 1565);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, p, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*logs*/ 4 && t_value !== (t_value = /*msg*/ ctx[9] + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);

			if (dirty & /*logs*/ 4) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(p, "warning", /*type*/ ctx[8] === 'warn');
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(p);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(63:4) {#each logs as [type, msg]}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let await_block_anchor;
	let promise_1;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: true,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 12,
		error: 15,
		blocks: [,,,]
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise_1 = /*promise*/ ctx[3], info);

	const block = {
		c: function create() {
			await_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			info.block.c();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*promise*/ 8 && promise_1 !== (promise_1 = /*promise*/ ctx[3]) && (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.handle_promise)(promise_1, info)) {
				
			} else {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.update_await_block_branch)(info, ctx, dirty);
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(info.block);
			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(block);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const func = ([type]) => type === 'warn';

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('_20_Result', slots, []);
	let { stage } = $$props;
	let { backToSearch } = $$props;

	const epubPromise = Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_pnpm_epub-gen-memory_1_0_9_node_modules_epub-gen-memory_dist_lib_index_js"), __webpack_require__.e("_c581")]).then(__webpack_require__.t.bind(__webpack_require__, /*! epub-gen-memory */ "./node_modules/.pnpm/epub-gen-memory@1.0.9/node_modules/epub-gen-memory/dist/lib/index.js", 23));

	let logs = [];

	const generate = async () => {
		$$invalidate(2, logs = []);
		const { default: epub } = await epubPromise;

		return await epub(
			{
				title: (0,_util__WEBPACK_IMPORTED_MODULE_5__.decode)(stage.bookData.title),
				author: (0,_util__WEBPACK_IMPORTED_MODULE_5__.decode)(stage.bookData.author),
				ignoreFailedDownloads: true,
				verbose: (type, msg, ...more) => {
					logs.push([type, msg]);
					if (true) (type === 'warn' ? console.warn : console.log)(msg, ...more);
					$$invalidate(2, logs); // tell svelte to update
				}
			},
			stage.bookData.chapters.map(c => ({
				title: (0,_util__WEBPACK_IMPORTED_MODULE_5__.decode)(c.title),
				content: c.content,
				url: c.displayUrl
			}))
		);
	};

	let promise = generate();
	const writable_props = ['stage', 'backToSearch'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<_20_Result> was created with unknown prop '${key}'`);
	});

	const click_handler = book => downloadjs__WEBPACK_IMPORTED_MODULE_1___default()(book, `${(0,_util__WEBPACK_IMPORTED_MODULE_5__.decode)(stage.bookData.author)} - ${(0,_util__WEBPACK_IMPORTED_MODULE_5__.decode)(stage.bookData.title)}.epub`, 'application/epub+zip');
	const func_1 = () => $$invalidate(3, promise = generate());

	$$self.$$set = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
		if ('backToSearch' in $$props) $$invalidate(1, backToSearch = $$props.backToSearch);
	};

	$$self.$capture_state = () => ({
		stage,
		backToSearch,
		download: (downloadjs__WEBPACK_IMPORTED_MODULE_1___default()),
		BackToSearch: _Components_BackToSearch_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		ErrorMessage: _Components_ErrorMessage_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		Loading: _Components_Loading_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		decode: _util__WEBPACK_IMPORTED_MODULE_5__.decode,
		epubPromise,
		logs,
		generate,
		promise
	});

	$$self.$inject_state = $$props => {
		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
		if ('backToSearch' in $$props) $$invalidate(1, backToSearch = $$props.backToSearch);
		if ('logs' in $$props) $$invalidate(2, logs = $$props.logs);
		if ('promise' in $$props) $$invalidate(3, promise = $$props.promise);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [stage, backToSearch, logs, promise, generate, click_handler, func_1];
}

class _20_Result extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { stage: 0, backToSearch: 1 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "_20_Result",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stage*/ ctx[0] === undefined && !('stage' in props)) {
			console_1.warn("<_20_Result> was created without expected prop 'stage'");
		}

		if (/*backToSearch*/ ctx[1] === undefined && !('backToSearch' in props)) {
			console_1.warn("<_20_Result> was created without expected prop 'backToSearch'");
		}
	}

	get stage() {
		throw new Error("<_20_Result>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stage(value) {
		throw new Error("<_20_Result>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get backToSearch() {
		throw new Error("<_20_Result>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set backToSearch(value) {
		throw new Error("<_20_Result>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_20_Result);



/***/ }),

/***/ "./src/Stages/Settings.svelte":
/*!************************************!*\
  !*** ./src/Stages/Settings.svelte ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/index.mjs");
/* harmony import */ var _Components_Column_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/Column.svelte */ "./src/Components/Column.svelte");
/* harmony import */ var _Components_Radio_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Components/Radio.svelte */ "./src/Components/Radio.svelte");
/* harmony import */ var _configstore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../configstore */ "./src/configstore.ts");
/* harmony import */ var _sources_fn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sources/fn */ "./src/sources/fn.ts");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/Stages/Settings.svelte generated by Svelte v3.49.0 */


const { Object: Object_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;







const file = "src/Stages/Settings.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-5v9ihf", "@keyframes svelte-5v9ihf-slide{0%{left:0}100%{left:1em}}.warning.svelte-5v9ihf.svelte-5v9ihf{color:#f2b400\n  }.warning.svelte-5v9ihf.svelte-5v9ihf::before{content:'\\26a0';margin-right:0.5em}.field.svelte-5v9ihf.svelte-5v9ihf{display:block;padding-top:0.7em}.field.svelte-5v9ihf input.svelte-5v9ihf:not([type=\"checkbox\"]),.field.svelte-5v9ihf textarea.svelte-5v9ihf{display:block;width:100%;max-width:100%;box-sizing:border-box}.small.svelte-5v9ihf.svelte-5v9ihf{font-size:0.8em}.settings.svelte-5v9ihf.svelte-5v9ihf{margin:1em 0}.error.svelte-5v9ihf.svelte-5v9ihf{color:#e32636}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3Muc3ZlbHRlIiwibWFwcGluZ3MiOiJBQTREcUIsV0FBQSxtQkFBQSxDQUFBO3VkQTJCckIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiU2V0dGluZ3Muc3ZlbHRlIl19 */");
}

// (128:55) 
function create_if_block_10(ctx) {
	let label;
	let t0;
	let span0;
	let t2;
	let textarea;
	let textarea_placeholder_value;
	let t3;
	let span1;
	let t4;
	let code0;
	let t6;
	let code1;
	let t8;
	let code2;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Function: ");
			span0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span0.textContent = "Only input code you trust!";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			textarea = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("textarea");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Globals ");
			code0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			code0.textContent = "document";
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" and ");
			code1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			code1.textContent = "html";
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" are available; Must produce the url as ");
			code2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			code2.textContent = "return";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span0, "class", "small warning svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span0, file, 129, 20, 4310);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "rows", "5");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "placeholder", textarea_placeholder_value = _configstore__WEBPACK_IMPORTED_MODULE_4__.defaultConfig.nextLinkFn);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "class", "svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(textarea, file, 130, 10, 4382);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code0, file, 131, 38, 4532);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code1, file, 131, 64, 4558);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code2, file, 131, 121, 4615);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span1, "class", "small svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span1, file, 131, 10, 4504);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(label, "class", "field svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(label, file, 128, 8, 4268);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, label, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, span0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, textarea);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(textarea, /*cur*/ ctx[0].nextLinkFn);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, span1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, code0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, t6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, code1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, code2);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(textarea, "input", /*textarea_input_handler*/ ctx[7]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*cur*/ 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(textarea, /*cur*/ ctx[0].nextLinkFn);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(label);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_10.name,
		type: "if",
		source: "(128:55) ",
		ctx
	});

	return block;
}

// (122:53) 
function create_if_block_9(ctx) {
	let label;
	let t0;
	let input;
	let input_placeholder_value;
	let t1;
	let span;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Regex:\n          ");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span.textContent = "Must produce the url in the first group";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "placeholder", input_placeholder_value = _configstore__WEBPACK_IMPORTED_MODULE_4__.defaultConfig.nextLinkRegex);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "class", "svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(input, file, 124, 10, 4013);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "small svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 125, 10, 4120);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(label, "class", "field svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(label, file, 122, 8, 3964);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, label, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, input);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input, /*cur*/ ctx[0].nextLinkRegex);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, span);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input, "input", /*input_input_handler*/ ctx[6]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*cur*/ 1 && input.value !== /*cur*/ ctx[0].nextLinkRegex) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input, /*cur*/ ctx[0].nextLinkRegex);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(label);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_9.name,
		type: "if",
		source: "(122:53) ",
		ctx
	});

	return block;
}

// (120:6) {#if cur.nextLink === NextLinkType.DEFAULT}
function create_if_block_8(ctx) {
	let span;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span.textContent = "Finds a \"First\" link, with fallback to other links that aren't \"Previous\" or \"Index\" or \"First\"";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "small svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 120, 8, 3779);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_8.name,
		type: "if",
		source: "(120:6) {#if cur.nextLink === NextLinkType.DEFAULT}",
		ctx
	});

	return block;
}

// (158:64) 
function create_if_block_7(ctx) {
	let label;
	let t0;
	let span0;
	let t2;
	let textarea;
	let textarea_placeholder_value;
	let t3;
	let span1;
	let t4;
	let code0;
	let t6;
	let code1;
	let t8;
	let code2;
	let t10;
	let code3;
	let t12;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Function: ");
			span0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span0.textContent = "Only input code you trust!";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			textarea = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("textarea");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Globals ");
			code0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			code0.textContent = "document";
			t6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(", ");
			code1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			code1.textContent = "html";
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(", ");
			code2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			code2.textContent = "title";
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" and ");
			code3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			code3.textContent = "url";
			t12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(" are available; Modify the latter two to transform");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span0, "class", "small warning svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span0, file, 159, 20, 5823);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "rows", "5");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "placeholder", textarea_placeholder_value = _configstore__WEBPACK_IMPORTED_MODULE_4__.defaultConfig.transformFn);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(textarea, "class", "svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(textarea, file, 160, 10, 5895);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code0, file, 161, 38, 6047);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code1, file, 161, 61, 6070);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code2, file, 161, 80, 6089);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code3, file, 161, 103, 6112);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span1, "class", "small svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span1, file, 161, 10, 6019);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(label, "class", "field svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(label, file, 158, 8, 5781);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, label, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, span0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, textarea);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(textarea, /*cur*/ ctx[0].transformFn);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, span1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, code0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, t6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, code1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, code2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, t10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, code3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span1, t12);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(textarea, "input", /*textarea_input_handler_1*/ ctx[11]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*cur*/ 1) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(textarea, /*cur*/ ctx[0].transformFn);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(label);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(158:64) ",
		ctx
	});

	return block;
}

// (153:64) 
function create_if_block_6(ctx) {
	let label;
	let t;
	let input;
	let input_placeholder_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Selector:\n          ");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "placeholder", input_placeholder_value = _configstore__WEBPACK_IMPORTED_MODULE_4__.defaultConfig.transformSelector);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "class", "svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(input, file, 155, 10, 5586);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(label, "class", "field svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(label, file, 153, 8, 5534);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, label, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, input);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input, /*cur*/ ctx[0].transformSelector);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input, "input", /*input_input_handler_2*/ ctx[10]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*cur*/ 1 && input.value !== /*cur*/ ctx[0].transformSelector) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input, /*cur*/ ctx[0].transformSelector);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(label);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(153:64) ",
		ctx
	});

	return block;
}

// (147:6) {#if cur.transform === ChapterTransformType.REGEXP}
function create_if_block_5(ctx) {
	let label;
	let t0;
	let input;
	let input_placeholder_value;
	let t1;
	let span;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Regex:\n          ");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span.textContent = "Must produce the new html in the first group";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "placeholder", input_placeholder_value = _configstore__WEBPACK_IMPORTED_MODULE_4__.defaultConfig.transformRegex);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "class", "svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(input, file, 149, 10, 5263);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "small svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 150, 10, 5372);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(label, "class", "field svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(label, file, 147, 8, 5214);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, label, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, input);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input, /*cur*/ ctx[0].transformRegex);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, span);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input, "input", /*input_input_handler_1*/ ctx[9]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*cur*/ 1 && input.value !== /*cur*/ ctx[0].transformRegex) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input, /*cur*/ ctx[0].transformRegex);
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(label);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(147:6) {#if cur.transform === ChapterTransformType.REGEXP}",
		ctx
	});

	return block;
}

// (102:2) <Column>
function create_default_slot(ctx) {
	let h30;
	let t1;
	let div0;
	let label;
	let input;
	let t2;
	let t3;
	let h31;
	let t5;
	let div1;
	let p0;
	let t7;
	let radio0;
	let updating_selected;
	let t8;
	let t9;
	let h32;
	let t11;
	let div2;
	let p1;
	let t13;
	let radio1;
	let updating_selected_1;
	let t14;
	let current;
	let mounted;
	let dispose;

	function radio0_selected_binding(value) {
		/*radio0_selected_binding*/ ctx[5](value);
	}

	let radio0_props = {
		options: [
			{
				value: _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType.DEFAULT,
				label: 'Default'
			},
			{
				value: _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType.REGEXP,
				label: 'Regex'
			},
			{
				value: _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType.FUNCTION,
				label: 'Function'
			}
		],
		name: "radio-next-type"
	};

	if (/*cur*/ ctx[0].nextLink !== void 0) {
		radio0_props.selected = /*cur*/ ctx[0].nextLink;
	}

	radio0 = new _Components_Radio_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({ props: radio0_props, $$inline: true });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(radio0, 'selected', radio0_selected_binding));

	function select_block_type(ctx, dirty) {
		if (/*cur*/ ctx[0].nextLink === _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType.DEFAULT) return create_if_block_8;
		if (/*cur*/ ctx[0].nextLink === _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType.REGEXP) return create_if_block_9;
		if (/*cur*/ ctx[0].nextLink === _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType.FUNCTION) return create_if_block_10;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block0 = current_block_type && current_block_type(ctx);

	function radio1_selected_binding(value) {
		/*radio1_selected_binding*/ ctx[8](value);
	}

	let radio1_props = {
		options: [
			{
				value: _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.NONE,
				label: 'No transform'
			},
			{
				value: _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.REGEXP,
				label: 'Regex'
			},
			{
				value: _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.SELECTOR,
				label: 'Query-Selector'
			},
			{
				value: _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.FUNCTION,
				label: 'Function'
			}
		],
		name: "radio-transform"
	};

	if (/*cur*/ ctx[0].transform !== void 0) {
		radio1_props.selected = /*cur*/ ctx[0].transform;
	}

	radio1 = new _Components_Radio_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({ props: radio1_props, $$inline: true });
	svelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(radio1, 'selected', radio1_selected_binding));

	function select_block_type_1(ctx, dirty) {
		if (/*cur*/ ctx[0].transform === _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.REGEXP) return create_if_block_5;
		if (/*cur*/ ctx[0].transform === _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.SELECTOR) return create_if_block_6;
		if (/*cur*/ ctx[0].transform === _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.FUNCTION) return create_if_block_7;
	}

	let current_block_type_1 = select_block_type_1(ctx, -1);
	let if_block1 = current_block_type_1 && current_block_type_1(ctx);

	const block = {
		c: function create() {
			h30 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h3");
			h30.textContent = "Editor";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("\n        Use TinyMCE, a powerful HTML editor, for editing chapters");
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			h31 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h3");
			h31.textContent = "Next chapter";
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			p0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			p0.textContent = "Specify how next chapter links are extracted.";
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(radio0.$$.fragment);
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block0) if_block0.c();
			t9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			h32 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h3");
			h32.textContent = "Chapter transform";
			t11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			p1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("p");
			p1.textContent = "Automatically transform chapter contents.";
			t13 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(radio1.$$.fragment);
			t14 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block1) if_block1.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h30, file, 102, 4, 3151);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "type", "checkbox");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "class", "svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(input, file, 105, 8, 3213);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(label, "class", "field svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(label, file, 104, 6, 3183);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div0, file, 103, 4, 3171);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h31, file, 110, 4, 3363);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p0, file, 112, 6, 3401);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div1, file, 111, 4, 3389);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h32, file, 136, 4, 4687);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(p1, file, 138, 6, 4730);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div2, file, 137, 4, 4718);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, h30, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, label);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, input);
			input.checked = /*cur*/ ctx[0].useTiny;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(label, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t3, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, h31, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t5, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, p0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(radio0, div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t8);
			if (if_block0) if_block0.m(div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t9, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, h32, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t11, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, p1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, t13);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(radio1, div2, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, t14);
			if (if_block1) if_block1.m(div2, null);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input, "change", /*input_change_handler*/ ctx[4]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*cur*/ 1) {
				input.checked = /*cur*/ ctx[0].useTiny;
			}

			const radio0_changes = {};

			if (!updating_selected && dirty & /*cur*/ 1) {
				updating_selected = true;
				radio0_changes.selected = /*cur*/ ctx[0].nextLink;
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_selected = false);
			}

			radio0.$set(radio0_changes);

			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if (if_block0) if_block0.d(1);
				if_block0 = current_block_type && current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div1, null);
				}
			}

			const radio1_changes = {};

			if (!updating_selected_1 && dirty & /*cur*/ 1) {
				updating_selected_1 = true;
				radio1_changes.selected = /*cur*/ ctx[0].transform;
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_selected_1 = false);
			}

			radio1.$set(radio1_changes);

			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx, dirty)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if (if_block1) if_block1.d(1);
				if_block1 = current_block_type_1 && current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(div2, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(radio0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(radio1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(radio0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(radio1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(h30);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t1);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t3);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(h31);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t5);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(radio0);

			if (if_block0) {
				if_block0.d();
			}

			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t9);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(h32);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t11);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(radio1);

			if (if_block1) {
				if_block1.d();
			}

			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(102:2) <Column>",
		ctx
	});

	return block;
}

// (178:90) 
function create_if_block_4(ctx) {
	let span;
	let t0;
	let code;
	let t1;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Transform Function invalid: ");
			code = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*tranformError*/ ctx[3]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code, file, 178, 56, 7206);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "small error svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 178, 2, 7152);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, code);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(code, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*tranformError*/ 8) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, /*tranformError*/ ctx[3]);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(178:90) ",
		ctx
	});

	return block;
}

// (176:90) 
function create_if_block_3(ctx) {
	let span;
	let t0;
	let code;
	let t1;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Transform Selector invalid: ");
			code = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*tranformError*/ ctx[3]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code, file, 176, 56, 7023);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "small error svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 176, 2, 6969);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, code);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(code, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*tranformError*/ 8) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, /*tranformError*/ ctx[3]);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(176:90) ",
		ctx
	});

	return block;
}

// (174:88) 
function create_if_block_2(ctx) {
	let span;
	let t0;
	let code;
	let t1;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Transform Regex invalid: ");
			code = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*tranformError*/ ctx[3]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code, file, 174, 53, 6840);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "small error svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 174, 2, 6789);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, code);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(code, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*tranformError*/ 8) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, /*tranformError*/ ctx[3]);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(174:88) ",
		ctx
	});

	return block;
}

// (172:81) 
function create_if_block_1(ctx) {
	let span;
	let t0;
	let code;
	let t1;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Chapter Function invalid: ");
			code = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*nextLinkError*/ ctx[2]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code, file, 172, 54, 6662);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "small error svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 172, 2, 6610);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, code);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(code, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*nextLinkError*/ 4) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, /*nextLinkError*/ ctx[2]);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(172:81) ",
		ctx
	});

	return block;
}

// (170:0) {#if disableSave && cur.nextLink === NextLinkType.REGEXP && nextLinkError}
function create_if_block(ctx) {
	let span;
	let t0;
	let code;
	let t1;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Chapter Regex invalid: ");
			code = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("code");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*nextLinkError*/ ctx[2]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(code, file, 170, 51, 6490);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "small error svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 170, 2, 6441);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span, code);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(code, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*nextLinkError*/ 4) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t1, /*nextLinkError*/ ctx[2]);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(170:0) {#if disableSave && cur.nextLink === NextLinkType.REGEXP && nextLinkError}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let column;
	let t0;
	let button;
	let t1;
	let t2;
	let if_block_anchor;
	let current;
	let mounted;
	let dispose;

	column = new _Components_Column_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	function select_block_type_2(ctx, dirty) {
		if (/*disableSave*/ ctx[1] && /*cur*/ ctx[0].nextLink === _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType.REGEXP && /*nextLinkError*/ ctx[2]) return create_if_block;
		if (/*disableSave*/ ctx[1] && /*cur*/ ctx[0].nextLink === _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType.FUNCTION && /*nextLinkError*/ ctx[2]) return create_if_block_1;
		if (/*disableSave*/ ctx[1] && /*cur*/ ctx[0].transform === _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.REGEXP && /*tranformError*/ ctx[3]) return create_if_block_2;
		if (/*disableSave*/ ctx[1] && /*cur*/ ctx[0].transform === _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.SELECTOR && /*tranformError*/ ctx[3]) return create_if_block_3;
		if (/*disableSave*/ ctx[1] && /*cur*/ ctx[0].transform === _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.FUNCTION && /*tranformError*/ ctx[3]) return create_if_block_4;
	}

	let current_block_type = select_block_type_2(ctx, -1);
	let if_block = current_block_type && current_block_type(ctx);

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(column.$$.fragment);
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)("Save");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			if_block_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "settings svelte-5v9ihf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 100, 0, 3113);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button, "type", "submit");
			button.disabled = /*disableSave*/ ctx[1];
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 168, 0, 6246);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(column, div, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t0, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(button, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, if_block_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(button, "click", /*click_handler*/ ctx[12], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const column_changes = {};

			if (dirty & /*$$scope, cur*/ 262145) {
				column_changes.$$scope = { dirty, ctx };
			}

			column.$set(column_changes);

			if (!current || dirty & /*disableSave*/ 2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.prop_dev)(button, "disabled", /*disableSave*/ ctx[1]);
			}

			if (current_block_type === (current_block_type = select_block_type_2(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if (if_block) if_block.d(1);
				if_block = current_block_type && current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(column.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(column.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(column);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t0);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button);
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(t2);

			if (if_block) {
				if_block.d(detaching);
			}

			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(if_block_anchor);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let $config;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_configstore__WEBPACK_IMPORTED_MODULE_4__.config, 'config');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _configstore__WEBPACK_IMPORTED_MODULE_4__.config, $$value => $$invalidate(13, $config = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Settings', slots, []);
	const cur = Object.assign({}, $config);
	const org = Object.assign({}, $config);

	const validateRegex = (regex, wasDisabled) => {
		if (!regex.trim().length) {
			return {
				error: "Must specify a regular expression",
				disableSave: true
			};
		}

		try {
			new RegExp(regex, 'i');

			return {
				error: undefined,
				disableSave: wasDisabled
			};
		} catch(error) {
			return { error, disableSave: true };
		}
	};

	const validateSelector = (sel, wasDisabled) => {
		if (!sel.trim().length) {
			return {
				error: "Must specify a selector",
				disableSave: true
			};
		}

		try {
			document.querySelector(sel);

			return {
				error: undefined,
				disableSave: wasDisabled
			};
		} catch(error) {
			return { error, disableSave: true };
		}
	};

	const validateFn = (fn, wasDisabled) => {
		if (!fn.trim().length) {
			return {
				error: "Must specify a function",
				disableSave: true
			};
		}

		try {
			(0,_sources_fn__WEBPACK_IMPORTED_MODULE_5__.sandboxFn)(fn);

			return {
				error: undefined,
				disableSave: wasDisabled
			};
		} catch(error) {
			return { error, disableSave: true };
		}
	};

	let disableSave = false;
	let nextLinkError;
	let tranformError;
	(0,svelte__WEBPACK_IMPORTED_MODULE_1__.onMount)(() => $$invalidate(1, disableSave = true));
	const writable_props = [];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
	});

	function input_change_handler() {
		cur.useTiny = this.checked;
		$$invalidate(0, cur);
	}

	function radio0_selected_binding(value) {
		if ($$self.$$.not_equal(cur.nextLink, value)) {
			cur.nextLink = value;
			$$invalidate(0, cur);
		}
	}

	function input_input_handler() {
		cur.nextLinkRegex = this.value;
		$$invalidate(0, cur);
	}

	function textarea_input_handler() {
		cur.nextLinkFn = this.value;
		$$invalidate(0, cur);
	}

	function radio1_selected_binding(value) {
		if ($$self.$$.not_equal(cur.transform, value)) {
			cur.transform = value;
			$$invalidate(0, cur);
		}
	}

	function input_input_handler_1() {
		cur.transformRegex = this.value;
		$$invalidate(0, cur);
	}

	function input_input_handler_2() {
		cur.transformSelector = this.value;
		$$invalidate(0, cur);
	}

	function textarea_input_handler_1() {
		cur.transformFn = this.value;
		$$invalidate(0, cur);
	}

	const click_handler = () => {
		_configstore__WEBPACK_IMPORTED_MODULE_4__.config.set(cur);
		$$invalidate(1, disableSave = true);
	};

	$$self.$capture_state = () => ({
		onMount: svelte__WEBPACK_IMPORTED_MODULE_1__.onMount,
		Column: _Components_Column_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		Radio: _Components_Radio_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		ChapterTransformType: _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType,
		config: _configstore__WEBPACK_IMPORTED_MODULE_4__.config,
		defaultConfig: _configstore__WEBPACK_IMPORTED_MODULE_4__.defaultConfig,
		NextLinkType: _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType,
		sandboxFn: _sources_fn__WEBPACK_IMPORTED_MODULE_5__.sandboxFn,
		cur,
		org,
		validateRegex,
		validateSelector,
		validateFn,
		disableSave,
		nextLinkError,
		tranformError,
		$config
	});

	$$self.$inject_state = $$props => {
		if ('disableSave' in $$props) $$invalidate(1, disableSave = $$props.disableSave);
		if ('nextLinkError' in $$props) $$invalidate(2, nextLinkError = $$props.nextLinkError);
		if ('tranformError' in $$props) $$invalidate(3, tranformError = $$props.tranformError);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*cur*/ 1) {
			$: $$invalidate(1, disableSave = cur.nextLink === org.nextLink && cur.nextLinkRegex === org.nextLinkRegex && cur.nextLinkFn === org.nextLinkFn && cur.transform === org.transform && cur.transformRegex === org.transformRegex && cur.transformSelector === org.transformSelector && cur.transformFn === org.transformFn && cur.useTiny === org.useTiny);
		}

		if ($$self.$$.dirty & /*cur, disableSave*/ 3) {
			$: if (cur.nextLink === _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType.REGEXP) $$invalidate(1, { disableSave, error: nextLinkError } = validateRegex(cur.nextLinkRegex, disableSave), disableSave, (($$invalidate(2, nextLinkError), $$invalidate(0, cur)), $$invalidate(1, disableSave)));
		}

		if ($$self.$$.dirty & /*cur, disableSave*/ 3) {
			$: if (cur.nextLink === _configstore__WEBPACK_IMPORTED_MODULE_4__.NextLinkType.FUNCTION) $$invalidate(1, { disableSave, error: nextLinkError } = validateFn(cur.nextLinkFn, disableSave), disableSave, (($$invalidate(2, nextLinkError), $$invalidate(0, cur)), $$invalidate(1, disableSave)));
		}

		if ($$self.$$.dirty & /*cur, disableSave*/ 3) {
			$: if (cur.transform === _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.REGEXP) $$invalidate(1, { disableSave, error: tranformError } = validateRegex(cur.transformRegex, disableSave), disableSave, (($$invalidate(3, tranformError), $$invalidate(0, cur)), $$invalidate(1, disableSave)));
		}

		if ($$self.$$.dirty & /*cur, disableSave*/ 3) {
			$: if (cur.transform === _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.SELECTOR) $$invalidate(1, { disableSave, error: tranformError } = validateSelector(cur.transformSelector, disableSave), disableSave, (($$invalidate(3, tranformError), $$invalidate(0, cur)), $$invalidate(1, disableSave)));
		}

		if ($$self.$$.dirty & /*cur, disableSave*/ 3) {
			$: if (cur.transform === _configstore__WEBPACK_IMPORTED_MODULE_4__.ChapterTransformType.FUNCTION) $$invalidate(1, { disableSave, error: tranformError } = validateFn(cur.transformFn, disableSave), disableSave, (($$invalidate(3, tranformError), $$invalidate(0, cur)), $$invalidate(1, disableSave)));
		}
	};

	return [
		cur,
		disableSave,
		nextLinkError,
		tranformError,
		input_change_handler,
		radio0_selected_binding,
		input_input_handler,
		textarea_input_handler,
		radio1_selected_binding,
		input_input_handler_1,
		input_input_handler_2,
		textarea_input_handler_1,
		click_handler
	];
}

class Settings extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Settings",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);



/***/ }),

/***/ "./src/icons/back-arrow.svg":
/*!**********************************!*\
  !*** ./src/icons/back-arrow.svg ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/icons/back-arrow.svg generated by Svelte v3.49.0 */


const file = "src/icons/back-arrow.svg";

function create_fragment(ctx) {
	let svg;
	let g;
	let path;

	const block = {
		c: function create() {
			svg = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("svg");
			g = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("g");
			path = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("path");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(path, "d", "M38,52a2,2,0,0,1-1.41-.59l-24-24a2,2,0,0,1,0-2.82l24-24a2,2,0,0,1,2.82,0,2,2,0,0,1,0,2.82L16.83,26,39.41,48.59A2,2,0,0,1,38,52Z");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(path, file, 1, 3, 158);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(g, file, 1, 0, 155);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "version", "1.1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "xmlns", "http://www.w3.org/2000/svg");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "x", "0px");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "y", "0px");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "viewBox", "0 0 52 52");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "xml:space", "preserve");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(svg, file, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, svg, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(svg, g);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(g, path);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(svg);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Back_arrow', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Back_arrow> was created with unknown prop '${key}'`);
	});

	return [];
}

class Back_arrow extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Back_arrow",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Back_arrow);



/***/ }),

/***/ "./src/icons/gear.svg":
/*!****************************!*\
  !*** ./src/icons/gear.svg ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/icons/gear.svg generated by Svelte v3.49.0 */


const file = "src/icons/gear.svg";

function create_fragment(ctx) {
	let svg;
	let g;
	let path0;
	let path1;

	const block = {
		c: function create() {
			svg = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("svg");
			g = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("g");
			path0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("path");
			path1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("path");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(path0, "d", "M173.145,73.91c-0.413-2.722-2.29-4.993-4.881-5.912l-13.727-4.881c-0.812-2.3-1.733-4.536-2.754-6.699l6.247-13.146\n\t\tc1.179-2.479,0.899-5.411-0.729-7.628c-5.265-7.161-11.556-13.452-18.698-18.693c-2.219-1.629-5.141-1.906-7.625-0.724\n\t\tl-13.138,6.242c-2.163-1.021-4.402-1.94-6.704-2.752l-4.883-13.729c-0.919-2.586-3.184-4.458-5.9-4.876\n\t\tc-9.65-1.483-16.792-1.483-26.457,0c-2.713,0.418-4.981,2.29-5.9,4.876l-4.883,13.729c-2.302,0.812-4.541,1.731-6.702,2.752\n\t\tl-13.143-6.242c-2.479-1.181-5.406-0.904-7.623,0.724c-7.142,5.241-13.433,11.532-18.698,18.693\n\t\tc-1.629,2.217-1.908,5.148-0.729,7.628l6.247,13.146c-1.021,2.159-1.94,4.4-2.754,6.699L5.982,68.003\n\t\tc-2.589,0.919-4.463,3.189-4.879,5.907c-0.749,4.92-1.099,9.115-1.099,13.219c0,4.098,0.35,8.299,1.099,13.219\n\t\tc0.413,2.722,2.29,4.993,4.881,5.912l13.727,4.881c0.814,2.304,1.736,4.541,2.754,6.704l-6.247,13.141\n\t\tc-1.179,2.479-0.899,5.411,0.727,7.623c5.258,7.156,11.549,13.447,18.7,18.698c2.217,1.629,5.144,1.911,7.625,0.724l13.138-6.242\n\t\tc2.163,1.021,4.402,1.94,6.704,2.752l4.883,13.729c0.919,2.586,3.184,4.458,5.9,4.876c4.828,0.744,9.154,1.104,13.228,1.104\n\t\tc4.074,0,8.401-0.36,13.228-1.104c2.715-0.418,4.981-2.29,5.9-4.876l4.883-13.729c2.302-0.812,4.541-1.731,6.704-2.752\n\t\tl13.138,6.242c2.484,1.186,5.411,0.904,7.628-0.724c7.159-5.26,13.45-11.551,18.698-18.698c1.626-2.212,1.906-5.144,0.727-7.623\n\t\tl-6.247-13.141c1.021-2.163,1.942-4.405,2.754-6.704l13.727-4.881c2.591-0.919,4.468-3.189,4.881-5.912\n\t\tc0.749-4.92,1.099-9.12,1.099-13.219S173.894,78.829,173.145,73.91z M158.949,93.72l-12.878,4.58\n\t\tc-2.251,0.797-3.982,2.625-4.66,4.92c-1.15,3.889-2.664,7.569-4.504,10.943c-1.142,2.1-1.213,4.619-0.187,6.777l5.841,12.285\n\t\tc-2.822,3.389-5.943,6.515-9.337,9.334l-12.283-5.834c-2.161-1.036-4.672-0.953-6.775,0.185c-3.379,1.838-7.061,3.35-10.953,4.502\n\t\tc-2.29,0.676-4.118,2.406-4.917,4.657l-4.582,12.883c-4.677,0.476-8.503,0.476-13.18,0l-4.582-12.883\n\t\tc-0.8-2.246-2.628-3.982-4.917-4.657c-3.894-1.152-7.579-2.664-10.953-4.502c-2.103-1.147-4.619-1.22-6.775-0.185l-12.283,5.839\n\t\tc-3.391-2.825-6.512-5.946-9.337-9.339l5.841-12.285c1.026-2.159,0.955-4.677-0.187-6.777c-1.835-3.364-3.35-7.049-4.504-10.948\n\t\tc-0.678-2.29-2.411-4.118-4.66-4.915l-12.878-4.58c-0.243-2.343-0.36-4.502-0.36-6.592s0.117-4.244,0.36-6.587l12.881-4.584\n\t\tc2.248-0.797,3.979-2.625,4.657-4.915c1.152-3.889,2.667-7.574,4.504-10.953c1.142-2.095,1.213-4.619,0.187-6.772l-5.841-12.285\n\t\tc2.827-3.393,5.948-6.519,9.337-9.339l12.288,5.839c2.151,1.036,4.677,0.953,6.775-0.185c3.372-1.838,7.054-3.35,10.948-4.502\n\t\tc2.29-0.676,4.118-2.411,4.917-4.657l4.582-12.883c4.633-0.481,8.466-0.481,13.18,0l4.582,12.883\n\t\tc0.8,2.246,2.628,3.982,4.917,4.657c3.894,1.152,7.579,2.664,10.953,4.502c2.103,1.147,4.614,1.22,6.775,0.185l12.283-5.839\n\t\tc3.389,2.82,6.51,5.946,9.337,9.339l-5.841,12.285c-1.026,2.154-0.955,4.677,0.187,6.772c1.843,3.389,3.357,7.069,4.504,10.948\n\t\tc0.678,2.295,2.409,4.123,4.66,4.92l12.878,4.58c0.243,2.343,0.36,4.502,0.36,6.592S159.192,91.377,158.949,93.72z");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(path0, file, 3, 1, 172);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(path1, "d", "M87.124,50.802c-19.062,0-34.571,15.508-34.571,34.571s15.508,34.571,34.571,34.571s34.571-15.508,34.571-34.571\n\t\tS106.186,50.802,87.124,50.802z M87.124,105.009c-10.827,0-19.636-8.809-19.636-19.636s8.809-19.636,19.636-19.636\n\t\ts19.636,8.809,19.636,19.636S97.951,105.009,87.124,105.009z");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(path1, file, 29, 1, 3165);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(g, file, 2, 0, 167);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "version", "1.1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "xmlns", "http://www.w3.org/2000/svg");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "x", "0px");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "y", "0px");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "viewBox", "0 0 174.248 174.248");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "xml:space", "preserve");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(svg, file, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, svg, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(svg, g);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(g, path0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(g, path1);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(svg);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Gear', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Gear> was created with unknown prop '${key}'`);
	});

	return [];
}

class Gear extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Gear",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gear);



/***/ }),

/***/ "./src/icons/triangle.svg":
/*!********************************!*\
  !*** ./src/icons/triangle.svg ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_loader_3_1_3_svelte_3_49_0_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _mnt_BIGD_projects_hfy_epub_node_modules_pnpm_svelte_hmr_0_14_12_svelte_3_49_0_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* src/icons/triangle.svg generated by Svelte v3.49.0 */


const file = "src/icons/triangle.svg";

function create_fragment(ctx) {
	let svg;
	let polygon;

	const block = {
		c: function create() {
			svg = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("svg");
			polygon = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.svg_element)("polygon");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(polygon, "points", "0,490 490,490 245,0");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(polygon, file, 1, 0, 158);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "version", "1.1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "xmlns", "http://www.w3.org/2000/svg");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "x", "0px");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "y", "0px");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "viewBox", "0 0 490 490");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(svg, "xml:space", "preserve");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(svg, file, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, svg, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(svg, polygon);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(svg);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Triangle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Triangle> was created with unknown prop '${key}'`);
	});

	return [];
}

class Triangle extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Triangle",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Triangle);



/***/ }),

/***/ "./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte-loader@3.1.3_svelte@3.49.0/node_modules/svelte-loader/lib/hot-api.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyHmr": () => (/* binding */ applyHmr)
/* harmony export */ });
/* harmony import */ var svelte_hmr_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte-hmr/runtime */ "./node_modules/.pnpm/svelte-hmr@0.14.12_svelte@3.49.0/node_modules/svelte-hmr/runtime/index.js");


// eslint-disable-next-line no-undef
const g = typeof window !== 'undefined' ? window : __webpack_require__.g;

const globalKey =
	typeof Symbol !== 'undefined'
		? Symbol('SVELTE_LOADER_HOT')
		: '__SVELTE_LOADER_HOT';

if (!g[globalKey]) {
	// do updating refs counting to know when a full update has been applied
	let updatingCount = 0;

	const notifyStart = () => {
		updatingCount++;
	};

	const notifyError = reload => err => {
		const errString = (err && err.stack) || err;
		// eslint-disable-next-line no-console
		console.error(
			'[HMR] Failed to accept update (nollup compat mode)',
			errString
		);
		reload();
		notifyEnd();
	};

	const notifyEnd = () => {
		updatingCount--;
		if (updatingCount === 0) {
			// NOTE this message is important for timing in tests
			// eslint-disable-next-line no-console
			console.log('[HMR:Svelte] Up to date');
		}
	};

	g[globalKey] = {
		hotStates: {},
		notifyStart,
		notifyError,
		notifyEnd,
	};
}

const runAcceptHandlers = acceptHandlers => {
	const queue = [...acceptHandlers];
	const next = () => {
		const cur = queue.shift();
		if (cur) {
			return cur(null).then(next);
		} else {
			return Promise.resolve(null);
		}
	};
	return next();
};

const applyHmr = (0,svelte_hmr_runtime__WEBPACK_IMPORTED_MODULE_0__.makeApplyHmr)(args => {
	const { notifyStart, notifyError, notifyEnd } = g[globalKey];
	const { m, reload } = args;

	let acceptHandlers = (m.hot.data && m.hot.data.acceptHandlers) || [];
	let nextAcceptHandlers = [];

	m.hot.dispose(data => {
		data.acceptHandlers = nextAcceptHandlers;
	});

	const dispose = (...args) => m.hot.dispose(...args);

	const accept = handler => {
		if (nextAcceptHandlers.length === 0) {
			m.hot.accept();
		}
		nextAcceptHandlers.push(handler);
	};

	const check = status => {
		if (status === 'ready') {
			notifyStart();
		} else if (status === 'idle') {
			runAcceptHandlers(acceptHandlers)
				.then(notifyEnd)
				.catch(notifyError(reload));
		}
	};

	m.hot.addStatusHandler(check);

	m.hot.dispose(() => {
		m.hot.removeStatusHandler(check);
	});

	const hot = {
		data: m.hot.data,
		dispose,
		accept,
	};

	return { ...args, hot };
});


/***/ }),

/***/ "./src/configstore.ts":
/*!****************************!*\
  !*** ./src/configstore.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChapterTransformType": () => (/* binding */ ChapterTransformType),
/* harmony export */   "NextLinkType": () => (/* binding */ NextLinkType),
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "defaultConfig": () => (/* binding */ defaultConfig),
/* harmony export */   "loadConfig": () => (/* binding */ loadConfig),
/* harmony export */   "toValidConfig": () => (/* binding */ toValidConfig)
/* harmony export */ });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/store/index.mjs");

var NextLinkType;
(function (NextLinkType) {
    NextLinkType[NextLinkType["DEFAULT"] = 0] = "DEFAULT";
    NextLinkType[NextLinkType["REGEXP"] = 1] = "REGEXP";
    NextLinkType[NextLinkType["FUNCTION"] = 2] = "FUNCTION";
})(NextLinkType || (NextLinkType = {}));
;
var ChapterTransformType;
(function (ChapterTransformType) {
    ChapterTransformType[ChapterTransformType["NONE"] = 0] = "NONE";
    ChapterTransformType[ChapterTransformType["REGEXP"] = 1] = "REGEXP";
    ChapterTransformType[ChapterTransformType["SELECTOR"] = 2] = "SELECTOR";
    ChapterTransformType[ChapterTransformType["FUNCTION"] = 3] = "FUNCTION";
})(ChapterTransformType || (ChapterTransformType = {}));
;
const defaultConfig = {
    useTiny: true,
    nextLink: NextLinkType.DEFAULT,
    nextLinkRegex: `href="([^"]+)"[^>]*>\\s*Next`,
    nextLinkFn: `return "https://www.reddit.com/r/HFY/comments/f94rak/oc_pthok_eats_an_ice_cream_cone/"`,
    transform: ChapterTransformType.NONE,
    transformRegex: '.md',
    transformSelector: '',
    transformFn: `title = "P'Thok Eats an Ice Cream Cone"
html = "https://www.reddit.com/r/HFY/comments/f94rak/oc_pthok_eats_an_ice_cream_cone/"`,
};
const config = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)(defaultConfig);
const toValidConfig = (nconf) => {
    if (!nconf || '' + nconf !== "[object Object]")
        return defaultConfig;
    const nk = Object.keys(nconf), dk = Object.keys(defaultConfig);
    for (const k of dk) {
        if (!nk.includes(k))
            nconf[k] = defaultConfig[k];
        if (typeof defaultConfig[k] !== typeof nconf[k])
            nconf[k] = defaultConfig[k];
    }
    return nconf;
};
const loadConfig = () => {
    try {
        const nconf = JSON.parse(localStorage.getItem('config'));
        config.set(toValidConfig(nconf));
    }
    catch (_a) { }
};


/***/ }),

/***/ "./src/fetch.ts":
/*!**********************!*\
  !*** ./src/fetch.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "retryFetch": () => (/* binding */ retryFetch)
/* harmony export */ });
const fetchable = async (url, timeout) => {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const out = setTimeout(() => controller.abort && controller.abort(), timeout);
    try {
        return await fetch(url, { signal: controller.signal });
    }
    finally {
        clearTimeout(out);
    }
};
const retryFetch = async (url, timeout = 10000, retry = 3) => {
    for (let i = 0; i < retry - 1; i++) {
        try {
            return await fetchable(url, timeout);
        }
        catch (_a) {
            console.log(`Failed to fetch \`${url}\` ${i + 1} ${i === 0 ? 'time' : 'times'}. Retrying...`);
        }
    }
    // last try, no catching
    return fetchable(url, timeout);
};


/***/ }),

/***/ "./src/sources/cors.ts":
/*!*****************************!*\
  !*** ./src/sources/cors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getGenericData": () => (/* binding */ getGenericData)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "./node_modules/.pnpm/nanoid@4.0.0/node_modules/nanoid/index.browser.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");


const getGenericData = (content) => {
    const doc = (0,_util__WEBPACK_IMPORTED_MODULE_0__.stringToDocument)(content);
    return {
        title: doc.title,
        author: 'unkown',
        chapters: Array.from(doc.querySelectorAll('ul a, ol a')).map(item => ({
            apiUrl: item.href,
            id: (0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)(),
            title: item.textContent,
        })),
    };
};


/***/ }),

/***/ "./src/sources/fn.ts":
/*!***************************!*\
  !*** ./src/sources/fn.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sandboxFn": () => (/* binding */ sandboxFn)
/* harmony export */ });
const sandboxFn = (fn) => {
    const code = `with (sandbox) {${fn}}`;
    const func = new Function('sandbox', code);
    const ctx = Object.create(null);
    ctx['console'] = { log: console.log, table: console.table, error: console.error, assert: console.assert };
    const proxy = new Proxy(ctx, { has, get });
    return (closure) => {
        Object.defineProperties(proxy, closure);
        return { proxy, ret: func(proxy) };
    };
};
function has(target, key) {
    return true;
}
function get(target, key) {
    if (key === Symbol.unscopables)
        return undefined;
    return target[key];
}


/***/ }),

/***/ "./src/sources/hfy.ts":
/*!****************************!*\
  !*** ./src/sources/hfy.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllSeries": () => (/* binding */ getAllSeries),
/* harmony export */   "getSeriesPageData": () => (/* binding */ getSeriesPageData),
/* harmony export */   "isSeriesPage": () => (/* binding */ isSeriesPage)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nanoid */ "./node_modules/.pnpm/nanoid@4.0.0/node_modules/nanoid/index.browser.js");
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fetch */ "./src/fetch.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _re__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./re */ "./src/sources/re.ts");




const seriesPageMatch = /^https?:\/\/(?:[^.]+\.)?reddit\.com\/r\/hfy\/wiki\/series\//i;
const isSeriesPage = (search) => !!search.match(seriesPageMatch);
const getSeriesPageData = ({ data: { content_md, content_html } }) => {
    var _a, _b, _c;
    const content = new DOMParser().parseFromString((0,_util__WEBPACK_IMPORTED_MODULE_1__.decode)(content_html), 'text/html');
    const links = content.querySelectorAll('a[href]');
    return ({
        author: (_a = content_md.match(/\[\*\*(?:Author\s*[-:]\s*)?([^*\]]+)\*\*\]|A Story By \[(?:\*\*)?([^\]]+?)(?:\*\*)?\]/i).slice(1).find(Boolean)) === null || _a === void 0 ? void 0 : _a.trim(),
        title: (_c = (_b = content_md.match(/##?\s*\*\*(.+)\*\*/)) === null || _b === void 0 ? void 0 : _b[1]) === null || _c === void 0 ? void 0 : _c.trim(),
        chapters: Array.from(links).filter(n => n.getAttribute('href').match(_re__WEBPACK_IMPORTED_MODULE_2__.commentLink)).map(n => {
            const url = n.getAttribute('href').startsWith('http') ? n.getAttribute('href') : `https://www.reddit.com${n.getAttribute('href')}`;
            return ({
                id: (0,nanoid__WEBPACK_IMPORTED_MODULE_3__.nanoid)(),
                title: n.textContent.trim(),
                apiUrl: (0,_util__WEBPACK_IMPORTED_MODULE_1__.toApiCall)(url),
                displayUrl: url,
            });
        })
    });
};
const getAllSeries = async (search) => {
    const res = await (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.retryFetch)(`https://${_util__WEBPACK_IMPORTED_MODULE_1__.redditApiBase}/r/hfy/wiki/series.json`);
    const json = await res.json();
    if (!res.ok)
        throw json.message;
    const content = json.data.content_md;
    const all = [...content.matchAll(/\[([^\]]+)\]\s*\(((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/hfy\/wiki\/series\/[^)]+)\)\s*(?:\[\*([^\]]+)\*\])?/igm)].map(matches => ({
        title: matches[1],
        author: matches[3],
        url: (0,_util__WEBPACK_IMPORTED_MODULE_1__.toApiCall)(matches[2].startsWith('http') ? matches[2] : `https://${_util__WEBPACK_IMPORTED_MODULE_1__.redditApiBase}${matches[2]}`),
    }));
    if (!search)
        return all;
    const searchSmall = search.toLowerCase();
    return all.filter(s => s.title.toLowerCase().indexOf(searchSmall) !== -1);
};


/***/ }),

/***/ "./src/sources/index.ts":
/*!******************************!*\
  !*** ./src/sources/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Source": () => (/* binding */ Source),
/* harmony export */   "fetchBookData": () => (/* binding */ fetchBookData),
/* harmony export */   "findNextLink": () => (/* binding */ findNextLink),
/* harmony export */   "findNextLinkDefault": () => (/* binding */ findNextLinkDefault),
/* harmony export */   "findNextLinkFn": () => (/* binding */ findNextLinkFn),
/* harmony export */   "findNextLinkRegexp": () => (/* binding */ findNextLinkRegexp),
/* harmony export */   "getDataFromSource": () => (/* binding */ getDataFromSource),
/* harmony export */   "getPostContent": () => (/* reexport safe */ _post__WEBPACK_IMPORTED_MODULE_6__.getPostContent),
/* harmony export */   "getSourceType": () => (/* binding */ getSourceType),
/* harmony export */   "requestToResource": () => (/* binding */ requestToResource),
/* harmony export */   "transformChapter": () => (/* binding */ transformChapter),
/* harmony export */   "transformChapterFn": () => (/* binding */ transformChapterFn),
/* harmony export */   "transformChapterRegexp": () => (/* binding */ transformChapterRegexp),
/* harmony export */   "transformChapterSelector": () => (/* binding */ transformChapterSelector),
/* harmony export */   "transformChapters": () => (/* binding */ transformChapters)
/* harmony export */ });
/* harmony import */ var _configstore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../configstore */ "./src/configstore.ts");
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fetch */ "./src/fetch.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cors */ "./src/sources/cors.ts");
/* harmony import */ var _fn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fn */ "./src/sources/fn.ts");
/* harmony import */ var _hfy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hfy */ "./src/sources/hfy.ts");
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./post */ "./src/sources/post.ts");
/* harmony import */ var _re__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./re */ "./src/sources/re.ts");









var Source;
(function (Source) {
    Source[Source["HFY_SERIES"] = 0] = "HFY_SERIES";
    Source[Source["POST"] = 1] = "POST";
    Source[Source["GENERIC"] = 2] = "GENERIC";
    Source[Source["SEARCH"] = 3] = "SEARCH";
})(Source || (Source = {}));
;
const parser = new DOMParser();
const getSourceType = (search) => {
    try {
        new URL(search); // verify that it is a valid url
        if ((0,_hfy__WEBPACK_IMPORTED_MODULE_5__.isSeriesPage)(search))
            return Source.HFY_SERIES;
        if ((0,_post__WEBPACK_IMPORTED_MODULE_6__.isPost)(search))
            return Source.POST;
        return Source.GENERIC;
    }
    catch (_a) { }
    return Source.SEARCH;
};
const requestToResource = (series, res) => {
    if (series.type == Source.GENERIC)
        return res.text();
    return res.json();
};
const getDataFromSource = (source, json) => {
    switch (source) {
        case Source.HFY_SERIES:
            return (0,_hfy__WEBPACK_IMPORTED_MODULE_5__.getSeriesPageData)(json);
        case Source.POST:
            return (0,_post__WEBPACK_IMPORTED_MODULE_6__.getPostData)(json);
        case Source.GENERIC:
            return (0,_cors__WEBPACK_IMPORTED_MODULE_3__.getGenericData)(json);
    }
    throw new Error(`Getting data from source type \`${Source[source]}\` not supported, this should never happen`);
};
const findNextLinkDefault = (html) => {
    const next = html.match(/href="([^"]+)"[^>]*>\s*Next/i);
    if (next)
        return next[1];
    const posts = [...html.matchAll(_re__WEBPACK_IMPORTED_MODULE_7__.commentLinkHTML)];
    // don't use "First Chapter", "Previous Chapter" or "Index" links
    const post = posts.reverse().find(match => {
        const t = match[3].toLowerCase();
        return !t.startsWith('first') && !t.startsWith('prev') && !t.startsWith('index');
    });
    if (post)
        return post[1];
};
let userNextRegex;
const findNextLinkRegexp = (html) => {
    const next = html.match(userNextRegex);
    if (next && next.length > 1)
        return next[1];
};
let userNextFn;
const findNextLinkFn = (html) => {
    let doc;
    const closure = {
        document: {
            get() { return doc = doc !== null && doc !== void 0 ? doc : parser.parseFromString(html, 'text/html'); },
            configurable: true,
        },
        html: {
            writable: false,
            value: html,
            configurable: true,
        },
    };
    return userNextFn(closure).ret;
};
const findNextLink = (config, html) => {
    switch (config.nextLink) {
        case _configstore__WEBPACK_IMPORTED_MODULE_0__.NextLinkType.DEFAULT: return findNextLinkDefault(html);
        case _configstore__WEBPACK_IMPORTED_MODULE_0__.NextLinkType.REGEXP: return findNextLinkRegexp(html);
        case _configstore__WEBPACK_IMPORTED_MODULE_0__.NextLinkType.FUNCTION: return findNextLinkFn(html);
    }
};
let userTransformRegex;
const transformChapterRegexp = (html) => {
    const next = html.match(userTransformRegex);
    if (next && next.length > 1)
        html = next[1];
    return html;
};
const transformChapterSelector = (sel, html) => {
    var _a;
    return (_a = parser.parseFromString(html, 'text/html').querySelector(sel)) === null || _a === void 0 ? void 0 : _a.innerHTML;
};
let userTransformFn;
const transformChapterFn = (chapter) => {
    let doc;
    const closure = {
        document: {
            get() { return doc = doc !== null && doc !== void 0 ? doc : parser.parseFromString(chapter.content || '', 'text/html'); },
            configurable: true,
        },
        title: {
            writable: true,
            value: chapter.title,
            configurable: true,
        },
        html: {
            writable: true,
            value: chapter.content,
            configurable: true,
        },
        url: {
            writable: true,
            value: chapter.displayUrl,
            configurable: true,
        },
    };
    const { proxy } = userTransformFn(closure);
    return Object.assign(Object.assign({}, chapter), { title: (0,_util__WEBPACK_IMPORTED_MODULE_2__.isString)(proxy.title) ? proxy.title : chapter.title, content: (0,_util__WEBPACK_IMPORTED_MODULE_2__.isString)(proxy.html) ? proxy.html : chapter.content, displayUrl: (0,_util__WEBPACK_IMPORTED_MODULE_2__.isString)(proxy.url) ? proxy.url : chapter.displayUrl });
};
const transformChapter = (config, chapter) => {
    switch (config.transform) {
        case _configstore__WEBPACK_IMPORTED_MODULE_0__.ChapterTransformType.NONE: return Object.assign({}, chapter);
        case _configstore__WEBPACK_IMPORTED_MODULE_0__.ChapterTransformType.REGEXP: return Object.assign(Object.assign({}, chapter), { content: transformChapterRegexp(chapter.content || '') });
        case _configstore__WEBPACK_IMPORTED_MODULE_0__.ChapterTransformType.SELECTOR: return Object.assign(Object.assign({}, chapter), { content: transformChapterSelector(config.transformSelector, chapter.content || '') });
        case _configstore__WEBPACK_IMPORTED_MODULE_0__.ChapterTransformType.FUNCTION: return transformChapterFn(chapter);
    }
};
const transformChapters = (config, chapters) => chapters.map(transformChapter.bind(null, config));
_configstore__WEBPACK_IMPORTED_MODULE_0__.config.subscribe(conf => {
    userNextRegex = new RegExp(conf.nextLinkRegex, 'i');
    userNextFn = (0,_fn__WEBPACK_IMPORTED_MODULE_4__.sandboxFn)(conf.nextLinkFn);
    userTransformRegex = new RegExp(conf.transformRegex, 'i');
    userTransformFn = (0,_fn__WEBPACK_IMPORTED_MODULE_4__.sandboxFn)(conf.transformFn);
});
const fetchBookData = async (series) => {
    var _a, _b;
    const res = await (0,_fetch__WEBPACK_IMPORTED_MODULE_1__.retryFetch)(series.url);
    const json = await requestToResource(series, res);
    if (!res.ok)
        throw '' + ((_a = json.message) !== null && _a !== void 0 ? _a : json);
    const data = getDataFromSource(series.type, json);
    if (!((_b = data === null || data === void 0 ? void 0 : data.chapters) === null || _b === void 0 ? void 0 : _b.length))
        throw new Error('No chapters found');
    return data;
};


/***/ }),

/***/ "./src/sources/post.ts":
/*!*****************************!*\
  !*** ./src/sources/post.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPostContent": () => (/* binding */ getPostContent),
/* harmony export */   "getPostData": () => (/* binding */ getPostData),
/* harmony export */   "isPost": () => (/* binding */ isPost)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");

const postMatch = /^https?:\/\/(?:[^.]+\.)?reddit\.com\/r\/([^/]+)\/comments\//i;
const isPost = (search) => !!search.match(postMatch);
const getPostContent = (json) => ({
    id: json[0].data.children[0].data.id,
    title: (json[0].data.children[0].data.title),
    content: (0,_util__WEBPACK_IMPORTED_MODULE_0__.decode)(json[0].data.children[0].data.selftext_html),
    apiUrl: (0,_util__WEBPACK_IMPORTED_MODULE_0__.toApiCall)(json[0].data.children[0].data.url),
    displayUrl: json[0].data.children[0].data.url,
    needsFetching: false,
});
const getPostData = (json) => ({
    author: json[0].data.children[0].data.author,
    title: (json[0].data.children[0].data.title),
    chapters: [getPostContent(json)],
});


/***/ }),

/***/ "./src/sources/re.ts":
/*!***************************!*\
  !*** ./src/sources/re.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commentLink": () => (/* binding */ commentLink),
/* harmony export */   "commentLinkHTML": () => (/* binding */ commentLinkHTML),
/* harmony export */   "commentLinkMD": () => (/* binding */ commentLinkMD)
/* harmony export */ });
const commentLink = /(?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/([^\/]+)\/comments\/.+/i;
const commentLinkMD = /\[([^\]]+)\]\s*\(((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/([^\/]+)\/comments\/[^)]+)\)/igm;
const commentLinkHTML = /href="((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/([^\/]+)\/comments\/[^"]+)"[^>]*>\s*([^<]+)/igm;


/***/ }),

/***/ "./src/stages.ts":
/*!***********************!*\
  !*** ./src/stages.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BookData": () => (/* binding */ BookData),
/* harmony export */   "DownloadChapters": () => (/* binding */ DownloadChapters),
/* harmony export */   "EditData": () => (/* binding */ EditData),
/* harmony export */   "FindChapters": () => (/* binding */ FindChapters),
/* harmony export */   "Input": () => (/* binding */ Input),
/* harmony export */   "Result": () => (/* binding */ Result),
/* harmony export */   "Search": () => (/* binding */ Search),
/* harmony export */   "Settings": () => (/* binding */ Settings),
/* harmony export */   "Stage": () => (/* binding */ Stage),
/* harmony export */   "StageData": () => (/* binding */ StageData),
/* harmony export */   "_404": () => (/* binding */ _404),
/* harmony export */   "back": () => (/* binding */ back),
/* harmony export */   "is": () => (/* binding */ is),
/* harmony export */   "loadFromHistory": () => (/* binding */ loadFromHistory),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/store/index.mjs");
/* harmony import */ var _sources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sources */ "./src/sources/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.ts");



var Stage;
(function (Stage) {
    Stage[Stage["INPUT"] = 0] = "INPUT";
    Stage[Stage["SEARCH"] = 1] = "SEARCH";
    Stage[Stage["BOOK_DATA"] = 2] = "BOOK_DATA";
    Stage[Stage["EDIT_DATA"] = 3] = "EDIT_DATA";
    Stage[Stage["FIND_CHAPTERS"] = 4] = "FIND_CHAPTERS";
    Stage[Stage["DOWNLOAD_CHAPTERS"] = 5] = "DOWNLOAD_CHAPTERS";
    Stage[Stage["RESULT"] = 6] = "RESULT";
    Stage[Stage["SETTINGS"] = 7] = "SETTINGS";
    Stage[Stage["_404"] = 8] = "_404";
})(Stage || (Stage = {}));
;
const toUrl = (stage) => stage === Stage.INPUT ? __webpack_require__.p : `${__webpack_require__.p}${Stage[stage].toLowerCase().replace(/_/g, '-')}`;
class StageData {
    dump() { return []; }
}
class Input extends StageData {
    constructor() {
        super(...arguments);
        this.stage = Stage.INPUT;
    }
    next(search) {
        const input = (0,_sources__WEBPACK_IMPORTED_MODULE_1__.getSourceType)(search);
        store.update(s => (Object.assign(Object.assign({}, s), { search, series: input !== _sources__WEBPACK_IMPORTED_MODULE_1__.Source.SEARCH ? { url: (0,_util__WEBPACK_IMPORTED_MODULE_2__.toApiCall)(search), type: input } : s.series })));
        switch (input) {
            case _sources__WEBPACK_IMPORTED_MODULE_1__.Source.SEARCH:
                return next(Search);
            default:
                return next(BookData);
        }
    }
}
class Search extends StageData {
    constructor() {
        super(...arguments);
        this.stage = Stage.SEARCH;
    }
    next(series) {
        store.update(s => (Object.assign(Object.assign({}, s), { series })));
        return next(BookData);
    }
}
class BookData extends StageData {
    constructor(bookData = undefined, newChapters = undefined) {
        super();
        this.bookData = bookData;
        this.newChapters = newChapters;
        this.stage = Stage.BOOK_DATA;
    }
    next(data) { return next(Result, data); }
    edit(data) { return next(EditData, data); }
    findMore(data) { return next(FindChapters, data); }
    downloadAll(data) { return next(DownloadChapters, data); }
    dump() { return [this.bookData, this.newChapters]; }
}
class EditData extends StageData {
    constructor(bookData) {
        super();
        this.bookData = bookData;
        this.stage = Stage.EDIT_DATA;
        this.needsSaving = true;
        if (!bookData)
            throw new Error('bookData must be defined');
    }
    next(data) { return next(BookData, data); }
    dump() { return [this.bookData]; }
}
class FindChapters extends StageData {
    constructor(bookData) {
        super();
        this.bookData = bookData;
        this.stage = Stage.FIND_CHAPTERS;
        this.needsSaving = true;
        if (!bookData)
            throw new Error('bookData must be defined');
    }
    next(data, n) { return next(BookData, data, n); }
    dump() { return [this.bookData]; }
}
class DownloadChapters extends StageData {
    constructor(bookData) {
        super();
        this.bookData = bookData;
        this.stage = Stage.DOWNLOAD_CHAPTERS;
        this.needsSaving = true;
        if (!bookData)
            throw new Error('bookData must be defined');
    }
    next(data) { return next(BookData, data); }
    dump() { return [this.bookData]; }
}
class Result extends StageData {
    constructor(bookData) {
        super();
        this.bookData = bookData;
        this.stage = Stage.RESULT;
        if (!bookData)
            throw new Error('bookData must be defined');
    }
    next() { return next(BookData, this.bookData); }
    dump() { return [this.bookData]; }
}
class Settings extends StageData {
    constructor() {
        super(...arguments);
        this.stage = Stage.SETTINGS;
    }
    next() { return back(); }
}
class _404 extends StageData {
    constructor() {
        super(...arguments);
        this.stage = Stage._404;
    }
    next() { return back(); }
}
const StageMapping = {
    [Stage.INPUT]: Input,
    [Stage.SEARCH]: Search,
    [Stage.BOOK_DATA]: BookData,
    [Stage.EDIT_DATA]: EditData,
    [Stage.FIND_CHAPTERS]: FindChapters,
    [Stage.DOWNLOAD_CHAPTERS]: DownloadChapters,
    [Stage.RESULT]: Result,
    [Stage.SETTINGS]: Settings,
    [Stage._404]: _404,
};
function next(typ, ...args) {
    store.update(s => {
        const n = new typ(...args);
        n.from = s.stage;
        try {
            history.pushState({ data: n.dump(), search: s.search, series: s.series }, '', toUrl(n.stage));
        }
        catch (_a) {
            history.pushState({ data: [], search: s.search, series: s.series }, '', toUrl(n.stage));
            console.error('Data too large! Caution, forwards/backwards won\'t work as expected!');
        }
        return Object.assign(Object.assign({}, s), { stage: n });
    });
}
;
function nextFromEnum(typ, { data, search, series } = {}) {
    data = data || [];
    store.update(s => {
        try {
            // @ts-ignore
            const n = new StageMapping[typ](...data);
            if (n.stage === s.stage.stage)
                return s; // no need to move if already here
            n.from = s.stage;
            return Object.assign(Object.assign({}, s), { search, series, stage: n });
        }
        catch (e) {
            console.group('Failed to update page');
            console.error(e);
            console.log('Parameters:', typ, data, search);
            console.groupEnd();
            history.pushState({ data: [], search: s.search, series: s.series }, '', '/');
            return s;
        }
    });
}
function back() {
    history.back();
}
function is(stage, type) {
    return !!stage && stage.stage === type;
}
const store = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)({ stage: new Input() });
const pathRegex = new RegExp('^' + __webpack_require__.p.replace('/', '\/'));
const loadFromHistory = () => {
    window.removeEventListener('popstate', handlePopState);
    window.addEventListener('popstate', handlePopState);
    handlePopState();
};
const loadStateFromLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('state'));
    }
    catch (_a) {
        return undefined;
    }
};
const handlePopState = () => {
    const path = location.pathname.replace(pathRegex, '').split('/')[0] || '';
    if (path.length > 60)
        return;
    if (path === "")
        return nextFromEnum(Stage.INPUT);
    const stage = path.toUpperCase().replace(/-/g, '_');
    const state = history.state || loadStateFromLocalStorage() || {};
    if (stage in Stage)
        return nextFromEnum(Stage[stage], state);
    return nextFromEnum(Stage._404);
};


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiToRegular": () => (/* binding */ apiToRegular),
/* harmony export */   "copyData": () => (/* binding */ copyData),
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "redditApiBase": () => (/* binding */ redditApiBase),
/* harmony export */   "stringToDocument": () => (/* binding */ stringToDocument),
/* harmony export */   "toApiCall": () => (/* binding */ toApiCall)
/* harmony export */ });
/* harmony import */ var svelte_easing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/easing */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/easing/index.mjs");

const redditApiBase = 'www.reddit.com';
const toApiCall = (url) => {
    if (!(url instanceof URL))
        url = new URL(url);
    url.hostname = redditApiBase;
    if (url.pathname.endsWith('/'))
        url.pathname = `${url.pathname.slice(0, url.pathname.length - 1)}.json`;
    else if (!url.pathname.endsWith('.json'))
        url.pathname += '.json';
    url.protocol = 'https';
    url.search = '';
    url.hash = '';
    return url.toString();
};
const apiToRegular = (url) => url.slice(0, -5).replace('https://api', 'https://www');
// https://stackoverflow.com/a/34064434/
const decode = (() => {
    const parser = new DOMParser();
    return (text) => parser.parseFromString(text, 'text/html').documentElement.textContent;
})();
const stringToDocument = (() => {
    const parser = new DOMParser();
    return (text) => parser.parseFromString(text, 'text/html');
})();
const copyData = (bookData) => (Object.assign(Object.assign({}, bookData), { chapters: bookData.chapters.map(c => (Object.assign({}, c))) }));
function isString(input) { return typeof input === "string" || input instanceof String; }
function fold(node, { delay = 0, duration = 200, prop = 'height', easing = svelte_easing__WEBPACK_IMPORTED_MODULE_0__.cubicOut, } = {}) {
    const style = getComputedStyle(node);
    const curval = style[prop];
    if (!isString(curval) || !curval.endsWith('px'))
        throw new Error(`invalid property '${prop}' does not return pixels`);
    const px = +curval.slice(0, -2);
    return {
        delay,
        duration,
        easing,
        css: t => `overflow: hidden; ${prop}: ${t * px}px`
    };
}


/***/ }),

/***/ "./node_modules/.pnpm/nanoid@4.0.0/node_modules/nanoid/index.browser.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/nanoid@4.0.0/node_modules/nanoid/index.browser.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/.pnpm/nanoid@4.0.0/node_modules/nanoid/url-alphabet/index.js");

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte > 62) {
      id += '-'
    } else {
      id += '_'
    }
    return id
  }, '')


/***/ }),

/***/ "./node_modules/.pnpm/nanoid@4.0.0/node_modules/nanoid/url-alphabet/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/.pnpm/nanoid@4.0.0/node_modules/nanoid/url-alphabet/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'


/***/ }),

/***/ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/easing/index.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/easing/index.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "backIn": () => (/* binding */ backIn),
/* harmony export */   "backInOut": () => (/* binding */ backInOut),
/* harmony export */   "backOut": () => (/* binding */ backOut),
/* harmony export */   "bounceIn": () => (/* binding */ bounceIn),
/* harmony export */   "bounceInOut": () => (/* binding */ bounceInOut),
/* harmony export */   "bounceOut": () => (/* binding */ bounceOut),
/* harmony export */   "circIn": () => (/* binding */ circIn),
/* harmony export */   "circInOut": () => (/* binding */ circInOut),
/* harmony export */   "circOut": () => (/* binding */ circOut),
/* harmony export */   "cubicIn": () => (/* binding */ cubicIn),
/* harmony export */   "cubicInOut": () => (/* binding */ cubicInOut),
/* harmony export */   "cubicOut": () => (/* binding */ cubicOut),
/* harmony export */   "elasticIn": () => (/* binding */ elasticIn),
/* harmony export */   "elasticInOut": () => (/* binding */ elasticInOut),
/* harmony export */   "elasticOut": () => (/* binding */ elasticOut),
/* harmony export */   "expoIn": () => (/* binding */ expoIn),
/* harmony export */   "expoInOut": () => (/* binding */ expoInOut),
/* harmony export */   "expoOut": () => (/* binding */ expoOut),
/* harmony export */   "linear": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.identity),
/* harmony export */   "quadIn": () => (/* binding */ quadIn),
/* harmony export */   "quadInOut": () => (/* binding */ quadInOut),
/* harmony export */   "quadOut": () => (/* binding */ quadOut),
/* harmony export */   "quartIn": () => (/* binding */ quartIn),
/* harmony export */   "quartInOut": () => (/* binding */ quartInOut),
/* harmony export */   "quartOut": () => (/* binding */ quartOut),
/* harmony export */   "quintIn": () => (/* binding */ quintIn),
/* harmony export */   "quintInOut": () => (/* binding */ quintInOut),
/* harmony export */   "quintOut": () => (/* binding */ quintOut),
/* harmony export */   "sineIn": () => (/* binding */ sineIn),
/* harmony export */   "sineInOut": () => (/* binding */ sineInOut),
/* harmony export */   "sineOut": () => (/* binding */ sineOut)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");


/*
Adapted from https://github.com/mattdesl
Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
*/
function backInOut(t) {
    const s = 1.70158 * 1.525;
    if ((t *= 2) < 1)
        return 0.5 * (t * t * ((s + 1) * t - s));
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}
function backIn(t) {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
}
function backOut(t) {
    const s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
}
function bounceOut(t) {
    const a = 4.0 / 11.0;
    const b = 8.0 / 11.0;
    const c = 9.0 / 10.0;
    const ca = 4356.0 / 361.0;
    const cb = 35442.0 / 1805.0;
    const cc = 16061.0 / 1805.0;
    const t2 = t * t;
    return t < a
        ? 7.5625 * t2
        : t < b
            ? 9.075 * t2 - 9.9 * t + 3.4
            : t < c
                ? ca * t2 - cb * t + cc
                : 10.8 * t * t - 20.52 * t + 10.72;
}
function bounceInOut(t) {
    return t < 0.5
        ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
        : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}
function bounceIn(t) {
    return 1.0 - bounceOut(1.0 - t);
}
function circInOut(t) {
    if ((t *= 2) < 1)
        return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}
function circIn(t) {
    return 1.0 - Math.sqrt(1.0 - t * t);
}
function circOut(t) {
    return Math.sqrt(1 - --t * t);
}
function cubicInOut(t) {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}
function cubicIn(t) {
    return t * t * t;
}
function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}
function elasticInOut(t) {
    return t < 0.5
        ? 0.5 *
            Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t) *
            Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
        : 0.5 *
            Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0)) *
            Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) +
            1.0;
}
function elasticIn(t) {
    return Math.sin((13.0 * t * Math.PI) / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}
function elasticOut(t) {
    return (Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0);
}
function expoInOut(t) {
    return t === 0.0 || t === 1.0
        ? t
        : t < 0.5
            ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
            : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
}
function expoIn(t) {
    return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}
function expoOut(t) {
    return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
}
function quadInOut(t) {
    t /= 0.5;
    if (t < 1)
        return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
}
function quadIn(t) {
    return t * t;
}
function quadOut(t) {
    return -t * (t - 2.0);
}
function quartInOut(t) {
    return t < 0.5
        ? +8.0 * Math.pow(t, 4.0)
        : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}
function quartIn(t) {
    return Math.pow(t, 4.0);
}
function quartOut(t) {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}
function quintInOut(t) {
    if ((t *= 2) < 1)
        return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
}
function quintIn(t) {
    return t * t * t * t * t;
}
function quintOut(t) {
    return --t * t * t * t * t + 1;
}
function sineInOut(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
}
function sineIn(t) {
    const v = Math.cos(t * Math.PI * 0.5);
    if (Math.abs(v) < 1e-14)
        return 1;
    else
        return 1 - v;
}
function sineOut(t) {
    return Math.sin((t * Math.PI) / 2);
}




/***/ }),

/***/ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/index.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/index.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvelteComponent": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentTyped),
/* harmony export */   "afterUpdate": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.afterUpdate),
/* harmony export */   "beforeUpdate": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.beforeUpdate),
/* harmony export */   "createEventDispatcher": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.createEventDispatcher),
/* harmony export */   "getAllContexts": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getAllContexts),
/* harmony export */   "getContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.getContext),
/* harmony export */   "hasContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.hasContext),
/* harmony export */   "onDestroy": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onDestroy),
/* harmony export */   "onMount": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.onMount),
/* harmony export */   "setContext": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.setContext),
/* harmony export */   "tick": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.tick)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/index.mjs */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");



/***/ }),

/***/ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlTag": () => (/* binding */ HtmlTag),
/* harmony export */   "HtmlTagHydration": () => (/* binding */ HtmlTagHydration),
/* harmony export */   "SvelteComponent": () => (/* binding */ SvelteComponent),
/* harmony export */   "SvelteComponentDev": () => (/* binding */ SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* binding */ SvelteComponentTyped),
/* harmony export */   "SvelteElement": () => (/* binding */ SvelteElement),
/* harmony export */   "action_destroyer": () => (/* binding */ action_destroyer),
/* harmony export */   "add_attribute": () => (/* binding */ add_attribute),
/* harmony export */   "add_classes": () => (/* binding */ add_classes),
/* harmony export */   "add_flush_callback": () => (/* binding */ add_flush_callback),
/* harmony export */   "add_location": () => (/* binding */ add_location),
/* harmony export */   "add_render_callback": () => (/* binding */ add_render_callback),
/* harmony export */   "add_resize_listener": () => (/* binding */ add_resize_listener),
/* harmony export */   "add_styles": () => (/* binding */ add_styles),
/* harmony export */   "add_transform": () => (/* binding */ add_transform),
/* harmony export */   "afterUpdate": () => (/* binding */ afterUpdate),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "append_dev": () => (/* binding */ append_dev),
/* harmony export */   "append_empty_stylesheet": () => (/* binding */ append_empty_stylesheet),
/* harmony export */   "append_hydration": () => (/* binding */ append_hydration),
/* harmony export */   "append_hydration_dev": () => (/* binding */ append_hydration_dev),
/* harmony export */   "append_styles": () => (/* binding */ append_styles),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "attr": () => (/* binding */ attr),
/* harmony export */   "attr_dev": () => (/* binding */ attr_dev),
/* harmony export */   "attribute_to_object": () => (/* binding */ attribute_to_object),
/* harmony export */   "beforeUpdate": () => (/* binding */ beforeUpdate),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "binding_callbacks": () => (/* binding */ binding_callbacks),
/* harmony export */   "blank_object": () => (/* binding */ blank_object),
/* harmony export */   "bubble": () => (/* binding */ bubble),
/* harmony export */   "check_outros": () => (/* binding */ check_outros),
/* harmony export */   "children": () => (/* binding */ children),
/* harmony export */   "claim_component": () => (/* binding */ claim_component),
/* harmony export */   "claim_element": () => (/* binding */ claim_element),
/* harmony export */   "claim_html_tag": () => (/* binding */ claim_html_tag),
/* harmony export */   "claim_space": () => (/* binding */ claim_space),
/* harmony export */   "claim_svg_element": () => (/* binding */ claim_svg_element),
/* harmony export */   "claim_text": () => (/* binding */ claim_text),
/* harmony export */   "clear_loops": () => (/* binding */ clear_loops),
/* harmony export */   "component_subscribe": () => (/* binding */ component_subscribe),
/* harmony export */   "compute_rest_props": () => (/* binding */ compute_rest_props),
/* harmony export */   "compute_slots": () => (/* binding */ compute_slots),
/* harmony export */   "createEventDispatcher": () => (/* binding */ createEventDispatcher),
/* harmony export */   "create_animation": () => (/* binding */ create_animation),
/* harmony export */   "create_bidirectional_transition": () => (/* binding */ create_bidirectional_transition),
/* harmony export */   "create_component": () => (/* binding */ create_component),
/* harmony export */   "create_in_transition": () => (/* binding */ create_in_transition),
/* harmony export */   "create_out_transition": () => (/* binding */ create_out_transition),
/* harmony export */   "create_slot": () => (/* binding */ create_slot),
/* harmony export */   "create_ssr_component": () => (/* binding */ create_ssr_component),
/* harmony export */   "current_component": () => (/* binding */ current_component),
/* harmony export */   "custom_event": () => (/* binding */ custom_event),
/* harmony export */   "dataset_dev": () => (/* binding */ dataset_dev),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "destroy_block": () => (/* binding */ destroy_block),
/* harmony export */   "destroy_component": () => (/* binding */ destroy_component),
/* harmony export */   "destroy_each": () => (/* binding */ destroy_each),
/* harmony export */   "detach": () => (/* binding */ detach),
/* harmony export */   "detach_after_dev": () => (/* binding */ detach_after_dev),
/* harmony export */   "detach_before_dev": () => (/* binding */ detach_before_dev),
/* harmony export */   "detach_between_dev": () => (/* binding */ detach_between_dev),
/* harmony export */   "detach_dev": () => (/* binding */ detach_dev),
/* harmony export */   "dirty_components": () => (/* binding */ dirty_components),
/* harmony export */   "dispatch_dev": () => (/* binding */ dispatch_dev),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "element": () => (/* binding */ element),
/* harmony export */   "element_is": () => (/* binding */ element_is),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "end_hydrating": () => (/* binding */ end_hydrating),
/* harmony export */   "escape": () => (/* binding */ escape),
/* harmony export */   "escape_attribute_value": () => (/* binding */ escape_attribute_value),
/* harmony export */   "escape_object": () => (/* binding */ escape_object),
/* harmony export */   "exclude_internal_props": () => (/* binding */ exclude_internal_props),
/* harmony export */   "fix_and_destroy_block": () => (/* binding */ fix_and_destroy_block),
/* harmony export */   "fix_and_outro_and_destroy_block": () => (/* binding */ fix_and_outro_and_destroy_block),
/* harmony export */   "fix_position": () => (/* binding */ fix_position),
/* harmony export */   "flush": () => (/* binding */ flush),
/* harmony export */   "getAllContexts": () => (/* binding */ getAllContexts),
/* harmony export */   "getContext": () => (/* binding */ getContext),
/* harmony export */   "get_all_dirty_from_scope": () => (/* binding */ get_all_dirty_from_scope),
/* harmony export */   "get_binding_group_value": () => (/* binding */ get_binding_group_value),
/* harmony export */   "get_current_component": () => (/* binding */ get_current_component),
/* harmony export */   "get_custom_elements_slots": () => (/* binding */ get_custom_elements_slots),
/* harmony export */   "get_root_for_style": () => (/* binding */ get_root_for_style),
/* harmony export */   "get_slot_changes": () => (/* binding */ get_slot_changes),
/* harmony export */   "get_spread_object": () => (/* binding */ get_spread_object),
/* harmony export */   "get_spread_update": () => (/* binding */ get_spread_update),
/* harmony export */   "get_store_value": () => (/* binding */ get_store_value),
/* harmony export */   "globals": () => (/* binding */ globals),
/* harmony export */   "group_outros": () => (/* binding */ group_outros),
/* harmony export */   "handle_promise": () => (/* binding */ handle_promise),
/* harmony export */   "hasContext": () => (/* binding */ hasContext),
/* harmony export */   "has_prop": () => (/* binding */ has_prop),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "insert": () => (/* binding */ insert),
/* harmony export */   "insert_dev": () => (/* binding */ insert_dev),
/* harmony export */   "insert_hydration": () => (/* binding */ insert_hydration),
/* harmony export */   "insert_hydration_dev": () => (/* binding */ insert_hydration_dev),
/* harmony export */   "intros": () => (/* binding */ intros),
/* harmony export */   "invalid_attribute_name_character": () => (/* binding */ invalid_attribute_name_character),
/* harmony export */   "is_client": () => (/* binding */ is_client),
/* harmony export */   "is_crossorigin": () => (/* binding */ is_crossorigin),
/* harmony export */   "is_empty": () => (/* binding */ is_empty),
/* harmony export */   "is_function": () => (/* binding */ is_function),
/* harmony export */   "is_promise": () => (/* binding */ is_promise),
/* harmony export */   "is_void": () => (/* binding */ is_void),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "listen_dev": () => (/* binding */ listen_dev),
/* harmony export */   "loop": () => (/* binding */ loop),
/* harmony export */   "loop_guard": () => (/* binding */ loop_guard),
/* harmony export */   "merge_ssr_styles": () => (/* binding */ merge_ssr_styles),
/* harmony export */   "missing_component": () => (/* binding */ missing_component),
/* harmony export */   "mount_component": () => (/* binding */ mount_component),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "not_equal": () => (/* binding */ not_equal),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "null_to_empty": () => (/* binding */ null_to_empty),
/* harmony export */   "object_without_properties": () => (/* binding */ object_without_properties),
/* harmony export */   "onDestroy": () => (/* binding */ onDestroy),
/* harmony export */   "onMount": () => (/* binding */ onMount),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "outro_and_destroy_block": () => (/* binding */ outro_and_destroy_block),
/* harmony export */   "prevent_default": () => (/* binding */ prevent_default),
/* harmony export */   "prop_dev": () => (/* binding */ prop_dev),
/* harmony export */   "query_selector_all": () => (/* binding */ query_selector_all),
/* harmony export */   "raf": () => (/* binding */ raf),
/* harmony export */   "run": () => (/* binding */ run),
/* harmony export */   "run_all": () => (/* binding */ run_all),
/* harmony export */   "safe_not_equal": () => (/* binding */ safe_not_equal),
/* harmony export */   "schedule_update": () => (/* binding */ schedule_update),
/* harmony export */   "select_multiple_value": () => (/* binding */ select_multiple_value),
/* harmony export */   "select_option": () => (/* binding */ select_option),
/* harmony export */   "select_options": () => (/* binding */ select_options),
/* harmony export */   "select_value": () => (/* binding */ select_value),
/* harmony export */   "self": () => (/* binding */ self),
/* harmony export */   "setContext": () => (/* binding */ setContext),
/* harmony export */   "set_attributes": () => (/* binding */ set_attributes),
/* harmony export */   "set_current_component": () => (/* binding */ set_current_component),
/* harmony export */   "set_custom_element_data": () => (/* binding */ set_custom_element_data),
/* harmony export */   "set_data": () => (/* binding */ set_data),
/* harmony export */   "set_data_dev": () => (/* binding */ set_data_dev),
/* harmony export */   "set_input_type": () => (/* binding */ set_input_type),
/* harmony export */   "set_input_value": () => (/* binding */ set_input_value),
/* harmony export */   "set_now": () => (/* binding */ set_now),
/* harmony export */   "set_raf": () => (/* binding */ set_raf),
/* harmony export */   "set_store_value": () => (/* binding */ set_store_value),
/* harmony export */   "set_style": () => (/* binding */ set_style),
/* harmony export */   "set_svg_attributes": () => (/* binding */ set_svg_attributes),
/* harmony export */   "space": () => (/* binding */ space),
/* harmony export */   "spread": () => (/* binding */ spread),
/* harmony export */   "src_url_equal": () => (/* binding */ src_url_equal),
/* harmony export */   "start_hydrating": () => (/* binding */ start_hydrating),
/* harmony export */   "stop_propagation": () => (/* binding */ stop_propagation),
/* harmony export */   "subscribe": () => (/* binding */ subscribe),
/* harmony export */   "svg_element": () => (/* binding */ svg_element),
/* harmony export */   "text": () => (/* binding */ text),
/* harmony export */   "tick": () => (/* binding */ tick),
/* harmony export */   "time_ranges_to_array": () => (/* binding */ time_ranges_to_array),
/* harmony export */   "to_number": () => (/* binding */ to_number),
/* harmony export */   "toggle_class": () => (/* binding */ toggle_class),
/* harmony export */   "transition_in": () => (/* binding */ transition_in),
/* harmony export */   "transition_out": () => (/* binding */ transition_out),
/* harmony export */   "trusted": () => (/* binding */ trusted),
/* harmony export */   "update_await_block_branch": () => (/* binding */ update_await_block_branch),
/* harmony export */   "update_keyed_each": () => (/* binding */ update_keyed_each),
/* harmony export */   "update_slot": () => (/* binding */ update_slot),
/* harmony export */   "update_slot_base": () => (/* binding */ update_slot_base),
/* harmony export */   "validate_component": () => (/* binding */ validate_component),
/* harmony export */   "validate_dynamic_element": () => (/* binding */ validate_dynamic_element),
/* harmony export */   "validate_each_argument": () => (/* binding */ validate_each_argument),
/* harmony export */   "validate_each_keys": () => (/* binding */ validate_each_keys),
/* harmony export */   "validate_slots": () => (/* binding */ validate_slots),
/* harmony export */   "validate_store": () => (/* binding */ validate_store),
/* harmony export */   "validate_void_dynamic_element": () => (/* binding */ validate_void_dynamic_element),
/* harmony export */   "xlink_attr": () => (/* binding */ xlink_attr)
/* harmony export */ });
function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function once(fn) {
    let ran = false;
    return function (...args) {
        if (ran)
            return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
// used internally for testing
function set_now(fn) {
    now = fn;
}
function set_raf(fn) {
    raf = fn;
}

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * For testing purposes only!
 */
function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
    let children = target.childNodes;
    // If target is <head>, there may be children without claim_order
    if (target.nodeName === 'HEAD') {
        const myChildren = [];
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.claim_order !== undefined) {
                myChildren.push(node);
            }
        }
        children = myChildren;
    }
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        // with fast path for when we are on the current longest subsequence
        const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
}
function append_hydration(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
            target.actual_end_child = target.firstChild;
        }
        // Skip nodes of undefined ordering
        while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
            target.actual_end_child = target.actual_end_child.nextSibling;
        }
        if (node !== target.actual_end_child) {
            // We only insert if the ordering of this node should be modified or the parent node is not target
            if (node.claim_order !== undefined || node.parentNode !== target) {
                target.insertBefore(node, target.actual_end_child);
            }
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target || node.nextSibling !== null) {
        target.appendChild(node);
    }
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append_hydration(target, node);
    }
    else if (node.parentNode !== target || node.nextSibling != anchor) {
        target.insertBefore(node, anchor || null);
    }
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
        if (has_prop(obj, k)
            // @ts-ignore
            && exclude.indexOf(k) === -1) {
            // @ts-ignore
            target[k] = obj[k];
        }
    }
    return target;
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
    };
}
function trusted(fn) {
    return function (event) {
        // @ts-ignore
        if (event.isTrusted)
            fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
    }
    else {
        attr(node, prop, value);
    }
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function init_claim_info(nodes) {
    if (nodes.claim_info === undefined) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    init_claim_info(nodes);
    const resultNode = (() => {
        // We first try to find an element after the previous one
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                else if (replacement === undefined) {
                    // Since we spliced before the last_index, we decrease it
                    nodes.claim_info.last_index--;
                }
                return node;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) {
                remove.push(attribute.name);
            }
        }
        remove.forEach(v => node.removeAttribute(v));
        return undefined;
    }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        const dataStr = '' + data;
        if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) {
                return node.splitText(dataStr.length);
            }
        }
        else {
            node.data = dataStr;
        }
    }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function find_comment(nodes, text, start) {
    for (let i = start; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 8 /* comment node */ && node.textContent.trim() === text) {
            return i;
        }
    }
    return nodes.length;
}
function claim_html_tag(nodes, is_svg) {
    // find html opening tag
    const start_index = find_comment(nodes, 'HTML_TAG_START', 0);
    const end_index = find_comment(nodes, 'HTML_TAG_END', start_index);
    if (start_index === end_index) {
        return new HtmlTagHydration(undefined, is_svg);
    }
    init_claim_info(nodes);
    const html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
    detach(html_tag_nodes[0]);
    detach(html_tag_nodes[html_tag_nodes.length - 1]);
    const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
    for (const n of claimed_nodes) {
        n.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
    }
    return new HtmlTagHydration(claimed_nodes, is_svg);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    }
    catch (e) {
        // do nothing
    }
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    select.selectedIndex = -1; // no option should be selected
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            if (this.is_svg)
                this.e = svg_element(target.nodeName);
            else
                this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
class HtmlTagHydration extends HtmlTag {
    constructor(claimed_nodes, is_svg = false) {
        super(is_svg);
        this.e = this.n = null;
        this.l = claimed_nodes;
    }
    c(html) {
        if (this.l) {
            this.n = this.l;
        }
        else {
            super.c(html);
        }
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert_hydration(this.t, this.n[i], anchor);
        }
    }
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}
function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node) => {
        result[node.slot || 'default'] = true;
    });
    return result;
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        managed_styles.forEach(info => {
            const { stylesheet } = info;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            info.rules = {};
        });
        managed_styles.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
function getAllContexts() {
    return get_current_component().$$.context;
}
function hasContext(key) {
    return get_current_component().$$.context.has(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            started = true;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = (program.b - t);
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            if (info.blocks[i] === block) {
                                info.blocks[i] = null;
                            }
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function update_await_block_branch(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved } = info;
    if (info.current === info.then) {
        child_ctx[info.value] = resolved;
    }
    if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
    }
    info.block.p(child_ctx, dirty);
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
    return void_element_names.test(name) || name.toLowerCase() === '!doctype';
}

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, attrs_to_add) {
    const attributes = Object.assign({}, ...args);
    if (attrs_to_add) {
        const classes_to_add = attrs_to_add.classes;
        const styles_to_add = attrs_to_add.styles;
        if (classes_to_add) {
            if (attributes.class == null) {
                attributes.class = classes_to_add;
            }
            else {
                attributes.class += ' ' + classes_to_add;
            }
        }
        if (styles_to_add) {
            if (attributes.style == null) {
                attributes.style = style_object_to_string(styles_to_add);
            }
            else {
                attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
            }
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += ' ' + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += ' ' + name;
        }
        else if (value != null) {
            str += ` ${name}="${value}"`;
        }
    });
    return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
    const style_object = {};
    for (const individual_style of style_attribute.split(';')) {
        const colon_index = individual_style.indexOf(':');
        const name = individual_style.slice(0, colon_index).trim();
        const value = individual_style.slice(colon_index + 1).trim();
        if (!name)
            continue;
        style_object[name] = value;
    }
    for (const name in style_directive) {
        const value = style_directive[name];
        if (value) {
            style_object[name] = value;
        }
        else {
            delete style_object[name];
        }
    }
    return style_object;
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 */
function escape(value, is_attr = false) {
    const str = String(value);
    const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
    pattern.lastIndex = 0;
    let escaped = '';
    let last = 0;
    while (pattern.test(str)) {
        const i = pattern.lastIndex - 1;
        const ch = str[i];
        escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : (ch === '"' ? '&quot;' : '&lt;'));
        last = i + 1;
    }
    return escaped + str.substring(last);
}
function escape_attribute_value(value) {
    // keep booleans, null, and undefined for the sake of `spread`
    const should_escape = typeof value === 'string' || (value && typeof value === 'object');
    return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = escape_attribute_value(obj[key]);
    }
    return result;
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return '';
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(context || (parent_component ? parent_component.$$.context : [])),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    const assignment = (boolean && value === true) ? '' : `="${escape(value, true)}"`;
    return ` ${name}${assignment}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : '';
}
function style_object_to_string(style_object) {
    return Object.keys(style_object)
        .filter(key => style_object[key])
        .map(key => `${key}: ${style_object[key]};`)
        .join(' ');
}
function add_styles(style_object) {
    const styles = style_object_to_string(style_object);
    return styles ? ` style="${styles}"` : '';
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            const { on_mount } = this.$$;
            this.$$.on_disconnect = on_mount.map(run).filter(is_function);
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        disconnectedCallback() {
            run_all(this.$$.on_disconnect);
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function append_hydration_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append_hydration(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function insert_hydration_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert_hydration(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
    }
}
function detach_before_dev(after) {
    while (after.previousSibling) {
        detach_dev(after.previousSibling);
    }
}
function detach_after_dev(before) {
    while (before.nextSibling) {
        detach_dev(before.nextSibling);
    }
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev('SvelteDOMSetDataset', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
function validate_dynamic_element(tag) {
    const is_string = typeof tag === 'string';
    if (tag && !is_string) {
        throw new Error('<svelte:element> expects "this" attribute to be a string.');
    }
}
function validate_void_dynamic_element(tag) {
    if (tag && is_void(tag)) {
        throw new Error(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
class SvelteComponentTyped extends SvelteComponentDev {
    constructor(options) {
        super(options);
    }
}
function loop_guard(timeout) {
    const start = Date.now();
    return () => {
        if (Date.now() - start > timeout) {
            throw new Error('Infinite loop detected');
        }
    };
}




/***/ }),

/***/ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/store/index.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/store/index.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "derived": () => (/* binding */ derived),
/* harmony export */   "get": () => (/* reexport safe */ _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.get_store_value),
/* harmony export */   "readable": () => (/* binding */ readable),
/* harmony export */   "writable": () => (/* binding */ writable)
/* harmony export */ });
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");



const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if ((0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal)(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.is_function)(result) ? result : _internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.subscribe)(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_0__.run_all)(unsubscribers);
            cleanup();
        };
    });
}




/***/ }),

/***/ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/transition/index.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/transition/index.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blur": () => (/* binding */ blur),
/* harmony export */   "crossfade": () => (/* binding */ crossfade),
/* harmony export */   "draw": () => (/* binding */ draw),
/* harmony export */   "fade": () => (/* binding */ fade),
/* harmony export */   "fly": () => (/* binding */ fly),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "slide": () => (/* binding */ slide)
/* harmony export */ });
/* harmony import */ var _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../easing/index.mjs */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/easing/index.mjs");
/* harmony import */ var _internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/index.mjs */ "./node_modules/.pnpm/svelte@3.49.0/node_modules/svelte/internal/index.mjs");



/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function blur(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicInOut, amount = 5, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const f = style.filter === 'none' ? '' : style.filter;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `opacity: ${target_opacity - (od * u)}; filter: ${f} blur(${u * amount}px);`
    };
}
function fade(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.linear } = {}) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
    };
}
function fly(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
    };
}
function slide(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut } = {}) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const border_top_width = parseFloat(style.borderTopWidth);
    const border_bottom_width = parseFloat(style.borderBottomWidth);
    return {
        delay,
        duration,
        easing,
        css: t => 'overflow: hidden;' +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `height: ${t * height}px;` +
            `padding-top: ${t * padding_top}px;` +
            `padding-bottom: ${t * padding_bottom}px;` +
            `margin-top: ${t * margin_top}px;` +
            `margin-bottom: ${t * margin_bottom}px;` +
            `border-top-width: ${t * border_top_width}px;` +
            `border-bottom-width: ${t * border_bottom_width}px;`
    };
}
function scale(node, { delay = 0, duration = 400, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut, start = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const sd = 1 - start;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
    };
}
function draw(node, { delay = 0, speed, duration, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicInOut } = {}) {
    let len = node.getTotalLength();
    const style = getComputedStyle(node);
    if (style.strokeLinecap !== 'butt') {
        len += parseInt(style.strokeWidth);
    }
    if (duration === undefined) {
        if (speed === undefined) {
            duration = 800;
        }
        else {
            duration = len / speed;
        }
    }
    else if (typeof duration === 'function') {
        duration = duration(len);
    }
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `stroke-dasharray: ${t * len} ${u * len}`
    };
}
function crossfade(_a) {
    var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
    const to_receive = new Map();
    const to_send = new Map();
    function crossfade(from, node, params) {
        const { delay = 0, duration = d => Math.sqrt(d) * 30, easing = _easing_index_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicOut } = (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.assign)((0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.assign)({}, defaults), params);
        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const opacity = +style.opacity;
        return {
            delay,
            duration: (0,_internal_index_mjs__WEBPACK_IMPORTED_MODULE_1__.is_function)(duration) ? duration(d) : duration,
            easing,
            css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
        };
    }
    function transition(items, counterparts, intro) {
        return (node, params) => {
            items.set(params.key, {
                rect: node.getBoundingClientRect()
            });
            return () => {
                if (counterparts.has(params.key)) {
                    const { rect } = counterparts.get(params.key);
                    counterparts.delete(params.key);
                    return crossfade(rect, node, params);
                }
                // if the node is disappearing altogether
                // (i.e. wasn't claimed by the other list)
                // then we need to supply an outro
                items.delete(params.key);
                return fallback && fallback(node, params, intro);
            };
        };
    }
    return [
        transition(to_send, to_receive, false),
        transition(to_receive, to_send, true)
    ];
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk prefetch function */
/******/ 	(() => {
/******/ 		__webpack_require__.F = {};
/******/ 		__webpack_require__.E = (chunkId) => {
/******/ 			Object.keys(__webpack_require__.F).map((key) => {
/******/ 				__webpack_require__.F[key](chunkId);
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "hfy-epub:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.F.j = (chunkId) => {
/******/ 			if((!__webpack_require__.o(installedChunks, chunkId) || installedChunks[chunkId] === undefined) && true) {
/******/ 				installedChunks[chunkId] = null;
/******/ 				var link = document.createElement('link');
/******/ 		
/******/ 				if (__webpack_require__.nc) {
/******/ 					link.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				link.rel = "prefetch";
/******/ 				link.as = "script";
/******/ 				link.href = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 				document.head.appendChild(link);
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkhfy_epub"] = self["webpackChunkhfy_epub"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup prefetch */
/******/ 	(() => {
/******/ 		__webpack_require__.O(0, ["main"], () => {
/******/ 			__webpack_require__.E("vendors-node_modules_pnpm_epub-gen-memory_1_0_9_node_modules_epub-gen-memory_dist_lib_index_js");
/******/ 			__webpack_require__.E("_c581");
/******/ 		}, 5);
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _App_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.svelte */ "./src/App.svelte");

let app;
try {
  app = new _App_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]({
    target: document.body,
  });
} catch (err) {
  const errorNode = document.createElement('div');
  errorNode.className = 'fatal-error';
  errorNode.ariaLabel = 'error';
  errorNode.appendChild(document.createElement('h1')).textContent = 'Something went wrong:';
  errorNode.appendChild(document.createElement('code')).textContent = err;
  document.body.appendChild(errorNode);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);

})();

__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ })()
;
//# sourceMappingURL=main.js.map