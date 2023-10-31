import React, { useState } from "react";
import UserProfileSidebar from "@/components/UserProfileSidebar";
import MobileUserProfileSidebar from "@/components/MobileUserProfileSidebar";
import Input from "@/components/Input";
import Button from "@/components/Button";

function UserChangePassword() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const allEmpty =
    oldPassword.length === 0 &&
    newPassword.length === 0 &&
    confirmPassword.length === 0;
  const oldPasswordEmpty =
    oldPassword.length === 0 &&
    newPassword.length !== 0 &&
    confirmPassword.length !== 0;
  const newPasswordConfirmFail =
    oldPassword.length !== 0 && confirmPassword !== newPassword;
  const allTheSame =
    oldPassword.length !== 0 &&
    oldPassword === newPassword &&
    oldPassword === confirmPassword &&
    newPassword === confirmPassword;
  const fillNewPassword =
    oldPassword.length !== 0 && !confirmPassword && !newPassword;
  const emptyNewPassword =
    newPassword.length === 0 || confirmPassword.length === 0;

  const submit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="mobile:hidden">
        <UserProfileSidebar />
      </div>

      <div className="invisible mobile:visible">
        <MobileUserProfileSidebar />
      </div>
      <div className="user-edit-profile-div ml-[680px] pt-[80px] space-y-5 mobile:mx-auto">
        <div className="edit-profile-header pb-3 mobile:text-center">
          <h1 className="text-[30px] pb-8">Change Password</h1>
          <form action="" onSubmit={submit}>
            <div className="form-section-wrapper flex gap-[150px] mobile:gap-[20px] mobile:flex-col mobile:items-center">
              <div className="form-section-div ml-[180px] mobile:m-0">
                <div className="old-password-div pb-[30px]">
                  <Input
                    label="Old Password"
                    labelStyle="mt-2"
                    styling="flex items-center gap-[57px] mobile:flex-col mobile:gap-2 mobile:items-start"
                    width="w-[250px]"
                    type="password"
                    name="oldPassword"
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="new-password-div pb-[30px]">
                  <Input
                    label="New Password"
                    labelStyle="mt-2"
                    styling="flex items-center gap-[50px] mobile:flex-col mobile:gap-2 mobile:items-start"
                    width="w-[250px]"
                    type="password"
                    name="newPassword"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="confirm-password-div pb-[30px]">
                  <Input
                    label="Confirm Password"
                    labelStyle="mt-2"
                    styling="flex items-center gap-[24px] mobile:flex-col mobile:gap-2 mobile:items-start"
                    width="w-[250px]"
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {allEmpty && (
                    <p className="text-red-500 py-1 px-4 bg-red-200 my-3">
                      It&apos;s all empty! Fill in your old and new password.
                    </p>
                  )}
                  {fillNewPassword && (
                    <p className="text-red-500 py-1 px-4 bg-red-200 my-3">
                      Now enter your new password.
                    </p>
                  )}
                  {oldPasswordEmpty && (
                    <p className="text-red-500 py-1 px-4 bg-red-200 my-3">
                      Old password must not be empty!
                    </p>
                  )}
                  {newPasswordConfirmFail && (
                    <p className="text-red-500 py-1 px-4 bg-red-200 my-3">
                      Password is not the same
                    </p>
                  )}
                  {allTheSame && (
                    <p className="text-red-500 py-1 px-4 bg-red-200 my-3">
                      You can&apos;t use your old password as the new one.
                    </p>
                  )}
                  {emptyNewPassword && (
                    <p className="text-red-500 py-1 px-4 bg-red-200 my-3">
                      New password cannot be empty!
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="submit-btn mobile:text-center mobile:py-[50px] ml-[250px] mobile:mx-auto">
              <Button
                text="Update Password"
                styling="bg-blue-400 p-3 rounded-[8px] w-[300px] hover:bg-blue-600 my-4"
                disabled={
                  allEmpty ||
                  allTheSame ||
                  newPasswordConfirmFail ||
                  fillNewPassword ||
                  oldPasswordEmpty ||
                  emptyNewPassword
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserChangePassword;
