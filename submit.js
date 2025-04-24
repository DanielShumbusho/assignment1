document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('email-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const submitButton = document.getElementById('submit-button');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const statusElement = document.getElementById('form-status');

    //Message characters counter
    messageInput.addEventListener('input', updateCharCount);

    function updateCharCount() {
        const currentLength = messageInput.value.length;
        charCount.textContent = `${currentLength}/500 characters`;

        if(currentLength > 500) {
            messageInput.value = messageInput.value.substring(0, 500);
        }
    }

    //Initialize character counter
    updateCharCount();

    //Form Validation
    form.addEventListener('submit', function(event){
        event.preventDefault();
        clearErrors();

        if(validateForm()){
            submitForm();
        }
    });

    function clearErrors(){
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';

        })
    }

    function validateForm(){
        let isValid = true;
        //Name validation
        if(nameInput.value.trim() === ''){
            document.getElementById('name-error').textContent = 'Name is required';
            isValid = false;
        }else if(nameInput.value.length < 2){
            document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }

        //Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === ''){
            document.getElementById('email-error').textContent = 'Email is required';
            isValid = false;
        }else if(!emailPattern.test(emailInput.value)){
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
        return isValid;

    }

    function submitForm() {
        const formData = new FormData(form);
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        statusElement.textContent = '';
        statusElement.className = '';

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                statusElement.textContent = 'Form submitted successfully!';
                statusElement.className = 'success';
                form.reset();
                updateCharCount();
            } else {
                throw new Error('Message not sent. Please try again later.');
            }
        })
        .catch(error => {
            showError('Something went wrong while sending your message. Please try again');
            console.error('Error:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    }
    function showSuccess(message) {
        statusElement.textContent = message;
        statusElement.className = 'success';
    }
    function showError(message) {
        statusElement.textContent = message;
        statusElement.className = 'error';
    }
})