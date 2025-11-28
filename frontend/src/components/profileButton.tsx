import { useNavigate } from "react-router-dom";
// @ts-ignore: allow importing image asset without explicit module declaration
import profile from "../assets/profile.png";
/*
interface ProfileButtonProps {
  size?: string; // renamed for clarity
  shouldNavigate?: boolean;
}
*/

const ProfileButton = (/*{ size = "8", shouldNavigate = true }: ProfileButtonProps*/) => {
  const navigate = useNavigate();

  return (
    <button onClick={() =>/* shouldNavigate && */ navigate("/login")}>
      <img
        src={profile}
        alt="Profile"
        className={"rounded-full w-8 h-8 cursor-pointer"} 
      />
    </button>
  );
};

export default ProfileButton;

