import React, {Component} from 'react';
import {Col, Form, FormGroup, Input} from 'reactstrap';
import {Button, Card, Container, Row} from 'react-bootstrap';
import http from '../../utils/HttpTemplate';
import {NavLink} from 'react-router-dom';
import {login} from "../../actions/Actions";
import connect from 'react-redux/es/connect/connect';
import JSEncrypt from 'jsencrypt';

class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginId: '',
      password: ''
    }
  }

  componentDidMount() {
    http.get('/auth/key').then((res) => {
      this.setState({
        'rsaPublicKey': res.data
      })
    });
  }

  handleLogin = () => {
    const rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(this.state.rsaPublicKey);
    http.post('/auth/login', {
      loginId: this.state.loginId,
      password: rsaEncrypt.encrypt(this.state.password)
    }).then(res => {
      if (res.data === true) {
        this.props.loginDispatch();
        this.props.history.push('/main');
      } else {
        alert('login fail');
      }
    }).catch(error => {
      console.log('error');
    });
  };

  changeInputId = (event) => {
    this.setState({
      loginId: event.target.value
    })
  };

  changeInputPassword = (event) => {
    this.setState({
      password: event.target.value
    })
  };

  render() {
    const style = {
      'overflow': 'hidden',
      'marginTop': '50px'
    };

    return (
      <Container style={style}>
        <Row className="justify-content-center">
          <Card style={{width: '350px'}}>
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <Form>
                <FormGroup row>
                  <Col>
                    <Input placeholder={'id'} type="text"
                           onChange={this.changeInputId}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Input placeholder={'password'} type="password"
                           onChange={this.changeInputPassword}/>
                  </Col>
                </FormGroup>
              </Form>
              <Button style={{width: '100%'}}
                      onClick={this.handleLogin}>Login</Button>
            </Card.Body>
            <Col>
              <div className="footer">
                <div className="card-content">
                  <div className="right">
                    <NavLink to="/register">Create an account</NavLink>
                  </div>
                </div>
              </div>
            </Col>
          </Card>
        </Row>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: () => (dispatch(login(true)))
});

LoginView = connect(null, mapDispatchToProps)(LoginView);

export default LoginView;


