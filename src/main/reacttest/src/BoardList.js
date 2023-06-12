import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class BoardList extends Component {

  constructor(props) {
    super(props);
    this.state = {board: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/boards')
      .then(response => response.json())
      .then(data => this.setState({board: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/boards/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedboards = [...this.state.board].filter(i => i.id !== id);
      this.setState({board: updatedboards});
    });
  }

  render() {
    const {board, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const BoardList = board.map(board => {
      return <tr key={board.id}>
        <td style={{whiteSpace: 'nowrap'}}>{board.id}</td>
        <td>{board.title}</td>
        <td>{board.writer}</td>
        <td>{board.createdDate}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/board/" + board.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(board.id)}>Del</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <h3>게시판</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="15%">번호</th>
              <th width="40%">제목</th>
              <th width="15%">작성자</th>
              <th width="25%">작성 날짜</th>
            </tr>
            </thead>
            <tbody>
            {BoardList}
            </tbody>
            <div className="float-right">
            <Button color="success" tag={Link} to="/board/new">게시글 작성</Button>
          </div>
          </Table>
        </Container>
      </div>
    );
  }
}

export default BoardList; 