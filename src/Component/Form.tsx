import { useState }from 'react';
import { useForm } from "react-hook-form";
import { FormData } from '../App';

interface Props {
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<FormData>();
  
  const [value, setValue] = useState('');

  // Handle changes in the input value
  const handleChange = (event:any) => {
    let newValue = event.target.value;
    
    // Use a regular expression to test if the input is a valid float number
    if (/^-?\d*\.?\d*$/.test(newValue)) {
     
      // Update the component state with the formatted input value
      setValue(newValue);
    }
  };

  return ( 
        <form className="form-container" onSubmit={handleSubmit(data => onSubmit(data))}>
          <div className="form-group">
            <label className="form-label" htmlFor="cartValue">Cart Value</label>
            <input
              {...register("cartValue")}
              className="form-input"
              type="text"
              value={value}
              onChange={handleChange}
              required
              placeholder="€"
              id="cartValue"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="distance">Delivery Distance</label>
            <input
              {...register("distance")}
              className="form-input"
              type="number"
              pattern="[0-9]*"
              required
              placeholder="m"
              id="distance"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="amount">Amount of Items</label>
            <input
              {...register("amount")}
              className="form-input"
              type="number"
              required
              placeholder="0"
              id="amount"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="date">Time</label>
            <input
              {...register("date")}
              className="form-input"
              type="datetime-local"
              required
              id="date"
            />
          </div>
          <button type="submit" className="calculate-button">Calculate Delivery Price</button>
        </form>
  );
}

export default Form;