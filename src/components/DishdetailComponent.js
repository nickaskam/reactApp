import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

	renderDish(dish) {
		if (dish != null) {
			return(
				<div className = "row">
					<div className="col-12 col-md-5 m1">
						<Card>
							<CardImg width="100%" src={dish.image} alt={dish.name} />
							<CardBody>
								<CardTitle>{dish.name}</CardTitle>
								<CardText>{dish.description}</CardText>
							</CardBody>
						</Card>
					</div>
					<div className="col-12 col-md-5 m1">
						<h4>Comments</h4>
						<ul className="list-unstyled">
							{this.renderComments(dish.comments)}
						</ul>
					</div>
				</div>
			);
		}
		else {
			return (
				<div></div>
			);
		}
	}

	renderComments(comments) {
		if (comments != null) {
			
			const comms = comments.map(comm => {
				return(
					<div>
						<li>{comm.comment}</li>
						<li>- {comm.author}, {comm.date}</li>
					</div>
				);
			})

			return(
				<ul className="list-unstyled">
					{comms}
				</ul>
			)			
		}
		else {
			return (
				<div></div>
			)
		}
	}

	render() {
		return (
			<div>
				{this.renderDish(this.props.selectedDish)}
			</div>
		)
	}
}

export default Dishdetail;
