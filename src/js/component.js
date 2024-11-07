const textBox = document.querySelectorAll(".textBox");

if (textBox) {
    textBox.forEach(e => {
        const textarea = e.querySelector("textarea");
        const limit = e.querySelector(".textBox-limit span");

        limit.textContent = textarea.value.length;

        textarea.addEventListener("input", e => {
            const value = e.target.value;
            if (value.length > textarea.getAttribute("maxlength")) {
                limit.textContent = textarea.getAttribute("maxlength");
            } else {
                limit.textContent = value.length;
            }
        });
    });
}

const searchBox = document.querySelector(".searchBox");

if (searchBox) {
    const input = searchBox.querySelector("input");
    const clear = searchBox.querySelector(".searchBox-remove");

    searchBox.addEventListener("click", e => {
        searchBox.classList.add("active");
    });

    window.addEventListener("click", e => {
        if (!searchBox.contains(e.target)) {
            searchBox.classList.remove("active");
        }
    });

    clear.addEventListener("click", e => {
        input.value = "";
        input.focus();
    });
}


class TabContent {
    constructor(element){
        this.tabTarget = element;
        this.contents = document.querySelector(`.tab-contents[data-tag="${this.tabTarget?.dataset.tag ?? 0}"]`);
        this.tabIdx;

        if(this.tabTarget){
            this.init();
        }
    }
    init(){
        const tabActiveTarget = this.tabTarget.querySelector('.tab.active');
        this.tabIdx = tabActiveTarget ? tabActiveTarget.dataset.idx : 0;
        const conActiveTarget = this.contents.querySelector(`.content-item[data-idx="${this.tabIdx}"]`);
        conActiveTarget.classList.add('active');

        this.tabTarget.addEventListener('click',(e)=>{
            if(e.target.classList.contains('tab')){
                const idx = e.target.dataset.idx;
                if(idx == this.tabIdx) return;

                const disabledTabTarget = this.tabTarget.querySelector(`.tab[data-idx="${this.tabIdx}"]`);
                const disabledConTarget = this.contents.querySelector(`.content-item[data-idx="${this.tabIdx}"]`);
                disabledTabTarget.classList.remove('active');
                disabledConTarget.classList.remove('active');

                this.tabIdx = idx;

                e.target.classList.add('active');
                this.contents.querySelector(`.content-item[data-idx="${this.tabIdx}"]`).classList.add('active');
            }
        })
    }
}

class Dropdown {
    constructor(element) {
        this.selectBox = element;
        this.select = this.selectBox.querySelector("select");
        this.selectOptions = this.select.querySelectorAll("option");
        this.ctmSelectBox = this.selectBox.querySelector(".customSelect");
        this.ctmView = this.ctmSelectBox.querySelector(".customSelect-view");
        this.ctmOptions = this.ctmSelectBox.querySelector(".customSelect-options");

        this.init();
    }
  
    init() {
        if (this.select.value) {
            const selectedOp = this.select.querySelector("option:checked");
            this.ctmView.textContent = selectedOp.text;
        } else {
            const selectedOp = this.select.querySelector("option:disabled");
            console.log(this.select)
            this.ctmView.textContent = selectedOp.text;
        }

        if (this.select.hasAttribute("disabled")) return;

        let options = "";

        this.selectOptions.forEach(e => {
            options += `<li data-value="${e.value}">${e.textContent}</li>`;
        });

        this.ctmOptions.insertAdjacentHTML("beforeend", options);

        const cusOps = this.ctmOptions.childNodes;

        for (const li of cusOps) {
            li.addEventListener("click", e => this.selectItem(e));
        }

        this.ctmView.addEventListener("click", () => this.toggleMenu());
        document.addEventListener("mousedown", event => {
            if (!this.selectBox.contains(event.target)) {
                this.closeMenu();
            }
        });
    }
   
    setValue (value) {
        const target = this.select.querySelector(`option[value="${value}"]`);
        if(target){
            this.select.value = value;
            this.ctmView.textContent = target.text;
        }else{
            const selectedOp = this.select.querySelector("option:disabled");
            this.ctmView.textContent = selectedOp.text;
        }
    }
    toggleMenu() {
        if (this.selectBox.classList.contains("active")) {
            this.selectBox.classList.remove("active");
        } else {
            this.selectBox.classList.add("active");
        }
    }

    closeMenu() {
        this.selectBox.classList.remove("active");
    }

    selectItem(event) {
        const selectedItem = event.target;
        this.ctmView.textContent = selectedItem.textContent;
        this.select.value = selectedItem.dataset.value;
        this.closeMenu();
    }
}

function modalEventHandler(e){
    if(e.target == e.currentTarget){
        e.currentTarget.classList.remove("active");
    }
}

function openModal(popupId) {
    const target = document.querySelector(`#${popupId}`);
    if (target.classList.contains("active")) {
        target.classList.remove("active");
    } else {
        target.classList.add("active");
    }

    target.addEventListener('click',modalEventHandler)
}

function closeModal(popupId) {
    const target = document.querySelector(`#${popupId}`);
    target.classList.remove("active");

    target.removeEventListener('click', modalEventHandler);
}

class Datepicker {
    constructor(ele) {
        this.datepicker = ele;
        this.dateInput = this.datepicker.querySelector("input");

        this.inputValueDate = new Date();
        this.nowDate = new Date(); // 드롭다운 날짜
        this.init();
    }
    init() {
        const year = this.nowDate.getFullYear();
        const month = this.nowDate.getMonth();
        const date = this.nowDate.getDate();

        const calendar = `<div class="datepicker-dd">
                    <div class="head f-sb">
                        <button class="prev-btn"></button>
                        <span class="showMn"></span>
                        <button class="next-btn"></button>
                    </div>
                    <ul class="days flex">
                        <li class="sun">일</li><li>월</li><li>화</li><li>수</li><li>목</li><li>금</li><li class="sat">토</li>
                    </ul>
                    <div class="dates"></div>
                </div>`;

        this.datepicker.insertAdjacentHTML("beforeend", calendar);

        this.datepicker.querySelector(".prev-btn").addEventListener("click", () => this.moveMonth(-1));
        this.datepicker.querySelector(".next-btn").addEventListener("click", () => this.moveMonth(1));
        this.dateInput.addEventListener("click", e => this.toggleDropdown(e));

        document.addEventListener("click", event => {
            if (!this.datepicker.contains(event.target)) {
                this.closeDropdown();
            }
        });

        this.dateInput.value = `${year}.${month < 9 ? `0${month + 1}` : month + 1}.${date < 10 ? `0${date}` : date}`;
        this.render(this.nowDate);
    }
    toggleDropdown(e) {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active");
        } else {
            e.target.classList.add("active");
            this.render(this.inputValueDate);
            // this.init();
        }
    }
    closeDropdown() {
        this.dateInput.classList.remove("active");
    }

    setValue(value) {
        let newDate;
        if (typeof value === "string" && value.replace(/[^0-9]/g, "").length === 8) {
            const a = value.replace(/[^0-9]/g, "");
            newDate = new Date(a.slice(0, 4), a.slice(4, 6) - 1, a.slice(6, 8));
        } else if (value instanceof Date) {
            newDate = value;
        } else {
            newDate = new Date();
        }

        this.nowDate = newDate;
        this.inputValueDate = newDate;

        const year = this.inputValueDate.getFullYear();
        const month = this.inputValueDate.getMonth();
        const date = this.inputValueDate.getDate();

        this.dateInput.value = `${year}.${month < 9 ? `0${month + 1}` : month + 1}.${date < 10 ? `0${date}` : date}`;
        this.render(newDate);
    }
    moveMonth(range) {
        this.nowDate = new Date(this.nowDate.getFullYear(), this.nowDate.getMonth() + range);
        this.render(this.nowDate);
    }
    render(newDate) {
        const year = newDate.getFullYear();
        const month = newDate.getMonth();

        const ipYear = this.inputValueDate.getFullYear();
        const ipMonth = this.inputValueDate.getMonth();
        const ipDate = this.inputValueDate.getDate();

        const thisMonthLastDate = new Date(year, month + 1, 0).getDate(); // 현재달 마지막 일
        const thisMonthLastDay = new Date(year, month + 1, 0).getDay(); // 현재달 마지막 요일

        const prevMonthLastDate = new Date(year, month, 0).getDate(); // 전달 마지막 일
        const prevMonthLastDay = new Date(year, month, 0).getDay(); // 전달 마지막 요일

        let HTML = "";

        for (let i = prevMonthLastDay; i >= 0; i--) {
            HTML += `<div class="date disabled">${prevMonthLastDate - i}</div>`;
        }
        for (let i = 1; i <= thisMonthLastDate; i++) {
            if (year == ipYear && ipMonth == month && ipDate == i) {
                HTML += `<div data-value="${i}" class="date active">${i}</div>`;
            } else {
                HTML += `<div data-value="${i}" class="date">${i}</div>`;
            }
        }
        for (let i = 1; i <= 6 - thisMonthLastDay; i++) {
            HTML += `<div class="date disabled">${i}</div>`;
        }

        const title = this.datepicker.querySelector(".showMn");
        const insertTarget = this.datepicker.querySelector(".dates");

        title.textContent = `${year}.${month < 9 ? `0${month + 1}` : month + 1}`;
        insertTarget.innerHTML = HTML;

        const clickTarget = insertTarget.querySelectorAll(".date:not([class='disabled'])");

        clickTarget.forEach(el => {
            el.addEventListener("click", e => {
                const date = e.target.dataset.value;
                const a = new Date(year, month, date);
                this.inputValueDate = a;
                this.dateInput.value = `${year}.${month < 9 ? `0${month + 1}` : month + 1}.${
                    date < 10 ? `0${date}` : date
                }`;
                this.closeDropdown();
            });
        });
    }
}

const headerBtn = document.querySelector(".header-open")

if(headerBtn){
    headerBtn.addEventListener("click", function() {
        let header = document.querySelector("header.mo")
        header.classList.toggle("active")
    })
    $(".header-menu button").click(function() {
        let li = this.closest("li")
        li.classList.toggle("active")
    })

}

$('.depth1-item h3').on('click',(e)=>{
    if($(e.target).parent().find('.depth2-wrap').length){
        $(e.target).parent().toggleClass('active')
    }
})