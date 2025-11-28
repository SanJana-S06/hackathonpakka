import { useNavigate } from "react-router-dom";
// @ts-ignore
import profile from "../assets/profile.png";

const ProfileButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/login")}
      className="
        flex items-center gap-3
        bg-white shadow-lg
        px-5 py-2
        rounded-full
        border border-blue-300/40
        hover:shadow-xl
        hover:border-blue-500
        transition-all duration-300
        group
      "
    >
      {/* Profile Icon */}
      <div
        className="
          w-10 h-10 rounded-full
          bg-blue-100 border border-blue-300
          flex items-center justify-center
          overflow-hidden
          transition-all duration-300
          group-hover:scale-110
        "
      >
        <img
          src={profile}
          alt='Profile'
          className='w-9 h-9 object-cover rounded-full'
        />
      </div>

      {/* Text */}
      <span
        className="
          text-blue-700 font-semibold text-lg
          group-hover:text-blue-800
        "
      >
        Profile
      </span>
    </button>
  );
};

export default ProfileButton;
