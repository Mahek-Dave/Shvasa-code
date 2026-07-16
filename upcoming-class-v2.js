(function injectCombinedStyles() {
  const css = `
/* ==========================================================
   BASE STYLES (deduplicated — later declarations for the
   same selector/property have overridden earlier ones)
   ========================================================== */

.classes-dates-container {
  grid-column-gap: 2cqw;
  grid-row-gap: 2cqw;
  background-color: #e4f7ed;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2.5rem 5rem;
  display: flex;
}

.class-date-wrapper {
  background-color: #5db39000;
  border-radius: 6rem;
  flex-flow: column;
  width: 100%;
  max-width: 5.125rem;
  padding: 3cqw 1.5cqw;
  display: flex;
}

.class-date-wrapper.w--current {
  background-color: #20e997;
}

.class-content-wrapper {
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  flex-flow: column;
  width: 100%;
  padding-top: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
}

.class-list-wrapper {
  grid-column-gap: 2.25rem;
  grid-row-gap: 2.25rem;
  text-align: center;
  flex-flow: column;
  font-size: 2rem;
  line-height: 2.6rem;
  display: flex;
}

.class-selected-date-wrapper {
  justify-content: center;
  align-items: center;
  font-size: 3cqw;
  line-height: 4cqw;
  display: flex;
}

.element-inactive {
  opacity: 0.5;
  pointer-events: none;
}

.class-details-wrapper {
  text-align: left;
  grid-column-gap: clamp(60px, 5vw, 190px);
  grid-row-gap: clamp(60px, 5vw, 190px);
  border-bottom: 1px solid #b3b3b3;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 0.5fr;
  grid-auto-columns: 1fr;
  padding-bottom: 1rem;
  display: grid;
}

._9-mobile-class-details-wrapper {
  background-color: var(--old-colors--white);
  border: 1px solid #8e9fa8;
  border-radius: 12px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 15px;
  display: flex;
  box-shadow: 0 0 11px #0000001a;
}

.dashboard-snap-review-class-details-wrapper {
  grid-row-gap: 3.33621px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 383.664px;
  text-decoration: none;
  display: flex;
}

.class-info-wrapper {
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  flex-flow: column;
  display: flex;
}

.class-booking-btn-wrapper {
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
}

.class-type {
  text-align: center;
  background-color: #e4f7ed;
  border-radius: 0.625rem;
  padding: 0.25rem 1.5rem;
}

.class-starts-icon {
  width: 1.75rem;
  height: 1.25rem;
}

.class-time-zone {
  border: 2px solid #ccc;
  border-radius: 0.625rem;
  padding-top: 0.125rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.class-info-bottom {
  grid-column-gap: 0.25rem;
  grid-row-gap: 0.25rem;
  flex-flow: column;
  font-weight: 400;
  display: flex;
}

.class-timing-wrapper {
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  flex-flow: column;
  justify-content: flex-end;
  align-items: flex-start;
  display: flex;
}

.class-info-top-div {
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  flex-flow: wrap;
  display: flex;
}

.class-starts {
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  text-align: center;
  background-color: #ffebeb;
  border-radius: 0.625rem;
  justify-content: flex-start;
  align-items: center;
  padding: 0.25rem 1.5rem;
  display: flex;
}

.spinner {
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  display: none;
}

.w-lightbox-spinner {
  box-sizing: border-box;
  border: 5px solid #0006;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: -20px;
  margin-left: -20px;
  animation: 0.8s linear infinite spin;
  position: absolute;
  top: 50%;
  left: 50%;
}

.w-lightbox-spinner:after {
  content: "";
  border: 3px solid #0000;
  border-bottom-color: #fff;
  border-radius: 50%;
  position: absolute;
  inset: -4px;
}

.primary-button {
  background-color: var(--old-colors--orange-red);
  text-align: center;
  letter-spacing: 0.5px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  padding: 13px 40px;
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  display: flex;
}

.button-size-controller.size-small {
  padding: 1rem 2.5rem;
}

.bg-color-accent-tropical-teal-600 {
  background-color: var(--accent-tropical-teal--600);
}

.bg-color-accent-red {
  background-color: var(--colors--accent) !important;
}

/* ==========================================================
   RESPONSIVE / CONTAINER-QUERY OVERRIDES
   These use cqw units, so they clearly came from a
   @container (or @media) breakpoint block in the original
   Webflow export. I could not see the exact wrapper/threshold
   from what was pasted, so verify the condition below matches
   your actual breakpoint before shipping.
   ========================================================== */

@container (max-width: 479px) {
  .classes-dates-container {
    grid-column-gap: 2cqw;
    grid-row-gap: 2cqw;
    justify-content: center;
    align-items: center;
    padding: 2cqw 5cqw;
  }

  .class-date-wrapper {
    padding: 3cqw 1.5cqw;
  }

  .class-content-wrapper {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    padding-top: 2.5rem;
  }

  .class-list-wrapper {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    font-size: 1.4rem;
    line-height: 2rem;
  }

  .class-selected-date-wrapper {
    font-size: 3cqw;
    line-height: 4cqw;
  }

  .class-details-wrapper {
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-columns: 1.5fr 0.5fr 0.5fr;
  }

  .class-type,
  .class-starts {
    padding: 0.75cqw 2.5cqw;
  }

  .class-starts-icon {
    width: 3cqw;
    height: 3cqw;
  }

  .class-time-zone {
    padding-top: 0.1cqw;
    padding-left: 1.5cqw;
    padding-right: 1.5cqw;
  }

  .class-info-top-div {
    flex-flow: row;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .class-info-top-div,
  .class-starts {
    flex-flow: wrap;
  }
}

`;
  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-source', 'combined-styles');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
})();



(() => {
  let e = async function(e, t) {
      try {
        let a = t ? fetch(e, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(t)
          }) : fetch(e),
          r = await Promise.race([a, new Promise(function(e, t) {
            setTimeout(function() {
              t(Error("Request took too long! Timeout after 10 second"))
            }, 1e4)
          })]),
          s = await r.json();
        if (!r.ok) throw Error(`${s.message} (${r.status})`);
        return s
      } catch (e) {
        throw e
      }
    },
    t = {
      classData: {},
      fromDate: "",
      tillDate: "",
      currentDate: new Date,
      previousMonday: "",
      currentMonday: "",
      nextMonday: ""
    },
    a = async function(a = t.currentMonday, r = t.nextMonday) {
      try {
        let s = await e("https://services.shvasa.com/api/product/getGroupClassesForWebflow", {
            fromDate: a,
            tillDate: r
          }),
          n = window.shvasa;
        console.log("shvasaObjChecker", n);
        let i = !!n && window.shvasa.filter;
        console.log("filter", i), console.log(s.body);
        let o = s.body,
          l = n ? window.shvasa.outcomes : [];
        console.log("validOutcomes", l);
        let c = o.filter(e => e?.outcomes?.some(e => l?.some(t => t?.toLowerCase() === e?.toLowerCase())));
        t.classData = i ? c : o
      } catch (e) {
        throw e
      }
    },
    r = function(e = t.currentDate) {
      s(e), n(), i()
    },
    s = function(e) {
      let a = e ? new Date(e) : new Date;
      return a.setDate(a.getDate() - a.getDay() + 1), t.currentMonday = a, a
    },
    n = function() {
      let e = new Date(t.currentMonday);
      e.setDate(e.getDate() - 7), t.previousMonday = e
    },
    i = function() {
      let e = new Date(t.currentMonday);
      e.setDate(e.getDate() + 7), t.nextMonday = e
    };
  r();
  class o {
    _data;
    setData(e) {
      this._data = e, console.log(this._data)
    }
    render(e, t) {
      let a = this._generateMarkup(e);
      t.insertAdjacentHTML("beforeend", a)
    }
    _clear(e) {
      e.innerHTML = ""
    }
    renderSpinner() {
      let e = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
      this._clear(), this.parentElement.insertAdjacentHTML("afterbegins", e)
    }
  }
  class l extends o {
    _parentEl = document.querySelector(".classes-dates-container");
    _tabLinkArr = Array.from(this._parentEl.querySelectorAll(".class-date-wrapper"));
    _nextArrow = document.querySelector('[data-week="Next"]');
    _previousArrow = document.querySelector('[data-week="Previous"]');
    addHandlerRender(e) {
      e(), this.addSliderArrowEvents(e), setTimeout(() => {
        this._makeTabActive(this._data.currentDate)
      }, 1e3)
    }
    addSliderArrowEvents(e) {
      this._nextArrow.addEventListener("click", () => {
        e(this._data.nextMonday), this._makeTabActive(this._data.currentMonday)
      }), this._previousArrow.addEventListener("click", () => {
        e(this._data.previousMonday);
        let t = this._data.currentDate > this._data.currentMonday;
        this._makeTabActive(t ? this._data.currentDate : this._data.currentMonday)
      })
    }
    controlArrowInteractivity() {
      this._data.currentDate > this._data.currentMonday ? this._previousArrow.classList.add("element-inactive") : this._previousArrow.classList.remove("element-inactive")
    }
    updateSlider(e) {
      this.setData(e), this._addSliderDateData(), this._updateTitle(), this._updateTabLink()
    }
    _addSliderDateData() {
      this._tabLinkArr.forEach((e, t) => {
        let a = new Date(this._data.currentMonday);
        a.setDate(a.getDate() + t), e.dataset.date = a
      })
    }
    _updateTabLink() {
      this._tabLinkArr.forEach(e => {
        let t = new Date(e.dataset.date),
          a = new Date(this._data.currentDate);
        t.setHours(0, 0, 0, 0), a.setHours(0, 0, 0, 0), t.getTime() >= a.getTime() ? e.classList.remove("element-inactive") : e.classList.add("element-inactive");
        let r = e.querySelector("[data-day]"),
          s = e.querySelector("[data-date]"),
          n = `${t.getDate()}`.padStart(2, 0),
          i = `${t}`.slice(0, 1);
        r.innerHTML = i, s.innerHTML = n
      })
    }
    _makeTabActive(e) {
      let t = document.querySelector(`[data-date="${e}"]`);
      t.addEventListener("click", e => e.preventDefault()), t.click()
    }
    _updateTitle() {
      let e = document.querySelector("[data-title]"),
        t = new Date(this._data.currentMonday),
        a = t.getFullYear(),
        r = t.toLocaleString("en-US", {
          month: "long"
        });
      e.innerHTML = `${r} ${a}`
    }
  }
  var c = new l;
  class d extends o {
    _currentDate = new Date;
    _currentTime = new Date().getTime();
    _userLocale = navigator.language;
    _timeZone = new Intl.DateTimeFormat(this._userLocale, {
      timeZoneName: "longGeneric"
    }).format(this._currentDate).split(" ").slice(1).map(e => e.at(0)).join("");
    _classData;
    _targetElement;
    _allTabLinks = Array.from(document.querySelectorAll(".class-date-wrapper"));
    _allContentWrapper = Array.from(document.querySelectorAll(".class-content-wrapper"));
    classListRendererHandler(e) {
      this._allTabLinks.forEach((t, a) => {
        t.addEventListener("click", async () => {
          let r = new Date(t.dataset.date),
            s = new Date(r);
          s.setDate(r.getDate() + 1), this._updateSelectedDateText(r, a), this._targetElement = this._allContentWrapper[a].querySelector(".class-list-wrapper");
          let n = e => `${e.getFullYear()}-${(e.getMonth()+1).toString().padStart(2,"0")}-${e.getDate().toString().padStart(2,"0")}`,
            i = n(r),
            o = n(s);
          await e(i, o);
          let l = this._filterData(r).filter((e, t) => t < 10);
          console.log(l), 0 === l.length ? this._targetElement.innerHTML = `Currently, there are no upcoming classes scheduled.
            Please check for another date.` : (this._clear(this._targetElement), l.forEach(e => this.render(e, this._targetElement)))
        })
      })
    }
    _filterData(e) {
      return this._data.classData.filter(e => {
        let t = new Date(e.classDateTime),
          a = new Date;
        return t.getTime() > a.getTime()
      })
    }
    _updateSelectedDateText(e, t) {
      let a = e.getDate(),
        r = e.toLocaleDateString("en-US", {
          month: "long"
        }).slice(0, 3),
        s = e.getFullYear();
      this._allContentWrapper[t].querySelector(".class-selected-date-wrapper").innerHTML = `${a} ${r}, ${s}`
    }
    _generateMarkup(e) {
      let t = new Date(e.classDateTime),
        a = new Date(e.classDateTime).toLocaleTimeString("en-US", {
          timeStyle: "short"
        }),
        r = Math.floor((t - new Date) / 6e4),
        s = r >= 0 && r <= 5,
        n = new Date(t.getTime() + 6e4 * e.duration).toLocaleTimeString("en-US", {
          timeStyle: "short"
        }),
        i = window.location.pathname.includes("/lp/") || window.location.pathname.includes("/join/");
      return `
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
                <a href="https://app.shvasa.com/book-class?classId=${e?.id}&teacher=${e?.teacherInfo?.name}&time=${e?.classDateTime}${i?"":"&packageId=67ea76adea89798f74a19b4a&signLabel=Book%20a%20Free%20Class"}" class="primary-button size-small bg-color-accent-tropical-teal-600 ${s?"bg-color-accent-red":""}" data-class-booking-btn="">
                <div data-b5="" class="b5 semi-bold color-white">${s?"Join":"Book"}
                </div>
            </a>
            </div>
        </div>
    `
    }
  }
  var u = new d;
  let h = function(e) {
      try {
        r(e), c.setData(t), c._addSliderDateData(), c._updateTitle(), c._updateTabLink(), c.controlArrowInteractivity()
      } catch (e) {
        console.log(e)
      }
    },
    m = async function(e, r) {
      try {
        await a(e, r), u.setData(t)
      } catch (e) {
        console.log(e)
      }
    };
  window.init = function() {
    c.addHandlerRender(h), u.classListRendererHandler(m)
  }, init()
})();
//# sourceMappingURL=controller.js.map


if (new Date().getDay() === 0) {
  const activeDate = document.querySelector(`[data-week="Previous"]`);

  activeDate.addEventListener('click', e => e.preventDefault());

  activeDate.click();
}
