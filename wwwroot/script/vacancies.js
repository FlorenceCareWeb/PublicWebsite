// VACANCIES PAGE INTERACTIONS

// READ MORE TOGGLE FUNCTIONALITY
const readMoreButtons = document.querySelectorAll('.read-more-toggle');
readMoreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.job-card');
    if (!card) return;
    card.classList.toggle('expanded');
    btn.textContent = card.classList.contains('expanded') ? 'Show less' : 'Read more';
  });
});

// APPLICATION MODAL FUNCTIONALITY
const applyModal = document.getElementById('applyModal');
const modalRoleLabel = document.getElementById('modalRoleLabel');
const applyRoleInput = document.getElementById('applyRoleInput');

const closeApplyModal = () => {
  if (!applyModal) return;
  applyModal.classList.remove('active');
  applyModal.setAttribute('aria-hidden', 'true');
};

const openApplyModal = (role) => {
  if (!applyModal || !modalRoleLabel || !applyRoleInput) return;
  modalRoleLabel.textContent = role;
  applyRoleInput.value = role;
  applyModal.classList.add('active');
  applyModal.setAttribute('aria-hidden', 'false');
};

// APPLY BUTTON EVENT LISTENERS
document.querySelectorAll('.apply-btn').forEach(button => {
  button.addEventListener('click', () => {
    const role = button.dataset.role || 'Care Role';
    openApplyModal(role);
  });
});

// CLOSE MODAL BUTTON
document.querySelectorAll('.modal-close').forEach(button => {
  button.addEventListener('click', closeApplyModal);
});

// CLOSE MODAL BY CLICKING OUTSIDE
if (applyModal) {
  applyModal.addEventListener('click', (event) => {
    if (event.target === applyModal) {
      closeApplyModal();
    }
  });
}

// CLOSE MODAL WITH ESC KEY
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && applyModal && applyModal.classList.contains('active')) {
    closeApplyModal();
  }
});
