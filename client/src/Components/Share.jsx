import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import Title from './dashboard/Title';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Share import
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";


// Share Pop-up
const Share = ({link}) => {
  const [open, setOpen] = useState(false);
  const shareUrl = link
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        startIcon={<ShareIcon />}
      >
      SHARE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle alignItems="center">{"HELP BY SHARING"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fundraisers shared on social networks raise up to 5x more
          </DialogContentText>

          {/* SHARE NETWORKS */}
          <Box display="flex" justifyContent='space-around' alignItems="center">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={55} round={true}/>
              <Typography>Facebook</Typography>
            </FacebookShareButton>

            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={55} round={true}/>
              <Typography>WhatsApp</Typography>
            </WhatsappShareButton>

            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={55} round={true}/>
              <Typography>Twitter</Typography>
            </TwitterShareButton>

            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={55} round={true}/>
              <Typography>Linkedin</Typography>
            </LinkedinShareButton>
          </Box>
          {/* SHARE NETWORKS */}

        </DialogContent>
      </Dialog>
    </>
  );
}

export default Share