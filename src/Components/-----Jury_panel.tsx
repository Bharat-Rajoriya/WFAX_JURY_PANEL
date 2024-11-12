import React, { useEffect, useState } from 'react';
import "../assets/jury.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Jury_panel = () => {
  const [juryData, setJuryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [isValidLink, setIsValidLink] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [markId, setMarkId] = useState(null);
  const navigate = useNavigate();

  const [selectValue, setSelectValue] = useState('');
  var marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const getdata_based_on_zone = (zone: any) => {
    axios.post('http://localhost:5001/getdata_based_on_zone', { zone })
      .then(res => {
        console.log(res.data)
        setJuryData(res.data);
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

  const handleDropdownClick = (event: any, index: any, id: any,item:any) => {
    console.log("id is here", id,"itemitemitemitem",item)
    setMarkId(item);
    setAnchorEl(event.currentTarget);
    setSelectedItem(index);
  };

  const handleMenuItemClick = (marks: any) => {
    setSelectValue(marks)
    setAnchorEl(null);
    axios.post('http://localhost:5001/update_jury_data', { marks, markId })
      .then(res => {
        if (res.data.message === 'updated') {
          const juryDataString = localStorage.getItem('jury_data');
          if (juryDataString) {
            const jury_data = JSON.parse(juryDataString);
            const zone = jury_data[0]?.zone;
            getdata_based_on_zone(zone);
          } else {
            console.error("No jury data found");
          }
        }
      })
      .catch(err => {
        console.log(err);
      });

      if(marks >= 7){
        axios.post('http://localhost:5001/preselect_candidate', { marks, markId })
        .then(res => {
          if (res.data.message === 'success') {
           console.log(res.data,"preselected data here ");
          }
        })
        .catch(err => {
          console.log(err);
        });
      }

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


      getdata_based_on_zone(zone);
    } else {
      console.error("No jury data found");
    }


  }, []);

  return (
    <>
      <div className="row">
        <div className="col-xs-12">
          <table className="table table-bordered table-hover dt-responsive">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Link</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {juryData.map((item: any, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.Name}</td>
                  <td >
                    <button className='btn btn-warning' style={{marginLeft:'15px',color:'#fff'}} onClick={() => handleClickOpen(item.link)}>
                      Open Video
                    </button>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center w-50">
    
                    <button
                    className="btn btn-primary btn-sm p-1" style={{width:'50%', height:'40px'}}
                      onClick={(e) => handleDropdownClick(e, index, item.id,item)}
                    >
                      Select
                    </button>
                    
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedItem === index}
                      onClose={handleCloseDropdown}
                      style={{width:'100%'}}
                    >
                      {marks.map((value) => (
                        <MenuItem
                          key={value}
                          onClick={() => handleMenuItemClick(value)}
                          style={{width:'100%'}}
                        >
                          {value}
                        </MenuItem>
                      ))}
                    </Menu>
                    <p style={{fontSize:'20px', paddingLeft:'15px'}}>{item.marks}</p>
                    </div>
                    
                  </td>
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
  );
};

export default Jury_panel;





