"use strict";var re=Object.create;var k=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var ie=Object.getOwnPropertyNames;var oe=Object.getPrototypeOf,ne=Object.prototype.hasOwnProperty;var ae=(s,e)=>{for(var t in e)k(s,t,{get:e[t],enumerable:!0})},L=(s,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of ie(e))!ne.call(s,a)&&a!==t&&k(s,a,{get:()=>e[a],enumerable:!(o=se(e,a))||o.enumerable});return s};var m=(s,e,t)=>(t=s!=null?re(oe(s)):{},L(e||!s||!s.__esModule?k(t,"default",{value:s,enumerable:!0}):t,s)),ue=s=>L(k({},"__esModule",{value:!0}),s);var we={};ae(we,{ApiBuilder:()=>V,EndpointBuilder:()=>$,RouteBuilder:()=>N,RouterBuilder:()=>C,SchemaBuilder:()=>l,StructureBuilder:()=>q,VersionBuilder:()=>P,default:()=>xe});module.exports=ue(we);var ee=m(require("dotenv")),te=m(require("express"));var O=m(require("fs")),F=m(require("path"));var W=m(require("colors"));var h=m(require("colors")),c=m(require("winston")),le=!!process.env.DEBUG,pe=s=>{switch(s){case"error":return h.default.red(s.toUpperCase());case"warn":return h.default.yellow(s.toUpperCase());case"info":return h.default.green(s.toUpperCase());case"debug":return h.default.blue(s.toUpperCase());case"trace":return h.default.magenta(s.toUpperCase());default:return h.default.white(s.toUpperCase())}},ce=c.format.combine(c.format.colorize(),c.format.timestamp(),c.format.ms(),c.format.errors({stack:!0}),c.format.printf(({timestamp:s,ms:e,level:t,message:o,stack:a})=>{let r=o;a&&(r+=`
${a}`);let i=/\u001b\[[0-9]{1,2}m/gi;return`${h.default.gray(s)} (${h.default.magenta(e)}) [${pe(t.replace(i,""))}]: ${r}`})),me=c.createLogger({level:"debug",format:ce,transports:[new c.transports.Console({level:le?"debug":"info"}),new c.transports.Console({level:"error"}),new c.transports.Console({level:"warn"}),new c.transports.Console({level:"trace"})]}),b=me;var U=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),D=s=>/^[a-zA-Z0-9_]{3,16}$/.test(s),H=s=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(s),J=s=>/^\d{10}$/.test(s),z=s=>/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/.test(s);var G=s=>{try{return new URL(s).href===s}catch{return!1}},Z=s=>/^\/(?:[a-zA-Z0-9_]+\/)?[a-zA-Z0-9_]*$/.test(s),_=s=>{try{return new URL(s).href===s}catch{return!1}};function de(s,e,t){e.status(404).json({status:404,message:"The server cannot find the requested resource"}),b.error(W.default.red(`The route at ${s.originalUrl} was not found - ${s.method}`)),t()}function he(s,e,t){b.error(s),t.status(s.status||500),t.json({error:{status:s.status||500,message:"Internal Server Error",field:s.field}})}var j={notFound:de,errorHandler:he};var Q=require("mongoose");var fe=async(s,e,t,o)=>{let a=await(0,Q.startSession)();try{a.startTransaction(),await s(e,t,a),await a.commitTransaction(),o()}catch(r){await a.abortTransaction(),b.error(r),t.status(500).json({error:"Internal Server Error"})}finally{a.endSession()}},A=s=>(e,t,o)=>{fe(s,e,t,o)};var w=m(require("colors")),f=m(require("winston")),g={inf:w.default.blue("CLI"),suc:w.default.green("CLI"),err:w.default.red("CLI")},ke={inf:w.default.blue("SITE"),suc:w.default.green("SITE"),err:w.default.red("SITE")},be=f.format.combine(f.format.colorize(),f.format.errors({stack:!0}),f.format.printf(({message:s,stack:e})=>{let t=s;return e&&(t+=`
${e}`),t})),ge=f.createLogger({level:"info",format:be,transports:[new f.transports.Console({level:"info"})]}),x=ge;var I=m(require("express")),X=require("express-rate-limit"),d=class{raw;ratelimit;middlewares;constructor(e="router"){e==="app"?this.raw=(0,I.default)():this.raw=(0,I.Router)(),this.middlewares=[]}setRateLimit(e,t){if(this.ratelimit)throw new Error("Rate limit already set.");return(t||t===void 0)&&(this.ratelimit={statusCode:e.statusCode??429,...typeof e.windowMs=="number"?{window:e.windowMs}:{},...typeof e.max=="number"?{max:e.max}:{}}),this.raw.use((0,X.rateLimit)(e)),this}addMiddleware(e){return this.middlewares.push(e),this.raw.use(e),this}};var p=class{name;description;required;checks;structure;defaultValue;constructor(){this.name="Name not provided",this.description="Description not provided",this.required=!1,this.checks=[]}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setRequired(e){return this.required=e,this}addCheck(e){return this.checks.push(e),this}setStructure(e){return this.structure=e,this}};var v=class extends p{type="array";min;max;unique;contains;items;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}setUnique(e){return this.unique=e,this}setContains(e,t,o){return this.contains={type:e,...t?{min:t}:{},...o?{max:o}:{}},this}setItems(e){return this.items=e,this}setDefault(e){return this.defaultValue=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure,max:this.max,min:this.min,unique:this.unique}}};var S=class extends p{type="boolean";constructor(){super()}setDefault(e){return this.defaultValue=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var y=class extends p{type="image";constructor(){super()}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var R=class extends p{type="integer";min;max;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}setDefault(e){return this.defaultValue=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var E=class extends p{type="number";min;max;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}setDefault(e){return this.defaultValue=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var T=class extends p{type="object";properties;constructor(){super(),this.properties={}}setProperties(e){return this.properties=e,this}setDefault(e){return this.defaultValue=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var B=class extends p{type="string";min;max;options;test;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}setOptions(e){return this.options=e,this}setTest(e){return this.test=e,this}setDefault(e){return this.defaultValue=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var l=class{schema;constructor(){this.schema={}}addArray(e){let t=new v;return e(t),this.schema[t.name]=t,this}addString(e){let t=new B;return e(t),this.schema[t.name]=t,this}addNumber(e){let t=new E;return e(t),this.schema[t.name]=t,this}addInteger(e){let t=new R;return e(t),this.schema[t.name]=t,this}addBoolean(e){let t=new S;return e(t),this.schema[t.name]=t,this}addObject(e){let t=new T;return e(t),this.schema[t.name]=t,this}addImage(e){let t=new y;return e(t),this.schema[t.name]=t,this}async validateBase(e,t,o){if(typeof e!="object")return"The data provided must be an object.";let a=Object.entries(t);for(let[r,i]of a){if(i.required){if(!e[r]&&i.defaultValue){e[r]=i.defaultValue;break}else if(!e[r])return`The field "${r}" has not been provided.`}if(!e[r]&&i.defaultValue)return e[r]=i.defaultValue,!1;if(!e[r])return!1}for(let[r,i]of a)if(typeof e[r]!==i.type)return`The field "${r}" must be of type ${i.type}.`;for(let[r,i]of a){if(i.type==="number"){if(i.min&&i.max&&typeof e[r]=="number"&&(e[r]<i.min||e[r]>i.max))return`The field "${r}" must be between ${i.min} and ${i.max}.`;if(i.min&&typeof e[r]=="number"&&e[r]<i.min)return`The field "${r}" must be at least ${i.min}.`;if(i.max&&typeof e[r]=="number"&&e[r]>i.max)return`The field "${r}" must be less than ${i.max}.`}if(i.type==="integer"){if(i.min&&i.max&&typeof e[r]=="number"&&(e[r]<i.min||e[r]>i.max))return`The field "${r}" must be between ${i.min} and ${i.max}.`;if(i.min&&typeof e[r]=="number"&&e[r]<i.min)return`The field "${r}" must be at least ${i.min}.`;if(i.max&&typeof e[r]=="number"&&e[r]>i.max)return`The field "${r}" must be less than ${i.max}.`;if(typeof e[r]!="number"||!Number.isInteger(e[r]))return`The field "${r}" must be an integer.`}if(i.type==="string"){let n=i,u=e[r];if(i.options&&!i.options.includes(e[r]))return`The field "${r}" is not a valid option.`;if(i.min&&i.max&&(u.length<i.min||u.length>i.max))return`The field "${r}" must be between ${i.min} and ${i.max} characters.`;if(i.min&&u.length<i.min)return`The field "${r}" must be at least ${i.min} characters.`;if(i.max&&u.length>i.max)return`The field "${r}" must be less than ${i.max} characters.`;if(n.test==="email"&&!U(u))return`The field "${r}" must be a valid email address.`;if(n.test==="username"&&!D(u))return`The field "${r}" must be a valid username.`;if(n.test==="passwordStrength"&&!H(u))return`The field "${r}" is too weak to be a valid password.`;if(n.test==="phoneNumber"&&!J(u))return`The field "${r}" must be a valid phone number.`;if(n.test==="ipAddress"&&!z(u))return`The field "${r}" must be a valid IPv4 address.`;if(n.test==="url"&&!G(u))return`The field "${r}" must be a valid IPv4 address.`;if(n.test==="path"&&!Z(u))return`The field "${r}" must be a valid path.`;if(typeof e[r]!="string")return`The field "${r}" must be a string.`}if(i.checks){for(let n of i.checks)if(!await n.run(r))return`${n.response}.`}if(i.type==="boolean"&&typeof e[r]!="boolean")return`The field "${r}" must be a boolean.`;if(i.type==="object"){if(typeof e[r]!="object")return`The field "${r}" must be an object.`;if(i.properties&&Object.keys(i.properties).length>0){let n=await this.validateBase(e[r],i.properties,!0);if(n)return n}}if(i.type==="array"&&!Array.isArray(e[r]))return`The field "${r}" must be an array.`;if(i.type==="image"){if(typeof e[r]!="string")return`The field "${r}" must be a string.`;if(!_(e[r]))return`The field "${r}" must be a valid image.`}}return!1}async validate(e,t){let o=await this.validateBase(e,this.schema);return typeof o!="string"?null:t?.res?t.res.status(400).json({status:400,message:o}):o}export(){let e={};return Object.entries(this.schema).forEach(([t,o])=>{let a=o.export();e[t]=a}),e}};var V=class extends d{port;versions;routers;baseUrl;structures;config;constructor({baseUrl:e,port:t,structures:o}){super("app"),new l().addString(r=>r.setName("baseUrl").setRequired(!0).setMin(1).setMax(100)).addNumber(r=>r.setName("port").setMin(0).setMax(65536).setRequired(!0)).validate({baseUrl:e,port:t}).then(r=>{if(typeof r=="string")throw new Error(r)}),this.versions=[],this.routers=[],this.baseUrl=e,this.port=t,this.structures=o??[],this.config=void 0}addVersion(e){this.versions.push(e);let t=e.values();return this.raw.use(t.path,t.raw),this}addRouter(e){this.routers.push(e);let t=e.values();return this.raw.use(t.path,t.raw),this}startServer(e){return this.validate(),this.raw.get("/",(o,a)=>a.json({message:"Welcome to Slekup API",versions:this.versions.map(r=>({version:`v${r.values().version}`,url:`${this.baseUrl}/v${r.values().version}`}))})),this.raw.use(j.notFound),this.raw.use(j.errorHandler),this.raw.listen(this.port,e)}async loadConfig(){let e={},t=F.default.join(process.cwd(),"express-custom.json");try{let n=await O.default.promises.readFile(t,"utf-8");try{e=JSON.parse(n.toString())}catch(u){throw x.error(`${g.err} Failed to parse config.json file (invalid JSON).`),new Error(u)}}catch{x.error(`${g.err} No express-custom.json found, trying package.json`);try{let u=await O.default.promises.readFile(F.default.join(process.cwd(),"package.json"));try{let M=JSON.parse(u.toString())["express-custom"];if(typeof M!="object")throw x.error(`${g.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`),new Error("Invalid JSON");e=M}catch(M){throw x.error(`${g.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`),new Error(M)}}catch(u){throw x.error(`${g.err} Failed to load express-custom config from package.json`),new Error(u)}}let o=/\.ts$|\.js$/,r=await new l().addString(n=>n.setName("file").setRequired(!0).setMax(256).addCheck({run:u=>o.test(u),response:"The file must be a JavaScript or TypeScript file (.js or .ts)."})).addString(n=>n.setName("output").setDefault("docs").setMax(256)).addString(n=>n.setName("name").setDefault("My API")).addString(n=>n.setName("description").setDefault("Made with Express Custom")).addString(n=>n.setName("logo").setDefault("/logo.png")).addString(n=>n.setName("customDir").setMax(256)).addString(n=>n.setName("theme").setDefault("default")).addString(n=>n.setName("codeTheme").setDefault("framer")).addObject(n=>n.setName("socials").setDefault({}).setProperties({discord:{type:"string"},github:{type:"string"},instagram:{type:"string"},facebook:{type:"string"},linkedin:{type:"string"},youtube:{type:"string"},twitter:{type:"string"},email:{type:"string"}})).validate(e);typeof r=="string"&&(x.error(`${g.err} Validation error while processing express-config.json`),x.error(`${g.err} Error: ${r}`),process.exit(1));let i=e;return this.config=i,i}async getConfig(){return this.config?this.config:await this.loadConfig()}async validate(){if(this.versions.length===0||this.routers.length===0)throw new Error("No versions or routers provided to the API");await this.loadConfig()}async export(){if(!this.baseUrl)throw new Error("The base URL of the API is not set.");if(!this.port)throw new Error("The port of the API is not set.");return{...await this.loadConfig(),baseUrl:this.baseUrl,port:this.port,structures:this.structures,rateLimit:this.ratelimit,versions:this.versions.map(t=>t.export()),routers:this.routers.map(t=>t.export())}}};var $=class{disabled;name;description;path;method;notes;paramSchema;querySchema;bodySchema;responses;controller;ratelimit;constructor({disabled:e,name:t,description:o,path:a,method:r}){new l().addBoolean(n=>n.setName("disabled").setRequired(!1).setDefault(!1)).addString(n=>n.setName("name").setRequired(!0).setMin(1).setMax(50)).addString(n=>n.setName("description").setRequired(!0).setMin(1).setMax(100)).addString(n=>n.setName("path").setRequired(!0).setMin(1).setMax(100).setTest("path")).addString(n=>n.setName("method").setRequired(!0).setMin(1).setMax(100).setOptions(["GET","POST","PATCH","PUT","DELETE","OPTIONS"])).validate({disabled:e,name:t,description:o,path:a,method:r}).then(n=>{if(typeof n=="string")throw new Error(`Endpoint (${t||a}): ${n}`)}),this.disabled=e??!1,this.name=t,this.description=o,this.path=a,this.method=r,this.notes=[],this.responses=[],this.controller=()=>{throw new Error("Controller not set")}}setNotes(e){return this.notes=e,this}setParamSchema(e){let t=new l;return e(t),this.paramSchema=t,this}setQuerySchema(e){let t=new l;return e(t),this.querySchema=t,this}setBodySchema(e){let t=new l;return e(t),this.bodySchema=t,this}setResponses(e){return this.responses=e,this}setController(e){return this.controller=A(e),this}execute(e,t,o){(async()=>{try{return!this.paramSchema&&!this.querySchema&&!this.bodySchema?t.status(500).json({status:500,message:"Schema not set for endpoint."}):this.paramSchema&&await this.paramSchema.validate(e.params,{res:t})||this.querySchema&&await this.querySchema.validate(e.query,{res:t})||this.bodySchema&&await this.bodySchema.validate(e.body,{res:t})?void 0:this.controller(e,t,o)}catch(a){b.error(a)}})()}export(){return{name:this.name,description:this.description,path:this.path==="/"?"":this.path,method:this.method,notes:this.notes,params:this.paramSchema?this.paramSchema.export():{},queries:this.querySchema?this.querySchema.export():{},body:this.bodySchema?this.bodySchema.export():{},responses:this.responses}}};var K=require("express");var N=class extends d{raw=(0,K.Router)();path;name;description;endpoints=[];constructor({path:e,name:t,description:o}){super(),new l().addString(r=>r.setName("path").setRequired(!0).setMin(1).setMax(100).setTest("path")).addString(r=>r.setName("name").setRequired(!0).setMin(1).setMax(50)).addString(r=>r.setName("description").setRequired(!0).setMin(1).setMax(1e3)).validate({name:t,description:o,path:e}).then(r=>{if(typeof r=="string")throw new Error(`Route (${t||e}): ${r}`)}),this.path=e,this.name=t,this.description=o}addEndpoint(e){this.endpoints.push(e);let t=/\/+/g,o=`${this.path}${e.path}`.replaceAll(t,"/");switch(e.method){case"GET":this.raw.get(o,e.controller);break;case"POST":this.raw.post(o,e.controller);break;case"PUT":this.raw.put(o,e.controller);break;case"PATCH":this.raw.patch(o,e.controller);break;case"DELETE":this.raw.delete(o,e.controller);break;case"OPTIONS":this.raw.options(o,e.controller);break;default:throw new Error(`Invalid method ${String(e.method)}`)}return this}addEndpointFile(e){for(let t of Object.values(e))this.addEndpoint(t);return this}validate(){if(this.endpoints.length===0)throw new Error(`Route ${this.name} has no endpoints`)}export(){return{name:this.name,description:this.description,path:this.path,endpoints:this.endpoints.map(e=>e.export())}}};var C=class extends d{path;name;routes;constructor({path:e,name:t}){super(),new l().addString(a=>a.setName("path").setRequired(!0).setMin(1).setMax(100).setTest("path")).addString(a=>a.setName("name").setRequired(!0).setMin(1).setMax(50)).validate({path:e,name:t}).then(a=>{if(typeof a=="string")throw new Error(`Router (${t||e}): ${a}`)}),this.path=e,this.name=t,this.routes=[]}addRoute(e){return this.routes.push(e),this.raw.use(this.path,e.raw),this}values(){return{raw:this.raw,ratelimit:this.ratelimit,path:this.path,defaultCategory:this.name,routes:this.routes,middlewares:this.middlewares}}validate(){if(!this.routes.length)throw new Error("No routes provided");this.routes.forEach(e=>e.validate())}export(){return{name:this.name,path:this.path,routes:this.routes.map(e=>e.export())}}};var q=class{name;type;fields;constructor({name:e,type:t,fields:o}){this.name=e,this.type=t,this.fields=o}export(){return{name:this.name,type:this.type,fields:this.fields}}};var Y=m(require("express-rate-limit"));var P=class extends d{version;routers;constructor({version:e}){super("app"),new l().addNumber(o=>o.setName("version").setRequired(!0).setMin(1).setMax(1e4)).validate({version:e}).then(o=>{if(typeof o=="string")throw new Error(o)}),this.routers=[],this.version=e}setRateLimit(e,t){return(t||t===void 0)&&(this.ratelimit={statusCode:e.statusCode??429,...typeof e.windowMs=="number"?{window:e.windowMs}:{},...typeof e.max=="number"?{max:e.max}:{}}),this.raw.use(`v${this.version}`,(0,Y.default)(e)),this}addRouter(e){this.routers.push(e);let t=e.values();return this.raw.use(`v${this.version}`,t.raw),this}export(){return{version:this.version,rateLimit:this.ratelimit,routers:this.routers.map(e=>e.export())}}values(){return{path:`/v${this.version}`,raw:this.raw,version:this.version}}validate(){if(!this.routers.length)throw new Error("No routers provided");this.routers.forEach(e=>e.validate())}};ee.default.config();var xe=te.default;0&&(module.exports={ApiBuilder,EndpointBuilder,RouteBuilder,RouterBuilder,SchemaBuilder,StructureBuilder,VersionBuilder});
//# sourceMappingURL=index.js.map