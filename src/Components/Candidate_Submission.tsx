import React, { useRef, useState } from 'react';
import "../assets/candidate.css"
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const Candidate_Submission = () => {
    const toast = useRef<Toast>(null);
    const [error, setError] = useState<string | null>(null);

    const [value, setValue] = useState({
        category: "",
        link1: "",
        link2: "",
        link3: ""

    });
    var navigate = useNavigate();

    const handleChange = (e: any) => {
        setValue({ ...value, [e.target.name]: e.target.value });

    };
    /// prime toast
    const showSuccess = () => {
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Your account has been registered', life: 2000 });
    }
    const showWarning = () => {
        toast.current?.show({ severity: 'error', summary: 'Warning', detail: 'Email already exists', life: 2000 });
    }


const submit_form = (e: any) => {
    e.preventDefault();
    setError(null);
    axios.post('http://localhost:5001/submission_candidate', value)
        .then(res => {
            console.log(res.data,"here is the response");
            if (res.data.message === "success") {
                showSuccess();  // Show a success messag
            }
        })
        .catch(err => {
            if (err.response && err.response.status === 409) {
                // Email already exists
                showWarning();  // Show a warning message
            } else {
                console.error(err);
            }
        });
};

return (
    <>
        <Toast ref={toast} />
        <div className='candidate'>
        <div className="form_wrapper">
            <div className="form_container">
                <div className="row clearfix">
                        <form id="inquiryForm" onSubmit={submit_form}>
                            <div className="input_field select_option">
                            <select name="category" required onChange={e => setValue({...value, category:e.target.value})}>
                                <option value="" disabled selected>Choose category</option>
                                <option value="student" >Student</option>
                                <option value="professional" >Professional</option>
                                <option value="Email Marketing">Experience</option>
                            </select>
                            <div className="select_arrow"></div>
                        </div>

                            <div className="input_field">
                                <input type="text" name="link1" placeholder="Link 1" onChange={e => setValue({...value, link1:e.target.value})} />
                            </div>

                            <div className="input_field">
                                <input type="text" name="link2" placeholder="Link 2" onChange={e => setValue({...value, link2:e.target.value})} />
                            </div>
                            <div className="input_field">
                                <input type="text" name="link3" placeholder="Link 3" onChange={e => setValue({...value, link3:e.target.value})} />
                            </div>
                           

                            <div className="input_field select_option text-center">
                                <button type="submit" className="btn btn-sm bg-warning text-light w-50">Sign-up</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
        </div>
    </>
);
}

export default Candidate_Submission
