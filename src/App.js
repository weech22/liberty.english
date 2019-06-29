import React from "react";
import styled from "styled-components";
import questions from "./questions";
import Quiz from "./Quiz";
import Results from "./Results";
import background from "./background.jpg";
import "normalize.css";
import "./index.css";

const Wrap = styled.div`
  margin: 0 auto;
  padding: 20% 10%;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
`;

class App extends React.Component {
  state = {
    currentQuestion: 0,
    answers: []
  };

  handleAnswer = answer => {
    this.setState({ answers: [...this.state.answers, answer] });
    this.setState({ currentQuestion: this.state.currentQuestion + 1 });
  };

  render() {
    const { currentQuestion, answers } = this.state;
    const { handleAnswer } = this;

    return (
      <Wrap>
        {currentQuestion <= 2 && (
          <Quiz question={questions[currentQuestion]} onAnswer={handleAnswer} />
        )}
        {currentQuestion > 2 && <Results answers={answers} />}
      </Wrap>
    );
  }
}

export default App;
