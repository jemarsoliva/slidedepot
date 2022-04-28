import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "scroll",
  p: 4,
};

export default function PresentationCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg relative h-72 cursor-pointer"
        onClick={handleOpen}>
        <img
          src={props.item.thumbnail_image}
          alt="thumbnail"
          className="h-full object-cover"
        />
        <div className="flex items-center gap-6 px-5 py-2 absolute left-0 bottom-0 w-full bg-white">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            alt="user_avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <h1 className="text-black text-lg font-semibold">
              {props.item.title}
            </h1>
            <p className="text-sm">Sample name</p>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={"!outline-none"}>
        <Box sx={style}>
          <iframe
            src={`http://127.0.0.1:8000${props.item.file}`}
            width="100%"
            height="100%"
            frameborder="0"></iframe>
          <div className="font-font py-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={props.item.thumbnail_image}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-black font-bold text-3xl">
                  {props.item.title}
                </h1>
                <p className="text-gray-400">
                  {props.item.title} • {props.item.date_posted}
                </p>
              </div>
            </div>
          </div>
          <div className="text-sm inline-flex font-normal px-5 py-2 bg-[#F5F3FF] text-[#4C1D95] rounded-full">
            {props.item.category}
          </div>
        </Box>
      </Modal>
    </>
  );
}
