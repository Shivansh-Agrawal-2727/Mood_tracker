const currentDate = document.querySelector(".curr-date");
const days = document.querySelector(".days");
const prevNext = document.querySelectorAll(".icons span");
const calenderBody = document.querySelector(".body");

// getting curr year & month 
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const renderCalender = () => {
    // Day 0 is a special case in JavaScript—it means the last day of the previous month
    const lastDateofcurrMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const firstDayofcurrMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofprevMonth = new Date(currYear, currMonth, 0).getDate();
    const lastDayofcurrMonth = new Date(currYear, currMonth, lastDateofcurrMonth).getDay();

    let liTag = "";

    // add dates of prev month
    for (let i = firstDayofcurrMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofprevMonth - i + 1}</li>`;
    }

    // add dates, curr month, curr Year
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    for (let i = 1; i <= lastDateofcurrMonth; i++) {
        let isToday = i === new Date().getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday} curr">${i}</li>`;
    }

    // add dates of prev month
    for (let i = lastDayofcurrMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofcurrMonth + 1}</li>`;
    }
    days.innerHTML = liTag;
}
renderCalender();
loadsavedemoji();

prevNext.forEach((icon) => {
    icon.addEventListener('click', () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalender();
        loadsavedemoji();
    })
});
console.log(currMonth);


const flipcard = document.querySelectorAll(".flip-card");
flipcard.forEach((card) => {
    card.addEventListener('click', () => {
        const todayDate = document.querySelector(".active");
        const dateofToday = todayDate.innerText;
        if (todayDate.childElementCount < 1 && confirm("Are you sure you want to add this emoji in your Calender ?")) {
            const p = document.createElement('p');
            p.className = "emoji";
            if (card.id === "happy") {
                p.innerText = "😄";
            }
            else if (card.id === "sad") {
                p.innerText = "😔";
            }
            else if (card.id === "neutral") {
                p.innerText = "😑";
            }
            else if (card.id === "excited") {
                p.innerText = "🤩";
            }
            todayDate.appendChild(p);
            const dateKey = `${currYear}-${currMonth + 1}-${dateofToday}`;
            saveEmojiToLocalStorage(dateKey, p.innerText);

        }
        else {
            alert("Cannot change the mood");
        }


    })
})


function saveEmojiToLocalStorage(datakey, emoji) {
    let savedemoji = JSON.parse(localStorage.getItem("calenderemoji")) || {};
    savedemoji[datakey] = emoji;
    localStorage.setItem("calenderemoji", JSON.stringify(savedemoji));
}

function loadsavedemoji() {
    const savedemoji = JSON.parse(localStorage.getItem("calenderemoji")) || {};
    const addemoji = document.querySelectorAll(".days li.curr");
    addemoji.forEach((dateElem) => {
        const datekey = `${currYear}-${currMonth + 1}-${dateElem.innerText}`;
        if (savedemoji[datekey]) {
            const p = document.createElement('p');
            p.className = "emoji";
            p.innerText = savedemoji[datekey];
            dateElem.appendChild(p);
        }
    })
}

