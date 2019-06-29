import React from "react";
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
`;

const Options = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Caption = styled.span`
  padding-left: 5px;
`;

const Question = styled.div`
  font-size: 14px;
  margin: 0 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const RadioButton = styled.input`
  appearance: none;
  border: 1px solid black;
  width: 15px;
  height: 15px;
  outline: none;
  cursor: pointer;
  border-radius: 10px
  &:checked {
    background: rgb(247, 88, 0);
  }
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

const Logo = styled.img`
  margin: 30px;
  width: 80%;
  height: 80%;
`;

class Quiz extends React.Component {
  state = {
    selectedOption: null
  };

  handleAnswer = () => {
    const { onAnswer } = this.props;
    const { selectedOption } = this.state;
    if (selectedOption) {
      onAnswer(selectedOption);
      this.setState({ selectedOption: null });
    }
  };

  handleChange = e => {
    this.setState({ selectedOption: e.target.value });
  };

  render() {
    const {
      question: { text, options }
    } = this.props;
    const { selectedOption } = this.state;
    const { handleAnswer, handleChange } = this;

    return (
      <Wrap>
        <Logo src={logo} />
        <Question>{text}</Question>
        <div>
          <Options>
            {options.map(option => (
              <Li key={option}>
                <RadioButton
                  value={option}
                  type="radio"
                  checked={selectedOption === option}
                  onChange={handleChange}
                />
                <Caption>{option}</Caption>
              </Li>
            ))}
          </Options>
        </div>
        <AnswerButton onClick={handleAnswer}>Ответить</AnswerButton>
      </Wrap>
    );
  }
}

export default Quiz;
