/* Progress Bar */

function progressBar() {
  let scroll = document.body.scrollTop || document.documentElement.scrollTop;

  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  let scrolled = (scroll / height) * 100;

  document.getElementById("progressBar").style.width = scrolled + "%";
}
window.addEventListener("scroll", progressBar);


/* Burger */
const lineBtn = document.querySelector('.side__line');
const burgerBtn = document.querySelector('.side-button-1-wr');

burgerBtn.addEventListener('click', function(e) {
  lineBtn.classList.toggle('_active');
})

/* Slider */

const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
  },
  loop: true,
  pagination: {
    el: '.reviews__sliders-pag',
  },
  navigation: {
    nextEl: '.sliders__nav-next',
    prevEl: '.sliders__nav-prev',
  },
});

/* Form */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append('image', formImage.files[0]);

    if (error === 0) { 
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
      } else {
        alert('Error');
      }
    } else {
      alert('Заполните форму!')
    }
  };

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
       } else if (input.classList.contains('_phone')){
        formAddError(input);
          error++;
       } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
       }
      }
    }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  function phoneTest(input) {
    return /^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
  }

  /* Preview */

  const formImage = document.getElementById('formImage');
  const formPreview = document.getElementById('formPreview');

  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    if (!['image/jpeg', 'image/png', 'image/gif',].includes(file.type)) {
      alert('Разрешены только изображения');
      formImage.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Файл должен быть меньше 2 Мб.');
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      formPreview.innerHTML = `<img src="${e.target.result}" alt="Foto">`;
    };
    reader.onerror = function (e) {
      alert('Error');
    };
    reader.readAsDataURL(file);
  }
});

/* Arrow Fix */

$('body').append('<div class="upbtn"></div>');
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.upbtn').css({
            transform: 'scale(1)'
        });
        } else {
        $('.upbtn').css({
            transform: 'scale(0)'
        });
    }
});
$('.upbtn').on('click',function() {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
    return false;
});

/* SmoothScroll */

document.querySelectorAll('a[href^="#"').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    let href = this.getAttribute('href').substring(1);

    const scrollTarget = document.getElementById(href);

    const topOffset = document.querySelector('.scrollto').offsetHeight;

    const elementPosition = scrollTarget.getBoundingClientRect().top;

    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});