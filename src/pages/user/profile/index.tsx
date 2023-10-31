import Input from "@/components/Input";
import UserProfileSidebar from "@/components/UserProfileSidebar";
import React, { useState } from "react";
import Image from "next/image";

function UserProfile() {
  const [showEditEmail, setShowEditEmail] = useState<boolean>(false);

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
      <div className="mobile:hidden">
        <UserProfileSidebar />
      </div>
      <div className="user-edit-profile-div ml-[680px] pt-[120px] space-y-5 mobile:mx-auto">
        <div className="edit-profile-header pb-3 mobile:text-center">
          <h1 className="text-[30px]">My Profile</h1>
          <p className="text-[18px]">Manage your account</p>
        </div>

        <form action="">
          <div className="form-section-wrapper flex gap-[150px] mobile:gap-[50px] mobile:flex-col mobile:items-center">
            <div className="form-section-div">
              <Input
                label="Username"
                labelStyle="mt-2"
                styling="flex items-center gap-[57px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                width="w-[250px]"
                type="text"
                name="username"
              />
              <div className="email-section flex items-center pb-[30px] mobile:flex-col mobile:items-start">
                <p className="">Email</p>
                {showEditEmail ? (
                  <Input
                    label=""
                    styling="flex items-center gap-[91px] mobile:gap-0 mobile:py-4"
                    width="w-[250px]"
                    type="email"
                    name="emailEdit"
                  />
                ) : (
                  <p className="ml-[91px] mobile:m-0 mobile:py-4">
                    {emailConverter("hanseljulio@yahoo.com")}
                  </p>
                )}
                <p
                  onClick={toggleEditEmail}
                  className="text-blue-600 underline hover:cursor-pointer ml-[30px] mobile:m-0"
                >
                  {showEditEmail ? "Go back" : "Change email"}
                </p>
              </div>
              <Input
                label="Phone"
                labelStyle="mt-2"
                styling="flex items-center gap-[85px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                width="w-[250px]"
                type="text"
                name="phoneNumber"
              />
              <Input
                label="Shop Name"
                labelStyle="mt-2"
                styling="flex items-center gap-12 pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                width="w-[250px]"
                type="text"
                name="shopName"
              />
              <Input
                label="Gender"
                labelStyle="mt-2"
                styling="flex items-center gap-[77px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                width="w-[250px]"
                type="text"
                name="username"
              />
              <Input
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={""}
                styling="flex items-center gap-[36px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                width="w-[250px]"
              />
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
          <div className="submit-btn mobile:text-center mobile:py-[50px]">
            <h1>SUBMIT</h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
