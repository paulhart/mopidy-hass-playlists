/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis, Xe = fe.ShadowRoot && (fe.ShadyCSS === void 0 || fe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ye = Symbol(), ni = /* @__PURE__ */ new WeakMap();
let Si = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Ye) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Xe && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ni.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ni.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Yi = (o) => new Si(typeof o == "string" ? o : o + "", void 0, Ye), nt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, r, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + o[n + 1], o[0]);
  return new Si(e, o, Ye);
}, Wi = (o, t) => {
  if (Xe) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = fe.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, o.appendChild(i);
  }
}, ai = Xe ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Yi(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qi, defineProperty: Gi, getOwnPropertyDescriptor: Vi, getOwnPropertyNames: Ki, getOwnPropertySymbols: Zi, getPrototypeOf: Ji } = Object, Ce = globalThis, si = Ce.trustedTypes, to = si ? si.emptyScript : "", eo = Ce.reactiveElementPolyfillSupport, Qt = (o, t) => o, _e = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? to : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, We = (o, t) => !Qi(o, t), li = { attribute: !0, type: String, converter: _e, reflect: !1, useDefault: !1, hasChanged: We };
Symbol.metadata ??= Symbol("metadata"), Ce.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Tt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = li) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Gi(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: n } = Vi(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: r, set(a) {
      const s = r?.call(this);
      n?.call(this, a), this.requestUpdate(t, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? li;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Qt("elementProperties"))) return;
    const t = Ji(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Qt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Qt("properties"))) {
      const e = this.properties, i = [...Ki(e), ...Zi(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(ai(r));
    } else t !== void 0 && e.push(ai(t));
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
    return Wi(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : _e).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : _e;
      this._$Em = r;
      const s = a.fromAttribute(e, n.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, n) {
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? We)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: n }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: a } = n, s = this[r];
        a !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, n, s);
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
Tt.elementStyles = [], Tt.shadowRootOptions = { mode: "open" }, Tt[Qt("elementProperties")] = /* @__PURE__ */ new Map(), Tt[Qt("finalized")] = /* @__PURE__ */ new Map(), eo?.({ ReactiveElement: Tt }), (Ce.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = globalThis, ci = (o) => o, be = Qe.trustedTypes, di = be ? be.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Ci = "$lit$", dt = `lit$${Math.random().toFixed(9).slice(2)}$`, Pi = "?" + dt, io = `<${Pi}>`, St = document, te = () => St.createComment(""), ee = (o) => o === null || typeof o != "object" && typeof o != "function", Ge = Array.isArray, oo = (o) => Ge(o) || typeof o?.[Symbol.iterator] == "function", Ae = `[ 	
\f\r]`, Lt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, hi = /-->/g, ui = />/g, bt = RegExp(`>|${Ae}(?:([^\\s"'>=/]+)(${Ae}*=${Ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pi = /'/g, fi = /"/g, ki = /^(?:script|style|textarea|title)$/i, ro = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), m = ro(1), Mt = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), mi = /* @__PURE__ */ new WeakMap(), Et = St.createTreeWalker(St, 129);
function Ai(o, t) {
  if (!Ge(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return di !== void 0 ? di.createHTML(t) : t;
}
const no = (o, t) => {
  const e = o.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Lt;
  for (let s = 0; s < e; s++) {
    const l = o[s];
    let c, u, d = -1, g = 0;
    for (; g < l.length && (a.lastIndex = g, u = a.exec(l), u !== null); ) g = a.lastIndex, a === Lt ? u[1] === "!--" ? a = hi : u[1] !== void 0 ? a = ui : u[2] !== void 0 ? (ki.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = bt) : u[3] !== void 0 && (a = bt) : a === bt ? u[0] === ">" ? (a = r ?? Lt, d = -1) : u[1] === void 0 ? d = -2 : (d = a.lastIndex - u[2].length, c = u[1], a = u[3] === void 0 ? bt : u[3] === '"' ? fi : pi) : a === fi || a === pi ? a = bt : a === hi || a === ui ? a = Lt : (a = bt, r = void 0);
    const _ = a === bt && o[s + 1].startsWith("/>") ? " " : "";
    n += a === Lt ? l + io : d >= 0 ? (i.push(c), l.slice(0, d) + Ci + l.slice(d) + dt + _) : l + dt + (d === -2 ? s : _);
  }
  return [Ai(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ie {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const s = t.length - 1, l = this.parts, [c, u] = no(t, e);
    if (this.el = ie.createElement(c, i), Et.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = Et.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Ci)) {
          const g = u[a++], _ = r.getAttribute(d).split(dt), y = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: n, name: y[2], strings: _, ctor: y[1] === "." ? so : y[1] === "?" ? lo : y[1] === "@" ? co : Pe }), r.removeAttribute(d);
        } else d.startsWith(dt) && (l.push({ type: 6, index: n }), r.removeAttribute(d));
        if (ki.test(r.tagName)) {
          const d = r.textContent.split(dt), g = d.length - 1;
          if (g > 0) {
            r.textContent = be ? be.emptyScript : "";
            for (let _ = 0; _ < g; _++) r.append(d[_], te()), Et.nextNode(), l.push({ type: 2, index: ++n });
            r.append(d[g], te());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Pi) l.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(dt, d + 1)) !== -1; ) l.push({ type: 7, index: n }), d += dt.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = St.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Rt(o, t, e = o, i) {
  if (t === Mt) return t;
  let r = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = ee(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(o), r._$AT(o, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = r : e._$Cl = r), r !== void 0 && (t = Rt(o, r._$AS(o, t.values), r, i)), t;
}
class ao {
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
    const { el: { content: e }, parts: i } = this._$AD, r = (t?.creationScope ?? St).importNode(e, !0);
    Et.currentNode = r;
    let n = Et.nextNode(), a = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new ne(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new ho(n, this, t)), this._$AV.push(c), l = i[++s];
      }
      a !== l?.index && (n = Et.nextNode(), a++);
    }
    return Et.currentNode = St, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ne {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = Rt(this, t, e), ee(t) ? t === A || t == null || t === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : t !== this._$AH && t !== Mt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : oo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== A && ee(this._$AH) ? this._$AA.nextSibling.data = t : this.T(St.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ie.createElement(Ai(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const n = new ao(r, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = mi.get(t.strings);
    return e === void 0 && mi.set(t.strings, e = new ie(t)), e;
  }
  k(t) {
    Ge(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const n of t) r === e.length ? e.push(i = new ne(this.O(te()), this.O(te()), this, this.options)) : i = e[r], i._$AI(n), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ci(t).nextSibling;
      ci(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Pe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, n) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = A;
  }
  _$AI(t, e = this, i, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = Rt(this, t, e, 0), a = !ee(t) || t !== this._$AH && t !== Mt, a && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = Rt(this, s[i + l], e, l), c === Mt && (c = this._$AH[l]), a ||= !ee(c) || c !== this._$AH[l], c === A ? t = A : t !== A && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class so extends Pe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === A ? void 0 : t;
  }
}
class lo extends Pe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== A);
  }
}
class co extends Pe {
  constructor(t, e, i, r, n) {
    super(t, e, i, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Rt(this, t, e, 0) ?? A) === Mt) return;
    const i = this._$AH, r = t === A && i !== A || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== A && (i === A || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ho {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Rt(this, t);
  }
}
const uo = Qe.litHtmlPolyfillSupport;
uo?.(ie, ne), (Qe.litHtmlVersions ??= []).push("3.3.2");
const po = (o, t, e) => {
  const i = e?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = r = new ne(t.insertBefore(te(), n), n, void 0, e ?? {});
  }
  return r._$AI(o), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = globalThis;
class U extends Tt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = po(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Mt;
  }
}
U._$litElement$ = !0, U.finalized = !0, Ve.litElementHydrateSupport?.({ LitElement: U });
const fo = Ve.litElementPolyfillSupport;
fo?.({ LitElement: U });
(Ve.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = (o) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(o, t);
  }) : customElements.define(o, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mo = { attribute: !0, type: String, converter: _e, reflect: !1, hasChanged: We }, go = (o = mo, t, e) => {
  const { kind: i, metadata: r } = e;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((o = Object.create(o)).wrapped = !0), n.set(e.name, o), i === "accessor") {
    const { name: a } = e;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(a, l, o, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, o, s), s;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(s) {
      const l = this[a];
      t.call(this, s), this.requestUpdate(a, l, o, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function x(o) {
  return (t, e) => typeof e == "object" ? go(o, t, e) : ((i, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(o, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function I(o) {
  return x({ ...o, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vo = (o, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(o, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ke(o, t) {
  return (e, i, r) => {
    const n = (a) => a.renderRoot?.querySelector(o) ?? null;
    return vo(e, i, { get() {
      return n(this);
    } });
  };
}
const mt = nt`
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
function ze(o) {
  if (o == null) return "--:--";
  const t = Math.floor(o / 3600), e = Math.floor(o % 3600 / 60), i = Math.floor(o % 60);
  return t > 0 ? `${t}:${e.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}` : `${e}:${i.toString().padStart(2, "0")}`;
}
function yo(o) {
  if (o === 0) return "0 min";
  const t = Math.floor(o / 3600), e = Math.floor(o % 3600 / 60);
  return t > 0 ? `${t}h ${e}m` : `${e} min`;
}
class _o {
  constructor(t, e) {
    this.hass = t, this.entityId = e;
  }
  /**
   * Get the entity name without domain prefix
   */
  get entityName() {
    return this.entityId.replace(/^media_player\./, "");
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
    await this.hass.callService(this.serviceDomain, t, e);
  }
  /**
   * Browse media using Home Assistant's media browser
   */
  async browseMedia(t, e) {
    return await this.hass.callWS({
      type: "media_player/browse_media",
      entity_id: this.entityId,
      media_content_id: t,
      media_content_type: e
    });
  }
  /**
   * Get all playlists
   */
  async getPlaylists() {
    try {
      const t = await this.browseMedia(), e = [];
      if (t.children) {
        for (const i of t.children)
          if (i.media_content_id?.includes("playlists") || i.title?.toLowerCase() === "playlists") {
            const r = await this.browseMedia(
              i.media_content_id,
              i.media_content_type
            );
            if (r.children)
              for (const n of r.children)
                e.push({
                  uri: n.media_content_id || "",
                  name: n.title,
                  trackCount: 0
                  // Will be populated on detail view
                });
          }
      }
      return e;
    } catch (t) {
      return console.error("Error fetching playlists:", t), [];
    }
  }
  /**
   * Get a specific playlist with track details
   */
  async getPlaylist(t) {
    try {
      const e = await this.browseMedia(t), i = [];
      let r = 1;
      if (e.children)
        for (const n of e.children)
          i.push({
            uri: n.media_content_id || "",
            name: n.title,
            artists: this.extractArtists(n),
            album: this.extractAlbum(n),
            duration: this.extractDuration(n),
            trackNo: r++
          });
      return {
        uri: t,
        name: e.title,
        tracks: i,
        trackCount: i.length,
        duration: this.calculateTotalDuration(i)
      };
    } catch (e) {
      return console.error("Error fetching playlist:", e), null;
    }
  }
  /**
   * Get the current queue
   */
  async getQueue() {
    try {
      const t = this.hass.states[this.entityId];
      if (!t) return [];
      const e = t.attributes.queue;
      return Array.isArray(e) ? e.map((i, r) => ({
        uri: i.uri || "",
        name: i.title || i.name || "Unknown",
        artists: i.artist || (i.artist ? [i.artist] : []),
        album: i.album,
        duration: i.duration,
        position: r,
        trackId: i.track_id ?? r
      })) : [];
    } catch (t) {
      return console.error("Error fetching queue:", t), [];
    }
  }
  /**
   * Create a new empty playlist
   */
  async createPlaylist(t, e) {
    await this.callService(`${this.entityName}_create_playlist`, {
      name: t,
      uri_scheme: e
    });
  }
  /**
   * Delete a playlist
   */
  async deletePlaylist(t) {
    await this.callService(`${this.entityName}_delete_playlist`, {
      uri: t
    });
  }
  /**
   * Rename a playlist
   */
  async renamePlaylist(t, e) {
    await this.callService(`${this.entityName}_rename_playlist`, {
      uri: t,
      name: e
    });
  }
  /**
   * Add tracks to a playlist
   */
  async addToPlaylist(t, e, i) {
    await this.callService(`${this.entityName}_add_to_playlist`, {
      playlist_uri: t,
      track_uris: e,
      position: i
    });
  }
  /**
   * Remove tracks from a playlist
   */
  async removeFromPlaylist(t, e) {
    await this.callService(`${this.entityName}_remove_from_playlist`, {
      playlist_uri: t,
      positions: e
    });
  }
  /**
   * Move tracks within a playlist
   */
  async moveInPlaylist(t, e, i, r) {
    await this.callService(`${this.entityName}_move_in_playlist`, {
      playlist_uri: t,
      start: e,
      end: i,
      new_position: r
    });
  }
  /**
   * Clear all tracks from a playlist
   */
  async clearPlaylist(t) {
    await this.callService(`${this.entityName}_clear_playlist`, {
      uri: t
    });
  }
  /**
   * Save current queue as a new playlist
   */
  async saveQueueToPlaylist(t, e) {
    await this.callService(`${this.entityName}_save_queue_to_playlist`, {
      name: t,
      uri_scheme: e
    });
  }
  /**
   * Play a playlist
   */
  async playPlaylist(t) {
    await this.hass.callService("media_player", "play_media", {
      entity_id: this.entityId,
      media_content_id: t,
      media_content_type: "playlist"
    });
  }
  /**
   * Play a specific track
   */
  async playTrack(t) {
    await this.hass.callService("media_player", "play_media", {
      entity_id: this.entityId,
      media_content_id: t,
      media_content_type: "music"
    });
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
var bo = Object.defineProperty, wo = Object.getOwnPropertyDescriptor, Ze = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? wo(t, e) : t, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && bo(t, e, r), r;
};
let oe = class extends U {
  constructor() {
    super(...arguments), this.playlists = [], this.loading = !1;
  }
  _onPlaylistClick(o) {
    this.dispatchEvent(new CustomEvent("select-playlist", {
      detail: { playlist: o },
      bubbles: !0,
      composed: !0
    }));
  }
  _onDeleteClick(o, t) {
    o.stopPropagation(), this.dispatchEvent(new CustomEvent("delete-playlist", {
      detail: { playlist: t },
      bubbles: !0,
      composed: !0
    }));
  }
  _onPlayClick(o, t) {
    o.stopPropagation(), this.dispatchEvent(new CustomEvent("play-playlist", {
      detail: { playlist: t },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return this.loading ? m`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
        </div>
      ` : this.playlists.length === 0 ? m`
        <div class="empty-state">
          <ha-icon icon="mdi:playlist-music"></ha-icon>
          <p>No playlists found</p>
          <p>Create a new playlist to get started</p>
        </div>
      ` : m`
      <div class="list">
        ${this.playlists.map((o) => m`
          <div class="playlist-item" @click=${() => this._onPlaylistClick(o)}>
            <div class="playlist-icon">
              <ha-icon icon="mdi:playlist-music"></ha-icon>
            </div>
            <div class="playlist-info">
              <div class="playlist-name">${o.name}</div>
              <div class="playlist-meta">
                ${o.trackCount !== void 0 ? `${o.trackCount} track${o.trackCount !== 1 ? "s" : ""}` : "Playlist"}
              </div>
            </div>
            <div class="playlist-actions">
              <button 
                class="action-button" 
                @click=${(t) => this._onPlayClick(t, o)}
                title="Play playlist"
              >
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
              <button 
                class="action-button delete" 
                @click=${(t) => this._onDeleteClick(t, o)}
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
    `;
  }
};
oe.styles = [mt, nt`
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
Ze([
  x({ type: Array })
], oe.prototype, "playlists", 2);
Ze([
  x({ type: Boolean })
], oe.prototype, "loading", 2);
oe = Ze([
  ft("mopidy-playlist-list")
], oe);
/**!
 * Sortable 1.15.7
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function $o(o, t, e) {
  return (t = Co(t)) in o ? Object.defineProperty(o, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[t] = e, o;
}
function it() {
  return it = Object.assign ? Object.assign.bind() : function(o) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e) ({}).hasOwnProperty.call(e, i) && (o[i] = e[i]);
    }
    return o;
  }, it.apply(null, arguments);
}
function gi(o, t) {
  var e = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    t && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), e.push.apply(e, i);
  }
  return e;
}
function K(o) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gi(Object(e), !0).forEach(function(i) {
      $o(o, i, e[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e)) : gi(Object(e)).forEach(function(i) {
      Object.defineProperty(o, i, Object.getOwnPropertyDescriptor(e, i));
    });
  }
  return o;
}
function xo(o, t) {
  if (o == null) return {};
  var e, i, r = Eo(o, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    for (i = 0; i < n.length; i++) e = n[i], t.indexOf(e) === -1 && {}.propertyIsEnumerable.call(o, e) && (r[e] = o[e]);
  }
  return r;
}
function Eo(o, t) {
  if (o == null) return {};
  var e = {};
  for (var i in o) if ({}.hasOwnProperty.call(o, i)) {
    if (t.indexOf(i) !== -1) continue;
    e[i] = o[i];
  }
  return e;
}
function So(o, t) {
  if (typeof o != "object" || !o) return o;
  var e = o[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(o, t);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(o);
}
function Co(o) {
  var t = So(o, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Fe(o) {
  "@babel/helpers - typeof";
  return Fe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fe(o);
}
var Po = "1.15.7";
function et(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var at = et(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), ae = et(/Edge/i), vi = et(/firefox/i), Gt = et(/safari/i) && !et(/chrome/i) && !et(/android/i), Je = et(/iP(ad|od|hone)/i), Di = et(/chrome/i) && et(/android/i), Ti = {
  capture: !1,
  passive: !1
};
function w(o, t, e) {
  o.addEventListener(t, e, !at && Ti);
}
function b(o, t, e) {
  o.removeEventListener(t, e, !at && Ti);
}
function we(o, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), o)
      try {
        if (o.matches)
          return o.matches(t);
        if (o.msMatchesSelector)
          return o.msMatchesSelector(t);
        if (o.webkitMatchesSelector)
          return o.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function Oi(o) {
  return o.host && o !== document && o.host.nodeType && o.host !== o ? o.host : o.parentNode;
}
function Q(o, t, e, i) {
  if (o) {
    e = e || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === e && we(o, t) : we(o, t)) || i && o === e)
        return o;
      if (o === e) break;
    } while (o = Oi(o));
  }
  return null;
}
var yi = /\s+/g;
function F(o, t, e) {
  if (o && t)
    if (o.classList)
      o.classList[e ? "add" : "remove"](t);
    else {
      var i = (" " + o.className + " ").replace(yi, " ").replace(" " + t + " ", " ");
      o.className = (i + (e ? " " + t : "")).replace(yi, " ");
    }
}
function p(o, t, e) {
  var i = o && o.style;
  if (i) {
    if (e === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? e = document.defaultView.getComputedStyle(o, "") : o.currentStyle && (e = o.currentStyle), t === void 0 ? e : e[t];
    !(t in i) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), i[t] = e + (typeof e == "string" ? "" : "px");
  }
}
function Nt(o, t) {
  var e = "";
  if (typeof o == "string")
    e = o;
  else
    do {
      var i = p(o, "transform");
      i && i !== "none" && (e = i + " " + e);
    } while (!t && (o = o.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(e);
}
function Ii(o, t, e) {
  if (o) {
    var i = o.getElementsByTagName(t), r = 0, n = i.length;
    if (e)
      for (; r < n; r++)
        e(i[r], r);
    return i;
  }
  return [];
}
function V() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function k(o, t, e, i, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var n, a, s, l, c, u, d;
    if (o !== window && o.parentNode && o !== V() ? (n = o.getBoundingClientRect(), a = n.top, s = n.left, l = n.bottom, c = n.right, u = n.height, d = n.width) : (a = 0, s = 0, l = window.innerHeight, c = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || e) && o !== window && (r = r || o.parentNode, !at))
      do
        if (r && r.getBoundingClientRect && (p(r, "transform") !== "none" || e && p(r, "position") !== "static")) {
          var g = r.getBoundingClientRect();
          a -= g.top + parseInt(p(r, "border-top-width")), s -= g.left + parseInt(p(r, "border-left-width")), l = a + n.height, c = s + n.width;
          break;
        }
      while (r = r.parentNode);
    if (i && o !== window) {
      var _ = Nt(r || o), y = _ && _.a, $ = _ && _.d;
      _ && (a /= $, s /= y, d /= y, u /= $, l = a + u, c = s + d);
    }
    return {
      top: a,
      left: s,
      bottom: l,
      right: c,
      width: d,
      height: u
    };
  }
}
function _i(o, t, e) {
  for (var i = ut(o, !0), r = k(o)[t]; i; ) {
    var n = k(i)[e], a = void 0;
    if (a = r >= n, !a) return i;
    if (i === V()) break;
    i = ut(i, !1);
  }
  return !1;
}
function jt(o, t, e, i) {
  for (var r = 0, n = 0, a = o.children; n < a.length; ) {
    if (a[n].style.display !== "none" && a[n] !== f.ghost && (i || a[n] !== f.dragged) && Q(a[n], e.draggable, o, !1)) {
      if (r === t)
        return a[n];
      r++;
    }
    n++;
  }
  return null;
}
function ti(o, t) {
  for (var e = o.lastElementChild; e && (e === f.ghost || p(e, "display") === "none" || t && !we(e, t)); )
    e = e.previousElementSibling;
  return e || null;
}
function B(o, t) {
  var e = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== f.clone && (!t || we(o, t)) && e++;
  return e;
}
function bi(o) {
  var t = 0, e = 0, i = V();
  if (o)
    do {
      var r = Nt(o), n = r.a, a = r.d;
      t += o.scrollLeft * n, e += o.scrollTop * a;
    } while (o !== i && (o = o.parentNode));
  return [t, e];
}
function ko(o, t) {
  for (var e in o)
    if (o.hasOwnProperty(e)) {
      for (var i in t)
        if (t.hasOwnProperty(i) && t[i] === o[e][i]) return Number(e);
    }
  return -1;
}
function ut(o, t) {
  if (!o || !o.getBoundingClientRect) return V();
  var e = o, i = !1;
  do
    if (e.clientWidth < e.scrollWidth || e.clientHeight < e.scrollHeight) {
      var r = p(e);
      if (e.clientWidth < e.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || e.clientHeight < e.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!e.getBoundingClientRect || e === document.body) return V();
        if (i || t) return e;
        i = !0;
      }
    }
  while (e = e.parentNode);
  return V();
}
function Ao(o, t) {
  if (o && t)
    for (var e in t)
      t.hasOwnProperty(e) && (o[e] = t[e]);
  return o;
}
function De(o, t) {
  return Math.round(o.top) === Math.round(t.top) && Math.round(o.left) === Math.round(t.left) && Math.round(o.height) === Math.round(t.height) && Math.round(o.width) === Math.round(t.width);
}
var Vt;
function Ni(o, t) {
  return function() {
    if (!Vt) {
      var e = arguments, i = this;
      e.length === 1 ? o.call(i, e[0]) : o.apply(i, e), Vt = setTimeout(function() {
        Vt = void 0;
      }, t);
    }
  };
}
function Do() {
  clearTimeout(Vt), Vt = void 0;
}
function Mi(o, t, e) {
  o.scrollLeft += t, o.scrollTop += e;
}
function Ri(o) {
  var t = window.Polymer, e = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : e ? e(o).clone(!0)[0] : o.cloneNode(!0);
}
function ji(o, t, e) {
  var i = {};
  return Array.from(o.children).forEach(function(r) {
    var n, a, s, l;
    if (!(!Q(r, t.draggable, o, !1) || r.animated || r === e)) {
      var c = k(r);
      i.left = Math.min((n = i.left) !== null && n !== void 0 ? n : 1 / 0, c.left), i.top = Math.min((a = i.top) !== null && a !== void 0 ? a : 1 / 0, c.top), i.right = Math.max((s = i.right) !== null && s !== void 0 ? s : -1 / 0, c.right), i.bottom = Math.max((l = i.bottom) !== null && l !== void 0 ? l : -1 / 0, c.bottom);
    }
  }), i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
var j = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function To() {
  var o = [], t;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var i = [].slice.call(this.el.children);
        i.forEach(function(r) {
          if (!(p(r, "display") === "none" || r === f.ghost)) {
            o.push({
              target: r,
              rect: k(r)
            });
            var n = K({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = Nt(r, !0);
              a && (n.top -= a.f, n.left -= a.e);
            }
            r.fromRect = n;
          }
        });
      }
    },
    addAnimationState: function(i) {
      o.push(i);
    },
    removeAnimationState: function(i) {
      o.splice(ko(o, {
        target: i
      }), 1);
    },
    animateAll: function(i) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof i == "function" && i();
        return;
      }
      var n = !1, a = 0;
      o.forEach(function(s) {
        var l = 0, c = s.target, u = c.fromRect, d = k(c), g = c.prevFromRect, _ = c.prevToRect, y = s.rect, $ = Nt(c, !0);
        $ && (d.top -= $.f, d.left -= $.e), c.toRect = d, c.thisAnimationDuration && De(g, d) && !De(u, d) && // Make sure animatingRect is on line between toRect & fromRect
        (y.top - d.top) / (y.left - d.left) === (u.top - d.top) / (u.left - d.left) && (l = Io(y, g, _, r.options)), De(d, u) || (c.prevFromRect = u, c.prevToRect = d, l || (l = r.options.animation), r.animate(c, y, d, l)), l && (n = !0, a = Math.max(a, l), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, l), c.thisAnimationDuration = l);
      }), clearTimeout(t), n ? t = setTimeout(function() {
        typeof i == "function" && i();
      }, a) : typeof i == "function" && i(), o = [];
    },
    animate: function(i, r, n, a) {
      if (a) {
        p(i, "transition", ""), p(i, "transform", "");
        var s = Nt(this.el), l = s && s.a, c = s && s.d, u = (r.left - n.left) / (l || 1), d = (r.top - n.top) / (c || 1);
        i.animatingX = !!u, i.animatingY = !!d, p(i, "transform", "translate3d(" + u + "px," + d + "px,0)"), this.forRepaintDummy = Oo(i), p(i, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), p(i, "transform", "translate3d(0,0,0)"), typeof i.animated == "number" && clearTimeout(i.animated), i.animated = setTimeout(function() {
          p(i, "transition", ""), p(i, "transform", ""), i.animated = !1, i.animatingX = !1, i.animatingY = !1;
        }, a);
      }
    }
  };
}
function Oo(o) {
  return o.offsetWidth;
}
function Io(o, t, e, i) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) * i.animation;
}
var At = [], Te = {
  initializeByDefault: !0
}, se = {
  mount: function(t) {
    for (var e in Te)
      Te.hasOwnProperty(e) && !(e in t) && (t[e] = Te[e]);
    At.forEach(function(i) {
      if (i.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), At.push(t);
  },
  pluginEvent: function(t, e, i) {
    var r = this;
    this.eventCanceled = !1, i.cancel = function() {
      r.eventCanceled = !0;
    };
    var n = t + "Global";
    At.forEach(function(a) {
      e[a.pluginName] && (e[a.pluginName][n] && e[a.pluginName][n](K({
        sortable: e
      }, i)), e.options[a.pluginName] && e[a.pluginName][t] && e[a.pluginName][t](K({
        sortable: e
      }, i)));
    });
  },
  initializePlugins: function(t, e, i, r) {
    At.forEach(function(s) {
      var l = s.pluginName;
      if (!(!t.options[l] && !s.initializeByDefault)) {
        var c = new s(t, e, t.options);
        c.sortable = t, c.options = t.options, t[l] = c, it(i, c.defaults);
      }
    });
    for (var n in t.options)
      if (t.options.hasOwnProperty(n)) {
        var a = this.modifyOption(t, n, t.options[n]);
        typeof a < "u" && (t.options[n] = a);
      }
  },
  getEventProperties: function(t, e) {
    var i = {};
    return At.forEach(function(r) {
      typeof r.eventProperties == "function" && it(i, r.eventProperties.call(e[r.pluginName], t));
    }), i;
  },
  modifyOption: function(t, e, i) {
    var r;
    return At.forEach(function(n) {
      t[n.pluginName] && n.optionListeners && typeof n.optionListeners[e] == "function" && (r = n.optionListeners[e].call(t[n.pluginName], i));
    }), r;
  }
};
function No(o) {
  var t = o.sortable, e = o.rootEl, i = o.name, r = o.targetEl, n = o.cloneEl, a = o.toEl, s = o.fromEl, l = o.oldIndex, c = o.newIndex, u = o.oldDraggableIndex, d = o.newDraggableIndex, g = o.originalEvent, _ = o.putSortable, y = o.extraEventProperties;
  if (t = t || e && e[j], !!t) {
    var $, X = t.options, J = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !at && !ae ? $ = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : ($ = document.createEvent("Event"), $.initEvent(i, !0, !0)), $.to = a || e, $.from = s || e, $.item = r || e, $.clone = n, $.oldIndex = l, $.newIndex = c, $.oldDraggableIndex = u, $.newDraggableIndex = d, $.originalEvent = g, $.pullMode = _ ? _.lastPutMode : void 0;
    var N = K(K({}, y), se.getEventProperties(i, t));
    for (var Y in N)
      $[Y] = N[Y];
    e && e.dispatchEvent($), X[J] && X[J].call(t, $);
  }
}
var Mo = ["evt"], R = function(t, e) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = i.evt, n = xo(i, Mo);
  se.pluginEvent.bind(f)(t, e, K({
    dragEl: h,
    parentEl: C,
    ghostEl: v,
    rootEl: E,
    nextEl: xt,
    lastDownEl: me,
    cloneEl: S,
    cloneHidden: ht,
    dragStarted: Xt,
    putSortable: D,
    activeSortable: f.active,
    originalEvent: r,
    oldIndex: It,
    oldDraggableIndex: Kt,
    newIndex: H,
    newDraggableIndex: ct,
    hideGhostForTarget: Hi,
    unhideGhostForTarget: Bi,
    cloneNowHidden: function() {
      ht = !0;
    },
    cloneNowShown: function() {
      ht = !1;
    },
    dispatchSortableEvent: function(s) {
      M({
        sortable: e,
        name: s,
        originalEvent: r
      });
    }
  }, n));
};
function M(o) {
  No(K({
    putSortable: D,
    cloneEl: S,
    targetEl: h,
    rootEl: E,
    oldIndex: It,
    oldDraggableIndex: Kt,
    newIndex: H,
    newDraggableIndex: ct
  }, o));
}
var h, C, v, E, xt, me, S, ht, It, H, Kt, ct, de, D, Ot = !1, $e = !1, xe = [], wt, W, Oe, Ie, wi, $i, Xt, Dt, Zt, Jt = !1, he = !1, ge, T, Ne = [], He = !1, Ee = [], ke = typeof document < "u", ue = Je, xi = ae || at ? "cssFloat" : "float", Ro = ke && !Di && !Je && "draggable" in document.createElement("div"), qi = function() {
  if (ke) {
    if (at)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), zi = function(t, e) {
  var i = p(t), r = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), n = jt(t, 0, e), a = jt(t, 1, e), s = n && p(n), l = a && p(a), c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + k(n).width, u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + k(a).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (n && s.float && s.float !== "none") {
    var d = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
  }
  return n && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || c >= r && i[xi] === "none" || a && i[xi] === "none" && c + u > r) ? "vertical" : "horizontal";
}, jo = function(t, e, i) {
  var r = i ? t.left : t.top, n = i ? t.right : t.bottom, a = i ? t.width : t.height, s = i ? e.left : e.top, l = i ? e.right : e.bottom, c = i ? e.width : e.height;
  return r === s || n === l || r + a / 2 === s + c / 2;
}, qo = function(t, e) {
  var i;
  return xe.some(function(r) {
    var n = r[j].options.emptyInsertThreshold;
    if (!(!n || ti(r))) {
      var a = k(r), s = t >= a.left - n && t <= a.right + n, l = e >= a.top - n && e <= a.bottom + n;
      if (s && l)
        return i = r;
    }
  }), i;
}, Fi = function(t) {
  function e(n, a) {
    return function(s, l, c, u) {
      var d = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
      if (n == null && (a || d))
        return !0;
      if (n == null || n === !1)
        return !1;
      if (a && n === "clone")
        return n;
      if (typeof n == "function")
        return e(n(s, l, c, u), a)(s, l, c, u);
      var g = (a ? s : l).options.group.name;
      return n === !0 || typeof n == "string" && n === g || n.join && n.indexOf(g) > -1;
    };
  }
  var i = {}, r = t.group;
  (!r || Fe(r) != "object") && (r = {
    name: r
  }), i.name = r.name, i.checkPull = e(r.pull, !0), i.checkPut = e(r.put), i.revertClone = r.revertClone, t.group = i;
}, Hi = function() {
  !qi && v && p(v, "display", "none");
}, Bi = function() {
  !qi && v && p(v, "display", "");
};
ke && !Di && document.addEventListener("click", function(o) {
  if ($e)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), $e = !1, !1;
}, !0);
var $t = function(t) {
  if (h) {
    t = t.touches ? t.touches[0] : t;
    var e = qo(t.clientX, t.clientY);
    if (e) {
      var i = {};
      for (var r in t)
        t.hasOwnProperty(r) && (i[r] = t[r]);
      i.target = i.rootEl = e, i.preventDefault = void 0, i.stopPropagation = void 0, e[j]._onDragOver(i);
    }
  }
}, zo = function(t) {
  h && h.parentNode[j]._isOutsideThisEl(t.target);
};
function f(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = it({}, t), o[j] = this;
  var e = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(o.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return zi(o, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(a, s) {
      a.setData("Text", s.textContent);
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
    supportPointer: f.supportPointer !== !1 && "PointerEvent" in window && (!Gt || Je),
    emptyInsertThreshold: 5
  };
  se.initializePlugins(this, o, e);
  for (var i in e)
    !(i in t) && (t[i] = e[i]);
  Fi(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Ro, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? w(o, "pointerdown", this._onTapStart) : (w(o, "mousedown", this._onTapStart), w(o, "touchstart", this._onTapStart)), this.nativeDraggable && (w(o, "dragover", this), w(o, "dragenter", this)), xe.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), it(this, To());
}
f.prototype = /** @lends Sortable.prototype */
{
  constructor: f,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Dt = null);
  },
  _getDirection: function(t, e) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, e, h) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var e = this, i = this.el, r = this.options, n = r.preventOnFilter, a = t.type, s = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, l = (s || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || l, u = r.filter;
      if (Wo(i), !h && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && Gt && l && l.tagName.toUpperCase() === "SELECT") && (l = Q(l, r.draggable, i, !1), !(l && l.animated) && me !== l)) {
        if (It = B(l), Kt = B(l, r.draggable), typeof u == "function") {
          if (u.call(this, t, l, this)) {
            M({
              sortable: e,
              rootEl: c,
              name: "filter",
              targetEl: l,
              toEl: i,
              fromEl: i
            }), R("filter", e, {
              evt: t
            }), n && t.preventDefault();
            return;
          }
        } else if (u && (u = u.split(",").some(function(d) {
          if (d = Q(c, d.trim(), i, !1), d)
            return M({
              sortable: e,
              rootEl: d,
              name: "filter",
              targetEl: l,
              fromEl: i,
              toEl: i
            }), R("filter", e, {
              evt: t
            }), !0;
        }), u)) {
          n && t.preventDefault();
          return;
        }
        r.handle && !Q(c, r.handle, i, !1) || this._prepareDragStart(t, s, l);
      }
    }
  },
  _prepareDragStart: function(t, e, i) {
    var r = this, n = r.el, a = r.options, s = n.ownerDocument, l;
    if (i && !h && i.parentNode === n) {
      var c = k(i);
      if (E = n, h = i, C = h.parentNode, xt = h.nextSibling, me = i, de = a.group, f.dragged = h, wt = {
        target: h,
        clientX: (e || t).clientX,
        clientY: (e || t).clientY
      }, wi = wt.clientX - c.left, $i = wt.clientY - c.top, this._lastX = (e || t).clientX, this._lastY = (e || t).clientY, h.style["will-change"] = "all", l = function() {
        if (R("delayEnded", r, {
          evt: t
        }), f.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !vi && r.nativeDraggable && (h.draggable = !0), r._triggerDragStart(t, e), M({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), F(h, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(u) {
        Ii(h, u.trim(), Me);
      }), w(s, "dragover", $t), w(s, "mousemove", $t), w(s, "touchmove", $t), a.supportPointer ? (w(s, "pointerup", r._onDrop), !this.nativeDraggable && w(s, "pointercancel", r._onDrop)) : (w(s, "mouseup", r._onDrop), w(s, "touchend", r._onDrop), w(s, "touchcancel", r._onDrop)), vi && this.nativeDraggable && (this.options.touchStartThreshold = 4, h.draggable = !0), R("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || e) && (!this.nativeDraggable || !(ae || at))) {
        if (f.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (w(s, "pointerup", r._disableDelayedDrag), w(s, "pointercancel", r._disableDelayedDrag)) : (w(s, "mouseup", r._disableDelayedDrag), w(s, "touchend", r._disableDelayedDrag), w(s, "touchcancel", r._disableDelayedDrag)), w(s, "mousemove", r._delayedDragTouchMoveHandler), w(s, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && w(s, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(l, a.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var e = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(e.clientX - this._lastX), Math.abs(e.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    h && Me(h), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    b(t, "mouseup", this._disableDelayedDrag), b(t, "touchend", this._disableDelayedDrag), b(t, "touchcancel", this._disableDelayedDrag), b(t, "pointerup", this._disableDelayedDrag), b(t, "pointercancel", this._disableDelayedDrag), b(t, "mousemove", this._delayedDragTouchMoveHandler), b(t, "touchmove", this._delayedDragTouchMoveHandler), b(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, e) {
    e = e || t.pointerType == "touch" && t, !this.nativeDraggable || e ? this.options.supportPointer ? w(document, "pointermove", this._onTouchMove) : e ? w(document, "touchmove", this._onTouchMove) : w(document, "mousemove", this._onTouchMove) : (w(h, "dragend", this), w(E, "dragstart", this._onDragStart));
    try {
      document.selection ? ve(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, e) {
    if (Ot = !1, E && h) {
      R("dragStarted", this, {
        evt: e
      }), this.nativeDraggable && w(document, "dragover", zo);
      var i = this.options;
      !t && F(h, i.dragClass, !1), F(h, i.ghostClass, !0), f.active = this, t && this._appendGhost(), M({
        sortable: this,
        name: "start",
        originalEvent: e
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (W) {
      this._lastX = W.clientX, this._lastY = W.clientY, Hi();
      for (var t = document.elementFromPoint(W.clientX, W.clientY), e = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(W.clientX, W.clientY), t !== e); )
        e = t;
      if (h.parentNode[j]._isOutsideThisEl(t), e)
        do {
          if (e[j]) {
            var i = void 0;
            if (i = e[j]._onDragOver({
              clientX: W.clientX,
              clientY: W.clientY,
              target: t,
              rootEl: e
            }), i && !this.options.dragoverBubble)
              break;
          }
          t = e;
        } while (e = Oi(e));
      Bi();
    }
  },
  _onTouchMove: function(t) {
    if (wt) {
      var e = this.options, i = e.fallbackTolerance, r = e.fallbackOffset, n = t.touches ? t.touches[0] : t, a = v && Nt(v, !0), s = v && a && a.a, l = v && a && a.d, c = ue && T && bi(T), u = (n.clientX - wt.clientX + r.x) / (s || 1) + (c ? c[0] - Ne[0] : 0) / (s || 1), d = (n.clientY - wt.clientY + r.y) / (l || 1) + (c ? c[1] - Ne[1] : 0) / (l || 1);
      if (!f.active && !Ot) {
        if (i && Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) < i)
          return;
        this._onDragStart(t, !0);
      }
      if (v) {
        a ? (a.e += u - (Oe || 0), a.f += d - (Ie || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: u,
          f: d
        };
        var g = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        p(v, "webkitTransform", g), p(v, "mozTransform", g), p(v, "msTransform", g), p(v, "transform", g), Oe = u, Ie = d, W = n;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!v) {
      var t = this.options.fallbackOnBody ? document.body : E, e = k(h, !0, ue, !0, t), i = this.options;
      if (ue) {
        for (T = t; p(T, "position") === "static" && p(T, "transform") === "none" && T !== document; )
          T = T.parentNode;
        T !== document.body && T !== document.documentElement ? (T === document && (T = V()), e.top += T.scrollTop, e.left += T.scrollLeft) : T = V(), Ne = bi(T);
      }
      v = h.cloneNode(!0), F(v, i.ghostClass, !1), F(v, i.fallbackClass, !0), F(v, i.dragClass, !0), p(v, "transition", ""), p(v, "transform", ""), p(v, "box-sizing", "border-box"), p(v, "margin", 0), p(v, "top", e.top), p(v, "left", e.left), p(v, "width", e.width), p(v, "height", e.height), p(v, "opacity", "0.8"), p(v, "position", ue ? "absolute" : "fixed"), p(v, "zIndex", "100000"), p(v, "pointerEvents", "none"), f.ghost = v, t.appendChild(v), p(v, "transform-origin", wi / parseInt(v.style.width) * 100 + "% " + $i / parseInt(v.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, e) {
    var i = this, r = t.dataTransfer, n = i.options;
    if (R("dragStart", this, {
      evt: t
    }), f.eventCanceled) {
      this._onDrop();
      return;
    }
    R("setupClone", this), f.eventCanceled || (S = Ri(h), S.removeAttribute("id"), S.draggable = !1, S.style["will-change"] = "", this._hideClone(), F(S, this.options.chosenClass, !1), f.clone = S), i.cloneId = ve(function() {
      R("clone", i), !f.eventCanceled && (i.options.removeCloneOnHide || E.insertBefore(S, h), i._hideClone(), M({
        sortable: i,
        name: "clone"
      }));
    }), !e && F(h, n.dragClass, !0), e ? ($e = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : (b(document, "mouseup", i._onDrop), b(document, "touchend", i._onDrop), b(document, "touchcancel", i._onDrop), r && (r.effectAllowed = "move", n.setData && n.setData.call(i, r, h)), w(document, "drop", i), p(h, "transform", "translateZ(0)")), Ot = !0, i._dragStartId = ve(i._dragStarted.bind(i, e, t)), w(document, "selectstart", i), Xt = !0, window.getSelection().removeAllRanges(), Gt && p(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var e = this.el, i = t.target, r, n, a, s = this.options, l = s.group, c = f.active, u = de === l, d = s.sort, g = D || c, _, y = this, $ = !1;
    if (He) return;
    function X(Ut, Li) {
      R(Ut, y, K({
        evt: t,
        isOwner: u,
        axis: _ ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: n,
        canSort: d,
        fromSortable: g,
        target: i,
        completed: N,
        onMove: function(ri, Xi) {
          return pe(E, e, h, r, ri, k(ri), t, Xi);
        },
        changed: Y
      }, Li));
    }
    function J() {
      X("dragOverAnimationCapture"), y.captureAnimationState(), y !== g && g.captureAnimationState();
    }
    function N(Ut) {
      return X("dragOverCompleted", {
        insertion: Ut
      }), Ut && (u ? c._hideClone() : c._showClone(y), y !== g && (F(h, D ? D.options.ghostClass : c.options.ghostClass, !1), F(h, s.ghostClass, !0)), D !== y && y !== f.active ? D = y : y === f.active && D && (D = null), g === y && (y._ignoreWhileAnimating = i), y.animateAll(function() {
        X("dragOverAnimationComplete"), y._ignoreWhileAnimating = null;
      }), y !== g && (g.animateAll(), g._ignoreWhileAnimating = null)), (i === h && !h.animated || i === e && !i.animated) && (Dt = null), !s.dragoverBubble && !t.rootEl && i !== document && (h.parentNode[j]._isOutsideThisEl(t.target), !Ut && $t(t)), !s.dragoverBubble && t.stopPropagation && t.stopPropagation(), $ = !0;
    }
    function Y() {
      H = B(h), ct = B(h, s.draggable), M({
        sortable: y,
        name: "change",
        toEl: e,
        newIndex: H,
        newDraggableIndex: ct,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), i = Q(i, s.draggable, e, !0), X("dragOver"), f.eventCanceled) return $;
    if (h.contains(t.target) || i.animated && i.animatingX && i.animatingY || y._ignoreWhileAnimating === i)
      return N(!1);
    if ($e = !1, c && !s.disabled && (u ? d || (a = C !== E) : D === this || (this.lastPutMode = de.checkPull(this, c, h, t)) && l.checkPut(this, c, h, t))) {
      if (_ = this._getDirection(t, i) === "vertical", r = k(h), X("dragOverValid"), f.eventCanceled) return $;
      if (a)
        return C = E, J(), this._hideClone(), X("revert"), f.eventCanceled || (xt ? E.insertBefore(h, xt) : E.appendChild(h)), N(!0);
      var q = ti(e, s.draggable);
      if (!q || Uo(t, _, this) && !q.animated) {
        if (q === h)
          return N(!1);
        if (q && e === t.target && (i = q), i && (n = k(i)), pe(E, e, h, r, i, n, t, !!i) !== !1)
          return J(), q && q.nextSibling ? e.insertBefore(h, q.nextSibling) : e.appendChild(h), C = e, Y(), N(!0);
      } else if (q && Bo(t, _, this)) {
        var vt = jt(e, 0, s, !0);
        if (vt === h)
          return N(!1);
        if (i = vt, n = k(i), pe(E, e, h, r, i, n, t, !1) !== !1)
          return J(), e.insertBefore(h, vt), C = e, Y(), N(!0);
      } else if (i.parentNode === e) {
        n = k(i);
        var G = 0, yt, zt = h.parentNode !== e, z = !jo(h.animated && h.toRect || r, i.animated && i.toRect || n, _), Ft = _ ? "top" : "left", st = _i(i, "top", "top") || _i(h, "top", "top"), Ht = st ? st.scrollTop : void 0;
        Dt !== i && (yt = n[Ft], Jt = !1, he = !z && s.invertSwap || zt), G = Lo(t, i, n, _, z ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, he, Dt === i);
        var tt;
        if (G !== 0) {
          var _t = B(h);
          do
            _t -= G, tt = C.children[_t];
          while (tt && (p(tt, "display") === "none" || tt === v));
        }
        if (G === 0 || tt === i)
          return N(!1);
        Dt = i, Zt = G;
        var Bt = i.nextElementSibling, lt = !1;
        lt = G === 1;
        var ce = pe(E, e, h, r, i, n, t, lt);
        if (ce !== !1)
          return (ce === 1 || ce === -1) && (lt = ce === 1), He = !0, setTimeout(Ho, 30), J(), lt && !Bt ? e.appendChild(h) : i.parentNode.insertBefore(h, lt ? Bt : i), st && Mi(st, 0, Ht - st.scrollTop), C = h.parentNode, yt !== void 0 && !he && (ge = Math.abs(yt - k(i)[Ft])), Y(), N(!0);
      }
      if (e.contains(h))
        return N(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    b(document, "mousemove", this._onTouchMove), b(document, "touchmove", this._onTouchMove), b(document, "pointermove", this._onTouchMove), b(document, "dragover", $t), b(document, "mousemove", $t), b(document, "touchmove", $t);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    b(t, "mouseup", this._onDrop), b(t, "touchend", this._onDrop), b(t, "pointerup", this._onDrop), b(t, "pointercancel", this._onDrop), b(t, "touchcancel", this._onDrop), b(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var e = this.el, i = this.options;
    if (H = B(h), ct = B(h, i.draggable), R("drop", this, {
      evt: t
    }), C = h && h.parentNode, H = B(h), ct = B(h, i.draggable), f.eventCanceled) {
      this._nulling();
      return;
    }
    Ot = !1, he = !1, Jt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Be(this.cloneId), Be(this._dragStartId), this.nativeDraggable && (b(document, "drop", this), b(e, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Gt && p(document.body, "user-select", ""), p(h, "transform", ""), t && (Xt && (t.cancelable && t.preventDefault(), !i.dropBubble && t.stopPropagation()), v && v.parentNode && v.parentNode.removeChild(v), (E === C || D && D.lastPutMode !== "clone") && S && S.parentNode && S.parentNode.removeChild(S), h && (this.nativeDraggable && b(h, "dragend", this), Me(h), h.style["will-change"] = "", Xt && !Ot && F(h, D ? D.options.ghostClass : this.options.ghostClass, !1), F(h, this.options.chosenClass, !1), M({
      sortable: this,
      name: "unchoose",
      toEl: C,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), E !== C ? (H >= 0 && (M({
      rootEl: C,
      name: "add",
      toEl: C,
      fromEl: E,
      originalEvent: t
    }), M({
      sortable: this,
      name: "remove",
      toEl: C,
      originalEvent: t
    }), M({
      rootEl: C,
      name: "sort",
      toEl: C,
      fromEl: E,
      originalEvent: t
    }), M({
      sortable: this,
      name: "sort",
      toEl: C,
      originalEvent: t
    })), D && D.save()) : H !== It && H >= 0 && (M({
      sortable: this,
      name: "update",
      toEl: C,
      originalEvent: t
    }), M({
      sortable: this,
      name: "sort",
      toEl: C,
      originalEvent: t
    })), f.active && ((H == null || H === -1) && (H = It, ct = Kt), M({
      sortable: this,
      name: "end",
      toEl: C,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    R("nulling", this), E = h = C = v = xt = S = me = ht = wt = W = Xt = H = ct = It = Kt = Dt = Zt = D = de = f.dragged = f.ghost = f.clone = f.active = null;
    var t = this.el;
    Ee.forEach(function(e) {
      t.contains(e) && (e.checked = !0);
    }), Ee.length = Oe = Ie = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        h && (this._onDragOver(t), Fo(t));
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
    for (var t = [], e, i = this.el.children, r = 0, n = i.length, a = this.options; r < n; r++)
      e = i[r], Q(e, a.draggable, this.el, !1) && t.push(e.getAttribute(a.dataIdAttr) || Yo(e));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, e) {
    var i = {}, r = this.el;
    this.toArray().forEach(function(n, a) {
      var s = r.children[a];
      Q(s, this.options.draggable, r, !1) && (i[n] = s);
    }, this), e && this.captureAnimationState(), t.forEach(function(n) {
      i[n] && (r.removeChild(i[n]), r.appendChild(i[n]));
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
    return Q(t, e || this.options.draggable, this.el, !1);
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
    var r = se.modifyOption(this, t, e);
    typeof r < "u" ? i[t] = r : i[t] = e, t === "group" && Fi(i);
  },
  /**
   * Destroy
   */
  destroy: function() {
    R("destroy", this);
    var t = this.el;
    t[j] = null, b(t, "mousedown", this._onTapStart), b(t, "touchstart", this._onTapStart), b(t, "pointerdown", this._onTapStart), this.nativeDraggable && (b(t, "dragover", this), b(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(e) {
      e.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), xe.splice(xe.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!ht) {
      if (R("hideClone", this), f.eventCanceled) return;
      p(S, "display", "none"), this.options.removeCloneOnHide && S.parentNode && S.parentNode.removeChild(S), ht = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (ht) {
      if (R("showClone", this), f.eventCanceled) return;
      h.parentNode == E && !this.options.group.revertClone ? E.insertBefore(S, h) : xt ? E.insertBefore(S, xt) : E.appendChild(S), this.options.group.revertClone && this.animate(h, S), p(S, "display", ""), ht = !1;
    }
  }
};
function Fo(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function pe(o, t, e, i, r, n, a, s) {
  var l, c = o[j], u = c.options.onMove, d;
  return window.CustomEvent && !at && !ae ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = t, l.from = o, l.dragged = e, l.draggedRect = i, l.related = r || t, l.relatedRect = n || k(t), l.willInsertAfter = s, l.originalEvent = a, o.dispatchEvent(l), u && (d = u.call(c, l, a)), d;
}
function Me(o) {
  o.draggable = !1;
}
function Ho() {
  He = !1;
}
function Bo(o, t, e) {
  var i = k(jt(e.el, 0, e.options, !0)), r = ji(e.el, e.options, v), n = 10;
  return t ? o.clientX < r.left - n || o.clientY < i.top && o.clientX < i.right : o.clientY < r.top - n || o.clientY < i.bottom && o.clientX < i.left;
}
function Uo(o, t, e) {
  var i = k(ti(e.el, e.options.draggable)), r = ji(e.el, e.options, v), n = 10;
  return t ? o.clientX > r.right + n || o.clientY > i.bottom && o.clientX > i.left : o.clientY > r.bottom + n || o.clientX > i.right && o.clientY > i.top;
}
function Lo(o, t, e, i, r, n, a, s) {
  var l = i ? o.clientY : o.clientX, c = i ? e.height : e.width, u = i ? e.top : e.left, d = i ? e.bottom : e.right, g = !1;
  if (!a) {
    if (s && ge < c * r) {
      if (!Jt && (Zt === 1 ? l > u + c * n / 2 : l < d - c * n / 2) && (Jt = !0), Jt)
        g = !0;
      else if (Zt === 1 ? l < u + ge : l > d - ge)
        return -Zt;
    } else if (l > u + c * (1 - r) / 2 && l < d - c * (1 - r) / 2)
      return Xo(t);
  }
  return g = g || a, g && (l < u + c * n / 2 || l > d - c * n / 2) ? l > u + c / 2 ? 1 : -1 : 0;
}
function Xo(o) {
  return B(h) < B(o) ? 1 : -1;
}
function Yo(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, e = t.length, i = 0; e--; )
    i += t.charCodeAt(e);
  return i.toString(36);
}
function Wo(o) {
  Ee.length = 0;
  for (var t = o.getElementsByTagName("input"), e = t.length; e--; ) {
    var i = t[e];
    i.checked && Ee.push(i);
  }
}
function ve(o) {
  return setTimeout(o, 0);
}
function Be(o) {
  return clearTimeout(o);
}
ke && w(document, "touchmove", function(o) {
  (f.active || Ot) && o.cancelable && o.preventDefault();
});
f.utils = {
  on: w,
  off: b,
  css: p,
  find: Ii,
  is: function(t, e) {
    return !!Q(t, e, t, !1);
  },
  extend: Ao,
  throttle: Ni,
  closest: Q,
  toggleClass: F,
  clone: Ri,
  index: B,
  nextTick: ve,
  cancelNextTick: Be,
  detectDirection: zi,
  getChild: jt,
  expando: j
};
f.get = function(o) {
  return o[j];
};
f.mount = function() {
  for (var o = arguments.length, t = new Array(o), e = 0; e < o; e++)
    t[e] = arguments[e];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(i) {
    if (!i.prototype || !i.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));
    i.utils && (f.utils = K(K({}, f.utils), i.utils)), se.mount(i);
  });
};
f.create = function(o, t) {
  return new f(o, t);
};
f.version = Po;
var P = [], Yt, Ue, Le = !1, Re, je, Se, Wt;
function Qo() {
  function o() {
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
  return o.prototype = {
    dragStarted: function(e) {
      var i = e.originalEvent;
      this.sortable.nativeDraggable ? w(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? w(document, "pointermove", this._handleFallbackAutoScroll) : i.touches ? w(document, "touchmove", this._handleFallbackAutoScroll) : w(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(e) {
      var i = e.originalEvent;
      !this.options.dragOverBubble && !i.rootEl && this._handleAutoScroll(i);
    },
    drop: function() {
      this.sortable.nativeDraggable ? b(document, "dragover", this._handleAutoScroll) : (b(document, "pointermove", this._handleFallbackAutoScroll), b(document, "touchmove", this._handleFallbackAutoScroll), b(document, "mousemove", this._handleFallbackAutoScroll)), Ei(), ye(), Do();
    },
    nulling: function() {
      Se = Ue = Yt = Le = Wt = Re = je = null, P.length = 0;
    },
    _handleFallbackAutoScroll: function(e) {
      this._handleAutoScroll(e, !0);
    },
    _handleAutoScroll: function(e, i) {
      var r = this, n = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, s = document.elementFromPoint(n, a);
      if (Se = e, i || this.options.forceAutoScrollFallback || ae || at || Gt) {
        qe(e, this.options, s, i);
        var l = ut(s, !0);
        Le && (!Wt || n !== Re || a !== je) && (Wt && Ei(), Wt = setInterval(function() {
          var c = ut(document.elementFromPoint(n, a), !0);
          c !== l && (l = c, ye()), qe(e, r.options, c, i);
        }, 10), Re = n, je = a);
      } else {
        if (!this.options.bubbleScroll || ut(s, !0) === V()) {
          ye();
          return;
        }
        qe(e, this.options, ut(s, !1), !1);
      }
    }
  }, it(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function ye() {
  P.forEach(function(o) {
    clearInterval(o.pid);
  }), P = [];
}
function Ei() {
  clearInterval(Wt);
}
var qe = Ni(function(o, t, e, i) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, n = (o.touches ? o.touches[0] : o).clientY, a = t.scrollSensitivity, s = t.scrollSpeed, l = V(), c = !1, u;
    Ue !== e && (Ue = e, ye(), Yt = t.scroll, u = t.scrollFn, Yt === !0 && (Yt = ut(e, !0)));
    var d = 0, g = Yt;
    do {
      var _ = g, y = k(_), $ = y.top, X = y.bottom, J = y.left, N = y.right, Y = y.width, q = y.height, vt = void 0, G = void 0, yt = _.scrollWidth, zt = _.scrollHeight, z = p(_), Ft = _.scrollLeft, st = _.scrollTop;
      _ === l ? (vt = Y < yt && (z.overflowX === "auto" || z.overflowX === "scroll" || z.overflowX === "visible"), G = q < zt && (z.overflowY === "auto" || z.overflowY === "scroll" || z.overflowY === "visible")) : (vt = Y < yt && (z.overflowX === "auto" || z.overflowX === "scroll"), G = q < zt && (z.overflowY === "auto" || z.overflowY === "scroll"));
      var Ht = vt && (Math.abs(N - r) <= a && Ft + Y < yt) - (Math.abs(J - r) <= a && !!Ft), tt = G && (Math.abs(X - n) <= a && st + q < zt) - (Math.abs($ - n) <= a && !!st);
      if (!P[d])
        for (var _t = 0; _t <= d; _t++)
          P[_t] || (P[_t] = {});
      (P[d].vx != Ht || P[d].vy != tt || P[d].el !== _) && (P[d].el = _, P[d].vx = Ht, P[d].vy = tt, clearInterval(P[d].pid), (Ht != 0 || tt != 0) && (c = !0, P[d].pid = setInterval(function() {
        i && this.layer === 0 && f.active._onTouchMove(Se);
        var Bt = P[this.layer].vy ? P[this.layer].vy * s : 0, lt = P[this.layer].vx ? P[this.layer].vx * s : 0;
        typeof u == "function" && u.call(f.dragged.parentNode[j], lt, Bt, o, Se, P[this.layer].el) !== "continue" || Mi(P[this.layer].el, lt, Bt);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && g !== l && (g = ut(g, !1)));
    Le = c;
  }
}, 30), Ui = function(t) {
  var e = t.originalEvent, i = t.putSortable, r = t.dragEl, n = t.activeSortable, a = t.dispatchSortableEvent, s = t.hideGhostForTarget, l = t.unhideGhostForTarget;
  if (e) {
    var c = i || n;
    s();
    var u = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e, d = document.elementFromPoint(u.clientX, u.clientY);
    l(), c && !c.el.contains(d) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: i
    }));
  }
};
function ei() {
}
ei.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var e = t.oldDraggableIndex;
    this.startIndex = e;
  },
  onSpill: function(t) {
    var e = t.dragEl, i = t.putSortable;
    this.sortable.captureAnimationState(), i && i.captureAnimationState();
    var r = jt(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(e, r) : this.sortable.el.appendChild(e), this.sortable.animateAll(), i && i.animateAll();
  },
  drop: Ui
};
it(ei, {
  pluginName: "revertOnSpill"
});
function ii() {
}
ii.prototype = {
  onSpill: function(t) {
    var e = t.dragEl, i = t.putSortable, r = i || this.sortable;
    r.captureAnimationState(), e.parentNode && e.parentNode.removeChild(e), r.animateAll();
  },
  drop: Ui
};
it(ii, {
  pluginName: "removeOnSpill"
});
f.mount(new Qo());
f.mount(ii, ei);
var Go = Object.defineProperty, Vo = Object.getOwnPropertyDescriptor, Pt = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Vo(t, e) : t, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && Go(t, e, r), r;
};
let ot = class extends U {
  constructor() {
    super(...arguments), this.playlist = null, this.loading = !1, this.saving = !1, this._tracks = [], this._hasChanges = !1, this._sortable = null;
  }
  updated(o) {
    super.updated(o), o.has("playlist") && this.playlist && (this._tracks = [...this.playlist.tracks], this._hasChanges = !1, this._initSortable());
  }
  _initSortable() {
    this._sortable && this._sortable.destroy(), this._trackList && (this._sortable = new f(this._trackList, {
      handle: "[data-drag-handle]",
      animation: 150,
      ghostClass: "sortable-ghost",
      dragClass: "sortable-drag",
      onEnd: (o) => {
        o.oldIndex !== void 0 && o.newIndex !== void 0 && o.oldIndex !== o.newIndex && this._onReorder(o.oldIndex, o.newIndex);
      }
    }));
  }
  _onReorder(o, t) {
    const e = [...this._tracks], [i] = e.splice(o, 1);
    e.splice(t, 0, i), e.forEach((r, n) => {
      r.trackNo = n + 1;
    }), this._tracks = e, this._hasChanges = !0, this.dispatchEvent(new CustomEvent("track-reorder", {
      detail: { oldIndex: o, newIndex: t, tracks: this._tracks },
      bubbles: !0,
      composed: !0
    }));
  }
  _onRemoveTrack(o) {
    const { index: t } = o.detail, e = [...this._tracks];
    e.splice(t, 1), e.forEach((i, r) => {
      i.trackNo = r + 1;
    }), this._tracks = e, this._hasChanges = !0, this.dispatchEvent(new CustomEvent("track-remove", {
      detail: { index: t, tracks: this._tracks },
      bubbles: !0,
      composed: !0
    }));
  }
  _onPlayTrack(o) {
    const { track: t } = o.detail;
    this.dispatchEvent(new CustomEvent("play-track", {
      detail: { track: t },
      bubbles: !0,
      composed: !0
    }));
  }
  _onBack() {
    this.dispatchEvent(new CustomEvent("back", {
      bubbles: !0,
      composed: !0
    }));
  }
  _onDeletePlaylist() {
    this.dispatchEvent(new CustomEvent("delete-playlist", {
      detail: { playlist: this.playlist },
      bubbles: !0,
      composed: !0
    }));
  }
  _onPlayAll() {
    this.dispatchEvent(new CustomEvent("play-playlist", {
      detail: { playlist: this.playlist },
      bubbles: !0,
      composed: !0
    }));
  }
  _onSaveChanges() {
    this.dispatchEvent(new CustomEvent("save-changes", {
      detail: { playlist: this.playlist, tracks: this._tracks },
      bubbles: !0,
      composed: !0
    }));
  }
  _onAddTracks() {
    this.dispatchEvent(new CustomEvent("add-tracks", {
      detail: { playlist: this.playlist },
      bubbles: !0,
      composed: !0
    }));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._sortable && (this._sortable.destroy(), this._sortable = null);
  }
  render() {
    if (this.loading)
      return m`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
        </div>
      `;
    if (!this.playlist)
      return m`
        <div class="error">
          <p>Playlist not found</p>
        </div>
      `;
    const o = this._tracks.length, t = this._tracks.reduce((e, i) => e + (i.duration || 0), 0);
    return m`
      <div class="header">
        <button class="back-button" @click=${this._onBack} title="Back to playlists">
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </button>
        <div class="header-info">
          <div class="playlist-title">${this.playlist.name}</div>
          <div class="playlist-meta">
            ${o} track${o !== 1 ? "s" : ""} • ${yo(t)}
            ${this._hasChanges ? " • Unsaved changes" : ""}
          </div>
        </div>
        <button class="delete-button" @click=${this._onDeletePlaylist} title="Delete playlist">
          <ha-icon icon="mdi:delete"></ha-icon>
        </button>
      </div>

      ${o > 1 ? m`
        <div class="reorder-hint">
          <ha-icon icon="mdi:information-outline"></ha-icon>
          Drag tracks to reorder
        </div>
      ` : ""}

      <div class="track-list">
        ${this._tracks.map((e, i) => m`
          <mopidy-track-item
            .track=${e}
            .index=${i}
            .draggable=${o > 1}
            .showRemove=${!0}
            @remove-track=${this._onRemoveTrack}
            @play-track=${this._onPlayTrack}
          ></mopidy-track-item>
        `)}
        
        ${o === 0 ? m`
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
        ${o > 0 ? m`
          <mwc-button @click=${this._onPlayAll} ?disabled=${this.saving}>
            <ha-icon icon="mdi:play"></ha-icon>
            Play All
          </mwc-button>
        ` : ""}
        ${this._hasChanges ? m`
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
ot.styles = [mt, nt`
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
      max-height: 400px;
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
  `];
Pt([
  x({ type: Object })
], ot.prototype, "playlist", 2);
Pt([
  x({ type: Boolean })
], ot.prototype, "loading", 2);
Pt([
  x({ type: Boolean })
], ot.prototype, "saving", 2);
Pt([
  I()
], ot.prototype, "_tracks", 2);
Pt([
  I()
], ot.prototype, "_hasChanges", 2);
Pt([
  Ke(".track-list")
], ot.prototype, "_trackList", 2);
ot = Pt([
  ft("mopidy-playlist-detail")
], ot);
var Ko = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, le = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Zo(t, e) : t, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && Ko(t, e, r), r;
};
let Ct = class extends U {
  constructor() {
    super(...arguments), this.draggable = !0, this.showRemove = !0, this.index = 0;
  }
  _onRemoveClick(o) {
    o.stopPropagation(), this.dispatchEvent(new CustomEvent("remove-track", {
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
    const o = this.track.artists?.join(", ") || "";
    return m`
      <div class="track-item">
        ${this.draggable ? m`
          <div class="drag-handle" data-drag-handle>
            <ha-icon icon="mdi:drag"></ha-icon>
          </div>
        ` : m`
          <div class="track-number">${this.track.trackNo || this.index + 1}</div>
        `}
        
        <div class="track-info" @click=${this._onTrackClick}>
          <div class="track-title">${this.track.name}</div>
          ${o ? m`
            <div class="track-artist">${o}${this.track.album ? ` • ${this.track.album}` : ""}</div>
          ` : ""}
        </div>
        
        <div class="track-duration">${ze(this.track.duration)}</div>
        
        ${this.showRemove ? m`
          <button class="remove-button" @click=${this._onRemoveClick} title="Remove track">
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        ` : ""}
      </div>
    `;
  }
};
Ct.styles = [mt, nt`
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
le([
  x({ type: Object })
], Ct.prototype, "track", 2);
le([
  x({ type: Boolean })
], Ct.prototype, "draggable", 2);
le([
  x({ type: Boolean })
], Ct.prototype, "showRemove", 2);
le([
  x({ type: Number })
], Ct.prototype, "index", 2);
Ct = le([
  ft("mopidy-track-item")
], Ct);
var Jo = Object.defineProperty, tr = Object.getOwnPropertyDescriptor, qt = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? tr(t, e) : t, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && Jo(t, e, r), r;
};
let pt = class extends U {
  constructor() {
    super(...arguments), this.queue = [], this.searching = !1, this._searchQuery = "", this._activeTab = "queue", this._searchResults = [];
  }
  _onSearchInput(o) {
    const t = o.target;
    this._searchQuery = t.value, this._searchTimeout && clearTimeout(this._searchTimeout), this._searchQuery.trim() ? this._searchTimeout = window.setTimeout(() => {
      this._performSearch();
    }, 300) : this._searchResults = [];
  }
  _performSearch() {
    this.dispatchEvent(new CustomEvent("search", {
      detail: { query: this._searchQuery },
      bubbles: !0,
      composed: !0
    }));
  }
  _onTabChange(o) {
    this._activeTab = o;
  }
  _onAddTrack(o) {
    this.dispatchEvent(new CustomEvent("add-track", {
      detail: { track: o },
      bubbles: !0,
      composed: !0
    }));
  }
  _onAddQueueItem(o) {
    this._onAddTrack({
      uri: o.uri,
      name: o.name,
      artists: o.artists,
      album: o.album,
      duration: o.duration
    });
  }
  setSearchResults(o) {
    this._searchResults = o;
  }
  render() {
    return m`
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

      ${this._searchQuery.trim() ? m`
        <div class="search-results">
          ${this.searching ? m`
            <div class="searching">
              <ha-circular-progress active></ha-circular-progress>
              <p>Searching...</p>
            </div>
          ` : this._searchResults.length > 0 ? m`
            <div class="section-title">Search Results</div>
            ${this._searchResults.map((o) => m`
              <div class="result-item">
                <div class="result-info">
                  <div class="result-title">${o.name}</div>
                  ${o.artists?.length ? m`
                    <div class="result-artist">${o.artists.join(", ")}</div>
                  ` : ""}
                </div>
                <div class="result-duration">${ze(o.duration)}</div>
                <button class="add-button" @click=${() => this._onAddTrack(o)} title="Add to playlist">
                  <ha-icon icon="mdi:plus-circle"></ha-icon>
                </button>
              </div>
            `)}
          ` : m`
            <div class="no-results">
              <ha-icon icon="mdi:music-note-off"></ha-icon>
              <p>No tracks found</p>
            </div>
          `}
        </div>
      ` : m`
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

        ${this._activeTab === "queue" ? m`
          <div class="queue-list">
            ${this.queue.length > 0 ? m`
              <div class="section-title">Add from Queue</div>
              ${this.queue.map((o) => m`
                <div class="result-item">
                  <div class="result-info">
                    <div class="result-title">${o.name}</div>
                    ${o.artists?.length ? m`
                      <div class="result-artist">${o.artists.join(", ")}</div>
                    ` : ""}
                  </div>
                  <div class="result-duration">${ze(o.duration)}</div>
                  <button class="add-button" @click=${() => this._onAddQueueItem(o)} title="Add to playlist">
                    <ha-icon icon="mdi:plus-circle"></ha-icon>
                  </button>
                </div>
              `)}
            ` : m`
              <div class="no-results">
                <ha-icon icon="mdi:playlist-remove"></ha-icon>
                <p>Queue is empty</p>
              </div>
            `}
          </div>
        ` : m`
          <div class="no-results">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <p>Enter a search term to find tracks</p>
          </div>
        `}
      `}
    `;
  }
};
pt.styles = [mt, nt`
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
      max-height: 300px;
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
qt([
  x({ type: Array })
], pt.prototype, "queue", 2);
qt([
  x({ type: Boolean })
], pt.prototype, "searching", 2);
qt([
  I()
], pt.prototype, "_searchQuery", 2);
qt([
  I()
], pt.prototype, "_activeTab", 2);
qt([
  I()
], pt.prototype, "_searchResults", 2);
pt = qt([
  ft("mopidy-track-search")
], pt);
var er = Object.defineProperty, ir = Object.getOwnPropertyDescriptor, gt = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ir(t, e) : t, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && er(t, e, r), r;
};
let Z = class extends U {
  constructor() {
    super(...arguments), this.open = !1, this.title = "Confirm", this.message = "", this.confirmText = "Confirm", this.cancelText = "Cancel", this.destructive = !1;
  }
  /**
   * Show the dialog and return a promise that resolves to true (confirm) or false (cancel)
   */
  show() {
    return this.open = !0, new Promise((o) => {
      this._resolve = o;
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
    return this.open ? m`
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
    ` : m``;
  }
};
Z.styles = [mt, nt`
    :host {
      display: contents;
    }
  `];
gt([
  x({ type: Boolean })
], Z.prototype, "open", 2);
gt([
  x({ type: String })
], Z.prototype, "title", 2);
gt([
  x({ type: String })
], Z.prototype, "message", 2);
gt([
  x({ type: String })
], Z.prototype, "confirmText", 2);
gt([
  x({ type: String })
], Z.prototype, "cancelText", 2);
gt([
  x({ type: Boolean })
], Z.prototype, "destructive", 2);
gt([
  I()
], Z.prototype, "_resolve", 2);
Z = gt([
  ft("mopidy-confirm-dialog")
], Z);
var or = Object.defineProperty, rr = Object.getOwnPropertyDescriptor, kt = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? rr(t, e) : t, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && or(t, e, r), r;
};
let rt = class extends U {
  constructor() {
    super(...arguments), this.open = !1, this.queue = [], this.defaultScheme = "m3u", this._name = "", this._source = "empty";
  }
  /**
   * Show the dialog and return a promise
   */
  show() {
    return this._name = "", this._source = "empty", this.open = !0, new Promise((o) => {
      this._resolve = o;
    });
  }
  _onNameChange(o) {
    const t = o.target;
    this._name = t.value;
  }
  _onSourceChange(o) {
    const t = o.target;
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
    if (!this.open) return m``;
    const o = this.queue.length, t = o > 0;
    return m`
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
                <span>Current queue (${o} tracks)</span>
              </label>
              ${t && this._source === "queue" ? m`
                <div class="queue-info">
                  ${o} track${o !== 1 ? "s" : ""} will be added to the new playlist
                </div>
              ` : ""}
              ${t ? "" : m`
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
rt.styles = [mt, nt`
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
kt([
  x({ type: Boolean })
], rt.prototype, "open", 2);
kt([
  x({ type: Array })
], rt.prototype, "queue", 2);
kt([
  x({ type: String })
], rt.prototype, "defaultScheme", 2);
kt([
  I()
], rt.prototype, "_name", 2);
kt([
  I()
], rt.prototype, "_source", 2);
kt([
  I()
], rt.prototype, "_resolve", 2);
rt = kt([
  ft("mopidy-create-playlist-dialog")
], rt);
var nr = Object.defineProperty, ar = Object.getOwnPropertyDescriptor, L = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ar(t, e) : t, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && nr(t, e, r), r;
};
let O = class extends U {
  constructor() {
    super(...arguments), this._view = "list", this._loading = !1, this._saving = !1, this._playlists = [], this._selectedPlaylist = null, this._queue = [], this._toast = null;
  }
  updated(t) {
    super.updated(t), t.has("hass") && this.hass && this.config && (this._service = new _o(this.hass, this.config.entity), this._view === "list" && this._playlists.length === 0 && this._loadPlaylists(), this._loadQueue());
  }
  async _loadPlaylists() {
    if (this._service) {
      this._loading = !0;
      try {
        this._playlists = await this._service.getPlaylists();
      } catch (t) {
        console.error("Error loading playlists:", t), this._showToast("Failed to load playlists");
      } finally {
        this._loading = !1;
      }
    }
  }
  async _loadQueue() {
    if (this._service)
      try {
        this._queue = await this._service.getQueue();
      } catch (t) {
        console.error("Error loading queue:", t);
      }
  }
  async _loadPlaylistDetail(t) {
    if (this._service) {
      this._loading = !0;
      try {
        this._selectedPlaylist = await this._service.getPlaylist(t), this._view = "detail";
      } catch (e) {
        console.error("Error loading playlist:", e), this._showToast("Failed to load playlist");
      } finally {
        this._loading = !1;
      }
    }
  }
  _showToast(t) {
    this._toast = t, this._toastTimeout && clearTimeout(this._toastTimeout), this._toastTimeout = window.setTimeout(() => {
      this._toast = null;
    }, 3e3);
  }
  // Event handlers
  async _onCreatePlaylist() {
    if (!this._createDialog) return;
    const t = await this._createDialog.show();
    if (t) {
      this._saving = !0;
      try {
        t.source === "queue" ? await this._service?.saveQueueToPlaylist(t.name) : await this._service?.createPlaylist(t.name), this._showToast(`Playlist "${t.name}" created`), await this._loadPlaylists();
      } catch (e) {
        console.error("Error creating playlist:", e), this._showToast("Failed to create playlist");
      } finally {
        this._saving = !1;
      }
    }
  }
  async _onDeletePlaylist(t) {
    const { playlist: e } = t.detail;
    if (!(!this._confirmDialog || (this._confirmDialog.title = "Delete Playlist", this._confirmDialog.message = `Are you sure you want to delete "${e.name}"? This cannot be undone.`, this._confirmDialog.destructive = !0, this._confirmDialog.confirmText = "Delete", !await this._confirmDialog.show())))
      try {
        await this._service?.deletePlaylist(e.uri), this._showToast(`Playlist "${e.name}" deleted`), this._view === "detail" && this._selectedPlaylist?.uri === e.uri && (this._view = "list", this._selectedPlaylist = null), await this._loadPlaylists();
      } catch (r) {
        console.error("Error deleting playlist:", r), this._showToast("Failed to delete playlist");
      }
  }
  _onSelectPlaylist(t) {
    const { playlist: e } = t.detail;
    this._loadPlaylistDetail(e.uri);
  }
  _onBackToList() {
    this._view = "list", this._selectedPlaylist = null;
  }
  async _onPlayPlaylist(t) {
    const { playlist: e } = t.detail;
    try {
      await this._service?.playPlaylist(e.uri), this._showToast(`Playing "${e.name}"`);
    } catch (i) {
      console.error("Error playing playlist:", i), this._showToast("Failed to play playlist");
    }
  }
  async _onPlayTrack(t) {
    const { track: e } = t.detail;
    try {
      await this._service?.playTrack(e.uri), this._showToast(`Playing "${e.name}"`);
    } catch (i) {
      console.error("Error playing track:", i), this._showToast("Failed to play track");
    }
  }
  async _onRemoveTrack(t) {
    const { index: e, tracks: i } = t.detail;
    if (this._selectedPlaylist) {
      this._saving = !0;
      try {
        await this._service?.removeFromPlaylist(this._selectedPlaylist.uri, [e]), this._selectedPlaylist = {
          ...this._selectedPlaylist,
          tracks: i
        }, this._showToast("Track removed");
      } catch (r) {
        console.error("Error removing track:", r), this._showToast("Failed to remove track");
      } finally {
        this._saving = !1;
      }
    }
  }
  async _onSaveChanges(t) {
    const { playlist: e, tracks: i } = t.detail;
    if (e) {
      this._saving = !0;
      try {
        if (await this._service?.clearPlaylist(e.uri), i.length > 0) {
          const r = i.map((n) => n.uri);
          await this._service?.addToPlaylist(e.uri, r);
        }
        this._selectedPlaylist = {
          ...e,
          tracks: i
        }, this._showToast("Playlist saved");
      } catch (r) {
        console.error("Error saving playlist:", r), this._showToast("Failed to save playlist");
      } finally {
        this._saving = !1;
      }
    }
  }
  _onAddTracks(t) {
    this._view = "search";
  }
  async _onAddTrack(t) {
    const { track: e } = t.detail;
    if (this._selectedPlaylist)
      try {
        await this._service?.addToPlaylist(this._selectedPlaylist.uri, [e.uri]), this._showToast(`Added "${e.name}"`), await this._loadPlaylistDetail(this._selectedPlaylist.uri);
      } catch (i) {
        console.error("Error adding track:", i), this._showToast("Failed to add track");
      }
  }
  async _onSearch(t) {
    const { query: e } = t.detail;
    console.log("Search query:", e);
  }
  _onCloseSearch() {
    this._view = "detail";
  }
  setConfig(t) {
    if (!t.entity)
      throw new Error("Entity is required");
    this.config = t;
  }
  getCardSize() {
    return 5;
  }
  render() {
    if (!this.config)
      return m`<ha-card><div class="error">Configuration error</div></ha-card>`;
    const t = this.config.title || "Playlist Manager";
    return m`
      <ha-card>
        ${this._view === "list" ? m`
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
          ${this.config.show_queue_button !== !1 && this._queue.length > 0 ? m`
            <div class="card-actions">
              <mwc-button @click=${this._onCreatePlaylist}>
                <ha-icon icon="mdi:content-save"></ha-icon>
                Save Queue as Playlist
              </mwc-button>
            </div>
          ` : ""}
        ` : this._view === "detail" ? m`
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
        ` : m`
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
                @add-track=${this._onAddTrack}
                @search=${this._onSearch}
              ></mopidy-track-search>
            </div>
          </div>
        `}
      </ha-card>

      <mopidy-confirm-dialog></mopidy-confirm-dialog>
      <mopidy-create-playlist-dialog .queue=${this._queue}></mopidy-create-playlist-dialog>

      ${this._toast ? m`
        <div class="toast">${this._toast}</div>
      ` : ""}
    `;
  }
};
O.styles = [mt, nt`
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
  x({ attribute: !1 })
], O.prototype, "hass", 2);
L([
  x({ type: Object })
], O.prototype, "config", 2);
L([
  I()
], O.prototype, "_view", 2);
L([
  I()
], O.prototype, "_loading", 2);
L([
  I()
], O.prototype, "_saving", 2);
L([
  I()
], O.prototype, "_playlists", 2);
L([
  I()
], O.prototype, "_selectedPlaylist", 2);
L([
  I()
], O.prototype, "_queue", 2);
L([
  I()
], O.prototype, "_toast", 2);
L([
  Ke("mopidy-confirm-dialog")
], O.prototype, "_confirmDialog", 2);
L([
  Ke("mopidy-create-playlist-dialog")
], O.prototype, "_createDialog", 2);
O = L([
  ft("mopidy-playlist-card")
], O);
var sr = Object.defineProperty, lr = Object.getOwnPropertyDescriptor, oi = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? lr(t, e) : t, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && sr(t, e, r), r;
};
let re = class extends U {
  _onEntityChange(o) {
    const t = o.detail.value;
    this._updateConfig("entity", t);
  }
  _onTitleChange(o) {
    const t = o.target.value;
    this._updateConfig("title", t);
  }
  _onShowQueueButtonChange(o) {
    const t = o.target.checked;
    this._updateConfig("show_queue_button", t);
  }
  _updateConfig(o, t) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...this.config, [o]: t } },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return m`
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
re.styles = [mt, nt`
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
oi([
  x({ attribute: !1 })
], re.prototype, "hass", 2);
oi([
  x({ type: Object })
], re.prototype, "config", 2);
re = oi([
  ft("mopidy-playlist-card-editor")
], re);
const cr = {
  type: "mopidy-playlist-card",
  name: "Mopidy Playlist Card",
  description: "A card for managing Mopidy playlists - create, edit, and delete playlists"
};
typeof window < "u" && (window.customCards || (window.customCards = []), window.customCards.push(cr));
console.info(
  "%c MOPIDY-PLAYLIST-CARD %c v1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
customElements.get("mopidy-playlist-card") || customElements.define("mopidy-playlist-card", O);
window.customCards = window.customCards || [];
const dr = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  set hass(o) {
    this._hass = o, this._card && (this._card.hass = o);
  }
  setConfig(o) {
    if (!o.entity)
      throw new Error("Entity is required");
    this._card || (this._card = document.createElement("mopidy-playlist-card"), this.shadowRoot?.appendChild(this._card)), this._card.setConfig(o), this._hass && (this._card.hass = this._hass);
  }
  getCardSize() {
    return 5;
  }
  static getConfigElement() {
    return document.createElement("mopidy-playlist-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:mopidy-playlist-card",
      entity: "",
      title: "Playlist Manager",
      show_queue_button: !0
    };
  }
};
customElements.get("mopidy-playlist-card-wrapper") || customElements.define("mopidy-playlist-card-wrapper", dr);
const mr = O;
export {
  O as MopidyPlaylistCard,
  mr as default
};
//# sourceMappingURL=mopidy-playlist-card.js.map
