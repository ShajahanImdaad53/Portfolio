// contact-handler.js — Intercept contact form submission, store to Firebase Firestore, and display Toast.
import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Capture any form submission in the portfolio contact section
  const forms = [
    document.getElementById('firebase-contact-form'), // for index.html
    document.querySelector('.contact-form form')       // fallback for index.php
  ].filter(Boolean);

  forms.forEach(form => {
    form.removeAttribute('action');
    form.removeAttribute('method');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!nameInput || !emailInput || !messageInput || !submitBtn) return;

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      // Check if user still has placeholders in config
      const isPlaceholderConfig = checkConfigPlaceholders();
      if (isPlaceholderConfig) {
        showToast(
          "Firebase Configuration Required",
          "Please configure your Firebase credentials in firebase-config.js before sending messages.",
          "error"
        );
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        return;
      }

      try {
        await addDoc(collection(db, "contacts"), {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim(),
          timestamp: serverTimestamp()
        });

        // Show premium success toast alert
        showToast(
          "Message Sent!",
          "Thank you, your message has been saved in Firestore. I will get back to you soon.",
          "success"
        );
        form.reset();
      } catch (error) {
        console.error("Error adding contact entry: ", error);
        showToast(
          "Failed to Send",
          "There was an error connecting to Firebase. Check the console details.",
          "error"
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  });
});

// Help verify if the configuration placeholders exist
function checkConfigPlaceholders() {
  try {
    // If config has YOUR_API_KEY, it's not configured yet
    // Since we import the firebase instances directly, we check if initializeApp failed
    // or if the configuration still contains string patterns
    // A clean way is to catch authDomain/apiKey values if they contain placeholders
    // We can also fetch the database directly. If it fails, or if it is unconfigured:
    return db.app.options.apiKey.includes('YOUR_API_KEY') || 
           db.app.options.projectId.includes('YOUR_PROJECT_ID');
  } catch (err) {
    return true;
  }
}

// Custom Premium Toast Notification System
function showToast(title, message, type) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.position = 'fixed';
    container.style.bottom = '2rem';
    container.style.right = '2rem';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '0.75rem';
    container.style.maxWidth = '380px';
    container.style.width = 'calc(100% - 4rem)';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.background = 'rgba(15, 23, 42, 0.9)';
  toast.style.backdropFilter = 'blur(16px)';
  toast.style.webkitBackdropFilter = 'blur(16px)';
  toast.style.border = type === 'success' 
    ? '1px solid rgba(74, 222, 128, 0.25)' 
    : '1px solid rgba(239, 68, 68, 0.25)';
  toast.style.borderRadius = '16px';
  toast.style.padding = '1.2rem 1.5rem';
  toast.style.color = '#ffffff';
  toast.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
  toast.style.display = 'flex';
  toast.style.alignItems = 'start';
  toast.style.gap = '1rem';
  toast.style.transform = 'translateY(30px)';
  toast.style.opacity = '0';
  toast.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

  const icon = document.createElement('i');
  icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
  icon.style.color = type === 'success' ? '#4ade80' : '#f87171';
  icon.style.fontSize = '1.4rem';
  icon.style.marginTop = '0.1rem';

  const textContent = document.createElement('div');
  textContent.style.flex = '1';
  
  const toastTitle = document.createElement('strong');
  toastTitle.textContent = title;
  toastTitle.style.display = 'block';
  toastTitle.style.fontSize = '0.95rem';
  toastTitle.style.fontWeight = '700';
  toastTitle.style.marginBottom = '0.25rem';
  
  const toastMsg = document.createElement('span');
  toastMsg.textContent = message;
  toastMsg.style.fontSize = '0.82rem';
  toastMsg.style.color = '#94a3b8';
  toastMsg.style.lineHeight = '1.4';

  textContent.appendChild(toastTitle);
  textContent.appendChild(toastMsg);
  toast.appendChild(icon);
  toast.appendChild(textContent);
  container.appendChild(toast);

  // Trigger animation after append
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);

  // Auto-remove toast after 5 seconds
  setTimeout(() => {
    toast.style.transform = 'translateY(-20px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 5000);
}
