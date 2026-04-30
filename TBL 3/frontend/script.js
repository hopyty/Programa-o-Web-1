const btn = document.getElementById('btnCarregar');
const lista = document.getElementById('lista');

btn.addEventListener('click', () => {
  fetch('http://localhost:3000/usuarios', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data => {
      lista.innerHTML = '';

      data.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = usuario.nome;
        lista.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Erro:', err);
    });
});
