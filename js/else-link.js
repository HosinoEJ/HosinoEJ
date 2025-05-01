const overlay = document.getElementById('link_animate');

    document.querySelectorAll('[data-animate-link]').forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const href = this.href;

        overlay.classList.add('active');

        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    });