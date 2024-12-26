/*
(()=>{let e=async function(e,t){try{let a=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),r=await Promise.race([a,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),s=await r.json();if(!r.ok)throw Error(`${s.message} (${r.status})`);return s}catch(e){throw e}},t={classData:{},fromDate:"",tillDate:"",currentDate:new Date,previousMonday:"",currentMonday:"",nextMonday:""},a=async function(a=t.currentMonday,r=t.nextMonday){try{let s=await e("https://services.truyoga.in/api/product/getGroupClassesForWebflow",{fromDate:a,tillDate:r});t.classData=s.body}catch(e){throw e}},r=function(e=t.currentDate){s(e),n(),i()},s=function(e){let a=e?new Date(e):new Date;return a.setDate(a.getDate()-a.getDay()+1),t.currentMonday=a,a},n=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()-7),t.previousMonday=e},i=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()+7),t.nextMonday=e};r();class l{_data;setData(e){this._data=e}render(e,t){let a=this._generateMarkup(e);t.insertAdjacentHTML("afterbegin",a)}_clear(e){e.innerHTML=""}renderSpinner(){let e=`<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;this._clear(),this.parentElement.insertAdjacentHTML("afterbegins",e)}}class c extends l{_parentEl=document.querySelector(".classes-dates-container");_tabLinkArr=Array.from(this._parentEl.querySelectorAll(".class-date-wrapper"));_nextArrow=document.querySelector('[data-week="Next"]');_previousArrow=document.querySelector('[data-week="Previous"]');addHandlerRender(e){e(),this.addSliderArrowEvents(e),setTimeout(()=>{this._makeTabActive(this._data.currentDate)},1e3)}xyz(e){}addSliderArrowEvents(e){this._nextArrow.addEventListener("click",()=>{e(this._data.nextMonday),this._makeTabActive(this._data.currentMonday)}),this._previousArrow.addEventListener("click",()=>{e(this._data.previousMonday),this._makeTabActive(this._data.currentDate)})}controlArrowInteractivity(){this._data.currentDate>this._data.currentMonday?this._previousArrow.classList.add("element-inactive"):this._previousArrow.classList.remove("element-inactive")}updateSlider(e){this.setData(e),this._addSliderDateData(),this._updateTitle(),this._updateTabLink()}_addSliderDateData(){this._tabLinkArr.forEach((e,t)=>{let a=new Date(this._data.currentMonday);a.setDate(a.getDate()+t),e.dataset.date=a})}_updateTabLink(){this._tabLinkArr.forEach(e=>{let t=new Date(e.dataset.date);t.getDate()>=this._data.currentDate.getDate()?e.classList.remove("element-inactive"):e.classList.add("element-inactive");let a=e.querySelector("[data-day]"),r=e.querySelector("[data-date]"),s=`${t.getDate()}`.padStart(2,0),n=`${t}`.slice(0,1);a.innerHTML=n,r.innerHTML=s})}_makeTabActive(e){document.querySelector(`[data-date="${e}"]`).click()}_updateTitle(){let e=document.querySelector("[data-title]"),t=new Date(this._data.currentMonday),a=t.getFullYear(),r=t.toLocaleString("en-US",{month:"long"});e.innerHTML=`${r} ${a}`}}var o=new c;class d extends l{_currentDate=new Date;_currentTime=new Date().getTime();_userLocale=navigator.language;_timeZone=new Intl.DateTimeFormat(this._userLocale,{timeZoneName:"longGeneric"}).format(this._currentDate).split(" ").slice(1).map(e=>e.at(0)).join("");_classData;_targetElement;_allTabLinks=Array.from(document.querySelectorAll(".class-date-wrapper"));_allContentWrapper=Array.from(document.querySelectorAll(".class-content-wrapper"));classListRendererHandler(e){this._allTabLinks.forEach((t,a)=>{t.addEventListener("click",async()=>{let r=t.dataset.date,s=new Date(r),n=new Date(r);n.setDate(n.getDate()+1),this._updateSelectedDateText(s,a),this._targetElement=this._allContentWrapper[a].querySelector(".class-list-wrapper"),await e(`${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()}`,`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()} `);let i=this._filterData(s);this._clear(this._targetElement),i.forEach(e=>this.render(e,this._targetElement))})})}_filterData(e){return this._data.classData.filter(t=>{let a=new Date(t.classDateTime),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()),s=new Date(e.getFullYear(),e.getMonth(),e.getDate());return r.getTime()===s.getTime()})}_updateSelectedDateText(e,t){let a=e.getDate(),r=e.toLocaleDateString("en-US",{month:"long"}).slice(0,3),s=e.getFullYear();this._allContentWrapper[t].querySelector(".class-selected-date-wrapper").innerHTML=`${a} ${r}, ${s}`}_generateMarkup(e){let t=new Date(e.classDateTime),a=new Date(e.classDateTime).toLocaleTimeString("en-US",{timeStyle:"short"}),r=Math.floor((t-new Date)/6e4),s=r>=0&&r<=5,n=new Date(t.getTime()+6e4*e.duration).toLocaleTimeString("en-US",{timeStyle:"short"});return`
        <div class="class-details-wrapper">
            <div id="w-node-_2ca44311-1583-eecc-463d-8915dca86234-a152fdd6" class="class-info-wrapper">
                <div class="class-info-top-div">
                    <div class="class-type">
                    <div class="b6">${e.style[0]}</div>
                    </div>
                    <div class="class-starts ${s?null:"hidden-element"}">
                    <div class="b6">Starts in ${r} min</div>
                    </div>
                </div>
                <div class="class-info-bottom">
                    <div class="b1">${e.className}</div>
                    <div class="color-neutral-900">
                    <div class="b2">with ${e.teacherInfo.name}</div>
                    </div>
                </div>
                </div>
                <div id="w-node-_444ff8d8-6f4a-af1b-6ff5-9d8a268752b8-a152fdd6" class="class-timing-wrapper">
                <div class="b2 semi-bold">${a} - ${n}</div>
                <div class="class-time-zone">
                    <div class="b6">${this._timeZone}</div>
                </div>
                </div>
                <div id="w-node-_3bb0c6c2-99bb-f448-e7c6-9c2c86184fc3-a152fdd6" class="class-booking-btn-wrapper">
                <div class="primary-button size-small ${s?"bg-color-accent-tropical-teal-600":null}">
                    <a href="https://app.shvasa.com/book-class?classId=${e?.id}&teacher=${e?.teacherInfo?.name}&time=${e?.classDateTime}"class="b5 semi-bold color-white">${s?"Join":"Book"}</a>
                </div>
            </div>
        </div>
    `}}var u=new d;let h=async function(e,r){try{await a(e,r),u.setData(t)}catch(e){console.log(e)}};o.addHandlerRender(function(e){try{r(e),o.setData(t),o._addSliderDateData(),o._updateTitle(),o._updateTabLink(),o.controlArrowInteractivity()}catch(e){console.log(e)}}),u.classListRendererHandler(h)})();
//# sourceMappingURL=controller.js.map

*/

/*
(()=>{let e=async function(e,t){try{let a=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),r=await Promise.race([a,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),s=await r.json();if(!r.ok)throw Error(`${s.message} (${r.status})`);return s}catch(e){throw e}},t={classData:{},fromDate:"",tillDate:"",currentDate:new Date,previousMonday:"",currentMonday:"",nextMonday:""},a=async function(a=t.currentMonday,r=t.nextMonday){try{let s=await e("https://services.truyoga.in/api/product/getGroupClassesForWebflow",{fromDate:a,tillDate:r});t.classData=s.body}catch(e){throw e}},r=function(e=t.currentDate){s(e),n(),i()},s=function(e){let a=e?new Date(e):new Date;return a.setDate(a.getDate()-a.getDay()+1),t.currentMonday=a,a},n=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()-7),t.previousMonday=e},i=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()+7),t.nextMonday=e};r();class l{_data;setData(e){this._data=e}render(e,t){let a=this._generateMarkup(e);t.insertAdjacentHTML("afterbegin",a)}_clear(e){e.innerHTML=""}renderSpinner(){let e=`<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;this._clear(),this.parentElement.insertAdjacentHTML("afterbegins",e)}}class c extends l{_parentEl=document.querySelector(".classes-dates-container");_tabLinkArr=Array.from(this._parentEl.querySelectorAll(".class-date-wrapper"));_nextArrow=document.querySelector('[data-week="Next"]');_previousArrow=document.querySelector('[data-week="Previous"]');addHandlerRender(e){e(),this.addSliderArrowEvents(e),setTimeout(()=>{this._makeTabActive(this._data.currentDate)},1e3)}xyz(e){}addSliderArrowEvents(e){this._nextArrow.addEventListener("click",()=>{e(this._data.nextMonday),this._makeTabActive(this._data.currentMonday)}),this._previousArrow.addEventListener("click",()=>{e(this._data.previousMonday);let t=this._data.currentDate>this._data.currentMonday;this._makeTabActive(t?this._data.currentDate:this._data.currentMonday)})}controlArrowInteractivity(){this._data.currentDate>this._data.currentMonday?this._previousArrow.classList.add("element-inactive"):this._previousArrow.classList.remove("element-inactive")}updateSlider(e){this.setData(e),this._addSliderDateData(),this._updateTitle(),this._updateTabLink()}_addSliderDateData(){this._tabLinkArr.forEach((e,t)=>{let a=new Date(this._data.currentMonday);a.setDate(a.getDate()+t),e.dataset.date=a})}_updateTabLink(){this._tabLinkArr.forEach(e=>{let t=new Date(e.dataset.date);t.getDate()>=this._data.currentDate.getDate()?e.classList.remove("element-inactive"):e.classList.add("element-inactive");let a=e.querySelector("[data-day]"),r=e.querySelector("[data-date]"),s=`${t.getDate()}`.padStart(2,0),n=`${t}`.slice(0,1);a.innerHTML=n,r.innerHTML=s})}_makeTabActive(e){document.querySelector(`[data-date="${e}"]`).click()}_updateTitle(){let e=document.querySelector("[data-title]"),t=new Date(this._data.currentMonday),a=t.getFullYear(),r=t.toLocaleString("en-US",{month:"long"});e.innerHTML=`${r} ${a}`}}var d=new c;class o extends l{_currentDate=new Date;_currentTime=new Date().getTime();_userLocale=navigator.language;_timeZone=new Intl.DateTimeFormat(this._userLocale,{timeZoneName:"longGeneric"}).format(this._currentDate).split(" ").slice(1).map(e=>e.at(0)).join("");_classData;_targetElement;_allTabLinks=Array.from(document.querySelectorAll(".class-date-wrapper"));_allContentWrapper=Array.from(document.querySelectorAll(".class-content-wrapper"));classListRendererHandler(e){this._allTabLinks.forEach((t,a)=>{t.addEventListener("click",async()=>{let r=t.dataset.date,s=new Date(r),n=new Date(r);n.setDate(n.getDate()+1),this._updateSelectedDateText(s,a),this._targetElement=this._allContentWrapper[a].querySelector(".class-list-wrapper"),await e(`${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()}`,`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()} `);let i=this._filterData(s).filter(e=>new Date(e.classDateTime)>this._currentTime).filter((e,t)=>t<10);this._clear(this._targetElement),i.forEach(e=>this.render(e,this._targetElement))})})}_filterData(e){return this._data.classData.filter(t=>{let a=new Date(t.classDateTime),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()),s=new Date(e.getFullYear(),e.getMonth(),e.getDate());return r.getTime()===s.getTime()})}_updateSelectedDateText(e,t){let a=e.getDate(),r=e.toLocaleDateString("en-US",{month:"long"}).slice(0,3),s=e.getFullYear();this._allContentWrapper[t].querySelector(".class-selected-date-wrapper").innerHTML=`${a} ${r}, ${s}`}_generateMarkup(e){let t=new Date(e.classDateTime),a=new Date(e.classDateTime).toLocaleTimeString("en-US",{timeStyle:"short"}),r=Math.floor((t-new Date)/6e4),s=r>=0&&r<=5,n=new Date(t.getTime()+6e4*e.duration).toLocaleTimeString("en-US",{timeStyle:"short"});return`
                <div class="class-details-wrapper">
            <div id="w-node-_2ca44311-1583-eecc-463d-8915dca86234-a152fdd6" class="class-info-wrapper">
                <div class="class-info-top-div">
                    <div class="class-type">
                        <div data-b6="" class="b6">${e.style[0]}</div>
                    </div>
                    <div class="class-starts ${s?null:"hidden-element"}">
                        <div data-b6="" class="b6">Starts in ${r} min</div>
                    </div>
                </div>
                <div class="class-info-bottom">
                    <div data-b1="" class="b1">${e.className}</div>
                    <div class="color-neutral-900">
                        <div data-b2="" class="b2">with ${e.teacherInfo.name}</div>
                    </div>
                </div>
            </div>
            <div id="w-node-_444ff8d8-6f4a-af1b-6ff5-9d8a268752b8-a152fdd6" class="class-timing-wrapper">
                <div data-b2="" class="b2 semi-bold">${a} - ${n}</div>
                <div class="class-time-zone">
                    <div data-b6="" class="b6">${this._timeZone}</div>
                </div>
            </div>
            <div id="w-node-_3bb0c6c2-99bb-f448-e7c6-9c2c86184fc3-a152fdd6" class="class-booking-btn-wrapper">
                <a href="https://app.shvasa.com/book-class?classId=${e?.id}&teacher=${e?.teacherInfo?.name}&time=${e?.classDateTime}" class="primary-button size-small bg-color-accent-tropical-teal-600" data-class-booking-btn="">
                <div data-b5="" class="b5 semi-bold color-white">${s?"Join":"Book"}
                </div>
            </a>
            </div>
        </div>
    `}}var u=new o;let h=async function(e,r){try{await a(e,r),u.setData(t)}catch(e){console.log(e)}};d.addHandlerRender(function(e){try{r(e),d.setData(t),d._addSliderDateData(),d._updateTitle(),d._updateTabLink(),d.controlArrowInteractivity()}catch(e){console.log(e)}}),u.classListRendererHandler(h)})();
*/
/*
(()=>{let e=async function(e,t){try{let a=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),r=await Promise.race([a,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),s=await r.json();if(!r.ok)throw Error(`${s.message} (${r.status})`);return s}catch(e){throw e}},t={classData:{},fromDate:"",tillDate:"",currentDate:new Date,previousMonday:"",currentMonday:"",nextMonday:""},a=async function(a=t.currentMonday,r=t.nextMonday){try{let s=await e("https://services.truyoga.in/api/product/getGroupClassesForWebflow",{fromDate:a,tillDate:r});console.log(s.body),t.classData=s.body}catch(e){throw e}},r=function(e=t.currentDate){s(e),n(),i()},s=function(e){let a=e?new Date(e):new Date;return a.setDate(a.getDate()-a.getDay()+1),t.currentMonday=a,a},n=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()-7),t.previousMonday=e},i=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()+7),t.nextMonday=e};r();class l{_data;setData(e){this._data=e,console.log(this._data)}render(e,t){let a=this._generateMarkup(e);t.insertAdjacentHTML("afterbegin",a)}_clear(e){e.innerHTML=""}renderSpinner(){let e=`<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;this._clear(),this.parentElement.insertAdjacentHTML("afterbegins",e)}}class o extends l{_parentEl=document.querySelector(".classes-dates-container");_tabLinkArr=Array.from(this._parentEl.querySelectorAll(".class-date-wrapper"));_nextArrow=document.querySelector('[data-week="Next"]');_previousArrow=document.querySelector('[data-week="Previous"]');addHandlerRender(e){e(),this.addSliderArrowEvents(e),setTimeout(()=>{this._makeTabActive(this._data.currentDate)},1e3)}addSliderArrowEvents(e){this._nextArrow.addEventListener("click",()=>{e(this._data.nextMonday),this._makeTabActive(this._data.currentMonday)}),this._previousArrow.addEventListener("click",()=>{e(this._data.previousMonday);let t=this._data.currentDate>this._data.currentMonday;this._makeTabActive(t?this._data.currentDate:this._data.currentMonday)})}controlArrowInteractivity(){this._data.currentDate>this._data.currentMonday?this._previousArrow.classList.add("element-inactive"):this._previousArrow.classList.remove("element-inactive")}updateSlider(e){this.setData(e),this._addSliderDateData(),this._updateTitle(),this._updateTabLink()}_addSliderDateData(){this._tabLinkArr.forEach((e,t)=>{let a=new Date(this._data.currentMonday);a.setDate(a.getDate()+t),e.dataset.date=a})}_updateTabLink(){this._tabLinkArr.forEach(e=>{let t=new Date(e.dataset.date),a=new Date(this._data.currentDate);t.setHours(0,0,0,0),a.setHours(0,0,0,0),t.getTime()>=a.getTime()?e.classList.remove("element-inactive"):e.classList.add("element-inactive");let r=e.querySelector("[data-day]"),s=e.querySelector("[data-date]"),n=`${t.getDate()}`.padStart(2,0),i=`${t}`.slice(0,1);r.innerHTML=i,s.innerHTML=n})}_makeTabActive(e){0!==this._data.currentDate.getDay()&&document.querySelector(`[data-date="${e}"]`).click()}_updateTitle(){let e=document.querySelector("[data-title]"),t=new Date(this._data.currentMonday),a=t.getFullYear(),r=t.toLocaleString("en-US",{month:"long"});e.innerHTML=`${r} ${a}`}}var c=new o;class d extends l{_currentDate=new Date;_currentTime=new Date().getTime();_userLocale=navigator.language;_timeZone=new Intl.DateTimeFormat(this._userLocale,{timeZoneName:"longGeneric"}).format(this._currentDate).split(" ").slice(1).map(e=>e.at(0)).join("");_classData;_targetElement;_allTabLinks=Array.from(document.querySelectorAll(".class-date-wrapper"));_allContentWrapper=Array.from(document.querySelectorAll(".class-content-wrapper"));classListRendererHandler(e){this._allTabLinks.forEach((t,a)=>{t.addEventListener("click",async()=>{let r=new Date(t.dataset.date),s=new Date(r);s.setDate(r.getDate()+1),this._updateSelectedDateText(r,a),this._targetElement=this._allContentWrapper[a].querySelector(".class-list-wrapper");let n=e=>`${e.getFullYear()}-${(e.getMonth()+1).toString().padStart(2,"0")}-${e.getDate().toString().padStart(2,"0")}`,i=n(r),l=n(s);await e(i,l);let o=this._filterData(r).filter(e=>new Date(e.classDateTime).setUTCHours(0,0,0,0)>new Date(this._currentTime).setUTCHours(0,0,0,0)).filter((e,t)=>t<10);console.log(o),0===o.length?this._targetElement.innerHTML=`Currently, there are no upcoming classes scheduled.
            Please check for another date.`:(this._clear(this._targetElement),o.forEach(e=>this.render(e,this._targetElement)))})})}_filterData(e){return this._data.classData.filter(t=>{let a=new Date(t.classDateTime);return a.setUTCHours(0,0,0,0),e.setUTCHours(0,0,0,0),a.setUTCHours(0,0,0,0),e.setUTCHours(0,0,0,0),a.getTime()===e.getTime()})}_updateSelectedDateText(e,t){let a=e.getDate(),r=e.toLocaleDateString("en-US",{month:"long"}).slice(0,3),s=e.getFullYear();this._allContentWrapper[t].querySelector(".class-selected-date-wrapper").innerHTML=`${a} ${r}, ${s}`}_generateMarkup(e){let t=new Date(e.classDateTime),a=new Date(e.classDateTime).toLocaleTimeString("en-US",{timeStyle:"short"}),r=Math.floor((t-new Date)/6e4),s=r>=0&&r<=5,n=new Date(t.getTime()+6e4*e.duration).toLocaleTimeString("en-US",{timeStyle:"short"});return`
                <div class="class-details-wrapper">
            <div id="w-node-_2ca44311-1583-eecc-463d-8915dca86234-a152fdd6" class="class-info-wrapper">
                <div class="class-info-top-div">
                    <div class="class-type">
                        <div data-b6="" class="b6">${e?.style?.at(0).replaceAll("_"," ")}</div>
                    </div>
                    <div class="class-starts ${s?null:"hidden-element"}">
                        <div data-b6="" class="b6">Starts in ${r} min</div>
                    </div>
                </div>
                <div class="class-info-bottom">
                    <div data-b1="" class="b1">${e?.className}</div>
                    <div class="color-neutral-900">
                        <div data-b2="" class="b2">with ${e.teacherInfo.name}</div>
                    </div>
                </div>
            </div>
            <div id="w-node-_444ff8d8-6f4a-af1b-6ff5-9d8a268752b8-a152fdd6" class="class-timing-wrapper">
                <div data-b2="" class="b2 semi-bold">${a} - ${n}</div>
                <div class="class-time-zone">
                    <div data-b6="" class="b6">${this?._timeZone}</div>
                </div>
            </div>
            <div id="w-node-_3bb0c6c2-99bb-f448-e7c6-9c2c86184fc3-a152fdd6" class="class-booking-btn-wrapper">
                <a href="https://app.shvasa.com/book-class?classId=${e?.id}&teacher=${e?.teacherInfo?.name}&time=${e?.classDateTime}" class="primary-button size-small bg-color-accent-tropical-teal-600" data-class-booking-btn="">
                <div data-b5="" class="b5 semi-bold color-white">${s?"Join":"Book"}
                </div>
            </a>
            </div>
        </div>
    `}}var u=new d;let h=async function(e,r){try{await a(e,r),u.setData(t)}catch(e){console.log(e)}};c.addHandlerRender(function(e){try{r(e),c.setData(t),c._addSliderDateData(),c._updateTitle(),c._updateTabLink(),c.controlArrowInteractivity()}catch(e){console.log(e)}}),u.classListRendererHandler(h)})();
//# sourceMappingURL=controller.js.map
*/
/*
(()=>{let e=async function(e,t){try{let a=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),r=await Promise.race([a,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),s=await r.json();if(!r.ok)throw Error(`${s.message} (${r.status})`);return s}catch(e){throw e}},t={classData:{},fromDate:"",tillDate:"",currentDate:new Date,previousMonday:"",currentMonday:"",nextMonday:""},a=async function(a=t.currentMonday,r=t.nextMonday){try{let s=await e("https://services.shvasa.com/api/product/getGroupClassesForWebflow",{fromDate:a,tillDate:r});console.log(s.body),t.classData=s.body}catch(e){throw e}},r=function(e=t.currentDate){s(e),n(),i()},s=function(e){let a=e?new Date(e):new Date;return a.setDate(a.getDate()-a.getDay()+1),t.currentMonday=a,a},n=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()-7),t.previousMonday=e},i=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()+7),t.nextMonday=e};r();class l{_data;setData(e){this._data=e,console.log(this._data)}render(e,t){let a=this._generateMarkup(e);t.insertAdjacentHTML("beforeend",a)}_clear(e){e.innerHTML=""}renderSpinner(){let e=`<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;this._clear(),this.parentElement.insertAdjacentHTML("afterbegins",e)}}class o extends l{_parentEl=document.querySelector(".classes-dates-container");_tabLinkArr=Array.from(this._parentEl.querySelectorAll(".class-date-wrapper"));_nextArrow=document.querySelector('[data-week="Next"]');_previousArrow=document.querySelector('[data-week="Previous"]');addHandlerRender(e){e(),this.addSliderArrowEvents(e),setTimeout(()=>{this._makeTabActive(this._data.currentDate)},1e3)}addSliderArrowEvents(e){this._nextArrow.addEventListener("click",()=>{e(this._data.nextMonday),this._makeTabActive(this._data.currentMonday)}),this._previousArrow.addEventListener("click",()=>{e(this._data.previousMonday);let t=this._data.currentDate>this._data.currentMonday;this._makeTabActive(t?this._data.currentDate:this._data.currentMonday)})}controlArrowInteractivity(){this._data.currentDate>this._data.currentMonday?this._previousArrow.classList.add("element-inactive"):this._previousArrow.classList.remove("element-inactive")}updateSlider(e){this.setData(e),this._addSliderDateData(),this._updateTitle(),this._updateTabLink()}_addSliderDateData(){this._tabLinkArr.forEach((e,t)=>{let a=new Date(this._data.currentMonday);a.setDate(a.getDate()+t),e.dataset.date=a})}_updateTabLink(){this._tabLinkArr.forEach(e=>{let t=new Date(e.dataset.date),a=new Date(this._data.currentDate);t.setHours(0,0,0,0),a.setHours(0,0,0,0),t.getTime()>=a.getTime()?e.classList.remove("element-inactive"):e.classList.add("element-inactive");let r=e.querySelector("[data-day]"),s=e.querySelector("[data-date]"),n=`${t.getDate()}`.padStart(2,0),i=`${t}`.slice(0,1);r.innerHTML=i,s.innerHTML=n})}_makeTabActive(e){0!==this._data.currentDate.getDay()&&document.querySelector(`[data-date="${e}"]`).click()}_updateTitle(){let e=document.querySelector("[data-title]"),t=new Date(this._data.currentMonday),a=t.getFullYear(),r=t.toLocaleString("en-US",{month:"long"});e.innerHTML=`${r} ${a}`}}var c=new o;class d extends l{_currentDate=new Date;_currentTime=new Date().getTime();_userLocale=navigator.language;_timeZone=new Intl.DateTimeFormat(this._userLocale,{timeZoneName:"longGeneric"}).format(this._currentDate).split(" ").slice(1).map(e=>e.at(0)).join("");_classData;_targetElement;_allTabLinks=Array.from(document.querySelectorAll(".class-date-wrapper"));_allContentWrapper=Array.from(document.querySelectorAll(".class-content-wrapper"));classListRendererHandler(e){this._allTabLinks.forEach((t,a)=>{t.addEventListener("click",async()=>{let r=new Date(t.dataset.date),s=new Date(r);s.setDate(r.getDate()+1),this._updateSelectedDateText(r,a),this._targetElement=this._allContentWrapper[a].querySelector(".class-list-wrapper");let n=e=>`${e.getFullYear()}-${(e.getMonth()+1).toString().padStart(2,"0")}-${e.getDate().toString().padStart(2,"0")}`,i=n(r),l=n(s);await e(i,l);let o=this._filterData(r).filter(e=>new Date(e.classDateTime).setUTCHours(0,0,0,0)>new Date(this._currentTime).setUTCHours(0,0,0,0)).filter((e,t)=>t<10);console.log(o),0===o.length?this._targetElement.innerHTML=`Currently, there are no upcoming classes scheduled.
            Please check for another date.`:(this._clear(this._targetElement),o.forEach(e=>this.render(e,this._targetElement)))})})}_filterData(e){return this._data.classData.filter(t=>{let a=new Date(t.classDateTime);return a.setUTCHours(0,0,0,0),e.setUTCHours(0,0,0,0),a.setUTCHours(0,0,0,0),e.setUTCHours(0,0,0,0),a.getTime()===e.getTime()})}_updateSelectedDateText(e,t){let a=e.getDate(),r=e.toLocaleDateString("en-US",{month:"long"}).slice(0,3),s=e.getFullYear();this._allContentWrapper[t].querySelector(".class-selected-date-wrapper").innerHTML=`${a} ${r}, ${s}`}_generateMarkup(e){let t=new Date(e.classDateTime),a=new Date(e.classDateTime).toLocaleTimeString("en-US",{timeStyle:"short"}),r=Math.floor((t-new Date)/6e4),s=r>=0&&r<=5,n=new Date(t.getTime()+6e4*e.duration).toLocaleTimeString("en-US",{timeStyle:"short"});return`
                <div class="class-details-wrapper">
            <div id="w-node-_2ca44311-1583-eecc-463d-8915dca86234-a152fdd6" class="class-info-wrapper">
                <div class="class-info-top-div">
                    <div class="class-type">
                        <div data-b6="" class="b6">${e?.style?.at(0).replaceAll("_"," ")}</div>
                    </div>
                    <div class="class-starts ${s?null:"hidden-element"}">
                        <div data-b6="" class="b6">Starts in ${r} min</div>
                    </div>
                </div>
                <div class="class-info-bottom">
                    <div data-b1="" class="b1">${e?.className}</div>
                    <div class="color-neutral-900">
                        <div data-b2="" class="b2">with ${e.teacherInfo.name}</div>
                    </div>
                </div>
            </div>
            <div id="w-node-_444ff8d8-6f4a-af1b-6ff5-9d8a268752b8-a152fdd6" class="class-timing-wrapper">
                <div data-b2="" class="b2 semi-bold">${a} - ${n}</div>
                <div class="class-time-zone">
                    <div data-b6="" class="b6">${this?._timeZone}</div>
                </div>
            </div>
            <div id="w-node-_3bb0c6c2-99bb-f448-e7c6-9c2c86184fc3-a152fdd6" class="class-booking-btn-wrapper">
                <a href="https://app.shvasa.com/book-class?classId=${e?.id}&teacher=${e?.teacherInfo?.name}&time=${e?.classDateTime}" class="primary-button size-small bg-color-accent-tropical-teal-600" data-class-booking-btn="">
                <div data-b5="" class="b5 semi-bold color-white">${s?"Join":"Book"}
                </div>
            </a>
            </div>
        </div>
    `}}var u=new d;let h=async function(e,r){try{await a(e,r),u.setData(t)}catch(e){console.log(e)}};c.addHandlerRender(function(e){try{r(e),c.setData(t),c._addSliderDateData(),c._updateTitle(),c._updateTabLink(),c.controlArrowInteractivity()}catch(e){console.log(e)}}),u.classListRendererHandler(h)})();
//# sourceMappingURL=controller.js.map
*/
/*
(()=>{let e=async function(e,t){try{let a=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),r=await Promise.race([a,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),s=await r.json();if(!r.ok)throw Error(`${s.message} (${r.status})`);return s}catch(e){throw e}},t={classData:{},fromDate:"",tillDate:"",currentDate:new Date,previousMonday:"",currentMonday:"",nextMonday:""},a=async function(a=t.currentMonday,r=t.nextMonday){try{let s=await e("https://services.shvasa.com/api/product/getGroupClassesForWebflow",{fromDate:a,tillDate:r});console.log(s.body),t.classData=s.body}catch(e){throw e}},r=function(e=t.currentDate){s(e),n(),i()},s=function(e){let a=e?new Date(e):new Date;return a.setDate(a.getDate()-a.getDay()+1),t.currentMonday=a,a},n=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()-7),t.previousMonday=e},i=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()+7),t.nextMonday=e};r();class l{_data;setData(e){this._data=e,console.log(this._data)}render(e,t){let a=this._generateMarkup(e);t.insertAdjacentHTML("beforeend",a)}_clear(e){e.innerHTML=""}renderSpinner(){let e=`<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;this._clear(),this.parentElement.insertAdjacentHTML("afterbegins",e)}}class c extends l{_parentEl=document.querySelector(".classes-dates-container");_tabLinkArr=Array.from(this._parentEl.querySelectorAll(".class-date-wrapper"));_nextArrow=document.querySelector('[data-week="Next"]');_previousArrow=document.querySelector('[data-week="Previous"]');addHandlerRender(e){e(),this.addSliderArrowEvents(e),setTimeout(()=>{this._makeTabActive(this._data.currentDate)},1e3)}addSliderArrowEvents(e){this._nextArrow.addEventListener("click",()=>{e(this._data.nextMonday),this._makeTabActive(this._data.currentMonday)}),this._previousArrow.addEventListener("click",()=>{e(this._data.previousMonday);let t=this._data.currentDate>this._data.currentMonday;this._makeTabActive(t?this._data.currentDate:this._data.currentMonday)})}controlArrowInteractivity(){this._data.currentDate>this._data.currentMonday?this._previousArrow.classList.add("element-inactive"):this._previousArrow.classList.remove("element-inactive")}updateSlider(e){this.setData(e),this._addSliderDateData(),this._updateTitle(),this._updateTabLink()}_addSliderDateData(){this._tabLinkArr.forEach((e,t)=>{let a=new Date(this._data.currentMonday);a.setDate(a.getDate()+t),e.dataset.date=a})}_updateTabLink(){this._tabLinkArr.forEach(e=>{let t=new Date(e.dataset.date),a=new Date(this._data.currentDate);t.setHours(0,0,0,0),a.setHours(0,0,0,0),t.getTime()>=a.getTime()?e.classList.remove("element-inactive"):e.classList.add("element-inactive");let r=e.querySelector("[data-day]"),s=e.querySelector("[data-date]"),n=`${t.getDate()}`.padStart(2,0),i=`${t}`.slice(0,1);r.innerHTML=i,s.innerHTML=n})}_makeTabActive(e){0!==this._data.currentDate.getDay()&&document.querySelector(`[data-date="${e}"]`).click()}_updateTitle(){let e=document.querySelector("[data-title]"),t=new Date(this._data.currentMonday),a=t.getFullYear(),r=t.toLocaleString("en-US",{month:"long"});e.innerHTML=`${r} ${a}`}}var d=new c;class o extends l{_currentDate=new Date;_currentTime=new Date().getTime();_userLocale=navigator.language;_timeZone=new Intl.DateTimeFormat(this._userLocale,{timeZoneName:"longGeneric"}).format(this._currentDate).split(" ").slice(1).map(e=>e.at(0)).join("");_classData;_targetElement;_allTabLinks=Array.from(document.querySelectorAll(".class-date-wrapper"));_allContentWrapper=Array.from(document.querySelectorAll(".class-content-wrapper"));classListRendererHandler(e){this._allTabLinks.forEach((t,a)=>{t.addEventListener("click",async()=>{let r=new Date(t.dataset.date),s=new Date(r);s.setDate(r.getDate()+1),this._updateSelectedDateText(r,a),this._targetElement=this._allContentWrapper[a].querySelector(".class-list-wrapper");let n=e=>`${e.getFullYear()}-${(e.getMonth()+1).toString().padStart(2,"0")}-${e.getDate().toString().padStart(2,"0")}`,i=n(r),l=n(s);await e(i,l);let c=this._filterData(r).filter((e,t)=>t<10);console.log(c),0===c.length?this._targetElement.innerHTML=`Currently, there are no upcoming classes scheduled.
            Please check for another date.`:(this._clear(this._targetElement),c.forEach(e=>this.render(e,this._targetElement)))})})}_filterData(e){return this._data.classData.filter(e=>{let t=new Date(e.classDateTime),a=new Date;return t.getTime()>a.getTime()})}_updateSelectedDateText(e,t){let a=e.getDate(),r=e.toLocaleDateString("en-US",{month:"long"}).slice(0,3),s=e.getFullYear();this._allContentWrapper[t].querySelector(".class-selected-date-wrapper").innerHTML=`${a} ${r}, ${s}`}_generateMarkup(e){let t=new Date(e.classDateTime),a=new Date(e.classDateTime).toLocaleTimeString("en-US",{timeStyle:"short"}),r=Math.floor((t-new Date)/6e4),s=r>=0&&r<=5,n=new Date(t.getTime()+6e4*e.duration).toLocaleTimeString("en-US",{timeStyle:"short"});return`
                <div class="class-details-wrapper">
            <div id="w-node-_2ca44311-1583-eecc-463d-8915dca86234-a152fdd6" class="class-info-wrapper">
                <div class="class-info-top-div">
                    <div class="class-type">
                        <div data-b6="" class="b6">${e?.style?.at(0).replaceAll("_"," ")}</div>
                    </div>
                    <div class="class-starts ${s?null:"hidden-element"}">
                        <div data-b6="" class="b6">Starts in ${r} min</div>
                    </div>
                </div>
                <div class="class-info-bottom">
                    <div data-b1="" class="b1">${e?.className}</div>
                    <div class="color-neutral-900">
                        <div data-b2="" class="b2">with ${e.teacherInfo.name}</div>
                    </div>
                </div>
            </div>
            <div id="w-node-_444ff8d8-6f4a-af1b-6ff5-9d8a268752b8-a152fdd6" class="class-timing-wrapper">
                <div data-b2="" class="b2 semi-bold">${a} - ${n}</div>
                <div class="class-time-zone">
                    <div data-b6="" class="b6">${this?._timeZone}</div>
                </div>
            </div>
            <div id="w-node-_3bb0c6c2-99bb-f448-e7c6-9c2c86184fc3-a152fdd6" class="class-booking-btn-wrapper">
                <a href="https://app.shvasa.com/book-class?classId=${e?.id}&teacher=${e?.teacherInfo?.name}&time=${e?.classDateTime}" class="primary-button size-small bg-color-accent-tropical-teal-600 ${s?"bg-color-accent-red":""}" data-class-booking-btn="">
                <div data-b5="" class="b5 semi-bold color-white">${s?"Join":"Book"}
                </div>
            </a>
            </div>
        </div>
    `}}var u=new o;let h=async function(e,r){try{await a(e,r),u.setData(t)}catch(e){console.log(e)}};d.addHandlerRender(function(e){try{r(e),d.setData(t),d._addSliderDateData(),d._updateTitle(),d._updateTabLink(),d.controlArrowInteractivity()}catch(e){console.log(e)}}),u.classListRendererHandler(h)})();
//# sourceMappingURL=controller.js.map
*/
(()=>{let e=async function(e,t){try{let a=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),r=await Promise.race([a,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),s=await r.json();if(!r.ok)throw Error(`${s.message} (${r.status})`);return s}catch(e){throw e}},t={classData:{},fromDate:"",tillDate:"",currentDate:new Date,previousMonday:"",currentMonday:"",nextMonday:""},a=async function(a=t.currentMonday,r=t.nextMonday){try{let s=await e("https://services.shvasa.com/api/product/getGroupClassesForWebflow",{fromDate:a,tillDate:r});console.log(s.body),t.classData=s.body}catch(e){throw e}},r=function(e=t.currentDate){s(e),n(),i()},s=function(e){let a=e?new Date(e):new Date;return a.setDate(a.getDate()-a.getDay()+1),t.currentMonday=a,a},n=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()-7),t.previousMonday=e},i=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()+7),t.nextMonday=e};r();class l{_data;setData(e){this._data=e,console.log(this._data)}render(e,t){let a=this._generateMarkup(e);t.insertAdjacentHTML("beforeend",a)}_clear(e){e.innerHTML=""}renderSpinner(){let e=`<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;this._clear(),this.parentElement.insertAdjacentHTML("afterbegins",e)}}class c extends l{_parentEl=document.querySelector(".classes-dates-container");_tabLinkArr=Array.from(this._parentEl.querySelectorAll(".class-date-wrapper"));_nextArrow=document.querySelector('[data-week="Next"]');_previousArrow=document.querySelector('[data-week="Previous"]');addHandlerRender(e){e(),this.addSliderArrowEvents(e),setTimeout(()=>{this._makeTabActive(this._data.currentDate)},1e3)}addSliderArrowEvents(e){this._nextArrow.addEventListener("click",()=>{e(this._data.nextMonday),this._makeTabActive(this._data.currentMonday)}),this._previousArrow.addEventListener("click",()=>{e(this._data.previousMonday);let t=this._data.currentDate>this._data.currentMonday;this._makeTabActive(t?this._data.currentDate:this._data.currentMonday)})}controlArrowInteractivity(){this._data.currentDate>this._data.currentMonday?this._previousArrow.classList.add("element-inactive"):this._previousArrow.classList.remove("element-inactive")}updateSlider(e){this.setData(e),this._addSliderDateData(),this._updateTitle(),this._updateTabLink()}_addSliderDateData(){this._tabLinkArr.forEach((e,t)=>{let a=new Date(this._data.currentMonday);a.setDate(a.getDate()+t),e.dataset.date=a})}_updateTabLink(){this._tabLinkArr.forEach(e=>{let t=new Date(e.dataset.date),a=new Date(this._data.currentDate);t.setHours(0,0,0,0),a.setHours(0,0,0,0),t.getTime()>=a.getTime()?e.classList.remove("element-inactive"):e.classList.add("element-inactive");let r=e.querySelector("[data-day]"),s=e.querySelector("[data-date]"),n=`${t.getDate()}`.padStart(2,0),i=`${t}`.slice(0,1);r.innerHTML=i,s.innerHTML=n})}_makeTabActive(e){let t=document.querySelector(`[data-date="${e}"]`);t.addEventListener("click",e=>e.preventDefault()),t.click()}_updateTitle(){let e=document.querySelector("[data-title]"),t=new Date(this._data.currentMonday),a=t.getFullYear(),r=t.toLocaleString("en-US",{month:"long"});e.innerHTML=`${r} ${a}`}}var d=new c;class o extends l{_currentDate=new Date;_currentTime=new Date().getTime();_userLocale=navigator.language;_timeZone=new Intl.DateTimeFormat(this._userLocale,{timeZoneName:"longGeneric"}).format(this._currentDate).split(" ").slice(1).map(e=>e.at(0)).join("");_classData;_targetElement;_allTabLinks=Array.from(document.querySelectorAll(".class-date-wrapper"));_allContentWrapper=Array.from(document.querySelectorAll(".class-content-wrapper"));classListRendererHandler(e){this._allTabLinks.forEach((t,a)=>{t.addEventListener("click",async()=>{let r=new Date(t.dataset.date),s=new Date(r);s.setDate(r.getDate()+1),this._updateSelectedDateText(r,a),this._targetElement=this._allContentWrapper[a].querySelector(".class-list-wrapper");let n=e=>`${e.getFullYear()}-${(e.getMonth()+1).toString().padStart(2,"0")}-${e.getDate().toString().padStart(2,"0")}`,i=n(r),l=n(s);await e(i,l);let c=this._filterData(r).filter((e,t)=>t<10);console.log(c),0===c.length?this._targetElement.innerHTML=`Currently, there are no upcoming classes scheduled.
            Please check for another date.`:(this._clear(this._targetElement),c.forEach(e=>this.render(e,this._targetElement)))})})}_filterData(e){return this._data.classData.filter(e=>{let t=new Date(e.classDateTime),a=new Date;return t.getTime()>a.getTime()})}_updateSelectedDateText(e,t){let a=e.getDate(),r=e.toLocaleDateString("en-US",{month:"long"}).slice(0,3),s=e.getFullYear();this._allContentWrapper[t].querySelector(".class-selected-date-wrapper").innerHTML=`${a} ${r}, ${s}`}_generateMarkup(e){let t=new Date(e.classDateTime),a=new Date(e.classDateTime).toLocaleTimeString("en-US",{timeStyle:"short"}),r=Math.floor((t-new Date)/6e4),s=r>=0&&r<=5,n=new Date(t.getTime()+6e4*e.duration).toLocaleTimeString("en-US",{timeStyle:"short"});return`
                <div class="class-details-wrapper">
            <div id="w-node-_2ca44311-1583-eecc-463d-8915dca86234-a152fdd6" class="class-info-wrapper">
                <div class="class-info-top-div">
                    <div class="class-type">
                        <div data-b6="" class="b6">${e?.style?.at(0).replaceAll("_"," ")}</div>
                    </div>
                    <div class="class-starts ${s?null:"hidden-element"}">
                        <div data-b6="" class="b6">Starts in ${r} min</div>
                    </div>
                </div>
                <div class="class-info-bottom">
                    <div data-b1="" class="b1">${e?.className}</div>
                    <div class="color-neutral-900">
                        <div data-b2="" class="b2">with ${e.teacherInfo.name}</div>
                    </div>
                </div>
            </div>
            <div id="w-node-_444ff8d8-6f4a-af1b-6ff5-9d8a268752b8-a152fdd6" class="class-timing-wrapper">
                <div data-b2="" class="b2 semi-bold">${a} - ${n}</div>
                <div class="class-time-zone">
                    <div data-b6="" class="b6">${this?._timeZone}</div>
                </div>
            </div>
            <div id="w-node-_3bb0c6c2-99bb-f448-e7c6-9c2c86184fc3-a152fdd6" class="class-booking-btn-wrapper">
                <a href="https://app.shvasa.com/book-class?classId=${e?.id}&teacher=${e?.teacherInfo?.name}&time=${e?.classDateTime}" class="primary-button size-small bg-color-accent-tropical-teal-600 ${s?"bg-color-accent-red":""}" data-class-booking-btn="">
                <div data-b5="" class="b5 semi-bold color-white">${s?"Join":"Book"}
                </div>
            </a>
            </div>
        </div>
    `}}var u=new o;let h=async function(e,r){try{await a(e,r),u.setData(t)}catch(e){console.log(e)}};d.addHandlerRender(function(e){try{r(e),d.setData(t),d._addSliderDateData(),d._updateTitle(),d._updateTabLink(),d.controlArrowInteractivity()}catch(e){console.log(e)}}),u.classListRendererHandler(h)})();
//# sourceMappingURL=controller.js.map



