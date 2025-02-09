// 1. ATM Withdrawal System


function atmWithdrawal(balance, amount, pin, enteredPin) {
    if (enteredPin !== pin) return "Incorrect PIN";
    if (amount > balance) return "Insufficient Funds";
    if (amount % 100 !== 0) return "Enter amount in multiples of 100";
    return `Withdrawal successful. Remaining balance: ${balance - amount}`;
}


// 2. Online Shopping Discount & Free Shipping

function calculateFinalAmount(orderAmount) {
    let discount = 0;
    if (orderAmount > 1000) discount = 0.2;
    else if (orderAmount >= 500) discount = 0.1;

    let finalAmount = orderAmount - (orderAmount * discount);

    if (finalAmount > 50) return `Final amount: $${finalAmount} (Free Shipping)`;
    else return `Final amount: $${finalAmount + 10} (Express Shipping)`;
}

// 3. Student Grading System with Extra Credit


function calculateGrade(marks, attendance) {
    if (attendance > 90) marks += 5;

    if (marks >= 90) return "A";
    else if (marks >= 80) return "B";
    else if (marks >= 70) return "C";
    else if (marks >= 60) return "D";
    else return "F";
}

// 4. Smart Traffic Light System


function trafficLightControl(density) {
    if (density === "Heavy Traffic") return 60;
    else if (density === "Moderate Traffic") return 40;
    else if (density === "Light Traffic") return 20;
    else return "Invalid traffic density";
}

// 5. Movie Ticket Pricing with Time and Age Discount


function calculateTicketPrice(age, showTime) {
    let price = 12;
    if (showTime < 17) price *= 0.8;
    if (age > 60) price *= 0.7;
    else if (age < 12) price *= 0.6;
    return `Ticket price: $${price.toFixed(2)}`;
}

// 6. Job Application Filter


function isEligibleForJob(age, experience, qualification) {
    return age >= 21 && age <= 55 && experience >= 2 && qualification === "Bachelor's Degree";
}

// 7. E-commerce Coupon Redemption


function applyCoupon(orderAmount, couponCode) {
    if (couponCode === "DISCOUNT10" && orderAmount > 500) {
        return `Final price: $${orderAmount * 0.9}`;
    } else if (couponCode === "FREESHIP" && orderAmount > 200) {
        return `Final price: $${orderAmount} (Free Shipping)`;
    } else {
        return `Final price: $${orderAmount}`;
    }
}

// 8. Fitness Membership Plan


function choosePlan(planType, wantsTrainer, wantsDietPlan) {
    if (wantsDietPlan && wantsTrainer) return "VIP Plan ($80/month)";
    else if (wantsTrainer) return "Premium Plan ($50/month)";
    else return "Basic Plan ($20/month)";
}

// 9. Electricity Bill Calculation with Peak Hours


function calculateElectricityBill(units, timeOfDay) {
    let rate = 0;
    if (units < 100) rate = 5;
    else if (units <= 300) rate = 4;
    else rate = 3;

    let total = units * rate;
    if (timeOfDay === "Peak hours") total *= 1.1;

    return `Total bill: $${total.toFixed(2)}`;
}

// 10. Flight Ticket Booking System

function calculateFlightFare(classType, luggageWeight, isStudent, isSenior) {
    let fare = 300;
    if (classType === "Business") fare += 200;
    else if (classType === "First") fare += 500;

    if (luggageWeight > 20) {
        const extraWeight = Math.ceil((luggageWeight - 20) / 10);
        fare += extraWeight * 50;
    }

    if (isStudent) fare *= 0.85;
    else if (isSenior) fare *= 0.9;

    return `Final fare: $${fare.toFixed(2)}`;
}