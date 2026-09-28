// Fotoğrafa tıklayınca büyük hâlini gösterir. Esc ya da tıklama kapatır, ok tuşları gezinir.
const rows = document.querySelectorAll('.photos');

if (rows.length) {
  const box = document.createElement('dialog');
  box.className = 'lightbox';
  box.innerHTML = '<img alt="">';
  document.body.append(box);

  const big = box.querySelector('img');
  let set = [];
  let i = 0;

  const show = () => {
    big.src = set[i].currentSrc || set[i].src;
    big.alt = set[i].alt;
  };

  rows.forEach((row) => {
    const imgs = [...row.querySelectorAll('img')];
    imgs.forEach((img, n) => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      const open = () => {
        set = imgs;
        i = n;
        show();
        box.showModal();
      };
      img.addEventListener('click', open);
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  });

  box.addEventListener('click', () => box.close());
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { i = (i + 1) % set.length; show(); }
    if (e.key === 'ArrowLeft') { i = (i - 1 + set.length) % set.length; show(); }
  });
}
