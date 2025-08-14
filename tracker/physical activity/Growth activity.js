document.querySelectorAll('.activitty-card').forEach(card => {
  const type = card.getAttribute('data-type');

  // Edit name
  const titleEl = card.querySelector('.editable-title');
  const editTitleBtn = card.querySelector('.title .edit-btn');
  editTitleBtn.addEventListener('click', () => {
    const newName = prompt(`Enter ${type} name:`, titleEl.textContent);
    if (newName) titleEl.textContent = newName;
  });

  // Edit values (completed and goal)
  card.querySelectorAll('.editable').forEach(valueEl => {
    const field = valueEl.dataset.field;
    const btn = valueEl.nextElementSibling;

    btn.addEventListener('click', () => {
      const current = parseInt(valueEl.textContent.trim(), 10);
      const input = prompt(`Enter ${field} value:`, current);
      if (input !== null) {
        valueEl.textContent = input;
        checkGoal(card);
      }
    });
  });

  function checkGoal(card) {
    const completed = parseInt(card.querySelector('[data-field="completed"]').textContent);
    const goal = parseInt(card.querySelector('[data-field="goal"]').textContent);
    const celebrationWrapper = card.querySelector('.celebration-wrapper');

    if (completed >= goal) {
      celebrationWrapper.style.display = 'block';

      // Hide after 5 seconds
      setTimeout(() => {
        celebrationWrapper.style.display = 'none';
      }, 5000);
    } else {
      celebrationWrapper.style.display = 'none';
    }
  }
});
