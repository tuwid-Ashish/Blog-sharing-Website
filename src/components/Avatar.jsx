import { Avatar } from "@material-tailwind/react";
 
 function PAvatar({fileID, size="sm"}) {
  return (
    <div className="">
      <Avatar
        src={fileID}
        alt="avatar"
        size={size}
        withBorder={true}
        className={`p-0.5 ${size}`}
      />
    
    </div>
  );
}

export default PAvatar