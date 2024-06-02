document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('payment-form').addEventListener('submit', handlePayment);
});

function handlePayment(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    const name = document.getElementById('name').value;

    if (cardNumber && expiryDate && cvv && name) {
        if (confirm("Confirm payment")) {
            // Show payment successful message
            alert("Payment completed successfully");

            // Redirect to the home page after a short delay
            setTimeout(() => {
                window.location.href = "feedback.html"; // Change to your home page file
            }, 3000); // Redirect after 3 seconds to give time to read the message
        } else {
            // Show transaction failed message
            alert("Transaction failed");
        }
    }
}
