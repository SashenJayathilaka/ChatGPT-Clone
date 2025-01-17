import { User } from "@/types/type";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

function UserCard({ user }: Props) {
  return (
    <div className="flex items-center rounded border p-4 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`p1.jpeg`}
          alt="profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

export default UserCard;
