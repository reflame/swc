export function createSelectorHook(e){return(o,r)=>{const t=useMemo(()=>{var t;return o&&r?(t=function(e,o){const r=proxyMemoize(o=>e(...o),void 0);return(...e)=>r(e)}(o),o=>t(e(o))):void 0},r)||(o?r=>o(e(r)):e);return useSelector(t)}}
