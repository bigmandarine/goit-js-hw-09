import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
    console.log(new Date());
  },
};

flatpickr(refs.input, options);

refs.btnStart.addEventListener('click', countDownTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function countDownTimer() {
  refs.btnStart.disabled = true;
  refs.input.disabled = true;
  let timerId = setInterval(() => {
    let countdown = new Date(refs.input.value) - new Date();
    if (countdown > 0) {
      let timerData = convertMs(countdown);
      refs.days.textContent = addLeadingZero(timerData.days);
      refs.hours.textContent = addLeadingZero(timerData.hours);
      refs.minutes.textContent = addLeadingZero(timerData.minutes);
      refs.seconds.textContent = addLeadingZero(timerData.seconds);
    } else {
      return clearInterval(timerId);
    }
  }, 1000);
}
