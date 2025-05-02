import React, { useState } from "react";
import Button from "../components/Button";

type prop = {
  deleteClick?: () => void;
  cancelClick?: () => void;
};
const Dialog = ({ deleteClick , cancelClick}: prop) => {
  const [canceled, setCanceled] = useState(false);
  const handleCancel = () => {
    setCanceled(true);
    cancelClick?.();
  };
  const handleDelete = () => {
      setCanceled(true);
      deleteClick?.();
  };
  return (
    <div className={`bg-black/65 inset-0 w-full h-screen fixed z-10 flex items-center justify-center
     ${canceled && `hidden`}`}>


      <div className="bg-white mx-4 md:mx-20 lg:mx-40 p-4 font-rubik rounded-lg flex flex-col gap-3">
        <h2 className="text-lg text-dark-blue font-medium">Delete comment</h2>
        <p className="text-grayish-blue">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone.
        </p>
        <section className="flex items-center justify-between">
          <Button
            clcik={handleCancel}
            className="text-[12px] bg-grayish-blue"
            text="No, Cancel"
          />
          <Button
            clcik={handleDelete}
            className="text-[12px] bg-soft-red"
            text="Yes, Delete"
          />
        </section>
      </div>
    </div>
  );
};

export default Dialog;
