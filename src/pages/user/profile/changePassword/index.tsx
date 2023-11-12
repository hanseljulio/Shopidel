import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ProfileLayout from "@/components/ProfileLayout";

const UserChangePassword = () => {
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

  const passwordContainsUserName =
    oldPassword.length !== 0 && newPassword.toLowerCase().includes("username");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <ProfileLayout currentPage="Change Password">
        <div className="w-fit mx-auto mt-12">
          <div className="edit-profile-header pb-3 md:text-left text-center">
            <h1 className="text-[30px] pb-8">Change Password</h1>
            <form action="" onSubmit={submit}>
              <div className="form-section-wrapper flex md:gap-[150px] md:flex-row gap-[20px] flex-col md:items-baseline items-center">
                <div className="form-section-div  m-0">
                  <div className="old-password-div pb-[30px]">
                    <Input
                      label="Old Password"
                      labelStyle="mt-2"
                      styling="flex md:items-center md:gap-[57px] md:flex-row flex-col gap-2 items-start"
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
                      styling="flex md:items-center md:gap-[50px] md:flex-row flex-col gap-2 items-start"
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
                      styling="flex md:items-center md:gap-[24px] md:flex-row flex-col gap-2 items-start"
                      width="w-[250px]"
                      type="password"
                      name="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <div className="error-section md:w-full w-[250px]">
                      {allEmpty && (
                        <p className="text-red-500 py-1 px-4 bg-red-200 my-3">
                          It&apos;s all empty! Fill in your old and new
                          password.
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
                      {emptyNewPassword && !allEmpty && (
                        <p className="text-red-500 py-1 px-4 bg-red-200 my-3">
                          New password cannot be empty!
                        </p>
                      )}
                      {passwordContainsUserName && !allEmpty && (
                        <p className="text-red-500 py-1 px-4 bg-red-200 my-3">
                          Password must not contain your username!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="submit-btn md:text-left flex justify-center text-center md:py-0 py-[50px] md:ml-[50px] md:m-0 mx-auto">
                <Button
                  text="Update Password"
                  styling="bg-[#364968] p-3 rounded-[8px] md:w-[300px] w-full text-white my-4"
                  disabled={
                    allEmpty ||
                    allTheSame ||
                    newPasswordConfirmFail ||
                    fillNewPassword ||
                    oldPasswordEmpty ||
                    emptyNewPassword ||
                    passwordContainsUserName
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
};

export default UserChangePassword;
