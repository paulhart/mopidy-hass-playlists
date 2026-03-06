/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = globalThis, Ve = _e.ShadowRoot && (_e.ShadyCSS === void 0 || _e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ke = Symbol(), di = /* @__PURE__ */ new WeakMap();
let Di = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Ke) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ve && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = di.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && di.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ki = (o) => new Di(typeof o == "string" ? o : o + "", void 0, Ke), lt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, r, a) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + o[a + 1], o[0]);
  return new Di(e, o, Ke);
}, Zi = (o, t) => {
  if (Ve) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = _e.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, o.appendChild(i);
  }
}, hi = Ve ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ki(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ji, defineProperty: to, getOwnPropertyDescriptor: eo, getOwnPropertyNames: io, getOwnPropertySymbols: oo, getPrototypeOf: ro } = Object, Te = globalThis, ui = Te.trustedTypes, ao = ui ? ui.emptyScript : "", no = Te.reactiveElementPolyfillSupport, Jt = (o, t) => o, Ee = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? ao : null;
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
} }, Ze = (o, t) => !Ji(o, t), pi = { attribute: !0, type: String, converter: Ee, reflect: !1, useDefault: !1, hasChanged: Ze };
Symbol.metadata ??= Symbol("metadata"), Te.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Mt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = pi) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && to(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: a } = eo(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? pi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Jt("elementProperties"))) return;
    const t = ro(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Jt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Jt("properties"))) {
      const e = this.properties, i = [...io(e), ...oo(e)];
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
      for (const r of i) e.unshift(hi(r));
    } else t !== void 0 && e.push(hi(t));
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
    return Zi(t, this.constructor.elementStyles), t;
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
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : Ee).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Ee;
      this._$Em = r;
      const s = n.fromAttribute(e, a.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, a) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (a = this[t]), i ??= n.getPropertyOptions(t), !((i.hasChanged ?? Ze)(a, e) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
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
Mt.elementStyles = [], Mt.shadowRootOptions = { mode: "open" }, Mt[Jt("elementProperties")] = /* @__PURE__ */ new Map(), Mt[Jt("finalized")] = /* @__PURE__ */ new Map(), no?.({ ReactiveElement: Mt }), (Te.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = globalThis, fi = (o) => o, Se = Je.trustedTypes, mi = Se ? Se.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Ti = "$lit$", pt = `lit$${Math.random().toFixed(9).slice(2)}$`, Oi = "?" + pt, so = `<${Oi}>`, At = document, ae = () => At.createComment(""), ne = (o) => o === null || typeof o != "object" && typeof o != "function", ti = Array.isArray, lo = (o) => ti(o) || typeof o?.[Symbol.iterator] == "function", Ne = `[ 	
\f\r]`, Wt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gi = /-->/g, yi = />/g, xt = RegExp(`>|${Ne}(?:([^\\s"'>=/]+)(${Ne}*=${Ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vi = /'/g, _i = /"/g, Ii = /^(?:script|style|textarea|title)$/i, co = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), g = co(1), Ft = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), bi = /* @__PURE__ */ new WeakMap(), kt = At.createTreeWalker(At, 129);
function Ni(o, t) {
  if (!ti(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mi !== void 0 ? mi.createHTML(t) : t;
}
const ho = (o, t) => {
  const e = o.length - 1, i = [];
  let r, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Wt;
  for (let s = 0; s < e; s++) {
    const l = o[s];
    let c, u, d = -1, y = 0;
    for (; y < l.length && (n.lastIndex = y, u = n.exec(l), u !== null); ) y = n.lastIndex, n === Wt ? u[1] === "!--" ? n = gi : u[1] !== void 0 ? n = yi : u[2] !== void 0 ? (Ii.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = xt) : u[3] !== void 0 && (n = xt) : n === xt ? u[0] === ">" ? (n = r ?? Wt, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, c = u[1], n = u[3] === void 0 ? xt : u[3] === '"' ? _i : vi) : n === _i || n === vi ? n = xt : n === gi || n === yi ? n = Wt : (n = xt, r = void 0);
    const w = n === xt && o[s + 1].startsWith("/>") ? " " : "";
    a += n === Wt ? l + so : d >= 0 ? (i.push(c), l.slice(0, d) + Ti + l.slice(d) + pt + w) : l + pt + (d === -2 ? s : w);
  }
  return [Ni(o, a + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class se {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let a = 0, n = 0;
    const s = t.length - 1, l = this.parts, [c, u] = ho(t, e);
    if (this.el = se.createElement(c, i), kt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = kt.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Ti)) {
          const y = u[n++], w = r.getAttribute(d).split(pt), b = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: a, name: b[2], strings: w, ctor: b[1] === "." ? po : b[1] === "?" ? fo : b[1] === "@" ? mo : Oe }), r.removeAttribute(d);
        } else d.startsWith(pt) && (l.push({ type: 6, index: a }), r.removeAttribute(d));
        if (Ii.test(r.tagName)) {
          const d = r.textContent.split(pt), y = d.length - 1;
          if (y > 0) {
            r.textContent = Se ? Se.emptyScript : "";
            for (let w = 0; w < y; w++) r.append(d[w], ae()), kt.nextNode(), l.push({ type: 2, index: ++a });
            r.append(d[y], ae());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Oi) l.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(pt, d + 1)) !== -1; ) l.push({ type: 7, index: a }), d += pt.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = At.createElement("template");
    return i.innerHTML = t, i;
  }
}
function zt(o, t, e = o, i) {
  if (t === Ft) return t;
  let r = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const a = ne(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(o), r._$AT(o, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = r : e._$Cl = r), r !== void 0 && (t = zt(o, r._$AS(o, t.values), r, i)), t;
}
class uo {
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
    kt.currentNode = r;
    let a = kt.nextNode(), n = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new de(a, a.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (c = new go(a, this, t)), this._$AV.push(c), l = i[++s];
      }
      n !== l?.index && (a = kt.nextNode(), n++);
    }
    return kt.currentNode = At, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class de {
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
    t = zt(this, t, e), ne(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== Ft && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : lo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && ne(this._$AH) ? this._$AA.nextSibling.data = t : this.T(At.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = se.createElement(Ni(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const a = new uo(r, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = bi.get(t.strings);
    return e === void 0 && bi.set(t.strings, e = new se(t)), e;
  }
  k(t) {
    ti(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const a of t) r === e.length ? e.push(i = new de(this.O(ae()), this.O(ae()), this, this.options)) : i = e[r], i._$AI(a), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = fi(t).nextSibling;
      fi(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Oe {
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
    if (a === void 0) t = zt(this, t, e, 0), n = !ne(t) || t !== this._$AH && t !== Ft, n && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = a[0], l = 0; l < a.length - 1; l++) c = zt(this, s[i + l], e, l), c === Ft && (c = this._$AH[l]), n ||= !ne(c) || c !== this._$AH[l], c === T ? t = T : t !== T && (t += (c ?? "") + a[l + 1]), this._$AH[l] = c;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class po extends Oe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class fo extends Oe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class mo extends Oe {
  constructor(t, e, i, r, a) {
    super(t, e, i, r, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = zt(this, t, e, 0) ?? T) === Ft) return;
    const i = this._$AH, r = t === T && i !== T || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== T && (i === T || r);
    r && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class go {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    zt(this, t);
  }
}
const yo = Je.litHtmlPolyfillSupport;
yo?.(se, de), (Je.litHtmlVersions ??= []).push("3.3.2");
const vo = (o, t, e) => {
  const i = e?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const a = e?.renderBefore ?? null;
    i._$litPart$ = r = new de(t.insertBefore(ae(), a), a, void 0, e ?? {});
  }
  return r._$AI(o), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ei = globalThis;
class X extends Mt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = vo(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ft;
  }
}
X._$litElement$ = !0, X.finalized = !0, ei.litElementHydrateSupport?.({ LitElement: X });
const _o = ei.litElementPolyfillSupport;
_o?.({ LitElement: X });
(ei.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = (o) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(o, t);
  }) : customElements.define(o, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bo = { attribute: !0, type: String, converter: Ee, reflect: !1, hasChanged: Ze }, wo = (o = bo, t, e) => {
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
  return (t, e) => typeof e == "object" ? wo(o, t, e) : ((i, r, a) => {
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
const $o = (o, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(o, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ii(o, t) {
  return (e, i, r) => {
    const a = (n) => n.renderRoot?.querySelector(o) ?? null;
    return $o(e, i, { get() {
      return a(this);
    } });
  };
}
const vt = lt`
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
function Ue(o) {
  if (o == null) return "--:--";
  const t = Math.floor(o / 3600), e = Math.floor(o % 3600 / 60), i = Math.floor(o % 60);
  return t > 0 ? `${t}:${e.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}` : `${e}:${i.toString().padStart(2, "0")}`;
}
function xo(o) {
  if (o === 0) return "0 min";
  const t = Math.floor(o / 3600), e = Math.floor(o % 3600 / 60);
  return t > 0 ? `${t}h ${e}m` : `${e} min`;
}
function _(...o) {
  console.log("[MopidyPlaylistCard]", ...o);
}
function Gt(...o) {
  console.error("[MopidyPlaylistCard]", ...o);
}
class Eo {
  constructor(t, e) {
    this.hass = t, this.entityId = e, _("MopidyService constructed with entity:", e);
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
    _("Calling service:", this.serviceDomain, ".", t, "with data:", e);
    try {
      await this.hass.callService(this.serviceDomain, t, e), _("Service call successful:", t);
    } catch (i) {
      throw Gt("Service call failed:", t, i), i;
    }
  }
  /**
   * Browse media using Home Assistant's media browser
   */
  async browseMedia(t, e) {
    _("browseMedia called with:", { mediaContentId: t, mediaContentType: e });
    try {
      const i = await this.hass.callWS({
        type: "media_player/browse_media",
        entity_id: this.entityId,
        media_content_id: t,
        media_content_type: e
      });
      return _("browseMedia result:", i), i;
    } catch (i) {
      throw Gt("browseMedia failed:", i), i;
    }
  }
  /**
   * Get all playlists
   */
  async getPlaylists() {
    _("getPlaylists called");
    try {
      const t = await this.browseMedia();
      _("Root browse result:", t);
      const e = [];
      if (t.children) {
        _("Root has", t.children.length, "children:"), t.children.forEach((i, r) => {
          _(`  Child ${r}:`, {
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
          if (_("Checking child for playlists:", i.title, "isPlaylistsContainer:", r), r) {
            _("Found playlists container, browsing into it...");
            const a = await this.browseMedia(
              i.media_content_id,
              i.media_content_type
            );
            if (_("Playlists container result:", a), a.children) {
              _("Found", a.children.length, "items in playlists container");
              for (const n of a.children)
                _("Adding playlist:", n.title, "uri:", n.media_content_id), e.push({
                  uri: n.media_content_id || "",
                  name: n.title,
                  trackCount: 0
                  // Will be populated on detail view
                });
            }
          }
        }
      } else
        _("Root result has no children");
      return _("getPlaylists returning", e.length, "playlists"), e;
    } catch (t) {
      return Gt("Error fetching playlists:", t), [];
    }
  }
  /**
   * Get a specific playlist with track details
   */
  async getPlaylist(t) {
    _("getPlaylist called with uri:", t);
    try {
      const e = await this.browseMedia(t);
      _("Playlist browse result:", e);
      const i = [];
      let r = 1;
      if (e.children) {
        _("Playlist has", e.children.length, "tracks");
        for (const n of e.children) {
          const s = {
            uri: n.media_content_id || "",
            name: n.title,
            artists: this.extractArtists(n),
            album: this.extractAlbum(n),
            duration: this.extractDuration(n),
            trackNo: r++
          };
          _("Track", r - 1, ":", s), i.push(s);
        }
      } else
        _("Playlist has no children/tracks");
      const a = {
        uri: t,
        name: e.title,
        tracks: i,
        trackCount: i.length,
        duration: this.calculateTotalDuration(i)
      };
      return _("getPlaylist returning:", a), a;
    } catch (e) {
      return Gt("Error fetching playlist:", e), null;
    }
  }
  /**
   * Get the current queue
   */
  async getQueue() {
    _("getQueue called for entity:", this.entityId);
    try {
      const t = this.hass.states[this.entityId];
      if (_("Entity state:", t), !t)
        return _("Entity not found in hass.states"), [];
      _("Entity attributes:", t.attributes);
      const e = t.attributes.queue;
      if (_("Queue attribute:", e, "isArray:", Array.isArray(e)), !Array.isArray(e))
        return _("Queue is not an array, returning empty"), [];
      const i = e.map((r, a) => {
        const n = {
          uri: r.uri || "",
          name: r.title || r.name || "Unknown",
          artists: r.artist || (r.artist ? [r.artist] : []),
          album: r.album,
          duration: r.duration,
          position: a,
          trackId: r.track_id ?? a
        };
        return _("Queue item", a, ":", n), n;
      });
      return _("getQueue returning", i.length, "items"), i;
    } catch (t) {
      return Gt("Error fetching queue:", t), [];
    }
  }
  /**
   * Create a new empty playlist
   */
  async createPlaylist(t, e) {
    _("createPlaylist called:", { name: t, uriScheme: e }), await this.callService(`${this.entityName}_create_playlist`, {
      name: t,
      uri_scheme: e
    });
  }
  /**
   * Delete a playlist
   */
  async deletePlaylist(t) {
    _("deletePlaylist called:", { uri: t }), await this.callService(`${this.entityName}_delete_playlist`, {
      uri: t
    });
  }
  /**
   * Rename a playlist
   */
  async renamePlaylist(t, e) {
    _("renamePlaylist called:", { uri: t, name: e }), await this.callService(`${this.entityName}_rename_playlist`, {
      uri: t,
      name: e
    });
  }
  /**
   * Add tracks to a playlist
   */
  async addToPlaylist(t, e, i) {
    _("addToPlaylist called:", { playlistUri: t, trackUris: e, position: i }), await this.callService(`${this.entityName}_add_to_playlist`, {
      playlist_uri: t,
      track_uris: e,
      position: i
    });
  }
  /**
   * Remove tracks from a playlist
   */
  async removeFromPlaylist(t, e) {
    _("removeFromPlaylist called:", { playlistUri: t, positions: e }), await this.callService(`${this.entityName}_remove_from_playlist`, {
      playlist_uri: t,
      positions: e
    });
  }
  /**
   * Move tracks within a playlist
   */
  async moveInPlaylist(t, e, i, r) {
    _("moveInPlaylist called:", { playlistUri: t, start: e, end: i, newPosition: r }), await this.callService(`${this.entityName}_move_in_playlist`, {
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
    _("clearPlaylist called:", { uri: t }), await this.callService(`${this.entityName}_clear_playlist`, {
      uri: t
    });
  }
  /**
   * Save current queue as a new playlist
   */
  async saveQueueToPlaylist(t, e) {
    _("saveQueueToPlaylist called:", { name: t, uriScheme: e }), await this.callService(`${this.entityName}_save_queue_to_playlist`, {
      name: t,
      uri_scheme: e
    });
  }
  /**
   * Play a playlist
   */
  async playPlaylist(t) {
    _("playPlaylist called:", { uri: t }), await this.hass.callService("media_player", "play_media", {
      entity_id: this.entityId,
      media_content_id: t,
      media_content_type: "playlist"
    });
  }
  /**
   * Play a specific track
   */
  async playTrack(t) {
    _("playTrack called:", { uri: t }), await this.hass.callService("media_player", "play_media", {
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
var So = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, oi = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Co(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && So(t, e, r), r;
};
function Et(...o) {
  console.log("[PlaylistList]", ...o);
}
let le = class extends X {
  constructor() {
    super(...arguments), this.playlists = [], this.loading = !1;
  }
  _onPlaylistClick(o) {
    Et("Playlist clicked:", o), this.dispatchEvent(new CustomEvent("select-playlist", {
      detail: { playlist: o },
      bubbles: !0,
      composed: !0
    }));
  }
  _onDeleteClick(o, t) {
    o.stopPropagation(), Et("Delete clicked for playlist:", t), this.dispatchEvent(new CustomEvent("delete-playlist", {
      detail: { playlist: t },
      bubbles: !0,
      composed: !0
    }));
  }
  _onPlayClick(o, t) {
    o.stopPropagation(), Et("Play clicked for playlist:", t), this.dispatchEvent(new CustomEvent("play-playlist", {
      detail: { playlist: t },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return Et("render() called, loading:", this.loading, "playlists count:", this.playlists.length), this.loading ? (Et("Rendering loading state"), g`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
        </div>
      `) : this.playlists.length === 0 ? (Et("Rendering empty state - no playlists"), g`
        <div class="empty-state">
          <ha-icon icon="mdi:playlist-music"></ha-icon>
          <p>No playlists found</p>
          <p>Create a new playlist to get started</p>
        </div>
      `) : (Et("Rendering", this.playlists.length, "playlists"), g`
      <div class="list">
        ${this.playlists.map((o) => g`
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
le.styles = [vt, lt`
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
  S({ type: Array })
], le.prototype, "playlists", 2);
oi([
  S({ type: Boolean })
], le.prototype, "loading", 2);
le = oi([
  yt("mopidy-playlist-list")
], le);
/**!
 * Sortable 1.15.7
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Po(o, t, e) {
  return (t = To(t)) in o ? Object.defineProperty(o, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[t] = e, o;
}
function at() {
  return at = Object.assign ? Object.assign.bind() : function(o) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e) ({}).hasOwnProperty.call(e, i) && (o[i] = e[i]);
    }
    return o;
  }, at.apply(null, arguments);
}
function wi(o, t) {
  var e = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(o);
    t && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(o, r).enumerable;
    })), e.push.apply(e, i);
  }
  return e;
}
function tt(o) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wi(Object(e), !0).forEach(function(i) {
      Po(o, i, e[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e)) : wi(Object(e)).forEach(function(i) {
      Object.defineProperty(o, i, Object.getOwnPropertyDescriptor(e, i));
    });
  }
  return o;
}
function ko(o, t) {
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
function Do(o, t) {
  if (typeof o != "object" || !o) return o;
  var e = o[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(o, t);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(o);
}
function To(o) {
  var t = Do(o, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Xe(o) {
  "@babel/helpers - typeof";
  return Xe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xe(o);
}
var Oo = "1.15.7";
function rt(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var ct = rt(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), he = rt(/Edge/i), $i = rt(/firefox/i), te = rt(/safari/i) && !rt(/chrome/i) && !rt(/android/i), ri = rt(/iP(ad|od|hone)/i), Mi = rt(/chrome/i) && rt(/android/i), Ri = {
  capture: !1,
  passive: !1
};
function x(o, t, e) {
  o.addEventListener(t, e, !ct && Ri);
}
function $(o, t, e) {
  o.removeEventListener(t, e, !ct && Ri);
}
function Ce(o, t) {
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
function ji(o) {
  return o.host && o !== document && o.host.nodeType && o.host !== o ? o.host : o.parentNode;
}
function K(o, t, e, i) {
  if (o) {
    e = e || document;
    do {
      if (t != null && (t[0] === ">" ? o.parentNode === e && Ce(o, t) : Ce(o, t)) || i && o === e)
        return o;
      if (o === e) break;
    } while (o = ji(o));
  }
  return null;
}
var xi = /\s+/g;
function H(o, t, e) {
  if (o && t)
    if (o.classList)
      o.classList[e ? "add" : "remove"](t);
    else {
      var i = (" " + o.className + " ").replace(xi, " ").replace(" " + t + " ", " ");
      o.className = (i + (e ? " " + t : "")).replace(xi, " ");
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
function qt(o, t) {
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
function qi(o, t, e) {
  if (o) {
    var i = o.getElementsByTagName(t), r = 0, a = i.length;
    if (e)
      for (; r < a; r++)
        e(i[r], r);
    return i;
  }
  return [];
}
function J() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function D(o, t, e, i, r) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var a, n, s, l, c, u, d;
    if (o !== window && o.parentNode && o !== J() ? (a = o.getBoundingClientRect(), n = a.top, s = a.left, l = a.bottom, c = a.right, u = a.height, d = a.width) : (n = 0, s = 0, l = window.innerHeight, c = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || e) && o !== window && (r = r || o.parentNode, !ct))
      do
        if (r && r.getBoundingClientRect && (p(r, "transform") !== "none" || e && p(r, "position") !== "static")) {
          var y = r.getBoundingClientRect();
          n -= y.top + parseInt(p(r, "border-top-width")), s -= y.left + parseInt(p(r, "border-left-width")), l = n + a.height, c = s + a.width;
          break;
        }
      while (r = r.parentNode);
    if (i && o !== window) {
      var w = qt(r || o), b = w && w.a, E = w && w.d;
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
function Ei(o, t, e) {
  for (var i = mt(o, !0), r = D(o)[t]; i; ) {
    var a = D(i)[e], n = void 0;
    if (n = r >= a, !n) return i;
    if (i === J()) break;
    i = mt(i, !1);
  }
  return !1;
}
function Bt(o, t, e, i) {
  for (var r = 0, a = 0, n = o.children; a < n.length; ) {
    if (n[a].style.display !== "none" && n[a] !== f.ghost && (i || n[a] !== f.dragged) && K(n[a], e.draggable, o, !1)) {
      if (r === t)
        return n[a];
      r++;
    }
    a++;
  }
  return null;
}
function ai(o, t) {
  for (var e = o.lastElementChild; e && (e === f.ghost || p(e, "display") === "none" || t && !Ce(e, t)); )
    e = e.previousElementSibling;
  return e || null;
}
function U(o, t) {
  var e = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== f.clone && (!t || Ce(o, t)) && e++;
  return e;
}
function Si(o) {
  var t = 0, e = 0, i = J();
  if (o)
    do {
      var r = qt(o), a = r.a, n = r.d;
      t += o.scrollLeft * a, e += o.scrollTop * n;
    } while (o !== i && (o = o.parentNode));
  return [t, e];
}
function Io(o, t) {
  for (var e in o)
    if (o.hasOwnProperty(e)) {
      for (var i in t)
        if (t.hasOwnProperty(i) && t[i] === o[e][i]) return Number(e);
    }
  return -1;
}
function mt(o, t) {
  if (!o || !o.getBoundingClientRect) return J();
  var e = o, i = !1;
  do
    if (e.clientWidth < e.scrollWidth || e.clientHeight < e.scrollHeight) {
      var r = p(e);
      if (e.clientWidth < e.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || e.clientHeight < e.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!e.getBoundingClientRect || e === document.body) return J();
        if (i || t) return e;
        i = !0;
      }
    }
  while (e = e.parentNode);
  return J();
}
function No(o, t) {
  if (o && t)
    for (var e in t)
      t.hasOwnProperty(e) && (o[e] = t[e]);
  return o;
}
function Me(o, t) {
  return Math.round(o.top) === Math.round(t.top) && Math.round(o.left) === Math.round(t.left) && Math.round(o.height) === Math.round(t.height) && Math.round(o.width) === Math.round(t.width);
}
var ee;
function Fi(o, t) {
  return function() {
    if (!ee) {
      var e = arguments, i = this;
      e.length === 1 ? o.call(i, e[0]) : o.apply(i, e), ee = setTimeout(function() {
        ee = void 0;
      }, t);
    }
  };
}
function Mo() {
  clearTimeout(ee), ee = void 0;
}
function zi(o, t, e) {
  o.scrollLeft += t, o.scrollTop += e;
}
function Bi(o) {
  var t = window.Polymer, e = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(o).cloneNode(!0) : e ? e(o).clone(!0)[0] : o.cloneNode(!0);
}
function Hi(o, t, e) {
  var i = {};
  return Array.from(o.children).forEach(function(r) {
    var a, n, s, l;
    if (!(!K(r, t.draggable, o, !1) || r.animated || r === e)) {
      var c = D(r);
      i.left = Math.min((a = i.left) !== null && a !== void 0 ? a : 1 / 0, c.left), i.top = Math.min((n = i.top) !== null && n !== void 0 ? n : 1 / 0, c.top), i.right = Math.max((s = i.right) !== null && s !== void 0 ? s : -1 / 0, c.right), i.bottom = Math.max((l = i.bottom) !== null && l !== void 0 ? l : -1 / 0, c.bottom);
    }
  }), i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
var F = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ro() {
  var o = [], t;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var i = [].slice.call(this.el.children);
        i.forEach(function(r) {
          if (!(p(r, "display") === "none" || r === f.ghost)) {
            o.push({
              target: r,
              rect: D(r)
            });
            var a = tt({}, o[o.length - 1].rect);
            if (r.thisAnimationDuration) {
              var n = qt(r, !0);
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
      o.splice(Io(o, {
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
        var l = 0, c = s.target, u = c.fromRect, d = D(c), y = c.prevFromRect, w = c.prevToRect, b = s.rect, E = qt(c, !0);
        E && (d.top -= E.f, d.left -= E.e), c.toRect = d, c.thisAnimationDuration && Me(y, d) && !Me(u, d) && // Make sure animatingRect is on line between toRect & fromRect
        (b.top - d.top) / (b.left - d.left) === (u.top - d.top) / (u.left - d.left) && (l = qo(b, y, w, r.options)), Me(d, u) || (c.prevFromRect = u, c.prevToRect = d, l || (l = r.options.animation), r.animate(c, b, d, l)), l && (a = !0, n = Math.max(n, l), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, l), c.thisAnimationDuration = l);
      }), clearTimeout(t), a ? t = setTimeout(function() {
        typeof i == "function" && i();
      }, n) : typeof i == "function" && i(), o = [];
    },
    animate: function(i, r, a, n) {
      if (n) {
        p(i, "transition", ""), p(i, "transform", "");
        var s = qt(this.el), l = s && s.a, c = s && s.d, u = (r.left - a.left) / (l || 1), d = (r.top - a.top) / (c || 1);
        i.animatingX = !!u, i.animatingY = !!d, p(i, "transform", "translate3d(" + u + "px," + d + "px,0)"), this.forRepaintDummy = jo(i), p(i, "transition", "transform " + n + "ms" + (this.options.easing ? " " + this.options.easing : "")), p(i, "transform", "translate3d(0,0,0)"), typeof i.animated == "number" && clearTimeout(i.animated), i.animated = setTimeout(function() {
          p(i, "transition", ""), p(i, "transform", ""), i.animated = !1, i.animatingX = !1, i.animatingY = !1;
        }, n);
      }
    }
  };
}
function jo(o) {
  return o.offsetWidth;
}
function qo(o, t, e, i) {
  return Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) / Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) * i.animation;
}
var It = [], Re = {
  initializeByDefault: !0
}, ue = {
  mount: function(t) {
    for (var e in Re)
      Re.hasOwnProperty(e) && !(e in t) && (t[e] = Re[e]);
    It.forEach(function(i) {
      if (i.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), It.push(t);
  },
  pluginEvent: function(t, e, i) {
    var r = this;
    this.eventCanceled = !1, i.cancel = function() {
      r.eventCanceled = !0;
    };
    var a = t + "Global";
    It.forEach(function(n) {
      e[n.pluginName] && (e[n.pluginName][a] && e[n.pluginName][a](tt({
        sortable: e
      }, i)), e.options[n.pluginName] && e[n.pluginName][t] && e[n.pluginName][t](tt({
        sortable: e
      }, i)));
    });
  },
  initializePlugins: function(t, e, i, r) {
    It.forEach(function(s) {
      var l = s.pluginName;
      if (!(!t.options[l] && !s.initializeByDefault)) {
        var c = new s(t, e, t.options);
        c.sortable = t, c.options = t.options, t[l] = c, at(i, c.defaults);
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
    return It.forEach(function(r) {
      typeof r.eventProperties == "function" && at(i, r.eventProperties.call(e[r.pluginName], t));
    }), i;
  },
  modifyOption: function(t, e, i) {
    var r;
    return It.forEach(function(a) {
      t[a.pluginName] && a.optionListeners && typeof a.optionListeners[e] == "function" && (r = a.optionListeners[e].call(t[a.pluginName], i));
    }), r;
  }
};
function Fo(o) {
  var t = o.sortable, e = o.rootEl, i = o.name, r = o.targetEl, a = o.cloneEl, n = o.toEl, s = o.fromEl, l = o.oldIndex, c = o.newIndex, u = o.oldDraggableIndex, d = o.newDraggableIndex, y = o.originalEvent, w = o.putSortable, b = o.extraEventProperties;
  if (t = t || e && e[F], !!t) {
    var E, Q = t.options, it = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !ct && !he ? E = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : (E = document.createEvent("Event"), E.initEvent(i, !0, !0)), E.to = n || e, E.from = s || e, E.item = r || e, E.clone = a, E.oldIndex = l, E.newIndex = c, E.oldDraggableIndex = u, E.newDraggableIndex = d, E.originalEvent = y, E.pullMode = w ? w.lastPutMode : void 0;
    var R = tt(tt({}, b), ue.getEventProperties(i, t));
    for (var W in R)
      E[W] = R[W];
    e && e.dispatchEvent(E), Q[it] && Q[it].call(t, E);
  }
}
var zo = ["evt"], q = function(t, e) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = i.evt, a = ko(i, zo);
  ue.pluginEvent.bind(f)(t, e, tt({
    dragEl: h,
    parentEl: k,
    ghostEl: v,
    rootEl: C,
    nextEl: Pt,
    lastDownEl: be,
    cloneEl: P,
    cloneHidden: ft,
    dragStarted: Vt,
    putSortable: O,
    activeSortable: f.active,
    originalEvent: r,
    oldIndex: jt,
    oldDraggableIndex: ie,
    newIndex: L,
    newDraggableIndex: ut,
    hideGhostForTarget: Yi,
    unhideGhostForTarget: Qi,
    cloneNowHidden: function() {
      ft = !0;
    },
    cloneNowShown: function() {
      ft = !1;
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
  Fo(tt({
    putSortable: O,
    cloneEl: P,
    targetEl: h,
    rootEl: C,
    oldIndex: jt,
    oldDraggableIndex: ie,
    newIndex: L,
    newDraggableIndex: ut
  }, o));
}
var h, k, v, C, Pt, be, P, ft, jt, L, ie, ut, me, O, Rt = !1, Pe = !1, ke = [], St, G, je, qe, Ci, Pi, Vt, Nt, oe, re = !1, ge = !1, we, I, Fe = [], Ye = !1, Ae = [], Ie = typeof document < "u", ye = ri, ki = he || ct ? "cssFloat" : "float", Bo = Ie && !Mi && !ri && "draggable" in document.createElement("div"), Li = function() {
  if (Ie) {
    if (ct)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), Ui = function(t, e) {
  var i = p(t), r = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), a = Bt(t, 0, e), n = Bt(t, 1, e), s = a && p(a), l = n && p(n), c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + D(a).width, u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + D(n).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (a && s.float && s.float !== "none") {
    var d = s.float === "left" ? "left" : "right";
    return n && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
  }
  return a && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || c >= r && i[ki] === "none" || n && i[ki] === "none" && c + u > r) ? "vertical" : "horizontal";
}, Ho = function(t, e, i) {
  var r = i ? t.left : t.top, a = i ? t.right : t.bottom, n = i ? t.width : t.height, s = i ? e.left : e.top, l = i ? e.right : e.bottom, c = i ? e.width : e.height;
  return r === s || a === l || r + n / 2 === s + c / 2;
}, Lo = function(t, e) {
  var i;
  return ke.some(function(r) {
    var a = r[F].options.emptyInsertThreshold;
    if (!(!a || ai(r))) {
      var n = D(r), s = t >= n.left - a && t <= n.right + a, l = e >= n.top - a && e <= n.bottom + a;
      if (s && l)
        return i = r;
    }
  }), i;
}, Xi = function(t) {
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
  (!r || Xe(r) != "object") && (r = {
    name: r
  }), i.name = r.name, i.checkPull = e(r.pull, !0), i.checkPut = e(r.put), i.revertClone = r.revertClone, t.group = i;
}, Yi = function() {
  !Li && v && p(v, "display", "none");
}, Qi = function() {
  !Li && v && p(v, "display", "");
};
Ie && !Mi && document.addEventListener("click", function(o) {
  if (Pe)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), Pe = !1, !1;
}, !0);
var Ct = function(t) {
  if (h) {
    t = t.touches ? t.touches[0] : t;
    var e = Lo(t.clientX, t.clientY);
    if (e) {
      var i = {};
      for (var r in t)
        t.hasOwnProperty(r) && (i[r] = t[r]);
      i.target = i.rootEl = e, i.preventDefault = void 0, i.stopPropagation = void 0, e[F]._onDragOver(i);
    }
  }
}, Uo = function(t) {
  h && h.parentNode[F]._isOutsideThisEl(t.target);
};
function f(o, t) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = t = at({}, t), o[F] = this;
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
      return Ui(o, this.options);
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
    supportPointer: f.supportPointer !== !1 && "PointerEvent" in window && (!te || ri),
    emptyInsertThreshold: 5
  };
  ue.initializePlugins(this, o, e);
  for (var i in e)
    !(i in t) && (t[i] = e[i]);
  Xi(t);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Bo, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? x(o, "pointerdown", this._onTapStart) : (x(o, "mousedown", this._onTapStart), x(o, "touchstart", this._onTapStart)), this.nativeDraggable && (x(o, "dragover", this), x(o, "dragenter", this)), ke.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), at(this, Ro());
}
f.prototype = /** @lends Sortable.prototype */
{
  constructor: f,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Nt = null);
  },
  _getDirection: function(t, e) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, e, h) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var e = this, i = this.el, r = this.options, a = r.preventOnFilter, n = t.type, s = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, l = (s || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || l, u = r.filter;
      if (Zo(i), !h && !(/mousedown|pointerdown/.test(n) && t.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && te && l && l.tagName.toUpperCase() === "SELECT") && (l = K(l, r.draggable, i, !1), !(l && l.animated) && be !== l)) {
        if (jt = U(l), ie = U(l, r.draggable), typeof u == "function") {
          if (u.call(this, t, l, this)) {
            j({
              sortable: e,
              rootEl: c,
              name: "filter",
              targetEl: l,
              toEl: i,
              fromEl: i
            }), q("filter", e, {
              evt: t
            }), a && t.preventDefault();
            return;
          }
        } else if (u && (u = u.split(",").some(function(d) {
          if (d = K(c, d.trim(), i, !1), d)
            return j({
              sortable: e,
              rootEl: d,
              name: "filter",
              targetEl: l,
              fromEl: i,
              toEl: i
            }), q("filter", e, {
              evt: t
            }), !0;
        }), u)) {
          a && t.preventDefault();
          return;
        }
        r.handle && !K(c, r.handle, i, !1) || this._prepareDragStart(t, s, l);
      }
    }
  },
  _prepareDragStart: function(t, e, i) {
    var r = this, a = r.el, n = r.options, s = a.ownerDocument, l;
    if (i && !h && i.parentNode === a) {
      var c = D(i);
      if (C = a, h = i, k = h.parentNode, Pt = h.nextSibling, be = i, me = n.group, f.dragged = h, St = {
        target: h,
        clientX: (e || t).clientX,
        clientY: (e || t).clientY
      }, Ci = St.clientX - c.left, Pi = St.clientY - c.top, this._lastX = (e || t).clientX, this._lastY = (e || t).clientY, h.style["will-change"] = "all", l = function() {
        if (q("delayEnded", r, {
          evt: t
        }), f.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !$i && r.nativeDraggable && (h.draggable = !0), r._triggerDragStart(t, e), j({
          sortable: r,
          name: "choose",
          originalEvent: t
        }), H(h, n.chosenClass, !0);
      }, n.ignore.split(",").forEach(function(u) {
        qi(h, u.trim(), ze);
      }), x(s, "dragover", Ct), x(s, "mousemove", Ct), x(s, "touchmove", Ct), n.supportPointer ? (x(s, "pointerup", r._onDrop), !this.nativeDraggable && x(s, "pointercancel", r._onDrop)) : (x(s, "mouseup", r._onDrop), x(s, "touchend", r._onDrop), x(s, "touchcancel", r._onDrop)), $i && this.nativeDraggable && (this.options.touchStartThreshold = 4, h.draggable = !0), q("delayStart", this, {
        evt: t
      }), n.delay && (!n.delayOnTouchOnly || e) && (!this.nativeDraggable || !(he || ct))) {
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
    h && ze(h), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._disableDelayedDrag), $(t, "touchend", this._disableDelayedDrag), $(t, "touchcancel", this._disableDelayedDrag), $(t, "pointerup", this._disableDelayedDrag), $(t, "pointercancel", this._disableDelayedDrag), $(t, "mousemove", this._delayedDragTouchMoveHandler), $(t, "touchmove", this._delayedDragTouchMoveHandler), $(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, e) {
    e = e || t.pointerType == "touch" && t, !this.nativeDraggable || e ? this.options.supportPointer ? x(document, "pointermove", this._onTouchMove) : e ? x(document, "touchmove", this._onTouchMove) : x(document, "mousemove", this._onTouchMove) : (x(h, "dragend", this), x(C, "dragstart", this._onDragStart));
    try {
      document.selection ? $e(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, e) {
    if (Rt = !1, C && h) {
      q("dragStarted", this, {
        evt: e
      }), this.nativeDraggable && x(document, "dragover", Uo);
      var i = this.options;
      !t && H(h, i.dragClass, !1), H(h, i.ghostClass, !0), f.active = this, t && this._appendGhost(), j({
        sortable: this,
        name: "start",
        originalEvent: e
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (G) {
      this._lastX = G.clientX, this._lastY = G.clientY, Yi();
      for (var t = document.elementFromPoint(G.clientX, G.clientY), e = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(G.clientX, G.clientY), t !== e); )
        e = t;
      if (h.parentNode[F]._isOutsideThisEl(t), e)
        do {
          if (e[F]) {
            var i = void 0;
            if (i = e[F]._onDragOver({
              clientX: G.clientX,
              clientY: G.clientY,
              target: t,
              rootEl: e
            }), i && !this.options.dragoverBubble)
              break;
          }
          t = e;
        } while (e = ji(e));
      Qi();
    }
  },
  _onTouchMove: function(t) {
    if (St) {
      var e = this.options, i = e.fallbackTolerance, r = e.fallbackOffset, a = t.touches ? t.touches[0] : t, n = v && qt(v, !0), s = v && n && n.a, l = v && n && n.d, c = ye && I && Si(I), u = (a.clientX - St.clientX + r.x) / (s || 1) + (c ? c[0] - Fe[0] : 0) / (s || 1), d = (a.clientY - St.clientY + r.y) / (l || 1) + (c ? c[1] - Fe[1] : 0) / (l || 1);
      if (!f.active && !Rt) {
        if (i && Math.max(Math.abs(a.clientX - this._lastX), Math.abs(a.clientY - this._lastY)) < i)
          return;
        this._onDragStart(t, !0);
      }
      if (v) {
        n ? (n.e += u - (je || 0), n.f += d - (qe || 0)) : n = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: u,
          f: d
        };
        var y = "matrix(".concat(n.a, ",").concat(n.b, ",").concat(n.c, ",").concat(n.d, ",").concat(n.e, ",").concat(n.f, ")");
        p(v, "webkitTransform", y), p(v, "mozTransform", y), p(v, "msTransform", y), p(v, "transform", y), je = u, qe = d, G = a;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!v) {
      var t = this.options.fallbackOnBody ? document.body : C, e = D(h, !0, ye, !0, t), i = this.options;
      if (ye) {
        for (I = t; p(I, "position") === "static" && p(I, "transform") === "none" && I !== document; )
          I = I.parentNode;
        I !== document.body && I !== document.documentElement ? (I === document && (I = J()), e.top += I.scrollTop, e.left += I.scrollLeft) : I = J(), Fe = Si(I);
      }
      v = h.cloneNode(!0), H(v, i.ghostClass, !1), H(v, i.fallbackClass, !0), H(v, i.dragClass, !0), p(v, "transition", ""), p(v, "transform", ""), p(v, "box-sizing", "border-box"), p(v, "margin", 0), p(v, "top", e.top), p(v, "left", e.left), p(v, "width", e.width), p(v, "height", e.height), p(v, "opacity", "0.8"), p(v, "position", ye ? "absolute" : "fixed"), p(v, "zIndex", "100000"), p(v, "pointerEvents", "none"), f.ghost = v, t.appendChild(v), p(v, "transform-origin", Ci / parseInt(v.style.width) * 100 + "% " + Pi / parseInt(v.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, e) {
    var i = this, r = t.dataTransfer, a = i.options;
    if (q("dragStart", this, {
      evt: t
    }), f.eventCanceled) {
      this._onDrop();
      return;
    }
    q("setupClone", this), f.eventCanceled || (P = Bi(h), P.removeAttribute("id"), P.draggable = !1, P.style["will-change"] = "", this._hideClone(), H(P, this.options.chosenClass, !1), f.clone = P), i.cloneId = $e(function() {
      q("clone", i), !f.eventCanceled && (i.options.removeCloneOnHide || C.insertBefore(P, h), i._hideClone(), j({
        sortable: i,
        name: "clone"
      }));
    }), !e && H(h, a.dragClass, !0), e ? (Pe = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : ($(document, "mouseup", i._onDrop), $(document, "touchend", i._onDrop), $(document, "touchcancel", i._onDrop), r && (r.effectAllowed = "move", a.setData && a.setData.call(i, r, h)), x(document, "drop", i), p(h, "transform", "translateZ(0)")), Rt = !0, i._dragStartId = $e(i._dragStarted.bind(i, e, t)), x(document, "selectstart", i), Vt = !0, window.getSelection().removeAllRanges(), te && p(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var e = this.el, i = t.target, r, a, n, s = this.options, l = s.group, c = f.active, u = me === l, d = s.sort, y = O || c, w, b = this, E = !1;
    if (Ye) return;
    function Q(Qt, Gi) {
      q(Qt, b, tt({
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
        onMove: function(ci, Vi) {
          return ve(C, e, h, r, ci, D(ci), t, Vi);
        },
        changed: W
      }, Gi));
    }
    function it() {
      Q("dragOverAnimationCapture"), b.captureAnimationState(), b !== y && y.captureAnimationState();
    }
    function R(Qt) {
      return Q("dragOverCompleted", {
        insertion: Qt
      }), Qt && (u ? c._hideClone() : c._showClone(b), b !== y && (H(h, O ? O.options.ghostClass : c.options.ghostClass, !1), H(h, s.ghostClass, !0)), O !== b && b !== f.active ? O = b : b === f.active && O && (O = null), y === b && (b._ignoreWhileAnimating = i), b.animateAll(function() {
        Q("dragOverAnimationComplete"), b._ignoreWhileAnimating = null;
      }), b !== y && (y.animateAll(), y._ignoreWhileAnimating = null)), (i === h && !h.animated || i === e && !i.animated) && (Nt = null), !s.dragoverBubble && !t.rootEl && i !== document && (h.parentNode[F]._isOutsideThisEl(t.target), !Qt && Ct(t)), !s.dragoverBubble && t.stopPropagation && t.stopPropagation(), E = !0;
    }
    function W() {
      L = U(h), ut = U(h, s.draggable), j({
        sortable: b,
        name: "change",
        toEl: e,
        newIndex: L,
        newDraggableIndex: ut,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), i = K(i, s.draggable, e, !0), Q("dragOver"), f.eventCanceled) return E;
    if (h.contains(t.target) || i.animated && i.animatingX && i.animatingY || b._ignoreWhileAnimating === i)
      return R(!1);
    if (Pe = !1, c && !s.disabled && (u ? d || (n = k !== C) : O === this || (this.lastPutMode = me.checkPull(this, c, h, t)) && l.checkPut(this, c, h, t))) {
      if (w = this._getDirection(t, i) === "vertical", r = D(h), Q("dragOverValid"), f.eventCanceled) return E;
      if (n)
        return k = C, it(), this._hideClone(), Q("revert"), f.eventCanceled || (Pt ? C.insertBefore(h, Pt) : C.appendChild(h)), R(!0);
      var z = ai(e, s.draggable);
      if (!z || Wo(t, w, this) && !z.animated) {
        if (z === h)
          return R(!1);
        if (z && e === t.target && (i = z), i && (a = D(i)), ve(C, e, h, r, i, a, t, !!i) !== !1)
          return it(), z && z.nextSibling ? e.insertBefore(h, z.nextSibling) : e.appendChild(h), k = e, W(), R(!0);
      } else if (z && Qo(t, w, this)) {
        var bt = Bt(e, 0, s, !0);
        if (bt === h)
          return R(!1);
        if (i = bt, a = D(i), ve(C, e, h, r, i, a, t, !1) !== !1)
          return it(), e.insertBefore(h, bt), k = e, W(), R(!0);
      } else if (i.parentNode === e) {
        a = D(i);
        var Z = 0, wt, Lt = h.parentNode !== e, B = !Ho(h.animated && h.toRect || r, i.animated && i.toRect || a, w), Ut = w ? "top" : "left", dt = Ei(i, "top", "top") || Ei(h, "top", "top"), Xt = dt ? dt.scrollTop : void 0;
        Nt !== i && (wt = a[Ut], re = !1, ge = !B && s.invertSwap || Lt), Z = Go(t, i, a, w, B ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, ge, Nt === i);
        var ot;
        if (Z !== 0) {
          var $t = U(h);
          do
            $t -= Z, ot = k.children[$t];
          while (ot && (p(ot, "display") === "none" || ot === v));
        }
        if (Z === 0 || ot === i)
          return R(!1);
        Nt = i, oe = Z;
        var Yt = i.nextElementSibling, ht = !1;
        ht = Z === 1;
        var fe = ve(C, e, h, r, i, a, t, ht);
        if (fe !== !1)
          return (fe === 1 || fe === -1) && (ht = fe === 1), Ye = !0, setTimeout(Yo, 30), it(), ht && !Yt ? e.appendChild(h) : i.parentNode.insertBefore(h, ht ? Yt : i), dt && zi(dt, 0, Xt - dt.scrollTop), k = h.parentNode, wt !== void 0 && !ge && (we = Math.abs(wt - D(i)[Ut])), W(), R(!0);
      }
      if (e.contains(h))
        return R(!1);
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
    if (L = U(h), ut = U(h, i.draggable), q("drop", this, {
      evt: t
    }), k = h && h.parentNode, L = U(h), ut = U(h, i.draggable), f.eventCanceled) {
      this._nulling();
      return;
    }
    Rt = !1, ge = !1, re = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Qe(this.cloneId), Qe(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(e, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), te && p(document.body, "user-select", ""), p(h, "transform", ""), t && (Vt && (t.cancelable && t.preventDefault(), !i.dropBubble && t.stopPropagation()), v && v.parentNode && v.parentNode.removeChild(v), (C === k || O && O.lastPutMode !== "clone") && P && P.parentNode && P.parentNode.removeChild(P), h && (this.nativeDraggable && $(h, "dragend", this), ze(h), h.style["will-change"] = "", Vt && !Rt && H(h, O ? O.options.ghostClass : this.options.ghostClass, !1), H(h, this.options.chosenClass, !1), j({
      sortable: this,
      name: "unchoose",
      toEl: k,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), C !== k ? (L >= 0 && (j({
      rootEl: k,
      name: "add",
      toEl: k,
      fromEl: C,
      originalEvent: t
    }), j({
      sortable: this,
      name: "remove",
      toEl: k,
      originalEvent: t
    }), j({
      rootEl: k,
      name: "sort",
      toEl: k,
      fromEl: C,
      originalEvent: t
    }), j({
      sortable: this,
      name: "sort",
      toEl: k,
      originalEvent: t
    })), O && O.save()) : L !== jt && L >= 0 && (j({
      sortable: this,
      name: "update",
      toEl: k,
      originalEvent: t
    }), j({
      sortable: this,
      name: "sort",
      toEl: k,
      originalEvent: t
    })), f.active && ((L == null || L === -1) && (L = jt, ut = ie), j({
      sortable: this,
      name: "end",
      toEl: k,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    q("nulling", this), C = h = k = v = Pt = P = be = ft = St = G = Vt = L = ut = jt = ie = Nt = oe = O = me = f.dragged = f.ghost = f.clone = f.active = null;
    var t = this.el;
    Ae.forEach(function(e) {
      t.contains(e) && (e.checked = !0);
    }), Ae.length = je = qe = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        h && (this._onDragOver(t), Xo(t));
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
      e = i[r], K(e, n.draggable, this.el, !1) && t.push(e.getAttribute(n.dataIdAttr) || Ko(e));
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
      K(s, this.options.draggable, r, !1) && (i[a] = s);
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
    return K(t, e || this.options.draggable, this.el, !1);
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
    var r = ue.modifyOption(this, t, e);
    typeof r < "u" ? i[t] = r : i[t] = e, t === "group" && Xi(i);
  },
  /**
   * Destroy
   */
  destroy: function() {
    q("destroy", this);
    var t = this.el;
    t[F] = null, $(t, "mousedown", this._onTapStart), $(t, "touchstart", this._onTapStart), $(t, "pointerdown", this._onTapStart), this.nativeDraggable && ($(t, "dragover", this), $(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(e) {
      e.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), ke.splice(ke.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!ft) {
      if (q("hideClone", this), f.eventCanceled) return;
      p(P, "display", "none"), this.options.removeCloneOnHide && P.parentNode && P.parentNode.removeChild(P), ft = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (ft) {
      if (q("showClone", this), f.eventCanceled) return;
      h.parentNode == C && !this.options.group.revertClone ? C.insertBefore(P, h) : Pt ? C.insertBefore(P, Pt) : C.appendChild(P), this.options.group.revertClone && this.animate(h, P), p(P, "display", ""), ft = !1;
    }
  }
};
function Xo(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function ve(o, t, e, i, r, a, n, s) {
  var l, c = o[F], u = c.options.onMove, d;
  return window.CustomEvent && !ct && !he ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = t, l.from = o, l.dragged = e, l.draggedRect = i, l.related = r || t, l.relatedRect = a || D(t), l.willInsertAfter = s, l.originalEvent = n, o.dispatchEvent(l), u && (d = u.call(c, l, n)), d;
}
function ze(o) {
  o.draggable = !1;
}
function Yo() {
  Ye = !1;
}
function Qo(o, t, e) {
  var i = D(Bt(e.el, 0, e.options, !0)), r = Hi(e.el, e.options, v), a = 10;
  return t ? o.clientX < r.left - a || o.clientY < i.top && o.clientX < i.right : o.clientY < r.top - a || o.clientY < i.bottom && o.clientX < i.left;
}
function Wo(o, t, e) {
  var i = D(ai(e.el, e.options.draggable)), r = Hi(e.el, e.options, v), a = 10;
  return t ? o.clientX > r.right + a || o.clientY > i.bottom && o.clientX > i.left : o.clientY > r.bottom + a || o.clientX > i.right && o.clientY > i.top;
}
function Go(o, t, e, i, r, a, n, s) {
  var l = i ? o.clientY : o.clientX, c = i ? e.height : e.width, u = i ? e.top : e.left, d = i ? e.bottom : e.right, y = !1;
  if (!n) {
    if (s && we < c * r) {
      if (!re && (oe === 1 ? l > u + c * a / 2 : l < d - c * a / 2) && (re = !0), re)
        y = !0;
      else if (oe === 1 ? l < u + we : l > d - we)
        return -oe;
    } else if (l > u + c * (1 - r) / 2 && l < d - c * (1 - r) / 2)
      return Vo(t);
  }
  return y = y || n, y && (l < u + c * a / 2 || l > d - c * a / 2) ? l > u + c / 2 ? 1 : -1 : 0;
}
function Vo(o) {
  return U(h) < U(o) ? 1 : -1;
}
function Ko(o) {
  for (var t = o.tagName + o.className + o.src + o.href + o.textContent, e = t.length, i = 0; e--; )
    i += t.charCodeAt(e);
  return i.toString(36);
}
function Zo(o) {
  Ae.length = 0;
  for (var t = o.getElementsByTagName("input"), e = t.length; e--; ) {
    var i = t[e];
    i.checked && Ae.push(i);
  }
}
function $e(o) {
  return setTimeout(o, 0);
}
function Qe(o) {
  return clearTimeout(o);
}
Ie && x(document, "touchmove", function(o) {
  (f.active || Rt) && o.cancelable && o.preventDefault();
});
f.utils = {
  on: x,
  off: $,
  css: p,
  find: qi,
  is: function(t, e) {
    return !!K(t, e, t, !1);
  },
  extend: No,
  throttle: Fi,
  closest: K,
  toggleClass: H,
  clone: Bi,
  index: U,
  nextTick: $e,
  cancelNextTick: Qe,
  detectDirection: Ui,
  getChild: Bt,
  expando: F
};
f.get = function(o) {
  return o[F];
};
f.mount = function() {
  for (var o = arguments.length, t = new Array(o), e = 0; e < o; e++)
    t[e] = arguments[e];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(i) {
    if (!i.prototype || !i.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));
    i.utils && (f.utils = tt(tt({}, f.utils), i.utils)), ue.mount(i);
  });
};
f.create = function(o, t) {
  return new f(o, t);
};
f.version = Oo;
var A = [], Kt, We, Ge = !1, Be, He, De, Zt;
function Jo() {
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
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), Ai(), xe(), Mo();
    },
    nulling: function() {
      De = We = Kt = Ge = Zt = Be = He = null, A.length = 0;
    },
    _handleFallbackAutoScroll: function(e) {
      this._handleAutoScroll(e, !0);
    },
    _handleAutoScroll: function(e, i) {
      var r = this, a = (e.touches ? e.touches[0] : e).clientX, n = (e.touches ? e.touches[0] : e).clientY, s = document.elementFromPoint(a, n);
      if (De = e, i || this.options.forceAutoScrollFallback || he || ct || te) {
        Le(e, this.options, s, i);
        var l = mt(s, !0);
        Ge && (!Zt || a !== Be || n !== He) && (Zt && Ai(), Zt = setInterval(function() {
          var c = mt(document.elementFromPoint(a, n), !0);
          c !== l && (l = c, xe()), Le(e, r.options, c, i);
        }, 10), Be = a, He = n);
      } else {
        if (!this.options.bubbleScroll || mt(s, !0) === J()) {
          xe();
          return;
        }
        Le(e, this.options, mt(s, !1), !1);
      }
    }
  }, at(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function xe() {
  A.forEach(function(o) {
    clearInterval(o.pid);
  }), A = [];
}
function Ai() {
  clearInterval(Zt);
}
var Le = Fi(function(o, t, e, i) {
  if (t.scroll) {
    var r = (o.touches ? o.touches[0] : o).clientX, a = (o.touches ? o.touches[0] : o).clientY, n = t.scrollSensitivity, s = t.scrollSpeed, l = J(), c = !1, u;
    We !== e && (We = e, xe(), Kt = t.scroll, u = t.scrollFn, Kt === !0 && (Kt = mt(e, !0)));
    var d = 0, y = Kt;
    do {
      var w = y, b = D(w), E = b.top, Q = b.bottom, it = b.left, R = b.right, W = b.width, z = b.height, bt = void 0, Z = void 0, wt = w.scrollWidth, Lt = w.scrollHeight, B = p(w), Ut = w.scrollLeft, dt = w.scrollTop;
      w === l ? (bt = W < wt && (B.overflowX === "auto" || B.overflowX === "scroll" || B.overflowX === "visible"), Z = z < Lt && (B.overflowY === "auto" || B.overflowY === "scroll" || B.overflowY === "visible")) : (bt = W < wt && (B.overflowX === "auto" || B.overflowX === "scroll"), Z = z < Lt && (B.overflowY === "auto" || B.overflowY === "scroll"));
      var Xt = bt && (Math.abs(R - r) <= n && Ut + W < wt) - (Math.abs(it - r) <= n && !!Ut), ot = Z && (Math.abs(Q - a) <= n && dt + z < Lt) - (Math.abs(E - a) <= n && !!dt);
      if (!A[d])
        for (var $t = 0; $t <= d; $t++)
          A[$t] || (A[$t] = {});
      (A[d].vx != Xt || A[d].vy != ot || A[d].el !== w) && (A[d].el = w, A[d].vx = Xt, A[d].vy = ot, clearInterval(A[d].pid), (Xt != 0 || ot != 0) && (c = !0, A[d].pid = setInterval(function() {
        i && this.layer === 0 && f.active._onTouchMove(De);
        var Yt = A[this.layer].vy ? A[this.layer].vy * s : 0, ht = A[this.layer].vx ? A[this.layer].vx * s : 0;
        typeof u == "function" && u.call(f.dragged.parentNode[F], ht, Yt, o, De, A[this.layer].el) !== "continue" || zi(A[this.layer].el, ht, Yt);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && y !== l && (y = mt(y, !1)));
    Ge = c;
  }
}, 30), Wi = function(t) {
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
function ni() {
}
ni.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var e = t.oldDraggableIndex;
    this.startIndex = e;
  },
  onSpill: function(t) {
    var e = t.dragEl, i = t.putSortable;
    this.sortable.captureAnimationState(), i && i.captureAnimationState();
    var r = Bt(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(e, r) : this.sortable.el.appendChild(e), this.sortable.animateAll(), i && i.animateAll();
  },
  drop: Wi
};
at(ni, {
  pluginName: "revertOnSpill"
});
function si() {
}
si.prototype = {
  onSpill: function(t) {
    var e = t.dragEl, i = t.putSortable, r = i || this.sortable;
    r.captureAnimationState(), e.parentNode && e.parentNode.removeChild(e), r.animateAll();
  },
  drop: Wi
};
at(si, {
  pluginName: "removeOnSpill"
});
f.mount(new Jo());
f.mount(si, ni);
var tr = Object.defineProperty, er = Object.getOwnPropertyDescriptor, Tt = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? er(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && tr(t, e, r), r;
};
let nt = class extends X {
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
    e.splice(t, 0, i), e.forEach((r, a) => {
      r.trackNo = a + 1;
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
      return g`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
        </div>
      `;
    if (!this.playlist)
      return g`
        <div class="error">
          <p>Playlist not found</p>
        </div>
      `;
    const o = this._tracks.length, t = this._tracks.reduce((e, i) => e + (i.duration || 0), 0);
    return g`
      <div class="header">
        <button class="back-button" @click=${this._onBack} title="Back to playlists">
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </button>
        <div class="header-info">
          <div class="playlist-title">${this.playlist.name}</div>
          <div class="playlist-meta">
            ${o} track${o !== 1 ? "s" : ""} • ${xo(t)}
            ${this._hasChanges ? " • Unsaved changes" : ""}
          </div>
        </div>
        <button class="delete-button" @click=${this._onDeletePlaylist} title="Delete playlist">
          <ha-icon icon="mdi:delete"></ha-icon>
        </button>
      </div>

      ${o > 1 ? g`
        <div class="reorder-hint">
          <ha-icon icon="mdi:information-outline"></ha-icon>
          Drag tracks to reorder
        </div>
      ` : ""}

      <div class="track-list">
        ${this._tracks.map((e, i) => g`
          <mopidy-track-item
            .track=${e}
            .index=${i}
            .draggable=${o > 1}
            .showRemove=${!0}
            @remove-track=${this._onRemoveTrack}
            @play-track=${this._onPlayTrack}
          ></mopidy-track-item>
        `)}
        
        ${o === 0 ? g`
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
        ${o > 0 ? g`
          <mwc-button @click=${this._onPlayAll} ?disabled=${this.saving}>
            <ha-icon icon="mdi:play"></ha-icon>
            Play All
          </mwc-button>
        ` : ""}
        ${this._hasChanges ? g`
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
nt.styles = [vt, lt`
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
Tt([
  S({ type: Object })
], nt.prototype, "playlist", 2);
Tt([
  S({ type: Boolean })
], nt.prototype, "loading", 2);
Tt([
  S({ type: Boolean })
], nt.prototype, "saving", 2);
Tt([
  M()
], nt.prototype, "_tracks", 2);
Tt([
  M()
], nt.prototype, "_hasChanges", 2);
Tt([
  ii(".track-list")
], nt.prototype, "_trackList", 2);
nt = Tt([
  yt("mopidy-playlist-detail")
], nt);
var ir = Object.defineProperty, or = Object.getOwnPropertyDescriptor, pe = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? or(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && ir(t, e, r), r;
};
let Dt = class extends X {
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
    return g`
      <div class="track-item">
        ${this.draggable ? g`
          <div class="drag-handle" data-drag-handle>
            <ha-icon icon="mdi:drag"></ha-icon>
          </div>
        ` : g`
          <div class="track-number">${this.track.trackNo || this.index + 1}</div>
        `}
        
        <div class="track-info" @click=${this._onTrackClick}>
          <div class="track-title">${this.track.name}</div>
          ${o ? g`
            <div class="track-artist">${o}${this.track.album ? ` • ${this.track.album}` : ""}</div>
          ` : ""}
        </div>
        
        <div class="track-duration">${Ue(this.track.duration)}</div>
        
        ${this.showRemove ? g`
          <button class="remove-button" @click=${this._onRemoveClick} title="Remove track">
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        ` : ""}
      </div>
    `;
  }
};
Dt.styles = [vt, lt`
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
pe([
  S({ type: Object })
], Dt.prototype, "track", 2);
pe([
  S({ type: Boolean })
], Dt.prototype, "draggable", 2);
pe([
  S({ type: Boolean })
], Dt.prototype, "showRemove", 2);
pe([
  S({ type: Number })
], Dt.prototype, "index", 2);
Dt = pe([
  yt("mopidy-track-item")
], Dt);
var rr = Object.defineProperty, ar = Object.getOwnPropertyDescriptor, Ht = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ar(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && rr(t, e, r), r;
};
let gt = class extends X {
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
    return g`
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

      ${this._searchQuery.trim() ? g`
        <div class="search-results">
          ${this.searching ? g`
            <div class="searching">
              <ha-circular-progress active></ha-circular-progress>
              <p>Searching...</p>
            </div>
          ` : this._searchResults.length > 0 ? g`
            <div class="section-title">Search Results</div>
            ${this._searchResults.map((o) => g`
              <div class="result-item">
                <div class="result-info">
                  <div class="result-title">${o.name}</div>
                  ${o.artists?.length ? g`
                    <div class="result-artist">${o.artists.join(", ")}</div>
                  ` : ""}
                </div>
                <div class="result-duration">${Ue(o.duration)}</div>
                <button class="add-button" @click=${() => this._onAddTrack(o)} title="Add to playlist">
                  <ha-icon icon="mdi:plus-circle"></ha-icon>
                </button>
              </div>
            `)}
          ` : g`
            <div class="no-results">
              <ha-icon icon="mdi:music-note-off"></ha-icon>
              <p>No tracks found</p>
            </div>
          `}
        </div>
      ` : g`
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

        ${this._activeTab === "queue" ? g`
          <div class="queue-list">
            ${this.queue.length > 0 ? g`
              <div class="section-title">Add from Queue</div>
              ${this.queue.map((o) => g`
                <div class="result-item">
                  <div class="result-info">
                    <div class="result-title">${o.name}</div>
                    ${o.artists?.length ? g`
                      <div class="result-artist">${o.artists.join(", ")}</div>
                    ` : ""}
                  </div>
                  <div class="result-duration">${Ue(o.duration)}</div>
                  <button class="add-button" @click=${() => this._onAddQueueItem(o)} title="Add to playlist">
                    <ha-icon icon="mdi:plus-circle"></ha-icon>
                  </button>
                </div>
              `)}
            ` : g`
              <div class="no-results">
                <ha-icon icon="mdi:playlist-remove"></ha-icon>
                <p>Queue is empty</p>
              </div>
            `}
          </div>
        ` : g`
          <div class="no-results">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <p>Enter a search term to find tracks</p>
          </div>
        `}
      `}
    `;
  }
};
gt.styles = [vt, lt`
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
Ht([
  S({ type: Array })
], gt.prototype, "queue", 2);
Ht([
  S({ type: Boolean })
], gt.prototype, "searching", 2);
Ht([
  M()
], gt.prototype, "_searchQuery", 2);
Ht([
  M()
], gt.prototype, "_activeTab", 2);
Ht([
  M()
], gt.prototype, "_searchResults", 2);
gt = Ht([
  yt("mopidy-track-search")
], gt);
var nr = Object.defineProperty, sr = Object.getOwnPropertyDescriptor, _t = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? sr(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && nr(t, e, r), r;
};
let et = class extends X {
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
    return this.open ? g`
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
    ` : g``;
  }
};
et.styles = [vt, lt`
    :host {
      display: contents;
    }
  `];
_t([
  S({ type: Boolean })
], et.prototype, "open", 2);
_t([
  S({ type: String })
], et.prototype, "title", 2);
_t([
  S({ type: String })
], et.prototype, "message", 2);
_t([
  S({ type: String })
], et.prototype, "confirmText", 2);
_t([
  S({ type: String })
], et.prototype, "cancelText", 2);
_t([
  S({ type: Boolean })
], et.prototype, "destructive", 2);
_t([
  M()
], et.prototype, "_resolve", 2);
et = _t([
  yt("mopidy-confirm-dialog")
], et);
var lr = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, Ot = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? cr(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && lr(t, e, r), r;
};
let st = class extends X {
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
    if (!this.open) return g``;
    const o = this.queue.length, t = o > 0;
    return g`
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
              ${t && this._source === "queue" ? g`
                <div class="queue-info">
                  ${o} track${o !== 1 ? "s" : ""} will be added to the new playlist
                </div>
              ` : ""}
              ${t ? "" : g`
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
st.styles = [vt, lt`
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
Ot([
  S({ type: Boolean })
], st.prototype, "open", 2);
Ot([
  S({ type: Array })
], st.prototype, "queue", 2);
Ot([
  S({ type: String })
], st.prototype, "defaultScheme", 2);
Ot([
  M()
], st.prototype, "_name", 2);
Ot([
  M()
], st.prototype, "_source", 2);
Ot([
  M()
], st.prototype, "_resolve", 2);
st = Ot([
  yt("mopidy-create-playlist-dialog")
], st);
var dr = Object.defineProperty, hr = Object.getOwnPropertyDescriptor, Y = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? hr(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && dr(t, e, r), r;
};
function m(...o) {
  console.log("[MopidyPlaylistCard]", ...o);
}
function V(...o) {
  console.error("[MopidyPlaylistCard]", ...o);
}
let N = class extends X {
  constructor() {
    super(), this._view = "list", this._loading = !1, this._saving = !1, this._playlists = [], this._selectedPlaylist = null, this._queue = [], this._toast = null, m("Card constructor called");
  }
  connectedCallback() {
    super.connectedCallback(), m("Card connected to DOM");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), m("Card disconnected from DOM");
  }
  updated(t) {
    super.updated(t), m("updated() called, changed properties:", [...t.keys()]), t.has("hass") && (m("hass changed, hass object:", this.hass ? "present" : "missing"), this.hass && m("hass.states:", Object.keys(this.hass.states || {}))), t.has("config") && m("config changed:", this.config), t.has("hass") && this.hass && this.config && (m("Both hass and config are available, initializing service..."), this._service = new Eo(this.hass, this.config.entity), this._view === "list" && this._playlists.length === 0 && (m("Loading playlists from updated()..."), this._loadPlaylists()), m("Loading queue from updated()..."), this._loadQueue());
  }
  async _loadPlaylists() {
    if (m("_loadPlaylists called, service:", this._service ? "available" : "missing"), !this._service) {
      m("Cannot load playlists - no service");
      return;
    }
    this._loading = !0, m("Setting loading=true, fetching playlists...");
    try {
      this._playlists = await this._service.getPlaylists(), m("Playlists loaded:", this._playlists.length, this._playlists);
    } catch (t) {
      V("Error loading playlists:", t), this._showToast("Failed to load playlists");
    } finally {
      this._loading = !1, m("Setting loading=false");
    }
  }
  async _loadQueue() {
    if (m("_loadQueue called, service:", this._service ? "available" : "missing"), !!this._service)
      try {
        this._queue = await this._service.getQueue(), m("Queue loaded:", this._queue.length, "items");
      } catch (t) {
        V("Error loading queue:", t);
      }
  }
  async _loadPlaylistDetail(t) {
    if (m("_loadPlaylistDetail called with uri:", t), !!this._service) {
      this._loading = !0;
      try {
        this._selectedPlaylist = await this._service.getPlaylist(t), m("Playlist detail loaded:", this._selectedPlaylist), this._view = "detail", m("View changed to detail");
      } catch (e) {
        V("Error loading playlist:", e), this._showToast("Failed to load playlist");
      } finally {
        this._loading = !1;
      }
    }
  }
  _showToast(t) {
    m("Showing toast:", t), this._toast = t, this._toastTimeout && clearTimeout(this._toastTimeout), this._toastTimeout = window.setTimeout(() => {
      this._toast = null, m("Toast cleared");
    }, 3e3);
  }
  // Event handlers
  async _onCreatePlaylist() {
    if (m("_onCreatePlaylist called"), !this._createDialog) {
      m("Create dialog not available");
      return;
    }
    const t = await this._createDialog.show();
    if (m("Create dialog result:", t), !!t) {
      this._saving = !0;
      try {
        t.source === "queue" ? (m("Creating playlist from queue:", t.name), await this._service?.saveQueueToPlaylist(t.name)) : (m("Creating empty playlist:", t.name), await this._service?.createPlaylist(t.name)), this._showToast(`Playlist "${t.name}" created`), await this._loadPlaylists();
      } catch (e) {
        V("Error creating playlist:", e), this._showToast("Failed to create playlist");
      } finally {
        this._saving = !1;
      }
    }
  }
  async _onDeletePlaylist(t) {
    const { playlist: e } = t.detail;
    if (m("_onDeletePlaylist called for:", e), !this._confirmDialog) {
      m("Confirm dialog not available");
      return;
    }
    this._confirmDialog.title = "Delete Playlist", this._confirmDialog.message = `Are you sure you want to delete "${e.name}"? This cannot be undone.`, this._confirmDialog.destructive = !0, this._confirmDialog.confirmText = "Delete";
    const i = await this._confirmDialog.show();
    if (m("Delete confirmation result:", i), !!i)
      try {
        await this._service?.deletePlaylist(e.uri), this._showToast(`Playlist "${e.name}" deleted`), this._view === "detail" && this._selectedPlaylist?.uri === e.uri && (this._view = "list", this._selectedPlaylist = null), await this._loadPlaylists();
      } catch (r) {
        V("Error deleting playlist:", r), this._showToast("Failed to delete playlist");
      }
  }
  _onSelectPlaylist(t) {
    const { playlist: e } = t.detail;
    m("_onSelectPlaylist:", e), this._loadPlaylistDetail(e.uri);
  }
  _onBackToList() {
    m("_onBackToList called"), this._view = "list", this._selectedPlaylist = null;
  }
  async _onPlayPlaylist(t) {
    const { playlist: e } = t.detail;
    m("_onPlayPlaylist:", e);
    try {
      await this._service?.playPlaylist(e.uri), this._showToast(`Playing "${e.name}"`);
    } catch (i) {
      V("Error playing playlist:", i), this._showToast("Failed to play playlist");
    }
  }
  async _onPlayTrack(t) {
    const { track: e } = t.detail;
    m("_onPlayTrack:", e);
    try {
      await this._service?.playTrack(e.uri), this._showToast(`Playing "${e.name}"`);
    } catch (i) {
      V("Error playing track:", i), this._showToast("Failed to play track");
    }
  }
  async _onRemoveTrack(t) {
    const { index: e, tracks: i } = t.detail;
    if (m("_onRemoveTrack called, index:", e, "remaining tracks:", i.length), !!this._selectedPlaylist) {
      this._saving = !0;
      try {
        await this._service?.removeFromPlaylist(this._selectedPlaylist.uri, [e]), this._selectedPlaylist = {
          ...this._selectedPlaylist,
          tracks: i
        }, this._showToast("Track removed");
      } catch (r) {
        V("Error removing track:", r), this._showToast("Failed to remove track");
      } finally {
        this._saving = !1;
      }
    }
  }
  async _onSaveChanges(t) {
    const { playlist: e, tracks: i } = t.detail;
    if (m("_onSaveChanges called, playlist:", e, "tracks:", i.length), !!e) {
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
        V("Error saving playlist:", r), this._showToast("Failed to save playlist");
      } finally {
        this._saving = !1;
      }
    }
  }
  _onAddTracks(t) {
    m("_onAddTracks called, switching to search view"), this._view = "search";
  }
  async _onAddTrack(t) {
    const { track: e } = t.detail;
    if (m("_onAddTrack called, track:", e), !!this._selectedPlaylist)
      try {
        await this._service?.addToPlaylist(this._selectedPlaylist.uri, [e.uri]), this._showToast(`Added "${e.name}"`), await this._loadPlaylistDetail(this._selectedPlaylist.uri);
      } catch (i) {
        V("Error adding track:", i), this._showToast("Failed to add track");
      }
  }
  async _onSearch(t) {
    const { query: e } = t.detail;
    m("_onSearch called, query:", e);
  }
  _onCloseSearch() {
    m("_onCloseSearch called"), this._view = "detail";
  }
  setConfig(t) {
    if (m("setConfig called with:", t), !t.entity)
      throw V("Entity is required in config"), new Error("Entity is required");
    this.config = t, m("Config set successfully");
  }
  getCardSize() {
    return 5;
  }
  render() {
    if (m("render() called, view:", this._view, "config:", this.config ? "present" : "missing"), !this.config)
      return m("No config, showing error"), g`<ha-card><div class="error">Configuration error</div></ha-card>`;
    const t = this.config.title || "Playlist Manager";
    return m("Rendering with title:", t, "playlists:", this._playlists.length, "queue:", this._queue.length), g`
      <ha-card>
        ${this._view === "list" ? g`
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
          ${this.config.show_queue_button !== !1 && this._queue.length > 0 ? g`
            <div class="card-actions">
              <mwc-button @click=${this._onCreatePlaylist}>
                <ha-icon icon="mdi:content-save"></ha-icon>
                Save Queue as Playlist
              </mwc-button>
            </div>
          ` : ""}
        ` : this._view === "detail" ? g`
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
        ` : g`
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

      ${this._toast ? g`
        <div class="toast">${this._toast}</div>
      ` : ""}
    `;
  }
};
N.styles = [vt, lt`
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
Y([
  S({ attribute: !1 })
], N.prototype, "hass", 2);
Y([
  S({ type: Object })
], N.prototype, "config", 2);
Y([
  M()
], N.prototype, "_view", 2);
Y([
  M()
], N.prototype, "_loading", 2);
Y([
  M()
], N.prototype, "_saving", 2);
Y([
  M()
], N.prototype, "_playlists", 2);
Y([
  M()
], N.prototype, "_selectedPlaylist", 2);
Y([
  M()
], N.prototype, "_queue", 2);
Y([
  M()
], N.prototype, "_toast", 2);
Y([
  ii("mopidy-confirm-dialog")
], N.prototype, "_confirmDialog", 2);
Y([
  ii("mopidy-create-playlist-dialog")
], N.prototype, "_createDialog", 2);
N = Y([
  yt("mopidy-playlist-card")
], N);
var ur = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, li = (o, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? pr(t, e) : t, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && ur(t, e, r), r;
};
let ce = class extends X {
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
    return g`
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
ce.styles = [vt, lt`
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
li([
  S({ attribute: !1 })
], ce.prototype, "hass", 2);
li([
  S({ type: Object })
], ce.prototype, "config", 2);
ce = li([
  yt("mopidy-playlist-card-editor")
], ce);
const fr = {
  type: "mopidy-playlist-card",
  name: "Mopidy Playlist Card",
  description: "A card for managing Mopidy playlists - create, edit, and delete playlists"
};
typeof window < "u" && (window.customCards || (window.customCards = []), window.customCards.push(fr));
console.info(
  "%c MOPIDY-PLAYLIST-CARD %c v1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
customElements.get("mopidy-playlist-card") || customElements.define("mopidy-playlist-card", N);
window.customCards = window.customCards || [];
const mr = class extends HTMLElement {
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
customElements.get("mopidy-playlist-card-wrapper") || customElements.define("mopidy-playlist-card-wrapper", mr);
const br = N;
export {
  N as MopidyPlaylistCard,
  br as default
};
//# sourceMappingURL=mopidy-playlist-card.js.map
