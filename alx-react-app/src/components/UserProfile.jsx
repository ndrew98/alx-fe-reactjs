import PropType from "prop-types";

function UserProfile(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Bio: {props.bio}</p>
    </div>
  );
}

UserProfile.propTypes = {
  name: PropType.string.isRequired,
  age: PropType.number,
  bio: PropType.string,
};

export default UserProfile;
