
document.addEventListener("DOMContentLoaded", function () {
    fetch('/get-events')
        .then(response => response.json())
        .then(events => {
            const eventList = document.getElementById('event-list');
            let currentIndex = 0;
            let filteredEvents = events; // Initialize filtered events with all events

            // Function to filter events
            function filterEvents(category) {
                if (category === 'free') {
                    filteredEvents = events.filter(event => event.is_paid === 'free');
                } else if (category === 'paid') {
                    filteredEvents = events.filter(event => event.is_paid === 'paid');
                } else {
                    filteredEvents = category === 'all' ?
                        events :
                        events.filter(event => event.type === category);
                }

                renderEvents(filteredEvents); // Render filtered events
            }

            // Function to render events
            function renderEvents(events) {
                eventList.innerHTML = ''; // Clear existing events
                currentIndex = 0;

                events.forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event-item');
                    eventDiv.innerHTML = `
                        <div class="card_container">
                            <div class="event-image">
                                <img src="${event.image}" alt="${event.name}" />
                            </div>
                            <div class="event-details">
                                <h3>${event.name}</h3>
                                <p><strong>Date:</strong> ${event.start_date}</p>
                                <p><strong>Location:</strong> ${event.location}</p>
                                <p><strong>Description:</strong> ${event.description}</p>
                                <!-- Registration Form -->
                                <form id="register-form-${event.id}" action="/register" method="POST">
                                    <input type="hidden" name="name" value="<%= userName %>">
                                    <input type="hidden" name="email" value="<%= email %>">
                                    <input type="hidden" name="category" value="${event.type}">
                                    <input type="hidden" name="event_id" value="${event.id}">
                                    <input type="hidden" name="event_description" value="${event.description}">
                                    <input type="hidden" name="event_start_date" value="${event.start_date}">
                                    <input type="hidden" name="event_last_date" value="${event.end_date}">
                                    <input type="hidden" name="event_image" value="${event.image}">
                                    <input type="hidden" name="event_name" value="${event.name}">
                                    <button type="submit" class="register-button">Register Now</button>
                                </form>
                            </div>
                        </div>
                    `;

                    eventList.appendChild(eventDiv);
                });

                updateSlider();
                updateSliderDots();
            }

            // Attach event listeners to filter buttons
            document.getElementById('filter-all').addEventListener('click', () => filterEvents('all'));
            document.getElementById('filter-seminar').addEventListener('click', () => filterEvents('seminar'));
            document.getElementById('filter-social').addEventListener('click', () => filterEvents('social'));
            document.getElementById('filter-education').addEventListener('click', () => filterEvents('education'));
            document.getElementById('filter-free').addEventListener('click', () => filterEvents('free'));
            document.getElementById('filter-paid').addEventListener('click', () => filterEvents('paid'));

            // Function to update slider position
            function updateSlider() {
                const eventItems = document.querySelectorAll('.event-item');
                const itemWidth = eventItems[0].offsetWidth; // Width
                const newPosition = -currentIndex * itemWidth;
                document.getElementById('event-list').style.transform = `translateX(${newPosition}px)`;
            }

            // Function to handle next slide
            function nextSlide() {
                if (currentIndex < filteredEvents.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0; // Go back to the first event
                }
                updateSlider();
                updateSliderDots();
            }

            // Function to handle previous slide
            function prevSlide() {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = filteredEvents.length - 1; // Go to the last event
                }
                updateSlider();
                updateSliderDots();
            }

            // Initialize event listeners for next and previous buttons
            document.getElementById('nextBtn').addEventListener('click', nextSlide);
            document.getElementById('prevBtn').addEventListener('click', prevSlide);

            // Function to update slider pagination dots
            function updateSliderDots() {
                const dotsContainer = document.getElementById('slider-dots');
                dotsContainer.innerHTML = '';
                filteredEvents.forEach((event, index) => {
                    const dot = document.createElement('span');
                    dot.classList.add('slider-dot');
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateSlider();
                        updateSliderDots();
                    });
                    dotsContainer.appendChild(dot);
                });
            }

            // Initially display all events
            renderEvents(events);
        })
        .catch(error => console.error('Error fetching events:', error));
});

        document.addEventListener("DOMContentLoaded", function () {
    // Get the user name from the response object of the login post request
    const queryStringParams = new URLSearchParams(window.location.search);
    const userName = queryStringParams.get('name');

    
    // Check if userName is null or undefined
    if (userName) {
        // Update the user-name span's text with the user's name
        document.getElementById('user-name').textContent = userName;
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(registerForm);

        fetch('/register', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Registration successful
                console.log('Registration successful');
                // Optionally, display a success message to the user
            } else {
                // Registration failed
                console.error('Registration failed:', response.statusText);
                // Optionally, display an error message to the user
            }
        })
        .catch(error => {
            console.error('Error submitting registration:', error);
            // Optionally, display an error message to the user
        });
    });
});

/*

        --responsive logic 
*/
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarRight = document.querySelector('.navbar-right');
const closeButton = document.querySelector('.navbar-right .close-button');

navbarToggle.addEventListener('click', () => {
    navbarRight.classList.add('active');
});

closeButton.addEventListener('click', () => {
    navbarRight.classList.remove('active');
});
document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            // Close other open answers
            document.querySelectorAll('.faq-answer').forEach(answer => {
                if (answer.previousElementSibling !== question) {
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0 15px';
                    answer.previousElementSibling.classList.remove('active');
                }
            });
            
            const answer = question.nextElementSibling;

            if (answer.style.maxHeight === '200px') {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 15px';
                question.classList.remove('active');
            } else {
                answer.style.maxHeight = '200px'; // Adjust as needed
                answer.style.padding = '15px';
                question.classList.add('active');
            }
        });
    });
});
