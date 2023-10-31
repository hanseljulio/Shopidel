import React from "react";
import UserProfileSidebar from "@/components/UserProfileSidebar";
import MobileUserProfileSidebar from "@/components/MobileUserProfileSidebar";
import Input from "@/components/Input";
import Button from "@/components/Button";

function UserChangePassword() {
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
          <form action="">
            <div className="form-section-wrapper flex gap-[150px] mobile:gap-[20px] mobile:flex-col mobile:items-center">
              <div className="form-section-div ml-[180px] mobile:m-0">
                <Input
                  label="Old Password"
                  labelStyle="mt-2"
                  styling="flex items-center gap-[57px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                  width="w-[250px]"
                  type="password"
                  name="oldPassword"
                />
                <Input
                  label="New Password"
                  labelStyle="mt-2"
                  styling="flex items-center gap-[50px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                  width="w-[250px]"
                  type="password"
                  name="newPassword"
                />
                <Input
                  label="Confirm Password"
                  labelStyle="mt-2"
                  styling="flex items-center gap-[24px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                  width="w-[250px]"
                  type="password"
                  name="confirmPassword"
                />
              </div>
            </div>
            <div className="submit-btn mobile:text-center mobile:py-[50px] ml-[250px] mobile:mx-auto">
              <Button
                text="Update Password"
                styling="bg-blue-400 p-3 rounded-[8px] w-[300px] hover:bg-blue-600 my-4"
              />
            </div>
          </form>
          {/* <form action="">
            <div className="flex-col items-center justify-center">
              <Input
                label="Old Password"
                labelStyle="mt-2"
                styling="flex items-center gap-[90px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                width="w-[250px]"
                type="password"
                name="oldPassword"
              />

              <Input
                label="New Password"
                labelStyle="mt-2"
                styling="flex items-center gap-[83px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                width="w-[250px]"
                type="password"
                name="newPassword"
              />

              <Input
                label="Confirm Password"
                labelStyle="mt-2"
                styling="flex items-center gap-[57px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                width="w-[250px]"
                type="password"
                name="confirmPassword"
              />
            </div>

            <div className="submit-btn mobile:text-center mobile:py-[50px] ml-[250px] mobile:mx-auto">
              <Button
                text="Update Password"
                styling="bg-blue-400 p-3 rounded-[8px] w-[300px] hover:bg-blue-600 my-4"
              />
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
}

export default UserChangePassword;
