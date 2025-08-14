document.querySelectorAll(".select-btn").forEach(button => {
  button.addEventListener("click", () => {
    const selectedPlan = button.getAttribute("data-plan");

    const planDetails = {
      "Monthly": { amount: 900, description: "Monthly Plan - ₹9" },
      "3 month": { amount: 1900, description: "3 Month Plan - ₹19" },
      "6 month": { amount: 2900, description: "6 Month Plan - ₹29" },
      "yearly": { amount: 4900, description: "12 Month Plan - ₹49" }
    };

    const { amount, description } = planDetails[selectedPlan];

    const options = {
      key: "rzp_test_w4QKjAXDijkAjk", // Replace with your Razorpay key_id from dashboard
      amount: amount, // in paise
      currency: "INR",
      name: "HabitVerse",
      description: description,
      image: "https://yourwebsite.com/logo.png", // optional
      handler: function (response) {
        // Redirect to thank you page
        window.location.href = "thank.html";
      },
      modal: {
        ondismiss: function () {
          // Redirect to failed page if user closes payment
          window.location.href = "payment- failed.html";
        }
      },
      prefill: {
        name: "", // Optional prefill
        email: "",
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });
});
