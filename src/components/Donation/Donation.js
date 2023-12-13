import React, { useState , useContext, useEffect} from 'react';
import { Link, useNavigate , useLocation} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Donation.css'
import { UserContext } from '../../App'

const Donation = () => {

  const navigate = useNavigate();
  const { state: userState } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState(userState?.username || '');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('')
  const location = useLocation();
  const event = location.state?.event || {};
  const userData = location.state?.user;

  useEffect(() => {
    console.log('User Data:', userState)
  }, [userState]);

  const token = localStorage.getItem("jwt");
console.log("JWT Token:", token);


  const PostDonation = (e) => {
    e.preventDefault();

    console.log('Submitting donation:', { phone, amount , category});

    fetch('/createdonation', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            phone,
            amount,
            category,
            date: new Date(), // You may need to format this according to your server requirements
            eventBy: event._id,
            eventName: event.name
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log('Server response:', data);

        // Check if the data indicates success
        if (data.donation) {
            console.log('Navigating to history');
            navigate('/history');
        } else {
            console.log('Donation was not successful', data);
            // Handle other scenarios if needed
        }
    })
    .catch(err => {
        console.error('Error during fetch:', err);
        // Handle the error
    });
};



  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (selectedCategory) => {
    // Handle category change logic here
    console.log('Selected Category:', selectedCategory);
    setCategory(selectedCategory);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    const username = userState ? userState.username : '';
    console.log('Username:',username);
    console.log('Phone:', phone);
    console.log('Amount:', amount);
    console.log('Donation Category:', category);
  };

  return (
  <div>
    <Navbar/>
    <div className="donation-container">
      <div className="donation-box">
      <div className="title">Donation Information</div>
        <div className="fields">
        <input
          type="text"
          id="firstName"
          placeholder={`Event: ${event.name}`}
          value={firstName} // This is optional, depending on your styling preferences
          readOnly
        />


          <input
            type="text"
            id="username"
            placeholder={`Username: ${userState.username}`}
              value={username || ''}
            readOnly
          />
          <input
            type="text"
            id="email"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="amount">
          <div className="amount-buttons">
            <div className={`button ${amount === 500 ? 'selected' : ''}`} onClick={() => setAmount(500)}>
            ₹500
            </div>
            <div className={`button ${amount === 1000 ? 'selected' : ''}`} onClick={() => setAmount(1000)}>
            ₹1000
            </div>
            <div className={`button ${amount === 10000 ? 'selected' : ''}`} onClick={() => setAmount(10000)}>
            ₹10000
            </div>
          </div>
          <div className="button">
          <input type="text" className="set-amount" placeholder="" value={amount} onChange={handleAmountChange} />
          </div>
        </div>
        <div className="title2">Donation Category</div>
        <div className="title2">Donation Category</div>
      <div className="checkboxes">
        <input
          type="radio"
          id="money"
          name="category"
          className="checkbox"
          checked={category === 'money'}
          onChange={() => handleCategoryChange('money')}
        />
        <label htmlFor="money">Money</label>
        <br />
        <input
          type="radio"
          id="books"
          name="category"
          className="checkbox"
          checked={category === 'books'}
          onChange={() => handleCategoryChange('books')}
        />
        <label htmlFor="books">Books</label>
        <br />
        <input
          type="radio"
          id="food"
          name="category"
          className="checkbox"
          checked={category === 'food'}
          onChange={() => handleCategoryChange('food')}
        />
        <label htmlFor="food">Food</label>
        <br />
        <input
          type="radio"
          id="clothing"
          name="category"
          className="checkbox"
          checked={category === 'clothing'}
          onChange={() => handleCategoryChange('clothing')}
        />
        <label htmlFor="clothing">Clothing</label>
      </div>
        <div className="confirm"></div>
        <div className="confirm"></div>
        
        <div className="donate-button" onClick={PostDonation}>
          <i className="fa fa-credit-card"></i> Donate Now
        </div>
      </div>
    </div>
    </div>
  );
}

export default Donation;
