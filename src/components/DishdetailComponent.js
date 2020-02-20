import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
	Modal, ModalBody, ModalHeader, Button, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit(values) {
		this.toggleModal()
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
	}
	
	render() {
		return(
			<div>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil" /> Submit Comment
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="rating" md={2}>Rating</Label>
								<Col md={12}>
									<Control.select model=".rating" id="rating" name="rating"
										className="form-control" validators={{required}}>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
									<Errors 
										className="text-danger"
										model=".rating"
										show="touched"
										messages={{
											required: 'Required'
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
                                <Label htmlFor="yourname" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
							<Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6" 
                                        className="form-control" />
                                </Col>
                            </Row>
							<Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

	function RenderDish({dish}) {
		return(
			<Card>
				<CardImg width="100%" src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	}

    function RenderComments({comments}) {
		var commentList = comments.map(comment => {
			return (
				<li key={comment.id} >
				   {comment.comment}
				   <br /><br />
				   -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
				   <br /><br />
			   </li>
		   );
	   });
	   return (
		   <div>
			   <h4>Comments</h4>
			   <ul className="list-unstyled">
				   {commentList}
			   </ul>
		   </div>
		);
	}

	const DishDetail = (props) => {
		if (props.dish) {
			return (
				<div className="container">
					<div className="row">
						<Breadcrumb>
							<BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
							<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
						</Breadcrumb>
						<div className="col-12">
							<h3>{props.dish.name}</h3>
							<hr />
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-5 m-1">
							<RenderDish dish={props.dish} />
						</div>
						<div className="col-12 col-md-5 m5">
							<RenderComments comments={props.comments} />
							<CommentForm />
						</div>
					</div>
				</div>
			)
		}
		else {
			return (
				<div></div>
			);
		}
	}


export default DishDetail;