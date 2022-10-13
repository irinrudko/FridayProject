import React from 'react';
import SuperInputText from "../assets/SuperInputText/SuperInputText";
import SuperCheckbox from "../assets/SuperCheckbox/SuperCheckbox";
import SuperButton from "../assets/SuperButton/SuperButton";
import SuperSelect from "../assets/SuperSelect/SuperSelect";
import SuperEditableSpan from "../assets/SuperEditableSpan/SuperEditableSpan";
import s from "./TestSuper.module.css"

const TestSuper = () => {
    return (
        <div className={s.testContainer}>
            <div className={s.container}>
                <SuperInputText/>
            </div>
            <div className={s.container}>
                <SuperCheckbox/>
            </div>
            <div className={s.container}>
                <SuperButton>button</SuperButton>
            </div>
            <div className={s.container}>
                <SuperSelect options={["A", "B", "C"]}/>
            </div>
            <div className={s.container}>
                <SuperEditableSpan value={"SuperEditableSpan"}/>
            </div>
        </div>
    );
};

export default TestSuper;