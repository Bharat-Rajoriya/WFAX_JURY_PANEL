import React, { useEffect, useState } from 'react'
import '../assets/Admin_panel.css'
import axios from 'axios';

const Admin_panel = () => {

    const [allcandidates, setAllcandidates] = useState([]);
    const [perseleted, setPreselected] = useState([]);
    const [activeTable, setActiveTable] = useState<string | null>(null);
    const [eastZoneSelectedData, setEastZoneSelectedData] = useState([]);
    const [westZoneSelectedData , setWestZoneSelectedData] = useState([]);
    const [northZoneSelectedData, setNorthZoneSelectedData] = useState([]);
    const [southZoneSelectedData, setSouthZoneSelectedData] = useState([]);
    // all candidate submission data
    const allcandidate = () => {
        setActiveTable('allcandidate');
        axios.get('http://localhost:5001/all_candidate_data')
            .then((res) => {
                console.log(res.data);
                setAllcandidates(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // all preselected candidate data
    const Preselectedcandidate = () => {
        setActiveTable('preselectedcandidate');
        axios.get('http://localhost:5001/all_preselected_candidate_data')
            .then((res) => {
                console.log(res.data);
                setPreselected(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
// East Zone Selected Candidate Data
    const estzoneSelectedcandidate = () => {
        setActiveTable('estzoneSelectedcandidate');
        axios.get('http://localhost:5001/all_est_zone_candidate_data')
        .then((res) => {
            console.log(res.data);
            setEastZoneSelectedData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    // West Selected Candidate Data 
    const WestSelectdCandidate = ()=>{
        setActiveTable('westselectedcandidate');
        axios.get('http://localhost:5001/all_west_zone_candidate_data')
        .then((res) => {
            console.log(res.data);
            setWestZoneSelectedData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    // North Selected Candidate Data
    const NorthSelectedCandidate = ()=>{
        setActiveTable('northselectedcandidate');
        axios.get('http://localhost:5001/all_north_zone_candidate_data')
        .then((res) => {
            console.log(res.data);
            setNorthZoneSelectedData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
// South Selected Candidate Data
const SouthSelectedCandidate = ()=>{
    setActiveTable('southselectedcandidate');
    axios.get('http://localhost:5001/all_south_zone_candidate_data')
        .then((res) => {
            console.log(res.data);
            setSouthZoneSelectedData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}
    useEffect(() => {
        allcandidate();
    }, [])
    return (
        <>
            <div id="left-menu">
                <ul>
                    <li >
                        <a className={`nav-link text-bold cursor-pointer w-100 text-light ${activeTable === 'allcandidate' ? 'activeclass' : ''}`} onClick={allcandidate}>
                            All Submission Candidates
                        </a>
                    </li>
                    <li >
                        <a className={`nav-link text-bold cursor-pointer text-light ${activeTable === 'preselectedcandidate' ? 'activeclass' : ''}`} onClick={Preselectedcandidate}>
                            All Selected Candidates
                        </a>
                    </li>
                    <li>
                    <a className={`nav-link text-bold cursor-pointer text-light ${activeTable === 'estzoneSelectedcandidate' ? 'activeclass' : ''}`} onClick={estzoneSelectedcandidate}>
                            East Zone Selected Candidate
                    </a>
                    </li>
                    <li>
                    <a className={`nav-link text-bold cursor-pointer text-light ${activeTable === 'westselectedcandidate' ? 'activeclass' : ''}`} onClick={WestSelectdCandidate}>
                            West Zone Selected Candidate
                    </a>
                    </li>
                    <li>

                    <a className={`nav-link text-bold cursor-pointer text-light ${activeTable === 'northselectedcandidate' ? 'activeclass' : ''}`} onClick={NorthSelectedCandidate}>
                    North Zone Selected Candidate
                    </a>

                    </li>
                    <li>
                    <a className={`nav-link text-bold cursor-pointer text-light ${activeTable === 'southselectedcandidate' ? 'activeclass' : ''}`} onClick={SouthSelectedCandidate}>
                    South Zone Selected Candidate
                    </a>

                    </li>
                </ul>
            </div>
            <div id="main-content">
                <div id="page-container">
                    {activeTable === 'allcandidate' && (
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <table className="table table-bordered table-hover dt-responsive">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Category</th>
                                        <th>Link1</th>
                                        <th>Link2</th>
                                        <th>Link3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allcandidates.map((item: any, index: any) => (

                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td >{item.category}</td>
                                            <td >{item.link1}</td>
                                            <td >{item.link2}</td>
                                            <td>{item.link3}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTable === 'preselectedcandidate' && (
                        <div className="col-xl-12 col-sm-12 col-md-12 col-lg-12 ">
                            <table className="table table-bordered table-hover dt-responsive">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Full Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Zone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {perseleted.map((item: any, index: any) => (

                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td >{item.full_name}</td>
                                            <td >{item.phone}</td>
                                            <td >{item.email}</td>
                                            <td>{item.zone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTable === 'estzoneSelectedcandidate' && (
                       <div className="col-xl-12 col-sm-12 col-md-12 col-lg-12 ">
                       <table className="table table-bordered table-hover dt-responsive">
                           <thead>
                               <tr>
                                   <th>S.No</th>
                                   <th>Full Name</th>
                                   <th>Phone</th>
                                   <th>Email</th>
                                   <th>Zone</th>
                               </tr>
                           </thead>
                           <tbody>
                               {eastZoneSelectedData.map((item: any, index: any) => (

                                   <tr key={index}>
                                       <td>{index + 1}</td>
                                       <td >{item.full_name}</td>
                                       <td >{item.phone}</td>
                                       <td >{item.email}</td>
                                       <td>{item.zone}</td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                   </div>
                    )}
                    {activeTable === 'westselectedcandidate' && (
                        <div className="col-xl-12 col-sm-12 col-md-12 col-lg-12 ">
                        <table className="table table-bordered table-hover dt-responsive">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Full Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Zone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {westZoneSelectedData.map((item: any, index: any) => (
 
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td >{item.full_name}</td>
                                        <td >{item.phone}</td>
                                        <td >{item.email}</td>
                                        <td>{item.zone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}
                     {activeTable === 'northselectedcandidate' && (
                        <div className="col-xl-12 col-sm-12 col-md-12 col-lg-12 ">
                        <table className="table table-bordered table-hover dt-responsive">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Full Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Zone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {northZoneSelectedData.map((item: any, index: any) => (
 
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td >{item.full_name}</td>
                                        <td >{item.phone}</td>
                                        <td >{item.email}</td>
                                        <td>{item.zone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}
                     {activeTable === 'southselectedcandidate' && (
                        <div className="col-xl-12 col-sm-12 col-md-12 col-lg-12 ">
                        <table className="table table-bordered table-hover dt-responsive">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Full Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Zone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {southZoneSelectedData.map((item: any, index: any) => (
 
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td >{item.full_name}</td>
                                        <td >{item.phone}</td>
                                        <td >{item.email}</td>
                                        <td>{item.zone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default Admin_panel