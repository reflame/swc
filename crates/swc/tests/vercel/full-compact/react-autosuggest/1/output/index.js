"use strict";import{_ as e}from"@swc/helpers/_/_instanceof";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==o(e)&&"function"!=typeof e)return{default:e};var t=n();if(t&&t.has(e))return t.get(e);var r={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var c=i?Object.getOwnPropertyDescriptor(e,u):null;c&&(c.get||c.set)?Object.defineProperty(r,u,c):r[u]=e[u]}return r.default=e,t&&t.set(e,r),r}(require("react")),r=function(e){return e&&e.__esModule?e:{default:e}}(require("prop-types"));function n(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return n=function(){return e},e}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function c(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s=function(r){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(d,r);var n,s,p=function(){var e,t,r=f(d);if(function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=f(this).constructor;t=Reflect.construct(r,arguments,n)}else t=r.apply(this,arguments);return(e=t)&&("object"===o(e)||"function"==typeof e)?e:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(this)};function d(){!function(t,r){if(!e(t,r))throw TypeError("Cannot call a class as a function")}(this,d);for(var t,r,n,o,i=arguments.length,u=Array(i),c=0;c<i;c++)u[c]=arguments[c];return t=function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(o=p.call.apply(p,[this].concat(u))),r="storeHighlightedItemReference",n=function(e){o.props.onHighlightedItemChange(null===e?null:e.item)},r in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,o}return n=[{key:"shouldComponentUpdate",value:function(e){return(0,_compareObjects.default)(e,this.props,["itemProps"])}},{key:"render",value:function(){var e=this,r=this.props,n=r.items,o=r.itemProps,c=r.renderItem,f=r.renderItemData,a=r.sectionIndex,s=r.highlightedItemIndex,p=r.getItemId,d=r.theme,y=r.keyPrefix,b=null===a?y:"".concat(y,"section-").concat(a,"-"),m="function"==typeof o;return t.default.createElement("ul",i({role:"listbox"},d("".concat(b,"items-list"),"itemsList")),n.map(function(r,n){var y=0===n,h=n===s,g="".concat(b,"item-").concat(n),O=m?o({sectionIndex:a,itemIndex:n}):o,j=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach(function(t){l(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({id:p(a,n),"aria-selected":h},d(g,"item",y&&"itemFirst",h&&"itemHighlighted"),{},O);return h&&(j.ref=e.storeHighlightedItemReference),t.default.createElement(_Item.default,i({},j,{sectionIndex:a,isHighlighted:h,itemIndex:n,item:r,renderItem:c,renderItemData:f}))}))}}],c(d.prototype,n),s&&c(d,s),d}(t.Component);exports.default=s,l(s,"propTypes",{items:r.default.array.isRequired,itemProps:r.default.oneOfType([r.default.object,r.default.func]),renderItem:r.default.func.isRequired,renderItemData:r.default.object.isRequired,sectionIndex:r.default.number,highlightedItemIndex:r.default.number,onHighlightedItemChange:r.default.func.isRequired,getItemId:r.default.func.isRequired,theme:r.default.func.isRequired,keyPrefix:r.default.string.isRequired}),l(s,"defaultProps",{sectionIndex:null}),new s;
