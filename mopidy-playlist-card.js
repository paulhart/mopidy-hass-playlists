/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = globalThis, Ke = be.ShadowRoot && (be.ShadyCSS === void 0 || be.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ze = Symbol(), hi = /* @__PURE__ */ new WeakMap();
let Di = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Ze) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ke && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = hi.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && hi.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Zi = (r) => new Di(typeof r == "string" ? r : r + "", void 0, Ze), dt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, o, a) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + r[a + 1], r[0]);
  return new Di(e, r, Ze);
}, Ji = (r, t) => {
  if (Ke) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = be.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, r.appendChild(i);
  }
}, ui = Ke ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Zi(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: tr, defineProperty: er, getOwnPropertyDescriptor: ir, getOwnPropertyNames: rr, getOwnPropertySymbols: or, getPrototypeOf: ar } = Object, Oe = globalThis, pi = Oe.trustedTypes, nr = pi ? pi.emptyScript : "", sr = Oe.reactiveElementPolyfillSupport, te = (r, t) => r, ke = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? nr : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, Je = (r, t) => !tr(r, t), fi = { attribute: !0, type: String, converter: ke, reflect: !1, useDefault: !1, hasChanged: Je };
Symbol.metadata ??= Symbol("metadata"), Oe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let jt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = fi) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && er(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: a } = ir(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: o, set(n) {
      const s = o?.call(this);
      a?.call(this, n), this.requestUpdate(t, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? fi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(te("elementProperties"))) return;
    const t = ar(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(te("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(te("properties"))) {
      const e = this.properties, i = [...rr(e), ...or(e)];
      for (const o of i) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, o] of e) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const o = this._$Eu(e, i);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) e.unshift(ui(o));
    } else t !== void 0 && e.push(ui(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ji(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : ke).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : ke;
      this._$Em = o;
      const s = n.fromAttribute(e, a.type);
      this[o] = s ?? this._$Ej?.get(o) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, a) {
    if (t !== void 0) {
      const n = this.constructor;
      if (o === !1 && (a = this[t]), i ??= n.getPropertyOptions(t), !((i.hasChanged ?? Je)(a, e) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: a }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), a !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, a] of i) {
        const { wrapped: n } = a, s = this[o];
        n !== !0 || this._$AL.has(o) || s === void 0 || this.C(o, void 0, a, s);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
jt.elementStyles = [], jt.shadowRootOptions = { mode: "open" }, jt[te("elementProperties")] = /* @__PURE__ */ new Map(), jt[te("finalized")] = /* @__PURE__ */ new Map(), sr?.({ ReactiveElement: jt }), (Oe.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ti = globalThis, mi = (r) => r, Se = ti.trustedTypes, gi = Se ? Se.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Oi = "$lit$", mt = `lit$${Math.random().toFixed(9).slice(2)}$`, Ni = "?" + mt, lr = `<${Ni}>`, Dt = document, ne = () => Dt.createComment(""), se = (r) => r === null || typeof r != "object" && typeof r != "function", ei = Array.isArray, cr = (r) => ei(r) || typeof r?.[Symbol.iterator] == "function", Me = `[ 	
\f\r]`, Vt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yi = /-->/g, vi = />/g, kt = RegExp(`>|${Me}(?:([^\\s"'>=/]+)(${Me}*=${Me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _i = /'/g, bi = /"/g, Ii = /^(?:script|style|textarea|title)$/i, dr = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), y = dr(1), Bt = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), wi = /* @__PURE__ */ new WeakMap(), At = Dt.createTreeWalker(Dt, 129);
function Mi(r, t) {
  if (!ei(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gi !== void 0 ? gi.createHTML(t) : t;
}
const hr = (r, t) => {
  const e = r.length - 1, i = [];
  let o, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Vt;
  for (let s = 0; s < e; s++) {
    const l = r[s];
    let c, u, d = -1, v = 0;
    for (; v < l.length && (n.lastIndex = v, u = n.exec(l), u !== null); ) v = n.lastIndex, n === Vt ? u[1] === "!--" ? n = yi : u[1] !== void 0 ? n = vi : u[2] !== void 0 ? (Ii.test(u[2]) && (o = RegExp("</" + u[2], "g")), n = kt) : u[3] !== void 0 && (n = kt) : n === kt ? u[0] === ">" ? (n = o ?? Vt, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, c = u[1], n = u[3] === void 0 ? kt : u[3] === '"' ? bi : _i) : n === bi || n === _i ? n = kt : n === yi || n === vi ? n = Vt : (n = kt, o = void 0);
    const w = n === kt && r[s + 1].startsWith("/>") ? " " : "";
    a += n === Vt ? l + lr : d >= 0 ? (i.push(c), l.slice(0, d) + Oi + l.slice(d) + mt + w) : l + mt + (d === -2 ? s : w);
  }
  return [Mi(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class le {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let a = 0, n = 0;
    const s = t.length - 1, l = this.parts, [c, u] = hr(t, e);
    if (this.el = le.createElement(c, i), At.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = At.nextNode()) !== null && l.length < s; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(Oi)) {
          const v = u[n++], w = o.getAttribute(d).split(mt), b = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: a, name: b[2], strings: w, ctor: b[1] === "." ? pr : b[1] === "?" ? fr : b[1] === "@" ? mr : Ne }), o.removeAttribute(d);
        } else d.startsWith(mt) && (l.push({ type: 6, index: a }), o.removeAttribute(d));
        if (Ii.test(o.tagName)) {
          const d = o.textContent.split(mt), v = d.length - 1;
          if (v > 0) {
            o.textContent = Se ? Se.emptyScript : "";
            for (let w = 0; w < v; w++) o.append(d[w], ne()), At.nextNode(), l.push({ type: 2, index: ++a });
            o.append(d[v], ne());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ni) l.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(mt, d + 1)) !== -1; ) l.push({ type: 7, index: a }), d += mt.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = Dt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Ht(r, t, e = r, i) {
  if (t === Bt) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const a = se(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== a && (o?._$AO?.(!1), a === void 0 ? o = void 0 : (o = new a(r), o._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = o : e._$Cl = o), o !== void 0 && (t = Ht(r, o._$AS(r, t.values), o, i)), t;
}
class ur {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, o = (t?.creationScope ?? Dt).importNode(e, !0);
    At.currentNode = o;
    let a = At.nextNode(), n = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new he(a, a.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (c = new gr(a, this, t)), this._$AV.push(c), l = i[++s];
      }
      n !== l?.index && (a = At.nextNode(), n++);
    }
    return At.currentNode = Dt, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class he {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = Ht(this, t, e), se(t) ? t === O || t == null || t === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : t !== this._$AH && t !== Bt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : cr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== O && se(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Dt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = le.createElement(Mi(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const a = new ur(o, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = wi.get(t.strings);
    return e === void 0 && wi.set(t.strings, e = new le(t)), e;
  }
  k(t) {
    ei(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const a of t) o === e.length ? e.push(i = new he(this.O(ne()), this.O(ne()), this, this.options)) : i = e[o], i._$AI(a), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = mi(t).nextSibling;
      mi(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ne {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, a) {
    this.type = 1, this._$AH = O, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = O;
  }
  _$AI(t, e = this, i, o) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = Ht(this, t, e, 0), n = !se(t) || t !== this._$AH && t !== Bt, n && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = a[0], l = 0; l < a.length - 1; l++) c = Ht(this, s[i + l], e, l), c === Bt && (c = this._$AH[l]), n ||= !se(c) || c !== this._$AH[l], c === O ? t = O : t !== O && (t += (c ?? "") + a[l + 1]), this._$AH[l] = c;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class pr extends Ne {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === O ? void 0 : t;
  }
}
class fr extends Ne {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== O);
  }
}
class mr extends Ne {
  constructor(t, e, i, o, a) {
    super(t, e, i, o, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Ht(this, t, e, 0) ?? O) === Bt) return;
    const i = this._$AH, o = t === O && i !== O || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== O && (i === O || o);
    o && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class gr {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ht(this, t);
  }
}
const yr = ti.litHtmlPolyfillSupport;
yr?.(le, he), (ti.litHtmlVersions ??= []).push("3.3.2");
const vr = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const a = e?.renderBefore ?? null;
    i._$litPart$ = o = new he(t.insertBefore(ne(), a), a, void 0, e ?? {});
  }
  return o._$AI(r), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = globalThis;
class G extends jt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = vr(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Bt;
  }
}
G._$litElement$ = !0, G.finalized = !0, ii.litElementHydrateSupport?.({ LitElement: G });
const _r = ii.litElementPolyfillSupport;
_r?.({ LitElement: G });
(ii.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const br = { attribute: !0, type: String, converter: ke, reflect: !1, hasChanged: Je }, wr = (r = br, t, e) => {
  const { kind: i, metadata: o } = e;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), a.set(e.name, r), i === "accessor") {
    const { name: n } = e;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(n, l, r, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(n, void 0, r, s), s;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(s) {
      const l = this[n];
      t.call(this, s), this.requestUpdate(n, l, r, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function k(r) {
  return (t, e) => typeof e == "object" ? wr(r, t, e) : ((i, o, a) => {
    const n = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, i), n ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(r) {
  return k({ ...r, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $r = (r, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(r, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ri(r, t) {
  return (e, i, o) => {
    const a = (n) => n.renderRoot?.querySelector(r) ?? null;
    return $r(e, i, { get() {
      return a(this);
    } });
  };
}
const bt = dt`
  :host {
    display: block;
    font-family: var(--ha-card-header-font-family, inherit);
  }

  ha-card {
    overflow: hidden;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }

  .card-header h1 {
    margin: 0;
    font-size: 1.2em;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .card-content {
    padding: 16px;
  }

  .card-actions {
    display: flex;
    justify-content: flex-end;
    padding: 8px 16px;
    border-top: 1px solid var(--divider-color, #e0e0e0);
  }

  /* Buttons */
  ha-button,
  mwc-button {
    --mdc-theme-primary: var(--primary-color);
  }

  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: var(--primary-text-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  .icon-button:hover {
    background-color: var(--secondary-background-color);
  }

  .icon-button ha-icon {
    --mdc-icon-size: 24px;
  }

  /* List styles */
  .list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .list-item:hover {
    background-color: var(--secondary-background-color);
  }

  .list-item:last-child {
    border-bottom: none;
  }

  .list-item-content {
    flex: 1;
    min-width: 0;
  }

  .list-item-title {
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list-item-subtitle {
    font-size: 0.85em;
    color: var(--secondary-text-color);
    margin-top: 2px;
  }

  .list-item-actions {
    display: flex;
    gap: 4px;
    margin-left: 8px;
  }

  /* Drag handle */
  .drag-handle {
    cursor: grab;
    color: var(--secondary-text-color);
    padding: 4px;
    margin-right: 8px;
  }

  .drag-handle:active {
    cursor: grabbing;
  }

  /* Sortable ghost */
  .sortable-ghost {
    opacity: 0.4;
    background-color: var(--primary-color, #03a9f4);
  }

  /* Track item */
  .track-number {
    width: 32px;
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 0.9em;
    flex-shrink: 0;
  }

  .track-duration {
    color: var(--secondary-text-color);
    font-size: 0.85em;
    margin-left: 8px;
    flex-shrink: 0;
  }

  /* Loading state */
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px;
  }

  ha-circular-progress {
    --mdc-theme-primary: var(--primary-color);
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 32px;
    color: var(--secondary-text-color);
  }

  .empty-state ha-icon {
    --mdc-icon-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  /* Dialog styles */
  ha-dialog {
    --mdc-dialog-min-width: 400px;
  }

  .dialog-content {
    padding: 24px;
  }

  .form-field {
    margin-bottom: 16px;
  }

  .form-field label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  ha-textfield {
    width: 100%;
  }

  /* Error state */
  .error {
    color: var(--error-color);
    padding: 16px;
    text-align: center;
  }

  /* Success toast */
  .toast {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--primary-color);
    color: var(--text-primary-color);
    padding: 12px 24px;
    border-radius: 4px;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 600px) {
    .card-header {
      padding: 12px;
    }

    .card-content {
      padding: 12px;
    }

    .list-item {
      padding: 10px 12px;
    }

    ha-dialog {
      --mdc-dialog-min-width: 90vw;
    }
  }
`;
function Xe(r) {
  if (r == null) return "--:--";
  const t = Math.floor(r / 3600), e = Math.floor(r % 3600 / 60), i = Math.floor(r % 60);
  return t > 0 ? `${t}:${e.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}` : `${e}:${i.toString().padStart(2, "0")}`;
}
function xr(r) {
  if (r === 0) return "0 min";
  const t = Math.floor(r / 3600), e = Math.floor(r % 3600 / 60);
  return t > 0 ? `${t}h ${e}m` : `${e} min`;
}
function f(...r) {
  console.log("[MopidyPlaylistCard]", ...r);
}
function S(...r) {
  console.error("[MopidyPlaylistCard]", ...r);
}
class Er {
  constructor(t, e) {
    this.hass = t, this.entityId = e, f("MopidyService constructed with entity:", e);
  }
  /**
   * Get the entity name without domain prefix
   */
  get entityName() {
    return this.entityId.replace(/^media_player\./, "");
  }
  /**
   * Get the safe service name suffix from the entity's friendly name
   * Converts the friendly name to a safe form:
   * - Lowercase
   * - Spaces replaced with underscores
   * - Special characters removed (only alphanumeric and underscores kept)
   * - Multiple underscores collapsed to single
   *
   * Example: "Frank's Music" -> "franks_music"
   */
  get safeServiceName() {
    const e = this.hass.states[this.entityId]?.attributes?.friendly_name, i = e || this.entityName;
    f("safeServiceName: friendlyName=", e, "entityName=", this.entityName, "name=", i);
    const o = i.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "").replace(/_+/g, "_").replace(/^_|_$/g, "");
    return f("safeServiceName result:", o), o;
  }
  /**
   * Get the service domain (mopidyhass)
   */
  get serviceDomain() {
    return "mopidyhass";
  }
  /**
   * Call a mopidyhass service
   */
  async callService(t, e = {}) {
    f("Calling service:", this.serviceDomain, ".", t, "with data:", e);
    try {
      await this.hass.callService(this.serviceDomain, t, e), f("Service call successful:", t);
    } catch (i) {
      throw S("Service call failed:", t, i), i;
    }
  }
  /**
   * Browse media using Home Assistant's media browser
   */
  async browseMedia(t, e) {
    f("browseMedia called with:", { mediaContentId: t, mediaContentType: e });
    try {
      const i = await this.hass.callWS({
        type: "media_player/browse_media",
        entity_id: this.entityId,
        media_content_id: t,
        media_content_type: e
      });
      return f("browseMedia result:", i), i;
    } catch (i) {
      if (S("browseMedia failed:"), S("  Error type:", typeof i), S("  Error value:", i), i && typeof i == "object") {
        S("  Error keys:", Object.keys(i));
        const o = i;
        "code" in o && S("  Error code:", o.code), "message" in o && S("  Error message:", o.message);
      }
      throw i;
    }
  }
  /**
   * Get all playlists
   */
  async getPlaylists() {
    f("getPlaylists called");
    try {
      const t = await this.browseMedia();
      f("Root browse result:", t);
      const e = [];
      if (t.children) {
        f("Root has", t.children.length, "children:"), t.children.forEach((i, o) => {
          f(`  Child ${o}:`, {
            title: i.title,
            media_content_id: i.media_content_id,
            media_content_type: i.media_content_type,
            can_play: i.can_play,
            can_expand: i.can_expand,
            children_media_class: i.children_media_class,
            media_class: i.media_class
          });
        });
        for (const i of t.children) {
          const o = i.media_content_id?.includes("playlists") || i.title?.toLowerCase() === "playlists";
          if (f("Checking child for playlists:", i.title, "isPlaylistsContainer:", o), o) {
            f("Found playlists container, browsing into it...");
            const a = await this.browseMedia(
              i.media_content_id,
              i.media_content_type
            );
            if (f("Playlists container result:", a), a.children) {
              f("Found", a.children.length, "items in playlists container");
              for (const n of a.children)
                f("Adding playlist:", n.title, "uri:", n.media_content_id, "contentType:", n.media_content_type), e.push({
                  uri: n.media_content_id || "",
                  name: n.title,
                  trackCount: 0,
                  // Will be populated on detail view
                  mediaContentType: n.media_content_type
                });
            }
          }
        }
      } else
        f("Root result has no children");
      return f("getPlaylists returning", e.length, "playlists"), e;
    } catch (t) {
      return S("Error fetching playlists:", t), [];
    }
  }
  /**
   * Get a specific playlist with track details
   */
  async getPlaylist(t, e) {
    f("getPlaylist called with uri:", t, "mediaContentType:", e);
    try {
      const i = await this.browseMedia(t, e);
      f("Playlist browse result:", i), f("Playlist not_shown:", i.not_shown, "children count:", i.children?.length);
      const o = [];
      let a = 1;
      if (i.children) {
        f("Playlist has", i.children.length, "tracks");
        for (const s of i.children) {
          const l = {
            uri: s.media_content_id || "",
            name: s.title,
            artists: this.extractArtists(s),
            album: this.extractAlbum(s),
            duration: this.extractDuration(s),
            trackNo: a++
          };
          f("Track", a - 1, ":", l), o.push(l);
        }
      } else
        f("Playlist has no children/tracks");
      i.not_shown && i.not_shown > 0 && S("WARNING:", i.not_shown, "tracks not shown due to pagination limit");
      const n = {
        uri: t,
        name: i.title,
        tracks: o,
        trackCount: o.length,
        duration: this.calculateTotalDuration(o)
      };
      return f("getPlaylist returning:", n), n;
    } catch (i) {
      return S("Error fetching playlist:", i), null;
    }
  }
  /**
   * Get the current queue by browsing the queue: media content
   */
  async getQueue() {
    f("getQueue called for entity:", this.entityId);
    try {
      const t = await this.browseMedia("queue:", "playlist");
      if (f("Queue browse result:", t), !t || !t.children)
        return f("Queue browse returned no children"), [];
      f("Queue has", t.children.length, "items");
      const e = [];
      let i = 0;
      for (const o of t.children) {
        const a = {
          uri: o.media_content_id || "",
          name: o.title,
          artists: this.extractArtists(o),
          album: this.extractAlbum(o),
          duration: this.extractDuration(o),
          position: i,
          trackId: i
          // Use position as track ID since we don't have the actual ID
        };
        f("Queue item", i, ":", a), e.push(a), i++;
      }
      return f("getQueue returning", e.length, "items"), e;
    } catch (t) {
      if (S("Error fetching queue:"), S("  Error type:", typeof t), S("  Error value:", t), t && typeof t == "object") {
        const e = t;
        "code" in e && S("  Error code:", e.code), "message" in e && S("  Error message:", e.message);
      }
      return [];
    }
  }
  /**
   * Create a new empty playlist
   */
  async createPlaylist(t, e) {
    f("createPlaylist called:", { name: t, uriScheme: e }), await this.callService(`${this.entityName}_create_playlist`, {
      name: t,
      uri_scheme: e
    });
  }
  /**
   * Delete a playlist
   */
  async deletePlaylist(t) {
    f("deletePlaylist called:", { uri: t }), await this.callService(`${this.entityName}_delete_playlist`, {
      uri: t
    });
  }
  /**
   * Rename a playlist
   */
  async renamePlaylist(t, e) {
    f("renamePlaylist called:", { uri: t, name: e }), await this.callService(`${this.entityName}_rename_playlist`, {
      uri: t,
      name: e
    });
  }
  /**
   * Add tracks to a playlist
   */
  async addToPlaylist(t, e, i) {
    f("addToPlaylist called:", { playlistUri: t, trackUris: e, position: i }), await this.callService(`${this.entityName}_add_to_playlist`, {
      playlist_uri: t,
      track_uris: e,
      position: i
    });
  }
  /**
   * Remove tracks from a playlist
   */
  async removeFromPlaylist(t, e) {
    f("removeFromPlaylist called:", { playlistUri: t, positions: e }), await this.callService(`${this.entityName}_remove_from_playlist`, {
      playlist_uri: t,
      positions: e
    });
  }
  /**
   * Move tracks within a playlist
   */
  async moveInPlaylist(t, e, i, o) {
    f("moveInPlaylist called:", { playlistUri: t, start: e, end: i, newPosition: o }), await this.callService(`${this.entityName}_move_in_playlist`, {
      playlist_uri: t,
      start: e,
      end: i,
      new_position: o
    });
  }
  /**
   * Clear all tracks from a playlist
   */
  async clearPlaylist(t) {
    f("clearPlaylist called:", { uri: t }), await this.callService(`${this.entityName}_clear_playlist`, {
      uri: t
    });
  }
  /**
   * Save current queue as a new playlist
   */
  async saveQueueToPlaylist(t, e) {
    f("saveQueueToPlaylist called:", { name: t, uriScheme: e }), await this.callService(`${this.entityName}_save_queue_to_playlist`, {
      name: t,
      uri_scheme: e
    });
  }
  /**
   * Play a playlist
   */
  async playPlaylist(t) {
    f("playPlaylist called:", { uri: t }), await this.hass.callService("media_player", "play_media", {
      entity_id: this.entityId,
      media_content_id: t,
      media_content_type: "playlist"
    });
  }
  /**
   * Play a specific track
   */
  async playTrack(t) {
    f("playTrack called:", { uri: t }), await this.hass.callService("media_player", "play_media", {
      entity_id: this.entityId,
      media_content_id: t,
      media_content_type: "music"
    });
  }
  /**
   * Search for tracks in the media library using the mopidyhass search service
   */
  async searchTracks(t, e) {
    f("searchTracks called with query:", t, "limit:", e);
    try {
      const i = await this.searchLibrary({ query: t, limit: e });
      f("Search result:", i);
      const o = i.tracks.map((a) => ({
        uri: a.uri,
        name: a.name,
        artists: a.artists,
        album: a.album,
        duration: a.duration,
        trackNo: a.track_no
      }));
      return f("searchTracks returning", o.length, "tracks"), o;
    } catch (i) {
      if (S("Search failed:"), S("  Error type:", typeof i), S("  Error value:", i), i && typeof i == "object") {
        const o = i;
        "code" in o && S("  Error code:", o.code), "message" in o && S("  Error message:", o.message);
      }
      return [];
    }
  }
  /**
   * Search the library using the mopidyhass search service
   * Returns full search results with albums, artists, and tracks
   */
  async searchLibrary(t) {
    f("searchLibrary called with query:", t);
    try {
      await this.callService(`${this.safeServiceName}_search_library`, {
        query: t.query,
        exact: t.exact ?? !1,
        limit: t.limit ?? 50
      }), f("searchLibrary service call completed, browsing search results...");
      const e = await this.browseMedia("search:", "search");
      f("searchLibrary browse result:", e);
      const i = {
        albums: [],
        artists: [],
        tracks: []
      };
      if (e.children)
        for (const o of e.children) {
          const a = o.media_content_type || o.media_class || "";
          f("Processing search result child:", o.title, "contentType:", a), a === "album" || o.media_class === "album" ? i.albums.push({
            uri: o.media_content_id || "",
            name: o.title,
            artists: this.extractArtists(o)
          }) : a === "artist" || o.media_class === "artist" ? i.artists.push({
            uri: o.media_content_id || "",
            name: o.title
          }) : (a === "track" || a === "music" || o.media_class === "track") && i.tracks.push({
            uri: o.media_content_id || "",
            name: o.title,
            artists: this.extractArtists(o),
            album: this.extractAlbum(o),
            duration: this.extractDuration(o)
          });
        }
      return f("searchLibrary returning:", i), i;
    } catch (e) {
      if (S("searchLibrary failed:"), S("  Error type:", typeof e), S("  Error value:", e), e && typeof e == "object") {
        const i = e;
        "code" in i && S("  Error code:", i.code), "message" in i && S("  Error message:", i.message);
      }
      throw e;
    }
  }
  // Helper methods
  extractArtists(t) {
    const i = (t.title || "").split(" - ");
    return i.length > 1 ? [i[0]] : [];
  }
  extractAlbum(t) {
  }
  extractDuration(t) {
  }
  calculateTotalDuration(t) {
    return t.reduce((e, i) => e + (i.duration || 0), 0);
  }
}
var kr = Object.defineProperty, Sr = Object.getOwnPropertyDescriptor, oi = (r, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Sr(t, e) : t, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && kr(t, e, o), o;
};
function St(...r) {
  console.log("[PlaylistList]", ...r);
}
let ce = class extends G {
  constructor() {
    super(...arguments), this.playlists = [], this.loading = !1;
  }
  _onPlaylistClick(r) {
    St("Playlist clicked:", r), this.dispatchEvent(new CustomEvent("select-playlist", {
      detail: { playlist: r },
      bubbles: !0,
      composed: !0
    }));
  }
  _onDeleteClick(r, t) {
    r.stopPropagation(), St("Delete clicked for playlist:", t), this.dispatchEvent(new CustomEvent("delete-playlist", {
      detail: { playlist: t },
      bubbles: !0,
      composed: !0
    }));
  }
  _onPlayClick(r, t) {
    r.stopPropagation(), St("Play clicked for playlist:", t), this.dispatchEvent(new CustomEvent("play-playlist", {
      detail: { playlist: t },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return St("render() called, loading:", this.loading, "playlists count:", this.playlists.length), this.loading ? (St("Rendering loading state"), y`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
        </div>
      `) : this.playlists.length === 0 ? (St("Rendering empty state - no playlists"), y`
        <div class="empty-state">
          <ha-icon icon="mdi:playlist-music"></ha-icon>
          <p>No playlists found</p>
          <p>Create a new playlist to get started</p>
        </div>
      `) : (St("Rendering", this.playlists.length, "playlists"), y`
      <div class="list">
        ${this.playlists.map((r) => y`
          <div class="playlist-item" @click=${() => this._onPlaylistClick(r)}>
            <div class="playlist-icon">
              <ha-icon icon="mdi:playlist-music"></ha-icon>
            </div>
            <div class="playlist-info">
              <div class="playlist-name">${r.name}</div>
              <div class="playlist-meta">
                ${r.trackCount !== void 0 ? `${r.trackCount} track${r.trackCount !== 1 ? "s" : ""}` : "Playlist"}
              </div>
            </div>
            <div class="playlist-actions">
              <button 
                class="action-button" 
                @click=${(t) => this._onPlayClick(t, r)}
                title="Play playlist"
              >
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
              <button 
                class="action-button delete" 
                @click=${(t) => this._onDeleteClick(t, r)}
                title="Delete playlist"
              >
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            <div class="chevron">
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </div>
          </div>
        `)}
      </div>
    `);
  }
};
ce.styles = [bt, dt`
    :host {
      display: block;
    }

    .playlist-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .playlist-item:hover {
      background-color: var(--secondary-background-color);
    }

    .playlist-item:last-child {
      border-bottom: none;
    }

    .playlist-icon {
      margin-right: 12px;
      color: var(--primary-color);
    }

    .playlist-icon ha-icon {
      --mdc-icon-size: 24px;
    }

    .playlist-info {
      flex: 1;
      min-width: 0;
    }

    .playlist-name {
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .playlist-meta {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .playlist-actions {
      display: flex;
      gap: 4px;
      margin-left: 8px;
    }

    .action-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--secondary-text-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s, background-color 0.2s;
    }

    .action-button:hover {
      color: var(--primary-color);
      background-color: var(--secondary-background-color);
    }

    .action-button.delete:hover {
      color: var(--error-color);
    }

    .action-button ha-icon {
      --mdc-icon-size: 20px;
    }

    .chevron {
      color: var(--secondary-text-color);
      margin-left: 4px;
    }

    .chevron ha-icon {
      --mdc-icon-size: 24px;
    }
  `];
oi([
  k({ type: Array })
], ce.prototype, "playlists", 2);
oi([
  k({ type: Boolean })
], ce.prototype, "loading", 2);
ce = oi([
  _t("mopidy-playlist-list")
], ce);
/**!
 * Sortable 1.15.7
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Pr(r, t, e) {
  return (t = Dr(t)) in r ? Object.defineProperty(r, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : r[t] = e, r;
}
function st() {
  return st = Object.assign ? Object.assign.bind() : function(r) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e) ({}).hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, st.apply(null, arguments);
}
function $i(r, t) {
  var e = Object.keys(r);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(r);
    t && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(r, o).enumerable;
    })), e.push.apply(e, i);
  }
  return e;
}
function it(r) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $i(Object(e), !0).forEach(function(i) {
      Pr(r, i, e[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(e)) : $i(Object(e)).forEach(function(i) {
      Object.defineProperty(r, i, Object.getOwnPropertyDescriptor(e, i));
    });
  }
  return r;
}
function Cr(r, t) {
  if (r == null) return {};
  var e, i, o = Tr(r, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(r);
    for (i = 0; i < a.length; i++) e = a[i], t.indexOf(e) === -1 && {}.propertyIsEnumerable.call(r, e) && (o[e] = r[e]);
  }
  return o;
}
function Tr(r, t) {
  if (r == null) return {};
  var e = {};
  for (var i in r) if ({}.hasOwnProperty.call(r, i)) {
    if (t.indexOf(i) !== -1) continue;
    e[i] = r[i];
  }
  return e;
}
function Ar(r, t) {
  if (typeof r != "object" || !r) return r;
  var e = r[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(r, t);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(r);
}
function Dr(r) {
  var t = Ar(r, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Ye(r) {
  "@babel/helpers - typeof";
  return Ye = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ye(r);
}
var Or = "1.15.7";
function nt(r) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(r);
}
var ht = nt(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), ue = nt(/Edge/i), xi = nt(/firefox/i), ee = nt(/safari/i) && !nt(/chrome/i) && !nt(/android/i), ai = nt(/iP(ad|od|hone)/i), Ri = nt(/chrome/i) && nt(/android/i), ji = {
  capture: !1,
  passive: !1
};
function x(r, t, e) {
  r.addEventListener(t, e, !ht && ji);
}
function $(r, t, e) {
  r.removeEventListener(t, e, !ht && ji);
}
function Pe(r, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), r)
      try {
        if (r.matches)
          return r.matches(t);
        if (r.msMatchesSelector)
          return r.msMatchesSelector(t);
        if (r.webkitMatchesSelector)
          return r.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function qi(r) {
  return r.host && r !== document && r.host.nodeType && r.host !== r ? r.host : r.parentNode;
}
function J(r, t, e, i) {
  if (r) {
    e = e || document;
    do {
      if (t != null && (t[0] === ">" ? r.parentNode === e && Pe(r, t) : Pe(r, t)) || i && r === e)
        return r;
      if (r === e) break;
    } while (r = qi(r));
  }
  return null;
}
var Ei = /\s+/g;
function Y(r, t, e) {
  if (r && t)
    if (r.classList)
      r.classList[e ? "add" : "remove"](t);
    else {
      var i = (" " + r.className + " ").replace(Ei, " ").replace(" " + t + " ", " ");
      r.className = (i + (e ? " " + t : "")).replace(Ei, " ");
    }
}
function m(r, t, e) {
  var i = r && r.style;
  if (i) {
    if (e === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? e = document.defaultView.getComputedStyle(r, "") : r.currentStyle && (e = r.currentStyle), t === void 0 ? e : e[t];
    !(t in i) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), i[t] = e + (typeof e == "string" ? "" : "px");
  }
}
function Ft(r, t) {
  var e = "";
  if (typeof r == "string")
    e = r;
  else
    do {
      var i = m(r, "transform");
      i && i !== "none" && (e = i + " " + e);
    } while (!t && (r = r.parentNode));
  var o = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return o && new o(e);
}
function zi(r, t, e) {
  if (r) {
    var i = r.getElementsByTagName(t), o = 0, a = i.length;
    if (e)
      for (; o < a; o++)
        e(i[o], o);
    return i;
  }
  return [];
}
function et() {
  var r = document.scrollingElement;
  return r || document.documentElement;
}
function D(r, t, e, i, o) {
  if (!(!r.getBoundingClientRect && r !== window)) {
    var a, n, s, l, c, u, d;
    if (r !== window && r.parentNode && r !== et() ? (a = r.getBoundingClientRect(), n = a.top, s = a.left, l = a.bottom, c = a.right, u = a.height, d = a.width) : (n = 0, s = 0, l = window.innerHeight, c = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || e) && r !== window && (o = o || r.parentNode, !ht))
      do
        if (o && o.getBoundingClientRect && (m(o, "transform") !== "none" || e && m(o, "position") !== "static")) {
          var v = o.getBoundingClientRect();
          n -= v.top + parseInt(m(o, "border-top-width")), s -= v.left + parseInt(m(o, "border-left-width")), l = n + a.height, c = s + a.width;
          break;
        }
      while (o = o.parentNode);
    if (i && r !== window) {
      var w = Ft(o || r), b = w && w.a, E = w && w.d;
      w && (n /= E, s /= b, d /= b, u /= E, l = n + u, c = s + d);
    }
    return {
      top: n,
      left: s,
      bottom: l,
      right: c,
      width: d,
      height: u
    };
  }
}
function ki(r, t, e) {
  for (var i = yt(r, !0), o = D(r)[t]; i; ) {
    var a = D(i)[e], n = void 0;
    if (n = o >= a, !n) return i;
    if (i === et()) break;
    i = yt(i, !1);
  }
  return !1;
}
function Lt(r, t, e, i) {
  for (var o = 0, a = 0, n = r.children; a < n.length; ) {
    if (n[a].style.display !== "none" && n[a] !== g.ghost && (i || n[a] !== g.dragged) && J(n[a], e.draggable, r, !1)) {
      if (o === t)
        return n[a];
      o++;
    }
    a++;
  }
  return null;
}
function ni(r, t) {
  for (var e = r.lastElementChild; e && (e === g.ghost || m(e, "display") === "none" || t && !Pe(e, t)); )
    e = e.previousElementSibling;
  return e || null;
}
function W(r, t) {
  var e = 0;
  if (!r || !r.parentNode)
    return -1;
  for (; r = r.previousElementSibling; )
    r.nodeName.toUpperCase() !== "TEMPLATE" && r !== g.clone && (!t || Pe(r, t)) && e++;
  return e;
}
function Si(r) {
  var t = 0, e = 0, i = et();
  if (r)
    do {
      var o = Ft(r), a = o.a, n = o.d;
      t += r.scrollLeft * a, e += r.scrollTop * n;
    } while (r !== i && (r = r.parentNode));
  return [t, e];
}
function Nr(r, t) {
  for (var e in r)
    if (r.hasOwnProperty(e)) {
      for (var i in t)
        if (t.hasOwnProperty(i) && t[i] === r[e][i]) return Number(e);
    }
  return -1;
}
function yt(r, t) {
  if (!r || !r.getBoundingClientRect) return et();
  var e = r, i = !1;
  do
    if (e.clientWidth < e.scrollWidth || e.clientHeight < e.scrollHeight) {
      var o = m(e);
      if (e.clientWidth < e.scrollWidth && (o.overflowX == "auto" || o.overflowX == "scroll") || e.clientHeight < e.scrollHeight && (o.overflowY == "auto" || o.overflowY == "scroll")) {
        if (!e.getBoundingClientRect || e === document.body) return et();
        if (i || t) return e;
        i = !0;
      }
    }
  while (e = e.parentNode);
  return et();
}
function Ir(r, t) {
  if (r && t)
    for (var e in t)
      t.hasOwnProperty(e) && (r[e] = t[e]);
  return r;
}
function Re(r, t) {
  return Math.round(r.top) === Math.round(t.top) && Math.round(r.left) === Math.round(t.left) && Math.round(r.height) === Math.round(t.height) && Math.round(r.width) === Math.round(t.width);
}
var ie;
function Fi(r, t) {
  return function() {
    if (!ie) {
      var e = arguments, i = this;
      e.length === 1 ? r.call(i, e[0]) : r.apply(i, e), ie = setTimeout(function() {
        ie = void 0;
      }, t);
    }
  };
}
function Mr() {
  clearTimeout(ie), ie = void 0;
}
function Bi(r, t, e) {
  r.scrollLeft += t, r.scrollTop += e;
}
function Hi(r) {
  var t = window.Polymer, e = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(r).cloneNode(!0) : e ? e(r).clone(!0)[0] : r.cloneNode(!0);
}
function Li(r, t, e) {
  var i = {};
  return Array.from(r.children).forEach(function(o) {
    var a, n, s, l;
    if (!(!J(o, t.draggable, r, !1) || o.animated || o === e)) {
      var c = D(o);
      i.left = Math.min((a = i.left) !== null && a !== void 0 ? a : 1 / 0, c.left), i.top = Math.min((n = i.top) !== null && n !== void 0 ? n : 1 / 0, c.top), i.right = Math.max((s = i.right) !== null && s !== void 0 ? s : -1 / 0, c.right), i.bottom = Math.max((l = i.bottom) !== null && l !== void 0 ? l : -1 / 0, c.bottom);
    }
  }), i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
var H = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Rr() {
  var r = [], t;
  return {
    captureAnimationState: function() {
      if (r = [], !!this.options.animation) {
        var i = [].slice.call(this.el.children);
        i.forEach(function(o) {
          if (!(m(o, "display") === "none" || o === g.ghost)) {
            r.push({
              target: o,
              rect: D(o)
            });
            var a = it({}, r[r.length - 1].rect);
            if (o.thisAnimationDuration) {
              var n = Ft(o, !0);
              n && (a.top -= n.f, a.left -= n.e);
            }
            o.fromRect = a;
          }
        });
      }
    },
    addAnimationState: function(i) {
      r.push(i);
    },
    removeAnimationState: function(i) {
      r.splice(Nr(r, {
        target: i
      }), 1);
    },
    animateAll: function(i) {
      var o = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof i == "function" && i();
        return;
      }
      var a = !1, n = 0;
      r.forEach(function(s) {
        var l = 0, c = s.target, u = c.fromRect, d = D(c), v = c.prevFromRect, w = c.prevToRect, b = s.rect, E = Ft(c, !0);
        E && (d.top -= E.f, d.left -= E.e), c.toRect = d, c.thisAnimationDuration && Re(v, d) && !Re(u, d) && // Make sure animatingRect is on line between toRect & fromRect
        (b.top - d.top) / (b.left - d.left) === (u.top - d.top) / (u.left - d.left) && (l = qr(b, v, w, o.options)), Re(d, u) || (c.prevFromRect = u, c.prevToRect = d, l || (l = o.options.animation), o.animate(c, b, d, l)), l && (a = !0, n = Math.max(n, l), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, l), c.thisAnimationDuration = l);
      }), clearTimeout(t), a ? t = setTimeout(function() {
        typeof i == "function" && i();
      }, n) : typeof i == "function" && i(), r = [];
    },
    animate: function(i, o, a, n) {
      if (n) {
        m(i, "transition", ""), m(i, "transform", "");
        var s = Ft(this.el), l = s && s.a, c = s && s.d, u = (o.left - a.left) / (l || 1), d = (o.top - a.top) / (c || 1);
        i.animatingX = !!u, i.animatingY = !!d, m(i, "transform", "translate3d(" + u + "px," + d + "px,0)"), this.forRepaintDummy = jr(i), m(i, "transition", "transform " + n + "ms" + (this.options.easing ? " " + this.options.easing : "")), m(i, "transform", "translate3d(0,0,0)"), typeof i.animated == "number" && clearTimeout(i.animated), i.animated = setTimeout(function() {
          m(i, "transition", ""), m(i, "transform", ""), i.animated = !1, i.animatingX = !1, i.animatingY = !1;
        }, n);
      }
    }
  };
}
function jr(r) {
  return r.offsetWidth;
}
function qr(r, t, e, i) {
  return Math.sqrt(Math.pow(t.top - r.top, 2) + Math.pow(t.left - r.left, 2)) / Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) * i.animation;
}
var Mt = [], je = {
  initializeByDefault: !0
}, pe = {
  mount: function(t) {
    for (var e in je)
      je.hasOwnProperty(e) && !(e in t) && (t[e] = je[e]);
    Mt.forEach(function(i) {
      if (i.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), Mt.push(t);
  },
  pluginEvent: function(t, e, i) {
    var o = this;
    this.eventCanceled = !1, i.cancel = function() {
      o.eventCanceled = !0;
    };
    var a = t + "Global";
    Mt.forEach(function(n) {
      e[n.pluginName] && (e[n.pluginName][a] && e[n.pluginName][a](it({
        sortable: e
      }, i)), e.options[n.pluginName] && e[n.pluginName][t] && e[n.pluginName][t](it({
        sortable: e
      }, i)));
    });
  },
  initializePlugins: function(t, e, i, o) {
    Mt.forEach(function(s) {
      var l = s.pluginName;
      if (!(!t.options[l] && !s.initializeByDefault)) {
        var c = new s(t, e, t.options);
        c.sortable = t, c.options = t.options, t[l] = c, st(i, c.defaults);
      }
    });
    for (var a in t.options)
      if (t.options.hasOwnProperty(a)) {
        var n = this.modifyOption(t, a, t.options[a]);
        typeof n < "u" && (t.options[a] = n);
      }
  },
  getEventProperties: function(t, e) {
    var i = {};
    return Mt.forEach(function(o) {
      typeof o.eventProperties == "function" && st(i, o.eventProperties.call(e[o.pluginName], t));
    }), i;
  },
  modifyOption: function(t, e, i) {
    var o;
    return Mt.forEach(function(a) {
      t[a.pluginName] && a.optionListeners && typeof a.optionListeners[e] == "function" && (o = a.optionListeners[e].call(t[a.pluginName], i));
    }), o;
  }
};
function zr(r) {
  var t = r.sortable, e = r.rootEl, i = r.name, o = r.targetEl, a = r.cloneEl, n = r.toEl, s = r.fromEl, l = r.oldIndex, c = r.newIndex, u = r.oldDraggableIndex, d = r.newDraggableIndex, v = r.originalEvent, w = r.putSortable, b = r.extraEventProperties;
  if (t = t || e && e[H], !!t) {
    var E, V = t.options, ot = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !ht && !ue ? E = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : (E = document.createEvent("Event"), E.initEvent(i, !0, !0)), E.to = n || e, E.from = s || e, E.item = o || e, E.clone = a, E.oldIndex = l, E.newIndex = c, E.oldDraggableIndex = u, E.newDraggableIndex = d, E.originalEvent = v, E.pullMode = w ? w.lastPutMode : void 0;
    var q = it(it({}, b), pe.getEventProperties(i, t));
    for (var K in q)
      E[K] = q[K];
    e && e.dispatchEvent(E), V[ot] && V[ot].call(t, E);
  }
}
var Fr = ["evt"], F = function(t, e) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = i.evt, a = Cr(i, Fr);
  pe.pluginEvent.bind(g)(t, e, it({
    dragEl: h,
    parentEl: T,
    ghostEl: _,
    rootEl: P,
    nextEl: Tt,
    lastDownEl: we,
    cloneEl: C,
    cloneHidden: gt,
    dragStarted: Kt,
    putSortable: I,
    activeSortable: g.active,
    originalEvent: o,
    oldIndex: zt,
    oldDraggableIndex: re,
    newIndex: Q,
    newDraggableIndex: ft,
    hideGhostForTarget: Qi,
    unhideGhostForTarget: Wi,
    cloneNowHidden: function() {
      gt = !0;
    },
    cloneNowShown: function() {
      gt = !1;
    },
    dispatchSortableEvent: function(s) {
      z({
        sortable: e,
        name: s,
        originalEvent: o
      });
    }
  }, a));
};
function z(r) {
  zr(it({
    putSortable: I,
    cloneEl: C,
    targetEl: h,
    rootEl: P,
    oldIndex: zt,
    oldDraggableIndex: re,
    newIndex: Q,
    newDraggableIndex: ft
  }, r));
}
var h, T, _, P, Tt, we, C, gt, zt, Q, re, ft, ge, I, qt = !1, Ce = !1, Te = [], Pt, Z, qe, ze, Pi, Ci, Kt, Rt, oe, ae = !1, ye = !1, $e, j, Fe = [], Qe = !1, Ae = [], Ie = typeof document < "u", ve = ai, Ti = ue || ht ? "cssFloat" : "float", Br = Ie && !Ri && !ai && "draggable" in document.createElement("div"), Ui = function() {
  if (Ie) {
    if (ht)
      return !1;
    var r = document.createElement("x");
    return r.style.cssText = "pointer-events:auto", r.style.pointerEvents === "auto";
  }
}(), Xi = function(t, e) {
  var i = m(t), o = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), a = Lt(t, 0, e), n = Lt(t, 1, e), s = a && m(a), l = n && m(n), c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + D(a).width, u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + D(n).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (a && s.float && s.float !== "none") {
    var d = s.float === "left" ? "left" : "right";
    return n && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
  }
  return a && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || c >= o && i[Ti] === "none" || n && i[Ti] === "none" && c + u > o) ? "vertical" : "horizontal";
}, Hr = function(t, e, i) {
  var o = i ? t.left : t.top, a = i ? t.right : t.bottom, n = i ? t.width : t.height, s = i ? e.left : e.top, l = i ? e.right : e.bottom, c = i ? e.width : e.height;
  return o === s || a === l || o + n / 2 === s + c / 2;
}, Lr = function(t, e) {
  var i;
  return Te.some(function(o) {
    var a = o[H].options.emptyInsertThreshold;
    if (!(!a || ni(o))) {
      var n = D(o), s = t >= n.left - a && t <= n.right + a, l = e >= n.top - a && e <= n.bottom + a;
      if (s && l)
        return i = o;
    }
  }), i;
}, Yi = function(t) {
  function e(a, n) {
    return function(s, l, c, u) {
      var d = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
      if (a == null && (n || d))
        return !0;
      if (a == null || a === !1)
        return !1;
      if (n && a === "clone")
        return a;
      if (typeof a == "function")
        return e(a(s, l, c, u), n)(s, l, c, u);
      var v = (n ? s : l).options.group.name;
      return a === !0 || typeof a == "string" && a === v || a.join && a.indexOf(v) > -1;
    };
  }
  var i = {}, o = t.group;
  (!o || Ye(o) != "object") && (o = {
    name: o
  }), i.name = o.name, i.checkPull = e(o.pull, !0), i.checkPut = e(o.put), i.revertClone = o.revertClone, t.group = i;
}, Qi = function() {
  !Ui && _ && m(_, "display", "none");
}, Wi = function() {
  !Ui && _ && m(_, "display", "");
};
Ie && !Ri && document.addEventListener("click", function(r) {
  if (Ce)
    return r.preventDefault(), r.stopPropagation && r.stopPropagation(), r.stopImmediatePropagation && r.stopImmediatePropagation(), Ce = !1, !1;
}, !0);
var Ct = function(t) {
  if (h) {
    t = t.touches ? t.touches[0] : t;
    var e = Lr(t.clientX, t.clientY);
    if (e) {
      var i = {};
      for (var o in t)
        t.hasOwnProperty(o) && (i[o] = t[o]);
      i.target = i.rootEl = e, i.preventDefault = void 0, i.stopPropagation = void 0, e[H]._onDragOver(i);
    }
  }
}, Ur = function(t) {
  h && h.parentNode[H]._isOutsideThisEl(t.target);
};
function g(r, t) {
  if (!(r && r.nodeType && r.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(r));
  this.el = r, this.options = t = st({}, t), r[H] = this;
  var e = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(r.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return Xi(r, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(n, s) {
      n.setData("Text", s.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: g.supportPointer !== !1 && "PointerEvent" in window && (!ee || ai),
    emptyInsertThreshold: 5
  };
  pe.initializePlugins(this, r, e);
  for (var i in e)
    !(i in t) && (t[i] = e[i]);
  Yi(t);
  for (var o in this)
    o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Br, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? x(r, "pointerdown", this._onTapStart) : (x(r, "mousedown", this._onTapStart), x(r, "touchstart", this._onTapStart)), this.nativeDraggable && (x(r, "dragover", this), x(r, "dragenter", this)), Te.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), st(this, Rr());
}
g.prototype = /** @lends Sortable.prototype */
{
  constructor: g,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Rt = null);
  },
  _getDirection: function(t, e) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, e, h) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var e = this, i = this.el, o = this.options, a = o.preventOnFilter, n = t.type, s = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, l = (s || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || l, u = o.filter;
      if (Zr(i), !h && !(/mousedown|pointerdown/.test(n) && t.button !== 0 || o.disabled) && !c.isContentEditable && !(!this.nativeDraggable && ee && l && l.tagName.toUpperCase() === "SELECT") && (l = J(l, o.draggable, i, !1), !(l && l.animated) && we !== l)) {
        if (zt = W(l), re = W(l, o.draggable), typeof u == "function") {
          if (u.call(this, t, l, this)) {
            z({
              sortable: e,
              rootEl: c,
              name: "filter",
              targetEl: l,
              toEl: i,
              fromEl: i
            }), F("filter", e, {
              evt: t
            }), a && t.preventDefault();
            return;
          }
        } else if (u && (u = u.split(",").some(function(d) {
          if (d = J(c, d.trim(), i, !1), d)
            return z({
              sortable: e,
              rootEl: d,
              name: "filter",
              targetEl: l,
              fromEl: i,
              toEl: i
            }), F("filter", e, {
              evt: t
            }), !0;
        }), u)) {
          a && t.preventDefault();
          return;
        }
        o.handle && !J(c, o.handle, i, !1) || this._prepareDragStart(t, s, l);
      }
    }
  },
  _prepareDragStart: function(t, e, i) {
    var o = this, a = o.el, n = o.options, s = a.ownerDocument, l;
    if (i && !h && i.parentNode === a) {
      var c = D(i);
      if (P = a, h = i, T = h.parentNode, Tt = h.nextSibling, we = i, ge = n.group, g.dragged = h, Pt = {
        target: h,
        clientX: (e || t).clientX,
        clientY: (e || t).clientY
      }, Pi = Pt.clientX - c.left, Ci = Pt.clientY - c.top, this._lastX = (e || t).clientX, this._lastY = (e || t).clientY, h.style["will-change"] = "all", l = function() {
        if (F("delayEnded", o, {
          evt: t
        }), g.eventCanceled) {
          o._onDrop();
          return;
        }
        o._disableDelayedDragEvents(), !xi && o.nativeDraggable && (h.draggable = !0), o._triggerDragStart(t, e), z({
          sortable: o,
          name: "choose",
          originalEvent: t
        }), Y(h, n.chosenClass, !0);
      }, n.ignore.split(",").forEach(function(u) {
        zi(h, u.trim(), Be);
      }), x(s, "dragover", Ct), x(s, "mousemove", Ct), x(s, "touchmove", Ct), n.supportPointer ? (x(s, "pointerup", o._onDrop), !this.nativeDraggable && x(s, "pointercancel", o._onDrop)) : (x(s, "mouseup", o._onDrop), x(s, "touchend", o._onDrop), x(s, "touchcancel", o._onDrop)), xi && this.nativeDraggable && (this.options.touchStartThreshold = 4, h.draggable = !0), F("delayStart", this, {
        evt: t
      }), n.delay && (!n.delayOnTouchOnly || e) && (!this.nativeDraggable || !(ue || ht))) {
        if (g.eventCanceled) {
          this._onDrop();
          return;
        }
        n.supportPointer ? (x(s, "pointerup", o._disableDelayedDrag), x(s, "pointercancel", o._disableDelayedDrag)) : (x(s, "mouseup", o._disableDelayedDrag), x(s, "touchend", o._disableDelayedDrag), x(s, "touchcancel", o._disableDelayedDrag)), x(s, "mousemove", o._delayedDragTouchMoveHandler), x(s, "touchmove", o._delayedDragTouchMoveHandler), n.supportPointer && x(s, "pointermove", o._delayedDragTouchMoveHandler), o._dragStartTimer = setTimeout(l, n.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var e = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(e.clientX - this._lastX), Math.abs(e.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    h && Be(h), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._disableDelayedDrag), $(t, "touchend", this._disableDelayedDrag), $(t, "touchcancel", this._disableDelayedDrag), $(t, "pointerup", this._disableDelayedDrag), $(t, "pointercancel", this._disableDelayedDrag), $(t, "mousemove", this._delayedDragTouchMoveHandler), $(t, "touchmove", this._delayedDragTouchMoveHandler), $(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, e) {
    e = e || t.pointerType == "touch" && t, !this.nativeDraggable || e ? this.options.supportPointer ? x(document, "pointermove", this._onTouchMove) : e ? x(document, "touchmove", this._onTouchMove) : x(document, "mousemove", this._onTouchMove) : (x(h, "dragend", this), x(P, "dragstart", this._onDragStart));
    try {
      document.selection ? xe(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, e) {
    if (qt = !1, P && h) {
      F("dragStarted", this, {
        evt: e
      }), this.nativeDraggable && x(document, "dragover", Ur);
      var i = this.options;
      !t && Y(h, i.dragClass, !1), Y(h, i.ghostClass, !0), g.active = this, t && this._appendGhost(), z({
        sortable: this,
        name: "start",
        originalEvent: e
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Z) {
      this._lastX = Z.clientX, this._lastY = Z.clientY, Qi();
      for (var t = document.elementFromPoint(Z.clientX, Z.clientY), e = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(Z.clientX, Z.clientY), t !== e); )
        e = t;
      if (h.parentNode[H]._isOutsideThisEl(t), e)
        do {
          if (e[H]) {
            var i = void 0;
            if (i = e[H]._onDragOver({
              clientX: Z.clientX,
              clientY: Z.clientY,
              target: t,
              rootEl: e
            }), i && !this.options.dragoverBubble)
              break;
          }
          t = e;
        } while (e = qi(e));
      Wi();
    }
  },
  _onTouchMove: function(t) {
    if (Pt) {
      var e = this.options, i = e.fallbackTolerance, o = e.fallbackOffset, a = t.touches ? t.touches[0] : t, n = _ && Ft(_, !0), s = _ && n && n.a, l = _ && n && n.d, c = ve && j && Si(j), u = (a.clientX - Pt.clientX + o.x) / (s || 1) + (c ? c[0] - Fe[0] : 0) / (s || 1), d = (a.clientY - Pt.clientY + o.y) / (l || 1) + (c ? c[1] - Fe[1] : 0) / (l || 1);
      if (!g.active && !qt) {
        if (i && Math.max(Math.abs(a.clientX - this._lastX), Math.abs(a.clientY - this._lastY)) < i)
          return;
        this._onDragStart(t, !0);
      }
      if (_) {
        n ? (n.e += u - (qe || 0), n.f += d - (ze || 0)) : n = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: u,
          f: d
        };
        var v = "matrix(".concat(n.a, ",").concat(n.b, ",").concat(n.c, ",").concat(n.d, ",").concat(n.e, ",").concat(n.f, ")");
        m(_, "webkitTransform", v), m(_, "mozTransform", v), m(_, "msTransform", v), m(_, "transform", v), qe = u, ze = d, Z = a;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!_) {
      var t = this.options.fallbackOnBody ? document.body : P, e = D(h, !0, ve, !0, t), i = this.options;
      if (ve) {
        for (j = t; m(j, "position") === "static" && m(j, "transform") === "none" && j !== document; )
          j = j.parentNode;
        j !== document.body && j !== document.documentElement ? (j === document && (j = et()), e.top += j.scrollTop, e.left += j.scrollLeft) : j = et(), Fe = Si(j);
      }
      _ = h.cloneNode(!0), Y(_, i.ghostClass, !1), Y(_, i.fallbackClass, !0), Y(_, i.dragClass, !0), m(_, "transition", ""), m(_, "transform", ""), m(_, "box-sizing", "border-box"), m(_, "margin", 0), m(_, "top", e.top), m(_, "left", e.left), m(_, "width", e.width), m(_, "height", e.height), m(_, "opacity", "0.8"), m(_, "position", ve ? "absolute" : "fixed"), m(_, "zIndex", "100000"), m(_, "pointerEvents", "none"), g.ghost = _, t.appendChild(_), m(_, "transform-origin", Pi / parseInt(_.style.width) * 100 + "% " + Ci / parseInt(_.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, e) {
    var i = this, o = t.dataTransfer, a = i.options;
    if (F("dragStart", this, {
      evt: t
    }), g.eventCanceled) {
      this._onDrop();
      return;
    }
    F("setupClone", this), g.eventCanceled || (C = Hi(h), C.removeAttribute("id"), C.draggable = !1, C.style["will-change"] = "", this._hideClone(), Y(C, this.options.chosenClass, !1), g.clone = C), i.cloneId = xe(function() {
      F("clone", i), !g.eventCanceled && (i.options.removeCloneOnHide || P.insertBefore(C, h), i._hideClone(), z({
        sortable: i,
        name: "clone"
      }));
    }), !e && Y(h, a.dragClass, !0), e ? (Ce = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : ($(document, "mouseup", i._onDrop), $(document, "touchend", i._onDrop), $(document, "touchcancel", i._onDrop), o && (o.effectAllowed = "move", a.setData && a.setData.call(i, o, h)), x(document, "drop", i), m(h, "transform", "translateZ(0)")), qt = !0, i._dragStartId = xe(i._dragStarted.bind(i, e, t)), x(document, "selectstart", i), Kt = !0, window.getSelection().removeAllRanges(), ee && m(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var e = this.el, i = t.target, o, a, n, s = this.options, l = s.group, c = g.active, u = ge === l, d = s.sort, v = I || c, w, b = this, E = !1;
    if (Qe) return;
    function V(Gt, Vi) {
      F(Gt, b, it({
        evt: t,
        isOwner: u,
        axis: w ? "vertical" : "horizontal",
        revert: n,
        dragRect: o,
        targetRect: a,
        canSort: d,
        fromSortable: v,
        target: i,
        completed: q,
        onMove: function(di, Ki) {
          return _e(P, e, h, o, di, D(di), t, Ki);
        },
        changed: K
      }, Vi));
    }
    function ot() {
      V("dragOverAnimationCapture"), b.captureAnimationState(), b !== v && v.captureAnimationState();
    }
    function q(Gt) {
      return V("dragOverCompleted", {
        insertion: Gt
      }), Gt && (u ? c._hideClone() : c._showClone(b), b !== v && (Y(h, I ? I.options.ghostClass : c.options.ghostClass, !1), Y(h, s.ghostClass, !0)), I !== b && b !== g.active ? I = b : b === g.active && I && (I = null), v === b && (b._ignoreWhileAnimating = i), b.animateAll(function() {
        V("dragOverAnimationComplete"), b._ignoreWhileAnimating = null;
      }), b !== v && (v.animateAll(), v._ignoreWhileAnimating = null)), (i === h && !h.animated || i === e && !i.animated) && (Rt = null), !s.dragoverBubble && !t.rootEl && i !== document && (h.parentNode[H]._isOutsideThisEl(t.target), !Gt && Ct(t)), !s.dragoverBubble && t.stopPropagation && t.stopPropagation(), E = !0;
    }
    function K() {
      Q = W(h), ft = W(h, s.draggable), z({
        sortable: b,
        name: "change",
        toEl: e,
        newIndex: Q,
        newDraggableIndex: ft,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), i = J(i, s.draggable, e, !0), V("dragOver"), g.eventCanceled) return E;
    if (h.contains(t.target) || i.animated && i.animatingX && i.animatingY || b._ignoreWhileAnimating === i)
      return q(!1);
    if (Ce = !1, c && !s.disabled && (u ? d || (n = T !== P) : I === this || (this.lastPutMode = ge.checkPull(this, c, h, t)) && l.checkPut(this, c, h, t))) {
      if (w = this._getDirection(t, i) === "vertical", o = D(h), V("dragOverValid"), g.eventCanceled) return E;
      if (n)
        return T = P, ot(), this._hideClone(), V("revert"), g.eventCanceled || (Tt ? P.insertBefore(h, Tt) : P.appendChild(h)), q(!0);
      var U = ni(e, s.draggable);
      if (!U || Wr(t, w, this) && !U.animated) {
        if (U === h)
          return q(!1);
        if (U && e === t.target && (i = U), i && (a = D(i)), _e(P, e, h, o, i, a, t, !!i) !== !1)
          return ot(), U && U.nextSibling ? e.insertBefore(h, U.nextSibling) : e.appendChild(h), T = e, K(), q(!0);
      } else if (U && Qr(t, w, this)) {
        var $t = Lt(e, 0, s, !0);
        if ($t === h)
          return q(!1);
        if (i = $t, a = D(i), _e(P, e, h, o, i, a, t, !1) !== !1)
          return ot(), e.insertBefore(h, $t), T = e, K(), q(!0);
      } else if (i.parentNode === e) {
        a = D(i);
        var tt = 0, xt, Xt = h.parentNode !== e, X = !Hr(h.animated && h.toRect || o, i.animated && i.toRect || a, w), Yt = w ? "top" : "left", ut = ki(i, "top", "top") || ki(h, "top", "top"), Qt = ut ? ut.scrollTop : void 0;
        Rt !== i && (xt = a[Yt], ae = !1, ye = !X && s.invertSwap || Xt), tt = Gr(t, i, a, w, X ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, ye, Rt === i);
        var at;
        if (tt !== 0) {
          var Et = W(h);
          do
            Et -= tt, at = T.children[Et];
          while (at && (m(at, "display") === "none" || at === _));
        }
        if (tt === 0 || at === i)
          return q(!1);
        Rt = i, oe = tt;
        var Wt = i.nextElementSibling, pt = !1;
        pt = tt === 1;
        var me = _e(P, e, h, o, i, a, t, pt);
        if (me !== !1)
          return (me === 1 || me === -1) && (pt = me === 1), Qe = !0, setTimeout(Yr, 30), ot(), pt && !Wt ? e.appendChild(h) : i.parentNode.insertBefore(h, pt ? Wt : i), ut && Bi(ut, 0, Qt - ut.scrollTop), T = h.parentNode, xt !== void 0 && !ye && ($e = Math.abs(xt - D(i)[Yt])), K(), q(!0);
      }
      if (e.contains(h))
        return q(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    $(document, "mousemove", this._onTouchMove), $(document, "touchmove", this._onTouchMove), $(document, "pointermove", this._onTouchMove), $(document, "dragover", Ct), $(document, "mousemove", Ct), $(document, "touchmove", Ct);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._onDrop), $(t, "touchend", this._onDrop), $(t, "pointerup", this._onDrop), $(t, "pointercancel", this._onDrop), $(t, "touchcancel", this._onDrop), $(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var e = this.el, i = this.options;
    if (Q = W(h), ft = W(h, i.draggable), F("drop", this, {
      evt: t
    }), T = h && h.parentNode, Q = W(h), ft = W(h, i.draggable), g.eventCanceled) {
      this._nulling();
      return;
    }
    qt = !1, ye = !1, ae = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), We(this.cloneId), We(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(e, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ee && m(document.body, "user-select", ""), m(h, "transform", ""), t && (Kt && (t.cancelable && t.preventDefault(), !i.dropBubble && t.stopPropagation()), _ && _.parentNode && _.parentNode.removeChild(_), (P === T || I && I.lastPutMode !== "clone") && C && C.parentNode && C.parentNode.removeChild(C), h && (this.nativeDraggable && $(h, "dragend", this), Be(h), h.style["will-change"] = "", Kt && !qt && Y(h, I ? I.options.ghostClass : this.options.ghostClass, !1), Y(h, this.options.chosenClass, !1), z({
      sortable: this,
      name: "unchoose",
      toEl: T,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), P !== T ? (Q >= 0 && (z({
      rootEl: T,
      name: "add",
      toEl: T,
      fromEl: P,
      originalEvent: t
    }), z({
      sortable: this,
      name: "remove",
      toEl: T,
      originalEvent: t
    }), z({
      rootEl: T,
      name: "sort",
      toEl: T,
      fromEl: P,
      originalEvent: t
    }), z({
      sortable: this,
      name: "sort",
      toEl: T,
      originalEvent: t
    })), I && I.save()) : Q !== zt && Q >= 0 && (z({
      sortable: this,
      name: "update",
      toEl: T,
      originalEvent: t
    }), z({
      sortable: this,
      name: "sort",
      toEl: T,
      originalEvent: t
    })), g.active && ((Q == null || Q === -1) && (Q = zt, ft = re), z({
      sortable: this,
      name: "end",
      toEl: T,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    F("nulling", this), P = h = T = _ = Tt = C = we = gt = Pt = Z = Kt = Q = ft = zt = re = Rt = oe = I = ge = g.dragged = g.ghost = g.clone = g.active = null;
    var t = this.el;
    Ae.forEach(function(e) {
      t.contains(e) && (e.checked = !0);
    }), Ae.length = qe = ze = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        h && (this._onDragOver(t), Xr(t));
        break;
      case "selectstart":
        t.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var t = [], e, i = this.el.children, o = 0, a = i.length, n = this.options; o < a; o++)
      e = i[o], J(e, n.draggable, this.el, !1) && t.push(e.getAttribute(n.dataIdAttr) || Kr(e));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, e) {
    var i = {}, o = this.el;
    this.toArray().forEach(function(a, n) {
      var s = o.children[n];
      J(s, this.options.draggable, o, !1) && (i[a] = s);
    }, this), e && this.captureAnimationState(), t.forEach(function(a) {
      i[a] && (o.removeChild(i[a]), o.appendChild(i[a]));
    }), e && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var t = this.options.store;
    t && t.set && t.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(t, e) {
    return J(t, e || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(t, e) {
    var i = this.options;
    if (e === void 0)
      return i[t];
    var o = pe.modifyOption(this, t, e);
    typeof o < "u" ? i[t] = o : i[t] = e, t === "group" && Yi(i);
  },
  /**
   * Destroy
   */
  destroy: function() {
    F("destroy", this);
    var t = this.el;
    t[H] = null, $(t, "mousedown", this._onTapStart), $(t, "touchstart", this._onTapStart), $(t, "pointerdown", this._onTapStart), this.nativeDraggable && ($(t, "dragover", this), $(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(e) {
      e.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Te.splice(Te.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!gt) {
      if (F("hideClone", this), g.eventCanceled) return;
      m(C, "display", "none"), this.options.removeCloneOnHide && C.parentNode && C.parentNode.removeChild(C), gt = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (gt) {
      if (F("showClone", this), g.eventCanceled) return;
      h.parentNode == P && !this.options.group.revertClone ? P.insertBefore(C, h) : Tt ? P.insertBefore(C, Tt) : P.appendChild(C), this.options.group.revertClone && this.animate(h, C), m(C, "display", ""), gt = !1;
    }
  }
};
function Xr(r) {
  r.dataTransfer && (r.dataTransfer.dropEffect = "move"), r.cancelable && r.preventDefault();
}
function _e(r, t, e, i, o, a, n, s) {
  var l, c = r[H], u = c.options.onMove, d;
  return window.CustomEvent && !ht && !ue ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = t, l.from = r, l.dragged = e, l.draggedRect = i, l.related = o || t, l.relatedRect = a || D(t), l.willInsertAfter = s, l.originalEvent = n, r.dispatchEvent(l), u && (d = u.call(c, l, n)), d;
}
function Be(r) {
  r.draggable = !1;
}
function Yr() {
  Qe = !1;
}
function Qr(r, t, e) {
  var i = D(Lt(e.el, 0, e.options, !0)), o = Li(e.el, e.options, _), a = 10;
  return t ? r.clientX < o.left - a || r.clientY < i.top && r.clientX < i.right : r.clientY < o.top - a || r.clientY < i.bottom && r.clientX < i.left;
}
function Wr(r, t, e) {
  var i = D(ni(e.el, e.options.draggable)), o = Li(e.el, e.options, _), a = 10;
  return t ? r.clientX > o.right + a || r.clientY > i.bottom && r.clientX > i.left : r.clientY > o.bottom + a || r.clientX > i.right && r.clientY > i.top;
}
function Gr(r, t, e, i, o, a, n, s) {
  var l = i ? r.clientY : r.clientX, c = i ? e.height : e.width, u = i ? e.top : e.left, d = i ? e.bottom : e.right, v = !1;
  if (!n) {
    if (s && $e < c * o) {
      if (!ae && (oe === 1 ? l > u + c * a / 2 : l < d - c * a / 2) && (ae = !0), ae)
        v = !0;
      else if (oe === 1 ? l < u + $e : l > d - $e)
        return -oe;
    } else if (l > u + c * (1 - o) / 2 && l < d - c * (1 - o) / 2)
      return Vr(t);
  }
  return v = v || n, v && (l < u + c * a / 2 || l > d - c * a / 2) ? l > u + c / 2 ? 1 : -1 : 0;
}
function Vr(r) {
  return W(h) < W(r) ? 1 : -1;
}
function Kr(r) {
  for (var t = r.tagName + r.className + r.src + r.href + r.textContent, e = t.length, i = 0; e--; )
    i += t.charCodeAt(e);
  return i.toString(36);
}
function Zr(r) {
  Ae.length = 0;
  for (var t = r.getElementsByTagName("input"), e = t.length; e--; ) {
    var i = t[e];
    i.checked && Ae.push(i);
  }
}
function xe(r) {
  return setTimeout(r, 0);
}
function We(r) {
  return clearTimeout(r);
}
Ie && x(document, "touchmove", function(r) {
  (g.active || qt) && r.cancelable && r.preventDefault();
});
g.utils = {
  on: x,
  off: $,
  css: m,
  find: zi,
  is: function(t, e) {
    return !!J(t, e, t, !1);
  },
  extend: Ir,
  throttle: Fi,
  closest: J,
  toggleClass: Y,
  clone: Hi,
  index: W,
  nextTick: xe,
  cancelNextTick: We,
  detectDirection: Xi,
  getChild: Lt,
  expando: H
};
g.get = function(r) {
  return r[H];
};
g.mount = function() {
  for (var r = arguments.length, t = new Array(r), e = 0; e < r; e++)
    t[e] = arguments[e];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(i) {
    if (!i.prototype || !i.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));
    i.utils && (g.utils = it(it({}, g.utils), i.utils)), pe.mount(i);
  });
};
g.create = function(r, t) {
  return new g(r, t);
};
g.version = Or;
var A = [], Zt, Ge, Ve = !1, He, Le, De, Jt;
function Jr() {
  function r() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var t in this)
      t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this));
  }
  return r.prototype = {
    dragStarted: function(e) {
      var i = e.originalEvent;
      this.sortable.nativeDraggable ? x(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? x(document, "pointermove", this._handleFallbackAutoScroll) : i.touches ? x(document, "touchmove", this._handleFallbackAutoScroll) : x(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(e) {
      var i = e.originalEvent;
      !this.options.dragOverBubble && !i.rootEl && this._handleAutoScroll(i);
    },
    drop: function() {
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), Ai(), Ee(), Mr();
    },
    nulling: function() {
      De = Ge = Zt = Ve = Jt = He = Le = null, A.length = 0;
    },
    _handleFallbackAutoScroll: function(e) {
      this._handleAutoScroll(e, !0);
    },
    _handleAutoScroll: function(e, i) {
      var o = this, a = (e.touches ? e.touches[0] : e).clientX, n = (e.touches ? e.touches[0] : e).clientY, s = document.elementFromPoint(a, n);
      if (De = e, i || this.options.forceAutoScrollFallback || ue || ht || ee) {
        Ue(e, this.options, s, i);
        var l = yt(s, !0);
        Ve && (!Jt || a !== He || n !== Le) && (Jt && Ai(), Jt = setInterval(function() {
          var c = yt(document.elementFromPoint(a, n), !0);
          c !== l && (l = c, Ee()), Ue(e, o.options, c, i);
        }, 10), He = a, Le = n);
      } else {
        if (!this.options.bubbleScroll || yt(s, !0) === et()) {
          Ee();
          return;
        }
        Ue(e, this.options, yt(s, !1), !1);
      }
    }
  }, st(r, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Ee() {
  A.forEach(function(r) {
    clearInterval(r.pid);
  }), A = [];
}
function Ai() {
  clearInterval(Jt);
}
var Ue = Fi(function(r, t, e, i) {
  if (t.scroll) {
    var o = (r.touches ? r.touches[0] : r).clientX, a = (r.touches ? r.touches[0] : r).clientY, n = t.scrollSensitivity, s = t.scrollSpeed, l = et(), c = !1, u;
    Ge !== e && (Ge = e, Ee(), Zt = t.scroll, u = t.scrollFn, Zt === !0 && (Zt = yt(e, !0)));
    var d = 0, v = Zt;
    do {
      var w = v, b = D(w), E = b.top, V = b.bottom, ot = b.left, q = b.right, K = b.width, U = b.height, $t = void 0, tt = void 0, xt = w.scrollWidth, Xt = w.scrollHeight, X = m(w), Yt = w.scrollLeft, ut = w.scrollTop;
      w === l ? ($t = K < xt && (X.overflowX === "auto" || X.overflowX === "scroll" || X.overflowX === "visible"), tt = U < Xt && (X.overflowY === "auto" || X.overflowY === "scroll" || X.overflowY === "visible")) : ($t = K < xt && (X.overflowX === "auto" || X.overflowX === "scroll"), tt = U < Xt && (X.overflowY === "auto" || X.overflowY === "scroll"));
      var Qt = $t && (Math.abs(q - o) <= n && Yt + K < xt) - (Math.abs(ot - o) <= n && !!Yt), at = tt && (Math.abs(V - a) <= n && ut + U < Xt) - (Math.abs(E - a) <= n && !!ut);
      if (!A[d])
        for (var Et = 0; Et <= d; Et++)
          A[Et] || (A[Et] = {});
      (A[d].vx != Qt || A[d].vy != at || A[d].el !== w) && (A[d].el = w, A[d].vx = Qt, A[d].vy = at, clearInterval(A[d].pid), (Qt != 0 || at != 0) && (c = !0, A[d].pid = setInterval(function() {
        i && this.layer === 0 && g.active._onTouchMove(De);
        var Wt = A[this.layer].vy ? A[this.layer].vy * s : 0, pt = A[this.layer].vx ? A[this.layer].vx * s : 0;
        typeof u == "function" && u.call(g.dragged.parentNode[H], pt, Wt, r, De, A[this.layer].el) !== "continue" || Bi(A[this.layer].el, pt, Wt);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && v !== l && (v = yt(v, !1)));
    Ve = c;
  }
}, 30), Gi = function(t) {
  var e = t.originalEvent, i = t.putSortable, o = t.dragEl, a = t.activeSortable, n = t.dispatchSortableEvent, s = t.hideGhostForTarget, l = t.unhideGhostForTarget;
  if (e) {
    var c = i || a;
    s();
    var u = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e, d = document.elementFromPoint(u.clientX, u.clientY);
    l(), c && !c.el.contains(d) && (n("spill"), this.onSpill({
      dragEl: o,
      putSortable: i
    }));
  }
};
function si() {
}
si.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var e = t.oldDraggableIndex;
    this.startIndex = e;
  },
  onSpill: function(t) {
    var e = t.dragEl, i = t.putSortable;
    this.sortable.captureAnimationState(), i && i.captureAnimationState();
    var o = Lt(this.sortable.el, this.startIndex, this.options);
    o ? this.sortable.el.insertBefore(e, o) : this.sortable.el.appendChild(e), this.sortable.animateAll(), i && i.animateAll();
  },
  drop: Gi
};
st(si, {
  pluginName: "revertOnSpill"
});
function li() {
}
li.prototype = {
  onSpill: function(t) {
    var e = t.dragEl, i = t.putSortable, o = i || this.sortable;
    o.captureAnimationState(), e.parentNode && e.parentNode.removeChild(e), o.animateAll();
  },
  drop: Gi
};
st(li, {
  pluginName: "removeOnSpill"
});
g.mount(new Jr());
g.mount(li, si);
var to = Object.defineProperty, eo = Object.getOwnPropertyDescriptor, Nt = (r, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? eo(t, e) : t, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && to(t, e, o), o;
};
function N(...r) {
  console.log("[PlaylistDetail]", ...r);
}
function io(...r) {
  console.error("[PlaylistDetail]", ...r);
}
let lt = class extends G {
  constructor() {
    super(...arguments), this.playlist = null, this.loading = !1, this.saving = !1, this._tracks = [], this._hasChanges = !1, this._sortable = null;
  }
  updated(r) {
    super.updated(r), N("updated() called, changed properties:", [...r.keys()]), r.has("playlist") && (N("playlist changed:", this.playlist), this.playlist ? (N("Setting _tracks to", this.playlist.tracks.length, "tracks"), this._tracks = [...this.playlist.tracks], this._hasChanges = !1, this._initSortable()) : N("playlist is null"));
  }
  _initSortable() {
    this._sortable && this._sortable.destroy(), this._trackList && (N("Initializing Sortable on track list"), this._sortable = new g(this._trackList, {
      handle: "[data-drag-handle]",
      animation: 150,
      ghostClass: "sortable-ghost",
      dragClass: "sortable-drag",
      onEnd: (r) => {
        r.oldIndex !== void 0 && r.newIndex !== void 0 && r.oldIndex !== r.newIndex && this._onReorder(r.oldIndex, r.newIndex);
      }
    }));
  }
  _onReorder(r, t) {
    N("Reorder track from", r, "to", t);
    const e = [...this._tracks], [i] = e.splice(r, 1);
    e.splice(t, 0, i), e.forEach((o, a) => {
      o.trackNo = a + 1;
    }), this._tracks = e, this._hasChanges = !0, this.dispatchEvent(new CustomEvent("track-reorder", {
      detail: { oldIndex: r, newIndex: t, tracks: this._tracks },
      bubbles: !0,
      composed: !0
    }));
  }
  _onRemoveTrack(r) {
    const { index: t } = r.detail;
    N("Remove track at index", t);
    const e = [...this._tracks];
    e.splice(t, 1), e.forEach((i, o) => {
      i.trackNo = o + 1;
    }), this._tracks = e, this._hasChanges = !0, this.dispatchEvent(new CustomEvent("track-remove", {
      detail: { index: t, tracks: this._tracks },
      bubbles: !0,
      composed: !0
    }));
  }
  _onPlayTrack(r) {
    const { track: t } = r.detail;
    N("Play track:", t), this.dispatchEvent(new CustomEvent("play-track", {
      detail: { track: t },
      bubbles: !0,
      composed: !0
    }));
  }
  _onBack() {
    N("Back button clicked"), this.dispatchEvent(new CustomEvent("back", {
      bubbles: !0,
      composed: !0
    }));
  }
  _onDeletePlaylist() {
    N("Delete playlist clicked"), this.dispatchEvent(new CustomEvent("delete-playlist", {
      detail: { playlist: this.playlist },
      bubbles: !0,
      composed: !0
    }));
  }
  _onPlayAll() {
    N("Play all clicked"), this.dispatchEvent(new CustomEvent("play-playlist", {
      detail: { playlist: this.playlist },
      bubbles: !0,
      composed: !0
    }));
  }
  _onSaveChanges() {
    N("Save changes clicked"), this.dispatchEvent(new CustomEvent("save-changes", {
      detail: { playlist: this.playlist, tracks: this._tracks },
      bubbles: !0,
      composed: !0
    }));
  }
  _onAddTracks() {
    N("Add tracks clicked"), this.dispatchEvent(new CustomEvent("add-tracks", {
      detail: { playlist: this.playlist },
      bubbles: !0,
      composed: !0
    }));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), N("disconnectedCallback()"), this._sortable && (this._sortable.destroy(), this._sortable = null);
  }
  render() {
    if (N("render() called, loading:", this.loading, "playlist:", this.playlist ? "present" : "null"), this.loading)
      return N("Rendering loading state"), y`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
        </div>
      `;
    if (!this.playlist)
      return io("Rendering error state - playlist is null"), y`
        <div class="error">
          <ha-icon icon="mdi:playlist-remove" style="--mdc-icon-size: 48px; color: var(--error-color);"></ha-icon>
          <p>Playlist not found</p>
          <p style="font-size: 0.85em; color: var(--secondary-text-color);">The playlist may have been deleted or is unavailable.</p>
          <div class="error-actions">
            <mwc-button @click=${this._onBack}>
              <ha-icon icon="mdi:arrow-left"></ha-icon>
              Back to Playlists
            </mwc-button>
          </div>
        </div>
      `;
    const r = this._tracks.length, t = this._tracks.reduce((e, i) => e + (i.duration || 0), 0);
    return N("Rendering playlist with", r, "tracks"), y`
      <div class="header">
        <button class="back-button" @click=${this._onBack} title="Back to playlists">
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </button>
        <div class="header-info">
          <div class="playlist-title">${this.playlist.name}</div>
          <div class="playlist-meta">
            ${r} track${r !== 1 ? "s" : ""} • ${xr(t)}
            ${this._hasChanges ? " • Unsaved changes" : ""}
          </div>
        </div>
        <button class="delete-button" @click=${this._onDeletePlaylist} title="Delete playlist">
          <ha-icon icon="mdi:delete"></ha-icon>
        </button>
      </div>

      ${r > 1 ? y`
        <div class="reorder-hint">
          <ha-icon icon="mdi:information-outline"></ha-icon>
          Drag tracks to reorder
        </div>
      ` : ""}

      <div class="track-list">
        ${this._tracks.map((e, i) => y`
          <mopidy-track-item
            .track=${e}
            .index=${i}
            .draggable=${r > 1}
            .showRemove=${!0}
            @remove-track=${this._onRemoveTrack}
            @play-track=${this._onPlayTrack}
          ></mopidy-track-item>
        `)}
        
        ${r === 0 ? y`
          <div class="empty-state">
            <ha-icon icon="mdi:music-note-off"></ha-icon>
            <p>This playlist is empty</p>
          </div>
        ` : ""}
      </div>

      <div class="actions">
        <mwc-button @click=${this._onAddTracks} ?disabled=${this.saving}>
          <ha-icon icon="mdi:plus"></ha-icon>
          Add Tracks
        </mwc-button>
        ${r > 0 ? y`
          <mwc-button @click=${this._onPlayAll} ?disabled=${this.saving}>
            <ha-icon icon="mdi:play"></ha-icon>
            Play All
          </mwc-button>
        ` : ""}
        ${this._hasChanges ? y`
          <mwc-button 
            @click=${this._onSaveChanges} 
            ?disabled=${this.saving}
            style="--mdc-theme-primary: var(--primary-color);"
          >
            <ha-icon icon="mdi:content-save"></ha-icon>
            Save
          </mwc-button>
        ` : ""}
      </div>
    `;
  }
  /**
   * Reset changes after save
   */
  resetChanges() {
    this._hasChanges = !1;
  }
};
lt.styles = [bt, dt`
    :host {
      display: block;
    }

    .header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      background-color: var(--app-header-background-color, var(--primary-background-color));
    }

    .back-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--primary-text-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }

    .back-button:hover {
      background-color: var(--secondary-background-color);
    }

    .header-info {
      flex: 1;
      min-width: 0;
    }

    .playlist-title {
      font-weight: 500;
      font-size: 1.1em;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .playlist-meta {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .delete-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--secondary-text-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s, background-color 0.2s;
    }

    .delete-button:hover {
      color: var(--error-color);
      background-color: var(--secondary-background-color);
    }

    .track-list {
      max-height: 50vh;
      overflow-y: auto;
    }

    .actions {
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .actions mwc-button {
      flex: 1;
    }

    .sortable-ghost {
      opacity: 0.4;
      background-color: var(--primary-color, #03a9f4) !important;
    }

    .sortable-drag {
      opacity: 0;
    }

    .reorder-hint {
      padding: 8px 16px;
      font-size: 0.85em;
      color: var(--secondary-text-color);
      text-align: center;
      background-color: var(--secondary-background-color);
    }

    .error {
      padding: 16px;
      text-align: center;
    }

    .error-actions {
      margin-top: 16px;
    }
  `];
Nt([
  k({ type: Object })
], lt.prototype, "playlist", 2);
Nt([
  k({ type: Boolean })
], lt.prototype, "loading", 2);
Nt([
  k({ type: Boolean })
], lt.prototype, "saving", 2);
Nt([
  R()
], lt.prototype, "_tracks", 2);
Nt([
  R()
], lt.prototype, "_hasChanges", 2);
Nt([
  ri(".track-list")
], lt.prototype, "_trackList", 2);
lt = Nt([
  _t("mopidy-playlist-detail")
], lt);
var ro = Object.defineProperty, oo = Object.getOwnPropertyDescriptor, fe = (r, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? oo(t, e) : t, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && ro(t, e, o), o;
};
let Ot = class extends G {
  constructor() {
    super(...arguments), this.draggable = !0, this.showRemove = !0, this.index = 0;
  }
  _onRemoveClick(r) {
    r.stopPropagation(), this.dispatchEvent(new CustomEvent("remove-track", {
      detail: { track: this.track, index: this.index },
      bubbles: !0,
      composed: !0
    }));
  }
  _onTrackClick() {
    this.dispatchEvent(new CustomEvent("play-track", {
      detail: { track: this.track, index: this.index },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const r = this.track.artists?.join(", ") || "";
    return y`
      <div class="track-item">
        ${this.draggable ? y`
          <div class="drag-handle" data-drag-handle>
            <ha-icon icon="mdi:drag"></ha-icon>
          </div>
        ` : y`
          <div class="track-number">${this.track.trackNo || this.index + 1}</div>
        `}
        
        <div class="track-info" @click=${this._onTrackClick}>
          <div class="track-title">${this.track.name}</div>
          ${r ? y`
            <div class="track-artist">${r}${this.track.album ? ` • ${this.track.album}` : ""}</div>
          ` : ""}
        </div>
        
        <div class="track-duration">${Xe(this.track.duration)}</div>
        
        ${this.showRemove ? y`
          <button class="remove-button" @click=${this._onRemoveClick} title="Remove track">
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        ` : ""}
      </div>
    `;
  }
};
Ot.styles = [bt, dt`
    :host {
      display: block;
    }

    .track-item {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      transition: background-color 0.2s;
    }

    .track-item:hover {
      background-color: var(--secondary-background-color);
    }

    .track-item:last-child {
      border-bottom: none;
    }

    .drag-handle {
      cursor: grab;
      color: var(--secondary-text-color);
      padding: 4px;
      margin-right: 8px;
      touch-action: none;
    }

    .drag-handle:active {
      cursor: grabbing;
    }

    .track-number {
      width: 32px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 0.9em;
      flex-shrink: 0;
    }

    .track-info {
      flex: 1;
      min-width: 0;
      margin-left: 8px;
    }

    .track-title {
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .track-artist {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .track-duration {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      margin-left: 12px;
      flex-shrink: 0;
    }

    .remove-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--secondary-text-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s, background-color 0.2s;
      margin-left: 4px;
    }

    .remove-button:hover {
      color: var(--error-color);
      background-color: var(--secondary-background-color);
    }

    .remove-button ha-icon {
      --mdc-icon-size: 20px;
    }
  `];
fe([
  k({ type: Object })
], Ot.prototype, "track", 2);
fe([
  k({ type: Boolean })
], Ot.prototype, "draggable", 2);
fe([
  k({ type: Boolean })
], Ot.prototype, "showRemove", 2);
fe([
  k({ type: Number })
], Ot.prototype, "index", 2);
Ot = fe([
  _t("mopidy-track-item")
], Ot);
var ao = Object.defineProperty, no = Object.getOwnPropertyDescriptor, Ut = (r, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? no(t, e) : t, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && ao(t, e, o), o;
};
let vt = class extends G {
  constructor() {
    super(...arguments), this.queue = [], this.searching = !1, this.searchResults = [], this._searchQuery = "", this._activeTab = "queue";
  }
  _onSearchInput(r) {
    const t = r.target;
    this._searchQuery = t.value, this._searchTimeout && clearTimeout(this._searchTimeout), this._searchQuery.trim() && (this._searchTimeout = window.setTimeout(() => {
      this._performSearch();
    }, 300));
  }
  _performSearch() {
    console.log("[TrackSearch] _performSearch called with query:", this._searchQuery), this.dispatchEvent(new CustomEvent("search", {
      detail: { query: this._searchQuery },
      bubbles: !0,
      composed: !0
    }));
  }
  _onTabChange(r) {
    this._activeTab = r;
  }
  _onAddTrack(r) {
    this.dispatchEvent(new CustomEvent("add-track", {
      detail: { track: r },
      bubbles: !0,
      composed: !0
    }));
  }
  _onAddQueueItem(r) {
    this._onAddTrack({
      uri: r.uri,
      name: r.name,
      artists: r.artists,
      album: r.album,
      duration: r.duration
    });
  }
  render() {
    return y`
      <div class="search-header">
        <ha-textfield
          class="search-input"
          .value=${this._searchQuery}
          @input=${this._onSearchInput}
          placeholder="Search for tracks..."
          label="Search"
        >
          <ha-icon icon="mdi:magnify" slot="leadingIcon"></ha-icon>
        </ha-textfield>
      </div>

      ${this._searchQuery.trim() ? y`
        <div class="search-results">
          ${this.searching ? y`
            <div class="searching">
              <ha-circular-progress active></ha-circular-progress>
              <p>Searching...</p>
            </div>
          ` : this.searchResults.length > 0 ? y`
            <div class="section-title">Search Results</div>
            ${this.searchResults.map((r) => y`
              <div class="result-item">
                <div class="result-info">
                  <div class="result-title">${r.name}</div>
                  ${r.artists?.length ? y`
                    <div class="result-artist">${r.artists.join(", ")}</div>
                  ` : ""}
                </div>
                <div class="result-duration">${Xe(r.duration)}</div>
                <button class="add-button" @click=${() => this._onAddTrack(r)} title="Add to playlist">
                  <ha-icon icon="mdi:plus-circle"></ha-icon>
                </button>
              </div>
            `)}
          ` : y`
            <div class="no-results">
              <ha-icon icon="mdi:magnify"></ha-icon>
              <p>No tracks found</p>
              <p style="font-size: 0.85em; margin-top: 8px;">
                Try a different search term or use the "Current Queue" tab to add tracks from your queue.
              </p>
            </div>
          `}
        </div>
      ` : y`
        <div class="tabs">
          <div 
            class="tab ${this._activeTab === "queue" ? "active" : ""}"
            @click=${() => this._onTabChange("queue")}
          >
            Current Queue (${this.queue.length})
          </div>
          <div 
            class="tab ${this._activeTab === "search" ? "active" : ""}"
            @click=${() => this._onTabChange("search")}
          >
            Search Library
          </div>
        </div>

        ${this._activeTab === "queue" ? y`
          <div class="queue-list">
            ${this.queue.length > 0 ? y`
              <div class="section-title">Add from Queue</div>
              ${this.queue.map((r) => y`
                <div class="result-item">
                  <div class="result-info">
                    <div class="result-title">${r.name}</div>
                    ${r.artists?.length ? y`
                      <div class="result-artist">${r.artists.join(", ")}</div>
                    ` : ""}
                  </div>
                  <div class="result-duration">${Xe(r.duration)}</div>
                  <button class="add-button" @click=${() => this._onAddQueueItem(r)} title="Add to playlist">
                    <ha-icon icon="mdi:plus-circle"></ha-icon>
                  </button>
                </div>
              `)}
            ` : y`
              <div class="no-results">
                <ha-icon icon="mdi:playlist-remove"></ha-icon>
                <p>Queue is empty</p>
              </div>
            `}
          </div>
        ` : y`
          <div class="no-results">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <p>Enter a search term to find tracks</p>
          </div>
        `}
      `}
    `;
  }
};
vt.styles = [bt, dt`
    :host {
      display: block;
    }

    .search-header {
      padding: 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .search-input {
      width: 100%;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .tab {
      flex: 1;
      padding: 12px;
      text-align: center;
      cursor: pointer;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
      transition: color 0.2s, border-color 0.2s;
    }

    .tab:hover {
      color: var(--primary-text-color);
    }

    .tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }

    .search-results, .queue-list {
      max-height: 50vh;
      overflow-y: auto;
    }

    .result-item {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      transition: background-color 0.2s;
    }

    .result-item:hover {
      background-color: var(--secondary-background-color);
    }

    .result-item:last-child {
      border-bottom: none;
    }

    .result-info {
      flex: 1;
      min-width: 0;
    }

    .result-title {
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .result-artist {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .result-duration {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      margin-left: 12px;
    }

    .add-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      margin-left: 8px;
    }

    .add-button:hover {
      background-color: var(--secondary-background-color);
    }

    .add-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .searching, .no-results {
      padding: 32px;
      text-align: center;
      color: var(--secondary-text-color);
    }

    .section-title {
      padding: 8px 16px;
      font-size: 0.85em;
      font-weight: 500;
      color: var(--secondary-text-color);
      background-color: var(--secondary-background-color);
    }
  `];
Ut([
  k({ type: Array })
], vt.prototype, "queue", 2);
Ut([
  k({ type: Boolean })
], vt.prototype, "searching", 2);
Ut([
  k({ type: Array })
], vt.prototype, "searchResults", 2);
Ut([
  R()
], vt.prototype, "_searchQuery", 2);
Ut([
  R()
], vt.prototype, "_activeTab", 2);
vt = Ut([
  _t("mopidy-track-search")
], vt);
var so = Object.defineProperty, lo = Object.getOwnPropertyDescriptor, wt = (r, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? lo(t, e) : t, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && so(t, e, o), o;
};
let rt = class extends G {
  constructor() {
    super(...arguments), this.open = !1, this.title = "Confirm", this.message = "", this.confirmText = "Confirm", this.cancelText = "Cancel", this.destructive = !1;
  }
  /**
   * Show the dialog and return a promise that resolves to true (confirm) or false (cancel)
   */
  show() {
    return this.open = !0, new Promise((r) => {
      this._resolve = r;
    });
  }
  _onConfirm() {
    this.open = !1, this._resolve?.(!0), this._resolve = void 0;
  }
  _onCancel() {
    this.open = !1, this._resolve?.(!1), this._resolve = void 0;
  }
  _onClose() {
    this._onCancel();
  }
  render() {
    return this.open ? y`
      <ha-dialog
        .open=${this.open}
        @closed=${this._onClose}
        .heading=${this.title}
      >
        <div class="dialog-content">
          <p>${this.message}</p>
        </div>
        <mwc-button
          slot="secondaryAction"
          @click=${this._onCancel}
        >
          ${this.cancelText}
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this._onConfirm}
          .style=${this.destructive ? "--mdc-theme-primary: var(--error-color);" : ""}
        >
          ${this.confirmText}
        </mwc-button>
      </ha-dialog>
    ` : y``;
  }
};
rt.styles = [bt, dt`
    :host {
      display: contents;
    }
  `];
wt([
  k({ type: Boolean })
], rt.prototype, "open", 2);
wt([
  k({ type: String })
], rt.prototype, "title", 2);
wt([
  k({ type: String })
], rt.prototype, "message", 2);
wt([
  k({ type: String })
], rt.prototype, "confirmText", 2);
wt([
  k({ type: String })
], rt.prototype, "cancelText", 2);
wt([
  k({ type: Boolean })
], rt.prototype, "destructive", 2);
wt([
  R()
], rt.prototype, "_resolve", 2);
rt = wt([
  _t("mopidy-confirm-dialog")
], rt);
var co = Object.defineProperty, ho = Object.getOwnPropertyDescriptor, It = (r, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? ho(t, e) : t, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && co(t, e, o), o;
};
let ct = class extends G {
  constructor() {
    super(...arguments), this.open = !1, this.queue = [], this.defaultScheme = "m3u", this._name = "", this._source = "empty";
  }
  /**
   * Show the dialog and return a promise
   */
  show() {
    return this._name = "", this._source = "empty", this.open = !0, new Promise((r) => {
      this._resolve = r;
    });
  }
  _onNameChange(r) {
    const t = r.target;
    this._name = t.value;
  }
  _onSourceChange(r) {
    const t = r.target;
    this._source = t.value;
  }
  _onCreate() {
    this._name.trim() && (this.open = !1, this._resolve?.({ name: this._name.trim(), source: this._source }), this._resolve = void 0);
  }
  _onCancel() {
    this.open = !1, this._resolve?.(null), this._resolve = void 0;
  }
  _onClose() {
    this._onCancel();
  }
  render() {
    if (!this.open) return y``;
    const r = this.queue.length, t = r > 0;
    return y`
      <ha-dialog
        .open=${this.open}
        @closed=${this._onClose}
        heading="Create New Playlist"
      >
        <div class="dialog-content">
          <div class="form-field">
            <label for="playlist-name">Playlist Name</label>
            <ha-textfield
              id="playlist-name"
              .value=${this._name}
              @input=${this._onNameChange}
              placeholder="My New Playlist"
              dialogInitialFocus
            ></ha-textfield>
          </div>

          <div class="form-field">
            <label>Source</label>
            <div class="radio-group">
              <label class="radio-option">
                <input
                  type="radio"
                  name="source"
                  value="empty"
                  .checked=${this._source === "empty"}
                  @change=${this._onSourceChange}
                />
                <span>Empty playlist</span>
              </label>
              <label class="radio-option">
                <input
                  type="radio"
                  name="source"
                  value="queue"
                  .checked=${this._source === "queue"}
                  .disabled=${!t}
                  @change=${this._onSourceChange}
                />
                <span>Current queue (${r} tracks)</span>
              </label>
              ${t && this._source === "queue" ? y`
                <div class="queue-info">
                  ${r} track${r !== 1 ? "s" : ""} will be added to the new playlist
                </div>
              ` : ""}
              ${t ? "" : y`
                <div class="queue-info">
                  Queue is empty - cannot create from queue
                </div>
              `}
            </div>
          </div>
        </div>
        <mwc-button
          slot="secondaryAction"
          @click=${this._onCancel}
        >
          Cancel
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this._onCreate}
          .disabled=${!this._name.trim()}
        >
          Create
        </mwc-button>
      </ha-dialog>
    `;
  }
};
ct.styles = [bt, dt`
    :host {
      display: contents;
    }

    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .radio-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
    }

    .radio-option:hover {
      background-color: var(--secondary-background-color);
    }

    .queue-info {
      margin-top: 8px;
      padding: 8px;
      background-color: var(--secondary-background-color);
      border-radius: 4px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
  `];
It([
  k({ type: Boolean })
], ct.prototype, "open", 2);
It([
  k({ type: Array })
], ct.prototype, "queue", 2);
It([
  k({ type: String })
], ct.prototype, "defaultScheme", 2);
It([
  R()
], ct.prototype, "_name", 2);
It([
  R()
], ct.prototype, "_source", 2);
It([
  R()
], ct.prototype, "_resolve", 2);
ct = It([
  _t("mopidy-create-playlist-dialog")
], ct);
var uo = Object.defineProperty, po = Object.getOwnPropertyDescriptor, L = (r, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? po(t, e) : t, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && uo(t, e, o), o;
};
function p(...r) {
  console.log("[MopidyPlaylistCard]", ...r);
}
function B(...r) {
  console.error("[MopidyPlaylistCard]", ...r);
}
let M = class extends G {
  constructor() {
    super(), this._view = "list", this._loading = !1, this._saving = !1, this._searching = !1, this._playlists = [], this._selectedPlaylist = null, this._queue = [], this._searchResults = [], this._toast = null, p("Card constructor called");
  }
  connectedCallback() {
    super.connectedCallback(), p("Card connected to DOM");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), p("Card disconnected from DOM");
  }
  updated(t) {
    super.updated(t), p("updated() called, changed properties:", [...t.keys()]), t.has("hass") && (p("hass changed, hass object:", this.hass ? "present" : "missing"), this.hass && p("hass.states:", Object.keys(this.hass.states || {}))), t.has("config") && p("config changed:", this.config), t.has("hass") && this.hass && this.config && (p("Both hass and config are available, initializing service..."), this._service = new Er(this.hass, this.config.entity), this._view === "list" && this._playlists.length === 0 && (p("Loading playlists from updated()..."), this._loadPlaylists()), p("Loading queue from updated()..."), this._loadQueue());
  }
  async _loadPlaylists() {
    if (p("_loadPlaylists called, service:", this._service ? "available" : "missing"), !this._service) {
      p("Cannot load playlists - no service");
      return;
    }
    this._loading = !0, p("Setting loading=true, fetching playlists...");
    try {
      this._playlists = await this._service.getPlaylists(), p("Playlists loaded:", this._playlists.length, this._playlists);
    } catch (t) {
      B("Error loading playlists:", t), this._showToast("Failed to load playlists");
    } finally {
      this._loading = !1, p("Setting loading=false");
    }
  }
  async _loadQueue() {
    if (p("_loadQueue called, service:", this._service ? "available" : "missing"), !!this._service)
      try {
        this._queue = await this._service.getQueue(), p("Queue loaded:", this._queue.length, "items");
      } catch (t) {
        B("Error loading queue:", t);
      }
  }
  async _loadPlaylistDetail(t) {
    if (p("_loadPlaylistDetail called with playlist:", t), !!this._service) {
      this._loading = !0;
      try {
        this._selectedPlaylist = await this._service.getPlaylist(t.uri, t.mediaContentType), p("Playlist detail loaded:", this._selectedPlaylist), this._view = "detail", p("View changed to detail");
      } catch (e) {
        B("Error loading playlist:", e), this._showToast("Failed to load playlist");
      } finally {
        this._loading = !1;
      }
    }
  }
  _showToast(t) {
    p("Showing toast:", t), this._toast = t, this._toastTimeout && clearTimeout(this._toastTimeout), this._toastTimeout = window.setTimeout(() => {
      this._toast = null, p("Toast cleared");
    }, 3e3);
  }
  // Event handlers
  async _onCreatePlaylist() {
    if (p("_onCreatePlaylist called"), !this._createDialog) {
      p("Create dialog not available");
      return;
    }
    const t = await this._createDialog.show();
    if (p("Create dialog result:", t), !!t) {
      this._saving = !0;
      try {
        if (p("Creating playlist:", t.name), await this._service?.createPlaylist(t.name), t.source === "queue" && this._queue.length > 0) {
          p("Adding", this._queue.length, "queue tracks to new playlist"), await new Promise((i) => setTimeout(i, 500)), await this._loadPlaylists();
          const e = this._playlists.find((i) => i.name === t.name);
          if (e) {
            p("Found new playlist:", e.uri);
            const i = this._queue.map((o) => o.uri);
            await this._service?.addToPlaylist(e.uri, i), p("Added queue tracks to playlist");
          } else
            B("Could not find newly created playlist");
        }
        this._showToast(`Playlist "${t.name}" created`), await this._loadPlaylists();
      } catch (e) {
        B("Error creating playlist:", e), this._showToast("Failed to create playlist");
      } finally {
        this._saving = !1;
      }
    }
  }
  async _onDeletePlaylist(t) {
    const { playlist: e } = t.detail;
    if (p("_onDeletePlaylist called for:", e), !this._confirmDialog) {
      p("Confirm dialog not available");
      return;
    }
    this._confirmDialog.title = "Delete Playlist", this._confirmDialog.message = `Are you sure you want to delete "${e.name}"? This cannot be undone.`, this._confirmDialog.destructive = !0, this._confirmDialog.confirmText = "Delete";
    const i = await this._confirmDialog.show();
    if (p("Delete confirmation result:", i), !!i)
      try {
        await this._service?.deletePlaylist(e.uri), this._showToast(`Playlist "${e.name}" deleted`), this._view === "detail" && this._selectedPlaylist?.uri === e.uri && (this._view = "list", this._selectedPlaylist = null), await this._loadPlaylists();
      } catch (o) {
        B("Error deleting playlist:", o), this._showToast("Failed to delete playlist");
      }
  }
  _onSelectPlaylist(t) {
    const { playlist: e } = t.detail;
    p("_onSelectPlaylist:", e), this._loadPlaylistDetail(e);
  }
  _onBackToList() {
    p("_onBackToList called"), this._view = "list", this._selectedPlaylist = null;
  }
  async _onPlayPlaylist(t) {
    const { playlist: e } = t.detail;
    p("_onPlayPlaylist:", e);
    try {
      await this._service?.playPlaylist(e.uri), this._showToast(`Playing "${e.name}"`);
    } catch (i) {
      B("Error playing playlist:", i), this._showToast("Failed to play playlist");
    }
  }
  async _onPlayTrack(t) {
    const { track: e } = t.detail;
    p("_onPlayTrack:", e);
    try {
      await this._service?.playTrack(e.uri), this._showToast(`Playing "${e.name}"`);
    } catch (i) {
      B("Error playing track:", i), this._showToast("Failed to play track");
    }
  }
  async _onRemoveTrack(t) {
    const { index: e, tracks: i } = t.detail;
    if (p("_onRemoveTrack called, index:", e, "remaining tracks:", i.length), !!this._selectedPlaylist) {
      this._saving = !0;
      try {
        await this._service?.removeFromPlaylist(this._selectedPlaylist.uri, [e]), this._selectedPlaylist = {
          ...this._selectedPlaylist,
          tracks: i
        }, this._showToast("Track removed");
      } catch (o) {
        B("Error removing track:", o), this._showToast("Failed to remove track");
      } finally {
        this._saving = !1;
      }
    }
  }
  async _onSaveChanges(t) {
    const { playlist: e, tracks: i } = t.detail;
    if (p("_onSaveChanges called, playlist:", e, "tracks:", i.length), !!e) {
      this._saving = !0;
      try {
        if (await this._service?.clearPlaylist(e.uri), i.length > 0) {
          const o = i.map((a) => a.uri);
          await this._service?.addToPlaylist(e.uri, o);
        }
        this._selectedPlaylist = {
          ...e,
          tracks: i
        }, this._showToast("Playlist saved");
      } catch (o) {
        B("Error saving playlist:", o), this._showToast("Failed to save playlist");
      } finally {
        this._saving = !1;
      }
    }
  }
  _onAddTracks(t) {
    p("_onAddTracks called, switching to search view"), this._view = "search";
  }
  async _onAddTrack(t) {
    const { track: e } = t.detail;
    if (p("_onAddTrack called, track:", e), !!this._selectedPlaylist)
      try {
        await this._service?.addToPlaylist(this._selectedPlaylist.uri, [e.uri]), this._showToast(`Added "${e.name}"`), await this._loadPlaylistDetail(this._selectedPlaylist);
      } catch (i) {
        B("Error adding track:", i), this._showToast("Failed to add track");
      }
  }
  async _onSearch(t) {
    const { query: e } = t.detail;
    if (p("_onSearch called, query:", e), p("  service available:", !!this._service), p("  query trimmed:", e?.trim()), !this._service) {
      B("Search aborted - no service available"), this._searchResults = [];
      return;
    }
    if (!e?.trim()) {
      p("Search aborted - empty query"), this._searchResults = [];
      return;
    }
    this._searching = !0, p("Setting searching=true, calling searchTracks...");
    try {
      this._searchResults = await this._service.searchTracks(e), p("Search results:", this._searchResults.length, "tracks");
    } catch (i) {
      B("Search error:", i), this._searchResults = [];
    } finally {
      this._searching = !1, p("Search complete, searching=false");
    }
  }
  _onCloseSearch() {
    p("_onCloseSearch called"), this._view = "detail";
  }
  setConfig(t) {
    if (p("setConfig called with:", t), !t.entity)
      throw B("Entity is required in config"), new Error("Entity is required");
    this.config = t, p("Config set successfully");
  }
  getCardSize() {
    return 5;
  }
  render() {
    if (p("render() called, view:", this._view, "config:", this.config ? "present" : "missing"), !this.config)
      return p("No config, showing error"), y`<ha-card><div class="error">Configuration error</div></ha-card>`;
    const t = this.config.title || "Playlist Manager";
    return p("Rendering with title:", t, "playlists:", this._playlists.length, "queue:", this._queue.length), y`
      <ha-card>
        ${this._view === "list" ? y`
          <div class="card-header">
            <h1>${t}</h1>
            <div class="header-actions">
              <button class="header-button" @click=${this._onCreatePlaylist} title="Create new playlist">
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>
          </div>
          <mopidy-playlist-list
            .playlists=${this._playlists}
            .loading=${this._loading}
            @select-playlist=${this._onSelectPlaylist}
            @delete-playlist=${this._onDeletePlaylist}
            @play-playlist=${this._onPlayPlaylist}
          ></mopidy-playlist-list>
          ${this.config.show_queue_button !== !1 && this._queue.length > 0 ? y`
            <div class="card-actions">
              <mwc-button @click=${this._onCreatePlaylist}>
                <ha-icon icon="mdi:content-save"></ha-icon>
                Save Queue as Playlist
              </mwc-button>
            </div>
          ` : ""}
        ` : this._view === "detail" ? y`
          <mopidy-playlist-detail
            .playlist=${this._selectedPlaylist}
            .loading=${this._loading}
            .saving=${this._saving}
            @back=${this._onBackToList}
            @delete-playlist=${this._onDeletePlaylist}
            @play-playlist=${this._onPlayPlaylist}
            @play-track=${this._onPlayTrack}
            @track-remove=${this._onRemoveTrack}
            @save-changes=${this._onSaveChanges}
            @add-tracks=${this._onAddTracks}
          ></mopidy-playlist-detail>
        ` : y`
          <div class="search-dialog">
            <div class="search-header">
              <button class="header-button" @click=${this._onCloseSearch}>
                <ha-icon icon="mdi:arrow-left"></ha-icon>
              </button>
              <h2>Add Tracks to ${this._selectedPlaylist?.name}</h2>
            </div>
            <div class="search-content">
              <mopidy-track-search
                .queue=${this._queue}
                .searching=${this._searching}
                .searchResults=${this._searchResults}
                @add-track=${this._onAddTrack}
                @search=${this._onSearch}
              ></mopidy-track-search>
            </div>
          </div>
        `}
      </ha-card>

      <mopidy-confirm-dialog></mopidy-confirm-dialog>
      <mopidy-create-playlist-dialog .queue=${this._queue}></mopidy-create-playlist-dialog>

      ${this._toast ? y`
        <div class="toast">${this._toast}</div>
      ` : ""}
    `;
  }
};
M.styles = [bt, dt`
    :host {
      display: block;
    }

    .header-actions {
      display: flex;
      gap: 8px;
    }

    .header-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--primary-text-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .header-button:hover {
      background-color: var(--secondary-background-color);
    }

    .header-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .search-dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--card-background-color, #fff);
      z-index: 100;
      display: flex;
      flex-direction: column;
    }

    .search-header {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      background-color: var(--app-header-background-color, var(--primary-background-color));
    }

    .search-header h2 {
      flex: 1;
      margin: 0;
      font-size: 1.1em;
    }

    .search-content {
      flex: 1;
      overflow-y: auto;
    }

    .toast {
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--primary-color);
      color: var(--text-primary-color);
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 1000;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `];
L([
  k({ attribute: !1 })
], M.prototype, "hass", 2);
L([
  k({ type: Object })
], M.prototype, "config", 2);
L([
  R()
], M.prototype, "_view", 2);
L([
  R()
], M.prototype, "_loading", 2);
L([
  R()
], M.prototype, "_saving", 2);
L([
  R()
], M.prototype, "_searching", 2);
L([
  R()
], M.prototype, "_playlists", 2);
L([
  R()
], M.prototype, "_selectedPlaylist", 2);
L([
  R()
], M.prototype, "_queue", 2);
L([
  R()
], M.prototype, "_searchResults", 2);
L([
  R()
], M.prototype, "_toast", 2);
L([
  ri("mopidy-confirm-dialog")
], M.prototype, "_confirmDialog", 2);
L([
  ri("mopidy-create-playlist-dialog")
], M.prototype, "_createDialog", 2);
M = L([
  _t("mopidy-playlist-card")
], M);
var fo = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, ci = (r, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? mo(t, e) : t, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (o = (i ? n(t, e, o) : n(o)) || o);
  return i && o && fo(t, e, o), o;
};
let de = class extends G {
  _onEntityChange(r) {
    const t = r.detail.value;
    this._updateConfig("entity", t);
  }
  _onTitleChange(r) {
    const t = r.target.value;
    this._updateConfig("title", t);
  }
  _onShowQueueButtonChange(r) {
    const t = r.target.checked;
    this._updateConfig("show_queue_button", t);
  }
  _updateConfig(r, t) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...this.config, [r]: t } },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return y`
      <div class="form-row">
        <label>Entity</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity}
          .configValue=${"entity"}
          domain-filter="media_player"
          @value-changed=${this._onEntityChange}
          allow-custom-entity
        ></ha-entity-picker>
      </div>

      <div class="form-row">
        <label>Title (optional)</label>
        <ha-textfield
          .value=${this.config.title || ""}
          .configValue=${"title"}
          @input=${this._onTitleChange}
          placeholder="Playlist Manager"
        ></ha-textfield>
      </div>

      <div class="form-row switch-row">
        <span class="switch-label">Show Save Queue Button</span>
        <ha-switch
          .checked=${this.config.show_queue_button !== !1}
          .configValue=${"show_queue_button"}
          @change=${this._onShowQueueButtonChange}
        ></ha-switch>
      </div>
    `;
  }
};
de.styles = [bt, dt`
    :host {
      display: block;
    }

    .form-row {
      margin-bottom: 16px;
    }

    .form-row label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    ha-entity-picker {
      width: 100%;
    }

    ha-switch {
      --mdc-theme-secondary: var(--primary-color);
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .switch-label {
      color: var(--primary-text-color);
    }
  `];
ci([
  k({ attribute: !1 })
], de.prototype, "hass", 2);
ci([
  k({ type: Object })
], de.prototype, "config", 2);
de = ci([
  _t("mopidy-playlist-card-editor")
], de);
console.info(
  "%c MOPIDY-PLAYLIST-CARD %c v1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
typeof window < "u" && (window.customCards || (window.customCards = []), window.customCards.push({
  type: "mopidy-playlist-card",
  name: "Mopidy Playlist Card",
  description: "A card for managing Mopidy playlists - create, edit, and delete playlists"
}));
const bo = M;
export {
  M as MopidyPlaylistCard,
  bo as default
};
//# sourceMappingURL=mopidy-playlist-card.js.map
