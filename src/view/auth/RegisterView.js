import React, {Component} from 'react';
import {Col, Form, FormGroup, Input} from 'reactstrap';
import {Button, Card, Container, Row} from 'react-bootstrap';
import http from '../../utils/HttpTemplate';
import JSEncrypt from 'jsencrypt';

class RegisterView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginId: '',
      password: ''
    }
  }

  componentDidMount() {
    http.get('/api/auth/key').then((res) => {
      this.setState({
        'rsaPublicKey': res.data
      })
    });
  }

  handleRegisterUser = () => {
    const rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(this.state.rsaPublicKey);
    http.post('/api/auth/seller-register', {
      loginId: this.state.loginId,
      password: rsaEncrypt.encrypt(this.state.password)
    }).then(res => {
      alert('login 화면으로 이동합니다.');
      this.props.history.push('/login')
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
            <Card.Header>Sign up</Card.Header>
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
                      onClick={this.handleRegisterUser}>create an account</Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    )
  }
}

export default RegisterView;


