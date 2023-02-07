import React, { useState } from 'react';
import Form from './Component/Form';

export interface FormData {
  cartValue: number; 
  distance: number; 
  amount: number; 
  date: Date; 
}

const App: React.FC = () => {
  const [deliveryFee, setDeliveryFee] = useState(0);

  const onSubmit = (data: FormData) => {
    const { cartValue, distance, amount, date } = data;

    if (cartValue >= 100 || cartValue <= 0) {
      setDeliveryFee(0);
      return;
    }

    let surCharge = 0;
    if (cartValue > 0 && cartValue < 10) {
      surCharge = 10 - cartValue;
    }

    //number is rounded to two decimal places using the toPrecision method
    surCharge = Number(parseFloat(surCharge.toString()).toPrecision(2));

    const distanceFee =
      distance > 1000
        ? Math.ceil(distance / 500)
        : distance > 0
        ? 2
        : 0;

    const amountSurCharge = amount < 5 ? 0 : (amount - 4) * 0.5;

    const utcTime = new Date(date);
    let totalDeliveryFee = surCharge + distanceFee + amountSurCharge;

   // Check if the day of delivery is Friday (day 5 in the UTC time system)
if (utcTime.getUTCDay() === 5) {

  // Define the start and end times of rush hour on Friday in minutes
  const rushHourStart = 15 * 60;
  const rushHourEnd = 19 * 60;

  // Convert the selected delivery time to minutes
  const selectedTimeInMinutes = utcTime.getHours() * 60 + utcTime.getMinutes();

  // Check if the selected delivery time falls within rush hour
  if (rushHourStart <= selectedTimeInMinutes && selectedTimeInMinutes <= rushHourEnd) {
    // If so, increase the delivery fee by 10%
    totalDeliveryFee *= 1.1;
  }
}

    setDeliveryFee(totalDeliveryFee > 15 ? 15 : totalDeliveryFee);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-form">
        <h3 className="calculator-title">Delivery Fee Calculator</h3>
        <Form onSubmit={onSubmit} />
        <div className="result-container">
          <h3>Delivery Price: {deliveryFee} €</h3>
        </div>
      </div>
    </div>
  );
};

export default App;
