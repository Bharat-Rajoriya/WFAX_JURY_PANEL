
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../assets/jury.css"

import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Grand_jury = () => {
    const [juryData, setJuryData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState('');
    const [isValidLink, setIsValidLink] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [rowId, setRowId] = useState(null);
    const [storeprecentage, setStoreprecentage] = useState<any>();

    const [pracentage30, setPracentage30] = useState<any>();
    const [pracentage25, setPracentage25] = useState<any>();
    const [pracentage25second, setPracentage25second] = useState<any>();
    const [pracentage20, setPracentage20] = useState<any>();

    const [totalmark, setTotalmark] = useState<any>();

    const navigate = useNavigate();

    const [selectValue, setSelectValue] = useState('');
    var marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const getdata_based_on_zone = () => {
        axios.post('http://localhost:5001/getall_preSelect_candidate')
            .then(res => {
                setJuryData(res.data);
                console.log(juryData, "juryDatajuryDatajuryData");
            })
            .catch(err => {
                console.error("Error in axios", err);
            });
    }



    const handleClickOpen = (link: any) => {
        const isYouTubeLink = link.includes("youtube.com/watch?v=") || link.includes("youtu.be/");
        if (isYouTubeLink) {
            const embedLink = link.includes("watch?v=") ? link.replace("watch?v=", "embed/") : link.replace("youtu.be/", "youtube.com/embed/");
            setSelectedLink(embedLink);
            setIsValidLink(true);
        } else {
            setIsValidLink(false);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedLink('');
        setIsValidLink(true);
    };

    const handleDropdownClick = (event: any, index: any, id: any, item: any, pracentage: any) => {
        event.preventDefault();
        console.log(id, "id")
        setRowId(id);
        setAnchorEl(event.currentTarget);
        setSelectedItem(index);

        setStoreprecentage(pracentage);
    };


    const handleMenuItemClick = (marks: any) => {
        console.log(marks, "marks id here ", storeprecentage, "storeprecentage");

        if (storeprecentage == "30pracentage") {
            setPracentage30((marks / 100) * 30);
        } else if (storeprecentage == "25pracentage") {
            setPracentage25((marks / 100) * 25);
        } else if (storeprecentage == "25pracentageSecond") {
            setPracentage25second((marks / 100) * 25);
        } else if (storeprecentage == "20pracentageSecond") {
            setPracentage20((marks / 100) * 20);
        }

        // Handle undefined values for percentages by replacing them with 0
        const safePracentage30 = pracentage30 || 0;
        const safePracentage25 = pracentage25 || 0;
        const safePracentage25second = pracentage25second || 0;
        const safePracentage20 = pracentage20 || 0;

        const calculatedTotalMark = (safePracentage30 + safePracentage25 + safePracentage25second + safePracentage20) * 10;
        setTotalmark(calculatedTotalMark);

        console.log(calculatedTotalMark, "totalmark");

        axios.post('http://localhost:5001/update_grand_jury_data', {
            rowId,
            pracentage30: safePracentage30,
            pracentage25: safePracentage25,
            pracentage25second: safePracentage25second,
            pracentage20: safePracentage20,
            totalmark: calculatedTotalMark
        })
            .then(res => {
                if (res.data.message === 'updated') {
                    getdata_based_on_zone();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };


    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        const juryDataString = localStorage.getItem('jury_data');
        if (!juryDataString) {
            navigate('/');
        }
        if (juryDataString) {
            const jury_data = JSON.parse(juryDataString);
            const zone = jury_data[0]?.zone;


            getdata_based_on_zone();
        } else {
            console.error("No jury data found");
        }


    }, []);


    return (
        <>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover dt-responsive">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Link</th>
                                <th>Creativity and Original 30%</th>
                                <th>Storytelling 25%</th>
                                <th>Technical Execution 25%</th>
                                <th>Entertainment Value 20%</th>
                                <th>Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {juryData.map((item: any, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.Name}</td>
                                    <td >
                                        <button className='btn btn-warning' style={{ marginLeft: '15px', color: '#fff' }} onClick={() => handleClickOpen(item.link)}>
                                            Open Video
                                        </button>
                                    </td>
                                    {/* Creativity and Original */}
                                    <td>
                                        <div className="d-flex justify-content-space-between w-100">

                                            <button
                                                className="btn btn-primary btn-sm p-1" style={{ width: '50%', height: '40px' }}
                                                onClick={(e) => handleDropdownClick(e, index + 1, item.id, item, "30pracentage")}
                                            >
                                                Rate
                                            </button>

                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl) && selectedItem === index}
                                                onClose={handleCloseDropdown}
                                                style={{ width: '100%' }}
                                            >
                                                {marks.map((value: any) => (
                                                    <MenuItem
                                                        key={value}
                                                        onClick={() => handleMenuItemClick(value)}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {value}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                            <p style={{ fontSize: '20px', paddingLeft: '15px' }}>{(item.percentage30??0) + "%"}</p>
                                        </div>

                                    </td>
                                    {/* Storytelling */}
                                    <td>
                                        <div className="d-flex justify-content-space-between w-100">

                                            <button
                                                className="btn btn-primary btn-sm p-1" style={{ width: '50%', height: '40px' }}
                                                onClick={(e) => handleDropdownClick(e, index, item.id, item, "25pracentage")}
                                            >
                                                Rate
                                            </button>

                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl) && selectedItem === index}
                                                onClose={handleCloseDropdown}
                                                style={{ width: '100%' }}
                                            >
                                                {marks.map((value) => (
                                                    <MenuItem
                                                        key={value}
                                                        onClick={() => handleMenuItemClick(value)}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {value}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                            <p style={{fontSize:'20px', paddingLeft:'15px'}}>{(item.percentage25??0) +"%"}</p>
                                        </div>

                                    </td>
                                    {/* Technical Execution */}
                                    <td>
                                        <div className="d-flex justify-content-space-between w-100">

                                            <button
                                                className="btn btn-primary btn-sm p-1" style={{ width: '50%', height: '40px' }}
                                                onClick={(e) => handleDropdownClick(e, index, item.id, item, "25pracentageSecond")}
                                            >
                                                Rate
                                            </button>

                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl) && selectedItem === index}
                                                onClose={handleCloseDropdown}
                                                style={{ width: '100%' }}
                                            >
                                                {marks.map((value) => (
                                                    <MenuItem
                                                        key={value}
                                                        onClick={() => handleMenuItemClick(value)}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {value}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                            <p style={{fontSize:'20px', paddingLeft:'15px'}}>{(item.percentage25second ?? 0)+ "%"}</p>
                                        </div>

                                    </td>
                                    {/* Entertainment Value */}
                                    <td>
                                        <div className="d-flex justify-content-space-between w-100">

                                            <button
                                                className="btn btn-primary btn-sm p-1" style={{ width: '50%', height: '40px' }}
                                                onClick={(e) => handleDropdownClick(e, index, item.id, item, "20pracentageSecond")}
                                            >
                                                Rate
                                            </button>

                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl) && selectedItem === index}
                                                onClose={handleCloseDropdown}
                                                style={{ width: '100%' }}
                                            >
                                                {marks.map((value) => (
                                                    <MenuItem
                                                        key={value}
                                                        onClick={() => handleMenuItemClick(value)}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {value}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                            <p style={{fontSize:'20px', paddingLeft:'15px'}}>{(item.percentage20 ?? 0)+ "%"}</p>
                                        </div>

                                    </td>
                                    {/* Final Marks */}
                                    <td>{item.totalmark || 0}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <IconButton
                        onClick={handleClose}
                        style={{ position: 'absolute', right: 8, top: 8 }}
                        aria-label="Close video dialog"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {isValidLink ? (
                        <iframe
                            width="100%"
                            height="400px"
                            src={selectedLink}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="YouTube Video"
                        />
                    ) : (
                        <Typography color="error">Invalid YouTube link. Please try a valid link.</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Grand_jury
