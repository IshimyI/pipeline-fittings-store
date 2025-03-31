(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver((o) => {
    for (const h of o)
      if (h.type === "childList")
        for (const m of h.addedNodes)
          m.tagName === "LINK" && m.rel === "modulepreload" && s(m);
  }).observe(document, { childList: !0, subtree: !0 });
  function c(o) {
    const h = {};
    return (
      o.integrity && (h.integrity = o.integrity),
      o.referrerPolicy && (h.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (h.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (h.credentials = "omit")
        : (h.credentials = "same-origin"),
      h
    );
  }
  function s(o) {
    if (o.ep) return;
    o.ep = !0;
    const h = c(o);
    fetch(o.href, h);
  }
})();
var ic = { exports: {} },
  ai = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wh;
function xy() {
  if (wh) return ai;
  wh = 1;
  var n = Symbol.for("react.transitional.element"),
    r = Symbol.for("react.fragment");
  function c(s, o, h) {
    var m = null;
    if (
      (h !== void 0 && (m = "" + h),
      o.key !== void 0 && (m = "" + o.key),
      "key" in o)
    ) {
      h = {};
      for (var b in o) b !== "key" && (h[b] = o[b]);
    } else h = o;
    return (
      (o = h.ref),
      { $$typeof: n, type: s, key: m, ref: o !== void 0 ? o : null, props: h }
    );
  }
  return (ai.Fragment = r), (ai.jsx = c), (ai.jsxs = c), ai;
}
var Nh;
function Sy() {
  return Nh || ((Nh = 1), (ic.exports = xy())), ic.exports;
}
var d = Sy(),
  rc = { exports: {} },
  ye = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jh;
function Ey() {
  if (jh) return ye;
  jh = 1;
  var n = Symbol.for("react.transitional.element"),
    r = Symbol.for("react.portal"),
    c = Symbol.for("react.fragment"),
    s = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    h = Symbol.for("react.consumer"),
    m = Symbol.for("react.context"),
    b = Symbol.for("react.forward_ref"),
    y = Symbol.for("react.suspense"),
    g = Symbol.for("react.memo"),
    S = Symbol.for("react.lazy"),
    R = Symbol.iterator;
  function N(E) {
    return E === null || typeof E != "object"
      ? null
      : ((E = (R && E[R]) || E["@@iterator"]),
        typeof E == "function" ? E : null);
  }
  var T = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    v = Object.assign,
    _ = {};
  function C(E, V, ue) {
    (this.props = E),
      (this.context = V),
      (this.refs = _),
      (this.updater = ue || T);
  }
  (C.prototype.isReactComponent = {}),
    (C.prototype.setState = function (E, V) {
      if (typeof E != "object" && typeof E != "function" && E != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, E, V, "setState");
    }),
    (C.prototype.forceUpdate = function (E) {
      this.updater.enqueueForceUpdate(this, E, "forceUpdate");
    });
  function M() {}
  M.prototype = C.prototype;
  function X(E, V, ue) {
    (this.props = E),
      (this.context = V),
      (this.refs = _),
      (this.updater = ue || T);
  }
  var Q = (X.prototype = new M());
  (Q.constructor = X), v(Q, C.prototype), (Q.isPureReactComponent = !0);
  var J = Array.isArray,
    G = { H: null, A: null, T: null, S: null },
    U = Object.prototype.hasOwnProperty;
  function F(E, V, ue, ne, W, ge) {
    return (
      (ue = ge.ref),
      {
        $$typeof: n,
        type: E,
        key: V,
        ref: ue !== void 0 ? ue : null,
        props: ge,
      }
    );
  }
  function re(E, V) {
    return F(E.type, V, void 0, void 0, void 0, E.props);
  }
  function Z(E) {
    return typeof E == "object" && E !== null && E.$$typeof === n;
  }
  function le(E) {
    var V = { "=": "=0", ":": "=2" };
    return (
      "$" +
      E.replace(/[=:]/g, function (ue) {
        return V[ue];
      })
    );
  }
  var De = /\/+/g;
  function Ze(E, V) {
    return typeof E == "object" && E !== null && E.key != null
      ? le("" + E.key)
      : V.toString(36);
  }
  function Ke() {}
  function Ge(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (
          (typeof E.status == "string"
            ? E.then(Ke, Ke)
            : ((E.status = "pending"),
              E.then(
                function (V) {
                  E.status === "pending" &&
                    ((E.status = "fulfilled"), (E.value = V));
                },
                function (V) {
                  E.status === "pending" &&
                    ((E.status = "rejected"), (E.reason = V));
                }
              )),
          E.status)
        ) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function _e(E, V, ue, ne, W) {
    var ge = typeof E;
    (ge === "undefined" || ge === "boolean") && (E = null);
    var oe = !1;
    if (E === null) oe = !0;
    else
      switch (ge) {
        case "bigint":
        case "string":
        case "number":
          oe = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case n:
            case r:
              oe = !0;
              break;
            case S:
              return (oe = E._init), _e(oe(E._payload), V, ue, ne, W);
          }
      }
    if (oe)
      return (
        (W = W(E)),
        (oe = ne === "" ? "." + Ze(E, 0) : ne),
        J(W)
          ? ((ue = ""),
            oe != null && (ue = oe.replace(De, "$&/") + "/"),
            _e(W, V, ue, "", function (pe) {
              return pe;
            }))
          : W != null &&
            (Z(W) &&
              (W = re(
                W,
                ue +
                  (W.key == null || (E && E.key === W.key)
                    ? ""
                    : ("" + W.key).replace(De, "$&/") + "/") +
                  oe
              )),
            V.push(W)),
        1
      );
    oe = 0;
    var K = ne === "" ? "." : ne + ":";
    if (J(E))
      for (var $ = 0; $ < E.length; $++)
        (ne = E[$]), (ge = K + Ze(ne, $)), (oe += _e(ne, V, ue, ge, W));
    else if ((($ = N(E)), typeof $ == "function"))
      for (E = $.call(E), $ = 0; !(ne = E.next()).done; )
        (ne = ne.value), (ge = K + Ze(ne, $++)), (oe += _e(ne, V, ue, ge, W));
    else if (ge === "object") {
      if (typeof E.then == "function") return _e(Ge(E), V, ue, ne, W);
      throw (
        ((V = String(E)),
        Error(
          "Objects are not valid as a React child (found: " +
            (V === "[object Object]"
              ? "object with keys {" + Object.keys(E).join(", ") + "}"
              : V) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return oe;
  }
  function Y(E, V, ue) {
    if (E == null) return E;
    var ne = [],
      W = 0;
    return (
      _e(E, ne, "", "", function (ge) {
        return V.call(ue, ge, W++);
      }),
      ne
    );
  }
  function ce(E) {
    if (E._status === -1) {
      var V = E._result;
      (V = V()),
        V.then(
          function (ue) {
            (E._status === 0 || E._status === -1) &&
              ((E._status = 1), (E._result = ue));
          },
          function (ue) {
            (E._status === 0 || E._status === -1) &&
              ((E._status = 2), (E._result = ue));
          }
        ),
        E._status === -1 && ((E._status = 0), (E._result = V));
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var P =
    typeof reportError == "function"
      ? reportError
      : function (E) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var V = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof E == "object" &&
                E !== null &&
                typeof E.message == "string"
                  ? String(E.message)
                  : String(E),
              error: E,
            });
            if (!window.dispatchEvent(V)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", E);
            return;
          }
          console.error(E);
        };
  function he() {}
  return (
    (ye.Children = {
      map: Y,
      forEach: function (E, V, ue) {
        Y(
          E,
          function () {
            V.apply(this, arguments);
          },
          ue
        );
      },
      count: function (E) {
        var V = 0;
        return (
          Y(E, function () {
            V++;
          }),
          V
        );
      },
      toArray: function (E) {
        return (
          Y(E, function (V) {
            return V;
          }) || []
        );
      },
      only: function (E) {
        if (!Z(E))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return E;
      },
    }),
    (ye.Component = C),
    (ye.Fragment = c),
    (ye.Profiler = o),
    (ye.PureComponent = X),
    (ye.StrictMode = s),
    (ye.Suspense = y),
    (ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G),
    (ye.act = function () {
      throw Error("act(...) is not supported in production builds of React.");
    }),
    (ye.cache = function (E) {
      return function () {
        return E.apply(null, arguments);
      };
    }),
    (ye.cloneElement = function (E, V, ue) {
      if (E == null)
        throw Error(
          "The argument must be a React element, but you passed " + E + "."
        );
      var ne = v({}, E.props),
        W = E.key,
        ge = void 0;
      if (V != null)
        for (oe in (V.ref !== void 0 && (ge = void 0),
        V.key !== void 0 && (W = "" + V.key),
        V))
          !U.call(V, oe) ||
            oe === "key" ||
            oe === "__self" ||
            oe === "__source" ||
            (oe === "ref" && V.ref === void 0) ||
            (ne[oe] = V[oe]);
      var oe = arguments.length - 2;
      if (oe === 1) ne.children = ue;
      else if (1 < oe) {
        for (var K = Array(oe), $ = 0; $ < oe; $++) K[$] = arguments[$ + 2];
        ne.children = K;
      }
      return F(E.type, W, void 0, void 0, ge, ne);
    }),
    (ye.createContext = function (E) {
      return (
        (E = {
          $$typeof: m,
          _currentValue: E,
          _currentValue2: E,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (E.Provider = E),
        (E.Consumer = { $$typeof: h, _context: E }),
        E
      );
    }),
    (ye.createElement = function (E, V, ue) {
      var ne,
        W = {},
        ge = null;
      if (V != null)
        for (ne in (V.key !== void 0 && (ge = "" + V.key), V))
          U.call(V, ne) &&
            ne !== "key" &&
            ne !== "__self" &&
            ne !== "__source" &&
            (W[ne] = V[ne]);
      var oe = arguments.length - 2;
      if (oe === 1) W.children = ue;
      else if (1 < oe) {
        for (var K = Array(oe), $ = 0; $ < oe; $++) K[$] = arguments[$ + 2];
        W.children = K;
      }
      if (E && E.defaultProps)
        for (ne in ((oe = E.defaultProps), oe))
          W[ne] === void 0 && (W[ne] = oe[ne]);
      return F(E, ge, void 0, void 0, null, W);
    }),
    (ye.createRef = function () {
      return { current: null };
    }),
    (ye.forwardRef = function (E) {
      return { $$typeof: b, render: E };
    }),
    (ye.isValidElement = Z),
    (ye.lazy = function (E) {
      return { $$typeof: S, _payload: { _status: -1, _result: E }, _init: ce };
    }),
    (ye.memo = function (E, V) {
      return { $$typeof: g, type: E, compare: V === void 0 ? null : V };
    }),
    (ye.startTransition = function (E) {
      var V = G.T,
        ue = {};
      G.T = ue;
      try {
        var ne = E(),
          W = G.S;
        W !== null && W(ue, ne),
          typeof ne == "object" &&
            ne !== null &&
            typeof ne.then == "function" &&
            ne.then(he, P);
      } catch (ge) {
        P(ge);
      } finally {
        G.T = V;
      }
    }),
    (ye.unstable_useCacheRefresh = function () {
      return G.H.useCacheRefresh();
    }),
    (ye.use = function (E) {
      return G.H.use(E);
    }),
    (ye.useActionState = function (E, V, ue) {
      return G.H.useActionState(E, V, ue);
    }),
    (ye.useCallback = function (E, V) {
      return G.H.useCallback(E, V);
    }),
    (ye.useContext = function (E) {
      return G.H.useContext(E);
    }),
    (ye.useDebugValue = function () {}),
    (ye.useDeferredValue = function (E, V) {
      return G.H.useDeferredValue(E, V);
    }),
    (ye.useEffect = function (E, V) {
      return G.H.useEffect(E, V);
    }),
    (ye.useId = function () {
      return G.H.useId();
    }),
    (ye.useImperativeHandle = function (E, V, ue) {
      return G.H.useImperativeHandle(E, V, ue);
    }),
    (ye.useInsertionEffect = function (E, V) {
      return G.H.useInsertionEffect(E, V);
    }),
    (ye.useLayoutEffect = function (E, V) {
      return G.H.useLayoutEffect(E, V);
    }),
    (ye.useMemo = function (E, V) {
      return G.H.useMemo(E, V);
    }),
    (ye.useOptimistic = function (E, V) {
      return G.H.useOptimistic(E, V);
    }),
    (ye.useReducer = function (E, V, ue) {
      return G.H.useReducer(E, V, ue);
    }),
    (ye.useRef = function (E) {
      return G.H.useRef(E);
    }),
    (ye.useState = function (E) {
      return G.H.useState(E);
    }),
    (ye.useSyncExternalStore = function (E, V, ue) {
      return G.H.useSyncExternalStore(E, V, ue);
    }),
    (ye.useTransition = function () {
      return G.H.useTransition();
    }),
    (ye.version = "19.0.0"),
    ye
  );
}
var Th;
function Ac() {
  return Th || ((Th = 1), (rc.exports = Ey())), rc.exports;
}
var O = Ac(),
  uc = { exports: {} },
  ni = {},
  sc = { exports: {} },
  cc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Rh;
function wy() {
  return (
    Rh ||
      ((Rh = 1),
      (function (n) {
        function r(Y, ce) {
          var P = Y.length;
          Y.push(ce);
          e: for (; 0 < P; ) {
            var he = (P - 1) >>> 1,
              E = Y[he];
            if (0 < o(E, ce)) (Y[he] = ce), (Y[P] = E), (P = he);
            else break e;
          }
        }
        function c(Y) {
          return Y.length === 0 ? null : Y[0];
        }
        function s(Y) {
          if (Y.length === 0) return null;
          var ce = Y[0],
            P = Y.pop();
          if (P !== ce) {
            Y[0] = P;
            e: for (var he = 0, E = Y.length, V = E >>> 1; he < V; ) {
              var ue = 2 * (he + 1) - 1,
                ne = Y[ue],
                W = ue + 1,
                ge = Y[W];
              if (0 > o(ne, P))
                W < E && 0 > o(ge, ne)
                  ? ((Y[he] = ge), (Y[W] = P), (he = W))
                  : ((Y[he] = ne), (Y[ue] = P), (he = ue));
              else if (W < E && 0 > o(ge, P))
                (Y[he] = ge), (Y[W] = P), (he = W);
              else break e;
            }
          }
          return ce;
        }
        function o(Y, ce) {
          var P = Y.sortIndex - ce.sortIndex;
          return P !== 0 ? P : Y.id - ce.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var h = performance;
          n.unstable_now = function () {
            return h.now();
          };
        } else {
          var m = Date,
            b = m.now();
          n.unstable_now = function () {
            return m.now() - b;
          };
        }
        var y = [],
          g = [],
          S = 1,
          R = null,
          N = 3,
          T = !1,
          v = !1,
          _ = !1,
          C = typeof setTimeout == "function" ? setTimeout : null,
          M = typeof clearTimeout == "function" ? clearTimeout : null,
          X = typeof setImmediate < "u" ? setImmediate : null;
        function Q(Y) {
          for (var ce = c(g); ce !== null; ) {
            if (ce.callback === null) s(g);
            else if (ce.startTime <= Y)
              s(g), (ce.sortIndex = ce.expirationTime), r(y, ce);
            else break;
            ce = c(g);
          }
        }
        function J(Y) {
          if (((_ = !1), Q(Y), !v))
            if (c(y) !== null) (v = !0), Ge();
            else {
              var ce = c(g);
              ce !== null && _e(J, ce.startTime - Y);
            }
        }
        var G = !1,
          U = -1,
          F = 5,
          re = -1;
        function Z() {
          return !(n.unstable_now() - re < F);
        }
        function le() {
          if (G) {
            var Y = n.unstable_now();
            re = Y;
            var ce = !0;
            try {
              e: {
                (v = !1), _ && ((_ = !1), M(U), (U = -1)), (T = !0);
                var P = N;
                try {
                  t: {
                    for (
                      Q(Y), R = c(y);
                      R !== null && !(R.expirationTime > Y && Z());

                    ) {
                      var he = R.callback;
                      if (typeof he == "function") {
                        (R.callback = null), (N = R.priorityLevel);
                        var E = he(R.expirationTime <= Y);
                        if (((Y = n.unstable_now()), typeof E == "function")) {
                          (R.callback = E), Q(Y), (ce = !0);
                          break t;
                        }
                        R === c(y) && s(y), Q(Y);
                      } else s(y);
                      R = c(y);
                    }
                    if (R !== null) ce = !0;
                    else {
                      var V = c(g);
                      V !== null && _e(J, V.startTime - Y), (ce = !1);
                    }
                  }
                  break e;
                } finally {
                  (R = null), (N = P), (T = !1);
                }
                ce = void 0;
              }
            } finally {
              ce ? De() : (G = !1);
            }
          }
        }
        var De;
        if (typeof X == "function")
          De = function () {
            X(le);
          };
        else if (typeof MessageChannel < "u") {
          var Ze = new MessageChannel(),
            Ke = Ze.port2;
          (Ze.port1.onmessage = le),
            (De = function () {
              Ke.postMessage(null);
            });
        } else
          De = function () {
            C(le, 0);
          };
        function Ge() {
          G || ((G = !0), De());
        }
        function _e(Y, ce) {
          U = C(function () {
            Y(n.unstable_now());
          }, ce);
        }
        (n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (Y) {
            Y.callback = null;
          }),
          (n.unstable_continueExecution = function () {
            v || T || ((v = !0), Ge());
          }),
          (n.unstable_forceFrameRate = function (Y) {
            0 > Y || 125 < Y
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (F = 0 < Y ? Math.floor(1e3 / Y) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return N;
          }),
          (n.unstable_getFirstCallbackNode = function () {
            return c(y);
          }),
          (n.unstable_next = function (Y) {
            switch (N) {
              case 1:
              case 2:
              case 3:
                var ce = 3;
                break;
              default:
                ce = N;
            }
            var P = N;
            N = ce;
            try {
              return Y();
            } finally {
              N = P;
            }
          }),
          (n.unstable_pauseExecution = function () {}),
          (n.unstable_requestPaint = function () {}),
          (n.unstable_runWithPriority = function (Y, ce) {
            switch (Y) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                Y = 3;
            }
            var P = N;
            N = Y;
            try {
              return ce();
            } finally {
              N = P;
            }
          }),
          (n.unstable_scheduleCallback = function (Y, ce, P) {
            var he = n.unstable_now();
            switch (
              (typeof P == "object" && P !== null
                ? ((P = P.delay),
                  (P = typeof P == "number" && 0 < P ? he + P : he))
                : (P = he),
              Y)
            ) {
              case 1:
                var E = -1;
                break;
              case 2:
                E = 250;
                break;
              case 5:
                E = 1073741823;
                break;
              case 4:
                E = 1e4;
                break;
              default:
                E = 5e3;
            }
            return (
              (E = P + E),
              (Y = {
                id: S++,
                callback: ce,
                priorityLevel: Y,
                startTime: P,
                expirationTime: E,
                sortIndex: -1,
              }),
              P > he
                ? ((Y.sortIndex = P),
                  r(g, Y),
                  c(y) === null &&
                    Y === c(g) &&
                    (_ ? (M(U), (U = -1)) : (_ = !0), _e(J, P - he)))
                : ((Y.sortIndex = E), r(y, Y), v || T || ((v = !0), Ge())),
              Y
            );
          }),
          (n.unstable_shouldYield = Z),
          (n.unstable_wrapCallback = function (Y) {
            var ce = N;
            return function () {
              var P = N;
              N = ce;
              try {
                return Y.apply(this, arguments);
              } finally {
                N = P;
              }
            };
          });
      })(cc)),
    cc
  );
}
var Ah;
function Ny() {
  return Ah || ((Ah = 1), (sc.exports = wy())), sc.exports;
}
var oc = { exports: {} },
  ut = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Oh;
function jy() {
  if (Oh) return ut;
  Oh = 1;
  var n = Ac();
  function r(y) {
    var g = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        g += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return (
      "Minified React error #" +
      y +
      "; visit " +
      g +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c() {}
  var s = {
      d: {
        f: c,
        r: function () {
          throw Error(r(522));
        },
        D: c,
        C: c,
        L: c,
        m: c,
        X: c,
        S: c,
        M: c,
      },
      p: 0,
      findDOMNode: null,
    },
    o = Symbol.for("react.portal");
  function h(y, g, S) {
    var R =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: R == null ? null : "" + R,
      children: y,
      containerInfo: g,
      implementation: S,
    };
  }
  var m = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function b(y, g) {
    if (y === "font") return "";
    if (typeof g == "string") return g === "use-credentials" ? g : "";
  }
  return (
    (ut.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (ut.createPortal = function (y, g) {
      var S =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11))
        throw Error(r(299));
      return h(y, g, null, S);
    }),
    (ut.flushSync = function (y) {
      var g = m.T,
        S = s.p;
      try {
        if (((m.T = null), (s.p = 2), y)) return y();
      } finally {
        (m.T = g), (s.p = S), s.d.f();
      }
    }),
    (ut.preconnect = function (y, g) {
      typeof y == "string" &&
        (g
          ? ((g = g.crossOrigin),
            (g =
              typeof g == "string"
                ? g === "use-credentials"
                  ? g
                  : ""
                : void 0))
          : (g = null),
        s.d.C(y, g));
    }),
    (ut.prefetchDNS = function (y) {
      typeof y == "string" && s.d.D(y);
    }),
    (ut.preinit = function (y, g) {
      if (typeof y == "string" && g && typeof g.as == "string") {
        var S = g.as,
          R = b(S, g.crossOrigin),
          N = typeof g.integrity == "string" ? g.integrity : void 0,
          T = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
        S === "style"
          ? s.d.S(y, typeof g.precedence == "string" ? g.precedence : void 0, {
              crossOrigin: R,
              integrity: N,
              fetchPriority: T,
            })
          : S === "script" &&
            s.d.X(y, {
              crossOrigin: R,
              integrity: N,
              fetchPriority: T,
              nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            });
      }
    }),
    (ut.preinitModule = function (y, g) {
      if (typeof y == "string")
        if (typeof g == "object" && g !== null) {
          if (g.as == null || g.as === "script") {
            var S = b(g.as, g.crossOrigin);
            s.d.M(y, {
              crossOrigin: S,
              integrity: typeof g.integrity == "string" ? g.integrity : void 0,
              nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            });
          }
        } else g == null && s.d.M(y);
    }),
    (ut.preload = function (y, g) {
      if (
        typeof y == "string" &&
        typeof g == "object" &&
        g !== null &&
        typeof g.as == "string"
      ) {
        var S = g.as,
          R = b(S, g.crossOrigin);
        s.d.L(y, S, {
          crossOrigin: R,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          type: typeof g.type == "string" ? g.type : void 0,
          fetchPriority:
            typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
          referrerPolicy:
            typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
          imageSrcSet:
            typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
          imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
          media: typeof g.media == "string" ? g.media : void 0,
        });
      }
    }),
    (ut.preloadModule = function (y, g) {
      if (typeof y == "string")
        if (g) {
          var S = b(g.as, g.crossOrigin);
          s.d.m(y, {
            as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
            crossOrigin: S,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          });
        } else s.d.m(y);
    }),
    (ut.requestFormReset = function (y) {
      s.d.r(y);
    }),
    (ut.unstable_batchedUpdates = function (y, g) {
      return y(g);
    }),
    (ut.useFormState = function (y, g, S) {
      return m.H.useFormState(y, g, S);
    }),
    (ut.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (ut.version = "19.0.0"),
    ut
  );
}
var Ch;
function Ty() {
  if (Ch) return oc.exports;
  Ch = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), (oc.exports = jy()), oc.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zh;
function Ry() {
  if (zh) return ni;
  zh = 1;
  var n = Ny(),
    r = Ac(),
    c = Ty();
  function s(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function o(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  var h = Symbol.for("react.element"),
    m = Symbol.for("react.transitional.element"),
    b = Symbol.for("react.portal"),
    y = Symbol.for("react.fragment"),
    g = Symbol.for("react.strict_mode"),
    S = Symbol.for("react.profiler"),
    R = Symbol.for("react.provider"),
    N = Symbol.for("react.consumer"),
    T = Symbol.for("react.context"),
    v = Symbol.for("react.forward_ref"),
    _ = Symbol.for("react.suspense"),
    C = Symbol.for("react.suspense_list"),
    M = Symbol.for("react.memo"),
    X = Symbol.for("react.lazy"),
    Q = Symbol.for("react.offscreen"),
    J = Symbol.for("react.memo_cache_sentinel"),
    G = Symbol.iterator;
  function U(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (G && e[G]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var F = Symbol.for("react.client.reference");
  function re(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === F ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case y:
        return "Fragment";
      case b:
        return "Portal";
      case S:
        return "Profiler";
      case g:
        return "StrictMode";
      case _:
        return "Suspense";
      case C:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case T:
          return (e.displayName || "Context") + ".Provider";
        case N:
          return (e._context.displayName || "Context") + ".Consumer";
        case v:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case M:
          return (
            (t = e.displayName || null), t !== null ? t : re(e.type) || "Memo"
          );
        case X:
          (t = e._payload), (e = e._init);
          try {
            return re(e(t));
          } catch {}
      }
    return null;
  }
  var Z = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    le = Object.assign,
    De,
    Ze;
  function Ke(e) {
    if (De === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        (De = (t && t[1]) || ""),
          (Ze =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      De +
      e +
      Ze
    );
  }
  var Ge = !1;
  function _e(e, t) {
    if (!e || Ge) return "";
    Ge = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var k = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(k.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(k, []);
                } catch (B) {
                  var D = B;
                }
                Reflect.construct(e, [], k);
              } else {
                try {
                  k.call();
                } catch (B) {
                  D = B;
                }
                e.call(k.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                D = B;
              }
              (k = e()) &&
                typeof k.catch == "function" &&
                k.catch(function () {});
            }
          } catch (B) {
            if (B && D && typeof B.stack == "string") return [B.stack, D.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var i = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      i &&
        i.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var u = a.DetermineComponentFrameRoot(),
        f = u[0],
        p = u[1];
      if (f && p) {
        var x = f.split(`
`),
          j = p.split(`
`);
        for (
          i = a = 0;
          a < x.length && !x[a].includes("DetermineComponentFrameRoot");

        )
          a++;
        for (; i < j.length && !j[i].includes("DetermineComponentFrameRoot"); )
          i++;
        if (a === x.length || i === j.length)
          for (
            a = x.length - 1, i = j.length - 1;
            1 <= a && 0 <= i && x[a] !== j[i];

          )
            i--;
        for (; 1 <= a && 0 <= i; a--, i--)
          if (x[a] !== j[i]) {
            if (a !== 1 || i !== 1)
              do
                if ((a--, i--, 0 > i || x[a] !== j[i])) {
                  var L =
                    `
` + x[a].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      L.includes("<anonymous>") &&
                      (L = L.replace("<anonymous>", e.displayName)),
                    L
                  );
                }
              while (1 <= a && 0 <= i);
            break;
          }
      }
    } finally {
      (Ge = !1), (Error.prepareStackTrace = l);
    }
    return (l = e ? e.displayName || e.name : "") ? Ke(l) : "";
  }
  function Y(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ke(e.type);
      case 16:
        return Ke("Lazy");
      case 13:
        return Ke("Suspense");
      case 19:
        return Ke("SuspenseList");
      case 0:
      case 15:
        return (e = _e(e.type, !1)), e;
      case 11:
        return (e = _e(e.type.render, !1)), e;
      case 1:
        return (e = _e(e.type, !0)), e;
      default:
        return "";
    }
  }
  function ce(e) {
    try {
      var t = "";
      do (t += Y(e)), (e = e.return);
      while (e);
      return t;
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      );
    }
  }
  function P(e) {
    var t = e,
      l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function he(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function E(e) {
    if (P(e) !== e) throw Error(s(188));
  }
  function V(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = P(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var i = l.return;
      if (i === null) break;
      var u = i.alternate;
      if (u === null) {
        if (((a = i.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (i.child === u.child) {
        for (u = i.child; u; ) {
          if (u === l) return E(i), e;
          if (u === a) return E(i), t;
          u = u.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== a.return) (l = i), (a = u);
      else {
        for (var f = !1, p = i.child; p; ) {
          if (p === l) {
            (f = !0), (l = i), (a = u);
            break;
          }
          if (p === a) {
            (f = !0), (a = i), (l = u);
            break;
          }
          p = p.sibling;
        }
        if (!f) {
          for (p = u.child; p; ) {
            if (p === l) {
              (f = !0), (l = u), (a = i);
              break;
            }
            if (p === a) {
              (f = !0), (a = u), (l = i);
              break;
            }
            p = p.sibling;
          }
          if (!f) throw Error(s(189));
        }
      }
      if (l.alternate !== a) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? e : t;
  }
  function ue(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = ue(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var ne = Array.isArray,
    W = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ge = { pending: !1, data: null, method: null, action: null },
    oe = [],
    K = -1;
  function $(e) {
    return { current: e };
  }
  function pe(e) {
    0 > K || ((e.current = oe[K]), (oe[K] = null), K--);
  }
  function de(e, t) {
    K++, (oe[K] = e.current), (e.current = t);
  }
  var nt = $(null),
    Yl = $(null),
    pl = $(null),
    yi = $(null);
  function bi(e, t) {
    switch ((de(pl, t), de(Yl, e), de(nt, null), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) && (t = t.namespaceURI) ? Pd(t) : 0;
        break;
      default:
        if (
          ((e = e === 8 ? t.parentNode : t),
          (t = e.tagName),
          (e = e.namespaceURI))
        )
          (e = Pd(e)), (t = Id(e, t));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    pe(nt), de(nt, t);
  }
  function ya() {
    pe(nt), pe(Yl), pe(pl);
  }
  function Fr(e) {
    e.memoizedState !== null && de(yi, e);
    var t = nt.current,
      l = Id(t, e.type);
    t !== l && (de(Yl, e), de(nt, l));
  }
  function vi(e) {
    Yl.current === e && (pe(nt), pe(Yl)),
      yi.current === e && (pe(yi), (Pn._currentValue = ge));
  }
  var Wr = Object.prototype.hasOwnProperty,
    Pr = n.unstable_scheduleCallback,
    Ir = n.unstable_cancelCallback,
    Pm = n.unstable_shouldYield,
    Im = n.unstable_requestPaint,
    Vt = n.unstable_now,
    eg = n.unstable_getCurrentPriorityLevel,
    qc = n.unstable_ImmediatePriority,
    kc = n.unstable_UserBlockingPriority,
    xi = n.unstable_NormalPriority,
    tg = n.unstable_LowPriority,
    Gc = n.unstable_IdlePriority,
    lg = n.log,
    ag = n.unstable_setDisableYieldValue,
    un = null,
    gt = null;
  function ng(e) {
    if (gt && typeof gt.onCommitFiberRoot == "function")
      try {
        gt.onCommitFiberRoot(un, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  function yl(e) {
    if (
      (typeof lg == "function" && ag(e),
      gt && typeof gt.setStrictMode == "function")
    )
      try {
        gt.setStrictMode(un, e);
      } catch {}
  }
  var pt = Math.clz32 ? Math.clz32 : ug,
    ig = Math.log,
    rg = Math.LN2;
  function ug(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((ig(e) / rg) | 0)) | 0;
  }
  var Si = 128,
    Ei = 4194304;
  function Vl(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194176;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function wi(e, t) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var a = 0,
      i = e.suspendedLanes,
      u = e.pingedLanes,
      f = e.warmLanes;
    e = e.finishedLanes !== 0;
    var p = l & 134217727;
    return (
      p !== 0
        ? ((l = p & ~i),
          l !== 0
            ? (a = Vl(l))
            : ((u &= p),
              u !== 0
                ? (a = Vl(u))
                : e || ((f = p & ~f), f !== 0 && (a = Vl(f)))))
        : ((p = l & ~i),
          p !== 0
            ? (a = Vl(p))
            : u !== 0
            ? (a = Vl(u))
            : e || ((f = l & ~f), f !== 0 && (a = Vl(f)))),
      a === 0
        ? 0
        : t !== 0 &&
          t !== a &&
          (t & i) === 0 &&
          ((i = a & -a),
          (f = t & -t),
          i >= f || (i === 32 && (f & 4194176) !== 0))
        ? t
        : a
    );
  }
  function sn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function sg(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
        return t + 250;
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Yc() {
    var e = Si;
    return (Si <<= 1), (Si & 4194176) === 0 && (Si = 128), e;
  }
  function Vc() {
    var e = Ei;
    return (Ei <<= 1), (Ei & 62914560) === 0 && (Ei = 4194304), e;
  }
  function eu(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function cn(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function cg(e, t, l, a, i, u) {
    var f = e.pendingLanes;
    (e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0);
    var p = e.entanglements,
      x = e.expirationTimes,
      j = e.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var L = 31 - pt(l),
        k = 1 << L;
      (p[L] = 0), (x[L] = -1);
      var D = j[L];
      if (D !== null)
        for (j[L] = null, L = 0; L < D.length; L++) {
          var B = D[L];
          B !== null && (B.lane &= -536870913);
        }
      l &= ~k;
    }
    a !== 0 && Xc(e, a, 0),
      u !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(f & ~t));
  }
  function Xc(e, t, l) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var a = 31 - pt(t);
    (e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 4194218));
  }
  function Qc(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var a = 31 - pt(l),
        i = 1 << a;
      (i & t) | (e[a] & t) && (e[a] |= t), (l &= ~i);
    }
  }
  function Zc(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Kc() {
    var e = W.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : yh(e.type));
  }
  function og(e, t) {
    var l = W.p;
    try {
      return (W.p = e), t();
    } finally {
      W.p = l;
    }
  }
  var bl = Math.random().toString(36).slice(2),
    it = "__reactFiber$" + bl,
    ft = "__reactProps$" + bl,
    ba = "__reactContainer$" + bl,
    tu = "__reactEvents$" + bl,
    fg = "__reactListeners$" + bl,
    dg = "__reactHandles$" + bl,
    Jc = "__reactResources$" + bl,
    on = "__reactMarker$" + bl;
  function lu(e) {
    delete e[it], delete e[ft], delete e[tu], delete e[fg], delete e[dg];
  }
  function Xl(e) {
    var t = e[it];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[ba] || l[it])) {
        if (
          ((l = t.alternate),
          t.child !== null || (l !== null && l.child !== null))
        )
          for (e = lh(e); e !== null; ) {
            if ((l = e[it])) return l;
            e = lh(e);
          }
        return t;
      }
      (e = l), (l = e.parentNode);
    }
    return null;
  }
  function va(e) {
    if ((e = e[it] || e[ba])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function fn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function xa(e) {
    var t = e[Jc];
    return (
      t ||
        (t = e[Jc] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Fe(e) {
    e[on] = !0;
  }
  var $c = new Set(),
    Fc = {};
  function Ql(e, t) {
    Sa(e, t), Sa(e + "Capture", t);
  }
  function Sa(e, t) {
    for (Fc[e] = t, e = 0; e < t.length; e++) $c.add(t[e]);
  }
  var Pt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    hg = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Wc = {},
    Pc = {};
  function mg(e) {
    return Wr.call(Pc, e)
      ? !0
      : Wr.call(Wc, e)
      ? !1
      : hg.test(e)
      ? (Pc[e] = !0)
      : ((Wc[e] = !0), !1);
  }
  function Ni(e, t, l) {
    if (mg(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function ji(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function It(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + a);
    }
  }
  function wt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Ic(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function gg(e) {
    var t = Ic(e) ? "checked" : "value",
      l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      a = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof l < "u" &&
      typeof l.get == "function" &&
      typeof l.set == "function"
    ) {
      var i = l.get,
        u = l.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return i.call(this);
          },
          set: function (f) {
            (a = "" + f), u.call(this, f);
          },
        }),
        Object.defineProperty(e, t, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (f) {
            a = "" + f;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function Ti(e) {
    e._valueTracker || (e._valueTracker = gg(e));
  }
  function eo(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      a = "";
    return (
      e && (a = Ic(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function Ri(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var pg = /[\n"\\]/g;
  function Nt(e) {
    return e.replace(pg, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function au(e, t, l, a, i, u, f, p) {
    (e.name = ""),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (e.type = f)
        : e.removeAttribute("type"),
      t != null
        ? f === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + wt(t))
          : e.value !== "" + wt(t) && (e.value = "" + wt(t))
        : (f !== "submit" && f !== "reset") || e.removeAttribute("value"),
      t != null
        ? nu(e, f, wt(t))
        : l != null
        ? nu(e, f, wt(l))
        : a != null && e.removeAttribute("value"),
      i == null && u != null && (e.defaultChecked = !!u),
      i != null &&
        (e.checked = i && typeof i != "function" && typeof i != "symbol"),
      p != null &&
      typeof p != "function" &&
      typeof p != "symbol" &&
      typeof p != "boolean"
        ? (e.name = "" + wt(p))
        : e.removeAttribute("name");
  }
  function to(e, t, l, a, i, u, f, p) {
    if (
      (u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (e.type = u),
      t != null || l != null)
    ) {
      if (!((u !== "submit" && u !== "reset") || t != null)) return;
      (l = l != null ? "" + wt(l) : ""),
        (t = t != null ? "" + wt(t) : l),
        p || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (a = a ?? i),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (e.checked = p ? e.checked : !!a),
      (e.defaultChecked = !!a),
      f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (e.name = f);
  }
  function nu(e, t, l) {
    (t === "number" && Ri(e.ownerDocument) === e) ||
      e.defaultValue === "" + l ||
      (e.defaultValue = "" + l);
  }
  function Ea(e, t, l, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var i = 0; i < l.length; i++) t["$" + l[i]] = !0;
      for (l = 0; l < e.length; l++)
        (i = t.hasOwnProperty("$" + e[l].value)),
          e[l].selected !== i && (e[l].selected = i),
          i && a && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + wt(l), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === l) {
          (e[i].selected = !0), a && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function lo(e, t, l) {
    if (
      t != null &&
      ((t = "" + wt(t)), t !== e.value && (e.value = t), l == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + wt(l) : "";
  }
  function ao(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (ne(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), (t = l);
    }
    (l = wt(t)),
      (e.defaultValue = l),
      (a = e.textContent),
      a === l && a !== "" && a !== null && (e.value = a);
  }
  function wa(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var yg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function no(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === ""
      ? a
        ? e.setProperty(t, "")
        : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
      : a
      ? e.setProperty(t, l)
      : typeof l != "number" || l === 0 || yg.has(t)
      ? t === "float"
        ? (e.cssFloat = l)
        : (e[t] = ("" + l).trim())
      : (e[t] = l + "px");
  }
  function io(e, t, l) {
    if (t != null && typeof t != "object") throw Error(s(62));
    if (((e = e.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? e.setProperty(a, "")
            : a === "float"
            ? (e.cssFloat = "")
            : (e[a] = ""));
      for (var i in t)
        (a = t[i]), t.hasOwnProperty(i) && l[i] !== a && no(e, i, a);
    } else for (var u in t) t.hasOwnProperty(u) && no(e, u, t[u]);
  }
  function iu(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var bg = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    vg =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ai(e) {
    return vg.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var ru = null;
  function uu(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Na = null,
    ja = null;
  function ro(e) {
    var t = va(e);
    if (t && (e = t.stateNode)) {
      var l = e[ft] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (au(
              e,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (t = l.name),
            l.type === "radio" && t != null)
          ) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + Nt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < l.length;
              t++
            ) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var i = a[ft] || null;
                if (!i) throw Error(s(90));
                au(
                  a,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (t = 0; t < l.length; t++)
              (a = l[t]), a.form === e.form && eo(a);
          }
          break e;
        case "textarea":
          lo(e, l.value, l.defaultValue);
          break e;
        case "select":
          (t = l.value), t != null && Ea(e, !!l.multiple, t, !1);
      }
    }
  }
  var su = !1;
  function uo(e, t, l) {
    if (su) return e(t, l);
    su = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((su = !1),
        (Na !== null || ja !== null) &&
          (fr(), Na && ((t = Na), (e = ja), (ja = Na = null), ro(t), e)))
      )
        for (t = 0; t < e.length; t++) ro(e[t]);
    }
  }
  function dn(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[ft] || null;
    if (a === null) return null;
    l = a[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !a);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function") throw Error(s(231, t, typeof l));
    return l;
  }
  var cu = !1;
  if (Pt)
    try {
      var hn = {};
      Object.defineProperty(hn, "passive", {
        get: function () {
          cu = !0;
        },
      }),
        window.addEventListener("test", hn, hn),
        window.removeEventListener("test", hn, hn);
    } catch {
      cu = !1;
    }
  var vl = null,
    ou = null,
    Oi = null;
  function so() {
    if (Oi) return Oi;
    var e,
      t = ou,
      l = t.length,
      a,
      i = "value" in vl ? vl.value : vl.textContent,
      u = i.length;
    for (e = 0; e < l && t[e] === i[e]; e++);
    var f = l - e;
    for (a = 1; a <= f && t[l - a] === i[u - a]; a++);
    return (Oi = i.slice(e, 1 < a ? 1 - a : void 0));
  }
  function Ci(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function zi() {
    return !0;
  }
  function co() {
    return !1;
  }
  function dt(e) {
    function t(l, a, i, u, f) {
      (this._reactName = l),
        (this._targetInst = i),
        (this.type = a),
        (this.nativeEvent = u),
        (this.target = f),
        (this.currentTarget = null);
      for (var p in e)
        e.hasOwnProperty(p) && ((l = e[p]), (this[p] = l ? l(u) : u[p]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? zi
          : co),
        (this.isPropagationStopped = co),
        this
      );
    }
    return (
      le(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = zi));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = zi));
        },
        persist: function () {},
        isPersistent: zi,
      }),
      t
    );
  }
  var Zl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    _i = dt(Zl),
    mn = le({}, Zl, { view: 0, detail: 0 }),
    xg = dt(mn),
    fu,
    du,
    gn,
    Di = le({}, mn, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: mu,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== gn &&
              (gn && e.type === "mousemove"
                ? ((fu = e.screenX - gn.screenX), (du = e.screenY - gn.screenY))
                : (du = fu = 0),
              (gn = e)),
            fu);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : du;
      },
    }),
    oo = dt(Di),
    Sg = le({}, Di, { dataTransfer: 0 }),
    Eg = dt(Sg),
    wg = le({}, mn, { relatedTarget: 0 }),
    hu = dt(wg),
    Ng = le({}, Zl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    jg = dt(Ng),
    Tg = le({}, Zl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Rg = dt(Tg),
    Ag = le({}, Zl, { data: 0 }),
    fo = dt(Ag),
    Og = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Cg = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    zg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function _g(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = zg[e])
      ? !!t[e]
      : !1;
  }
  function mu() {
    return _g;
  }
  var Dg = le({}, mn, {
      key: function (e) {
        if (e.key) {
          var t = Og[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Ci(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
          ? Cg[e.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: mu,
      charCode: function (e) {
        return e.type === "keypress" ? Ci(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Ci(e)
          : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
      },
    }),
    Mg = dt(Dg),
    Ug = le({}, Di, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    ho = dt(Ug),
    Hg = le({}, mn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: mu,
    }),
    Bg = dt(Hg),
    Lg = le({}, Zl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    qg = dt(Lg),
    kg = le({}, Di, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Gg = dt(kg),
    Yg = le({}, Zl, { newState: 0, oldState: 0 }),
    Vg = dt(Yg),
    Xg = [9, 13, 27, 32],
    gu = Pt && "CompositionEvent" in window,
    pn = null;
  Pt && "documentMode" in document && (pn = document.documentMode);
  var Qg = Pt && "TextEvent" in window && !pn,
    mo = Pt && (!gu || (pn && 8 < pn && 11 >= pn)),
    go = " ",
    po = !1;
  function yo(e, t) {
    switch (e) {
      case "keyup":
        return Xg.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function bo(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ta = !1;
  function Zg(e, t) {
    switch (e) {
      case "compositionend":
        return bo(t);
      case "keypress":
        return t.which !== 32 ? null : ((po = !0), go);
      case "textInput":
        return (e = t.data), e === go && po ? null : e;
      default:
        return null;
    }
  }
  function Kg(e, t) {
    if (Ta)
      return e === "compositionend" || (!gu && yo(e, t))
        ? ((e = so()), (Oi = ou = vl = null), (Ta = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return mo && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Jg = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function vo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Jg[e.type] : t === "textarea";
  }
  function xo(e, t, l, a) {
    Na ? (ja ? ja.push(a) : (ja = [a])) : (Na = a),
      (t = pr(t, "onChange")),
      0 < t.length &&
        ((l = new _i("onChange", "change", null, l, a)),
        e.push({ event: l, listeners: t }));
  }
  var yn = null,
    bn = null;
  function $g(e) {
    Kd(e, 0);
  }
  function Mi(e) {
    var t = fn(e);
    if (eo(t)) return e;
  }
  function So(e, t) {
    if (e === "change") return t;
  }
  var Eo = !1;
  if (Pt) {
    var pu;
    if (Pt) {
      var yu = "oninput" in document;
      if (!yu) {
        var wo = document.createElement("div");
        wo.setAttribute("oninput", "return;"),
          (yu = typeof wo.oninput == "function");
      }
      pu = yu;
    } else pu = !1;
    Eo = pu && (!document.documentMode || 9 < document.documentMode);
  }
  function No() {
    yn && (yn.detachEvent("onpropertychange", jo), (bn = yn = null));
  }
  function jo(e) {
    if (e.propertyName === "value" && Mi(bn)) {
      var t = [];
      xo(t, bn, e, uu(e)), uo($g, t);
    }
  }
  function Fg(e, t, l) {
    e === "focusin"
      ? (No(), (yn = t), (bn = l), yn.attachEvent("onpropertychange", jo))
      : e === "focusout" && No();
  }
  function Wg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Mi(bn);
  }
  function Pg(e, t) {
    if (e === "click") return Mi(t);
  }
  function Ig(e, t) {
    if (e === "input" || e === "change") return Mi(t);
  }
  function ep(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var yt = typeof Object.is == "function" ? Object.is : ep;
  function vn(e, t) {
    if (yt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var l = Object.keys(e),
      a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var i = l[a];
      if (!Wr.call(t, i) || !yt(e[i], t[i])) return !1;
    }
    return !0;
  }
  function To(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ro(e, t) {
    var l = To(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = e + l.textContent.length), e <= t && a >= t))
          return { node: l, offset: t - e };
        e = a;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = To(l);
    }
  }
  function Ao(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? Ao(e, t.parentNode)
        : "contains" in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function Oo(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Ri(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Ri(e.document);
    }
    return t;
  }
  function bu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function tp(e, t) {
    var l = Oo(t);
    t = e.focusedElem;
    var a = e.selectionRange;
    if (
      l !== t &&
      t &&
      t.ownerDocument &&
      Ao(t.ownerDocument.documentElement, t)
    ) {
      if (a !== null && bu(t)) {
        if (
          ((e = a.start),
          (l = a.end),
          l === void 0 && (l = e),
          "selectionStart" in t)
        )
          (t.selectionStart = e),
            (t.selectionEnd = Math.min(l, t.value.length));
        else if (
          ((l = ((e = t.ownerDocument || document) && e.defaultView) || window),
          l.getSelection)
        ) {
          l = l.getSelection();
          var i = t.textContent.length,
            u = Math.min(a.start, i);
          (a = a.end === void 0 ? u : Math.min(a.end, i)),
            !l.extend && u > a && ((i = a), (a = u), (u = i)),
            (i = Ro(t, u));
          var f = Ro(t, a);
          i &&
            f &&
            (l.rangeCount !== 1 ||
              l.anchorNode !== i.node ||
              l.anchorOffset !== i.offset ||
              l.focusNode !== f.node ||
              l.focusOffset !== f.offset) &&
            ((e = e.createRange()),
            e.setStart(i.node, i.offset),
            l.removeAllRanges(),
            u > a
              ? (l.addRange(e), l.extend(f.node, f.offset))
              : (e.setEnd(f.node, f.offset), l.addRange(e)));
        }
      }
      for (e = [], l = t; (l = l.parentNode); )
        l.nodeType === 1 &&
          e.push({ element: l, left: l.scrollLeft, top: l.scrollTop });
      for (typeof t.focus == "function" && t.focus(), t = 0; t < e.length; t++)
        (l = e[t]),
          (l.element.scrollLeft = l.left),
          (l.element.scrollTop = l.top);
    }
  }
  var lp = Pt && "documentMode" in document && 11 >= document.documentMode,
    Ra = null,
    vu = null,
    xn = null,
    xu = !1;
  function Co(e, t, l) {
    var a =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    xu ||
      Ra == null ||
      Ra !== Ri(a) ||
      ((a = Ra),
      "selectionStart" in a && bu(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (xn && vn(xn, a)) ||
        ((xn = a),
        (a = pr(vu, "onSelect")),
        0 < a.length &&
          ((t = new _i("onSelect", "select", null, t, l)),
          e.push({ event: t, listeners: a }),
          (t.target = Ra))));
  }
  function Kl(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l["Webkit" + e] = "webkit" + t),
      (l["Moz" + e] = "moz" + t),
      l
    );
  }
  var Aa = {
      animationend: Kl("Animation", "AnimationEnd"),
      animationiteration: Kl("Animation", "AnimationIteration"),
      animationstart: Kl("Animation", "AnimationStart"),
      transitionrun: Kl("Transition", "TransitionRun"),
      transitionstart: Kl("Transition", "TransitionStart"),
      transitioncancel: Kl("Transition", "TransitionCancel"),
      transitionend: Kl("Transition", "TransitionEnd"),
    },
    Su = {},
    zo = {};
  Pt &&
    ((zo = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Aa.animationend.animation,
      delete Aa.animationiteration.animation,
      delete Aa.animationstart.animation),
    "TransitionEvent" in window || delete Aa.transitionend.transition);
  function Jl(e) {
    if (Su[e]) return Su[e];
    if (!Aa[e]) return e;
    var t = Aa[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in zo) return (Su[e] = t[l]);
    return e;
  }
  var _o = Jl("animationend"),
    Do = Jl("animationiteration"),
    Mo = Jl("animationstart"),
    ap = Jl("transitionrun"),
    np = Jl("transitionstart"),
    ip = Jl("transitioncancel"),
    Uo = Jl("transitionend"),
    Ho = new Map(),
    Bo =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
        " "
      );
  function Bt(e, t) {
    Ho.set(e, t), Ql(t, [e]);
  }
  var jt = [],
    Oa = 0,
    Eu = 0;
  function Ui() {
    for (var e = Oa, t = (Eu = Oa = 0); t < e; ) {
      var l = jt[t];
      jt[t++] = null;
      var a = jt[t];
      jt[t++] = null;
      var i = jt[t];
      jt[t++] = null;
      var u = jt[t];
      if (((jt[t++] = null), a !== null && i !== null)) {
        var f = a.pending;
        f === null ? (i.next = i) : ((i.next = f.next), (f.next = i)),
          (a.pending = i);
      }
      u !== 0 && Lo(l, i, u);
    }
  }
  function Hi(e, t, l, a) {
    (jt[Oa++] = e),
      (jt[Oa++] = t),
      (jt[Oa++] = l),
      (jt[Oa++] = a),
      (Eu |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a);
  }
  function wu(e, t, l, a) {
    return Hi(e, t, l, a), Bi(e);
  }
  function xl(e, t) {
    return Hi(e, null, null, t), Bi(e);
  }
  function Lo(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var i = !1, u = e.return; u !== null; )
      (u.childLanes |= l),
        (a = u.alternate),
        a !== null && (a.childLanes |= l),
        u.tag === 22 &&
          ((e = u.stateNode), e === null || e._visibility & 1 || (i = !0)),
        (e = u),
        (u = u.return);
    i &&
      t !== null &&
      e.tag === 3 &&
      ((u = e.stateNode),
      (i = 31 - pt(l)),
      (u = u.hiddenUpdates),
      (e = u[i]),
      e === null ? (u[i] = [t]) : e.push(t),
      (t.lane = l | 536870912));
  }
  function Bi(e) {
    if (50 < Qn) throw ((Qn = 0), (Os = null), Error(s(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ca = {},
    qo = new WeakMap();
  function Tt(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = qo.get(e);
      return l !== void 0
        ? l
        : ((t = { value: e, source: t, stack: ce(t) }), qo.set(e, t), t);
    }
    return { value: e, source: t, stack: ce(t) };
  }
  var za = [],
    _a = 0,
    Li = null,
    qi = 0,
    Rt = [],
    At = 0,
    $l = null,
    el = 1,
    tl = "";
  function Fl(e, t) {
    (za[_a++] = qi), (za[_a++] = Li), (Li = e), (qi = t);
  }
  function ko(e, t, l) {
    (Rt[At++] = el), (Rt[At++] = tl), (Rt[At++] = $l), ($l = e);
    var a = el;
    e = tl;
    var i = 32 - pt(a) - 1;
    (a &= ~(1 << i)), (l += 1);
    var u = 32 - pt(t) + i;
    if (30 < u) {
      var f = i - (i % 5);
      (u = (a & ((1 << f) - 1)).toString(32)),
        (a >>= f),
        (i -= f),
        (el = (1 << (32 - pt(t) + i)) | (l << i) | a),
        (tl = u + e);
    } else (el = (1 << u) | (l << i) | a), (tl = e);
  }
  function Nu(e) {
    e.return !== null && (Fl(e, 1), ko(e, 1, 0));
  }
  function ju(e) {
    for (; e === Li; )
      (Li = za[--_a]), (za[_a] = null), (qi = za[--_a]), (za[_a] = null);
    for (; e === $l; )
      ($l = Rt[--At]),
        (Rt[At] = null),
        (tl = Rt[--At]),
        (Rt[At] = null),
        (el = Rt[--At]),
        (Rt[At] = null);
  }
  var ct = null,
    tt = null,
    Ne = !1,
    Lt = null,
    Xt = !1,
    Tu = Error(s(519));
  function Wl(e) {
    var t = Error(s(418, ""));
    throw (wn(Tt(t, e)), Tu);
  }
  function Go(e) {
    var t = e.stateNode,
      l = e.type,
      a = e.memoizedProps;
    switch (((t[it] = e), (t[ft] = a), l)) {
      case "dialog":
        Ee("cancel", t), Ee("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ee("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Kn.length; l++) Ee(Kn[l], t);
        break;
      case "source":
        Ee("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ee("error", t), Ee("load", t);
        break;
      case "details":
        Ee("toggle", t);
        break;
      case "input":
        Ee("invalid", t),
          to(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          ),
          Ti(t);
        break;
      case "select":
        Ee("invalid", t);
        break;
      case "textarea":
        Ee("invalid", t), ao(t, a.value, a.defaultValue, a.children), Ti(t);
    }
    (l = a.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      t.textContent === "" + l ||
      a.suppressHydrationWarning === !0 ||
      Wd(t.textContent, l)
        ? (a.popover != null && (Ee("beforetoggle", t), Ee("toggle", t)),
          a.onScroll != null && Ee("scroll", t),
          a.onScrollEnd != null && Ee("scrollend", t),
          a.onClick != null && (t.onclick = yr),
          (t = !0))
        : (t = !1),
      t || Wl(e);
  }
  function Yo(e) {
    for (ct = e.return; ct; )
      switch (ct.tag) {
        case 3:
        case 27:
          Xt = !0;
          return;
        case 5:
        case 13:
          Xt = !1;
          return;
        default:
          ct = ct.return;
      }
  }
  function Sn(e) {
    if (e !== ct) return !1;
    if (!Ne) return Yo(e), (Ne = !0), !1;
    var t = !1,
      l;
    if (
      ((l = e.tag !== 3 && e.tag !== 27) &&
        ((l = e.tag === 5) &&
          ((l = e.type),
          (l =
            !(l !== "form" && l !== "button") || Zs(e.type, e.memoizedProps))),
        (l = !l)),
      l && (t = !0),
      t && tt && Wl(e),
      Yo(e),
      e.tag === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((l = e.data), l === "/$")) {
              if (t === 0) {
                tt = kt(e.nextSibling);
                break e;
              }
              t--;
            } else (l !== "$" && l !== "$!" && l !== "$?") || t++;
          e = e.nextSibling;
        }
        tt = null;
      }
    } else tt = ct ? kt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function En() {
    (tt = ct = null), (Ne = !1);
  }
  function wn(e) {
    Lt === null ? (Lt = [e]) : Lt.push(e);
  }
  var Nn = Error(s(460)),
    Vo = Error(s(474)),
    Ru = { then: function () {} };
  function Xo(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected";
  }
  function ki() {}
  function Qo(e, t, l) {
    switch (
      ((l = e[l]),
      l === void 0 ? e.push(t) : l !== t && (t.then(ki, ki), (t = l)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), e === Nn ? Error(s(483)) : e);
      default:
        if (typeof t.status == "string") t.then(ki, ki);
        else {
          if (((e = Ce), e !== null && 100 < e.shellSuspendCounter))
            throw Error(s(482));
          (e = t),
            (e.status = "pending"),
            e.then(
              function (a) {
                if (t.status === "pending") {
                  var i = t;
                  (i.status = "fulfilled"), (i.value = a);
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var i = t;
                  (i.status = "rejected"), (i.reason = a);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), e === Nn ? Error(s(483)) : e);
        }
        throw ((jn = t), Nn);
    }
  }
  var jn = null;
  function Zo() {
    if (jn === null) throw Error(s(459));
    var e = jn;
    return (jn = null), e;
  }
  var Da = null,
    Tn = 0;
  function Gi(e) {
    var t = Tn;
    return (Tn += 1), Da === null && (Da = []), Qo(Da, e, t);
  }
  function Rn(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function Yi(e, t) {
    throw t.$$typeof === h
      ? Error(s(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          s(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function Ko(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Jo(e) {
    function t(A, w) {
      if (e) {
        var z = A.deletions;
        z === null ? ((A.deletions = [w]), (A.flags |= 16)) : z.push(w);
      }
    }
    function l(A, w) {
      if (!e) return null;
      for (; w !== null; ) t(A, w), (w = w.sibling);
      return null;
    }
    function a(A) {
      for (var w = new Map(); A !== null; )
        A.key !== null ? w.set(A.key, A) : w.set(A.index, A), (A = A.sibling);
      return w;
    }
    function i(A, w) {
      return (A = _l(A, w)), (A.index = 0), (A.sibling = null), A;
    }
    function u(A, w, z) {
      return (
        (A.index = z),
        e
          ? ((z = A.alternate),
            z !== null
              ? ((z = z.index), z < w ? ((A.flags |= 33554434), w) : z)
              : ((A.flags |= 33554434), w))
          : ((A.flags |= 1048576), w)
      );
    }
    function f(A) {
      return e && A.alternate === null && (A.flags |= 33554434), A;
    }
    function p(A, w, z, q) {
      return w === null || w.tag !== 6
        ? ((w = Ss(z, A.mode, q)), (w.return = A), w)
        : ((w = i(w, z)), (w.return = A), w);
    }
    function x(A, w, z, q) {
      var I = z.type;
      return I === y
        ? L(A, w, z.props.children, q, z.key)
        : w !== null &&
          (w.elementType === I ||
            (typeof I == "object" &&
              I !== null &&
              I.$$typeof === X &&
              Ko(I) === w.type))
        ? ((w = i(w, z.props)), Rn(w, z), (w.return = A), w)
        : ((w = rr(z.type, z.key, z.props, null, A.mode, q)),
          Rn(w, z),
          (w.return = A),
          w);
    }
    function j(A, w, z, q) {
      return w === null ||
        w.tag !== 4 ||
        w.stateNode.containerInfo !== z.containerInfo ||
        w.stateNode.implementation !== z.implementation
        ? ((w = Es(z, A.mode, q)), (w.return = A), w)
        : ((w = i(w, z.children || [])), (w.return = A), w);
    }
    function L(A, w, z, q, I) {
      return w === null || w.tag !== 7
        ? ((w = ua(z, A.mode, q, I)), (w.return = A), w)
        : ((w = i(w, z)), (w.return = A), w);
    }
    function k(A, w, z) {
      if (
        (typeof w == "string" && w !== "") ||
        typeof w == "number" ||
        typeof w == "bigint"
      )
        return (w = Ss("" + w, A.mode, z)), (w.return = A), w;
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case m:
            return (
              (z = rr(w.type, w.key, w.props, null, A.mode, z)),
              Rn(z, w),
              (z.return = A),
              z
            );
          case b:
            return (w = Es(w, A.mode, z)), (w.return = A), w;
          case X:
            var q = w._init;
            return (w = q(w._payload)), k(A, w, z);
        }
        if (ne(w) || U(w))
          return (w = ua(w, A.mode, z, null)), (w.return = A), w;
        if (typeof w.then == "function") return k(A, Gi(w), z);
        if (w.$$typeof === T) return k(A, ar(A, w), z);
        Yi(A, w);
      }
      return null;
    }
    function D(A, w, z, q) {
      var I = w !== null ? w.key : null;
      if (
        (typeof z == "string" && z !== "") ||
        typeof z == "number" ||
        typeof z == "bigint"
      )
        return I !== null ? null : p(A, w, "" + z, q);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case m:
            return z.key === I ? x(A, w, z, q) : null;
          case b:
            return z.key === I ? j(A, w, z, q) : null;
          case X:
            return (I = z._init), (z = I(z._payload)), D(A, w, z, q);
        }
        if (ne(z) || U(z)) return I !== null ? null : L(A, w, z, q, null);
        if (typeof z.then == "function") return D(A, w, Gi(z), q);
        if (z.$$typeof === T) return D(A, w, ar(A, z), q);
        Yi(A, z);
      }
      return null;
    }
    function B(A, w, z, q, I) {
      if (
        (typeof q == "string" && q !== "") ||
        typeof q == "number" ||
        typeof q == "bigint"
      )
        return (A = A.get(z) || null), p(w, A, "" + q, I);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case m:
            return (
              (A = A.get(q.key === null ? z : q.key) || null), x(w, A, q, I)
            );
          case b:
            return (
              (A = A.get(q.key === null ? z : q.key) || null), j(w, A, q, I)
            );
          case X:
            var ve = q._init;
            return (q = ve(q._payload)), B(A, w, z, q, I);
        }
        if (ne(q) || U(q)) return (A = A.get(z) || null), L(w, A, q, I, null);
        if (typeof q.then == "function") return B(A, w, z, Gi(q), I);
        if (q.$$typeof === T) return B(A, w, z, ar(w, q), I);
        Yi(w, q);
      }
      return null;
    }
    function ae(A, w, z, q) {
      for (
        var I = null, ve = null, ie = w, se = (w = 0), Ie = null;
        ie !== null && se < z.length;
        se++
      ) {
        ie.index > se ? ((Ie = ie), (ie = null)) : (Ie = ie.sibling);
        var je = D(A, ie, z[se], q);
        if (je === null) {
          ie === null && (ie = Ie);
          break;
        }
        e && ie && je.alternate === null && t(A, ie),
          (w = u(je, w, se)),
          ve === null ? (I = je) : (ve.sibling = je),
          (ve = je),
          (ie = Ie);
      }
      if (se === z.length) return l(A, ie), Ne && Fl(A, se), I;
      if (ie === null) {
        for (; se < z.length; se++)
          (ie = k(A, z[se], q)),
            ie !== null &&
              ((w = u(ie, w, se)),
              ve === null ? (I = ie) : (ve.sibling = ie),
              (ve = ie));
        return Ne && Fl(A, se), I;
      }
      for (ie = a(ie); se < z.length; se++)
        (Ie = B(ie, A, se, z[se], q)),
          Ie !== null &&
            (e &&
              Ie.alternate !== null &&
              ie.delete(Ie.key === null ? se : Ie.key),
            (w = u(Ie, w, se)),
            ve === null ? (I = Ie) : (ve.sibling = Ie),
            (ve = Ie));
      return (
        e &&
          ie.forEach(function (ql) {
            return t(A, ql);
          }),
        Ne && Fl(A, se),
        I
      );
    }
    function fe(A, w, z, q) {
      if (z == null) throw Error(s(151));
      for (
        var I = null, ve = null, ie = w, se = (w = 0), Ie = null, je = z.next();
        ie !== null && !je.done;
        se++, je = z.next()
      ) {
        ie.index > se ? ((Ie = ie), (ie = null)) : (Ie = ie.sibling);
        var ql = D(A, ie, je.value, q);
        if (ql === null) {
          ie === null && (ie = Ie);
          break;
        }
        e && ie && ql.alternate === null && t(A, ie),
          (w = u(ql, w, se)),
          ve === null ? (I = ql) : (ve.sibling = ql),
          (ve = ql),
          (ie = Ie);
      }
      if (je.done) return l(A, ie), Ne && Fl(A, se), I;
      if (ie === null) {
        for (; !je.done; se++, je = z.next())
          (je = k(A, je.value, q)),
            je !== null &&
              ((w = u(je, w, se)),
              ve === null ? (I = je) : (ve.sibling = je),
              (ve = je));
        return Ne && Fl(A, se), I;
      }
      for (ie = a(ie); !je.done; se++, je = z.next())
        (je = B(ie, A, se, je.value, q)),
          je !== null &&
            (e &&
              je.alternate !== null &&
              ie.delete(je.key === null ? se : je.key),
            (w = u(je, w, se)),
            ve === null ? (I = je) : (ve.sibling = je),
            (ve = je));
      return (
        e &&
          ie.forEach(function (vy) {
            return t(A, vy);
          }),
        Ne && Fl(A, se),
        I
      );
    }
    function qe(A, w, z, q) {
      if (
        (typeof z == "object" &&
          z !== null &&
          z.type === y &&
          z.key === null &&
          (z = z.props.children),
        typeof z == "object" && z !== null)
      ) {
        switch (z.$$typeof) {
          case m:
            e: {
              for (var I = z.key; w !== null; ) {
                if (w.key === I) {
                  if (((I = z.type), I === y)) {
                    if (w.tag === 7) {
                      l(A, w.sibling),
                        (q = i(w, z.props.children)),
                        (q.return = A),
                        (A = q);
                      break e;
                    }
                  } else if (
                    w.elementType === I ||
                    (typeof I == "object" &&
                      I !== null &&
                      I.$$typeof === X &&
                      Ko(I) === w.type)
                  ) {
                    l(A, w.sibling),
                      (q = i(w, z.props)),
                      Rn(q, z),
                      (q.return = A),
                      (A = q);
                    break e;
                  }
                  l(A, w);
                  break;
                } else t(A, w);
                w = w.sibling;
              }
              z.type === y
                ? ((q = ua(z.props.children, A.mode, q, z.key)),
                  (q.return = A),
                  (A = q))
                : ((q = rr(z.type, z.key, z.props, null, A.mode, q)),
                  Rn(q, z),
                  (q.return = A),
                  (A = q));
            }
            return f(A);
          case b:
            e: {
              for (I = z.key; w !== null; ) {
                if (w.key === I)
                  if (
                    w.tag === 4 &&
                    w.stateNode.containerInfo === z.containerInfo &&
                    w.stateNode.implementation === z.implementation
                  ) {
                    l(A, w.sibling),
                      (q = i(w, z.children || [])),
                      (q.return = A),
                      (A = q);
                    break e;
                  } else {
                    l(A, w);
                    break;
                  }
                else t(A, w);
                w = w.sibling;
              }
              (q = Es(z, A.mode, q)), (q.return = A), (A = q);
            }
            return f(A);
          case X:
            return (I = z._init), (z = I(z._payload)), qe(A, w, z, q);
        }
        if (ne(z)) return ae(A, w, z, q);
        if (U(z)) {
          if (((I = U(z)), typeof I != "function")) throw Error(s(150));
          return (z = I.call(z)), fe(A, w, z, q);
        }
        if (typeof z.then == "function") return qe(A, w, Gi(z), q);
        if (z.$$typeof === T) return qe(A, w, ar(A, z), q);
        Yi(A, z);
      }
      return (typeof z == "string" && z !== "") ||
        typeof z == "number" ||
        typeof z == "bigint"
        ? ((z = "" + z),
          w !== null && w.tag === 6
            ? (l(A, w.sibling), (q = i(w, z)), (q.return = A), (A = q))
            : (l(A, w), (q = Ss(z, A.mode, q)), (q.return = A), (A = q)),
          f(A))
        : l(A, w);
    }
    return function (A, w, z, q) {
      try {
        Tn = 0;
        var I = qe(A, w, z, q);
        return (Da = null), I;
      } catch (ie) {
        if (ie === Nn) throw ie;
        var ve = _t(29, ie, null, A.mode);
        return (ve.lanes = q), (ve.return = A), ve;
      } finally {
      }
    };
  }
  var Pl = Jo(!0),
    $o = Jo(!1),
    Ma = $(null),
    Vi = $(0);
  function Fo(e, t) {
    (e = dl), de(Vi, e), de(Ma, t), (dl = e | t.baseLanes);
  }
  function Au() {
    de(Vi, dl), de(Ma, Ma.current);
  }
  function Ou() {
    (dl = Vi.current), pe(Ma), pe(Vi);
  }
  var Ot = $(null),
    Qt = null;
  function Sl(e) {
    var t = e.alternate;
    de(Je, Je.current & 1),
      de(Ot, e),
      Qt === null &&
        (t === null || Ma.current !== null || t.memoizedState !== null) &&
        (Qt = e);
  }
  function Wo(e) {
    if (e.tag === 22) {
      if ((de(Je, Je.current), de(Ot, e), Qt === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Qt = e);
      }
    } else El();
  }
  function El() {
    de(Je, Je.current), de(Ot, Ot.current);
  }
  function ll(e) {
    pe(Ot), Qt === e && (Qt = null), pe(Je);
  }
  var Je = $(0);
  function Xi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (
          l !== null &&
          ((l = l.dehydrated), l === null || l.data === "$?" || l.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var rp =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (l) {
                  return l();
                });
            };
          },
    up = n.unstable_scheduleCallback,
    sp = n.unstable_NormalPriority,
    $e = {
      $$typeof: T,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Cu() {
    return { controller: new rp(), data: new Map(), refCount: 0 };
  }
  function An(e) {
    e.refCount--,
      e.refCount === 0 &&
        up(sp, function () {
          e.controller.abort();
        });
  }
  var On = null,
    zu = 0,
    Ua = 0,
    Ha = null;
  function cp(e, t) {
    if (On === null) {
      var l = (On = []);
      (zu = 0),
        (Ua = Bs()),
        (Ha = {
          status: "pending",
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        });
    }
    return zu++, t.then(Po, Po), t;
  }
  function Po() {
    if (--zu === 0 && On !== null) {
      Ha !== null && (Ha.status = "fulfilled");
      var e = On;
      (On = null), (Ua = 0), (Ha = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function op(e, t) {
    var l = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (i) {
          l.push(i);
        },
      };
    return (
      e.then(
        function () {
          (a.status = "fulfilled"), (a.value = t);
          for (var i = 0; i < l.length; i++) (0, l[i])(t);
        },
        function (i) {
          for (a.status = "rejected", a.reason = i, i = 0; i < l.length; i++)
            (0, l[i])(void 0);
        }
      ),
      a
    );
  }
  var Io = Z.S;
  Z.S = function (e, t) {
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      cp(e, t),
      Io !== null && Io(e, t);
  };
  var Il = $(null);
  function _u() {
    var e = Il.current;
    return e !== null ? e : Ce.pooledCache;
  }
  function Qi(e, t) {
    t === null ? de(Il, Il.current) : de(Il, t.pool);
  }
  function ef() {
    var e = _u();
    return e === null ? null : { parent: $e._currentValue, pool: e };
  }
  var wl = 0,
    be = null,
    Re = null,
    Ve = null,
    Zi = !1,
    Ba = !1,
    ea = !1,
    Ki = 0,
    Cn = 0,
    La = null,
    fp = 0;
  function Ye() {
    throw Error(s(321));
  }
  function Du(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!yt(e[l], t[l])) return !1;
    return !0;
  }
  function Mu(e, t, l, a, i, u) {
    return (
      (wl = u),
      (be = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (Z.H = e === null || e.memoizedState === null ? ta : Nl),
      (ea = !1),
      (u = l(a, i)),
      (ea = !1),
      Ba && (u = lf(t, l, a, i)),
      tf(e),
      u
    );
  }
  function tf(e) {
    Z.H = Zt;
    var t = Re !== null && Re.next !== null;
    if (((wl = 0), (Ve = Re = be = null), (Zi = !1), (Cn = 0), (La = null), t))
      throw Error(s(300));
    e === null ||
      We ||
      ((e = e.dependencies), e !== null && lr(e) && (We = !0));
  }
  function lf(e, t, l, a) {
    be = e;
    var i = 0;
    do {
      if ((Ba && (La = null), (Cn = 0), (Ba = !1), 25 <= i))
        throw Error(s(301));
      if (((i += 1), (Ve = Re = null), e.updateQueue != null)) {
        var u = e.updateQueue;
        (u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0);
      }
      (Z.H = la), (u = t(l, a));
    } while (Ba);
    return u;
  }
  function dp() {
    var e = Z.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? zn(t) : t),
      (e = e.useState()[0]),
      (Re !== null ? Re.memoizedState : null) !== e && (be.flags |= 1024),
      t
    );
  }
  function Uu() {
    var e = Ki !== 0;
    return (Ki = 0), e;
  }
  function Hu(e, t, l) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l);
  }
  function Bu(e) {
    if (Zi) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      Zi = !1;
    }
    (wl = 0), (Ve = Re = be = null), (Ba = !1), (Cn = Ki = 0), (La = null);
  }
  function ht() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Ve === null ? (be.memoizedState = Ve = e) : (Ve = Ve.next = e), Ve;
  }
  function Xe() {
    if (Re === null) {
      var e = be.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Re.next;
    var t = Ve === null ? be.memoizedState : Ve.next;
    if (t !== null) (Ve = t), (Re = e);
    else {
      if (e === null)
        throw be.alternate === null ? Error(s(467)) : Error(s(310));
      (Re = e),
        (e = {
          memoizedState: Re.memoizedState,
          baseState: Re.baseState,
          baseQueue: Re.baseQueue,
          queue: Re.queue,
          next: null,
        }),
        Ve === null ? (be.memoizedState = Ve = e) : (Ve = Ve.next = e);
    }
    return Ve;
  }
  var Ji;
  Ji = function () {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  };
  function zn(e) {
    var t = Cn;
    return (
      (Cn += 1),
      La === null && (La = []),
      (e = Qo(La, e, t)),
      (t = be),
      (Ve === null ? t.memoizedState : Ve.next) === null &&
        ((t = t.alternate),
        (Z.H = t === null || t.memoizedState === null ? ta : Nl)),
      e
    );
  }
  function $i(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return zn(e);
      if (e.$$typeof === T) return rt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Lu(e) {
    var t = null,
      l = be.updateQueue;
    if ((l !== null && (t = l.memoCache), t == null)) {
      var a = be.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (i) {
                return i.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = Ji()), (be.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = J;
    return t.index++, l;
  }
  function al(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Fi(e) {
    var t = Xe();
    return qu(t, Re, e);
  }
  function qu(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = l;
    var i = e.baseQueue,
      u = a.pending;
    if (u !== null) {
      if (i !== null) {
        var f = i.next;
        (i.next = u.next), (u.next = f);
      }
      (t.baseQueue = i = u), (a.pending = null);
    }
    if (((u = e.baseState), i === null)) e.memoizedState = u;
    else {
      t = i.next;
      var p = (f = null),
        x = null,
        j = t,
        L = !1;
      do {
        var k = j.lane & -536870913;
        if (k !== j.lane ? (we & k) === k : (wl & k) === k) {
          var D = j.revertLane;
          if (D === 0)
            x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: j.action,
                  hasEagerState: j.hasEagerState,
                  eagerState: j.eagerState,
                  next: null,
                }),
              k === Ua && (L = !0);
          else if ((wl & D) === D) {
            (j = j.next), D === Ua && (L = !0);
            continue;
          } else
            (k = {
              lane: 0,
              revertLane: j.revertLane,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null,
            }),
              x === null ? ((p = x = k), (f = u)) : (x = x.next = k),
              (be.lanes |= D),
              (Dl |= D);
          (k = j.action),
            ea && l(u, k),
            (u = j.hasEagerState ? j.eagerState : l(u, k));
        } else
          (D = {
            lane: k,
            revertLane: j.revertLane,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null,
          }),
            x === null ? ((p = x = D), (f = u)) : (x = x.next = D),
            (be.lanes |= k),
            (Dl |= k);
        j = j.next;
      } while (j !== null && j !== t);
      if (
        (x === null ? (f = u) : (x.next = p),
        !yt(u, e.memoizedState) && ((We = !0), L && ((l = Ha), l !== null)))
      )
        throw l;
      (e.memoizedState = u),
        (e.baseState = f),
        (e.baseQueue = x),
        (a.lastRenderedState = u);
    }
    return i === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function ku(e) {
    var t = Xe(),
      l = t.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch,
      i = l.pending,
      u = t.memoizedState;
    if (i !== null) {
      l.pending = null;
      var f = (i = i.next);
      do (u = e(u, f.action)), (f = f.next);
      while (f !== i);
      yt(u, t.memoizedState) || (We = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (l.lastRenderedState = u);
    }
    return [u, a];
  }
  function af(e, t, l) {
    var a = be,
      i = Xe(),
      u = Ne;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = t();
    var f = !yt((Re || i).memoizedState, l);
    if (
      (f && ((i.memoizedState = l), (We = !0)),
      (i = i.queue),
      Vu(uf.bind(null, a, i, e), [e]),
      i.getSnapshot !== t || f || (Ve !== null && Ve.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        qa(9, rf.bind(null, a, i, l, t), { destroy: void 0 }, null),
        Ce === null)
      )
        throw Error(s(349));
      u || (wl & 60) !== 0 || nf(a, t, l);
    }
    return l;
  }
  function nf(e, t, l) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = be.updateQueue),
      t === null
        ? ((t = Ji()), (be.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e));
  }
  function rf(e, t, l, a) {
    (t.value = l), (t.getSnapshot = a), sf(t) && cf(e);
  }
  function uf(e, t, l) {
    return l(function () {
      sf(t) && cf(e);
    });
  }
  function sf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !yt(e, l);
    } catch {
      return !0;
    }
  }
  function cf(e) {
    var t = xl(e, 2);
    t !== null && ot(t, e, 2);
  }
  function Gu(e) {
    var t = ht();
    if (typeof e == "function") {
      var l = e;
      if (((e = l()), ea)) {
        yl(!0);
        try {
          l();
        } finally {
          yl(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: al,
        lastRenderedState: e,
      }),
      t
    );
  }
  function of(e, t, l, a) {
    return (e.baseState = l), qu(e, Re, typeof a == "function" ? a : al);
  }
  function hp(e, t, l, a, i) {
    if (Ii(e)) throw Error(s(485));
    if (((e = t.action), e !== null)) {
      var u = {
        payload: i,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          u.listeners.push(f);
        },
      };
      Z.T !== null ? l(!0) : (u.isTransition = !1),
        a(u),
        (l = t.pending),
        l === null
          ? ((u.next = t.pending = u), ff(t, u))
          : ((u.next = l.next), (t.pending = l.next = u));
    }
  }
  function ff(e, t) {
    var l = t.action,
      a = t.payload,
      i = e.state;
    if (t.isTransition) {
      var u = Z.T,
        f = {};
      Z.T = f;
      try {
        var p = l(i, a),
          x = Z.S;
        x !== null && x(f, p), df(e, t, p);
      } catch (j) {
        Yu(e, t, j);
      } finally {
        Z.T = u;
      }
    } else
      try {
        (u = l(i, a)), df(e, t, u);
      } catch (j) {
        Yu(e, t, j);
      }
  }
  function df(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (a) {
            hf(e, t, a);
          },
          function (a) {
            return Yu(e, t, a);
          }
        )
      : hf(e, t, l);
  }
  function hf(e, t, l) {
    (t.status = "fulfilled"),
      (t.value = l),
      mf(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next),
        l === t ? (e.pending = null) : ((l = l.next), (t.next = l), ff(e, l)));
  }
  function Yu(e, t, l) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do (t.status = "rejected"), (t.reason = l), mf(t), (t = t.next);
      while (t !== a);
    }
    e.action = null;
  }
  function mf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function gf(e, t) {
    return t;
  }
  function pf(e, t) {
    if (Ne) {
      var l = Ce.formState;
      if (l !== null) {
        e: {
          var a = be;
          if (Ne) {
            if (tt) {
              t: {
                for (var i = tt, u = Xt; i.nodeType !== 8; ) {
                  if (!u) {
                    i = null;
                    break t;
                  }
                  if (((i = kt(i.nextSibling)), i === null)) {
                    i = null;
                    break t;
                  }
                }
                (u = i.data), (i = u === "F!" || u === "F" ? i : null);
              }
              if (i) {
                (tt = kt(i.nextSibling)), (a = i.data === "F!");
                break e;
              }
            }
            Wl(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return (
      (l = ht()),
      (l.memoizedState = l.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: gf,
        lastRenderedState: t,
      }),
      (l.queue = a),
      (l = Mf.bind(null, be, a)),
      (a.dispatch = l),
      (a = Gu(!1)),
      (u = Ju.bind(null, be, !1, a.queue)),
      (a = ht()),
      (i = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = i),
      (l = hp.bind(null, be, i, u, l)),
      (i.dispatch = l),
      (a.memoizedState = e),
      [t, l, !1]
    );
  }
  function yf(e) {
    var t = Xe();
    return bf(t, Re, e);
  }
  function bf(e, t, l) {
    (t = qu(e, t, gf)[0]),
      (e = Fi(al)[0]),
      (t =
        typeof t == "object" && t !== null && typeof t.then == "function"
          ? zn(t)
          : t);
    var a = Xe(),
      i = a.queue,
      u = i.dispatch;
    return (
      l !== a.memoizedState &&
        ((be.flags |= 2048),
        qa(9, mp.bind(null, i, l), { destroy: void 0 }, null)),
      [t, u, e]
    );
  }
  function mp(e, t) {
    e.action = t;
  }
  function vf(e) {
    var t = Xe(),
      l = Re;
    if (l !== null) return bf(t, l, e);
    Xe(), (t = t.memoizedState), (l = Xe());
    var a = l.queue.dispatch;
    return (l.memoizedState = e), [t, a, !1];
  }
  function qa(e, t, l, a) {
    return (
      (e = { tag: e, create: t, inst: l, deps: a, next: null }),
      (t = be.updateQueue),
      t === null && ((t = Ji()), (be.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function xf() {
    return Xe().memoizedState;
  }
  function Wi(e, t, l, a) {
    var i = ht();
    (be.flags |= e),
      (i.memoizedState = qa(
        1 | t,
        l,
        { destroy: void 0 },
        a === void 0 ? null : a
      ));
  }
  function Pi(e, t, l, a) {
    var i = Xe();
    a = a === void 0 ? null : a;
    var u = i.memoizedState.inst;
    Re !== null && a !== null && Du(a, Re.memoizedState.deps)
      ? (i.memoizedState = qa(t, l, u, a))
      : ((be.flags |= e), (i.memoizedState = qa(1 | t, l, u, a)));
  }
  function Sf(e, t) {
    Wi(8390656, 8, e, t);
  }
  function Vu(e, t) {
    Pi(2048, 8, e, t);
  }
  function Ef(e, t) {
    return Pi(4, 2, e, t);
  }
  function wf(e, t) {
    return Pi(4, 4, e, t);
  }
  function Nf(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function () {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function jf(e, t, l) {
    (l = l != null ? l.concat([e]) : null), Pi(4, 4, Nf.bind(null, t, e), l);
  }
  function Xu() {}
  function Tf(e, t) {
    var l = Xe();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && Du(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e);
  }
  function Rf(e, t) {
    var l = Xe();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && Du(t, a[1])) return a[0];
    if (((a = e()), ea)) {
      yl(!0);
      try {
        e();
      } finally {
        yl(!1);
      }
    }
    return (l.memoizedState = [a, t]), a;
  }
  function Qu(e, t, l) {
    return l === void 0 || (wl & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = Od()), (be.lanes |= e), (Dl |= e), l);
  }
  function Af(e, t, l, a) {
    return yt(l, t)
      ? l
      : Ma.current !== null
      ? ((e = Qu(e, l, a)), yt(e, t) || (We = !0), e)
      : (wl & 42) === 0
      ? ((We = !0), (e.memoizedState = l))
      : ((e = Od()), (be.lanes |= e), (Dl |= e), t);
  }
  function Of(e, t, l, a, i) {
    var u = W.p;
    W.p = u !== 0 && 8 > u ? u : 8;
    var f = Z.T,
      p = {};
    (Z.T = p), Ju(e, !1, t, l);
    try {
      var x = i(),
        j = Z.S;
      if (
        (j !== null && j(p, x),
        x !== null && typeof x == "object" && typeof x.then == "function")
      ) {
        var L = op(x, a);
        _n(e, t, L, St(e));
      } else _n(e, t, a, St(e));
    } catch (k) {
      _n(e, t, { then: function () {}, status: "rejected", reason: k }, St());
    } finally {
      (W.p = u), (Z.T = f);
    }
  }
  function gp() {}
  function Zu(e, t, l, a) {
    if (e.tag !== 5) throw Error(s(476));
    var i = Cf(e).queue;
    Of(
      e,
      i,
      t,
      ge,
      l === null
        ? gp
        : function () {
            return zf(e), l(a);
          }
    );
  }
  function Cf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ge,
      baseState: ge,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: al,
        lastRenderedState: ge,
      },
      next: null,
    };
    var l = {};
    return (
      (t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: al,
          lastRenderedState: l,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function zf(e) {
    var t = Cf(e).next.queue;
    _n(e, t, {}, St());
  }
  function Ku() {
    return rt(Pn);
  }
  function _f() {
    return Xe().memoizedState;
  }
  function Df() {
    return Xe().memoizedState;
  }
  function pp(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = St();
          e = Rl(l);
          var a = Al(t, e, l);
          a !== null && (ot(a, t, l), Un(a, t, l)),
            (t = { cache: Cu() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function yp(e, t, l) {
    var a = St();
    (l = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ii(e)
        ? Uf(t, l)
        : ((l = wu(e, t, l, a)), l !== null && (ot(l, e, a), Hf(l, t, a)));
  }
  function Mf(e, t, l) {
    var a = St();
    _n(e, t, l, a);
  }
  function _n(e, t, l, a) {
    var i = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ii(e)) Uf(t, i);
    else {
      var u = e.alternate;
      if (
        e.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var f = t.lastRenderedState,
            p = u(f, l);
          if (((i.hasEagerState = !0), (i.eagerState = p), yt(p, f)))
            return Hi(e, t, i, 0), Ce === null && Ui(), !1;
        } catch {
        } finally {
        }
      if (((l = wu(e, t, i, a)), l !== null))
        return ot(l, e, a), Hf(l, t, a), !0;
    }
    return !1;
  }
  function Ju(e, t, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Bs(),
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ii(e))
    ) {
      if (t) throw Error(s(479));
    } else (t = wu(e, l, a, 2)), t !== null && ot(t, e, 2);
  }
  function Ii(e) {
    var t = e.alternate;
    return e === be || (t !== null && t === be);
  }
  function Uf(e, t) {
    Ba = Zi = !0;
    var l = e.pending;
    l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (e.pending = t);
  }
  function Hf(e, t, l) {
    if ((l & 4194176) !== 0) {
      var a = t.lanes;
      (a &= e.pendingLanes), (l |= a), (t.lanes = l), Qc(e, l);
    }
  }
  var Zt = {
    readContext: rt,
    use: $i,
    useCallback: Ye,
    useContext: Ye,
    useEffect: Ye,
    useImperativeHandle: Ye,
    useLayoutEffect: Ye,
    useInsertionEffect: Ye,
    useMemo: Ye,
    useReducer: Ye,
    useRef: Ye,
    useState: Ye,
    useDebugValue: Ye,
    useDeferredValue: Ye,
    useTransition: Ye,
    useSyncExternalStore: Ye,
    useId: Ye,
  };
  (Zt.useCacheRefresh = Ye),
    (Zt.useMemoCache = Ye),
    (Zt.useHostTransitionStatus = Ye),
    (Zt.useFormState = Ye),
    (Zt.useActionState = Ye),
    (Zt.useOptimistic = Ye);
  var ta = {
    readContext: rt,
    use: $i,
    useCallback: function (e, t) {
      return (ht().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: rt,
    useEffect: Sf,
    useImperativeHandle: function (e, t, l) {
      (l = l != null ? l.concat([e]) : null),
        Wi(4194308, 4, Nf.bind(null, t, e), l);
    },
    useLayoutEffect: function (e, t) {
      return Wi(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      Wi(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var l = ht();
      t = t === void 0 ? null : t;
      var a = e();
      if (ea) {
        yl(!0);
        try {
          e();
        } finally {
          yl(!1);
        }
      }
      return (l.memoizedState = [a, t]), a;
    },
    useReducer: function (e, t, l) {
      var a = ht();
      if (l !== void 0) {
        var i = l(t);
        if (ea) {
          yl(!0);
          try {
            l(t);
          } finally {
            yl(!1);
          }
        }
      } else i = t;
      return (
        (a.memoizedState = a.baseState = i),
        (e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: i,
        }),
        (a.queue = e),
        (e = e.dispatch = yp.bind(null, be, e)),
        [a.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = ht();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: function (e) {
      e = Gu(e);
      var t = e.queue,
        l = Mf.bind(null, be, t);
      return (t.dispatch = l), [e.memoizedState, l];
    },
    useDebugValue: Xu,
    useDeferredValue: function (e, t) {
      var l = ht();
      return Qu(l, e, t);
    },
    useTransition: function () {
      var e = Gu(!1);
      return (
        (e = Of.bind(null, be, e.queue, !0, !1)),
        (ht().memoizedState = e),
        [!1, e]
      );
    },
    useSyncExternalStore: function (e, t, l) {
      var a = be,
        i = ht();
      if (Ne) {
        if (l === void 0) throw Error(s(407));
        l = l();
      } else {
        if (((l = t()), Ce === null)) throw Error(s(349));
        (we & 60) !== 0 || nf(a, t, l);
      }
      i.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return (
        (i.queue = u),
        Sf(uf.bind(null, a, u, e), [e]),
        (a.flags |= 2048),
        qa(9, rf.bind(null, a, u, l, t), { destroy: void 0 }, null),
        l
      );
    },
    useId: function () {
      var e = ht(),
        t = Ce.identifierPrefix;
      if (Ne) {
        var l = tl,
          a = el;
        (l = (a & ~(1 << (32 - pt(a) - 1))).toString(32) + l),
          (t = ":" + t + "R" + l),
          (l = Ki++),
          0 < l && (t += "H" + l.toString(32)),
          (t += ":");
      } else (l = fp++), (t = ":" + t + "r" + l.toString(32) + ":");
      return (e.memoizedState = t);
    },
    useCacheRefresh: function () {
      return (ht().memoizedState = pp.bind(null, be));
    },
  };
  (ta.useMemoCache = Lu),
    (ta.useHostTransitionStatus = Ku),
    (ta.useFormState = pf),
    (ta.useActionState = pf),
    (ta.useOptimistic = function (e) {
      var t = ht();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      return (
        (t.queue = l), (t = Ju.bind(null, be, !0, l)), (l.dispatch = t), [e, t]
      );
    });
  var Nl = {
    readContext: rt,
    use: $i,
    useCallback: Tf,
    useContext: rt,
    useEffect: Vu,
    useImperativeHandle: jf,
    useInsertionEffect: Ef,
    useLayoutEffect: wf,
    useMemo: Rf,
    useReducer: Fi,
    useRef: xf,
    useState: function () {
      return Fi(al);
    },
    useDebugValue: Xu,
    useDeferredValue: function (e, t) {
      var l = Xe();
      return Af(l, Re.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Fi(al)[0],
        t = Xe().memoizedState;
      return [typeof e == "boolean" ? e : zn(e), t];
    },
    useSyncExternalStore: af,
    useId: _f,
  };
  (Nl.useCacheRefresh = Df),
    (Nl.useMemoCache = Lu),
    (Nl.useHostTransitionStatus = Ku),
    (Nl.useFormState = yf),
    (Nl.useActionState = yf),
    (Nl.useOptimistic = function (e, t) {
      var l = Xe();
      return of(l, Re, e, t);
    });
  var la = {
    readContext: rt,
    use: $i,
    useCallback: Tf,
    useContext: rt,
    useEffect: Vu,
    useImperativeHandle: jf,
    useInsertionEffect: Ef,
    useLayoutEffect: wf,
    useMemo: Rf,
    useReducer: ku,
    useRef: xf,
    useState: function () {
      return ku(al);
    },
    useDebugValue: Xu,
    useDeferredValue: function (e, t) {
      var l = Xe();
      return Re === null ? Qu(l, e, t) : Af(l, Re.memoizedState, e, t);
    },
    useTransition: function () {
      var e = ku(al)[0],
        t = Xe().memoizedState;
      return [typeof e == "boolean" ? e : zn(e), t];
    },
    useSyncExternalStore: af,
    useId: _f,
  };
  (la.useCacheRefresh = Df),
    (la.useMemoCache = Lu),
    (la.useHostTransitionStatus = Ku),
    (la.useFormState = vf),
    (la.useActionState = vf),
    (la.useOptimistic = function (e, t) {
      var l = Xe();
      return Re !== null
        ? of(l, Re, e, t)
        : ((l.baseState = e), [e, l.queue.dispatch]);
    });
  function $u(e, t, l, a) {
    (t = e.memoizedState),
      (l = l(a, t)),
      (l = l == null ? t : le({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Fu = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? P(e) === e : !1;
    },
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var a = St(),
        i = Rl(a);
      (i.payload = t),
        l != null && (i.callback = l),
        (t = Al(e, i, a)),
        t !== null && (ot(t, e, a), Un(t, e, a));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var a = St(),
        i = Rl(a);
      (i.tag = 1),
        (i.payload = t),
        l != null && (i.callback = l),
        (t = Al(e, i, a)),
        t !== null && (ot(t, e, a), Un(t, e, a));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = St(),
        a = Rl(l);
      (a.tag = 2),
        t != null && (a.callback = t),
        (t = Al(e, a, l)),
        t !== null && (ot(t, e, l), Un(t, e, l));
    },
  };
  function Bf(e, t, l, a, i, u, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, u, f)
        : t.prototype && t.prototype.isPureReactComponent
        ? !vn(l, a) || !vn(i, u)
        : !0
    );
  }
  function Lf(e, t, l, a) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(l, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(l, a),
      t.state !== e && Fu.enqueueReplaceState(t, t.state, null);
  }
  function aa(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t) a !== "ref" && (l[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      l === t && (l = le({}, l));
      for (var i in e) l[i] === void 0 && (l[i] = e[i]);
    }
    return l;
  }
  var er =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function qf(e) {
    er(e);
  }
  function kf(e) {
    console.error(e);
  }
  function Gf(e) {
    er(e);
  }
  function tr(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Yf(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function Wu(e, t, l) {
    return (
      (l = Rl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        tr(e, t);
      }),
      l
    );
  }
  function Vf(e) {
    return (e = Rl(e)), (e.tag = 3), e;
  }
  function Xf(e, t, l, a) {
    var i = l.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var u = a.value;
      (e.payload = function () {
        return i(u);
      }),
        (e.callback = function () {
          Yf(t, l, a);
        });
    }
    var f = l.stateNode;
    f !== null &&
      typeof f.componentDidCatch == "function" &&
      (e.callback = function () {
        Yf(t, l, a),
          typeof i != "function" &&
            (Ml === null ? (Ml = new Set([this])) : Ml.add(this));
        var p = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: p !== null ? p : "",
        });
      });
  }
  function bp(e, t, l, a, i) {
    if (
      ((l.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = l.alternate),
        t !== null && Mn(t, l, i, !0),
        (l = Ot.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 13:
            return (
              Qt === null ? _s() : l.alternate === null && Le === 0 && (Le = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = i),
              a === Ru
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                  Ms(e, a, i)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === Ru
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue),
                      l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                  Ms(e, a, i)),
              !1
            );
        }
        throw Error(s(435, l.tag));
      }
      return Ms(e, a, i), _s(), !1;
    }
    if (Ne)
      return (
        (t = Ot.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = i),
            a !== Tu && ((e = Error(s(422), { cause: a })), wn(Tt(e, l))))
          : (a !== Tu && ((t = Error(s(423), { cause: a })), wn(Tt(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (i &= -i),
            (e.lanes |= i),
            (a = Tt(a, l)),
            (i = Wu(e.stateNode, a, i)),
            ds(e, i),
            Le !== 4 && (Le = 2)),
        !1
      );
    var u = Error(s(520), { cause: a });
    if (
      ((u = Tt(u, l)),
      Vn === null ? (Vn = [u]) : Vn.push(u),
      Le !== 4 && (Le = 2),
      t === null)
    )
      return !0;
    (a = Tt(a, l)), (l = t);
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = i & -i),
            (l.lanes |= e),
            (e = Wu(l.stateNode, a, e)),
            ds(l, e),
            !1
          );
        case 1:
          if (
            ((t = l.type),
            (u = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (u !== null &&
                  typeof u.componentDidCatch == "function" &&
                  (Ml === null || !Ml.has(u)))))
          )
            return (
              (l.flags |= 65536),
              (i &= -i),
              (l.lanes |= i),
              (i = Vf(i)),
              Xf(i, e, l, a),
              ds(l, i),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Qf = Error(s(461)),
    We = !1;
  function lt(e, t, l, a) {
    t.child = e === null ? $o(t, null, l, a) : Pl(t, e.child, l, a);
  }
  function Zf(e, t, l, a, i) {
    l = l.render;
    var u = t.ref;
    if ("ref" in a) {
      var f = {};
      for (var p in a) p !== "ref" && (f[p] = a[p]);
    } else f = a;
    return (
      ia(t),
      (a = Mu(e, t, l, f, u, i)),
      (p = Uu()),
      e !== null && !We
        ? (Hu(e, t, i), nl(e, t, i))
        : (Ne && p && Nu(t), (t.flags |= 1), lt(e, t, a, i), t.child)
    );
  }
  function Kf(e, t, l, a, i) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" &&
        !xs(u) &&
        u.defaultProps === void 0 &&
        l.compare === null
        ? ((t.tag = 15), (t.type = u), Jf(e, t, u, a, i))
        : ((e = rr(l.type, null, a, t, t.mode, i)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((u = e.child), !rs(e, i))) {
      var f = u.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : vn), l(f, a) && e.ref === t.ref)
      )
        return nl(e, t, i);
    }
    return (
      (t.flags |= 1),
      (e = _l(u, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Jf(e, t, l, a, i) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (vn(u, a) && e.ref === t.ref)
        if (((We = !1), (t.pendingProps = a = u), rs(e, i)))
          (e.flags & 131072) !== 0 && (We = !0);
        else return (t.lanes = e.lanes), nl(e, t, i);
    }
    return Pu(e, t, l, a, i);
  }
  function $f(e, t, l) {
    var a = t.pendingProps,
      i = a.children,
      u = (t.stateNode._pendingVisibility & 2) !== 0,
      f = e !== null ? e.memoizedState : null;
    if ((Dn(e, t), a.mode === "hidden" || u)) {
      if ((t.flags & 128) !== 0) {
        if (((a = f !== null ? f.baseLanes | l : l), e !== null)) {
          for (i = t.child = e.child, u = 0; i !== null; )
            (u = u | i.lanes | i.childLanes), (i = i.sibling);
          t.childLanes = u & ~a;
        } else (t.childLanes = 0), (t.child = null);
        return Ff(e, t, a, l);
      }
      if ((l & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Qi(t, f !== null ? f.cachePool : null),
          f !== null ? Fo(t, f) : Au(),
          Wo(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          Ff(e, t, f !== null ? f.baseLanes | l : l, l)
        );
    } else
      f !== null
        ? (Qi(t, f.cachePool), Fo(t, f), El(), (t.memoizedState = null))
        : (e !== null && Qi(t, null), Au(), El());
    return lt(e, t, i, l), t.child;
  }
  function Ff(e, t, l, a) {
    var i = _u();
    return (
      (i = i === null ? null : { parent: $e._currentValue, pool: i }),
      (t.memoizedState = { baseLanes: l, cachePool: i }),
      e !== null && Qi(t, null),
      Au(),
      Wo(t),
      e !== null && Mn(e, t, a, !0),
      null
    );
  }
  function Dn(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 2097664);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(s(284));
      (e === null || e.ref !== l) && (t.flags |= 2097664);
    }
  }
  function Pu(e, t, l, a, i) {
    return (
      ia(t),
      (l = Mu(e, t, l, a, void 0, i)),
      (a = Uu()),
      e !== null && !We
        ? (Hu(e, t, i), nl(e, t, i))
        : (Ne && a && Nu(t), (t.flags |= 1), lt(e, t, l, i), t.child)
    );
  }
  function Wf(e, t, l, a, i, u) {
    return (
      ia(t),
      (t.updateQueue = null),
      (l = lf(t, a, l, i)),
      tf(e),
      (a = Uu()),
      e !== null && !We
        ? (Hu(e, t, u), nl(e, t, u))
        : (Ne && a && Nu(t), (t.flags |= 1), lt(e, t, l, u), t.child)
    );
  }
  function Pf(e, t, l, a, i) {
    if ((ia(t), t.stateNode === null)) {
      var u = Ca,
        f = l.contextType;
      typeof f == "object" && f !== null && (u = rt(f)),
        (u = new l(a, u)),
        (t.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = Fu),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = a),
        (u.state = t.memoizedState),
        (u.refs = {}),
        os(t),
        (f = l.contextType),
        (u.context = typeof f == "object" && f !== null ? rt(f) : Ca),
        (u.state = t.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == "function" && ($u(t, l, f, a), (u.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function" ||
          (typeof u.UNSAFE_componentWillMount != "function" &&
            typeof u.componentWillMount != "function") ||
          ((f = u.state),
          typeof u.componentWillMount == "function" && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == "function" &&
            u.UNSAFE_componentWillMount(),
          f !== u.state && Fu.enqueueReplaceState(u, u.state, null),
          Bn(t, a, u, i),
          Hn(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0);
    } else if (e === null) {
      u = t.stateNode;
      var p = t.memoizedProps,
        x = aa(l, p);
      u.props = x;
      var j = u.context,
        L = l.contextType;
      (f = Ca), typeof L == "object" && L !== null && (f = rt(L));
      var k = l.getDerivedStateFromProps;
      (L =
        typeof k == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function"),
        (p = t.pendingProps !== p),
        L ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((p || j !== f) && Lf(t, u, a, f)),
        (Tl = !1);
      var D = t.memoizedState;
      (u.state = D),
        Bn(t, a, u, i),
        Hn(),
        (j = t.memoizedState),
        p || D !== j || Tl
          ? (typeof k == "function" && ($u(t, l, k, a), (j = t.memoizedState)),
            (x = Tl || Bf(t, l, x, a, D, j, f))
              ? (L ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = j)),
            (u.props = a),
            (u.state = j),
            (u.context = f),
            (a = x))
          : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1));
    } else {
      (u = t.stateNode),
        fs(e, t),
        (f = t.memoizedProps),
        (L = aa(l, f)),
        (u.props = L),
        (k = t.pendingProps),
        (D = u.context),
        (j = l.contextType),
        (x = Ca),
        typeof j == "object" && j !== null && (x = rt(j)),
        (p = l.getDerivedStateFromProps),
        (j =
          typeof p == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function") ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((f !== k || D !== x) && Lf(t, u, a, x)),
        (Tl = !1),
        (D = t.memoizedState),
        (u.state = D),
        Bn(t, a, u, i),
        Hn();
      var B = t.memoizedState;
      f !== k ||
      D !== B ||
      Tl ||
      (e !== null && e.dependencies !== null && lr(e.dependencies))
        ? (typeof p == "function" && ($u(t, l, p, a), (B = t.memoizedState)),
          (L =
            Tl ||
            Bf(t, l, L, a, D, B, x) ||
            (e !== null && e.dependencies !== null && lr(e.dependencies)))
            ? (j ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" &&
                  u.componentWillUpdate(a, B, x),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(a, B, x)),
              typeof u.componentDidUpdate == "function" && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (f === e.memoizedProps && D === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (f === e.memoizedProps && D === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = B)),
          (u.props = a),
          (u.state = B),
          (u.context = x),
          (a = L))
        : (typeof u.componentDidUpdate != "function" ||
            (f === e.memoizedProps && D === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (f === e.memoizedProps && D === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (u = a),
      Dn(e, t),
      (a = (t.flags & 128) !== 0),
      u || a
        ? ((u = t.stateNode),
          (l =
            a && typeof l.getDerivedStateFromError != "function"
              ? null
              : u.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = Pl(t, e.child, null, i)),
              (t.child = Pl(t, null, l, i)))
            : lt(e, t, l, i),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = nl(e, t, i)),
      e
    );
  }
  function If(e, t, l, a) {
    return En(), (t.flags |= 256), lt(e, t, l, a), t.child;
  }
  var Iu = { dehydrated: null, treeContext: null, retryLane: 0 };
  function es(e) {
    return { baseLanes: e, cachePool: ef() };
  }
  function ts(e, t, l) {
    return (e = e !== null ? e.childLanes & ~l : 0), t && (e |= Dt), e;
  }
  function ed(e, t, l) {
    var a = t.pendingProps,
      i = !1,
      u = (t.flags & 128) !== 0,
      f;
    if (
      ((f = u) ||
        (f =
          e !== null && e.memoizedState === null ? !1 : (Je.current & 2) !== 0),
      f && ((i = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ne) {
        if ((i ? Sl(t) : El(), Ne)) {
          var p = tt,
            x;
          if ((x = p)) {
            e: {
              for (x = p, p = Xt; x.nodeType !== 8; ) {
                if (!p) {
                  p = null;
                  break e;
                }
                if (((x = kt(x.nextSibling)), x === null)) {
                  p = null;
                  break e;
                }
              }
              p = x;
            }
            p !== null
              ? ((t.memoizedState = {
                  dehydrated: p,
                  treeContext: $l !== null ? { id: el, overflow: tl } : null,
                  retryLane: 536870912,
                }),
                (x = _t(18, null, null, 0)),
                (x.stateNode = p),
                (x.return = t),
                (t.child = x),
                (ct = t),
                (tt = null),
                (x = !0))
              : (x = !1);
          }
          x || Wl(t);
        }
        if (
          ((p = t.memoizedState),
          p !== null && ((p = p.dehydrated), p !== null))
        )
          return p.data === "$!" ? (t.lanes = 16) : (t.lanes = 536870912), null;
        ll(t);
      }
      return (
        (p = a.children),
        (a = a.fallback),
        i
          ? (El(),
            (i = t.mode),
            (p = as({ mode: "hidden", children: p }, i)),
            (a = ua(a, i, l, null)),
            (p.return = t),
            (a.return = t),
            (p.sibling = a),
            (t.child = p),
            (i = t.child),
            (i.memoizedState = es(l)),
            (i.childLanes = ts(e, f, l)),
            (t.memoizedState = Iu),
            a)
          : (Sl(t), ls(t, p))
      );
    }
    if (
      ((x = e.memoizedState), x !== null && ((p = x.dehydrated), p !== null))
    ) {
      if (u)
        t.flags & 256
          ? (Sl(t), (t.flags &= -257), (t = ns(e, t, l)))
          : t.memoizedState !== null
          ? (El(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (El(),
            (i = a.fallback),
            (p = t.mode),
            (a = as({ mode: "visible", children: a.children }, p)),
            (i = ua(i, p, l, null)),
            (i.flags |= 2),
            (a.return = t),
            (i.return = t),
            (a.sibling = i),
            (t.child = a),
            Pl(t, e.child, null, l),
            (a = t.child),
            (a.memoizedState = es(l)),
            (a.childLanes = ts(e, f, l)),
            (t.memoizedState = Iu),
            (t = i));
      else if ((Sl(t), p.data === "$!")) {
        if (((f = p.nextSibling && p.nextSibling.dataset), f)) var j = f.dgst;
        (f = j),
          (a = Error(s(419))),
          (a.stack = ""),
          (a.digest = f),
          wn({ value: a, source: null, stack: null }),
          (t = ns(e, t, l));
      } else if (
        (We || Mn(e, t, l, !1), (f = (l & e.childLanes) !== 0), We || f)
      ) {
        if (((f = Ce), f !== null)) {
          if (((a = l & -l), (a & 42) !== 0)) a = 1;
          else
            switch (a) {
              case 2:
                a = 1;
                break;
              case 8:
                a = 4;
                break;
              case 32:
                a = 16;
                break;
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
                a = 64;
                break;
              case 268435456:
                a = 134217728;
                break;
              default:
                a = 0;
            }
          if (
            ((a = (a & (f.suspendedLanes | l)) !== 0 ? 0 : a),
            a !== 0 && a !== x.retryLane)
          )
            throw ((x.retryLane = a), xl(e, a), ot(f, e, a), Qf);
        }
        p.data === "$?" || _s(), (t = ns(e, t, l));
      } else
        p.data === "$?"
          ? ((t.flags |= 128),
            (t.child = e.child),
            (t = Dp.bind(null, e)),
            (p._reactRetry = t),
            (t = null))
          : ((e = x.treeContext),
            (tt = kt(p.nextSibling)),
            (ct = t),
            (Ne = !0),
            (Lt = null),
            (Xt = !1),
            e !== null &&
              ((Rt[At++] = el),
              (Rt[At++] = tl),
              (Rt[At++] = $l),
              (el = e.id),
              (tl = e.overflow),
              ($l = t)),
            (t = ls(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return i
      ? (El(),
        (i = a.fallback),
        (p = t.mode),
        (x = e.child),
        (j = x.sibling),
        (a = _l(x, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = x.subtreeFlags & 31457280),
        j !== null ? (i = _l(j, i)) : ((i = ua(i, p, l, null)), (i.flags |= 2)),
        (i.return = t),
        (a.return = t),
        (a.sibling = i),
        (t.child = a),
        (a = i),
        (i = t.child),
        (p = e.child.memoizedState),
        p === null
          ? (p = es(l))
          : ((x = p.cachePool),
            x !== null
              ? ((j = $e._currentValue),
                (x = x.parent !== j ? { parent: j, pool: j } : x))
              : (x = ef()),
            (p = { baseLanes: p.baseLanes | l, cachePool: x })),
        (i.memoizedState = p),
        (i.childLanes = ts(e, f, l)),
        (t.memoizedState = Iu),
        a)
      : (Sl(t),
        (l = e.child),
        (e = l.sibling),
        (l = _l(l, { mode: "visible", children: a.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((f = t.deletions),
          f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function ls(e, t) {
    return (
      (t = as({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function as(e, t) {
    return Td(e, t, 0, null);
  }
  function ns(e, t, l) {
    return (
      Pl(t, e.child, null, l),
      (e = ls(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function td(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), ss(e.return, t, l);
  }
  function is(e, t, l, a, i) {
    var u = e.memoizedState;
    u === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: i,
        })
      : ((u.isBackwards = t),
        (u.rendering = null),
        (u.renderingStartTime = 0),
        (u.last = a),
        (u.tail = l),
        (u.tailMode = i));
  }
  function ld(e, t, l) {
    var a = t.pendingProps,
      i = a.revealOrder,
      u = a.tail;
    if ((lt(e, t, a.children, l), (a = Je.current), (a & 2) !== 0))
      (a = (a & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && td(e, l, t);
          else if (e.tag === 19) td(e, l, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      a &= 1;
    }
    switch ((de(Je, a), i)) {
      case "forwards":
        for (l = t.child, i = null; l !== null; )
          (e = l.alternate),
            e !== null && Xi(e) === null && (i = l),
            (l = l.sibling);
        (l = i),
          l === null
            ? ((i = t.child), (t.child = null))
            : ((i = l.sibling), (l.sibling = null)),
          is(t, !1, i, l, u);
        break;
      case "backwards":
        for (l = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && Xi(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = l), (l = i), (i = e);
        }
        is(t, !0, l, null, u);
        break;
      case "together":
        is(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function nl(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Dl |= t.lanes),
      (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Mn(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (
        e = t.child, l = _l(e, e.pendingProps), t.child = l, l.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (l = l.sibling = _l(e, e.pendingProps)),
          (l.return = t);
      l.sibling = null;
    }
    return t.child;
  }
  function rs(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && lr(e)));
  }
  function vp(e, t, l) {
    switch (t.tag) {
      case 3:
        bi(t, t.stateNode.containerInfo),
          jl(t, $e, e.memoizedState.cache),
          En();
        break;
      case 27:
      case 5:
        Fr(t);
        break;
      case 4:
        bi(t, t.stateNode.containerInfo);
        break;
      case 10:
        jl(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (Sl(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
            ? ed(e, t, l)
            : (Sl(t), (e = nl(e, t, l)), e !== null ? e.sibling : null);
        Sl(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (
          ((a = (l & t.childLanes) !== 0),
          a || (Mn(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
          i)
        ) {
          if (a) return ld(e, t, l);
          t.flags |= 128;
        }
        if (
          ((i = t.memoizedState),
          i !== null &&
            ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          de(Je, Je.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), $f(e, t, l);
      case 24:
        jl(t, $e, e.memoizedState.cache);
    }
    return nl(e, t, l);
  }
  function ad(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) We = !0;
      else {
        if (!rs(e, l) && (t.flags & 128) === 0) return (We = !1), vp(e, t, l);
        We = (e.flags & 131072) !== 0;
      }
    else (We = !1), Ne && (t.flags & 1048576) !== 0 && ko(t, qi, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var a = t.elementType,
            i = a._init;
          if (((a = i(a._payload)), (t.type = a), typeof a == "function"))
            xs(a)
              ? ((e = aa(a, e)), (t.tag = 1), (t = Pf(null, t, a, e, l)))
              : ((t.tag = 0), (t = Pu(null, t, a, e, l)));
          else {
            if (a != null) {
              if (((i = a.$$typeof), i === v)) {
                (t.tag = 11), (t = Zf(null, t, a, e, l));
                break e;
              } else if (i === M) {
                (t.tag = 14), (t = Kf(null, t, a, e, l));
                break e;
              }
            }
            throw ((t = re(a) || a), Error(s(306, t, "")));
          }
        }
        return t;
      case 0:
        return Pu(e, t, t.type, t.pendingProps, l);
      case 1:
        return (a = t.type), (i = aa(a, t.pendingProps)), Pf(e, t, a, i, l);
      case 3:
        e: {
          if ((bi(t, t.stateNode.containerInfo), e === null))
            throw Error(s(387));
          var u = t.pendingProps;
          (i = t.memoizedState), (a = i.element), fs(e, t), Bn(t, u, null, l);
          var f = t.memoizedState;
          if (
            ((u = f.cache),
            jl(t, $e, u),
            u !== i.cache && cs(t, [$e], l, !0),
            Hn(),
            (u = f.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: u, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              t = If(e, t, u, l);
              break e;
            } else if (u !== a) {
              (a = Tt(Error(s(424)), t)), wn(a), (t = If(e, t, u, l));
              break e;
            } else
              for (
                tt = kt(t.stateNode.containerInfo.firstChild),
                  ct = t,
                  Ne = !0,
                  Lt = null,
                  Xt = !0,
                  l = $o(t, null, u, l),
                  t.child = l;
                l;

              )
                (l.flags = (l.flags & -3) | 4096), (l = l.sibling);
          else {
            if ((En(), u === a)) {
              t = nl(e, t, l);
              break e;
            }
            lt(e, t, u, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Dn(e, t),
          e === null
            ? (l = rh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : Ne ||
                ((l = t.type),
                (e = t.pendingProps),
                (a = br(pl.current).createElement(l)),
                (a[it] = t),
                (a[ft] = e),
                at(a, l, e),
                Fe(a),
                (t.stateNode = a))
            : (t.memoizedState = rh(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Fr(t),
          e === null &&
            Ne &&
            ((a = t.stateNode = ah(t.type, t.pendingProps, pl.current)),
            (ct = t),
            (Xt = !0),
            (tt = kt(a.firstChild))),
          (a = t.pendingProps.children),
          e !== null || Ne ? lt(e, t, a, l) : (t.child = Pl(t, null, a, l)),
          Dn(e, t),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ne &&
            ((i = a = tt) &&
              ((a = $p(a, t.type, t.pendingProps, Xt)),
              a !== null
                ? ((t.stateNode = a),
                  (ct = t),
                  (tt = kt(a.firstChild)),
                  (Xt = !1),
                  (i = !0))
                : (i = !1)),
            i || Wl(t)),
          Fr(t),
          (i = t.type),
          (u = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (a = u.children),
          Zs(i, u) ? (a = null) : f !== null && Zs(i, f) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((i = Mu(e, t, dp, null, null, l)), (Pn._currentValue = i)),
          Dn(e, t),
          lt(e, t, a, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ne &&
            ((e = l = tt) &&
              ((l = Fp(l, t.pendingProps, Xt)),
              l !== null
                ? ((t.stateNode = l), (ct = t), (tt = null), (e = !0))
                : (e = !1)),
            e || Wl(t)),
          null
        );
      case 13:
        return ed(e, t, l);
      case 4:
        return (
          bi(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = Pl(t, null, a, l)) : lt(e, t, a, l),
          t.child
        );
      case 11:
        return Zf(e, t, t.type, t.pendingProps, l);
      case 7:
        return lt(e, t, t.pendingProps, l), t.child;
      case 8:
        return lt(e, t, t.pendingProps.children, l), t.child;
      case 12:
        return lt(e, t, t.pendingProps.children, l), t.child;
      case 10:
        return (
          (a = t.pendingProps),
          jl(t, t.type, a.value),
          lt(e, t, a.children, l),
          t.child
        );
      case 9:
        return (
          (i = t.type._context),
          (a = t.pendingProps.children),
          ia(t),
          (i = rt(i)),
          (a = a(i)),
          (t.flags |= 1),
          lt(e, t, a, l),
          t.child
        );
      case 14:
        return Kf(e, t, t.type, t.pendingProps, l);
      case 15:
        return Jf(e, t, t.type, t.pendingProps, l);
      case 19:
        return ld(e, t, l);
      case 22:
        return $f(e, t, l);
      case 24:
        return (
          ia(t),
          (a = rt($e)),
          e === null
            ? ((i = _u()),
              i === null &&
                ((i = Ce),
                (u = Cu()),
                (i.pooledCache = u),
                u.refCount++,
                u !== null && (i.pooledCacheLanes |= l),
                (i = u)),
              (t.memoizedState = { parent: a, cache: i }),
              os(t),
              jl(t, $e, i))
            : ((e.lanes & l) !== 0 && (fs(e, t), Bn(t, null, null, l), Hn()),
              (i = e.memoizedState),
              (u = t.memoizedState),
              i.parent !== a
                ? ((i = { parent: a, cache: a }),
                  (t.memoizedState = i),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = i),
                  jl(t, $e, a))
                : ((a = u.cache),
                  jl(t, $e, a),
                  a !== i.cache && cs(t, [$e], l, !0))),
          lt(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  var us = $(null),
    na = null,
    il = null;
  function jl(e, t, l) {
    de(us, t._currentValue), (t._currentValue = l);
  }
  function rl(e) {
    (e._currentValue = us.current), pe(us);
  }
  function ss(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === l)
      )
        break;
      e = e.return;
    }
  }
  function cs(e, t, l, a) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var u = i.dependencies;
      if (u !== null) {
        var f = i.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var p = u;
          u = i;
          for (var x = 0; x < t.length; x++)
            if (p.context === t[x]) {
              (u.lanes |= l),
                (p = u.alternate),
                p !== null && (p.lanes |= l),
                ss(u.return, l, e),
                a || (f = null);
              break e;
            }
          u = p.next;
        }
      } else if (i.tag === 18) {
        if (((f = i.return), f === null)) throw Error(s(341));
        (f.lanes |= l),
          (u = f.alternate),
          u !== null && (u.lanes |= l),
          ss(f, l, e),
          (f = null);
      } else f = i.child;
      if (f !== null) f.return = i;
      else
        for (f = i; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (((i = f.sibling), i !== null)) {
            (i.return = f.return), (f = i);
            break;
          }
          f = f.return;
        }
      i = f;
    }
  }
  function Mn(e, t, l, a) {
    e = null;
    for (var i = t, u = !1; i !== null; ) {
      if (!u) {
        if ((i.flags & 524288) !== 0) u = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var f = i.alternate;
        if (f === null) throw Error(s(387));
        if (((f = f.memoizedProps), f !== null)) {
          var p = i.type;
          yt(i.pendingProps.value, f.value) ||
            (e !== null ? e.push(p) : (e = [p]));
        }
      } else if (i === yi.current) {
        if (((f = i.alternate), f === null)) throw Error(s(387));
        f.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
          (e !== null ? e.push(Pn) : (e = [Pn]));
      }
      i = i.return;
    }
    e !== null && cs(t, e, l, a), (t.flags |= 262144);
  }
  function lr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!yt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function ia(e) {
    (na = e),
      (il = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function rt(e) {
    return nd(na, e);
  }
  function ar(e, t) {
    return na === null && ia(e), nd(e, t);
  }
  function nd(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), il === null)) {
      if (e === null) throw Error(s(308));
      (il = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else il = il.next = t;
    return l;
  }
  var Tl = !1;
  function os(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function fs(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function Rl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Al(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (Ue & 2) !== 0)) {
      var i = a.pending;
      return (
        i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
        (a.pending = t),
        (t = Bi(e)),
        Lo(e, null, l),
        t
      );
    }
    return Hi(e, a, t, l), Bi(e);
  }
  function Un(e, t, l) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194176) !== 0))
    ) {
      var a = t.lanes;
      (a &= e.pendingLanes), (l |= a), (t.lanes = l), Qc(e, l);
    }
  }
  function ds(e, t) {
    var l = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var i = null,
        u = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var f = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          u === null ? (i = u = f) : (u = u.next = f), (l = l.next);
        } while (l !== null);
        u === null ? (i = u = t) : (u = u.next = t);
      } else i = u = t;
      (l = {
        baseState: a.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = l);
      return;
    }
    (e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t);
  }
  var hs = !1;
  function Hn() {
    if (hs) {
      var e = Ha;
      if (e !== null) throw e;
    }
  }
  function Bn(e, t, l, a) {
    hs = !1;
    var i = e.updateQueue;
    Tl = !1;
    var u = i.firstBaseUpdate,
      f = i.lastBaseUpdate,
      p = i.shared.pending;
    if (p !== null) {
      i.shared.pending = null;
      var x = p,
        j = x.next;
      (x.next = null), f === null ? (u = j) : (f.next = j), (f = x);
      var L = e.alternate;
      L !== null &&
        ((L = L.updateQueue),
        (p = L.lastBaseUpdate),
        p !== f &&
          (p === null ? (L.firstBaseUpdate = j) : (p.next = j),
          (L.lastBaseUpdate = x)));
    }
    if (u !== null) {
      var k = i.baseState;
      (f = 0), (L = j = x = null), (p = u);
      do {
        var D = p.lane & -536870913,
          B = D !== p.lane;
        if (B ? (we & D) === D : (a & D) === D) {
          D !== 0 && D === Ua && (hs = !0),
            L !== null &&
              (L = L.next =
                {
                  lane: 0,
                  tag: p.tag,
                  payload: p.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var ae = e,
              fe = p;
            D = t;
            var qe = l;
            switch (fe.tag) {
              case 1:
                if (((ae = fe.payload), typeof ae == "function")) {
                  k = ae.call(qe, k, D);
                  break e;
                }
                k = ae;
                break e;
              case 3:
                ae.flags = (ae.flags & -65537) | 128;
              case 0:
                if (
                  ((ae = fe.payload),
                  (D = typeof ae == "function" ? ae.call(qe, k, D) : ae),
                  D == null)
                )
                  break e;
                k = le({}, k, D);
                break e;
              case 2:
                Tl = !0;
            }
          }
          (D = p.callback),
            D !== null &&
              ((e.flags |= 64),
              B && (e.flags |= 8192),
              (B = i.callbacks),
              B === null ? (i.callbacks = [D]) : B.push(D));
        } else
          (B = {
            lane: D,
            tag: p.tag,
            payload: p.payload,
            callback: p.callback,
            next: null,
          }),
            L === null ? ((j = L = B), (x = k)) : (L = L.next = B),
            (f |= D);
        if (((p = p.next), p === null)) {
          if (((p = i.shared.pending), p === null)) break;
          (B = p),
            (p = B.next),
            (B.next = null),
            (i.lastBaseUpdate = B),
            (i.shared.pending = null);
        }
      } while (!0);
      L === null && (x = k),
        (i.baseState = x),
        (i.firstBaseUpdate = j),
        (i.lastBaseUpdate = L),
        u === null && (i.shared.lanes = 0),
        (Dl |= f),
        (e.lanes = f),
        (e.memoizedState = k);
    }
  }
  function id(e, t) {
    if (typeof e != "function") throw Error(s(191, e));
    e.call(t);
  }
  function rd(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++) id(l[e], t);
  }
  function Ln(e, t) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        l = i;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var u = l.create,
              f = l.inst;
            (a = u()), (f.destroy = a);
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (p) {
      Oe(t, t.return, p);
    }
  }
  function Ol(e, t, l) {
    try {
      var a = t.updateQueue,
        i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var f = a.inst,
              p = f.destroy;
            if (p !== void 0) {
              (f.destroy = void 0), (i = t);
              var x = l;
              try {
                p();
              } catch (j) {
                Oe(i, x, j);
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (j) {
      Oe(t, t.return, j);
    }
  }
  function ud(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        rd(t, l);
      } catch (a) {
        Oe(e, e.return, a);
      }
    }
  }
  function sd(e, t, l) {
    (l.props = aa(e.type, e.memoizedProps)), (l.state = e.memoizedState);
    try {
      l.componentWillUnmount();
    } catch (a) {
      Oe(e, t, a);
    }
  }
  function ra(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        var a = e.stateNode;
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = a;
            break;
          default:
            i = a;
        }
        typeof l == "function" ? (e.refCleanup = l(i)) : (l.current = i);
      }
    } catch (u) {
      Oe(e, t, u);
    }
  }
  function bt(e, t) {
    var l = e.ref,
      a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (i) {
          Oe(e, t, i);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (i) {
          Oe(e, t, i);
        }
      else l.current = null;
  }
  function cd(e) {
    var t = e.type,
      l = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break e;
        case "img":
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (i) {
      Oe(e, e.return, i);
    }
  }
  function od(e, t, l) {
    try {
      var a = e.stateNode;
      Xp(a, e.type, l, t), (a[ft] = t);
    } catch (i) {
      Oe(e, e.return, i);
    }
  }
  function fd(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 || e.tag === 4
    );
  }
  function ms(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || fd(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 27 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function gs(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      (e = e.stateNode),
        t
          ? l.nodeType === 8
            ? l.parentNode.insertBefore(e, t)
            : l.insertBefore(e, t)
          : (l.nodeType === 8
              ? ((t = l.parentNode), t.insertBefore(e, l))
              : ((t = l), t.appendChild(e)),
            (l = l._reactRootContainer),
            l != null || t.onclick !== null || (t.onclick = yr));
    else if (a !== 4 && a !== 27 && ((e = e.child), e !== null))
      for (gs(e, t, l), e = e.sibling; e !== null; )
        gs(e, t, l), (e = e.sibling);
  }
  function nr(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      (e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (a !== 4 && a !== 27 && ((e = e.child), e !== null))
      for (nr(e, t, l), e = e.sibling; e !== null; )
        nr(e, t, l), (e = e.sibling);
  }
  var ul = !1,
    Be = !1,
    ps = !1,
    dd = typeof WeakSet == "function" ? WeakSet : Set,
    Pe = null,
    hd = !1;
  function xp(e, t) {
    if (((e = e.containerInfo), (Xs = Nr), (e = Oo(e)), bu(e))) {
      if ("selectionStart" in e)
        var l = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var i = a.anchorOffset,
              u = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, u.nodeType;
            } catch {
              l = null;
              break e;
            }
            var f = 0,
              p = -1,
              x = -1,
              j = 0,
              L = 0,
              k = e,
              D = null;
            t: for (;;) {
              for (
                var B;
                k !== l || (i !== 0 && k.nodeType !== 3) || (p = f + i),
                  k !== u || (a !== 0 && k.nodeType !== 3) || (x = f + a),
                  k.nodeType === 3 && (f += k.nodeValue.length),
                  (B = k.firstChild) !== null;

              )
                (D = k), (k = B);
              for (;;) {
                if (k === e) break t;
                if (
                  (D === l && ++j === i && (p = f),
                  D === u && ++L === a && (x = f),
                  (B = k.nextSibling) !== null)
                )
                  break;
                (k = D), (D = k.parentNode);
              }
              k = B;
            }
            l = p === -1 || x === -1 ? null : { start: p, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      Qs = { focusedElem: e, selectionRange: l }, Nr = !1, Pe = t;
      Pe !== null;

    )
      if (
        ((t = Pe), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        (e.return = t), (Pe = e);
      else
        for (; Pe !== null; ) {
          switch (((t = Pe), (u = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                (e = void 0),
                  (l = t),
                  (i = u.memoizedProps),
                  (u = u.memoizedState),
                  (a = l.stateNode);
                try {
                  var ae = aa(l.type, i, l.elementType === l.type);
                  (e = a.getSnapshotBeforeUpdate(ae, u)),
                    (a.__reactInternalSnapshotBeforeUpdate = e);
                } catch (fe) {
                  Oe(l, l.return, fe);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)
                )
                  $s(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      $s(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (Pe = e);
            break;
          }
          Pe = t.return;
        }
    return (ae = hd), (hd = !1), ae;
  }
  function md(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        cl(e, l), a & 4 && Ln(5, l);
        break;
      case 1:
        if ((cl(e, l), a & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (p) {
              Oe(l, l.return, p);
            }
          else {
            var i = aa(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (p) {
              Oe(l, l.return, p);
            }
          }
        a & 64 && ud(l), a & 512 && ra(l, l.return);
        break;
      case 3:
        if ((cl(e, l), a & 64 && ((a = l.updateQueue), a !== null))) {
          if (((e = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            rd(a, e);
          } catch (p) {
            Oe(l, l.return, p);
          }
        }
        break;
      case 26:
        cl(e, l), a & 512 && ra(l, l.return);
        break;
      case 27:
      case 5:
        cl(e, l), t === null && a & 4 && cd(l), a & 512 && ra(l, l.return);
        break;
      case 12:
        cl(e, l);
        break;
      case 13:
        cl(e, l), a & 4 && yd(e, l);
        break;
      case 22:
        if (((i = l.memoizedState !== null || ul), !i)) {
          t = (t !== null && t.memoizedState !== null) || Be;
          var u = ul,
            f = Be;
          (ul = i),
            (Be = t) && !f ? Cl(e, l, (l.subtreeFlags & 8772) !== 0) : cl(e, l),
            (ul = u),
            (Be = f);
        }
        a & 512 &&
          (l.memoizedProps.mode === "manual"
            ? ra(l, l.return)
            : bt(l, l.return));
        break;
      default:
        cl(e, l);
    }
  }
  function gd(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), gd(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && lu(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var Qe = null,
    vt = !1;
  function sl(e, t, l) {
    for (l = l.child; l !== null; ) pd(e, t, l), (l = l.sibling);
  }
  function pd(e, t, l) {
    if (gt && typeof gt.onCommitFiberUnmount == "function")
      try {
        gt.onCommitFiberUnmount(un, l);
      } catch {}
    switch (l.tag) {
      case 26:
        Be || bt(l, t),
          sl(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l));
        break;
      case 27:
        Be || bt(l, t);
        var a = Qe,
          i = vt;
        for (
          Qe = l.stateNode, sl(e, t, l), l = l.stateNode, t = l.attributes;
          t.length;

        )
          l.removeAttributeNode(t[0]);
        lu(l), (Qe = a), (vt = i);
        break;
      case 5:
        Be || bt(l, t);
      case 6:
        i = Qe;
        var u = vt;
        if (((Qe = null), sl(e, t, l), (Qe = i), (vt = u), Qe !== null))
          if (vt)
            try {
              (e = Qe),
                (a = l.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(a)
                  : e.removeChild(a);
            } catch (f) {
              Oe(l, t, f);
            }
          else
            try {
              Qe.removeChild(l.stateNode);
            } catch (f) {
              Oe(l, t, f);
            }
        break;
      case 18:
        Qe !== null &&
          (vt
            ? ((t = Qe),
              (l = l.stateNode),
              t.nodeType === 8
                ? Js(t.parentNode, l)
                : t.nodeType === 1 && Js(t, l),
              li(t))
            : Js(Qe, l.stateNode));
        break;
      case 4:
        (a = Qe),
          (i = vt),
          (Qe = l.stateNode.containerInfo),
          (vt = !0),
          sl(e, t, l),
          (Qe = a),
          (vt = i);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Be || Ol(2, l, t), Be || Ol(4, l, t), sl(e, t, l);
        break;
      case 1:
        Be ||
          (bt(l, t),
          (a = l.stateNode),
          typeof a.componentWillUnmount == "function" && sd(l, t, a)),
          sl(e, t, l);
        break;
      case 21:
        sl(e, t, l);
        break;
      case 22:
        Be || bt(l, t),
          (Be = (a = Be) || l.memoizedState !== null),
          sl(e, t, l),
          (Be = a);
        break;
      default:
        sl(e, t, l);
    }
  }
  function yd(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        li(e);
      } catch (l) {
        Oe(t, t.return, l);
      }
  }
  function Sp(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new dd()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new dd()),
          t
        );
      default:
        throw Error(s(435, e.tag));
    }
  }
  function ys(e, t) {
    var l = Sp(e);
    t.forEach(function (a) {
      var i = Mp.bind(null, e, a);
      l.has(a) || (l.add(a), a.then(i, i));
    });
  }
  function Ct(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var i = l[a],
          u = e,
          f = t,
          p = f;
        e: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
            case 5:
              (Qe = p.stateNode), (vt = !1);
              break e;
            case 3:
              (Qe = p.stateNode.containerInfo), (vt = !0);
              break e;
            case 4:
              (Qe = p.stateNode.containerInfo), (vt = !0);
              break e;
          }
          p = p.return;
        }
        if (Qe === null) throw Error(s(160));
        pd(u, f, i),
          (Qe = null),
          (vt = !1),
          (u = i.alternate),
          u !== null && (u.return = null),
          (i.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) bd(t, e), (t = t.sibling);
  }
  var qt = null;
  function bd(e, t) {
    var l = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ct(t, e),
          zt(e),
          a & 4 && (Ol(3, e, e.return), Ln(3, e), Ol(5, e, e.return));
        break;
      case 1:
        Ct(t, e),
          zt(e),
          a & 512 && (Be || l === null || bt(l, l.return)),
          a & 64 &&
            ul &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? a : l.concat(a)))));
        break;
      case 26:
        var i = qt;
        if (
          (Ct(t, e),
          zt(e),
          a & 512 && (Be || l === null || bt(l, l.return)),
          a & 4)
        ) {
          var u = l !== null ? l.memoizedState : null;
          if (((a = e.memoizedState), l === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  (a = e.type),
                    (l = e.memoizedProps),
                    (i = i.ownerDocument || i);
                  t: switch (a) {
                    case "title":
                      (u = i.getElementsByTagName("title")[0]),
                        (!u ||
                          u[on] ||
                          u[it] ||
                          u.namespaceURI === "http://www.w3.org/2000/svg" ||
                          u.hasAttribute("itemprop")) &&
                          ((u = i.createElement(a)),
                          i.head.insertBefore(
                            u,
                            i.querySelector("head > title")
                          )),
                        at(u, a, l),
                        (u[it] = e),
                        Fe(u),
                        (a = u);
                      break e;
                    case "link":
                      var f = ch("link", "href", i).get(a + (l.href || ""));
                      if (f) {
                        for (var p = 0; p < f.length; p++)
                          if (
                            ((u = f[p]),
                            u.getAttribute("href") ===
                              (l.href == null ? null : l.href) &&
                              u.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              u.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              u.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            f.splice(p, 1);
                            break t;
                          }
                      }
                      (u = i.createElement(a)),
                        at(u, a, l),
                        i.head.appendChild(u);
                      break;
                    case "meta":
                      if (
                        (f = ch("meta", "content", i).get(
                          a + (l.content || "")
                        ))
                      ) {
                        for (p = 0; p < f.length; p++)
                          if (
                            ((u = f[p]),
                            u.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              u.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              u.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              u.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              u.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            f.splice(p, 1);
                            break t;
                          }
                      }
                      (u = i.createElement(a)),
                        at(u, a, l),
                        i.head.appendChild(u);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  (u[it] = e), Fe(u), (a = u);
                }
                e.stateNode = a;
              } else oh(i, e.type, e.stateNode);
            else e.stateNode = sh(i, a, e.memoizedProps);
          else
            u !== a
              ? (u === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : u.count--,
                a === null
                  ? oh(i, e.type, e.stateNode)
                  : sh(i, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                od(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        if (a & 4 && e.alternate === null) {
          (i = e.stateNode), (u = e.memoizedProps);
          try {
            for (var x = i.firstChild; x; ) {
              var j = x.nextSibling,
                L = x.nodeName;
              x[on] ||
                L === "HEAD" ||
                L === "BODY" ||
                L === "SCRIPT" ||
                L === "STYLE" ||
                (L === "LINK" && x.rel.toLowerCase() === "stylesheet") ||
                i.removeChild(x),
                (x = j);
            }
            for (var k = e.type, D = i.attributes; D.length; )
              i.removeAttributeNode(D[0]);
            at(i, k, u), (i[it] = e), (i[ft] = u);
          } catch (ae) {
            Oe(e, e.return, ae);
          }
        }
      case 5:
        if (
          (Ct(t, e),
          zt(e),
          a & 512 && (Be || l === null || bt(l, l.return)),
          e.flags & 32)
        ) {
          i = e.stateNode;
          try {
            wa(i, "");
          } catch (ae) {
            Oe(e, e.return, ae);
          }
        }
        a & 4 &&
          e.stateNode != null &&
          ((i = e.memoizedProps), od(e, i, l !== null ? l.memoizedProps : i)),
          a & 1024 && (ps = !0);
        break;
      case 6:
        if ((Ct(t, e), zt(e), a & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          (a = e.memoizedProps), (l = e.stateNode);
          try {
            l.nodeValue = a;
          } catch (ae) {
            Oe(e, e.return, ae);
          }
        }
        break;
      case 3:
        if (
          ((Sr = null),
          (i = qt),
          (qt = vr(t.containerInfo)),
          Ct(t, e),
          (qt = i),
          zt(e),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            li(t.containerInfo);
          } catch (ae) {
            Oe(e, e.return, ae);
          }
        ps && ((ps = !1), vd(e));
        break;
      case 4:
        (a = qt),
          (qt = vr(e.stateNode.containerInfo)),
          Ct(t, e),
          zt(e),
          (qt = a);
        break;
      case 12:
        Ct(t, e), zt(e);
        break;
      case 13:
        Ct(t, e),
          zt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (Ts = Vt()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), ys(e, a)));
        break;
      case 22:
        if (
          (a & 512 && (Be || l === null || bt(l, l.return)),
          (x = e.memoizedState !== null),
          (j = l !== null && l.memoizedState !== null),
          (L = ul),
          (k = Be),
          (ul = L || x),
          (Be = k || j),
          Ct(t, e),
          (Be = k),
          (ul = L),
          zt(e),
          (t = e.stateNode),
          (t._current = e),
          (t._visibility &= -3),
          (t._visibility |= t._pendingVisibility & 2),
          a & 8192 &&
            ((t._visibility = x ? t._visibility & -2 : t._visibility | 1),
            x && ((t = ul || Be), l === null || j || t || ka(e)),
            e.memoizedProps === null || e.memoizedProps.mode !== "manual"))
        )
          e: for (l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26 || t.tag === 27) {
              if (l === null) {
                j = l = t;
                try {
                  if (((i = j.stateNode), x))
                    (u = i.style),
                      typeof u.setProperty == "function"
                        ? u.setProperty("display", "none", "important")
                        : (u.display = "none");
                  else {
                    (f = j.stateNode), (p = j.memoizedProps.style);
                    var B =
                      p != null && p.hasOwnProperty("display")
                        ? p.display
                        : null;
                    f.style.display =
                      B == null || typeof B == "boolean" ? "" : ("" + B).trim();
                  }
                } catch (ae) {
                  Oe(j, j.return, ae);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                j = t;
                try {
                  j.stateNode.nodeValue = x ? "" : j.memoizedProps;
                } catch (ae) {
                  Oe(j, j.return, ae);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), (t = t.return);
            }
            l === t && (l = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((l = a.retryQueue),
            l !== null && ((a.retryQueue = null), ys(e, l))));
        break;
      case 19:
        Ct(t, e),
          zt(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), ys(e, a)));
        break;
      case 21:
        break;
      default:
        Ct(t, e), zt(e);
    }
  }
  function zt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        if (e.tag !== 27) {
          e: {
            for (var l = e.return; l !== null; ) {
              if (fd(l)) {
                var a = l;
                break e;
              }
              l = l.return;
            }
            throw Error(s(160));
          }
          switch (a.tag) {
            case 27:
              var i = a.stateNode,
                u = ms(e);
              nr(e, u, i);
              break;
            case 5:
              var f = a.stateNode;
              a.flags & 32 && (wa(f, ""), (a.flags &= -33));
              var p = ms(e);
              nr(e, p, f);
              break;
            case 3:
            case 4:
              var x = a.stateNode.containerInfo,
                j = ms(e);
              gs(e, j, x);
              break;
            default:
              throw Error(s(161));
          }
        }
      } catch (L) {
        Oe(e, e.return, L);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function vd(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        vd(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function cl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) md(e, t.alternate, t), (t = t.sibling);
  }
  function ka(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ol(4, t, t.return), ka(t);
          break;
        case 1:
          bt(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && sd(t, t.return, l),
            ka(t);
          break;
        case 26:
        case 27:
        case 5:
          bt(t, t.return), ka(t);
          break;
        case 22:
          bt(t, t.return), t.memoizedState === null && ka(t);
          break;
        default:
          ka(t);
      }
      e = e.sibling;
    }
  }
  function Cl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        i = e,
        u = t,
        f = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Cl(i, u, l), Ln(4, u);
          break;
        case 1:
          if (
            (Cl(i, u, l),
            (a = u),
            (i = a.stateNode),
            typeof i.componentDidMount == "function")
          )
            try {
              i.componentDidMount();
            } catch (j) {
              Oe(a, a.return, j);
            }
          if (((a = u), (i = a.updateQueue), i !== null)) {
            var p = a.stateNode;
            try {
              var x = i.shared.hiddenCallbacks;
              if (x !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < x.length; i++)
                  id(x[i], p);
            } catch (j) {
              Oe(a, a.return, j);
            }
          }
          l && f & 64 && ud(u), ra(u, u.return);
          break;
        case 26:
        case 27:
        case 5:
          Cl(i, u, l), l && a === null && f & 4 && cd(u), ra(u, u.return);
          break;
        case 12:
          Cl(i, u, l);
          break;
        case 13:
          Cl(i, u, l), l && f & 4 && yd(i, u);
          break;
        case 22:
          u.memoizedState === null && Cl(i, u, l), ra(u, u.return);
          break;
        default:
          Cl(i, u, l);
      }
      t = t.sibling;
    }
  }
  function bs(e, t) {
    var l = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && An(l));
  }
  function vs(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && An(e));
  }
  function zl(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) xd(e, t, l, a), (t = t.sibling);
  }
  function xd(e, t, l, a) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        zl(e, t, l, a), i & 2048 && Ln(9, t);
        break;
      case 3:
        zl(e, t, l, a),
          i & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && An(e)));
        break;
      case 12:
        if (i & 2048) {
          zl(e, t, l, a), (e = t.stateNode);
          try {
            var u = t.memoizedProps,
              f = u.id,
              p = u.onPostCommit;
            typeof p == "function" &&
              p(
                f,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (x) {
            Oe(t, t.return, x);
          }
        } else zl(e, t, l, a);
        break;
      case 23:
        break;
      case 22:
        (u = t.stateNode),
          t.memoizedState !== null
            ? u._visibility & 4
              ? zl(e, t, l, a)
              : qn(e, t)
            : u._visibility & 4
            ? zl(e, t, l, a)
            : ((u._visibility |= 4),
              Ga(e, t, l, a, (t.subtreeFlags & 10256) !== 0)),
          i & 2048 && bs(t.alternate, t);
        break;
      case 24:
        zl(e, t, l, a), i & 2048 && vs(t.alternate, t);
        break;
      default:
        zl(e, t, l, a);
    }
  }
  function Ga(e, t, l, a, i) {
    for (i = i && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var u = e,
        f = t,
        p = l,
        x = a,
        j = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Ga(u, f, p, x, i), Ln(8, f);
          break;
        case 23:
          break;
        case 22:
          var L = f.stateNode;
          f.memoizedState !== null
            ? L._visibility & 4
              ? Ga(u, f, p, x, i)
              : qn(u, f)
            : ((L._visibility |= 4), Ga(u, f, p, x, i)),
            i && j & 2048 && bs(f.alternate, f);
          break;
        case 24:
          Ga(u, f, p, x, i), i && j & 2048 && vs(f.alternate, f);
          break;
        default:
          Ga(u, f, p, x, i);
      }
      t = t.sibling;
    }
  }
  function qn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          a = t,
          i = a.flags;
        switch (a.tag) {
          case 22:
            qn(l, a), i & 2048 && bs(a.alternate, a);
            break;
          case 24:
            qn(l, a), i & 2048 && vs(a.alternate, a);
            break;
          default:
            qn(l, a);
        }
        t = t.sibling;
      }
  }
  var kn = 8192;
  function Ya(e) {
    if (e.subtreeFlags & kn)
      for (e = e.child; e !== null; ) Sd(e), (e = e.sibling);
  }
  function Sd(e) {
    switch (e.tag) {
      case 26:
        Ya(e),
          e.flags & kn &&
            e.memoizedState !== null &&
            cy(qt, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Ya(e);
        break;
      case 3:
      case 4:
        var t = qt;
        (qt = vr(e.stateNode.containerInfo)), Ya(e), (qt = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = kn), (kn = 16777216), Ya(e), (kn = t))
            : Ya(e));
        break;
      default:
        Ya(e);
    }
  }
  function Ed(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function Gn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          (Pe = a), Nd(a, e);
        }
      Ed(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) wd(e), (e = e.sibling);
  }
  function wd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Gn(e), e.flags & 2048 && Ol(9, e, e.return);
        break;
      case 3:
        Gn(e);
        break;
      case 12:
        Gn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 4 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -5), ir(e))
          : Gn(e);
        break;
      default:
        Gn(e);
    }
  }
  function ir(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          (Pe = a), Nd(a, e);
        }
      Ed(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          Ol(8, t, t.return), ir(t);
          break;
        case 22:
          (l = t.stateNode),
            l._visibility & 4 && ((l._visibility &= -5), ir(t));
          break;
        default:
          ir(t);
      }
      e = e.sibling;
    }
  }
  function Nd(e, t) {
    for (; Pe !== null; ) {
      var l = Pe;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Ol(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          An(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) (a.return = l), (Pe = a);
      else
        e: for (l = e; Pe !== null; ) {
          a = Pe;
          var i = a.sibling,
            u = a.return;
          if ((gd(a), a === l)) {
            Pe = null;
            break e;
          }
          if (i !== null) {
            (i.return = u), (Pe = i);
            break e;
          }
          Pe = u;
        }
    }
  }
  function Ep(e, t, l, a) {
    (this.tag = e),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function _t(e, t, l, a) {
    return new Ep(e, t, l, a);
  }
  function xs(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function _l(e, t) {
    var l = e.alternate;
    return (
      l === null
        ? ((l = _t(e.tag, t, e.key, e.mode)),
          (l.elementType = e.elementType),
          (l.type = e.type),
          (l.stateNode = e.stateNode),
          (l.alternate = e),
          (e.alternate = l))
        : ((l.pendingProps = t),
          (l.type = e.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = e.flags & 31457280),
      (l.childLanes = e.childLanes),
      (l.lanes = e.lanes),
      (l.child = e.child),
      (l.memoizedProps = e.memoizedProps),
      (l.memoizedState = e.memoizedState),
      (l.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (l.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (l.sibling = e.sibling),
      (l.index = e.index),
      (l.ref = e.ref),
      (l.refCleanup = e.refCleanup),
      l
    );
  }
  function jd(e, t) {
    e.flags &= 31457282;
    var l = e.alternate;
    return (
      l === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = l.childLanes),
          (e.lanes = l.lanes),
          (e.child = l.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = l.memoizedProps),
          (e.memoizedState = l.memoizedState),
          (e.updateQueue = l.updateQueue),
          (e.type = l.type),
          (t = l.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function rr(e, t, l, a, i, u) {
    var f = 0;
    if (((a = e), typeof e == "function")) xs(e) && (f = 1);
    else if (typeof e == "string")
      f = uy(e, l, nt.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
    else
      e: switch (e) {
        case y:
          return ua(l.children, i, u, t);
        case g:
          (f = 8), (i |= 24);
          break;
        case S:
          return (
            (e = _t(12, l, t, i | 2)), (e.elementType = S), (e.lanes = u), e
          );
        case _:
          return (e = _t(13, l, t, i)), (e.elementType = _), (e.lanes = u), e;
        case C:
          return (e = _t(19, l, t, i)), (e.elementType = C), (e.lanes = u), e;
        case Q:
          return Td(l, i, u, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case R:
              case T:
                f = 10;
                break e;
              case N:
                f = 9;
                break e;
              case v:
                f = 11;
                break e;
              case M:
                f = 14;
                break e;
              case X:
                (f = 16), (a = null);
                break e;
            }
          (f = 29),
            (l = Error(s(130, e === null ? "null" : typeof e, ""))),
            (a = null);
      }
    return (
      (t = _t(f, l, t, i)), (t.elementType = e), (t.type = a), (t.lanes = u), t
    );
  }
  function ua(e, t, l, a) {
    return (e = _t(7, e, a, t)), (e.lanes = l), e;
  }
  function Td(e, t, l, a) {
    (e = _t(22, e, a, t)), (e.elementType = Q), (e.lanes = l);
    var i = {
      _visibility: 1,
      _pendingVisibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null,
      _current: null,
      detach: function () {
        var u = i._current;
        if (u === null) throw Error(s(456));
        if ((i._pendingVisibility & 2) === 0) {
          var f = xl(u, 2);
          f !== null && ((i._pendingVisibility |= 2), ot(f, u, 2));
        }
      },
      attach: function () {
        var u = i._current;
        if (u === null) throw Error(s(456));
        if ((i._pendingVisibility & 2) !== 0) {
          var f = xl(u, 2);
          f !== null && ((i._pendingVisibility &= -3), ot(f, u, 2));
        }
      },
    };
    return (e.stateNode = i), e;
  }
  function Ss(e, t, l) {
    return (e = _t(6, e, null, t)), (e.lanes = l), e;
  }
  function Es(e, t, l) {
    return (
      (t = _t(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function ol(e) {
    e.flags |= 4;
  }
  function Rd(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !fh(t))) {
      if (
        ((t = Ot.current),
        t !== null &&
          ((we & 4194176) === we
            ? Qt !== null
            : ((we & 62914560) !== we && (we & 536870912) === 0) || t !== Qt))
      )
        throw ((jn = Ru), Vo);
      e.flags |= 8192;
    }
  }
  function ur(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Vc() : 536870912), (e.lanes |= t), (Xa |= t));
  }
  function Yn(e, t) {
    if (!Ne)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), (t = t.sibling);
          l === null ? (e.tail = null) : (l.sibling = null);
          break;
        case "collapsed":
          l = e.tail;
          for (var a = null; l !== null; )
            l.alternate !== null && (a = l), (l = l.sibling);
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Me(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      a = 0;
    if (t)
      for (var i = e.child; i !== null; )
        (l |= i.lanes | i.childLanes),
          (a |= i.subtreeFlags & 31457280),
          (a |= i.flags & 31457280),
          (i.return = e),
          (i = i.sibling);
    else
      for (i = e.child; i !== null; )
        (l |= i.lanes | i.childLanes),
          (a |= i.subtreeFlags),
          (a |= i.flags),
          (i.return = e),
          (i = i.sibling);
    return (e.subtreeFlags |= a), (e.childLanes = l), t;
  }
  function wp(e, t, l) {
    var a = t.pendingProps;
    switch ((ju(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Me(t), null;
      case 1:
        return Me(t), null;
      case 3:
        return (
          (l = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          rl($e),
          ya(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Sn(t)
              ? ol(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Lt !== null && (Cs(Lt), (Lt = null)))),
          Me(t),
          null
        );
      case 26:
        return (
          (l = t.memoizedState),
          e === null
            ? (ol(t),
              l !== null ? (Me(t), Rd(t, l)) : (Me(t), (t.flags &= -16777217)))
            : l
            ? l !== e.memoizedState
              ? (ol(t), Me(t), Rd(t, l))
              : (Me(t), (t.flags &= -16777217))
            : (e.memoizedProps !== a && ol(t), Me(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        vi(t), (l = pl.current);
        var i = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== a && ol(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return Me(t), null;
          }
          (e = nt.current),
            Sn(t) ? Go(t) : ((e = ah(i, a, l)), (t.stateNode = e), ol(t));
        }
        return Me(t), null;
      case 5:
        if ((vi(t), (l = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && ol(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(s(166));
            return Me(t), null;
          }
          if (((e = nt.current), Sn(t))) Go(t);
          else {
            switch (((i = br(pl.current)), e)) {
              case 1:
                e = i.createElementNS("http://www.w3.org/2000/svg", l);
                break;
              case 2:
                e = i.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                break;
              default:
                switch (l) {
                  case "svg":
                    e = i.createElementNS("http://www.w3.org/2000/svg", l);
                    break;
                  case "math":
                    e = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      l
                    );
                    break;
                  case "script":
                    (e = i.createElement("div")),
                      (e.innerHTML = "<script></script>"),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case "select":
                    (e =
                      typeof a.is == "string"
                        ? i.createElement("select", { is: a.is })
                        : i.createElement("select")),
                      a.multiple
                        ? (e.multiple = !0)
                        : a.size && (e.size = a.size);
                    break;
                  default:
                    e =
                      typeof a.is == "string"
                        ? i.createElement(l, { is: a.is })
                        : i.createElement(l);
                }
            }
            (e[it] = t), (e[ft] = a);
            e: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6) e.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                (i.child.return = i), (i = i.child);
                continue;
              }
              if (i === t) break e;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t) break e;
                i = i.return;
              }
              (i.sibling.return = i.return), (i = i.sibling);
            }
            t.stateNode = e;
            e: switch ((at(e, l, a), l)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!a.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && ol(t);
          }
        }
        return Me(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && ol(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(s(166));
          if (((e = pl.current), Sn(t))) {
            if (
              ((e = t.stateNode),
              (l = t.memoizedProps),
              (a = null),
              (i = ct),
              i !== null)
            )
              switch (i.tag) {
                case 27:
                case 5:
                  a = i.memoizedProps;
              }
            (e[it] = t),
              (e = !!(
                e.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                Wd(e.nodeValue, l)
              )),
              e || Wl(t);
          } else (e = br(e).createTextNode(a)), (e[it] = t), (t.stateNode = e);
        }
        return Me(t), null;
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((i = Sn(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!i) throw Error(s(318));
              if (
                ((i = t.memoizedState),
                (i = i !== null ? i.dehydrated : null),
                !i)
              )
                throw Error(s(317));
              i[it] = t;
            } else
              En(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            Me(t), (i = !1);
          } else Lt !== null && (Cs(Lt), (Lt = null)), (i = !0);
          if (!i) return t.flags & 256 ? (ll(t), t) : (ll(t), null);
        }
        if ((ll(t), (t.flags & 128) !== 0)) return (t.lanes = l), t;
        if (
          ((l = a !== null), (e = e !== null && e.memoizedState !== null), l)
        ) {
          (a = t.child),
            (i = null),
            a.alternate !== null &&
              a.alternate.memoizedState !== null &&
              a.alternate.memoizedState.cachePool !== null &&
              (i = a.alternate.memoizedState.cachePool.pool);
          var u = null;
          a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (u = a.memoizedState.cachePool.pool),
            u !== i && (a.flags |= 2048);
        }
        return (
          l !== e && l && (t.child.flags |= 8192),
          ur(t, t.updateQueue),
          Me(t),
          null
        );
      case 4:
        return ya(), e === null && Gs(t.stateNode.containerInfo), Me(t), null;
      case 10:
        return rl(t.type), Me(t), null;
      case 19:
        if ((pe(Je), (i = t.memoizedState), i === null)) return Me(t), null;
        if (((a = (t.flags & 128) !== 0), (u = i.rendering), u === null))
          if (a) Yn(i, !1);
          else {
            if (Le !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = Xi(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      Yn(i, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      ur(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;

                  )
                    jd(l, e), (l = l.sibling);
                  return de(Je, (Je.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null &&
              Vt() > sr &&
              ((t.flags |= 128), (a = !0), Yn(i, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = Xi(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                ur(t, e),
                Yn(i, !0),
                i.tail === null &&
                  i.tailMode === "hidden" &&
                  !u.alternate &&
                  !Ne)
              )
                return Me(t), null;
            } else
              2 * Vt() - i.renderingStartTime > sr &&
                l !== 536870912 &&
                ((t.flags |= 128), (a = !0), Yn(i, !1), (t.lanes = 4194304));
          i.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((e = i.last),
              e !== null ? (e.sibling = u) : (t.child = u),
              (i.last = u));
        }
        return i.tail !== null
          ? ((t = i.tail),
            (i.rendering = t),
            (i.tail = t.sibling),
            (i.renderingStartTime = Vt()),
            (t.sibling = null),
            (e = Je.current),
            de(Je, a ? (e & 1) | 2 : e & 1),
            t)
          : (Me(t), null);
      case 22:
      case 23:
        return (
          ll(t),
          Ou(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Me(t),
          (l = t.updateQueue),
          l !== null && ur(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== l && (t.flags |= 2048),
          e !== null && pe(Il),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          rl($e),
          Me(t),
          null
        );
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Np(e, t) {
    switch ((ju(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          rl($e),
          ya(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return vi(t), null;
      case 13:
        if (
          (ll(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(s(340));
          En();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return pe(Je), null;
      case 4:
        return ya(), null;
      case 10:
        return rl(t.type), null;
      case 22:
      case 23:
        return (
          ll(t),
          Ou(),
          e !== null && pe(Il),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return rl($e), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ad(e, t) {
    switch ((ju(t), t.tag)) {
      case 3:
        rl($e), ya();
        break;
      case 26:
      case 27:
      case 5:
        vi(t);
        break;
      case 4:
        ya();
        break;
      case 13:
        ll(t);
        break;
      case 19:
        pe(Je);
        break;
      case 10:
        rl(t.type);
        break;
      case 22:
      case 23:
        ll(t), Ou(), e !== null && pe(Il);
        break;
      case 24:
        rl($e);
    }
  }
  var jp = {
      getCacheForType: function (e) {
        var t = rt($e),
          l = t.data.get(e);
        return l === void 0 && ((l = e()), t.data.set(e, l)), l;
      },
    },
    Tp = typeof WeakMap == "function" ? WeakMap : Map,
    Ue = 0,
    Ce = null,
    xe = null,
    we = 0,
    ze = 0,
    xt = null,
    fl = !1,
    Va = !1,
    ws = !1,
    dl = 0,
    Le = 0,
    Dl = 0,
    sa = 0,
    Ns = 0,
    Dt = 0,
    Xa = 0,
    Vn = null,
    Kt = null,
    js = !1,
    Ts = 0,
    sr = 1 / 0,
    cr = null,
    Ml = null,
    or = !1,
    ca = null,
    Xn = 0,
    Rs = 0,
    As = null,
    Qn = 0,
    Os = null;
  function St() {
    if ((Ue & 2) !== 0 && we !== 0) return we & -we;
    if (Z.T !== null) {
      var e = Ua;
      return e !== 0 ? e : Bs();
    }
    return Kc();
  }
  function Od() {
    Dt === 0 && (Dt = (we & 536870912) === 0 || Ne ? Yc() : 536870912);
    var e = Ot.current;
    return e !== null && (e.flags |= 32), Dt;
  }
  function ot(e, t, l) {
    ((e === Ce && ze === 2) || e.cancelPendingCommit !== null) &&
      (Qa(e, 0), hl(e, we, Dt, !1)),
      cn(e, l),
      ((Ue & 2) === 0 || e !== Ce) &&
        (e === Ce &&
          ((Ue & 2) === 0 && (sa |= l), Le === 4 && hl(e, we, Dt, !1)),
        Jt(e));
  }
  function Cd(e, t, l) {
    if ((Ue & 6) !== 0) throw Error(s(327));
    var a = (!l && (t & 60) === 0 && (t & e.expiredLanes) === 0) || sn(e, t),
      i = a ? Op(e, t) : Ds(e, t, !0),
      u = a;
    do {
      if (i === 0) {
        Va && !a && hl(e, t, 0, !1);
        break;
      } else if (i === 6) hl(e, t, 0, !fl);
      else {
        if (((l = e.current.alternate), u && !Rp(l))) {
          (i = Ds(e, t, !1)), (u = !1);
          continue;
        }
        if (i === 2) {
          if (((u = t), e.errorRecoveryDisabledLanes & u)) var f = 0;
          else
            (f = e.pendingLanes & -536870913),
              (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0);
          if (f !== 0) {
            t = f;
            e: {
              var p = e;
              i = Vn;
              var x = p.current.memoizedState.isDehydrated;
              if ((x && (Qa(p, f).flags |= 256), (f = Ds(p, f, !1)), f !== 2)) {
                if (ws && !x) {
                  (p.errorRecoveryDisabledLanes |= u), (sa |= u), (i = 4);
                  break e;
                }
                (u = Kt), (Kt = i), u !== null && Cs(u);
              }
              i = f;
            }
            if (((u = !1), i !== 2)) continue;
          }
        }
        if (i === 1) {
          Qa(e, 0), hl(e, t, 0, !0);
          break;
        }
        e: {
          switch (((a = e), i)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194176) === t) {
                hl(a, t, Dt, !fl);
                break e;
              }
              break;
            case 2:
              Kt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if (
            ((a.finishedWork = l),
            (a.finishedLanes = t),
            (t & 62914560) === t && ((u = Ts + 300 - Vt()), 10 < u))
          ) {
            if ((hl(a, t, Dt, !fl), wi(a, 0) !== 0)) break e;
            a.timeoutHandle = eh(
              zd.bind(null, a, l, Kt, cr, js, t, Dt, sa, Xa, fl, 2, -0, 0),
              u
            );
            break e;
          }
          zd(a, l, Kt, cr, js, t, Dt, sa, Xa, fl, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Jt(e);
  }
  function Cs(e) {
    Kt === null ? (Kt = e) : Kt.push.apply(Kt, e);
  }
  function zd(e, t, l, a, i, u, f, p, x, j, L, k, D) {
    var B = t.subtreeFlags;
    if (
      (B & 8192 || (B & 16785408) === 16785408) &&
      ((Wn = { stylesheets: null, count: 0, unsuspend: sy }),
      Sd(t),
      (t = oy()),
      t !== null)
    ) {
      (e.cancelPendingCommit = t(Ld.bind(null, e, l, a, i, f, p, x, 1, k, D))),
        hl(e, u, f, !j);
      return;
    }
    Ld(e, l, a, i, f, p, x, L, k, D);
  }
  function Rp(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var i = l[a],
            u = i.getSnapshot;
          i = i.value;
          try {
            if (!yt(u(), i)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = t.child), t.subtreeFlags & 16384 && l !== null))
        (l.return = t), (t = l);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function hl(e, t, l, a) {
    (t &= ~Ns),
      (t &= ~sa),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes);
    for (var i = t; 0 < i; ) {
      var u = 31 - pt(i),
        f = 1 << u;
      (a[u] = -1), (i &= ~f);
    }
    l !== 0 && Xc(e, l, t);
  }
  function fr() {
    return (Ue & 6) === 0 ? (Zn(0), !1) : !0;
  }
  function zs() {
    if (xe !== null) {
      if (ze === 0) var e = xe.return;
      else (e = xe), (il = na = null), Bu(e), (Da = null), (Tn = 0), (e = xe);
      for (; e !== null; ) Ad(e.alternate, e), (e = e.return);
      xe = null;
    }
  }
  function Qa(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var l = e.timeoutHandle;
    l !== -1 && ((e.timeoutHandle = -1), Zp(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      zs(),
      (Ce = e),
      (xe = l = _l(e.current, null)),
      (we = t),
      (ze = 0),
      (xt = null),
      (fl = !1),
      (Va = sn(e, t)),
      (ws = !1),
      (Xa = Dt = Ns = sa = Dl = Le = 0),
      (Kt = Vn = null),
      (js = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var i = 31 - pt(a),
          u = 1 << i;
        (t |= e[i]), (a &= ~u);
      }
    return (dl = t), Ui(), l;
  }
  function _d(e, t) {
    (be = null),
      (Z.H = Zt),
      t === Nn
        ? ((t = Zo()), (ze = 3))
        : t === Vo
        ? ((t = Zo()), (ze = 4))
        : (ze =
            t === Qf
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (xt = t),
      xe === null && ((Le = 1), tr(e, Tt(t, e.current)));
  }
  function Dd() {
    var e = Z.H;
    return (Z.H = Zt), e === null ? Zt : e;
  }
  function Md() {
    var e = Z.A;
    return (Z.A = jp), e;
  }
  function _s() {
    (Le = 4),
      fl || ((we & 4194176) !== we && Ot.current !== null) || (Va = !0),
      ((Dl & 134217727) === 0 && (sa & 134217727) === 0) ||
        Ce === null ||
        hl(Ce, we, Dt, !1);
  }
  function Ds(e, t, l) {
    var a = Ue;
    Ue |= 2;
    var i = Dd(),
      u = Md();
    (Ce !== e || we !== t) && ((cr = null), Qa(e, t)), (t = !1);
    var f = Le;
    e: do
      try {
        if (ze !== 0 && xe !== null) {
          var p = xe,
            x = xt;
          switch (ze) {
            case 8:
              zs(), (f = 6);
              break e;
            case 3:
            case 2:
            case 6:
              Ot.current === null && (t = !0);
              var j = ze;
              if (((ze = 0), (xt = null), Za(e, p, x, j), l && Va)) {
                f = 0;
                break e;
              }
              break;
            default:
              (j = ze), (ze = 0), (xt = null), Za(e, p, x, j);
          }
        }
        Ap(), (f = Le);
        break;
      } catch (L) {
        _d(e, L);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (il = na = null),
      (Ue = a),
      (Z.H = i),
      (Z.A = u),
      xe === null && ((Ce = null), (we = 0), Ui()),
      f
    );
  }
  function Ap() {
    for (; xe !== null; ) Ud(xe);
  }
  function Op(e, t) {
    var l = Ue;
    Ue |= 2;
    var a = Dd(),
      i = Md();
    Ce !== e || we !== t
      ? ((cr = null), (sr = Vt() + 500), Qa(e, t))
      : (Va = sn(e, t));
    e: do
      try {
        if (ze !== 0 && xe !== null) {
          t = xe;
          var u = xt;
          t: switch (ze) {
            case 1:
              (ze = 0), (xt = null), Za(e, t, u, 1);
              break;
            case 2:
              if (Xo(u)) {
                (ze = 0), (xt = null), Hd(t);
                break;
              }
              (t = function () {
                ze === 2 && Ce === e && (ze = 7), Jt(e);
              }),
                u.then(t, t);
              break e;
            case 3:
              ze = 7;
              break e;
            case 4:
              ze = 5;
              break e;
            case 7:
              Xo(u)
                ? ((ze = 0), (xt = null), Hd(t))
                : ((ze = 0), (xt = null), Za(e, t, u, 7));
              break;
            case 5:
              var f = null;
              switch (xe.tag) {
                case 26:
                  f = xe.memoizedState;
                case 5:
                case 27:
                  var p = xe;
                  if (!f || fh(f)) {
                    (ze = 0), (xt = null);
                    var x = p.sibling;
                    if (x !== null) xe = x;
                    else {
                      var j = p.return;
                      j !== null ? ((xe = j), dr(j)) : (xe = null);
                    }
                    break t;
                  }
              }
              (ze = 0), (xt = null), Za(e, t, u, 5);
              break;
            case 6:
              (ze = 0), (xt = null), Za(e, t, u, 6);
              break;
            case 8:
              zs(), (Le = 6);
              break e;
            default:
              throw Error(s(462));
          }
        }
        Cp();
        break;
      } catch (L) {
        _d(e, L);
      }
    while (!0);
    return (
      (il = na = null),
      (Z.H = a),
      (Z.A = i),
      (Ue = l),
      xe !== null ? 0 : ((Ce = null), (we = 0), Ui(), Le)
    );
  }
  function Cp() {
    for (; xe !== null && !Pm(); ) Ud(xe);
  }
  function Ud(e) {
    var t = ad(e.alternate, e, dl);
    (e.memoizedProps = e.pendingProps), t === null ? dr(e) : (xe = t);
  }
  function Hd(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Wf(l, t, t.pendingProps, t.type, void 0, we);
        break;
      case 11:
        t = Wf(l, t, t.pendingProps, t.type.render, t.ref, we);
        break;
      case 5:
        Bu(t);
      default:
        Ad(l, t), (t = xe = jd(t, dl)), (t = ad(l, t, dl));
    }
    (e.memoizedProps = e.pendingProps), t === null ? dr(e) : (xe = t);
  }
  function Za(e, t, l, a) {
    (il = na = null), Bu(t), (Da = null), (Tn = 0);
    var i = t.return;
    try {
      if (bp(e, i, t, l, we)) {
        (Le = 1), tr(e, Tt(l, e.current)), (xe = null);
        return;
      }
    } catch (u) {
      if (i !== null) throw ((xe = i), u);
      (Le = 1), tr(e, Tt(l, e.current)), (xe = null);
      return;
    }
    t.flags & 32768
      ? (Ne || a === 1
          ? (e = !0)
          : Va || (we & 536870912) !== 0
          ? (e = !1)
          : ((fl = e = !0),
            (a === 2 || a === 3 || a === 6) &&
              ((a = Ot.current),
              a !== null && a.tag === 13 && (a.flags |= 16384))),
        Bd(t, e))
      : dr(t);
  }
  function dr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Bd(t, fl);
        return;
      }
      e = t.return;
      var l = wp(t.alternate, t, dl);
      if (l !== null) {
        xe = l;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        xe = t;
        return;
      }
      xe = t = e;
    } while (t !== null);
    Le === 0 && (Le = 5);
  }
  function Bd(e, t) {
    do {
      var l = Np(e.alternate, e);
      if (l !== null) {
        (l.flags &= 32767), (xe = l);
        return;
      }
      if (
        ((l = e.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        xe = e;
        return;
      }
      xe = e = l;
    } while (e !== null);
    (Le = 6), (xe = null);
  }
  function Ld(e, t, l, a, i, u, f, p, x, j) {
    var L = Z.T,
      k = W.p;
    try {
      (W.p = 2), (Z.T = null), zp(e, t, l, a, k, i, u, f, p, x, j);
    } finally {
      (Z.T = L), (W.p = k);
    }
  }
  function zp(e, t, l, a, i, u, f, p) {
    do Ka();
    while (ca !== null);
    if ((Ue & 6) !== 0) throw Error(s(327));
    var x = e.finishedWork;
    if (((a = e.finishedLanes), x === null)) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), x === e.current))
      throw Error(s(177));
    (e.callbackNode = null),
      (e.callbackPriority = 0),
      (e.cancelPendingCommit = null);
    var j = x.lanes | x.childLanes;
    if (
      ((j |= Eu),
      cg(e, a, j, u, f, p),
      e === Ce && ((xe = Ce = null), (we = 0)),
      ((x.subtreeFlags & 10256) === 0 && (x.flags & 10256) === 0) ||
        or ||
        ((or = !0),
        (Rs = j),
        (As = l),
        Up(xi, function () {
          return Ka(), null;
        })),
      (l = (x.flags & 15990) !== 0),
      (x.subtreeFlags & 15990) !== 0 || l
        ? ((l = Z.T),
          (Z.T = null),
          (u = W.p),
          (W.p = 2),
          (f = Ue),
          (Ue |= 4),
          xp(e, x),
          bd(x, e),
          tp(Qs, e.containerInfo),
          (Nr = !!Xs),
          (Qs = Xs = null),
          (e.current = x),
          md(e, x.alternate, x),
          Im(),
          (Ue = f),
          (W.p = u),
          (Z.T = l))
        : (e.current = x),
      or ? ((or = !1), (ca = e), (Xn = a)) : qd(e, j),
      (j = e.pendingLanes),
      j === 0 && (Ml = null),
      ng(x.stateNode),
      Jt(e),
      t !== null)
    )
      for (i = e.onRecoverableError, x = 0; x < t.length; x++)
        (j = t[x]), i(j.value, { componentStack: j.stack });
    return (
      (Xn & 3) !== 0 && Ka(),
      (j = e.pendingLanes),
      (a & 4194218) !== 0 && (j & 42) !== 0
        ? e === Os
          ? Qn++
          : ((Qn = 0), (Os = e))
        : (Qn = 0),
      Zn(0),
      null
    );
  }
  function qd(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), An(t)));
  }
  function Ka() {
    if (ca !== null) {
      var e = ca,
        t = Rs;
      Rs = 0;
      var l = Zc(Xn),
        a = Z.T,
        i = W.p;
      try {
        if (((W.p = 32 > l ? 32 : l), (Z.T = null), ca === null)) var u = !1;
        else {
          (l = As), (As = null);
          var f = ca,
            p = Xn;
          if (((ca = null), (Xn = 0), (Ue & 6) !== 0)) throw Error(s(331));
          var x = Ue;
          if (
            ((Ue |= 4),
            wd(f.current),
            xd(f, f.current, p, l),
            (Ue = x),
            Zn(0, !1),
            gt && typeof gt.onPostCommitFiberRoot == "function")
          )
            try {
              gt.onPostCommitFiberRoot(un, f);
            } catch {}
          u = !0;
        }
        return u;
      } finally {
        (W.p = i), (Z.T = a), qd(e, t);
      }
    }
    return !1;
  }
  function kd(e, t, l) {
    (t = Tt(l, t)),
      (t = Wu(e.stateNode, t, 2)),
      (e = Al(e, t, 2)),
      e !== null && (cn(e, 2), Jt(e));
  }
  function Oe(e, t, l) {
    if (e.tag === 3) kd(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          kd(t, e, l);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (Ml === null || !Ml.has(a)))
          ) {
            (e = Tt(l, e)),
              (l = Vf(2)),
              (a = Al(t, l, 2)),
              a !== null && (Xf(l, a, t, e), cn(a, 2), Jt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ms(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Tp();
      var i = new Set();
      a.set(t, i);
    } else (i = a.get(t)), i === void 0 && ((i = new Set()), a.set(t, i));
    i.has(l) ||
      ((ws = !0), i.add(l), (e = _p.bind(null, e, t, l)), t.then(e, e));
  }
  function _p(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ce === e &&
        (we & l) === l &&
        (Le === 4 || (Le === 3 && (we & 62914560) === we && 300 > Vt() - Ts)
          ? (Ue & 2) === 0 && Qa(e, 0)
          : (Ns |= l),
        Xa === we && (Xa = 0)),
      Jt(e);
  }
  function Gd(e, t) {
    t === 0 && (t = Vc()), (e = xl(e, t)), e !== null && (cn(e, t), Jt(e));
  }
  function Dp(e) {
    var t = e.memoizedState,
      l = 0;
    t !== null && (l = t.retryLane), Gd(e, l);
  }
  function Mp(e, t) {
    var l = 0;
    switch (e.tag) {
      case 13:
        var a = e.stateNode,
          i = e.memoizedState;
        i !== null && (l = i.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    a !== null && a.delete(t), Gd(e, l);
  }
  function Up(e, t) {
    return Pr(e, t);
  }
  var hr = null,
    Ja = null,
    Us = !1,
    mr = !1,
    Hs = !1,
    oa = 0;
  function Jt(e) {
    e !== Ja &&
      e.next === null &&
      (Ja === null ? (hr = Ja = e) : (Ja = Ja.next = e)),
      (mr = !0),
      Us || ((Us = !0), Bp(Hp));
  }
  function Zn(e, t) {
    if (!Hs && mr) {
      Hs = !0;
      do
        for (var l = !1, a = hr; a !== null; ) {
          if (e !== 0) {
            var i = a.pendingLanes;
            if (i === 0) var u = 0;
            else {
              var f = a.suspendedLanes,
                p = a.pingedLanes;
              (u = (1 << (31 - pt(42 | e) + 1)) - 1),
                (u &= i & ~(f & ~p)),
                (u = u & 201326677 ? (u & 201326677) | 1 : u ? u | 2 : 0);
            }
            u !== 0 && ((l = !0), Xd(a, u));
          } else
            (u = we),
              (u = wi(a, a === Ce ? u : 0)),
              (u & 3) === 0 || sn(a, u) || ((l = !0), Xd(a, u));
          a = a.next;
        }
      while (l);
      Hs = !1;
    }
  }
  function Hp() {
    mr = Us = !1;
    var e = 0;
    oa !== 0 && (Qp() && (e = oa), (oa = 0));
    for (var t = Vt(), l = null, a = hr; a !== null; ) {
      var i = a.next,
        u = Yd(a, t);
      u === 0
        ? ((a.next = null),
          l === null ? (hr = i) : (l.next = i),
          i === null && (Ja = l))
        : ((l = a), (e !== 0 || (u & 3) !== 0) && (mr = !0)),
        (a = i);
    }
    Zn(e);
  }
  function Yd(e, t) {
    for (
      var l = e.suspendedLanes,
        a = e.pingedLanes,
        i = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;

    ) {
      var f = 31 - pt(u),
        p = 1 << f,
        x = i[f];
      x === -1
        ? ((p & l) === 0 || (p & a) !== 0) && (i[f] = sg(p, t))
        : x <= t && (e.expiredLanes |= p),
        (u &= ~p);
    }
    if (
      ((t = Ce),
      (l = we),
      (l = wi(e, e === t ? l : 0)),
      (a = e.callbackNode),
      l === 0 || (e === t && ze === 2) || e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && Ir(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((l & 3) === 0 || sn(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((a !== null && Ir(a), Zc(l))) {
        case 2:
        case 8:
          l = kc;
          break;
        case 32:
          l = xi;
          break;
        case 268435456:
          l = Gc;
          break;
        default:
          l = xi;
      }
      return (
        (a = Vd.bind(null, e)),
        (l = Pr(l, a)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      a !== null && a !== null && Ir(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Vd(e, t) {
    var l = e.callbackNode;
    if (Ka() && e.callbackNode !== l) return null;
    var a = we;
    return (
      (a = wi(e, e === Ce ? a : 0)),
      a === 0
        ? null
        : (Cd(e, a, t),
          Yd(e, Vt()),
          e.callbackNode != null && e.callbackNode === l
            ? Vd.bind(null, e)
            : null)
    );
  }
  function Xd(e, t) {
    if (Ka()) return null;
    Cd(e, t, !0);
  }
  function Bp(e) {
    Kp(function () {
      (Ue & 6) !== 0 ? Pr(qc, e) : e();
    });
  }
  function Bs() {
    return oa === 0 && (oa = Yc()), oa;
  }
  function Qd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
      ? e
      : Ai("" + e);
  }
  function Zd(e, t) {
    var l = t.ownerDocument.createElement("input");
    return (
      (l.name = t.name),
      (l.value = t.value),
      e.id && l.setAttribute("form", e.id),
      t.parentNode.insertBefore(l, t),
      (e = new FormData(e)),
      l.parentNode.removeChild(l),
      e
    );
  }
  function Lp(e, t, l, a, i) {
    if (t === "submit" && l && l.stateNode === i) {
      var u = Qd((i[ft] || null).action),
        f = a.submitter;
      f &&
        ((t = (t = f[ft] || null)
          ? Qd(t.formAction)
          : f.getAttribute("formAction")),
        t !== null && ((u = t), (f = null)));
      var p = new _i("action", "action", null, a, i);
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (oa !== 0) {
                  var x = f ? Zd(i, f) : new FormData(i);
                  Zu(
                    l,
                    { pending: !0, data: x, method: i.method, action: u },
                    null,
                    x
                  );
                }
              } else
                typeof u == "function" &&
                  (p.preventDefault(),
                  (x = f ? Zd(i, f) : new FormData(i)),
                  Zu(
                    l,
                    { pending: !0, data: x, method: i.method, action: u },
                    u,
                    x
                  ));
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var Ls = 0; Ls < Bo.length; Ls++) {
    var qs = Bo[Ls],
      qp = qs.toLowerCase(),
      kp = qs[0].toUpperCase() + qs.slice(1);
    Bt(qp, "on" + kp);
  }
  Bt(_o, "onAnimationEnd"),
    Bt(Do, "onAnimationIteration"),
    Bt(Mo, "onAnimationStart"),
    Bt("dblclick", "onDoubleClick"),
    Bt("focusin", "onFocus"),
    Bt("focusout", "onBlur"),
    Bt(ap, "onTransitionRun"),
    Bt(np, "onTransitionStart"),
    Bt(ip, "onTransitionCancel"),
    Bt(Uo, "onTransitionEnd"),
    Sa("onMouseEnter", ["mouseout", "mouseover"]),
    Sa("onMouseLeave", ["mouseout", "mouseover"]),
    Sa("onPointerEnter", ["pointerout", "pointerover"]),
    Sa("onPointerLeave", ["pointerout", "pointerover"]),
    Ql(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Ql(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Ql("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Ql(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Ql(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Ql(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var Kn =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    Gp = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Kn)
    );
  function Kd(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l],
        i = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var f = a.length - 1; 0 <= f; f--) {
            var p = a[f],
              x = p.instance,
              j = p.currentTarget;
            if (((p = p.listener), x !== u && i.isPropagationStopped()))
              break e;
            (u = p), (i.currentTarget = j);
            try {
              u(i);
            } catch (L) {
              er(L);
            }
            (i.currentTarget = null), (u = x);
          }
        else
          for (f = 0; f < a.length; f++) {
            if (
              ((p = a[f]),
              (x = p.instance),
              (j = p.currentTarget),
              (p = p.listener),
              x !== u && i.isPropagationStopped())
            )
              break e;
            (u = p), (i.currentTarget = j);
            try {
              u(i);
            } catch (L) {
              er(L);
            }
            (i.currentTarget = null), (u = x);
          }
      }
    }
  }
  function Ee(e, t) {
    var l = t[tu];
    l === void 0 && (l = t[tu] = new Set());
    var a = e + "__bubble";
    l.has(a) || (Jd(t, e, 2, !1), l.add(a));
  }
  function ks(e, t, l) {
    var a = 0;
    t && (a |= 4), Jd(l, e, a, t);
  }
  var gr = "_reactListening" + Math.random().toString(36).slice(2);
  function Gs(e) {
    if (!e[gr]) {
      (e[gr] = !0),
        $c.forEach(function (l) {
          l !== "selectionchange" && (Gp.has(l) || ks(l, !1, e), ks(l, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[gr] || ((t[gr] = !0), ks("selectionchange", !1, t));
    }
  }
  function Jd(e, t, l, a) {
    switch (yh(t)) {
      case 2:
        var i = hy;
        break;
      case 8:
        i = my;
        break;
      default:
        i = ec;
    }
    (l = i.bind(null, t, l, e)),
      (i = void 0),
      !cu ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (i = !0),
      a
        ? i !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: i })
          : e.addEventListener(t, l, !0)
        : i !== void 0
        ? e.addEventListener(t, l, { passive: i })
        : e.addEventListener(t, l, !1);
  }
  function Ys(e, t, l, a, i) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var p = a.stateNode.containerInfo;
          if (p === i || (p.nodeType === 8 && p.parentNode === i)) break;
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var x = f.tag;
              if (
                (x === 3 || x === 4) &&
                ((x = f.stateNode.containerInfo),
                x === i || (x.nodeType === 8 && x.parentNode === i))
              )
                return;
              f = f.return;
            }
          for (; p !== null; ) {
            if (((f = Xl(p)), f === null)) return;
            if (((x = f.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              a = u = f;
              continue e;
            }
            p = p.parentNode;
          }
        }
        a = a.return;
      }
    uo(function () {
      var j = u,
        L = uu(l),
        k = [];
      e: {
        var D = Ho.get(e);
        if (D !== void 0) {
          var B = _i,
            ae = e;
          switch (e) {
            case "keypress":
              if (Ci(l) === 0) break e;
            case "keydown":
            case "keyup":
              B = Mg;
              break;
            case "focusin":
              (ae = "focus"), (B = hu);
              break;
            case "focusout":
              (ae = "blur"), (B = hu);
              break;
            case "beforeblur":
            case "afterblur":
              B = hu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              B = oo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              B = Eg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              B = Bg;
              break;
            case _o:
            case Do:
            case Mo:
              B = jg;
              break;
            case Uo:
              B = qg;
              break;
            case "scroll":
            case "scrollend":
              B = xg;
              break;
            case "wheel":
              B = Gg;
              break;
            case "copy":
            case "cut":
            case "paste":
              B = Rg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              B = ho;
              break;
            case "toggle":
            case "beforetoggle":
              B = Vg;
          }
          var fe = (t & 4) !== 0,
            qe = !fe && (e === "scroll" || e === "scrollend"),
            A = fe ? (D !== null ? D + "Capture" : null) : D;
          fe = [];
          for (var w = j, z; w !== null; ) {
            var q = w;
            if (
              ((z = q.stateNode),
              (q = q.tag),
              (q !== 5 && q !== 26 && q !== 27) ||
                z === null ||
                A === null ||
                ((q = dn(w, A)), q != null && fe.push(Jn(w, q, z))),
              qe)
            )
              break;
            w = w.return;
          }
          0 < fe.length &&
            ((D = new B(D, ae, null, l, L)),
            k.push({ event: D, listeners: fe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((D = e === "mouseover" || e === "pointerover"),
            (B = e === "mouseout" || e === "pointerout"),
            D &&
              l !== ru &&
              (ae = l.relatedTarget || l.fromElement) &&
              (Xl(ae) || ae[ba]))
          )
            break e;
          if (
            (B || D) &&
            ((D =
              L.window === L
                ? L
                : (D = L.ownerDocument)
                ? D.defaultView || D.parentWindow
                : window),
            B
              ? ((ae = l.relatedTarget || l.toElement),
                (B = j),
                (ae = ae ? Xl(ae) : null),
                ae !== null &&
                  ((qe = P(ae)),
                  (fe = ae.tag),
                  ae !== qe || (fe !== 5 && fe !== 27 && fe !== 6)) &&
                  (ae = null))
              : ((B = null), (ae = j)),
            B !== ae)
          ) {
            if (
              ((fe = oo),
              (q = "onMouseLeave"),
              (A = "onMouseEnter"),
              (w = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((fe = ho),
                (q = "onPointerLeave"),
                (A = "onPointerEnter"),
                (w = "pointer")),
              (qe = B == null ? D : fn(B)),
              (z = ae == null ? D : fn(ae)),
              (D = new fe(q, w + "leave", B, l, L)),
              (D.target = qe),
              (D.relatedTarget = z),
              (q = null),
              Xl(L) === j &&
                ((fe = new fe(A, w + "enter", ae, l, L)),
                (fe.target = z),
                (fe.relatedTarget = qe),
                (q = fe)),
              (qe = q),
              B && ae)
            )
              t: {
                for (fe = B, A = ae, w = 0, z = fe; z; z = $a(z)) w++;
                for (z = 0, q = A; q; q = $a(q)) z++;
                for (; 0 < w - z; ) (fe = $a(fe)), w--;
                for (; 0 < z - w; ) (A = $a(A)), z--;
                for (; w--; ) {
                  if (fe === A || (A !== null && fe === A.alternate)) break t;
                  (fe = $a(fe)), (A = $a(A));
                }
                fe = null;
              }
            else fe = null;
            B !== null && $d(k, D, B, fe, !1),
              ae !== null && qe !== null && $d(k, qe, ae, fe, !0);
          }
        }
        e: {
          if (
            ((D = j ? fn(j) : window),
            (B = D.nodeName && D.nodeName.toLowerCase()),
            B === "select" || (B === "input" && D.type === "file"))
          )
            var I = So;
          else if (vo(D))
            if (Eo) I = Ig;
            else {
              I = Wg;
              var ve = Fg;
            }
          else
            (B = D.nodeName),
              !B ||
              B.toLowerCase() !== "input" ||
              (D.type !== "checkbox" && D.type !== "radio")
                ? j && iu(j.elementType) && (I = So)
                : (I = Pg);
          if (I && (I = I(e, j))) {
            xo(k, I, l, L);
            break e;
          }
          ve && ve(e, D, j),
            e === "focusout" &&
              j &&
              D.type === "number" &&
              j.memoizedProps.value != null &&
              nu(D, "number", D.value);
        }
        switch (((ve = j ? fn(j) : window), e)) {
          case "focusin":
            (vo(ve) || ve.contentEditable === "true") &&
              ((Ra = ve), (vu = j), (xn = null));
            break;
          case "focusout":
            xn = vu = Ra = null;
            break;
          case "mousedown":
            xu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (xu = !1), Co(k, l, L);
            break;
          case "selectionchange":
            if (lp) break;
          case "keydown":
          case "keyup":
            Co(k, l, L);
        }
        var ie;
        if (gu)
          e: {
            switch (e) {
              case "compositionstart":
                var se = "onCompositionStart";
                break e;
              case "compositionend":
                se = "onCompositionEnd";
                break e;
              case "compositionupdate":
                se = "onCompositionUpdate";
                break e;
            }
            se = void 0;
          }
        else
          Ta
            ? yo(e, l) && (se = "onCompositionEnd")
            : e === "keydown" &&
              l.keyCode === 229 &&
              (se = "onCompositionStart");
        se &&
          (mo &&
            l.locale !== "ko" &&
            (Ta || se !== "onCompositionStart"
              ? se === "onCompositionEnd" && Ta && (ie = so())
              : ((vl = L),
                (ou = "value" in vl ? vl.value : vl.textContent),
                (Ta = !0))),
          (ve = pr(j, se)),
          0 < ve.length &&
            ((se = new fo(se, e, null, l, L)),
            k.push({ event: se, listeners: ve }),
            ie
              ? (se.data = ie)
              : ((ie = bo(l)), ie !== null && (se.data = ie)))),
          (ie = Qg ? Zg(e, l) : Kg(e, l)) &&
            ((se = pr(j, "onBeforeInput")),
            0 < se.length &&
              ((ve = new fo("onBeforeInput", "beforeinput", null, l, L)),
              k.push({ event: ve, listeners: se }),
              (ve.data = ie))),
          Lp(k, e, j, l, L);
      }
      Kd(k, t);
    });
  }
  function Jn(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function pr(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var i = e,
        u = i.stateNode;
      (i = i.tag),
        (i !== 5 && i !== 26 && i !== 27) ||
          u === null ||
          ((i = dn(e, l)),
          i != null && a.unshift(Jn(e, i, u)),
          (i = dn(e, t)),
          i != null && a.push(Jn(e, i, u))),
        (e = e.return);
    }
    return a;
  }
  function $a(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function $d(e, t, l, a, i) {
    for (var u = t._reactName, f = []; l !== null && l !== a; ) {
      var p = l,
        x = p.alternate,
        j = p.stateNode;
      if (((p = p.tag), x !== null && x === a)) break;
      (p !== 5 && p !== 26 && p !== 27) ||
        j === null ||
        ((x = j),
        i
          ? ((j = dn(l, u)), j != null && f.unshift(Jn(l, j, x)))
          : i || ((j = dn(l, u)), j != null && f.push(Jn(l, j, x)))),
        (l = l.return);
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var Yp = /\r\n?/g,
    Vp = /\u0000|\uFFFD/g;
  function Fd(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        Yp,
        `
`
      )
      .replace(Vp, "");
  }
  function Wd(e, t) {
    return (t = Fd(t)), Fd(e) === t;
  }
  function yr() {}
  function Ae(e, t, l, a, i, u) {
    switch (l) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || wa(e, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            wa(e, "" + a);
        break;
      case "className":
        ji(e, "class", a);
        break;
      case "tabIndex":
        ji(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ji(e, l, a);
        break;
      case "style":
        io(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          ji(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          e.removeAttribute(l);
          break;
        }
        (a = Ai("" + a)), e.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" &&
            (l === "formAction"
              ? (t !== "input" && Ae(e, t, "name", i.name, i, null),
                Ae(e, t, "formEncType", i.formEncType, i, null),
                Ae(e, t, "formMethod", i.formMethod, i, null),
                Ae(e, t, "formTarget", i.formTarget, i, null))
              : (Ae(e, t, "encType", i.encType, i, null),
                Ae(e, t, "method", i.method, i, null),
                Ae(e, t, "target", i.target, i, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        (a = Ai("" + a)), e.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (e.onclick = yr);
        break;
      case "onScroll":
        a != null && Ee("scroll", e);
        break;
      case "onScrollEnd":
        a != null && Ee("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(s(61));
          if (((l = a.__html), l != null)) {
            if (i.children != null) throw Error(s(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        (l = Ai("" + a)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "" + a)
          : e.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "")
          : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0
          ? e.setAttribute(l, "")
          : a !== !1 &&
            a != null &&
            typeof a != "function" &&
            typeof a != "symbol"
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? e.removeAttribute(l)
          : e.setAttribute(l, a);
        break;
      case "popover":
        Ee("beforetoggle", e), Ee("toggle", e), Ni(e, "popover", a);
        break;
      case "xlinkActuate":
        It(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        It(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        It(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        It(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        It(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        It(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        It(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        It(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        It(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Ni(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = bg.get(l) || l), Ni(e, l, a));
    }
  }
  function Vs(e, t, l, a, i, u) {
    switch (l) {
      case "style":
        io(e, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(s(61));
          if (((l = a.__html), l != null)) {
            if (i.children != null) throw Error(s(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? wa(e, a)
          : (typeof a == "number" || typeof a == "bigint") && wa(e, "" + a);
        break;
      case "onScroll":
        a != null && Ee("scroll", e);
        break;
      case "onScrollEnd":
        a != null && Ee("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = yr);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Fc.hasOwnProperty(l))
          e: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((i = l.endsWith("Capture")),
              (t = l.slice(2, i ? l.length - 7 : void 0)),
              (u = e[ft] || null),
              (u = u != null ? u[l] : null),
              typeof u == "function" && e.removeEventListener(t, u, i),
              typeof a == "function")
            ) {
              typeof u != "function" &&
                u !== null &&
                (l in e
                  ? (e[l] = null)
                  : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, a, i);
              break e;
            }
            l in e
              ? (e[l] = a)
              : a === !0
              ? e.setAttribute(l, "")
              : Ni(e, l, a);
          }
    }
  }
  function at(e, t, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Ee("error", e), Ee("load", e);
        var a = !1,
          i = !1,
          u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var f = l[u];
            if (f != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  i = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  Ae(e, t, u, f, l, null);
              }
          }
        i && Ae(e, t, "srcSet", l.srcSet, l, null),
          a && Ae(e, t, "src", l.src, l, null);
        return;
      case "input":
        Ee("invalid", e);
        var p = (u = f = i = null),
          x = null,
          j = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var L = l[a];
            if (L != null)
              switch (a) {
                case "name":
                  i = L;
                  break;
                case "type":
                  f = L;
                  break;
                case "checked":
                  x = L;
                  break;
                case "defaultChecked":
                  j = L;
                  break;
                case "value":
                  u = L;
                  break;
                case "defaultValue":
                  p = L;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (L != null) throw Error(s(137, t));
                  break;
                default:
                  Ae(e, t, a, L, l, null);
              }
          }
        to(e, u, p, x, j, f, i, !1), Ti(e);
        return;
      case "select":
        Ee("invalid", e), (a = f = u = null);
        for (i in l)
          if (l.hasOwnProperty(i) && ((p = l[i]), p != null))
            switch (i) {
              case "value":
                u = p;
                break;
              case "defaultValue":
                f = p;
                break;
              case "multiple":
                a = p;
              default:
                Ae(e, t, i, p, l, null);
            }
        (t = u),
          (l = f),
          (e.multiple = !!a),
          t != null ? Ea(e, !!a, t, !1) : l != null && Ea(e, !!a, l, !0);
        return;
      case "textarea":
        Ee("invalid", e), (u = i = a = null);
        for (f in l)
          if (l.hasOwnProperty(f) && ((p = l[f]), p != null))
            switch (f) {
              case "value":
                a = p;
                break;
              case "defaultValue":
                i = p;
                break;
              case "children":
                u = p;
                break;
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(s(91));
                break;
              default:
                Ae(e, t, f, p, l, null);
            }
        ao(e, a, i, u), Ti(e);
        return;
      case "option":
        for (x in l)
          if (l.hasOwnProperty(x) && ((a = l[x]), a != null))
            switch (x) {
              case "selected":
                e.selected =
                  a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Ae(e, t, x, a, l, null);
            }
        return;
      case "dialog":
        Ee("cancel", e), Ee("close", e);
        break;
      case "iframe":
      case "object":
        Ee("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Kn.length; a++) Ee(Kn[a], e);
        break;
      case "image":
        Ee("error", e), Ee("load", e);
        break;
      case "details":
        Ee("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ee("error", e), Ee("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (j in l)
          if (l.hasOwnProperty(j) && ((a = l[j]), a != null))
            switch (j) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                Ae(e, t, j, a, l, null);
            }
        return;
      default:
        if (iu(t)) {
          for (L in l)
            l.hasOwnProperty(L) &&
              ((a = l[L]), a !== void 0 && Vs(e, t, L, a, l, void 0));
          return;
        }
    }
    for (p in l)
      l.hasOwnProperty(p) && ((a = l[p]), a != null && Ae(e, t, p, a, l, null));
  }
  function Xp(e, t, l, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var i = null,
          u = null,
          f = null,
          p = null,
          x = null,
          j = null,
          L = null;
        for (B in l) {
          var k = l[B];
          if (l.hasOwnProperty(B) && k != null)
            switch (B) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                x = k;
              default:
                a.hasOwnProperty(B) || Ae(e, t, B, null, a, k);
            }
        }
        for (var D in a) {
          var B = a[D];
          if (((k = l[D]), a.hasOwnProperty(D) && (B != null || k != null)))
            switch (D) {
              case "type":
                u = B;
                break;
              case "name":
                i = B;
                break;
              case "checked":
                j = B;
                break;
              case "defaultChecked":
                L = B;
                break;
              case "value":
                f = B;
                break;
              case "defaultValue":
                p = B;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null) throw Error(s(137, t));
                break;
              default:
                B !== k && Ae(e, t, D, B, a, k);
            }
        }
        au(e, f, p, x, j, L, u, i);
        return;
      case "select":
        B = f = p = D = null;
        for (u in l)
          if (((x = l[u]), l.hasOwnProperty(u) && x != null))
            switch (u) {
              case "value":
                break;
              case "multiple":
                B = x;
              default:
                a.hasOwnProperty(u) || Ae(e, t, u, null, a, x);
            }
        for (i in a)
          if (
            ((u = a[i]),
            (x = l[i]),
            a.hasOwnProperty(i) && (u != null || x != null))
          )
            switch (i) {
              case "value":
                D = u;
                break;
              case "defaultValue":
                p = u;
                break;
              case "multiple":
                f = u;
              default:
                u !== x && Ae(e, t, i, u, a, x);
            }
        (t = p),
          (l = f),
          (a = B),
          D != null
            ? Ea(e, !!l, D, !1)
            : !!a != !!l &&
              (t != null ? Ea(e, !!l, t, !0) : Ea(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        B = D = null;
        for (p in l)
          if (
            ((i = l[p]),
            l.hasOwnProperty(p) && i != null && !a.hasOwnProperty(p))
          )
            switch (p) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ae(e, t, p, null, a, i);
            }
        for (f in a)
          if (
            ((i = a[f]),
            (u = l[f]),
            a.hasOwnProperty(f) && (i != null || u != null))
          )
            switch (f) {
              case "value":
                D = i;
                break;
              case "defaultValue":
                B = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(s(91));
                break;
              default:
                i !== u && Ae(e, t, f, i, a, u);
            }
        lo(e, D, B);
        return;
      case "option":
        for (var ae in l)
          if (
            ((D = l[ae]),
            l.hasOwnProperty(ae) && D != null && !a.hasOwnProperty(ae))
          )
            switch (ae) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ae(e, t, ae, null, a, D);
            }
        for (x in a)
          if (
            ((D = a[x]),
            (B = l[x]),
            a.hasOwnProperty(x) && D !== B && (D != null || B != null))
          )
            switch (x) {
              case "selected":
                e.selected =
                  D && typeof D != "function" && typeof D != "symbol";
                break;
              default:
                Ae(e, t, x, D, a, B);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var fe in l)
          (D = l[fe]),
            l.hasOwnProperty(fe) &&
              D != null &&
              !a.hasOwnProperty(fe) &&
              Ae(e, t, fe, null, a, D);
        for (j in a)
          if (
            ((D = a[j]),
            (B = l[j]),
            a.hasOwnProperty(j) && D !== B && (D != null || B != null))
          )
            switch (j) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null) throw Error(s(137, t));
                break;
              default:
                Ae(e, t, j, D, a, B);
            }
        return;
      default:
        if (iu(t)) {
          for (var qe in l)
            (D = l[qe]),
              l.hasOwnProperty(qe) &&
                D !== void 0 &&
                !a.hasOwnProperty(qe) &&
                Vs(e, t, qe, void 0, a, D);
          for (L in a)
            (D = a[L]),
              (B = l[L]),
              !a.hasOwnProperty(L) ||
                D === B ||
                (D === void 0 && B === void 0) ||
                Vs(e, t, L, D, a, B);
          return;
        }
    }
    for (var A in l)
      (D = l[A]),
        l.hasOwnProperty(A) &&
          D != null &&
          !a.hasOwnProperty(A) &&
          Ae(e, t, A, null, a, D);
    for (k in a)
      (D = a[k]),
        (B = l[k]),
        !a.hasOwnProperty(k) ||
          D === B ||
          (D == null && B == null) ||
          Ae(e, t, k, D, a, B);
  }
  var Xs = null,
    Qs = null;
  function br(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Pd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Id(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Zs(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Ks = null;
  function Qp() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === Ks
        ? !1
        : ((Ks = e), !0)
      : ((Ks = null), !1);
  }
  var eh = typeof setTimeout == "function" ? setTimeout : void 0,
    Zp = typeof clearTimeout == "function" ? clearTimeout : void 0,
    th = typeof Promise == "function" ? Promise : void 0,
    Kp =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof th < "u"
        ? function (e) {
            return th.resolve(null).then(e).catch(Jp);
          }
        : eh;
  function Jp(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Js(e, t) {
    var l = t,
      a = 0;
    do {
      var i = l.nextSibling;
      if ((e.removeChild(l), i && i.nodeType === 8))
        if (((l = i.data), l === "/$")) {
          if (a === 0) {
            e.removeChild(i), li(t);
            return;
          }
          a--;
        } else (l !== "$" && l !== "$?" && l !== "$!") || a++;
      l = i;
    } while (l);
    li(t);
  }
  function $s(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          $s(l), lu(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function $p(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var i = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (a) {
        if (!e[on])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((u = e.getAttribute("rel")),
                u === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                u !== i.rel ||
                e.getAttribute("href") !== (i.href == null ? null : i.href) ||
                e.getAttribute("crossorigin") !==
                  (i.crossOrigin == null ? null : i.crossOrigin) ||
                e.getAttribute("title") !== (i.title == null ? null : i.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((u = e.getAttribute("src")),
                (u !== (i.src == null ? null : i.src) ||
                  e.getAttribute("type") !== (i.type == null ? null : i.type) ||
                  e.getAttribute("crossorigin") !==
                    (i.crossOrigin == null ? null : i.crossOrigin)) &&
                  u &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && e.getAttribute("name") === u) return e;
      } else return e;
      if (((e = kt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Fp(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !l) ||
        ((e = kt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function kt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function lh(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (t === 0) return e;
          t--;
        } else l === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function ah(e, t, l) {
    switch (((t = br(l)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(s(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(s(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  var Mt = new Map(),
    nh = new Set();
  function vr(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.ownerDocument;
  }
  var ml = W.d;
  W.d = { f: Wp, r: Pp, D: Ip, C: ey, L: ty, m: ly, X: ny, S: ay, M: iy };
  function Wp() {
    var e = ml.f(),
      t = fr();
    return e || t;
  }
  function Pp(e) {
    var t = va(e);
    t !== null && t.tag === 5 && t.type === "form" ? zf(t) : ml.r(e);
  }
  var Fa = typeof document > "u" ? null : document;
  function ih(e, t, l) {
    var a = Fa;
    if (a && typeof t == "string" && t) {
      var i = Nt(t);
      (i = 'link[rel="' + e + '"][href="' + i + '"]'),
        typeof l == "string" && (i += '[crossorigin="' + l + '"]'),
        nh.has(i) ||
          (nh.add(i),
          (e = { rel: e, crossOrigin: l, href: t }),
          a.querySelector(i) === null &&
            ((t = a.createElement("link")),
            at(t, "link", e),
            Fe(t),
            a.head.appendChild(t)));
    }
  }
  function Ip(e) {
    ml.D(e), ih("dns-prefetch", e, null);
  }
  function ey(e, t) {
    ml.C(e, t), ih("preconnect", e, t);
  }
  function ty(e, t, l) {
    ml.L(e, t, l);
    var a = Fa;
    if (a && e && t) {
      var i = 'link[rel="preload"][as="' + Nt(t) + '"]';
      t === "image" && l && l.imageSrcSet
        ? ((i += '[imagesrcset="' + Nt(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (i += '[imagesizes="' + Nt(l.imageSizes) + '"]'))
        : (i += '[href="' + Nt(e) + '"]');
      var u = i;
      switch (t) {
        case "style":
          u = Wa(e);
          break;
        case "script":
          u = Pa(e);
      }
      Mt.has(u) ||
        ((e = le(
          {
            rel: "preload",
            href: t === "image" && l && l.imageSrcSet ? void 0 : e,
            as: t,
          },
          l
        )),
        Mt.set(u, e),
        a.querySelector(i) !== null ||
          (t === "style" && a.querySelector($n(u))) ||
          (t === "script" && a.querySelector(Fn(u))) ||
          ((t = a.createElement("link")),
          at(t, "link", e),
          Fe(t),
          a.head.appendChild(t)));
    }
  }
  function ly(e, t) {
    ml.m(e, t);
    var l = Fa;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        i =
          'link[rel="modulepreload"][as="' + Nt(a) + '"][href="' + Nt(e) + '"]',
        u = i;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Pa(e);
      }
      if (
        !Mt.has(u) &&
        ((e = le({ rel: "modulepreload", href: e }, t)),
        Mt.set(u, e),
        l.querySelector(i) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Fn(u))) return;
        }
        (a = l.createElement("link")),
          at(a, "link", e),
          Fe(a),
          l.head.appendChild(a);
      }
    }
  }
  function ay(e, t, l) {
    ml.S(e, t, l);
    var a = Fa;
    if (a && e) {
      var i = xa(a).hoistableStyles,
        u = Wa(e);
      t = t || "default";
      var f = i.get(u);
      if (!f) {
        var p = { loading: 0, preload: null };
        if ((f = a.querySelector($n(u)))) p.loading = 5;
        else {
          (e = le({ rel: "stylesheet", href: e, "data-precedence": t }, l)),
            (l = Mt.get(u)) && Fs(e, l);
          var x = (f = a.createElement("link"));
          Fe(x),
            at(x, "link", e),
            (x._p = new Promise(function (j, L) {
              (x.onload = j), (x.onerror = L);
            })),
            x.addEventListener("load", function () {
              p.loading |= 1;
            }),
            x.addEventListener("error", function () {
              p.loading |= 2;
            }),
            (p.loading |= 4),
            xr(f, t, a);
        }
        (f = { type: "stylesheet", instance: f, count: 1, state: p }),
          i.set(u, f);
      }
    }
  }
  function ny(e, t) {
    ml.X(e, t);
    var l = Fa;
    if (l && e) {
      var a = xa(l).hoistableScripts,
        i = Pa(e),
        u = a.get(i);
      u ||
        ((u = l.querySelector(Fn(i))),
        u ||
          ((e = le({ src: e, async: !0 }, t)),
          (t = Mt.get(i)) && Ws(e, t),
          (u = l.createElement("script")),
          Fe(u),
          at(u, "link", e),
          l.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(i, u));
    }
  }
  function iy(e, t) {
    ml.M(e, t);
    var l = Fa;
    if (l && e) {
      var a = xa(l).hoistableScripts,
        i = Pa(e),
        u = a.get(i);
      u ||
        ((u = l.querySelector(Fn(i))),
        u ||
          ((e = le({ src: e, async: !0, type: "module" }, t)),
          (t = Mt.get(i)) && Ws(e, t),
          (u = l.createElement("script")),
          Fe(u),
          at(u, "link", e),
          l.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(i, u));
    }
  }
  function rh(e, t, l, a) {
    var i = (i = pl.current) ? vr(i) : null;
    if (!i) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((t = Wa(l.href)),
            (l = xa(i).hoistableStyles),
            (a = l.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              l.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          e = Wa(l.href);
          var u = xa(i).hoistableStyles,
            f = u.get(e);
          if (
            (f ||
              ((i = i.ownerDocument || i),
              (f = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(e, f),
              (u = i.querySelector($n(e))) &&
                !u._p &&
                ((f.instance = u), (f.state.loading = 5)),
              Mt.has(e) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                Mt.set(e, l),
                u || ry(i, e, l, f.state))),
            t && a === null)
          )
            throw Error(s(528, ""));
          return f;
        }
        if (t && a !== null) throw Error(s(529, ""));
        return null;
      case "script":
        return (
          (t = l.async),
          (l = l.src),
          typeof l == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Pa(l)),
              (l = xa(i).hoistableScripts),
              (a = l.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, e));
    }
  }
  function Wa(e) {
    return 'href="' + Nt(e) + '"';
  }
  function $n(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function uh(e) {
    return le({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function ry(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = e.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        at(t, "link", l),
        Fe(t),
        e.head.appendChild(t));
  }
  function Pa(e) {
    return '[src="' + Nt(e) + '"]';
  }
  function Fn(e) {
    return "script[async]" + e;
  }
  function sh(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = e.querySelector('style[data-href~="' + Nt(l.href) + '"]');
          if (a) return (t.instance = a), Fe(a), a;
          var i = le({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement("style")),
            Fe(a),
            at(a, "style", i),
            xr(a, l.precedence, e),
            (t.instance = a)
          );
        case "stylesheet":
          i = Wa(l.href);
          var u = e.querySelector($n(i));
          if (u) return (t.state.loading |= 4), (t.instance = u), Fe(u), u;
          (a = uh(l)),
            (i = Mt.get(i)) && Fs(a, i),
            (u = (e.ownerDocument || e).createElement("link")),
            Fe(u);
          var f = u;
          return (
            (f._p = new Promise(function (p, x) {
              (f.onload = p), (f.onerror = x);
            })),
            at(u, "link", a),
            (t.state.loading |= 4),
            xr(u, l.precedence, e),
            (t.instance = u)
          );
        case "script":
          return (
            (u = Pa(l.src)),
            (i = e.querySelector(Fn(u)))
              ? ((t.instance = i), Fe(i), i)
              : ((a = l),
                (i = Mt.get(u)) && ((a = le({}, l)), Ws(a, i)),
                (e = e.ownerDocument || e),
                (i = e.createElement("script")),
                Fe(i),
                at(i, "link", a),
                e.head.appendChild(i),
                (t.instance = i))
          );
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), xr(a, l.precedence, e));
    return t.instance;
  }
  function xr(e, t, l) {
    for (
      var a = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        i = a.length ? a[a.length - 1] : null,
        u = i,
        f = 0;
      f < a.length;
      f++
    ) {
      var p = a[f];
      if (p.dataset.precedence === t) u = p;
      else if (u !== i) break;
    }
    u
      ? u.parentNode.insertBefore(e, u.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function Fs(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function Ws(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var Sr = null;
  function ch(e, t, l) {
    if (Sr === null) {
      var a = new Map(),
        i = (Sr = new Map());
      i.set(l, a);
    } else (i = Sr), (a = i.get(l)), a || ((a = new Map()), i.set(l, a));
    if (a.has(e)) return a;
    for (
      a.set(e, null), l = l.getElementsByTagName(e), i = 0;
      i < l.length;
      i++
    ) {
      var u = l[i];
      if (
        !(
          u[on] ||
          u[it] ||
          (e === "link" && u.getAttribute("rel") === "stylesheet")
        ) &&
        u.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var f = u.getAttribute(t) || "";
        f = e + f;
        var p = a.get(f);
        p ? p.push(u) : a.set(f, [u]);
      }
    }
    return a;
  }
  function oh(e, t, l) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        l,
        t === "title" ? e.querySelector("head > title") : null
      );
  }
  function uy(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function fh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var Wn = null;
  function sy() {}
  function cy(e, t, l) {
    if (Wn === null) throw Error(s(475));
    var a = Wn;
    if (
      t.type === "stylesheet" &&
      (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var i = Wa(l.href),
          u = e.querySelector($n(i));
        if (u) {
          (e = u._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (a.count++, (a = Er.bind(a)), e.then(a, a)),
            (t.state.loading |= 4),
            (t.instance = u),
            Fe(u);
          return;
        }
        (u = e.ownerDocument || e),
          (l = uh(l)),
          (i = Mt.get(i)) && Fs(l, i),
          (u = u.createElement("link")),
          Fe(u);
        var f = u;
        (f._p = new Promise(function (p, x) {
          (f.onload = p), (f.onerror = x);
        })),
          at(u, "link", l),
          (t.instance = u);
      }
      a.stylesheets === null && (a.stylesheets = new Map()),
        a.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (a.count++,
          (t = Er.bind(a)),
          e.addEventListener("load", t),
          e.addEventListener("error", t));
    }
  }
  function oy() {
    if (Wn === null) throw Error(s(475));
    var e = Wn;
    return (
      e.stylesheets && e.count === 0 && Ps(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var l = setTimeout(function () {
              if ((e.stylesheets && Ps(e, e.stylesheets), e.unsuspend)) {
                var a = e.unsuspend;
                (e.unsuspend = null), a();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(l);
              }
            );
          }
        : null
    );
  }
  function Er() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Ps(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var wr = null;
  function Ps(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (wr = new Map()),
        t.forEach(fy, e),
        (wr = null),
        Er.call(e));
  }
  function fy(e, t) {
    if (!(t.state.loading & 4)) {
      var l = wr.get(e);
      if (l) var a = l.get(null);
      else {
        (l = new Map()), wr.set(e, l);
        for (
          var i = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            u = 0;
          u < i.length;
          u++
        ) {
          var f = i[u];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
            (l.set(f.dataset.precedence, f), (a = f));
        }
        a && l.set(null, a);
      }
      (i = t.instance),
        (f = i.getAttribute("data-precedence")),
        (u = l.get(f) || a),
        u === a && l.set(null, i),
        l.set(f, i),
        this.count++,
        (a = Er.bind(this)),
        i.addEventListener("load", a),
        i.addEventListener("error", a),
        u
          ? u.parentNode.insertBefore(i, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(i, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var Pn = {
    $$typeof: T,
    Provider: null,
    Consumer: null,
    _currentValue: ge,
    _currentValue2: ge,
    _threadCount: 0,
  };
  function dy(e, t, l, a, i, u, f, p) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = eu(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.finishedLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = eu(0)),
      (this.hiddenUpdates = eu(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = i),
      (this.onCaughtError = u),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = p),
      (this.incompleteTransitions = new Map());
  }
  function dh(e, t, l, a, i, u, f, p, x, j, L, k) {
    return (
      (e = new dy(e, t, l, f, p, x, j, k)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = _t(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = Cu()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: a, isDehydrated: l, cache: t }),
      os(u),
      e
    );
  }
  function hh(e) {
    return e ? ((e = Ca), e) : Ca;
  }
  function mh(e, t, l, a, i, u) {
    (i = hh(i)),
      a.context === null ? (a.context = i) : (a.pendingContext = i),
      (a = Rl(t)),
      (a.payload = { element: l }),
      (u = u === void 0 ? null : u),
      u !== null && (a.callback = u),
      (l = Al(e, a, t)),
      l !== null && (ot(l, e, t), Un(l, e, t));
  }
  function gh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Is(e, t) {
    gh(e, t), (e = e.alternate) && gh(e, t);
  }
  function ph(e) {
    if (e.tag === 13) {
      var t = xl(e, 67108864);
      t !== null && ot(t, e, 67108864), Is(e, 67108864);
    }
  }
  var Nr = !0;
  function hy(e, t, l, a) {
    var i = Z.T;
    Z.T = null;
    var u = W.p;
    try {
      (W.p = 2), ec(e, t, l, a);
    } finally {
      (W.p = u), (Z.T = i);
    }
  }
  function my(e, t, l, a) {
    var i = Z.T;
    Z.T = null;
    var u = W.p;
    try {
      (W.p = 8), ec(e, t, l, a);
    } finally {
      (W.p = u), (Z.T = i);
    }
  }
  function ec(e, t, l, a) {
    if (Nr) {
      var i = tc(a);
      if (i === null) Ys(e, t, a, jr, l), bh(e, a);
      else if (py(i, e, t, l, a)) a.stopPropagation();
      else if ((bh(e, a), t & 4 && -1 < gy.indexOf(e))) {
        for (; i !== null; ) {
          var u = va(i);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var f = Vl(u.pendingLanes);
                  if (f !== 0) {
                    var p = u;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; f; ) {
                      var x = 1 << (31 - pt(f));
                      (p.entanglements[1] |= x), (f &= ~x);
                    }
                    Jt(u), (Ue & 6) === 0 && ((sr = Vt() + 500), Zn(0));
                  }
                }
                break;
              case 13:
                (p = xl(u, 2)), p !== null && ot(p, u, 2), fr(), Is(u, 2);
            }
          if (((u = tc(a)), u === null && Ys(e, t, a, jr, l), u === i)) break;
          i = u;
        }
        i !== null && a.stopPropagation();
      } else Ys(e, t, a, null, l);
    }
  }
  function tc(e) {
    return (e = uu(e)), lc(e);
  }
  var jr = null;
  function lc(e) {
    if (((jr = null), (e = Xl(e)), e !== null)) {
      var t = P(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = he(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (jr = e), null;
  }
  function yh(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (eg()) {
          case qc:
            return 2;
          case kc:
            return 8;
          case xi:
          case tg:
            return 32;
          case Gc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ac = !1,
    Ul = null,
    Hl = null,
    Bl = null,
    In = new Map(),
    ei = new Map(),
    Ll = [],
    gy =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function bh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ul = null;
        break;
      case "dragenter":
      case "dragleave":
        Hl = null;
        break;
      case "mouseover":
      case "mouseout":
        Bl = null;
        break;
      case "pointerover":
      case "pointerout":
        In.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ei.delete(t.pointerId);
    }
  }
  function ti(e, t, l, a, i, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: u,
          targetContainers: [i],
        }),
        t !== null && ((t = va(t)), t !== null && ph(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e);
  }
  function py(e, t, l, a, i) {
    switch (t) {
      case "focusin":
        return (Ul = ti(Ul, e, t, l, a, i)), !0;
      case "dragenter":
        return (Hl = ti(Hl, e, t, l, a, i)), !0;
      case "mouseover":
        return (Bl = ti(Bl, e, t, l, a, i)), !0;
      case "pointerover":
        var u = i.pointerId;
        return In.set(u, ti(In.get(u) || null, e, t, l, a, i)), !0;
      case "gotpointercapture":
        return (
          (u = i.pointerId), ei.set(u, ti(ei.get(u) || null, e, t, l, a, i)), !0
        );
    }
    return !1;
  }
  function vh(e) {
    var t = Xl(e.target);
    if (t !== null) {
      var l = P(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = he(l)), t !== null)) {
            (e.blockedOn = t),
              og(e.priority, function () {
                if (l.tag === 13) {
                  var a = St(),
                    i = xl(l, a);
                  i !== null && ot(i, l, a), Is(l, a);
                }
              });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Tr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = tc(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(l.type, l);
        (ru = a), l.target.dispatchEvent(a), (ru = null);
      } else return (t = va(l)), t !== null && ph(t), (e.blockedOn = l), !1;
      t.shift();
    }
    return !0;
  }
  function xh(e, t, l) {
    Tr(e) && l.delete(t);
  }
  function yy() {
    (ac = !1),
      Ul !== null && Tr(Ul) && (Ul = null),
      Hl !== null && Tr(Hl) && (Hl = null),
      Bl !== null && Tr(Bl) && (Bl = null),
      In.forEach(xh),
      ei.forEach(xh);
  }
  function Rr(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      ac ||
        ((ac = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, yy)));
  }
  var Ar = null;
  function Sh(e) {
    Ar !== e &&
      ((Ar = e),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        Ar === e && (Ar = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            a = e[t + 1],
            i = e[t + 2];
          if (typeof a != "function") {
            if (lc(a || l) === null) continue;
            break;
          }
          var u = va(l);
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Zu(u, { pending: !0, data: i, method: l.method, action: a }, a, i));
        }
      }));
  }
  function li(e) {
    function t(x) {
      return Rr(x, e);
    }
    Ul !== null && Rr(Ul, e),
      Hl !== null && Rr(Hl, e),
      Bl !== null && Rr(Bl, e),
      In.forEach(t),
      ei.forEach(t);
    for (var l = 0; l < Ll.length; l++) {
      var a = Ll[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Ll.length && ((l = Ll[0]), l.blockedOn === null); )
      vh(l), l.blockedOn === null && Ll.shift();
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var i = l[a],
          u = l[a + 1],
          f = i[ft] || null;
        if (typeof u == "function") f || Sh(l);
        else if (f) {
          var p = null;
          if (u && u.hasAttribute("formAction")) {
            if (((i = u), (f = u[ft] || null))) p = f.formAction;
            else if (lc(i) !== null) continue;
          } else p = f.action;
          typeof p == "function" ? (l[a + 1] = p) : (l.splice(a, 3), (a -= 3)),
            Sh(l);
        }
      }
  }
  function nc(e) {
    this._internalRoot = e;
  }
  (Or.prototype.render = nc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      var l = t.current,
        a = St();
      mh(l, a, e, t, null, null);
    }),
    (Or.prototype.unmount = nc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          e.tag === 0 && Ka(),
            mh(e.current, 2, null, e, null, null),
            fr(),
            (t[ba] = null);
        }
      });
  function Or(e) {
    this._internalRoot = e;
  }
  Or.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Kc();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Ll.length && t !== 0 && t < Ll[l].priority; l++);
      Ll.splice(l, 0, e), l === 0 && vh(e);
    }
  };
  var Eh = r.version;
  if (Eh !== "19.0.0") throw Error(s(527, Eh, "19.0.0"));
  W.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(s(188))
        : ((e = Object.keys(e).join(",")), Error(s(268, e)));
    return (
      (e = V(t)),
      (e = e !== null ? ue(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var by = {
    bundleType: 0,
    version: "19.0.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: Z,
    findFiberByHostInstance: Xl,
    reconcilerVersion: "19.0.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Cr.isDisabled && Cr.supportsFiber)
      try {
        (un = Cr.inject(by)), (gt = Cr);
      } catch {}
  }
  return (
    (ni.createRoot = function (e, t) {
      if (!o(e)) throw Error(s(299));
      var l = !1,
        a = "",
        i = qf,
        u = kf,
        f = Gf,
        p = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (p = t.unstable_transitionCallbacks)),
        (t = dh(e, 1, !1, null, null, l, a, i, u, f, p, null)),
        (e[ba] = t.current),
        Gs(e.nodeType === 8 ? e.parentNode : e),
        new nc(t)
      );
    }),
    (ni.hydrateRoot = function (e, t, l) {
      if (!o(e)) throw Error(s(299));
      var a = !1,
        i = "",
        u = qf,
        f = kf,
        p = Gf,
        x = null,
        j = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (i = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (p = l.onRecoverableError),
          l.unstable_transitionCallbacks !== void 0 &&
            (x = l.unstable_transitionCallbacks),
          l.formState !== void 0 && (j = l.formState)),
        (t = dh(e, 1, !0, t, l ?? null, a, i, u, f, p, x, j)),
        (t.context = hh(null)),
        (l = t.current),
        (a = St()),
        (i = Rl(a)),
        (i.callback = null),
        Al(l, i, a),
        (t.current.lanes = a),
        cn(t, a),
        Jt(t),
        (e[ba] = t.current),
        Gs(e),
        new Or(t)
      );
    }),
    (ni.version = "19.0.0"),
    ni
  );
}
var _h;
function Ay() {
  if (_h) return uc.exports;
  _h = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), (uc.exports = Ry()), uc.exports;
}
var Oy = Ay(),
  ii = {},
  Dh;
function Cy() {
  if (Dh) return ii;
  (Dh = 1),
    Object.defineProperty(ii, "__esModule", { value: !0 }),
    (ii.parse = m),
    (ii.serialize = g);
  const n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    r = /^[\u0021-\u003A\u003C-\u007E]*$/,
    c =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    s = /^[\u0020-\u003A\u003D-\u007E]*$/,
    o = Object.prototype.toString,
    h = (() => {
      const N = function () {};
      return (N.prototype = Object.create(null)), N;
    })();
  function m(N, T) {
    const v = new h(),
      _ = N.length;
    if (_ < 2) return v;
    const C = (T == null ? void 0 : T.decode) || S;
    let M = 0;
    do {
      const X = N.indexOf("=", M);
      if (X === -1) break;
      const Q = N.indexOf(";", M),
        J = Q === -1 ? _ : Q;
      if (X > J) {
        M = N.lastIndexOf(";", X - 1) + 1;
        continue;
      }
      const G = b(N, M, X),
        U = y(N, X, G),
        F = N.slice(G, U);
      if (v[F] === void 0) {
        let re = b(N, X + 1, J),
          Z = y(N, J, re);
        const le = C(N.slice(re, Z));
        v[F] = le;
      }
      M = J + 1;
    } while (M < _);
    return v;
  }
  function b(N, T, v) {
    do {
      const _ = N.charCodeAt(T);
      if (_ !== 32 && _ !== 9) return T;
    } while (++T < v);
    return v;
  }
  function y(N, T, v) {
    for (; T > v; ) {
      const _ = N.charCodeAt(--T);
      if (_ !== 32 && _ !== 9) return T + 1;
    }
    return v;
  }
  function g(N, T, v) {
    const _ = (v == null ? void 0 : v.encode) || encodeURIComponent;
    if (!n.test(N)) throw new TypeError(`argument name is invalid: ${N}`);
    const C = _(T);
    if (!r.test(C)) throw new TypeError(`argument val is invalid: ${T}`);
    let M = N + "=" + C;
    if (!v) return M;
    if (v.maxAge !== void 0) {
      if (!Number.isInteger(v.maxAge))
        throw new TypeError(`option maxAge is invalid: ${v.maxAge}`);
      M += "; Max-Age=" + v.maxAge;
    }
    if (v.domain) {
      if (!c.test(v.domain))
        throw new TypeError(`option domain is invalid: ${v.domain}`);
      M += "; Domain=" + v.domain;
    }
    if (v.path) {
      if (!s.test(v.path))
        throw new TypeError(`option path is invalid: ${v.path}`);
      M += "; Path=" + v.path;
    }
    if (v.expires) {
      if (!R(v.expires) || !Number.isFinite(v.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${v.expires}`);
      M += "; Expires=" + v.expires.toUTCString();
    }
    if (
      (v.httpOnly && (M += "; HttpOnly"),
      v.secure && (M += "; Secure"),
      v.partitioned && (M += "; Partitioned"),
      v.priority)
    )
      switch (
        typeof v.priority == "string" ? v.priority.toLowerCase() : void 0
      ) {
        case "low":
          M += "; Priority=Low";
          break;
        case "medium":
          M += "; Priority=Medium";
          break;
        case "high":
          M += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${v.priority}`);
      }
    if (v.sameSite)
      switch (
        typeof v.sameSite == "string" ? v.sameSite.toLowerCase() : v.sameSite
      ) {
        case !0:
        case "strict":
          M += "; SameSite=Strict";
          break;
        case "lax":
          M += "; SameSite=Lax";
          break;
        case "none":
          M += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${v.sameSite}`);
      }
    return M;
  }
  function S(N) {
    if (N.indexOf("%") === -1) return N;
    try {
      return decodeURIComponent(N);
    } catch {
      return N;
    }
  }
  function R(N) {
    return o.call(N) === "[object Date]";
  }
  return ii;
}
Cy();
/**
 * react-router v7.2.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Mh = "popstate";
function zy(n = {}) {
  function r(s, o) {
    let { pathname: h, search: m, hash: b } = s.location;
    return yc(
      "",
      { pathname: h, search: m, hash: b },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default"
    );
  }
  function c(s, o) {
    return typeof o == "string" ? o : ci(o);
  }
  return Dy(r, c, null, n);
}
function He(n, r) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(r);
}
function Ft(n, r) {
  if (!n) {
    typeof console < "u" && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function _y() {
  return Math.random().toString(36).substring(2, 10);
}
function Uh(n, r) {
  return { usr: n.state, key: n.key, idx: r };
}
function yc(n, r, c = null, s) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...(typeof r == "string" ? en(r) : r),
    state: c,
    key: (r && r.key) || s || _y(),
  };
}
function ci({ pathname: n = "/", search: r = "", hash: c = "" }) {
  return (
    r && r !== "?" && (n += r.charAt(0) === "?" ? r : "?" + r),
    c && c !== "#" && (n += c.charAt(0) === "#" ? c : "#" + c),
    n
  );
}
function en(n) {
  let r = {};
  if (n) {
    let c = n.indexOf("#");
    c >= 0 && ((r.hash = n.substring(c)), (n = n.substring(0, c)));
    let s = n.indexOf("?");
    s >= 0 && ((r.search = n.substring(s)), (n = n.substring(0, s))),
      n && (r.pathname = n);
  }
  return r;
}
function Dy(n, r, c, s = {}) {
  let { window: o = document.defaultView, v5Compat: h = !1 } = s,
    m = o.history,
    b = "POP",
    y = null,
    g = S();
  g == null && ((g = 0), m.replaceState({ ...m.state, idx: g }, ""));
  function S() {
    return (m.state || { idx: null }).idx;
  }
  function R() {
    b = "POP";
    let C = S(),
      M = C == null ? null : C - g;
    (g = C), y && y({ action: b, location: _.location, delta: M });
  }
  function N(C, M) {
    b = "PUSH";
    let X = yc(_.location, C, M);
    g = S() + 1;
    let Q = Uh(X, g),
      J = _.createHref(X);
    try {
      m.pushState(Q, "", J);
    } catch (G) {
      if (G instanceof DOMException && G.name === "DataCloneError") throw G;
      o.location.assign(J);
    }
    h && y && y({ action: b, location: _.location, delta: 1 });
  }
  function T(C, M) {
    b = "REPLACE";
    let X = yc(_.location, C, M);
    g = S();
    let Q = Uh(X, g),
      J = _.createHref(X);
    m.replaceState(Q, "", J),
      h && y && y({ action: b, location: _.location, delta: 0 });
  }
  function v(C) {
    let M = o.location.origin !== "null" ? o.location.origin : o.location.href,
      X = typeof C == "string" ? C : ci(C);
    return (
      (X = X.replace(/ $/, "%20")),
      He(
        M,
        `No window.location.(origin|href) available to create URL for href: ${X}`
      ),
      new URL(X, M)
    );
  }
  let _ = {
    get action() {
      return b;
    },
    get location() {
      return n(o, m);
    },
    listen(C) {
      if (y) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(Mh, R),
        (y = C),
        () => {
          o.removeEventListener(Mh, R), (y = null);
        }
      );
    },
    createHref(C) {
      return r(o, C);
    },
    createURL: v,
    encodeLocation(C) {
      let M = v(C);
      return { pathname: M.pathname, search: M.search, hash: M.hash };
    },
    push: N,
    replace: T,
    go(C) {
      return m.go(C);
    },
  };
  return _;
}
function lm(n, r, c = "/") {
  return My(n, r, c, !1);
}
function My(n, r, c, s) {
  let o = typeof r == "string" ? en(r) : r,
    h = Gl(o.pathname || "/", c);
  if (h == null) return null;
  let m = am(n);
  Uy(m);
  let b = null;
  for (let y = 0; b == null && y < m.length; ++y) {
    let g = Zy(h);
    b = Xy(m[y], g, s);
  }
  return b;
}
function am(n, r = [], c = [], s = "") {
  let o = (h, m, b) => {
    let y = {
      relativePath: b === void 0 ? h.path || "" : b,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h,
    };
    y.relativePath.startsWith("/") &&
      (He(
        y.relativePath.startsWith(s),
        `Absolute route path "${y.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (y.relativePath = y.relativePath.slice(s.length)));
    let g = gl([s, y.relativePath]),
      S = c.concat(y);
    h.children &&
      h.children.length > 0 &&
      (He(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
      ),
      am(h.children, r, S, g)),
      !(h.path == null && !h.index) &&
        r.push({ path: g, score: Yy(g, h.index), routesMeta: S });
  };
  return (
    n.forEach((h, m) => {
      var b;
      if (h.path === "" || !((b = h.path) != null && b.includes("?"))) o(h, m);
      else for (let y of nm(h.path)) o(h, m, y);
    }),
    r
  );
}
function nm(n) {
  let r = n.split("/");
  if (r.length === 0) return [];
  let [c, ...s] = r,
    o = c.endsWith("?"),
    h = c.replace(/\?$/, "");
  if (s.length === 0) return o ? [h, ""] : [h];
  let m = nm(s.join("/")),
    b = [];
  return (
    b.push(...m.map((y) => (y === "" ? h : [h, y].join("/")))),
    o && b.push(...m),
    b.map((y) => (n.startsWith("/") && y === "" ? "/" : y))
  );
}
function Uy(n) {
  n.sort((r, c) =>
    r.score !== c.score
      ? c.score - r.score
      : Vy(
          r.routesMeta.map((s) => s.childrenIndex),
          c.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var Hy = /^:[\w-]+$/,
  By = 3,
  Ly = 2,
  qy = 1,
  ky = 10,
  Gy = -2,
  Hh = (n) => n === "*";
function Yy(n, r) {
  let c = n.split("/"),
    s = c.length;
  return (
    c.some(Hh) && (s += Gy),
    r && (s += Ly),
    c
      .filter((o) => !Hh(o))
      .reduce((o, h) => o + (Hy.test(h) ? By : h === "" ? qy : ky), s)
  );
}
function Vy(n, r) {
  return n.length === r.length && n.slice(0, -1).every((s, o) => s === r[o])
    ? n[n.length - 1] - r[r.length - 1]
    : 0;
}
function Xy(n, r, c = !1) {
  let { routesMeta: s } = n,
    o = {},
    h = "/",
    m = [];
  for (let b = 0; b < s.length; ++b) {
    let y = s[b],
      g = b === s.length - 1,
      S = h === "/" ? r : r.slice(h.length) || "/",
      R = Lr(
        { path: y.relativePath, caseSensitive: y.caseSensitive, end: g },
        S
      ),
      N = y.route;
    if (
      (!R &&
        g &&
        c &&
        !s[s.length - 1].route.index &&
        (R = Lr(
          { path: y.relativePath, caseSensitive: y.caseSensitive, end: !1 },
          S
        )),
      !R)
    )
      return null;
    Object.assign(o, R.params),
      m.push({
        params: o,
        pathname: gl([h, R.pathname]),
        pathnameBase: Fy(gl([h, R.pathnameBase])),
        route: N,
      }),
      R.pathnameBase !== "/" && (h = gl([h, R.pathnameBase]));
  }
  return m;
}
function Lr(n, r) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [c, s] = Qy(n.path, n.caseSensitive, n.end),
    o = r.match(c);
  if (!o) return null;
  let h = o[0],
    m = h.replace(/(.)\/+$/, "$1"),
    b = o.slice(1);
  return {
    params: s.reduce((g, { paramName: S, isOptional: R }, N) => {
      if (S === "*") {
        let v = b[N] || "";
        m = h.slice(0, h.length - v.length).replace(/(.)\/+$/, "$1");
      }
      const T = b[N];
      return (
        R && !T ? (g[S] = void 0) : (g[S] = (T || "").replace(/%2F/g, "/")), g
      );
    }, {}),
    pathname: h,
    pathnameBase: m,
    pattern: n,
  };
}
function Qy(n, r = !1, c = !0) {
  Ft(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let s = [],
    o =
      "^" +
      n
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (m, b, y) => (
            s.push({ paramName: b, isOptional: y != null }),
            y ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    n.endsWith("*")
      ? (s.push({ paramName: "*" }),
        (o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : c
      ? (o += "\\/*$")
      : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, r ? void 0 : "i"), s]
  );
}
function Zy(n) {
  try {
    return n
      .split("/")
      .map((r) => decodeURIComponent(r).replace(/\//g, "%2F"))
      .join("/");
  } catch (r) {
    return (
      Ft(
        !1,
        `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`
      ),
      n
    );
  }
}
function Gl(n, r) {
  if (r === "/") return n;
  if (!n.toLowerCase().startsWith(r.toLowerCase())) return null;
  let c = r.endsWith("/") ? r.length - 1 : r.length,
    s = n.charAt(c);
  return s && s !== "/" ? null : n.slice(c) || "/";
}
function Ky(n, r = "/") {
  let {
    pathname: c,
    search: s = "",
    hash: o = "",
  } = typeof n == "string" ? en(n) : n;
  return {
    pathname: c ? (c.startsWith("/") ? c : Jy(c, r)) : r,
    search: Wy(s),
    hash: Py(o),
  };
}
function Jy(n, r) {
  let c = r.replace(/\/+$/, "").split("/");
  return (
    n.split("/").forEach((o) => {
      o === ".." ? c.length > 1 && c.pop() : o !== "." && c.push(o);
    }),
    c.length > 1 ? c.join("/") : "/"
  );
}
function fc(n, r, c, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${r}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${c}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function $y(n) {
  return n.filter(
    (r, c) => c === 0 || (r.route.path && r.route.path.length > 0)
  );
}
function im(n) {
  let r = $y(n);
  return r.map((c, s) => (s === r.length - 1 ? c.pathname : c.pathnameBase));
}
function rm(n, r, c, s = !1) {
  let o;
  typeof n == "string"
    ? (o = en(n))
    : ((o = { ...n }),
      He(
        !o.pathname || !o.pathname.includes("?"),
        fc("?", "pathname", "search", o)
      ),
      He(
        !o.pathname || !o.pathname.includes("#"),
        fc("#", "pathname", "hash", o)
      ),
      He(!o.search || !o.search.includes("#"), fc("#", "search", "hash", o)));
  let h = n === "" || o.pathname === "",
    m = h ? "/" : o.pathname,
    b;
  if (m == null) b = c;
  else {
    let R = r.length - 1;
    if (!s && m.startsWith("..")) {
      let N = m.split("/");
      for (; N[0] === ".."; ) N.shift(), (R -= 1);
      o.pathname = N.join("/");
    }
    b = R >= 0 ? r[R] : "/";
  }
  let y = Ky(o, b),
    g = m && m !== "/" && m.endsWith("/"),
    S = (h || m === ".") && c.endsWith("/");
  return !y.pathname.endsWith("/") && (g || S) && (y.pathname += "/"), y;
}
var gl = (n) => n.join("/").replace(/\/\/+/g, "/"),
  Fy = (n) => n.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Wy = (n) => (!n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n),
  Py = (n) => (!n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n);
function Iy(n) {
  return (
    n != null &&
    typeof n.status == "number" &&
    typeof n.statusText == "string" &&
    typeof n.internal == "boolean" &&
    "data" in n
  );
}
var um = ["POST", "PUT", "PATCH", "DELETE"];
new Set(um);
var e0 = ["GET", ...um];
new Set(e0);
var tn = O.createContext(null);
tn.displayName = "DataRouter";
var Gr = O.createContext(null);
Gr.displayName = "DataRouterState";
var sm = O.createContext({ isTransitioning: !1 });
sm.displayName = "ViewTransition";
var t0 = O.createContext(new Map());
t0.displayName = "Fetchers";
var l0 = O.createContext(null);
l0.displayName = "Await";
var Wt = O.createContext(null);
Wt.displayName = "Navigation";
var di = O.createContext(null);
di.displayName = "Location";
var Gt = O.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Gt.displayName = "Route";
var Oc = O.createContext(null);
Oc.displayName = "RouteError";
function a0(n, { relative: r } = {}) {
  He(
    hi(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: c, navigator: s } = O.useContext(Wt),
    { hash: o, pathname: h, search: m } = mi(n, { relative: r }),
    b = h;
  return (
    c !== "/" && (b = h === "/" ? c : gl([c, h])),
    s.createHref({ pathname: b, search: m, hash: o })
  );
}
function hi() {
  return O.useContext(di) != null;
}
function pa() {
  return (
    He(
      hi(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    O.useContext(di).location
  );
}
var cm =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function om(n) {
  O.useContext(Wt).static || O.useLayoutEffect(n);
}
function Yr() {
  let { isDataRoute: n } = O.useContext(Gt);
  return n ? v0() : n0();
}
function n0() {
  He(
    hi(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = O.useContext(tn),
    { basename: r, navigator: c } = O.useContext(Wt),
    { matches: s } = O.useContext(Gt),
    { pathname: o } = pa(),
    h = JSON.stringify(im(s)),
    m = O.useRef(!1);
  return (
    om(() => {
      m.current = !0;
    }),
    O.useCallback(
      (y, g = {}) => {
        if ((Ft(m.current, cm), !m.current)) return;
        if (typeof y == "number") {
          c.go(y);
          return;
        }
        let S = rm(y, JSON.parse(h), o, g.relative === "path");
        n == null &&
          r !== "/" &&
          (S.pathname = S.pathname === "/" ? r : gl([r, S.pathname])),
          (g.replace ? c.replace : c.push)(S, g.state, g);
      },
      [r, c, h, o, n]
    )
  );
}
var i0 = O.createContext(null);
function r0(n) {
  let r = O.useContext(Gt).outlet;
  return r && O.createElement(i0.Provider, { value: n }, r);
}
function u0() {
  let { matches: n } = O.useContext(Gt),
    r = n[n.length - 1];
  return r ? r.params : {};
}
function mi(n, { relative: r } = {}) {
  let { matches: c } = O.useContext(Gt),
    { pathname: s } = pa(),
    o = JSON.stringify(im(c));
  return O.useMemo(() => rm(n, JSON.parse(o), s, r === "path"), [n, o, s, r]);
}
function s0(n, r) {
  return fm(n, r);
}
function fm(n, r, c, s) {
  var X;
  He(
    hi(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o, static: h } = O.useContext(Wt),
    { matches: m } = O.useContext(Gt),
    b = m[m.length - 1],
    y = b ? b.params : {},
    g = b ? b.pathname : "/",
    S = b ? b.pathnameBase : "/",
    R = b && b.route;
  {
    let Q = (R && R.path) || "";
    dm(
      g,
      !R || Q.endsWith("*") || Q.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${Q}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${Q}"> to <Route path="${
        Q === "/" ? "*" : `${Q}/*`
      }">.`
    );
  }
  let N = pa(),
    T;
  if (r) {
    let Q = typeof r == "string" ? en(r) : r;
    He(
      S === "/" || ((X = Q.pathname) == null ? void 0 : X.startsWith(S)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${S}" but pathname "${Q.pathname}" was given in the \`location\` prop.`
    ),
      (T = Q);
  } else T = N;
  let v = T.pathname || "/",
    _ = v;
  if (S !== "/") {
    let Q = S.replace(/^\//, "").split("/");
    _ = "/" + v.replace(/^\//, "").split("/").slice(Q.length).join("/");
  }
  let C =
    !h && c && c.matches && c.matches.length > 0
      ? c.matches
      : lm(n, { pathname: _ });
  Ft(
    R || C != null,
    `No routes matched location "${T.pathname}${T.search}${T.hash}" `
  ),
    Ft(
      C == null ||
        C[C.length - 1].route.element !== void 0 ||
        C[C.length - 1].route.Component !== void 0 ||
        C[C.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${T.pathname}${T.search}${T.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let M = h0(
    C &&
      C.map((Q) =>
        Object.assign({}, Q, {
          params: Object.assign({}, y, Q.params),
          pathname: gl([
            S,
            o.encodeLocation
              ? o.encodeLocation(Q.pathname).pathname
              : Q.pathname,
          ]),
          pathnameBase:
            Q.pathnameBase === "/"
              ? S
              : gl([
                  S,
                  o.encodeLocation
                    ? o.encodeLocation(Q.pathnameBase).pathname
                    : Q.pathnameBase,
                ]),
        })
      ),
    m,
    c,
    s
  );
  return r && M
    ? O.createElement(
        di.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...T,
            },
            navigationType: "POP",
          },
        },
        M
      )
    : M;
}
function c0() {
  let n = b0(),
    r = Iy(n)
      ? `${n.status} ${n.statusText}`
      : n instanceof Error
      ? n.message
      : JSON.stringify(n),
    c = n instanceof Error ? n.stack : null,
    s = "rgba(200,200,200, 0.5)",
    o = { padding: "0.5rem", backgroundColor: s },
    h = { padding: "2px 4px", backgroundColor: s },
    m = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", n),
    (m = O.createElement(
      O.Fragment,
      null,
      O.createElement("p", null, "💿 Hey developer 👋"),
      O.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        O.createElement("code", { style: h }, "ErrorBoundary"),
        " or",
        " ",
        O.createElement("code", { style: h }, "errorElement"),
        " prop on your route."
      )
    )),
    O.createElement(
      O.Fragment,
      null,
      O.createElement("h2", null, "Unexpected Application Error!"),
      O.createElement("h3", { style: { fontStyle: "italic" } }, r),
      c ? O.createElement("pre", { style: o }, c) : null,
      m
    )
  );
}
var o0 = O.createElement(c0, null),
  f0 = class extends O.Component {
    constructor(n) {
      super(n),
        (this.state = {
          location: n.location,
          revalidation: n.revalidation,
          error: n.error,
        });
    }
    static getDerivedStateFromError(n) {
      return { error: n };
    }
    static getDerivedStateFromProps(n, r) {
      return r.location !== n.location ||
        (r.revalidation !== "idle" && n.revalidation === "idle")
        ? { error: n.error, location: n.location, revalidation: n.revalidation }
        : {
            error: n.error !== void 0 ? n.error : r.error,
            location: r.location,
            revalidation: n.revalidation || r.revalidation,
          };
    }
    componentDidCatch(n, r) {
      console.error(
        "React Router caught the following error during render",
        n,
        r
      );
    }
    render() {
      return this.state.error !== void 0
        ? O.createElement(
            Gt.Provider,
            { value: this.props.routeContext },
            O.createElement(Oc.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function d0({ routeContext: n, match: r, children: c }) {
  let s = O.useContext(tn);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = r.route.id),
    O.createElement(Gt.Provider, { value: n }, c)
  );
}
function h0(n, r = [], c = null, s = null) {
  if (n == null) {
    if (!c) return null;
    if (c.errors) n = c.matches;
    else if (r.length === 0 && !c.initialized && c.matches.length > 0)
      n = c.matches;
    else return null;
  }
  let o = n,
    h = c == null ? void 0 : c.errors;
  if (h != null) {
    let y = o.findIndex(
      (g) => g.route.id && (h == null ? void 0 : h[g.route.id]) !== void 0
    );
    He(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        h
      ).join(",")}`
    ),
      (o = o.slice(0, Math.min(o.length, y + 1)));
  }
  let m = !1,
    b = -1;
  if (c)
    for (let y = 0; y < o.length; y++) {
      let g = o[y];
      if (
        ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (b = y),
        g.route.id)
      ) {
        let { loaderData: S, errors: R } = c,
          N =
            g.route.loader &&
            !S.hasOwnProperty(g.route.id) &&
            (!R || R[g.route.id] === void 0);
        if (g.route.lazy || N) {
          (m = !0), b >= 0 ? (o = o.slice(0, b + 1)) : (o = [o[0]]);
          break;
        }
      }
    }
  return o.reduceRight((y, g, S) => {
    let R,
      N = !1,
      T = null,
      v = null;
    c &&
      ((R = h && g.route.id ? h[g.route.id] : void 0),
      (T = g.route.errorElement || o0),
      m &&
        (b < 0 && S === 0
          ? (dm(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (N = !0),
            (v = null))
          : b === S &&
            ((N = !0), (v = g.route.hydrateFallbackElement || null))));
    let _ = r.concat(o.slice(0, S + 1)),
      C = () => {
        let M;
        return (
          R
            ? (M = T)
            : N
            ? (M = v)
            : g.route.Component
            ? (M = O.createElement(g.route.Component, null))
            : g.route.element
            ? (M = g.route.element)
            : (M = y),
          O.createElement(d0, {
            match: g,
            routeContext: { outlet: y, matches: _, isDataRoute: c != null },
            children: M,
          })
        );
      };
    return c && (g.route.ErrorBoundary || g.route.errorElement || S === 0)
      ? O.createElement(f0, {
          location: c.location,
          revalidation: c.revalidation,
          component: T,
          error: R,
          children: C(),
          routeContext: { outlet: null, matches: _, isDataRoute: !0 },
        })
      : C();
  }, null);
}
function Cc(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function m0(n) {
  let r = O.useContext(tn);
  return He(r, Cc(n)), r;
}
function g0(n) {
  let r = O.useContext(Gr);
  return He(r, Cc(n)), r;
}
function p0(n) {
  let r = O.useContext(Gt);
  return He(r, Cc(n)), r;
}
function zc(n) {
  let r = p0(n),
    c = r.matches[r.matches.length - 1];
  return (
    He(
      c.route.id,
      `${n} can only be used on routes that contain a unique "id"`
    ),
    c.route.id
  );
}
function y0() {
  return zc("useRouteId");
}
function b0() {
  var s;
  let n = O.useContext(Oc),
    r = g0("useRouteError"),
    c = zc("useRouteError");
  return n !== void 0 ? n : (s = r.errors) == null ? void 0 : s[c];
}
function v0() {
  let { router: n } = m0("useNavigate"),
    r = zc("useNavigate"),
    c = O.useRef(!1);
  return (
    om(() => {
      c.current = !0;
    }),
    O.useCallback(
      async (o, h = {}) => {
        Ft(c.current, cm),
          c.current &&
            (typeof o == "number"
              ? n.navigate(o)
              : await n.navigate(o, { fromRouteId: r, ...h }));
      },
      [n, r]
    )
  );
}
var Bh = {};
function dm(n, r, c) {
  !r && !Bh[n] && ((Bh[n] = !0), Ft(!1, c));
}
O.memo(x0);
function x0({ routes: n, future: r, state: c }) {
  return fm(n, void 0, c, r);
}
function S0(n) {
  return r0(n.context);
}
function Ut(n) {
  He(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function E0({
  basename: n = "/",
  children: r = null,
  location: c,
  navigationType: s = "POP",
  navigator: o,
  static: h = !1,
}) {
  He(
    !hi(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = n.replace(/^\/*/, "/"),
    b = O.useMemo(
      () => ({ basename: m, navigator: o, static: h, future: {} }),
      [m, o, h]
    );
  typeof c == "string" && (c = en(c));
  let {
      pathname: y = "/",
      search: g = "",
      hash: S = "",
      state: R = null,
      key: N = "default",
    } = c,
    T = O.useMemo(() => {
      let v = Gl(y, m);
      return v == null
        ? null
        : {
            location: { pathname: v, search: g, hash: S, state: R, key: N },
            navigationType: s,
          };
    }, [m, y, g, S, R, N, s]);
  return (
    Ft(
      T != null,
      `<Router basename="${m}"> is not able to match the URL "${y}${g}${S}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    T == null
      ? null
      : O.createElement(
          Wt.Provider,
          { value: b },
          O.createElement(di.Provider, { children: r, value: T })
        )
  );
}
function w0({ children: n, location: r }) {
  return s0(bc(n), r);
}
function bc(n, r = []) {
  let c = [];
  return (
    O.Children.forEach(n, (s, o) => {
      if (!O.isValidElement(s)) return;
      let h = [...r, o];
      if (s.type === O.Fragment) {
        c.push.apply(c, bc(s.props.children, h));
        return;
      }
      He(
        s.type === Ut,
        `[${
          typeof s.type == "string" ? s.type : s.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        He(
          !s.props.index || !s.props.children,
          "An index route cannot have child routes."
        );
      let m = {
        id: s.props.id || h.join("-"),
        caseSensitive: s.props.caseSensitive,
        element: s.props.element,
        Component: s.props.Component,
        index: s.props.index,
        path: s.props.path,
        loader: s.props.loader,
        action: s.props.action,
        hydrateFallbackElement: s.props.hydrateFallbackElement,
        HydrateFallback: s.props.HydrateFallback,
        errorElement: s.props.errorElement,
        ErrorBoundary: s.props.ErrorBoundary,
        hasErrorBoundary:
          s.props.hasErrorBoundary === !0 ||
          s.props.ErrorBoundary != null ||
          s.props.errorElement != null,
        shouldRevalidate: s.props.shouldRevalidate,
        handle: s.props.handle,
        lazy: s.props.lazy,
      };
      s.props.children && (m.children = bc(s.props.children, h)), c.push(m);
    }),
    c
  );
}
var Dr = "get",
  Mr = "application/x-www-form-urlencoded";
function Vr(n) {
  return n != null && typeof n.tagName == "string";
}
function N0(n) {
  return Vr(n) && n.tagName.toLowerCase() === "button";
}
function j0(n) {
  return Vr(n) && n.tagName.toLowerCase() === "form";
}
function T0(n) {
  return Vr(n) && n.tagName.toLowerCase() === "input";
}
function R0(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function A0(n, r) {
  return n.button === 0 && (!r || r === "_self") && !R0(n);
}
var zr = null;
function O0() {
  if (zr === null)
    try {
      new FormData(document.createElement("form"), 0), (zr = !1);
    } catch {
      zr = !0;
    }
  return zr;
}
var C0 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function dc(n) {
  return n != null && !C0.has(n)
    ? (Ft(
        !1,
        `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Mr}"`
      ),
      null)
    : n;
}
function z0(n, r) {
  let c, s, o, h, m;
  if (j0(n)) {
    let b = n.getAttribute("action");
    (s = b ? Gl(b, r) : null),
      (c = n.getAttribute("method") || Dr),
      (o = dc(n.getAttribute("enctype")) || Mr),
      (h = new FormData(n));
  } else if (N0(n) || (T0(n) && (n.type === "submit" || n.type === "image"))) {
    let b = n.form;
    if (b == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = n.getAttribute("formaction") || b.getAttribute("action");
    if (
      ((s = y ? Gl(y, r) : null),
      (c = n.getAttribute("formmethod") || b.getAttribute("method") || Dr),
      (o =
        dc(n.getAttribute("formenctype")) ||
        dc(b.getAttribute("enctype")) ||
        Mr),
      (h = new FormData(b, n)),
      !O0())
    ) {
      let { name: g, type: S, value: R } = n;
      if (S === "image") {
        let N = g ? `${g}.` : "";
        h.append(`${N}x`, "0"), h.append(`${N}y`, "0");
      } else g && h.append(g, R);
    }
  } else {
    if (Vr(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (c = Dr), (s = null), (o = Mr), (m = n);
  }
  return (
    h && o === "text/plain" && ((m = h), (h = void 0)),
    { action: s, method: c.toLowerCase(), encType: o, formData: h, body: m }
  );
}
function _c(n, r) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(r);
}
async function _0(n, r) {
  if (n.id in r) return r[n.id];
  try {
    let c = await import(n.module);
    return (r[n.id] = c), c;
  } catch (c) {
    return (
      console.error(
        `Error loading route module \`${n.module}\`, reloading page...`
      ),
      console.error(c),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function D0(n) {
  return n == null
    ? !1
    : n.href == null
    ? n.rel === "preload" &&
      typeof n.imageSrcSet == "string" &&
      typeof n.imageSizes == "string"
    : typeof n.rel == "string" && typeof n.href == "string";
}
async function M0(n, r, c) {
  let s = await Promise.all(
    n.map(async (o) => {
      let h = r.routes[o.route.id];
      if (h) {
        let m = await _0(h, c);
        return m.links ? m.links() : [];
      }
      return [];
    })
  );
  return L0(
    s
      .flat(1)
      .filter(D0)
      .filter((o) => o.rel === "stylesheet" || o.rel === "preload")
      .map((o) =>
        o.rel === "stylesheet"
          ? { ...o, rel: "prefetch", as: "style" }
          : { ...o, rel: "prefetch" }
      )
  );
}
function Lh(n, r, c, s, o, h) {
  let m = (y, g) => (c[g] ? y.route.id !== c[g].route.id : !0),
    b = (y, g) => {
      var S;
      return (
        c[g].pathname !== y.pathname ||
        (((S = c[g].route.path) == null ? void 0 : S.endsWith("*")) &&
          c[g].params["*"] !== y.params["*"])
      );
    };
  return h === "assets"
    ? r.filter((y, g) => m(y, g) || b(y, g))
    : h === "data"
    ? r.filter((y, g) => {
        var R;
        let S = s.routes[y.route.id];
        if (!S || !S.hasLoader) return !1;
        if (m(y, g) || b(y, g)) return !0;
        if (y.route.shouldRevalidate) {
          let N = y.route.shouldRevalidate({
            currentUrl: new URL(o.pathname + o.search + o.hash, window.origin),
            currentParams: ((R = c[0]) == null ? void 0 : R.params) || {},
            nextUrl: new URL(n, window.origin),
            nextParams: y.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof N == "boolean") return N;
        }
        return !0;
      })
    : [];
}
function U0(n, r, { includeHydrateFallback: c } = {}) {
  return H0(
    n
      .map((s) => {
        let o = r.routes[s.route.id];
        if (!o) return [];
        let h = [o.module];
        return (
          o.clientActionModule && (h = h.concat(o.clientActionModule)),
          o.clientLoaderModule && (h = h.concat(o.clientLoaderModule)),
          c &&
            o.hydrateFallbackModule &&
            (h = h.concat(o.hydrateFallbackModule)),
          o.imports && (h = h.concat(o.imports)),
          h
        );
      })
      .flat(1)
  );
}
function H0(n) {
  return [...new Set(n)];
}
function B0(n) {
  let r = {},
    c = Object.keys(n).sort();
  for (let s of c) r[s] = n[s];
  return r;
}
function L0(n, r) {
  let c = new Set();
  return (
    new Set(r),
    n.reduce((s, o) => {
      let h = JSON.stringify(B0(o));
      return c.has(h) || (c.add(h), s.push({ key: h, link: o })), s;
    }, [])
  );
}
function q0(n) {
  let r =
    typeof n == "string"
      ? new URL(
          n,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : n;
  return (
    r.pathname === "/"
      ? (r.pathname = "_root.data")
      : (r.pathname = `${r.pathname.replace(/\/$/, "")}.data`),
    r
  );
}
function k0() {
  let n = O.useContext(tn);
  return (
    _c(
      n,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    n
  );
}
function G0() {
  let n = O.useContext(Gr);
  return (
    _c(
      n,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    n
  );
}
var Dc = O.createContext(void 0);
Dc.displayName = "FrameworkContext";
function hm() {
  let n = O.useContext(Dc);
  return (
    _c(n, "You must render this element inside a <HydratedRouter> element"), n
  );
}
function Y0(n, r) {
  let c = O.useContext(Dc),
    [s, o] = O.useState(!1),
    [h, m] = O.useState(!1),
    {
      onFocus: b,
      onBlur: y,
      onMouseEnter: g,
      onMouseLeave: S,
      onTouchStart: R,
    } = r,
    N = O.useRef(null);
  O.useEffect(() => {
    if ((n === "render" && m(!0), n === "viewport")) {
      let _ = (M) => {
          M.forEach((X) => {
            m(X.isIntersecting);
          });
        },
        C = new IntersectionObserver(_, { threshold: 0.5 });
      return (
        N.current && C.observe(N.current),
        () => {
          C.disconnect();
        }
      );
    }
  }, [n]),
    O.useEffect(() => {
      if (s) {
        let _ = setTimeout(() => {
          m(!0);
        }, 100);
        return () => {
          clearTimeout(_);
        };
      }
    }, [s]);
  let T = () => {
      o(!0);
    },
    v = () => {
      o(!1), m(!1);
    };
  return c
    ? n !== "intent"
      ? [h, N, {}]
      : [
          h,
          N,
          {
            onFocus: ri(b, T),
            onBlur: ri(y, v),
            onMouseEnter: ri(g, T),
            onMouseLeave: ri(S, v),
            onTouchStart: ri(R, T),
          },
        ]
    : [!1, N, {}];
}
function ri(n, r) {
  return (c) => {
    n && n(c), c.defaultPrevented || r(c);
  };
}
function V0({ page: n, ...r }) {
  let { router: c } = k0(),
    s = O.useMemo(() => lm(c.routes, n, c.basename), [c.routes, n, c.basename]);
  return s ? O.createElement(Q0, { page: n, matches: s, ...r }) : null;
}
function X0(n) {
  let { manifest: r, routeModules: c } = hm(),
    [s, o] = O.useState([]);
  return (
    O.useEffect(() => {
      let h = !1;
      return (
        M0(n, r, c).then((m) => {
          h || o(m);
        }),
        () => {
          h = !0;
        }
      );
    }, [n, r, c]),
    s
  );
}
function Q0({ page: n, matches: r, ...c }) {
  let s = pa(),
    { manifest: o, routeModules: h } = hm(),
    { loaderData: m, matches: b } = G0(),
    y = O.useMemo(() => Lh(n, r, b, o, s, "data"), [n, r, b, o, s]),
    g = O.useMemo(() => Lh(n, r, b, o, s, "assets"), [n, r, b, o, s]),
    S = O.useMemo(() => {
      if (n === s.pathname + s.search + s.hash) return [];
      let T = new Set(),
        v = !1;
      if (
        (r.forEach((C) => {
          var X;
          let M = o.routes[C.route.id];
          !M ||
            !M.hasLoader ||
            ((!y.some((Q) => Q.route.id === C.route.id) &&
              C.route.id in m &&
              (X = h[C.route.id]) != null &&
              X.shouldRevalidate) ||
            M.hasClientLoader
              ? (v = !0)
              : T.add(C.route.id));
        }),
        T.size === 0)
      )
        return [];
      let _ = q0(n);
      return (
        v &&
          T.size > 0 &&
          _.searchParams.set(
            "_routes",
            r
              .filter((C) => T.has(C.route.id))
              .map((C) => C.route.id)
              .join(",")
          ),
        [_.pathname + _.search]
      );
    }, [m, s, o, y, r, n, h]),
    R = O.useMemo(() => U0(g, o), [g, o]),
    N = X0(g);
  return O.createElement(
    O.Fragment,
    null,
    S.map((T) =>
      O.createElement("link", {
        key: T,
        rel: "prefetch",
        as: "fetch",
        href: T,
        ...c,
      })
    ),
    R.map((T) =>
      O.createElement("link", { key: T, rel: "modulepreload", href: T, ...c })
    ),
    N.map(({ key: T, link: v }) => O.createElement("link", { key: T, ...v }))
  );
}
function Z0(...n) {
  return (r) => {
    n.forEach((c) => {
      typeof c == "function" ? c(r) : c != null && (c.current = r);
    });
  };
}
var mm =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  mm && (window.__reactRouterVersion = "7.2.0");
} catch {}
function K0({ basename: n, children: r, window: c }) {
  let s = O.useRef();
  s.current == null && (s.current = zy({ window: c, v5Compat: !0 }));
  let o = s.current,
    [h, m] = O.useState({ action: o.action, location: o.location }),
    b = O.useCallback(
      (y) => {
        O.startTransition(() => m(y));
      },
      [m]
    );
  return (
    O.useLayoutEffect(() => o.listen(b), [o, b]),
    O.createElement(E0, {
      basename: n,
      children: r,
      location: h.location,
      navigationType: h.action,
      navigator: o,
    })
  );
}
var gm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  pm = O.forwardRef(function (
    {
      onClick: r,
      discover: c = "render",
      prefetch: s = "none",
      relative: o,
      reloadDocument: h,
      replace: m,
      state: b,
      target: y,
      to: g,
      preventScrollReset: S,
      viewTransition: R,
      ...N
    },
    T
  ) {
    let { basename: v } = O.useContext(Wt),
      _ = typeof g == "string" && gm.test(g),
      C,
      M = !1;
    if (typeof g == "string" && _ && ((C = g), mm))
      try {
        let Z = new URL(window.location.href),
          le = g.startsWith("//") ? new URL(Z.protocol + g) : new URL(g),
          De = Gl(le.pathname, v);
        le.origin === Z.origin && De != null
          ? (g = De + le.search + le.hash)
          : (M = !0);
      } catch {
        Ft(
          !1,
          `<Link to="${g}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let X = a0(g, { relative: o }),
      [Q, J, G] = Y0(s, N),
      U = F0(g, {
        replace: m,
        state: b,
        target: y,
        preventScrollReset: S,
        relative: o,
        viewTransition: R,
      });
    function F(Z) {
      r && r(Z), Z.defaultPrevented || U(Z);
    }
    let re = O.createElement("a", {
      ...N,
      ...G,
      href: C || X,
      onClick: M || h ? r : F,
      ref: Z0(T, J),
      target: y,
      "data-discover": !_ && c === "render" ? "true" : void 0,
    });
    return Q && !_
      ? O.createElement(O.Fragment, null, re, O.createElement(V0, { page: X }))
      : re;
  });
pm.displayName = "Link";
var Ht = O.forwardRef(function (
  {
    "aria-current": r = "page",
    caseSensitive: c = !1,
    className: s = "",
    end: o = !1,
    style: h,
    to: m,
    viewTransition: b,
    children: y,
    ...g
  },
  S
) {
  let R = mi(m, { relative: g.relative }),
    N = pa(),
    T = O.useContext(Gr),
    { navigator: v, basename: _ } = O.useContext(Wt),
    C = T != null && tb(R) && b === !0,
    M = v.encodeLocation ? v.encodeLocation(R).pathname : R.pathname,
    X = N.pathname,
    Q =
      T && T.navigation && T.navigation.location
        ? T.navigation.location.pathname
        : null;
  c ||
    ((X = X.toLowerCase()),
    (Q = Q ? Q.toLowerCase() : null),
    (M = M.toLowerCase())),
    Q && _ && (Q = Gl(Q, _) || Q);
  const J = M !== "/" && M.endsWith("/") ? M.length - 1 : M.length;
  let G = X === M || (!o && X.startsWith(M) && X.charAt(J) === "/"),
    U =
      Q != null &&
      (Q === M || (!o && Q.startsWith(M) && Q.charAt(M.length) === "/")),
    F = { isActive: G, isPending: U, isTransitioning: C },
    re = G ? r : void 0,
    Z;
  typeof s == "function"
    ? (Z = s(F))
    : (Z = [
        s,
        G ? "active" : null,
        U ? "pending" : null,
        C ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let le = typeof h == "function" ? h(F) : h;
  return O.createElement(
    pm,
    {
      ...g,
      "aria-current": re,
      className: Z,
      ref: S,
      style: le,
      to: m,
      viewTransition: b,
    },
    typeof y == "function" ? y(F) : y
  );
});
Ht.displayName = "NavLink";
var J0 = O.forwardRef(
  (
    {
      discover: n = "render",
      fetcherKey: r,
      navigate: c,
      reloadDocument: s,
      replace: o,
      state: h,
      method: m = Dr,
      action: b,
      onSubmit: y,
      relative: g,
      preventScrollReset: S,
      viewTransition: R,
      ...N
    },
    T
  ) => {
    let v = I0(),
      _ = eb(b, { relative: g }),
      C = m.toLowerCase() === "get" ? "get" : "post",
      M = typeof b == "string" && gm.test(b),
      X = (Q) => {
        if ((y && y(Q), Q.defaultPrevented)) return;
        Q.preventDefault();
        let J = Q.nativeEvent.submitter,
          G = (J == null ? void 0 : J.getAttribute("formmethod")) || m;
        v(J || Q.currentTarget, {
          fetcherKey: r,
          method: G,
          navigate: c,
          replace: o,
          state: h,
          relative: g,
          preventScrollReset: S,
          viewTransition: R,
        });
      };
    return O.createElement("form", {
      ref: T,
      method: C,
      action: _,
      onSubmit: s ? y : X,
      ...N,
      "data-discover": !M && n === "render" ? "true" : void 0,
    });
  }
);
J0.displayName = "Form";
function $0(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ym(n) {
  let r = O.useContext(tn);
  return He(r, $0(n)), r;
}
function F0(
  n,
  {
    target: r,
    replace: c,
    state: s,
    preventScrollReset: o,
    relative: h,
    viewTransition: m,
  } = {}
) {
  let b = Yr(),
    y = pa(),
    g = mi(n, { relative: h });
  return O.useCallback(
    (S) => {
      if (A0(S, r)) {
        S.preventDefault();
        let R = c !== void 0 ? c : ci(y) === ci(g);
        b(n, {
          replace: R,
          state: s,
          preventScrollReset: o,
          relative: h,
          viewTransition: m,
        });
      }
    },
    [y, b, g, c, s, r, n, o, h, m]
  );
}
var W0 = 0,
  P0 = () => `__${String(++W0)}__`;
function I0() {
  let { router: n } = ym("useSubmit"),
    { basename: r } = O.useContext(Wt),
    c = y0();
  return O.useCallback(
    async (s, o = {}) => {
      let { action: h, method: m, encType: b, formData: y, body: g } = z0(s, r);
      if (o.navigate === !1) {
        let S = o.fetcherKey || P0();
        await n.fetch(S, c, o.action || h, {
          preventScrollReset: o.preventScrollReset,
          formData: y,
          body: g,
          formMethod: o.method || m,
          formEncType: o.encType || b,
          flushSync: o.flushSync,
        });
      } else
        await n.navigate(o.action || h, {
          preventScrollReset: o.preventScrollReset,
          formData: y,
          body: g,
          formMethod: o.method || m,
          formEncType: o.encType || b,
          replace: o.replace,
          state: o.state,
          fromRouteId: c,
          flushSync: o.flushSync,
          viewTransition: o.viewTransition,
        });
    },
    [n, r, c]
  );
}
function eb(n, { relative: r } = {}) {
  let { basename: c } = O.useContext(Wt),
    s = O.useContext(Gt);
  He(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1),
    h = { ...mi(n || ".", { relative: r }) },
    m = pa();
  if (n == null) {
    h.search = m.search;
    let b = new URLSearchParams(h.search),
      y = b.getAll("index");
    if (y.some((S) => S === "")) {
      b.delete("index"),
        y.filter((R) => R).forEach((R) => b.append("index", R));
      let S = b.toString();
      h.search = S ? `?${S}` : "";
    }
  }
  return (
    (!n || n === ".") &&
      o.route.index &&
      (h.search = h.search ? h.search.replace(/^\?/, "?index&") : "?index"),
    c !== "/" && (h.pathname = h.pathname === "/" ? c : gl([c, h.pathname])),
    ci(h)
  );
}
function tb(n, r = {}) {
  let c = O.useContext(sm);
  He(
    c != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = ym("useViewTransitionState"),
    o = mi(n, { relative: r.relative });
  if (!c.isTransitioning) return !1;
  let h = Gl(c.currentLocation.pathname, s) || c.currentLocation.pathname,
    m = Gl(c.nextLocation.pathname, s) || c.nextLocation.pathname;
  return Lr(o.pathname, m) != null || Lr(o.pathname, h) != null;
}
new TextEncoder();
function lb({ user: n, handleLogout: r }) {
  return d.jsxs("header", {
    className:
      "flex justify-between items-center p-4 bg-krio-background text-white border-b border-gray-700",
    children: [
      d.jsx("div", {
        className: "text-xl font-bold",
        children: d.jsx(Ht, {
          to: "/",
          className: "hover:text-blue-400",
          children: "Криоарматура",
        }),
      }),
      d.jsxs("nav", {
        className: "space-x-6 text-sm font-medium",
        children: [
          d.jsx(Ht, {
            to: "/about",
            className: "hover:text-blue-400",
            children: "О нас",
          }),
          d.jsx(Ht, {
            to: "/contacts",
            className: "hover:text-blue-400",
            children: "Контакты",
          }),
          d.jsx(Ht, {
            to: "/selector",
            className: "hover:text-blue-400",
            children: "Подбор арматуры высокого давления",
          }),
        ],
      }),
      d.jsx("div", {
        className: "flex items-center space-x-4",
        children:
          (n == null ? void 0 : n.isAdmin) &&
          d.jsx(Ht, {
            to: "/admin",
            className: "hover:text-blue-400",
            children: "Список обращений",
          }),
      }),
      d.jsxs("div", {
        className: "flex items-center space-x-4",
        children: [
          d.jsx(Ht, {
            to: "/basket",
            className: "hover:text-blue-400",
            children: n
              ? n != null && n.isAdmin
                ? "Список заказов"
                : "Корзина"
              : "",
          }),
          n
            ? d.jsx("button", {
                onClick: r,
                type: "button",
                className:
                  "px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white",
                children: "Выйти",
              })
            : d.jsx(d.Fragment, {
                children: d.jsx(Ht, {
                  to: "/login",
                  className: "hover:text-blue-400",
                  children: "Вход",
                }),
              }),
        ],
      }),
    ],
  });
}
function ab() {
  return d.jsxs("footer", {
    className:
      "flex justify-between items-center p-4 bg-krio-background text-white border-t border-gray-700 ",
    children: [
      d.jsx("div", {
        className: "text-lg font-semibold",
        children: d.jsx(Ht, {
          to: "/",
          className: "hover:text-blue-400",
          children: "Криоарматура",
        }),
      }),
      d.jsxs("nav", {
        className: "space-x-6 text-sm font-medium",
        children: [
          d.jsx(Ht, {
            to: "/about",
            className: "hover:text-blue-400",
            children: "О нас",
          }),
          d.jsx(Ht, {
            to: "/contacts",
            className: "hover:text-blue-400",
            children: "Контакты",
          }),
          d.jsx(Ht, {
            to: "/selector",
            className: "hover:text-blue-400",
            children: "Подбор арматуры высокого давления",
          }),
        ],
      }),
    ],
  });
}
function bm(n) {
  var r,
    c,
    s = "";
  if (typeof n == "string" || typeof n == "number") s += n;
  else if (typeof n == "object")
    if (Array.isArray(n)) {
      var o = n.length;
      for (r = 0; r < o; r++)
        n[r] && (c = bm(n[r])) && (s && (s += " "), (s += c));
    } else for (c in n) n[c] && (s && (s += " "), (s += c));
  return s;
}
function nb() {
  for (var n, r, c = 0, s = "", o = arguments.length; c < o; c++)
    (n = arguments[c]) && (r = bm(n)) && (s && (s += " "), (s += r));
  return s;
}
const Mc = "-",
  ib = (n) => {
    const r = ub(n),
      { conflictingClassGroups: c, conflictingClassGroupModifiers: s } = n;
    return {
      getClassGroupId: (m) => {
        const b = m.split(Mc);
        return b[0] === "" && b.length !== 1 && b.shift(), vm(b, r) || rb(m);
      },
      getConflictingClassGroupIds: (m, b) => {
        const y = c[m] || [];
        return b && s[m] ? [...y, ...s[m]] : y;
      },
    };
  },
  vm = (n, r) => {
    var m;
    if (n.length === 0) return r.classGroupId;
    const c = n[0],
      s = r.nextPart.get(c),
      o = s ? vm(n.slice(1), s) : void 0;
    if (o) return o;
    if (r.validators.length === 0) return;
    const h = n.join(Mc);
    return (m = r.validators.find(({ validator: b }) => b(h))) == null
      ? void 0
      : m.classGroupId;
  },
  qh = /^\[(.+)\]$/,
  rb = (n) => {
    if (qh.test(n)) {
      const r = qh.exec(n)[1],
        c = r == null ? void 0 : r.substring(0, r.indexOf(":"));
      if (c) return "arbitrary.." + c;
    }
  },
  ub = (n) => {
    const { theme: r, classGroups: c } = n,
      s = { nextPart: new Map(), validators: [] };
    for (const o in c) vc(c[o], s, o, r);
    return s;
  },
  vc = (n, r, c, s) => {
    n.forEach((o) => {
      if (typeof o == "string") {
        const h = o === "" ? r : kh(r, o);
        h.classGroupId = c;
        return;
      }
      if (typeof o == "function") {
        if (sb(o)) {
          vc(o(s), r, c, s);
          return;
        }
        r.validators.push({ validator: o, classGroupId: c });
        return;
      }
      Object.entries(o).forEach(([h, m]) => {
        vc(m, kh(r, h), c, s);
      });
    });
  },
  kh = (n, r) => {
    let c = n;
    return (
      r.split(Mc).forEach((s) => {
        c.nextPart.has(s) ||
          c.nextPart.set(s, { nextPart: new Map(), validators: [] }),
          (c = c.nextPart.get(s));
      }),
      c
    );
  },
  sb = (n) => n.isThemeGetter,
  cb = (n) => {
    if (n < 1) return { get: () => {}, set: () => {} };
    let r = 0,
      c = new Map(),
      s = new Map();
    const o = (h, m) => {
      c.set(h, m), r++, r > n && ((r = 0), (s = c), (c = new Map()));
    };
    return {
      get(h) {
        let m = c.get(h);
        if (m !== void 0) return m;
        if ((m = s.get(h)) !== void 0) return o(h, m), m;
      },
      set(h, m) {
        c.has(h) ? c.set(h, m) : o(h, m);
      },
    };
  },
  xc = "!",
  Sc = ":",
  ob = Sc.length,
  fb = (n) => {
    const { prefix: r, experimentalParseClassName: c } = n;
    let s = (o) => {
      const h = [];
      let m = 0,
        b = 0,
        y = 0,
        g;
      for (let v = 0; v < o.length; v++) {
        let _ = o[v];
        if (m === 0 && b === 0) {
          if (_ === Sc) {
            h.push(o.slice(y, v)), (y = v + ob);
            continue;
          }
          if (_ === "/") {
            g = v;
            continue;
          }
        }
        _ === "[" ? m++ : _ === "]" ? m-- : _ === "(" ? b++ : _ === ")" && b--;
      }
      const S = h.length === 0 ? o : o.substring(y),
        R = db(S),
        N = R !== S,
        T = g && g > y ? g - y : void 0;
      return {
        modifiers: h,
        hasImportantModifier: N,
        baseClassName: R,
        maybePostfixModifierPosition: T,
      };
    };
    if (r) {
      const o = r + Sc,
        h = s;
      s = (m) =>
        m.startsWith(o)
          ? h(m.substring(o.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: m,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (c) {
      const o = s;
      s = (h) => c({ className: h, parseClassName: o });
    }
    return s;
  },
  db = (n) =>
    n.endsWith(xc)
      ? n.substring(0, n.length - 1)
      : n.startsWith(xc)
      ? n.substring(1)
      : n,
  hb = (n) => {
    const r = Object.fromEntries(n.orderSensitiveModifiers.map((s) => [s, !0]));
    return (s) => {
      if (s.length <= 1) return s;
      const o = [];
      let h = [];
      return (
        s.forEach((m) => {
          m[0] === "[" || r[m] ? (o.push(...h.sort(), m), (h = [])) : h.push(m);
        }),
        o.push(...h.sort()),
        o
      );
    };
  },
  mb = (n) => ({
    cache: cb(n.cacheSize),
    parseClassName: fb(n),
    sortModifiers: hb(n),
    ...ib(n),
  }),
  gb = /\s+/,
  pb = (n, r) => {
    const {
        parseClassName: c,
        getClassGroupId: s,
        getConflictingClassGroupIds: o,
        sortModifiers: h,
      } = r,
      m = [],
      b = n.trim().split(gb);
    let y = "";
    for (let g = b.length - 1; g >= 0; g -= 1) {
      const S = b[g],
        {
          isExternal: R,
          modifiers: N,
          hasImportantModifier: T,
          baseClassName: v,
          maybePostfixModifierPosition: _,
        } = c(S);
      if (R) {
        y = S + (y.length > 0 ? " " + y : y);
        continue;
      }
      let C = !!_,
        M = s(C ? v.substring(0, _) : v);
      if (!M) {
        if (!C) {
          y = S + (y.length > 0 ? " " + y : y);
          continue;
        }
        if (((M = s(v)), !M)) {
          y = S + (y.length > 0 ? " " + y : y);
          continue;
        }
        C = !1;
      }
      const X = h(N).join(":"),
        Q = T ? X + xc : X,
        J = Q + M;
      if (m.includes(J)) continue;
      m.push(J);
      const G = o(M, C);
      for (let U = 0; U < G.length; ++U) {
        const F = G[U];
        m.push(Q + F);
      }
      y = S + (y.length > 0 ? " " + y : y);
    }
    return y;
  };
function yb() {
  let n = 0,
    r,
    c,
    s = "";
  for (; n < arguments.length; )
    (r = arguments[n++]) && (c = xm(r)) && (s && (s += " "), (s += c));
  return s;
}
const xm = (n) => {
  if (typeof n == "string") return n;
  let r,
    c = "";
  for (let s = 0; s < n.length; s++)
    n[s] && (r = xm(n[s])) && (c && (c += " "), (c += r));
  return c;
};
function bb(n, ...r) {
  let c,
    s,
    o,
    h = m;
  function m(y) {
    const g = r.reduce((S, R) => R(S), n());
    return (c = mb(g)), (s = c.cache.get), (o = c.cache.set), (h = b), b(y);
  }
  function b(y) {
    const g = s(y);
    if (g) return g;
    const S = pb(y, c);
    return o(y, S), S;
  }
  return function () {
    return h(yb.apply(null, arguments));
  };
}
const et = (n) => {
    const r = (c) => c[n] || [];
    return (r.isThemeGetter = !0), r;
  },
  Sm = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Em = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  vb = /^\d+\/\d+$/,
  xb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Sb =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Eb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  wb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Nb =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Ia = (n) => vb.test(n),
  Se = (n) => !!n && !Number.isNaN(Number(n)),
  fa = (n) => !!n && Number.isInteger(Number(n)),
  Gh = (n) => n.endsWith("%") && Se(n.slice(0, -1)),
  kl = (n) => xb.test(n),
  jb = () => !0,
  Tb = (n) => Sb.test(n) && !Eb.test(n),
  Uc = () => !1,
  Rb = (n) => wb.test(n),
  Ab = (n) => Nb.test(n),
  Ob = (n) => !ee(n) && !te(n),
  Cb = (n) => ln(n, jm, Uc),
  ee = (n) => Sm.test(n),
  da = (n) => ln(n, Tm, Tb),
  hc = (n) => ln(n, Gb, Se),
  zb = (n) => ln(n, wm, Uc),
  _b = (n) => ln(n, Nm, Ab),
  Db = (n) => ln(n, Uc, Rb),
  te = (n) => Em.test(n),
  _r = (n) => an(n, Tm),
  Mb = (n) => an(n, Yb),
  Ub = (n) => an(n, wm),
  Hb = (n) => an(n, jm),
  Bb = (n) => an(n, Nm),
  Lb = (n) => an(n, Vb, !0),
  ln = (n, r, c) => {
    const s = Sm.exec(n);
    return s ? (s[1] ? r(s[1]) : c(s[2])) : !1;
  },
  an = (n, r, c = !1) => {
    const s = Em.exec(n);
    return s ? (s[1] ? r(s[1]) : c) : !1;
  },
  wm = (n) => n === "position",
  qb = new Set(["image", "url"]),
  Nm = (n) => qb.has(n),
  kb = new Set(["length", "size", "percentage"]),
  jm = (n) => kb.has(n),
  Tm = (n) => n === "length",
  Gb = (n) => n === "number",
  Yb = (n) => n === "family-name",
  Vb = (n) => n === "shadow",
  Xb = () => {
    const n = et("color"),
      r = et("font"),
      c = et("text"),
      s = et("font-weight"),
      o = et("tracking"),
      h = et("leading"),
      m = et("breakpoint"),
      b = et("container"),
      y = et("spacing"),
      g = et("radius"),
      S = et("shadow"),
      R = et("inset-shadow"),
      N = et("drop-shadow"),
      T = et("blur"),
      v = et("perspective"),
      _ = et("aspect"),
      C = et("ease"),
      M = et("animate"),
      X = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      Q = () => [
        "bottom",
        "center",
        "left",
        "left-bottom",
        "left-top",
        "right",
        "right-bottom",
        "right-top",
        "top",
      ],
      J = () => ["auto", "hidden", "clip", "visible", "scroll"],
      G = () => ["auto", "contain", "none"],
      U = () => [te, ee, y],
      F = () => [Ia, "full", "auto", ...U()],
      re = () => [fa, "none", "subgrid", te, ee],
      Z = () => ["auto", { span: ["full", fa, te, ee] }, te, ee],
      le = () => [fa, "auto", te, ee],
      De = () => ["auto", "min", "max", "fr", te, ee],
      Ze = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
      ],
      Ke = () => ["start", "end", "center", "stretch"],
      Ge = () => ["auto", ...U()],
      _e = () => [
        Ia,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...U(),
      ],
      Y = () => [n, te, ee],
      ce = () => [Gh, da],
      P = () => ["", "none", "full", g, te, ee],
      he = () => ["", Se, _r, da],
      E = () => ["solid", "dashed", "dotted", "double"],
      V = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      ue = () => ["", "none", T, te, ee],
      ne = () => [
        "center",
        "top",
        "top-right",
        "right",
        "bottom-right",
        "bottom",
        "bottom-left",
        "left",
        "top-left",
        te,
        ee,
      ],
      W = () => ["none", Se, te, ee],
      ge = () => ["none", Se, te, ee],
      oe = () => [Se, te, ee],
      K = () => [Ia, "full", ...U()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [kl],
        breakpoint: [kl],
        color: [jb],
        container: [kl],
        "drop-shadow": [kl],
        ease: ["in", "out", "in-out"],
        font: [Ob],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [kl],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [kl],
        shadow: [kl],
        spacing: ["px", Se],
        text: [kl],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Ia, ee, te, _] }],
        container: ["container"],
        columns: [{ columns: [Se, ee, te, b] }],
        "break-after": [{ "break-after": X() }],
        "break-before": [{ "break-before": X() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: [...Q(), ee, te] }],
        overflow: [{ overflow: J() }],
        "overflow-x": [{ "overflow-x": J() }],
        "overflow-y": [{ "overflow-y": J() }],
        overscroll: [{ overscroll: G() }],
        "overscroll-x": [{ "overscroll-x": G() }],
        "overscroll-y": [{ "overscroll-y": G() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: F() }],
        "inset-x": [{ "inset-x": F() }],
        "inset-y": [{ "inset-y": F() }],
        start: [{ start: F() }],
        end: [{ end: F() }],
        top: [{ top: F() }],
        right: [{ right: F() }],
        bottom: [{ bottom: F() }],
        left: [{ left: F() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [fa, "auto", te, ee] }],
        basis: [{ basis: [Ia, "full", "auto", b, ...U()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [Se, Ia, "auto", "initial", "none", ee] }],
        grow: [{ grow: ["", Se, te, ee] }],
        shrink: [{ shrink: ["", Se, te, ee] }],
        order: [{ order: [fa, "first", "last", "none", te, ee] }],
        "grid-cols": [{ "grid-cols": re() }],
        "col-start-end": [{ col: Z() }],
        "col-start": [{ "col-start": le() }],
        "col-end": [{ "col-end": le() }],
        "grid-rows": [{ "grid-rows": re() }],
        "row-start-end": [{ row: Z() }],
        "row-start": [{ "row-start": le() }],
        "row-end": [{ "row-end": le() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": De() }],
        "auto-rows": [{ "auto-rows": De() }],
        gap: [{ gap: U() }],
        "gap-x": [{ "gap-x": U() }],
        "gap-y": [{ "gap-y": U() }],
        "justify-content": [{ justify: [...Ze(), "normal"] }],
        "justify-items": [{ "justify-items": [...Ke(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...Ke()] }],
        "align-content": [{ content: ["normal", ...Ze()] }],
        "align-items": [{ items: [...Ke(), "baseline"] }],
        "align-self": [{ self: ["auto", ...Ke(), "baseline"] }],
        "place-content": [{ "place-content": Ze() }],
        "place-items": [{ "place-items": [...Ke(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...Ke()] }],
        p: [{ p: U() }],
        px: [{ px: U() }],
        py: [{ py: U() }],
        ps: [{ ps: U() }],
        pe: [{ pe: U() }],
        pt: [{ pt: U() }],
        pr: [{ pr: U() }],
        pb: [{ pb: U() }],
        pl: [{ pl: U() }],
        m: [{ m: Ge() }],
        mx: [{ mx: Ge() }],
        my: [{ my: Ge() }],
        ms: [{ ms: Ge() }],
        me: [{ me: Ge() }],
        mt: [{ mt: Ge() }],
        mr: [{ mr: Ge() }],
        mb: [{ mb: Ge() }],
        ml: [{ ml: Ge() }],
        "space-x": [{ "space-x": U() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": U() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: _e() }],
        w: [{ w: [b, "screen", ..._e()] }],
        "min-w": [{ "min-w": [b, "screen", "none", ..._e()] }],
        "max-w": [
          { "max-w": [b, "screen", "none", "prose", { screen: [m] }, ..._e()] },
        ],
        h: [{ h: ["screen", ..._e()] }],
        "min-h": [{ "min-h": ["screen", "none", ..._e()] }],
        "max-h": [{ "max-h": ["screen", ..._e()] }],
        "font-size": [{ text: ["base", c, _r, da] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [s, te, hc] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              Gh,
              ee,
            ],
          },
        ],
        "font-family": [{ font: [Mb, ee, r] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [o, te, ee] }],
        "line-clamp": [{ "line-clamp": [Se, "none", te, hc] }],
        leading: [{ leading: [h, ...U()] }],
        "list-image": [{ "list-image": ["none", te, ee] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", te, ee] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: Y() }],
        "text-color": [{ text: Y() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...E(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [Se, "from-font", "auto", te, da] },
        ],
        "text-decoration-color": [{ decoration: Y() }],
        "underline-offset": [{ "underline-offset": [Se, "auto", te, ee] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: U() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              te,
              ee,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", te, ee] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: [...Q(), Ub, zb] }],
        "bg-repeat": [
          { bg: ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }] },
        ],
        "bg-size": [{ bg: ["auto", "cover", "contain", Hb, Cb] }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  fa,
                  te,
                  ee,
                ],
                radial: ["", te, ee],
                conic: [fa, te, ee],
              },
              Bb,
              _b,
            ],
          },
        ],
        "bg-color": [{ bg: Y() }],
        "gradient-from-pos": [{ from: ce() }],
        "gradient-via-pos": [{ via: ce() }],
        "gradient-to-pos": [{ to: ce() }],
        "gradient-from": [{ from: Y() }],
        "gradient-via": [{ via: Y() }],
        "gradient-to": [{ to: Y() }],
        rounded: [{ rounded: P() }],
        "rounded-s": [{ "rounded-s": P() }],
        "rounded-e": [{ "rounded-e": P() }],
        "rounded-t": [{ "rounded-t": P() }],
        "rounded-r": [{ "rounded-r": P() }],
        "rounded-b": [{ "rounded-b": P() }],
        "rounded-l": [{ "rounded-l": P() }],
        "rounded-ss": [{ "rounded-ss": P() }],
        "rounded-se": [{ "rounded-se": P() }],
        "rounded-ee": [{ "rounded-ee": P() }],
        "rounded-es": [{ "rounded-es": P() }],
        "rounded-tl": [{ "rounded-tl": P() }],
        "rounded-tr": [{ "rounded-tr": P() }],
        "rounded-br": [{ "rounded-br": P() }],
        "rounded-bl": [{ "rounded-bl": P() }],
        "border-w": [{ border: he() }],
        "border-w-x": [{ "border-x": he() }],
        "border-w-y": [{ "border-y": he() }],
        "border-w-s": [{ "border-s": he() }],
        "border-w-e": [{ "border-e": he() }],
        "border-w-t": [{ "border-t": he() }],
        "border-w-r": [{ "border-r": he() }],
        "border-w-b": [{ "border-b": he() }],
        "border-w-l": [{ "border-l": he() }],
        "divide-x": [{ "divide-x": he() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": he() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...E(), "hidden", "none"] }],
        "divide-style": [{ divide: [...E(), "hidden", "none"] }],
        "border-color": [{ border: Y() }],
        "border-color-x": [{ "border-x": Y() }],
        "border-color-y": [{ "border-y": Y() }],
        "border-color-s": [{ "border-s": Y() }],
        "border-color-e": [{ "border-e": Y() }],
        "border-color-t": [{ "border-t": Y() }],
        "border-color-r": [{ "border-r": Y() }],
        "border-color-b": [{ "border-b": Y() }],
        "border-color-l": [{ "border-l": Y() }],
        "divide-color": [{ divide: Y() }],
        "outline-style": [{ outline: [...E(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [Se, te, ee] }],
        "outline-w": [{ outline: ["", Se, _r, da] }],
        "outline-color": [{ outline: [n] }],
        shadow: [{ shadow: ["", "none", S, Lb, Db] }],
        "shadow-color": [{ shadow: Y() }],
        "inset-shadow": [{ "inset-shadow": ["none", te, ee, R] }],
        "inset-shadow-color": [{ "inset-shadow": Y() }],
        "ring-w": [{ ring: he() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: Y() }],
        "ring-offset-w": [{ "ring-offset": [Se, da] }],
        "ring-offset-color": [{ "ring-offset": Y() }],
        "inset-ring-w": [{ "inset-ring": he() }],
        "inset-ring-color": [{ "inset-ring": Y() }],
        opacity: [{ opacity: [Se, te, ee] }],
        "mix-blend": [{ "mix-blend": [...V(), "plus-darker", "plus-lighter"] }],
        "bg-blend": [{ "bg-blend": V() }],
        filter: [{ filter: ["", "none", te, ee] }],
        blur: [{ blur: ue() }],
        brightness: [{ brightness: [Se, te, ee] }],
        contrast: [{ contrast: [Se, te, ee] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", N, te, ee] }],
        grayscale: [{ grayscale: ["", Se, te, ee] }],
        "hue-rotate": [{ "hue-rotate": [Se, te, ee] }],
        invert: [{ invert: ["", Se, te, ee] }],
        saturate: [{ saturate: [Se, te, ee] }],
        sepia: [{ sepia: ["", Se, te, ee] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", te, ee] }],
        "backdrop-blur": [{ "backdrop-blur": ue() }],
        "backdrop-brightness": [{ "backdrop-brightness": [Se, te, ee] }],
        "backdrop-contrast": [{ "backdrop-contrast": [Se, te, ee] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", Se, te, ee] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [Se, te, ee] }],
        "backdrop-invert": [{ "backdrop-invert": ["", Se, te, ee] }],
        "backdrop-opacity": [{ "backdrop-opacity": [Se, te, ee] }],
        "backdrop-saturate": [{ "backdrop-saturate": [Se, te, ee] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", Se, te, ee] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": U() }],
        "border-spacing-x": [{ "border-spacing-x": U() }],
        "border-spacing-y": [{ "border-spacing-y": U() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              te,
              ee,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [Se, "initial", te, ee] }],
        ease: [{ ease: ["linear", "initial", C, te, ee] }],
        delay: [{ delay: [Se, te, ee] }],
        animate: [{ animate: ["none", M, te, ee] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [v, te, ee] }],
        "perspective-origin": [{ "perspective-origin": ne() }],
        rotate: [{ rotate: W() }],
        "rotate-x": [{ "rotate-x": W() }],
        "rotate-y": [{ "rotate-y": W() }],
        "rotate-z": [{ "rotate-z": W() }],
        scale: [{ scale: ge() }],
        "scale-x": [{ "scale-x": ge() }],
        "scale-y": [{ "scale-y": ge() }],
        "scale-z": [{ "scale-z": ge() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: oe() }],
        "skew-x": [{ "skew-x": oe() }],
        "skew-y": [{ "skew-y": oe() }],
        transform: [{ transform: [te, ee, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: ne() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: K() }],
        "translate-x": [{ "translate-x": K() }],
        "translate-y": [{ "translate-y": K() }],
        "translate-z": [{ "translate-z": K() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: Y() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: Y() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              te,
              ee,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": U() }],
        "scroll-mx": [{ "scroll-mx": U() }],
        "scroll-my": [{ "scroll-my": U() }],
        "scroll-ms": [{ "scroll-ms": U() }],
        "scroll-me": [{ "scroll-me": U() }],
        "scroll-mt": [{ "scroll-mt": U() }],
        "scroll-mr": [{ "scroll-mr": U() }],
        "scroll-mb": [{ "scroll-mb": U() }],
        "scroll-ml": [{ "scroll-ml": U() }],
        "scroll-p": [{ "scroll-p": U() }],
        "scroll-px": [{ "scroll-px": U() }],
        "scroll-py": [{ "scroll-py": U() }],
        "scroll-ps": [{ "scroll-ps": U() }],
        "scroll-pe": [{ "scroll-pe": U() }],
        "scroll-pt": [{ "scroll-pt": U() }],
        "scroll-pr": [{ "scroll-pr": U() }],
        "scroll-pb": [{ "scroll-pb": U() }],
        "scroll-pl": [{ "scroll-pl": U() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", te, ee],
          },
        ],
        fill: [{ fill: ["none", ...Y()] }],
        "stroke-w": [{ stroke: [Se, _r, da, hc] }],
        stroke: [{ stroke: ["none", ...Y()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "before",
        "after",
        "placeholder",
        "file",
        "marker",
        "selection",
        "first-line",
        "first-letter",
        "backdrop",
        "*",
        "**",
      ],
    };
  },
  Qb = bb(Xb);
function Zb(...n) {
  return Qb(nb(n));
}
const Kb = () => {
    const n = Math.floor(Math.random() * 4),
      r = Math.random() * window.innerWidth;
    switch (n) {
      case 0:
        return { x: r, y: 0, angle: 45 };
      case 1:
        return { x: window.innerWidth, y: r, angle: 135 };
      case 2:
        return { x: r, y: window.innerHeight, angle: 225 };
      case 3:
        return { x: 0, y: r, angle: 315 };
      default:
        return { x: 0, y: 0, angle: 45 };
    }
  },
  Jb = ({
    minSpeed: n = 5,
    maxSpeed: r = 20,
    minDelay: c = 400,
    maxDelay: s = 2200,
    starColor: o = "#9E00FF",
    trailColor: h = "#2EB9DF",
    starWidth: m = 20,
    starHeight: b = 2,
    className: y,
  }) => {
    const [g, S] = O.useState(null),
      R = O.useRef(null);
    return (
      O.useEffect(() => {
        const N = () => {
          const { x: T, y: v, angle: _ } = Kb(),
            C = {
              id: Date.now(),
              x: T,
              y: v,
              angle: _,
              scale: 2,
              speed: Math.random() * (r - n) + n,
              distance: 0,
            };
          S(C);
          const M = Math.random() * (s - c) + c;
          setTimeout(N, M);
        };
        return N(), () => {};
      }, [n, r, c, s]),
      O.useEffect(() => {
        const T = requestAnimationFrame(() => {
          g &&
            S((v) => {
              if (!v) return null;
              const _ = v.x + v.speed * Math.cos((v.angle * Math.PI) / 180),
                C = v.y + v.speed * Math.sin((v.angle * Math.PI) / 180),
                M = v.distance + v.speed,
                X = 2 + M / 100;
              return _ < -20 ||
                _ > window.innerWidth + 20 ||
                C < -20 ||
                C > window.innerHeight + 20
                ? null
                : { ...v, x: _, y: C, distance: M, scale: X };
            });
        });
        return () => cancelAnimationFrame(T);
      }, [g]),
      d.jsxs("svg", {
        ref: R,
        className: Zb("w-full h-full absolute inset-0 -z-1", y),
        children: [
          g &&
            d.jsx(
              "rect",
              {
                x: g.x,
                y: g.y,
                width: m * g.scale,
                height: b,
                fill: "url(#gradient)",
                transform: `rotate(${g.angle}, ${g.x + (m * g.scale) / 2}, ${
                  g.y + b / 2
                })`,
              },
              g.id
            ),
          d.jsx("defs", {
            children: d.jsxs("linearGradient", {
              id: "gradient",
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "100%",
              children: [
                d.jsx("stop", {
                  offset: "0%",
                  style: { stopColor: h, stopOpacity: 0 },
                }),
                d.jsx("stop", {
                  offset: "100%",
                  style: { stopColor: o, stopOpacity: 1 },
                }),
              ],
            }),
          }),
        ],
      })
    );
  };
function $b({ user: n, handleLogout: r }) {
  return d.jsxs(d.Fragment, {
    children: [
      d.jsx(lb, { user: n, handleLogout: r }),
      d.jsxs("div", {
        className: "min-h-screen relative isolate",
        children: [d.jsx(S0, {}), d.jsx(Jb, {})],
      }),
      d.jsx(ab, {}),
    ],
  });
}
function Rm(n, r) {
  return function () {
    return n.apply(r, arguments);
  };
}
const { toString: Fb } = Object.prototype,
  { getPrototypeOf: Hc } = Object,
  Xr = ((n) => (r) => {
    const c = Fb.call(r);
    return n[c] || (n[c] = c.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Yt = (n) => ((n = n.toLowerCase()), (r) => Xr(r) === n),
  Qr = (n) => (r) => typeof r === n,
  { isArray: nn } = Array,
  oi = Qr("undefined");
function Wb(n) {
  return (
    n !== null &&
    !oi(n) &&
    n.constructor !== null &&
    !oi(n.constructor) &&
    Et(n.constructor.isBuffer) &&
    n.constructor.isBuffer(n)
  );
}
const Am = Yt("ArrayBuffer");
function Pb(n) {
  let r;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (r = ArrayBuffer.isView(n))
      : (r = n && n.buffer && Am(n.buffer)),
    r
  );
}
const Ib = Qr("string"),
  Et = Qr("function"),
  Om = Qr("number"),
  Zr = (n) => n !== null && typeof n == "object",
  ev = (n) => n === !0 || n === !1,
  Ur = (n) => {
    if (Xr(n) !== "object") return !1;
    const r = Hc(n);
    return (
      (r === null ||
        r === Object.prototype ||
        Object.getPrototypeOf(r) === null) &&
      !(Symbol.toStringTag in n) &&
      !(Symbol.iterator in n)
    );
  },
  tv = Yt("Date"),
  lv = Yt("File"),
  av = Yt("Blob"),
  nv = Yt("FileList"),
  iv = (n) => Zr(n) && Et(n.pipe),
  rv = (n) => {
    let r;
    return (
      n &&
      ((typeof FormData == "function" && n instanceof FormData) ||
        (Et(n.append) &&
          ((r = Xr(n)) === "formdata" ||
            (r === "object" &&
              Et(n.toString) &&
              n.toString() === "[object FormData]"))))
    );
  },
  uv = Yt("URLSearchParams"),
  [sv, cv, ov, fv] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Yt
  ),
  dv = (n) =>
    n.trim ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function gi(n, r, { allOwnKeys: c = !1 } = {}) {
  if (n === null || typeof n > "u") return;
  let s, o;
  if ((typeof n != "object" && (n = [n]), nn(n)))
    for (s = 0, o = n.length; s < o; s++) r.call(null, n[s], s, n);
  else {
    const h = c ? Object.getOwnPropertyNames(n) : Object.keys(n),
      m = h.length;
    let b;
    for (s = 0; s < m; s++) (b = h[s]), r.call(null, n[b], b, n);
  }
}
function Cm(n, r) {
  r = r.toLowerCase();
  const c = Object.keys(n);
  let s = c.length,
    o;
  for (; s-- > 0; ) if (((o = c[s]), r === o.toLowerCase())) return o;
  return null;
}
const ha =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  zm = (n) => !oi(n) && n !== ha;
function Ec() {
  const { caseless: n } = (zm(this) && this) || {},
    r = {},
    c = (s, o) => {
      const h = (n && Cm(r, o)) || o;
      Ur(r[h]) && Ur(s)
        ? (r[h] = Ec(r[h], s))
        : Ur(s)
        ? (r[h] = Ec({}, s))
        : nn(s)
        ? (r[h] = s.slice())
        : (r[h] = s);
    };
  for (let s = 0, o = arguments.length; s < o; s++)
    arguments[s] && gi(arguments[s], c);
  return r;
}
const hv = (n, r, c, { allOwnKeys: s } = {}) => (
    gi(
      r,
      (o, h) => {
        c && Et(o) ? (n[h] = Rm(o, c)) : (n[h] = o);
      },
      { allOwnKeys: s }
    ),
    n
  ),
  mv = (n) => (n.charCodeAt(0) === 65279 && (n = n.slice(1)), n),
  gv = (n, r, c, s) => {
    (n.prototype = Object.create(r.prototype, s)),
      (n.prototype.constructor = n),
      Object.defineProperty(n, "super", { value: r.prototype }),
      c && Object.assign(n.prototype, c);
  },
  pv = (n, r, c, s) => {
    let o, h, m;
    const b = {};
    if (((r = r || {}), n == null)) return r;
    do {
      for (o = Object.getOwnPropertyNames(n), h = o.length; h-- > 0; )
        (m = o[h]), (!s || s(m, n, r)) && !b[m] && ((r[m] = n[m]), (b[m] = !0));
      n = c !== !1 && Hc(n);
    } while (n && (!c || c(n, r)) && n !== Object.prototype);
    return r;
  },
  yv = (n, r, c) => {
    (n = String(n)),
      (c === void 0 || c > n.length) && (c = n.length),
      (c -= r.length);
    const s = n.indexOf(r, c);
    return s !== -1 && s === c;
  },
  bv = (n) => {
    if (!n) return null;
    if (nn(n)) return n;
    let r = n.length;
    if (!Om(r)) return null;
    const c = new Array(r);
    for (; r-- > 0; ) c[r] = n[r];
    return c;
  },
  vv = (
    (n) => (r) =>
      n && r instanceof n
  )(typeof Uint8Array < "u" && Hc(Uint8Array)),
  xv = (n, r) => {
    const s = (n && n[Symbol.iterator]).call(n);
    let o;
    for (; (o = s.next()) && !o.done; ) {
      const h = o.value;
      r.call(n, h[0], h[1]);
    }
  },
  Sv = (n, r) => {
    let c;
    const s = [];
    for (; (c = n.exec(r)) !== null; ) s.push(c);
    return s;
  },
  Ev = Yt("HTMLFormElement"),
  wv = (n) =>
    n.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (c, s, o) {
      return s.toUpperCase() + o;
    }),
  Yh = (
    ({ hasOwnProperty: n }) =>
    (r, c) =>
      n.call(r, c)
  )(Object.prototype),
  Nv = Yt("RegExp"),
  _m = (n, r) => {
    const c = Object.getOwnPropertyDescriptors(n),
      s = {};
    gi(c, (o, h) => {
      let m;
      (m = r(o, h, n)) !== !1 && (s[h] = m || o);
    }),
      Object.defineProperties(n, s);
  },
  jv = (n) => {
    _m(n, (r, c) => {
      if (Et(n) && ["arguments", "caller", "callee"].indexOf(c) !== -1)
        return !1;
      const s = n[c];
      if (Et(s)) {
        if (((r.enumerable = !1), "writable" in r)) {
          r.writable = !1;
          return;
        }
        r.set ||
          (r.set = () => {
            throw Error("Can not rewrite read-only method '" + c + "'");
          });
      }
    });
  },
  Tv = (n, r) => {
    const c = {},
      s = (o) => {
        o.forEach((h) => {
          c[h] = !0;
        });
      };
    return nn(n) ? s(n) : s(String(n).split(r)), c;
  },
  Rv = () => {},
  Av = (n, r) => (n != null && Number.isFinite((n = +n)) ? n : r);
function Ov(n) {
  return !!(
    n &&
    Et(n.append) &&
    n[Symbol.toStringTag] === "FormData" &&
    n[Symbol.iterator]
  );
}
const Cv = (n) => {
    const r = new Array(10),
      c = (s, o) => {
        if (Zr(s)) {
          if (r.indexOf(s) >= 0) return;
          if (!("toJSON" in s)) {
            r[o] = s;
            const h = nn(s) ? [] : {};
            return (
              gi(s, (m, b) => {
                const y = c(m, o + 1);
                !oi(y) && (h[b] = y);
              }),
              (r[o] = void 0),
              h
            );
          }
        }
        return s;
      };
    return c(n, 0);
  },
  zv = Yt("AsyncFunction"),
  _v = (n) => n && (Zr(n) || Et(n)) && Et(n.then) && Et(n.catch),
  Dm = ((n, r) =>
    n
      ? setImmediate
      : r
      ? ((c, s) => (
          ha.addEventListener(
            "message",
            ({ source: o, data: h }) => {
              o === ha && h === c && s.length && s.shift()();
            },
            !1
          ),
          (o) => {
            s.push(o), ha.postMessage(c, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (c) => setTimeout(c))(
    typeof setImmediate == "function",
    Et(ha.postMessage)
  ),
  Dv =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(ha)
      : (typeof process < "u" && process.nextTick) || Dm,
  H = {
    isArray: nn,
    isArrayBuffer: Am,
    isBuffer: Wb,
    isFormData: rv,
    isArrayBufferView: Pb,
    isString: Ib,
    isNumber: Om,
    isBoolean: ev,
    isObject: Zr,
    isPlainObject: Ur,
    isReadableStream: sv,
    isRequest: cv,
    isResponse: ov,
    isHeaders: fv,
    isUndefined: oi,
    isDate: tv,
    isFile: lv,
    isBlob: av,
    isRegExp: Nv,
    isFunction: Et,
    isStream: iv,
    isURLSearchParams: uv,
    isTypedArray: vv,
    isFileList: nv,
    forEach: gi,
    merge: Ec,
    extend: hv,
    trim: dv,
    stripBOM: mv,
    inherits: gv,
    toFlatObject: pv,
    kindOf: Xr,
    kindOfTest: Yt,
    endsWith: yv,
    toArray: bv,
    forEachEntry: xv,
    matchAll: Sv,
    isHTMLForm: Ev,
    hasOwnProperty: Yh,
    hasOwnProp: Yh,
    reduceDescriptors: _m,
    freezeMethods: jv,
    toObjectSet: Tv,
    toCamelCase: wv,
    noop: Rv,
    toFiniteNumber: Av,
    findKey: Cm,
    global: ha,
    isContextDefined: zm,
    isSpecCompliantForm: Ov,
    toJSONObject: Cv,
    isAsyncFn: zv,
    isThenable: _v,
    setImmediate: Dm,
    asap: Dv,
  };
function me(n, r, c, s, o) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = n),
    (this.name = "AxiosError"),
    r && (this.code = r),
    c && (this.config = c),
    s && (this.request = s),
    o && ((this.response = o), (this.status = o.status ? o.status : null));
}
H.inherits(me, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: H.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const Mm = me.prototype,
  Um = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((n) => {
  Um[n] = { value: n };
});
Object.defineProperties(me, Um);
Object.defineProperty(Mm, "isAxiosError", { value: !0 });
me.from = (n, r, c, s, o, h) => {
  const m = Object.create(Mm);
  return (
    H.toFlatObject(
      n,
      m,
      function (y) {
        return y !== Error.prototype;
      },
      (b) => b !== "isAxiosError"
    ),
    me.call(m, n.message, r, c, s, o),
    (m.cause = n),
    (m.name = n.name),
    h && Object.assign(m, h),
    m
  );
};
const Mv = null;
function wc(n) {
  return H.isPlainObject(n) || H.isArray(n);
}
function Hm(n) {
  return H.endsWith(n, "[]") ? n.slice(0, -2) : n;
}
function Vh(n, r, c) {
  return n
    ? n
        .concat(r)
        .map(function (o, h) {
          return (o = Hm(o)), !c && h ? "[" + o + "]" : o;
        })
        .join(c ? "." : "")
    : r;
}
function Uv(n) {
  return H.isArray(n) && !n.some(wc);
}
const Hv = H.toFlatObject(H, {}, null, function (r) {
  return /^is[A-Z]/.test(r);
});
function Kr(n, r, c) {
  if (!H.isObject(n)) throw new TypeError("target must be an object");
  (r = r || new FormData()),
    (c = H.toFlatObject(
      c,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (_, C) {
        return !H.isUndefined(C[_]);
      }
    ));
  const s = c.metaTokens,
    o = c.visitor || S,
    h = c.dots,
    m = c.indexes,
    y = (c.Blob || (typeof Blob < "u" && Blob)) && H.isSpecCompliantForm(r);
  if (!H.isFunction(o)) throw new TypeError("visitor must be a function");
  function g(v) {
    if (v === null) return "";
    if (H.isDate(v)) return v.toISOString();
    if (!y && H.isBlob(v))
      throw new me("Blob is not supported. Use a Buffer instead.");
    return H.isArrayBuffer(v) || H.isTypedArray(v)
      ? y && typeof Blob == "function"
        ? new Blob([v])
        : Buffer.from(v)
      : v;
  }
  function S(v, _, C) {
    let M = v;
    if (v && !C && typeof v == "object") {
      if (H.endsWith(_, "{}"))
        (_ = s ? _ : _.slice(0, -2)), (v = JSON.stringify(v));
      else if (
        (H.isArray(v) && Uv(v)) ||
        ((H.isFileList(v) || H.endsWith(_, "[]")) && (M = H.toArray(v)))
      )
        return (
          (_ = Hm(_)),
          M.forEach(function (Q, J) {
            !(H.isUndefined(Q) || Q === null) &&
              r.append(
                m === !0 ? Vh([_], J, h) : m === null ? _ : _ + "[]",
                g(Q)
              );
          }),
          !1
        );
    }
    return wc(v) ? !0 : (r.append(Vh(C, _, h), g(v)), !1);
  }
  const R = [],
    N = Object.assign(Hv, {
      defaultVisitor: S,
      convertValue: g,
      isVisitable: wc,
    });
  function T(v, _) {
    if (!H.isUndefined(v)) {
      if (R.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + _.join("."));
      R.push(v),
        H.forEach(v, function (M, X) {
          (!(H.isUndefined(M) || M === null) &&
            o.call(r, M, H.isString(X) ? X.trim() : X, _, N)) === !0 &&
            T(M, _ ? _.concat(X) : [X]);
        }),
        R.pop();
    }
  }
  if (!H.isObject(n)) throw new TypeError("data must be an object");
  return T(n), r;
}
function Xh(n) {
  const r = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g, function (s) {
    return r[s];
  });
}
function Bc(n, r) {
  (this._pairs = []), n && Kr(n, this, r);
}
const Bm = Bc.prototype;
Bm.append = function (r, c) {
  this._pairs.push([r, c]);
};
Bm.toString = function (r) {
  const c = r
    ? function (s) {
        return r.call(this, s, Xh);
      }
    : Xh;
  return this._pairs
    .map(function (o) {
      return c(o[0]) + "=" + c(o[1]);
    }, "")
    .join("&");
};
function Bv(n) {
  return encodeURIComponent(n)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function Lm(n, r, c) {
  if (!r) return n;
  const s = (c && c.encode) || Bv;
  H.isFunction(c) && (c = { serialize: c });
  const o = c && c.serialize;
  let h;
  if (
    (o
      ? (h = o(r, c))
      : (h = H.isURLSearchParams(r) ? r.toString() : new Bc(r, c).toString(s)),
    h)
  ) {
    const m = n.indexOf("#");
    m !== -1 && (n = n.slice(0, m)),
      (n += (n.indexOf("?") === -1 ? "?" : "&") + h);
  }
  return n;
}
class Qh {
  constructor() {
    this.handlers = [];
  }
  use(r, c, s) {
    return (
      this.handlers.push({
        fulfilled: r,
        rejected: c,
        synchronous: s ? s.synchronous : !1,
        runWhen: s ? s.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(r) {
    this.handlers[r] && (this.handlers[r] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(r) {
    H.forEach(this.handlers, function (s) {
      s !== null && r(s);
    });
  }
}
const qm = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Lv = typeof URLSearchParams < "u" ? URLSearchParams : Bc,
  qv = typeof FormData < "u" ? FormData : null,
  kv = typeof Blob < "u" ? Blob : null,
  Gv = {
    isBrowser: !0,
    classes: { URLSearchParams: Lv, FormData: qv, Blob: kv },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Lc = typeof window < "u" && typeof document < "u",
  Nc = (typeof navigator == "object" && navigator) || void 0,
  Yv =
    Lc &&
    (!Nc || ["ReactNative", "NativeScript", "NS"].indexOf(Nc.product) < 0),
  Vv =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Xv = (Lc && window.location.href) || "http://localhost",
  Qv = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Lc,
        hasStandardBrowserEnv: Yv,
        hasStandardBrowserWebWorkerEnv: Vv,
        navigator: Nc,
        origin: Xv,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  st = { ...Qv, ...Gv };
function Zv(n, r) {
  return Kr(
    n,
    new st.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (c, s, o, h) {
          return st.isNode && H.isBuffer(c)
            ? (this.append(s, c.toString("base64")), !1)
            : h.defaultVisitor.apply(this, arguments);
        },
      },
      r
    )
  );
}
function Kv(n) {
  return H.matchAll(/\w+|\[(\w*)]/g, n).map((r) =>
    r[0] === "[]" ? "" : r[1] || r[0]
  );
}
function Jv(n) {
  const r = {},
    c = Object.keys(n);
  let s;
  const o = c.length;
  let h;
  for (s = 0; s < o; s++) (h = c[s]), (r[h] = n[h]);
  return r;
}
function km(n) {
  function r(c, s, o, h) {
    let m = c[h++];
    if (m === "__proto__") return !0;
    const b = Number.isFinite(+m),
      y = h >= c.length;
    return (
      (m = !m && H.isArray(o) ? o.length : m),
      y
        ? (H.hasOwnProp(o, m) ? (o[m] = [o[m], s]) : (o[m] = s), !b)
        : ((!o[m] || !H.isObject(o[m])) && (o[m] = []),
          r(c, s, o[m], h) && H.isArray(o[m]) && (o[m] = Jv(o[m])),
          !b)
    );
  }
  if (H.isFormData(n) && H.isFunction(n.entries)) {
    const c = {};
    return (
      H.forEachEntry(n, (s, o) => {
        r(Kv(s), o, c, 0);
      }),
      c
    );
  }
  return null;
}
function $v(n, r, c) {
  if (H.isString(n))
    try {
      return (r || JSON.parse)(n), H.trim(n);
    } catch (s) {
      if (s.name !== "SyntaxError") throw s;
    }
  return (c || JSON.stringify)(n);
}
const pi = {
  transitional: qm,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (r, c) {
      const s = c.getContentType() || "",
        o = s.indexOf("application/json") > -1,
        h = H.isObject(r);
      if ((h && H.isHTMLForm(r) && (r = new FormData(r)), H.isFormData(r)))
        return o ? JSON.stringify(km(r)) : r;
      if (
        H.isArrayBuffer(r) ||
        H.isBuffer(r) ||
        H.isStream(r) ||
        H.isFile(r) ||
        H.isBlob(r) ||
        H.isReadableStream(r)
      )
        return r;
      if (H.isArrayBufferView(r)) return r.buffer;
      if (H.isURLSearchParams(r))
        return (
          c.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          r.toString()
        );
      let b;
      if (h) {
        if (s.indexOf("application/x-www-form-urlencoded") > -1)
          return Zv(r, this.formSerializer).toString();
        if ((b = H.isFileList(r)) || s.indexOf("multipart/form-data") > -1) {
          const y = this.env && this.env.FormData;
          return Kr(
            b ? { "files[]": r } : r,
            y && new y(),
            this.formSerializer
          );
        }
      }
      return h || o ? (c.setContentType("application/json", !1), $v(r)) : r;
    },
  ],
  transformResponse: [
    function (r) {
      const c = this.transitional || pi.transitional,
        s = c && c.forcedJSONParsing,
        o = this.responseType === "json";
      if (H.isResponse(r) || H.isReadableStream(r)) return r;
      if (r && H.isString(r) && ((s && !this.responseType) || o)) {
        const m = !(c && c.silentJSONParsing) && o;
        try {
          return JSON.parse(r);
        } catch (b) {
          if (m)
            throw b.name === "SyntaxError"
              ? me.from(b, me.ERR_BAD_RESPONSE, this, null, this.response)
              : b;
        }
      }
      return r;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: st.classes.FormData, Blob: st.classes.Blob },
  validateStatus: function (r) {
    return r >= 200 && r < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
H.forEach(["delete", "get", "head", "post", "put", "patch"], (n) => {
  pi.headers[n] = {};
});
const Fv = H.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Wv = (n) => {
    const r = {};
    let c, s, o;
    return (
      n &&
        n
          .split(
            `
`
          )
          .forEach(function (m) {
            (o = m.indexOf(":")),
              (c = m.substring(0, o).trim().toLowerCase()),
              (s = m.substring(o + 1).trim()),
              !(!c || (r[c] && Fv[c])) &&
                (c === "set-cookie"
                  ? r[c]
                    ? r[c].push(s)
                    : (r[c] = [s])
                  : (r[c] = r[c] ? r[c] + ", " + s : s));
          }),
      r
    );
  },
  Zh = Symbol("internals");
function ui(n) {
  return n && String(n).trim().toLowerCase();
}
function Hr(n) {
  return n === !1 || n == null ? n : H.isArray(n) ? n.map(Hr) : String(n);
}
function Pv(n) {
  const r = Object.create(null),
    c = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; (s = c.exec(n)); ) r[s[1]] = s[2];
  return r;
}
const Iv = (n) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());
function mc(n, r, c, s, o) {
  if (H.isFunction(s)) return s.call(this, r, c);
  if ((o && (r = c), !!H.isString(r))) {
    if (H.isString(s)) return r.indexOf(s) !== -1;
    if (H.isRegExp(s)) return s.test(r);
  }
}
function ex(n) {
  return n
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (r, c, s) => c.toUpperCase() + s);
}
function tx(n, r) {
  const c = H.toCamelCase(" " + r);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(n, s + c, {
      value: function (o, h, m) {
        return this[s].call(this, r, o, h, m);
      },
      configurable: !0,
    });
  });
}
let mt = class {
  constructor(r) {
    r && this.set(r);
  }
  set(r, c, s) {
    const o = this;
    function h(b, y, g) {
      const S = ui(y);
      if (!S) throw new Error("header name must be a non-empty string");
      const R = H.findKey(o, S);
      (!R || o[R] === void 0 || g === !0 || (g === void 0 && o[R] !== !1)) &&
        (o[R || y] = Hr(b));
    }
    const m = (b, y) => H.forEach(b, (g, S) => h(g, S, y));
    if (H.isPlainObject(r) || r instanceof this.constructor) m(r, c);
    else if (H.isString(r) && (r = r.trim()) && !Iv(r)) m(Wv(r), c);
    else if (H.isHeaders(r)) for (const [b, y] of r.entries()) h(y, b, s);
    else r != null && h(c, r, s);
    return this;
  }
  get(r, c) {
    if (((r = ui(r)), r)) {
      const s = H.findKey(this, r);
      if (s) {
        const o = this[s];
        if (!c) return o;
        if (c === !0) return Pv(o);
        if (H.isFunction(c)) return c.call(this, o, s);
        if (H.isRegExp(c)) return c.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(r, c) {
    if (((r = ui(r)), r)) {
      const s = H.findKey(this, r);
      return !!(s && this[s] !== void 0 && (!c || mc(this, this[s], s, c)));
    }
    return !1;
  }
  delete(r, c) {
    const s = this;
    let o = !1;
    function h(m) {
      if (((m = ui(m)), m)) {
        const b = H.findKey(s, m);
        b && (!c || mc(s, s[b], b, c)) && (delete s[b], (o = !0));
      }
    }
    return H.isArray(r) ? r.forEach(h) : h(r), o;
  }
  clear(r) {
    const c = Object.keys(this);
    let s = c.length,
      o = !1;
    for (; s--; ) {
      const h = c[s];
      (!r || mc(this, this[h], h, r, !0)) && (delete this[h], (o = !0));
    }
    return o;
  }
  normalize(r) {
    const c = this,
      s = {};
    return (
      H.forEach(this, (o, h) => {
        const m = H.findKey(s, h);
        if (m) {
          (c[m] = Hr(o)), delete c[h];
          return;
        }
        const b = r ? ex(h) : String(h).trim();
        b !== h && delete c[h], (c[b] = Hr(o)), (s[b] = !0);
      }),
      this
    );
  }
  concat(...r) {
    return this.constructor.concat(this, ...r);
  }
  toJSON(r) {
    const c = Object.create(null);
    return (
      H.forEach(this, (s, o) => {
        s != null && s !== !1 && (c[o] = r && H.isArray(s) ? s.join(", ") : s);
      }),
      c
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([r, c]) => r + ": " + c).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(r) {
    return r instanceof this ? r : new this(r);
  }
  static concat(r, ...c) {
    const s = new this(r);
    return c.forEach((o) => s.set(o)), s;
  }
  static accessor(r) {
    const s = (this[Zh] = this[Zh] = { accessors: {} }).accessors,
      o = this.prototype;
    function h(m) {
      const b = ui(m);
      s[b] || (tx(o, m), (s[b] = !0));
    }
    return H.isArray(r) ? r.forEach(h) : h(r), this;
  }
};
mt.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
H.reduceDescriptors(mt.prototype, ({ value: n }, r) => {
  let c = r[0].toUpperCase() + r.slice(1);
  return {
    get: () => n,
    set(s) {
      this[c] = s;
    },
  };
});
H.freezeMethods(mt);
function gc(n, r) {
  const c = this || pi,
    s = r || c,
    o = mt.from(s.headers);
  let h = s.data;
  return (
    H.forEach(n, function (b) {
      h = b.call(c, h, o.normalize(), r ? r.status : void 0);
    }),
    o.normalize(),
    h
  );
}
function Gm(n) {
  return !!(n && n.__CANCEL__);
}
function rn(n, r, c) {
  me.call(this, n ?? "canceled", me.ERR_CANCELED, r, c),
    (this.name = "CanceledError");
}
H.inherits(rn, me, { __CANCEL__: !0 });
function Ym(n, r, c) {
  const s = c.config.validateStatus;
  !c.status || !s || s(c.status)
    ? n(c)
    : r(
        new me(
          "Request failed with status code " + c.status,
          [me.ERR_BAD_REQUEST, me.ERR_BAD_RESPONSE][
            Math.floor(c.status / 100) - 4
          ],
          c.config,
          c.request,
          c
        )
      );
}
function lx(n) {
  const r = /^([-+\w]{1,25})(:?\/\/|:)/.exec(n);
  return (r && r[1]) || "";
}
function ax(n, r) {
  n = n || 10;
  const c = new Array(n),
    s = new Array(n);
  let o = 0,
    h = 0,
    m;
  return (
    (r = r !== void 0 ? r : 1e3),
    function (y) {
      const g = Date.now(),
        S = s[h];
      m || (m = g), (c[o] = y), (s[o] = g);
      let R = h,
        N = 0;
      for (; R !== o; ) (N += c[R++]), (R = R % n);
      if (((o = (o + 1) % n), o === h && (h = (h + 1) % n), g - m < r)) return;
      const T = S && g - S;
      return T ? Math.round((N * 1e3) / T) : void 0;
    }
  );
}
function nx(n, r) {
  let c = 0,
    s = 1e3 / r,
    o,
    h;
  const m = (g, S = Date.now()) => {
    (c = S), (o = null), h && (clearTimeout(h), (h = null)), n.apply(null, g);
  };
  return [
    (...g) => {
      const S = Date.now(),
        R = S - c;
      R >= s
        ? m(g, S)
        : ((o = g),
          h ||
            (h = setTimeout(() => {
              (h = null), m(o);
            }, s - R)));
    },
    () => o && m(o),
  ];
}
const qr = (n, r, c = 3) => {
    let s = 0;
    const o = ax(50, 250);
    return nx((h) => {
      const m = h.loaded,
        b = h.lengthComputable ? h.total : void 0,
        y = m - s,
        g = o(y),
        S = m <= b;
      s = m;
      const R = {
        loaded: m,
        total: b,
        progress: b ? m / b : void 0,
        bytes: y,
        rate: g || void 0,
        estimated: g && b && S ? (b - m) / g : void 0,
        event: h,
        lengthComputable: b != null,
        [r ? "download" : "upload"]: !0,
      };
      n(R);
    }, c);
  },
  Kh = (n, r) => {
    const c = n != null;
    return [(s) => r[0]({ lengthComputable: c, total: n, loaded: s }), r[1]];
  },
  Jh =
    (n) =>
    (...r) =>
      H.asap(() => n(...r)),
  ix = st.hasStandardBrowserEnv
    ? ((n, r) => (c) => (
        (c = new URL(c, st.origin)),
        n.protocol === c.protocol &&
          n.host === c.host &&
          (r || n.port === c.port)
      ))(
        new URL(st.origin),
        st.navigator && /(msie|trident)/i.test(st.navigator.userAgent)
      )
    : () => !0,
  rx = st.hasStandardBrowserEnv
    ? {
        write(n, r, c, s, o, h) {
          const m = [n + "=" + encodeURIComponent(r)];
          H.isNumber(c) && m.push("expires=" + new Date(c).toGMTString()),
            H.isString(s) && m.push("path=" + s),
            H.isString(o) && m.push("domain=" + o),
            h === !0 && m.push("secure"),
            (document.cookie = m.join("; "));
        },
        read(n) {
          const r = document.cookie.match(
            new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
          );
          return r ? decodeURIComponent(r[3]) : null;
        },
        remove(n) {
          this.write(n, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function ux(n) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(n);
}
function sx(n, r) {
  return r ? n.replace(/\/?\/$/, "") + "/" + r.replace(/^\/+/, "") : n;
}
function Vm(n, r, c) {
  let s = !ux(r);
  return (n && s) || c == !1 ? sx(n, r) : r;
}
const $h = (n) => (n instanceof mt ? { ...n } : n);
function ga(n, r) {
  r = r || {};
  const c = {};
  function s(g, S, R, N) {
    return H.isPlainObject(g) && H.isPlainObject(S)
      ? H.merge.call({ caseless: N }, g, S)
      : H.isPlainObject(S)
      ? H.merge({}, S)
      : H.isArray(S)
      ? S.slice()
      : S;
  }
  function o(g, S, R, N) {
    if (H.isUndefined(S)) {
      if (!H.isUndefined(g)) return s(void 0, g, R, N);
    } else return s(g, S, R, N);
  }
  function h(g, S) {
    if (!H.isUndefined(S)) return s(void 0, S);
  }
  function m(g, S) {
    if (H.isUndefined(S)) {
      if (!H.isUndefined(g)) return s(void 0, g);
    } else return s(void 0, S);
  }
  function b(g, S, R) {
    if (R in r) return s(g, S);
    if (R in n) return s(void 0, g);
  }
  const y = {
    url: h,
    method: h,
    data: h,
    baseURL: m,
    transformRequest: m,
    transformResponse: m,
    paramsSerializer: m,
    timeout: m,
    timeoutMessage: m,
    withCredentials: m,
    withXSRFToken: m,
    adapter: m,
    responseType: m,
    xsrfCookieName: m,
    xsrfHeaderName: m,
    onUploadProgress: m,
    onDownloadProgress: m,
    decompress: m,
    maxContentLength: m,
    maxBodyLength: m,
    beforeRedirect: m,
    transport: m,
    httpAgent: m,
    httpsAgent: m,
    cancelToken: m,
    socketPath: m,
    responseEncoding: m,
    validateStatus: b,
    headers: (g, S, R) => o($h(g), $h(S), R, !0),
  };
  return (
    H.forEach(Object.keys(Object.assign({}, n, r)), function (S) {
      const R = y[S] || o,
        N = R(n[S], r[S], S);
      (H.isUndefined(N) && R !== b) || (c[S] = N);
    }),
    c
  );
}
const Xm = (n) => {
    const r = ga({}, n);
    let {
      data: c,
      withXSRFToken: s,
      xsrfHeaderName: o,
      xsrfCookieName: h,
      headers: m,
      auth: b,
    } = r;
    (r.headers = m = mt.from(m)),
      (r.url = Lm(Vm(r.baseURL, r.url), n.params, n.paramsSerializer)),
      b &&
        m.set(
          "Authorization",
          "Basic " +
            btoa(
              (b.username || "") +
                ":" +
                (b.password ? unescape(encodeURIComponent(b.password)) : "")
            )
        );
    let y;
    if (H.isFormData(c)) {
      if (st.hasStandardBrowserEnv || st.hasStandardBrowserWebWorkerEnv)
        m.setContentType(void 0);
      else if ((y = m.getContentType()) !== !1) {
        const [g, ...S] = y
          ? y
              .split(";")
              .map((R) => R.trim())
              .filter(Boolean)
          : [];
        m.setContentType([g || "multipart/form-data", ...S].join("; "));
      }
    }
    if (
      st.hasStandardBrowserEnv &&
      (s && H.isFunction(s) && (s = s(r)), s || (s !== !1 && ix(r.url)))
    ) {
      const g = o && h && rx.read(h);
      g && m.set(o, g);
    }
    return r;
  },
  cx = typeof XMLHttpRequest < "u",
  ox =
    cx &&
    function (n) {
      return new Promise(function (c, s) {
        const o = Xm(n);
        let h = o.data;
        const m = mt.from(o.headers).normalize();
        let { responseType: b, onUploadProgress: y, onDownloadProgress: g } = o,
          S,
          R,
          N,
          T,
          v;
        function _() {
          T && T(),
            v && v(),
            o.cancelToken && o.cancelToken.unsubscribe(S),
            o.signal && o.signal.removeEventListener("abort", S);
        }
        let C = new XMLHttpRequest();
        C.open(o.method.toUpperCase(), o.url, !0), (C.timeout = o.timeout);
        function M() {
          if (!C) return;
          const Q = mt.from(
              "getAllResponseHeaders" in C && C.getAllResponseHeaders()
            ),
            G = {
              data:
                !b || b === "text" || b === "json"
                  ? C.responseText
                  : C.response,
              status: C.status,
              statusText: C.statusText,
              headers: Q,
              config: n,
              request: C,
            };
          Ym(
            function (F) {
              c(F), _();
            },
            function (F) {
              s(F), _();
            },
            G
          ),
            (C = null);
        }
        "onloadend" in C
          ? (C.onloadend = M)
          : (C.onreadystatechange = function () {
              !C ||
                C.readyState !== 4 ||
                (C.status === 0 &&
                  !(C.responseURL && C.responseURL.indexOf("file:") === 0)) ||
                setTimeout(M);
            }),
          (C.onabort = function () {
            C &&
              (s(new me("Request aborted", me.ECONNABORTED, n, C)), (C = null));
          }),
          (C.onerror = function () {
            s(new me("Network Error", me.ERR_NETWORK, n, C)), (C = null);
          }),
          (C.ontimeout = function () {
            let J = o.timeout
              ? "timeout of " + o.timeout + "ms exceeded"
              : "timeout exceeded";
            const G = o.transitional || qm;
            o.timeoutErrorMessage && (J = o.timeoutErrorMessage),
              s(
                new me(
                  J,
                  G.clarifyTimeoutError ? me.ETIMEDOUT : me.ECONNABORTED,
                  n,
                  C
                )
              ),
              (C = null);
          }),
          h === void 0 && m.setContentType(null),
          "setRequestHeader" in C &&
            H.forEach(m.toJSON(), function (J, G) {
              C.setRequestHeader(G, J);
            }),
          H.isUndefined(o.withCredentials) ||
            (C.withCredentials = !!o.withCredentials),
          b && b !== "json" && (C.responseType = o.responseType),
          g && (([N, v] = qr(g, !0)), C.addEventListener("progress", N)),
          y &&
            C.upload &&
            (([R, T] = qr(y)),
            C.upload.addEventListener("progress", R),
            C.upload.addEventListener("loadend", T)),
          (o.cancelToken || o.signal) &&
            ((S = (Q) => {
              C &&
                (s(!Q || Q.type ? new rn(null, n, C) : Q),
                C.abort(),
                (C = null));
            }),
            o.cancelToken && o.cancelToken.subscribe(S),
            o.signal &&
              (o.signal.aborted ? S() : o.signal.addEventListener("abort", S)));
        const X = lx(o.url);
        if (X && st.protocols.indexOf(X) === -1) {
          s(new me("Unsupported protocol " + X + ":", me.ERR_BAD_REQUEST, n));
          return;
        }
        C.send(h || null);
      });
    },
  fx = (n, r) => {
    const { length: c } = (n = n ? n.filter(Boolean) : []);
    if (r || c) {
      let s = new AbortController(),
        o;
      const h = function (g) {
        if (!o) {
          (o = !0), b();
          const S = g instanceof Error ? g : this.reason;
          s.abort(
            S instanceof me ? S : new rn(S instanceof Error ? S.message : S)
          );
        }
      };
      let m =
        r &&
        setTimeout(() => {
          (m = null), h(new me(`timeout ${r} of ms exceeded`, me.ETIMEDOUT));
        }, r);
      const b = () => {
        n &&
          (m && clearTimeout(m),
          (m = null),
          n.forEach((g) => {
            g.unsubscribe
              ? g.unsubscribe(h)
              : g.removeEventListener("abort", h);
          }),
          (n = null));
      };
      n.forEach((g) => g.addEventListener("abort", h));
      const { signal: y } = s;
      return (y.unsubscribe = () => H.asap(b)), y;
    }
  },
  dx = function* (n, r) {
    let c = n.byteLength;
    if (c < r) {
      yield n;
      return;
    }
    let s = 0,
      o;
    for (; s < c; ) (o = s + r), yield n.slice(s, o), (s = o);
  },
  hx = async function* (n, r) {
    for await (const c of mx(n)) yield* dx(c, r);
  },
  mx = async function* (n) {
    if (n[Symbol.asyncIterator]) {
      yield* n;
      return;
    }
    const r = n.getReader();
    try {
      for (;;) {
        const { done: c, value: s } = await r.read();
        if (c) break;
        yield s;
      }
    } finally {
      await r.cancel();
    }
  },
  Fh = (n, r, c, s) => {
    const o = hx(n, r);
    let h = 0,
      m,
      b = (y) => {
        m || ((m = !0), s && s(y));
      };
    return new ReadableStream(
      {
        async pull(y) {
          try {
            const { done: g, value: S } = await o.next();
            if (g) {
              b(), y.close();
              return;
            }
            let R = S.byteLength;
            if (c) {
              let N = (h += R);
              c(N);
            }
            y.enqueue(new Uint8Array(S));
          } catch (g) {
            throw (b(g), g);
          }
        },
        cancel(y) {
          return b(y), o.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  Jr =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  Qm = Jr && typeof ReadableStream == "function",
  gx =
    Jr &&
    (typeof TextEncoder == "function"
      ? (
          (n) => (r) =>
            n.encode(r)
        )(new TextEncoder())
      : async (n) => new Uint8Array(await new Response(n).arrayBuffer())),
  Zm = (n, ...r) => {
    try {
      return !!n(...r);
    } catch {
      return !1;
    }
  },
  px =
    Qm &&
    Zm(() => {
      let n = !1;
      const r = new Request(st.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (n = !0), "half";
        },
      }).headers.has("Content-Type");
      return n && !r;
    }),
  Wh = 64 * 1024,
  jc = Qm && Zm(() => H.isReadableStream(new Response("").body)),
  kr = { stream: jc && ((n) => n.body) };
Jr &&
  ((n) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((r) => {
      !kr[r] &&
        (kr[r] = H.isFunction(n[r])
          ? (c) => c[r]()
          : (c, s) => {
              throw new me(
                `Response type '${r}' is not supported`,
                me.ERR_NOT_SUPPORT,
                s
              );
            });
    });
  })(new Response());
const yx = async (n) => {
    if (n == null) return 0;
    if (H.isBlob(n)) return n.size;
    if (H.isSpecCompliantForm(n))
      return (
        await new Request(st.origin, { method: "POST", body: n }).arrayBuffer()
      ).byteLength;
    if (H.isArrayBufferView(n) || H.isArrayBuffer(n)) return n.byteLength;
    if ((H.isURLSearchParams(n) && (n = n + ""), H.isString(n)))
      return (await gx(n)).byteLength;
  },
  bx = async (n, r) => {
    const c = H.toFiniteNumber(n.getContentLength());
    return c ?? yx(r);
  },
  vx =
    Jr &&
    (async (n) => {
      let {
        url: r,
        method: c,
        data: s,
        signal: o,
        cancelToken: h,
        timeout: m,
        onDownloadProgress: b,
        onUploadProgress: y,
        responseType: g,
        headers: S,
        withCredentials: R = "same-origin",
        fetchOptions: N,
      } = Xm(n);
      g = g ? (g + "").toLowerCase() : "text";
      let T = fx([o, h && h.toAbortSignal()], m),
        v;
      const _ =
        T &&
        T.unsubscribe &&
        (() => {
          T.unsubscribe();
        });
      let C;
      try {
        if (
          y &&
          px &&
          c !== "get" &&
          c !== "head" &&
          (C = await bx(S, s)) !== 0
        ) {
          let G = new Request(r, { method: "POST", body: s, duplex: "half" }),
            U;
          if (
            (H.isFormData(s) &&
              (U = G.headers.get("content-type")) &&
              S.setContentType(U),
            G.body)
          ) {
            const [F, re] = Kh(C, qr(Jh(y)));
            s = Fh(G.body, Wh, F, re);
          }
        }
        H.isString(R) || (R = R ? "include" : "omit");
        const M = "credentials" in Request.prototype;
        v = new Request(r, {
          ...N,
          signal: T,
          method: c.toUpperCase(),
          headers: S.normalize().toJSON(),
          body: s,
          duplex: "half",
          credentials: M ? R : void 0,
        });
        let X = await fetch(v);
        const Q = jc && (g === "stream" || g === "response");
        if (jc && (b || (Q && _))) {
          const G = {};
          ["status", "statusText", "headers"].forEach((Z) => {
            G[Z] = X[Z];
          });
          const U = H.toFiniteNumber(X.headers.get("content-length")),
            [F, re] = (b && Kh(U, qr(Jh(b), !0))) || [];
          X = new Response(
            Fh(X.body, Wh, F, () => {
              re && re(), _ && _();
            }),
            G
          );
        }
        g = g || "text";
        let J = await kr[H.findKey(kr, g) || "text"](X, n);
        return (
          !Q && _ && _(),
          await new Promise((G, U) => {
            Ym(G, U, {
              data: J,
              headers: mt.from(X.headers),
              status: X.status,
              statusText: X.statusText,
              config: n,
              request: v,
            });
          })
        );
      } catch (M) {
        throw (
          (_ && _(),
          M && M.name === "TypeError" && /fetch/i.test(M.message)
            ? Object.assign(new me("Network Error", me.ERR_NETWORK, n, v), {
                cause: M.cause || M,
              })
            : me.from(M, M && M.code, n, v))
        );
      }
    }),
  Tc = { http: Mv, xhr: ox, fetch: vx };
H.forEach(Tc, (n, r) => {
  if (n) {
    try {
      Object.defineProperty(n, "name", { value: r });
    } catch {}
    Object.defineProperty(n, "adapterName", { value: r });
  }
});
const Ph = (n) => `- ${n}`,
  xx = (n) => H.isFunction(n) || n === null || n === !1,
  Km = {
    getAdapter: (n) => {
      n = H.isArray(n) ? n : [n];
      const { length: r } = n;
      let c, s;
      const o = {};
      for (let h = 0; h < r; h++) {
        c = n[h];
        let m;
        if (
          ((s = c),
          !xx(c) && ((s = Tc[(m = String(c)).toLowerCase()]), s === void 0))
        )
          throw new me(`Unknown adapter '${m}'`);
        if (s) break;
        o[m || "#" + h] = s;
      }
      if (!s) {
        const h = Object.entries(o).map(
          ([b, y]) =>
            `adapter ${b} ` +
            (y === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let m = r
          ? h.length > 1
            ? `since :
` +
              h.map(Ph).join(`
`)
            : " " + Ph(h[0])
          : "as no adapter specified";
        throw new me(
          "There is no suitable adapter to dispatch the request " + m,
          "ERR_NOT_SUPPORT"
        );
      }
      return s;
    },
    adapters: Tc,
  };
function pc(n) {
  if (
    (n.cancelToken && n.cancelToken.throwIfRequested(),
    n.signal && n.signal.aborted)
  )
    throw new rn(null, n);
}
function Ih(n) {
  return (
    pc(n),
    (n.headers = mt.from(n.headers)),
    (n.data = gc.call(n, n.transformRequest)),
    ["post", "put", "patch"].indexOf(n.method) !== -1 &&
      n.headers.setContentType("application/x-www-form-urlencoded", !1),
    Km.getAdapter(n.adapter || pi.adapter)(n).then(
      function (s) {
        return (
          pc(n),
          (s.data = gc.call(n, n.transformResponse, s)),
          (s.headers = mt.from(s.headers)),
          s
        );
      },
      function (s) {
        return (
          Gm(s) ||
            (pc(n),
            s &&
              s.response &&
              ((s.response.data = gc.call(n, n.transformResponse, s.response)),
              (s.response.headers = mt.from(s.response.headers)))),
          Promise.reject(s)
        );
      }
    )
  );
}
const Jm = "1.8.1",
  $r = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (n, r) => {
    $r[n] = function (s) {
      return typeof s === n || "a" + (r < 1 ? "n " : " ") + n;
    };
  }
);
const em = {};
$r.transitional = function (r, c, s) {
  function o(h, m) {
    return (
      "[Axios v" +
      Jm +
      "] Transitional option '" +
      h +
      "'" +
      m +
      (s ? ". " + s : "")
    );
  }
  return (h, m, b) => {
    if (r === !1)
      throw new me(
        o(m, " has been removed" + (c ? " in " + c : "")),
        me.ERR_DEPRECATED
      );
    return (
      c &&
        !em[m] &&
        ((em[m] = !0),
        console.warn(
          o(
            m,
            " has been deprecated since v" +
              c +
              " and will be removed in the near future"
          )
        )),
      r ? r(h, m, b) : !0
    );
  };
};
$r.spelling = function (r) {
  return (c, s) => (console.warn(`${s} is likely a misspelling of ${r}`), !0);
};
function Sx(n, r, c) {
  if (typeof n != "object")
    throw new me("options must be an object", me.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(n);
  let o = s.length;
  for (; o-- > 0; ) {
    const h = s[o],
      m = r[h];
    if (m) {
      const b = n[h],
        y = b === void 0 || m(b, h, n);
      if (y !== !0)
        throw new me("option " + h + " must be " + y, me.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (c !== !0) throw new me("Unknown option " + h, me.ERR_BAD_OPTION);
  }
}
const Br = { assertOptions: Sx, validators: $r },
  $t = Br.validators;
let ma = class {
  constructor(r) {
    (this.defaults = r),
      (this.interceptors = { request: new Qh(), response: new Qh() });
  }
  async request(r, c) {
    try {
      return await this._request(r, c);
    } catch (s) {
      if (s instanceof Error) {
        let o = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(o)
          : (o = new Error());
        const h = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack
            ? h &&
              !String(s.stack).endsWith(h.replace(/^.+\n.+\n/, "")) &&
              (s.stack +=
                `
` + h)
            : (s.stack = h);
        } catch {}
      }
      throw s;
    }
  }
  _request(r, c) {
    typeof r == "string" ? ((c = c || {}), (c.url = r)) : (c = r || {}),
      (c = ga(this.defaults, c));
    const { transitional: s, paramsSerializer: o, headers: h } = c;
    s !== void 0 &&
      Br.assertOptions(
        s,
        {
          silentJSONParsing: $t.transitional($t.boolean),
          forcedJSONParsing: $t.transitional($t.boolean),
          clarifyTimeoutError: $t.transitional($t.boolean),
        },
        !1
      ),
      o != null &&
        (H.isFunction(o)
          ? (c.paramsSerializer = { serialize: o })
          : Br.assertOptions(
              o,
              { encode: $t.function, serialize: $t.function },
              !0
            )),
      c.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (c.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (c.allowAbsoluteUrls = !0)),
      Br.assertOptions(
        c,
        {
          baseUrl: $t.spelling("baseURL"),
          withXsrfToken: $t.spelling("withXSRFToken"),
        },
        !0
      ),
      (c.method = (c.method || this.defaults.method || "get").toLowerCase());
    let m = h && H.merge(h.common, h[c.method]);
    h &&
      H.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (v) => {
          delete h[v];
        }
      ),
      (c.headers = mt.concat(m, h));
    const b = [];
    let y = !0;
    this.interceptors.request.forEach(function (_) {
      (typeof _.runWhen == "function" && _.runWhen(c) === !1) ||
        ((y = y && _.synchronous), b.unshift(_.fulfilled, _.rejected));
    });
    const g = [];
    this.interceptors.response.forEach(function (_) {
      g.push(_.fulfilled, _.rejected);
    });
    let S,
      R = 0,
      N;
    if (!y) {
      const v = [Ih.bind(this), void 0];
      for (
        v.unshift.apply(v, b),
          v.push.apply(v, g),
          N = v.length,
          S = Promise.resolve(c);
        R < N;

      )
        S = S.then(v[R++], v[R++]);
      return S;
    }
    N = b.length;
    let T = c;
    for (R = 0; R < N; ) {
      const v = b[R++],
        _ = b[R++];
      try {
        T = v(T);
      } catch (C) {
        _.call(this, C);
        break;
      }
    }
    try {
      S = Ih.call(this, T);
    } catch (v) {
      return Promise.reject(v);
    }
    for (R = 0, N = g.length; R < N; ) S = S.then(g[R++], g[R++]);
    return S;
  }
  getUri(r) {
    r = ga(this.defaults, r);
    const c = Vm(r.baseURL, r.url, r.allowAbsoluteUrls);
    return Lm(c, r.params, r.paramsSerializer);
  }
};
H.forEach(["delete", "get", "head", "options"], function (r) {
  ma.prototype[r] = function (c, s) {
    return this.request(
      ga(s || {}, { method: r, url: c, data: (s || {}).data })
    );
  };
});
H.forEach(["post", "put", "patch"], function (r) {
  function c(s) {
    return function (h, m, b) {
      return this.request(
        ga(b || {}, {
          method: r,
          headers: s ? { "Content-Type": "multipart/form-data" } : {},
          url: h,
          data: m,
        })
      );
    };
  }
  (ma.prototype[r] = c()), (ma.prototype[r + "Form"] = c(!0));
});
let Ex = class $m {
  constructor(r) {
    if (typeof r != "function")
      throw new TypeError("executor must be a function.");
    let c;
    this.promise = new Promise(function (h) {
      c = h;
    });
    const s = this;
    this.promise.then((o) => {
      if (!s._listeners) return;
      let h = s._listeners.length;
      for (; h-- > 0; ) s._listeners[h](o);
      s._listeners = null;
    }),
      (this.promise.then = (o) => {
        let h;
        const m = new Promise((b) => {
          s.subscribe(b), (h = b);
        }).then(o);
        return (
          (m.cancel = function () {
            s.unsubscribe(h);
          }),
          m
        );
      }),
      r(function (h, m, b) {
        s.reason || ((s.reason = new rn(h, m, b)), c(s.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(r) {
    if (this.reason) {
      r(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(r) : (this._listeners = [r]);
  }
  unsubscribe(r) {
    if (!this._listeners) return;
    const c = this._listeners.indexOf(r);
    c !== -1 && this._listeners.splice(c, 1);
  }
  toAbortSignal() {
    const r = new AbortController(),
      c = (s) => {
        r.abort(s);
      };
    return (
      this.subscribe(c),
      (r.signal.unsubscribe = () => this.unsubscribe(c)),
      r.signal
    );
  }
  static source() {
    let r;
    return {
      token: new $m(function (o) {
        r = o;
      }),
      cancel: r,
    };
  }
};
function wx(n) {
  return function (c) {
    return n.apply(null, c);
  };
}
function Nx(n) {
  return H.isObject(n) && n.isAxiosError === !0;
}
const Rc = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Rc).forEach(([n, r]) => {
  Rc[r] = n;
});
function Fm(n) {
  const r = new ma(n),
    c = Rm(ma.prototype.request, r);
  return (
    H.extend(c, ma.prototype, r, { allOwnKeys: !0 }),
    H.extend(c, r, null, { allOwnKeys: !0 }),
    (c.create = function (o) {
      return Fm(ga(n, o));
    }),
    c
  );
}
const ke = Fm(pi);
ke.Axios = ma;
ke.CanceledError = rn;
ke.CancelToken = Ex;
ke.isCancel = Gm;
ke.VERSION = Jm;
ke.toFormData = Kr;
ke.AxiosError = me;
ke.Cancel = ke.CanceledError;
ke.all = function (r) {
  return Promise.all(r);
};
ke.spread = wx;
ke.isAxiosError = Nx;
ke.mergeConfig = ga;
ke.AxiosHeaders = mt;
ke.formToJSON = (n) => km(H.isHTMLForm(n) ? new FormData(n) : n);
ke.getAdapter = Km.getAdapter;
ke.HttpStatusCode = Rc;
ke.default = ke;
const {
    Axios: Yx,
    AxiosError: Vx,
    CanceledError: Xx,
    isCancel: Qx,
    CancelToken: Zx,
    VERSION: Kx,
    all: Jx,
    Cancel: $x,
    isAxiosError: Fx,
    spread: Wx,
    toFormData: Px,
    AxiosHeaders: Ix,
    HttpStatusCode: e1,
    formToJSON: t1,
    getAdapter: l1,
    mergeConfig: a1,
  } = ke,
  Te = ke.create({ baseURL: "http://localhost:3000/api", withCredentials: !0 });
let fi = "";
function si(n) {
  fi = n;
}
Te.interceptors.request.use(
  (n) => (
    !n.headers.Authorization &&
      fi &&
      (n.headers.Authorization = `Bearer ${fi}`),
    n
  ),
  (n) => Promise.reject(n)
);
Te.interceptors.response.use(
  (n) => n,
  async (n) => {
    const r = n.config;
    if (n.response.status === 401)
      return (
        (fi = (
          await ke.get("http://localhost:3000/api/tokens/refresh", {
            withCredentials: !0,
          })
        ).data.accessToken),
        (r.sent = !0),
        (r.headers.Authorization = `Bearer ${fi}`),
        Te(r)
      );
  }
);
function jx({ user: n }) {
  const r = Yr(),
    c = () => {
      r("/");
    };
  return d.jsxs("div", {
    className:
      "flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8",
    children: [
      d.jsx("h2", {
        className: "text-3xl font-bold text-gray-300 mb-8",
        children: "Ошибка! Страница не найдена",
      }),
      d.jsx("button", {
        onClick: c,
        className:
          "bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-300",
        children: "Перейти на главную",
      }),
    ],
  });
}
function Tx({ category: n }) {
  const r = (o) => /^(https?:\/\/)/.test(o),
    c = (o) => {
      o.target.src = "/uploads/no-photo.png";
    },
    s = r(n.image)
      ? n.image
      : n.image && n.image !== "alt"
      ? `/uploads/categories/${n.image}.png`
      : "/uploads/no-photo.png";
  return d.jsxs("div", {
    className:
      "category bg-krio-background p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105",
    children: [
      d.jsx("img", {
        src: s,
        alt: n.name,
        className: "w-full h-full object-cover rounded-lg mb-4",
        onError: c,
      }),
      d.jsx("p", {
        className: "text-center text-xl font-semibold",
        children: n.name,
      }),
    ],
  });
}
const Rx = O.memo(Tx);
function Ax({ user: n, category: r }) {
  const [c, s] = O.useState(r),
    [o, h] = O.useState(""),
    [m, b] = O.useState(!1),
    [y, g] = O.useState(null),
    [S, R] = O.useState(null),
    [N, T] = O.useState({
      name: "",
      categoryId: "",
      price: "",
      image: "",
      availability: "",
      params: "",
    }),
    v = Yr(),
    _ = O.useCallback(
      (J) => {
        v(J ? `/category/${J}` : "/category");
      },
      [v]
    ),
    C = async (J) => {
      try {
        if (
          (b(!0),
          window.confirm("Вы уверены, что хотите удалить эту категорию?"))
        ) {
          const G = n.id;
          await Te.delete(`/deleteCategory/${J}/${G}`),
            s((U) => U.filter((F) => F.id !== J));
        }
      } catch (G) {
        h("Не удалось удалить категорию: " + G.message);
      } finally {
        b(!1);
      }
    },
    M = async (J) => {
      var G, U;
      J.preventDefault();
      try {
        if ((b(!0), !N.name.trim()))
          throw new Error("Название категории обязательно");
        const F = {
            name: N.name.trim(),
            img: N.image || "default-category.jpg",
          },
          re = await Te.put(`/updateCategory/${y.id}/${n.id}`, F);
        re.status === 200 &&
          (s((Z) => Z.map((le) => (le.id === y.id ? re.data : le))),
          g(null),
          R(null),
          T({
            name: "",
            categoryId: "",
            price: "",
            image: "",
            availability: "",
            params: "",
          }));
      } catch (F) {
        h(
          ((U = (G = F.response) == null ? void 0 : G.data) == null
            ? void 0
            : U.message) || F.message
        );
      } finally {
        b(!1);
      }
    },
    X = O.useCallback((J) => {
      const { name: G, value: U } = J.target;
      T((F) => ({ ...F, [G]: U }));
    }, []),
    Q = async (J) => {
      try {
        if ((b(!0), h(""), !N.name.trim()))
          throw new Error("Название обязательно для заполнения");
        if (J === "product") {
          if (!N.categoryId) throw new Error("Выберите категорию");
          if (!N.price) throw new Error("Укажите цену");
          const G = {
            name: N.name.trim(),
            categoryId: Number(N.categoryId),
            price: N.price,
            image: N.image || "default-product.jpg",
            availability: N.availability || "в наличии",
            params: Ox(N.params),
            user: { isAdmin: n == null ? void 0 : n.isAdmin },
          };
          if ((await Te.post("/createProduct", G)).status !== 201)
            throw new Error("Ошибка при создании товара");
        } else if (J === "category") {
          if (
            c.find(
              (re) => re.name.toLowerCase() === N.name.trim().toLowerCase()
            )
          )
            throw new Error("Категория с таким названием уже существует");
          const U = {
              name: N.name.trim(),
              img: N.image || "default-category.jpg",
              user: { isAdmin: n == null ? void 0 : n.isAdmin },
            },
            F = await Te.post("/createCategory", U);
          if (F.status !== 201)
            throw new Error("Ошибка при создании категории");
          s((re) => [...re, F.data]);
        }
        R(null),
          T({
            name: "",
            categoryId: "",
            price: "",
            image: "",
            availability: "",
            params: "",
          });
      } catch (G) {
        h(G.message || "Произошла ошибка при создании");
      } finally {
        b(!1);
      }
    };
  return (
    O.useEffect(() => {
      r && r.length > 0 && s(r);
    }, [r]),
    d.jsx("div", {
      className:
        "flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8",
      role: "main",
      children: d.jsxs("div", {
        className: "max-w-7xl mx-auto",
        children: [
          S &&
            d.jsxs("div", {
              className: "mb-8 bg-krio-background p-6 rounded-lg",
              children: [
                d.jsx("h3", {
                  className: "text-xl font-semibold mb-4",
                  children:
                    S === "category"
                      ? "Создать категорию"
                      : S === "editCategory"
                      ? "Редактировать категорию"
                      : "Создать товар",
                }),
                d.jsxs("form", {
                  onSubmit: (J) => {
                    J.preventDefault(), S === "editCategory" ? M(J) : Q(S);
                  },
                  className: "space-y-4",
                  children: [
                    d.jsxs("div", {
                      children: [
                        d.jsx("label", {
                          className: "block text-gray-300 mb-2",
                          children: "Название *",
                        }),
                        d.jsx("input", {
                          name: "name",
                          value: N.name,
                          onChange: X,
                          className:
                            "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white",
                          required: !0,
                        }),
                      ],
                    }),
                    S === "product" &&
                      d.jsxs(d.Fragment, {
                        children: [
                          d.jsxs("div", {
                            children: [
                              d.jsx("label", {
                                className: "block text-gray-300 mb-2",
                                children: "Категория *",
                              }),
                              d.jsxs("select", {
                                name: "categoryId",
                                value: N.categoryId,
                                onChange: X,
                                className:
                                  "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white",
                                required: !0,
                                children: [
                                  d.jsx("option", {
                                    value: "",
                                    children: "Выберите категорию",
                                  }),
                                  c.map((J) =>
                                    d.jsx(
                                      "option",
                                      { value: J.id, children: J.name },
                                      J.id
                                    )
                                  ),
                                ],
                              }),
                            ],
                          }),
                          d.jsxs("div", {
                            children: [
                              d.jsx("label", {
                                className: "block text-gray-300 mb-2",
                                children: "Цена *",
                              }),
                              d.jsx("input", {
                                name: "price",
                                value: N.price,
                                onChange: X,
                                className:
                                  "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white",
                                required: !0,
                              }),
                            ],
                          }),
                          d.jsxs("div", {
                            children: [
                              d.jsx("label", {
                                className: "block text-gray-300 mb-2",
                                children: "Наличие",
                              }),
                              d.jsx("input", {
                                name: "availability",
                                value: N.availability,
                                onChange: X,
                                className:
                                  "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white",
                              }),
                            ],
                          }),
                        ],
                      }),
                    d.jsxs("div", {
                      children: [
                        d.jsx("label", {
                          className: "block text-gray-300 mb-2",
                          children: "Изображение",
                        }),
                        d.jsx("input", {
                          name: "image",
                          value: N.image,
                          onChange: X,
                          className:
                            "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white",
                          placeholder: "URL или имя файла",
                        }),
                      ],
                    }),
                    d.jsxs("div", {
                      className: "flex justify-end gap-4",
                      children: [
                        d.jsx("button", {
                          type: "button",
                          onClick: () => {
                            R(null),
                              T({
                                name: "",
                                categoryId: "",
                                price: "",
                                image: "",
                                availability: "",
                                params: "",
                              });
                          },
                          className:
                            "px-4 py-2 bg-krio-primary hover:bg-krio-foreground rounded-lg",
                          children: "Отмена",
                        }),
                        d.jsx("button", {
                          type: "submit",
                          className:
                            "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg",
                          children:
                            S === "editCategory" ? "Сохранить" : "Создать",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          d.jsx("div", {
            className: " text-white min-h-screen p-6",
            role: "main",
            children: d.jsxs("div", {
              className: "max-w-7xl mx-auto",
              children: [
                (n == null ? void 0 : n.isAdmin) &&
                  d.jsxs("div", {
                    className: "mb-8 flex gap-4 justify-end",
                    children: [
                      d.jsx("button", {
                        onClick: () => R("product"),
                        className:
                          "bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500",
                        disabled: m,
                        "aria-label": "Добавить новый товар",
                        children: m ? "Загрузка..." : "+ Новый товар",
                      }),
                      d.jsx("button", {
                        onClick: () => R("category"),
                        className:
                          "bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                        disabled: m,
                        "aria-label": "Добавить новую категорию",
                        children: m ? "Загрузка..." : "+ Новая категория",
                      }),
                    ],
                  }),
                o &&
                  d.jsx("div", {
                    className: "mb-4 p-4 bg-red-800 text-red-100 rounded-lg",
                    role: "alert",
                    "aria-live": "polite",
                    children: o,
                  }),
                m &&
                  d.jsx("div", {
                    className: "flex justify-center items-center py-8",
                    children: d.jsx("div", {
                      className:
                        "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500",
                    }),
                  }),
                d.jsxs("section", {
                  children: [
                    d.jsx("h2", {
                      className:
                        "text-3xl font-bold text-center text-gray-300 mb-8",
                      children: "Каталог",
                    }),
                    d.jsxs("div", {
                      className:
                        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
                      children: [
                        d.jsx("button", {
                          onClick: () => _(),
                          className:
                            "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transform transition-transform hover:scale-105 ",
                          "aria-label": "Показать все категории",
                          children: d.jsxs("div", {
                            className:
                              "bg-krio-background p-6 rounded-lg shadow-lg h-full",
                            children: [
                              d.jsx("img", {
                                src: "/uploads/categories/all-categories.png",
                                alt: "Все категории",
                                className:
                                  "w-full object-cover rounded-lg mb-4",
                                loading: "lazy",
                              }),
                              d.jsx("p", {
                                className: "text-center text-xl font-semibold",
                                children: "Все категории",
                              }),
                            ],
                          }),
                        }),
                        c.map((J) =>
                          d.jsxs(
                            "div",
                            {
                              className: "relative group",
                              children: [
                                (n == null ? void 0 : n.isAdmin) &&
                                  d.jsxs("div", {
                                    className:
                                      "absolute top-2 right-2 flex gap-2 z-10",
                                    children: [
                                      d.jsx("button", {
                                        onClick: (G) => {
                                          G.stopPropagation(), C(J.id);
                                        },
                                        className:
                                          "p-2 text-red-500 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full",
                                        title: "Удалить категорию",
                                        "aria-label": `Удалить категорию ${J.name}`,
                                        disabled: m,
                                        children: d.jsx("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          className: "h-6 w-6",
                                          fill: "none",
                                          viewBox: "0 0 24 24",
                                          stroke: "currentColor",
                                          children: d.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
                                          }),
                                        }),
                                      }),
                                      d.jsx("button", {
                                        onClick: (G) => {
                                          G.stopPropagation(),
                                            g(J),
                                            R("editCategory"),
                                            T({
                                              ...N,
                                              name: J.name,
                                              image: J.img,
                                            });
                                        },
                                        className:
                                          "p-2 text-blue-500 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full",
                                        title: "Редактировать категорию",
                                        "aria-label": `Редактировать категорию ${J.name}`,
                                        disabled: m,
                                        children: d.jsx("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          className: "h-6 w-6",
                                          fill: "none",
                                          viewBox: "0 0 24 24",
                                          stroke: "currentColor",
                                          children: d.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                d.jsx("button", {
                                  onClick: () => _(J.id),
                                  className:
                                    "w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transform transition-transform hover:scale-105",
                                  "aria-label": `Перейти в категорию ${J.name}`,
                                  children: d.jsx(Rx, { category: J }),
                                }),
                              ],
                            },
                            J.id
                          )
                        ),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    })
  );
}
function Ox(n) {
  try {
    return JSON.parse(n);
  } catch {
    return {};
  }
}
function Cx({ user: n }) {
  const [r, c] = O.useState({
      name: (n == null ? void 0 : n.name) || "",
      email: (n == null ? void 0 : n.email) || "",
      phone: "",
      message: "",
    }),
    [s, o] = O.useState({}),
    [h, m] = O.useState({ loading: !1, success: !1, error: null }),
    b = () => {
      const S = {};
      return (
        r.name.trim()
          ? r.name.trim().length < 2 &&
            (S.name = "Имя должно содержать минимум 2 символа")
          : (S.name = "Имя обязательно"),
        r.email.trim()
          ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(r.email) ||
            (S.email = "Некорректный email адрес")
          : (S.email = "Email обязателен"),
        r.message.trim()
          ? r.message.trim().length < 10 &&
            (S.message = "Сообщение должно содержать минимум 10 символов")
          : (S.message = "Сообщение обязательно"),
        r.phone &&
          !/^\+?[1-9]\d{10}$/.test(r.phone.trim()) &&
          (S.phone = "Некорректный формат телефона"),
        o(S),
        Object.keys(S).length === 0
      );
    },
    y = (S) => {
      const { name: R, value: N } = S.target;
      c((T) => ({ ...T, [R]: N }));
    },
    g = async (S) => {
      var R, N;
      if (
        (S.preventDefault(),
        m({ loading: !1, success: !1, error: null }),
        !!b())
      ) {
        m({ loading: !0, success: !1, error: null });
        try {
          const T = {
              name: r.name.trim(),
              email: r.email.trim(),
              phone: ((R = r.phone) == null ? void 0 : R.trim()) || null,
              message: r.message.trim(),
            },
            v = await Te.post("/feedback", T);
          if (v.status === 201 || v.status === 200)
            m({ loading: !1, success: !0, error: null }),
              c({
                name: (n == null ? void 0 : n.name) || "",
                email: (n == null ? void 0 : n.email) || "",
                phone: "",
                message: "",
              }),
              setTimeout(() => {
                m((_) => ({ ..._, success: !1 }));
              }, 3e3);
          else throw new Error(`Unexpected response status: ${v.status}`);
        } catch (T) {
          console.error("Feedback submission error:", T);
          let v = "Произошла ошибка при отправке. Попробуйте позже.";
          if (T.response)
            switch (T.response.status) {
              case 400:
                v = "Пожалуйста, проверьте правильность заполнения всех полей";
                break;
              case 429:
                v = "Слишком много запросов. Пожалуйста, подождите немного";
                break;
              case 500:
                v = "Внутренняя ошибка сервера. Пожалуйста, попробуйте позже";
                break;
              default:
                v = ((N = T.response.data) == null ? void 0 : N.message) || v;
            }
          m({ loading: !1, success: !1, error: v });
        }
      }
    };
  return d.jsx("div", {
    className:
      "flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10",
    children: d.jsx("main", {
      className:
        "w-full max-w-4xl p-8 space-y-6 bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8 opacity-100",
      children: d.jsxs("section", {
        id: "contacts",
        className: "space-y-6",
        children: [
          d.jsx("div", {
            children: d.jsx("h2", {
              className: "text-2xl font-bold text-center text-gray-200",
              children: "Свяжитесь с нами",
            }),
          }),
          d.jsx("p", {
            className: "text-gray-300 text-center",
            children:
              "Мы всегда рады помочь! Вы можете связаться с нами через:",
          }),
          d.jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
            children: [
              d.jsxs("div", {
                className: "p-4 bg-krio-foreground rounded-lg shadow-md",
                children: [
                  d.jsx("h3", {
                    className: "text-lg font-semibold text-gray-200",
                    children: "Адрес",
                  }),
                  d.jsx("p", {
                    className: "text-gray-400",
                    children: "Москва, ул. Инновационная, д. 10",
                  }),
                  d.jsx("div", {
                    id: "map",
                    className: "mt-4",
                    children: d.jsx("iframe", {
                      src: "https://yandex.ru/map-widget/v1/?from=mapframe&ll=37.707774%2C55.816179&mode=search&oid=1011075765&ol=biz&z=17.85",
                      width: "100%",
                      height: "300",
                      className: "rounded-lg border border-gray-600",
                      allowFullScreen: !0,
                    }),
                  }),
                ],
              }),
              d.jsxs("div", {
                className: "p-4 bg-krio-foreground rounded-lg shadow-md",
                children: [
                  d.jsx("h3", {
                    className: "text-lg font-semibold text-gray-200",
                    children: "Телефон",
                  }),
                  d.jsx("p", {
                    className: "text-gray-400",
                    children: d.jsx("a", {
                      href: "tel:+74951234567",
                      className: "text-blue-400 hover:underline",
                      children: "+7 (995) 887 06 11",
                    }),
                  }),
                ],
              }),
              d.jsxs("div", {
                className: "p-4 bg-krio-foreground rounded-lg shadow-md",
                children: [
                  d.jsx("h3", {
                    className: "text-lg font-semibold text-gray-200",
                    children: "Email",
                  }),
                  d.jsx("p", {
                    className: "text-gray-400",
                    children: d.jsx("a", {
                      href: "mailto:krioarmatura@yandex.ru",
                      className: "text-blue-400 hover:underline",
                      children: "krioarmatura@yandex.ru",
                    }),
                  }),
                ],
              }),
              d.jsxs("div", {
                className: "p-4 bg-krio-foreground rounded-lg shadow-md",
                children: [
                  d.jsx("h3", {
                    className: "text-lg font-semibold text-gray-200",
                    children: "Социальные сети",
                  }),
                  d.jsxs("p", {
                    className: "text-gray-400",
                    children: [
                      d.jsx("a", {
                        href: "#",
                        className: "text-blue-400 hover:underline",
                        children: "ВКонтакте",
                      }),
                      " ",
                      "|",
                      d.jsxs("a", {
                        href: "#",
                        className: "text-blue-400 hover:underline",
                        children: [" ", "Facebook"],
                      }),
                      " ",
                      "|",
                      d.jsxs("a", {
                        href: "#",
                        className: "text-blue-400 hover:underline",
                        children: [" ", "Instagram"],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          d.jsxs("div", {
            className: "p-6 bg-krio-foreground rounded-lg shadow-md",
            children: [
              d.jsx("h3", {
                className:
                  "text-lg font-semibold text-gray-200 text-center mb-4",
                children: "Обратная связь",
              }),
              h.success &&
                d.jsx("div", {
                  className: "mb-4 p-3 bg-green-600 text-white rounded",
                  children: "Сообщение успешно отправлено!",
                }),
              h.error &&
                d.jsx("div", {
                  className: "mb-4 p-3 bg-red-600 text-white rounded",
                  children: h.error,
                }),
              d.jsxs("form", {
                onSubmit: g,
                className: "space-y-4",
                children: [
                  d.jsxs("div", {
                    children: [
                      d.jsx("input", {
                        type: "text",
                        name: "name",
                        value: r.name,
                        onChange: y,
                        placeholder: "Ваше имя",
                        className: `w-full px-3 py-2 bg-krio-background border ${
                          s.name ? "border-red-500" : "border-gray-600"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`,
                      }),
                      s.name &&
                        d.jsx("p", {
                          className: "mt-1 text-sm text-red-500",
                          children: s.name,
                        }),
                    ],
                  }),
                  d.jsxs("div", {
                    children: [
                      d.jsx("input", {
                        type: "email",
                        name: "email",
                        value: r.email,
                        onChange: y,
                        placeholder: "Ваш email для связи",
                        className: `w-full px-3 py-2 bg-krio-background border ${
                          s.email ? "border-red-500" : "border-gray-600"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`,
                      }),
                      s.email &&
                        d.jsx("p", {
                          className: "mt-1 text-sm text-red-500",
                          children: s.email,
                        }),
                    ],
                  }),
                  d.jsxs("div", {
                    children: [
                      d.jsx("input", {
                        type: "tel",
                        name: "phone",
                        value: r.phone,
                        onChange: y,
                        placeholder: "Ваш телефон для связи",
                        className: `w-full px-3 py-2 bg-krio-background border ${
                          s.phone ? "border-red-500" : "border-gray-600"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`,
                      }),
                      s.phone &&
                        d.jsx("p", {
                          className: "mt-1 text-sm text-red-500",
                          children: s.phone,
                        }),
                    ],
                  }),
                  d.jsxs("div", {
                    children: [
                      d.jsx("textarea", {
                        name: "message",
                        value: r.message,
                        onChange: y,
                        placeholder: "Ваше сообщение",
                        rows: "5",
                        className: `w-full px-3 py-2 bg-krio-background border ${
                          s.message ? "border-red-500" : "border-gray-600"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`,
                      }),
                      s.message &&
                        d.jsx("p", {
                          className: "mt-1 text-sm text-red-500",
                          children: s.message,
                        }),
                    ],
                  }),
                  d.jsx("button", {
                    type: "submit",
                    disabled: h.loading,
                    className: `w-full py-2 font-semibold text-white ${
                      h.loading
                        ? "bg-krio-primary cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors`,
                    children: h.loading ? "Отправка..." : "Отправить",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
function zx() {
  return d.jsx("div", {
    className:
      "flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8",
    children: d.jsxs("main", {
      className:
        "w-full max-w-4xl p-8 space-y-6 bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8",
      children: [
        d.jsxs("section", {
          id: "overview",
          className: "space-y-6",
          children: [
            d.jsx("h2", {
              className: "text-2xl font-bold text-center text-gray-200",
              children: "Общее описание",
            }),
            d.jsx("p", {
              className: "text-gray-300",
              children:
                "Компания “Криоарматура” уже более 20 лет успешно работает на рынке поставок стендовой, воздушной и криогенной арматуры, являясь надежным партнером для ведущих предприятий России.",
            }),
            d.jsx("p", {
              className: "text-gray-300",
              children:
                "Наша продукция востребована в таких высокотехнологичных отраслях, как космическая промышленность, нефтегазовый сектор и машиностроение.",
            }),
          ],
        }),
        d.jsxs("section", {
          id: "clients",
          className: "space-y-6",
          children: [
            d.jsx("h2", {
              className: "text-2xl font-bold text-center text-gray-200",
              children: "Наши клиенты",
            }),
            d.jsx("p", {
              className: "text-gray-300",
              children:
                "Мы гордимся долгосрочным сотрудничеством с такими корпорациями, как:",
            }),
            d.jsxs("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
              children: [
                d.jsxs("div", {
                  className:
                    "flex flex-col items-center bg-white p-4 rounded-md",
                  children: [
                    d.jsx("p", {
                      className: "text-gray-400",
                      children: "Роскосмос",
                    }),
                    d.jsx("img", {
                      src: "/uploads/companies/Roscosmos.png",
                      alt: "Лого Роскосмоса",
                      className: "w-32 h-32 object-contain rounded-md",
                    }),
                  ],
                }),
                d.jsxs("div", {
                  className:
                    "flex flex-col items-center bg-white p-4 rounded-md",
                  children: [
                    d.jsx("p", {
                      className: "text-gray-400",
                      children: "Алмаз-Антей",
                    }),
                    d.jsx("img", {
                      src: "/uploads/companies/Almaz-Antey.jpg",
                      alt: "Лого Алмаз-Антея",
                      className: "w-32 h-32 object-contain rounded-md",
                    }),
                  ],
                }),
                d.jsxs("div", {
                  className:
                    "flex flex-col items-center bg-white p-4 rounded-md",
                  children: [
                    d.jsx("p", {
                      className: "text-gray-400",
                      children: "Прогресс",
                    }),
                    d.jsx("img", {
                      src: "/uploads/companies/Progress.jpg",
                      alt: "Лого Прогресса",
                      className: "w-32 h-32 object-contain rounded-md",
                    }),
                  ],
                }),
                d.jsxs("div", {
                  className:
                    "flex flex-col items-center bg-white p-4 rounded-md",
                  children: [
                    d.jsx("p", {
                      className: "text-gray-400",
                      children: "Криогенмаш",
                    }),
                    d.jsx("img", {
                      src: "/uploads/companies/Kriogenmash.jpg",
                      alt: "Лого Криогенмаша",
                      className: "w-32 h-32 object-contain rounded-md",
                    }),
                  ],
                }),
                d.jsxs("div", {
                  className:
                    "flex flex-col items-center bg-white p-4 rounded-md",
                  children: [
                    d.jsx("p", {
                      className: "text-gray-400",
                      children: "Техгаз",
                    }),
                    d.jsx("img", {
                      src: "/uploads/companies/tech-gas.png",
                      alt: "Лого Техгаза",
                      className: "w-32 h-32 object-contain rounded-md",
                    }),
                  ],
                }),
                d.jsxs("div", {
                  className:
                    "flex flex-col items-center bg-white p-4 rounded-md",
                  children: [
                    d.jsx("p", {
                      className: "text-gray-400",
                      children: "ООО ЗИД",
                    }),
                    d.jsx("img", {
                      src: "/uploads/companies/zid.png",
                      alt: "Лого ООО ЗИД",
                      className: "w-32 h-32 object-contain rounded-md",
                    }),
                  ],
                }),
                d.jsxs("div", {
                  className:
                    "flex flex-col items-center bg-white p-4 rounded-md",
                  children: [
                    d.jsx("p", {
                      className: "text-gray-400",
                      children: "НИИМАШ",
                    }),
                    d.jsx("img", {
                      src: "/uploads/companies/niimash.jpg",
                      alt: "Лого НИИМАШа",
                      className: "w-32 h-32 object-contain rounded-md",
                    }),
                  ],
                }),
                d.jsxs("div", {
                  className:
                    "flex flex-col items-center bg-white p-4 rounded-md",
                  children: [
                    d.jsx("p", {
                      className: "text-gray-400",
                      children: "СЭГЗ",
                    }),
                    d.jsx("img", {
                      src: "/uploads/companies/segs.png",
                      alt: "Лого СЭГЗа",
                      className: "w-32 h-32 object-contain rounded-md",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        d.jsxs("section", {
          id: "services",
          className: "space-y-6",
          children: [
            d.jsx("h2", {
              className: "text-2xl font-bold text-center text-gray-200",
              children: "Услуги",
            }),
            d.jsx("p", {
              className: "text-gray-300",
              children:
                "Кроме поставок, “Криоарматура” предоставляет полный комплекс услуг, включая консультации по выбору оборудования, что позволяет нашим клиентам быть уверенными в надежности и долговечности поставленных решений.",
            }),
          ],
        }),
        d.jsxs("section", {
          id: "team",
          className: "space-y-6",
          children: [
            d.jsx("h2", {
              className: "text-2xl font-bold text-center text-gray-200",
              children: "Наша команда",
            }),
            d.jsx("p", {
              className: "text-gray-300",
              children:
                "Наша команда объединяет высококвалифицированных специалистов, которые постоянно совершенствуют свои знания и следят за новейшими тенденциями в отрасли. Мы стремимся не только удовлетворять потребности клиентов, но и превосходить их ожидания, предлагая передовые и надежные решения для самых сложных задач.",
            }),
          ],
        }),
        d.jsxs("section", {
          id: "mission",
          className: "space-y-6",
          children: [
            d.jsx("h2", {
              className: "text-2xl font-bold text-center text-gray-200",
              children: "Наша миссия",
            }),
            d.jsx("p", {
              className: "text-gray-300",
              children:
                "“Криоарматура” — это ваш партнер на пути к инновациям и стабильности.",
            }),
          ],
        }),
      ],
    }),
  });
}
function _x() {
  return d.jsx("div", {
    className:
      "flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8",
    children: d.jsxs("main", {
      className:
        "w-full max-w-4xl p-8 space-y-6 bg-krio-background rounded-lg shadow-lg border border-gray-700 my-8",
      children: [
        d.jsxs("section", {
          className: "space-y-6",
          children: [
            d.jsx("h1", {
              className: "text-2xl font-bold text-center text-gray-200",
              children: "Общее описание",
            }),
            d.jsx("p", {
              className: "text-gray-300",
              children:
                "Трубопроводная арматура используется при монтаже и обслуживании систем водо- и газоснабжения, отопления, а также для перекачки жидкостей, газов, вязких и порошковых веществ. Ее основная задача — регулирование потока, закрытие, смешивание или защита оборудования при аварийных ситуациях.",
            }),
          ],
        }),
        d.jsxs("section", {
          className: "space-y-6",
          children: [
            d.jsx("h1", {
              className: "text-2xl font-bold text-center text-gray-200",
              children: "Как выбрать трубопроводную арматуру",
            }),
            d.jsx("p", {
              className: "text-gray-300",
              children:
                "Выбор трубопроводной арматуры зависит от нескольких ключевых факторов:",
            }),
            d.jsxs("ul", {
              className: "list-disc list-inside space-y-2 text-gray-400",
              children: [
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Назначение:" }),
                    " арматура должна выполнять функции открытия/закрытия потока или регулирования, смешивания.",
                  ],
                }),
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Условия эксплуатации:" }),
                    " оценка окружающей среды (температура, влажность) и характеристики рабочей среды (агрессивная, коррозионная и т.д.).",
                  ],
                }),
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Параметры сети:" }),
                    " давление, расход, температура, влажность.",
                  ],
                }),
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Присоединительные размеры:" }),
                    " проверка соответствия диаметра трубопровода стандартам.",
                  ],
                }),
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Способ установки:" }),
                    " выбор между резьбовыми, фланцевыми или сварными соединениями.",
                  ],
                }),
              ],
            }),
          ],
        }),
        d.jsxs("section", {
          className: "space-y-6",
          children: [
            d.jsx("h1", {
              className: "text-2xl font-bold text-center text-gray-200",
              children: "Базовые параметры",
            }),
            d.jsxs("ul", {
              className: "list-disc list-inside space-y-2 text-gray-400",
              children: [
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Условный проход (DN/Ду):" }),
                    " внутренний диаметр, определяющий пропускную способность.",
                  ],
                }),
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Рабочее давление:" }),
                    " максимальное давление, при котором устройство сохраняет характеристики.",
                  ],
                }),
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Материалы:" }),
                    " чугун, латунь, нержавеющая сталь — выбор материала зависит от рабочей среды.",
                  ],
                }),
              ],
            }),
          ],
        }),
        d.jsxs("section", {
          className: "space-y-6",
          children: [
            d.jsx("h1", {
              className: "text-2xl font-bold text-center text-gray-200",
              children: "Виды арматуры",
            }),
            d.jsxs("ul", {
              className: "list-disc list-inside space-y-2 text-gray-400",
              children: [
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Запорная:" }),
                    " для полного или частичного перекрытия потока.",
                  ],
                }),
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Предохранительная:" }),
                    " для защиты оборудования от избыточного давления.",
                  ],
                }),
                d.jsxs("li", {
                  children: [
                    d.jsx("strong", { children: "Регулирующая:" }),
                    " для управления потоком жидкости или газа.",
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function Dx({ handleLogin: n, handleSignUp: r }) {
  const [c, s] = O.useState(!0),
    [o, h] = O.useState(""),
    [m, b] = O.useState(""),
    [y, g] = O.useState(""),
    [S, R] = O.useState(""),
    N = () => {
      s(!c), R("");
    },
    T = (v) => {
      if ((v.preventDefault(), !c && o !== m)) {
        R("Пароли не совпадают!");
        return;
      }
      c ? n(v) : r(v);
    };
  return d.jsx("div", {
    className:
      "flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8",
    children: d.jsxs("div", {
      className:
        "w-full max-w-md p-8 space-y-6 bg-krio-foreground rounded-lg shadow-xl border border-gray-700",
      children: [
        d.jsx("h2", {
          className:
            "text-2xl font-semibold text-center text-gray-300 uppercase tracking-wide",
          children: c ? "Вход" : "Регистрация",
        }),
        d.jsxs("form", {
          onSubmit: T,
          className: "space-y-4",
          children: [
            d.jsxs("div", {
              children: [
                d.jsx("label", {
                  htmlFor: "em1",
                  className: "block text-gray-400 font-medium",
                  children: "Почта",
                }),
                d.jsx("input", {
                  name: "email",
                  type: "email",
                  id: "em1",
                  className:
                    "w-full px-3 py-2 mt-1 bg-krio-background border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none",
                }),
              ],
            }),
            !c &&
              d.jsxs("div", {
                children: [
                  d.jsx("label", {
                    htmlFor: "name1",
                    className: "block text-gray-400 font-medium",
                    children: "Логин",
                  }),
                  d.jsx("input", {
                    name: "name",
                    type: "text",
                    id: "name1",
                    value: y,
                    onChange: (v) => g(v.target.value),
                    className:
                      "w-full px-3 py-2 mt-1 bg-krio-background border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none",
                  }),
                ],
              }),
            d.jsxs("div", {
              children: [
                d.jsx("label", {
                  htmlFor: "pass1",
                  className: "block text-gray-400 font-medium",
                  children: "Пароль",
                }),
                d.jsx("input", {
                  name: "password",
                  type: "password",
                  id: "pass1",
                  value: o,
                  onChange: (v) => h(v.target.value),
                  className:
                    "w-full px-3 py-2 mt-1 bg-krio-background border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none",
                }),
              ],
            }),
            !c &&
              d.jsxs("div", {
                children: [
                  d.jsx("label", {
                    htmlFor: "pass2",
                    className: "block text-gray-400 font-medium",
                    children: "Подтвердите пароль",
                  }),
                  d.jsx("input", {
                    name: "confirmPassword",
                    type: "password",
                    id: "pass2",
                    value: m,
                    onChange: (v) => b(v.target.value),
                    className:
                      "w-full px-3 py-2 mt-1 bg-krio-background border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none",
                  }),
                ],
              }),
            S &&
              d.jsx("div", {
                className: "text-red-500 text-sm text-center",
                children: S,
              }),
            d.jsx("button", {
              type: "submit",
              className:
                "w-full py-2 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none",
              children: c ? "Войти" : "Зарегистрироваться",
            }),
          ],
        }),
        d.jsx("div", {
          className: "text-center",
          children: d.jsx("button", {
            onClick: N,
            className: "text-blue-500 hover:underline",
            children: c ? "Еще нет аккаунта?" : "Уже есть аккаунт?",
          }),
        }),
      ],
    }),
  });
}
function Mx({ isOpen: n, onClose: r, product: c, user: s, category: o }) {
  const h = O.useRef(null),
    [m, b] = O.useState(!1),
    [y, g] = O.useState({
      categoryId: (c == null ? void 0 : c.categoryId) || "",
      name: (c == null ? void 0 : c.name) || "",
      image: (c == null ? void 0 : c.image) || "",
      price: (c == null ? void 0 : c.price) || "",
      availability: (c == null ? void 0 : c.availability) || "",
      params: (c == null ? void 0 : c.params) || {
        Размер: "M",
        Цвет: "Красный",
      },
    }),
    [S, R] = O.useState(!1);
  O.useEffect(() => {
    if (c) {
      let U = c.params || { Размер: "M", Цвет: "Красный" };
      if (typeof U == "string")
        try {
          U = JSON.parse(U.replace(/\\"/g, '"'));
        } catch (F) {
          console.error("Ошибка парсинга параметров:", F),
            (U = { Размер: "M", Цвет: "Красный" });
        }
      g({
        categoryId: c.categoryId || "",
        name: c.name || "",
        image: c.image || "",
        price: c.price || "",
        availability: c.availability || "",
        params: U,
      });
    }
  }, [c]);
  const N = (U) => {
      const { name: F, value: re } = U.target;
      if (F === "params") {
        try {
          if (!re.trim()) {
            g((le) => ({ ...le, params: {} }));
            return;
          }
          let Z;
          try {
            Z = JSON.parse(re);
          } catch {
            Z = T(re);
          }
          v(Z), g((le) => ({ ...le, params: Z }));
        } catch (Z) {
          console.error("Ошибка обработки параметров:", Z),
            g((le) => ({ ...le, params: re }));
        }
        typeof parsedValue == "object" && parsedValue !== null
          ? (v(parsedValue), g((Z) => ({ ...Z, [F]: parsedValue })))
          : g((Z) => ({ ...Z, [F]: re }));
      }
    },
    T = (U) => {
      const F = U.split(
          `
`
        ).filter((Z) => Z.trim()),
        re = {};
      for (const Z of F) {
        const [le, ...De] = Z.split(":").map((Ze) => Ze.trim());
        if (le && De.length > 0) {
          const Ze = De.join(":").trim();
          re[le] = Ze.replace(/^["']|["']$/g, "");
        }
      }
      return re;
    },
    v = (U) => {
      if (typeof U != "object" || U === null || Array.isArray(U))
        throw new Error("Параметры должны быть в формате объекта");
      for (const [F, re] of Object.entries(U)) {
        if (typeof F != "string")
          throw new Error("Ключи параметров должны быть строками");
        if (typeof re != "string" && typeof re != "number")
          throw new Error(
            "Значения параметров должны быть строками или числами"
          );
      }
    },
    _ = async () => {
      try {
        if (!y.name.trim()) throw new Error("Название обязательно");
        const U =
          typeof y.params == "object" ? JSON.stringify(y.params) : y.params;
        if (
          (
            await Te.post(
              `/changeProduct/${c.id}`,
              { ...y, params: U, user: s },
              { headers: { "Content-Type": "application/json" } }
            )
          ).status !== 200
        )
          throw new Error("Ошибка при сохранении изменений");
        b(!1), r();
      } catch (U) {
        console.error("Ошибка сохранения:", U), alert(U.message);
      }
    },
    C = (U) => /^(https?:\/\/)/.test(U),
    M = (U) =>
      C(U) ? U : U ? `/uploads/categories/${U}.jpg` : "/uploads/no-photo.png",
    X = (U) => {
      U.target.src = "/uploads/no-photo.png";
    };
  O.useEffect(() => {
    const U = (re) => {
        re.preventDefault(), r();
      },
      F = h.current;
    return (
      F && F.addEventListener("cancel", U),
      () => {
        F && F.removeEventListener("cancel", U);
      }
    );
  }, [r]);
  const Q = (U) => {
      let F = U;
      if (typeof U == "string")
        try {
          F = JSON.parse(U);
        } catch (re) {
          return (
            console.error("Ошибка парсинга параметров:", re),
            d.jsx("div", {
              className: "text-red-500 text-sm",
              children:
                "Ошибка формата параметров. Используйте корректный JSON.",
            })
          );
        }
      return !F || typeof F != "object"
        ? null
        : Object.entries(F).map(([re, Z]) =>
            d.jsxs(
              "div",
              {
                className:
                  "flex justify-between items-center py-1 px-1.5 text-xs",
                children: [
                  d.jsx("span", {
                    className: "text-gray-400 truncate",
                    children: re,
                  }),
                  d.jsx("span", {
                    className:
                      "text-blue-300 ml-2 max-w-[60%] text-right truncate",
                    children:
                      typeof Z == "object" ? JSON.stringify(Z) : String(Z),
                  }),
                ],
              },
              re
            )
          );
    },
    J = (U) => {
      h.current && !h.current.contains(U.target) && r();
    },
    G = (U) => {
      U.key === "Escape" && r();
    };
  return (
    O.useEffect(
      () => (
        n
          ? ((document.body.style.overflow = "hidden"),
            document.addEventListener("mousedown", J),
            document.addEventListener("keydown", G))
          : ((document.body.style.overflow = "auto"),
            document.removeEventListener("mousedown", J),
            document.removeEventListener("keydown", G)),
        () => {
          (document.body.style.overflow = "auto"),
            document.removeEventListener("mousedown", J),
            document.removeEventListener("keydown", G);
        }
      ),
      [n]
    ),
    d.jsxs(d.Fragment, {
      children: [
        n && d.jsx("div", { className: "dialog-overlay", onClick: J }),
        d.jsxs("dialog", {
          ref: h,
          open: n,
          className:
            "dialog m-auto p-8 bg-krio-background text-white rounded-lg shadow-lg max-w-250 w-full transform transition-all duration-500 opacity-100",
          style: { backdropFilter: "blur(10px)" },
          "aria-labelledby": "dialog-title",
          "aria-hidden": !n,
          children: [
            d.jsx("button", {
              onClick: r,
              className:
                "absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500 transition-colors duration-300",
              "aria-label": "Закрыть",
              children: "×",
            }),
            c
              ? d.jsxs(d.Fragment, {
                  children: [
                    d.jsx("h4", {
                      id: "dialog-title",
                      className: "text-3xl font-semibold mb-6 text-center",
                      children: c.name,
                    }),
                    S
                      ? d.jsxs("div", {
                          className: "space-y-6",
                          children: [
                            d.jsx("h4", {
                              className: "text-2xl font-bold text-white mb-4",
                              children: "Редактирование товара",
                            }),
                            d.jsxs("div", {
                              className:
                                "grid grid-cols-1 md:grid-cols-2 gap-4",
                              children: [
                                d.jsxs("div", {
                                  className: "space-y-4",
                                  children: [
                                    d.jsxs("div", {
                                      children: [
                                        d.jsx("label", {
                                          className: "block text-gray-300 mb-2",
                                          children: "Название",
                                        }),
                                        d.jsx("input", {
                                          name: "name",
                                          value: y.name,
                                          onChange: N,
                                          className:
                                            "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                                        }),
                                      ],
                                    }),
                                    d.jsxs("div", {
                                      children: [
                                        d.jsx("label", {
                                          className: "block text-gray-300 mb-2",
                                          children: "ID Категории",
                                        }),
                                        d.jsx("input", {
                                          name: "categoryId",
                                          value: y.categoryId,
                                          onChange: N,
                                          className:
                                            "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                                        }),
                                      ],
                                    }),
                                    d.jsx("label", {
                                      className: "block text-gray-300 mb-2",
                                      children: "Список категорий",
                                    }),
                                    d.jsx("div", {
                                      className:
                                        "flex flex-col gap-1 overflow-scroll max-h-60",
                                      children: o.map((U, F) =>
                                        d.jsxs(
                                          "p",
                                          {
                                            className:
                                              "text-white bg-krio-foreground px-1.5 rounded",
                                            children: [F + 1, ". ", U.name],
                                          },
                                          U.name
                                        )
                                      ),
                                    }),
                                  ],
                                }),
                                d.jsxs("div", {
                                  className: "space-y-4",
                                  children: [
                                    d.jsxs("div", {
                                      children: [
                                        d.jsx("label", {
                                          className: "block text-gray-300 mb-2",
                                          children: "Цена",
                                        }),
                                        d.jsx("input", {
                                          name: "price",
                                          value: y.price,
                                          onChange: N,
                                          className:
                                            "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                                        }),
                                      ],
                                    }),
                                    d.jsxs("div", {
                                      children: [
                                        d.jsx("label", {
                                          className: "block text-gray-300 mb-2",
                                          children:
                                            "Изображение (URL или имя файла)",
                                        }),
                                        d.jsx("input", {
                                          name: "image",
                                          value: y.image,
                                          onChange: N,
                                          className:
                                            "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                                        }),
                                      ],
                                    }),
                                    d.jsxs("div", {
                                      children: [
                                        d.jsx("label", {
                                          className: "block text-gray-300 mb-2",
                                          children: "Наличие",
                                        }),
                                        d.jsx("input", {
                                          name: "availability",
                                          value: y.availability,
                                          onChange: N,
                                          className:
                                            "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                                        }),
                                      ],
                                    }),
                                    d.jsxs("div", {
                                      children: [
                                        d.jsx("label", {
                                          className: "block text-gray-300 mb-2",
                                          children: "Характеристики (JSON)",
                                        }),
                                        d.jsx("textarea", {
                                          name: "params",
                                          value:
                                            typeof y.params == "string"
                                              ? y.params
                                              : JSON.stringify(
                                                  y.params,
                                                  null,
                                                  2
                                                ),
                                          onChange: N,
                                          className:
                                            "w-full p-3 bg-krio-foreground border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            d.jsxs("div", {
                              className: "flex justify-end gap-4 mt-6",
                              children: [
                                d.jsx("button", {
                                  onClick: () => R(!1),
                                  className:
                                    "px-6 py-2 bg-krio-primary hover:bg-krio-foreground text-white rounded-lg transition-colors duration-300",
                                  children: "Отмена",
                                }),
                                d.jsx("button", {
                                  onClick: _,
                                  className:
                                    "px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300",
                                  children: "Сохранить изменения",
                                }),
                              ],
                            }),
                          ],
                        })
                      : d.jsx("div", {
                          className: "space-y-4",
                          children: d.jsxs("div", {
                            className: "flex flex-col md:flex-row gap-4",
                            children: [
                              d.jsx("div", {
                                className:
                                  "md:w-1/3 flex items-center justify-center",
                                children: d.jsx("img", {
                                  src: M(c.image),
                                  alt: c.name,
                                  className: "w-auto object-contain rounded-lg",
                                  onError: X,
                                }),
                              }),
                              d.jsxs("div", {
                                className:
                                  "md:w-2/3 space-y-3 overflow-y-auto pr-2",
                                children: [
                                  d.jsxs("div", {
                                    className: "space-y-3",
                                    children: [
                                      d.jsxs("div", {
                                        className:
                                          "bg-krio-foreground p-3 rounded-lg",
                                        children: [
                                          d.jsx("p", {
                                            className:
                                              "text-sm text-gray-400 mb-1",
                                            children: "Цена",
                                          }),
                                          d.jsxs("p", {
                                            className:
                                              "text-xl text-white font-mono",
                                            children: [c.price, " ₽"],
                                          }),
                                        ],
                                      }),
                                      d.jsxs("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                          d.jsxs("div", {
                                            className:
                                              "bg-krio-foreground p-2 rounded-lg",
                                            children: [
                                              d.jsx("p", {
                                                className:
                                                  "text-xs text-gray-400 mb-1",
                                                children: "Категория",
                                              }),
                                              d.jsx("p", {
                                                className:
                                                  "text-sm text-white truncate",
                                                children:
                                                  o && o[c.categoryId]
                                                    ? o[c.categoryId].name
                                                    : "Категория не указана",
                                              }),
                                            ],
                                          }),
                                          d.jsxs("div", {
                                            className:
                                              "bg-krio-foreground p-2 rounded-lg",
                                            children: [
                                              d.jsx("p", {
                                                className:
                                                  "text-xs text-gray-400 mb-1",
                                                children: "Наличие",
                                              }),
                                              d.jsx("p", {
                                                className: "text-sm text-white",
                                                children: c.availability,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  d.jsxs("div", {
                                    className:
                                      "bg-krio-foreground p-3 rounded-lg",
                                    children: [
                                      d.jsx("h4", {
                                        className:
                                          "text-sm font-semibold text-white mb-2 border-b border-gray-600 pb-1",
                                        children: "Характеристики",
                                      }),
                                      d.jsx("div", {
                                        className: "space-y-1.5",
                                        children: Q(c.params),
                                      }),
                                    ],
                                  }),
                                  (s == null ? void 0 : s.isAdmin) &&
                                    d.jsxs("button", {
                                      onClick: () => R(!0),
                                      className: `w-full py-2 bg-blue-600 hover:bg-blue-700 text-sm rounded-lg 
                   transition-all duration-300 flex items-center justify-center gap-1.5`,
                                      children: [
                                        d.jsx("svg", {
                                          className: "w-4 h-4",
                                          fill: "currentColor",
                                          viewBox: "0 0 20 20",
                                          children: d.jsx("path", {
                                            d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z",
                                          }),
                                        }),
                                        "Редактировать",
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          }),
                        }),
                  ],
                })
              : null,
          ],
        }),
      ],
    })
  );
}
class Wm {
  static async createOrder(r) {
    try {
      const c = await Te.post("/createOrder", r);
      if (c.status !== 200 && c.status !== 201)
        throw new Error(`Order creation failed with status: ${c.status}`);
      try {
        await this.clearBasket(r.userId);
      } catch (s) {
        console.error("Error clearing basket after order creation:", s);
      }
      return c.data;
    } catch (c) {
      throw (
        (console.error("Error creating order:", c),
        new Error(c instanceof Error ? c.message : "Failed to create order"))
      );
    }
  }
  static async clearBasket(r) {
    var c;
    try {
      const s = await Te.delete("/basket/clear", { data: { userId: r } });
      if (s.status !== 200)
        throw new Error(`Basket clearing failed with status: ${s.status}`);
      if (!s.data || s.data.error)
        throw new Error(
          ((c = s.data) == null ? void 0 : c.error) || "Failed to clear basket"
        );
    } catch (s) {
      throw (
        (console.error("Error clearing basket:", s),
        new Error(s instanceof Error ? s.message : "Failed to clear basket"))
      );
    }
  }
  static async getAllOrders() {
    try {
      return (await Te.get("/allOrders")).data;
    } catch (r) {
      throw (
        (console.error("Ошибка при получении заказов:", r),
        new Error(r instanceof Error ? r.message : "Failed to fetch orders"))
      );
    }
  }
}
function Ux({ items: n = [], onClose: r, onCheckout: c, onRemove: s }) {
  const o = n.some((b) => String(b.price).toLowerCase().includes("запросу")),
    h = n.reduce((b, y) => {
      const g = parseFloat(String(y.price).replace(/[^0-9.]/g, "")),
        S = y.quantity || 1;
      return isNaN(g) ? b : b + g * S;
    }, 0),
    m = o ? "По запросу" : `${h.toFixed(2)} ₽`;
  return d.jsxs("div", {
    className:
      "fixed bottom-4 right-4 bg-krio-background p-4 rounded-lg shadow-xl w-sm",
    children: [
      d.jsxs("div", {
        className: "flex justify-between items-center mb-4",
        children: [
          d.jsx("h3", {
            className: "text-xl font-semibold",
            children: "Корзина",
          }),
          d.jsx("button", {
            onClick: r,
            className: "text-gray-400 hover:text-white",
            children: "×",
          }),
        ],
      }),
      n.length === 0
        ? d.jsx("p", { className: "text-gray-400", children: "Корзина пуста" })
        : d.jsxs(d.Fragment, {
            children: [
              d.jsx("div", {
                className: "mb-4 max-h-64 overflow-y-auto",
                children: n.map((b) =>
                  d.jsxs(
                    "div",
                    {
                      className: "flex justify-between items-center mb-2",
                      children: [
                        d.jsxs("div", {
                          className: "flex flex-col max-w-[60%]",
                          children: [
                            d.jsx("span", {
                              className: "truncate",
                              children: b.name,
                            }),
                            d.jsxs("span", {
                              className: "text-xs text-gray-400",
                              children: ["Количество: ", b.quantity || 1],
                            }),
                          ],
                        }),
                        d.jsxs("div", {
                          className: "flex items-center gap-2",
                          children: [
                            d.jsx("span", {
                              className: "text-nowrap",
                              children: String(b.price)
                                .toLowerCase()
                                .includes("запросу")
                                ? "По запросу"
                                : b.price,
                            }),
                            d.jsx("button", {
                              onClick: () => s(b.id),
                              className: "text-red-500 hover:text-red-700",
                              children: "✕",
                            }),
                          ],
                        }),
                      ],
                    },
                    b.id
                  )
                ),
              }),
              d.jsxs("div", {
                className: "border-t pt-4",
                children: [
                  d.jsxs("div", {
                    className: "flex justify-between mb-4",
                    children: [
                      d.jsx("span", { children: "Итого:" }),
                      d.jsx("span", {
                        className: "font-semibold",
                        children: m,
                      }),
                    ],
                  }),
                  d.jsx("button", {
                    onClick: c,
                    className:
                      "w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg",
                    disabled: n.length === 0,
                    children: "Оформить заказ",
                  }),
                ],
              }),
            ],
          }),
    ],
  });
}
function tm({ user: n, category: r }) {
  const { categoryId: c } = u0(),
    [s, o] = O.useState("name"),
    [h, m] = O.useState("all"),
    [b, y] = O.useState(""),
    [g, S] = O.useState("all"),
    [R, N] = O.useState(!1),
    [T, v] = O.useState([]),
    [_, C] = O.useState(!1),
    M = {
      SET_PRODUCTS: "SET_PRODUCTS",
      SET_SORTED_PRODUCTS: "SET_SORTED_PRODUCTS",
      SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
      SET_SELECTED_PRODUCT: "SET_SELECTED_PRODUCT",
      SET_IS_OPEN: "SET_IS_OPEN",
      SET_LOADING: "SET_LOADING",
    },
    X = {
      products: [],
      sortedProducts: [],
      searchQuery: "",
      selectedProduct: null,
      isOpen: !1,
      loading: !1,
    },
    Q = (K, $) => {
      switch ($.type) {
        case M.SET_PRODUCTS:
          return { ...K, products: $.payload };
        case M.SET_SORTED_PRODUCTS:
          return { ...K, sortedProducts: $.payload };
        case M.SET_SEARCH_QUERY:
          return { ...K, searchQuery: $.payload };
        case M.SET_SELECTED_PRODUCT:
          return { ...K, selectedProduct: $.payload };
        case M.SET_IS_OPEN:
          return { ...K, isOpen: $.payload };
        case M.SET_LOADING:
          return { ...K, loading: $.payload };
      }
    },
    [J, G] = O.useReducer(Q, X),
    {
      products: U,
      sortedProducts: F,
      searchQuery: re,
      selectedProduct: Z,
      isOpen: le,
      loading: De,
    } = J;
  console.log(J),
    O.useEffect(() => {
      (async () => {
        if (!(n != null && n.id)) {
          alert("Для оформления необходимо авторизоваться");
          return;
        }
        C(!0);
        try {
          const pe = (
            await Te.get("/basket", { params: { userId: n.id } })
          ).data.map((de) => ({ ...de.product, quantity: de.quantity }));
          v(pe);
        } catch ($) {
          console.error("Ошибка загрузки корзины:", $),
            y("Не удалось загрузить корзину");
        } finally {
          C(!1);
        }
      })();
    }, [n]);
  const Ze = async (K) => {
      if (!(n != null && n.id)) {
        alert("Для добавления в корзину необходимо авторизоваться");
        return;
      }
      C(!0);
      try {
        await Te.post("/basket", { userId: n.id, productId: K.id }),
          v(($) =>
            $.find((de) => de.id === K.id)
              ? $.map((de) =>
                  de.id === K.id ? { ...de, quantity: de.quantity + 1 } : de
                )
              : [...$, { ...K, quantity: 1 }]
          );
      } catch ($) {
        console.error("Ошибка добавления в корзину:", $),
          y("Не удалось добавить товар в корзину");
      } finally {
        C(!1);
      }
    },
    Ke = async () => {
      try {
        const K = {
          userId: n.id,
          items: T.map(($) => ({ productId: $.id, quantity: $.quantity })),
          total: T.reduce(($, pe) => $ + pe.price * pe.quantity, 0),
        };
        await Wm.createOrder(K),
          v([]),
          N(!1),
          alert("Заказ принят! Менеджер свяжется для уточнения деталей.");
      } catch (K) {
        console.error("Ошибка оформления:", K), y("Не удалось оформить заказ");
      }
    },
    Ge = (K) => /^(https?:\/\/)/.test(K),
    _e = (K) =>
      Ge(K) ? K : K ? `/uploads/categories/${K}.jpg` : "/uploads/no-photo.png",
    Y = (K) => {
      K.target.src = "/uploads/no-photo.png";
    },
    ce = (K) => {
      o(K.target.value);
    },
    P = (K) => {
      m(K.target.value);
    },
    he = (K) => {
      S(K.target.value);
    },
    E = async (K) => {
      if (!(n != null && n.id)) {
        alert("Для удаления из корзины необходимо авторизоваться");
        return;
      }
      try {
        await Te.delete("/basket", { data: { userId: n.id, productId: K } }),
          v(($) => $.filter((pe) => pe.id !== K));
      } catch ($) {
        console.error("Ошибка удаления из корзины:", $);
      }
    },
    V = (K) =>
      Array.isArray(K)
        ? [...K].sort(($, pe) => {
            switch (s) {
              case "name":
                return $.name.localeCompare(pe.name);
              case "price":
                const de = parseFloat($.price) || 0,
                  nt = parseFloat(pe.price) || 0;
                return de - nt;
              case "availability":
                return $.availability === pe.availability
                  ? 0
                  : $.availability === "в наличии"
                  ? -1
                  : pe.availability === "в наличии"
                  ? 1
                  : $.availability.localeCompare(pe.availability);
              default:
                return 0;
            }
          })
        : [];
  O.useEffect(() => {
    (async () => {
      G({ type: M.SET_LOADING, payload: !0 });
      try {
        let $;
        c
          ? ($ = await Te.get(`/listProducts/${c}`))
          : ($ = await Te.get("/listProducts")),
          G({ type: M.SET_PRODUCTS, payload: $.data }),
          G({ type: M.SET_SORTED_PRODUCTS, payload: $.data });
      } catch ($) {
        console.error("Ошибка при загрузке товаров:", $),
          y("Ошибка загрузки товаров");
      } finally {
        G({ type: M.SET_LOADING, payload: !1 });
      }
    })();
  }, [c]),
    O.useEffect(() => {
      const K = U.filter((pe) => {
          const de = pe.name.toLowerCase().includes(re.toLowerCase()),
            nt = h === "all" || pe.availability === h,
            Yl = g === "all" || (parseFloat(pe.price) || 0) === parseFloat(g);
          return de && nt && Yl;
        }),
        $ = V(K);
      G({ type: M.SET_SORTED_PRODUCTS, payload: $ });
    }, [U, re, h, g, s]);
  const ue = (K) => {
      G({ type: M.SET_SELECTED_PRODUCT, payload: K }),
        G({ type: M.SET_IS_OPEN, payload: !0 });
    },
    ne = () => {
      G({ type: M.SET_SELECTED_PRODUCT, payload: null }),
        G({ type: M.SET_IS_OPEN, payload: !1 });
    },
    W = ["all", ...new Set(U.map((K) => K.availability))],
    ge = ["all", ...Array.from(new Set(U.map((K) => K.price.toString())))],
    oe = async (K) => {
      var $, pe;
      try {
        if (!window.confirm("Вы уверены, что хотите удалить этот товар?"))
          return;
        const de = n.id;
        await Te.delete(`/deleteProduct/${K}/${de}`, {
          headers: { Authorization: `Bearer ${n.token}` },
        });
        const nt = await Te.get(c ? `/listProducts/${c}` : "/listProducts");
        G({ type: M.SET_PRODUCTS, payload: nt.data });
      } catch (de) {
        console.error("Ошибка удаления:", de),
          y(
            ((pe = ($ = de.response) == null ? void 0 : $.data) == null
              ? void 0
              : pe.message) || "Недостаточно прав"
          );
      }
    };
  return d.jsxs("div", {
    className:
      "flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8",
    children: [
      d.jsxs("main", {
        className: "w-full max-w-[1280px] p-6 flex",
        children: [
          d.jsxs("aside", {
            className:
              "h-96 w-1/4 mt-16 p-6 bg-krio-background rounded-lg mr-6",
            children: [
              d.jsx("h3", {
                className: "text-2xl font-semibold text-gray-300 mb-4",
                children: "Фильтры",
              }),
              d.jsxs("div", {
                className: "mb-4",
                children: [
                  d.jsx("h4", {
                    className: "text-xl font-semibold text-gray-300",
                    children: "Наличие",
                  }),
                  d.jsx("select", {
                    value: h,
                    onChange: P,
                    className:
                      "w-full p-3 bg-krio-foreground text-white rounded-lg mb-4",
                    children: W.map((K, $) =>
                      d.jsx(
                        "option",
                        { value: K, children: K === "all" ? "Все товары" : K },
                        $
                      )
                    ),
                  }),
                  d.jsx("h4", {
                    className: "text-xl font-semibold text-gray-300",
                    children: "Цена",
                  }),
                  d.jsx("select", {
                    value: g,
                    onChange: he,
                    className:
                      "w-full p-3 bg-krio-foreground text-white rounded-lg",
                    children: ge.map((K, $) =>
                      d.jsx(
                        "option",
                        {
                          value: K,
                          children: K === "all" ? "Все цены" : `${K} ₽`,
                        },
                        $
                      )
                    ),
                  }),
                ],
              }),
            ],
          }),
          d.jsxs("section", {
            className: "w-3/4",
            children: [
              d.jsx("h2", {
                className: "text-3xl font-bold text-center text-gray-300 mb-8",
                children: "Товары в категории",
              }),
              d.jsx("div", {
                className: "mb-8",
                children: d.jsx("input", {
                  type: "text",
                  placeholder: "Поиск по названию...",
                  value: re,
                  onChange: (K) =>
                    G({ type: M.SET_SEARCH_QUERY, payload: K.target.value }),
                  className:
                    "w-full p-3 bg-krio-background text-white rounded-lg",
                }),
              }),
              d.jsx("div", {
                className: "mb-8",
                children: d.jsxs("select", {
                  value: s,
                  onChange: ce,
                  className:
                    "w-full p-3 bg-krio-background text-white rounded-lg",
                  children: [
                    d.jsx("option", { value: "name", children: "По имени" }),
                    d.jsx("option", { value: "price", children: "По цене" }),
                    d.jsx("option", {
                      value: "availability",
                      children: "По количеству",
                    }),
                  ],
                }),
              }),
              De
                ? d.jsx("div", {
                    className: "text-center text-gray-300",
                    children: "Загрузка...",
                  })
                : (F == null ? void 0 : F.length) > 0
                ? d.jsx("div", {
                    className:
                      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
                    children:
                      F == null
                        ? void 0
                        : F.map((K) =>
                            d.jsxs(
                              "div",
                              {
                                className:
                                  "bg-krio-background p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative",
                                onClick: () => ue(K),
                                children: [
                                  (n == null ? void 0 : n.isAdmin) &&
                                    d.jsx("button", {
                                      onClick: () => oe(K.id),
                                      className:
                                        "absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 transition-colors",
                                      title: "Удалить товар",
                                      children: d.jsx("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "h-6 w-6",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: d.jsx("path", {
                                          strokeLinecap: "round",
                                          strokeLinejoin: "round",
                                          strokeWidth: 2,
                                          d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
                                        }),
                                      }),
                                    }),
                                  !(n != null && n.isAdmin) &&
                                    d.jsx("button", {
                                      onClick: ($) => {
                                        $.stopPropagation(), Ze(K);
                                      },
                                      className:
                                        "absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full hover:bg-blue-700",
                                      title: "Добавить в корзину",
                                      children: d.jsx("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "h-6 w-6",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: d.jsx("path", {
                                          strokeLinecap: "round",
                                          strokeLinejoin: "round",
                                          strokeWidth: 2,
                                          d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
                                        }),
                                      }),
                                    }),
                                  d.jsx("img", {
                                    src: _e(K.image),
                                    alt: K.name,
                                    className:
                                      "w-64 h-64 object-cover rounded-lg mb-4 mx-auto",
                                    onError: Y,
                                  }),
                                  d.jsx("p", {
                                    className:
                                      "text-center text-xl font-semibold",
                                    children: K.name,
                                  }),
                                ],
                              },
                              K.id
                            )
                          ),
                  })
                : d.jsx("p", {
                    className: "text-center text-xl text-gray-300",
                    children: "Товары не найдены",
                  }),
            ],
          }),
          b &&
            d.jsx("div", {
              className:
                "fixed bottom-4 right-4 p-4 bg-red-800 text-red-100 rounded-lg",
              children: b,
            }),
        ],
      }),
      !(n != null && n.isAdmin) &&
        d.jsx("div", {
          className: "fixed bottom-4 right-4",
          children: d.jsxs("button", {
            onClick: () => N(!R),
            className:
              "p-4 bg-blue-600 rounded-full hover:bg-blue-700 relative",
            children: [
              d.jsx("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: d.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
                }),
              }),
              T.length > 0 &&
                d.jsx("span", {
                  className:
                    "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs",
                  children: T.length,
                }),
            ],
          }),
        }),
      R &&
        !(n != null && n.isAdmin) &&
        d.jsx(Ux, {
          items: T,
          onClose: () => N(!1),
          onCheckout: Ke,
          onRemove: E,
        }),
      d.jsx(Mx, { user: n, isOpen: le, onClose: ne, product: Z, category: r }),
    ],
  });
}
function Hx({ order: n }) {
  return d.jsxs("div", {
    className:
      "bg-krio-background shadow-lg rounded-lg p-6 mb-6 w-full max-w-xl border border-gray-700",
    children: [
      d.jsxs("div", {
        className: "mb-4 border-b border-gray-700 pb-2",
        children: [
          d.jsx("h3", {
            className: "text-xl font-semibold text-gray-200",
            children: n.user.name,
          }),
          d.jsx("p", { className: "text-gray-400", children: n.user.email }),
        ],
      }),
      d.jsx("div", {
        className: "space-y-3",
        children: n.items.map((r, c) =>
          d.jsxs(
            "div",
            {
              className: "flex justify-between border-b border-gray-700 pb-2",
              children: [
                d.jsxs("div", {
                  children: [
                    d.jsx("p", {
                      className: "text-lg font-medium text-gray-300",
                      children: r.productName,
                    }),
                    d.jsxs("p", {
                      className: "text-gray-400",
                      children: ["Количество: ", r.quantity],
                    }),
                  ],
                }),
                d.jsxs("p", {
                  className: "text-lg font-semibold text-gray-200",
                  children: [r.price, " ₽"],
                }),
              ],
            },
            c
          )
        ),
      }),
    ],
  });
}
function Bx({ user: n }) {
  const [r, c] = O.useState([]),
    [s, o] = O.useState(""),
    [h, m] = O.useState(!0),
    [b, y] = O.useState([]);
  O.useEffect(() => {
    (async () => {
      if (n != null && n.id)
        try {
          const _ = (
            await Te.get("/basket", { params: { userId: n.id } })
          ).data.map((C) => ({ ...C.product, quantity: C.quantity }));
          c(_);
        } catch (v) {
          console.error("Ошибка загрузки корзины:", v),
            o("Не удалось загрузить корзину");
        } finally {
          m(!1);
        }
    })();
  }, [n]);
  const g = async (T) => {
      try {
        await Te.delete("/basket", { data: { userId: n.id, productId: T } }),
          c((v) => v.filter((_) => _.id !== T));
      } catch (v) {
        console.error("Ошибка удаления:", v), o("Не удалось удалить товар");
      }
    },
    S = async () => {
      try {
        const T = {
          userId: n.id,
          items: r.map((_) => ({ productId: _.id, quantity: _.quantity })),
          total: r.reduce((_, C) => _ + C.price * C.quantity, 0),
        };
        (await Wm.createOrder(T)) &&
          (await Te.delete("/basket/clear", { data: { userId: n.id } }),
          c([]),
          alert(
            "Заказ успешно создан! Менеджер свяжется с вами для уточнения деталей."
          ));
      } catch (T) {
        console.error("Ошибка оформления:", T), o("Не удалось оформить заказ");
      }
    },
    R = r.some((T) => isNaN(parseFloat(T.price))),
    N = r.reduce(
      (T, v) =>
        isNaN(v.price) || isNaN(v.quantity) ? T : T + v.price * v.quantity,
      0
    );
  return (
    O.useEffect(() => {
      (async () => {
        try {
          const v = await Te.get("/allOrders");
          y(v.data);
        } catch (v) {
          console.error("Ошибка загрузки заказов:", v);
        }
      })();
    }, []),
    R || `${isNaN(N) ? 0 : N.toFixed(2)}`,
    h
      ? d.jsx("div", {
          className: "text-center p-8",
          children: "Загрузка корзины...",
        })
      : s
      ? d.jsx("div", { className: "text-red-500 p-8", children: s })
      : d.jsx("div", {
          className:
            "flex text-black justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8",
          children: n.isAdmin
            ? d.jsx("div", {
                className:
                  "bg-krio-background shadow-lg rounded-lg p-6 mb-6 w-full max-w-xl border border-gray-700",
                children: b.map((T) =>
                  d.jsx(
                    "div",
                    {
                      className: "flex text-center justify-center",
                      children: d.jsx(Hx, { order: T }),
                    },
                    T.id
                  )
                ),
              })
            : d.jsx("div", {
                className: "min-h-screen p-8",
                children: d.jsxs("div", {
                  className:
                    "max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6",
                  children: [
                    d.jsx("h1", {
                      className: "text-3xl font-bold mb-6",
                      children: "Ваша корзина",
                    }),
                    r.length === 0
                      ? d.jsx("div", {
                          className: "text-center text-gray-500 py-12",
                          children: "Ваша корзина пуста",
                        })
                      : d.jsxs(d.Fragment, {
                          children: [
                            d.jsx("div", {
                              className: "space-y-4 mb-8",
                              children: r.map((T) =>
                                d.jsxs(
                                  "div",
                                  {
                                    className:
                                      "flex items-center justify-between border-b pb-4",
                                    children: [
                                      d.jsxs("div", {
                                        className:
                                          "flex items-center space-x-4",
                                        children: [
                                          d.jsx("img", {
                                            src:
                                              T.img || "/uploads/no-photo.png",
                                            alt: T.name,
                                            className:
                                              "w-20 h-20 object-cover rounded",
                                          }),
                                          d.jsxs("div", {
                                            children: [
                                              d.jsx("h3", {
                                                className:
                                                  "text-lg font-semibold",
                                                children: T.name,
                                              }),
                                              d.jsxs("p", {
                                                className: "text-gray-600",
                                                children: [
                                                  "Количество: ",
                                                  T.quantity,
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      d.jsxs("div", {
                                        className:
                                          "flex items-center space-x-4",
                                        children: [
                                          d.jsx("p", {
                                            className: "text-lg font-semibold",
                                            children: isNaN(parseFloat(T.price))
                                              ? "По запросу"
                                              : `${T.price} ₽`,
                                          }),
                                          d.jsx("button", {
                                            onClick: () => g(T.id),
                                            className:
                                              "text-red-500 hover:text-red-700",
                                            children: "Удалить",
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  T.id
                                )
                              ),
                            }),
                            d.jsxs("div", {
                              className: "border-t pt-6",
                              children: [
                                d.jsxs("div", {
                                  className:
                                    "flex justify-between items-center mb-6",
                                  children: [
                                    d.jsx("span", {
                                      className: "text-xl font-bold",
                                      children: "Итого:",
                                    }),
                                    d.jsx("span", {
                                      className: "text-xl font-bold",
                                      children: "По запросу",
                                    }),
                                  ],
                                }),
                                d.jsx("button", {
                                  onClick: S,
                                  className:
                                    "w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg",
                                  children: "Перейти к оформлению",
                                }),
                              ],
                            }),
                          ],
                        }),
                  ],
                }),
              }),
        })
  );
}
function Lx() {
  const [n, r] = O.useState([]),
    [c, s] = O.useState(!0),
    [o, h] = O.useState(null),
    [m, b] = O.useState("desc"),
    [y, g] = O.useState("all"),
    [S, R] = O.useState("");
  O.useEffect(() => {
    (async () => {
      try {
        const _ = await Te.get("/feedback");
        _.status === 200 && r(_.data), s(!1);
      } catch (_) {
        h("Ошибка при загрузке сообщений обратной связи", _), s(!1);
      }
    })();
  }, []);
  const N = async (v) => {
      if (window.confirm("Вы уверены, что хотите удалить это сообщение?"))
        try {
          await Te.delete(`/feedback/${v}`),
            r((_) => _.filter((C) => C.id !== v));
        } catch (_) {
          h("Ошибка при удалении сообщения", _);
        }
    },
    T = O.useMemo(
      () =>
        n
          .filter((v) => (y === "all" ? !0 : v.status === y))
          .filter(
            (v) =>
              v.name.toLowerCase().includes(S.toLowerCase()) ||
              v.email.toLowerCase().includes(S.toLowerCase()) ||
              v.message.toLowerCase().includes(S.toLowerCase())
          )
          .sort((v, _) => {
            const C = new Date(v.createdAt),
              M = new Date(_.createdAt);
            return m === "desc" ? M - C : C - M;
          }),
      [n, m, y, S]
    );
  return c
    ? d.jsx("div", { className: "text-center p-8", children: "Загрузка..." })
    : o
    ? d.jsx("div", { className: "text-red-500 p-8", children: o })
    : d.jsx("div", {
        className:
          "flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8",
        children: d.jsxs("div", {
          className: "max-w-6xl mx-auto",
          children: [
            d.jsx("h1", {
              className: "text-3xl font-bold mb-8",
              children: "Панель администратора",
            }),
            d.jsxs("div", {
              className: "mb-6 flex flex-wrap gap-4",
              children: [
                d.jsx("input", {
                  type: "text",
                  placeholder: "Поиск по сообщениям...",
                  className:
                    "bg-krio-background text-white px-4 py-2 rounded-lg flex-1",
                  value: S,
                  onChange: (v) => R(v.target.value),
                }),
                d.jsxs("select", {
                  className:
                    "bg-krio-background text-white px-4 py-2 rounded-lg",
                  value: m,
                  onChange: (v) => b(v.target.value),
                  children: [
                    d.jsx("option", {
                      value: "desc",
                      children: "Сначала новые",
                    }),
                    d.jsx("option", {
                      value: "asc",
                      children: "Сначала старые",
                    }),
                  ],
                }),
                d.jsxs("select", {
                  className:
                    "bg-krio-background text-white px-4 py-2 rounded-lg",
                  value: y,
                  onChange: (v) => g(v.target.value),
                  children: [
                    d.jsx("option", {
                      value: "all",
                      children: "Все сообщения",
                    }),
                    d.jsx("option", { value: "new", children: "Новые" }),
                    d.jsx("option", {
                      value: "processed",
                      children: "Обработанные",
                    }),
                  ],
                }),
              ],
            }),
            d.jsxs("section", {
              className: "bg-krio-background rounded-lg p-6",
              children: [
                d.jsx("h2", {
                  className: "text-2xl font-semibold mb-6",
                  children: "Сообщения обратной связи",
                }),
                T.length === 0
                  ? d.jsx("p", {
                      className: "text-gray-400",
                      children: "Нет сообщений",
                    })
                  : d.jsx("div", {
                      className: "space-y-6",
                      children: T.map((v) =>
                        d.jsxs(
                          "div",
                          {
                            className:
                              "bg-krio-foreground rounded-lg p-4 hover:bg-krio-primary transition-colors relative group",
                            children: [
                              d.jsx("button", {
                                onClick: () => N(v.id),
                                className:
                                  "absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",
                                children: "Удалить",
                              }),
                              d.jsxs("div", {
                                className:
                                  "flex justify-between items-start mb-2",
                                children: [
                                  d.jsx("h3", {
                                    className: "font-semibold text-lg",
                                    children: v.name,
                                  }),
                                  d.jsx("span", {
                                    className: "text-sm text-gray-400",
                                    children: new Date(
                                      v.createdAt
                                    ).toLocaleString(),
                                  }),
                                ],
                              }),
                              d.jsxs("div", {
                                className: "text-gray-300 mb-2",
                                children: [
                                  d.jsxs("p", {
                                    children: [
                                      d.jsx("span", {
                                        className: "text-gray-400",
                                        children: "Email:",
                                      }),
                                      " ",
                                      v.email,
                                    ],
                                  }),
                                  v.phone &&
                                    d.jsxs("p", {
                                      children: [
                                        d.jsx("span", {
                                          className: "text-gray-400",
                                          children: "Телефон:",
                                        }),
                                        " ",
                                        v.phone,
                                      ],
                                    }),
                                ],
                              }),
                              d.jsx("p", {
                                className: "text-gray-200",
                                children: v.message,
                              }),
                            ],
                          },
                          v.id
                        )
                      ),
                    }),
              ],
            }),
          ],
        }),
      });
}
function qx() {
  const [n, r] = O.useState(null),
    [c, s] = O.useState(!0),
    o = Yr(),
    [h, m] = O.useState([]),
    [b, y] = O.useState("");
  if (
    (O.useEffect(() => {
      Te("/tokens/refresh")
        .then((N) => {
          r(N.data.user), si(N.data.accessToken);
        })
        .catch(() => {
          r(null), si(""), o("/login");
        })
        .finally(() => {
          s(!1);
        });
    }, []),
    O.useEffect(() => {
      (async () => {
        try {
          const T = await Te.get("/listCategories");
          m(T.data);
        } catch (T) {
          console.error("Ошибка при загрузке категорий:", T),
            y("Не удалось загрузить категории");
        }
      })();
    }, []),
    c)
  )
    return d.jsx("p", { children: "Загрузка пользователя..." });
  const g = async (N) => {
      N.preventDefault();
      const T = new FormData(N.target),
        v = Object.fromEntries(T);
      try {
        const _ = await Te.post("/auth/signup", v);
        _ && _.status === 200
          ? (r(_.data.user), si(_.data.accessToken))
          : console.error("Ошибка при регистрации:", _);
      } catch (_) {
        console.error("Ошибка при запросе:", _);
      }
    },
    S = async (N) => {
      N.preventDefault();
      const T = new FormData(N.target),
        v = Object.fromEntries(T),
        _ = await Te.post("/auth/login", v);
      _.status === 200 && (r(_.data.user), si(_.data.accessToken));
    },
    R = async () => {
      (await Te.post("/auth/logout")).status === 200 &&
        (r(null), si(""), o("/login"));
    };
  return d.jsx(w0, {
    children: d.jsxs(Ut, {
      element: d.jsx($b, { user: n, handleLogout: R }),
      children: [
        d.jsx(Ut, { path: "/", element: d.jsx(Ax, { user: n, category: h }) }),
        d.jsx(Ut, { path: "/contacts", element: d.jsx(Cx, { user: n }) }),
        d.jsx(Ut, { path: "/about", element: d.jsx(zx, {}) }),
        d.jsx(Ut, { path: "/selector", element: d.jsx(_x, {}) }),
        d.jsx(Ut, { path: "/basket", element: d.jsx(Bx, { user: n }) }),
        d.jsx(Ut, {
          path: "/login",
          element: d.jsx(Dx, { handleLogin: S, handleSignUp: g }),
        }),
        (n == null ? void 0 : n.isAdmin) &&
          d.jsx(Ut, { path: "/admin", element: d.jsx(Lx, {}) }),
        d.jsx(Ut, {
          path: "/category/:categoryId",
          element: d.jsx(tm, { user: n, category: h }),
        }),
        d.jsx(Ut, {
          path: "/category",
          element: d.jsx(tm, { user: n, category: h }),
        }),
        d.jsx(Ut, { path: "*", element: d.jsx(jx, { user: n }) }),
      ],
    }),
  });
}
Oy.createRoot(document.getElementById("root")).render(
  d.jsx(O.StrictMode, { children: d.jsx(K0, { children: d.jsx(qx, {}) }) })
);
