import { defineComponent as _, openBlock as a, createElementBlock as r, toDisplayString as p } from "vue";
const l = { class: "btn-cta" }, d = /* @__PURE__ */ _({
  __name: "svgHandler",
  props: {
    text: {}
  },
  setup(t) {
    return (e, n) => (a(), r("button", l, p(e.text), 1));
  }
});
const m = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [c, s] of e)
    n[c] = s;
  return n;
}, o = /* @__PURE__ */ m(d, [["__scopeId", "data-v-56ccde14"]]), i = [o], v = {
  install(t) {
    i.forEach((e) => {
      t.component(e.name, o);
    });
  }
};
export {
  v as default,
  o as svgHandler
};
