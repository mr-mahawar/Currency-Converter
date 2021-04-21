import React from "react";
import axios from "axios";

class App extends React.Component {
	state = {
		baseCurrency: 'INR',
		targetCurreny: 'USD',
		amount: 1,
		result: '...',
		time: '...'
	};


	resultText = React.createRef();
	
	getResponse = async () => {
		const response = await axios.get(`https://v6.exchangerate-api.com/v6/b9657f791de02f5aa322beec/pair/${this.state.baseCurrency}/${this.state.targetCurreny}/${this.state.amount}`);

		this.setState({ result: response.data.conversion_result });
		this.setState({ time: response.data.time_last_update_utc });
	};
	
	componentDidMount() {
		this.getResponse();
	}


	onFormSubmit(e) {
		e.preventDefault();
		this.getResponse();
	}
	
	amountChange = (e) => {
		this.setState({ amount: e.target.value});
	}
	
	baseCurrencyChange = (e) => {
		this.setState({ baseCurrency: e.target.value });
	}

	targetCurrencyChange = (e) => {
		this.setState({ targetCurreny: e.target.value});
	}

	render () {
		return (
			<div className="ui container" style={{width: '75%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<form className="ui form" onSubmit={(e) => this.onFormSubmit(e)}>
					<h1 className="ui dividing header" style={{fontSize: '50px', textAlign: 'center'}}>
						{`${this.state.amount} ${this.state.baseCurrency} equals ${this.state.result} ${this.state.targetCurreny}`}
					</h1>
					<div style={{color: 'grey', fontSize: '13px'}}>
						<i className="clock outline icon" />
						{`Last Updated : ${this.state.time} UTC`}
					</div>
					<div className="two fields">
						<div className="field">
							<label className="label">Enter Amount</label>
							<input
								type="number"
								placeholder="Enter Amount"
								onChange={this.amountChange}
								value={this.state.amount}
								step="any"
								min="0"
							/>
						</div>
						<div className="field">
							<label className="label">From</label>
							<select className="ui dropdown" onChange={this.baseCurrencyChange} defaultValue={this.state.baseCurrency}>
								<option value="INR">Indian Rupee</option>
								<option value="USD">United States Dollar</option>
								<option value="AED">United Arab Emirates Dirham</option>
								<option value="GBP">British Pound Sterling</option>
								<option value="CAD">Canadian Dollar</option>
								<option value="SGD">Singapore Dollar</option>
								<option value="EUR">Euro</option>
								<option value="JPY">Japanese Yen</option>
								<option value="PKR">Pakistani Rupee</option>
								<option value="ZAR">South African Rand</option>
							</select>
						</div>
					</div>
					<div className="two fields">
						<div className="field">
							<label className="label">Converted Amount</label>
							<input
								type="number"
								placeholder="Converted Amount"
								value={this.state.result}
								step="any"
								min="0"
								readOnly
							/>
						</div>
						<div className="field">
							<label className="label">To</label>
							<select className="ui dropdown" onChange={this.targetCurrencyChange} defaultValue={this.state.targetCurreny}>
								<option value="USD">United States Dollar</option>
								<option value="INR">Indian Rupee</option>
								<option value="AED">United Arab Emirates Dirham</option>
								<option value="GBP">British Pound Sterling</option>
								<option value="CAD">Canadian Dollar</option>
								<option value="SGD">Singapore Dollar</option>
								<option value="EUR">Euro</option>
								<option value="JPY">Japanese Yen</option>
								<option value="PKR">Pakistani Rupee</option>
								<option value="ZAR">South African Rand</option>
							</select>
						</div>
					</div>
					<button className="ui button primary" type="submit">Convert</button>
				</form>
			</div>
		);
	}
}

export default App;