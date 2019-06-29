import React from "react";
import * as emailjs from "emailjs-com";
import styled from "styled-components";
import logo from "./logo.png";

const Wrap = styled.div`
  margin: 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
  align-items center;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.9); 
  padding-bottom: 30px;
`;

const Input = styled.input`
  appearance: none;
  border: 1px solid rgb(247, 88, 0);
  text-align: center;
  outline: none;
  border-radius: 4px;
  margin-bottom: 10px;
  ::placeholder {
    color: rgba(10, 10, 10, 0.5);
  }
  padding: 5px 0;
`;

const Title = styled.h1`
  font-size: 14px;
  text-align: center;
  margin: 20px auto;
  margin-bottom: 10px;
  padding: 0 10px;
`;
const Title2 = styled.h1`
  font-size: 14px;
  text-align: center;
  margin: 30px auto;
  margin-top: 0;
  padding: 0 10px;
`;

const Logo = styled.img`
  margin: 30px;
  width: 80%;
  height: 80%;
`;

const AnswerButton = styled.button`
  border: none;
  border-radius: 4px;
  background-color: rgb(247, 88, 0);
  outline: none;
  color: white;
  padding: 7px;
  cursor: pointer;
  &:hover {
    background-color: rgb(247, 88, 0);
  }
  width: 30%;
  border: 1px solid black;
  margin: 15px 0;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
   align-items center;
`;

class Results extends React.Component {
  state = { name: "", phone: "", email: "", isClicked: false };
  send = () => {
    const { answers } = this.props;
    const { phone, name, email } = this.state;

    emailjs
      .send(
        "mailgun",
        "testresult",
        {
          name,
          q0: answers[0],
          q1: answers[1],
          q2: answers[2],
          phone,
          email,
          receiverEmail: "liberty.english22@gmail.com"
        },
        "user_6LtPFoMfL999diSBVXixV"
      )
      .then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function(err) {
          console.log("FAILED...", err);
        }
      );
    this.setState({ isClicked: true });
  };

  handlePhoneChange = e => {
    this.setState({ phone: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <Wrap>
        <Logo src={logo} />
        {!this.state.isClicked && (
          <Div>
            <Title>Спасибо за Ваши ответы.</Title>
            <Title2>
              Пожалуйста, оставьте e-mail или номер телефона, и мы свяжемся с
              Вами!
            </Title2>
            <Input placeholder="Имя" onChange={this.handleNameChange} />
            <Input placeholder="Email" onChange={this.handleEmailChange} />
            <Input placeholder="Телефон" onChange={this.handlePhoneChange} />
            <AnswerButton onClick={this.send}>Отправить</AnswerButton>
          </Div>
        )}
        {this.state.isClicked && (
          <Title>
            Спасибо. Наш специалист свяжется с Вами в ближайшее время.
          </Title>
        )}
      </Wrap>
    );
  }
}

export default Results;
