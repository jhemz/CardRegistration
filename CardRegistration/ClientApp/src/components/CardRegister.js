import React, { Component } from 'react';

export class CardRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '', cardHoldersName: '', expiryDate: '', addressLine1: '', town: '', postcode: '', formattedCardNumber: '', isSuccessful: false
        };
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
        this.handleCardHoldersNameChange = this.handleCardHoldersNameChange.bind(this);
        this.handleExpiryDateChange = this.handleExpiryDateChange.bind(this);
        this.handleAddressLine1Change = this.handleAddressLine1Change.bind(this);
        this.handleTownChange = this.handleTownChange.bind(this);
        this.handlePostcodeChange = this.handlePostcodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCardNumberChange(e) {
        //only accept numbers
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ cardNumber: e.target.value });
        }
    }

    handleCardHoldersNameChange(e) {
        this.setState({ cardHoldersName: e.target.value });
    }

    handleExpiryDateChange(e) {
        this.setState({ expiryDate: e.target.value });
    }

    handleAddressLine1Change(e) {
        this.setState({ addressLine1: e.target.value });
    }

    handleTownChange(e) {
        this.setState({ town: e.target.value });
    }

    handlePostcodeChange(e) {
        this.setState({ postcode: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const cardNumber = this.state.cardNumber.trim();
      
        if (cardNumber.length !== 16) {
            alert('Card number must be 16 digits long');
            return;
        }
        const cardHoldersName = this.state.cardHoldersName.trim();
    
        const expiryDate = this.state.expiryDate.trim();
      
        var expiryDateParts = expiryDate.split("/");
        if (expiryDateParts.length === 2) {
            if (expiryDateParts[0].length === 2 && expiryDateParts[1].length === 2) {



                if (isNaN(expiryDateParts[0]) || isNaN(expiryDateParts[1])) {
                    alert('Invalid expiry date, values are not dates');
                    return;
                }
                if (parseInt(expiryDateParts[0]) > 12) {
                    alert('Invalid expiry date');
                    return;
                }
            }
            else {
                alert('Invalid expiry date, must be format MM/YY');
                return;
            }

        }
        else {
            alert('Invalid expiry date, must be format MM/YY');
            return;
        }

        const addressLine1 = this.state.addressLine1.trim();
       
        const town = this.state.town.trim();

        const postcode = this.state.postcode.trim();
       
        const data = new FormData();
        data.append('cardNumber', cardNumber);
        data.append('cardHoldersName', cardHoldersName);
        data.append('expiryDate', expiryDate);
        data.append('addressLine1', addressLine1);
        data.append('town', town);
        data.append('postcode', postcode);


        const xhr = new XMLHttpRequest();
        xhr.open('post', 'api/cardregistration/RegisterCard', true);
        xhr.send(data);





        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {

                alert(xhr.responseText);

                if (xhr.responseText === 'Success!') {
                    this.setState({ isSuccessful: true });

                    fetch('api/cardregistration/GetSummary')
                        .then(response => response.json())
                        .then(data => {
                            this.setState({ formattedCardNumber: data.CardNumber });
                            this.setState({ cardNumber: '' });
                        });
                }

            }
        }.bind(this)
    }

  


    render() {

        const { cardNumber, cardHoldersName, expiryDate, addressLine1, postcode } = this.state;
        const isEnabled = cardNumber.length > 0 && cardHoldersName.length > 0 && expiryDate.length > 0 && addressLine1.length > 0 && postcode.length > 0;

        const verticalStack = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
        }

        

        let view;

        

        if (this.state.isSuccessful === true) {
            view =
              
                <div >
                <label style={verticalStack}>
                     {this.state.formattedCardNumber}
                </label>
                <label style={verticalStack}>
                    {this.state.cardHoldersName}
                </label>
                <label style={verticalStack}>
                    {this.state.expiryDate}
                </label>
                <label style={verticalStack}>
                    {this.state.addressLine1}
                </label>
                <label style={verticalStack}>
                    {this.state.town}
                </label>
                <label style={verticalStack}>
                    {this.state.postcode}
                </label>
                </div>
            
        }
        else {
            view = <form className="cardForm" onSubmit={this.handleSubmit}>
                <input
                    style={verticalStack}
                    type="text"
                    placeholder="Card Number"
                    value={this.state.cardNumber}
                    onChange={this.handleCardNumberChange}
                />
                <input
                    style={verticalStack}
                    type="text"
                    placeholder="Card holders name"
                    value={this.state.cardHoldersName}
                    onChange={this.handleCardHoldersNameChange}
                />
                <input
                    style={verticalStack}
                    type="text"
                    placeholder="Expiry date"
                    value={this.state.expiryDate}
                    onChange={this.handleExpiryDateChange}
                />
                <input
                    style={verticalStack}
                    type="text"
                    placeholder="Address line 1"
                    value={this.state.addressLine1}
                    onChange={this.handleAddressLine1Change}
                />
                <input
                    style={verticalStack}
                    type="text"
                    placeholder="Town"
                    value={this.state.town}
                    onChange={this.handleTownChange}
                />
                <input
                    style={verticalStack}
                    type="text"
                    placeholder="Postcode"
                    value={this.state.postcode}
                    onChange={this.handlePostcodeChange}
                />

                <input type="submit" value="Submit" disabled={!isEnabled} />
            </form>
        }



        return (
            <div>

                {view}
              
            </div>
        );
    }
}
