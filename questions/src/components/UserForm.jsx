import React, { useState } from 'react';
import { Form, Radio, Button, Card, message, Layout } from 'antd';
import './UserForm.css'; // Import custom styles

const { Header, Content } = Layout;

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctAnswer: "100°C",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    correctAnswer: "Au",
  },
];

const UserForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);

  const onFinish = (values) => {
    setLoading(true);
    let score = 0;
    questions.forEach((question, index) => {
      if (values[`question${index}`] === question.correctAnswer) {
        score++;
      }
    });
    setScore(score);
    setLoading(false);
    message.success(`You scored ${score} out of ${questions.length}`);
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <h1 className="header-title">Pinot Demo Quiz</h1>
      </Header>
      <Content className="content">
        <Card className="userform-card">
          <Form form={form} onFinish={onFinish}>
            {questions.map((question, index) => (
              <Card key={index} className="question-card">
                <Form.Item
                  name={`question${index}`}
                  label={question.question}
                  className="question-item"
                  rules={[{ required: true, message: 'Please select an answer!' }]}
                >
                  <div className="options-container">
                    <Radio.Group className="options-group">
                      {question.options.map((option, idx) => (
                        <Radio key={idx} value={option} className="option">
                          {` ${option}`}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </Form.Item>
              </Card>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Submit
              </Button>
            </Form.Item>
          </Form>
          {score !== null && (
            <>
            <div className="result">
              <h3>Your Score: {score} / {questions.length}</h3>
            </div>
            <div className="result-smiley">
              {score > 3 ? (
                <div className="happy-smiley">😊 </div>
              ) : (
                <div className="sad-smiley">😢</div>
              )}
            </div>
            </>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default UserForm;