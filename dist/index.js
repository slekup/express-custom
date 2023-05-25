'use strict';
var A = Object.create;
var f = Object.defineProperty;
var M = Object.getOwnPropertyDescriptor;
var O = Object.getOwnPropertyNames;
var I = Object.getPrototypeOf,
  j = Object.prototype.hasOwnProperty;
var V = (t, e) => {
    for (var r in e) f(t, r, { get: e[r], enumerable: !0 });
  },
  S = (t, e, r, i) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let s of O(e))
        !j.call(t, s) &&
          s !== r &&
          f(t, s, {
            get: () => e[s],
            enumerable: !(i = M(e, s)) || i.enumerable,
          });
    return t;
  };
var g = (t, e, r) => (
    (r = t != null ? A(I(t)) : {}),
    S(
      e || !t || !t.__esModule
        ? f(r, 'default', { value: t, enumerable: !0 })
        : r,
      t
    )
  ),
  U = (t) => S(f({}, '__esModule', { value: !0 }), t);
var _ = {};
V(_, {
  EndpointBuilder: () => l,
  RouteBuilder: () => d,
  RouterBuilder: () => b,
  default: () => Z,
});
module.exports = U(_);
var B = g(require('dotenv')),
  q = g(require('express'));
var h = g(require('colors')),
  a = g(require('winston')),
  F = !!process.env.DEBUG,
  D = (t) => {
    switch (t) {
      case 'error':
        return h.default.red(t.toUpperCase());
      case 'warn':
        return h.default.yellow(t.toUpperCase());
      case 'info':
        return h.default.green(t.toUpperCase());
      case 'debug':
        return h.default.blue(t.toUpperCase());
      case 'trace':
        return h.default.magenta(t.toUpperCase());
      default:
        return h.default.white(t.toUpperCase());
    }
  },
  G = a.format.combine(
    a.format.colorize(),
    a.format.timestamp(),
    a.format.ms(),
    a.format.errors({ stack: !0 }),
    a.format.printf(
      ({ timestamp: t, ms: e, level: r, message: i, stack: s }) => {
        let n = i;
        s &&
          (n += `
${s}`);
        let o = /\u001b\[[0-9]{1,2}m/gi;
        return `${h.default.gray(t)} (${h.default.magenta(e)}) [${D(
          r.replace(o, '')
        )}]: ${n}`;
      }
    )
  ),
  W = a.createLogger({
    level: 'debug',
    format: G,
    transports: [
      new a.transports.Console({ level: F ? 'debug' : 'info' }),
      new a.transports.Console({ level: 'error' }),
      new a.transports.Console({ level: 'warn' }),
      new a.transports.Console({ level: 'trace' }),
    ],
  }),
  m = W;
var y = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t),
  x = (t) => /^[a-zA-Z0-9_]{3,16}$/.test(t),
  T = (t) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(t),
  v = (t) => /^\d{10}$/.test(t),
  R = (t) => /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/.test(t);
var $ = (t) => {
    try {
      return new URL(t).href === t;
    } catch {
      return !1;
    }
  },
  E = (t) => {
    try {
      return new URL(t).href === t;
    } catch {
      return !1;
    }
  };
var k = async (t, e) => {
    if (typeof t != 'object') return 'The data provided must be an object.';
    let r = Object.entries(e);
    for (let [i, s] of r)
      if (s.required && !t[i]) return `The field "${i}" has not been provided.`;
    for (let [i, s] of r)
      if (typeof t[i] !== s.type)
        return `The field "${i}" must be of type ${s.type}.`;
    for (let [i, s] of r) {
      if (s.options && !s.options.includes(t[i]))
        return `The field "${i}" is not a valid option.`;
      if (s.type === 'number') {
        if (
          s.min &&
          s.max &&
          typeof t[i] == 'number' &&
          (t[i] < s.min || t[i] > s.max)
        )
          return `The field "${i}" must be between ${s.min} and ${s.max}.`;
        if (s.min && typeof t[i] == 'number' && t[i] < s.min)
          return `The field "${i}" must be at least ${s.min}.`;
        if (s.max && typeof t[i] == 'number' && t[i] > s.max)
          return `The field "${i}" must be less than ${s.max}.`;
      }
      if (s.type === 'integer') {
        if (
          s.min &&
          s.max &&
          typeof t[i] == 'number' &&
          (t[i] < s.min || t[i] > s.max)
        )
          return `The field "${i}" must be between ${s.min} and ${s.max}.`;
        if (s.min && typeof t[i] == 'number' && t[i] < s.min)
          return `The field "${i}" must be at least ${s.min}.`;
        if (s.max && typeof t[i] == 'number' && t[i] > s.max)
          return `The field "${i}" must be less than ${s.max}.`;
        if (typeof t[i] != 'number' || !Number.isInteger(t[i]))
          return `The field "${i}" must be an integer.`;
      }
      if (s.type === 'string') {
        let n = s,
          o = t[i];
        if (s.min && s.max && (o.length < s.min || o.length > s.max))
          return `The field "${i}" must be between ${s.min} and ${s.max} characters.`;
        if (s.min && o.length < s.min)
          return `The field "${i}" must be at least ${s.min} characters.`;
        if (s.max && o.length > s.max)
          return `The field "${i}" must be less than ${s.max} characters.`;
        if (n.test === 'email' && !y(o))
          return `The field "${i}" must be a valid email address.`;
        if (n.test === 'username' && !x(o))
          return `The field "${i}" must be a valid username.`;
        if (n.test === 'passwordStrength' && !T(o))
          return `The field "${i}" is too weak to be a valid password.`;
        if (n.test === 'phoneNumber' && !v(o))
          return `The field "${i}" must be a valid phone number.`;
        if (n.test === 'ipAddress' && !R(o))
          return `The field "${i}" must be a valid IPv4 address.`;
        if (n.test === 'url' && !$(o))
          return `The field "${i}" must be a valid IPv4 address.`;
        if (typeof t[i] != 'string')
          return `The field "${i}" must be a string.`;
      }
      if (s.checks) {
        for (let n of s.checks) if (!(await n.run(i))) return `${n.response}.`;
      }
      if (s.type === 'boolean' && typeof t[i] != 'boolean')
        return `The field "${i}" must be a boolean.`;
      if (s.type === 'object') {
        if (typeof t[i] != 'object')
          return `The field "${i}" must be an object.`;
        if (s.properties) {
          let n = await k(t[i], s.properties);
          if (n) return n;
        }
      }
      if (s.type === 'array') {
        if (!Array.isArray(t[i])) return `The field "${i}" must be an array.`;
        if (s.items)
          for (let n of t[i]) {
            if (typeof n !== s.items.type)
              return `The field "${i}" must be an array of ${s.items.type}.`;
            if (!s.items.enum.includes(n))
              return `The field "${i}" must be an array of valid options.`;
          }
      }
      if (s.type === 'image') {
        if (typeof t[i] != 'string')
          return `The field "${i}" must be a string.`;
        if (!E(t[i])) return `The field "${i}" must be a valid image.`;
      }
    }
    return !1;
  },
  L = async (t, e, r) => {
    let i = await k(t, e);
    return i ? r.status(400).json({ status: 400, message: i }) : null;
  },
  c = L;
var C = require('mongoose');
var z = async (t, e, r, i) => {
    let s = await (0, C.startSession)();
    try {
      s.startTransaction(), await t(e, r, s), await s.commitTransaction(), i();
    } catch (n) {
      await s.abortTransaction(),
        m.error(n),
        r.status(500).json({ error: 'Internal Server Error' });
    } finally {
      s.endSession();
    }
  },
  w = (t) => (e, r, i) => {
    z(t, e, r, i);
  };
var u = class {
  name;
  type;
  typeSchema;
  description;
  required;
  options;
  enum;
  items;
  min;
  max;
  checks;
  properties;
  test;
  constructor(e) {
    (this.name = 'Name not provided'),
      (this.type = e),
      (this.description = 'Description not provided'),
      (this.required = !0);
  }
  setName(e) {
    return (this.name = e), this;
  }
  setTypeSchema(e) {
    return (this.typeSchema = e), this;
  }
  setDescription(e) {
    return (this.description = e), this;
  }
  setRequired(e) {
    return (this.required = e), this;
  }
  setOptions(e) {
    return (this.options = e), this;
  }
  setEnum(e) {
    return (this.enum = e), this;
  }
  setItems(e) {
    return (this.items = e), this;
  }
  setMin(e) {
    return (this.min = e), this;
  }
  setMax(e) {
    return (this.max = e), this;
  }
  setChecks(e) {
    return (this.checks = e), this;
  }
  setProperties(e) {
    return (this.properties = e), this;
  }
  setTest(e) {
    return (this.test = e), this;
  }
};
var p = class {
  schema;
  constructor() {
    this.schema = {};
  }
  addStringValue(e) {
    let r = new u('string');
    return e(r), (this.schema[r.name] = r), this;
  }
  addNumberValue(e) {
    let r = new u('number');
    return e(r), (this.schema[r.name] = r), this;
  }
  addIntegerValue(e) {
    let r = new u('integer');
    return e(r), (this.schema[r.name] = r), this;
  }
  addBooleanValue(e) {
    let r = new u('boolean');
    return e(r), (this.schema[r.name] = r), this;
  }
  addObjectValue(e) {
    let r = new u('object');
    return e(r), (this.schema[r.name] = r), this;
  }
  addArrayValue(e) {
    let r = new u('array');
    return e(r), (this.schema[r.name] = r), this;
  }
  addImageValue(e) {
    let r = new u('image');
    return e(r), (this.schema[r.name] = r), this;
  }
};
var l = class {
  disabled;
  name;
  description;
  path;
  method;
  notes;
  paramSchema;
  querySchema;
  bodySchema;
  responses;
  controller;
  constructor() {
    (this.disabled = !1),
      (this.name = 'Name not provided'),
      (this.description = 'Description not provided'),
      (this.path = '/'),
      (this.method = 'GET'),
      (this.notes = []),
      (this.responses = []),
      (this.controller = () => {
        throw new Error('Controller not set');
      });
  }
  setDisabled(e) {
    return (this.disabled = e), this;
  }
  setName(e) {
    return (this.name = e), this;
  }
  setDescription(e) {
    return (this.description = e), this;
  }
  setPath(e) {
    return (this.path = e), this;
  }
  setMethod(e) {
    return (this.method = e), this;
  }
  setNotes(e) {
    return (this.notes = e), this;
  }
  setParamSchema(e) {
    let r = new p();
    return e(r), (this.paramSchema = r.schema), this;
  }
  setQuerySchema(e) {
    let r = new p();
    return e(r), (this.querySchema = r.schema), this;
  }
  setBodySchema(e) {
    let r = new p();
    return e(r), (this.bodySchema = r.schema), this;
  }
  setResponses(e) {
    return (this.responses = e), this;
  }
  setController(e) {
    return (this.controller = w(e)), this;
  }
  execute(e, r, i) {
    (async () => {
      try {
        return !this.paramSchema && !this.querySchema && !this.bodySchema
          ? r
              .status(500)
              .json({ status: 500, message: 'Schema not set for endpoint.' })
          : (this.paramSchema && (await c(e.params, this.paramSchema, r))) ||
            (this.querySchema && (await c(e.query, this.querySchema, r))) ||
            (this.bodySchema && (await c(e.body, this.bodySchema, r)))
          ? void 0
          : this.controller(e, r, i);
      } catch (s) {
        m.error(s);
      }
    })();
  }
  export() {
    return {
      name: this.name,
      description: this.description,
      path: this.path,
      notes: this.notes,
      params: this.paramSchema ?? {},
      query: this.querySchema ?? {},
      body: this.bodySchema ?? {},
      responses: this.responses,
    };
  }
};
var P = require('express'),
  d = class {
    raw = (0, P.Router)();
    path;
    name;
    description;
    endpoints = [];
    middlewares = [];
    afterwares = [];
    constructor(e) {
      (this.path = e ?? '/'),
        (this.name = 'Unnamed route'),
        (this.description = 'No description provided.');
    }
    setName(e) {
      return (this.name = e), this;
    }
    setDescription(e) {
      return (this.description = e), this;
    }
    setPath(e) {
      return (this.path = e), this;
    }
    addMiddleware(e) {
      return this.middlewares.push(e), this;
    }
    addAfterware(e) {
      return this.afterwares.push(e), this;
    }
    addEndpoint(e) {
      this.endpoints.push(e);
      let r = `${this.path}${e.path}`.replace('//', '/');
      switch (e.method) {
        case 'GET':
          this.raw.get(r, ...this.middlewares, e.controller);
          break;
        case 'POST':
          this.raw.post(r, ...this.middlewares, e.controller);
          break;
        case 'PUT':
          this.raw.put(r, ...this.middlewares, e.controller);
          break;
        case 'PATCH':
          this.raw.patch(r, ...this.middlewares, e.controller);
          break;
        case 'DELETE':
          this.raw.delete(r, ...this.middlewares, e.controller);
          break;
        case 'OPTIONS':
          this.raw.options(r, ...this.middlewares, e.controller);
          break;
        default:
          throw new Error(`Invalid method ${String(e.method)}`);
      }
      return this;
    }
    addEndpointFile(e) {
      for (let r of Object.values(e)) this.addEndpoint(r);
      return this;
    }
    access() {
      return { middlewares: this.middlewares, afterwares: this.afterwares };
    }
    export() {
      return {
        name: this.name,
        description: this.description,
        path: this.path,
        endpoints: this.endpoints.map((e) => e.export()),
      };
    }
  };
var N = require('express');
var b = class {
  raw = (0, N.Router)();
  path;
  name;
  routes = [];
  middlewares = [];
  afterwares = [];
  constructor() {
    (this.path = '/'), (this.name = 'Unnamed router');
  }
  setName(e) {
    return (this.name = e), this;
  }
  setPath(e) {
    return (this.path = e), this;
  }
  addMiddleware(e) {
    return this.middlewares.push(e), this;
  }
  addAfterware(e) {
    return this.afterwares.push(e), this;
  }
  addRoute(e, r) {
    if (!e) return this;
    let i = /\/+/g,
      s = r.access();
    return (
      this.raw.use(e.replace(i, '/'), ...s.middlewares, r.raw, ...s.afterwares),
      this
    );
  }
  getRouter = () => this.raw;
  export() {
    return {
      name: this.name,
      path: this.path,
      routes: this.routes.map((e) => e.export()),
    };
  }
  async generateSite() {
    return (
      m.info('Generating site...'),
      await (() =>
        new Promise((r) => {
          setTimeout(() => {
            r(null);
          }, 1e3);
        }))(),
      m.error('Site generation has not been implemented yet.'),
      this
    );
  }
};
B.default.config();
var Z = q.default;
0 && (module.exports = { EndpointBuilder, RouteBuilder, RouterBuilder });
//# sourceMappingURL=index.js.map
