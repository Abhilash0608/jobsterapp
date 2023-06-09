import { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../reducers/userSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("Fill all the details");
      return;
    }
    dispatch(updateUser({name,email,lastName,location}))
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            handleChange={handleChange}
            type="text"
            name="name"
            labelText="name"
            value={userData.name}
          />
          <FormRow
            handleChange={handleChange}
            type="email"
            name="email"
            labelText="email"
            value={userData.email}
          />
          <FormRow
            handleChange={handleChange}
            type="text"
            name="lastName"
            labelText="lastName"
            value={userData.lastName}
          />
          <FormRow
            handleChange={handleChange}
            type="text"
            name="location"
            labelText="location"
            value={userData.location}
          />
          <button type="submit" disabled={isLoading} className="btn btn-block">
           {isLoading?'Please Wait ...' :'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
