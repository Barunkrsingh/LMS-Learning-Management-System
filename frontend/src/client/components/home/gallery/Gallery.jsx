import React, { useEffect, useState } from 'react';
import {
  ImageList,
  ImageListItem,
  Modal,
  Box,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { baseUrl } from '../../../../environment';

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const theme = useTheme();

  const handleOpen = (department) => {
    setSelectedDepartment(department);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDepartment(null);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/department/all`)
      .then((resp) => {
        setDepartments(resp.data.data || []);
      })
      .catch((e) => {
        console.error('ERROR', e);
      });
  }, []);

  return (
    <>
      <ImageList
        variant="masonry"
        cols={3}
        gap={16}
        sx={{ padding: 2, [theme.breakpoints.down('sm')]: { cols: 1 } }}
      >
        {departments.map((department, i) => (
          <ImageListItem
            key={i}
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.85 },
              transition: 'opacity 0.3s',
            }}
            onClick={() => handleOpen(department)}
          >
            <img
              src={`./images/uploaded/department/${department.department_image}?w=248&fit=crop&auto=format`}
              alt={department.department_name}
              loading="lazy"
              style={{
                borderRadius: 8,
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
              mt={1}
              sx={{ textAlign: 'center' }}
            >
              {department.department_name}
            </Typography>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox Modal */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[5],
            outline: 'none',
            borderRadius: 2,
            p: { xs: 2, md: 4 },
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Box position="relative">
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: theme.palette.grey[600],
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography
              variant="h5"
              fontWeight={700}
              color="text.primary"
              mb={2}
              textAlign="center"
            >
              {selectedDepartment?.department_name}
            </Typography>

            <img
              src={`./images/uploaded/department/${selectedDepartment?.department_image}`}
              alt={selectedDepartment?.department_name}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                borderRadius: 8,
                display: 'block',
                margin: '0 auto',
              }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Gallery;
