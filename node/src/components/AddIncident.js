import JSXComponent from 'metal-jsx';

class AddIncident extends JSXComponent {
	created() {
		this.data = WeDeploy.data('data.' + window.location.host || window.location.hostname);
	}

	render() {
		return (
			<div className="add-incident">
				<form onSubmit={this.handleAddIncident_.bind(this)}>
					<select name="type">
						<option value="candy" selected>Candy</option>
						<option value="snack">Snack</option>
						<option value="snack">Video Games</option>
						<option value="tv">TV</option>
					</select>

					<select name="answer">
						<option value="yes">Yes</option>
						<option value="no" selected>No</option>
					</select>

					<button type="submit">Add</button>
				</form>
			</div>
		);
	}

	addIncident_(data) {
		const {kid} = this.props;

		data.kidId = kid.id;

		this.data
			.create('incidents', data)
			.then(this.afterAddIncident_.bind(this));
	}

	afterAddIncident_(incident) {
		console.log(incident);
	}

	handleAddIncident_(event) {
		event.preventDefault();

		const {elements} = event.target;

		this.addIncident_({
			answer: elements.answer.value,
			time: Date.now(),
			type: elements.type.value
		});
	}
}

AddIncident.PROPS = {
	kid: {
		value: null
	}
};

export default AddIncident;