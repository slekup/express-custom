var Z=Object.defineProperty;var o=(i,e)=>Z(i,"name",{value:e,configurable:!0});import oe from"dotenv";import ae from"express";import J from"fs";import z from"path";var n=class extends Error{constructor(e){super(e),this.name="ExpressCustomError",this.stack=""}};o(n,"ExpressCustomError");import g from"colors";import*as d from"winston";var D=o(i=>{switch(i){case"error":return g.red(i.toUpperCase());case"warn":return g.yellow(i.toUpperCase());case"info":return g.green(i.toUpperCase());case"debug":return g.blue(i.toUpperCase());case"trace":return g.magenta(i.toUpperCase());default:return g.white(i.toUpperCase())}},"levelColor"),W=d.format.combine(d.format.colorize(),d.format.ms(),d.format.errors({stack:!0}),d.format.printf(({ms:i,level:e,message:t,stack:a})=>{let u=t;a&&(u+=`
${a}`);let r=/\u001b\[[0-9]{1,2}m/gi;return`[${g.gray("express-custom")}] ${g.cyan(i)} [${D(e.replace(r,""))}]: ${u}`})),Q=d.createLogger({level:"debug",format:W,transports:[new d.transports.Console({level:"info"})]}),w=Q;var A=o(i=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i),"validateEmail"),F=o(i=>/^[a-zA-Z0-9_]{3,16}$/.test(i),"validateUsername"),L=o(i=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(i),"valiedatePassword"),M=o(i=>/^\d{10}$/.test(i),"validatePhoneNumber"),U=o(i=>/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/.test(i),"validateIpv4Address");var G=o(i=>{try{return new URL(i).href===i}catch{return!1}},"validateUrl"),_=o(i=>/^\/(?:[a-zA-Z0-9_]+\/)?[a-zA-Z0-9_]*$/.test(i),"validatePath"),H=o(i=>{try{return new URL(i).href===i}catch{return!1}},"validateImage");function X(i,e,t){e.status(404).json({status:404,message:"The server cannot find the requested resource"}),t()}o(X,"notFound");function K(i,e,t){w.error(i.message),t.status(500).json({status:500,message:"Internal Server Error",field:i.field})}o(K,"errorHandler");var N={notFound:X,errorHandler:K};function j(i){return(e,t)=>{(async()=>{try{await i(e,t)}catch(a){w.error(a),t.status(500).json({status:500,message:"Internal Server Error"})}})()}}o(j,"initController");import T from"colors";import*as f from"winston";var b={inf:T.blue("CLI"),suc:T.green("CLI"),err:T.red("CLI")},qe={inf:T.blue("SITE"),suc:T.green("SITE"),err:T.red("SITE")},Y=f.format.combine(f.format.colorize(),f.format.errors({stack:!0}),f.format.printf(({message:i,stack:e})=>{let t=i;return e&&(t+=`
${e}`),t})),ee=f.createLogger({level:"info",format:Y,transports:[new f.transports.Console({level:"info"})]}),x=ee;import te,{Router as re}from"express";import{rateLimit as se}from"express-rate-limit";var h=class{raw;ratelimit;middlewares;constructor(e="router"){e==="app"?this.raw=te():this.raw=re(),this.middlewares=[]}setRateLimit(e){if(this.ratelimit)throw new n("Rate limit already set.");return this.ratelimit={statusCode:e.statusCode??429,...typeof e.windowMs=="number"?{window:e.windowMs}:{},...typeof e.max=="number"?{max:e.max}:{}},this.raw.use(se(e)),this}addMiddleware(e){return this.middlewares.push(e),this.raw.use(e),this}};o(h,"BaseApp");var c=class{name;description;required;checks;structure;defaultValue;constructor(e){this.name=e.name,this.description=e.description,this.required=e.required??!1,this.checks=e.checks??[],this.structure=e.structure,this.defaultValue=e.defaultValue,this.validate()}validate(){if(!this.name)throw new Error("Name is required");if(typeof this.name!="string")throw new Error("Name must be a string");if(this.description&&typeof this.description!="string")throw new Error("Description must be a string");if(typeof this.required!="boolean")throw new Error("Required must be a boolean");if(!Array.isArray(this.checks))throw new Error("Checks must be an array");if(this.structure&&typeof this.structure!="string")throw new Error("Structure must be a string")}};o(c,"BaseValue");var y=class extends c{type="array";min;max;unique;contains;items;constructor({min:e,max:t,unique:a,contains:u,items:r,...s}){super(s),this.min=e,this.max=t,this.unique=a??!1,this.contains=u,this.items=r}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure,max:this.max,min:this.min,unique:this.unique}}};o(y,"ArrayValueBuilder");var v=class extends c{type="boolean";constructor(e){super(e)}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};o(v,"BooleanValueBuilder");var S=class extends c{type="image";constructor(e){super(e)}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};o(S,"ImageValueBuilder");var V=class extends c{type="integer";min;max;constructor(e){super(e),this.min=e.min,this.max=e.max}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};o(V,"IntegerValueBuilder");var R=class extends c{type="number";min;max;constructor(e){super(e),this.min=e.min,this.max=e.max}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};o(R,"NumberValueBuilder");var E=class extends c{type="object";properties;constructor(e){super(e),this.properties={}}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};o(E,"ObjectValueBuilder");var $=class extends c{type="string";min;max;options;test;constructor(e){super(e),this.min=e.min,this.max=e.max,this.options=e.options,this.test=e.test}export(){return{type:this.type,name:this.name,description:this.description,required:this.required,structure:this.structure}}};o($,"StringValueBuilder");var p=class{schema;constructor(){this.schema={}}addArray(e){let t=new y(e);return this.schema[t.name]=t,this}addString(e){let t=new $(e);return this.schema[t.name]=t,this}addNumber(e){let t=new R(e);return this.schema[t.name]=t,this}addInteger(e){let t=new V(e);return this.schema[t.name]=t,this}addBoolean(e){let t=new v(e);return this.schema[t.name]=t,this}addObject(e){let t=new E(e);return this.schema[t.name]=t,this}addImage(e){let t=new S(e);return this.schema[t.name]=t,this}async validateBase(e,t,a){if(typeof e!="object")return"The data provided must be an object.";let u=Object.entries(t);for(let[r,s]of u){if(s.required){if(!e[r]&&s.defaultValue){e[r]=s.defaultValue;break}else if(!e[r])return`The field "${r}" has not been provided.`}if(!e[r]&&s.defaultValue)return e[r]=s.defaultValue,!1;if(!e[r])return!1}for(let[r,s]of u)if(typeof e[r]!==s.type)return`The field "${r}" must be of type ${s.type}.`;for(let[r,s]of u){if(s.type==="number"){if(s.min&&s.max&&typeof e[r]=="number"&&(e[r]<s.min||e[r]>s.max))return`The field "${r}" must be between ${s.min} and ${s.max}.`;if(s.min&&typeof e[r]=="number"&&e[r]<s.min)return`The field "${r}" must be at least ${s.min}.`;if(s.max&&typeof e[r]=="number"&&e[r]>s.max)return`The field "${r}" must be less than ${s.max}.`}if(s.type==="integer"){if(s.min&&s.max&&typeof e[r]=="number"&&(e[r]<s.min||e[r]>s.max))return`The field "${r}" must be between ${s.min} and ${s.max}.`;if(s.min&&typeof e[r]=="number"&&e[r]<s.min)return`The field "${r}" must be at least ${s.min}.`;if(s.max&&typeof e[r]=="number"&&e[r]>s.max)return`The field "${r}" must be less than ${s.max}.`;if(typeof e[r]!="number"||!Number.isInteger(e[r]))return`The field "${r}" must be an integer.`}if(s.type==="string"){let m=s,l=e[r];if(s.options&&s.options.length>0&&!s.options.includes(e[r]))return`The field "${r}" is not a valid option.`;if(s.min&&s.max&&(l.length<s.min||l.length>s.max))return`The field "${r}" must be between ${s.min} and ${s.max} characters.`;if(s.min&&l.length<s.min)return`The field "${r}" must be at least ${s.min} characters.`;if(s.max&&l.length>s.max)return`The field "${r}" must be less than ${s.max} characters.`;if(m.test==="email"&&!A(l))return`The field "${r}" must be a valid email address.`;if(m.test==="username"&&!F(l))return`The field "${r}" must be a valid username.`;if(m.test==="passwordStrength"&&!L(l))return`The field "${r}" is too weak to be a valid password.`;if(m.test==="phoneNumber"&&!M(l))return`The field "${r}" must be a valid phone number.`;if(m.test==="ipAddress"&&!U(l))return`The field "${r}" must be a valid IPv4 address.`;if(m.test==="url"&&!G(l))return`The field "${r}" must be a valid IPv4 address.`;if(m.test==="path"&&!_(l))return`The field "${r}" must be a valid path.`;if(typeof e[r]!="string")return`The field "${r}" must be a string.`}if(s.checks){for(let m of s.checks)if(!await m[0](r))return`${m[1]}.`}if(s.type==="boolean"&&typeof e[r]!="boolean")return`The field "${r}" must be a boolean.`;if(s.type==="object"){if(typeof e[r]!="object")return`The field "${r}" must be an object.`;if(s.properties&&Object.keys(s.properties).length>0){let m=await this.validateBase(e[r],s.properties,!0);if(m)return m}}if(s.type==="array"&&!Array.isArray(e[r]))return`The field "${r}" must be an array.`;if(s.type==="image"){if(typeof e[r]!="string")return`The field "${r}" must be a string.`;if(!H(e[r]))return`The field "${r}" must be a valid image.`}}return!1}async validate(e,t){let a=await this.validateBase(e,this.schema);return typeof a!="string"?null:t?.res?t.res.status(400).json({status:400,message:a}):a}export(){let e={};return Object.entries(this.schema).forEach(([t,a])=>{let u=a.export();e[t]=u}),e}};o(p,"SchemaBuilder");var O=class extends h{port;versions;groups;url;structures;config;constructor(e){super("app"),new p().addString({name:"url",required:!0,min:1,max:100}).addNumber({name:"port",required:!0,min:0,max:65536}).validate(e).then(a=>{if(typeof a=="string")throw new n(`Api: ${a}`)}),this.versions=[],this.groups=[],this.url=e.url,this.port=e.port,this.structures=e.structures??[],this.config=void 0}addVersion(e){this.versions.push(e);let t=e.values();return this.raw.use(t.path,t.raw),this}addGroup(e){this.groups.push(e);let t=e.values();return this.raw.use(t.path,t.raw),this}start(e){return this.validate(),this.raw.get("/",(a,u)=>u.json({message:`Welcome to ${this.config?.name??"the API"}`,versions:this.versions.map(r=>({version:`v${r.values().version}`,url:`${this.url}/v${r.values().version}`}))})),this.raw.use(N.notFound),this.raw.use(N.errorHandler),this.raw.listen(this.port,e)}async loadConfig(){let e={},t=z.join(process.cwd(),"express-custom.json");try{let m=await J.promises.readFile(t,"utf-8");try{e=JSON.parse(m.toString())}catch(l){throw x.error(`${b.err} Failed to parse config.json file (invalid JSON).`),new n(l)}}catch{x.error(`${b.err} No express-custom.json found, trying package.json`);try{let l=await J.promises.readFile(z.join(process.cwd(),"package.json"));try{let I=JSON.parse(l.toString())["express-custom"];if(typeof I!="object")throw x.error(`${b.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`),new n("Invalid JSON");e=I}catch(I){throw x.error(`${b.err} Failed to parse express-custom.json (invalid JSON or no "express-custom" block)`),new n(I)}}catch(l){throw x.error(`${b.err} Failed to load express-custom config from package.json`),new n(l)}}let a=/\.ts$|\.js$/,r=await new p().addString({name:"file",required:!0,max:256,checks:[[m=>a.test(m),"The file must be a JavaScript or TypeScript file (.js or .ts)."]]}).addString({name:"output",max:256,defaultValue:"docs"}).addString({name:"name",defaultValue:"My API"}).addString({name:"description",defaultValue:"Made with Express Custom"}).addString({name:"logo",defaultValue:"/logo.png"}).addString({name:"customDir",max:256}).addString({name:"theme",defaultValue:"default"}).addString({name:"codeTheme",defaultValue:"framer"}).addObject({name:"socials",defaultValue:{},properties:{discord:{type:"string"},github:{type:"string"},instagram:{type:"string"},facebook:{type:"string"},linkedin:{type:"string"},youtube:{type:"string"},twitter:{type:"string"},email:{type:"string"}}}).validate(e);typeof r=="string"&&(x.error(`${b.err} Validation error while processing express-config.json`),x.error(`${b.err} Error: ${r}`),process.exit(1));let s=e;return this.config=s,s}async getConfig(){return this.config?this.config:await this.loadConfig()}validate(){if(this.versions.length===0&&this.groups.length===0)throw new n("No versions or groups provided to the API");this.versions.forEach(e=>e.validate()),this.groups.forEach(e=>e.validate())}async export(){if(!this.url)throw new n("The base URL of the API is not set.");if(!this.port)throw new n("The port of the API is not set.");return{...await this.loadConfig(),url:this.url,port:this.port,structures:this.structures.map(t=>t.export()),rateLimit:this.ratelimit,versions:this.versions.map(t=>t.export()),groups:this.groups.map(t=>t.export())}}};o(O,"Api");var q=class{disabled;name;description;path;method;notes;paramSchema;querySchema;bodySchema;responses;controller;ratelimit;constructor(e){this.disabled=e.disabled??!1,this.name=e.name,this.description=e.description,this.path=e.path,this.method=e.method,this.controller=j(e.controller),this.notes=e.notes??[],this.responses=e.responses??[],new p().addBoolean({name:"disabled",required:!1,defaultValue:!1}).addString({name:"name",required:!0,min:1,max:50}).addString({name:"description",required:!0,min:1,max:1e3}).addString({name:"path",required:!0,min:1,max:100,test:"path"}).addString({name:"method",required:!0,min:1,max:100,options:["GET","POST","PATCH","PUT","DELETE","OPTIONS"]}).validate(e).then(a=>{if(typeof a=="string")throw new n(`Endpoint (${e.name||e.path}): ${a}`)})}setNotes(e){return this.notes=e,this}setParamSchema(e){let t=new p;return e(t),this.paramSchema=t,this}setQuerySchema(e){let t=new p;return e(t),this.querySchema=t,this}setBodySchema(e){let t=new p;return e(t),this.bodySchema=t,this}setResponses(e){return this.responses=e,this}setController(e){return this.controller=j(e),this}execute=(e,t,a)=>{(async()=>{try{if(this.paramSchema&&await this.paramSchema.validate(e.params,{res:t})||this.querySchema&&await this.querySchema.validate(e.query,{res:t})||this.bodySchema&&await this.bodySchema.validate(e.body,{res:t}))return;this.controller(e,t,a)}catch(u){w.error(u)}})()};export(){return{name:this.name,description:this.description,path:this.path==="/"?"":this.path,method:this.method,notes:this.notes,params:this.paramSchema?this.paramSchema.export():{},queries:this.querySchema?this.querySchema.export():{},body:this.bodySchema?this.bodySchema.export():{},responses:this.responses}}};o(q,"EndpointBuilder");var C=class extends h{path;name;routes;constructor({path:e,name:t}){super(),new p().addString({name:"path",required:!0,min:1,max:100,test:"path"}).addString({name:"name",required:!0,min:1,max:50}).validate({path:e,name:t}).then(u=>{if(typeof u=="string")throw new n(`Group (${t||e}): ${u}`)}),this.path=e,this.name=t,this.routes=[]}addRoute(e){return this.routes.push(e),this.raw.use(this.path,e.raw),this}values(){return{raw:this.raw,ratelimit:this.ratelimit,path:this.path,defaultCategory:this.name,routes:this.routes,middlewares:this.middlewares}}validate(){if(!this.routes.length)throw new n("No routes provided");this.routes.forEach(e=>e.validate())}export(){return{name:this.name,path:this.path,routes:this.routes.map(e=>e.export())}}};o(C,"GroupBuilder");var k=class extends h{path;name;description;endpoints=[];constructor({path:e,name:t,description:a}){super(),new p().addString({name:"path",required:!0,min:1,max:100,test:"path"}).addString({name:"name",required:!0,min:1,max:50}).addString({name:"description",required:!0,min:1,max:1e3}).validate({name:t,description:a,path:e}).then(r=>{if(typeof r=="string")throw new n(`Route (${t||e}): ${r}`)}),this.path=e,this.name=t,this.description=a}addEndpoint(e){this.endpoints.push(e);let t=/\/+/g,a=`${this.path}${e.path}`.replaceAll(t,"/");switch(e.method){case"GET":this.raw.get(a,e.execute);break;case"POST":this.raw.post(a,e.execute);break;case"PUT":this.raw.put(a,e.execute);break;case"PATCH":this.raw.patch(a,e.execute);break;case"DELETE":this.raw.delete(a,e.execute);break;case"OPTIONS":this.raw.options(a,e.execute);break;default:throw new n(`Invalid method ${String(e.method)}`)}return this}addEndpointFile(e){for(let t of Object.values(e))this.addEndpoint(t);return this}validate(){if(this.endpoints.length===0)throw new n(`Route ${this.name} has no endpoints`)}export(){return{name:this.name,description:this.description,path:this.path,endpoints:this.endpoints.map(e=>e.export())}}};o(k,"RouteBuilder");var P=class{name;type;fields;constructor({name:e,type:t,fields:a}){this.name=e,this.type=t,this.fields=a}export(){return{name:this.name,type:this.type,fields:this.fields}}};o(P,"StructureBuilder");import ie from"express-rate-limit";var B=class extends h{version;groups;constructor({version:e}){super("app"),new p().addNumber({name:"version",required:!0,min:1,max:1e4}).validate({version:e}).then(a=>{if(typeof a=="string")throw new n(a)}),this.groups=[],this.version=e}setRateLimit(e){return this.ratelimit={statusCode:e.statusCode??429,...typeof e.windowMs=="number"?{window:e.windowMs}:{},...typeof e.max=="number"?{max:e.max}:{}},this.raw.use(`v${this.version}`,ie(e)),this}addGroup(e){this.groups.push(e);let t=e.values();return this.raw.use(`v${this.version}`,t.raw),this}export(){return{version:this.version,rateLimit:this.ratelimit,groups:this.groups.map(e=>e.export())}}values(){return{path:`/v${this.version}`,raw:this.raw,version:this.version}}validate(){if(!this.groups.length)throw new n("No groups provided");this.groups.forEach(e=>e.validate())}};o(B,"VersionBuilder");oe.config();var nr=ae;export{O as Api,q as Endpoint,C as Group,k as Route,p as Schema,P as Structure,B as Version,nr as default};
//# sourceMappingURL=index.mjs.map