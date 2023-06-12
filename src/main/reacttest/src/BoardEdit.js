import React, { Component, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

class BoardEdit extends Component {

  emptyItem = {
    id: '',
    title: '',
    content: '',
    writer: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const id = this.props.params.id; 
    if (id !== 'new') {
      const board = await (await fetch(`/board/${id}`)).json();
      this.setState({item: board});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    const id = this.props.params.id; 
    await fetch('/board/', {
      method: (id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    this.props.navigate('/boards');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? '게시글 수정' : '게시글 추가'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="writer">writer</Label>
              <Input type="text" name="writer" id="writer" value={item.writer || ''}
                     onChange={this.handleChange} autoComplete="writer"/>
            </FormGroup>
          </div>
            <Label for="title">title</Label>
            <Input type="text" name="title" id="title" value={item.title || ''}
                   onChange={this.handleChange} autoComplete="title"/>
          </FormGroup>
          <FormGroup>
            <Label for="content">content</Label>
            <Input type="text" name="content" id="content" value={item.content || ''}
                   onChange={this.handleChange} autoComplete="content"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/boards">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withNavigation(withParams(BoardEdit));