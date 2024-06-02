document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('schedule-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission behavior

        // Get form values
        const fullName = document.getElementById('full-name').value;
        const contactNumber = document.getElementById('contact-number').value;
        const emailAddress = document.getElementById('email-address').value;
        const address = document.getElementById('address').value;
        const wasteType = document.getElementById('waste-type').value;
        const instructions = document.getElementById('instructions').value;
        const pickupDate = document.getElementById('pickup-date').value;
        const pickupTime = document.getElementById('pickup-time').value;

        if (fullName && contactNumber && emailAddress && address && wasteType && pickupDate && pickupTime) {
            // Calculate the time difference between current time and pickup time
            const currentTime = new Date();
            const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
            const timeDiff = pickupDateTime - currentTime;

            if (timeDiff > 0) {
                // Convert time difference to days and hours
                const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                // Display reminder message
                const reminderMessage = `Trash truck pickup is scheduled in ${daysDiff} days and ${hoursDiff} hours.`;
                document.getElementById('reminder-message').textContent = `Successfully scheduled pickup! ${reminderMessage}`;
                document.getElementById('reminder-message').style.color = 'green';

                // Redirect to the payment page
                setTimeout(() => {
                    window.location.href = 'pay.html';
                }, 2000); // Redirect after 2 seconds to give time to read the message
            } else {
                // Display error message if the pickup time is in the past
                document.getElementById('reminder-message').textContent = 'The selected date and time is in the past. Please choose a future time.';
                document.getElementById('reminder-message').style.color = 'red';
            }
        } else {
            // Display error message if any field is missing
            document.getElementById('reminder-message').textContent = 'Please fill out all required fields.';
            document.getElementById('reminder-message').style.color = 'red';
        }
    });
});
