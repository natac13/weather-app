(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{255:function(e,a,t){"use strict";t.d(a,"b",function(){return n}),t.d(a,"a",function(){return r}),t.d(a,"c",function(){return o}),t.d(a,"d",function(){return i});var n="https://api.openweathermap.org/data/2.5/forecast/daily?",r="https://api.openweathermap.org/data/2.5/weather?",o="km/h",i={Clouds:{photographer:"Alin Rusu",photoId:"4dvdBcu9Yts",filename:"Clouds.jpg"},Clear:{photographer:"Jan Jakub Nanista",photoId:"0D1DkFGz9cA",filename:"Clear.jpg"},Thunderstorm:{photographer:"Drew Hays",photoId:"JHHDUs23wjA",filename:"Thunderstorm.jpg"},Rain:{photographer:"reza shayestehpour",photoId:"Nw_D8v79PM4",filename:"Rain.jpg"},Snow:{photographer:"Jessica Fadel",photoId:"SH4GNXNj1RA",filename:"Snow.jpg"},Forecast:{photographer:"Tom Barrett",photoId:"7FNOH-qSxMI",filename:"Forecase.jpg"}}},256:function(e,a,t){"use strict";a.a={weatherApi:"f7cdab8cea8e6b1880e08c20a944bf53"}},257:function(e,a,t){"use strict";t.d(a,"b",function(){return r}),t.d(a,"a",function(){return o});var n=t(241),r=function(e){return(parseInt(e,10)-273.15).toFixed(1)},o=(Object(n.a)(function(e){return(parseInt(e,10)+273.15).toFixed(1)},function(e){return((parseInt(e,10)-32)/1.8).toFixed(1)}),Object(n.a)(function(e){return(1.8*parseInt(e,10)+32).toFixed(1)},r),function(e){var a=parseInt(e,10),t=["N","NE","E","SE","S","SW","W","NW"],n=360/(2*t.length);return t[Math.round(a/n/2)]})},258:function(e,a,t){e.exports={"common-btn":"common-btn__3JEO0yaEO",commonBtn:"common-btn__3JEO0yaEO",wrapper:"wrapper__YgtHLzled",attribution:"attribution__1tYO2FVZY"}},262:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(1),i=t.n(o),s=t(22),c=t.n(s),l=t(258),u=t.n(l);function p(e){var a=e.photoId,t=e.photographer;return r.a.createElement("div",{className:u.a.wrapper},r.a.createElement(c.a,{variant:"caption"},"Background Photo by:"),r.a.createElement(c.a,{variant:"body1",className:u.a.attribution},r.a.createElement("a",{href:"https://unsplash.com/photos/".concat(a),className:u.a.photographer,target:"_blank"},t)," ","on"," ",r.a.createElement("a",{href:"https://unsplash.com/",className:u.a.upsplash,target:"_blank"},"Unsplash")))}p.propTypes={photographer:i.a.string.isRequired,photoId:i.a.string.isRequired},a.a=p},263:function(e,a,t){e.exports={"common-btn":"common-btn__2rppgphpN",commonBtn:"common-btn__2rppgphpN",wrapper:"wrapper__1o-KTT1ME",backdrop:"backdrop__1XouT2_Hn",loading:"loading__65o_R4rqr",clouds:"clouds__39VP8jJ82",clear:"clear__2ZKQae3dp",snow:"snow__3vRFXt4_R",rain:"rain__IJUZoapN_",drizzle:"drizzle__2V9l7Lv-2",thunderstorm:"thunderstorm__XG1IqG0Tg","current-weather":"current-weather__3dx2R-9vg",currentWeather:"current-weather__3dx2R-9vg",location:"location__3ESCtxSk3",weatherIcon:"weatherIcon__39GslU8Pp",extras:"extras__kByRdk_x8",wind:"wind__2EfGHZAUv",windGust:"windGust__kVrAY6HfV",humidity:"humidity__2F1q3e4wR",pressure:"pressure__1QSC3O8PQ",sunrise:"sunrise__2g8AxbQy_",sunset:"sunset__1gxzNThg_"}},268:function(e,a,t){"use strict";t.r(a);var n=t(239),r=t.n(n),o=t(0),i=t.n(o),s=t(237),c=t.n(s),l=t(238),u=t.n(l),p=t(242),m=t(240),d=t(8),h=t.n(d),_=t(22),g=t.n(_),f=t(46),v=t.n(f),w=t(66),b=t.n(w),E=t(262),y=t(1),N=t.n(y);function I(e){var a=e.classname,t=e.title,n=e.value,r=e.units,o=e.extra;return i.a.createElement("div",{className:a},i.a.createElement(g.a,{variant:"subtitle1"},t),i.a.createElement(g.a,{variant:"body1"},n,r?i.a.createElement("span",null,r," ",o):null))}I.propTypes={classname:N.a.string.isRequired,title:N.a.string.isRequired,value:N.a.oneOfType([N.a.string,N.a.number]),units:N.a.string,extra:N.a.string},I.defaultProps={value:null,units:null,extra:null};var x=I,O=t(256),j=t(255),S=t(257),k=t(263),R=t.n(k);function F(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function T(e,a){return function(e){if(Array.isArray(e))return e}(e)||function(e,a){var t=[],n=!0,r=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(t.push(i.value),!a||t.length!==a);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(r)throw o}}return t}(e,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var A=function(e){var a,t=e.position,n=T(Object(o.useState)({}),2),s=n[0],l=n[1],d=T(Object(o.useState)(!1),2),_=d[0],f=d[1],w="currentWeather",y=function(e){var a=e.latitude,t=e.longitude;c.a.get("".concat(j.a,"lat=").concat(a,"&lon=").concat(t,"&APPID=").concat(O.a.weatherApi)).then(function(e){var a=e.data,t={weatherData:a,time:new Date};localStorage.setItem(w,JSON.stringify(t)),l(a)}).catch(function(e){f(!0),console.error(e)})};Object(o.useEffect)(function(){var e=JSON.parse(localStorage.getItem(w));if(u()(e))y(t);else{var a=new Date(e.time),n=new Date;30>Object(p.a)(a,n)?l(e.weatherData):y(t)}},[t]);var N=s.name,I=s.dt,k=void 0===I?0:I,A=s.weather,D=void 0===A?[{}]:A,J=s.main,P=void 0===J?{}:J,z=s.wind,G=void 0===z?{}:z,H=s.sys,C=void 0===H?{}:H;s.id,console.log(s);var q=D[0],M=q.icon,W=q.description,B=q.main,U=P.temp,V=P.pressure,Y=P.humidity,Q=(P.temp_min,P.temp_max,G.speed),X=G.deg,Z=G.gust,L=void 0===Z?0:Z,K=C.sunrise,$=void 0===K?0:K,ee=C.sunset,ae=void 0===ee?0:ee,te=C.country,ne=Object(m.a)("h:mm a"),re=Object(S.b)(U),oe=r()(W),ie=Object(m.a)("eee MMMM do @ h:mm a")(1e3*k),se=(3.6*parseInt(Q,10)).toFixed(),ce=(3.6*parseInt(L,10)).toFixed();console.log(B);var le=h()((F(a={},R.a.backdrop,!0),F(a,R.a.clouds,"Clouds"===B),F(a,R.a.clear,"Clear"===B),F(a,R.a.snow,"Snow"===B),F(a,R.a.rain,"Rain"===B||"Drizzle"===B),F(a,R.a.thunderstorm,"Thunderstorm"===B),a));return i.a.createElement("section",{className:R.a.wrapper},i.a.createElement("div",{className:le}),i.a.createElement(E.a,j.d[B]),_?i.a.createElement(i.a.Fragment,null,i.a.createElement(b.a,{color:"secondary",className:R.a.loading}),i.a.createElement(g.a,{variant:"h3"},"There was an error loading data.")):i.a.createElement(v.a,{className:R.a.currentWeather},i.a.createElement("section",{className:R.a.location},i.a.createElement(g.a,{variant:"h4",align:"left"},N,", ",te),i.a.createElement(g.a,{variant:"caption",align:"left"},"Last updated: ",ie)),i.a.createElement("section",{className:R.a.temperature},i.a.createElement(g.a,{variant:"h2",component:"h2",align:"center"},re,"°C"),i.a.createElement(g.a,{variant:"subtitle1",align:"center"},oe)),i.a.createElement("figure",{className:R.a.weatherIcon},i.a.createElement("img",{src:"http://openweathermap.org/img/w/".concat(M,".png"),alt:B})),i.a.createElement("section",{className:R.a.extras},i.a.createElement(x,{classname:R.a.wind,title:"Wind",value:se,units:j.c,extra:Object(S.a)(X)}),i.a.createElement(x,{classname:R.a.windGust,title:"Wind Gust",value:"0"===ce?"N/A":ce,units:"0"===ce?null:j.c}),i.a.createElement(x,{classname:R.a.humidity,title:"Humidity",value:Y,units:"%"}),i.a.createElement(x,{classname:R.a.pressure,title:"Pressure",value:V,units:" kPa"}),i.a.createElement(x,{classname:R.a.sunrise,title:"Sunrise",value:ne(1e3*$)}),i.a.createElement(x,{classname:R.a.sunset,title:"Sunset",value:ne(1e3*ae)}))))};t.d(a,"default",function(){return A})}}]);
//# sourceMappingURL=4.60f62a.js.map