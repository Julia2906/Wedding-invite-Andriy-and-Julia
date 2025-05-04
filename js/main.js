document.addEventListener('DOMContentLoaded', function () {
  const section = document.getElementById('inviteSection');
  const image = document.querySelector('.inv-image');
  const otherSections = document.querySelectorAll(
    '.section:not(#inviteSection)'
  );
  const audio = document.getElementById('weddingMusic');

  // Ховаємо всі інші секції при завантаженні
  otherSections.forEach(sec => {
    sec.style.display = 'none';
  });

  image.addEventListener('click', function () {
    // Ховаємо заголовок і текст
    section.querySelectorAll('h1, p').forEach(el => {
      el.style.display = 'none';
    });

    section.classList.add('no-padding');
    // Збільшення фото
    image.classList.add('expanded');

    // Додаємо текст
    let textOverlay = document.createElement('div');
    textOverlay.classList.add('image-text');
    textOverlay.innerHTML =
      '<p class="inv-text-first"> WEDDING DAY</p>  <p class="inv-text-second">Andriy & Yulia</p> <p class="inv-text-thirt">ГОРТАЙТЕ НИЖЧЕ</p>';
    section.appendChild(textOverlay);

    setTimeout(() => {
      textOverlay.classList.add('visible');
    }, 100);

    // Музика
    if (audio.paused) {
      audio.play(); // Вмикає музику
    }

    setTimeout(() => {
      otherSections.forEach(sec => {
        sec.style.display = 'block';
        sec.style.opacity = '0';
        sec.style.transition = 'opacity 1s ease-in-out';
        setTimeout(() => (sec.style.opacity = '1'), 50);
      });
    }, 1000);
  });
});

const countdownEl = document.getElementById('countdown');

// Таймер
const eventDate = new Date('2025-06-01T13:30:00').getTime();

function formatTime(num) {
  return num < 10 ? '0' + num : num;
}

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    clearInterval(timer);
    countdownEl.innerHTML = 'Подія вже почалась!';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const formattedDays = formatTime(days);
  const formattedHours = formatTime(hours);
  const formattedMinutes = formatTime(minutes);
  const formattedSeconds = formatTime(seconds);

  document.getElementById('days').innerHTML = formattedDays;
  document.getElementById('hours').innerHTML = formattedHours;
  document.getElementById('minutes').innerHTML = formattedMinutes;
  document.getElementById('seconds').innerHTML = formattedSeconds;
}, 1000);

// Форма RSVP
document.getElementById('rsvp-form').addEventListener('submit', function (e) {
  e.preventDefault(); // зупиняємо стандартну дію

  const form = e.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: data,
  })
    .then(response => response.text())
    .then(result => {
      alert('Дякуємо! 💌 Ваша відповідь надіслана.');
      form.reset();
    })
    .catch(error => {
      console.error('Помилка:', error);
      alert('На жаль, не вдалося надіслати. Спробуйте пізніше.');
    });
});
