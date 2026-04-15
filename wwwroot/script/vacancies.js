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

// FORM SUBMISSION
const applyForm = document.getElementById('applyForm');
if (applyForm) {
  applyForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const submitBtn = applyForm.querySelector('.cta-button');
    const originalBtnText = submitBtn.textContent;

    try {
      // Get IP
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      document.getElementById('ip').value = ipData.ip;

      // Handle CV upload as base64 if present
      const fileInput = document.getElementById('cv-upload');
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });

        const base64 = dataUrl.split(',')[1];
        document.getElementById('cv_data').value = base64;
        document.getElementById('cv_filename').value = file.name;
        document.getElementById('cv_content_type').value = file.type;
      }

      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Create FormData from the form
      const formData = new FormData(applyForm);

      // Send to Google Apps Script
      await fetch(applyForm.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      // Show success message
      formMessage.style.display = 'block';
      formMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
      formMessage.style.color = '#4CAF50';
      formMessage.style.borderLeft = '4px solid #4CAF50';
      formMessage.textContent = '✓ Application sent successfully! We\'ll contact you soon.';

      // Reset form
      applyForm.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);

    } catch (error) {
      formMessage.style.display = 'block';
      formMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
      formMessage.style.color = '#F44336';
      formMessage.style.borderLeft = '4px solid #F44336';
      formMessage.textContent = '✗ Error sending application. Please try again.';
      console.error('Form submission error:', error);
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}
