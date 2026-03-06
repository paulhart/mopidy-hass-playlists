/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = globalThis, Ke = be.ShadowRoot && (be.ShadyCSS === void 0 || be.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ze = Symbol(), hi = /* @__PURE__ */ new WeakMap();
let Ti = class {
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
const Zi = (o) => new Ti(typeof o == "string" ? o : o + "", void 0, Ze), ct = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, r, a) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + o[a + 1], o[0]);
  return new Ti(e, o, Ze);
}, Ji = (o, t) => {
  if (Ke) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = be.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, o.appendChild(i);
  }
}, ui = Ke ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Zi(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: to, defineProperty: eo, getOwnPropertyDescriptor: io, getOwnPropertyNames: oo, getOwnPropertySymbols: ro, getPrototypeOf: ao } = Object, Oe = globalThis, pi = Oe.trustedTypes, no = pi ? pi.emptyScript : "", so = Oe.reactiveElementPolyfillSupport, te = (o, t) => o, Se = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? no : null;
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
} }, Je = (o, t) => !to(o, t), fi = { attribute: !0, type: String, converter: Se, reflect: !1, useDefault: !1, hasChanged: Je };
Symbol.metadata ??= Symbol("metadata"), Oe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Rt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = fi) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && eo(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: a } = io(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const s = r?.call(this);
      a?.call(this, n), this.requestUpdate(t, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? fi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(te("elementProperties"))) return;
    const t = ao(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(te("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(te("properties"))) {
      const e = this.properties, i = [...oo(e), ...ro(e)];
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
      for (const r of i) e.unshift(ui(r));
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
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : Se).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Se;
      this._$Em = r;
      const s = n.fromAttribute(e, a.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, a) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (a = this[t]), i ??= n.getPropertyOptions(t), !((i.hasChanged ?? Je)(a, e) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: a }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), a !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, a] of i) {
        const { wrapped: n } = a, s = this[r];
        n !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, a, s);
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
Rt.elementStyles = [], Rt.shadowRootOptions = { mode: "open" }, Rt[te("elementProperties")] = /* @__PURE__ */ new Map(), Rt[te("finalized")] = /* @__PURE__ */ new Map(), so?.({ ReactiveElement: Rt }), (Oe.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ti = globalThis, gi = (o) => o, ke = ti.trustedTypes, mi = ke ? ke.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Oi = "$lit$", ft = `lit$${Math.random().toFixed(9).slice(2)}$`, Ii = "?" + ft, lo = `<${Ii}>`, At = document, ne = () => At.createComment(""), se = (o) => o === null || typeof o != "object" && typeof o != "function", ei = Array.isArray, co = (o) => ei(o) || typeof o?.[Symbol.iterator] == "function", Me = `[ 	
\f\r]`, Gt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yi = /-->/g, vi = />/g, Et = RegExp(`>|${Me}(?:([^\\s"'>=/]+)(${Me}*=${Me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _i = /'/g, bi = /"/g, Ni = /^(?:script|style|textarea|title)$/i, ho = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), m = ho(1), zt = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), wi = /* @__PURE__ */ new WeakMap(), Dt = At.createTreeWalker(At, 129);
function Mi(o, t) {
  if (!ei(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mi !== void 0 ? mi.createHTML(t) : t;
}
const uo = (o, t) => {
  const e = o.length - 1, i = [];
  let r, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Gt;
  for (let s = 0; s < e; s++) {
    const l = o[s];
    let c, u, d = -1, y = 0;
    for (; y < l.length && (n.lastIndex = y, u = n.exec(l), u !== null); ) y = n.lastIndex, n === Gt ? u[1] === "!--" ? n = yi : u[1] !== void 0 ? n = vi : u[2] !== void 0 ? (Ni.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = Et) : u[3] !== void 0 && (n = Et) : n === Et ? u[0] === ">" ? (n = r ?? Gt, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, c = u[1], n = u[3] === void 0 ? Et : u[3] === '"' ? bi : _i) : n === bi || n === _i ? n = Et : n === yi || n === vi ? n = Gt : (n = Et, r = void 0);
    const w = n === Et && o[s + 1].startsWith("/>") ? " " : "";
    a += n === Gt ? l + lo : d >= 0 ? (i.push(c), l.slice(0, d) + Oi + l.slice(d) + ft + w) : l + ft + (d === -2 ? s : w);
  }
  return [Mi(o, a + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class le {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let a = 0, n = 0;
    const s = t.length - 1, l = this.parts, [c, u] = uo(t, e);
    if (this.el = le.createElement(c, i), Dt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = Dt.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Oi)) {
          const y = u[n++], w = r.getAttribute(d).split(ft), _ = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: a, name: _[2], strings: w, ctor: _[1] === "." ? fo : _[1] === "?" ? go : _[1] === "@" ? mo : Ie }), r.removeAttribute(d);
        } else d.startsWith(ft) && (l.push({ type: 6, index: a }), r.removeAttribute(d));
        if (Ni.test(r.tagName)) {
          const d = r.textContent.split(ft), y = d.length - 1;
          if (y > 0) {
            r.textContent = ke ? ke.emptyScript : "";
            for (let w = 0; w < y; w++) r.append(d[w], ne()), Dt.nextNode(), l.push({ type: 2, index: ++a });
            r.append(d[y], ne());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ii) l.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(ft, d + 1)) !== -1; ) l.push({ type: 7, index: a }), d += ft.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = At.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Bt(o, t, e = o, i) {
  if (t === zt) return t;
  let r = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const a = se(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(o), r._$AT(o, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = r : e._$Cl = r), r !== void 0 && (t = Bt(o, r._$AS(o, t.values), r, i)), t;
}
class po {
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
    const { el: { content: e }, parts: i } = this._$AD, r = (t?.creationScope ?? At).importNode(e, !0);
    Dt.currentNode = r;
    let a = Dt.nextNode(), n = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new he(a, a.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (c = new yo(a, this, t)), this._$AV.push(c), l = i[++s];
      }
      n !== l?.index && (a = Dt.nextNode(), n++);
    }
    return Dt.currentNode = At, r;
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
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = Bt(this, t, e), se(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== zt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : co(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && se(this._$AH) ? this._$AA.nextSibling.data = t : this.T(At.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = le.createElement(Mi(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const a = new po(r, this), n = a.u(this.options);
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
    let i, r = 0;
    for (const a of t) r === e.length ? e.push(i = new he(this.O(ne()), this.O(ne()), this, this.options)) : i = e[r], i._$AI(a), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = gi(t).nextSibling;
      gi(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ie {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, a) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = T;
  }
  _$AI(t, e = this, i, r) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = Bt(this, t, e, 0), n = !se(t) || t !== this._$AH && t !== zt, n && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = a[0], l = 0; l < a.length - 1; l++) c = Bt(this, s[i + l], e, l), c === zt && (c = this._$AH[l]), n ||= !se(c) || c !== this._$AH[l], c === T ? t = T : t !== T && (t += (c ?? "") + a[l + 1]), this._$AH[l] = c;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class fo extends Ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class go extends Ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class mo extends Ie {
  constructor(t, e, i, r, a) {
    super(t, e, i, r, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Bt(this, t, e, 0) ?? T) === zt) return;
    const i = this._$AH, r = t === T && i !== T || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== T && (i === T || r);
    r && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class yo {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Bt(this, t);
  }
}
const vo = ti.litHtmlPolyfillSupport;
vo?.(le, he), (ti.litHtmlVersions ??= []).push("3.3.2");
const _o = (o, t, e) => {
  const i = e?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const a = e?.renderBefore ?? null;
    i._$litPart$ = r = new he(t.insertBefore(ne(), a), a, void 0, e ?? {});
  }
  return r._$AI(o), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = globalThis;
class Q extends Rt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = _o(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return zt;
  }
}
Q._$litElement$ = !0, Q.finalized = !0, ii.litElementHydrateSupport?.({ LitElement: Q });
const bo = ii.litElementPolyfillSupport;
bo?.({ LitElement: Q });
(ii.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = (o) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(o, t);
  }) : customElements.define(o, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wo = { attribute: !0, type: String, converter: Se, reflect: !1, hasChanged: Je }, $o = (o = wo, t, e) => {
  const { kind: i, metadata: r } = e;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), i === "setter" && ((o = Object.create(o)).wrapped = !0), a.set(e.name, o), i === "accessor") {
    const { name: n } = e;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(n, l, o, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(n, void 0, o, s), s;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(s) {
      const l = this[n];
      t.call(this, s), this.requestUpdate(n, l, o, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function S(o) {
  return (t, e) => typeof e == "object" ? $o(o, t, e) : ((i, r, a) => {
    const n = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, i), n ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(o, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(o) {
  return S({ ...o, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xo = (o, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(o, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function oi(o, t) {
  return (e, i, r) => {
    const a = (n) => n.renderRoot?.querySelector(o) ?? null;
    return xo(e, i, { get() {
      return a(this);
    } });
  };
}
const _t = ct`
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
function Xe(o) {
  if (o == null) return "--:--";
  const t = Math.floor(o / 3600), e = Math.floor(o % 3600 / 60), i = Math.floor(o % 60);
  return t > 0 ? `${t}:${e.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}` : `${e}:${i.toString().padStart(2, "0")}`;
}
function Eo(o) {
  if (o === 0) return "0 min";
  const t = Math.floor(o / 3600), e = Math.floor(o % 3600 / 60);
  return t > 0 ? `${t}h ${e}m` : `${e} min`;
}
function b(...o) {
  console.log("[MopidyPlaylistCard]", ...o);
}
function Vt(...o) {
  console.error("[MopidyPlaylistCard]", ...o);
}
class So {
  constructor(t, e) {
    this.hass = t, this.entityId = e, b("MopidyService constructed with entity:", e);
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
    b("Calling service:", this.serviceDomain, ".", t, "with data:", e);
    try {
      await this.hass.callService(this.serviceDomain, t, e), b("Service call successful:", t);
    } catch (i) {
      throw Vt("Service call failed:", t, i), i;
    }
  }
  /**
   * Browse media using Home Assistant's media browser
   */
  async browseMedia(t, e) {
    b("browseMedia called with:", { mediaContentId: t, mediaContentType: e });
    try {
      const i = await this.hass.callWS({
        type: "media_player/browse_media",
        entity_id: this.entityId,
        media_content_id: t,
        media_content_type: e
      });
      return b("browseMedia result:", i), i;
    } catch (i) {
      throw Vt("browseMedia failed:", i), i;
    }
  }
  /**
   * Get all playlists
   */
  async getPlaylists() {
    b("getPlaylists called");
    try {
      const t = await this.browseMedia();
      b("Root browse result:", t);
      const e = [];
      if (t.children) {
        b("Root has", t.children.length, "children:"), t.children.forEach((i, r) => {
          b(`  Child ${r}:`, {
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
          const r = i.media_content_id?.includes("playlists") || i.title?.toLowerCase() === "playlists";
          if (b("Checking child for playlists:", i.title, "isPlaylistsContainer:", r), r) {
            b("Found playlists container, browsing into it...");
            const a = await this.browseMedia(
              i.media_content_id,
              i.media_content_type
            );
            if (b("Playlists container result:", a), a.children) {
              b("Found", a.children.length, "items in playlists container");
              for (const n of a.children)
                b("Adding playlist:", n.title, "uri:", n.media_content_id, "contentType:", n.media_content_type), e.push({
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
        b("Root result has no children");
      return b("getPlaylists returning", e.length, "playlists"), e;
    } catch (t) {
      return Vt("Error fetching playlists:", t), [];
    }
  }
  /**
   * Get a specific playlist with track details
   */
  async getPlaylist(t, e) {
    b("getPlaylist called with uri:", t, "mediaContentType:", e);
    try {
      const i = await this.browseMedia(t, e);
      b("Playlist browse result:", i);
      const r = [];
      let a = 1;
      if (i.children) {
        b("Playlist has", i.children.length, "tracks");
        for (const s of i.children) {
          const l = {
            uri: s.media_content_id || "",
            name: s.title,
            artists: this.extractArtists(s),
            album: this.extractAlbum(s),
            duration: this.extractDuration(s),
            trackNo: a++
          };
          b("Track", a - 1, ":", l), r.push(l);
        }
      } else
        b("Playlist has no children/tracks");
      const n = {
        uri: t,
        name: i.title,
        tracks: r,
        trackCount: r.length,
        duration: this.calculateTotalDuration(r)
      };
      return b("getPlaylist returning:", n), n;
    } catch (i) {
      return Vt("Error fetching playlist:", i), null;
    }
  }
  /**
   * Get the current queue by browsing the queue: media content
   */
  async getQueue() {
    b("getQueue called for entity:", this.entityId);
    try {
      const t = await this.browseMedia("queue:", "playlist");
      if (b("Queue browse result:", t), !t || !t.children)
        return b("Queue browse returned no children"), [];
      b("Queue has", t.children.length, "items");
      const e = [];
      let i = 0;
      for (const r of t.children) {
        const a = {
          uri: r.media_content_id || "",
          name: r.title,
          artists: this.extractArtists(r),
          album: this.extractAlbum(r),
          duration: this.extractDuration(r),
          position: i,
          trackId: i
          // Use position as track ID since we don't have the actual ID
        };
        b("Queue item", i, ":", a), e.push(a), i++;
      }
      return b("getQueue returning", e.length, "items"), e;
    } catch (t) {
      return Vt("Error fetching queue:", t), [];
    }
  }
  /**
   * Create a new empty playlist
   */
  async createPlaylist(t, e) {
    b("createPlaylist called:", { name: t, uriScheme: e }), await this.callService(`${this.entityName}_create_playlist`, {
      name: t,
      uri_scheme: e
    });
  }
  /**
   * Delete a playlist
   */
  async deletePlaylist(t) {
    b("deletePlaylist called:", { uri: t }), await this.callService(`${this.entityName}_delete_playlist`, {
      uri: t
    });
  }
  /**
   * Rename a playlist
   */
  async renamePlaylist(t, e) {
    b("renamePlaylist called:", { uri: t, name: e }), await this.callService(`${this.entityName}_rename_playlist`, {
      uri: t,
      name: e
    });
  }
  /**
   * Add tracks to a playlist
   */
  async addToPlaylist(t, e, i) {
    b("addToPlaylist called:", { playlistUri: t, trackUris: e, position: i }), await this.callService(`${this.entityName}_add_to_playlist`, {
      playlist_uri: t,
      track_uris: e,
      position: i
    });
  }
  /**
   * Remove tracks from a playlist
   */
  async removeFromPlaylist(t, e) {
    b("removeFromPlaylist called:", { playlistUri: t, positions: e }), await this.callService(`${this.entityName}_remove_from_playlist`, {
      playlist_uri: t,
      positions: e
    });
  }
  /**
   * Move tracks within a playlist
   */
  async moveInPlaylist(t, e, i, r) {
    b("moveInPlaylist called:", { playlistUri: t, start: e, end: i, newPosition: r }), await this.callService(`${this.entityName}_move_in_playlist`, {
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
    b("clearPlaylist called:", { uri: t }), await this.callService(`${this.entityName}_clear_playlist`, {
      uri: t
    });
  }
  /**
   * Save current queue as a new playlist
   */
  async saveQueueToPlaylist(t, e) {
    b("saveQueueToPlaylist called:", { name: t, uriScheme: e }), await this.callService(`${this.entityName}_save_queue_to_playlist`, {
      name: t,
      uri_scheme: e
    });
  }
  /**
   * Play a playlist
   */
  async playPlaylist(t) {
    b("playPlaylist called:", { uri: t }), await this.hass.callService("media_player", "play_media", {
      entity_id: this.entityId,
      media_content_id: t,
      media_content_type: "playlist"
    });
  }
  /**
   * Play a specific track
   */
  async playTrack(t) {
    b("playTrack called:", { uri: t }), await this.hass.callService("media_player", "play_media", {
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
var ko = Object.defineProperty, Po = Object.getOwnPropertyDescriptor, ri = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Po(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && ko(t, e, r), r;
};
function St(...o) {
  console.log("[PlaylistList]", ...o);
}
let ce = class extends Q {
  constructor() {
    super(...arguments), this.playlists = [], this.loading = !1;
  }
  _onPlaylistClick(o) {
    St("Playlist clicked:", o), this.dispatchEvent(new CustomEvent("select-playlist", {
      detail: { playlist: o },
      bubbles: !0,
      composed: !0
    }));
  }
  _onDeleteClick(o, t) {
    o.stopPropagation(), St("Delete clicked for playlist:", t), this.dispatchEvent(new CustomEvent("delete-playlist", {
      detail: { playlist: t },
      bubbles: !0,
      composed: !0
    }));
  }
  _onPlayClick(o, t) {
    o.stopPropagation(), St("Play clicked for playlist:", t), this.dispatchEvent(new CustomEvent("play-playlist", {
      detail: { playlist: t },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return St("render() called, loading:", this.loading, "playlists count:", this.playlists.length), this.loading ? (St("Rendering loading state"), m`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
        </div>
      `) : this.playlists.length === 0 ? (St("Rendering empty state - no playlists"), m`
        <div class="empty-state">
          <ha-icon icon="mdi:playlist-music"></ha-icon>
          <p>No playlists found</p>
          <p>Create a new playlist to get started</p>
        </div>
      `) : (St("Rendering", this.playlists.length, "playlists"), m`
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
    `);
  }
};
ce.styles = [_t, ct`
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
ri([
  S({ type: Array })
], ce.prototype, "playlists", 2);
ri([
  S({ type: Boolean })
], ce.prototype, "loading", 2);
ce = ri([
  vt("mopidy-playlist-list")
], ce);
/**!
 * Sortable 1.15.7
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Co(o, t, e) {
  return (t = Oo(t)) in o ? Object.defineProperty(o, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[t] = e, o;
}
function nt() {
  return nt = Object.assign ? Object.assign.bind() : function(o) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e) ({}).hasOwnProperty.call(e, i) && (o[i] = e[i]);
    }
    return o;
  }, nt.apply(null, arguments);
}
function $i(o, t) {
  var e = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    t && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), e.push.apply(e, i);
  }
  return e;
}
function et(o) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $i(Object(e), !0).forEach(function(i) {
      Co(o, i, e[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e)) : $i(Object(e)).forEach(function(i) {
      Object.defineProperty(o, i, Object.getOwnPropertyDescriptor(e, i));
    });
  }
  return o;
}
function Do(o, t) {
  if (o == null) return {};
  var e, i, r = Ao(o, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(o);
    for (i = 0; i < a.length; i++) e = a[i], t.indexOf(e) === -1 && {}.propertyIsEnumerable.call(o, e) && (r[e] = o[e]);
  }
  return r;
}
function Ao(o, t) {
  if (o == null) return {};
  var e = {};
  for (var i in o) if ({}.hasOwnProperty.call(o, i)) {
    if (t.indexOf(i) !== -1) continue;
    e[i] = o[i];
  }
  return e;
}
function To(o, t) {
  if (typeof o != "object" || !o) return o;
  var e = o[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(o, t);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(o);
}
function Oo(o) {
  var t = To(o, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Ye(o) {
  "@babel/helpers - typeof";
  return Ye = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ye(o);
}
var Io = "1.15.7";
function at(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var dt = at(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), ue = at(/Edge/i), xi = at(/firefox/i), ee = at(/safari/i) && !at(/chrome/i) && !at(/android/i), ai = at(/iP(ad|od|hone)/i), Ri = at(/chrome/i) && at(/android/i), ji = {
  capture: !1,
  passive: !1
};
function x(o, t, e) {
  o.addEventListener(t, e, !dt && ji);
}
function $(o, t, e) {
  o.removeEventListener(t, e, !dt && ji);
}
function Pe(o, t) {
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
function qi(o) {
  return o.host && o !== document && o.host.nodeType && o.host !== o ? o.host : o.parentNode;
}
function Z(o, t, e, i) {
  if (o) {
    e = e || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === e && Pe(o, t) : Pe(o, t)) || i && o === e)
        return o;
      if (o === e) break;
    } while (o = qi(o));
  }
  return null;
}
var Ei = /\s+/g;
function U(o, t, e) {
  if (o && t)
    if (o.classList)
      o.classList[e ? "add" : "remove"](t);
    else {
      var i = (" " + o.className + " ").replace(Ei, " ").replace(" " + t + " ", " ");
      o.className = (i + (e ? " " + t : "")).replace(Ei, " ");
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
function Ft(o, t) {
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
function Fi(o, t, e) {
  if (o) {
    var i = o.getElementsByTagName(t), r = 0, a = i.length;
    if (e)
      for (; r < a; r++)
        e(i[r], r);
    return i;
  }
  return [];
}
function tt() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function A(o, t, e, i, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var a, n, s, l, c, u, d;
    if (o !== window && o.parentNode && o !== tt() ? (a = o.getBoundingClientRect(), n = a.top, s = a.left, l = a.bottom, c = a.right, u = a.height, d = a.width) : (n = 0, s = 0, l = window.innerHeight, c = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || e) && o !== window && (r = r || o.parentNode, !dt))
      do
        if (r && r.getBoundingClientRect && (p(r, "transform") !== "none" || e && p(r, "position") !== "static")) {
          var y = r.getBoundingClientRect();
          n -= y.top + parseInt(p(r, "border-top-width")), s -= y.left + parseInt(p(r, "border-left-width")), l = n + a.height, c = s + a.width;
          break;
        }
      while (r = r.parentNode);
    if (i && o !== window) {
      var w = Ft(r || o), _ = w && w.a, E = w && w.d;
      w && (n /= E, s /= _, d /= _, u /= E, l = n + u, c = s + d);
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
function Si(o, t, e) {
  for (var i = mt(o, !0), r = A(o)[t]; i; ) {
    var a = A(i)[e], n = void 0;
    if (n = r >= a, !n) return i;
    if (i === tt()) break;
    i = mt(i, !1);
  }
  return !1;
}
function Ht(o, t, e, i) {
  for (var r = 0, a = 0, n = o.children; a < n.length; ) {
    if (n[a].style.display !== "none" && n[a] !== f.ghost && (i || n[a] !== f.dragged) && Z(n[a], e.draggable, o, !1)) {
      if (r === t)
        return n[a];
      r++;
    }
    a++;
  }
  return null;
}
function ni(o, t) {
  for (var e = o.lastElementChild; e && (e === f.ghost || p(e, "display") === "none" || t && !Pe(e, t)); )
    e = e.previousElementSibling;
  return e || null;
}
function Y(o, t) {
  var e = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== f.clone && (!t || Pe(o, t)) && e++;
  return e;
}
function ki(o) {
  var t = 0, e = 0, i = tt();
  if (o)
    do {
      var r = Ft(o), a = r.a, n = r.d;
      t += o.scrollLeft * a, e += o.scrollTop * n;
    } while (o !== i && (o = o.parentNode));
  return [t, e];
}
function No(o, t) {
  for (var e in o)
    if (o.hasOwnProperty(e)) {
      for (var i in t)
        if (t.hasOwnProperty(i) && t[i] === o[e][i]) return Number(e);
    }
  return -1;
}
function mt(o, t) {
  if (!o || !o.getBoundingClientRect) return tt();
  var e = o, i = !1;
  do
    if (e.clientWidth < e.scrollWidth || e.clientHeight < e.scrollHeight) {
      var r = p(e);
      if (e.clientWidth < e.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || e.clientHeight < e.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!e.getBoundingClientRect || e === document.body) return tt();
        if (i || t) return e;
        i = !0;
      }
    }
  while (e = e.parentNode);
  return tt();
}
function Mo(o, t) {
  if (o && t)
    for (var e in t)
      t.hasOwnProperty(e) && (o[e] = t[e]);
  return o;
}
function Re(o, t) {
  return Math.round(o.top) === Math.round(t.top) && Math.round(o.left) === Math.round(t.left) && Math.round(o.height) === Math.round(t.height) && Math.round(o.width) === Math.round(t.width);
}
var ie;
function zi(o, t) {
  return function() {
    if (!ie) {
      var e = arguments, i = this;
      e.length === 1 ? o.call(i, e[0]) : o.apply(i, e), ie = setTimeout(function() {
        ie = void 0;
      }, t);
    }
  };
}
function Ro() {
  clearTimeout(ie), ie = void 0;
}
function Bi(o, t, e) {
  o.scrollLeft += t, o.scrollTop += e;
}
function Hi(o) {
  var t = window.Polymer, e = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : e ? e(o).clone(!0)[0] : o.cloneNode(!0);
}
function Ui(o, t, e) {
  var i = {};
  return Array.from(o.children).forEach(function(r) {
    var a, n, s, l;
    if (!(!Z(r, t.draggable, o, !1) || r.animated || r === e)) {
      var c = A(r);
      i.left = Math.min((a = i.left) !== null && a !== void 0 ? a : 1 / 0, c.left), i.top = Math.min((n = i.top) !== null && n !== void 0 ? n : 1 / 0, c.top), i.right = Math.max((s = i.right) !== null && s !== void 0 ? s : -1 / 0, c.right), i.bottom = Math.max((l = i.bottom) !== null && l !== void 0 ? l : -1 / 0, c.bottom);
    }
  }), i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
var z = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function jo() {
  var o = [], t;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var i = [].slice.call(this.el.children);
        i.forEach(function(r) {
          if (!(p(r, "display") === "none" || r === f.ghost)) {
            o.push({
              target: r,
              rect: A(r)
            });
            var a = et({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var n = Ft(r, !0);
              n && (a.top -= n.f, a.left -= n.e);
            }
            r.fromRect = a;
          }
        });
      }
    },
    addAnimationState: function(i) {
      o.push(i);
    },
    removeAnimationState: function(i) {
      o.splice(No(o, {
        target: i
      }), 1);
    },
    animateAll: function(i) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof i == "function" && i();
        return;
      }
      var a = !1, n = 0;
      o.forEach(function(s) {
        var l = 0, c = s.target, u = c.fromRect, d = A(c), y = c.prevFromRect, w = c.prevToRect, _ = s.rect, E = Ft(c, !0);
        E && (d.top -= E.f, d.left -= E.e), c.toRect = d, c.thisAnimationDuration && Re(y, d) && !Re(u, d) && // Make sure animatingRect is on line between toRect & fromRect
        (_.top - d.top) / (_.left - d.left) === (u.top - d.top) / (u.left - d.left) && (l = Fo(_, y, w, r.options)), Re(d, u) || (c.prevFromRect = u, c.prevToRect = d, l || (l = r.options.animation), r.animate(c, _, d, l)), l && (a = !0, n = Math.max(n, l), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, l), c.thisAnimationDuration = l);
      }), clearTimeout(t), a ? t = setTimeout(function() {
        typeof i == "function" && i();
      }, n) : typeof i == "function" && i(), o = [];
    },
    animate: function(i, r, a, n) {
      if (n) {
        p(i, "transition", ""), p(i, "transform", "");
        var s = Ft(this.el), l = s && s.a, c = s && s.d, u = (r.left - a.left) / (l || 1), d = (r.top - a.top) / (c || 1);
        i.animatingX = !!u, i.animatingY = !!d, p(i, "transform", "translate3d(" + u + "px," + d + "px,0)"), this.forRepaintDummy = qo(i), p(i, "transition", "transform " + n + "ms" + (this.options.easing ? " " + this.options.easing : "")), p(i, "transform", "translate3d(0,0,0)"), typeof i.animated == "number" && clearTimeout(i.animated), i.animated = setTimeout(function() {
          p(i, "transition", ""), p(i, "transform", ""), i.animated = !1, i.animatingX = !1, i.animatingY = !1;
        }, n);
      }
    }
  };
}
function qo(o) {
  return o.offsetWidth;
}
function Fo(o, t, e, i) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) * i.animation;
}
var Nt = [], je = {
  initializeByDefault: !0
}, pe = {
  mount: function(t) {
    for (var e in je)
      je.hasOwnProperty(e) && !(e in t) && (t[e] = je[e]);
    Nt.forEach(function(i) {
      if (i.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), Nt.push(t);
  },
  pluginEvent: function(t, e, i) {
    var r = this;
    this.eventCanceled = !1, i.cancel = function() {
      r.eventCanceled = !0;
    };
    var a = t + "Global";
    Nt.forEach(function(n) {
      e[n.pluginName] && (e[n.pluginName][a] && e[n.pluginName][a](et({
        sortable: e
      }, i)), e.options[n.pluginName] && e[n.pluginName][t] && e[n.pluginName][t](et({
        sortable: e
      }, i)));
    });
  },
  initializePlugins: function(t, e, i, r) {
    Nt.forEach(function(s) {
      var l = s.pluginName;
      if (!(!t.options[l] && !s.initializeByDefault)) {
        var c = new s(t, e, t.options);
        c.sortable = t, c.options = t.options, t[l] = c, nt(i, c.defaults);
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
    return Nt.forEach(function(r) {
      typeof r.eventProperties == "function" && nt(i, r.eventProperties.call(e[r.pluginName], t));
    }), i;
  },
  modifyOption: function(t, e, i) {
    var r;
    return Nt.forEach(function(a) {
      t[a.pluginName] && a.optionListeners && typeof a.optionListeners[e] == "function" && (r = a.optionListeners[e].call(t[a.pluginName], i));
    }), r;
  }
};
function zo(o) {
  var t = o.sortable, e = o.rootEl, i = o.name, r = o.targetEl, a = o.cloneEl, n = o.toEl, s = o.fromEl, l = o.oldIndex, c = o.newIndex, u = o.oldDraggableIndex, d = o.newDraggableIndex, y = o.originalEvent, w = o.putSortable, _ = o.extraEventProperties;
  if (t = t || e && e[z], !!t) {
    var E, G = t.options, ot = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !dt && !ue ? E = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : (E = document.createEvent("Event"), E.initEvent(i, !0, !0)), E.to = n || e, E.from = s || e, E.item = r || e, E.clone = a, E.oldIndex = l, E.newIndex = c, E.oldDraggableIndex = u, E.newDraggableIndex = d, E.originalEvent = y, E.pullMode = w ? w.lastPutMode : void 0;
    var R = et(et({}, _), pe.getEventProperties(i, t));
    for (var V in R)
      E[V] = R[V];
    e && e.dispatchEvent(E), G[ot] && G[ot].call(t, E);
  }
}
var Bo = ["evt"], F = function(t, e) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = i.evt, a = Do(i, Bo);
  pe.pluginEvent.bind(f)(t, e, et({
    dragEl: h,
    parentEl: C,
    ghostEl: v,
    rootEl: k,
    nextEl: Ct,
    lastDownEl: we,
    cloneEl: P,
    cloneHidden: gt,
    dragStarted: Kt,
    putSortable: I,
    activeSortable: f.active,
    originalEvent: r,
    oldIndex: qt,
    oldDraggableIndex: oe,
    newIndex: L,
    newDraggableIndex: pt,
    hideGhostForTarget: Qi,
    unhideGhostForTarget: Wi,
    cloneNowHidden: function() {
      gt = !0;
    },
    cloneNowShown: function() {
      gt = !1;
    },
    dispatchSortableEvent: function(s) {
      j({
        sortable: e,
        name: s,
        originalEvent: r
      });
    }
  }, a));
};
function j(o) {
  zo(et({
    putSortable: I,
    cloneEl: P,
    targetEl: h,
    rootEl: k,
    oldIndex: qt,
    oldDraggableIndex: oe,
    newIndex: L,
    newDraggableIndex: pt
  }, o));
}
var h, C, v, k, Ct, we, P, gt, qt, L, oe, pt, me, I, jt = !1, Ce = !1, De = [], kt, K, qe, Fe, Pi, Ci, Kt, Mt, re, ae = !1, ye = !1, $e, N, ze = [], Qe = !1, Ae = [], Ne = typeof document < "u", ve = ai, Di = ue || dt ? "cssFloat" : "float", Ho = Ne && !Ri && !ai && "draggable" in document.createElement("div"), Li = function() {
  if (Ne) {
    if (dt)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Xi = function(t, e) {
  var i = p(t), r = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), a = Ht(t, 0, e), n = Ht(t, 1, e), s = a && p(a), l = n && p(n), c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + A(a).width, u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + A(n).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (a && s.float && s.float !== "none") {
    var d = s.float === "left" ? "left" : "right";
    return n && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
  }
  return a && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || c >= r && i[Di] === "none" || n && i[Di] === "none" && c + u > r) ? "vertical" : "horizontal";
}, Uo = function(t, e, i) {
  var r = i ? t.left : t.top, a = i ? t.right : t.bottom, n = i ? t.width : t.height, s = i ? e.left : e.top, l = i ? e.right : e.bottom, c = i ? e.width : e.height;
  return r === s || a === l || r + n / 2 === s + c / 2;
}, Lo = function(t, e) {
  var i;
  return De.some(function(r) {
    var a = r[z].options.emptyInsertThreshold;
    if (!(!a || ni(r))) {
      var n = A(r), s = t >= n.left - a && t <= n.right + a, l = e >= n.top - a && e <= n.bottom + a;
      if (s && l)
        return i = r;
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
      var y = (n ? s : l).options.group.name;
      return a === !0 || typeof a == "string" && a === y || a.join && a.indexOf(y) > -1;
    };
  }
  var i = {}, r = t.group;
  (!r || Ye(r) != "object") && (r = {
    name: r
  }), i.name = r.name, i.checkPull = e(r.pull, !0), i.checkPut = e(r.put), i.revertClone = r.revertClone, t.group = i;
}, Qi = function() {
  !Li && v && p(v, "display", "none");
}, Wi = function() {
  !Li && v && p(v, "display", "");
};
Ne && !Ri && document.addEventListener("click", function(o) {
  if (Ce)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Ce = !1, !1;
}, !0);
var Pt = function(t) {
  if (h) {
    t = t.touches ? t.touches[0] : t;
    var e = Lo(t.clientX, t.clientY);
    if (e) {
      var i = {};
      for (var r in t)
        t.hasOwnProperty(r) && (i[r] = t[r]);
      i.target = i.rootEl = e, i.preventDefault = void 0, i.stopPropagation = void 0, e[z]._onDragOver(i);
    }
  }
}, Xo = function(t) {
  h && h.parentNode[z]._isOutsideThisEl(t.target);
};
function f(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = nt({}, t), o[z] = this;
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
      return Xi(o, this.options);
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
    supportPointer: f.supportPointer !== !1 && "PointerEvent" in window && (!ee || ai),
    emptyInsertThreshold: 5
  };
  pe.initializePlugins(this, o, e);
  for (var i in e)
    !(i in t) && (t[i] = e[i]);
  Yi(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Ho, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? x(o, "pointerdown", this._onTapStart) : (x(o, "mousedown", this._onTapStart), x(o, "touchstart", this._onTapStart)), this.nativeDraggable && (x(o, "dragover", this), x(o, "dragenter", this)), De.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), nt(this, jo());
}
f.prototype = /** @lends Sortable.prototype */
{
  constructor: f,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Mt = null);
  },
  _getDirection: function(t, e) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, e, h) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var e = this, i = this.el, r = this.options, a = r.preventOnFilter, n = t.type, s = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, l = (s || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || l, u = r.filter;
      if (Jo(i), !h && !(/mousedown|pointerdown/.test(n) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && ee && l && l.tagName.toUpperCase() === "SELECT") && (l = Z(l, r.draggable, i, !1), !(l && l.animated) && we !== l)) {
        if (qt = Y(l), oe = Y(l, r.draggable), typeof u == "function") {
          if (u.call(this, t, l, this)) {
            j({
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
          if (d = Z(c, d.trim(), i, !1), d)
            return j({
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
        r.handle && !Z(c, r.handle, i, !1) || this._prepareDragStart(t, s, l);
      }
    }
  },
  _prepareDragStart: function(t, e, i) {
    var r = this, a = r.el, n = r.options, s = a.ownerDocument, l;
    if (i && !h && i.parentNode === a) {
      var c = A(i);
      if (k = a, h = i, C = h.parentNode, Ct = h.nextSibling, we = i, me = n.group, f.dragged = h, kt = {
        target: h,
        clientX: (e || t).clientX,
        clientY: (e || t).clientY
      }, Pi = kt.clientX - c.left, Ci = kt.clientY - c.top, this._lastX = (e || t).clientX, this._lastY = (e || t).clientY, h.style["will-change"] = "all", l = function() {
        if (F("delayEnded", r, {
          evt: t
        }), f.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !xi && r.nativeDraggable && (h.draggable = !0), r._triggerDragStart(t, e), j({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), U(h, n.chosenClass, !0);
      }, n.ignore.split(",").forEach(function(u) {
        Fi(h, u.trim(), Be);
      }), x(s, "dragover", Pt), x(s, "mousemove", Pt), x(s, "touchmove", Pt), n.supportPointer ? (x(s, "pointerup", r._onDrop), !this.nativeDraggable && x(s, "pointercancel", r._onDrop)) : (x(s, "mouseup", r._onDrop), x(s, "touchend", r._onDrop), x(s, "touchcancel", r._onDrop)), xi && this.nativeDraggable && (this.options.touchStartThreshold = 4, h.draggable = !0), F("delayStart", this, {
        evt: t
      }), n.delay && (!n.delayOnTouchOnly || e) && (!this.nativeDraggable || !(ue || dt))) {
        if (f.eventCanceled) {
          this._onDrop();
          return;
        }
        n.supportPointer ? (x(s, "pointerup", r._disableDelayedDrag), x(s, "pointercancel", r._disableDelayedDrag)) : (x(s, "mouseup", r._disableDelayedDrag), x(s, "touchend", r._disableDelayedDrag), x(s, "touchcancel", r._disableDelayedDrag)), x(s, "mousemove", r._delayedDragTouchMoveHandler), x(s, "touchmove", r._delayedDragTouchMoveHandler), n.supportPointer && x(s, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(l, n.delay);
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
    e = e || t.pointerType == "touch" && t, !this.nativeDraggable || e ? this.options.supportPointer ? x(document, "pointermove", this._onTouchMove) : e ? x(document, "touchmove", this._onTouchMove) : x(document, "mousemove", this._onTouchMove) : (x(h, "dragend", this), x(k, "dragstart", this._onDragStart));
    try {
      document.selection ? xe(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, e) {
    if (jt = !1, k && h) {
      F("dragStarted", this, {
        evt: e
      }), this.nativeDraggable && x(document, "dragover", Xo);
      var i = this.options;
      !t && U(h, i.dragClass, !1), U(h, i.ghostClass, !0), f.active = this, t && this._appendGhost(), j({
        sortable: this,
        name: "start",
        originalEvent: e
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (K) {
      this._lastX = K.clientX, this._lastY = K.clientY, Qi();
      for (var t = document.elementFromPoint(K.clientX, K.clientY), e = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(K.clientX, K.clientY), t !== e); )
        e = t;
      if (h.parentNode[z]._isOutsideThisEl(t), e)
        do {
          if (e[z]) {
            var i = void 0;
            if (i = e[z]._onDragOver({
              clientX: K.clientX,
              clientY: K.clientY,
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
    if (kt) {
      var e = this.options, i = e.fallbackTolerance, r = e.fallbackOffset, a = t.touches ? t.touches[0] : t, n = v && Ft(v, !0), s = v && n && n.a, l = v && n && n.d, c = ve && N && ki(N), u = (a.clientX - kt.clientX + r.x) / (s || 1) + (c ? c[0] - ze[0] : 0) / (s || 1), d = (a.clientY - kt.clientY + r.y) / (l || 1) + (c ? c[1] - ze[1] : 0) / (l || 1);
      if (!f.active && !jt) {
        if (i && Math.max(Math.abs(a.clientX - this._lastX), Math.abs(a.clientY - this._lastY)) < i)
          return;
        this._onDragStart(t, !0);
      }
      if (v) {
        n ? (n.e += u - (qe || 0), n.f += d - (Fe || 0)) : n = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: u,
          f: d
        };
        var y = "matrix(".concat(n.a, ",").concat(n.b, ",").concat(n.c, ",").concat(n.d, ",").concat(n.e, ",").concat(n.f, ")");
        p(v, "webkitTransform", y), p(v, "mozTransform", y), p(v, "msTransform", y), p(v, "transform", y), qe = u, Fe = d, K = a;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!v) {
      var t = this.options.fallbackOnBody ? document.body : k, e = A(h, !0, ve, !0, t), i = this.options;
      if (ve) {
        for (N = t; p(N, "position") === "static" && p(N, "transform") === "none" && N !== document; )
          N = N.parentNode;
        N !== document.body && N !== document.documentElement ? (N === document && (N = tt()), e.top += N.scrollTop, e.left += N.scrollLeft) : N = tt(), ze = ki(N);
      }
      v = h.cloneNode(!0), U(v, i.ghostClass, !1), U(v, i.fallbackClass, !0), U(v, i.dragClass, !0), p(v, "transition", ""), p(v, "transform", ""), p(v, "box-sizing", "border-box"), p(v, "margin", 0), p(v, "top", e.top), p(v, "left", e.left), p(v, "width", e.width), p(v, "height", e.height), p(v, "opacity", "0.8"), p(v, "position", ve ? "absolute" : "fixed"), p(v, "zIndex", "100000"), p(v, "pointerEvents", "none"), f.ghost = v, t.appendChild(v), p(v, "transform-origin", Pi / parseInt(v.style.width) * 100 + "% " + Ci / parseInt(v.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, e) {
    var i = this, r = t.dataTransfer, a = i.options;
    if (F("dragStart", this, {
      evt: t
    }), f.eventCanceled) {
      this._onDrop();
      return;
    }
    F("setupClone", this), f.eventCanceled || (P = Hi(h), P.removeAttribute("id"), P.draggable = !1, P.style["will-change"] = "", this._hideClone(), U(P, this.options.chosenClass, !1), f.clone = P), i.cloneId = xe(function() {
      F("clone", i), !f.eventCanceled && (i.options.removeCloneOnHide || k.insertBefore(P, h), i._hideClone(), j({
        sortable: i,
        name: "clone"
      }));
    }), !e && U(h, a.dragClass, !0), e ? (Ce = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : ($(document, "mouseup", i._onDrop), $(document, "touchend", i._onDrop), $(document, "touchcancel", i._onDrop), r && (r.effectAllowed = "move", a.setData && a.setData.call(i, r, h)), x(document, "drop", i), p(h, "transform", "translateZ(0)")), jt = !0, i._dragStartId = xe(i._dragStarted.bind(i, e, t)), x(document, "selectstart", i), Kt = !0, window.getSelection().removeAllRanges(), ee && p(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var e = this.el, i = t.target, r, a, n, s = this.options, l = s.group, c = f.active, u = me === l, d = s.sort, y = I || c, w, _ = this, E = !1;
    if (Qe) return;
    function G(Wt, Vi) {
      F(Wt, _, et({
        evt: t,
        isOwner: u,
        axis: w ? "vertical" : "horizontal",
        revert: n,
        dragRect: r,
        targetRect: a,
        canSort: d,
        fromSortable: y,
        target: i,
        completed: R,
        onMove: function(di, Ki) {
          return _e(k, e, h, r, di, A(di), t, Ki);
        },
        changed: V
      }, Vi));
    }
    function ot() {
      G("dragOverAnimationCapture"), _.captureAnimationState(), _ !== y && y.captureAnimationState();
    }
    function R(Wt) {
      return G("dragOverCompleted", {
        insertion: Wt
      }), Wt && (u ? c._hideClone() : c._showClone(_), _ !== y && (U(h, I ? I.options.ghostClass : c.options.ghostClass, !1), U(h, s.ghostClass, !0)), I !== _ && _ !== f.active ? I = _ : _ === f.active && I && (I = null), y === _ && (_._ignoreWhileAnimating = i), _.animateAll(function() {
        G("dragOverAnimationComplete"), _._ignoreWhileAnimating = null;
      }), _ !== y && (y.animateAll(), y._ignoreWhileAnimating = null)), (i === h && !h.animated || i === e && !i.animated) && (Mt = null), !s.dragoverBubble && !t.rootEl && i !== document && (h.parentNode[z]._isOutsideThisEl(t.target), !Wt && Pt(t)), !s.dragoverBubble && t.stopPropagation && t.stopPropagation(), E = !0;
    }
    function V() {
      L = Y(h), pt = Y(h, s.draggable), j({
        sortable: _,
        name: "change",
        toEl: e,
        newIndex: L,
        newDraggableIndex: pt,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), i = Z(i, s.draggable, e, !0), G("dragOver"), f.eventCanceled) return E;
    if (h.contains(t.target) || i.animated && i.animatingX && i.animatingY || _._ignoreWhileAnimating === i)
      return R(!1);
    if (Ce = !1, c && !s.disabled && (u ? d || (n = C !== k) : I === this || (this.lastPutMode = me.checkPull(this, c, h, t)) && l.checkPut(this, c, h, t))) {
      if (w = this._getDirection(t, i) === "vertical", r = A(h), G("dragOverValid"), f.eventCanceled) return E;
      if (n)
        return C = k, ot(), this._hideClone(), G("revert"), f.eventCanceled || (Ct ? k.insertBefore(h, Ct) : k.appendChild(h)), R(!0);
      var B = ni(e, s.draggable);
      if (!B || Go(t, w, this) && !B.animated) {
        if (B === h)
          return R(!1);
        if (B && e === t.target && (i = B), i && (a = A(i)), _e(k, e, h, r, i, a, t, !!i) !== !1)
          return ot(), B && B.nextSibling ? e.insertBefore(h, B.nextSibling) : e.appendChild(h), C = e, V(), R(!0);
      } else if (B && Wo(t, w, this)) {
        var wt = Ht(e, 0, s, !0);
        if (wt === h)
          return R(!1);
        if (i = wt, a = A(i), _e(k, e, h, r, i, a, t, !1) !== !1)
          return ot(), e.insertBefore(h, wt), C = e, V(), R(!0);
      } else if (i.parentNode === e) {
        a = A(i);
        var J = 0, $t, Lt = h.parentNode !== e, H = !Uo(h.animated && h.toRect || r, i.animated && i.toRect || a, w), Xt = w ? "top" : "left", ht = Si(i, "top", "top") || Si(h, "top", "top"), Yt = ht ? ht.scrollTop : void 0;
        Mt !== i && ($t = a[Xt], ae = !1, ye = !H && s.invertSwap || Lt), J = Vo(t, i, a, w, H ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, ye, Mt === i);
        var rt;
        if (J !== 0) {
          var xt = Y(h);
          do
            xt -= J, rt = C.children[xt];
          while (rt && (p(rt, "display") === "none" || rt === v));
        }
        if (J === 0 || rt === i)
          return R(!1);
        Mt = i, re = J;
        var Qt = i.nextElementSibling, ut = !1;
        ut = J === 1;
        var ge = _e(k, e, h, r, i, a, t, ut);
        if (ge !== !1)
          return (ge === 1 || ge === -1) && (ut = ge === 1), Qe = !0, setTimeout(Qo, 30), ot(), ut && !Qt ? e.appendChild(h) : i.parentNode.insertBefore(h, ut ? Qt : i), ht && Bi(ht, 0, Yt - ht.scrollTop), C = h.parentNode, $t !== void 0 && !ye && ($e = Math.abs($t - A(i)[Xt])), V(), R(!0);
      }
      if (e.contains(h))
        return R(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    $(document, "mousemove", this._onTouchMove), $(document, "touchmove", this._onTouchMove), $(document, "pointermove", this._onTouchMove), $(document, "dragover", Pt), $(document, "mousemove", Pt), $(document, "touchmove", Pt);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._onDrop), $(t, "touchend", this._onDrop), $(t, "pointerup", this._onDrop), $(t, "pointercancel", this._onDrop), $(t, "touchcancel", this._onDrop), $(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var e = this.el, i = this.options;
    if (L = Y(h), pt = Y(h, i.draggable), F("drop", this, {
      evt: t
    }), C = h && h.parentNode, L = Y(h), pt = Y(h, i.draggable), f.eventCanceled) {
      this._nulling();
      return;
    }
    jt = !1, ye = !1, ae = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), We(this.cloneId), We(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(e, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ee && p(document.body, "user-select", ""), p(h, "transform", ""), t && (Kt && (t.cancelable && t.preventDefault(), !i.dropBubble && t.stopPropagation()), v && v.parentNode && v.parentNode.removeChild(v), (k === C || I && I.lastPutMode !== "clone") && P && P.parentNode && P.parentNode.removeChild(P), h && (this.nativeDraggable && $(h, "dragend", this), Be(h), h.style["will-change"] = "", Kt && !jt && U(h, I ? I.options.ghostClass : this.options.ghostClass, !1), U(h, this.options.chosenClass, !1), j({
      sortable: this,
      name: "unchoose",
      toEl: C,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), k !== C ? (L >= 0 && (j({
      rootEl: C,
      name: "add",
      toEl: C,
      fromEl: k,
      originalEvent: t
    }), j({
      sortable: this,
      name: "remove",
      toEl: C,
      originalEvent: t
    }), j({
      rootEl: C,
      name: "sort",
      toEl: C,
      fromEl: k,
      originalEvent: t
    }), j({
      sortable: this,
      name: "sort",
      toEl: C,
      originalEvent: t
    })), I && I.save()) : L !== qt && L >= 0 && (j({
      sortable: this,
      name: "update",
      toEl: C,
      originalEvent: t
    }), j({
      sortable: this,
      name: "sort",
      toEl: C,
      originalEvent: t
    })), f.active && ((L == null || L === -1) && (L = qt, pt = oe), j({
      sortable: this,
      name: "end",
      toEl: C,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    F("nulling", this), k = h = C = v = Ct = P = we = gt = kt = K = Kt = L = pt = qt = oe = Mt = re = I = me = f.dragged = f.ghost = f.clone = f.active = null;
    var t = this.el;
    Ae.forEach(function(e) {
      t.contains(e) && (e.checked = !0);
    }), Ae.length = qe = Fe = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        h && (this._onDragOver(t), Yo(t));
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
    for (var t = [], e, i = this.el.children, r = 0, a = i.length, n = this.options; r < a; r++)
      e = i[r], Z(e, n.draggable, this.el, !1) && t.push(e.getAttribute(n.dataIdAttr) || Zo(e));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, e) {
    var i = {}, r = this.el;
    this.toArray().forEach(function(a, n) {
      var s = r.children[n];
      Z(s, this.options.draggable, r, !1) && (i[a] = s);
    }, this), e && this.captureAnimationState(), t.forEach(function(a) {
      i[a] && (r.removeChild(i[a]), r.appendChild(i[a]));
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
    return Z(t, e || this.options.draggable, this.el, !1);
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
    var r = pe.modifyOption(this, t, e);
    typeof r < "u" ? i[t] = r : i[t] = e, t === "group" && Yi(i);
  },
  /**
   * Destroy
   */
  destroy: function() {
    F("destroy", this);
    var t = this.el;
    t[z] = null, $(t, "mousedown", this._onTapStart), $(t, "touchstart", this._onTapStart), $(t, "pointerdown", this._onTapStart), this.nativeDraggable && ($(t, "dragover", this), $(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(e) {
      e.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), De.splice(De.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!gt) {
      if (F("hideClone", this), f.eventCanceled) return;
      p(P, "display", "none"), this.options.removeCloneOnHide && P.parentNode && P.parentNode.removeChild(P), gt = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (gt) {
      if (F("showClone", this), f.eventCanceled) return;
      h.parentNode == k && !this.options.group.revertClone ? k.insertBefore(P, h) : Ct ? k.insertBefore(P, Ct) : k.appendChild(P), this.options.group.revertClone && this.animate(h, P), p(P, "display", ""), gt = !1;
    }
  }
};
function Yo(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function _e(o, t, e, i, r, a, n, s) {
  var l, c = o[z], u = c.options.onMove, d;
  return window.CustomEvent && !dt && !ue ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = t, l.from = o, l.dragged = e, l.draggedRect = i, l.related = r || t, l.relatedRect = a || A(t), l.willInsertAfter = s, l.originalEvent = n, o.dispatchEvent(l), u && (d = u.call(c, l, n)), d;
}
function Be(o) {
  o.draggable = !1;
}
function Qo() {
  Qe = !1;
}
function Wo(o, t, e) {
  var i = A(Ht(e.el, 0, e.options, !0)), r = Ui(e.el, e.options, v), a = 10;
  return t ? o.clientX < r.left - a || o.clientY < i.top && o.clientX < i.right : o.clientY < r.top - a || o.clientY < i.bottom && o.clientX < i.left;
}
function Go(o, t, e) {
  var i = A(ni(e.el, e.options.draggable)), r = Ui(e.el, e.options, v), a = 10;
  return t ? o.clientX > r.right + a || o.clientY > i.bottom && o.clientX > i.left : o.clientY > r.bottom + a || o.clientX > i.right && o.clientY > i.top;
}
function Vo(o, t, e, i, r, a, n, s) {
  var l = i ? o.clientY : o.clientX, c = i ? e.height : e.width, u = i ? e.top : e.left, d = i ? e.bottom : e.right, y = !1;
  if (!n) {
    if (s && $e < c * r) {
      if (!ae && (re === 1 ? l > u + c * a / 2 : l < d - c * a / 2) && (ae = !0), ae)
        y = !0;
      else if (re === 1 ? l < u + $e : l > d - $e)
        return -re;
    } else if (l > u + c * (1 - r) / 2 && l < d - c * (1 - r) / 2)
      return Ko(t);
  }
  return y = y || n, y && (l < u + c * a / 2 || l > d - c * a / 2) ? l > u + c / 2 ? 1 : -1 : 0;
}
function Ko(o) {
  return Y(h) < Y(o) ? 1 : -1;
}
function Zo(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, e = t.length, i = 0; e--; )
    i += t.charCodeAt(e);
  return i.toString(36);
}
function Jo(o) {
  Ae.length = 0;
  for (var t = o.getElementsByTagName("input"), e = t.length; e--; ) {
    var i = t[e];
    i.checked && Ae.push(i);
  }
}
function xe(o) {
  return setTimeout(o, 0);
}
function We(o) {
  return clearTimeout(o);
}
Ne && x(document, "touchmove", function(o) {
  (f.active || jt) && o.cancelable && o.preventDefault();
});
f.utils = {
  on: x,
  off: $,
  css: p,
  find: Fi,
  is: function(t, e) {
    return !!Z(t, e, t, !1);
  },
  extend: Mo,
  throttle: zi,
  closest: Z,
  toggleClass: U,
  clone: Hi,
  index: Y,
  nextTick: xe,
  cancelNextTick: We,
  detectDirection: Xi,
  getChild: Ht,
  expando: z
};
f.get = function(o) {
  return o[z];
};
f.mount = function() {
  for (var o = arguments.length, t = new Array(o), e = 0; e < o; e++)
    t[e] = arguments[e];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(i) {
    if (!i.prototype || !i.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));
    i.utils && (f.utils = et(et({}, f.utils), i.utils)), pe.mount(i);
  });
};
f.create = function(o, t) {
  return new f(o, t);
};
f.version = Io;
var D = [], Zt, Ge, Ve = !1, He, Ue, Te, Jt;
function tr() {
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
      this.sortable.nativeDraggable ? x(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? x(document, "pointermove", this._handleFallbackAutoScroll) : i.touches ? x(document, "touchmove", this._handleFallbackAutoScroll) : x(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(e) {
      var i = e.originalEvent;
      !this.options.dragOverBubble && !i.rootEl && this._handleAutoScroll(i);
    },
    drop: function() {
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), Ai(), Ee(), Ro();
    },
    nulling: function() {
      Te = Ge = Zt = Ve = Jt = He = Ue = null, D.length = 0;
    },
    _handleFallbackAutoScroll: function(e) {
      this._handleAutoScroll(e, !0);
    },
    _handleAutoScroll: function(e, i) {
      var r = this, a = (e.touches ? e.touches[0] : e).clientX, n = (e.touches ? e.touches[0] : e).clientY, s = document.elementFromPoint(a, n);
      if (Te = e, i || this.options.forceAutoScrollFallback || ue || dt || ee) {
        Le(e, this.options, s, i);
        var l = mt(s, !0);
        Ve && (!Jt || a !== He || n !== Ue) && (Jt && Ai(), Jt = setInterval(function() {
          var c = mt(document.elementFromPoint(a, n), !0);
          c !== l && (l = c, Ee()), Le(e, r.options, c, i);
        }, 10), He = a, Ue = n);
      } else {
        if (!this.options.bubbleScroll || mt(s, !0) === tt()) {
          Ee();
          return;
        }
        Le(e, this.options, mt(s, !1), !1);
      }
    }
  }, nt(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Ee() {
  D.forEach(function(o) {
    clearInterval(o.pid);
  }), D = [];
}
function Ai() {
  clearInterval(Jt);
}
var Le = zi(function(o, t, e, i) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, a = (o.touches ? o.touches[0] : o).clientY, n = t.scrollSensitivity, s = t.scrollSpeed, l = tt(), c = !1, u;
    Ge !== e && (Ge = e, Ee(), Zt = t.scroll, u = t.scrollFn, Zt === !0 && (Zt = mt(e, !0)));
    var d = 0, y = Zt;
    do {
      var w = y, _ = A(w), E = _.top, G = _.bottom, ot = _.left, R = _.right, V = _.width, B = _.height, wt = void 0, J = void 0, $t = w.scrollWidth, Lt = w.scrollHeight, H = p(w), Xt = w.scrollLeft, ht = w.scrollTop;
      w === l ? (wt = V < $t && (H.overflowX === "auto" || H.overflowX === "scroll" || H.overflowX === "visible"), J = B < Lt && (H.overflowY === "auto" || H.overflowY === "scroll" || H.overflowY === "visible")) : (wt = V < $t && (H.overflowX === "auto" || H.overflowX === "scroll"), J = B < Lt && (H.overflowY === "auto" || H.overflowY === "scroll"));
      var Yt = wt && (Math.abs(R - r) <= n && Xt + V < $t) - (Math.abs(ot - r) <= n && !!Xt), rt = J && (Math.abs(G - a) <= n && ht + B < Lt) - (Math.abs(E - a) <= n && !!ht);
      if (!D[d])
        for (var xt = 0; xt <= d; xt++)
          D[xt] || (D[xt] = {});
      (D[d].vx != Yt || D[d].vy != rt || D[d].el !== w) && (D[d].el = w, D[d].vx = Yt, D[d].vy = rt, clearInterval(D[d].pid), (Yt != 0 || rt != 0) && (c = !0, D[d].pid = setInterval(function() {
        i && this.layer === 0 && f.active._onTouchMove(Te);
        var Qt = D[this.layer].vy ? D[this.layer].vy * s : 0, ut = D[this.layer].vx ? D[this.layer].vx * s : 0;
        typeof u == "function" && u.call(f.dragged.parentNode[z], ut, Qt, o, Te, D[this.layer].el) !== "continue" || Bi(D[this.layer].el, ut, Qt);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && y !== l && (y = mt(y, !1)));
    Ve = c;
  }
}, 30), Gi = function(t) {
  var e = t.originalEvent, i = t.putSortable, r = t.dragEl, a = t.activeSortable, n = t.dispatchSortableEvent, s = t.hideGhostForTarget, l = t.unhideGhostForTarget;
  if (e) {
    var c = i || a;
    s();
    var u = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e, d = document.elementFromPoint(u.clientX, u.clientY);
    l(), c && !c.el.contains(d) && (n("spill"), this.onSpill({
      dragEl: r,
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
    var r = Ht(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(e, r) : this.sortable.el.appendChild(e), this.sortable.animateAll(), i && i.animateAll();
  },
  drop: Gi
};
nt(si, {
  pluginName: "revertOnSpill"
});
function li() {
}
li.prototype = {
  onSpill: function(t) {
    var e = t.dragEl, i = t.putSortable, r = i || this.sortable;
    r.captureAnimationState(), e.parentNode && e.parentNode.removeChild(e), r.animateAll();
  },
  drop: Gi
};
nt(li, {
  pluginName: "removeOnSpill"
});
f.mount(new tr());
f.mount(li, si);
var er = Object.defineProperty, ir = Object.getOwnPropertyDescriptor, Ot = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ir(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && er(t, e, r), r;
};
function O(...o) {
  console.log("[PlaylistDetail]", ...o);
}
function or(...o) {
  console.error("[PlaylistDetail]", ...o);
}
let st = class extends Q {
  constructor() {
    super(...arguments), this.playlist = null, this.loading = !1, this.saving = !1, this._tracks = [], this._hasChanges = !1, this._sortable = null;
  }
  updated(o) {
    super.updated(o), O("updated() called, changed properties:", [...o.keys()]), o.has("playlist") && (O("playlist changed:", this.playlist), this.playlist ? (O("Setting _tracks to", this.playlist.tracks.length, "tracks"), this._tracks = [...this.playlist.tracks], this._hasChanges = !1, this._initSortable()) : O("playlist is null"));
  }
  _initSortable() {
    this._sortable && this._sortable.destroy(), this._trackList && (O("Initializing Sortable on track list"), this._sortable = new f(this._trackList, {
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
    O("Reorder track from", o, "to", t);
    const e = [...this._tracks], [i] = e.splice(o, 1);
    e.splice(t, 0, i), e.forEach((r, a) => {
      r.trackNo = a + 1;
    }), this._tracks = e, this._hasChanges = !0, this.dispatchEvent(new CustomEvent("track-reorder", {
      detail: { oldIndex: o, newIndex: t, tracks: this._tracks },
      bubbles: !0,
      composed: !0
    }));
  }
  _onRemoveTrack(o) {
    const { index: t } = o.detail;
    O("Remove track at index", t);
    const e = [...this._tracks];
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
    O("Play track:", t), this.dispatchEvent(new CustomEvent("play-track", {
      detail: { track: t },
      bubbles: !0,
      composed: !0
    }));
  }
  _onBack() {
    O("Back button clicked"), this.dispatchEvent(new CustomEvent("back", {
      bubbles: !0,
      composed: !0
    }));
  }
  _onDeletePlaylist() {
    O("Delete playlist clicked"), this.dispatchEvent(new CustomEvent("delete-playlist", {
      detail: { playlist: this.playlist },
      bubbles: !0,
      composed: !0
    }));
  }
  _onPlayAll() {
    O("Play all clicked"), this.dispatchEvent(new CustomEvent("play-playlist", {
      detail: { playlist: this.playlist },
      bubbles: !0,
      composed: !0
    }));
  }
  _onSaveChanges() {
    O("Save changes clicked"), this.dispatchEvent(new CustomEvent("save-changes", {
      detail: { playlist: this.playlist, tracks: this._tracks },
      bubbles: !0,
      composed: !0
    }));
  }
  _onAddTracks() {
    O("Add tracks clicked"), this.dispatchEvent(new CustomEvent("add-tracks", {
      detail: { playlist: this.playlist },
      bubbles: !0,
      composed: !0
    }));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), O("disconnectedCallback()"), this._sortable && (this._sortable.destroy(), this._sortable = null);
  }
  render() {
    if (O("render() called, loading:", this.loading, "playlist:", this.playlist ? "present" : "null"), this.loading)
      return O("Rendering loading state"), m`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
        </div>
      `;
    if (!this.playlist)
      return or("Rendering error state - playlist is null"), m`
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
    const o = this._tracks.length, t = this._tracks.reduce((e, i) => e + (i.duration || 0), 0);
    return O("Rendering playlist with", o, "tracks"), m`
      <div class="header">
        <button class="back-button" @click=${this._onBack} title="Back to playlists">
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </button>
        <div class="header-info">
          <div class="playlist-title">${this.playlist.name}</div>
          <div class="playlist-meta">
            ${o} track${o !== 1 ? "s" : ""} • ${Eo(t)}
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
st.styles = [_t, ct`
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

    .error {
      padding: 16px;
      text-align: center;
    }

    .error-actions {
      margin-top: 16px;
    }
  `];
Ot([
  S({ type: Object })
], st.prototype, "playlist", 2);
Ot([
  S({ type: Boolean })
], st.prototype, "loading", 2);
Ot([
  S({ type: Boolean })
], st.prototype, "saving", 2);
Ot([
  M()
], st.prototype, "_tracks", 2);
Ot([
  M()
], st.prototype, "_hasChanges", 2);
Ot([
  oi(".track-list")
], st.prototype, "_trackList", 2);
st = Ot([
  vt("mopidy-playlist-detail")
], st);
var rr = Object.defineProperty, ar = Object.getOwnPropertyDescriptor, fe = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ar(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && rr(t, e, r), r;
};
let Tt = class extends Q {
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
        
        <div class="track-duration">${Xe(this.track.duration)}</div>
        
        ${this.showRemove ? m`
          <button class="remove-button" @click=${this._onRemoveClick} title="Remove track">
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        ` : ""}
      </div>
    `;
  }
};
Tt.styles = [_t, ct`
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
  S({ type: Object })
], Tt.prototype, "track", 2);
fe([
  S({ type: Boolean })
], Tt.prototype, "draggable", 2);
fe([
  S({ type: Boolean })
], Tt.prototype, "showRemove", 2);
fe([
  S({ type: Number })
], Tt.prototype, "index", 2);
Tt = fe([
  vt("mopidy-track-item")
], Tt);
var nr = Object.defineProperty, sr = Object.getOwnPropertyDescriptor, Ut = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? sr(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && nr(t, e, r), r;
};
let yt = class extends Q {
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
                <div class="result-duration">${Xe(o.duration)}</div>
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
                  <div class="result-duration">${Xe(o.duration)}</div>
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
yt.styles = [_t, ct`
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
Ut([
  S({ type: Array })
], yt.prototype, "queue", 2);
Ut([
  S({ type: Boolean })
], yt.prototype, "searching", 2);
Ut([
  M()
], yt.prototype, "_searchQuery", 2);
Ut([
  M()
], yt.prototype, "_activeTab", 2);
Ut([
  M()
], yt.prototype, "_searchResults", 2);
yt = Ut([
  vt("mopidy-track-search")
], yt);
var lr = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, bt = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? cr(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && lr(t, e, r), r;
};
let it = class extends Q {
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
it.styles = [_t, ct`
    :host {
      display: contents;
    }
  `];
bt([
  S({ type: Boolean })
], it.prototype, "open", 2);
bt([
  S({ type: String })
], it.prototype, "title", 2);
bt([
  S({ type: String })
], it.prototype, "message", 2);
bt([
  S({ type: String })
], it.prototype, "confirmText", 2);
bt([
  S({ type: String })
], it.prototype, "cancelText", 2);
bt([
  S({ type: Boolean })
], it.prototype, "destructive", 2);
bt([
  M()
], it.prototype, "_resolve", 2);
it = bt([
  vt("mopidy-confirm-dialog")
], it);
var dr = Object.defineProperty, hr = Object.getOwnPropertyDescriptor, It = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? hr(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && dr(t, e, r), r;
};
let lt = class extends Q {
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
lt.styles = [_t, ct`
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
  S({ type: Boolean })
], lt.prototype, "open", 2);
It([
  S({ type: Array })
], lt.prototype, "queue", 2);
It([
  S({ type: String })
], lt.prototype, "defaultScheme", 2);
It([
  M()
], lt.prototype, "_name", 2);
It([
  M()
], lt.prototype, "_source", 2);
It([
  M()
], lt.prototype, "_resolve", 2);
lt = It([
  vt("mopidy-create-playlist-dialog")
], lt);
var ur = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, W = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? pr(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && ur(t, e, r), r;
};
function g(...o) {
  console.log("[MopidyPlaylistCard]", ...o);
}
function X(...o) {
  console.error("[MopidyPlaylistCard]", ...o);
}
let q = class extends Q {
  constructor() {
    super(), this._view = "list", this._loading = !1, this._saving = !1, this._playlists = [], this._selectedPlaylist = null, this._queue = [], this._toast = null, g("Card constructor called");
  }
  connectedCallback() {
    super.connectedCallback(), g("Card connected to DOM");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), g("Card disconnected from DOM");
  }
  updated(t) {
    super.updated(t), g("updated() called, changed properties:", [...t.keys()]), t.has("hass") && (g("hass changed, hass object:", this.hass ? "present" : "missing"), this.hass && g("hass.states:", Object.keys(this.hass.states || {}))), t.has("config") && g("config changed:", this.config), t.has("hass") && this.hass && this.config && (g("Both hass and config are available, initializing service..."), this._service = new So(this.hass, this.config.entity), this._view === "list" && this._playlists.length === 0 && (g("Loading playlists from updated()..."), this._loadPlaylists()), g("Loading queue from updated()..."), this._loadQueue());
  }
  async _loadPlaylists() {
    if (g("_loadPlaylists called, service:", this._service ? "available" : "missing"), !this._service) {
      g("Cannot load playlists - no service");
      return;
    }
    this._loading = !0, g("Setting loading=true, fetching playlists...");
    try {
      this._playlists = await this._service.getPlaylists(), g("Playlists loaded:", this._playlists.length, this._playlists);
    } catch (t) {
      X("Error loading playlists:", t), this._showToast("Failed to load playlists");
    } finally {
      this._loading = !1, g("Setting loading=false");
    }
  }
  async _loadQueue() {
    if (g("_loadQueue called, service:", this._service ? "available" : "missing"), !!this._service)
      try {
        this._queue = await this._service.getQueue(), g("Queue loaded:", this._queue.length, "items");
      } catch (t) {
        X("Error loading queue:", t);
      }
  }
  async _loadPlaylistDetail(t) {
    if (g("_loadPlaylistDetail called with playlist:", t), !!this._service) {
      this._loading = !0;
      try {
        this._selectedPlaylist = await this._service.getPlaylist(t.uri, t.mediaContentType), g("Playlist detail loaded:", this._selectedPlaylist), this._view = "detail", g("View changed to detail");
      } catch (e) {
        X("Error loading playlist:", e), this._showToast("Failed to load playlist");
      } finally {
        this._loading = !1;
      }
    }
  }
  _showToast(t) {
    g("Showing toast:", t), this._toast = t, this._toastTimeout && clearTimeout(this._toastTimeout), this._toastTimeout = window.setTimeout(() => {
      this._toast = null, g("Toast cleared");
    }, 3e3);
  }
  // Event handlers
  async _onCreatePlaylist() {
    if (g("_onCreatePlaylist called"), !this._createDialog) {
      g("Create dialog not available");
      return;
    }
    const t = await this._createDialog.show();
    if (g("Create dialog result:", t), !!t) {
      this._saving = !0;
      try {
        if (g("Creating playlist:", t.name), await this._service?.createPlaylist(t.name), t.source === "queue" && this._queue.length > 0) {
          g("Adding", this._queue.length, "queue tracks to new playlist"), await new Promise((i) => setTimeout(i, 500)), await this._loadPlaylists();
          const e = this._playlists.find((i) => i.name === t.name);
          if (e) {
            g("Found new playlist:", e.uri);
            const i = this._queue.map((r) => r.uri);
            await this._service?.addToPlaylist(e.uri, i), g("Added queue tracks to playlist");
          } else
            X("Could not find newly created playlist");
        }
        this._showToast(`Playlist "${t.name}" created`), await this._loadPlaylists();
      } catch (e) {
        X("Error creating playlist:", e), this._showToast("Failed to create playlist");
      } finally {
        this._saving = !1;
      }
    }
  }
  async _onDeletePlaylist(t) {
    const { playlist: e } = t.detail;
    if (g("_onDeletePlaylist called for:", e), !this._confirmDialog) {
      g("Confirm dialog not available");
      return;
    }
    this._confirmDialog.title = "Delete Playlist", this._confirmDialog.message = `Are you sure you want to delete "${e.name}"? This cannot be undone.`, this._confirmDialog.destructive = !0, this._confirmDialog.confirmText = "Delete";
    const i = await this._confirmDialog.show();
    if (g("Delete confirmation result:", i), !!i)
      try {
        await this._service?.deletePlaylist(e.uri), this._showToast(`Playlist "${e.name}" deleted`), this._view === "detail" && this._selectedPlaylist?.uri === e.uri && (this._view = "list", this._selectedPlaylist = null), await this._loadPlaylists();
      } catch (r) {
        X("Error deleting playlist:", r), this._showToast("Failed to delete playlist");
      }
  }
  _onSelectPlaylist(t) {
    const { playlist: e } = t.detail;
    g("_onSelectPlaylist:", e), this._loadPlaylistDetail(e);
  }
  _onBackToList() {
    g("_onBackToList called"), this._view = "list", this._selectedPlaylist = null;
  }
  async _onPlayPlaylist(t) {
    const { playlist: e } = t.detail;
    g("_onPlayPlaylist:", e);
    try {
      await this._service?.playPlaylist(e.uri), this._showToast(`Playing "${e.name}"`);
    } catch (i) {
      X("Error playing playlist:", i), this._showToast("Failed to play playlist");
    }
  }
  async _onPlayTrack(t) {
    const { track: e } = t.detail;
    g("_onPlayTrack:", e);
    try {
      await this._service?.playTrack(e.uri), this._showToast(`Playing "${e.name}"`);
    } catch (i) {
      X("Error playing track:", i), this._showToast("Failed to play track");
    }
  }
  async _onRemoveTrack(t) {
    const { index: e, tracks: i } = t.detail;
    if (g("_onRemoveTrack called, index:", e, "remaining tracks:", i.length), !!this._selectedPlaylist) {
      this._saving = !0;
      try {
        await this._service?.removeFromPlaylist(this._selectedPlaylist.uri, [e]), this._selectedPlaylist = {
          ...this._selectedPlaylist,
          tracks: i
        }, this._showToast("Track removed");
      } catch (r) {
        X("Error removing track:", r), this._showToast("Failed to remove track");
      } finally {
        this._saving = !1;
      }
    }
  }
  async _onSaveChanges(t) {
    const { playlist: e, tracks: i } = t.detail;
    if (g("_onSaveChanges called, playlist:", e, "tracks:", i.length), !!e) {
      this._saving = !0;
      try {
        if (await this._service?.clearPlaylist(e.uri), i.length > 0) {
          const r = i.map((a) => a.uri);
          await this._service?.addToPlaylist(e.uri, r);
        }
        this._selectedPlaylist = {
          ...e,
          tracks: i
        }, this._showToast("Playlist saved");
      } catch (r) {
        X("Error saving playlist:", r), this._showToast("Failed to save playlist");
      } finally {
        this._saving = !1;
      }
    }
  }
  _onAddTracks(t) {
    g("_onAddTracks called, switching to search view"), this._view = "search";
  }
  async _onAddTrack(t) {
    const { track: e } = t.detail;
    if (g("_onAddTrack called, track:", e), !!this._selectedPlaylist)
      try {
        await this._service?.addToPlaylist(this._selectedPlaylist.uri, [e.uri]), this._showToast(`Added "${e.name}"`), await this._loadPlaylistDetail(this._selectedPlaylist);
      } catch (i) {
        X("Error adding track:", i), this._showToast("Failed to add track");
      }
  }
  async _onSearch(t) {
    const { query: e } = t.detail;
    g("_onSearch called, query:", e);
  }
  _onCloseSearch() {
    g("_onCloseSearch called"), this._view = "detail";
  }
  setConfig(t) {
    if (g("setConfig called with:", t), !t.entity)
      throw X("Entity is required in config"), new Error("Entity is required");
    this.config = t, g("Config set successfully");
  }
  getCardSize() {
    return 5;
  }
  render() {
    if (g("render() called, view:", this._view, "config:", this.config ? "present" : "missing"), !this.config)
      return g("No config, showing error"), m`<ha-card><div class="error">Configuration error</div></ha-card>`;
    const t = this.config.title || "Playlist Manager";
    return g("Rendering with title:", t, "playlists:", this._playlists.length, "queue:", this._queue.length), m`
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
q.styles = [_t, ct`
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
W([
  S({ attribute: !1 })
], q.prototype, "hass", 2);
W([
  S({ type: Object })
], q.prototype, "config", 2);
W([
  M()
], q.prototype, "_view", 2);
W([
  M()
], q.prototype, "_loading", 2);
W([
  M()
], q.prototype, "_saving", 2);
W([
  M()
], q.prototype, "_playlists", 2);
W([
  M()
], q.prototype, "_selectedPlaylist", 2);
W([
  M()
], q.prototype, "_queue", 2);
W([
  M()
], q.prototype, "_toast", 2);
W([
  oi("mopidy-confirm-dialog")
], q.prototype, "_confirmDialog", 2);
W([
  oi("mopidy-create-playlist-dialog")
], q.prototype, "_createDialog", 2);
q = W([
  vt("mopidy-playlist-card")
], q);
var fr = Object.defineProperty, gr = Object.getOwnPropertyDescriptor, ci = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? gr(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && fr(t, e, r), r;
};
let de = class extends Q {
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
de.styles = [_t, ct`
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
  S({ attribute: !1 })
], de.prototype, "hass", 2);
ci([
  S({ type: Object })
], de.prototype, "config", 2);
de = ci([
  vt("mopidy-playlist-card-editor")
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
const br = q;
export {
  q as MopidyPlaylistCard,
  br as default
};
//# sourceMappingURL=mopidy-playlist-card.js.map
