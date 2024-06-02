document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const stars = document.getElementById('stars').value;
    const deliveryFeedback = document.getElementById('deliveryFeedback').value;
    const pickupPersonFeedback = document.getElementById('pickupPersonFeedback').value;
    const overallFeedback = document.getElementById('overallFeedback').value;
    const comments = document.getElementById('comments').value;

    const feedback = {
        stars,
        deliveryFeedback,
        pickupPersonFeedback,
        overallFeedback,
        comments
    };

    try {
        const response = await fetch('http://localhost:5000/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        });

        if (response.ok) {
            document.getElementById('responseMessage').textContent = 'Feedback submitted successfully!';
            document.getElementById('feedbackForm').reset();
        } else {
            document.getElementById('responseMessage').textContent = 'Error submitting feedback!';
        }
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'There was an error submitting the feedback!';
    }
});
