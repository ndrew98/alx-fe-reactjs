function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-4 sm:p-4 md:p-8 max-w-sm sm:max-w-sm mx-auto my-10 sm:my-20 rounded-lg shadow-lg">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto"
      />
      <h1 className="text-lg sm:text-xl md:text-2xl text-blue-800 my-3 sm:my-4 text-center">
        Andrew Laryea
      </h1>
      <p className="text-sm sm:text-base text-gray-600 text-center">
        Developer at milife Insurance. Loves to write code and explore new
        technologies.
      </p>
    </div>
  );
}

export default UserProfile;
