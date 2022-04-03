import React from "react";
import UserService from "../../../services/UserService";

type LocalParams = {
  display: boolean;
};

export default function FileUploader(params: LocalParams): JSX.Element {
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    UserService.changeAvatar(file);
  };

  if (params.display) {
    return (
      <input onChange={(e) => handleFileSelected(e)} type="file" name="file" />
    );
  } else {
    return <></>;
  }
}
