import K from"dotenv";import Y from"express";import H from"colors";import c from"colors";import*as u from"winston";var O=!!process.env.DEBUG,j=s=>{switch(s){case"error":return c.red(s.toUpperCase());case"warn":return c.yellow(s.toUpperCase());case"info":return c.green(s.toUpperCase());case"debug":return c.blue(s.toUpperCase());case"trace":return c.magenta(s.toUpperCase());default:return c.white(s.toUpperCase())}},L=u.format.combine(u.format.colorize(),u.format.timestamp(),u.format.ms(),u.format.errors({stack:!0}),u.format.printf(({timestamp:s,ms:e,level:t,message:n,stack:o})=>{let r=n;o&&(r+=`
${o}`);let i=/\u001b\[[0-9]{1,2}m/gi;return`${c.gray(s)} (${c.magenta(e)}) [${j(t.replace(i,""))}]: ${r}`})),F=u.createLogger({level:"debug",format:L,transports:[new u.transports.Console({level:O?"debug":"info"}),new u.transports.Console({level:"error"}),new u.transports.Console({level:"warn"}),new u.transports.Console({level:"trace"})]}),h=F;var P=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),k=s=>/^[a-zA-Z0-9_]{3,16}$/.test(s),N=s=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(s),A=s=>/^\d{10}$/.test(s),I=s=>/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/.test(s);var M=s=>{try{return new URL(s).href===s}catch{return!1}},U=s=>{try{return new URL(s).href===s}catch{return!1}};function D(s,e,t){e.status(404).json({status:404,message:"The server cannot find the requested resource"}),h.error(H.red(`The route at ${s.originalUrl} was not found - ${s.method}`)),t()}function G(s,e,t){h.error(s),t.status(s.status||500),t.json({error:{status:s.status||500,message:"Internal Server Error",field:s.field}})}var R={notFound:D,errorHandler:G};import{startSession as z}from"mongoose";var W=async(s,e,t,n)=>{let o=await z();try{o.startTransaction(),await s(e,t,o),await o.commitTransaction(),n()}catch(r){await o.abortTransaction(),h.error(r),t.status(500).json({error:"Internal Server Error"})}finally{o.endSession()}},q=s=>(e,t,n)=>{W(s,e,t,n)};import Z,{Router as _}from"express";import{rateLimit as Q}from"express-rate-limit";var m=class{raw;ratelimit;middlewares;constructor(e="router"){e==="app"?this.raw=Z():this.raw=_(),this.middlewares=[]}setRateLimit(e,t){if(this.ratelimit)throw new Error("Rate limit already set.");return(t||t===void 0)&&(this.ratelimit={statusCode:e.statusCode??429,...typeof e.windowMs=="number"?{window:e.windowMs}:{},...typeof e.max=="number"?{max:e.max}:{}}),this.raw.use(Q(e)),this}addMiddleware(e){return this.middlewares.push(e),this.raw.use(e),this}};var C={},S=class{name;type;fields;constructor({name:e,type:t,fields:n}){this.name=e,this.type=t,this.fields=n,C[e]=this}export(){return{name:this.name,type:this.type,fields:this.fields}}};var E=class extends m{port;versions;name;description;baseUrl;logo;constructor({name:e,description:t,baseUrl:n,port:o,logo:r}){super("app"),this.versions=[],this.name=e,this.description=t,this.baseUrl=n,this.port=o,this.logo=r??""}addVersion(e){this.versions.push(e);let t=e.values();return this.raw.use(t.path,t.raw),this}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setBaseUrl(e){return this.baseUrl=e,this}setLogo(e){return this.logo=e,this}startServer(e){return this.raw.get("/",(n,o)=>o.json({message:"Welcome to Slekup API",versions:this.versions.map(r=>({version:`v${r.values().version}`,url:`${this.baseUrl}/v${r.values().version}`}))})),this.raw.use(R.notFound),this.raw.use(R.errorHandler),this.raw.listen(this.port,e)}export(){if(!this.name)throw new Error("The name of the API is not set.");if(!this.description)throw new Error("The description of the API is not set.");if(!this.baseUrl)throw new Error("The base URL of the API is not set.");if(!this.port)throw new Error("The port of the API is not set.");return{name:this.name,description:this.description,baseUrl:this.baseUrl,port:this.port,logo:this.logo,structures:C,rateLimit:this.ratelimit,versions:this.versions.map(e=>e.export())}}};var a=class{name;description;required;checks;structure;constructor(){this.name="Name not provided",this.description="Description not provided",this.required=!0,this.checks=[]}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setRequired(e){return this.required=e,this}addCheck(e){return this.checks.push(e),this}setStructure(e){return this.structure=e,this}};var b=class extends a{type="array";min;max;unique;contains;items;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}setUnique(e){return this.unique=e,this}setContains(e,t,n){return this.contains={type:e,...t?{min:t}:{},...n?{max:n}:{}},this}setItems(e){return this.items=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure,max:this.max,min:this.min,unique:this.unique}}};var f=class extends a{type="boolean";constructor(){super()}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var g=class extends a{type="image";constructor(){super()}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var x=class extends a{type="integer";min;max;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var v=class extends a{type="number";min;max;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var w=class extends a{type="object";properties;constructor(){super(),this.properties={}}setProperties(e){return this.properties=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var y=class extends a{type="string";min;max;options;test;constructor(){super()}setMin(e){return this.min=e,this}setMax(e){return this.max=e,this}setOptions(e){return this.options=e,this}setTest(e){return this.test=e,this}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};var d=class{schema;constructor(){this.schema={}}addArray(e){let t=new b;return e(t),this.schema[t.name]=t,this}addString(e){let t=new y;return e(t),this.schema[t.name]=t,this}addNumber(e){let t=new v;return e(t),this.schema[t.name]=t,this}addInteger(e){let t=new x;return e(t),this.schema[t.name]=t,this}addBoolean(e){let t=new f;return e(t),this.schema[t.name]=t,this}addObject(e){let t=new w;return e(t),this.schema[t.name]=t,this}addImage(e){let t=new g;return e(t),this.schema[t.name]=t,this}async validateBase(e,t,n){if(typeof e!="object")return"The data provided must be an object.";let o=Object.entries(t);for(let[r,i]of o)if(i.required&&!e[r])return`The field "${r}" has not been provided.`;for(let[r,i]of o)if(typeof e[r]!==i.type)return`The field "${r}" must be of type ${i.type}.`;for(let[r,i]of o){if(i.type==="number"){if(i.min&&i.max&&typeof e[r]=="number"&&(e[r]<i.min||e[r]>i.max))return`The field "${r}" must be between ${i.min} and ${i.max}.`;if(i.min&&typeof e[r]=="number"&&e[r]<i.min)return`The field "${r}" must be at least ${i.min}.`;if(i.max&&typeof e[r]=="number"&&e[r]>i.max)return`The field "${r}" must be less than ${i.max}.`}if(i.type==="integer"){if(i.min&&i.max&&typeof e[r]=="number"&&(e[r]<i.min||e[r]>i.max))return`The field "${r}" must be between ${i.min} and ${i.max}.`;if(i.min&&typeof e[r]=="number"&&e[r]<i.min)return`The field "${r}" must be at least ${i.min}.`;if(i.max&&typeof e[r]=="number"&&e[r]>i.max)return`The field "${r}" must be less than ${i.max}.`;if(typeof e[r]!="number"||!Number.isInteger(e[r]))return`The field "${r}" must be an integer.`}if(i.type==="string"){let p=i,l=e[r];if(i.options&&!i.options.includes(e[r]))return`The field "${r}" is not a valid option.`;if(i.min&&i.max&&(l.length<i.min||l.length>i.max))return`The field "${r}" must be between ${i.min} and ${i.max} characters.`;if(i.min&&l.length<i.min)return`The field "${r}" must be at least ${i.min} characters.`;if(i.max&&l.length>i.max)return`The field "${r}" must be less than ${i.max} characters.`;if(p.test==="email"&&!P(l))return`The field "${r}" must be a valid email address.`;if(p.test==="username"&&!k(l))return`The field "${r}" must be a valid username.`;if(p.test==="passwordStrength"&&!N(l))return`The field "${r}" is too weak to be a valid password.`;if(p.test==="phoneNumber"&&!A(l))return`The field "${r}" must be a valid phone number.`;if(p.test==="ipAddress"&&!I(l))return`The field "${r}" must be a valid IPv4 address.`;if(p.test==="url"&&!M(l))return`The field "${r}" must be a valid IPv4 address.`;if(typeof e[r]!="string")return`The field "${r}" must be a string.`}if(i.checks){for(let p of i.checks)if(!await p.run(r))return`${p.response}.`}if(i.type==="boolean"&&typeof e[r]!="boolean")return`The field "${r}" must be a boolean.`;if(i.type==="object"){if(typeof e[r]!="object")return`The field "${r}" must be an object.`;if(i.properties&&Object.keys(i.properties).length>0){let p=await this.validateBase(e[r],i.properties,!0);if(p)return p}}if(i.type==="array"&&!Array.isArray(e[r]))return`The field "${r}" must be an array.`;if(i.type==="image"){if(typeof e[r]!="string")return`The field "${r}" must be a string.`;if(!U(e[r]))return`The field "${r}" must be a valid image.`}}return!1}async validate(e,t){let n=await this.validateBase(e,this.schema);return n?t.status(400).json({status:400,message:n}):null}export(){let e={};return Object.entries(this.schema).forEach(([t,n])=>{let o=n.export();e[t]=o}),e}};var T=class{disabled;name;description;path;method;notes;paramSchema;querySchema;bodySchema;responses;controller;ratelimit;constructor(){this.disabled=!1,this.name="Name not provided",this.description="Description not provided",this.path="/",this.method="GET",this.notes=[],this.responses=[],this.controller=()=>{throw new Error("Controller not set")}}setDisabled(e){return this.disabled=e,this}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setPath(e){return this.path=e,this}setMethod(e){return this.method=e,this}setNotes(e){return this.notes=e,this}setParamSchema(e){let t=new d;return e(t),this.paramSchema=t,this}setQuerySchema(e){let t=new d;return e(t),this.querySchema=t,this}setBodySchema(e){let t=new d;return e(t),this.bodySchema=t,this}setResponses(e){return this.responses=e,this}setController(e){return this.controller=q(e),this}execute(e,t,n){(async()=>{try{return!this.paramSchema&&!this.querySchema&&!this.bodySchema?t.status(500).json({status:500,message:"Schema not set for endpoint."}):this.paramSchema&&await this.paramSchema.validate(e.params,t)||this.querySchema&&await this.querySchema.validate(e.query,t)||this.bodySchema&&await this.bodySchema.validate(e.body,t)?void 0:this.controller(e,t,n)}catch(o){h.error(o)}})()}export(){return{name:this.name,description:this.description,path:this.path==="/"?"":this.path,method:this.method,notes:this.notes,params:this.paramSchema?this.paramSchema.export():{},queries:this.querySchema?this.querySchema.export():{},body:this.bodySchema?this.bodySchema.export():{},responses:this.responses}}};import{Router as X}from"express";var B=class extends m{raw=X();path;name;description;endpoints=[];constructor(e){super(),this.path=e??"/",this.name="Unnamed route",this.description="No description provided."}setName(e){return this.name=e,this}setDescription(e){return this.description=e,this}setPath(e){return this.path=e,this}addEndpoint(e){this.endpoints.push(e);let t=/\/+/g,n=`${this.path}${e.path}`.replaceAll(t,"/");switch(e.method){case"GET":this.raw.get(n,e.controller);break;case"POST":this.raw.post(n,e.controller);break;case"PUT":this.raw.put(n,e.controller);break;case"PATCH":this.raw.patch(n,e.controller);break;case"DELETE":this.raw.delete(n,e.controller);break;case"OPTIONS":this.raw.options(n,e.controller);break;default:throw new Error(`Invalid method ${String(e.method)}`)}return this}addEndpointFile(e){for(let t of Object.values(e))this.addEndpoint(t);return this}export(){return{name:this.name,description:this.description,path:this.path,endpoints:this.endpoints.map(e=>e.export())}}};var V=class extends m{path;name;routes;constructor({path:e,name:t}){super(),this.path=e,this.name=t,this.routes=[]}addRoute(e){return this.routes.push(e),this.raw.use(this.path,e.raw),this}export(){return{name:this.name,path:this.path,routes:this.routes.map(e=>e.export())}}values(){return{raw:this.raw,ratelimit:this.ratelimit,path:this.path,defaultCategory:this.name,routes:this.routes,middlewares:this.middlewares}}};import J from"express-rate-limit";var $=class extends m{version;routers;constructor({version:e}){super("app"),this.routers=[],this.version=e}setRateLimit(e,t){return(t||t===void 0)&&(this.ratelimit={statusCode:e.statusCode??429,...typeof e.windowMs=="number"?{window:e.windowMs}:{},...typeof e.max=="number"?{max:e.max}:{}}),this.raw.use(`v${this.version}`,J(e)),this}addRouter(e){this.routers.push(e);let t=e.values();return this.raw.use(`v${this.version}`,t.raw),this}export(){return{version:this.version,rateLimit:this.ratelimit,routers:this.routers.map(e=>e.export())}}values(){return{path:`/v${this.version}`,raw:this.raw,version:this.version}}};K.config();var Rt=Y;export{E as ApiBuilder,T as EndpointBuilder,B as RouteBuilder,V as RouterBuilder,d as SchemaBuilder,S as StructureBuilder,$ as VersionBuilder,Rt as default};
//# sourceMappingURL=index.mjs.map