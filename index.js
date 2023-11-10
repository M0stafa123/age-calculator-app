let byear = document.querySelector("#year");
let bmonth = document.querySelector("#month");
let bday = document.querySelector("#day");
let btn = document.querySelector("article span");
//
bday.classList.add;
let showYears = document.querySelector(".years ");
let showMonths = document.querySelector(".months");
let showDays = document.querySelector(".days");
// add,remove and check class
function addClass(el, cls) {
  el.classList.add(...cls);
}
function removeClass(el, cls) {
  el.classList.remove(...cls);
}
function IsClass(el, cls) {
  return el.classList.contains(cls);
}
function errText(e, text) {
  let p = document.createElement("p");
  e.parentElement.appendChild(p);
  p.innerHTML = text;
}

//
btn.addEventListener("click", function () {
  let bd = new Date(`${bmonth.value}/${bday.value}/${byear.value}`);
  let date = new Date();
  let years = date.getFullYear() - bd.getFullYear();
  let months = date.getMonth() - bd.getMonth();
  let days = date.getDate() - bd.getDate();
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const monthDays = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
    days += monthDays;
    months--;
  }
  //  if blank
  document.querySelectorAll("input").forEach((e) => {
    if (e.value == "") {
      addClass(e.parentElement, ["err", "blank"]);
      years = months = days = NaN;
    } else {
      // remove blank err
      if (
        IsClass(e.parentElement, "err") &&
        IsClass(e.parentElement, "blank")
      ) {
        removeClass(e.parentElement, ["err", "blank"]);
      }
      // #remove blank err

      // validation on day
      if (e.id == "day") {
        if (
          (bday.value.length > 2 || bday.value > 31 || bday.value < 1) &&
          bday.value !== ""
        ) {
          addClass(bday.parentElement, ["err", "invalidday"]);
        } else {
          if (
            IsClass(e.parentElement, "err") &&
            IsClass(e.parentElement, "invalidday")
          ) {
            removeClass(e.parentElement, ["err", "invalidday"]);
          }
          if (bday.value > new Date(byear.value, bmonth.value, 0).getDate()) {
            addClass(bday.parentElement, ["err", "invalidDate"]);
            document.querySelectorAll("input").forEach((e) => {
              addClass(e.parentElement, ["err"]);
            });
            years = NaN;
          } else {
            if (
              IsClass(e.parentElement, "err") &&
              IsClass(e.parentElement, "invalidDate")
            ) {
              removeClass(bday.parentElement, ["err", "invalidDate"]);
              document.querySelectorAll("input").forEach((e) => {
                removeClass(e.parentElement, ["err"]);
              });
            }
          }
        }
        //  # validation on day

        //  validation on year
      } else if (e.id == "year") {
        if (e.value.length !== 4) {
          addClass(e.parentElement, ["err", "invalidYear"]);
          years = NaN;
        } else {
          if (
            IsClass(e.parentElement, "err") &&
            IsClass(e.parentElement, "invalidYear")
          ) {
            removeClass(e.parentElement, ["err", "invalidYear"]);
          }
          if (e.value > date.getFullYear()) {
            addClass(e.parentElement, ["err", "past"]);
            years = NaN;
          } else {
            if (
              IsClass(e.parentElement, "err") &&
              IsClass(e.parentElement, "past")
            ) {
              removeClass(e.parentElement, ["err", "past"]);
            }
          }
        }
        //  # validation on year

        //   validation on month
      } else if (e.id == "month") {
        if (
          (e.value.length > 2 || e.value > 12 || e.value < 1) &&
          e.value !== ""
        ) {
          addClass(e.parentElement, ["err", "invalidMonth"]);
        } else {
          if (
            IsClass(e.parentElement, "err") &&
            IsClass(e.parentElement, "invalidMonth")
          ) {
            removeClass(e.parentElement, ["err", "invalidMonth"]);
          }
        }
      }
    }
    // e.value = "";
  });

  // // valid month
  // if (
  //   (bmonth.value.length > 2 || bmonth.value > 12 || bmonth.value < 1) &&
  //   bmonth.value !== ""
  // ) {
  //   addClass(bmonth.parentElement, "err");
  //   errText(bmonth, "invalid month");
  // }

  if (isNaN(years) || isNaN(months) || isNaN(days)) {
    years = "- -";
    months = "- -";
    date = "- -";
  } else {
    showYears.innerHTML = years;
    showMonths.innerHTML = months;
    showDays.innerHTML = days;
  }
});
