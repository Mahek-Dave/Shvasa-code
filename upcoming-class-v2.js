(()=>{let e=async function(e,t){try{let a=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),r=await Promise.race([a,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),s=await r.json();if(!r.ok)throw Error(`${s.message} (${r.status})`);return s}catch(e){throw e}},t={classData:{},fromDate:"",tillDate:"",currentDate:new Date,previousMonday:"",currentMonday:"",nextMonday:""},a=async function(a=t.currentMonday,r=t.nextMonday){try{let s=await e("https://services.truyoga.in/api/product/getGroupClassesForWebflow",{fromDate:a,tillDate:r});t.classData=s.body}catch(e){throw e}},r=function(e=t.currentDate){s(e),n(),i()},s=function(e){let a=e?new Date(e):new Date;return a.setDate(a.getDate()-a.getDay()+1),t.currentMonday=a,a},n=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()-7),t.previousMonday=e},i=function(){let e=new Date(t.currentMonday);e.setDate(e.getDate()+7),t.nextMonday=e};r();class l{_data;setData(e){this._data=e}render(e,t){let a=this._generateMarkup(e);t.insertAdjacentHTML("afterbegin",a)}_clear(e){e.innerHTML=""}renderSpinner(){let e=`<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;this._clear(),this.parentElement.insertAdjacentHTML("afterbegins",e)}}class c extends l{_parentEl=document.querySelector(".classes-dates-container");_tabLinkArr=Array.from(this._parentEl.querySelectorAll(".class-date-wrapper"));_nextArrow=document.querySelector('[data-week="Next"]');_previousArrow=document.querySelector('[data-week="Previous"]');addHandlerRender(e){e(),this.addSliderArrowEvents(e),setTimeout(()=>{this._makeTabActive(this._data.currentDate)},1e3)}xyz(e){}addSliderArrowEvents(e){this._nextArrow.addEventListener("click",()=>{e(this._data.nextMonday)}),this._previousArrow.addEventListener("click",()=>{e(this._data.previousMonday)})}controlArrowInteractivity(){this._data.currentDate>this._data.currentMonday?this._previousArrow.classList.add("element-inactive"):this._previousArrow.classList.remove("element-inactive")}updateSlider(e){this.setData(e),this._addSliderDateData(),this._updateTitle(),this._updateTabLink()}_addSliderDateData(){this._tabLinkArr.forEach((e,t)=>{let a=new Date(this._data.currentMonday);a.setDate(a.getDate()+t),e.dataset.date=a})}_updateTabLink(){this._tabLinkArr.forEach(e=>{let t=new Date(e.dataset.date);t.getDate()>=this._data.currentDate.getDate()?e.classList.remove("element-inactive"):e.classList.add("element-inactive");let a=e.querySelector("[data-day]"),r=e.querySelector("[data-date]"),s=`${t.getDate()}`.padStart(2,0),n=`${t}`.slice(0,1);a.innerHTML=n,r.innerHTML=s})}_makeTabActive(e){document.querySelector(`[data-date="${e}"]`).click()}_updateTitle(){let e=document.querySelector("[data-title]"),t=new Date(this._data.currentMonday),a=t.getFullYear(),r=t.toLocaleString("en-US",{month:"long"});e.innerHTML=`${r} ${a}`}}var o=new c;class d extends l{_currentDate=new Date;_currentTime=new Date().getTime();_userLocale=navigator.language;_timeZone=new Intl.DateTimeFormat(this._userLocale,{timeZoneName:"longGeneric"}).format(this._currentDate).split(" ").slice(1).map(e=>e.at(0)).join("");_classData;_targetElement;_allTabLinks=Array.from(document.querySelectorAll(".class-date-wrapper"));_allContentWrapper=Array.from(document.querySelectorAll(".class-content-wrapper"));classListRendererHandler(e){this._allTabLinks.forEach((t,a)=>{t.addEventListener("click",async()=>{let r=t.dataset.date,s=new Date(r),n=new Date(r);n.setDate(n.getDate()+1),this._updateSelectedDateText(s,a),this._targetElement=this._allContentWrapper[a].querySelector(".class-list-wrapper"),await e(`${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()}`,`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()} `);let i=this._filterData(s);this._clear(this._targetElement),i.forEach(e=>this.render(e,this._targetElement))})})}_filterData(e){return this._data.classData.filter(t=>{let a=new Date(t.classDateTime),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()),s=new Date(e.getFullYear(),e.getMonth(),e.getDate());return r.getTime()===s.getTime()})}_updateSelectedDateText(e,t){let a=e.getDate(),r=e.toLocaleDateString("en-US",{month:"long"}).slice(0,3),s=e.getFullYear();this._allContentWrapper[t].querySelector(".class-selected-date-wrapper").innerHTML=`${a} ${r}, ${s}`}_generateMarkup(e){let t=new Date(e.classDateTime),a=new Date(e.classDateTime).toLocaleTimeString("en-US",{timeStyle:"short"}),r=Math.floor((t-new Date)/6e4),s=r>=0&&r<=5,n=new Date(t.getTime()+6e4*e.duration).toLocaleTimeString("en-US",{timeStyle:"short"});return`
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
