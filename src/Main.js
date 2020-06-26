import React from 'react';
import Form from './Form';
import DiaryData from "./DiaryData";


class Main extends React.Component {
    render() {
        return (
            <div className='main'>
                <div className='diaryData'>
                    <DiaryData />
                </div>
                <div className='form'>
                    <Form />
                </div>
            </div>
        );
    }
}

export default Main;
