// // const cards = document.querySelectorAll('.scrolling-container .event-card');
// // const container = document.querySelector('.scrolling-container');
// // const totalCards = cards.length;
// // let currentIndex = 0;

// // // Function to rotate events
// // function rotateEvents() {
// //     currentIndex = (currentIndex + 1) % totalCards;

// //     const newCards = [...Array(3).keys()].map(i => (currentIndex + i) % totalCards);
// //     const newHTML = newCards.map(i => cards[i].outerHTML).join('');

// //     container.innerHTML = newHTML;
// // }

// // // Start the rotation
// // setInterval(rotateEvents, 3000); // Rotate every 3 seconds

// let currentSlideIndex = 0;

// function showSlides() {
//     const slides = document.querySelectorAll('.scrolling-container');
//     const dots = document.querySelectorAll('.dot');

//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.transform = `translateX(-${currentSlideIndex * 100}%)`;
//     }

//     dots.forEach((dot, index) => {
//         dot.classList.remove('active');
//         if (index === currentSlideIndex) {
//             dot.classList.add('active');
//         }
//     });
// }

// function currentSlide(n) {
//     currentSlideIndex = n - 1;
//     showSlides();
// }

// // Initialize the first slide
// showSlides();


//Scroll our team to meet our team
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


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
                        <div class="event-card-container">
                            <div class="event-image">
                                <img src="${event.image}" alt="${event.name}" />
                            </div>
                            <div class="event-details">
                                <h3>${event.name}</h3>
                                <p><strong>Date:</strong> ${event.start_date}</p>
                                <p><strong>Location:</strong> ${event.location}</p>
                                <p><strong>Description:</strong> ${event.description}</p>
                                <button type="submit" class="register-button">Register Now</button>
                            </div>
                        </div>
                    `;
                    eventList.appendChild(eventDiv);
                });

                const registerButtons = document.querySelectorAll('.register-button');
                registerButtons.forEach(button => {
                    button.addEventListener('click', function () {
                        window.location.href = '/signup'; // Redirect to signup form page
                    });
                });
            }

            renderEvents(events);

            // Attach event listeners to filter buttons
            document.getElementById('filter-all').addEventListener('click', () => filterEvents('all'));
            document.getElementById('filter-seminar').addEventListener('click', () => filterEvents('seminar'));
            document.getElementById('filter-social').addEventListener('click', () => filterEvents('social'));
            document.getElementById('filter-education').addEventListener('click', () => filterEvents('education'));
            document.getElementById('filter-free').addEventListener('click', () => filterEvents('free'));
            document.getElementById('filter-paid').addEventListener('click', () => filterEvents('paid'));

            // Initialize event listeners for next and previous buttons
            document.getElementById('nextBtn').addEventListener('click', nextSlide);
            document.getElementById('prevBtn').addEventListener('click', prevSlide);

            // Initially display all events
            renderEvents(events);
        })
        .catch(error => console.error('Error fetching events:', error));
});

// Toggle Navbar for mobile
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarRight = document.querySelector('.navbar-right');
const closeButton = document.querySelector('.close-button');

navbarToggle.addEventListener('click', () => {
    navbarRight.classList.toggle('active');
});

closeButton.addEventListener('click', () => {
    navbarRight.classList.remove('active');
});

// FAQ Section Toggle
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
    });
});

