import React, { useState } from "react";
import { Avatar, Menu, MenuItem, Divider, IconButton, Tooltip } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { Calendar, User, Logs } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  
  const handleOptionClick = (option) =>{

    navigate(`/vendor/abc/${option}`)
    handleClose();
  }

  return (
    <>
      {/* Avatar with hover effect */}
      <Tooltip title="Your Account">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            ml: 2,
            "&:hover": { bgcolor: "rgba(0,0,0,0.15)" },
          }}
        >
          <Avatar
            sx={{
              width: 37,
              height: 37,
              bgcolor: "primary.mian",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            M
          </Avatar>
        </IconButton>
      </Tooltip>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 8,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: "12px",
            padding: "0.5rem 0",
            "& .MuiMenuItem-root": {
              fontSize: "16px",
              fontWeight: "500",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 16,
              width: 12,
              height: 12,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* Menu Items */}
        <MenuItem onClick={() => handleOptionClick("profile")}>
        <User className="w-5 h-5 me-2" />
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleOptionClick("bookings")}>
        <Calendar className="w-5 h-5 me-2" />
          Bookings
        </MenuItem>
        <MenuItem onClick={() => handleOptionClick("yourServices")}>
        <Logs className="w-5 h-5 me-2" />
          Your Services
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleClose} sx={{ color: "error.main", fontWeight: "bold" }}>
          <Logout fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
