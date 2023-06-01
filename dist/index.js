"use strict";var Q=Object.create;var q=Object.defineProperty;var X=Object.getOwnPropertyDescriptor;var J=Object.getOwnPropertyNames;var K=Object.getPrototypeOf,Y=Object.prototype.hasOwnProperty;var ee=(r,e)=>{for(var t in e)q(r,t,{get:e[t],enumerable:!0})},A=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of J(e))!Y.call(r,o)&&o!==t&&q(r,o,{get:()=>e[o],enumerable:!(n=X(e,o))||n.enumerable});return r};var b=(r,e,t)=>(t=r!=null?Q(K(r)):{},A(e||!r||!r.__esModule?q(t,"default",{value:r,enumerable:!0}):t,r)),te=r=>A(q({},"__esModule",{value:!0}),r);var le={};ee(le,{ApiBuilder:()=>E,EndpointBuilder:()=>T,RouteBuilder:()=>B,RouterBuilder:()=>V,SchemaBuilder:()=>h,StructureBuilder:()=>S,VersionBuilder:()=>$,default:()=>pe});module.exports=te(le);var Z=b(require("dotenv")),_=b(require("express"));var H=b(require("colors"));var c=b(require("colors")),u=b(require("winston")),re=!!process.env.DEBUG,ie=r=>{switch(r){case"error":return c.default.red(r.toUpperCase());case"warn":return c.default.yellow(r.toUpperCase());case"info":return c.default.green(r.toUpperCase());case"debug":return c.default.blue(r.toUpperCase());case"trace":return c.default.magenta(r.toUpperCase());default:return c.default.white(r.toUpperCase())}},se=u.format.combine(u.format.colorize(),u.format.timestamp(),u.format.ms(),u.format.errors({stack:!0}),u.format.printf(({timestamp:r,ms:e,level:t,message:n,stack:o})=>{let i=n;o&&(i+=`
${o}`);let s=/\u001b\[[0-9]{1,2}m/gi;return`${c.default.gray(r)} (${c.default.magenta(e)}) [${ie(t.replace(s,""))}]: ${i}`})),ne=u.createLogger({level:"debug",format:se,transports:[new u.transports.Console({level:re?"debug":"info"}),new u.transports.Console({level:"error"}),new u.transports.Console({level:"warn"}),new u.transports.Console({level:"trace"})]}),d=ne;var I=r=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r),M=r=>/^[a-zA-Z0-9_]{3,16}$/.test(r),U=r=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(r),O=r=>/^\d{10}$/.test(r),j=r=>/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/.test(r);var L=r=>{try{return new URL(r).href===r}catch{return!1}},F=r=>{try{return new URL(r).href===r}catch{return!1}};function oe(r,e,t){e.status(404).json({status:404,message:"The server cannot find the requested resource"}),d.error(H.default.red(`The route at ${r.originalUrl} was not found - ${r.method}`)),t()}function ae(r,e,t){d.error(r),t.status(r.status||500),t.json({error:{status:r.status||500,message:"Internal Server Error",field:r.field}})}var C={notFound:oe,errorHandler:ae};var D=require("mongoose");var ue=async(r,e,t,n)=>{let o=await(0,D.startSession)();try{o.startTransaction(),await r(e,t,o),await o.commitTransaction(),n()}catch(i){await o.abortTransaction(),d.error(i),t.status(500).json({error:"Internal Server Error"})}finally{o.endSession()}},k=r=>(e,t,n)=>{ue(r,e,t,n)};var P=b(require("express")),G=require("express-rate-limit"),m=class{raw;ratelimit;middlewares;constructor(e="router"){e==="app"?this.raw=(0,P.default)():this.raw=(0,P.Router)(),this.middlewares=[]}setRateLimit(e,t){if(this.ratelimit)throw new Error("Rate limit already set.");return(t||t===void 0)&&(this.ratelimit={statusCode:e.statusCode??429,...typeof e.windowMs=="number"?{window:e.windowMs}:{},...typeof e.max=="number"?{max:e.max}:{}}),this.raw.use((0,G.rateLimit)(e)),this}addMiddleware(e){return this.middlewares.push(e),this.raw.use(e),this}};var N={},S=class{name;type;fields;constructor({name:e,type:t,fields:n}){this.name=e,this.type=t,this.fields=n,N[e]=this}export(){return{name:this.name,type:this.type,fields:this.fields}}};var E=class extends m{port;versions;name;description;baseUrl;logo;constructor({name:e,description:t,baseUrl:n,port:o,logo:i}){super("app"),this.versions=[],this.name=e,this.description=t,this.baseUrl=n,this.port=o,this.logo=i??""}addVersion(e){this.versions.push(e);let t=e.values();return this.raw.use(t.path,t.raw),this}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setBaseUrl(e){return this.baseUrl=e,this}setLogo(e){return this.logo=e,this}startServer(e){return this.raw.get("/",(n,o)=>o.json({message:"Welcome to Slekup API",versions:this.versions.map(i=>({version:`v${i.values().version}`,url:`${this.baseUrl}/v${i.values().version}`}))})),this.raw.use(C.notFound),this.raw.use(C.errorHandler),this.raw.listen(this.port,e)}export(){if(!this.name)throw new Error("The name of the API is not set.");if(!this.description)throw new Error("The description of the API is not set.");if(!this.baseUrl)throw new Error("The base URL of the API is not set.");if(!this.port)throw new Error("The port of the API is not set.");return{name:this.name,description:this.description,baseUrl:this.baseUrl,port:this.port,logo:this.logo,structures:N,rateLimit:this.ratelimit,versions:this.versions.map(e=>e.export())}}};var a=class{name;description;required;checks;structure;constructor(){this.name="Name not provided",this.description="Description not provided",this.required=!0,this.checks=[]}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setRequired(e){return this.required=e,this}addCheck(e){return this.checks.push(e),this}setStructure(e){return this.structure=e,this}};var f=class extends a{type="array";min;max;unique;contains;items;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}setUnique(e){return this.unique=e,this}setContains(e,t,n){return this.contains={type:e,...t?{min:t}:{},...n?{max:n}:{}},this}setItems(e){return this.items=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure,max:this.max,min:this.min,unique:this.unique}}};var g=class extends a{type="boolean";constructor(){super()}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var x=class extends a{type="image";constructor(){super()}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var v=class extends a{type="integer";min;max;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var w=class extends a{type="number";min;max;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var y=class extends a{type="object";properties;constructor(){super(),this.properties={}}setProperties(e){return this.properties=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var R=class extends a{type="string";min;max;options;test;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}setOptions(e){return this.options=e,this}setTest(e){return this.test=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var h=class{schema;constructor(){this.schema={}}addArray(e){let t=new f;return e(t),this.schema[t.name]=t,this}addString(e){let t=new R;return e(t),this.schema[t.name]=t,this}addNumber(e){let t=new w;return e(t),this.schema[t.name]=t,this}addInteger(e){let t=new v;return e(t),this.schema[t.name]=t,this}addBoolean(e){let t=new g;return e(t),this.schema[t.name]=t,this}addObject(e){let t=new y;return e(t),this.schema[t.name]=t,this}addImage(e){let t=new x;return e(t),this.schema[t.name]=t,this}async validateBase(e,t,n){if(typeof e!="object")return"The data provided must be an object.";let o=Object.entries(t);for(let[i,s]of o)if(s.required&&!e[i])return`The field "${i}" has not been provided.`;for(let[i,s]of o)if(typeof e[i]!==s.type)return`The field "${i}" must be of type ${s.type}.`;for(let[i,s]of o){if(s.type==="number"){if(s.min&&s.max&&typeof e[i]=="number"&&(e[i]<s.min||e[i]>s.max))return`The field "${i}" must be between ${s.min} and ${s.max}.`;if(s.min&&typeof e[i]=="number"&&e[i]<s.min)return`The field "${i}" must be at least ${s.min}.`;if(s.max&&typeof e[i]=="number"&&e[i]>s.max)return`The field "${i}" must be less than ${s.max}.`}if(s.type==="integer"){if(s.min&&s.max&&typeof e[i]=="number"&&(e[i]<s.min||e[i]>s.max))return`The field "${i}" must be between ${s.min} and ${s.max}.`;if(s.min&&typeof e[i]=="number"&&e[i]<s.min)return`The field "${i}" must be at least ${s.min}.`;if(s.max&&typeof e[i]=="number"&&e[i]>s.max)return`The field "${i}" must be less than ${s.max}.`;if(typeof e[i]!="number"||!Number.isInteger(e[i]))return`The field "${i}" must be an integer.`}if(s.type==="string"){let p=s,l=e[i];if(s.options&&!s.options.includes(e[i]))return`The field "${i}" is not a valid option.`;if(s.min&&s.max&&(l.length<s.min||l.length>s.max))return`The field "${i}" must be between ${s.min} and ${s.max} characters.`;if(s.min&&l.length<s.min)return`The field "${i}" must be at least ${s.min} characters.`;if(s.max&&l.length>s.max)return`The field "${i}" must be less than ${s.max} characters.`;if(p.test==="email"&&!I(l))return`The field "${i}" must be a valid email address.`;if(p.test==="username"&&!M(l))return`The field "${i}" must be a valid username.`;if(p.test==="passwordStrength"&&!U(l))return`The field "${i}" is too weak to be a valid password.`;if(p.test==="phoneNumber"&&!O(l))return`The field "${i}" must be a valid phone number.`;if(p.test==="ipAddress"&&!j(l))return`The field "${i}" must be a valid IPv4 address.`;if(p.test==="url"&&!L(l))return`The field "${i}" must be a valid IPv4 address.`;if(typeof e[i]!="string")return`The field "${i}" must be a string.`}if(s.checks){for(let p of s.checks)if(!await p.run(i))return`${p.response}.`}if(s.type==="boolean"&&typeof e[i]!="boolean")return`The field "${i}" must be a boolean.`;if(s.type==="object"){if(typeof e[i]!="object")return`The field "${i}" must be an object.`;if(s.properties&&Object.keys(s.properties).length>0){let p=await this.validateBase(e[i],s.properties,!0);if(p)return p}}if(s.type==="array"&&!Array.isArray(e[i]))return`The field "${i}" must be an array.`;if(s.type==="image"){if(typeof e[i]!="string")return`The field "${i}" must be a string.`;if(!F(e[i]))return`The field "${i}" must be a valid image.`}}return!1}async validate(e,t){let n=await this.validateBase(e,this.schema);return n?t.status(400).json({status:400,message:n}):null}export(){let e={};return Object.entries(this.schema).forEach(([t,n])=>{let o=n.export();e[t]=o}),e}};var T=class{disabled;name;description;path;method;notes;paramSchema;querySchema;bodySchema;responses;controller;ratelimit;constructor(){this.disabled=!1,this.name="Name not provided",this.description="Description not provided",this.path="/",this.method="GET",this.notes=[],this.responses=[],this.controller=()=>{throw new Error("Controller not set")}}setDisabled(e){return this.disabled=e,this}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setPath(e){return this.path=e,this}setMethod(e){return this.method=e,this}setNotes(e){return this.notes=e,this}setParamSchema(e){let t=new h;return e(t),this.paramSchema=t,this}setQuerySchema(e){let t=new h;return e(t),this.querySchema=t,this}setBodySchema(e){let t=new h;return e(t),this.bodySchema=t,this}setResponses(e){return this.responses=e,this}setController(e){return this.controller=k(e),this}execute(e,t,n){(async()=>{try{return!this.paramSchema&&!this.querySchema&&!this.bodySchema?t.status(500).json({status:500,message:"Schema not set for endpoint."}):this.paramSchema&&await this.paramSchema.validate(e.params,t)||this.querySchema&&await this.querySchema.validate(e.query,t)||this.bodySchema&&await this.bodySchema.validate(e.body,t)?void 0:this.controller(e,t,n)}catch(o){d.error(o)}})()}export(){return{name:this.name,description:this.description,path:this.path==="/"?"":this.path,method:this.method,notes:this.notes,params:this.paramSchema?this.paramSchema.export():{},queries:this.querySchema?this.querySchema.export():{},body:this.bodySchema?this.bodySchema.export():{},responses:this.responses}}};var z=require("express");var B=class extends m{raw=(0,z.Router)();path;name;description;endpoints=[];constructor(e){super(),this.path=e??"/",this.name="Unnamed route",this.description="No description provided."}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setPath(e){return this.path=e,this}addEndpoint(e){this.endpoints.push(e);let t=/\/+/g,n=`${this.path}${e.path}`.replaceAll(t,"/");switch(e.method){case"GET":this.raw.get(n,e.controller);break;case"POST":this.raw.post(n,e.controller);break;case"PUT":this.raw.put(n,e.controller);break;case"PATCH":this.raw.patch(n,e.controller);break;case"DELETE":this.raw.delete(n,e.controller);break;case"OPTIONS":this.raw.options(n,e.controller);break;default:throw new Error(`Invalid method ${String(e.method)}`)}return this}addEndpointFile(e){for(let t of Object.values(e))this.addEndpoint(t);return this}export(){return{name:this.name,description:this.description,path:this.path,endpoints:this.endpoints.map(e=>e.export())}}};var V=class extends m{path;name;routes;constructor({path:e,name:t}){super(),this.path=e,this.name=t,this.routes=[]}addRoute(e){return this.routes.push(e),this.raw.use(this.path,e.raw),this}export(){return{name:this.name,path:this.path,routes:this.routes.map(e=>e.export())}}values(){return{raw:this.raw,ratelimit:this.ratelimit,path:this.path,defaultCategory:this.name,routes:this.routes,middlewares:this.middlewares}}};var W=b(require("express-rate-limit"));var $=class extends m{version;routers;constructor({version:e}){super("app"),this.routers=[],this.version=e}setRateLimit(e,t){return(t||t===void 0)&&(this.ratelimit={statusCode:e.statusCode??429,...typeof e.windowMs=="number"?{window:e.windowMs}:{},...typeof e.max=="number"?{max:e.max}:{}}),this.raw.use(`v${this.version}`,(0,W.default)(e)),this}addRouter(e){this.routers.push(e);let t=e.values();return this.raw.use(`v${this.version}`,t.raw),this}export(){return{version:this.version,rateLimit:this.ratelimit,routers:this.routers.map(e=>e.export())}}values(){return{path:`/v${this.version}`,raw:this.raw,version:this.version}}};Z.default.config();var pe=_.default;0&&(module.exports={ApiBuilder,EndpointBuilder,RouteBuilder,RouterBuilder,SchemaBuilder,StructureBuilder,VersionBuilder});
//# sourceMappingURL=index.js.map