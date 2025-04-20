document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    
    // Real-time character count for message
    messageInput.addEventListener('input', function() {
      const currentLength = this.value.length;
      charCount.textContent = `${currentLength}/500 characters`;
      
      if (currentLength > 500) {
        this.value = this.value.substring(0, 500);
      }
    });
    
    // Form validation
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Reset error messages
      document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
      
      let isValid = true;
      
      // Name validation
      if (nameInput.value.trim() === '') {
        document.getElementById('name-error').textContent = 'Name is required';
        isValid = false;
      } else if (nameInput.value.length < 2) {
        document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
        isValid = false;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() === '') {
        document.getElementById('email-error').textContent = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(emailInput.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email';
        isValid = false;
      }
      
      // Message validation
      if (messageInput.value.trim() === '') {
        document.getElementById('message-error').textContent = 'Message is required';
        isValid = false;
      } else if (messageInput.value.length < 10) {
        document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
        isValid = false;
      }
      
      if (isValid) {
        submitForm();
      }
    });
    
    // Form submission
    function submitForm() {
      const formData = new FormData(form);
      const submitButton = document.getElementById('submit-button');
      const statusElement = document.getElementById('form-status');
      
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      statusElement.textContent = '';
      
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          statusElement.textContent = 'Thank you! Your message has been sent.';
          statusElement.style.color = 'green';
          form.reset();
          charCount.textContent = '0/500 characters';
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        statusElement.textContent = 'Oops! There was a problem sending your message. Please try again.';
        statusElement.style.color = 'red';
        console.error('Error:', error);
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      });
    }
  });