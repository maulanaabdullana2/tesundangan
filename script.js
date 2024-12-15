const footbar = document.querySelector('.footbar');
window.addEventListener('scroll', function () {
    footbar.classList.add('sticky');
});



function startCountdown(targetDate) {
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        } else {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
    }, 1000);
}
const targetDate = new Date('2024-12-20T00:00:00').getTime(); 
startCountdown(targetDate);






const data = JSON.parse(localStorage.getItem('guestBookData')) || [];

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const quantity = document.getElementById('quantity').value;
    const message = document.getElementById('message').value;
    
    
    const currentTime = new Date();
    const formattedDate = currentTime.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });

    const formData = {
        name: name,
        attendance: attendance,
        quantity: quantity,
        message: message,
        time: formattedDate 
    };

    const data = JSON.parse(localStorage.getItem('guestBookData')) || [];
    data.push(formData);
    localStorage.setItem('guestBookData', JSON.stringify(data));
    
    appendComment(formData);
    document.getElementById('myForm').reset();
});



function appendComment(comment) {
    const commentsContainer = document.getElementById('comments-container');

    const commentElement = document.createElement('div');
    commentElement.classList.add('flex', 'items-start', 'mb-4');
    
    let attendanceClass = '';
    if (comment.attendance.toLowerCase() === 'hadir') {
        attendanceClass = 'attendance-hadir';
    } else if (comment.attendance.toLowerCase() === 'belum pasti') {
        attendanceClass = 'attendance-belum-pasti';
    } else if (comment.attendance.toLowerCase() === 'tidak hadir') {
        attendanceClass = 'attendance-tidak-hadir'; 
    }

    commentElement.innerHTML = `
        <div class="flex items-start mb-4">
            <img alt="User profile picture" class="w-10 h-10 rounded-full mr-3" height="100"
                src="https://storage.googleapis.com/a1aa/image/lI8BsfWTzWSxNips2MJRAUq2iflWZqLfP2BL0tEGxjKyW2unA.jpg"
                width="100" />
            <div class="komen flex-1 p-4 rounded-lg">
                <div class="flex justify-between items-center">
                    <h4 class="font-semibold text-xl">${comment.name}</h4>  <!-- Name with large font -->
                    <span class="text-white px-2 py-1 rounded ${attendanceClass}">${comment.attendance}</span>
                </div>
                <p class="text-gray-600">${comment.message}</p>
                <!-- Display time when the comment was made -->
                <span class="text-gray-400 text-sm">${comment.time}</span>
            </div>
        </div>
    `;

    // Append the comment to the container
    commentsContainer.appendChild(commentElement);
}


function displayComments() {
    const commentsContainer = document.getElementById('comments-container');
    const data = JSON.parse(localStorage.getItem('guestBookData')) || [];
    
    commentsContainer.innerHTML = '';  
    data.forEach(comment => {
        appendComment(comment);  
    });
}

window.onload = displayComments;






const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const accountNumber = button.previousElementSibling.querySelector('.account-number').textContent;

        const tempInput = document.createElement('input');
        tempInput.value = accountNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');

        document.body.removeChild(tempInput);
    });
});