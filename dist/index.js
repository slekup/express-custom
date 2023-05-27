"use strict";var A=Object.create;var f=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var V=(t,e)=>{for(var s in e)f(t,s,{get:e[s],enumerable:!0})},S=(t,e,s,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of O(e))!j.call(t,r)&&r!==s&&f(t,r,{get:()=>e[r],enumerable:!(i=M(e,r))||i.enumerable});return t};var g=(t,e,s)=>(s=t!=null?A(I(t)):{},S(e||!t||!t.__esModule?f(s,"default",{value:t,enumerable:!0}):s,t)),U=t=>S(f({},"__esModule",{value:!0}),t);var _={};V(_,{EndpointBuilder:()=>l,RouteBuilder:()=>d,RouterBuilder:()=>b,default:()=>Z});module.exports=U(_);var B=g(require("dotenv")),q=g(require("express"));var h=g(require("colors")),a=g(require("winston")),F=!!process.env.DEBUG,D=t=>{switch(t){case"error":return h.default.red(t.toUpperCase());case"warn":return h.default.yellow(t.toUpperCase());case"info":return h.default.green(t.toUpperCase());case"debug":return h.default.blue(t.toUpperCase());case"trace":return h.default.magenta(t.toUpperCase());default:return h.default.white(t.toUpperCase())}},G=a.format.combine(a.format.colorize(),a.format.timestamp(),a.format.ms(),a.format.errors({stack:!0}),a.format.printf(({timestamp:t,ms:e,level:s,message:i,stack:r})=>{let n=i;r&&(n+=`
${r}`);let o=/\u001b\[[0-9]{1,2}m/gi;return`${h.default.gray(t)} (${h.default.magenta(e)}) [${D(s.replace(o,""))}]: ${n}`})),W=a.createLogger({level:"debug",format:G,transports:[new a.transports.Console({level:F?"debug":"info"}),new a.transports.Console({level:"error"}),new a.transports.Console({level:"warn"}),new a.transports.Console({level:"trace"})]}),m=W;var y=t=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t),x=t=>/^[a-zA-Z0-9_]{3,16}$/.test(t),T=t=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(t),v=t=>/^\d{10}$/.test(t),R=t=>/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/.test(t);var $=t=>{try{return new URL(t).href===t}catch{return!1}},E=t=>{try{return new URL(t).href===t}catch{return!1}};var k=async(t,e)=>{if(typeof t!="object")return"The data provided must be an object.";let s=Object.entries(e);for(let[i,r]of s)if(r.required&&!t[i])return`The field "${i}" has not been provided.`;for(let[i,r]of s)if(typeof t[i]!==r.type)return`The field "${i}" must be of type ${r.type}.`;for(let[i,r]of s){if(r.options&&!r.options.includes(t[i]))return`The field "${i}" is not a valid option.`;if(r.type==="number"){if(r.min&&r.max&&typeof t[i]=="number"&&(t[i]<r.min||t[i]>r.max))return`The field "${i}" must be between ${r.min} and ${r.max}.`;if(r.min&&typeof t[i]=="number"&&t[i]<r.min)return`The field "${i}" must be at least ${r.min}.`;if(r.max&&typeof t[i]=="number"&&t[i]>r.max)return`The field "${i}" must be less than ${r.max}.`}if(r.type==="integer"){if(r.min&&r.max&&typeof t[i]=="number"&&(t[i]<r.min||t[i]>r.max))return`The field "${i}" must be between ${r.min} and ${r.max}.`;if(r.min&&typeof t[i]=="number"&&t[i]<r.min)return`The field "${i}" must be at least ${r.min}.`;if(r.max&&typeof t[i]=="number"&&t[i]>r.max)return`The field "${i}" must be less than ${r.max}.`;if(typeof t[i]!="number"||!Number.isInteger(t[i]))return`The field "${i}" must be an integer.`}if(r.type==="string"){let n=r,o=t[i];if(r.min&&r.max&&(o.length<r.min||o.length>r.max))return`The field "${i}" must be between ${r.min} and ${r.max} characters.`;if(r.min&&o.length<r.min)return`The field "${i}" must be at least ${r.min} characters.`;if(r.max&&o.length>r.max)return`The field "${i}" must be less than ${r.max} characters.`;if(n.test==="email"&&!y(o))return`The field "${i}" must be a valid email address.`;if(n.test==="username"&&!x(o))return`The field "${i}" must be a valid username.`;if(n.test==="passwordStrength"&&!T(o))return`The field "${i}" is too weak to be a valid password.`;if(n.test==="phoneNumber"&&!v(o))return`The field "${i}" must be a valid phone number.`;if(n.test==="ipAddress"&&!R(o))return`The field "${i}" must be a valid IPv4 address.`;if(n.test==="url"&&!$(o))return`The field "${i}" must be a valid IPv4 address.`;if(typeof t[i]!="string")return`The field "${i}" must be a string.`}if(r.checks){for(let n of r.checks)if(!await n.run(i))return`${n.response}.`}if(r.type==="boolean"&&typeof t[i]!="boolean")return`The field "${i}" must be a boolean.`;if(r.type==="object"){if(typeof t[i]!="object")return`The field "${i}" must be an object.`;if(r.properties){let n=await k(t[i],r.properties);if(n)return n}}if(r.type==="array"){if(!Array.isArray(t[i]))return`The field "${i}" must be an array.`;if(r.items)for(let n of t[i]){if(typeof n!==r.items.type)return`The field "${i}" must be an array of ${r.items.type}.`;if(!r.items.enum.includes(n))return`The field "${i}" must be an array of valid options.`}}if(r.type==="image"){if(typeof t[i]!="string")return`The field "${i}" must be a string.`;if(!E(t[i]))return`The field "${i}" must be a valid image.`}}return!1},L=async(t,e,s)=>{let i=await k(t,e);return i?s.status(400).json({status:400,message:i}):null},c=L;var C=require("mongoose");var z=async(t,e,s,i)=>{let r=await(0,C.startSession)();try{r.startTransaction(),await t(e,s,r),await r.commitTransaction(),i()}catch(n){await r.abortTransaction(),m.error(n),s.status(500).json({error:"Internal Server Error"})}finally{r.endSession()}},w=t=>(e,s,i)=>{z(t,e,s,i)};var u=class{name;type;typeSchema;description;required;options;enum;items;min;max;checks;properties;test;constructor(e){this.name="Name not provided",this.type=e,this.description="Description not provided",this.required=!0}setName(e){return this.name=e,this}setTypeSchema(e){return this.typeSchema=e,this}setDescription(e){return this.description=e,this}setRequired(e){return this.required=e,this}setOptions(e){return this.options=e,this}setEnum(e){return this.enum=e,this}setItems(e){return this.items=e,this}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}setChecks(e){return this.checks=e,this}setProperties(e){return this.properties=e,this}setTest(e){return this.test=e,this}};var p=class{schema;constructor(){this.schema={}}addStringValue(e){let s=new u("string");return e(s),this.schema[s.name]=s,this}addNumberValue(e){let s=new u("number");return e(s),this.schema[s.name]=s,this}addIntegerValue(e){let s=new u("integer");return e(s),this.schema[s.name]=s,this}addBooleanValue(e){let s=new u("boolean");return e(s),this.schema[s.name]=s,this}addObjectValue(e){let s=new u("object");return e(s),this.schema[s.name]=s,this}addArrayValue(e){let s=new u("array");return e(s),this.schema[s.name]=s,this}addImageValue(e){let s=new u("image");return e(s),this.schema[s.name]=s,this}};var l=class{disabled;name;description;path;method;notes;paramSchema;querySchema;bodySchema;responses;controller;constructor(){this.disabled=!1,this.name="Name not provided",this.description="Description not provided",this.path="/",this.method="GET",this.notes=[],this.responses=[],this.controller=()=>{throw new Error("Controller not set")}}setDisabled(e){return this.disabled=e,this}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setPath(e){return this.path=e,this}setMethod(e){return this.method=e,this}setNotes(e){return this.notes=e,this}setParamSchema(e){let s=new p;return e(s),this.paramSchema=s.schema,this}setQuerySchema(e){let s=new p;return e(s),this.querySchema=s.schema,this}setBodySchema(e){let s=new p;return e(s),this.bodySchema=s.schema,this}setResponses(e){return this.responses=e,this}setController(e){return this.controller=w(e),this}execute(e,s,i){(async()=>{try{return!this.paramSchema&&!this.querySchema&&!this.bodySchema?s.status(500).json({status:500,message:"Schema not set for endpoint."}):this.paramSchema&&await c(e.params,this.paramSchema,s)||this.querySchema&&await c(e.query,this.querySchema,s)||this.bodySchema&&await c(e.body,this.bodySchema,s)?void 0:this.controller(e,s,i)}catch(r){m.error(r)}})()}export(){return{name:this.name,description:this.description,path:this.path,notes:this.notes,params:this.paramSchema??{},query:this.querySchema??{},body:this.bodySchema??{},responses:this.responses}}};var P=require("express"),d=class{raw=(0,P.Router)();path;name;description;endpoints=[];middlewares=[];afterwares=[];constructor(e){this.path=e??"/",this.name="Unnamed route",this.description="No description provided."}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setPath(e){return this.path=e,this}addMiddleware(e){return this.middlewares.push(e),this}addAfterware(e){return this.afterwares.push(e),this}addEndpoint(e){this.endpoints.push(e);let s=`${this.path}${e.path}`.replace("//","/");switch(e.method){case"GET":this.raw.get(s,...this.middlewares,e.controller);break;case"POST":this.raw.post(s,...this.middlewares,e.controller);break;case"PUT":this.raw.put(s,...this.middlewares,e.controller);break;case"PATCH":this.raw.patch(s,...this.middlewares,e.controller);break;case"DELETE":this.raw.delete(s,...this.middlewares,e.controller);break;case"OPTIONS":this.raw.options(s,...this.middlewares,e.controller);break;default:throw new Error(`Invalid method ${String(e.method)}`)}return this}addEndpointFile(e){for(let s of Object.values(e))this.addEndpoint(s);return this}access(){return{middlewares:this.middlewares,afterwares:this.afterwares}}export(){return{name:this.name,description:this.description,path:this.path,endpoints:this.endpoints.map(e=>e.export())}}};var N=require("express");var b=class{raw=(0,N.Router)();path;name;routes=[];middlewares=[];afterwares=[];constructor(){this.path="/",this.name="Unnamed router"}setName(e){return this.name=e,this}setPath(e){return this.path=e,this}addMiddleware(e){return this.middlewares.push(e),this}addAfterware(e){return this.afterwares.push(e),this}addRoute(e,s){if(!e)return this;this.routes.push(s);let i=/\/+/g,r=s.access();return this.raw.use(e.replace(i,"/"),...r.middlewares,s.raw,...r.afterwares),this}getRouter=()=>this.raw;export(){return{name:this.name,path:this.path,routes:this.routes.map(e=>e.export())}}async generateSite(){return m.info("Generating site..."),await(()=>new Promise(s=>{setTimeout(()=>{s(null)},1e3)}))(),m.error("Site generation has not been implemented yet."),this}};B.default.config();var Z=q.default;0&&(module.exports={EndpointBuilder,RouteBuilder,RouterBuilder});
//# sourceMappingURL=index.js.map