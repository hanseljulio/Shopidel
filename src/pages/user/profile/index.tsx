import Input from "@/components/Input";
import UserProfileSidebar from "@/components/UserProfileSidebar";
import React, { useState } from "react";
import Image from "next/image";

function UserProfile() {
  const [showEditEmail, setShowEditEmail] = useState<boolean>(true);

  const toggleEditEmail = () => {
    setShowEditEmail((prevBool) => !prevBool);
  };

  const emailConverter = (email: string) => {
    let emailArray = email.split("@");
    let censoredUserName = emailArray[0].replace(/./g, "*");

    emailArray[0] = censoredUserName;

    return emailArray.join("@");
  };

  return (
    <div>
      <UserProfileSidebar />
      <div className="user-edit-profile-div ml-[550px] pt-[200px] space-y-5">
        <div className="edit-profile-header">
          <h1 className="text-[25px]">My Profile</h1>
          <p className="text-[14px]">Manage your account</p>
        </div>
        <div className="form-section-wrapper flex gap-[150px]">
          <div className="form-section">
            <form action="">
              <Input
                label="Username"
                labelStyle="mt-2"
                styling="flex items-center gap-[57px] pb-[30px]"
                width="w-[250px]"
                type="text"
                name="username"
              />
              <div className="email-section flex items-center gap-[91px] pb-[30px]">
                <p>Email</p>
                {showEditEmail ? (
                  <Input
                    label=""
                    width="w-[250px]"
                    type="email"
                    name="emailEdit"
                  />
                ) : (
                  <p>{emailConverter("hanseljulio@yahoo.com")}</p>
                )}
                <p
                  onClick={toggleEditEmail}
                  className="text-blue-600 underline hover:cursor-pointer"
                >
                  {showEditEmail ? "Go back" : "Change email"}
                </p>
              </div>
              <Input
                label="Phone"
                labelStyle="mt-2"
                styling="flex items-center gap-[85px] pb-[30px]"
                width="w-[250px]"
                type="text"
                name="phoneNumber"
              />
              <Input
                label="Shop Name"
                labelStyle="mt-2"
                styling="flex items-center gap-12 pb-[30px]"
                width="w-[250px]"
                type="text"
                name="shopName"
              />
              <Input
                label="Gender"
                labelStyle="mt-2"
                styling="flex items-center gap-[77px] pb-[30px]"
                width="w-[250px]"
                type="text"
                name="username"
              />
              <Input
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={""}
                styling="flex items-center gap-[36px] pb-[30px]"
                width="w-[250px]"
              />
            </form>
          </div>
          <div
            className={`flex-col justify-center items-center admin-edit-photo p-4 mobile:mx-auto`}
          >
            <Image
              src={`/images/defaultuser.png`}
              alt="Nothing"
              width={200}
              height={200}
              className={`w-[200px] h-[200px]`}
              style={{
                objectFit: "cover",
                borderRadius: "100%",
              }}
            />
            <br />
            <label className="custom-file-upload bg-amber-400 hover:cursor-pointer hover:bg-amber-500 p-4 rounded-[10px] ml-1.5 text-center">
              <input type="file" className="hidden" />
              {"Upload profile photo"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
