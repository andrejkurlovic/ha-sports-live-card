/*! For license information please see sports-live-card.bundle.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),i=new WeakMap;class s{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const a=this.t;if(t&&void 0===e){const t=void 0!==a&&1===a.length;t&&(e=i.get(a)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(a,e))}return e}toString(){return this.cssText}}const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,a,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[i+1]),e[0]);return new s(i,e,a)},o=(a,i)=>{if(t)a.adoptedStyleSheets=i.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const t of i){const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=t.cssText,a.appendChild(i)}},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",v=u.reactiveElementPolyfillSupport,b=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},x=(e,t)=>!l(e,t),y={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class w extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,a){const{get:i,set:s}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return i?.call(this)},set(t){const n=i?.call(this);s.call(this,t),this.requestUpdate(e,n,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const a of t)this.createProperty(a,e[a])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const a=this._$Eu(e,t);void 0!==a&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const e of a)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return o(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$EC(e,t){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(void 0!==i&&!0===a.reflect){const s=(void 0!==a.converter?.toAttribute?a.converter:_).toAttribute(t,a.type);this._$Em=e,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){const a=this.constructor,i=a._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=a.getPropertyOptions(i),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=i,this[i]=s.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,a){if(void 0!==e){if(a??=this.constructor.getPropertyOptions(e),!(a.hasChanged??x)(this[e],t))return;this.P(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,a){this._$AL.has(e)||this._$AL.set(e,t),!0===a.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,a]of e)!0!==a.wrapped||this._$AL.has(t)||void 0===this[t]||this.P(t,this[t],a)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach((e=>this._$EC(e,this[e]))),this._$EU()}updated(e){}firstUpdated(e){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,v?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.0.4");const $=globalThis,k=$.trustedTypes,C=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,z="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,A=`<${E}>`,T=document,P=()=>T.createComment(""),L=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,N="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,O=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,F=/"/g,B=/^(?:script|style|textarea|title)$/i,R=e=>(t,...a)=>({_$litType$:e,strings:t,values:a}),U=R(1),I=R(2),G=(R(3),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),W=new WeakMap,K=T.createTreeWalker(T,129);function Z(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}class J{constructor({strings:e,_$litType$:t},a){let i;this.parts=[];let s=0,n=0;const o=e.length-1,r=this.parts,[l,c]=((e,t)=>{const a=e.length-1,i=[];let s,n=2===t?"<svg>":3===t?"<math>":"",o=j;for(let t=0;t<a;t++){const a=e[t];let r,l,c=-1,d=0;for(;d<a.length&&(o.lastIndex=d,l=o.exec(a),null!==l);)d=o.lastIndex,o===j?"!--"===l[1]?o=D:void 0!==l[1]?o=H:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=O):void 0!==l[3]&&(o=O):o===O?">"===l[0]?(o=s??j,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?O:'"'===l[3]?F:V):o===F||o===V?o=O:o===D||o===H?o=j:(o=O,s=void 0);const p=o===O&&e[t+1].startsWith("/>")?" ":"";n+=o===j?a+A:c>=0?(i.push(r),a.slice(0,c)+z+a.slice(c)+S+p):a+S+(-2===c?t:p)}return[Z(e,n+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]})(e,t);if(this.el=J.createElement(l,a),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=K.nextNode())&&r.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(z)){const t=c[n++],a=i.getAttribute(e).split(S),o=/([.?@])?(.*)/.exec(t);r.push({type:1,index:s,name:o[2],strings:a,ctor:"."===o[1]?te:"?"===o[1]?ae:"@"===o[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(S)&&(r.push({type:6,index:s}),i.removeAttribute(e));if(B.test(i.tagName)){const e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=k?k.emptyScript:"";for(let a=0;a<t;a++)i.append(e[a],P()),K.nextNode(),r.push({type:2,index:++s});i.append(e[t],P())}}}else if(8===i.nodeType)if(i.data===E)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf(S,e+1));)r.push({type:7,index:s}),e+=S.length-1}s++}}static createElement(e,t){const a=T.createElement("template");return a.innerHTML=e,a}}function X(e,t,a=e,i){if(t===G)return t;let s=void 0!==i?a.o?.[i]:a.l;const n=L(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,a,i)),void 0!==i?(a.o??=[])[i]=s:a.l=s),void 0!==s&&(t=X(e,s._$AS(e,t.values),s,i)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,i=(e?.creationScope??T).importNode(t,!0);K.currentNode=i;let s=K.nextNode(),n=0,o=0,r=a[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new Q(s,s.nextSibling,this,e):1===r.type?t=new r.ctor(s,r.name,r.strings,this,e):6===r.type&&(t=new se(s,this,e)),this._$AV.push(t),r=a[++o]}n!==r?.index&&(s=K.nextNode(),n++)}return K.currentNode=T,i}p(e){let t=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this.v}constructor(e,t,a,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=i,this.v=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),L(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==G&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,i="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=J.createElement(Z(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Y(i,this),a=e.u(this.options);e.p(t),this.T(a),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new J(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,i=0;for(const s of e)i===t.length?t.push(a=new Q(this.O(P()),this.O(P()),this,this.options)):a=t[i],a._$AI(s),i++;i<t.length&&(this._$AR(a&&a._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this.v=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,i,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=q}_$AI(e,t=this,a,i){const s=this.strings;let n=!1;if(void 0===s)e=X(this,e,t,0),n=!L(e)||e!==this._$AH&&e!==G,n&&(this._$AH=e);else{const i=e;let o,r;for(e=s[0],o=0;o<s.length-1;o++)r=X(this,i[a+o],t,o),r===G&&(r=this._$AH[o]),n||=!L(r)||r!==this._$AH[o],r===q?e=q:e!==q&&(e+=(r??"")+s[o+1]),this._$AH[o]=r}n&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ae extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ie extends ee{constructor(e,t,a,i,s){super(e,t,a,i,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??q)===G)return;const a=this._$AH,i=e===q&&a!==q||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,s=e!==q&&(a===q||i);i&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ne=$.litHtmlPolyfillSupport;ne?.(J,Q),($.litHtmlVersions??=[]).push("3.2.0");class oe extends w{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.o=((e,t,a)=>{const i=a?.renderBefore??t;let s=i._$litPart$;if(void 0===s){const e=a?.renderBefore??null;i._$litPart$=s=new Q(t.insertBefore(P(),e),e,void 0,a??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.o?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.o?.setConnected(!1)}render(){return G}}oe._$litElement$=!0,oe.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:oe});const re=globalThis.litElementPolyfillSupport;re?.({LitElement:oe}),(globalThis.litElementVersions??=[]).push("4.1.0");const le={en:{"card.bracket":"Bracket","card.lineup":"Lineups","card.timeline":"Timeline","card.news":"News","card.standings":"Standings","round.final":"Final","round.semifinals":"Semifinals","round.quarterfinals":"Quarterfinals","round.r16":"Round of 16","round.r32":"Round of 32","round.knockout_playoffs":"Knockout Playoffs","round.preliminary":"Preliminary Round","round.short.semifinals":"Semis","round.short.quarterfinals":"Quarters","round.short.r16":"R16","bracket.empty.title":"Bracket not available","bracket.empty.sub":"Knockout stage starts soon","bracket.tbd":"TBD","bracket.tied_agg":"Tied agg.","bracket.agg":"Agg.","status.live":"Live","status.finished":"Finished","status.scheduled":"Scheduled","status.full_time":"Full Time","status.halftime":"Halftime","status.first_half":"1st Half","status.second_half":"2nd Half","status.kickoff":"Kickoff","status.end":"End","event.goal":"Goal","event.yellow_card":"Yellow Card","event.red_card":"Red Card","event.substitution":"Substitution","event.var":"VAR","event.header":"Header","event.shot":"Shot","event.penalty":"Penalty","event.free_kick":"Free kick","event.try":"Try","event.conversion":"Conversion","event.penalty_goal":"Penalty Goal","event.drop_goal":"Drop Goal","form.W":"W","form.D":"D","form.L":"L","team.details":"Details","team.possession":"Possession","team.shots":"Shots","team.on_target":"On target","team.fouls":"Fouls","team.win_prob":"Win Prob","team.timeouts":"Timeouts","team.spectators":"spectators","team.top_scorer":"Top scorer","team.next_match":"Next match","team.in":"In","team.no_match":"No match available","team.unknown_entity":"Unknown entity","time.today":"Today","time.yesterday":"Yesterday","time.tomorrow":"Tomorrow","time.now":"now","time.in_n_min":"in {n} min","time.in_n_h":"in {n} h","time.in_n_d":"in {n} d","time.n_min_ago":"{n} min ago","time.n_h_ago":"{n} h ago","time.n_d_ago":"{n} d ago","lineup.bench":"Bench","lineup.empty.title":"Lineups not available","lineup.empty.sub":"Lineups are published shortly before kick-off","timeline.empty.title":"No events yet","timeline.empty.sub":"Events appear during the match","timeline.event":"Event","timeline.penalty":"Penalty","news.empty":"No news available","news.articles":"{n} articles","zone.champions":"Champions","zone.europa":"Europa","zone.relegation":"Relegation","zone.conference":"Conference League","zone.qualified":"Qualified","zone.third_place_playoff":"Best 3rd","zone.eliminated":"Eliminated","hero.groups":"groups","hero.teams":"teams","hero.not_started":"Not started","phase.regular_season":"Regular season","phase.group_stage":"Group stage","phase.playoffs":"Playoffs","col.pos":"#","col.team":"Team","col.played":"P","col.wins":"W","col.draws":"D","col.losses":"L","col.gd":"+/-","col.points":"Pts","col.gf":"GF","col.ga":"GA","col.pct":"PCT","col.gb":"GB","col.streak":"Strk","col.otl":"OTL","standings.empty.title":"No standings yet","standings.empty.sub":"Standings appear once the season is under way.","team.form":"Form","team.last5":"Last 5","generic.no_match":"No match available","generic.matches_count":"{n} matches","generic.unknown_entity":"Unknown entity","generic.close":"Close","generic.unknown":"Unknown","popup.match_details":"Match details","popup.lineups":"Lineups","popup.scoring_plays":"Scoring Plays","popup.stat_leaders":"Stat Leaders","popup.timeline":"Timeline","popup.h2h":"Head-to-head","popup.no_events":"No events available","month.1":"Jan","month.2":"Feb","month.3":"Mar","month.4":"Apr","month.5":"May","month.6":"Jun","month.7":"Jul","month.8":"Aug","month.9":"Sep","month.10":"Oct","month.11":"Nov","month.12":"Dec"},nl:{"card.bracket":"Schema","card.lineup":"Opstellingen","card.timeline":"Tijdlijn","card.news":"Nieuws","card.standings":"Stand","round.final":"Finale","round.semifinals":"Halve finales","round.quarterfinals":"Kwartfinales","round.r16":"Achtste finales","round.r32":"Zestiende finales","round.knockout_playoffs":"Knock-out play-offs","round.preliminary":"Voorronde","round.short.semifinals":"Halve finales","round.short.quarterfinals":"Kwart","round.short.r16":"8e finale","bracket.empty.title":"Schema niet beschikbaar","bracket.empty.sub":"De knock-outfase begint binnenkort","bracket.tbd":"N.t.b.","bracket.tied_agg":"Gelijk totaal","bracket.agg":"Totaal","status.live":"Live","status.finished":"Afgelopen","status.scheduled":"Gepland","status.full_time":"Einde wedstrijd","status.halftime":"Rust","status.first_half":"1e helft","status.second_half":"2e helft","status.kickoff":"Aftrap","status.end":"Einde","event.goal":"Doelpunt","event.yellow_card":"Gele kaart","event.red_card":"Rode kaart","event.substitution":"Wissel","event.var":"VAR","event.header":"Kopbal","event.shot":"Schot","event.penalty":"Penalty","event.free_kick":"Vrije trap","event.try":"Try","event.conversion":"Conversie","event.penalty_goal":"Strafschop Goal","event.drop_goal":"Dropgoal","form.W":"W","form.D":"G","form.L":"V","team.details":"Details","team.possession":"Balbezit","team.shots":"Schoten","team.on_target":"Op doel","team.fouls":"Overtredingen","team.win_prob":"Winkans","team.timeouts":"Time-outs","team.spectators":"toeschouwers","team.top_scorer":"Topscorer","team.next_match":"Volgende wedstrijd","team.in":"Over","team.no_match":"Geen wedstrijd beschikbaar","team.unknown_entity":"Onbekende entiteit","time.today":"Vandaag","time.yesterday":"Gisteren","time.tomorrow":"Morgen","time.now":"nu","time.in_n_min":"over {n} min","time.in_n_h":"over {n} uur","time.in_n_d":"over {n} dagen","time.n_min_ago":"{n} min geleden","time.n_h_ago":"{n} uur geleden","time.n_d_ago":"{n} dagen geleden","lineup.bench":"Bank","lineup.empty.title":"Opstellingen niet beschikbaar","lineup.empty.sub":"Opstellingen worden kort voor de aftrap gepubliceerd","timeline.empty.title":"Nog geen gebeurtenissen","timeline.empty.sub":"Gebeurtenissen verschijnen tijdens de wedstrijd","timeline.event":"Gebeurtenis","timeline.penalty":"Penalty","news.empty":"Geen nieuws beschikbaar","news.articles":"{n} artikelen","phase.regular_season":"Competitie","phase.group_stage":"Groepsfase","phase.playoffs":"Play-offs","zone.champions":"Champions League","zone.europa":"Europa League","zone.conference":"Conference League","zone.relegation":"Degradatie","zone.qualified":"Gekwalificeerd","zone.third_place_playoff":"Beste 3e","zone.eliminated":"Uitgeschakeld","hero.groups":"groepen","hero.teams":"teams","hero.not_started":"Niet gestart","col.pos":"#","col.team":"Team","col.played":"G","col.wins":"W","col.draws":"G","col.losses":"V","col.gd":"+/-","col.points":"Pnt","col.gf":"VD","col.ga":"TD","col.pct":"PCT","col.gb":"GB","col.streak":"Reeks","col.otl":"OTL","standings.empty.title":"Nog geen stand","standings.empty.sub":"De stand verschijnt zodra het seizoen begonnen is.","team.form":"Vorm","team.last5":"Laatste 5","generic.no_match":"Geen wedstrijd beschikbaar","generic.matches_count":"{n} wedstrijden","generic.unknown_entity":"Onbekende entiteit","generic.close":"Sluiten","generic.unknown":"Onbekend","popup.match_details":"Wedstrijddetails","popup.lineups":"Opstellingen","popup.scoring_plays":"Scorende acties","popup.stat_leaders":"Topspelers","popup.timeline":"Tijdlijn","popup.h2h":"Onderlinge duels","popup.no_events":"Geen gebeurtenissen beschikbaar","month.1":"Jan","month.2":"Feb","month.3":"Mrt","month.4":"Apr","month.5":"Mei","month.6":"Jun","month.7":"Jul","month.8":"Aug","month.9":"Sep","month.10":"Okt","month.11":"Nov","month.12":"Dec"},it:{"card.bracket":"Tabellone","card.lineup":"Formazioni","card.timeline":"Cronologia","card.news":"Notizie","card.standings":"Classifica","round.final":"Finale","round.semifinals":"Semifinali","round.quarterfinals":"Quarti di finale","round.r16":"Ottavi di finale","round.r32":"Sedicesimi","round.knockout_playoffs":"Spareggi KO","round.preliminary":"Turno preliminare","round.short.semifinals":"Semi","round.short.quarterfinals":"Quarti","round.short.r16":"Ottavi","bracket.empty.title":"Tabellone non disponibile","bracket.empty.sub":"La fase a eliminazione diretta inizierà presto","bracket.tbd":"Da def.","bracket.tied_agg":"Pari aggreg.","bracket.agg":"Aggreg.","status.live":"Diretta","status.finished":"Finita","status.scheduled":"Programmata","status.full_time":"Termine","status.halftime":"Intervallo","status.first_half":"Primo Tempo","status.second_half":"Secondo Tempo","status.kickoff":"Inizio","status.end":"Fine","event.goal":"Goal","event.yellow_card":"Cartellino giallo","event.red_card":"Cartellino rosso","event.substitution":"Sostituzione","event.var":"VAR","event.header":"Colpo di testa","event.shot":"Tiro","event.penalty":"Rigore","event.free_kick":"Calcio di punizione","event.try":"Meta","event.conversion":"Trasformazione","event.penalty_goal":"Calcio Piazzato","event.drop_goal":"Drop Goal","form.W":"V","form.D":"N","form.L":"P","team.details":"Dettagli","team.possession":"Possesso","team.shots":"Tiri","team.on_target":"In porta","team.fouls":"Falli","team.win_prob":"Prob. Vitt.","team.timeouts":"Timeout","team.spectators":"spettatori","team.top_scorer":"Capocannoniere","team.next_match":"Prossima partita","team.in":"A","team.no_match":"Nessuna partita disponibile","team.unknown_entity":"Entità sconosciuta","time.today":"Oggi","time.yesterday":"Ieri","time.tomorrow":"Domani","time.now":"ora","time.in_n_min":"tra {n} min","time.in_n_h":"tra {n} h","time.in_n_d":"tra {n} g","time.n_min_ago":"{n} min fa","time.n_h_ago":"{n} h fa","time.n_d_ago":"{n} g fa","lineup.bench":"Panchina","lineup.empty.title":"Formazioni non disponibili","lineup.empty.sub":"Le formazioni vengono pubblicate poco prima del fischio d'inizio","timeline.empty.title":"Nessun evento ancora","timeline.empty.sub":"Gli eventi compaiono durante la partita","timeline.event":"Evento","timeline.penalty":"Rigore","news.empty":"Nessuna notizia disponibile","news.articles":"{n} articoli","phase.regular_season":"Stagione regolare","phase.group_stage":"Fase a gironi","phase.playoffs":"Playoff","zone.champions":"Champions","zone.europa":"Europa","zone.conference":"Conference League","zone.relegation":"Retrocessione","zone.qualified":"Qualificate","zone.third_place_playoff":"Migliori 3°","zone.eliminated":"Eliminate","hero.groups":"gironi","hero.teams":"squadre","hero.not_started":"Non iniziato","col.pos":"#","col.team":"Squadra","col.played":"P","col.wins":"V","col.draws":"N","col.losses":"S","col.gd":"+/-","col.points":"Pt","col.gf":"GF","col.ga":"GS","col.pct":"PCT","col.gb":"GB","col.streak":"Serie","col.otl":"OTL","standings.empty.title":"Classifica non disponibile","standings.empty.sub":"La classifica appare a stagione iniziata.","team.form":"Forma","team.last5":"Ultime 5","generic.no_match":"Nessuna partita disponibile","generic.matches_count":"{n} partite","generic.unknown_entity":"Entità sconosciuta","generic.close":"Chiudi","generic.unknown":"Sconosciuto","popup.match_details":"Dettagli partita","popup.lineups":"Formazioni","popup.scoring_plays":"Marcature","popup.stat_leaders":"Migliori giocatori","popup.timeline":"Cronologia","popup.h2h":"Precedenti","popup.no_events":"Nessun evento disponibile","month.1":"Gen","month.2":"Feb","month.3":"Mar","month.4":"Apr","month.5":"Mag","month.6":"Giu","month.7":"Lug","month.8":"Ago","month.9":"Set","month.10":"Ott","month.11":"Nov","month.12":"Dic"},fr:{"card.bracket":"Tableau","card.lineup":"Compositions","card.timeline":"Chronologie","card.news":"Actualités","card.standings":"Classement","round.final":"Finale","round.semifinals":"Demi-finales","round.quarterfinals":"Quarts de finale","round.r16":"Huitièmes de finale","round.r32":"Seizièmes","round.knockout_playoffs":"Barrages","round.preliminary":"Tour préliminaire","round.short.semifinals":"Demis","round.short.quarterfinals":"Quarts","round.short.r16":"8èmes","bracket.empty.title":"Tableau non disponible","bracket.empty.sub":"La phase à élimination directe commencera bientôt","bracket.tbd":"À déf.","bracket.tied_agg":"Score cumulé égal","bracket.agg":"Cumul","status.live":"En direct","status.finished":"Terminé","status.scheduled":"Programmé","status.full_time":"Temps régl.","status.halftime":"Mi-temps","status.first_half":"1ère mi-temps","status.second_half":"2ème mi-temps","status.kickoff":"Coup d'envoi","status.end":"Fin","event.goal":"But","event.yellow_card":"Carton jaune","event.red_card":"Carton rouge","event.substitution":"Remplacement","event.var":"VAR","event.header":"Tête","event.shot":"Tir","event.penalty":"Penalty","event.free_kick":"Coup franc","event.try":"Essai","event.conversion":"Transformation","event.penalty_goal":"Pénalité","event.drop_goal":"Drop","form.W":"V","form.D":"N","form.L":"D","team.details":"Détails","team.possession":"Possession","team.shots":"Tirs","team.on_target":"Cadrés","team.fouls":"Fautes","team.win_prob":"Prob. Vict.","team.timeouts":"Temps morts","team.spectators":"spectateurs","team.top_scorer":"Meilleur buteur","team.next_match":"Prochain match","team.in":"À","team.no_match":"Aucun match disponible","team.unknown_entity":"Entité inconnue","time.today":"Aujourd'hui","time.yesterday":"Hier","time.tomorrow":"Demain","time.now":"maintenant","time.in_n_min":"dans {n} min","time.in_n_h":"dans {n} h","time.in_n_d":"dans {n} j","time.n_min_ago":"il y a {n} min","time.n_h_ago":"il y a {n} h","time.n_d_ago":"il y a {n} j","lineup.bench":"Banc","lineup.empty.title":"Compositions non disponibles","lineup.empty.sub":"Les compositions sont publiées peu avant le coup d'envoi","timeline.empty.title":"Aucun événement","timeline.empty.sub":"Les événements apparaissent pendant le match","timeline.event":"Événement","timeline.penalty":"Penalty","news.empty":"Aucune actualité disponible","news.articles":"{n} articles","phase.regular_season":"Saison régulière","phase.group_stage":"Phase de groupes","phase.playoffs":"Éliminatoires","zone.champions":"Champions","zone.europa":"Europa","zone.relegation":"Relégation","zone.qualified":"Qualifiées","zone.third_place_playoff":"Meilleurs 3es","zone.eliminated":"Éliminées","hero.groups":"groupes","hero.teams":"équipes","hero.not_started":"Pas commencé","col.pos":"#","col.team":"Équipe","col.played":"J","col.wins":"G","col.draws":"N","col.losses":"P","col.gd":"+/-","col.points":"Pts","col.gf":"BP","col.ga":"BC","col.pct":"PCT","col.gb":"GB","col.streak":"Série","col.otl":"OTL","standings.empty.title":"Classement indisponible","standings.empty.sub":"Le classement apparaît une fois la saison lancée.","team.form":"Forme","team.last5":"5 derniers","generic.no_match":"Aucun match disponible","generic.matches_count":"{n} matchs","generic.unknown_entity":"Entité inconnue","generic.close":"Fermer","generic.unknown":"Inconnu","popup.match_details":"Détails du match","popup.lineups":"Compositions","popup.scoring_plays":"Actions de score","popup.stat_leaders":"Meneurs","popup.timeline":"Chronologie","popup.h2h":"Confrontations","popup.no_events":"Aucun événement disponible","month.1":"Janv","month.2":"Févr","month.3":"Mars","month.4":"Avr","month.5":"Mai","month.6":"Juin","month.7":"Juil","month.8":"Août","month.9":"Sept","month.10":"Oct","month.11":"Nov","month.12":"Déc"},es:{"card.bracket":"Cuadro","card.lineup":"Alineaciones","card.timeline":"Cronología","card.news":"Noticias","card.standings":"Clasificación","round.final":"Final","round.semifinals":"Semifinales","round.quarterfinals":"Cuartos de final","round.r16":"Octavos de final","round.r32":"Dieciseisavos","round.knockout_playoffs":"Eliminatorias previas","round.preliminary":"Ronda preliminar","round.short.semifinals":"Semis","round.short.quarterfinals":"Cuartos","round.short.r16":"Octavos","bracket.empty.title":"Cuadro no disponible","bracket.empty.sub":"La fase eliminatoria comenzará pronto","bracket.tbd":"Por def.","bracket.tied_agg":"Empate global","bracket.agg":"Global","status.live":"En vivo","status.finished":"Finalizado","status.scheduled":"Programado","status.full_time":"Final","status.halftime":"Descanso","status.first_half":"Primer tiempo","status.second_half":"Segundo tiempo","status.kickoff":"Saque inicial","status.end":"Fin","event.goal":"Gol","event.yellow_card":"Tarjeta amarilla","event.red_card":"Tarjeta roja","event.substitution":"Sustitución","event.var":"VAR","event.header":"Cabezazo","event.shot":"Disparo","event.penalty":"Penalti","event.free_kick":"Falta directa","event.try":"Ensayo","event.conversion":"Conversión","event.penalty_goal":"Gol de Penalti","event.drop_goal":"Drop Goal","form.W":"V","form.D":"E","form.L":"D","team.details":"Detalles","team.possession":"Posesión","team.shots":"Tiros","team.on_target":"Al arco","team.fouls":"Faltas","team.win_prob":"Prob. Victoria","team.timeouts":"Tiempos","team.spectators":"espectadores","team.top_scorer":"Goleador","team.next_match":"Próximo partido","team.in":"En","team.no_match":"Ningún partido disponible","team.unknown_entity":"Entidad desconocida","time.today":"Hoy","time.yesterday":"Ayer","time.tomorrow":"Mañana","time.now":"ahora","time.in_n_min":"en {n} min","time.in_n_h":"en {n} h","time.in_n_d":"en {n} d","time.n_min_ago":"hace {n} min","time.n_h_ago":"hace {n} h","time.n_d_ago":"hace {n} d","lineup.bench":"Banquillo","lineup.empty.title":"Alineaciones no disponibles","lineup.empty.sub":"Las alineaciones se publican poco antes del saque inicial","timeline.empty.title":"Aún no hay eventos","timeline.empty.sub":"Los eventos aparecen durante el partido","timeline.event":"Evento","timeline.penalty":"Penalti","news.empty":"No hay noticias disponibles","news.articles":"{n} artículos","phase.regular_season":"Temporada regular","phase.group_stage":"Fase de grupos","phase.playoffs":"Eliminatorias","zone.champions":"Champions","zone.europa":"Europa","zone.relegation":"Descenso","zone.qualified":"Clasificadas","zone.third_place_playoff":"Mejores 3°","zone.eliminated":"Eliminadas","hero.groups":"grupos","hero.teams":"equipos","hero.not_started":"No iniciado","col.pos":"#","col.team":"Equipo","col.played":"PJ","col.wins":"G","col.draws":"E","col.losses":"P","col.gd":"+/-","col.points":"Pts","col.gf":"GF","col.ga":"GC","col.pct":"PCT","col.gb":"GB","col.streak":"Racha","col.otl":"OTL","standings.empty.title":"Clasificación no disponible","standings.empty.sub":"La clasificación aparece al comenzar la temporada.","team.form":"Forma","team.last5":"Últimos 5","generic.no_match":"Ningún partido disponible","generic.matches_count":"{n} partidos","generic.unknown_entity":"Entidad desconocida","generic.close":"Cerrar","generic.unknown":"Desconocido","popup.match_details":"Detalles del partido","popup.lineups":"Alineaciones","popup.scoring_plays":"Anotaciones","popup.stat_leaders":"Líderes","popup.timeline":"Cronología","popup.h2h":"Enfrentamientos","popup.no_events":"Sin eventos disponibles","month.1":"Ene","month.2":"Feb","month.3":"Mar","month.4":"Abr","month.5":"May","month.6":"Jun","month.7":"Jul","month.8":"Ago","month.9":"Sep","month.10":"Oct","month.11":"Nov","month.12":"Dic"}},ce=["en","it","fr","es","nl"];function de(e,t){const a=[];t&&"string"==typeof t.language&&a.push(t.language),e&&e.locale&&e.locale.language&&a.push(e.locale.language),e&&e.language&&a.push(e.language);for(const e of a){if(!e)continue;const t=String(e).toLowerCase().split("-")[0];if(ce.includes(t))return t}return"en"}function pe(e,t,a){let i=(le[t]||le.en)[e];return void 0===i&&(i=le.en[e]),void 0===i?e:(a&&Object.keys(a).forEach((e=>{i=i.replace(new RegExp("\\{"+e+"\\}","g"),a[e])})),i)}const he=n`
  :host {
    /* Accent palette — identica in dark e light */
    --cl-accent: #6366f1;
    --cl-accent-2: #ec4899;
    --cl-live: #ef4444;
    --cl-live-glow: rgba(239,68,68,0.5);
    --cl-green: #10b981;
    --cl-gold: #fbbf24;
    --cl-gold-glow: rgba(251,191,36,0.4);
    --cl-gold-text: #fde047;
    /* Zone classifica */
    --cl-cl: #6366f1;
    --cl-el: #f97316;
    --cl-rel: #ef4444;
    --cl-conf: #a855f7;
  }

  /* ---------- DARK (default) ---------- */
  :host,
  :host([data-skin="dark"]) {
    --cl-bg: #14182a;
    --cl-surface: rgba(255,255,255,0.05);
    --cl-surface-2: rgba(255,255,255,0.08);
    --cl-card-2: rgba(255,255,255,0.05);
    --cl-divider: rgba(255,255,255,0.08);
    --cl-glass-border: rgba(255,255,255,0.08);
    --cl-text: #f4f6fb;
    --cl-text-2: #aab2c5;
    --cl-shadow: rgba(0,0,0,0.30);
    --cl-overlay-strong: rgba(0,0,0,0.55);
    --cl-overlay-soft: rgba(0,0,0,0.25);
    --cl-chip-bg: rgba(255,255,255,0.10);
    --cl-chip-border: rgba(255,255,255,0.12);
    --cl-toast-bg: #0b0f1a;
    --cl-num-bg: #0b0f1a;
  }

  /* ---------- LIGHT ---------- */
  :host([data-skin="light"]) {
    --cl-bg: #ffffff;
    --cl-surface: rgba(15,23,42,0.04);
    --cl-surface-2: rgba(15,23,42,0.07);
    --cl-card-2: rgba(15,23,42,0.04);
    --cl-divider: rgba(15,23,42,0.10);
    --cl-glass-border: rgba(15,23,42,0.10);
    --cl-text: #14182a;
    --cl-text-2: #5b6577;
    --cl-shadow: rgba(15,23,42,0.12);
    --cl-overlay-strong: rgba(0,0,0,0.45);
    --cl-overlay-soft: rgba(0,0,0,0.18);
    --cl-chip-bg: rgba(15,23,42,0.06);
    --cl-chip-border: rgba(15,23,42,0.12);
    --cl-toast-bg: #1a1f33;
    --cl-num-bg: #1a1f33;
  }
`;function ge(e){return"light"===(e&&"string"==typeof e.skin?e.skin.toLowerCase():"dark")?"light":"dark"}function ue(e,t){const a=ge(t);return e&&e.setAttribute&&e.setAttribute("data-skin",a),a}const fe=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");function me(e,t,a){let i=document.getElementById(e);return i||(i=document.createElement("div"),i.id=e,i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.style.cssText="position:fixed;inset:0;display:flex;justify-content:center;align-items:center;z-index:999999;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);overflow:auto;",document.body.appendChild(i)),i._spClickHandler&&i.removeEventListener("click",i._spClickHandler),i._spKeyHandler&&document.removeEventListener("keydown",i._spKeyHandler),i._spClickHandler=e=>{e.target===i&&a()},i._spKeyHandler=e=>{"Escape"===e.key&&a()},i.addEventListener("click",i._spClickHandler),document.addEventListener("keydown",i._spKeyHandler),function(e,t){e.style.setProperty("--p-bg",t?"#ffffff":"#1a1f2e"),e.style.setProperty("--p-panel",t?"rgba(15,23,42,0.05)":"rgba(255,255,255,0.04)"),e.style.setProperty("--p-text",t?"#14182a":"#f8fafc"),e.style.setProperty("--p-sub",t?"#5b6577":"#94a3b8"),e.style.setProperty("--p-border",t?"rgba(15,23,42,0.10)":"rgba(255,255,255,0.08)"),e.style.setProperty("--p-muted","#cbd5e1")}(i,t),i}function ve(e){const t=document.getElementById(e);t&&(t._spKeyHandler&&document.removeEventListener("keydown",t._spKeyHandler),t._spClickHandler&&t.removeEventListener("click",t._spClickHandler),t.remove())}const be=(e,t)=>Array.from({length:t-e+1},((t,a)=>e+a)),_e={serie_a:{match:(e,t)=>"ita.1"===e||t.includes("italian_serie_a"),champions:[1,2,3,4],europa:[5],conference:[6],relegation:"bottom3"},premier_league:{match:(e,t)=>"eng.1"===e||t.includes("english_premier"),champions:[1,2,3,4,5],europa:[6],conference:[7],relegation:"bottom3"},laliga:{match:(e,t)=>"esp.1"===e||t.includes("spanish_la_liga")||t.includes("spanish_laliga"),champions:[1,2,3,4],europa:[5],conference:[6],relegation:"bottom3"},bundesliga:{match:(e,t)=>"ger.1"===e||t.includes("german_bundesliga"),champions:[1,2,3,4],europa:[5],conference:[6],relegation:[17,18]},ligue_1:{match:(e,t)=>"fra.1"===e||t.includes("french_ligue_1"),champions:[1,2,3],europa:[4],conference:[5],relegation:[17,18]},eredivisie:{match:(e,t)=>"ned.1"===e||t.includes("dutch_eredivisie"),champions:[1,2],europa:[3],conference:[4,5],relegation:[17,18]},primeira_liga:{match:(e,t)=>"por.1"===e||t.includes("portuguese_primeira"),champions:[1,2],europa:[3],conference:[4],relegation:[17,18]},ucl_league_phase:{match:(e,t)=>"uefa.champions"===e||t.includes("uefa_champions_league"),champions:be(1,8),europa:be(9,24),conference:[],relegation:"bottom12"},uel_league_phase:{match:(e,t)=>"uefa.europa"===e||t.includes("uefa_europa_league"),champions:be(1,8),europa:be(9,24),conference:[],relegation:"bottom12"},uecl_league_phase:{match:(e,t)=>"uefa.europa.conf"===e||t.includes("uefa_conference"),champions:be(1,8),europa:be(9,24),conference:[],relegation:"bottom12"},world_cup:{match:(e,t)=>"fifa.world"===e||t.includes("fifa_world_cup")||t.includes("world_cup"),champions:[1,2],europa:[3],conference:[],relegation:"bottom1",kind:"cup_group",hero:{icon:"🏆",accent:"world_cup"},labels:{champions:"zone.qualified",europa:"zone.third_place_playoff",conference:null,relegation:"zone.eliminated"}},uefa_euro:{match:(e,t)=>"uefa.euro"===e||t.includes("uefa_euro")||t.includes("european_championship"),champions:[1,2],europa:[3],conference:[],relegation:"bottom1",kind:"cup_group",hero:{icon:"⭐",accent:"uefa_euro"},labels:{champions:"zone.qualified",europa:"zone.third_place_playoff",conference:null,relegation:"zone.eliminated"}},copa_america:{match:(e,t)=>"conmebol.america"===e||t.includes("copa_america")||t.includes("conmebol_america"),champions:[1,2],europa:[],conference:[],relegation:"bottom2",kind:"cup_group",hero:{icon:"🏆",accent:"copa_america"},labels:{champions:"zone.qualified",europa:null,conference:null,relegation:"zone.eliminated"}}};customElements.define("sports-live-classifica",class extends oe{static get properties(){return{hass:{},_config:{},maxTeamsVisible:{type:Number},hideHeader:{type:Boolean},selectedGroup:{type:String},showPopup:{type:Boolean},activeTeam:{type:Object},_eventSubscriptions:{type:Array},_toastMessage:{type:String},_toastVisible:{type:Boolean},_toastVariant:{type:String}}}setConfig(e){if(!e.entity)throw new Error("Entity required");this._config=e,ue(this,e),this.maxTeamsVisible=e.max_teams_visible?e.max_teams_visible:10,this.hideHeader=e.hide_header||!1,this.compact=!0===e.compact,this.highlightTeam=e.highlight_team||"",this.selectedGroup=e.selected_group||"",this.showEventToasts=!0===e.show_event_toasts,this._toastMessage="",this._toastVisible=!1,this._toastVariant="goal",this._toastTimer=null,this.showPopup=!1,this.activeTeam=null}_t(e,t){return pe(e,de(this.hass,this._config),t)}connectedCallback(){super.connectedCallback(),this._subscribeToEvents()}disconnectedCallback(){super.disconnectedCallback(),ve("sports-live-standings-popup"),this._eventSubscriptions&&Array.isArray(this._eventSubscriptions)&&(this._eventSubscriptions.forEach((e=>{"function"==typeof e&&e()})),this._eventSubscriptions=[])}_subscribeToEvents(){this.hass?.connection&&(this._eventSubscriptions=[],["sports_live_score","sports_live_discipline","sports_live_match_finished"].forEach((e=>{this.hass.connection.subscribeEvents(this._handleSportsLiveEvent.bind(this),e).then((e=>{"function"==typeof e&&this._eventSubscriptions.push(e)})).catch((()=>{}))})))}_eventBelongsToThisCard(e){if(!this.hass||!this._config)return!1;const t=this._config.entity||"",a=e.competition_code;if(!a)return!1;const i=a.replace(/\./g,"_").toLowerCase();return t.toLowerCase().includes(i)}_handleSportsLiveEvent(e){const t=e.event_type,a=e.data;this._eventBelongsToThisCard(a)&&this.showEventToasts&&this._showEventToast(t,a)}_showEventToast(e,t){let a="",i="goal";const s=t.minute&&"N/A"!==t.minute?` (${t.minute}')`:"";if("sports_live_score"===e)a=`<strong>${(t.score_event_label||this._t("event.goal")).toUpperCase()}!</strong> ${t.player&&"N/A"!==t.player?`${t.player} · `:""}${t.home_team} ${t.home_score} - ${t.away_score} ${t.away_team}`,i="goal";else if("sports_live_discipline"===e){const e=String(t.discipline_type||"").toUpperCase();"YELLOW"===e?(a=`🟨 <strong>${this._t("event.yellow_card")}</strong> · ${t.player}${s}`,i="yellow"):"RED"===e&&(a=`🟥 <strong>${this._t("event.red_card")}</strong> · ${t.player}${s}`,i="red")}else"sports_live_match_finished"===e&&(a=`<strong>${this._t("status.full_time")}</strong> ${t.home_team} ${t.home_score} - ${t.away_score} ${t.away_team}`,i="finished");a&&(this._toastMessage=a,this._toastVariant=i,this._toastVisible=!0,this._toastTimer&&clearTimeout(this._toastTimer),this._toastTimer=setTimeout((()=>{this._toastVisible=!1,this.requestUpdate()}),4e3),this.requestUpdate())}showTeamDetails(e){this.activeTeam=e,this.showPopup=!0}updated(e){(e.has("showPopup")||e.has("activeTeam"))&&this._renderTeamPopupToBody()}_renderTeamPopupToBody(){if(!this.showPopup||!this.activeTeam)return void ve("sports-live-standings-popup");const e=this.activeTeam,t=e=>this._t(e),a=this._sport(),i=["nba","nhl","mlb","nfl"].includes(a),s=e=>{const t=parseInt(String(e??"").replace("+",""),10);return isNaN(t)?null:t},n=me("sports-live-standings-popup","light"===ge(this._config),(()=>{this.showPopup=!1})),o=s(e.wins),r=s(e.draws),l=s(e.losses),c=null!==o&&null!==l?o+(r||0)+l:null,d=s(e.goal_difference),p=null===d?"—":d>0?`+${d}`:`${d}`,h=null===d?"var(--p-sub)":d>0?"#10b981":d<0?"#ef4444":"var(--p-sub)",g=e=>null==e||""===e||"N/A"===e?null:e,u=function(e,t){return`<div style="background:var(--p-panel);padding:12px 8px;border-radius:12px;text-align:center;">\n        <div style="font-size:18px;font-weight:900;color:${arguments.length>2&&void 0!==arguments[2]?arguments[2]:"var(--p-text)"};font-variant-numeric:tabular-nums;">${t??"—"}</div>\n        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--p-sub);margin-top:3px;">${e}</div>\n      </div>`};let f;if(i){const i=g(e.playoff_seed)?`<div style="font-size:11px;font-weight:700;color:var(--p-sub);margin-top:2px;">Seed #${e.playoff_seed}</div>`:"";f=`\n        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px;">\n          ${u(t("col.wins"),o,"#10b981")}\n          ${u(t("col.losses"),l,"#ef4444")}\n          ${u(t("nhl"===a?"col.otl":"col.pct"),g("nhl"===a?e.ot_losses:e.win_pct))}\n        </div>\n        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px;">\n          ${u(t("col.gb"),g(e.games_behind))}\n          ${u(t("col.streak"),g(e.streak))}\n          ${u(t("nhl"===a?"col.points":"col.gd"),"nhl"===a?g(e.points):null===d?null:p,h)}\n        </div>\n        ${i}`}else f=`\n        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:18px;">\n          ${u(t("col.played"),c)}\n          ${u(t("col.wins"),o,"#10b981")}\n          ${u(t("col.draws"),r,"#f59e0b")}\n          ${u(t("col.losses"),l,"#ef4444")}\n        </div>\n        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px;">\n          ${u(t("col.gf"),g(e.goals_for))}\n          ${u(t("col.ga"),g(e.goals_against))}\n          ${u(t("col.gd"),p,h)}\n        </div>`;const m=String(e.form||"").replace(/[^WLDwld]/g,"").toUpperCase().slice(-5),v={W:"#10b981",L:"#ef4444",D:"#f59e0b"},b=m?m.split("").map((e=>`<div style="width:22px;height:22px;border-radius:6px;background:${v[e]||"#475569"};color:white;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;">${e}</div>`)).join(""):"";n.innerHTML=`\n      <div style="background:var(--p-bg);padding:24px;border-radius:20px;width:90%;max-width:480px;max-height:85vh;overflow-y:auto;border:1px solid var(--p-border);box-shadow:0 24px 64px rgba(0,0,0,0.6);margin:auto;color:var(--p-text);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;">\n        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">\n          ${e.team_logo?`<img src="${e.team_logo}" style="width:64px;height:64px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));" />`:""}\n          <div>\n            <div style="font-size:20px;font-weight:900;letter-spacing:-0.02em;">${e.team_name}</div>\n            <div style="font-size:11px;font-weight:700;color:var(--p-sub);margin-top:4px;">${t("col.pos")} #${e.rank} · ${e.points??"—"} ${t("col.points")}</div>\n          </div>\n        </div>\n\n        ${f}\n\n        ${b?`\n        <div style="margin-bottom:18px;padding:14px;background:var(--p-panel);border-radius:12px;">\n          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--p-sub);margin-bottom:8px;">${t("team.form")} (${t("team.last5")})</div>\n          <div style="display:flex;gap:6px;">${b}</div>\n        </div>`:""}\n\n        <button id="standings-popup-close" style="background:linear-gradient(135deg,#6366f1,#ec4899);color:white;padding:12px 20px;border:none;border-radius:12px;cursor:pointer;margin-top:4px;font-weight:800;width:100%;font-size:14px;">${t("generic.close")}</button>\n      </div>`,n.querySelector("#standings-popup-close").onclick=()=>{this.showPopup=!1}}getCardSize(){return 5}static getConfigElement(){return document.createElement("sports-live-classifica-editor")}static getStubConfig(){return{entity:"",max_teams_visible:10,hide_header:!1,selected_group:"",show_event_toasts:!1}}_getZoneConfig(){if(this._config.zone_config)return this._config.zone_config;if(this._config.zone_preset&&_e[this._config.zone_preset])return _e[this._config.zone_preset];return this._inferPresetFromEntity()||{champions:[],europa:[],conference:[],relegation:null}}_getZoneLabels(){const e=this._getZoneConfig().labels||{};return{champions:void 0!==e.champions?e.champions:"zone.champions",europa:void 0!==e.europa?e.europa:"zone.europa",conference:void 0!==e.conference?e.conference:"zone.conference",relegation:void 0!==e.relegation?e.relegation:"zone.relegation"}}_hasZonePositions(e){return!!e&&(Array.isArray(e)?e.length>0:"string"==typeof e&&/^bottom\d+$/.test(e))}_inferPresetFromEntity(){const e=(this._config.entity||"").toLowerCase(),t=this.hass&&this._config.entity?this.hass.states[this._config.entity]:null,a=t&&t.attributes?String(t.attributes.competition_code||"").toLowerCase():"";for(const[,t]of Object.entries(_e))if(t.match&&t.match(a,e))return t;return null}_positionInZone(e,t,a){if(!a)return!1;const i=String(a).match(/^bottom(\d+)$/);if(i){const a=parseInt(i[1],10);return t&&e>t-a}return!!Array.isArray(a)&&a.includes(Number(e))}_translatePhase(e){return e?{"regular-season":this._t("phase.regular_season"),"group stage":this._t("phase.group_stage"),playoffs:this._t("phase.playoffs")}[String(e).toLowerCase()]||e:""}_shouldShowPhase(e){return!!e&&"regular-season"!==String(e).toLowerCase()}_isCupGroupStage(){const e=this._getZoneConfig();return e&&"cup_group"===e.kind}_groupHasNoMatches(e){if(!e||!e.length)return!1;const t=e=>{if(null==e||""===e)return 0;const t=parseInt(String(e).replace("+",""),10);return isNaN(t)?0:t};return e.every((e=>t(e.wins)+t(e.draws)+t(e.losses)===0))}_zoneClass(e,t){const a=this._getZoneConfig();return this._positionInZone(e,t,a.champions)?1!==e||this._isCupGroupStage()?"zone-cl":"zone-cl rank-first":this._positionInZone(e,t,a.europa)?"zone-el":this._positionInZone(e,t,a.conference)?"zone-conf":this._positionInZone(e,t,a.relegation)?"zone-rel":"zone-default"}_sortStandings(e,t){let a=(e||[]).filter((e=>null!=e.rank));return t.includes("MLS")?(a=a.slice().sort(((e,t)=>t.points!==e.points?t.points-e.points:t.goal_difference!==e.goal_difference?t.goal_difference-e.goal_difference:t.goals_for-e.goals_for)),a.forEach(((e,t)=>{e.rank=t+1}))):a=a.slice().sort(((e,t)=>e.rank-t.rank)),a}_currentGroup(e){return e.find((e=>e.name===this.selectedGroup))||e[0]}render(){if(!this.hass||!this._config)return U``;const e=this._config.entity,t=this.hass.states[e];if(!t)return U`<ha-card class="empty">${this._t("generic.unknown_entity")}: ${e}</ha-card>`;const a=t.attributes.season||"",i=t.attributes.standings_groups||[],s=i.some((e=>(e.standings||[]).length>0));if(!s)return U`<ha-card class="empty">
        <div class="empty-icon">${this._sportIcon()}</div>
        <div class="empty-title">${this._t("standings.empty.title")}</div>
        <div class="empty-sub">${this._t("standings.empty.sub")}</div>
      </ha-card>`;const n=!this.selectedGroup&&i.length>1,o=this._currentGroup(i),r=this._sortStandings(o?o.standings:[],a),l=r.length,c=48*Math.min(this.maxTeamsVisible,l)+50;return U`
      <ha-card>
        ${this.showEventToasts&&this._toastVisible?U`
          <div class="event-toast variant-${this._toastVariant}" .innerHTML=${this._toastMessage}></div>
        `:""}

        ${this.hideHeader?"":this._renderHeader(t,a,o,i,n)}

        ${n?this._renderGroupsGrid(i,a):U`
            <div class="table-wrap" style="max-height: ${c}px;">
              ${this.compact?this._renderCompactTable(r,l):this._renderFullTable(r,l)}
            </div>
          `}

        ${this._renderLegend()}
      </ha-card>
    `}_sport(){const e=this.hass&&this._config.entity?this.hass.states[this._config.entity]:null;return e&&e.attributes?String(e.attributes.sport||""):""}_sportIcon(){return{soccer:"⚽",nfl:"🏈",rugby:"🏉",nba:"🏀",nhl:"🏒",mlb:"⚾",cricket:"🏏",tennis:"🎾",mma:"🥊"}[this._sport()]||"🏆"}_fullColumns(){const e=this._sport();return"nhl"===e?[{key:"wins",label:"col.wins"},{key:"losses",label:"col.losses"},{key:"ot_losses",label:"col.otl"},{key:"streak",label:"col.streak"},{key:"points",label:"col.points",cls:"points-cell"}]:"nba"===e||"mlb"===e||"nfl"===e?[{key:"wins",label:"col.wins"},{key:"losses",label:"col.losses"},{key:"games_behind",label:"col.gb"},{key:"streak",label:"col.streak"},{key:"win_pct",label:"col.pct",cls:"points-cell"}]:[{key:"played",label:"col.played"},{key:"wins",label:"col.wins"},{key:"draws",label:"col.draws"},{key:"losses",label:"col.losses"},{key:"gd",label:"col.gd"},{key:"points",label:"col.points",cls:"points-cell"}]}_compactColumns(){const e=this._sport();return"nhl"===e?[{key:"record",label:"col.wins"},{key:"points",label:"col.points",cls:"points-cell"}]:"nba"===e||"mlb"===e||"nfl"===e?[{key:"record",label:"col.wins"},{key:"win_pct",label:"col.pct",cls:"points-cell"}]:[{key:"played",label:"col.played"},{key:"wins",label:"col.wins"},{key:"draws",label:"col.draws"},{key:"losses",label:"col.losses"},{key:"points",label:"col.points",cls:"points-cell"}]}_cellFor(e,t){const a=e=>{if(null==e||""===e)return null;const t=parseInt(String(e).replace("+",""),10);return isNaN(t)?null:t};if("played"===t.key){const i=a(e.wins),s=a(e.draws),n=a(e.losses);return{value:(null!==i&&null!==n?i+(s||0)+n:null)??(e.games_played&&"N/A"!==e.games_played?e.games_played:"-"),cls:t.cls||""}}if("gd"===t.key){const t=a(e.goal_difference);return{value:null===t?"-":t>0?`+${t}`:`${t}`,cls:null===t?"":t>0?"gd-pos":t<0?"gd-neg":""}}if("record"===t.key){const a=e.wins,i=e.losses;return{value:null!=a&&"N/A"!==a&&null!=i&&"N/A"!==i?`${a}-${i}`:"-",cls:t.cls||""}}const i=e[t.key];return{value:null==i||""===i||"N/A"===i?"-":i,cls:t.cls||""}}_renderFullTable(e,t){const a=this._fullColumns();return U`
      <table class="standings-table">
        <thead>
          <tr>
            <th>${this._t("col.pos")}</th>
            <th class="team-col">${this._t("col.team")}</th>
            ${a.map((e=>U`<th>${this._t(e.label)}</th>`))}
          </tr>
        </thead>
        <tbody>
          ${e.map((e=>{const i=this.highlightTeam&&e.team_name&&e.team_name.toLowerCase().includes(this.highlightTeam.toLowerCase());return U`
              <tr class="${this._zoneClass(e.rank,t)} clickable-row ${i?"highlighted":""}"
                  @click="${()=>this.showTeamDetails(e)}">
                <td><div class="rank-cell"><div class="rank-num">${e.rank}</div></div></td>
                <td class="team-cell">
                  <img src="${e.team_logo}" alt="${e.team_name}" />
                  <span class="tname">${e.team_name}</span>
                </td>
                ${a.map((t=>{const a=this._cellFor(e,t);return U`<td class="${a.cls}">${a.value}</td>`}))}
              </tr>
            `}))}
        </tbody>
      </table>
    `}_renderCompactTable(e,t){const a=this._compactColumns();return U`
      <table class="standings-table compact">
        <thead>
          <tr>
            <th>${this._t("col.pos")}</th>
            <th class="team-col">${this._t("col.team")}</th>
            ${a.map((e=>U`<th>${this._t(e.label)}</th>`))}
          </tr>
        </thead>
        <tbody>
          ${e.map((e=>U`
              <tr class="${this._zoneClass(e.rank,t)} clickable-row"
                  @click="${()=>this.showTeamDetails(e)}">
                <td><div class="rank-cell"><div class="rank-num">${e.rank}</div></div></td>
                <td class="team-cell">
                  <img src="${e.team_logo}" alt="${e.team_name}" />
                  <span class="tname">${e.team_name}</span>
                </td>
                ${a.map((t=>{const a=this._cellFor(e,t);return U`<td class="${a.cls}">${a.value}</td>`}))}
              </tr>
          `))}
        </tbody>
      </table>
    `}_renderHeader(e,t,a,i,s){const n=this._getZoneConfig(),o=this._isCupGroupStage(),r=n&&n.hero?n.hero:null,l=s?this._t("phase.group_stage"):this._shouldShowPhase(a&&a.name)?this._translatePhase(a.name):"",c=[];t&&"n/a"!==t.toLowerCase()&&c.push(t),l&&c.push(l);let d=0;if(s)for(const e of i)d+=(e.standings||[]).filter((e=>null!=e.rank)).length;return U`
      <div class="top-bar ${o?"top-bar-cup":""} ${r?`accent-${r.accent}`:""}">
        ${r&&r.icon?U`<div class="hero-icon">${r.icon}</div>`:""}
        <h2>${e.state}</h2>
        <div class="sub">${c.join(" · ")}</div>
        ${s&&o?U`
          <div class="hero-badges">
            <span class="badge">${i.length} ${this._t("hero.groups")}</span>
            <span class="badge">${d} ${this._t("hero.teams")}</span>
          </div>
        `:""}
      </div>
    `}_renderLegend(){const e=this._getZoneConfig(),t=this._getZoneLabels(),a=[{key:"champions",dot:"cl",positions:e.champions,label:t.champions},{key:"europa",dot:"el",positions:e.europa,label:t.europa},{key:"conference",dot:"conf",positions:e.conference,label:t.conference},{key:"relegation",dot:"rel",positions:e.relegation,label:t.relegation}].filter((e=>e.label&&this._hasZonePositions(e.positions)));return a.length?U`
      <div class="legend">
        ${a.map((e=>U`
          <div class="legend-item">
            <span class="legend-dot ${e.dot}"></span>${this._t(e.label)}
          </div>
        `))}
      </div>
    `:""}_renderGroupsGrid(e,t){const a=this._isCupGroupStage();return U`
      <div class="groups-grid ${a?"groups-grid-cup":""}">
        ${e.map((e=>{const a=this._sortStandings(e.standings||[],t),i=this._groupHasNoMatches(a);return U`
            <div class="group-cell ${i?"group-cell-pending":""}">
              <div class="group-title">
                <span>${e.name}</span>
                ${i?U`<span class="group-pending-badge">${this._t("hero.not_started")}</span>`:""}
              </div>
              ${this._renderCompactTable(a,a.length)}
            </div>
          `}))}
      </div>
    `}static get styles(){return[he,n`
      ha-card {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        padding: 0;
        background: var(--cl-bg);
        color: var(--cl-text);
        box-shadow: 0 4px 24px var(--cl-shadow);
      }
      ha-card.empty {
        padding: 36px 24px;
        text-align: center;
        color: var(--cl-text-2);
      }
      .empty-icon { font-size: 40px; line-height: 1; margin-bottom: 10px; opacity: 0.85; }
      .empty-title { font-size: 15px; font-weight: 800; color: var(--cl-text); margin-bottom: 4px; }
      .empty-sub { font-size: 12px; color: var(--cl-text-2); }

      .top-bar {
        position: relative;
        padding: 20px 18px;
        background:
          linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.10) 60%, transparent);
        border-bottom: 1px solid var(--cl-divider);
        overflow: hidden;
      }
      .top-bar::before {
        content: '⚽';
        position: absolute;
        right: -10px; top: -10px;
        font-size: 90px;
        opacity: 0.06;
        transform: rotate(15deg);
      }
      .top-bar-cup {
        padding: 28px 22px 22px;
        background:
          radial-gradient(circle at 20% 20%, rgba(99,102,241,0.30), transparent 55%),
          radial-gradient(circle at 80% 60%, rgba(236,72,153,0.20), transparent 50%),
          linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
      }
      .top-bar-cup::before { display: none; }
      .top-bar-cup .hero-icon {
        position: absolute;
        right: 14px; top: 14px;
        font-size: 56px;
        line-height: 1;
        opacity: 0.95;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.45));
      }
      .top-bar-cup h2 {
        font-size: 24px;
        letter-spacing: -0.04em;
      }
      .top-bar-cup .sub {
        font-size: 13px;
        margin-top: 6px;
        letter-spacing: 0.02em;
      }
      .top-bar.accent-world_cup {
        background:
          radial-gradient(circle at 20% 20%, rgba(251,191,36,0.22), transparent 55%),
          radial-gradient(circle at 80% 60%, rgba(99,102,241,0.18), transparent 55%),
          linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
      }
      .top-bar.accent-uefa_euro {
        background:
          radial-gradient(circle at 20% 20%, rgba(59,130,246,0.30), transparent 55%),
          radial-gradient(circle at 80% 60%, rgba(251,191,36,0.18), transparent 55%),
          linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
      }
      .top-bar.accent-copa_america {
        background:
          radial-gradient(circle at 20% 20%, rgba(16,185,129,0.25), transparent 55%),
          radial-gradient(circle at 80% 60%, rgba(245,158,11,0.20), transparent 55%),
          linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
      }
      .hero-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }
      .hero-badges .badge {
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(255,255,255,0.10);
        border: 1px solid rgba(255,255,255,0.12);
        color: var(--cl-text);
        backdrop-filter: blur(8px);
      }
      .top-bar h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 900;
        letter-spacing: -0.03em;
        background: linear-gradient(135deg, var(--cl-text), var(--cl-accent));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .top-bar .sub {
        color: var(--cl-text-2);
        font-size: 12px;
        margin-top: 4px;
        font-weight: 500;
      }

      .table-wrap {
        overflow-y: auto;
      }
      .standings-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-size: 13px;
      }
      .standings-table thead th {
        position: sticky;
        top: 0;
        background: var(--cl-card-2);
        backdrop-filter: blur(8px);
        padding: 10px 4px;
        text-align: center;
        font-size: 10px;
        font-weight: 800;
        color: var(--cl-text-2);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        border-bottom: 1px solid var(--cl-divider);
        z-index: 1;
      }
      .standings-table thead th:first-child { padding-left: 14px; text-align: left; }
      .standings-table thead th:last-child { padding-right: 14px; }
      .standings-table thead th.team-col { text-align: left; }

      .standings-table tbody tr {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .standings-table tbody tr:hover {
        background: var(--cl-card-2);
      }
      .standings-table tbody tr.clickable-row {
        cursor: pointer;
      }
      .standings-table tbody tr.clickable-row:hover {
        background: var(--cl-card-2);
        transform: none;
      }
      .standings-table tbody td {
        padding: 10px 4px;
        text-align: center;
        border-bottom: 1px solid var(--cl-divider);
        font-variant-numeric: tabular-nums;
        font-weight: 600;
        color: var(--cl-text);
      }
      .standings-table tbody tr:last-child td { border-bottom: none; }
      .standings-table tbody td:first-child { padding-left: 14px; text-align: left; }
      .standings-table tbody td:last-child { padding-right: 14px; }

      .rank-cell {
        display: flex; align-items: center; gap: 6px;
        font-weight: 800;
      }
      .rank-num {
        width: 24px; height: 24px;
        border-radius: 7px;
        display: flex; align-items: center; justify-content: center;
        font-size: 11px;
        font-weight: 900;
      }
      .standings-table tbody tr.highlighted {
        background: rgba(99,102,241,0.08) !important;
        border-left: 3px solid var(--cl-accent);
      }
      .standings-table tbody tr.highlighted .tname { font-weight: 900; color: var(--cl-accent); }
      .zone-cl .rank-num {
        background: linear-gradient(135deg, var(--cl-cl), #4f46e5);
        color: white;
        box-shadow: 0 2px 12px rgba(99,102,241,0.4);
      }
      .zone-cl.rank-first .rank-num {
        background: linear-gradient(135deg, var(--cl-gold), #d97706);
        color: #1f1410;
        box-shadow: 0 2px 16px var(--cl-gold-glow);
        animation: gold-shimmer 3s ease-in-out infinite;
      }
      @keyframes gold-shimmer {
        0%, 100% { box-shadow: 0 2px 16px var(--cl-gold-glow); }
        50% { box-shadow: 0 2px 24px var(--cl-gold-glow), 0 0 32px var(--cl-gold-glow); }
      }
      .zone-el .rank-num {
        background: linear-gradient(135deg, var(--cl-el), #ea580c);
        color: white;
        box-shadow: 0 2px 12px rgba(249,115,22,0.4);
      }
      .zone-rel .rank-num {
        background: linear-gradient(135deg, var(--cl-rel), #b91c1c);
        color: white;
        box-shadow: 0 2px 12px rgba(239,68,68,0.4);
      }
      .zone-conf .rank-num {
        background: linear-gradient(135deg, var(--cl-conf), #7e22ce);
        color: white;
        box-shadow: 0 2px 12px rgba(168,85,247,0.4);
      }
      .zone-default .rank-num {
        background: var(--cl-card-2);
        color: var(--cl-text-2);
      }

      .team-cell {
        display: flex; align-items: center; gap: 10px;
        text-align: left !important;
      }
      .team-cell img {
        width: 24px; height: 24px;
        object-fit: contain;
        flex-shrink: 0;
      }
      .team-cell .tname {
        font-weight: 700;
        font-size: 13px;
        letter-spacing: -0.01em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .points-cell {
        font-weight: 900 !important;
        font-size: 14px !important;
      }
      .gd-pos { color: var(--cl-green); font-weight: 800 !important; }
      .gd-neg { color: var(--cl-live); font-weight: 800 !important; }

      .groups-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 12px;
        padding: 12px;
      }
      .group-cell {
        background: var(--cl-card-2);
        border: 1px solid var(--cl-divider);
        border-radius: 14px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .group-title {
        padding: 10px 14px;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--cl-text);
        background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(236,72,153,0.06));
        border-bottom: 1px solid var(--cl-divider);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .group-pending-badge {
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 2px 7px;
        border-radius: 999px;
        background: rgba(255,255,255,0.08);
        color: var(--cl-text-2);
        border: 1px solid var(--cl-divider);
      }
      .groups-grid-cup .group-cell {
        border-left: 3px solid var(--cl-accent);
      }
      .groups-grid-cup .group-cell-pending {
        border-left-color: var(--cl-divider);
        opacity: 0.92;
      }
      .standings-table.compact {
        font-size: 12px;
      }
      .standings-table.compact thead th {
        padding: 8px 4px;
        font-size: 9px;
        letter-spacing: 0.08em;
      }
      .standings-table.compact tbody td {
        padding: 7px 4px;
        font-size: 12px;
      }
      .standings-table.compact .rank-num {
        width: 20px; height: 20px;
        font-size: 10px;
        border-radius: 6px;
      }
      .standings-table.compact .team-cell { gap: 7px; }
      .standings-table.compact .team-cell img {
        width: 18px; height: 18px;
      }
      .standings-table.compact .team-cell .tname {
        font-size: 12px;
        font-weight: 700;
      }
      .standings-table.compact .points-cell {
        font-size: 13px !important;
      }

      .legend {
        display: flex; flex-wrap: wrap;
        gap: 12px;
        padding: 12px 16px;
        border-top: 1px solid var(--cl-divider);
        background: var(--cl-card-2);
      }
      .legend-item {
        display: flex; align-items: center; gap: 6px;
        font-size: 10px;
        color: var(--cl-text-2);
        font-weight: 700;
        letter-spacing: 0.04em;
      }
      .legend-dot {
        width: 10px; height: 10px; border-radius: 3px;
      }
      .legend-dot.cl { background: linear-gradient(135deg, var(--cl-cl), #4f46e5); }
      .legend-dot.el { background: linear-gradient(135deg, var(--cl-el), #ea580c); }
      .legend-dot.rel { background: linear-gradient(135deg, var(--cl-rel), #b91c1c); }
      .legend-dot.conf { background: linear-gradient(135deg, var(--cl-conf), #7e22ce); }

      /* Toast */
      .event-toast {
        position: absolute;
        top: 12px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--cl-toast-bg);
        color: #ffffff;
        padding: 10px 18px;
        border-radius: 14px;
        font-size: 13px;
        font-weight: 800;
        z-index: 100;
        animation: toast-bounce 4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        pointer-events: none;
        max-width: 90%;
        text-align: center;
        letter-spacing: -0.01em;
        text-shadow: 0 1px 2px rgba(0,0,0,0.8);
      }
      .event-toast.variant-goal {
        box-shadow: 0 0 0 2px var(--cl-gold), 0 0 0 4px rgba(251,191,36,0.3),
                    0 12px 40px rgba(0,0,0,0.7), 0 0 60px rgba(251,191,36,0.4);
      }
      .event-toast.variant-goal strong { color: var(--cl-gold-text); }
      .event-toast.variant-yellow {
        box-shadow: 0 0 0 2px #f59e0b, 0 0 0 4px rgba(245,158,11,0.3), 0 12px 40px rgba(0,0,0,0.7);
      }
      .event-toast.variant-yellow strong { color: #fbbf24; }
      .event-toast.variant-red {
        box-shadow: 0 0 0 2px var(--cl-live), 0 0 0 4px rgba(239,68,68,0.3), 0 12px 40px rgba(0,0,0,0.7);
      }
      .event-toast.variant-red strong { color: #fca5a5; }
      .event-toast.variant-finished {
        box-shadow: 0 0 0 2px var(--cl-green), 0 0 0 4px rgba(16,185,129,0.3), 0 12px 40px rgba(0,0,0,0.7);
      }
      .event-toast.variant-finished strong { color: #6ee7b7; }
      @keyframes toast-bounce {
        0%   { opacity: 0; transform: translate(-50%, -20px) scale(0.7); }
        8%   { opacity: 1; transform: translate(-50%, 0) scale(1.08); }
        14%  { transform: translate(-50%, 0) scale(1); }
        90%  { opacity: 1; transform: translate(-50%, 0) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }
      }
    `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"sports-live-classifica",name:"Sports Live Standings",description:"League standings table for any sport: soccer, rugby, NFL."}),customElements.define("sports-live-classifica-editor",class extends oe{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array},groups:{type:Array}}}constructor(){super(),this.entities=[],this.groups=[]}static get styles(){return n`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      label {
        font-size: 14px;
        color: var(--primary-text-color);
      }
      .field-label {
        display: block;
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
        font-weight: 600;
      }
      input[type="text"],
      select, input[type="number"] {
        width: 100%;
        padding: 10px 12px;
        font-size: 14px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        box-sizing: border-box;
      }
      select:focus, input:focus {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: -1px;
      }
      h3 {
        margin: 8px 0 0;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
      }
    `}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}get config(){return this._config}updated(e){e.has("hass")&&this._fetchEntities(),(e.has("_config")||e.has("hass"))&&this._config&&this._config.entity&&this._fetchGroups()}_fireConfigChanged(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this.requestUpdate()}_entityChanged(e){if(!this._config)return;const t=e.target.value;t!==this._config.entity&&this._fireConfigChanged({...this._config,entity:t})}_groupChanged(e){if(!this._config)return;const t=e.target.value;t!==this._config.selected_group&&this._fireConfigChanged({...this._config,selected_group:t})}_switchChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.checked;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_selectChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.value;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_textChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.value;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_numberChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=parseInt(t.value,10);isNaN(i)||this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_fetchEntities(){this.hass&&(this.entities=Object.keys(this.hass.states).filter((e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e]?.attributes;return void 0!==t?.sport&&Array.isArray(t?.standings_groups)})).sort())}_fetchGroups(){const e=this._config&&this._config.entity;if(!this.hass||!e)return void(this.groups=[]);const t=this.hass.states[e];t&&t.attributes&&t.attributes.standings_groups?this.groups=t.attributes.standings_groups.map((e=>e.name)):this.groups=[]}render(){if(!this._config||!this.hass)return U``;const e=this._config.entity||"",t=e&&this.entities.includes(e);return U`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity</label>
          <select @change=${this._entityChanged}>
            ${t?"":U`<option value="${e}" selected>${e||"— select —"}</option>`}
            ${this.entities.map((t=>U`
              <option value="${t}" ?selected=${t===e}>${t}</option>
            `))}
          </select>
        </div>

        <h3>Settings</h3>
        <div>
          <label class="field-label">Group</label>
          <select @change=${this._groupChanged}>
            <option value="" ?selected=${!this._config.selected_group}>— All —</option>
            ${this.groups.map((e=>U`
              <option value="${e}" ?selected=${e===this._config.selected_group}>${e}</option>
            `))}
          </select>
        </div>

        <div class="option">
          <label>Hide Header</label>
          <ha-switch
            .checked=${!0===this._config.hide_header}
            data-config-value="hide_header"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Compact Table (Pos, Team, GD, Pts)</label>
          <ha-switch
            .checked=${!0===this._config.compact}
            data-config-value="compact"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Show Event Toasts (in-card)</label>
          <ha-switch
            .checked=${!0===this._config.show_event_toasts}
            data-config-value="show_event_toasts"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div>
          <label class="field-label">Highlight Team (partial name match)</label>
          <input
            type="text"
            placeholder="e.g. Arsenal"
            .value=${this._config.highlight_team||""}
            data-config-value="highlight_team"
            @change=${this._textChanged}
          />
        </div>

        <div>
          <label class="field-label">Max Teams Visible</label>
          <input
            type="number"
            min="1"
            max="50"
            .value=${this._config.max_teams_visible||10}
            data-config-value="max_teams_visible"
            @change=${this._numberChanged}
          />
        </div>
        <div>
          <label class="field-label">Skin</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            <option value="dark" ?selected=${"dark"===(this._config.skin||"dark")}>Dark</option>
            <option value="light" ?selected=${"light"===this._config.skin}>Light</option>
          </select>
        </div>
        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            <option value="" ?selected=${!this._config.language}>Auto (HA locale)</option>
            <option value="en" ?selected=${"en"===this._config.language}>English</option>
            <option value="it" ?selected=${"it"===this._config.language}>Italiano</option>
            <option value="fr" ?selected=${"fr"===this._config.language}>Français</option>
            <option value="es" ?selected=${"es"===this._config.language}>Español</option>
            <option value="nl" ?selected=${"nl"===this._config.language}>Nederlands</option>
          </select>
        </div>
      </div>
    `}}),customElements.define("sports-live-matches",class extends oe{static get properties(){return{hass:{},_config:{},showPopup:{type:Boolean},activeMatch:{type:Object},_eventSubscriptions:{type:Array},_recentEventMatches:{type:Object},_toastMessage:{type:String},_toastVisible:{type:Boolean},_toastVariant:{type:String}}}constructor(){super(),this._recentEventMatches=new Map,this._eventSubscriptions=[],this._toastMessage="",this._toastVisible=!1,this._toastVariant="goal",this._toastTimer=null}setConfig(e){if(!e.entity)throw new Error("Entity required");this._config=e,ue(this,e),this.maxEventsVisible=e.max_events_visible?e.max_events_visible:5,this.maxEventsTotal=e.max_events_total?e.max_events_total:50,this.showFinishedMatches=void 0===e.show_finished_matches||e.show_finished_matches,this.hideHeader=void 0!==e.hide_header&&e.hide_header,this.hidePastDays=void 0!==e.hide_past_days?e.hide_past_days:0,this.reverseOrder=!0===e.reverse_order,this.showEventToasts=!0===e.show_event_toasts,this.activeMatch=null,this.showPopup=!1}_t(e,t){return pe(e,de(this.hass,this._config),t)}connectedCallback(){super.connectedCallback(),this._subscribeToEvents(),this._clockTick=setInterval((()=>{if("undefined"!=typeof document&&"hidden"===document.visibilityState)return;const e=this.hass?.states?.[this._config?.entity];(e?.attributes?.matches||[]).some((e=>"in"===e.state&&e.clock&&"N/A"!==e.clock))&&this.requestUpdate()}),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._clockTick&&(clearInterval(this._clockTick),this._clockTick=null),ve("sports-live-matches-popup"),this._eventSubscriptions&&Array.isArray(this._eventSubscriptions)&&(this._eventSubscriptions.forEach((e=>{"function"==typeof e&&e()})),this._eventSubscriptions=[])}_subscribeToEvents(){if(!this.hass?.connection)return;this._eventSubscriptions=[];let e=!1;const t=t=>{this.hass.connection.subscribeEvents(this._handleSportsLiveEvent.bind(this),t).then((e=>{"function"==typeof e&&this._eventSubscriptions.push(e)})).catch((()=>{e||(e=!0,this._setupStateChangedFallback())}))};t("sports_live_score"),t("sports_live_discipline")}_setupStateChangedFallback(){this.hass?.connection&&this.hass.connection.subscribeEvents((e=>{if(e.data.entity_id!==this._config?.entity)return;const t=e.data.new_state?.attributes?.matches||[],a=e.data.old_state?.attributes?.matches||[];t.forEach((e=>{if("in"!==e.state)return;const t=a.find((t=>t.home_team===e.home_team&&t.away_team===e.away_team));if(!t)return;const i={home_team:e.home_team,away_team:e.away_team,home_score:e.home_score,away_score:e.away_score,player:"N/A",score_event_label:null};String(e.home_score)!==String(t.home_score)&&this._handleSportsLiveEvent({event_type:"sports_live_score",data:{...i,team:e.home_team}}),String(e.away_score)!==String(t.away_score)&&this._handleSportsLiveEvent({event_type:"sports_live_score",data:{...i,team:e.away_team}})}))}),"state_changed").then((e=>{"function"==typeof e&&this._eventSubscriptions.push(e)})).catch((()=>{}))}_eventBelongsToThisCard(e){if(!this.hass||!this._config)return!1;const t=this.hass.states[this._config.entity];return!!t&&(t.attributes.matches||[]).some((t=>t.home_team===e.home_team&&t.away_team===e.away_team))}_handleSportsLiveEvent(e){const t=e.event_type,a=e.data;if(!this._eventBelongsToThisCard(a))return;const i=`${a.home_team}_${a.away_team}`;this._recentEventMatches.set(i,"sports_live_score"===t?"goal":"card"),this.requestUpdate(),setTimeout((()=>{this._recentEventMatches.delete(i),this.requestUpdate()}),5e3),this.showEventToasts&&this._showEventToast(t,a)}_showEventToast(e,t){let a="",i="goal";if("sports_live_score"===e)a=`<strong>${(t.score_event_label||this._t("event.goal")).toUpperCase()}!</strong> ${t.player&&"N/A"!==t.player?`${t.player} · `:""}${t.home_team} ${t.home_score} - ${t.away_score} ${t.away_team}`,i="goal";else if("sports_live_discipline"===e){const e=String(t.discipline_type||"").toUpperCase(),s=t.minute&&"N/A"!==t.minute?` (${t.minute}')`:"";"YELLOW"===e?(a=`🟨 <strong>${this._t("event.yellow_card")}</strong> · ${t.player}${s}`,i="yellow"):"RED"===e&&(a=`🟥 <strong>${this._t("event.red_card")}</strong> · ${t.player}${s}`,i="red")}a&&(this._toastMessage=a,this._toastVariant=i,this._toastVisible=!0,this._toastTimer&&clearTimeout(this._toastTimer),this._toastTimer=setTimeout((()=>{this._toastVisible=!1,this.requestUpdate()}),4e3),this.requestUpdate())}getCardSize(){return 4}static getConfigElement(){return document.createElement("sports-live-matches-editor")}static getStubConfig(){return{entity:"",max_events_visible:5,max_events_total:50,hide_past_days:0,show_finished_matches:!0,hide_header:!1,show_event_toasts:!1}}_parseMatchDate(e){if(!e)return null;const[t,a]=e.split(" "),[i,s,n]=t.split("/").map(Number),[o,r]=a?a.split(":").map(Number):[0,0];return new Date(n,s-1,i,o,r)}_advanceClock(e,t){const a=Math.floor((Date.now()-new Date(t).getTime())/1e3);if(a<0||a>300)return e;if(e.includes(":")){const t=e.split(":");if(2!==t.length)return e;const i=60*parseInt(t[0],10)+parseInt(t[1],10);if(isNaN(i))return e;const s=i+a;return`${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`}const i=e.match(/^(\d+)'$/);return i?`${parseInt(i[1],10)+Math.floor(a/60)}'`:e}_matchTimeLabel(e){if("in"===e.state){const t=e.clock&&"N/A"!==e.clock?e.clock:"";if(t){const e=this.hass?.states?.[this._config?.entity],a=e?.last_updated;return a?this._advanceClock(t,a):t}return"LIVE"}if("post"===e.state)return"FT";if(e.date){const t=e.date.split(" ");return t[1]||t[0]}return"—"}_matchScore(e,t){return"pre"===e.state?"-":e["home"===t?"home_score":"away_score"]??"-"}_isWinner(e,t){if("pre"===e.state)return null;const a=parseInt(e.home_score),i=parseInt(e.away_score);return isNaN(a)||isNaN(i)||a===i?null:"home"===t?a>i:i>a}_dayKey(e){if(!e.date)return"—";const t=this._parseMatchDate(e.date);if(!t)return e.date.split(" ")[0]||"—";const a=new Date;a.setHours(0,0,0,0);const i=new Date(t);i.setHours(0,0,0,0);const s=Math.round((i-a)/864e5);if(0===s)return"⚡ "+this._t("time.today");if(-1===s)return this._t("time.yesterday");if(1===s)return this._t("time.tomorrow");const n=this._t("month."+(i.getMonth()+1));return`${i.getDate()} ${n}`}showDetails(e){this.activeMatch=e,this.showPopup=!0}closePopup(){this.showPopup=!1}separateEvents(e){const t=[],a=[],i=[],s=[],n=[],o=[],r=[];return e.forEach((e=>{const l=String(e||""),c=l.toLowerCase();c.startsWith("try")?s.push(this.formatMatchEvent(l)):c.startsWith("conversion")?n.push(this.formatMatchEvent(l)):c.startsWith("penalty goal")||c.startsWith("penalty - scored")?o.push(this.formatMatchEvent(l)):c.startsWith("drop goal")?r.push(this.formatMatchEvent(l)):c.includes("goal")?t.push(this.formatMatchEvent(l)):c.includes("yellow card")?a.push(this.formatMatchEvent(l)):c.includes("red card")&&i.push(this.formatMatchEvent(l))})),{goals:t,yellowCards:a,redCards:i,tries:s,conversions:n,penaltyGoals:o,dropGoals:r}}formatMatchEvent(e){const t=e=>this._t(e);let a=String(e||"").trim();a=a.replace(/^Goal\s*-\s*/i,"").replace(/^Yellow Card\s*-\s*/i,"").replace(/^Red Card\s*-\s*/i,"").replace(/^Try\s*-\s*/i,"").replace(/^Conversion\s*-\s*/i,"").replace(/^Penalty Goal\s*-\s*/i,"").replace(/^Drop Goal\s*-\s*/i,"").replace(/^Penalty - Scored\s*-\s*/i,`${t("event.penalty")} - `).replace(/^Header\s*-\s*/i,`${t("event.header")} - `).replace(/^Shot\s*-\s*/i,`${t("event.shot")} - `).replace(/^Free-kick\s*-\s*/i,`${t("event.free_kick")} - `).replace(/^Penalty\s*-\s*/i,`${t("event.penalty")} - `),a=a.replace(/^([^:]+):\s*/,"$1 ");const i=[t("event.header"),t("event.shot"),t("event.penalty"),t("event.free_kick")].map((e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));return a=a.replace(new RegExp(`^(${i.join("|")})\\s*-\\s*(.+)$`,"i"),((e,t,a)=>`${a} (${t.toLowerCase()})`)),a=a.replace(/\bN\/A\b/g,t("generic.unknown")),a}_getBroadcast(e){const t=this._config?.broadcast_region||"uk",a=e.broadcast_uk&&"N/A"!==e.broadcast_uk?e.broadcast_uk:"",i=e.broadcast&&"N/A"!==e.broadcast&&""!==e.broadcast?e.broadcast:"";return"us"===t?i||a:"both"===t?[a,i].filter(Boolean).join(" / ")||"":a||i}render(){if(!this.hass||!this._config)return U``;const e=this._config.entity,t=this.hass.states[e];if(!t)return U`<ha-card class="empty">${this._t("generic.unknown_entity")}: ${e}</ha-card>`;let a=t.attributes.matches||[];const i=t.attributes.league_info?t.attributes.league_info[0]:null,s=t.attributes.team_logo||null;if(this.showFinishedMatches||(a=a.filter((e=>"Full Time"!==e.status))),a=a.slice().sort(((e,t)=>{const a=this._parseMatchDate(e.date)||new Date(0),i=this._parseMatchDate(t.date)||new Date(0);return this.reverseOrder?i-a:a-i})),this.hidePastDays>0){const e=new Date;e.setDate(e.getDate()-this.hidePastDays),a=a.filter((t=>{const a=this._parseMatchDate(t.date);return!a||a>=e}))}const n=a.slice(0,this.maxEventsTotal);if(0===n.length)return U`<ha-card class="empty">${this._t("generic.no_match")}</ha-card>`;const o=n.filter((e=>"in"===e.state)).length,r=[];let l=null;n.forEach((e=>{const t=this._dayKey(e);t!==l?(l=t,r.push({key:t,matches:[e]})):r[r.length-1].matches.push(e)}));const c=Math.max(80*this.maxEventsVisible,240);return U`
      <ha-card>
        <div class="hero-bg"></div>

        ${this.showEventToasts&&this._toastVisible?U`
          <div class="event-toast variant-${this._toastVariant}" .innerHTML=${this._toastMessage}></div>
        `:""}

        ${this.hideHeader?"":U`
          <div class="matches-header">
            ${i&&i.logo_href?U`<img class="league-logo" src="${i.logo_href}" alt="${i.abbreviation||""}" />`:s?U`<img class="league-logo" src="${s}" alt="" />`:""}
            <div class="league-info">
              <div class="league-name">${i&&i.abbreviation||t.state||"Sports Live"}</div>
              <div class="league-dates">
                ${i&&i.startDate?`${i.startDate} → ${i.endDate}`:this._t("generic.matches_count",{n:n.length})}
              </div>
            </div>
            ${o>0?U`<span class="live-counter">${o} LIVE</span>`:""}
          </div>
        `}

        <div class="scroll-content" style="max-height: ${c}px;">
          ${r.map((e=>U`
            <div class="day-divider ${e.key.startsWith("⚡")?"today":""}">${e.key}</div>
            ${e.matches.map((e=>{const t=`${e.home_team}_${e.away_team}`,a="in"===e.state,i=this._recentEventMatches.get(t),s=this._isWinner(e,"home"),n=this._isWinner(e,"away"),o=this._getBroadcast(e),r="pre"===e.state;return U`
                <div class="match-row ${a?"live":""} ${"goal"===i?"goal-pulse":""} ${"card"===i?"card-pulse":""}"
                     @click="${()=>this.showDetails(e)}">
                  <div class="match-time ${a?"live-time":""} ${"post"===e.state?"ft":""}">
                    ${this._matchTimeLabel(e)}
                  </div>
                  <div class="match-teams">
                    <div class="match-team">
                      <img src="${e.home_logo}" alt="${e.home_team}" />
                      <span class="name ${!0===s?"winner":!1===s?"loser":""}">${e.home_team}</span>
                      <span class="score ${!0===s?"winner":!1===s?"loser":""}">${this._matchScore(e,"home")}</span>
                    </div>
                    <div class="match-team">
                      <img src="${e.away_logo}" alt="${e.away_team}" />
                      <span class="name ${!0===n?"winner":!1===n?"loser":""}">${e.away_team}</span>
                      <span class="score ${!0===n?"winner":!1===n?"loser":""}">${this._matchScore(e,"away")}</span>
                    </div>
                    ${o&&(r||a)?U`
                      <div class="row-extras">
                        <span class="tv-chip" title="Watch on TV">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="13" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
                          ${o}
                        </span>
                      </div>
                    `:""}
                  </div>
                  <div class="match-status-icon">›</div>
                </div>
              `}))}
          `))}
        </div>
      </ha-card>
    `}updated(e){(e.has("showPopup")||e.has("activeMatch"))&&this.renderPopupToBody()}renderPopupToBody(){if(!this.showPopup||!this.activeMatch)return void ve("sports-live-matches-popup");const e=this.activeMatch,t=e=>this._t(e),a=me("sports-live-matches-popup","light"===ge(this._config),(()=>{this.showPopup=!1}));a.innerHTML=`\n      <div style="background:var(--p-bg);padding:24px;border-radius:20px;width:90%;max-width:560px;max-height:85vh;overflow-y:auto;border:1px solid var(--p-border);box-shadow:0 24px 64px rgba(0,0,0,0.6);margin:auto;color:var(--p-text);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;">\n        <h3 style="margin:0 0 20px;font-size:22px;font-weight:800;letter-spacing:-0.02em;background:linear-gradient(135deg,#6366f1,#ec4899);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">${fe(t("popup.match_details"))}</h3>\n        <div style="display:flex;justify-content:center;align-items:center;gap:18px;margin-bottom:24px;">\n          <img style="width:64px;height:64px;object-fit:contain;" src="${fe(e.home_logo)}" alt="${fe(e.home_team)}" />\n          <div style="text-align:center;">\n            <div style="font-size:38px;font-weight:900;letter-spacing:-0.04em;line-height:1;">${fe(e.home_score??"-")} <span style="opacity:0.4;">-</span> ${fe(e.away_score??"-")}</div>\n            <div style="font-size:12px;color:var(--p-sub);margin-top:8px;font-weight:600;">${fe(e.clock??e.status??"")}</div>\n          </div>\n          <img style="width:64px;height:64px;object-fit:contain;" src="${fe(e.away_logo)}" alt="${fe(e.away_team)}" />\n        </div>\n        <p style="text-align:center;color:var(--p-muted);font-size:14px;margin:0 0 20px;"><strong>${fe(e.home_team)}</strong> vs <strong>${fe(e.away_team)}</strong></p>\n        <div id="matches-events-container"></div>\n        <button id="matches-popup-close" style="background:linear-gradient(135deg,#6366f1,#ec4899);color:white;padding:12px 20px;border:none;border-radius:12px;cursor:pointer;margin-top:20px;font-weight:800;width:100%;font-size:14px;">${fe(t("generic.close"))}</button>\n      </div>\n    `,a.querySelector("#matches-popup-close").onclick=()=>{this.showPopup=!1};const i=a.querySelector("#matches-events-container"),{goals:s,yellowCards:n,redCards:o,tries:r,conversions:l,penaltyGoals:c,dropGoals:d}=this.separateEvents(e.match_details||[]),p=(e,t,a)=>t.length?`<div style="margin-bottom:14px;padding:14px;background:${a.bg};border-left:3px solid ${a.border};border-radius:10px;">\n        <h5 style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:${a.border};font-weight:800;">${fe(e)}</h5>\n        <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--p-text);">${t.map((e=>`<li style="margin:4px 0;">${fe(e)}</li>`)).join("")}</ul>\n      </div>`:"";let h="";h+=p(t("event.goal"),s,{bg:"rgba(99,102,241,0.1)",border:"#6366f1"}),h+=p(t("event.yellow_card"),n,{bg:"rgba(245,158,11,0.1)",border:"#f59e0b"}),h+=p(t("event.red_card"),o,{bg:"rgba(239,68,68,0.1)",border:"#ef4444"}),h+=p(t("event.try"),r,{bg:"rgba(16,185,129,0.1)",border:"#10b981"}),h+=p(t("event.conversion"),l,{bg:"rgba(16,185,129,0.07)",border:"#34d399"}),h+=p(t("event.penalty_goal"),c,{bg:"rgba(251,191,36,0.1)",border:"#fbbf24"}),h+=p(t("event.drop_goal"),d,{bg:"rgba(99,102,241,0.07)",border:"#818cf8"}),i.innerHTML=h||`<p style="text-align:center;color:var(--p-sub);font-size:13px;">${fe(t("popup.no_events"))}</p>`}static get styles(){return[he,n`
      :host {
        --cl-accent: #6366f1;
        --cl-accent-2: #ec4899;
        --cl-live: #ef4444;
        --cl-live-glow: rgba(239,68,68,0.5);
        --cl-green: #10b981;
        --cl-gold: #fbbf24;
        --cl-gold-text: #fde047;
        --cl-card-2: rgba(255,255,255,0.05);
        --cl-divider: rgba(255,255,255,0.08);
        --cl-glass-border: rgba(255,255,255,0.08);
      }
      ha-card {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        padding: 0;
        box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        background: var(--cl-bg);
        color: var(--cl-text);
      }
      ha-card.empty {
        padding: 24px;
        text-align: center;
        color: var(--cl-text-2);
      }
      .hero-bg {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.10), transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(236,72,153,0.10), transparent 50%);
        pointer-events: none;
        z-index: 0;
      }
      .matches-header {
        position: relative;
        z-index: 1;
        display: flex; align-items: center; gap: 14px;
        padding: 16px 16px 14px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .matches-header::after {
        content: '';
        position: absolute;
        left: 14px; right: 14px; bottom: -1px;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--cl-accent), transparent);
        opacity: 0.4;
      }
      .league-logo {
        width: 42px; height: 42px;
        object-fit: contain;
        filter: drop-shadow(0 2px 8px rgba(99,102,241,0.3));
      }
      .league-info {
        flex: 1;
        min-width: 0;
      }
      .league-name {
        font-size: 16px;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: var(--cl-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .league-dates {
        font-size: 11px;
        color: var(--cl-text-2);
        margin-top: 2px;
        font-weight: 500;
      }
      .live-counter {
        flex-shrink: 0;
        background: linear-gradient(135deg, var(--cl-live), #f97316);
        color: white;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.06em;
        box-shadow: 0 2px 12px var(--cl-live-glow);
      }
      .scroll-content {
        position: relative;
        z-index: 1;
        overflow-y: auto;
        padding: 4px 4px 12px;
      }
      .day-divider {
        padding: 12px 12px 4px;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: var(--cl-text-2);
        font-weight: 800;
        display: flex; align-items: center; gap: 8px;
      }
      .day-divider::after {
        content: '';
        flex: 1; height: 1px;
        background: linear-gradient(90deg, var(--cl-divider), transparent);
      }
      .day-divider.today { color: var(--cl-accent); }
      .day-divider.today::after {
        background: linear-gradient(90deg, var(--cl-accent), transparent);
        opacity: 0.4;
      }

      .match-row {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        margin: 0 4px;
        position: relative;
      }
      .match-row:hover {
        background: var(--cl-card-2);
        transform: translateX(3px);
      }
      .match-row.live {
        background: linear-gradient(90deg, rgba(239,68,68,0.10), rgba(239,68,68,0.02) 60%);
        animation: live-row-glow 3s ease-in-out infinite;
      }
      .match-row.live::before {
        content: '';
        position: absolute;
        left: -2px; top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 70%;
        background: linear-gradient(180deg, var(--cl-live), #f97316);
        border-radius: 0 4px 4px 0;
        box-shadow: 0 0 12px var(--cl-live-glow);
      }
      @keyframes live-row-glow {
        0%, 100% { background: linear-gradient(90deg, rgba(239,68,68,0.10), rgba(239,68,68,0.02) 60%); }
        50% { background: linear-gradient(90deg, rgba(239,68,68,0.18), rgba(239,68,68,0.05) 60%); }
      }
      .match-row.goal-pulse {
        animation: goal-pulse 1.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes goal-pulse {
        0%   { box-shadow: none; transform: scale(1); }
        20%  { box-shadow: 0 0 0 3px var(--cl-gold), 0 0 24px var(--cl-gold); transform: scale(1.02); }
        100% { box-shadow: none; transform: scale(1); }
      }
      .match-row.card-pulse {
        animation: card-pulse-row 1s ease-out;
      }
      @keyframes card-pulse-row {
        0%   { box-shadow: none; }
        30%  { box-shadow: 0 0 0 2px #f59e0b; }
        100% { box-shadow: none; }
      }

      .match-time {
        font-size: 11px;
        color: var(--cl-text-2);
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        min-width: 44px;
        text-align: center;
        padding: 6px 8px;
        background: var(--cl-card-2);
        border-radius: 8px;
      }
      .match-time.live-time {
        background: rgba(239,68,68,0.15);
        color: var(--cl-live);
      }
      .match-time.ft {
        background: rgba(16,185,129,0.12);
        color: var(--cl-green);
      }
      .match-teams {
        display: flex; flex-direction: column;
        gap: 4px;
        min-width: 0;
      }
      .match-team {
        display: flex; align-items: center; gap: 10px;
      }
      .match-team img { width: 22px; height: 22px; object-fit: contain; flex-shrink: 0; }
      .match-team .name {
        font-size: 13px;
        font-weight: 600;
        flex: 1;
        letter-spacing: -0.01em;
        color: var(--cl-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .match-team .name.winner { font-weight: 800; }
      .match-team .name.loser { color: var(--cl-text-2); }
      .match-team .score {
        font-size: 14px;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        min-width: 22px;
        text-align: right;
        color: var(--cl-text);
      }
      .match-team .score.winner { color: var(--cl-accent); }
      .match-team .score.loser { color: var(--cl-text-2); opacity: 0.6; }
      .row-extras {
        display: flex;
        gap: 6px;
        margin-top: 4px;
      }
      .tv-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 7px;
        background: rgba(99,102,241,0.12);
        border: 1px solid rgba(99,102,241,0.25);
        border-radius: 999px;
        font-size: 9px;
        font-weight: 700;
        color: var(--cl-accent);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .tv-chip svg { width: 10px; height: 10px; }
      .match-status-icon {
        color: var(--cl-text-2);
        font-size: 18px;
        opacity: 0.5;
        transition: all 0.2s;
      }
      .match-row:hover .match-status-icon {
        color: var(--cl-accent);
        opacity: 1;
        transform: translateX(3px);
      }

      /* Toast */
      .event-toast {
        position: absolute;
        top: 12px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--cl-toast-bg);
        color: #ffffff;
        padding: 10px 18px;
        border-radius: 14px;
        font-size: 13px;
        font-weight: 800;
        z-index: 100;
        animation: toast-bounce 4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        pointer-events: none;
        max-width: 90%;
        text-align: center;
        letter-spacing: -0.01em;
        text-shadow: 0 1px 2px rgba(0,0,0,0.8);
      }
      .event-toast.variant-goal {
        box-shadow:
          0 0 0 2px var(--cl-gold),
          0 0 0 4px rgba(251, 191, 36, 0.3),
          0 12px 40px rgba(0, 0, 0, 0.7),
          0 0 60px rgba(251, 191, 36, 0.4);
      }
      .event-toast.variant-goal strong { color: var(--cl-gold-text); }
      .event-toast.variant-yellow {
        box-shadow: 0 0 0 2px #f59e0b, 0 0 0 4px rgba(245,158,11,0.3), 0 12px 40px rgba(0,0,0,0.7);
      }
      .event-toast.variant-yellow strong { color: #fbbf24; }
      .event-toast.variant-red {
        box-shadow: 0 0 0 2px var(--cl-live), 0 0 0 4px rgba(239,68,68,0.3), 0 12px 40px rgba(0,0,0,0.7);
      }
      .event-toast.variant-red strong { color: #fca5a5; }
      @keyframes toast-bounce {
        0%   { opacity: 0; transform: translate(-50%, -20px) scale(0.7); }
        8%   { opacity: 1; transform: translate(-50%, 0) scale(1.08); }
        14%  { transform: translate(-50%, 0) scale(1); }
        90%  { opacity: 1; transform: translate(-50%, 0) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }
      }
    `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"sports-live-matches",name:"Sports Live Matches",description:"Match list for any sport: soccer, rugby, NFL. Supports competition and team mode."}),customElements.define("sports-live-matches-editor",class extends oe{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array}}}constructor(){super(),this.entities=[]}static get styles(){return n`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      label {
        font-size: 14px;
        color: var(--primary-text-color);
      }
      .field-label {
        display: block;
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
        font-weight: 600;
      }
      select, input[type="number"] {
        width: 100%;
        padding: 10px 12px;
        font-size: 14px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        box-sizing: border-box;
      }
      select:focus, input:focus {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: -1px;
      }
      h3 {
        margin: 8px 0 0;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
      }
      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: -4px;
      }
    `}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}get config(){return this._config}updated(e){e.has("hass")&&this._fetchEntities()}_fireConfigChanged(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this.requestUpdate()}_entityChanged(e){if(!this._config)return;const t=e.target.value;t!==this._config.entity&&this._fireConfigChanged({...this._config,entity:t})}_switchChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.checked;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_selectChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.value;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_numberChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=parseInt(t.value,10);isNaN(i)||this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_fetchEntities(){this.hass&&(this.entities=Object.keys(this.hass.states).filter((e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e]?.attributes;return void 0!==t?.sport&&Array.isArray(t?.matches)})).sort())}render(){if(!this._config||!this.hass)return U``;const e=this._config.entity||"",t=e&&this.entities.includes(e);return U`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity</label>
          <select @change=${this._entityChanged}>
            ${t?"":U`<option value="${e}" selected>${e||"— select —"}</option>`}
            ${this.entities.map((t=>U`
              <option value="${t}" ?selected=${t===e}>${t}</option>
            `))}
          </select>
        </div>

        <h3>Settings</h3>

        <div class="option">
          <label>Show Finished Matches</label>
          <ha-switch
            .checked=${!1!==this._config.show_finished_matches}
            data-config-value="show_finished_matches"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Hide Header</label>
          <ha-switch
            .checked=${!0===this._config.hide_header}
            data-config-value="hide_header"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Newest Matches First</label>
          <ha-switch
            .checked=${!0===this._config.reverse_order}
            data-config-value="reverse_order"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Show Event Toasts (in-card)</label>
          <ha-switch
            .checked=${!0===this._config.show_event_toasts}
            data-config-value="show_event_toasts"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div>
          <label class="field-label">Max Events Visible</label>
          <input
            type="number"
            min="1"
            max="100"
            .value=${this._config.max_events_visible||5}
            data-config-value="max_events_visible"
            @change=${this._numberChanged}
          />
        </div>

        <div>
          <label class="field-label">Max Events Total</label>
          <input
            type="number"
            min="1"
            max="500"
            .value=${this._config.max_events_total||50}
            data-config-value="max_events_total"
            @change=${this._numberChanged}
          />
        </div>

        <div>
          <label class="field-label">Hide Matches Older Than (Days)</label>
          <input
            type="number"
            min="0"
            max="365"
            .value=${this._config.hide_past_days||0}
            data-config-value="hide_past_days"
            @change=${this._numberChanged}
          />
          <div class="hint">"Show Finished Matches" must be enabled for this to work.</div>
        </div>
        <div>
          <label class="field-label">TV Broadcast Region</label>
          <select data-config-value="broadcast_region" @change=${this._selectChanged}>
            <option value="uk" ?selected=${"uk"===(this._config.broadcast_region||"uk")}>UK (default)</option>
            <option value="us" ?selected=${"us"===this._config.broadcast_region}>US</option>
            <option value="both" ?selected=${"both"===this._config.broadcast_region}>Both</option>
          </select>
        </div>
        <div>
          <label class="field-label">Skin</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            <option value="dark" ?selected=${"dark"===(this._config.skin||"dark")}>Dark</option>
            <option value="light" ?selected=${"light"===this._config.skin}>Light</option>
          </select>
        </div>
        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            <option value="" ?selected=${!this._config.language}>Auto (HA locale)</option>
            <option value="en" ?selected=${"en"===this._config.language}>English</option>
            <option value="it" ?selected=${"it"===this._config.language}>Italiano</option>
            <option value="fr" ?selected=${"fr"===this._config.language}>Français</option>
            <option value="es" ?selected=${"es"===this._config.language}>Español</option>
            <option value="nl" ?selected=${"nl"===this._config.language}>Nederlands</option>
          </select>
        </div>
      </div>
    `}}),customElements.define("sports-live-team",class extends oe{static get properties(){return{hass:{},_config:{},showPopup:{type:Boolean},activeMatch:{type:Object},_eventSubscriptions:{type:Array},_toastMessage:{type:String},_toastVisible:{type:Boolean},_toastVariant:{type:String}}}setConfig(e){if(!e.entity)throw new Error("Entity required");this._config=e,ue(this,e);const t=["big","huge"].includes(e.score_size)?e.score_size:"normal";this.setAttribute("data-score",t),this.showPopup=!1,this.activeMatch=null,this.showEventToasts=!0===e.show_event_toasts,this.hideHeader=!0===e.hide_header,this.hideForm=!0===e.hide_form,this.hideRecords=!0===e.hide_records,this.hideTopScorer=!0===e.hide_top_scorer,this.hideVenue=!0===e.hide_venue,this._toastMessage="",this._toastVisible=!1,this._toastVariant="goal",this._toastTimer=null}_t(e,t){return pe(e,de(this.hass,this._config),t)}_sportIcon(){const e=this.hass?.states?.[this._config?.entity];return{soccer:"⚽",nfl:"🏈",rugby:"🏉",nba:"🏀",nhl:"🏒",mlb:"⚾",cricket:"🏏",tennis:"🎾",mma:"🥊"}[e?.attributes?.sport||""]||"⚽"}_translatePhase(e){return e?{"regular-season":this._t("phase.regular_season"),"group stage":this._t("phase.group_stage"),playoffs:this._t("phase.playoffs")}[String(e).toLowerCase()]||e:""}_shouldShowPhase(e){return!!e&&"regular-season"!==String(e).toLowerCase()}connectedCallback(){super.connectedCallback(),this._subscribeToEvents(),this._clockTick=setInterval((()=>{if("undefined"!=typeof document&&"hidden"===document.visibilityState)return;const e=this.hass?.states?.[this._config?.entity],t=e?.attributes?.matches?.[0];"in"===t?.state&&t?.clock&&"N/A"!==t.clock&&this.requestUpdate()}),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._clockTick&&(clearInterval(this._clockTick),this._clockTick=null),ve("sports-live-team-popup"),this._eventSubscriptions&&Array.isArray(this._eventSubscriptions)&&(this._eventSubscriptions.forEach((e=>{"function"==typeof e&&e()})),this._eventSubscriptions=[])}_subscribeToEvents(){if(!this.hass?.connection)return;this._eventSubscriptions=[];let e=!1;const t=t=>{this.hass.connection.subscribeEvents(this._handleSportsLiveEvent.bind(this),t).then((e=>{"function"==typeof e&&this._eventSubscriptions.push(e)})).catch((()=>{e||(e=!0,this._setupStateChangedFallback())}))};t("sports_live_score"),t("sports_live_discipline")}_setupStateChangedFallback(){this.hass?.connection&&this.hass.connection.subscribeEvents((e=>{if(e.data.entity_id!==this._config?.entity)return;const t=e.data.new_state?.attributes?.matches?.[0],a=e.data.old_state?.attributes?.matches?.[0];if(!t||!a||"in"!==t.state)return;const i={home_team:t.home_team,away_team:t.away_team,home_score:t.home_score,away_score:t.away_score,player:"N/A",score_event_label:null};String(t.home_score)!==String(a.home_score)&&this._handleSportsLiveEvent({event_type:"sports_live_score",data:{...i,team:t.home_team}}),String(t.away_score)!==String(a.away_score)&&this._handleSportsLiveEvent({event_type:"sports_live_score",data:{...i,team:t.away_team}})}),"state_changed").then((e=>{"function"==typeof e&&this._eventSubscriptions.push(e)})).catch((()=>{}))}_eventBelongsToThisCard(e){if(!this.hass||!this._config)return!1;const t=this.hass.states[this._config.entity];if(!t)return!1;const a=t.attributes.matches||[];if(0===a.length)return!1;const i=a[0];return i.home_team===e.home_team&&i.away_team===e.away_team}_handleSportsLiveEvent(e){const t=e.event_type,a=e.data;if(this._eventBelongsToThisCard(a)&&this.showEventToasts)if("sports_live_score"===t){const e=a.team===a.home_team?"home":"away";requestAnimationFrame((()=>this._triggerGoalCelebration(e,a)))}else this._showEventToast(t,a)}_showEventToast(e,t){let a="",i="goal";if("sports_live_score"===e)a=`<strong>${(t.score_event_label||this._t("event.goal")).toUpperCase()}!</strong> ${t.player&&"N/A"!==t.player?`${t.player} · `:""}${t.home_team} ${t.home_score} - ${t.away_score} ${t.away_team}`,i="goal";else if("sports_live_discipline"===e){const e=String(t.discipline_type||"").toUpperCase(),s=t.minute&&"N/A"!==t.minute?` (${t.minute}')`:"";"YELLOW"===e?(a=`🟨 <strong>${this._t("event.yellow_card")}</strong> · ${t.player}${s}`,i="yellow"):"RED"===e&&(a=`🟥 <strong>${this._t("event.red_card")}</strong> · ${t.player}${s}`,i="red")}a&&(this._toastMessage=a,this._toastVariant=i,this._toastVisible=!0,this._toastTimer&&clearTimeout(this._toastTimer),this._toastTimer=setTimeout((()=>{this._toastVisible=!1,this.requestUpdate()}),4e3),this.requestUpdate())}_triggerGoalCelebration(e,t){const a=this.shadowRoot&&this.shadowRoot.querySelector("ha-card");if(!a)return;a.querySelectorAll(".confetti, .goal-banner, .goal-flash-overlay").forEach((e=>e.remove())),a.classList.remove("goal-flash"),a.offsetWidth,a.classList.add("goal-flash"),setTimeout((()=>a.classList.remove("goal-flash")),1700);const i=document.createElement("div");i.className="goal-flash-overlay",a.appendChild(i),setTimeout((()=>i.remove()),1e3);const s=document.createElement("div");s.className="goal-banner",s.innerHTML='<div class="goal-banner-text">GOAL!</div>',a.appendChild(s),setTimeout((()=>s.remove()),1700);const n=a.querySelector(".score-numbers");n&&(n.classList.remove("goal-scored"),n.offsetWidth,n.classList.add("goal-scored"),setTimeout((()=>n.classList.remove("goal-scored")),1300));const o=a.querySelectorAll(".team-side .team-logo-big"),r="away"===e?o[1]:o[0];r&&(r.classList.remove("scorer-bounce"),r.offsetWidth,r.classList.add("scorer-bounce"),setTimeout((()=>r.classList.remove("scorer-bounce")),1300)),navigator.vibrate&&navigator.vibrate([180,80,180,80,280]),setTimeout((()=>this._showEventToast("sports_live_score",t)),600);const l=["#ec4899","#6366f1","#06b6d4","#fbbf24","#10b981","#ef4444"],c=["⚽","🎉","✨","🔥","⭐"];for(let e=0;e<36;e++){const e=document.createElement("div");e.className="confetti",Math.random()>.55?(e.textContent=c[Math.floor(Math.random()*c.length)],e.style.fontSize=14+10*Math.random()+"px",e.style.background="transparent"):(e.style.background=l[Math.floor(Math.random()*l.length)],e.style.borderRadius=Math.random()>.5?"50%":"2px");const t=380*(Math.random()-.5)+"px",i=240*Math.random()+100+"px";e.style.setProperty("--dx",t),e.style.setProperty("--dy",i),e.style.animationDelay=.3*Math.random()+"s",a.appendChild(e),setTimeout((()=>e.remove()),2e3)}}getCardSize(){return 4}static getConfigElement(){return document.createElement("sports-live-team-editor")}static getStubConfig(){return{entity:"",show_event_toasts:!1}}showDetails(e){this.activeMatch=e,this.showPopup=!0}closePopup(){this.showPopup=!1}separateEvents(e){const t=[],a=[],i=[],s=[],n=[],o=[],r=[];return e.forEach((e=>{const l=String(e||""),c=l.toLowerCase();c.startsWith("try")?s.push(this.formatMatchEvent(l)):c.startsWith("conversion")?n.push(this.formatMatchEvent(l)):c.startsWith("penalty goal")||c.startsWith("penalty - scored")?o.push(this.formatMatchEvent(l)):c.startsWith("drop goal")?r.push(this.formatMatchEvent(l)):c.includes("goal")?t.push(this.formatMatchEvent(l)):c.includes("yellow card")?a.push(this.formatMatchEvent(l)):c.includes("red card")&&i.push(this.formatMatchEvent(l))})),{goals:t,yellowCards:a,redCards:i,tries:s,conversions:n,penaltyGoals:o,dropGoals:r}}formatMatchEvent(e){const t=e=>this._t(e);let a=String(e||"").trim();a=a.replace(/^Goal\s*-\s*/i,"").replace(/^Yellow Card\s*-\s*/i,"").replace(/^Red Card\s*-\s*/i,"").replace(/^Try\s*-\s*/i,"").replace(/^Conversion\s*-\s*/i,"").replace(/^Penalty Goal\s*-\s*/i,"").replace(/^Drop Goal\s*-\s*/i,"").replace(/^Penalty - Scored\s*-\s*/i,`${t("event.penalty")} - `).replace(/^Header\s*-\s*/i,`${t("event.header")} - `).replace(/^Shot\s*-\s*/i,`${t("event.shot")} - `).replace(/^Free-kick\s*-\s*/i,`${t("event.free_kick")} - `).replace(/^Penalty\s*-\s*/i,`${t("event.penalty")} - `),a=a.replace(/^([^:]+):\s*/,"$1 ");const i=[t("event.header"),t("event.shot"),t("event.penalty"),t("event.free_kick")].map((e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));return a=a.replace(new RegExp(`^(${i.join("|")})\\s*-\\s*(.+)$`,"i"),((e,t,a)=>`${a} (${t.toLowerCase()})`)),a=a.replace(/\bN\/A\b/g,t("generic.unknown")),a}_getBroadcast(e){const t=this._config?.broadcast_region||"uk",a=e.broadcast_uk&&"N/A"!==e.broadcast_uk?e.broadcast_uk:"",i=e.broadcast&&"N/A"!==e.broadcast&&""!==e.broadcast?e.broadcast:"";return"us"===t?i||a:"both"===t?[a,i].filter(Boolean).join(" / ")||"":a||i}_renderStatusBadge(e){const t=e.state;return"in"===t?U`<span class="status-badge live"><span class="dot"></span>${this._t("status.live")}</span>`:"post"===t?U`<span class="status-badge finished">${this._t("status.finished")}</span>`:U`<span class="status-badge scheduled">${e.date||this._t("status.scheduled")}</span>`}_advanceClock(e,t){const a=Math.floor((Date.now()-new Date(t).getTime())/1e3);if(a<0||a>300)return e;if(e.includes(":")){const t=e.split(":");if(2!==t.length)return e;const i=60*parseInt(t[0],10)+parseInt(t[1],10);if(isNaN(i))return e;const s=i+a;return`${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`}const i=e.match(/^(\d+)'$/);return i?`${parseInt(i[1],10)+Math.floor(a/60)}'`:e}_renderClock(e){const t=e.state;if("in"===t){const t=this.hass?.states?.[this._config?.entity],a=t?.last_updated,i=e.clock&&"N/A"!==e.clock?e.clock:"",s=i&&a?this._advanceClock(i,a):i,n=e.status_detail&&"N/A"!==e.status_detail?e.status_detail:"",o=s||n||e.status||"";return U`<div class="clock"><span class="dot"></span>${o}</div>`}return"post"===t?U`<div class="clock finished">${this._t("status.full_time")}</div>`:U`<div class="clock upcoming">${e.date||""}</div>`}_renderRecord(e){if(!e||"N/A"===e)return"";const t=String(e).split("-");return 3===t.length?U`<div class="record">
        <span class="rec rec-w">${t[0]}${this._t("form.W")}</span>
        <span class="rec rec-d">${t[1]}${this._t("form.D")}</span>
        <span class="rec rec-l">${t[2]}${this._t("form.L")}</span>
      </div>`:U`<div class="record"><span class="rec">${e}</span></div>`}_renderTopScorer(e){if(!e||!e.name)return"";const t=e.short_name||e.name,a=this._t("team.top_scorer");return U`
      <div class="top-scorer" title="${a}: ${e.name} (${e.value})">
        <span class="ts-label">⚽ ${a}</span>
        <div class="ts-row">
          <span class="ts-name">${t}</span>
          <span class="ts-val">${e.value}<span class="ts-unit">★</span></span>
        </div>
      </div>
    `}_renderForm(e){if(!e||"N/A"===e)return"";const t=String(e).replace(/[^WLDwld]/g,"").toUpperCase();if(!t.length)return"";const a=t.slice(-5).split(""),i=e=>this._t("form."+e);return U`
      <div class="form-pills">
        ${a.map((e=>U`<div class="form-pill ${e}">${i(e)}</div>`))}
      </div>
    `}_renderStatsRow(e){const t=this.hass?.states?.[this._config?.entity]?.attributes?.sport||"",a=e.home_statistics||{},i=e.away_statistics||{},s=[],n=e=>{const t=parseFloat(e);return isNaN(t)?null:t},o=function(e,t,a){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";const o=n(t),r=n(a);if(null===o||null===r)return;const l=o+r,c=l>0?o/l*100:50;s.push(U`
        <div class="stat-bar">
          <div class="stat-bar-label">
            <span class="home-val">${t}${i}</span>
            <span class="label-text">${e}</span>
            <span class="away-val">${a}${i}</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-home" style="width: ${c.toFixed(1)}%;"></div>
            <div class="stat-bar-away" style="width: ${(100-c).toFixed(1)}%;"></div>
          </div>
        </div>
      `)};t&&"soccer"!==t&&"rugby"!==t||(o(this._t("team.possession"),a.possessionPct,i.possessionPct,"%"),o(this._t("team.shots"),a.totalShots,i.totalShots),o(this._t("team.on_target"),a.shotsOnTarget,i.shotsOnTarget));const r=n(e.home_win_probability),l=n(e.away_win_probability);null!==r&&null!==l&&r+l>0&&s.push(U`
        <div class="stat-bar">
          <div class="stat-bar-label">
            <span class="home-val">${Math.round(r)}%</span>
            <span class="label-text">${this._t("team.win_prob")}</span>
            <span class="away-val">${Math.round(l)}%</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-home" style="width: ${r.toFixed(1)}%;"></div>
            <div class="stat-bar-away" style="width: ${l.toFixed(1)}%;"></div>
          </div>
        </div>
      `);const c=parseInt(e.home_timeouts,10),d=parseInt(e.away_timeouts,10);if(!isNaN(c)&&!isNaN(d)){const e=(e,t)=>Array.from({length:3},((a,i)=>U`<span class="timeout-dot ${t} ${i<e?"active":"spent"}"></span>`));s.push(U`
        <div class="stat-bar stat-bar-timeouts">
          <div class="stat-bar-label">
            <span class="home-val timeout-dots">${e(c,"home")}</span>
            <span class="label-text">${this._t("team.timeouts")}</span>
            <span class="away-val timeout-dots">${e(d,"away")}</span>
          </div>
        </div>
      `)}return 0===s.length?"":U`<div class="stats-row">${s}</div>`}render(){if(!this.hass||!this._config)return U``;const e=this._config.entity,t=this.hass.states[e];if(!t)return U`<ha-card class="empty">${this._t("generic.unknown_entity")}: ${e}</ha-card>`;if(!t.attributes.matches||0===t.attributes.matches.length)return U`<ha-card class="empty">${this._t("generic.no_match")}</ha-card>`;const a=t.attributes.matches[0],i="in"===a.state,s="post"===a.state,n=i||s,o=a.league_name&&"N/A"!==a.league_name?a.league_name:a.season_info&&"N/A"!==a.season_info&&this._shouldShowPhase(a.season_info)?this._translatePhase(a.season_info):"",r=a.venue&&"N/A"!==a.venue?a.venue:"",l=a.venue_city&&"N/A"!==a.venue_city?a.venue_city:"",c=r?l?`${r}, ${l}`:r:"—",d=this._getBroadcast(a),p=parseInt(a.attendance,10),h=!isNaN(p)&&p>0;return U`
      <ha-card class="${i?"live":""}">
        <div class="bg-logos">
          <div class="bg-logo home"><img src="${a.home_logo}" alt="" loading="lazy"></div>
          <div class="bg-logo away"><img src="${a.away_logo}" alt="" loading="lazy"></div>
        </div>
        <div class="hero-bg"></div>

        ${this.showEventToasts&&this._toastVisible?U`
          <div class="event-toast variant-${this._toastVariant}" .innerHTML=${this._toastMessage}></div>
        `:""}

        ${this.hideHeader?"":U`<div class="top-bar">
          <div class="competition">
            <span class="comp-icon">${this._sportIcon()}</span>
            <span class="comp-name">${o||" "}</span>
          </div>
          ${this._renderStatusBadge(a)}
        </div>`}

        <div class="scoreboard">
          <div class="team-side home">
            <div class="team-logo-wrap">
              <img class="team-logo-big" src="${a.home_logo}" alt="${a.home_team}" />
            </div>
            <div class="team-name-big">${a.home_team}</div>
            ${this.hideRecords?"":this._renderRecord(a.home_record)}
            ${this.hideForm?"":this._renderForm(a.home_form)}
            ${i||this.hideTopScorer?"":this._renderTopScorer(a.home_top_scorer)}
          </div>

          <div class="score-center">
            ${n?U`<div class="score-numbers">${a.home_score} <span class="dash">-</span> ${a.away_score}</div>`:U`<div class="score-vs">VS</div>`}
            ${this._renderClock(a)}
          </div>

          <div class="team-side away">
            <div class="team-logo-wrap">
              <img class="team-logo-big" src="${a.away_logo}" alt="${a.away_team}" />
            </div>
            <div class="team-name-big">${a.away_team}</div>
            ${this.hideRecords?"":this._renderRecord(a.away_record)}
            ${this.hideForm?"":this._renderForm(a.away_form)}
            ${i||this.hideTopScorer?"":this._renderTopScorer(a.away_top_scorer)}
          </div>
        </div>

        ${i?this._renderStatsRow(a):""}

        <div class="meta-row">
          ${this.hideVenue?"":U`<div class="meta-item venue-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${c}</span>
          </div>`}
          ${n?U`<button class="info-btn" @click="${()=>this.showDetails(a)}">${this._t("team.details")} ›</button>`:U`
              <div class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>${a.date||""}</span>
              </div>
            `}
        </div>

        ${d||h?U`
          <div class="extras-row">
            ${d?U`
              <div class="extra-chip broadcast">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="13" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
                <span>${d}</span>
              </div>
            `:""}
            ${h?U`
              <div class="extra-chip attendance">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                <span>${p.toLocaleString(de(this.hass,this._config))} ${this._t("team.spectators")}</span>
              </div>
            `:""}
          </div>
        `:""}
      </ha-card>
    `}updated(e){(e.has("showPopup")||e.has("activeMatch"))&&this.renderPopupToBody()}renderPopupToBody(){if(!this.showPopup||!this.activeMatch)return void ve("sports-live-team-popup");const e=this.activeMatch,t=e=>this._t(e),a=me("sports-live-team-popup","light"===ge(this._config),(()=>{this.showPopup=!1})),i=e.home_statistics||{},s=(e,a)=>`\n      <div style="background:var(--p-panel); padding:14px; border-radius:14px;">\n        <div style="font-size:10px; text-transform:uppercase; letter-spacing:0.1em; color:var(--p-sub); font-weight:700; margin-bottom:6px;">${e}</div>\n        <div style="font-size:13px;"><span style="color:var(--p-sub);">${t("team.possession")}:</span> <strong>${a?.possessionPct??"—"}%</strong></div>\n        <div style="font-size:13px;"><span style="color:var(--p-sub);">${t("team.shots")}:</span> <strong>${a?.totalShots??"—"}</strong></div>\n        <div style="font-size:13px;"><span style="color:var(--p-sub);">${t("team.on_target")}:</span> <strong>${a?.shotsOnTarget??"—"}</strong></div>\n        <div style="font-size:13px;"><span style="color:var(--p-sub);">${t("team.fouls")}:</span> <strong>${a?.foulsCommitted??"—"}</strong></div>\n      </div>`,n=null!=i.possessionPct||null!=i.totalShots||null!=i.shotsOnTarget?`\n        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px;">\n          ${s(e.home_team,e.home_statistics)}\n          ${s(e.away_team,e.away_statistics)}\n        </div>`:"";a.innerHTML=`\n      <div style="background:var(--p-bg);padding:24px;border-radius:20px;width:90%;max-width:560px;max-height:85vh;overflow-y:auto;border:1px solid var(--p-border);box-shadow:0 24px 64px rgba(0,0,0,0.6);margin:auto;color:var(--p-text);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;">\n        <h3 style="margin:0 0 20px;font-size:22px;font-weight:800;letter-spacing:-0.02em;background:linear-gradient(135deg,#6366f1,#ec4899);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">${fe(t("popup.match_details"))}</h3>\n        <div style="display:flex;justify-content:center;align-items:center;gap:18px;margin-bottom:24px;">\n          <img style="width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));" src="${fe(e.home_logo)}" alt="${fe(e.home_team)}" />\n          <div style="text-align:center;">\n            <div style="font-size:42px;font-weight:900;letter-spacing:-0.04em;line-height:1;">${fe(e.home_score??"-")} <span style="opacity:0.4;">-</span> ${fe(e.away_score??"-")}</div>\n            <div style="font-size:12px;color:var(--p-sub);margin-top:8px;font-weight:600;">${fe(e.clock??e.status??"")}</div>\n          </div>\n          <img style="width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));" src="${fe(e.away_logo)}" alt="${fe(e.away_team)}" />\n        </div>\n        ${n}\n        <div id="team-events-container"></div>\n        <button id="popup-close-btn" style="background:linear-gradient(135deg,#6366f1,#ec4899);color:white;padding:12px 20px;border:none;border-radius:12px;cursor:pointer;margin-top:20px;font-weight:800;width:100%;font-size:14px;">${fe(t("generic.close"))}</button>\n      </div>\n    `;const o=a.querySelector("#popup-close-btn");o&&(o.onclick=()=>{this.showPopup=!1});const r=a.querySelector("#team-events-container"),{goals:l,yellowCards:c,redCards:d,tries:p,conversions:h,penaltyGoals:g,dropGoals:u}=this.separateEvents(e.match_details||[]),f=(e,t,a)=>t.length?`<div style="margin-bottom:14px; padding:14px; background:${a.bg}; border-left:3px solid ${a.border}; border-radius:10px;">\n        <h5 style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:${a.border}; font-weight:800;">${fe(e)}</h5>\n        <ul style="margin:0; padding-left:18px; font-size:13px; color:var(--p-text);">${t.map((e=>`<li style="margin:4px 0;">${fe(e)}</li>`)).join("")}</ul>\n      </div>`:"";let m="";m+=f(t("event.goal"),l,{bg:"rgba(99,102,241,0.1)",border:"#6366f1"}),m+=f(t("event.yellow_card"),c,{bg:"rgba(245,158,11,0.1)",border:"#f59e0b"}),m+=f(t("event.red_card"),d,{bg:"rgba(239,68,68,0.1)",border:"#ef4444"}),m+=f(t("event.try"),p,{bg:"rgba(16,185,129,0.1)",border:"#10b981"}),m+=f(t("event.conversion"),h,{bg:"rgba(16,185,129,0.07)",border:"#34d399"}),m+=f(t("event.penalty_goal"),g,{bg:"rgba(251,191,36,0.1)",border:"#fbbf24"}),m+=f(t("event.drop_goal"),u,{bg:"rgba(99,102,241,0.07)",border:"#818cf8"});const v=e.scoring_plays||[];if(v.length){const e=v.slice().reverse().slice(0,12).map((e=>`\n        <li style="display:grid; grid-template-columns:auto 1fr auto; gap:10px; align-items:start; padding:5px 0; border-bottom:1px solid var(--p-border); font-size:12px;">\n          <span style="font-weight:700; color:var(--p-sub); font-variant-numeric:tabular-nums; white-space:nowrap;">${fe([e.period,e.clock].filter(Boolean).join(" "))}</span>\n          <span style="color:var(--p-text);">${fe(e.text||"")}</span>\n          <span style="font-weight:800; color:var(--p-text); white-space:nowrap; font-variant-numeric:tabular-nums;">${fe(String(e.home_score??""))}-${fe(String(e.away_score??""))}</span>\n        </li>`)).join("");m+=`<div style="margin-bottom:14px; padding:14px; background:rgba(99,102,241,0.1); border-left:3px solid #6366f1; border-radius:10px;">\n        <h5 style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#818cf8; font-weight:800;">${fe(t("popup.scoring_plays"))}</h5>\n        <ul style="margin:0; padding:0; list-style:none;">${e}</ul>\n      </div>`}const b=e.stat_leaders||[];if(b.length){const e=e=>`\n        <div style="flex:1; min-width:0;">\n          <div style="font-size:10px; text-transform:uppercase; letter-spacing:0.08em; color:var(--p-sub); font-weight:800; margin-bottom:6px;">${fe(e.team_name||"")}</div>\n          ${(e.categories||[]).slice(0,4).map((e=>`<div style="font-size:12px; color:var(--p-text); margin:3px 0;"><span style="color:var(--p-sub);">${fe(e.display_name)}:</span> ${fe(e.short_name||e.athlete)} <strong>${fe(String(e.value))}</strong></div>`)).join("")}\n        </div>`;m+=`<div style="margin-bottom:14px; padding:14px; background:rgba(251,191,36,0.08); border-left:3px solid #fbbf24; border-radius:10px;">\n        <h5 style="margin:0 0 10px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#fbbf24; font-weight:800;">${fe(t("popup.stat_leaders"))}</h5>\n        <div style="display:flex; gap:16px;">${b.slice(0,2).map(e).join("")}</div>\n      </div>`}const _=e.lineup_home||[],x=e.lineup_away||[];if(_.length||x.length){const a=e.formation_home||"",i=e.formation_away||"",s=(e,t,a)=>{const i=(e||[]).filter((e=>e.starter));return i.length?`<div style="margin-bottom:8px;">\n          <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px;">\n            <span style="font-size:12px; font-weight:800; color:var(--p-text);">${fe(a)}</span>\n            ${t?`<span style="font-size:10px; font-weight:700; color:#6366f1; letter-spacing:0.1em;">${fe(t)}</span>`:""}\n          </div>\n          <div style="font-size:12px; color:var(--p-text); line-height:1.7;">\n            ${i.map((e=>`<span style="display:inline-block; padding:2px 8px; background:var(--p-panel); border-radius:6px; margin:2px;">${e.jersey?`<strong style="color:#fbbf24;">${fe(String(e.jersey))}</strong> `:""}${fe(e.short_name||e.name)}</span>`)).join("")}\n          </div>\n        </div>`:""};m+=`<div style="margin-bottom:14px; padding:14px; background:rgba(16,185,129,0.08); border-left:3px solid #10b981; border-radius:10px;">\n        <h5 style="margin:0 0 10px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#10b981; font-weight:800;">${fe(t("popup.lineups"))}</h5>\n        ${s(_,a,e.home_team)}\n        ${s(x,i,e.away_team)}\n      </div>`}const y=e.key_events||[];if(y.length){const e=e=>{const t=(e.type||"").toLowerCase(),a=(e.type_text||"").toLowerCase();return"goal"===t||e.scoring_play?"⚽":a.includes("yellow")?"🟨":a.includes("red")?"🟥":"substitution"===t?"🔄":a.includes("halftime")?"⏸":a.includes("kickoff")?"▶":a.includes("end")?"🏁":"·"};m+=`<div style="margin-bottom:14px; padding:14px; background:rgba(251,191,36,0.08); border-left:3px solid #fbbf24; border-radius:10px;">\n        <h5 style="margin:0 0 10px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#fbbf24; font-weight:800;">${fe(t("popup.timeline"))}</h5>\n        <ul style="margin:0; padding:0; list-style:none;">\n          ${y.map((t=>`<li style="display:grid; grid-template-columns:36px 24px 1fr; gap:8px; align-items:start; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:12px; color:var(--p-text);">\n            <span style="text-align:right; font-weight:700; color:var(--p-sub); font-variant-numeric:tabular-nums;">${fe(t.clock||"")}</span>\n            <span style="text-align:center;">${e(t)}</span>\n            <span><strong style="color:var(--p-text);">${fe((t.athletes||[]).filter(Boolean).join(", ")||t.type_text||"")}</strong>${t.team?`<br><span style="color:var(--p-sub); font-size:11px;">${fe(t.team)}</span>`:""}</span>\n          </li>`)).join("")}\n        </ul>\n      </div>`}const w=e.head_to_head||[];w.length&&(m+=`<div style="margin-bottom:14px; padding:14px; background:rgba(99,102,241,0.08); border-left:3px solid #6366f1; border-radius:10px;">\n        <h5 style="margin:0 0 10px; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#6366f1; font-weight:800;">${fe(t("popup.h2h"))} (${w.length})</h5>\n        <ul style="margin:0; padding:0; list-style:none;">\n          ${w.slice(0,8).map((e=>{const t=e.date?new Date(e.date).toLocaleDateString(de(this.hass,this._config)):"";return`<li style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:12px; color:var(--p-text);">\n              <span>${fe(e.home_team)} <strong>${fe(String(e.home_score??"-"))}</strong> - <strong>${fe(String(e.away_score??"-"))}</strong> ${fe(e.away_team)}</span>\n              <span style="color:var(--p-sub);">${fe(t)}</span>\n            </li>`})).join("")}\n        </ul>\n      </div>`),r.innerHTML=m||`<p style="text-align:center; color:var(--p-sub); font-size:13px;">${fe(t("popup.no_events"))}</p>`}static get styles(){return[he,n`
      :host {
        --cl-accent: #6366f1;
        --cl-accent-2: #ec4899;
        --cl-live: #ef4444;
        --cl-live-glow: rgba(239,68,68,0.5);
        --cl-green: #10b981;
        --cl-gold: #fbbf24;
        --cl-gold-text: #fde047;
        --cl-card-2: rgba(255,255,255,0.05);
        --cl-divider: rgba(255,255,255,0.08);
        --cl-glass-border: rgba(255,255,255,0.08);
      }

      ha-card {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        padding: 0;
        box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        background: var(--cl-bg);
        color: var(--cl-text);
      }
      ha-card.empty {
        padding: 24px;
        text-align: center;
        color: var(--cl-text-2);
      }

      .bg-logos {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
      }
      .bg-logo {
        width: 60%;
        height: 140%;
        display: flex;
        align-items: center;
        opacity: 0.09;
      }
      .bg-logo.home {
        justify-content: flex-start;
        transform: translateX(-30%);
      }
      .bg-logo.away {
        justify-content: flex-end;
        transform: translateX(30%);
      }
      .bg-logo img {
        width: 100%;
        object-fit: contain;
      }

      .hero-bg {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.20), transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(236,72,153,0.20), transparent 50%);
        pointer-events: none;
        z-index: 1;
      }
      ha-card.live .hero-bg {
        background:
          radial-gradient(ellipse at 0% 0%, rgba(239,68,68,0.25), transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(251,191,36,0.20), transparent 50%);
        animation: hero-pulse 3s ease-in-out infinite;
      }
      @keyframes hero-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      .top-bar, .scoreboard, .stats-row, .meta-row {
        position: relative;
        z-index: 2;
      }

      .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 18px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .competition {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 12px;
        font-weight: 700;
        color: var(--cl-text);
        letter-spacing: -0.01em;
        min-width: 0;
      }
      .comp-icon {
        flex-shrink: 0;
        width: 24px; height: 24px;
        border-radius: 8px;
        background: linear-gradient(135deg, var(--cl-accent), var(--cl-accent-2));
        display: flex; align-items: center; justify-content: center;
        font-size: 12px;
        box-shadow: 0 2px 8px rgba(99,102,241,0.4);
      }
      .comp-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status-badge {
        flex-shrink: 0;
        padding: 5px 11px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .status-badge.live {
        background: linear-gradient(135deg, var(--cl-live), #f97316);
        color: white;
        box-shadow: 0 4px 16px var(--cl-live-glow);
        animation: badge-pulse 2s ease-in-out infinite;
      }
      .status-badge.live .dot {
        width: 6px; height: 6px; border-radius: 50%; background: white;
        animation: pulse-dot 1.2s ease-in-out infinite;
      }
      .status-badge.finished {
        background: linear-gradient(135deg, var(--cl-green), #059669);
        color: white;
      }
      .status-badge.scheduled {
        background: var(--cl-card-2);
        border: 1px solid var(--cl-glass-border);
        color: var(--cl-text);
      }
      @keyframes badge-pulse {
        0%, 100% { box-shadow: 0 4px 16px var(--cl-live-glow); }
        50% { box-shadow: 0 4px 24px var(--cl-live-glow), 0 0 32px var(--cl-live-glow); }
      }
      @keyframes pulse-dot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(0.7); }
      }

      .scoreboard {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 10px;
        padding: 28px 18px 22px;
      }
      .team-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        text-align: center;
        min-width: 0;
      }
      .team-logo-wrap {
        position: relative;
        width: 80px; height: 80px;
        display: flex; align-items: center; justify-content: center;
      }
      .team-logo-wrap::before {
        content: '';
        position: absolute;
        inset: -8px;
        background: radial-gradient(circle, rgba(99,102,241,0.22), transparent 70%);
        border-radius: 50%;
        animation: logo-glow 4s ease-in-out infinite;
      }
      .team-logo-big {
        position: relative;
        width: 72px; height: 72px;
        object-fit: contain;
        filter: drop-shadow(0 6px 16px rgba(0,0,0,0.25));
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .team-side:hover .team-logo-big { transform: scale(1.1) rotate(-3deg); }
      @keyframes logo-glow {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.15); }
      }
      .team-name-big {
        font-size: 13px;
        font-weight: 700;
        line-height: 1.2;
        max-width: 110px;
        letter-spacing: -0.01em;
        color: var(--cl-text);
      }
      .form-pills {
        display: flex; gap: 3px;
        padding: 3px 7px;
        background: var(--cl-card-2);
        border: 1px solid var(--cl-glass-border);
        border-radius: 999px;
      }
      .record {
        display: flex; gap: 4px;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.04em;
      }
      .record .rec {
        padding: 2px 6px;
        border-radius: 4px;
        font-variant-numeric: tabular-nums;
      }
      .record .rec-w { background: rgba(16,185,129,0.18); color: var(--cl-green); }
      .record .rec-d { background: rgba(245,158,11,0.18); color: #f59e0b; }
      .record .rec-l { background: rgba(239,68,68,0.18); color: var(--cl-live); }
      .top-scorer {
        display: inline-flex;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
        padding: 5px 9px 6px;
        background: var(--cl-card-2);
        border: 1px solid var(--cl-glass-border);
        border-radius: 10px;
        font-size: 10px;
        font-weight: 700;
        color: var(--cl-text-2);
        max-width: 150px;
      }
      .top-scorer .ts-label {
        font-size: 8px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--cl-gold);
        text-align: center;
        line-height: 1;
      }
      .top-scorer .ts-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      .top-scorer .ts-name {
        max-width: 90px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--cl-text);
        font-size: 11px;
        font-weight: 700;
      }
      .top-scorer .ts-val {
        display: inline-flex;
        align-items: baseline;
        gap: 1px;
        color: var(--cl-gold);
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        font-size: 12px;
      }
      .top-scorer .ts-unit {
        font-size: 9px;
        opacity: 0.85;
      }
      .form-pill {
        width: 14px; height: 14px;
        border-radius: 4px;
        font-size: 8px;
        font-weight: 800;
        color: white;
        display: flex; align-items: center; justify-content: center;
      }
      .form-pill.W { background: linear-gradient(135deg, #10b981, #059669); }
      .form-pill.L { background: linear-gradient(135deg, #ef4444, #dc2626); }
      .form-pill.D { background: linear-gradient(135deg, #f59e0b, #d97706); }

      .score-center {
        display: flex; flex-direction: column;
        align-items: center; gap: 8px;
        padding: 0 4px;
      }
      .score-numbers {
        font-size: 48px;
        font-weight: 900;
        letter-spacing: -0.04em;
        font-variant-numeric: tabular-nums;
        line-height: 0.95;
        background: linear-gradient(180deg, var(--cl-text) 30%, var(--cl-accent));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: score-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
      }
      .score-numbers .dash {
        opacity: 0.4;
        font-weight: 700;
        margin: 0 4px;
      }
      /* score_size: big / huge — ingrandisce il punteggio */
      :host([data-score="big"]) .score-numbers { font-size: 68px; }
      :host([data-score="huge"]) .score-numbers { font-size: 92px; }
      :host([data-score="big"]) .score-vs { font-size: 38px; }
      :host([data-score="huge"]) .score-vs { font-size: 48px; }
      .score-vs {
        font-size: 30px;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: var(--cl-text-2);
        opacity: 0.6;
      }
      @keyframes score-pop {
        0% { opacity: 0; transform: scale(0.5); }
        70% { transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
      }
      .clock {
        font-size: 11px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        display: inline-flex; align-items: center; gap: 5px;
        padding: 4px 10px;
        border-radius: 999px;
        color: var(--cl-live);
        background: rgba(239,68,68,0.12);
      }
      .clock .dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: currentColor;
        animation: pulse-dot 1.4s ease-in-out infinite;
      }
      .clock.upcoming {
        color: var(--cl-accent);
        background: rgba(99,102,241,0.12);
      }
      .clock.upcoming .dot, .clock.finished .dot { animation: none; }
      .clock.finished {
        color: var(--cl-green);
        background: rgba(16,185,129,0.12);
      }

      .stats-row {
        padding: 0 18px 18px;
        display: flex; flex-direction: column; gap: 10px;
      }
      .stat-bar { display: flex; flex-direction: column; gap: 4px; }
      .stat-bar-label {
        display: flex; justify-content: space-between;
        font-size: 11px; font-weight: 700;
      }
      .stat-bar-label .home-val { color: var(--cl-accent); }
      .stat-bar-label .away-val { color: var(--cl-accent-2); }
      .stat-bar-label .label-text {
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 9px;
        color: var(--cl-text-2);
      }
      .stat-bar-track {
        height: 6px;
        background: var(--cl-card-2);
        border-radius: 999px;
        overflow: hidden;
        display: flex;
      }
      .stat-bar-home {
        height: 100%;
        background: linear-gradient(90deg, var(--cl-accent), var(--cl-accent));
        border-radius: 999px 0 0 999px;
        transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .stat-bar-away {
        height: 100%;
        background: linear-gradient(90deg, var(--cl-accent-2), var(--cl-accent-2));
        margin-left: auto;
        border-radius: 0 999px 999px 0;
        transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .stat-bar-timeouts .stat-bar-label {
        align-items: center;
      }
      .timeout-dots {
        display: flex;
        align-items: center;
        gap: 4px;
        min-width: 0;
      }
      .timeout-dot {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .timeout-dot.home.active { background: var(--cl-accent); box-shadow: 0 0 5px var(--cl-accent); }
      .timeout-dot.away.active { background: var(--cl-accent-2); box-shadow: 0 0 5px var(--cl-accent-2); }
      .timeout-dot.spent { background: var(--cl-card-2); border: 1px solid var(--cl-glass-border); }

      .meta-row {
        display: flex; justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 12px 18px;
        border-top: 1px solid var(--cl-divider);
        background: var(--cl-card-2);
      }
      .venue-item { min-width: 0; }
      .venue-item span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .extras-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 8px 18px 12px;
        background: var(--cl-card-2);
        position: relative;
        z-index: 2;
      }
      .extra-chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 10px;
        background: rgba(99,102,241,0.12);
        border: 1px solid rgba(99,102,241,0.25);
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        color: var(--cl-accent);
      }
      .extra-chip svg { width: 12px; height: 12px; }
      .extra-chip.broadcast {
        background: rgba(99,102,241,0.12);
        border-color: rgba(99,102,241,0.3);
        color: var(--cl-accent);
      }
      .extra-chip.attendance {
        background: rgba(16,185,129,0.12);
        border-color: rgba(16,185,129,0.3);
        color: var(--cl-green);
      }
      .meta-item {
        display: flex; align-items: center; gap: 6px;
        color: var(--cl-text-2);
        font-size: 11px;
        font-weight: 600;
      }
      .meta-item svg { width: 14px; height: 14px; opacity: 0.7; }
      .info-btn {
        background: linear-gradient(135deg, var(--cl-accent), var(--cl-accent-2));
        color: white;
        border: none;
        padding: 7px 14px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 12px rgba(99,102,241,0.4);
      }
      .info-btn:hover {
        transform: translateY(-1px) scale(1.04);
        box-shadow: 0 8px 20px rgba(99,102,241,0.6);
      }

      /* Toast */
      .event-toast {
        position: absolute;
        top: 12px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--cl-toast-bg);
        color: #ffffff;
        padding: 10px 18px;
        border-radius: 14px;
        font-size: 13px;
        font-weight: 800;
        z-index: 100;
        animation: toast-bounce 4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        pointer-events: none;
        max-width: 90%;
        text-align: center;
        letter-spacing: -0.01em;
        text-shadow: 0 1px 2px rgba(0,0,0,0.8);
      }
      .event-toast.variant-goal {
        box-shadow:
          0 0 0 2px var(--cl-gold),
          0 0 0 4px rgba(251, 191, 36, 0.3),
          0 12px 40px rgba(0, 0, 0, 0.7),
          0 0 60px rgba(251, 191, 36, 0.4);
      }
      .event-toast.variant-goal strong { color: var(--cl-gold-text); }
      .event-toast.variant-yellow {
        box-shadow:
          0 0 0 2px #f59e0b,
          0 0 0 4px rgba(245, 158, 11, 0.3),
          0 12px 40px rgba(0, 0, 0, 0.7);
      }
      .event-toast.variant-yellow strong { color: #fbbf24; }
      .event-toast.variant-red {
        box-shadow:
          0 0 0 2px var(--cl-live),
          0 0 0 4px rgba(239, 68, 68, 0.3),
          0 12px 40px rgba(0, 0, 0, 0.7);
      }
      .event-toast.variant-red strong { color: #fca5a5; }
      @keyframes toast-bounce {
        0%   { opacity: 0; transform: translate(-50%, -20px) scale(0.7); }
        8%   { opacity: 1; transform: translate(-50%, 0) scale(1.08); }
        14%  { transform: translate(-50%, 0) scale(1); }
        90%  { opacity: 1; transform: translate(-50%, 0) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }
      }

      /* Goal celebration */
      ha-card.goal-flash {
        animation: card-goal-flash 1.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes card-goal-flash {
        0%   { box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
        20%  { box-shadow: 0 0 0 4px var(--cl-accent), 0 0 60px 20px var(--cl-accent), 0 4px 24px rgba(0,0,0,0.15); }
        50%  { box-shadow: 0 0 0 2px var(--cl-accent-2), 0 0 40px 10px var(--cl-accent-2), 0 4px 24px rgba(0,0,0,0.15); }
        100% { box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
      }
      .score-numbers.goal-scored {
        animation: score-goal-pop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      @keyframes score-goal-pop {
        0%   { transform: scale(1); }
        20%  { transform: scale(1.4); filter: drop-shadow(0 0 30px var(--cl-accent)); }
        40%  { transform: scale(0.95); }
        60%  { transform: scale(1.15); }
        100% { transform: scale(1); }
      }
      .team-logo-big.scorer-bounce {
        animation: scorer-bounce 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      @keyframes scorer-bounce {
        0%   { transform: scale(1) rotate(0deg); }
        25%  { transform: scale(1.3) rotate(-15deg); }
        50%  { transform: scale(1.1) rotate(10deg); }
        75%  { transform: scale(1.2) rotate(-5deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
      .goal-banner {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 50;
        overflow: hidden;
      }
      .goal-banner::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at center, var(--cl-overlay-strong) 0%, var(--cl-overlay-soft) 40%, transparent 70%);
        animation: banner-backdrop 1.6s ease-out forwards;
      }
      @keyframes banner-backdrop {
        0%   { opacity: 0; }
        20%  { opacity: 1; }
        80%  { opacity: 1; }
        100% { opacity: 0; }
      }
      .goal-banner-text {
        position: relative;
        font-size: 84px;
        font-weight: 900;
        letter-spacing: -0.06em;
        color: var(--cl-gold-text);
        -webkit-text-stroke: 2px #1a0f00;
        text-shadow:
          0 0 24px rgba(251, 191, 36, 1),
          0 0 48px rgba(251, 191, 36, 0.7),
          0 6px 0 #b45309,
          0 8px 24px rgba(0, 0, 0, 0.6);
        animation: goal-text-blast 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        transform-origin: center;
      }
      @keyframes goal-text-blast {
        0%   { opacity: 0; transform: scale(0.3) rotate(-8deg); }
        20%  { opacity: 1; transform: scale(1.15) rotate(-3deg); }
        40%  { transform: scale(0.95) rotate(2deg); }
        60%  { transform: scale(1.05) rotate(0deg); }
        80%  { opacity: 1; transform: scale(1) rotate(0deg); }
        100% { opacity: 0; transform: scale(1.3) rotate(0deg); }
      }
      .goal-flash-overlay {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(251,191,36,0.25), transparent 70%);
        pointer-events: none;
        z-index: 49;
        animation: flash-overlay 1s ease-out forwards;
      }
      @keyframes flash-overlay {
        0%   { opacity: 0; }
        20%  { opacity: 1; }
        100% { opacity: 0; }
      }
      .confetti {
        position: absolute;
        top: 20px; left: 50%;
        width: 8px; height: 8px;
        pointer-events: none;
        z-index: 99;
        animation: confetti-fly 1.8s ease-out forwards;
      }
      @keyframes confetti-fly {
        0% {
          transform: translate(-50%, 0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translate(calc(-50% + var(--dx)), var(--dy)) rotate(720deg);
          opacity: 0;
        }
      }
    `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"sports-live-team",name:"Sports Live Team",description:"Next match and live score for a tracked team."}),customElements.define("sports-live-team-editor",class extends oe{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array}}}constructor(){super(),this.entities=[]}static get styles(){return n`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      label {
        font-size: 14px;
        color: var(--primary-text-color);
      }
      .field-label {
        display: block;
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
        font-weight: 600;
      }
      select {
        width: 100%;
        padding: 10px 12px;
        font-size: 14px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        box-sizing: border-box;
      }
      select:focus {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: -1px;
      }
      h3 {
        margin: 8px 0 0;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
      }
    `}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}get config(){return this._config}updated(e){e.has("hass")&&this._fetchEntities()}_fireConfigChanged(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this.requestUpdate()}_entityChanged(e){if(!this._config)return;const t=e.target.value;t!==this._config.entity&&this._fireConfigChanged({...this._config,entity:t})}_switchChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.checked;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_selectChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.value;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_fetchEntities(){this.hass&&(this.entities=Object.keys(this.hass.states).filter((e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e]?.attributes;return void 0!==t?.sport&&Array.isArray(t?.matches)})).sort())}render(){if(!this._config||!this.hass)return U``;const e=this._config.entity||"",t=e&&this.entities.includes(e);return U`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity</label>
          <select @change=${this._entityChanged}>
            ${t?"":U`<option value="${e}" selected>${e||"— select —"}</option>`}
            ${this.entities.map((t=>U`
              <option value="${t}" ?selected=${t===e}>${t}</option>
            `))}
          </select>
        </div>

        <h3>Settings</h3>
        <div class="option">
          <label>Hide Header</label>
          <ha-switch
            .checked=${!0===this._config.hide_header}
            data-config-value="hide_header"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Show Event Toasts (in-card)</label>
          <ha-switch
            .checked=${!0===this._config.show_event_toasts}
            data-config-value="show_event_toasts"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Hide Venue</label>
          <ha-switch
            .checked=${!0===this._config.hide_venue}
            data-config-value="hide_venue"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Hide Form Badges</label>
          <ha-switch
            .checked=${!0===this._config.hide_form}
            data-config-value="hide_form"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Hide W/D/L Records</label>
          <ha-switch
            .checked=${!0===this._config.hide_records}
            data-config-value="hide_records"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Hide Top Scorer</label>
          <ha-switch
            .checked=${!0===this._config.hide_top_scorer}
            data-config-value="hide_top_scorer"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div>
          <label class="field-label">TV Broadcast Region</label>
          <select data-config-value="broadcast_region" @change=${this._selectChanged}>
            <option value="uk" ?selected=${"uk"===(this._config.broadcast_region||"uk")}>UK (default)</option>
            <option value="us" ?selected=${"us"===this._config.broadcast_region}>US</option>
            <option value="both" ?selected=${"both"===this._config.broadcast_region}>Both</option>
          </select>
        </div>
        <div>
          <label class="field-label">Skin</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            <option value="dark" ?selected=${"dark"===(this._config.skin||"dark")}>Dark</option>
            <option value="light" ?selected=${"light"===this._config.skin}>Light</option>
          </select>
        </div>
        <div>
          <label class="field-label">Score Size</label>
          <select data-config-value="score_size" @change=${this._selectChanged}>
            <option value="normal" ?selected=${"normal"===(this._config.score_size||"normal")}>Normal</option>
            <option value="big" ?selected=${"big"===this._config.score_size}>Big</option>
            <option value="huge" ?selected=${"huge"===this._config.score_size}>Huge</option>
          </select>
        </div>
        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            <option value="" ?selected=${!this._config.language}>Auto (HA locale)</option>
            <option value="en" ?selected=${"en"===this._config.language}>English</option>
            <option value="it" ?selected=${"it"===this._config.language}>Italiano</option>
            <option value="fr" ?selected=${"fr"===this._config.language}>Français</option>
            <option value="es" ?selected=${"es"===this._config.language}>Español</option>
            <option value="nl" ?selected=${"nl"===this._config.language}>Nederlands</option>
          </select>
        </div>
      </div>
    `}}),customElements.define("sports-live-news",class extends oe{static get properties(){return{hass:{},_config:{}}}setConfig(e){if(!e.entity)throw new Error("Entity required");this._config=e,ue(this,e),this.maxArticles=e.max_articles?e.max_articles:5,this.hideHeader=!0===e.hide_header,this.hideImages=!0===e.hide_images,this.hideDescription=!0===e.hide_description}_t(e,t){return pe(e,de(this.hass,this._config),t)}getCardSize(){return 4}static getConfigElement(){return document.createElement("sports-live-news-editor")}static getStubConfig(){return{entity:"",max_articles:5,hide_header:!1,hide_images:!1}}_formatDate(e){if(!e)return"";try{const t=new Date(e),a=(new Date-t)/1e3;if(a<60)return this._t("time.now");if(a<3600)return this._t("time.n_min_ago",{n:Math.floor(a/60)});if(a<86400)return this._t("time.n_h_ago",{n:Math.floor(a/3600)});if(a<604800)return this._t("time.n_d_ago",{n:Math.floor(a/86400)});const i=this._t("month."+(t.getMonth()+1));return`${t.getDate()} ${i}`}catch(e){return""}}_openLink(e){e&&window.open(e,"_blank","noopener,noreferrer")}render(){if(!this.hass||!this._config)return U``;const e=this.hass.states[this._config.entity];if(!e)return U`<ha-card class="empty">${this._t("generic.unknown_entity")}: ${this._config.entity}</ha-card>`;const t=(e.attributes.articles||[]).slice(0,this.maxArticles);return 0===t.length?U`<ha-card class="empty">${this._t("news.empty")}</ha-card>`:U`
      <ha-card>
        <div class="hero-bg"></div>
        ${this.hideHeader?"":U`
          <div class="news-header">
            <div class="header-icon">📰</div>
            <div class="header-text">
              <div class="title">${this._t("card.news")}</div>
              <div class="subtitle">${e.state}</div>
            </div>
          </div>
        `}
        <div class="news-list">
          ${t.map((e=>U`
            <article class="news-item ${this.hideImages||!e.image?"no-img":""}" @click="${()=>this._openLink(e.link)}">
              ${!this.hideImages&&e.image?U`
                <div class="news-img" style="background-image: url('${e.image}');"></div>
              `:""}
              <div class="news-body">
                <div class="news-meta">
                  ${e.category?U`<span class="cat">${e.category}</span>`:""}
                  <span class="date">${this._formatDate(e.published)}</span>
                </div>
                <div class="news-headline">${e.headline}</div>
                ${!this.hideDescription&&e.description?U`<div class="news-desc">${e.description}</div>`:""}
              </div>
            </article>
          `))}
        </div>
      </ha-card>
    `}static get styles(){return[he,n`
      :host {
        --cl-accent: #6366f1;
        --cl-accent-2: #ec4899;
        --cl-card-2: rgba(255,255,255,0.05);
        --cl-divider: rgba(255,255,255,0.08);
      }
      ha-card {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        padding: 0;
        box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        background: var(--cl-bg);
        color: var(--cl-text);
      }
      ha-card.empty {
        padding: 24px;
        text-align: center;
        color: var(--cl-text-2);
      }
      .hero-bg {
        position: absolute; inset: 0; z-index: 0;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(236,72,153,0.10), transparent 50%),
          radial-gradient(ellipse at 100% 0%, rgba(99,102,241,0.10), transparent 50%);
        pointer-events: none;
      }
      .news-header {
        position: relative; z-index: 1;
        display: flex; align-items: center; gap: 12px;
        padding: 16px 18px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .news-header::after {
        content: '';
        position: absolute;
        left: 18px; right: 18px; bottom: -1px;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--cl-accent-2), transparent);
        opacity: 0.4;
      }
      .header-icon {
        width: 40px; height: 40px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--cl-accent), var(--cl-accent-2));
        display: flex; align-items: center; justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 16px rgba(236,72,153,0.4);
      }
      .header-text .title {
        font-size: 18px;
        font-weight: 900;
        letter-spacing: -0.02em;
        color: var(--cl-text);
      }
      .header-text .subtitle {
        font-size: 11px;
        color: var(--cl-text-2);
        margin-top: 2px;
        font-weight: 600;
      }

      .news-list {
        position: relative; z-index: 1;
        display: flex; flex-direction: column;
        padding: 6px;
      }
      .news-item {
        display: grid;
        grid-template-columns: 96px 1fr;
        gap: 14px;
        padding: 12px;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .news-item.no-img {
        grid-template-columns: 1fr;
      }
      .news-item:hover {
        background: var(--cl-card-2);
        transform: translateX(3px);
      }
      .news-img {
        width: 96px;
        height: 72px;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        background-color: var(--cl-card-2);
        flex-shrink: 0;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      }
      .news-body {
        display: flex; flex-direction: column;
        gap: 4px;
        min-width: 0;
      }
      .news-meta {
        display: flex; gap: 8px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--cl-text-2);
      }
      .news-meta .cat {
        color: var(--cl-accent);
      }
      .news-meta .date::before {
        content: '·';
        margin-right: 8px;
        opacity: 0.4;
      }
      .news-meta .cat + .date::before { content: '·'; }
      .news-headline {
        font-size: 14px;
        font-weight: 800;
        line-height: 1.3;
        color: var(--cl-text);
        letter-spacing: -0.01em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .news-desc {
        font-size: 12px;
        font-weight: 500;
        color: var(--cl-text-2);
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"sports-live-news",name:"Sports Live News",description:"Latest news feed for any sport competition."}),customElements.define("sports-live-news-editor",class extends oe{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array}}}constructor(){super(),this.entities=[]}static get styles(){return n`
      .card-config { display: flex; flex-direction: column; gap: 16px; }
      .option { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      label { font-size: 14px; color: var(--primary-text-color); }
      .field-label { display: block; font-size: 12px; color: var(--secondary-text-color); margin-bottom: 4px; font-weight: 600; }
      select, input[type="number"] {
        width: 100%; padding: 10px 12px; font-size: 14px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        box-sizing: border-box;
      }
      h3 { margin: 8px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary-text-color); }
    `}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}get config(){return this._config}updated(e){e.has("hass")&&this._fetchEntities()}_fireConfigChanged(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this.requestUpdate()}_entityChanged(e){if(!this._config)return;const t=e.target.value;t!==this._config.entity&&this._fireConfigChanged({...this._config,entity:t})}_switchChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.checked;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_selectChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.value;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_numberChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=parseInt(t.value,10);isNaN(i)||this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_fetchEntities(){this.hass&&(this.entities=Object.keys(this.hass.states).filter((e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e]?.attributes;return void 0!==t?.sport&&Array.isArray(t?.articles)})).sort())}render(){if(!this._config||!this.hass)return U``;const e=this._config.entity||"",t=e&&this.entities.includes(e);return U`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity (news sensor)</label>
          <select @change=${this._entityChanged}>
            ${t?"":U`<option value="${e}" selected>${e||"— select —"}</option>`}
            ${this.entities.map((t=>U`<option value="${t}" ?selected=${t===e}>${t}</option>`))}
          </select>
        </div>

        <h3>Settings</h3>
        <div class="option">
          <label>Hide Header</label>
          <ha-switch
            .checked=${!0===this._config.hide_header}
            data-config-value="hide_header"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Hide Images</label>
          <ha-switch
            .checked=${!0===this._config.hide_images}
            data-config-value="hide_images"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Hide Descriptions</label>
          <ha-switch
            .checked=${!0===this._config.hide_description}
            data-config-value="hide_description"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div>
          <label class="field-label">Max Articles</label>
          <input type="number" min="1" max="20"
            .value=${this._config.max_articles||5}
            data-config-value="max_articles"
            @change=${this._numberChanged} />
        </div>
        <div>
          <label class="field-label">Skin</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            <option value="dark" ?selected=${"dark"===(this._config.skin||"dark")}>Dark</option>
            <option value="light" ?selected=${"light"===this._config.skin}>Light</option>
          </select>
        </div>
        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            <option value="" ?selected=${!this._config.language}>Auto (HA locale)</option>
            <option value="en" ?selected=${"en"===this._config.language}>English</option>
            <option value="it" ?selected=${"it"===this._config.language}>Italiano</option>
            <option value="fr" ?selected=${"fr"===this._config.language}>Français</option>
            <option value="es" ?selected=${"es"===this._config.language}>Español</option>
            <option value="nl" ?selected=${"nl"===this._config.language}>Nederlands</option>
          </select>
        </div>
      </div>
    `}}),customElements.define("sports-live-lineup",class extends oe{static get properties(){return{hass:{},_config:{}}}setConfig(e){if(!e.entity)throw new Error("Entity required");this._config=e,ue(this,e),this.hideHeader=!0===e.hide_header,this.showBench=!1!==e.show_bench,this.showPhotos=!1!==e.show_photos}_t(e,t){return pe(e,de(this.hass,this._config),t)}getCardSize(){return 6}static getConfigElement(){return document.createElement("sports-live-lineup-editor")}static getStubConfig(){return{entity:"",hide_header:!1}}_starters(e){return(e||[]).filter((e=>!0===e.starter))}_bench(e){return(e||[]).filter((e=>!e.starter))}_renderPlayer(e){const t=(e.short_name||e.name||"").split(" ").map((e=>e[0])).slice(0,2).join("");return U`
      <div class="player" title="${e.name}">
        <div class="player-card">
          ${this.showPhotos&&e.headshot?U`<img class="player-img" src="${e.headshot}" alt="${e.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
                   <div class="player-init" style="display:none;">${t}</div>`:U`<div class="player-init">${t}</div>`}
          ${e.jersey?U`<div class="player-num">${e.jersey}</div>`:""}
        </div>
        <div class="player-name">${e.short_name||e.name}</div>
        ${e.position?U`<div class="player-pos">${e.position}</div>`:""}
      </div>
    `}render(){if(!this.hass||!this._config)return U``;const e=this.hass.states[this._config.entity];if(!e)return U`<ha-card class="empty">${this._t("generic.unknown_entity")}: ${this._config.entity}</ha-card>`;const t=e.attributes.matches||[];if(0===t.length)return U`<ha-card class="empty">${this._t("generic.no_match")}</ha-card>`;const a=t[0],i=a.lineup_home||e.attributes.lineup_home||[],s=a.lineup_away||e.attributes.lineup_away||[],n=a.formation_home||e.attributes.formation_home||"",o=a.formation_away||e.attributes.formation_away||"";if(0===i.length&&0===s.length)return U`
        <ha-card class="empty">
          <div class="hero-bg"></div>
          <div class="empty-state">
            <div class="empty-icon">👥</div>
            <div class="empty-title">${this._t("lineup.empty.title")}</div>
            <div class="empty-sub">${this._t("lineup.empty.sub")}</div>
          </div>
        </ha-card>
      `;const r=this._starters(i),l=this._bench(i),c=this._starters(s),d=this._bench(s);return U`
      <ha-card>
        <div class="hero-bg"></div>
        ${this.hideHeader?"":U`
          <div class="lineup-header">
            <div class="header-icon">👥</div>
            <div class="header-text">
              <div class="title">${this._t("card.lineup")}</div>
              <div class="subtitle">${a.home_team} vs ${a.away_team}</div>
            </div>
          </div>
        `}

        <div class="teams-row">
          <div class="team-block">
            <div class="team-block-head">
              <img src="${a.home_logo}" alt="${a.home_team}" />
              <div class="team-block-info">
                <div class="team-block-name">${a.home_team}</div>
                ${n?U`<div class="formation">${n}</div>`:""}
              </div>
            </div>
            <div class="players-grid">
              ${r.map((e=>this._renderPlayer(e)))}
            </div>
            ${this.showBench&&l.length?U`
              <div class="bench-label">${this._t("lineup.bench")}</div>
              <div class="players-grid bench">
                ${l.map((e=>this._renderPlayer(e)))}
              </div>
            `:""}
          </div>

          <div class="team-block">
            <div class="team-block-head">
              <img src="${a.away_logo}" alt="${a.away_team}" />
              <div class="team-block-info">
                <div class="team-block-name">${a.away_team}</div>
                ${o?U`<div class="formation">${o}</div>`:""}
              </div>
            </div>
            <div class="players-grid">
              ${c.map((e=>this._renderPlayer(e)))}
            </div>
            ${this.showBench&&d.length?U`
              <div class="bench-label">${this._t("lineup.bench")}</div>
              <div class="players-grid bench">
                ${d.map((e=>this._renderPlayer(e)))}
              </div>
            `:""}
          </div>
        </div>
      </ha-card>
    `}static get styles(){return[he,n`
      :host {
        --cl-accent: #6366f1;
        --cl-accent-2: #ec4899;
        --cl-card-2: rgba(255,255,255,0.05);
        --cl-divider: rgba(255,255,255,0.08);
        --cl-glass-border: rgba(255,255,255,0.08);
      }
      ha-card {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        padding: 0;
        box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        background: var(--cl-bg);
        color: var(--cl-text);
      }
      ha-card.empty {
        padding: 24px;
        text-align: center;
        color: var(--cl-text-2);
      }
      .empty-state {
        display: flex; flex-direction: column;
        align-items: center; gap: 8px;
        padding: 24px;
      }
      .empty-icon { font-size: 38px; opacity: 0.4; }
      .empty-title { font-weight: 800; color: var(--cl-text); }
      .empty-sub { font-size: 12px; color: var(--cl-text-2); }

      .hero-bg {
        position: absolute; inset: 0; z-index: 0;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.10), transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(16,185,129,0.10), transparent 50%);
        pointer-events: none;
      }

      .lineup-header {
        position: relative; z-index: 1;
        display: flex; align-items: center; gap: 12px;
        padding: 16px 18px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .header-icon {
        width: 40px; height: 40px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--cl-accent), #10b981);
        display: flex; align-items: center; justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 16px rgba(99,102,241,0.4);
      }
      .header-text .title {
        font-size: 18px; font-weight: 900;
        letter-spacing: -0.02em;
        color: var(--cl-text);
      }
      .header-text .subtitle {
        font-size: 11px;
        color: var(--cl-text-2);
        margin-top: 2px;
        font-weight: 600;
      }

      .teams-row {
        position: relative; z-index: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
      }
      .team-block {
        padding: 16px 12px;
        border-right: 1px solid var(--cl-divider);
      }
      .team-block:last-child { border-right: none; }
      .team-block-head {
        display: flex; align-items: center; gap: 10px;
        padding-bottom: 12px;
        margin-bottom: 12px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .team-block-head img {
        width: 32px; height: 32px;
        object-fit: contain;
        flex-shrink: 0;
      }
      .team-block-info { min-width: 0; flex: 1; }
      .team-block-name {
        font-size: 13px; font-weight: 800;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        color: var(--cl-text);
      }
      .formation {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.1em;
        color: var(--cl-accent);
        margin-top: 2px;
        font-variant-numeric: tabular-nums;
      }
      .players-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
        gap: 10px;
      }
      .players-grid.bench { opacity: 0.85; }
      .player {
        display: flex; flex-direction: column;
        align-items: center;
        gap: 4px;
        text-align: center;
      }
      .player-card {
        position: relative;
        width: 48px; height: 48px;
      }
      .player-img {
        width: 48px; height: 48px;
        border-radius: 50%;
        object-fit: cover;
        background: var(--cl-card-2);
        border: 2px solid var(--cl-glass-border);
      }
      .player-init {
        width: 48px; height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--cl-accent), var(--cl-accent-2));
        color: white;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px; font-weight: 800;
        letter-spacing: -0.02em;
      }
      .player-num {
        position: absolute;
        bottom: -3px; right: -4px;
        background: var(--cl-num-bg);
        color: white;
        border: 2px solid var(--cl-bg);
        font-size: 9px; font-weight: 800;
        min-width: 18px; height: 18px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-variant-numeric: tabular-nums;
        padding: 0 3px;
      }
      .player-name {
        font-size: 10px; font-weight: 700;
        line-height: 1.1;
        max-width: 64px;
        color: var(--cl-text);
        word-wrap: break-word;
        text-align: center;
      }
      .player-pos {
        font-size: 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--cl-text-2);
        background: var(--cl-card-2);
        padding: 1px 5px;
        border-radius: 4px;
      }
      .bench-label {
        margin-top: 16px; margin-bottom: 8px;
        font-size: 10px; font-weight: 800;
        text-transform: uppercase; letter-spacing: 0.15em;
        color: var(--cl-text-2);
        display: flex; align-items: center; gap: 8px;
      }
      .bench-label::after {
        content: '';
        flex: 1; height: 1px;
        background: linear-gradient(90deg, var(--cl-divider), transparent);
      }

      @media (max-width: 480px) {
        .teams-row { grid-template-columns: 1fr; }
        .team-block { border-right: none; border-bottom: 1px solid var(--cl-divider); }
        .team-block:last-child { border-bottom: none; }
      }
    `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"sports-live-lineup",name:"Sports Live Lineup",description:"Starting lineups for the next or current match."}),customElements.define("sports-live-lineup-editor",class extends oe{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array}}}constructor(){super(),this.entities=[]}static get styles(){return n`
      .card-config { display: flex; flex-direction: column; gap: 16px; }
      .option { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      label { font-size: 14px; color: var(--primary-text-color); }
      .field-label { display: block; font-size: 12px; color: var(--secondary-text-color); margin-bottom: 4px; font-weight: 600; }
      select {
        width: 100%; padding: 10px 12px; font-size: 14px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        box-sizing: border-box;
      }
      h3 { margin: 8px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary-text-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); }
    `}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}get config(){return this._config}updated(e){e.has("hass")&&this._fetchEntities()}_fireConfigChanged(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this.requestUpdate()}_entityChanged(e){if(!this._config)return;const t=e.target.value;t!==this._config.entity&&this._fireConfigChanged({...this._config,entity:t})}_switchChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.checked;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_selectChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.value;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_fetchEntities(){this.hass&&(this.entities=Object.keys(this.hass.states).filter((e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e]?.attributes;return void 0!==t?.sport&&Array.isArray(t?.matches)})).sort())}render(){if(!this._config||!this.hass)return U``;const e=this._config.entity||"",t=e&&this.entities.includes(e);return U`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity (team next_match sensor)</label>
          <select @change=${this._entityChanged}>
            ${t?"":U`<option value="${e}" selected>${e||"— select —"}</option>`}
            ${this.entities.map((t=>U`<option value="${t}" ?selected=${t===e}>${t}</option>`))}
          </select>
          <div class="hint" style="margin-top: 4px;">Lineups are published shortly before kick-off.</div>
        </div>

        <h3>Settings</h3>
        <div class="option">
          <label>Hide Header</label>
          <ha-switch
            .checked=${!0===this._config.hide_header}
            data-config-value="hide_header"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Show Bench Players</label>
          <ha-switch
            .checked=${!1!==this._config.show_bench}
            data-config-value="show_bench"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Show Player Photos</label>
          <ha-switch
            .checked=${!1!==this._config.show_photos}
            data-config-value="show_photos"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div>
          <label class="field-label">Skin</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            <option value="dark" ?selected=${"dark"===(this._config.skin||"dark")}>Dark</option>
            <option value="light" ?selected=${"light"===this._config.skin}>Light</option>
          </select>
        </div>
        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            <option value="" ?selected=${!this._config.language}>Auto (HA locale)</option>
            <option value="en" ?selected=${"en"===this._config.language}>English</option>
            <option value="it" ?selected=${"it"===this._config.language}>Italiano</option>
            <option value="fr" ?selected=${"fr"===this._config.language}>Français</option>
            <option value="es" ?selected=${"es"===this._config.language}>Español</option>
            <option value="nl" ?selected=${"nl"===this._config.language}>Nederlands</option>
          </select>
        </div>
      </div>
    `}}),customElements.define("sports-live-timeline",class extends oe{static get properties(){return{hass:{},_config:{}}}setConfig(e){if(!e.entity)throw new Error("Entity required");this._config=e,ue(this,e),this.hideHeader=!0===e.hide_header,this.reverseOrder=!0===e.reverse_order,this.showOnlyKey=!0===e.show_only_key,this.maxEvents=e.max_events?parseInt(e.max_events,10):0}_t(e,t){return pe(e,de(this.hass,this._config),t)}getCardSize(){return 5}static getConfigElement(){return document.createElement("sports-live-timeline-editor")}static getStubConfig(){return{entity:"",hide_header:!1,reverse_order:!0}}_eventMeta(e){const t=(e.type||"").toLowerCase(),a=(e.type_text||"").toLowerCase();return a.includes("kickoff")||"kickoff"===t?{icon:"⚽",label:this._t("status.kickoff"),cls:"meta"}:a.includes("halftime")||a.includes("intervallo")?{icon:"⏸",label:this._t("status.halftime"),cls:"meta"}:a.includes("start 2nd")||a.includes("secondo tempo")?{icon:"▶",label:this._t("status.second_half"),cls:"meta"}:a.includes("end regular")||a.includes("full time")?{icon:"🏁",label:this._t("status.end"),cls:"meta"}:"goal"===t||e.scoring_play?{icon:"⚽",label:this._t("event.goal"),cls:"goal"}:a.includes("penalty")?{icon:"⚽",label:this._t("timeline.penalty"),cls:"goal"}:a.includes("yellow card")?{icon:"🟨",label:this._t("event.yellow_card"),cls:"yellow"}:a.includes("red card")?{icon:"🟥",label:this._t("event.red_card"),cls:"red"}:"substitution"===t||a.includes("substitution")?{icon:"🔄",label:this._t("event.substitution"),cls:"sub"}:a.includes("var")?{icon:"📺",label:this._t("event.var"),cls:"meta"}:{icon:"·",label:e.type_text||this._t("timeline.event"),cls:"meta"}}render(){if(!this.hass||!this._config)return U``;const e=this.hass.states[this._config.entity];if(!e)return U`<ha-card class="empty">${this._t("generic.unknown_entity")}: ${this._config.entity}</ha-card>`;const t=e.attributes.matches||[];if(0===t.length)return U`<ha-card class="empty">${this._t("generic.no_match")}</ha-card>`;const a=t[0],i=a.key_events||e.attributes.key_events||[];if(0===i.length)return U`
        <ha-card class="empty">
          <div class="hero-bg"></div>
          <div class="empty-state">
            <div class="empty-icon">⏱</div>
            <div class="empty-title">${this._t("timeline.empty.title")}</div>
            <div class="empty-sub">${this._t("timeline.empty.sub")}</div>
          </div>
        </ha-card>
      `;let s=this.reverseOrder?[...i].reverse():i;return this.showOnlyKey&&(s=s.filter((e=>{const t=(e.type||"").toLowerCase(),a=(e.type_text||"").toLowerCase();return e.scoring_play||"goal"===t||a.includes("goal")||a.includes("yellow card")||a.includes("red card")}))),this.maxEvents>0&&(s=s.slice(0,this.maxEvents)),U`
      <ha-card>
        <div class="hero-bg"></div>
        ${this.hideHeader?"":U`
          <div class="tl-header">
            <div class="header-icon">⏱</div>
            <div class="header-text">
              <div class="title">${this._t("card.timeline")}</div>
              <div class="subtitle">
                <img class="mini-logo" src="${a.home_logo}" alt="" />
                <span>${a.home_score??"-"} - ${a.away_score??"-"}</span>
                <img class="mini-logo" src="${a.away_logo}" alt="" />
              </div>
            </div>
          </div>
        `}

        <div class="tl-body">
          ${s.map((e=>{const t=this._eventMeta(e),i=a.home_team&&e.team===a.home_team,s=a.away_team&&e.team===a.away_team,n=i?"home":s?"away":"meta",o=(e.athletes||[]).filter(Boolean);return U`
              <div class="tl-row side-${n} type-${t.cls}">
                <div class="tl-time">${e.clock||""}</div>
                <div class="tl-axis">
                  <div class="tl-dot ${t.cls}">${t.icon}</div>
                </div>
                <div class="tl-card">
                  <div class="tl-card-head">
                    <span class="tl-label">${t.label}</span>
                    ${e.team?U`<span class="tl-team">${e.team}</span>`:""}
                  </div>
                  ${o.length?U`
                    <div class="tl-athletes">${o.join(", ")}</div>
                  `:""}
                  ${e.short_text?U`<div class="tl-text">${e.short_text}</div>`:""}
                </div>
              </div>
            `}))}
        </div>
      </ha-card>
    `}static get styles(){return[he,n`
      :host {
        --cl-accent: #6366f1;
        --cl-accent-2: #ec4899;
        --cl-live: #ef4444;
        --cl-green: #10b981;
        --cl-gold: #fbbf24;
        --cl-card-2: rgba(255,255,255,0.05);
        --cl-divider: rgba(255,255,255,0.08);
        --cl-glass-border: rgba(255,255,255,0.08);
      }
      ha-card {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        padding: 0;
        box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        background: var(--cl-bg);
        color: var(--cl-text);
      }
      ha-card.empty {
        padding: 24px;
        text-align: center;
        color: var(--cl-text-2);
      }
      .empty-state {
        display: flex; flex-direction: column;
        align-items: center; gap: 8px;
        padding: 24px;
      }
      .empty-icon { font-size: 38px; opacity: 0.4; }
      .empty-title { font-weight: 800; color: var(--cl-text); }
      .empty-sub { font-size: 12px; color: var(--cl-text-2); }

      .hero-bg {
        position: absolute; inset: 0; z-index: 0;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.10), transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(251,191,36,0.10), transparent 50%);
        pointer-events: none;
      }

      .tl-header {
        position: relative; z-index: 1;
        display: flex; align-items: center; gap: 12px;
        padding: 16px 18px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .header-icon {
        width: 40px; height: 40px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--cl-accent), var(--cl-gold));
        display: flex; align-items: center; justify-content: center;
        font-size: 20px;
      }
      .header-text .title {
        font-size: 18px; font-weight: 900;
        letter-spacing: -0.02em;
        color: var(--cl-text);
      }
      .header-text .subtitle {
        display: flex; align-items: center; gap: 6px;
        font-size: 12px;
        color: var(--cl-text-2);
        margin-top: 2px;
        font-weight: 700;
      }
      .mini-logo { width: 16px; height: 16px; object-fit: contain; }

      .tl-body {
        position: relative; z-index: 1;
        padding: 16px 12px 20px;
      }
      .tl-row {
        display: grid;
        grid-template-columns: 44px 32px 1fr;
        gap: 10px;
        align-items: flex-start;
        position: relative;
      }
      .tl-row + .tl-row { margin-top: 4px; }
      .tl-time {
        text-align: right;
        font-size: 11px;
        font-weight: 700;
        color: var(--cl-text-2);
        font-variant-numeric: tabular-nums;
        padding: 8px 0;
      }
      .tl-axis {
        position: relative;
        display: flex; justify-content: center;
        padding: 4px 0;
      }
      .tl-axis::before {
        content: '';
        position: absolute;
        top: 0; bottom: 0;
        left: 50%;
        width: 2px;
        background: var(--cl-divider);
        transform: translateX(-50%);
      }
      .tl-row:first-child .tl-axis::before { top: 50%; }
      .tl-row:last-child .tl-axis::before { bottom: 50%; }
      .tl-dot {
        position: relative;
        z-index: 1;
        width: 26px; height: 26px;
        border-radius: 50%;
        background: var(--cl-bg);
        border: 2px solid var(--cl-divider);
        display: flex; align-items: center; justify-content: center;
        font-size: 12px;
      }
      .tl-dot.goal {
        background: linear-gradient(135deg, var(--cl-gold), #d97706);
        border-color: var(--cl-gold);
        box-shadow: 0 0 0 4px rgba(251,191,36,0.2);
      }
      .tl-dot.yellow {
        background: rgba(245,158,11,0.18);
        border-color: #f59e0b;
      }
      .tl-dot.red {
        background: rgba(239,68,68,0.18);
        border-color: var(--cl-live);
      }
      .tl-dot.sub {
        background: rgba(99,102,241,0.18);
        border-color: var(--cl-accent);
      }
      .tl-dot.meta {
        background: var(--cl-card-2);
      }
      .tl-card {
        background: var(--cl-card-2);
        border: 1px solid var(--cl-glass-border);
        border-radius: 12px;
        padding: 8px 12px;
      }
      .tl-row.type-goal .tl-card {
        background: linear-gradient(135deg, rgba(251,191,36,0.10), rgba(251,191,36,0.02));
        border-color: rgba(251,191,36,0.3);
      }
      .tl-row.type-red .tl-card {
        border-color: rgba(239,68,68,0.3);
      }
      .tl-row.type-yellow .tl-card {
        border-color: rgba(245,158,11,0.3);
      }
      .tl-card-head {
        display: flex; justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }
      .tl-label {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--cl-text);
      }
      .tl-row.type-goal .tl-label { color: var(--cl-gold); }
      .tl-row.type-yellow .tl-label { color: #f59e0b; }
      .tl-row.type-red .tl-label { color: var(--cl-live); }
      .tl-row.type-sub .tl-label { color: var(--cl-accent); }
      .tl-team {
        font-size: 10px;
        font-weight: 700;
        color: var(--cl-text-2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 50%;
      }
      .tl-athletes {
        font-size: 13px;
        font-weight: 700;
        color: var(--cl-text);
        margin-top: 3px;
        line-height: 1.3;
      }
      .tl-text {
        font-size: 11px;
        font-weight: 500;
        color: var(--cl-text-2);
        margin-top: 3px;
        line-height: 1.4;
      }
    `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"sports-live-timeline",name:"Sports Live Timeline",description:"Minute-by-minute match event timeline."}),customElements.define("sports-live-timeline-editor",class extends oe{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array}}}constructor(){super(),this.entities=[]}static get styles(){return n`
      .card-config { display: flex; flex-direction: column; gap: 16px; }
      .option { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      label { font-size: 14px; color: var(--primary-text-color); }
      .field-label { display: block; font-size: 12px; color: var(--secondary-text-color); margin-bottom: 4px; font-weight: 600; }
      select, input[type="number"] {
        width: 100%; padding: 10px 12px; font-size: 14px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        box-sizing: border-box;
      }
      h3 { margin: 8px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary-text-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); }
    `}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}get config(){return this._config}updated(e){e.has("hass")&&this._fetchEntities()}_fireConfigChanged(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this.requestUpdate()}_entityChanged(e){if(!this._config)return;const t=e.target.value;t!==this._config.entity&&this._fireConfigChanged({...this._config,entity:t})}_switchChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.checked;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_numberChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=parseInt(t.value,10);isNaN(i)||this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_selectChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.value;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_fetchEntities(){this.hass&&(this.entities=Object.keys(this.hass.states).filter((e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e]?.attributes;return void 0!==t?.sport&&Array.isArray(t?.matches)})).sort())}render(){if(!this._config||!this.hass)return U``;const e=this._config.entity||"",t=e&&this.entities.includes(e);return U`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity (team next_match sensor)</label>
          <select @change=${this._entityChanged}>
            ${t?"":U`<option value="${e}" selected>${e||"— select —"}</option>`}
            ${this.entities.map((t=>U`<option value="${t}" ?selected=${t===e}>${t}</option>`))}
          </select>
          <div class="hint" style="margin-top: 4px;">Events are published during the match.</div>
        </div>

        <h3>Settings</h3>
        <div class="option">
          <label>Hide Header</label>
          <ha-switch
            .checked=${!0===this._config.hide_header}
            data-config-value="hide_header"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Reverse order (most recent first)</label>
          <ha-switch
            .checked=${!0===this._config.reverse_order}
            data-config-value="reverse_order"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Key Events Only (goals &amp; cards)</label>
          <ha-switch
            .checked=${!0===this._config.show_only_key}
            data-config-value="show_only_key"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div>
          <label class="field-label">Max Events (0 = all)</label>
          <input type="number" min="0" max="100"
            .value=${this._config.max_events||0}
            data-config-value="max_events"
            @change=${this._numberChanged} />
        </div>
        <div>
          <label class="field-label">Skin</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            <option value="dark" ?selected=${"dark"===(this._config.skin||"dark")}>Dark</option>
            <option value="light" ?selected=${"light"===this._config.skin}>Light</option>
          </select>
        </div>
        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            <option value="" ?selected=${!this._config.language}>Auto (HA locale)</option>
            <option value="en" ?selected=${"en"===this._config.language}>English</option>
            <option value="it" ?selected=${"it"===this._config.language}>Italiano</option>
            <option value="fr" ?selected=${"fr"===this._config.language}>Français</option>
            <option value="es" ?selected=${"es"===this._config.language}>Español</option>
            <option value="nl" ?selected=${"nl"===this._config.language}>Nederlands</option>
          </select>
        </div>
      </div>
    `}}),customElements.define("sports-live-bracket",class extends oe{static get properties(){return{hass:{},_config:{}}}setConfig(e){if(!e.entity)throw new Error("Entity required");this._config=e,ue(this,e),this.hideHeader=!0===e.hide_header,this.compactMode=!0===e.compact,this._cardStyle="tree"===e.style?"tree":"list",this.treeShowPlayoffs=!0===e.tree_show_playoffs}_t(e,t){return pe(e,de(this.hass,this._config),t)}_formatDate(e){if(!e)return"";try{const t=new Date(e),a=this._t("month."+(t.getMonth()+1));return`${t.getDate()} ${a}`}catch(e){return""}}_localizeRoundName(e){const t={Final:"round.final",Semifinals:"round.semifinals",Quarterfinals:"round.quarterfinals","Round of 16":"round.r16","Round of 32":"round.r32","Knockout Playoffs":"round.knockout_playoffs","Preliminary Round":"round.preliminary"}[e.name];return t?this._t(t):e.name}getCardSize(){return 6}static getConfigElement(){return document.createElement("sports-live-bracket-editor")}static getStubConfig(){return{entity:"",hide_header:!1,compact:!1,style:"list"}}_formatScore(e){return null==e?"-":String(e)}_renderTie(e){const t=e.team_a||{},a=e.team_b||{},i=e.leg1,s=e.leg2,n=e.single,o=e.winner_team,r=o&&t.name&&o===t.name,l=o&&a.name&&o===a.name,c=(e,t)=>e&&t&&t.name?e.home_team===t.name?e.home_score:e.away_team===t.name?e.away_score:null:null,d=c(i,t),p=c(i,a),h=c(s,t),g=c(s,a),u=c(n,t),f=c(n,a),m=i&&"in"===i.state||s&&"in"===s.state||n&&"in"===n.state,v=!i&&!n;return U`
      <div class="tie ${m?"live":""} ${e.completed?"done":""}">
        <div class="tie-row ${r?"winner":""} ${l?"loser":""}">
          <img src="${t.logo}" alt="${t.name}" />
          <span class="tname">${t.name||"TBD"}</span>
          <span class="legs">
            ${n?U`<span class="leg">${this._formatScore(u)}</span>`:U`
              <span class="leg">${this._formatScore(d)}</span>
              <span class="leg">${this._formatScore(h)}</span>
            `}
          </span>
        </div>
        <div class="tie-row ${l?"winner":""} ${r?"loser":""}">
          <img src="${a.logo}" alt="${a.name}" />
          <span class="tname">${a.name||"TBD"}</span>
          <span class="legs">
            ${n?U`<span class="leg">${this._formatScore(f)}</span>`:U`
              <span class="leg">${this._formatScore(p)}</span>
              <span class="leg">${this._formatScore(g)}</span>
            `}
          </span>
        </div>
        <div class="tie-foot">
          ${m?U`<span class="live-badge"><span class="dot"></span>LIVE</span>`:""}
          ${e.aggregate?U`<span class="agg">${this._t("bracket.agg")} ${e.aggregate}</span>`:""}
          ${e.tied?U`<span class="agg tied">${this._t("bracket.tied_agg")}</span>`:""}
          ${e.completed||m||!e.first_leg_date?"":U`<span class="date">${this._formatDate(e.first_leg_date)}</span>`}
          ${v?U`<span class="date pending">${this._t("bracket.tbd")}</span>`:""}
        </div>
      </div>
    `}_aggregateFor(e,t){if(!t||!t.name)return null;const a=(e,t)=>e&&t&&t.name?e.home_team===t.name?e.home_score:e.away_team===t.name?e.away_score:null:null;if(e.single)return a(e.single,t);let i=0,s=!1;const n=a(e.leg1,t),o=a(e.leg2,t);return null!=n&&(i+=n,s=!0),null!=o&&(i+=o,s=!0),s?i:null}_renderMiniTie(e){const t=e.team_a||{},a=e.team_b||{},i=this._aggregateFor(e,t),s=this._aggregateFor(e,a),n=e.winner_team,o=n&&t.name&&n===t.name,r=n&&a.name&&n===a.name,l=e.leg1&&"in"===e.leg1.state||e.leg2&&"in"===e.leg2.state||e.single&&"in"===e.single.state,c=!e.leg1&&!e.single,d=t.abbrev||(t.name?t.name.substring(0,3).toUpperCase():"TBD"),p=a.abbrev||(a.name?a.name.substring(0,3).toUpperCase():"TBD");return U`
      <div class="mini-tie ${l?"live":""} ${e.completed?"done":""} ${c?"pending":""}">
        <div class="mini-team ${o?"winner":""} ${r?"loser":""}">
          ${t.logo?U`<img src="${t.logo}" alt="${t.name}" />`:U`<div class="logo-ph"></div>`}
          <span class="abbr">${d}</span>
          <span class="agg-num">${null!==i?i:"-"}</span>
        </div>
        <div class="mini-team ${r?"winner":""} ${o?"loser":""}">
          ${a.logo?U`<img src="${a.logo}" alt="${a.name}" />`:U`<div class="logo-ph"></div>`}
          <span class="abbr">${p}</span>
          <span class="agg-num">${null!==s?s:"-"}</span>
        </div>
        ${l?U`<span class="mini-live"><span class="dot"></span></span>`:""}
      </div>
    `}_renderTreeRound(e,t){return U`
      <div class="tree-col">
        <div class="tree-col-label">
          <span class="tree-col-label-en">${this._t(t)}</span>
        </div>
        <div class="tree-col-ties">
          ${e.map((e=>this._renderMiniTie(e)))}
        </div>
      </div>
    `}_renderArrows(e,t){if(e<=0)return"";const a=2*e,i=[],s="left"===t,n=`arrow-${t}`;for(let t=0;t<e;t++){const o=(2*t+.5)/a*100,r=(2*t+1.5)/a*100,l=(t+.5)/e*100;s?(i.push(I`<line x1="0" y1="${o}%" x2="50%" y2="${o}%" stroke-linecap="round" />`),i.push(I`<line x1="0" y1="${r}%" x2="50%" y2="${r}%" stroke-linecap="round" />`),i.push(I`<line x1="50%" y1="${o}%" x2="50%" y2="${r}%" />`),i.push(I`<line x1="50%" y1="${l}%" x2="100%" y2="${l}%" marker-end="url(#${n})" />`)):(i.push(I`<line x1="100%" y1="${o}%" x2="50%" y2="${o}%" stroke-linecap="round" />`),i.push(I`<line x1="100%" y1="${r}%" x2="50%" y2="${r}%" stroke-linecap="round" />`),i.push(I`<line x1="50%" y1="${o}%" x2="50%" y2="${r}%" />`),i.push(I`<line x1="50%" y1="${l}%" x2="0" y2="${l}%" marker-end="url(#${n})" />`))}const o=s?I`<marker id="${n}" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" markerUnits="strokeWidth" overflow="visible"><path d="M0,0 L10,5 L0,10 z" fill="var(--cl-accent)" /></marker>`:I`<marker id="${n}" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="7" markerHeight="7" markerUnits="strokeWidth" overflow="visible"><path d="M10,0 L0,5 L10,10 z" fill="var(--cl-accent)" /></marker>`;return U`
      <div class="tree-arrows ${t}">
        <svg class="connector-svg ${t}" preserveAspectRatio="none">
          <defs>${o}</defs>
          ${i}
        </svg>
      </div>
    `}_renderTree(e){const t=t=>{const a=e.filter((e=>e.size===t));if(0===a.length)return null;return a.find((e=>"Knockout Playoffs"!==e.name&&"Preliminary Round"!==e.name))||a[a.length-1]},a=e.find((e=>"Knockout Playoffs"===e.name)),i=t(8),s=t(4),n=t(2),o=t(1),r=e=>{if(!e)return{left:[],right:[]};const t=e.ties||[],a=Math.ceil(t.length/2);return{left:t.slice(0,a),right:t.slice(a)}},l=r(i),c=r(s),d=r(n),p=this.treeShowPlayoffs?r(a):null,h=o?o.ties[0]:null;return U`
      <div class="tree-wrap">
        <div class="tree">
          <div class="tree-half left">
            ${p&&p.left.length?U`
              ${this._renderTreeRound(p.left,"round.knockout_playoffs")}
              ${l.left.length?this._renderArrows(l.left.length,"left"):""}
            `:""}
            ${l.left.length?this._renderTreeRound(l.left,"round.r16"):""}
            ${l.left.length&&c.left.length?this._renderArrows(c.left.length,"left"):""}
            ${c.left.length?this._renderTreeRound(c.left,"round.quarterfinals"):""}
            ${c.left.length&&d.left.length?this._renderArrows(d.left.length,"left"):""}
            ${d.left.length?this._renderTreeRound(d.left,"round.semifinals"):""}
            ${d.left.length?this._renderArrows(1,"left"):""}
          </div>

          <div class="tree-center">
            <div class="trophy">🏆</div>
            <div class="trophy-label">${this._t("round.final")}</div>
            ${h?U`<div class="final-tie-wrap">${this._renderMiniTie(h)}</div>`:U`<div class="final-placeholder">${this._t("bracket.tbd")}</div>`}
          </div>

          <div class="tree-half right">
            ${d.right.length?this._renderArrows(1,"right"):""}
            ${d.right.length?this._renderTreeRound(d.right,"round.semifinals"):""}
            ${d.right.length&&c.right.length?this._renderArrows(d.right.length,"right"):""}
            ${c.right.length?this._renderTreeRound(c.right,"round.quarterfinals"):""}
            ${c.right.length&&l.right.length?this._renderArrows(c.right.length,"right"):""}
            ${l.right.length?this._renderTreeRound(l.right,"round.r16"):""}
            ${p&&p.right.length?U`
              ${l.right.length?this._renderArrows(l.right.length,"right"):""}
              ${this._renderTreeRound(p.right,"round.knockout_playoffs")}
            `:""}
          </div>
        </div>
      </div>
    `}render(){if(!this.hass||!this._config)return U``;const e=this.hass.states[this._config.entity];if(!e)return U`<ha-card class="empty">Entità sconosciuta: ${this._config.entity}</ha-card>`;const t=e.attributes.rounds||[];return 0===t.length?U`
        <ha-card class="empty">
          <div class="hero-bg"></div>
          <div class="empty-state">
            <div class="empty-icon">🏆</div>
            <div class="empty-title">${this._t("bracket.empty.title")}</div>
            <div class="empty-sub">${this._t("bracket.empty.sub")}</div>
          </div>
        </ha-card>
      `:U`
      <ha-card class="${this.compactMode?"compact":""} style-${this._cardStyle}">
        <div class="hero-bg"></div>
        ${this.hideHeader?"":U`
          <div class="bracket-header">
            <div class="header-icon">🏆</div>
            <div class="header-text">
              <div class="title">${this._t("card.bracket")}</div>
              <div class="subtitle">${e.state}</div>
            </div>
          </div>
        `}

        ${"tree"===this._cardStyle?this._renderTree(t):U`
          <div class="rounds-container">
            ${t.map((e=>U`
              <div class="round">
                <div class="round-name">
                  <span class="round-name-en">${this._localizeRoundName(e)}</span>
                </div>
                <div class="round-ties">
                  ${e.ties.map((e=>this._renderTie(e)))}
                </div>
              </div>
            `))}
          </div>
        `}
      </ha-card>
    `}static get styles(){return[he,n`
      :host {
        --cl-accent: #6366f1;
        --cl-accent-2: #ec4899;
        --cl-live: #ef4444;
        --cl-live-glow: rgba(239,68,68,0.5);
        --cl-green: #10b981;
        --cl-gold: #fbbf24;
        --cl-card-2: rgba(255,255,255,0.05);
        --cl-divider: rgba(255,255,255,0.08);
        --cl-glass-border: rgba(255,255,255,0.08);
      }
      ha-card {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        padding: 0;
        box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        background: var(--cl-bg);
        color: var(--cl-text);
      }
      ha-card.empty {
        padding: 24px;
        text-align: center;
        color: var(--cl-text-2);
      }
      .empty-state {
        display: flex; flex-direction: column;
        align-items: center; gap: 8px;
        padding: 24px;
      }
      .empty-icon { font-size: 38px; opacity: 0.4; }
      .empty-title { font-weight: 800; color: var(--cl-text); }
      .empty-sub { font-size: 12px; color: var(--cl-text-2); }

      .hero-bg {
        position: absolute; inset: 0; z-index: 0;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.10), transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(251,191,36,0.10), transparent 50%);
        pointer-events: none;
      }

      .bracket-header {
        position: relative; z-index: 1;
        display: flex; align-items: center; gap: 12px;
        padding: 16px 18px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .header-icon {
        width: 40px; height: 40px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--cl-gold), #d97706);
        display: flex; align-items: center; justify-content: center;
        font-size: 22px;
        box-shadow: 0 4px 16px rgba(251,191,36,0.4);
      }
      .header-text .title {
        font-size: 18px; font-weight: 900;
        letter-spacing: -0.02em;
        color: var(--cl-text);
      }
      .header-text .title-it {
        font-size: 13px;
        font-weight: 600;
        color: var(--cl-text-2);
        margin-left: 4px;
        opacity: 0.85;
      }
      .header-text .subtitle {
        font-size: 11px;
        color: var(--cl-text-2);
        margin-top: 2px;
        font-weight: 600;
      }

      .rounds-container {
        position: relative; z-index: 1;
        display: flex;
        gap: 16px;
        padding: 18px;
        overflow-x: auto;
      }
      .round {
        flex: 1 0 240px;
        min-width: 240px;
        display: flex; flex-direction: column;
        gap: 8px;
        justify-content: space-around;
      }
      .round-name {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        text-align: center;
        padding: 6px 12px;
        border-radius: 12px;
        background: rgba(99,102,241,0.12);
        align-self: center;
        margin-bottom: 4px;
      }
      .round-name-en {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--cl-accent);
        line-height: 1;
      }
      .round-name-it {
        font-size: 9px;
        font-weight: 600;
        color: var(--cl-text-2);
        opacity: 0.85;
        line-height: 1;
      }
      .round-ties {
        display: flex; flex-direction: column;
        gap: 12px;
        justify-content: space-around;
        flex: 1;
      }

      .tie {
        background: var(--cl-card-2);
        border: 1px solid var(--cl-glass-border);
        border-radius: 12px;
        padding: 10px 12px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }
      .tie:hover {
        border-color: var(--cl-accent);
        transform: translateY(-2px);
      }
      .tie.live {
        border-color: var(--cl-live);
        box-shadow: 0 0 0 1px var(--cl-live), 0 0 20px var(--cl-live-glow);
        animation: tie-pulse 2s ease-in-out infinite;
      }
      @keyframes tie-pulse {
        0%, 100% { box-shadow: 0 0 0 1px var(--cl-live), 0 0 20px var(--cl-live-glow); }
        50% { box-shadow: 0 0 0 2px var(--cl-live), 0 0 30px var(--cl-live-glow); }
      }
      .tie.done {
        border-color: rgba(16,185,129,0.3);
      }

      .tie-row {
        display: grid;
        grid-template-columns: 22px 1fr auto;
        align-items: center;
        gap: 10px;
        padding: 5px 0;
      }
      .tie-row + .tie-row {
        border-top: 1px solid var(--cl-divider);
      }
      .tie-row img {
        width: 22px; height: 22px;
        object-fit: contain;
      }
      .tie-row .tname {
        font-size: 13px;
        font-weight: 600;
        color: var(--cl-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: -0.01em;
      }
      .tie-row.winner .tname { font-weight: 800; }
      .tie-row.loser .tname { color: var(--cl-text-2); }
      .tie-row.loser img { opacity: 0.55; }

      .legs {
        display: inline-flex;
        gap: 4px;
      }
      .leg {
        min-width: 22px;
        text-align: center;
        font-size: 13px;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        padding: 2px 6px;
        border-radius: 6px;
        background: rgba(255,255,255,0.06);
        color: var(--cl-text);
      }
      .tie-row.winner .leg {
        background: rgba(16,185,129,0.2);
        color: var(--cl-green);
      }
      .tie-row.loser .leg {
        opacity: 0.5;
      }

      .tie-foot {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px dashed var(--cl-divider);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .agg {
        font-size: 10px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--cl-green);
        padding: 2px 8px;
        background: rgba(16,185,129,0.12);
        border-radius: 6px;
      }
      .agg.tied {
        color: var(--cl-gold);
        background: rgba(251,191,36,0.12);
      }
      .date {
        font-size: 10px;
        font-weight: 700;
        color: var(--cl-text-2);
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .date.pending {
        color: var(--cl-accent);
      }
      .live-badge {
        display: inline-flex; align-items: center; gap: 5px;
        background: linear-gradient(135deg, var(--cl-live), #f97316);
        color: white;
        padding: 2px 8px;
        border-radius: 999px;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .live-badge .dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: white;
        animation: dot-pulse 1.2s ease-in-out infinite;
      }
      @keyframes dot-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(0.7); }
      }

      /* Compact mode (vertical, single column per round) */
      ha-card.compact .rounds-container {
        flex-direction: column;
        overflow-x: visible;
      }
      ha-card.compact .round {
        flex: none;
        min-width: 0;
      }

      @media (max-width: 600px) {
        ha-card.style-list .rounds-container {
          flex-direction: column;
        }
        ha-card.style-list .round {
          flex: none;
          min-width: 0;
        }
      }

      /* ============== STYLE: TREE ============== */
      .tree-wrap {
        position: relative;
        z-index: 1;
        overflow-x: auto;
        padding: 24px 12px 24px;
      }
      .tree {
        display: flex;
        align-items: stretch;
        justify-content: center;
        min-height: 480px;
        gap: 0;
      }
      .tree-half {
        flex: 1;
        display: flex;
        align-items: stretch;
        min-width: 0;
      }
      /* Niente row-reverse: per la "specularità" del lato destro renderizziamo
         direttamente i figli nell'ordine SF→QF→R16 (vedi _renderTree). */

      .tree-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0 6px;
        min-width: 110px;
        max-width: 140px;
      }
      .tree-col-label {
        text-align: center;
        padding: 4px 8px;
        background: rgba(99,102,241,0.12);
        border-radius: 8px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
      }
      .tree-col-label-en {
        font-size: 9px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--cl-accent);
        line-height: 1;
      }
      .tree-col-label-it {
        font-size: 8px;
        font-weight: 600;
        color: var(--cl-text-2);
        line-height: 1;
        opacity: 0.85;
      }
      .tree-col-ties {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 6px;
        position: relative;
      }

      /* SVG bracket arrow connectors — colonne più larghe e con frecce sempre visibili */
      .tree-arrows {
        flex: 0 0 36px;
        min-width: 36px;
        display: flex;
        align-items: stretch;
        padding-top: 44px; /* compensa la label dei round */
        padding-bottom: 0;
      }
      .connector-svg {
        width: 100%;
        height: 100%;
        stroke: var(--cl-accent);
        stroke-width: 2;
        fill: none;
        overflow: visible;
        display: block;
      }
      .connector-svg .arrow-head {
        fill: var(--cl-accent);
        stroke: none;
      }

      /* Mini tie card */
      .mini-tie {
        background: var(--cl-bg);
        border: 1.5px solid var(--cl-accent);
        border-radius: 10px;
        padding: 7px 9px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        box-shadow: 0 2px 8px rgba(99,102,241,0.15);
      }
      .mini-tie:hover {
        border-color: var(--cl-accent);
        transform: scale(1.04);
        z-index: 5;
      }
      .mini-tie.live {
        border-color: var(--cl-live);
        box-shadow: 0 0 0 1px var(--cl-live), 0 0 16px var(--cl-live-glow);
        animation: tie-pulse 2s ease-in-out infinite;
      }
      .mini-tie.done {
        border-color: rgba(16,185,129,0.3);
      }
      .mini-tie.pending {
        opacity: 0.55;
        background: transparent;
        border-style: dashed;
      }
      .mini-team {
        display: grid;
        grid-template-columns: 18px 1fr auto;
        align-items: center;
        gap: 6px;
        padding: 2px 0;
      }
      .mini-team img {
        width: 18px; height: 18px;
        object-fit: contain;
      }
      .mini-team .logo-ph {
        width: 18px; height: 18px;
        border-radius: 50%;
        background: var(--cl-card-2);
      }
      .mini-team .abbr {
        font-size: 11px;
        font-weight: 700;
        color: var(--cl-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: -0.01em;
      }
      .mini-team .agg-num {
        font-size: 12px;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        min-width: 14px;
        text-align: right;
        color: var(--cl-text-2);
      }
      .mini-team.winner .abbr {
        font-weight: 800;
      }
      .mini-team.winner .agg-num {
        color: var(--cl-green);
      }
      .mini-team.loser .abbr {
        color: var(--cl-text-2);
      }
      .mini-team.loser img {
        opacity: 0.5;
      }
      .mini-team.loser .agg-num {
        opacity: 0.55;
      }
      .mini-live {
        position: absolute;
        top: -3px; right: -3px;
        width: 10px; height: 10px;
      }
      .mini-live .dot {
        display: block;
        width: 10px; height: 10px;
        border-radius: 50%;
        background: var(--cl-live);
        box-shadow: 0 0 8px var(--cl-live-glow);
        animation: dot-pulse 1.2s ease-in-out infinite;
      }

      /* Tree center (trophy + final) */
      .tree-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 16px;
        gap: 14px;
        min-width: 200px;
        flex: 0 0 200px;
        position: relative;
      }
      .tree-center::before {
        content: '';
        position: absolute;
        inset: 20% 8%;
        background:
          radial-gradient(circle at center, rgba(251,191,36,0.20), transparent 65%);
        pointer-events: none;
        border-radius: 50%;
      }
      .trophy {
        position: relative;
        font-size: 64px;
        line-height: 1;
        filter: drop-shadow(0 4px 24px rgba(251,191,36,0.7));
        animation: trophy-shine 4s ease-in-out infinite;
        z-index: 2;
      }
      @keyframes trophy-shine {
        0%, 100% { filter: drop-shadow(0 4px 24px rgba(251,191,36,0.7)); transform: scale(1); }
        50% { filter: drop-shadow(0 4px 36px rgba(251,191,36,1)) drop-shadow(0 0 12px #fbbf24); transform: scale(1.04); }
      }
      .trophy-label {
        position: relative;
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        background: linear-gradient(135deg, var(--cl-gold), #d97706);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        z-index: 2;
      }
      .trophy-label-it {
        font-weight: 600;
        opacity: 0.85;
      }
      .final-tie-wrap {
        position: relative;
        width: 100%;
        max-width: 170px;
        z-index: 2;
      }
      .final-tie-wrap .mini-tie {
        background: linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.02));
        border-color: rgba(251,191,36,0.4);
        box-shadow: 0 4px 16px rgba(251,191,36,0.2);
      }
      .final-tie-wrap .mini-team.winner .agg-num {
        color: var(--cl-gold);
      }
      .final-placeholder {
        position: relative;
        font-size: 11px;
        font-weight: 800;
        color: var(--cl-text-2);
        padding: 8px 14px;
        background: var(--cl-card-2);
        border: 1px dashed var(--cl-glass-border);
        border-radius: 8px;
        letter-spacing: 0.1em;
      }

      /* Mobile per tree */
      @media (max-width: 720px) {
        ha-card.style-tree .tree-col {
          min-width: 100px;
        }
        ha-card.style-tree .tree-center {
          min-width: 140px;
        }
        ha-card.style-tree .trophy {
          font-size: 56px;
        }
      }
      @media (max-width: 520px) {
        ha-card.style-tree .tree {
          flex-direction: column;
          min-height: 0;
        }
        ha-card.style-tree .tree-half {
          flex-direction: row;
        }
        ha-card.style-tree .tree-half.right {
          flex-direction: row;
        }
        ha-card.style-tree .tree-center {
          order: -1;
          padding: 12px;
        }
      }
    `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"sports-live-bracket",name:"Sports Live Bracket",description:"Knockout bracket for cup competitions."}),customElements.define("sports-live-bracket-editor",class extends oe{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array}}}constructor(){super(),this.entities=[]}static get styles(){return n`
      .card-config { display: flex; flex-direction: column; gap: 16px; }
      .option { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      label { font-size: 14px; color: var(--primary-text-color); }
      .field-label { display: block; font-size: 12px; color: var(--secondary-text-color); margin-bottom: 4px; font-weight: 600; }
      select {
        width: 100%; padding: 10px 12px; font-size: 14px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        box-sizing: border-box;
      }
      h3 { margin: 8px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary-text-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); }
    `}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}get config(){return this._config}updated(e){e.has("hass")&&this._fetchEntities()}_fireConfigChanged(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this.requestUpdate()}_entityChanged(e){if(!this._config)return;const t=e.target.value;t!==this._config.entity&&this._fireConfigChanged({...this._config,entity:t})}_switchChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.checked;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_selectChanged(e){if(!this._config)return;const t=e.target;if(!t.dataset||!t.dataset.configValue)return;const a=t.dataset.configValue,i=t.value;this._config[a]!==i&&this._fireConfigChanged({...this._config,[a]:i})}_fetchEntities(){this.hass&&(this.entities=Object.keys(this.hass.states).filter((e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e]?.attributes;return void 0!==t?.sport&&Array.isArray(t?.rounds)})).sort())}render(){if(!this._config||!this.hass)return U``;const e=this._config.entity||"",t=e&&this.entities.includes(e);return U`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity (standings bracket sensor)</label>
          <select @change=${this._entityChanged}>
            ${t?"":U`<option value="${e}" selected>${e||"— select —"}</option>`}
            ${this.entities.map((t=>U`<option value="${t}" ?selected=${t===e}>${t}</option>`))}
          </select>
          <div class="hint" style="margin-top: 4px;">Available for Champions League, Europa League, Conference League, FIFA World Cup and other cups.</div>
        </div>

        <h3>Settings</h3>
        <div>
          <label class="field-label">Style</label>
          <select data-config-value="style" @change=${this._selectChanged}>
            <option value="list" ?selected=${"tree"!==this._config.style}>List (default)</option>
            <option value="tree" ?selected=${"tree"===this._config.style}>Tree (bracket with central trophy)</option>
          </select>
        </div>
        <div class="option">
          <label>Hide Header</label>
          <ha-switch
            .checked=${!0===this._config.hide_header}
            data-config-value="hide_header"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Compact (list mode: round in column)</label>
          <ha-switch
            .checked=${!0===this._config.compact}
            data-config-value="compact"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div class="option">
          <label>Tree: include Playoffs</label>
          <ha-switch
            .checked=${!0===this._config.tree_show_playoffs}
            data-config-value="tree_show_playoffs"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>
        <div>
          <label class="field-label">Skin</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            <option value="dark" ?selected=${"dark"===(this._config.skin||"dark")}>Dark</option>
            <option value="light" ?selected=${"light"===this._config.skin}>Light</option>
          </select>
        </div>
        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            <option value="" ?selected=${!this._config.language}>Auto (HA locale)</option>
            <option value="en" ?selected=${"en"===this._config.language}>English</option>
            <option value="it" ?selected=${"it"===this._config.language}>Italiano</option>
            <option value="fr" ?selected=${"fr"===this._config.language}>Français</option>
            <option value="es" ?selected=${"es"===this._config.language}>Español</option>
            <option value="nl" ?selected=${"nl"===this._config.language}>Nederlands</option>
          </select>
        </div>
      </div>
    `}}),customElements.define("sports-live-game",class extends oe{static get properties(){return{hass:{},_config:{},_popupOpen:{type:Boolean}}}constructor(){super(),this._popupOpen=!1}setConfig(e){if(!e.entity)throw new Error("Entity required");this._config=e,ue(this,e)}getCardSize(){return 3}static getConfigElement(){return document.createElement("sports-live-game-editor")}static getStubConfig(){return{entity:""}}_openLink(e){e&&window.open(e,"_blank","noopener,noreferrer")}_toHex(e){if(!e)return null;const t=String(e).replace(/^#/,"");return/^[0-9a-fA-F]{6}$/.test(t)?`#${t}`:null}_getTeamUrl(e){const t=(e||"").match(/\/i\/teamlogos\/(\w+)\/\d+\/([^./?]+)\.png/);if(!t)return"";const[,a,i]=t;return/^\d+$/.test(i)?`https://www.espn.com/${a}/team/_/id/${i}`:`https://www.espn.com/${a}/team/_/name/${i}`}_countdown(e){if(!e)return"";const t=new Date(e)-Date.now();if(t<=0)return"";const a=Math.floor(t/1e3),i=Math.floor(a/86400),s=Math.floor(a%86400/3600),n=Math.floor(a%3600/60);return i>0?`In ${i}d ${s}h`:s>0?`In ${s}h ${n}m`:`In ${n}m`}_getBroadcast(e){const t=(this._config.broadcast_region||"uk").toLowerCase();return"us"===t?e.broadcast||"":"both"===t?[e.broadcast,e.broadcast_uk].filter(Boolean).join(" / "):e.broadcast_uk||""}_renderWinProb(e){const t=e.home_win_probability,a=e.away_win_probability;if(null==t||null==a)return"";const i=parseFloat(t).toFixed(0),s=parseFloat(a).toFixed(0);return U`
      <div class="win-prob">
        <div class="prob-labels">
          <span>${i}%</span>
          <span class="prob-mid">Win Probability</span>
          <span>${s}%</span>
        </div>
        <div class="prob-track">
          <div class="prob-home" style="width:${i}%"></div>
          <div class="prob-away" style="width:${s}%"></div>
        </div>
      </div>
    `}_renderDownDistance(e){return e.down_distance_text?U`<div class="down-distance">${e.down_distance_text}</div>`:""}_renderTimeouts(e){const t=e.home_timeouts,a=e.away_timeouts;if(null==t&&null==a)return"";const i=e=>{const t=parseInt(e,10)||0;return Array.from({length:3},((e,a)=>U`
        <span class="to-dot ${a<t?"on":""}"></span>
      `))};return U`
      <div class="timeouts-row">
        <div class="to-side">${i(t)}</div>
        <span class="to-label">TO</span>
        <div class="to-side">${i(a)}</div>
      </div>
    `}_renderBaseball(e){const{balls:t,strikes:a,outs:i,on_first:s,on_second:n,on_third:o}=e;return null==t&&null==a&&null==i?"":U`
      <div class="baseball-row">
        <div class="bso">
          <div class="bso-item"><span class="bso-num">${t??"-"}</span><span class="bso-key">B</span></div>
          <div class="bso-item"><span class="bso-num">${a??"-"}</span><span class="bso-key">S</span></div>
          <div class="bso-item"><span class="bso-num">${i??"-"}</span><span class="bso-key">O</span></div>
        </div>
        <div class="bases-diamond">
          <div class="bases-row top"><div class="base ${n?"occupied":""}"></div></div>
          <div class="bases-row mid">
            <div class="base ${o?"occupied":""}"></div>
            <div class="base home-plate"></div>
            <div class="base ${s?"occupied":""}"></div>
          </div>
        </div>
      </div>
    `}_renderLastPlay(e){return e.last_play?U`
      <div class="last-play-wrap">
        <span class="last-play-text">${e.last_play}</span>
      </div>
    `:""}_renderPeriodLabel(e){const t=e.period;if(!t||"N/A"===t)return"";const a=parseInt(t,10),i=(e.status||"").toLowerCase();if(i.includes("half")||i.includes("over")||i.includes("end"))return U`<div class="period-label">${e.status}</div>`;const s=["st","nd","rd","th"][Math.min(a-1,3)]||"th";return U`<div class="period-label">${a}${s}</div>`}_renderOdds(e){return this._config.show_odds&&(e.odds_details||null!=e.over_under)?U`
      <div class="odds-row">
        ${e.odds_details?U`<span class="odds-chip">${e.odds_details}</span>`:""}
        ${null!=e.over_under?U`<span class="odds-chip">O/U ${e.over_under}</span>`:""}
      </div>
    `:""}_renderPopup(e,t,a,i){if(!this._popupOpen)return"";const s=this._getBroadcast(e),n=e.match_details||[];return U`
      <div class="popup-overlay"
        @click="${e=>{e.stopPropagation(),e.target===e.currentTarget&&(this._popupOpen=!1)}}"
      >
        <div class="popup">
          <div class="popup-header" style="background: linear-gradient(135deg, ${a}, ${i})">
            <span class="popup-title">${e.home_team} vs ${e.away_team}</span>
            <button class="popup-close" @click="${e=>{e.stopPropagation(),this._popupOpen=!1}}">✕</button>
          </div>
          <div class="popup-body">
            ${e.status_detail?U`<div class="popup-row"><span class="popup-label">Status</span><span>${e.status_detail}</span></div>`:""}
            ${e.venue?U`<div class="popup-row"><span class="popup-label">Venue</span><span>${e.venue}${e.venue_city?`, ${e.venue_city}`:""}</span></div>`:""}
            ${e.date?U`<div class="popup-row"><span class="popup-label">Date</span><span>${e.date}</span></div>`:""}
            ${e.attendance?U`<div class="popup-row"><span class="popup-label">Attendance</span><span>${Number(e.attendance).toLocaleString()}</span></div>`:""}
            ${s?U`<div class="popup-row"><span class="popup-label">TV</span><span>${s}</span></div>`:""}
            ${e.odds_details?U`<div class="popup-row"><span class="popup-label">Odds</span><span>${e.odds_details}</span></div>`:""}
            ${null!=e.over_under?U`<div class="popup-row"><span class="popup-label">O/U</span><span>${e.over_under}</span></div>`:""}
            ${null!=e.home_win_probability?U`<div class="popup-row"><span class="popup-label">${e.home_abbrev||"Home"} win%</span><span>${parseFloat(e.home_win_probability).toFixed(0)}%</span></div>`:""}
            ${e.home_record?U`<div class="popup-row"><span class="popup-label">${e.home_abbrev||"Home"}</span><span>${e.home_record}</span></div>`:""}
            ${e.away_record?U`<div class="popup-row"><span class="popup-label">${e.away_abbrev||"Away"}</span><span>${e.away_record}</span></div>`:""}
            ${n.length?U`
              <div class="popup-section">Events</div>
              ${n.slice(0,6).map((e=>U`<div class="popup-event">${e}</div>`))}
            `:""}
            ${t?U`
              <button class="popup-espn" @click="${e=>{e.stopPropagation(),this._openLink(t)}}">
                View on ESPN →
              </button>
            `:""}
          </div>
        </div>
      </div>
    `}render(){if(!this.hass||!this._config)return U``;const e=this.hass.states[this._config.entity];if(!e)return U`<ha-card class="empty">Unknown entity: ${this._config.entity}</ha-card>`;const t=e.attributes.matches||[];if(!t.length)return U`<ha-card class="empty">No match data available</ha-card>`;const a=t[0],i="in"===a.state,s="post"===a.state,n=!i&&!s,o=i||s,r=a.event_url||"",l=!1!==this._config.show_stadium,c=!1!==this._config.show_countdown,d=!1!==this._config.show_popup,p=this._toHex(a.home_color)||"#6366f1",h=this._toHex(a.away_color)||"#ec4899",g=this._getTeamUrl(a.home_logo),u=this._getTeamUrl(a.away_logo),f=this._config.score_size||"normal",m=c&&n?this._countdown(a.date_iso):"";return U`
      <ha-card
        class="${i?"live":s?"post":"pre"}"
        style="--hc: ${p}; --ac: ${h};"
        @click="${()=>{d?this._popupOpen=!0:r&&this._openLink(r)}}"
      >
        <div class="splash" aria-hidden="true"></div>
        <div class="bg-logos" aria-hidden="true">
          <div class="bg-logo home"><img src="${a.home_logo}" alt="" /></div>
          <div class="bg-logo away"><img src="${a.away_logo}" alt="" /></div>
        </div>

        <div class="top-bar">
          <span class="league">${a.league_name&&"N/A"!==a.league_name?a.league_name:""}</span>
          ${i?U`<span class="badge live-badge"><span class="dot"></span>LIVE</span>`:s?U`<span class="badge ft-badge">FINAL</span>`:U`<span class="badge pre-badge">${a.date||"Upcoming"}</span>`}
        </div>

        <div class="scoreboard">
          <div class="team">
            <div class="logo-wrap home-glow"
              @click="${e=>{e.stopPropagation(),this._openLink(g||r)}}"
            >
              <img class="logo" src="${a.home_logo}" alt="${a.home_team}" />
            </div>
            <div class="team-name">${a.home_team}</div>
            ${a.home_record?U`<div class="record">${a.home_record}</div>`:""}
          </div>

          <div class="center">
            ${o?U`
                  <div class="score score-${f}">
                    <span>${a.home_score}</span>
                    <span class="dash">–</span>
                    <span>${a.away_score}</span>
                  </div>
                `:U`<div class="vs">VS</div>`}
            <div class="clock-row">
              ${i?U`<span class="clock clk-live"><span class="dot"></span>${a.clock&&"N/A"!==a.clock?a.clock:a.status||""}</span>`:s?U`<span class="clock clk-ft">Full Time</span>`:U`<span class="clock clk-pre">${a.date||""}</span>`}
            </div>
            ${i?this._renderPeriodLabel(a):""}
          </div>

          <div class="team">
            <div class="logo-wrap away-glow"
              @click="${e=>{e.stopPropagation(),this._openLink(u||r)}}"
            >
              <img class="logo" src="${a.away_logo}" alt="${a.away_team}" />
            </div>
            <div class="team-name">${a.away_team}</div>
            ${a.away_record?U`<div class="record">${a.away_record}</div>`:""}
          </div>
        </div>

        ${n&&l&&a.venue?U`<div class="stadium">${a.venue}${a.venue_city?" · "+a.venue_city:""}</div>`:""}
        ${n&&m?U`<div class="countdown">${m}</div>`:""}
        ${n?this._renderOdds(a):""}

        ${i?this._renderDownDistance(a):""}
        ${i?this._renderTimeouts(a):""}
        ${i?this._renderBaseball(a):""}
        ${i?this._renderLastPlay(a):""}
        ${i?this._renderWinProb(a):""}

        ${s&&l&&a.venue?U`<div class="stadium">${a.venue}${a.venue_city?" · "+a.venue_city:""}</div>`:""}

        <div class="tap-hint">
          ${d?"Tap for details · Tap logo for ESPN team page":r?"Tap to view on ESPN →":""}
        </div>

        ${this._renderPopup(a,r,p,h)}
      </ha-card>
    `}static get styles(){return[he,n`
        :host {
          display: block;
          --hc: #6366f1;
          --ac: #ec4899;
        }

        ha-card {
          position: relative; overflow: hidden; border-radius: 20px;
          background: var(--cl-bg, #0f172a);
          color: var(--cl-text, #f8fafc);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
          cursor: pointer; user-select: none;
        }
        ha-card.empty {
          padding: 24px; text-align: center;
          color: var(--cl-text-2, #94a3b8); cursor: default;
        }

        /* ── Background ─────────────────────────────────────────────────────── */
        .splash {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 65% 100% at 0% 50%, var(--hc) 0%, transparent 70%),
            radial-gradient(ellipse 65% 100% at 100% 50%, var(--ac) 0%, transparent 70%);
          opacity: 0.22; pointer-events: none; z-index: 0;
        }
        ha-card.live .splash { opacity: 0.30; animation: splash-pulse 3s ease-in-out infinite; }
        @keyframes splash-pulse { 0%, 100% { opacity: 0.30; } 50% { opacity: 0.20; } }

        .bg-logos {
          position: absolute; inset: 0; display: flex; justify-content: space-between;
          pointer-events: none; z-index: 0; overflow: hidden;
        }
        .bg-logo { width: 55%; height: 100%; display: flex; align-items: center; opacity: 0.055; }
        .bg-logo.home { justify-content: flex-start; transform: translateX(-22%) scale(1.25); }
        .bg-logo.away { justify-content: flex-end; transform: translateX(22%) scale(1.25); }
        .bg-logo img { width: 100%; object-fit: contain; }

        .top-bar, .scoreboard, .down-distance, .timeouts-row,
        .baseball-row, .last-play-wrap, .win-prob, .tap-hint,
        .stadium, .countdown, .odds-row { position: relative; z-index: 2; }

        /* ── Top bar ────────────────────────────────────────────────────────── */
        .top-bar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 16px 6px; gap: 8px;
        }
        .league {
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--cl-text-2);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .badge {
          flex-shrink: 0; font-size: 9px; font-weight: 900; letter-spacing: 0.1em;
          padding: 3px 10px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 5px;
        }
        .live-badge {
          background: #ef4444; color: white;
          box-shadow: 0 0 14px rgba(239,68,68,0.55);
          animation: live-glow 2s ease-in-out infinite;
        }
        .ft-badge { background: rgba(16,185,129,0.2); color: #10b981; }
        .pre-badge { background: var(--cl-surface); color: var(--cl-text-2); font-size: 10px; }
        .live-badge .dot, .clk-live .dot {
          width: 5px; height: 5px; border-radius: 50%; background: white;
          animation: blink-dot 1.3s ease-in-out infinite;
        }
        @keyframes live-glow {
          0%, 100% { box-shadow: 0 0 14px rgba(239,68,68,0.55); }
          50% { box-shadow: 0 0 24px rgba(239,68,68,0.85); }
        }
        @keyframes blink-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }

        /* ── Scoreboard ─────────────────────────────────────────────────────── */
        .scoreboard {
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; gap: 8px; padding: 12px 16px 20px;
        }
        .team { display: flex; flex-direction: column; align-items: center; gap: 7px; text-align: center; }
        .logo-wrap {
          position: relative; width: 76px; height: 76px;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .logo-wrap::after {
          content: ""; position: absolute; inset: -8px; border-radius: 50%; opacity: 0; transition: opacity 0.3s;
        }
        .home-glow::after { background: radial-gradient(circle, var(--hc), transparent 70%); }
        .away-glow::after { background: radial-gradient(circle, var(--ac), transparent 70%); }
        ha-card.live .logo-wrap::after { opacity: 0.28; animation: logo-pulse 4s ease-in-out infinite; }
        @keyframes logo-pulse { 0%, 100% { opacity: 0.28; } 50% { opacity: 0.14; } }
        .logo {
          width: 68px; height: 68px; object-fit: contain;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.45));
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .logo-wrap:hover .logo { transform: scale(1.08); }
        .team-name { font-size: 12px; font-weight: 800; line-height: 1.2; max-width: 95px; color: var(--cl-text); }
        .record { font-size: 10px; color: var(--cl-text-2); font-weight: 600; }

        .center { display: flex; flex-direction: column; align-items: center; gap: 5px; min-width: 88px; }
        .score {
          display: flex; align-items: baseline; gap: 4px;
          font-size: 54px; font-weight: 900; line-height: 1;
          font-variant-numeric: tabular-nums; letter-spacing: -0.04em;
          color: var(--cl-text);
          text-shadow: 0 2px 16px rgba(0,0,0,0.4);
          animation: score-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) backwards;
        }
        .score.score-big { font-size: 68px; }
        .score.score-huge { font-size: 82px; }
        @keyframes score-pop { from { transform: scale(0.6); opacity: 0; } }
        .dash { opacity: 0.3; font-size: 40px; font-weight: 700; margin: 0 2px; }
        .vs { font-size: 30px; font-weight: 800; color: var(--cl-text-2); letter-spacing: 0.12em; }
        .clock-row { display: flex; justify-content: center; }
        .clock {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 700; padding: 3px 10px;
          border-radius: 999px; font-variant-numeric: tabular-nums;
        }
        .clk-live { color: #ef4444; background: rgba(239,68,68,0.14); }
        .clk-ft   { color: #10b981; background: rgba(16,185,129,0.14); }
        .clk-pre  { color: var(--cl-text-2); background: var(--cl-surface); font-size: 10px; }
        .period-label { font-size: 10px; font-weight: 700; color: var(--cl-text-2); letter-spacing: 0.05em; text-align: center; }

        /* ── Stadium / Countdown / Odds ─────────────────────────────────────── */
        .stadium {
          margin: 0 16px 4px; text-align: center;
          font-size: 11px; font-weight: 600; color: var(--cl-text-2); letter-spacing: 0.02em;
        }
        .countdown {
          margin: 0 16px 8px; text-align: center;
          font-size: 14px; font-weight: 900; color: var(--cl-text); letter-spacing: 0.03em;
        }
        .odds-row { display: flex; justify-content: center; gap: 8px; padding: 0 16px 10px; flex-wrap: wrap; }
        .odds-chip {
          font-size: 10px; font-weight: 700; padding: 3px 10px;
          background: var(--cl-surface); border-radius: 999px; color: var(--cl-text-2);
        }

        /* ── NFL down / distance ────────────────────────────────────────────── */
        .down-distance {
          margin: 0 16px 10px; padding: 5px 14px;
          background: var(--cl-surface); border-radius: 8px; text-align: center;
          font-size: 11px; font-weight: 800; color: var(--cl-text-2); letter-spacing: 0.04em;
        }

        /* ── NFL timeouts ───────────────────────────────────────────────────── */
        .timeouts-row {
          display: flex; justify-content: center; align-items: center;
          gap: 10px; padding: 0 16px 10px;
        }
        .to-side { display: flex; gap: 4px; }
        .to-dot {
          width: 7px; height: 7px; border-radius: 50%;
          border: 1.5px solid var(--cl-divider); background: transparent; transition: all 0.2s;
        }
        .to-dot.on { background: #fbbf24; border-color: #fbbf24; box-shadow: 0 0 5px rgba(251,191,36,0.6); }
        .to-label { font-size: 9px; font-weight: 800; letter-spacing: 0.1em; color: var(--cl-text-2); }

        /* ── MLB baseball ───────────────────────────────────────────────────── */
        .baseball-row {
          display: flex; justify-content: center; align-items: center;
          gap: 22px; padding: 0 16px 12px;
        }
        .bso { display: flex; gap: 10px; background: var(--cl-surface); border-radius: 10px; padding: 8px 14px; }
        .bso-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .bso-num { font-size: 22px; font-weight: 900; color: var(--cl-text); font-variant-numeric: tabular-nums; line-height: 1; }
        .bso-key { font-size: 9px; font-weight: 800; letter-spacing: 0.08em; color: var(--cl-text-2); text-transform: uppercase; }
        .bases-diamond { display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .bases-row { display: flex; gap: 4px; align-items: center; justify-content: center; }
        .base {
          width: 14px; height: 14px; border: 2px solid var(--cl-divider);
          border-radius: 2px; transform: rotate(45deg); background: transparent; transition: all 0.2s;
        }
        .base.occupied { background: #fbbf24; border-color: #fbbf24; box-shadow: 0 0 8px rgba(251,191,36,0.7); }
        .base.home-plate { background: var(--cl-surface-2); border-color: var(--cl-divider); width: 10px; height: 10px; }

        /* ── Last play ──────────────────────────────────────────────────────── */
        .last-play-wrap {
          padding: 0 16px 10px; overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }
        .last-play-text {
          display: inline-block; font-size: 11px; font-weight: 600; color: var(--cl-text-2);
          white-space: nowrap; animation: scroll-play 16s linear infinite;
        }
        @keyframes scroll-play { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }

        /* ── Win probability ────────────────────────────────────────────────── */
        .win-prob { padding: 0 16px 12px; }
        .prob-labels {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 10px; font-weight: 700; color: var(--cl-text-2); margin-bottom: 4px;
        }
        .prob-mid { font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.7; }
        .prob-track { height: 5px; border-radius: 999px; background: var(--cl-surface); display: flex; overflow: hidden; }
        .prob-home { height: 100%; background: var(--hc); border-radius: 999px 0 0 999px; transition: width 1s cubic-bezier(0.16,1,0.3,1); }
        .prob-away { height: 100%; background: var(--ac); margin-left: auto; border-radius: 0 999px 999px 0; transition: width 1s cubic-bezier(0.16,1,0.3,1); }

        /* ── Tap hint ───────────────────────────────────────────────────────── */
        .tap-hint {
          text-align: center; font-size: 9px; color: var(--cl-text-2); opacity: 0.5;
          padding: 3px 16px 10px; letter-spacing: 0.04em; position: relative; z-index: 2;
        }

        /* ── Stats popup ────────────────────────────────────────────────────── */
        .popup-overlay {
          position: absolute; inset: 0; z-index: 100;
          background: var(--cl-overlay-strong);
          display: flex; align-items: flex-end;
          border-radius: 20px; overflow: hidden;
        }
        .popup {
          width: 100%; border-radius: 20px 20px 0 0;
          background: var(--cl-bg); overflow: hidden;
          animation: popup-slide 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes popup-slide { from { transform: translateY(100%); opacity: 0; } }
        .popup-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 16px; font-size: 12px; font-weight: 800; color: white;
        }
        .popup-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .popup-close {
          flex-shrink: 0; background: rgba(255,255,255,0.2); border: none; cursor: pointer;
          color: white; font-size: 13px; width: 26px; height: 26px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center; padding: 0;
        }
        .popup-body {
          padding: 12px 16px 16px; display: flex; flex-direction: column; gap: 7px;
          max-height: 260px; overflow-y: auto;
        }
        .popup-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
        .popup-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--cl-text-2); min-width: 70px; flex-shrink: 0;
        }
        .popup-row > span:last-child { font-size: 12px; color: var(--cl-text); text-align: right; }
        .popup-section {
          font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--cl-text-2); border-top: 1px solid var(--cl-divider); padding-top: 8px; margin-top: 2px;
        }
        .popup-event { font-size: 11px; color: var(--cl-text-2); padding: 2px 0; }
        .popup-espn {
          width: 100%; margin-top: 8px;
          background: linear-gradient(135deg, var(--hc), var(--ac));
          color: white; border: none; cursor: pointer;
          font-size: 12px; font-weight: 800; letter-spacing: 0.04em;
          padding: 10px 16px; border-radius: 10px; transition: opacity 0.2s;
        }
        .popup-espn:hover { opacity: 0.85; }
      `]}}),window.customCards=window.customCards||[],window.customCards.push({type:"sports-live-game",name:"Sports Live Game Card",description:"Team-color game card with live sport-specific data, popup stats, and ESPN links.",preview:!1,documentationURL:"https://github.com/andrejkurlovic/ha-sports-live-card"}),customElements.define("sports-live-game-editor",class extends oe{static get properties(){return{_config:{type:Object},hass:{type:Object},entities:{type:Array}}}constructor(){super(),this.entities=[]}static get styles(){return n`
      .card-config { display: flex; flex-direction: column; gap: 16px; }
      .option { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      label { font-size: 14px; color: var(--primary-text-color); }
      h3 {
        margin: 8px 0 0; font-size: 13px; text-transform: uppercase;
        letter-spacing: 0.05em; color: var(--secondary-text-color);
      }
      .field-label {
        display: block; font-size: 12px; font-weight: 600;
        color: var(--secondary-text-color); margin-bottom: 4px;
      }
      select {
        width: 100%; padding: 10px 12px; font-size: 14px;
        border-radius: 8px; border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000); box-sizing: border-box;
      }
      select:focus { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: -1px; }
    `}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}get config(){return this._config}updated(e){e.has("hass")&&this._fetchEntities()}_fetchEntities(){this.hass&&(this.entities=Object.keys(this.hass.states).filter((e=>{if(!e.startsWith("sensor."))return!1;const t=this.hass.states[e]?.attributes;return void 0!==t?.sport&&Array.isArray(t?.matches)})).sort())}_fire(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this.requestUpdate()}_entityChanged(e){const t=e.target.value;t!==this._config.entity&&this._fire({...this._config,entity:t})}_selectChanged(e){const t=e.target.dataset.configValue,a=e.target.value;t&&a!==String(this._config[t]??"")&&this._fire({...this._config,[t]:a})}_switchChanged(e){const t=e.target;if(!t.dataset?.configValue)return;const a=t.dataset.configValue,i=t.checked;this._config[a]!==i&&this._fire({...this._config,[a]:i})}render(){if(!this._config||!this.hass)return U``;const e=this._config.entity||"",t=e&&this.entities.includes(e);return U`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity (next_match or team sensor)</label>
          <select @change=${this._entityChanged}>
            ${t?"":U`<option value="${e}" selected>${e||"— select —"}</option>`}
            ${this.entities.map((t=>U`<option value="${t}" ?selected=${t===e}>${t}</option>`))}
          </select>
        </div>

        <h3>Display</h3>

        <div class="option">
          <label>Show Stats Popup (on card tap)</label>
          <ha-switch
            .checked=${!1!==this._config.show_popup}
            data-config-value="show_popup"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Show Stadium / Venue</label>
          <ha-switch
            .checked=${!1!==this._config.show_stadium}
            data-config-value="show_stadium"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Show Kickoff Countdown</label>
          <ha-switch
            .checked=${!1!==this._config.show_countdown}
            data-config-value="show_countdown"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Show Odds (pre-match)</label>
          <ha-switch
            .checked=${!0===this._config.show_odds}
            data-config-value="show_odds"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div>
          <label class="field-label">Score Size</label>
          <select data-config-value="score_size" @change=${this._selectChanged}>
            <option value="normal" ?selected=${"normal"===(this._config.score_size||"normal")}>Normal</option>
            <option value="big" ?selected=${"big"===this._config.score_size}>Big</option>
            <option value="huge" ?selected=${"huge"===this._config.score_size}>Huge</option>
          </select>
        </div>

        <h3>Settings</h3>

        <div>
          <label class="field-label">TV Broadcast Region</label>
          <select data-config-value="broadcast_region" @change=${this._selectChanged}>
            <option value="uk" ?selected=${"uk"===(this._config.broadcast_region||"uk")}>UK (default)</option>
            <option value="us" ?selected=${"us"===this._config.broadcast_region}>US</option>
            <option value="both" ?selected=${"both"===this._config.broadcast_region}>Both</option>
          </select>
        </div>

        <div>
          <label class="field-label">Skin</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            <option value="dark" ?selected=${"dark"===(this._config.skin||"dark")}>Dark</option>
            <option value="light" ?selected=${"light"===this._config.skin}>Light</option>
          </select>
        </div>

        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            <option value="" ?selected=${!this._config.language}>Auto (HA locale)</option>
            <option value="en" ?selected=${"en"===this._config.language}>English</option>
            <option value="it" ?selected=${"it"===this._config.language}>Italiano</option>
            <option value="fr" ?selected=${"fr"===this._config.language}>Français</option>
            <option value="es" ?selected=${"es"===this._config.language}>Español</option>
            <option value="nl" ?selected=${"nl"===this._config.language}>Nederlands</option>
          </select>
        </div>
      </div>
    `}})})();